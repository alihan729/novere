import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() || null },
      },
    });
    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    // With mailer_autoconfirm: true, a session is returned immediately.
    if (data.session) {
      navigate("/account", { replace: true });
      return;
    }

    // Fallback for projects where email confirmation is still required.
    navigate("/login", { replace: true, state: { message: "Check your email to confirm." } });
  }

  return (
    <Container className="page-enter flex min-h-[70vh] max-w-md flex-col justify-center py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Account</p>
      <h1 className="mt-6 font-display text-display-md">Request access.</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Private clientele for residential property of exceptional standing.
      </p>

      <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-xs text-muted-foreground">Minimum 6 characters.</span>
        </div>

        {error && (
          <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-4">
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-10 text-sm text-muted-foreground">
        Already a client?{" "}
        <Link to="/login" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </Container>
  );
}
