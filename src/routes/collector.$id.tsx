import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { beats, collectorById, heldBy, marketSearch } from "@/lib/demo";
import { CardFace } from "@/components/market/card-face";
import { Tape } from "@/components/market/tape";
import { SportField } from "@/components/market/wax";

export const Route = createFileRoute("/collector/$id")({
  loader: ({ params }) => {
    const collector = collectorById(params.id);
    if (!collector) throw notFound();
    return {
      collector,
      held: heldBy(collector.id),
      tape: beats.filter((beat) => beat.actorId === collector.id),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.collector.name} — demo collector` : "Collector" },
      { name: "description", content: "Demo collector profile. Not a real person and not a live collection." },
    ],
  }),
  component: CollectorPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="display-section">That collector is not in the demo.</h1>
      <Link to="/market" search={marketSearch()} className="mt-6 inline-flex min-h-11 items-center text-cyan">
        Back to the floor
      </Link>
    </main>
  ),
});

function CollectorPage() {
  const { collector, held, tape } = Route.useLoaderData();
  const banner = held[0];
  const mark = collector.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <main>
      <div className="collector-banner">
        {banner && <SportField sport={banner.sport} />}
        <div className="card-scrim absolute inset-0" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="-mt-16 flex items-end gap-4">
          <p
            className="relative z-10 grid size-20 place-items-center rounded-full border border-line bg-surface font-display text-3xl font-bold"
            aria-hidden="true"
          >
            {mark}
          </p>
          <div>
            <p className="kicker">{collector.line}</p>
            <h1 className="display-name">{collector.name}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-muted">{collector.bio} Invented for this demo. Not a customer.</p>
        <h2 className="mt-10 font-display text-4xl leading-none font-bold uppercase">What they hold.</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {held.map((card) => (
            <CardFace key={card.id} card={card} />
          ))}
        </div>
        <h2 className="mt-12 font-display text-4xl leading-none font-bold uppercase">On the tape.</h2>
        <p className="mt-2 text-sm text-muted">Staged. Not a sale history.</p>
        <div className="mt-4 max-w-xl">
          {tape.length > 0 ? <Tape items={tape} /> : <p className="text-muted">Quiet, for a demo.</p>}
        </div>
      </div>
    </main>
  );
}
