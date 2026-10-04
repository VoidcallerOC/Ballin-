# BALLN — Forge Nitro stack

Prospect demo of a Balln sports-card floor. Demo prices, demo wallet, no chain.

**Stack:** TanStack Start, React 19, Tailwind 4, Nitro with the Vercel preset.

On Vercel, set the application preset to **Nitro** and leave the commands on the preset defaults. This repo already matches them:

| Setting | Value |
| --- | --- |
| Framework | `nitro` |
| Build | `nitro build` |
| Dev | `nitro dev` |
| Install | default `npm install` |
| Output | Nitro writes `.vercel/output` (do not point Output Directory at `dist`) |

```bash
npm install
npm run dev        # local preview
npm run build      # nitro build, then migrations if DATABASE_URL is set
```

Nothing here settles a purchase. Buy, bid, and offer flows are labeled demo and stay in the browser.
