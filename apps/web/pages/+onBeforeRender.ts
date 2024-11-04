// pages/+onBeforeRender.ts
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
  try {
    const cookies = pageContext.headers?.["cookie"];
    const sessionToken = getCookieValue(cookies, "__session");

    console.log("Page Context:", pageContext);
    console.log("Headers:", pageContext.headers);
    console.log("cookies", cookies);
    console.log("sessionToken", sessionToken);
    if (!sessionToken) {
      return { pageContext: { clerkState: null } };
    }

    const decodedToken = decodeJWT(sessionToken);
    if (!decodedToken?.sub || !decodedToken?.sid) {
      return { pageContext: { clerkState: null } };
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
    return { pageContext: { clerkState: null } };
  }
}
