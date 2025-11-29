import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import GitHubIcon from "@/assets/github.svg";
import { ExternalLink } from "@/components/ui/external-link";
import { I18n } from "./i18n";

interface NavProps {
  locale: Locale;
}

export async function Nav({ locale }: NavProps) {
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <nav className="flex items-center border-b border-b-neutral-700 p-3 px-6">
      <h1 className="font-bold text-lg">Tetris</h1>

      <div className="ml-auto flex items-center gap-5">
        <ExternalLink href="https://gurgel.io">{t("portfolio")}</ExternalLink>
        <ExternalLink href="https://github.com/gurgelio/tetris">
          <Image
            alt="GitHub"
            className="mr-0.5 w-4"
            height={16}
            src={GitHubIcon.src}
            width={16}
          />
          {t("sourceCode")}
        </ExternalLink>
        <I18n />
      </div>
    </nav>
  );
}
