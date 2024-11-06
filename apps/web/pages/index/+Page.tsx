import React from "react";
import { Counter } from "./Counter.js";
import { Button } from "@mantine/core";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";

export default function Page() {
  return (
    <div className={s.wrap}>
      <Container className={s.wrap__in}>
        <h1>My Vike app</h1>
        This page is:
        <ul>
          <li>Rendered to HTML.</li>
          <li>
            Interactive. <Counter />
          </li>
        </ul>
        <hr />
        <Button>Test</Button>
        <br />
        <Button variant="filled" size="md" radius="xl">
          Button
        </Button>
      </Container>
    </div>
  );
}
