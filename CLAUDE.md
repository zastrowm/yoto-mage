# Yoto Mage

Yoto playlist manager — a desktop application built with Next.js (App Router) + Deno Desktop.

## Architecture

- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Desktop**: Packages via `deno desktop` for native distribution
- **Language**: TypeScript throughout

## Project Structure

```
src/
  app/           # Next.js App Router pages and layouts
    actions.ts   # Server Actions ("use server") — OS access goes here
  components/
    ui/          # Reusable UI components (shadcn/ui pattern)
  lib/
    utils.ts     # Shared utilities (cn helper)
```

## Development

```bash
deno task dev          # Next.js dev server with HMR (browser)
deno task desktop      # Build + package as desktop app
deno task desktop:dev  # Build + desktop app with HMR
```

For day-to-day development, use `deno task dev` and work in the browser.

## Key Patterns

### Server Actions for OS Access

Functions marked `"use server"` run on the backend with full OS access:

```ts
"use server";
import { execFile } from "node:child_process";
export async function downloadTrack(url: string) { ... }
```

Client components call these directly — no API routes needed.

### Client vs Server Components

- **Default** (no directive): Server Component — can access fs, env, etc.
- **`"use client"`**: Client Component — interactive UI with state
- **`"use server"`** (in a function): Server Action — callable from client

## Design & Style

### Visual Identity

- **Tone**: Cheerful, friendly, approachable — but not cartoonish
- **Color palette**: Warm neutrals with a golden accent. Not too colorful, not monochrome
- **Borders**: Straight/square (border-radius: 0). No rounded corners
- **Typography**: System fonts, clean and readable

### Theme (Tailwind CSS variables in `src/app/globals.css`)

Colors are pre-defined via CSS variables. Use these semantic tokens — do not hardcode hex colors:

| Token | Use |
|-------|-----|
| `primary` | Main actions (buttons, links) — warm brown |
| `secondary` | Secondary actions, subtle backgrounds — light tan |
| `accent` | Highlights, badges, attention — golden yellow |
| `muted` | Disabled states, subtle text — stone gray |
| `destructive` | Delete, error states — red |
| `border` | All borders — light stone |
| `background` | Page background — off-white stone |
| `card` | Card/panel backgrounds — white |

### Component Library

Using **shadcn/ui** pattern (Tailwind + Radix primitives). Components live in `src/components/ui/`.

- Components are plain `.tsx` files in the source tree — edit them directly
- Use `class-variance-authority` (cva) for variant styling
- Use the `cn()` utility from `src/lib/utils.ts` for conditional classes

### UI Conventions

- Use the pre-built components for all interactive elements (buttons, inputs, cards)
- Prefer `variant` props over custom styling
- Keep layouts simple: flexbox/grid with Tailwind utilities
- Use `space-y-*` and `gap-*` for consistent spacing
- Use `border-t border-border` to separate sections within a card

### Adding New Components

Follow the shadcn/ui pattern:
1. Create `src/components/ui/<name>.tsx`
2. Use `cva` for variants, `cn` for class merging
3. Use `React.forwardRef` for DOM element wrappers
4. Export named components (not default exports)

## Documentation

All user-facing features must be documented in `docs/`. Each feature gets its own markdown file (e.g. `docs/download-audio.md`).

Feature docs should be:
- Written for end users, not developers
- Focused on what the feature does and how to use it
- Include prerequisites, steps, and any relevant context
- Updated when the feature changes

When adding or modifying a feature, always create or update the corresponding doc in `docs/`.

## Design (`design/`)

The `design/` folder documents the **current** state of the application's architecture and key decisions. It is not a planning document — it reflects what exists now.

### Conventions

- **Audience**: Senior engineer who can read code. Be brief; don't explain what's already obvious from the implementation.
- **Content**: Document *why* decisions were made, not *what* the code does. Capture trade-offs, constraints, and non-obvious reasoning.
- **Currency**: Designs must reflect the current state. When implementing a feature that changes architecture or introduces a new subsystem, update or create the relevant design doc. Remove docs for deleted features.
- **TODO.md**: Lives at `design/TODO.md`. Tracks planned features and known bugs. Update it when completing or adding work items.

### When to update design docs

- Adding a new subsystem or integration → create `design/<topic>.md`
- Changing an architectural decision → update the existing doc with new reasoning
- Completing a TODO item → check it off in `design/TODO.md`

### Self-review (critic)

After implementing a feature, verify:
1. The implementation conforms to decisions documented in `design/`
2. If the implementation diverges from a design doc, update the doc (the code is the source of truth)
3. Design docs remain brief and decision-focused — no API references, no tutorials, no code walkthroughs
