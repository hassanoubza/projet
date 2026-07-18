"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";



type DropdownItem = {
  href: string;
  label: string;
};


type NavLink = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
};




const TOURS_DROPDOWN: DropdownItem[] = [
  { href: "/tours/marrakech", label: "Tours from Marrakech" },
  { href: "/tours/fes", label: "Tours from Fes" },
  { href: "/tours/casablanca", label: "Tours from Casablanca" },
  { href: "/tours/tangier", label: "Tours from Tangier" },
  { href: "/tours/agadir", label: "Tours from Agadir" },
  { href: "/tours", label: "All Tours" },
];

const DAY_TRIPS_DROPDOWN: DropdownItem[] = [
  { href: "/day-trips/marrakech", label: "Day Trips from Marrakech" },
  { href: "/day-trips/fes", label: "Day Trips from Fes" },
  { href: "/day-trips/casablanca", label: "Day Trips from Casablanca" },
  { href: "/day-trips/tangier", label: "Day Trips from Tangier" },
];

const aboutDropdown: DropdownItem[] = [
  { href: "/about", label: "About Trips to Marrakech" },
  { href: "/about/morocco_tourist", label: "About Morocco Tourist" }
]



const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Marrakech Activities" },
  { href: "/tours", label: "Tours", dropdown: TOURS_DROPDOWN },
  { href: "/day-trips", label: "Day Trips", dropdown: DAY_TRIPS_DROPDOWN },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us", dropdown: aboutDropdown },
  { href: "/contact", label: "Contact" },
];

export default function Header() {


  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null,);


  const pathname = usePathname();

  // Ferme menu mobile au changement de page
  useEffect(() => {
    setIsOpen(false);
    setOpenMobileSection(null);
  }, [pathname]);



  // Bloque le scroll body quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);



  // Header devient opaque au scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const isSolid = isScrolled || isOpen;

  return (
    <header className="sticky top-0 z-[100] w-full">
      <div
        className={`transition-all duration-300 ${isSolid ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent border-b border-transparent" }`}
      >


        <div className="mx-auto max-w-7xl h-16 lg:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <Logo />
          <DesktopNav pathname={pathname} />

          <div className="hidden lg:flex items-center">
            <BookNowButton />
          </div>

          <MobileMenuButton
            isOpen={isOpen}
            onToggle={() => setIsOpen((v) => !v)}
          />
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        pathname={pathname}
        openSection={openMobileSection}
        onToggleSection={(href) =>
          setOpenMobileSection((current) => (current === href ? null : href))
        }
        onCloseMobileMenu={() => setIsOpen(false)}
      />
    </header>
  );
}





// ─────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      aria-label="Trips To Marrakech — Home"
    >
      <Image
        src="/logo.png"
        alt="Trips To Marrakech logo"
        width={180}
        height={50}
        priority
        className="w-28 lg:w-36 h-auto"
      />
    </Link>
  );
}

// ─────────────────────────────────────────────
// Book Now button — CTA premium
// ─────────────────────────────────────────────

function BookNowButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className=" group relative inline-flex  items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-2 text-sm
        font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary-hover
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
      "
    >
      <span className="relative z-10">Book Your Trip</span>

      <span
        aria-hidden="true"
        className=" absolute inset-0 -translate-x-full  bg-white/20  transition-transform  duration-500 group-hover:translate-x-0 "/>
    </Link>
  );
}

// ─────────────────────────────────────────────
// Mobile burger button
// ─────────────────────────────────────────────

function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

// ─────────────────────────────────────────────
// Desktop nav — dropdowns au hover, CSS pur (group-hover)
// ─────────────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:flex items-center gap-1"
    >
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");

        if (!link.dropdown) {
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "text-accent"
                  : "text-foreground hover:text-accent hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        }

        return (
          <div key={link.href} className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "text-accent"
                  : "text-foreground hover:text-accent hover:bg-muted"
              }`}
            >
              {link.label}
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Zone tampon pour éviter que le survol se perde entre le bouton et le menu */}
            <div className="absolute left-0 top-full h-2 w-56" />

            <div className="absolute left-0 top-full mt-2 w-64 origin-top rounded-xl border border-border bg-card p-1.5 shadow-xl opacity-0 scale-95 -translate-y-1 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto max-h-80 overflow-y-auto scrollbar-thin">
              {link.dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}




function MobileNav({
  isOpen,
  pathname,
  openSection,
  onToggleSection,
  onCloseMobileMenu,
}: {
  isOpen: boolean;
  pathname: string;
  openSection: string | null;
  onToggleSection: (href: string) => void;
  onCloseMobileMenu: () => void;
}) {
  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile navigation"
      className={`lg:hidden bg-card border-t border-border shadow-xl transition-[max-height,opacity] duration-300 overflow-hidden ${
        isOpen
          ? "max-h-[80vh] opacity-100 overflow-y-auto"
          : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-1 px-4 py-5">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const isSectionOpen = openSection === link.href;

          if (!link.dropdown) {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onCloseMobileMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => onToggleSection(link.href)}
                aria-expanded={isSectionOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isSectionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isSectionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <ul className="overflow-hidden">
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobileMenu}
                        className="block rounded-xl px-4 py-2.5 ml-4 text-sm text-text-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border px-4 py-4">
        <BookNowButton onClick={onCloseMobileMenu} />
      </div>
    </nav>
  );
}
