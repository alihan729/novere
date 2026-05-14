import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type { Profile } from "@/types/database";

export function useAuthInit() {
  const { setSession, setProfile, setLoading, reset } = useAuthStore();

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);

      if (data.session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .maybeSingle();
        if (active) setProfile((profile as Profile | null) ?? null);
      }
      setLoading(false);
    }

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle();
          setProfile((profile as Profile | null) ?? null);
        } else {
          reset();
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [setSession, setProfile, setLoading, reset]);
}

export function useAuth() {
  const { session, user, profile, isLoading } = useAuthStore();
  return {
    session,
    user,
    profile,
    isLoading,
    isAuthenticated: !!session,
    isAdmin: profile?.role === "admin",
  };
}

export async function signOut() {
  await supabase.auth.signOut();
}
