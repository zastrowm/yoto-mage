import type { Meta, StoryObj } from "@storybook/nextjs";
import { AppShell } from "@/components/app-shell";
import { DownloadForm } from "@/app/download/download-form";
import { StagedFiles } from "@/app/download/staged-files";
import { YtDlpMissing } from "@/app/download/ytdlp-missing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const meta = {
  title: "Pages",
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/" },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function DownloadPageContent({ ytDlpAvailable = true, files = sampleFiles }) {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Download Audio</CardTitle>
          <CardDescription>
            Download MP3 audio from a YouTube video URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ytDlpAvailable ? <DownloadForm /> : <YtDlpMissing />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staged MP3s</CardTitle>
          <CardDescription>
            Downloaded files waiting to be added to a playlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StagedFiles initialFiles={files} />
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPageContent() {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure application preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No settings available yet. Configuration options will appear here as
            features are added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function HomePageContent() {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Manage your Yoto custom playlists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect your Yoto account to manage playlists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const sampleFiles = [
  { name: "Beauty And The Beast (Storyteller).mp3", size: 39_200_000, modified: Date.now(), duration: 2640 },
  { name: "The Lion King - Chapter 1.mp3", size: 8_500_000, modified: Date.now() - 60000, duration: 542 },
  { name: "Frozen Audiobook.mp3", size: 52_000_000, modified: Date.now() - 120000, duration: 3920 },
];

export const Home: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/" } } },
  render: () => (
    <AppShell>
      <HomePageContent />
    </AppShell>
  ),
};

export const Download: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/download" } } },
  render: () => (
    <AppShell>
      <DownloadPageContent />
    </AppShell>
  ),
};

export const DownloadWithFiles: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/download" } } },
  render: () => (
    <AppShell>
      <DownloadPageContent files={sampleFiles} />
    </AppShell>
  ),
};

export const DownloadEmpty: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/download" } } },
  render: () => (
    <AppShell>
      <DownloadPageContent files={[]} />
    </AppShell>
  ),
};

export const DownloadYtDlpMissing: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/download" } } },
  render: () => (
    <AppShell>
      <DownloadPageContent ytDlpAvailable={false} files={[]} />
    </AppShell>
  ),
};

export const Settings: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/settings" } } },
  render: () => (
    <AppShell>
      <SettingsPageContent />
    </AppShell>
  ),
};
