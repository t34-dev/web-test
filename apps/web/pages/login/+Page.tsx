import React from "react";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import CustomSignIn from "../../components/AuthForm2/AuthForm2";
import { AuthForm } from "@/components/AuthForm/AuthForm";
import { LoginContent } from "@/layouts/contents/LoginContent";
import { LoginFormWidget } from "@/widgets/auth/LoginForm";
import s from "./Login.module.scss";
import { Place } from "@/types/place";
import { triggersData } from "@/pages/login/triggers.data";
import { MiniTrigger } from "@/components/auth/MiniTrigger";
import { Logo } from "@/components/logo/Logo";
import { Button } from "@mantine/core";
import { HeaderButtons } from "./HeaderButtons";
import { motion } from "framer-motion";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";

export const transition = {
  type: "spring",
  duration: 0.2,
  bounce: 0.2,
  stiffness: 50,
  damping: 9,
  mass: 0.5,
};
export default function Page() {
  const { t } = useTypedTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -60 },
    show: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  const triggerVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition,
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  return (
    <LoginContent
      mode={Place.LOGIN}
      leftComponent={
        <motion.section className={s.wrap} variants={containerVariants} initial="hidden" animate="show">
          <motion.header className={s.header} variants={headerVariants}>
            <Logo />
          </motion.header>

          <motion.section className={s.content}>
            {triggersData.map((trigger, index) => (
              <motion.div key={trigger.title} variants={triggerVariants} custom={index}>
                <MiniTrigger {...trigger} title={t(trigger.title)} desc={t(trigger.desc)} />
              </motion.div>
            ))}
          </motion.section>

          <motion.footer className={s.footer} variants={footerVariants}>
            <HeaderButtons />
          </motion.footer>
        </motion.section>
      }
    >
      <div className={s.form}>
        <LoginFormWidget />
      </div>
    </LoginContent>
  );
}
const OLD = () => {
  const { user } = useUser();
  return (
    <>
      <h1>Login</h1>

      {user && (
        <div>
          {user.firstName} <br />
        </div>
      )}
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Войти</Button>
        </SignInButton>
      </SignedOut>

      <hr />
      <CustomSignIn />
      <AuthForm />
      <hr />

      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </>
  );
};
