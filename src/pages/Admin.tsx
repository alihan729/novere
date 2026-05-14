import { FormEvent, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import {
  useCreateProperty,
  useDeleteProperty,
  useUpdateProperty,
  type PropertyInput,
} from "@/hooks/useAdminProperties";
import { formatPrice } from "@/lib/utils";
import type { DealType, Property, PropertyType } from "@/types/database";

const emptyForm: PropertyInput = {
  title: "",
  description: "",
  price: 0,
  type: "villa",
  deal_type: "sale",
  location: "",
  area: 0,
  bedrooms: 0,
  bathrooms: 0,
  images: [],
  featured: false,
};

export default function Admin() {
  const { data: properties, isLoading } = useProperties();
  const create = useCreateProperty();
  const update = useUpdateProperty();
  const remove = useDeleteProperty();

  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState<PropertyInput>(emptyForm);
  const [imagesText, setImagesText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function startEdit(p: Property) {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      price: p.price,
      type: p.type,
      deal_type: p.deal_type,
      location: p.location,
      area: p.area,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      images: p.images,
      featured: p.featured,
    });
    setImagesText(p.images.join("\n"));
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setForm(emptyForm);
    setImagesText("");
    setError(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const images = imagesText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: PropertyInput = { ...form, images };

    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, ...payload });
      } else {
        await create.mutateAsync(payload);
      }
      resetForm();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(p: Property) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await remove.mutateAsync(p.id);
      if (editing?.id === p.id) resetForm();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <Container className="page-enter py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">Admin</p>
      <h1 className="mt-6 font-display text-display-lg">Manage portfolio.</h1>

      <section className="mt-16 border-y border-foreground/10 py-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">
            {editing ? "Edit residence" : "New residence"}
          </h2>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-3 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as PropertyType })}
              className="h-11 border-0 border-b border-foreground/20 bg-transparent text-base text-foreground focus-visible:border-foreground focus-visible:outline-none"
            >
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="deal_type">Deal type</Label>
            <select
              id="deal_type"
              value={form.deal_type}
              onChange={(e) => setForm({ ...form, deal_type: e.target.value as DealType })}
              className="h-11 border-0 border-b border-foreground/20 bg-transparent text-base text-foreground focus-visible:border-foreground focus-visible:outline-none"
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="area">Area (m²)</Label>
            <Input
              id="area"
              type="number"
              min={0}
              value={form.area}
              onChange={(e) => setForm({ ...form, area: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              min={0}
              value={form.bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              min={0}
              value={form.bathrooms}
              onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <Label htmlFor="images">Images (one URL per line)</Label>
            <Textarea
              id="images"
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="min-h-[120px]"
            />
          </div>

          <label className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 accent-gold"
            />
            <span className="text-xs uppercase tracking-[0.25em]">Featured</span>
          </label>

          {error && (
            <p className="md:col-span-2 border-l-2 border-destructive pl-4 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="md:col-span-2 flex gap-4">
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {editing
                ? update.isPending
                  ? "Saving…"
                  : "Save changes"
                : create.isPending
                  ? "Creating…"
                  : "Create residence"}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onDelete(editing)}
                disabled={remove.isPending}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl">All residences</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {properties?.length ?? 0} total
        </p>

        {isLoading && (
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Loading…
          </p>
        )}

        <div className="mt-10 grid gap-4">
          {properties?.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-start gap-4 border border-foreground/10 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-5">
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt=""
                    className="h-16 w-24 object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-display text-lg">{p.title}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {p.type} · {p.deal_type} · {p.location}
                  </p>
                  <p className="mt-2 text-sm">
                    {formatPrice(p.price)}
                    {p.featured && (
                      <span className="ml-3 text-xs uppercase tracking-[0.25em] text-gold">
                        featured
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(p)}
                  className="text-xs uppercase tracking-[0.25em] underline-offset-4 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
