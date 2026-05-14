import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Gallery } from "@/components/property/Gallery";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { ViewingRequestForm } from "@/components/property/ViewingRequestForm";
import { PropertyDetailSkeleton } from "@/components/ui/skeleton";
import { useProperty } from "@/hooks/useProperties";
import { formatArea, formatPrice } from "@/lib/utils";

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id);

  if (isLoading) {
    return (
      <Container>
        <PropertyDetailSkeleton />
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container className="page-enter py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Not found</p>
        <h1 className="mt-6 font-display text-display-lg">Residence unavailable.</h1>
        <Link
          to="/catalog"
          className="mt-8 inline-block text-xs uppercase tracking-[0.25em] underline-offset-8 hover:underline"
        >
          Back to collection →
        </Link>
      </Container>
    );
  }

  return (
    <div className="page-enter">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Link to="/catalog" className="transition-colors hover:text-foreground">Collection</Link>
            <span>·</span>
            <span>{property.type}</span>
            <span>·</span>
            <span>{property.deal_type === "rent" ? "For rent" : "For sale"}</span>
          </div>
          <h1 className="font-display text-display-lg">{property.title}</h1>
          <p className="text-base text-muted-foreground">{property.location}</p>
        </div>
      </Container>

      <Container>
        <Gallery images={property.images} alt={property.title} />
      </Container>

      <Container className="grid gap-16 py-16 md:py-24 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Description</p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground">
            {property.description}
          </p>

          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-foreground/10 pt-12 md:grid-cols-4">
            {[
              { label: "Bedrooms", value: property.bedrooms, size: "text-3xl" },
              { label: "Bathrooms", value: property.bathrooms, size: "text-3xl" },
              { label: "Area", value: formatArea(property.area), size: "text-3xl" },
              { label: "Reference", value: property.id.slice(0, 6).toUpperCase(), size: "text-xl" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</dt>
                <dd className={`mt-3 font-display ${stat.size}`}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="border border-foreground/10 p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {property.deal_type === "rent" ? "Monthly rent" : "Asking price"}
          </p>
          <p className="mt-6 font-display text-4xl">{formatPrice(property.price)}</p>
          {property.deal_type === "rent" && (
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">/ month</p>
          )}
          <div className="mt-10 flex flex-col gap-4">
            <FavoriteButton propertyId={property.id} />
            <a
              href="#viewing"
              className="inline-flex h-11 items-center justify-center border border-foreground bg-foreground px-5 text-xs uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-foreground/90"
            >
              Request viewing
            </a>
          </div>
        </aside>
      </Container>

      <Container className="pb-24">
        <div id="viewing" />
        <ViewingRequestForm propertyId={property.id} />
      </Container>
    </div>
  );
}
