import { TranslationKey } from "@/i18n/types";

interface InformerItemType {
  title: TranslationKey;
  desc: TranslationKey;
  value: number;
  proc?: boolean;
}

export const informersData: InformerItemType[] = [
  {
    title: "provider:trigger_1_title",
    desc: "provider:trigger_1_desc",
    value: 3798945.6,
  },
  {
    title: "provider:trigger_2_title",
    desc: "provider:trigger_2_desc",
    value: 35.66,
    proc: true,
  },
  {
    title: "provider:trigger_3_title",
    desc: "provider:trigger_3_desc",
    value: 43.96,
  },
];
