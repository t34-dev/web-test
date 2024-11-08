import { TranslationKey } from "@/i18n/types";

interface InformerItemType {
  title: TranslationKey;
  desc: TranslationKey;
  value: number;
  proc?: boolean;
}

export const informersData: InformerItemType[] = [
  {
    title: "auth:trigger_1_title",
    desc: "auth:trigger_1_desc",
    value: 3798945.6,
  },
  {
    title: "auth:trigger_2_title",
    desc: "auth:trigger_2_desc",
    value: 35.66,
    proc: true,
  },
  {
    title: "auth:trigger_3_title",
    desc: "auth:trigger_3_desc",
    value: 43.96,
  },
];
