# Download Audio

Download MP3 audio from YouTube videos directly into your staging area.

## Prerequisites

**yt-dlp** must be installed and available in your system PATH. If it's not detected, the app will show a link to the [yt-dlp installation instructions](https://github.com/yt-dlp/yt-dlp#installation).

## How to Use

1. Navigate to **Download** in the sidebar (or go to `/download`)
2. Paste a YouTube video URL into the input field
3. Click **Download MP3**
4. Watch the progress log as the audio is extracted and converted to MP3
5. To cancel a download in progress, click **Cancel**

## Staging Area

Downloaded MP3 files are saved to a local staging directory. This is a holding area for files that haven't been added to a playlist yet.

The **Staged MP3s** section below the download form shows all files currently in the staging area, along with their file sizes.

### Managing Staged Files

Each file has a `···` menu with the following options:

- **Rename** — edit the filename (the `.mp3` extension is preserved automatically)
- **Delete** — permanently remove the file from staging

## Supported URLs

Currently supports individual YouTube video URLs (e.g. `https://www.youtube.com/watch?v=...`). Playlist support is planned for a future release.
