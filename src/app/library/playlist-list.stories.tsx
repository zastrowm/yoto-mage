import type { Meta, StoryObj } from "@storybook/nextjs";
import { PlaylistList } from "./playlist-list";

const meta = {
  title: "Playlists/PlaylistList",
  component: PlaylistList,
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaylistList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    playlists: [
      { cardId: "1", title: "Disney - Short", coverUrl: "https://placehold.co/100x100/e2c17a/white?text=Disney", duration: 20934 },
      { cardId: "2", title: "Frog and Toad", coverUrl: "https://placehold.co/100x100/7ab5e2/white?text=Frog", duration: 5400 },
      { cardId: "3", title: "Little Blue Truck", coverUrl: "https://placehold.co/100x100/7ae2a8/white?text=Truck", duration: 720 },
      { cardId: "4", title: "Music", coverUrl: "https://placehold.co/100x100/e27ab5/white?text=Music", duration: 1320 },
    ],
  },
};

export const NoCoverImages: Story = {
  args: {
    playlists: [
      { cardId: "1", title: "Bedtime Stories", duration: 3600 },
      { cardId: "2", title: "Nursery Rhymes", duration: 1800 },
      { cardId: "3", title: "Audiobook Collection", duration: 14400 },
    ],
  },
};

export const SinglePlaylist: Story = {
  args: {
    playlists: [
      { cardId: "1", title: "My Only Playlist", coverUrl: "https://placehold.co/100x100/e2c17a/white?text=Solo", duration: 600 },
    ],
  },
};

export const LongTitles: Story = {
  args: {
    playlists: [
      { cardId: "1", title: "The Very Long Title Of A Playlist That Should Truncate Properly In The UI", duration: 7200 },
      { cardId: "2", title: "Another Extremely Long Playlist Name That Goes On And On", coverUrl: "https://placehold.co/100x100/7ae2a8/white?text=Long", duration: 900 },
    ],
  },
};
