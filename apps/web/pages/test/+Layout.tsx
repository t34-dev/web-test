import React, { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="test-layout">
      <header>Test Header</header>
      <main>{children}</main>
      <footer>Test Footer</footer>
    </div>
  );
};
