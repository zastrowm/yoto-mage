import type { Meta, StoryObj } from "@storybook/nextjs";
import { DownloadForm } from "./download-form";

const meta = {
  title: "Download/DownloadForm",
  component: DownloadForm,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DownloadForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
