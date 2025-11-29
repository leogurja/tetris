import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Game } from "@/components/game";
import { Nav } from "@/components/nav";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <div className="flex h-screen flex-col overflow-y-hidden text-white">
      <Nav locale={locale} />
      <Game />
    </div>
  );
}
