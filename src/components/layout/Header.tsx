"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  { href: "/day-trips", label: "All Day Trips" },
];

const ABOUT_DROPDOWN: DropdownItem[] = [
  { href: "/about", label: "About Trips to Marrakech" },
  { href: "/about/morocco_tourist", label: "About Morocco Tourist" },
];

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Marrakech Activities" },
  { href: "/tours", label: "Tours", dropdown: TOURS_DROPDOWN },
  { href: "/day-trips", label: "Day Trips", dropdown: DAY_TRIPS_DROPDOWN },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us", dropdown: ABOUT_DROPDOWN },
  { href: "/contact", label: "Contact" },
];

function createNavigationId(prefix: string, href: string): string {
  const slug =
    href.replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9]+/g, "-") || "home";
  return `${prefix}-${slug}`;
}

export default function Header(): React.JSX.Element {
  const pathname = usePathname();

  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );

  const closeMobileMenu = (): void => {
    setIsOpen(false);
    setOpenMobileSection(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 8);
    };

    const animationFrame = window.requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setOpenMobileSection(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const isSolid = isScrolled || isOpen;

  return (
    <header className="sticky top-0 z-[100] w-full">
      <div
        className={`transition-all duration-300 ${isSolid ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Logo onClick={closeMobileMenu} />

          <DesktopNav pathname={pathname} />

          <div className="hidden items-center lg:flex">
            <BookNowButton />
          </div>

          <MobileMenuButton
            isOpen={isOpen}
            onToggle={() => setIsOpen((current) => !current)}
          />
        </div>
      </div>

      {isOpen && (
        <MobileNav
          pathname={pathname}
          openSection={openMobileSection}
          onToggleSection={(href) =>
            setOpenMobileSection((current) => (current === href ? null : href))
          }
          onCloseMobileMenu={closeMobileMenu}
        />
      )}
    </header>
  );
}



function Logo({ onClick }: { onClick?: () => void }): React.JSX.Element {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Trips To Marrakech home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={180}
        height={50}
        sizes="(max-width: 1023px) 112px, 144px"
        className="h-auto w-28 lg:w-36"
      />
    </Link>
  );
}

function BookNowButton({
  onClick,
}: {
  onClick?: () => void;
}): React.JSX.Element {
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="relative z-10">Book Your Trip</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"
      />
    </Link>
  );
}

function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? (
        <X className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

function DesktopNav({ pathname }: { pathname: string }): React.JSX.Element {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeDropdown = (): void => {
    setOpenDropdown(null);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 lg:flex"
    >
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(`${link.href}/`));

        if (!link.dropdown) {
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "text-accent" : "text-foreground hover:bg-muted hover:text-accent"}`}
            >
              {link.label}
            </Link>
          );
        }

        const isDropdownOpen = openDropdown === link.href;
        const dropdownId = createNavigationId("desktop-dropdown", link.href);

        return (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => setOpenDropdown(link.href)}
            onMouseLeave={closeDropdown}
            onBlur={(event) => {
              const nextFocusedElement = event.relatedTarget as Node | null;

              if (!event.currentTarget.contains(nextFocusedElement)) {
                closeDropdown();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                closeDropdown();
                event.stopPropagation();
                event.currentTarget
                  .querySelector<HTMLButtonElement>("button")
                  ?.focus();
              }
            }}
          >
            <button
              type="button"
              aria-expanded={isDropdownOpen}
              aria-controls={dropdownId}
              onClick={() =>
                setOpenDropdown((current) =>
                  current === link.href ? null : link.href,
                )
              }
              className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "text-accent" : "text-foreground hover:bg-muted hover:text-accent"}`}
            >
              {link.label}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full z-50 w-64 pt-2">
                <ul
                  id={dropdownId}
                  className="max-h-80 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl"
                >
                  {link.dropdown.map((item) => {
                    const isItemActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeDropdown}
                          aria-current={isItemActive ? "page" : undefined}
                          className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isItemActive ? "bg-muted text-accent" : "text-text-secondary hover:bg-muted hover:text-foreground"}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function MobileNav({
  pathname,
  openSection,
  onToggleSection,
  onCloseMobileMenu,
}: {
  pathname: string;
  openSection: string | null;
  onToggleSection: (href: string) => void;
  onCloseMobileMenu: () => void;
}): React.JSX.Element {
  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile navigation"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-card shadow-xl lg:hidden"
    >
      <ul className="flex flex-col gap-1 px-4 py-5">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(`${link.href}/`));

          if (!link.dropdown) {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onCloseMobileMenu}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-muted hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          const isSectionOpen = openSection === link.href;
          const sectionId = createNavigationId("mobile-section", link.href);

          return (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => onToggleSection(link.href)}
                aria-expanded={isSectionOpen}
                aria-controls={sectionId}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "bg-accent/10 text-accent" : "text-foreground hover:bg-muted"}`}
              >
                {link.label}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isSectionOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div id={sectionId} hidden={!isSectionOpen}>
                <ul className="mt-1 space-y-1">
                  {link.dropdown.map((item) => {
                    const isItemActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onCloseMobileMenu}
                          aria-current={isItemActive ? "page" : undefined}
                          className={`ml-4 block rounded-xl px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isItemActive ? "bg-muted text-accent" : "text-text-secondary hover:bg-muted hover:text-foreground"}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
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
