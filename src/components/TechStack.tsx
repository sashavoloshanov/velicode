"use client";

import { useApp } from "@/lib/context";
import { Layers3 } from "lucide-react";
import type { ReactNode } from "react";

type Tech = { name: string; subtitle: string; logo?: string; icon?: ReactNode };

const stackData: Record<string, Tech[]> = {
  mobile: [
    { name: "Swift", subtitle: "Native iOS development", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "SwiftUI", subtitle: "Modern declarative UI", icon: <Layers3 size={28} className="text-blue-500" /> },
    { name: "Kotlin", subtitle: "Native Android development", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  ],
  crossPlatform: [
    { name: "React Native", subtitle: "One codebase, iOS & Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ],
  backend: [
    { name: "Supabase", subtitle: "Postgres backend & auth", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Vercel", subtitle: "Serverless functions & hosting", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Firebase", subtitle: "Realtime data & push notifications", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ],
  web: [
    { name: "React", subtitle: "Component-based UI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", subtitle: "Full-stack React framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", subtitle: "Type-safe JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Vite", subtitle: "Fast build tooling", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  ],
};

export default function TechStack() {
  const { t } = useApp();

  const categories = [
    { key: "mobile" as const, label: t.stack.categories.mobile },
    { key: "crossPlatform" as const, label: t.stack.categories.crossPlatform },
    { key: "backend" as const, label: t.stack.categories.backend },
    { key: "web" as const, label: t.stack.categories.web },
  ];

  return (
    <section id="stack" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.stack.heading}</h2>
        <div className="mt-10 space-y-10">
          {categories.map((cat) => (
            <div key={cat.key}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">{cat.label}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {stackData[cat.key].map((tech) => (
                  <div key={tech.name} className="flex flex-col items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-shadow hover:shadow-md">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm">
                      {tech.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={tech.logo} alt={tech.name} width={36} height={36} className="h-full w-full object-contain" loading="lazy" />
                      ) : (
                        tech.icon
                      )}
                    </div>
                    <div>
                      <div className="text-base font-semibold">{tech.name}</div>
                      <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{tech.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
