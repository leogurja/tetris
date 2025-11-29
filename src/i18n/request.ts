import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale, locale }) => {
  const currentLocale = locale ?? (await requestLocale);
  if (!hasLocale(routing.locales, currentLocale)) notFound();

  return {
    locale: currentLocale as "en" | "pt",
    messages: (await import(`@messages/${currentLocale}.json`)).default,
  };
});
