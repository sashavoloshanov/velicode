"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Header() {
  const { t, theme, setTheme, locale, setLocale } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#stack", label: t.nav.stack },
    { href: "#process", label: t.nav.process },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight">Velicode</a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]">{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setLocale(locale === "en" ? "ua" : "en")} className="rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--color-bg-secondary)]" aria-label="Switch language">
            {locale === "en" ? "UA" : "EN"}
          </button>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="rounded-lg border border-[var(--color-border)] p-2 transition-colors hover:bg-[var(--color-bg-secondary)]" aria-label="Toggle theme">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-[var(--color-border)] p-2 transition-colors hover:bg-[var(--color-bg-secondary)] md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]">{item.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
