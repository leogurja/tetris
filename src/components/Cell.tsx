import type { ComponentProps } from "react";
import { cn } from "./utils/cn";

const variants = {
  i: "bg-sky-400",
  j: "bg-blue-600",
  l: "bg-orange-600",
  o: "bg-yellow-400",
  s: "bg-green-600",
  t: "bg-purple-600",
  z: "bg-red-600",
  p: "bg-neutral-800",
  "": "",
  upcoming: {
    i: "border-neutral-800 -translate-y-1/2",
    j: "border-neutral-800 translate-x-1/2 -translate-y-full",
    l: "border-neutral-800 translate-x-1/2 -translate-y-full",
    o: "border-neutral-800 -translate-y-full",
    t: "border-neutral-800 translate-x-1/2 -translate-y-full",
    s: "border-neutral-800 translate-x-1/2 -translate-y-full",
    z: "border-neutral-800 translate-x-1/2 -translate-y-full",
    p: "",
    "": "",
  },
} as const;

interface CellProps extends ComponentProps<"div"> {
  variant: keyof Omit<typeof variants, "upcoming">;
  upcoming?: boolean;
}

export function Cell({ className, variant, upcoming = false, ...rest }: CellProps) {
  return (
    <div
      className={cn(
        `aspect-square ${variants[variant]}`,
        upcoming ? `border-transparent flex border border-collapse ${variants.upcoming[variant]}` : "w-full",
        className,
      )}
      {...rest}
    />
  );
}
