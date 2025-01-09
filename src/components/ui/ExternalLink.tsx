import { ArrowCircleUpRight } from "phosphor-solid";
import type { JSXElement } from "solid-js";

interface ExternalLinkProps {
  href: string;
  children: JSXElement;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      class="flex items-center text-sm gap-0.5 opacity-70 hover:opacity-100 transition-opacity"
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ArrowCircleUpRight size={16} />
    </a>
  );
}
