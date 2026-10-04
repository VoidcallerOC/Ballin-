# BALLN — Forge Nitro stack

Prospect demo of a Balln sports-card floor. Demo prices, demo wallet, no chain.

**Stack:** TanStack Start, React 19, Tailwind 4, Nitro with the Vercel preset. Same stack as Your Grails.

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # Vite build, Nitro server, Vercel output
npm run typecheck
```

Nitro is the production server. It is wired in `vite.config.ts` and only runs for `build` and `preview`, so dev stays on one port. Output is `.vercel/output` for Vercel.

Nothing here settles a purchase. Buy, bid, and offer flows are labeled demo and stay in the browser.
