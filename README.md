# Yoto Mage

A desktop app for managing your Yoto Make Your Own playlists. Browse your library, organize tracks, upload audio, and build playlists — all without the limitations of the Yoto mobile app.

## Features

- **[Playlists](docs/playlists.md)** — Browse and view your Make Your Own cards with cover art, track listings, and durations
- **[Download Audio](docs/download-audio.md)** — Download audio from YouTube and stage it for playlist creation
- **Yoto Account Integration** — OAuth login with your Yoto account, automatic token refresh

## Why

The official Yoto app works fine for playback, but managing custom content (especially playlists with many tracks) is tedious. Yoto Mage gives you a desktop interface with better visibility into your library, bulk operations, and local audio file management.

## Development

### Prerequisites

- [Deno](https://deno.land/) (v2+)
- A Yoto developer account at [dashboard.yoto.dev](https://dashboard.yoto.dev)

### Setup

```bash
git clone <repo-url>
cd yoto-mage

# Install dependencies
deno install

# Copy environment template and add your Yoto client ID
cp .env.example .env.local

# Start the dev server
deno task dev
```

Then open http://localhost:3000 and click "Login with Yoto" to connect your account.

### Other commands

```bash
deno task storybook      # Component stories (port 6006)
deno task test:yoto      # API exploration tests (requires login)
deno task desktop        # Build as desktop app
deno task desktop:dev    # Desktop app with HMR
```

### Project structure

See [CLAUDE.md](CLAUDE.md) for architecture details, conventions, and design guidelines.
