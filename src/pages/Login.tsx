import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface LocationState {
  from?: string;
}

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as LocationState | null)?.from ?? "/account";

  if (!isLoading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <Container className="page-enter flex min-h-[70vh] max-w-md flex-col justify-center py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Account</p>
      <h1 className="mt-6 font-display text-display-md">Welcome back.</h1>

      <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-8">
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
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-4">
          {submitting ? "Entering…" : "Enter"}
        </Button>
      </form>

      <p className="mt-10 text-sm text-muted-foreground">
        New to Novere?{" "}
        <Link to="/register" className="text-foreground underline-offset-4 hover:underline">
          Request access
        </Link>
      </p>
    </Container>
  );
}
