import { Link } from "react-router-dom";
import type { Property } from "@/types/database";
import { formatPrice, formatArea } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const cover = property.images?.[0];

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block animate-fade-in border border-foreground/10 transition-colors duration-500 hover:border-foreground/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {cover ? (
          <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            No image
          </div>
        )}
        {property.featured && (
          <span className="absolute left-4 top-4 border border-[#C9A961] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#C9A961]">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>{property.type}</span>
          <span>{property.deal_type === "rent" ? "For Rent" : "For Sale"}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight">{property.title}</h3>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        <div className="mt-2 flex items-end justify-between border-t border-foreground/10 pt-4">
          <span className="font-display text-xl">{formatPrice(property.price)}</span>
          <span className="text-xs text-muted-foreground">
            {property.bedrooms} br · {property.bathrooms} ba · {formatArea(property.area)}
          </span>
        </div>
      </div>
    </Link>
  );
}
