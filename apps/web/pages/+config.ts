import { CustomConfig, rootConfig } from "@/pages/config";
import { Layout } from "@/layouts/Layout/Layout";

export default {
  ...rootConfig,
  Layout: Layout,
} satisfies Partial<CustomConfig>;
