import type { StorybookConfig } from "@storybook/nextjs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/nextjs",
  webpackFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      [resolve(__dirname, "../src/app/actions")]: resolve(__dirname, "mocks/actions.ts"),
    };
    return config;
  },
};
export default config;
