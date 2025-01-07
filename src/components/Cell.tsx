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
} as const;

interface CellProps extends ComponentProps<"div"> {
  variant: keyof typeof variants;
}

export function Cell({ className, variant, ...rest }: CellProps) {
  return <div className={cn(`w-full aspect-square ${variants[variant]}`, className)} {...rest} />;
}
