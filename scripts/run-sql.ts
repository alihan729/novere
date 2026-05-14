#!/usr/bin/env tsx
/**
 * Apply SQL files against the configured Supabase project.
 *
 * Modes (auto-detected from env):
 *   1. Supabase Management API (preferred):
 *        SUPABASE_ACCESS_TOKEN=sbp_xxxxx   (Personal Access Token)
 *        SUPABASE_PROJECT_REF=tpjfttmcsewbzrsgarsa
 *   2. Direct Postgres connection:
 *        SUPABASE_DB_URL=postgresql://postgres:PASSWORD@db.tpjfttmcsewbzrsgarsa.supabase.co:5432/postgres
 *
 * Usage:
 *   tsx scripts/run-sql.ts supabase/migrations/0001_init.sql supabase/seed.sql
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "pg";

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const DB_URL = process.env.SUPABASE_DB_URL;

async function runViaManagementApi(sql: string, label: string) {
  const url = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`[${label}] HTTP ${res.status}: ${text}`);
  }
  return text;
}

async function runViaPg(sql: string, label: string) {
  const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(sql);
    return `[${label}] ok`;
  } finally {
    await client.end();
  }
}

async function runFile(file: string) {
  const path = resolve(process.cwd(), file);
  const sql = readFileSync(path, "utf8");
  const label = file;
  console.log(`→ running ${label} (${sql.length} chars)`);

  if (ACCESS_TOKEN && PROJECT_REF) {
    const out = await runViaManagementApi(sql, label);
    console.log(`  ✓ ${label} (management api)`);
    if (out.trim()) console.log(`  ${out.slice(0, 200)}`);
  } else if (DB_URL) {
    const out = await runViaPg(sql, label);
    console.log(`  ✓ ${label} (pg direct)`);
    console.log(`  ${out}`);
  } else {
    throw new Error(
      "No credentials. Set SUPABASE_ACCESS_TOKEN + SUPABASE_PROJECT_REF, or SUPABASE_DB_URL."
    );
  }
}

async function main() {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error("Usage: tsx scripts/run-sql.ts <file.sql> [<file.sql> ...]");
    process.exit(1);
  }
  for (const f of files) {
    await runFile(f);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
