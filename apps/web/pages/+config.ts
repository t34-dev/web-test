import { CustomConfig, rootConfig } from "@/pages/config";
import { MainLayout } from "@/layouts/MainLayout";
import { Layout } from "@/layouts/Layout/Layout";

export default {
  ...rootConfig,
  // Layout: MainLayout,
  Layout,
} satisfies Partial<CustomConfig>;
