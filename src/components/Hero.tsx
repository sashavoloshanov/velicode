"use client";

import { useApp } from "@/lib/context";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        {t.hero.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--color-text-secondary)] sm:text-xl">
        {t.hero.subtitle}
      </p>
      <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">
        {t.hero.cta}
      </a>
      <a href="#about" className="mt-16 animate-bounce text-[var(--color-text-secondary)]" aria-label="Scroll down">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
