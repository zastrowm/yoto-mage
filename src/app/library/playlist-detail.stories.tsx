import type { Meta, StoryObj } from "@storybook/nextjs";
import { PlaylistDetail } from "./playlist-detail";

const meta = {
  title: "Playlists/PlaylistDetail",
  component: PlaylistDetail,
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaylistDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Disney - Short",
    coverUrl: "https://placehold.co/200x200/e2c17a/white?text=Disney",
    totalDuration: 20934,
    chapters: [
      { key: "00", title: "Dalmatians", duration: 570, display: { icon16x16: "yoto:#fake1" } },
      { key: "01", title: "Brother Bear", duration: 1256, display: { icon16x16: "yoto:#fake2" } },
      { key: "02", title: "Cinderella", duration: 713, display: { icon16x16: "yoto:#fake3" } },
      { key: "03", title: "Dinosaur", duration: 1300 },
      { key: "04", title: "Fantasia 2000", duration: 1000 },
      { key: "05", title: "Finding Nemo", duration: 1098 },
    ],
  },
};

export const NoCover: Story = {
  args: {
    title: "Bedtime Stories",
    totalDuration: 3600,
    chapters: [
      { key: "00", title: "Goodnight Moon", duration: 300 },
      { key: "01", title: "Where the Wild Things Are", duration: 420 },
      { key: "02", title: "The Velveteen Rabbit", duration: 900 },
    ],
  },
};

export const SingleTrack: Story = {
  args: {
    title: "Single Audiobook",
    coverUrl: "https://placehold.co/200x200/7ab5e2/white?text=Book",
    totalDuration: 5400,
    chapters: [
      { key: "00", title: "Chapter 1 - The Beginning of a Very Long Story Title", duration: 5400 },
    ],
  },
};

export const ManyTracks: Story = {
  args: {
    title: "Music Collection",
    coverUrl: "https://placehold.co/200x200/e27ab5/white?text=Music",
    totalDuration: 7200,
    chapters: Array.from({ length: 25 }, (_, i) => ({
      key: String(i).padStart(2, "0"),
      title: `Track ${i + 1} - Song Name Here`,
      duration: 180 + Math.floor(i * 30),
    })),
  },
};

export const NoIcons: Story = {
  args: {
    title: "Plain Playlist",
    totalDuration: 1800,
    chapters: [
      { key: "00", title: "First Item", duration: 600 },
      { key: "01", title: "Second Item", duration: 600 },
      { key: "02", title: "Third Item", duration: 600 },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: "Empty Playlist",
    coverUrl: "https://placehold.co/200x200/e2c17a/white?text=Empty",
    totalDuration: 0,
    chapters: [],
  },
};
