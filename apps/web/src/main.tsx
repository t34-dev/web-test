import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useSignTypedData } from 'wagmi';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function signTypedDataExample() {
  const { signTypedData } = useSignTypedData();

  // POST /wallets response
  const example = {
    types: {
      Login: [
        {
          name: 'content',
          type: 'string',
        },
        {
          name: 'timestamp',
          type: 'string',
        },
      ],
    },
    primaryType: 'Login',
    domain: {
      name: 'Attach wallet to user',
      version: 'v1',
      salt: '0xcb3b1bd565f68a612c4946671a8dfce5',
    },
    message: {
      content:
        'Dear user,\n\nTo verify that you are the owner of this wallet, we kindly ask you to sign this message. This process helps us ensure the security of your account and confirm that this wallet is genuinely linked to you.\n\nImportant:\n\n • This action is completely free.\n • It does not involve any transaction or transfer of assets.\n • Signing this message does not provide any third party access to your funds.\n\nPlease sign the message to complete the verification.\n\nThank you for your cooperation!\n',
      timestamp: '2024-10-24T11:46:20.550Z',
    },
  } as const;

  signTypedData(example);
}

function Token() {
  const [jwt, setJwt] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await auth.getToken({ template: 'development' });
      if (!token) {
        return;
      }
      setJwt(token);
    };
    fetchToken();
  }, [auth]);

  if (!jwt) {
    return <p>Loading...</p>; // Пока токен не загружен
  }

  return <p>{jwt}</p>; // Отображение токена
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Token />
      <App />
    </ClerkProvider>
  </StrictMode>,
);
