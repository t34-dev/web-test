import { InnerContent } from "@/layouts/contents/InnerContent";

export default {
  Layout: InnerContent,
  // Включаем предварительный рендеринг
  prerender: true,
  // Базовая настройка префетчинга
  // prefetchStaticAssets: "viewport", // или 'hover', или false
};
