"use client";

import { twMerge } from "tailwind-merge";

/**
 * Skeleton component - shadcn/ui inspired
 * Used for loading states and placeholder content
 */
export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={twMerge(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}
