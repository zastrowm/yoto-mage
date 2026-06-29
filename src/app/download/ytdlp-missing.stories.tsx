import type { Meta, StoryObj } from "@storybook/nextjs";
import { YtDlpMissing } from "./ytdlp-missing";

const meta = {
  title: "Download/YtDlpMissing",
  component: YtDlpMissing,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof YtDlpMissing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
