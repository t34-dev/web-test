// T.tsx
import React, { ReactNode, ReactElement } from "react";
import { TOptions } from "i18next";
import { Trans, useTranslation } from "react-i18next";

interface TranslationValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

interface TProps<TKeys extends string = string> {
  k: TKeys;
  default?: string;
  params?: TranslationValues;
  html?: boolean;
  children?: ReactNode;
  components?: Record<string, ReactElement>;
  count?: number;
}

export function T<TKeys extends string = string>({
  k,
  default: defaultValue,
  params,
  html,
  children,
  count,
}: TProps<TKeys>): JSX.Element {
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
}
