import React, { useState } from "react";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { InformerProviderWidget } from "@/widgets/informer/InformerProvider";
import { NetworkSegments } from "@/components/network/NetworkSegments";
import { CloseButton, Input } from "@mantine/core";
import { BlockchainTable } from "@/components/network/BlockchainTable";

export default function Page() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [networkValue, setNetworkValue] = useState("");
  return (
    <section className={s.wrap}>
      <Container className={s.wrap__in}>
        <div className={s.wrap__in}>
          <header className={s.header}>
            <h1 className={s.header__h1}>RPC Endpoints</h1>
            <div className={s.header__desc}>
              Fastest, free-est, and privacy first RPC endpoints for 95 blockchains. Connect reliably to Web3 with ease!
            </div>
          </header>
          <InformerProviderWidget />
          <div className={s.filters}>
            <div className={s.filters__network}>
              <NetworkSegments
                value={networkValue}
                onChange={(val) => {
                  setNetworkValue(val);
                }}
              />
            </div>
            <div className={s.filters__search}>
              <Input
                className={s.email__emailInput}
                placeholder="Email"
                error={!!error}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                size="lg"
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
          <div className={s.content}>
            <BlockchainTable />
          </div>
        </div>
      </Container>
    </section>
  );
}
