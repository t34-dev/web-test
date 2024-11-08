import React, { FC, useState } from "react";
import { viewData } from "./view.data";
import { SwitcherView } from "@/components/switchers/SwitcherView";

export const SwitcherViewWidget: FC = () => {
  const [viewValue, setViewValue] = useState("list");
  return <SwitcherView value={viewValue} list={viewData} onChange={(val) => setViewValue(val)} />;
};
