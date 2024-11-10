import { MantineProvider as BaseMantineProvider, createTheme, MantineColorsTuple } from "@mantine/core";
import React, { FC, PropsWithChildren } from "react";
import classes from "./ui.module.scss";

const myColor: MantineColorsTuple = [
  "#e6f5ff",
  "#d1e6fe",
  "#a4cbf7",
  "#73aef1",
  "#4b95eb",
  "#3286e9",
  "#237ee9",
  "#136cd0",
  "#0260bb",
  "#0052a6",
];

const theme = createTheme({
  colors: {
    myColor,
  },
  scale: 1.4,
  components: {
    Input: {
      classNames: {
        input: classes.Input__input,
      },
    },
  },
});

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseMantineProvider theme={{ ...theme }} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
};
