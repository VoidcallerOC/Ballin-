import { createFileRoute, Link } from "@tanstack/react-router";
import { cards, marketSearch } from "@/lib/demo";
import { useLocker } from "@/lib/floor-state";
import { CardFace } from "@/components/market/card-face";

export const Route = createFileRoute("/locker")({
  head: () => ({
    meta: [
      { title: "Locker — BALLN demo" },
      { name: "description", content: "Cards you saved in this browser. Demo only." },
    ],
  }),
  component: LockerPage,
});

function LockerPage() {
  const ids = useLocker((state) => state.ids);
  const saved = cards.filter((card) => ids.includes(card.id));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <p className="kicker">Your browser</p>
      <h1 className="display-section mt-2">The locker.</h1>
      {saved.length === 0 ? (
        <div className="mt-8 max-w-xl">
          <p className="font-display text-4xl leading-none font-bold uppercase">Nothing to flex.</p>
          <p className="mt-3 text-lg text-muted">
            The locker is the brag wall. Heart a card on the floor and it lands here. It stays in this browser, not on a chain.
          </p>
          <Link
            to="/market"
            search={marketSearch()}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-orange px-5 font-display font-bold uppercase text-bg"
          >
            Find a card
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-3 text-muted">
            {saved.length} saved here. Show the group chat. Still not on a chain.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {saved.map((card) => (
              <CardFace key={card.id} card={card} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
