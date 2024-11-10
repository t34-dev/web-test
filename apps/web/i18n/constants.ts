export type Language = {
  code: string;
  label: string;
};

export const languagesData: Language[] = [
  { code: "en", label: "English" },
  // { code: "fr", label: "Français" },
  // { code: "de", label: "Deutsch" },
  // { code: "es", label: "Español" },
  { code: "ru", label: "Русский" },
];

export const getLanguageData = (code: string) => {
  const elem = languagesData.find((elem) => elem.code === code) ?? languagesData[0];
  return {
    url: `/flags/${elem.code}.svg`,
    label: elem.label,
  };
};

export const SUPPORTED_NAMESPACES = ["common", "default", "auth", "provider"] as const;
export type Namespaces = (typeof SUPPORTED_NAMESPACES)[number];
export const DEFAULT_NAMESPACE: Namespaces = "common";

export const SUPPORTED_LANGS = languagesData.map((elem) => elem.code);
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";
