"use client";

import { useApp } from "@/lib/context";
import { Clock, Globe } from "lucide-react";
import { GithubIcon, AppleIcon, AndroidIcon } from "./Icons";
import { platformBadgeStyles, platformButtonStyles, platformStoreLabel, type Platform } from "@/lib/platforms";

function StoreIcon({ platform }: { platform: string }) {
  if (platform === "iOS" || platform === "macOS") return <AppleIcon size={16} />;
  if (platform === "Android") return <AndroidIcon size={16} />;
  return <Globe size={16} />;
}

export default function Projects() {
  const { t } = useApp();

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.projects.heading}</h2>
        <div className="mt-10 space-y-8">
          {t.projects.items.map((project, i) => (
            <article key={i} className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition-shadow hover:shadow-lg">
              {"image" in project && project.image && (
                <div className="w-full bg-[var(--color-bg-secondary)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.name} className="h-auto w-full object-contain" loading="lazy" />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{project.name}</h3>
                      {Boolean((project as { comingSoon?: boolean }).comingSoon) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <Clock size={12} />
                          {t.projects.comingSoon}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.platforms.map((p) => (
                        <span key={p} className={`rounded-md px-2 py-0.5 text-xs font-medium ${platformBadgeStyles[p as Platform] ?? "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"}`}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {"links" in project &&
                      project.links.map((link) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${platformButtonStyles[link.platform as Platform] ?? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]"}`}>
                          <StoreIcon platform={link.platform} />
                          {platformStoreLabel[link.platform as Platform] ?? t.projects.viewStore}
                        </a>
                      ))}
                    {"githubUrl" in project && project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-secondary)]">
                        <GithubIcon size={14} />
                        {t.projects.viewGithub}
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">{project.description}</p>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="font-medium text-[var(--color-text)]">Stack:</span> {project.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
