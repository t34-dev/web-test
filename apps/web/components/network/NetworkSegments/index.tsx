import React, { FC } from "react";
import { SegmentedControl, SegmentedControlItem } from "@mantine/core";
import { networksData } from "./networks.data";

interface NetworkSegmentsProps {
  value?: string;
  list?: SegmentedControlItem[];
  onChange: (val: string) => void;
}

export const NetworkSegments: FC<NetworkSegmentsProps> = ({ value, list = networksData, onChange }) => {
  return (
    <SegmentedControl
      fullWidth
      radius="xl"
      size="md"
      value={value ? value : networksData[0].value}
      data={list}
      onChange={onChange}
    />
  );
};
