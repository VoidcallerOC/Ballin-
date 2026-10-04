import { createFileRoute, Link } from "@tanstack/react-router";
import { marketSearch } from "@/lib/demo";

export const Route = createFileRoute("/how")({
  head: () => ({
    meta: [
      { title: "How a buy works — BALLN demo" },
      { name: "description", content: "What a Balln purchase is designed to feel like, and what this demo refuses to fake." },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14 md:px-6">
      <p className="kicker">Plain language</p>
      <h1 className="display-hero mt-3">Buy the card. Not the contract.</h1>
      <ol className="mt-10 grid gap-6">
        {[
          ["See the card", "Name, sport, rarity, edition, price. If you need the chain, it is folded under Chain notes."],
          ["Connect", "Core, MetaMask, WalletConnect, or a social wallet on a real floor. Here the button only pretends."],
          ["Confirm", "One price in $BALLN. A live floor would ask the wallet to sign. This one stops and says so."],
          ["It's yours", "The card lands on your profile. Offers and auctions work the same way: a number, a clock, a yes."],
        ].map(([title, body], index) => (
          <li key={title} className="border-t border-line pt-5">
            <p className="font-display text-4xl leading-none text-orange">0{index + 1}</p>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-muted">{body}</p>
          </li>
        ))}
      </ol>
      <Link to="/market" search={marketSearch()} className="mt-10 inline-flex min-h-11 items-center rounded-full bg-orange px-5 font-display font-bold uppercase text-bg">
        Try it on a card
      </Link>
    </main>
  );
}
