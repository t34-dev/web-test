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

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Token() {
  const [jwt, setJwt] = useState<string | null>(null);
  const t = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await t.getToken({ template: 'development' });
      if (!token) {
        return;
      }
      setJwt(token);
    };
    fetchToken();
  }, [t]);

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
