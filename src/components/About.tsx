"use client";

import { useApp } from "@/lib/context";
import { Smartphone, Globe, Zap } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function About() {
  const { t } = useApp();

  const facts = [
    { icon: <Smartphone size={20} />, value: "4+", label: t.about.facts.apps },
    { icon: <Globe size={20} />, value: t.about.facts.platforms, label: "" },
    { icon: <Zap size={20} />, value: t.about.facts.focus, label: "" },
  ];

  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.heading}</h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">{t.about.bio}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          {facts.map((fact, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3">
              <span className="text-[var(--color-accent)]">{fact.icon}</span>
              <span className="text-sm font-medium">{fact.value}{fact.label ? ` ${fact.label}` : ""}</span>
            </div>
          ))}
        </div>
        <a href="https://github.com/sashavoloshanov" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]">
          <GithubIcon size={16} />
          {t.about.github}
        </a>
      </div>
    </section>
  );
}
