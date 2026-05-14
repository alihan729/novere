import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { PropertyCard } from "@/components/property/PropertyCard";
import { useFeaturedProperties } from "@/hooks/useProperties";

export default function Landing() {
  const { data: featured, isLoading } = useFeaturedProperties(3);

  return (
    <>
      <section className="border-b border-foreground/10">
        <Container className="flex min-h-[80vh] flex-col justify-center py-24">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Boutique residential agency
          </p>
          <h1 className="mt-8 max-w-4xl font-display text-display-xl text-balance">
            Residences of singular consequence.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            Novere represents an intentionally narrow portfolio of villas, penthouses,
            and apartments across Geneva, Monaco and Dubai — each curated for the
            collector of fine living.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <Link
              to="/catalog"
              className="border border-foreground/40 px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              View collection
            </Link>
            <Link
              to="/register"
              className="px-2 py-3.5 text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
            >
              Private access
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid gap-16 md:grid-cols-3">
          {[
            {
              kicker: "01",
              title: "Curated portfolio",
              body: "Properties accepted only after on-site assessment by our senior partners.",
            },
            {
              kicker: "02",
              title: "Private representation",
              body: "Each client is assigned a single point of contact for the lifetime of the relationship.",
            },
            {
              kicker: "03",
              title: "Discreet transactions",
              body: "Off-market access and confidential closings, supported by trusted legal partners.",
            },
          ].map((item) => (
            <div key={item.kicker} className="border-t border-foreground/20 pt-8">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A961]">{item.kicker}</span>
              <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-y border-foreground/10 py-24">
        <Container className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Selected works</p>
            <h2 className="mt-6 font-display text-display-lg">Recent additions.</h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
          >
            All residences →
          </Link>
        </Container>

        <Container className="mt-16">
          {isLoading && (
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Loading…</p>
          )}
          {!isLoading && featured && featured.length > 0 && (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
          {!isLoading && (!featured || featured.length === 0) && (
            <p className="text-sm text-muted-foreground">No featured residences yet.</p>
          )}
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="flex flex-col items-center gap-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">A private conversation</p>
          <h2 className="max-w-2xl font-display text-display-lg">
            Begin with a confidential introduction.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Submit a brief request and a senior representative will respond personally — typically within one business day.
          </p>
          <Link
            to="/register"
            className="mt-6 border border-[#C9A961] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#C9A961] transition-colors duration-300 hover:bg-[#C9A961] hover:text-ink-900"
          >
            Request access
          </Link>
        </Container>
      </section>
    </>
  );
}
