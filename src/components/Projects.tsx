"use client";

import { useApp } from "@/lib/context";
import { ExternalLink, Clock } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Projects() {
  const { t } = useApp();

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.projects.heading}</h2>
        <div className="mt-10 space-y-8">
          {t.projects.items.map((project, i) => (
            <article key={i} className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-shadow hover:shadow-lg sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    {"comingSoon" in project && project.comingSoon && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        <Clock size={12} />{t.projects.comingSoon}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.platforms.map((p) => (
                      <span key={p} className="rounded-md bg-[var(--color-bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)]">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {"storeUrl" in project && project.storeUrl && (
                    <a href={project.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]">
                      <ExternalLink size={14} />{t.projects.viewStore}
                    </a>
                  )}
                  {"demoUrl" in project && project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]">
                      <ExternalLink size={14} />{t.projects.viewDemo}
                    </a>
                  )}
                  {"githubUrl" in project && project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-secondary)]">
                      <GithubIcon size={14} />{t.projects.viewGithub}
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">{project.description}</p>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                <span className="font-medium text-[var(--color-text)]">Stack:</span> {project.stack}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
