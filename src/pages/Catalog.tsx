import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Filters } from "@/components/property/Filters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import type { PropertyFilters, PropertyType, DealType } from "@/types/database";

function filtersFromParams(params: URLSearchParams): PropertyFilters {
  const out: PropertyFilters = {};
  const t = params.get("type");
  if (t && ["villa", "penthouse", "apartment"].includes(t)) out.type = t as PropertyType;
  const d = params.get("deal");
  if (d && ["sale", "rent"].includes(d)) out.dealType = d as DealType;
  const loc = params.get("location");
  if (loc) out.location = loc;
  const beds = params.get("bedrooms");
  if (beds) out.bedrooms = Number(beds);
  const pmin = params.get("priceMin");
  if (pmin) out.priceMin = Number(pmin);
  const pmax = params.get("priceMax");
  if (pmax) out.priceMax = Number(pmax);
  const s = params.get("search");
  if (s) out.search = s;
  return out;
}

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const initial = useMemo(() => filtersFromParams(params), [params]);
  const [filters, setFilters] = useState<PropertyFilters>(initial);
  const { data, isLoading, error } = useProperties(filters);

  function handleChange(next: PropertyFilters) {
    setFilters(next);
    const usp = new URLSearchParams();
    if (next.type && next.type !== "all") usp.set("type", next.type);
    if (next.dealType && next.dealType !== "all") usp.set("deal", next.dealType);
    if (next.location) usp.set("location", next.location);
    if (next.bedrooms !== undefined) usp.set("bedrooms", String(next.bedrooms));
    if (next.priceMin !== undefined) usp.set("priceMin", String(next.priceMin));
    if (next.priceMax !== undefined) usp.set("priceMax", String(next.priceMax));
    if (next.search) usp.set("search", next.search);
    setParams(usp, { replace: true });
  }

  return (
    <Container className="py-16 md:py-24">
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Collection</p>
        <h1 className="font-display text-display-lg">All residences.</h1>
      </div>

      <div className="mt-12">
        <Filters value={filters} onChange={handleChange} />
      </div>

      <div className="mt-12">
        {isLoading && (
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Loading…</p>
        )}
        {error && (
          <p className="border-l-2 border-destructive pl-4 text-sm text-destructive">
            {(error as Error).message}
          </p>
        )}
        {!isLoading && data && data.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No residences match these criteria. Adjust the filters above.
          </p>
        )}
        {!isLoading && data && data.length > 0 && (
          <>
            <p className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {data.length} residence{data.length === 1 ? "" : "s"}
            </p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
