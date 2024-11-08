import React, { FC } from "react";
import { SegmentedControl, SegmentedControlItem } from "@mantine/core";
import { useThrottledCallback } from "@mantine/hooks";
import s from "./SwitcherView.module.scss";

interface SwitcherViewProps {
  value: string;
  list: SegmentedControlItem[];
  onChange?: (val: string) => void;
  onClick: () => void;
}

export const SwitcherView: FC<SwitcherViewProps> = ({ value, list, onChange, onClick }) => {
  const throttledClick = useThrottledCallback(onClick, 200);
  return (
    <div onClick={throttledClick} className={s.wrap}>
      <SegmentedControl
        fullWidth
        radius="xl"
        size="xl"
        value={value}
        data={list}
        onChange={onChange}
        className={s.wrap__elem}
      />
    </div>
  );
};
