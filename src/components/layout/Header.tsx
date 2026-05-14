import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useAuth, signOut } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
];

export function Header() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-[0.3em] uppercase">
          Novere
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  "text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                  isActive ? "text-[#C9A961]" : "text-muted-foreground hover:text-[#C9A961]"
                )
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Account
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="border border-foreground/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Join
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-foreground/10 md:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-[#C9A961]"
              >
                Admin
              </NavLink>
            )}
            <div className="mt-4 flex flex-col gap-3 border-t border-foreground/10 pt-6">
              {isAuthenticated ? (
                <>
                  <Link to="/account" onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em]">
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="text-left text-sm uppercase tracking-[0.2em]"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em]">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em] text-[#C9A961]">
                    Join
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
