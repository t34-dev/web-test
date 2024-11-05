import { CustomConfig, rootConfig } from "@/pages/config";

export const filesystemRoutingRoot = true;

export default {
  ...rootConfig,
} satisfies Partial<CustomConfig>;
