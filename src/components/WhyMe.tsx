"use client";

import { useApp } from "@/lib/context";
import { MessageCircle, Shield, Headphones } from "lucide-react";

const icons = [
  <MessageCircle key="mc" size={24} />,
  <Shield key="sh" size={24} />,
  <Headphones key="hp" size={24} />,
];

export default function WhyMe() {
  const { t } = useApp();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.why.heading}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.why.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <span className="inline-flex rounded-xl bg-[var(--color-bg-secondary)] p-3 text-[var(--color-accent)]">{icons[i]}</span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
