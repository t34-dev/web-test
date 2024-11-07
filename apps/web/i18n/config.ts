import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// imports
import common_en from "./locales/en/common.json";
import common_ru from "./locales/ru/common.json";
import default_en from "./locales/en/default.json";
import default_ru from "./locales/ru/default.json";
import auth_en from "./locales/en/auth.json";
import auth_ru from "./locales/ru/auth.json";
import { DEFAULT_LANG, DEFAULT_NAMESPACE, SUPPORTED_LANGS, SUPPORTED_NAMESPACES } from "@/i18n/constants";

let i18 = i18n.createInstance();

export function createI18nInstance(initialLocale: string = DEFAULT_LANG) {
  i18 = i18n.createInstance();

  if (!i18.isInitialized) {
    i18.use(initReactI18next).init({
      resources: {
        en: {
          common: common_en,
          default: default_en,
          auth: auth_en,
        },
        ru: {
          common: common_ru,
          default: default_ru,
          auth: auth_ru,
        },
      },
      lng: initialLocale, // Устанавливаем начальный язык
      fallbackLng: "en",
      ns: SUPPORTED_NAMESPACES,
      defaultNS: DEFAULT_NAMESPACE,
      supportedLngs: SUPPORTED_LANGS,
      detection: {
        order: ["path", "localStorage", "navigator"],
        lookupFromPathIndex: 0,
        caches: ["localStorage"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
        bindI18n: "languageChanged loaded",
        bindI18nStore: "added removed",
        transEmptyNodeValue: "",
      },
    });
  }

  return i18;
}
export { i18 };
// Экспортируем функцию создания инстанса по умолчанию с английским языком
export default createI18nInstance(DEFAULT_LANG);
