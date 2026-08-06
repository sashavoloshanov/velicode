"use client";

import { useApp } from "@/lib/context";

const stackData = {
  mobile: [
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "SwiftUI", logo: "https://cdn.jsdelivr.net/gh/nicklama/custom-devicons/icons/swiftui/swiftui-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  ],
  crossPlatform: [
    { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ],
  backend: [
    { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ],
  web: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
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
        <div className="mt-10 space-y-8">
          {categories.map((cat) => (
            <div key={cat.key}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">{cat.label}</h3>
              <div className="flex flex-wrap gap-3">
                {stackData[cat.key].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5">
                    <img src={tech.logo} alt={tech.name} width={20} height={20} className="h-5 w-5 dark:brightness-0 dark:invert" loading="lazy" />
                    <span className="text-sm font-medium">{tech.name}</span>
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
