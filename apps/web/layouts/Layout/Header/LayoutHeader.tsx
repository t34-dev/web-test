import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { useTranslation } from "react-i18next";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import { SwitcherLang } from "@/components/switchers/SwitcherLang";
import s from "./LayoutHeader.module.scss";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

export const LayoutHeader = () => {
  const {
    pageProps: { locale },
  } = usePageContext();
  const { ready } = useTranslation();
  const { user } = useUser();
  return (
    <div className={s.header}>
      <Container className={s.header__container}>
        <div className={s.header__logo}>
          <Link to="/">LOGO</Link>
          <SwitcherLang />
        </div>
        <div className={s.header__user}>
          <div className="mb-4">
            <p>i18n language: {locale}</p>
            <LanguageSwitcher />
            {!ready && <div>Loading...</div>}
          </div>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <SignedIn>
              <div>
                <UserButton />
                {user?.firstName && <div>{user.firstName}</div>}
              </div>
            </SignedIn>
          )}
        </div>
      </Container>
    </div>
  );
};
