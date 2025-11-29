"use client";
import { ArrowCircleUpRightIcon } from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";

interface ExternalLinkProps {
  href: string;
}

export function ExternalLink({
  href,
  children,
}: PropsWithChildren<ExternalLinkProps>) {
  return (
    <a
      className="flex items-center gap-0.5 text-sm opacity-70 transition-opacity hover:opacity-100"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ArrowCircleUpRightIcon size={16} />
    </a>
  );
}
