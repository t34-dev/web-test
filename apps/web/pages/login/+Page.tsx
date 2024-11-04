import React from "react";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@repo/ui";
import CustomSignIn from "../../components/AuthForm2/AuthForm2";
import { AuthForm } from "@/components/AuthForm/AuthForm";

export default function Page() {
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
}
