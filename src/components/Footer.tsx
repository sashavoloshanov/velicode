"use client";

import { useApp } from "@/lib/context";
import { GithubIcon, LinkedinIcon, InstagramIcon, ThreadsIcon } from "./Icons";

export default function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--color-text-secondary)]">&copy; {year} Velicode. {t.footer.rights}</span>
          <a href="/privacy" className="text-sm text-[var(--color-text-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--color-text)]">{t.footer.privacy}</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/sashavoloshanov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]" aria-label="GitHub"><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/company/velicode-app" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
          <a href="https://www.instagram.com/velicode.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]" aria-label="Instagram"><InstagramIcon size={18} /></a>
          <a href="https://www.threads.com/@velicode.app" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]" aria-label="Threads"><ThreadsIcon size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
