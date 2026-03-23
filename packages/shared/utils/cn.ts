// Simple utility for className merging (like clsx or tailwind-merge)
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
