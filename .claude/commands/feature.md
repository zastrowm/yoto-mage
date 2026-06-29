---
description: One-shot feature dev — plan, implement, verify, adversarial review (yoto-mage)
argument-hint: <feature description>
allowed-tools: Read, Grep, Glob, Edit, Write, Bash, Agent
---

Implement the following feature in yoto-mage, end to end:

$ARGUMENTS

Follow this workflow exactly; do not skip phases. If the change fits in one sentence and
one file, skip to Phase 2.

## Phase 0 — Context (read, don't edit)
Read FULLY, in order: CLAUDE.md → `docs/` for relevant existing feature docs → the source
files you'll touch, in full. Route wider code searches to a subagent; read the source
you'll touch yourself, in full.

Key structure:
- `src/app/` — Next.js App Router pages, layouts, and server actions
- `src/app/actions.ts` — Server Actions (`"use server"`) for OS access
- `src/components/ui/` — Reusable shadcn/ui-pattern components
- `src/lib/` — Shared utilities

## Phase 1 — Plan (plan mode)
Write PLAN.md at repo root before editing: numbered testable requirements; files touched +
new component/action signatures; edge cases + error paths; docs obligation
(`docs/<feature>.md` for user-visible features); open questions. If an open question
changes the design, STOP and ASK.

## Phase 2 — Implement
Per item: implement minimally following CLAUDE.md conventions:
- Server Actions for OS access (`"use server"` + `execFile` pattern)
- Client components (`"use client"`) for interactive UI with state
- Tailwind CSS semantic tokens (not hardcoded colors), square borders (border-radius: 0)
- shadcn/ui component patterns (cva, cn, forwardRef, named exports)
- TypeScript strict mode; no `any`; no unchecked indexing

## Phase 3 — Verify (show output, don't assert)
Paste actual results of `npx tsc --noEmit`. Never fake passing output or edit code to mask
a type error. If the project has tests configured, run them too.

## Phase 4 — Adversarial review (fresh context)
Spawn the `feature-critic` subagent on the diff vs PLAN.md (fall back to a general-purpose
subagent carrying the feature-critic instructions). It reviews code it did not write.

## Phase 5 — Address & finish
Fix every correctness/security/requirement finding (push back only with evidence), re-run
typecheck and show output, update docs per PLAN.md, keep PLAN.md.

## Stop
Do NOT commit/push/branch-delete. Stop at the diff and report: files changed, requirement
checklist with each item's status, verification output, critic findings + resolutions, docs
updated.
