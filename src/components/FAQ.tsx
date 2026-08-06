"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.faq.heading}</h2>
        <div className="mt-10 space-y-3">
          {t.faq.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
                <span className="pr-4 font-medium">{item.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-[var(--color-text-secondary)] transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="leading-relaxed text-[var(--color-text-secondary)]">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
