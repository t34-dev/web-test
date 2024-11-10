import React, { useCallback, useState } from "react";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { InformerProviderWidget } from "@/widgets/informer/InformerProvider";
import { SwitcherNetwork } from "@/components/switchers/SwitcherNetwork";
import { CloseButton, Input } from "@mantine/core";
import { StyledTable } from "@/components/network/StyledTable";
import { PageHeader } from "@/components/headers/PageHeader";
import { SwitcherViewWidget } from "@/widgets/switcher/SwitcherViewWidget";
import { useScrollStore } from "@/store/scrollStore";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";

export default function Page() {
  const { t } = useTypedTranslation();
  const { scrollTo, scrollRef } = useScrollStore();

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [networkValue, setNetworkValue] = useState("");

  const handleNetworkSwitch = useCallback(
    (val: string) => {
      const elementId = document.getElementById("content-endpoints");
      if (elementId) {
        const scrollTop = scrollRef?.scrollTop || 0;
        const rect = elementId.getBoundingClientRect();
        if (rect?.top <= 0) {
          const sum = scrollTop + rect?.top;
          scrollTo({ top: sum });
        }
      }
      setNetworkValue(val);
    },
    [scrollRef],
  );
  return (
    <section className={s.wrap}>
      <div className={s.wrap__in}>
        <div className={s.bg}>
          <div className={s.bg__inTop}>
            <Container className={s.bg__inTopIn}>
              <PageHeader title={t("provider:header_h1")} desc={t("provider:header_desc")} />
              <InformerProviderWidget />
            </Container>
          </div>
        </div>
        <div id="content-endpoints" />
        <div className={s.filters}>
          <Container className={s.bg__inBottomIn}>
            <div className={s.filters__in}>
              <div className={s.filters__left}>
                <div className={s.filters__network}>
                  <SwitcherNetwork value={networkValue} onChange={handleNetworkSwitch} />
                </div>
                <div className={s.filters__search}>
                  <Input
                    className={s.email__emailInput}
                    placeholder={t("common:search")}
                    error={!!error}
                    value={search}
                    radius={"xl"}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    size="md"
                    rightSectionPointerEvents="all"
                    rightSection={
                      <CloseButton
                        aria-label="Clear input"
                        onClick={() => {
                          setSearch("");
                          setError("");
                        }}
                        style={{ display: search ? undefined : "none" }}
                      />
                    }
                  />
                </div>
              </div>
              <div className={s.filters__right}>
                <SwitcherViewWidget />
              </div>
            </div>
          </Container>
        </div>

        <Container className={s.content}>
          {/*<BlockchainTable />*/}
          <StyledTable key={networkValue} />
        </Container>
      </div>
    </section>
  );
}
