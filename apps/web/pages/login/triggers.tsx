import { ChartLineUp, Headset, Clock, Globe } from "@phosphor-icons/react";
import React from "react";
import { MiniTriggerProps } from "@/components/auth/MiniTrigger";
import { TranslationKey } from "@/i18n/types";

interface MiniTriggerType extends Omit<MiniTriggerProps, "title, desc"> {
  title: TranslationKey;
  desc: TranslationKey;
}

export const triggers: MiniTriggerType[] = [
  {
    title: "auth:trigger_1_title",
    desc: "auth:trigger_1_desc",
    icon: <ChartLineUp />,
  },
  {
    title: "auth:trigger_2_title",
    desc: "auth:trigger_2_desc",
    icon: <Headset />,
  },
  {
    title: "auth:trigger_3_title",
    desc: "auth:trigger_3_desc",
    icon: <Clock />,
  },
  {
    title: "auth:trigger_4_title",
    desc: "auth:trigger_4_desc",
    icon: <Globe />,
  },
];
