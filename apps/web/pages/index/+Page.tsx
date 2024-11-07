import React from "react";
import { Counter } from "./Counter.js";
import { Button } from "@mantine/core";
import s from "./Page.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

export default function Page() {
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
      </Container>
    </div>
  );
}
