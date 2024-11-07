import React, { FC } from "react";
import { UnstyledButton } from "@mantine/core";
import s from "./LanguageSelector.module.scss";
import clsx from "clsx";
import { getLanguageData, languagesData } from "@/i18n/constants";

interface LanguageSelectorProps {
  languageCode: string;
  onClick: (code: string) => void;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ languageCode, onClick }) => {
  return (
    <div className={s.grid}>
      {languagesData.map((lang) => {
        const langData = getLanguageData(lang.code);
        return (
          <UnstyledButton
            key={lang.code}
            className={clsx(s.langButton, languageCode === lang.code && s.langButtonActive)}
            onClick={() => onClick(lang.code)}
          >
            <img src={langData.url} alt={`${langData.label} flag`} />
            <span>{langData.label}</span>
          </UnstyledButton>
        );
      })}
    </div>
  );
};
