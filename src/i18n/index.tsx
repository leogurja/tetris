import { type Flatten, flatten, translator } from "@solid-primitives/i18n";
import { createResource } from "solid-js";
import type * as en from "./dictionaries/en";
import { type Locale, locale } from "./locale";

export type RawDictionary = typeof en.dict;
export type Dictionary = Flatten<RawDictionary>;

async function fetchDictionary(locale: Locale) {
  const dict: RawDictionary = (await import(`./dictionaries/${locale}.ts`)).dict;
  return flatten(dict);
}

export function createTranslator() {
  const [dict] = createResource(locale, fetchDictionary);

  return translator(dict);
}
