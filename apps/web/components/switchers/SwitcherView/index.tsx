import React, { FC } from "react";
import { SegmentedControl, SegmentedControlItem } from "@mantine/core";
import s from "./SwitcherView.module.scss";

interface SwitcherViewProps {
  value: string;
  list: SegmentedControlItem[];
  onChange: (val: string) => void;
}

export const SwitcherView: FC<SwitcherViewProps> = ({ value, list, onChange }) => {
  return (
    <SegmentedControl
      fullWidth
      radius="xl"
      size="xl"
      value={value}
      data={list}
      onChange={onChange}
      className={s.wrap}
    />
  );
};
