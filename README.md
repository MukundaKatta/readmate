# ReadMate

The reading coach for your first-grader. Kids read aloud — ReadMate listens, gently corrects, and celebrates.

**Status:** v0 skeleton — landing page + read-aloud demo route. Speech recognition not yet wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 read-aloud demo — words fade in at reading pace, mock listen step with Continue button |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "readmate"` |

## What's next

- Wire speech recognition for real read-aloud listening
- AI coaching with gentle correction feedback
- Parent dashboard with weekly progress reports
