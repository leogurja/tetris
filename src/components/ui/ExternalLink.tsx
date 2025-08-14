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
      href={href}
      className="flex items-center text-sm gap-0.5 opacity-70 hover:opacity-100 transition-opacity"
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ArrowCircleUpRightIcon size={16} />
    </a>
  );
}
