// src/lib/utils.js 或 src/lib/utils.ts

export function cn(...args: any[]) {
  return args.filter(Boolean).join(" ");
}
