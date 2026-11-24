"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { nav, pilotHref } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      // Keep focus inside the open menu (toggle button + panel links).
      if (e.key === "Tab" && panelRef.current) {
        const items = [
          toggleRef.current,
          ...panelRef.current.querySelectorAll<HTMLElement>("a"),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Exact page match only (so /saakshi/pilot/ marks "Pilot", not "Saakshi").
  // Section links (with #) are never marked as the current page.
  const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
  const isActive = (href: string) => !href.includes("#") && strip(pathname) === strip(href);
  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--header-h)] border-b bg-surface/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled || open ? "border-line shadow-[0_1px_8px_rgba(16,24,39,0.06)]" : "border-line"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                    isActive(item.href) ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-[0.95rem] h-0.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={pilotHref}
            className="hidden min-h-10 items-center rounded-lg bg-accent px-4 text-[0.95rem] font-medium text-on-accent transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Discuss a pilot
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-line bg-surface lg:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-10 pt-2">
          <ul className="divide-y divide-line border-b border-line">
            <li>
              <Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined} className="flex items-center justify-between py-4 text-xl font-medium">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 text-xl font-medium ${
                    isActive(item.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-subtle">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href={pilotHref}
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 font-medium text-on-accent hover:bg-accent-hover"
            >
              Discuss a Saakshi pilot
            </Link>
            <Link
              href="/contact/?topic=project"
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line-strong px-5 font-medium text-ink"
            >
              Discuss a software project
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
