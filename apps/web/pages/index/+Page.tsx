import React from "react";
import { Button } from "@mantine/core";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Modal } from "@/components/modals/Modal";
import { useDisclosure } from "@mantine/hooks";

export default function Page() {
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useUser();
  return (
    <div className={s.wrap}>
      <Container className={s.wrap__in}>
        {!user ? (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <SignedIn>
            <div>
              <UserButton />
              {user?.firstName && <div>{user.firstName}</div>}
            </div>
          </SignedIn>
        )}
        <hr />
        <Button onClick={open}>Open Modal</Button>

        <Modal opened={opened} onClose={close} variant="left">
          <div style={{ padding: 20 }}>Modal content</div>
        </Modal>
      </Container>
    </div>
  );
}
