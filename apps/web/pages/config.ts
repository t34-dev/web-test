import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

export const rootConfig = {
  title: "My Vike App",
  description: "Demo showcasing Vike",
  extends: vikeReact,
  passToClient: ["pageProps", "urlLogical", "locale", "clerkState", "vikeStore"],
  meta: {
    "color-scheme": {
      env: {
        client: true,
        server: true,
      },
      name: "color-scheme",
      content: "light dark",
    },
    onBeforeRender: {
      env: { server: true },
    },
  },
  prerender: true,
  clientRouting: true,
  prefetchStaticAssets: "viewport",
} satisfies Partial<CustomConfig>;

type MetaConfig = {
  "color-scheme": {
    env: { client: boolean; server: boolean };
    name: string;
    content: string;
  };
};

export type CustomConfig = Config & {
  meta: MetaConfig;
};
