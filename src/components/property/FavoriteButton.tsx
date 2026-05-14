import { Heart } from "lucide-react";
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { data: favorites } = useFavorites();
  const toggle = useToggleFavorite();
  const navigate = useNavigate();

  const isFavorite = !!favorites?.some((f) => f.property_id === propertyId);

  function onClick() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/property/${propertyId}` } });
      return;
    }
    toggle.mutate(propertyId);
  }

  return (
    <button
      onClick={onClick}
      disabled={toggle.isPending}
      className={cn(
        "inline-flex h-11 items-center gap-3 border px-5 text-xs uppercase tracking-[0.25em] transition-colors duration-300",
        isFavorite
          ? "border-[#C9A961] text-[#C9A961]"
          : "border-foreground/40 text-foreground hover:border-foreground",
        className
      )}
      aria-pressed={isFavorite}
    >
      <Heart size={16} fill={isFavorite ? "#C9A961" : "none"} strokeWidth={1.2} />
      {isFavorite ? "Saved" : "Save"}
    </button>
  );
}
