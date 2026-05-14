import { Link } from "react-router-dom";
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites";
import { formatPrice } from "@/lib/utils";

export function FavoritesList() {
  const { data, isLoading } = useFavorites();
  const toggle = useToggleFavorite();

  if (isLoading) {
    return (
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading…</p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="border border-foreground/10 p-10 text-center">
        <p className="text-sm text-muted-foreground">No saved residences yet.</p>
        <Link
          to="/catalog"
          className="mt-6 inline-block text-xs uppercase tracking-[0.25em] underline-offset-8 hover:underline"
        >
          Browse collection →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data.map((fav) => (
        <div
          key={fav.id}
          className="grid grid-cols-[120px_1fr_auto] items-center gap-8 border border-foreground/10 p-4 sm:grid-cols-[160px_1fr_auto]"
        >
          <Link to={`/property/${fav.property.id}`} className="block aspect-[4/3] overflow-hidden bg-muted">
            {fav.property.images?.[0] && (
              <img
                src={fav.property.images[0]}
                alt={fav.property.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            )}
          </Link>
          <div>
            <Link
              to={`/property/${fav.property.id}`}
              className="font-display text-xl leading-tight hover:underline"
            >
              {fav.property.title}
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {fav.property.location}
            </p>
            <p className="mt-4 text-sm">{formatPrice(fav.property.price)}</p>
          </div>
          <button
            onClick={() => toggle.mutate(fav.property_id)}
            disabled={toggle.isPending}
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
