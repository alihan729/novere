import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">404</p>
      <h1 className="mt-6 font-display text-display-lg">Page not found.</h1>
      <Link
        to="/"
        className="mt-10 border border-foreground/40 px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
      >
        Return home
      </Link>
    </Container>
  );
}
