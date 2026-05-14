import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import type { Profile } from "@/types/database";

export function ProfileForm() {
  const { user, profile } = useAuth();
  const setProfile = useAuthStore((s) => s.setProfile);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setPhone(profile?.phone ?? "");
  }, [profile?.full_name, profile?.phone]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    setStatus("idle");

    const { data, error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null, phone: phone.trim() || null })
      .eq("id", user.id)
      .select()
      .single();

    setSaving(false);
    if (error) {
      setError(error.message);
      setStatus("error");
      return;
    }
    setProfile(data as Profile);
    setStatus("saved");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={user?.email ?? ""} disabled />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="role">Role</Label>
          <Input id="role" type="text" value={profile?.role ?? "client"} disabled />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">{error}</p>
      )}
      {status === "saved" && (
        <p className="border-l-2 border-gold pl-4 text-sm text-gold">Saved.</p>
      )}

      <div>
        <Button type="submit" disabled={saving} variant="outline">
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
