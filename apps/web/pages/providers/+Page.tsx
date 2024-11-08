import React, { useState } from "react";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { InformerProviderWidget } from "@/widgets/informer/InformerProvider";
import { SwitcherNetwork } from "@/components/switchers/SwitcherNetwork";
import { CloseButton, Input } from "@mantine/core";
import { StyledTable } from "@/components/network/StyledTable";
import { PageHeader } from "@/components/headers/PageHeader";
import { SwitcherViewWidget } from "@/widgets/switcher/SwitcherViewWidget";

export default function Page() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [networkValue, setNetworkValue] = useState("");
  return (
    <section className={s.wrap}>
      <Container className={s.wrap__in}>
        <div className={s.wrap__in}>
          <PageHeader
            title={"RPC Endpoints"}
            desc="Fastest, free-est, and privacy first RPC endpoints for 95 blockchains. Connect reliably to Web3 with ease!"
          />
          <InformerProviderWidget />
          <div className={s.filters}>
            <div className={s.filters__left}>
              <div className={s.filters__network}>
                <SwitcherNetwork
                  value={networkValue}
                  onChange={(val) => {
                    setNetworkValue(val);
                  }}
                />
              </div>
              <div className={s.filters__search}>
                <Input
                  className={s.email__emailInput}
                  placeholder="Search"
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
          <div className={s.content}>
            {/*<BlockchainTable />*/}
            <StyledTable key={networkValue} />
          </div>
        </div>
      </Container>
    </section>
  );
}
