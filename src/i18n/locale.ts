import { createSignal } from "solid-js";

export type Locale = "en" | "pt";
export const [locale, setLocale] = createSignal<Locale>("en");
