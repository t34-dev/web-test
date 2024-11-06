import { CustomConfig, rootConfig } from "@/pages/config";
import { InnerContent } from "@/layouts/InnerContent";

export default {
  ...rootConfig,
  Layout: InnerContent,
} satisfies Partial<CustomConfig>;
