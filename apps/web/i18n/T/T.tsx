import React, { ReactNode, ReactElement, FC } from "react";
import { TOptions } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { TranslationKey, TranslationValues } from "@/i18n/types";

interface TProps {
  k: TranslationKey;
  default?: string;
  params?: TranslationValues;
  html?: boolean;
  children?: ReactNode;
  components?: Record<string, ReactElement>;
  count?: number;
}

export const T: FC<TProps> = ({ k, default: defaultValue, params, html, children, count }) => {
  const { t } = useTranslation(k.split(":")[0]);

  if (children) {
    return (
      <Trans i18nKey={k} defaults={defaultValue} values={params} count={count}>
        {children}
      </Trans>
    );
  }

  const tOptions: TOptions = {
    defaultValue,
    ...(params && { ...params }),
    ...(count !== undefined && { count }),
  };

  const translation = t(k, tOptions);

  if (html) {
    return <span dangerouslySetInnerHTML={{ __html: translation }} />;
  }

  return <>{translation}</>;
};
