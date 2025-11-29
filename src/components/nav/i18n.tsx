"use client";
import { useLocale } from "next-intl";
import BrazilFlag from "@/assets/flags/brazil.svg";
import UsaFlag from "@/assets/flags/usa.svg";
import { Link } from "@/i18n/navigation";
import { Flag } from "./flag";

export function I18n() {
  const locale = useLocale();
  return (
    <div className="flex gap-3">
      <Link href="/" locale="pt">
        <Flag image={BrazilFlag} isSelected={locale === "pt"} />
      </Link>
      <Link href="/" locale="en">
        <Flag image={UsaFlag} isSelected={locale === "en"} />
      </Link>
    </div>
  );
}
