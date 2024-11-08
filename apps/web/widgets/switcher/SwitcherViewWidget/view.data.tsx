import React from "react";
import { Center, SegmentedControlItem } from "@mantine/core";
import { SquaresFour, List } from "@phosphor-icons/react";

export const viewData: SegmentedControlItem[] = [
  {
    value: "list",
    label: (
      <Center>
        <List size={16} weight="bold" />
      </Center>
    ),
  },
  {
    value: "grid",
    label: (
      <Center>
        <SquaresFour size={16} weight="bold" />
      </Center>
    ),
  },
];
