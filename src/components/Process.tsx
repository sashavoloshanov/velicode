"use client";

import { useApp } from "@/lib/context";

export default function Process() {
  const { t } = useApp();

  return (
    <section id="process" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.process.heading}</h2>
        <div className="mt-10 space-y-0">
          {t.process.steps.map((step, i) => (
            <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
              {i < t.process.steps.length - 1 && (
                <div className="absolute left-[15px] top-[40px] h-[calc(100%-24px)] w-px bg-[var(--color-border)]" />
              )}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">{i + 1}</div>
              <div className="pt-0.5">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-[var(--color-text-secondary)]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
