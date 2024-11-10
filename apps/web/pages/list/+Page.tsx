import React, { useState } from "react";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { BlockchainList } from "./BlockchainList";
import { PageHeader } from "@/components/headers/PageHeader";

export default function Page() {
  return (
    <section className={s.wrap}>
      <Container className={s.wrap__in}>
        <PageHeader
          title={"Network List"}
          desc="Fastest, free-est, and privacy first RPC endpoints for 95 blockchains. Connect reliably to Web3 with ease!"
        />

        <BlockchainList />
      </Container>
    </section>
  );
}
