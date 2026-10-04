import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Heart } from "lucide-react";
import { askOf, cardById, cards, collectorById, formatBalln, formatDemoUsd } from "@/lib/demo";
import { useLocker, useOffers, useWallet } from "@/lib/floor-state";
import { CardFace } from "@/components/market/card-face";

export const Route = createFileRoute("/card/$id")({
  loader: ({ params }) => {
    const card = cardById(params.id);
    if (!card) throw notFound();
    return { card };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.card.athlete} — BALLN demo card` : "Card — BALLN" },
      {
        name: "description",
        content: "Demo sports card. Price, offer, and purchase are simulated. No chain transaction.",
      },
    ],
  }),
  component: CardPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="display-section">That card never made the set.</h1>
      <Link
        to="/market"
        search={{ sport: "all", rarity: "all", list: "all", sort: "heat", q: "" }}
        className="mt-6 inline-flex min-h-11 items-center text-cyan"
      >
        Back to the floor
      </Link>
    </main>
  ),
});

function CardPage() {
  const { card } = Route.useLoaderData();
  const seller = collectorById(card.seller);
  const saved = useLocker((state) => state.ids.includes(card.id));
  const toggle = useLocker((state) => state.toggle);
  const via = useWallet((state) => state.via);
  const parked = useOffers((state) => state.offers.find((offer) => offer.cardId === card.id));
  const park = useOffers((state) => state.park);
  const [step, setStep] = useState<"idle" | "confirm" | "done" | "bid">("idle");
  const [offerPrice, setOfferPrice] = useState(String(Math.round(card.price * 0.8)));
  const [days, setDays] = useState("3");
  const [message, setMessage] = useState("");
  const [offerNote, setOfferNote] = useState("");
  const [sellerMove, setSellerMove] = useState<"" | "accept" | "counter" | "pass">("");
  const others = cards.filter((item) => item.sport === card.sport && item.id !== card.id).slice(0, 3);
  const ask = askOf(card);

  function submitOffer(event: FormEvent) {
    event.preventDefault();
    const price = Number(offerPrice);
    if (!Number.isFinite(price) || price <= 0) {
      setOfferNote("Put a number on it.");
      return;
    }
    park({ cardId: card.id, price, days: Number(days), message: message.trim() });
    setSellerMove("");
    setOfferNote("Parked in this browser. The seller never saw it.");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <div className="grid items-start gap-8 md:grid-cols-2">
        <CardFace card={card} featured plate={false} />
        <div>
          <p className="kicker">
            {card.sport} · {card.setName}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-none font-bold uppercase md:text-6xl">{card.athlete}</h1>
          <p className="mt-3 text-muted">
            {card.rarity} · edition {card.edition}. Demo roster. The face is the number and the name.
          </p>
          <p className="stamp mt-6 text-xs text-faint">{card.list === "auction" ? "Demo bid" : "Demo price"}</p>
          <p className="font-display text-5xl leading-none font-bold">
            {formatBalln(ask)} <span className="text-2xl">BALLN</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            About {formatDemoUsd(ask)} at a made-up peg of $0.02. Not a quote.
            {card.list === "auction" && card.clock ? ` Demo clock says ${card.clock}. It does not tick.` : ""}
          </p>
          <p className="mt-4 text-sm">
            Held by{" "}
            <Link to="/collector/$id" params={{ id: card.seller }} className="text-cyan">
              {seller?.name}
            </Link>
            <span className="text-muted"> · {seller?.line}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="min-h-11 rounded-full bg-orange px-5 font-display font-bold uppercase text-bg"
              onClick={() => setStep(via ? (card.list === "auction" ? "bid" : "confirm") : "confirm")}
            >
              {card.list === "auction" ? "Place a demo bid" : "Buy the card"}
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4"
              aria-pressed={saved}
              onClick={() => toggle(card.id)}
            >
              <Heart className={saved ? "size-4 fill-pink text-pink" : "size-4"} aria-hidden="true" />
              {saved ? "In the locker" : "Save it"}
            </button>
          </div>

          {step !== "idle" && (
            <div className="mt-4 rounded-card border border-line bg-surface p-4" role="status">
              {!via && (
                <>
                  <p className="font-semibold">Connect the demo wallet first.</p>
                  <p className="mt-1 text-sm text-muted">
                    Use Connect wallet in the header. It will not open Core, MetaMask, or anything else.
                  </p>
                </>
              )}
              {via && step === "confirm" && (
                <>
                  <p className="font-semibold">Confirm the demo purchase.</p>
                  <p className="mt-1 text-sm text-muted">
                    Pretending to pay {formatBalln(ask)} BALLN from {via}. No signature will be requested.
                  </p>
                  <button
                    type="button"
                    className="mt-3 min-h-11 rounded-full bg-fg px-4 font-display font-bold uppercase text-bg"
                    onClick={() => setStep("done")}
                  >
                    Confirm — still fake
                  </button>
                </>
              )}
              {via && step === "bid" && (
                <>
                  <p className="font-semibold">Demo bid noted.</p>
                  <p className="mt-1 text-sm text-muted">
                    You would bid {formatBalln((card.bid ?? card.price) + 500)} BALLN. It was not broadcast.
                  </p>
                </>
              )}
              {via && step === "done" && (
                <>
                  <p className="font-semibold">Card secured — in the story only.</p>
                  <p className="mt-1 text-sm text-muted">Nothing moved. No NFT, no $BALLN, no receipt.</p>
                </>
              )}
            </div>
          )}

          <dl className="mt-8 grid gap-3">
            {[
              ["Sport", card.sport],
              ["Rarity", card.rarity],
              ["Edition", card.edition],
              ["Set", card.setName],
              ["Listing", card.list === "auction" ? "Demo auction" : "Demo buy now"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 border-t border-line pt-3">
                <dt className="stamp text-xs text-faint">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <form className="mt-8 rounded-card border border-line p-4" onSubmit={submitOffer}>
            <h2 className="font-display text-3xl leading-none font-bold uppercase">Make an offer.</h2>
            <p className="mt-2 text-sm text-muted">Talk like a collector. The note stays on this device.</p>
            <label className="mt-4 block text-sm" htmlFor="offer-price">
              Offer in BALLN
            </label>
            <input
              id="offer-price"
              inputMode="numeric"
              value={offerPrice}
              onChange={(event) => setOfferPrice(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-full border border-line bg-bg px-4"
            />
            <label className="mt-3 block text-sm" htmlFor="offer-days">
              Good for
            </label>
            <select
              id="offer-days"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-full border border-line bg-bg px-4"
            >
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
            </select>
            <label className="mt-3 block text-sm" htmlFor="offer-note">
              Note to the seller
            </label>
            <textarea
              id="offer-note"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              maxLength={180}
              className="mt-1 w-full rounded-card border border-line bg-bg px-4 py-3"
              placeholder="I'll take it if the number works."
            />
            <button type="submit" className="mt-3 min-h-11 rounded-full border border-line px-5 font-display font-bold uppercase">
              Park the offer
            </button>
            {(offerNote || parked) && (
              <p className="mt-3 text-sm text-cyan" role="status">
                {offerNote ||
                  `Last parked offer: ${formatBalln(parked?.price ?? 0)} BALLN for ${parked?.days} days. Not sent.`}
              </p>
            )}
            {parked && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-sm text-muted">Pretend the seller answers. Still nobody on the other side.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      ["accept", "They take it"],
                      ["counter", "They counter"],
                      ["pass", "They pass"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className="min-h-11 rounded-full border border-line px-4 text-sm"
                      aria-pressed={sellerMove === key}
                      onClick={() => setSellerMove(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {sellerMove === "accept" && (
                  <p className="mt-3 text-sm" role="status">
                    They'd take {formatBalln(parked.price)} BALLN. Nothing transfers.
                  </p>
                )}
                {sellerMove === "counter" && (
                  <p className="mt-3 text-sm" role="status">
                    They'd come back at {formatBalln(ask)} BALLN. Still just a note in this browser.
                  </p>
                )}
                {sellerMove === "pass" && (
                  <p className="mt-3 text-sm" role="status">
                    They pass. The card stays listed. No message was sent.
                  </p>
                )}
              </div>
            )}
          </form>

          <details className="mt-6 border-t border-line pt-4">
            <summary className="min-h-11 cursor-pointer font-semibold">Chain notes</summary>
            <p className="mt-2 text-sm text-muted">
              A live card would sit on Avalanche. This demo has no contract, no token id, and no wallet signature. Do not paste a seed phrase into anything that asks.
            </p>
          </details>
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-14" aria-labelledby="more-title">
          <h2 id="more-title" className="font-display text-4xl leading-none font-bold uppercase">
            More {card.sport.toLowerCase()}.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {others.map((item) => (
              <CardFace key={item.id} card={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
