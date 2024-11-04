import { createClerkClient } from "@clerk/clerk-sdk-node";
import type { PageContextServer } from "vike/types";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || import.meta.env.CLERK_SECRET_KEY,
});

function getCookieValue(cookies: string | undefined, name: string): string | undefined {
  if (!cookies) return undefined;
  const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : undefined;
}

function decodeJWT(token: string) {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    return JSON.parse(payloadJson) as { sid?: string; sub?: string };
  } catch {
    return null;
  }
}

export async function onBeforeRender(pageContext: PageContextServer) {
  const defaultRes = { pageContext: { clerkState: null } };

  // Проверяем, является ли это первым рендером страницы
  const isFirstRender = !pageContext.isClientSideNavigation;

  try {
    // Если это клиентская навигация - пропускаем проверку куков
    if (!isFirstRender) {
      return defaultRes;
    }

    const cookies = pageContext.headers?.["cookie"];
    const sessionToken = getCookieValue(cookies, "__session");

    if (!sessionToken) {
      return defaultRes;
    }

    const decodedToken = decodeJWT(sessionToken);
    if (!decodedToken?.sub || !decodedToken?.sid) {
      return defaultRes;
    }

    const user = await clerk.users.getUser(decodedToken.sub);

    return {
      pageContext: {
        clerkState: {
          user,
          sessionId: decodedToken.sid,
        },
      },
    };
  } catch (error) {
    console.error("Auth error:", error);
    return defaultRes;
  }
}
