// This file is auto-generated. Do not edit it manually
// Generated at 2024-11-04T13:15:09.490Z

export interface Translations {
  common: {
    agreement: string;
    name: string;
    privacyLink: string;
    terms: string;
    termsLink: string;
    welcome: string;
  };
  default: {
    sign_in: string;
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

export const SUPPORTED_NAMESPACES = ["common", "default"] as const;
export type Namespaces = (typeof SUPPORTED_NAMESPACES)[number];
