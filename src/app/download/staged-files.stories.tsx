import type { Meta, StoryObj } from "@storybook/nextjs";
import { StagedFiles } from "./staged-files";

const meta = {
  title: "Download/StagedFiles",
  component: StagedFiles,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StagedFiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { initialFiles: [] },
};

export const WithFiles: Story = {
  args: {
    initialFiles: [
      { name: "Beauty And The Beast (Storyteller).mp3", size: 39_200_000, modified: Date.now(), duration: 2640 },
      { name: "The Lion King - Chapter 1.mp3", size: 8_500_000, modified: Date.now() - 60000, duration: 542 },
      { name: "Frozen Audiobook.mp3", size: 52_000_000, modified: Date.now() - 120000, duration: 3920 },
    ],
  },
};

export const SingleFile: Story = {
  args: {
    initialFiles: [
      { name: "Short Track.mp3", size: 1_200_000, modified: Date.now(), duration: 45 },
    ],
  },
};

export const NoDuration: Story = {
  args: {
    initialFiles: [
      { name: "Unknown Duration.mp3", size: 5_000_000, modified: Date.now(), duration: null },
    ],
  },
};
