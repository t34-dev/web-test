import { MantineProvider as BaseMantineProvider, createTheme } from "@mantine/core";
import React, { FC, PropsWithChildren } from "react";
import classes from "./ui.module.scss";

const theme = createTheme({
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
