"use client";

import { useSyncExternalStore } from "react";

/**
 * Colour theme control. "System" follows the device setting; "Light" and
 * "Dark" override it. The choice is stored in localStorage and applied as
 * data-theme on <html> (see the inline script in layout.tsx, which applies
 * it before first paint).
 */
type Mode = "system" | "light" | "dark";

const KEY = "theme";
const EVENT = "themechange";
const order: Mode[] = ["system", "light", "dark"];
const labels: Record<Mode, string> = { system: "System", light: "Light", dark: "Dark" };

function read(): Mode {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function apply(mode: Mode) {
  const root = document.documentElement;
  try {
    if (mode === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {
    /* storage unavailable: the choice lasts for this page view */
  }
  if (mode === "system") delete root.dataset.theme;
  else root.dataset.theme = mode;
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, read, () => "system" as Mode);
  const next = order[(order.indexOf(mode) + 1) % order.length];

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={`Colour theme: ${labels[mode]}. Switch to ${labels[next]}.`}
      title={`Theme: ${labels[mode]}`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {mode === "light" && (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 2.5v1.5M10 16v1.5M2.5 10H4M16 10h1.5M4.7 4.7l1 1M14.3 14.3l1 1M4.7 15.3l1-1M14.3 5.7l1-1" />
          </>
        )}
        {mode === "dark" && <path d="M16.5 12.2A6.5 6.5 0 0 1 7.8 3.5a6.5 6.5 0 1 0 8.7 8.7z" />}
        {mode === "system" && (
          <>
            <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
            <path d="M7 16.5h6M10 13.5v3" />
          </>
        )}
      </svg>
    </button>
  );
}
