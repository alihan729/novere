import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-foreground/10">
      <Container className="flex flex-col gap-12 py-16 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl tracking-[0.3em] uppercase">Novere</p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            A boutique agency specializing in residential properties of singular quality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="/catalog" className="transition-colors hover:text-[#C9A961]">Residences</a></li>
              <li><a href="/catalog?type=villa" className="transition-colors hover:text-[#C9A961]">Villas</a></li>
              <li><a href="/catalog?type=penthouse" className="transition-colors hover:text-[#C9A961]">Penthouses</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Agency</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>About</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>concierge@novere.estate</li>
              <li>+41 22 555 0100</li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-foreground/10 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Novere. All rights reserved.</span>
        <span className="uppercase tracking-[0.2em]">Geneva · Monaco · Dubai</span>
      </Container>
    </footer>
  );
}
