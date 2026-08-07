export type Platform = "iOS" | "Android" | "Web" | "macOS";

export const platformBadgeStyles: Record<Platform, string> = {
  iOS: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  Android: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Web: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  macOS: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
};

export const platformButtonStyles: Record<Platform, string> = {
  iOS: "bg-blue-500 hover:bg-blue-600",
  Android: "bg-emerald-500 hover:bg-emerald-600",
  Web: "bg-amber-500 hover:bg-amber-600",
  macOS: "bg-purple-500 hover:bg-purple-600",
};

export const platformToggleStyles: Record<Platform, { active: string; inactive: string }> = {
  iOS: {
    active: "bg-blue-500 border-blue-500 text-white",
    inactive: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-blue-500/50",
  },
  Android: {
    active: "bg-emerald-500 border-emerald-500 text-white",
    inactive: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-emerald-500/50",
  },
  Web: {
    active: "bg-amber-500 border-amber-500 text-white",
    inactive: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-amber-500/50",
  },
  macOS: {
    active: "bg-purple-500 border-purple-500 text-white",
    inactive: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-purple-500/50",
  },
};

export const platformStoreLabel: Record<Platform, string> = {
  iOS: "App Store",
  Android: "Google Play",
  Web: "Website",
  macOS: "Mac App Store",
};
