import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ProfileForm } from "@/components/account/ProfileForm";
import { FavoritesList } from "@/components/account/FavoritesList";
import { RequestsList } from "@/components/account/RequestsList";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Tab = "profile" | "favorites" | "requests";

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "favorites", label: "Favorites" },
  { id: "requests", label: "Requests" },
];

export default function Account() {
  const { user, profile } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <Container className="page-enter py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Private client</p>
      <h1 className="mt-6 font-display text-display-lg">
        {profile?.full_name?.trim() || user?.email}
      </h1>

      <nav className="mt-12 flex flex-wrap gap-2 border-b border-foreground/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "border-b-2 px-5 py-4 text-xs uppercase tracking-[0.25em] transition-colors duration-300",
              tab === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-12">
        {tab === "profile" && <ProfileForm />}
        {tab === "favorites" && <FavoritesList />}
        {tab === "requests" && <RequestsList />}
      </div>
    </Container>
  );
}
