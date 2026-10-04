import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { House, LayoutGrid, Lock, Menu, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useWallet } from "@/lib/floor-state";
import { marketSearch } from "@/lib/demo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/locker", label: "Locker" },
  { to: "/activity", label: "The tape" },
  { to: "/how", label: "How a buy works" },
] as const;

const wallets = ["Core", "MetaMask", "WalletConnect", "Social"] as const;

export function Frame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const via = useWallet((state) => state.via);
  const connect = useWallet((state) => state.connect);
  const disconnect = useWallet((state) => state.disconnect);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open && !walletOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setWalletOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, walletOpen]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-orange focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
          <Link to="/" aria-label="BALLN home" className="flex min-h-11 items-center gap-2">
            <img src="/brand/mark-160.png" alt="" width={160} height={160} className="size-11 rounded-full" />
            <span className="font-display text-2xl font-bold tracking-wide">
              BALLN<span className="text-pink">.</span>
            </span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Main">
            <Link
              to="/market"
              search={marketSearch()}
              className="inline-flex min-h-11 items-center px-3 font-display text-lg font-semibold uppercase tracking-wide text-muted"
            >
              The floor
            </Link>
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex min-h-11 items-center px-3 font-display text-lg font-semibold uppercase tracking-wide text-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="ml-auto hidden min-h-11 items-center gap-2 rounded-full bg-orange px-4 font-display text-base font-bold uppercase tracking-wide text-bg md:inline-flex"
            onClick={() => setWalletOpen(true)}
          >
            <Wallet className="size-4" aria-hidden="true" />
            {via ? via : "Connect wallet"}
          </button>
          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div id="mobile-nav" hidden={!open} className={cn("border-t border-line md:hidden", open ? "block" : "hidden")}>
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
            <Link to="/" className="flex min-h-11 items-center font-display text-2xl uppercase">
              Home
            </Link>
            <Link to="/market" search={marketSearch()} className="flex min-h-11 items-center font-display text-2xl uppercase">
              The floor
            </Link>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="flex min-h-11 items-center font-display text-2xl uppercase">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <p className="border-b border-line bg-surface px-4 py-2 text-center text-sm text-muted">
        Prospect demo. Staged prices, bids, and wallets. No athlete deals.
      </p>
      <div id="main" className="pb-24 md:pb-0">
        {children}
      </div>
      <footer className="mt-8 border-t border-line pb-24 md:pb-0">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:px-6">
          <div>
            <p className="font-display text-3xl font-bold tracking-wide">
              BALLN<span className="text-pink">.</span>
            </p>
            <p className="mt-3 max-w-md text-muted">
              Sports first. The card is the product. $BALLN is how a real floor would settle. This one does not settle anything.
            </p>
          </div>
          <div className="grid content-start gap-2 text-sm">
            <a className="min-h-11 py-2 text-muted hover:text-fg" href="https://weballn.com">
              weballn.com — the real community
            </a>
            <a className="min-h-11 py-2 text-muted hover:text-fg" href="https://x.com/BallnToken3">
              @BallnToken3
            </a>
            <a className="min-h-11 py-2 text-muted hover:text-fg" href="https://balln.shop">
              balln.shop prototype
            </a>
          </div>
        </div>
      </footer>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-bg/95 backdrop-blur md:hidden" aria-label="Mobile floor">
        <Link to="/" className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted">
          <House className="size-5" aria-hidden="true" />
          Home
        </Link>
        <Link to="/market" search={marketSearch()} className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted">
          <LayoutGrid className="size-5" aria-hidden="true" />
          Floor
        </Link>
        <Link to="/locker" className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted">
          <Lock className="size-5" aria-hidden="true" />
          Locker
        </Link>
        <button type="button" className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted" onClick={() => setWalletOpen(true)}>
          <Wallet className="size-5" aria-hidden="true" />
          Wallet
        </button>
      </nav>
      {walletOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 md:items-center" role="presentation" onClick={() => setWalletOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-title"
            className="w-full max-w-md rounded-card border border-line bg-surface p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="stamp text-xs text-orange">Demo only</p>
            <h2 id="wallet-title" className="mt-2 font-display text-4xl leading-none font-bold uppercase">
              {via ? `Pretending to be ${via}` : "Connect a wallet"}
            </h2>
            <p className="mt-3 text-sm text-muted">
              Pick a provider. Nothing connects. No signature, no balance, no chain.
            </p>
            <div className="mt-5 grid gap-2">
              {wallets.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="min-h-11 rounded-full border border-line px-4 text-left font-semibold hover:border-orange"
                  onClick={() => {
                    connect(name);
                    setWalletOpen(false);
                  }}
                >
                  {name}
                  <span className="ml-2 text-sm font-normal text-muted">Demo</span>
                </button>
              ))}
            </div>
            {via && (
              <button type="button" className="mt-4 min-h-11 text-sm text-pink" onClick={() => disconnect()}>
                Disconnect the demo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
