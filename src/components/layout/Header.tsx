import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-[0.3em] uppercase transition-opacity hover:opacity-70">
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
                  isActive ? "text-gold" : "text-muted-foreground hover:text-gold"
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
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu
            size={20}
            className={cn(
              "absolute transition-all duration-300",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            size={20}
            className={cn(
              "absolute transition-all duration-300",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          />
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-foreground/10 transition-all duration-300 ease-out md:hidden",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-6">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="py-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
              style={{ animationDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className="py-3 text-sm uppercase tracking-[0.2em] text-gold"
            >
              Admin
            </NavLink>
          )}
          <div className="mt-4 flex flex-col gap-3 border-t border-foreground/10 pt-6">
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-sm uppercase tracking-[0.2em] transition-colors hover:text-gold">
                  Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-left text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm uppercase tracking-[0.2em] transition-colors hover:text-gold">
                  Sign in
                </Link>
                <Link to="/register" className="text-sm uppercase tracking-[0.2em] text-gold">
                  Join
                </Link>
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}
