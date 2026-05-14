import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center page-enter">
      <p className="font-display text-[8rem] leading-none tracking-tight text-foreground/[0.06] md:text-[12rem]">
        404
      </p>
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Not found</p>
      <h1 className="mt-6 font-display text-display-lg">
        This residence has moved.
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
        The page you're looking for is no longer available. Perhaps our collection can guide you.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link
          to="/"
          className="border border-foreground/40 px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
        >
          Return home
        </Link>
        <Link
          to="/catalog"
          className="px-2 py-3.5 text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
        >
          View collection
        </Link>
      </div>
    </Container>
  );
}
