import React from "react";
import s from "./InformerProvider.module.scss";
import { InformerItem } from "@/widgets/informer/InformerProvider/InformerItem";
import { informersData } from "@/widgets/informer/InformerProvider/informers.data";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";

export const InformerProviderWidget = () => {
  const { t, formatNumber } = useTypedTranslation();
  return (
    <section className={s.wrap}>
      {informersData.map((elem) => (
        <InformerItem
          key={elem.title}
          title={t(elem.title)}
          desc={t(elem.desc)}
          value={`${formatNumber(elem.value)}${elem.proc ? "%" : ""}`}
        />
      ))}
    </section>
  );
};
