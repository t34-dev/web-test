// pages/+onBeforeRoute.ts
import type { OnBeforeRouteSync } from "vike/types";
import { DEFAULT_LANG, SUPPORTED_LANGS, SupportedLang } from "@/i18n/constants";

type BeforeRoutePageContext = {
  pageProps: {
    locale: SupportedLang;
  };
  urlLogical: string;
};

const onBeforeRoute: OnBeforeRouteSync = (pageContext): { pageContext: BeforeRoutePageContext } => {
  const { urlPathname, headers } = pageContext;
  console.log("onBeforeRoute:", headers);
  let urlLogical = urlPathname;
  let locale: SupportedLang = DEFAULT_LANG;

  const pathname = urlPathname.slice(1).trim();
  if (pathname) {
    const segments = pathname.split("/");
    if (segments.length) {
      const firstSegment = segments[0];

      locale = SUPPORTED_LANGS.includes(firstSegment as SupportedLang) ? (firstSegment as SupportedLang) : DEFAULT_LANG;

      if (locale !== DEFAULT_LANG) {
        urlLogical = "/" + segments.slice(1).join("/") || "/";
      }
    }
  }

  return {
    pageContext: {
      pageProps: {
        locale,
      },
      urlLogical,
    },
  };
};

export { onBeforeRoute };
