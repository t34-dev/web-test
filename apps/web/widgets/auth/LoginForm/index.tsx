import React, { useState } from "react";
import s from "./LoginForm.module.scss";
import { Anchor, Button, CloseButton, Input } from "@mantine/core";
import { motion } from "framer-motion";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { T } from "@/i18n/T/T";
import { PageLoader } from "../../../components/loading/PageLoader";

const transition = {
  type: "spring",
  duration: 0.2,
  bounce: 0.2,
  stiffness: 50,
  damping: 9,
  mass: 0.5,
};

export const LoginFormWidget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  return (
    <motion.section className={s.wrap} variants={containerVariants} initial="hidden" animate="show">
      <motion.header className={s.header} variants={itemVariants}>
        <div className={s.header__logo}>
          <LogoIcon size={32} />
        </div>
        <h1 className={s.header__title}>
          <T k={"auth:sign_h1"} />
        </h1>
        <div className={s.header__desc}>
          <T k={"auth:sign_desc"} />
        </div>
      </motion.header>

      <motion.section className={s.content} variants={itemVariants}>
        <nav className={s.content__nav}>
          <Button size="lg" variant="default">
            <img src="/assets/social/github.svg" alt="" />
          </Button>
          <Button size="lg" variant="default">
            <img src="/assets/social/google.svg" alt="" />
          </Button>
          <Button size="lg" variant="default">
            <img src="/assets/social/metamask.svg" alt="" />
          </Button>
        </nav>
      </motion.section>

      <motion.div className={s.or} variants={itemVariants}>
        <i />
        <div>
          <T k={"auth:sign_or"} />
        </div>
        <i />
      </motion.div>

      <motion.div className={s.email} variants={itemVariants}>
        <Input.Wrapper label="Email address" error={error} size="lg">
          <Input
            className={s.email__emailInput}
            placeholder="Email"
            error={!!error}
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            size="lg"
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => {
                  setEmail("");
                  setError("");
                }}
                style={{ display: email ? undefined : "none" }}
              />
            }
          />
        </Input.Wrapper>
        <Button
          className={s.email__btn}
          fullWidth
          size="lg"
          disabled={!email}
          onClick={() => setError("Something went wrong")}
          // loading={true}
          loaderProps={{ type: "dots" }}
        >
          <T k={"common:continue"} />
        </Button>
      </motion.div>

      <motion.footer className={s.footer} variants={itemVariants}>
        <div>
          <T k={"auth:sign_footer_title"} />
        </div>
        <Anchor href="#" target="_blank" underline="hover">
          Terms of Use
        </Anchor>{" "}
        &{" "}
        <Anchor href="#" target="_blank" underline="hover">
          Privacy Policy
        </Anchor>
      </motion.footer>
    </motion.section>
  );
};
