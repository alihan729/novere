import type { PropertyFilters, PropertyType, DealType } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  value: PropertyFilters;
  onChange: (next: PropertyFilters) => void;
}

const propertyTypes: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "apartment", label: "Apartment" },
];

const dealTypes: { value: DealType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sale", label: "Sale" },
  { value: "rent", label: "Rent" },
];

export function Filters({ value, onChange }: FiltersProps) {
  return (
    <div className="grid gap-8 border-y border-foreground/10 py-10 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-3">
        <Label>Search</Label>
        <Input
          placeholder="Title or description"
          value={value.search ?? ""}
          onChange={(e) => onChange({ ...value, search: e.target.value || undefined })}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Type</Label>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ ...value, type: t.value })}
              className={`border px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
                (value.type ?? "all") === t.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 text-muted-foreground hover:border-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Deal</Label>
        <div className="flex flex-wrap gap-2">
          {dealTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ ...value, dealType: t.value })}
              className={`border px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
                (value.dealType ?? "all") === t.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 text-muted-foreground hover:border-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Location</Label>
        <Input
          placeholder="Geneva, Monaco…"
          value={value.location ?? ""}
          onChange={(e) =>
            onChange({ ...value, location: e.target.value || undefined })
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Min bedrooms</Label>
        <Input
          type="number"
          min={0}
          value={value.bedrooms ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              bedrooms: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Price min</Label>
        <Input
          type="number"
          min={0}
          value={value.priceMin ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              priceMin: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Price max</Label>
        <Input
          type="number"
          min={0}
          value={value.priceMax ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              priceMax: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="flex items-end">
        <button
          type="button"
          onClick={() => onChange({})}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
