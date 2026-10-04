import { createFileRoute, Link } from "@tanstack/react-router";
import { cards, beats, marketSearch, sportDoors } from "@/lib/demo";
import { CardFace } from "@/components/market/card-face";
import { Tape } from "@/components/market/tape";
import { SportField } from "@/components/market/wax";

const featured = cards.find((card) => card.id === "jordan") ?? cards[0];
const heat = cards.filter((card) => ["lebron", "messi", "clark", "ohtani"].includes(card.id));
const auctions = cards.filter((card) => card.list === "auction");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BALLN — The card is the point" },
      {
        name: "description",
        content:
          "Prospect demo of a Balln sports-card floor. Designed card faces, demo prices, and a buy flow that does not touch a chain.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="court-lines">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-6 md:py-16">
          <div className="mx-auto w-full max-w-md md:order-2">
            <CardFace card={featured} featured />
          </div>
          <div className="md:order-1">
            <p className="kicker">We balln.</p>
            <h1 className="display-hero mt-3">The card is the point.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              A floor for the cards people argue about. Basketball, football, baseball, soccer. See it. Learn it. Take it. $BALLN settles a real buy. It does not get to be the show.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/market"
                search={marketSearch()}
                className="inline-flex min-h-11 items-center rounded-full bg-orange px-5 font-display text-base font-bold uppercase tracking-wide text-bg"
              >
                Walk the floor
              </Link>
              <Link
                to="/card/$id"
                params={{ id: featured.id }}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-display text-base font-bold uppercase tracking-wide"
              >
                Open the 1/1
              </Link>
            </div>
            <p className="mt-4 max-w-md text-sm text-faint">
              Demo roster. No athlete photos, no team marks, no partnerships, no live prices.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6" aria-labelledby="heat-title">
        <div className="flex items-end justify-between gap-4">
          <h2 id="heat-title" className="display-section">
            The heat.
          </h2>
          <Link to="/market" search={marketSearch()} className="stamp text-sm text-cyan">
            All cards
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {heat.map((card) => (
            <CardFace key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6" aria-labelledby="sport-title">
        <h2 id="sport-title" className="display-section">
          Shop the sport.
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {sportDoors.map((door) => (
            <Link key={door.sport} to="/market" search={marketSearch({ sport: door.sport })} className="sport-door">
              <span className="sport-art" data-sport={door.sport}>
                <SportField sport={door.sport} />
              </span>
              <span className="sport-door-copy">
                <span className="stamp text-xs text-cyan">{door.line}</span>
                <span className="font-display text-5xl leading-none font-bold uppercase">{door.sport}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6" aria-labelledby="block-title">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="block-title" className="display-section">
              On the block.
            </h2>
            <p className="mt-2 text-muted">Demo auctions. The clocks are painted on. They do not tick.</p>
          </div>
          <Link to="/market" search={marketSearch({ list: "auction" })} className="stamp text-sm text-cyan">
            Auctions
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {auctions.map((card) => (
            <CardFace key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:grid-cols-3 md:px-6">
          {[
            ["01", "See it", "The card leads. Name, sport, rarity, price. The chain stays folded until you ask."],
            ["02", "Claim it", "Buy now, or sit in on a demo auction. The button tells you it is pretend."],
            ["03", "Keep it", "Heart it into the locker. A real floor would hang that card on your profile."],
          ].map(([n, title, body]) => (
            <div key={n}>
              <p className="font-display text-5xl leading-none text-orange">{n}</p>
              <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6" aria-labelledby="tape-title">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="kicker">Demo tape</p>
            <h2 id="tape-title" className="display-section mt-2">
              The room is loud.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Collectors, bids, listings. Written for the demo so you can feel the floor. Not a single real sale.
            </p>
            <Link to="/activity" className="mt-6 inline-flex min-h-11 items-center stamp text-cyan">
              Full tape
            </Link>
          </div>
          <Tape items={beats.slice(0, 4)} />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <p className="kicker">$BALLN</p>
            <h2 className="mt-2 max-w-xl font-display text-5xl leading-none font-bold uppercase">
              The token pays the floor. It is not the floor.
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              On a live Balln, checkout in $BALLN is the idea. Here every number is marked demo and pegged at two cents so you can read it. That rate is invented.
            </p>
          </div>
          <Link
            to="/market"
            search={marketSearch()}
            className="inline-flex min-h-11 items-center rounded-full bg-orange px-5 font-display text-base font-bold uppercase tracking-wide text-bg"
          >
            Browse the wax
          </Link>
        </div>
      </section>
    </main>
  );
}
