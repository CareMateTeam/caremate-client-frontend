import en from "./en";
import th from "./th";
import type { Locale } from "../config";
import type { Dictionary } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { en, th };
export type { Dictionary };
