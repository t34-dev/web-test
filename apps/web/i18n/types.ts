// This file is auto-generated. Do not edit it manually
// Generated at 2024-11-10T13:03:53.461Z

export interface Translations {
  auth: {
    sign_desc: string;
    sign_footer_title: string;
    sign_h1: string;
    sign_or: string;
    trigger_1_desc: string;
    trigger_1_title: string;
    trigger_2_desc: string;
    trigger_2_title: string;
    trigger_3_desc: string;
    trigger_3_title: string;
    trigger_4_desc: string;
    trigger_4_title: string;
  };
  common: {
    agreement: string;
    back: string;
    continue: string;
    name: string;
    privacyLink: string;
    search: string;
    terms: string;
    termsLink: string;
    welcome: string;
  };
  default: {
    sign_in: string;
  };
  provider: {
    header_desc: string;
    header_h1: string;
    table_column1: string;
    table_column2: string;
    table_column3: string;
    trigger_1_desc: string;
    trigger_1_title: string;
    trigger_2_desc: string;
    trigger_2_title: string;
    trigger_3_desc: string;
    trigger_3_title: string;
  };
}

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

export type TranslationKey = Join<PathsToStringProps<Translations>, ":">;

export interface TranslationValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

export const SUPPORTED_NAMESPACES = ["auth", "common", "default", "provider"] as const;
export type Namespaces = (typeof SUPPORTED_NAMESPACES)[number];
