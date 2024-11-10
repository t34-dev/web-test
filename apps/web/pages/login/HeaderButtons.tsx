import React, { useMemo } from "react";
import { Button, Anchor, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowLeft } from "@phosphor-icons/react";
import s from "./HeaderButtons.module.scss";
import { LanguageSelector } from "@/widgets/language";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";
import { getLanguageData } from "@/i18n/constants";
import { usePageContext } from "vike-react/usePageContext";
import clsx from "clsx";
import { T } from "@/i18n/T/T";
import { ModalX } from "@/components/modals/Modal";
import { CustomLayout } from "@/components/modals/Modal/layouts";

export function HeaderButtons() {
  const { isClientSideNavigation } = usePageContext();
  const { language, changeLocale } = useTypedTranslation();
  const [leftModalOpened, { open: openLeft, close: closeLeft }] = useDisclosure(false);

  const langData = useMemo(() => {
    return getLanguageData(language);
  }, [language]);
  return (
    <div className={s.wrap}>
      <div className={s.wrap__left}>
        <Anchor
          className={clsx(s.backBtn, !isClientSideNavigation && s.backBtnDisabled)}
          onClick={() => (isClientSideNavigation ? window.history.back() : {})}
        >
          <ArrowLeft size={16} />
          <T k={"common:back"} />
        </Anchor>{" "}
      </div>
      <div className={s.wrap__right}>
        <Button
          leftSection={<img src={langData.url} alt={`${langData.label} flag`} />}
          className={s.languageBtn}
          onClick={openLeft}
          data-active={leftModalOpened}
        >
          {langData.label}
        </Button>
      </div>

      <ModalX
        opened={leftModalOpened}
        onClose={closeLeft}
        variant="center"
        // layout={CustomLayout}
        // layoutProps={{
        //   title: "Custom Title!dsd",
        //   showCloseButton: false,
        // }}
      >
        <div style={{ padding: 20 }}>
          <LanguageSelector
            languageCode={language}
            onClick={(code) => {
              changeLocale(code);
              closeLeft();
            }}
          />
        </div>
      </ModalX>
      {/*<Modal opened={leftModalOpened} onClose={closeLeft} title="Languages" centered>*/}
      {/*  <LanguageSelector*/}
      {/*    languageCode={language}*/}
      {/*    onClick={(code) => {*/}
      {/*      changeLocale(code);*/}
      {/*      closeLeft();*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Modal>*/}
    </div>
  );
}
