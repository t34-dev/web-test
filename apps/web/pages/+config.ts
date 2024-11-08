import { CustomConfig, rootConfig } from "@/pages/config";
import { MainLayout } from "@/layouts/MainLayout";

export default {
  ...rootConfig,
  Layout: MainLayout,
} satisfies Partial<CustomConfig>;
