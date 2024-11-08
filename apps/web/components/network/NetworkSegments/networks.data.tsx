import React from "react";
import { SegmentedControlItem } from "@mantine/core";
import { Center } from "@mantine/core";

export const networksData: SegmentedControlItem[] = [
  {
    value: "All",
    label: (
      <Center style={{ gap: 10 }}>
        {/*<Globe style={{ width: rem(16), height: rem(16) }} />*/}
        <span>All</span>
      </Center>
    ),
  },
  {
    value: "Mainnet",
    label: (
      <Center style={{ gap: 10 }}>
        {/*<Rocket style={{ width: rem(16), height: rem(16) }} />*/}
        <span>Mainnet</span>
      </Center>
    ),
  },
  {
    value: "Testnet",
    label: (
      <Center style={{ gap: 10 }}>
        {/*<TestTube style={{ width: rem(16), height: rem(16) }} />*/}
        <span>Testnet</span>
      </Center>
    ),
  },
];
