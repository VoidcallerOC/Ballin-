import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { filterCards, marketSearch, rarities, sports, type MarketSearch } from "@/lib/demo";
import { CardFace } from "@/components/market/card-face";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/market")({
  validateSearch: (search: Record<string, unknown>): MarketSearch =>
    marketSearch({
      sport: typeof search.sport === "string" ? search.sport : "all",
      rarity: typeof search.rarity === "string" ? search.rarity : "all",
      list: typeof search.list === "string" ? search.list : "all",
      sort: typeof search.sort === "string" ? search.sort : "heat",
      q: typeof search.q === "string" ? search.q : "",
    }),
  head: () => ({
    meta: [
      { title: "The floor — BALLN demo" },
      {
        name: "description",
        content: "Demo marketplace for Balln sports cards. Filter by sport, rarity, and auction. Prices are not live.",
      },
    ],
  }),
  component: MarketPage,
});

function MarketPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/market" });
  const results = filterCards(search);
  const editorial =
    search.sport === "all" && search.rarity === "all" && search.list === "all" && search.q.trim() === "";
  const auctions = results.filter((card) => card.list === "auction");
  const wax = editorial ? results.filter((card) => card.list !== "auction") : results;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const active = [search.sport, search.rarity, search.list].filter((value) => value !== "all");

  function setSearch(partial: Partial<MarketSearch>) {
    navigate({ search: { ...search, ...partial }, replace: true });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <p className="kicker">Marketplace</p>
      <h1 className="display-section mt-2">The floor.</h1>
      <p className="mt-3 max-w-xl text-muted">
        {results.length} demo {results.length === 1 ? "card" : "cards"}. Hunt by sport, rarity, or auction. Nothing here clears a chain.
      </p>

      <button
        type="button"
        className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line px-4 font-display font-bold uppercase md:hidden"
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen((open) => !open)}
      >
        {filtersOpen ? "Hide filters" : "Filters"}
        {active.length > 0 ? ` · ${active.join(" · ")}` : ""}
      </button>

      <div className={cn("mt-4 gap-4 rounded-card border border-line bg-surface p-4", filtersOpen ? "grid" : "hidden md:grid")}>
        <label className="grid gap-2">
          <span className="stamp text-xs text-faint">Search</span>
          <input
            value={search.q}
            onChange={(event) => setSearch({ q: event.target.value })}
            placeholder="Name, sport, rarity"
            className="min-h-11 rounded-full border border-line bg-bg px-4"
          />
        </label>
        <FilterRow label="Sport" value={search.sport} options={["all", ...sports]} onChange={(sport) => setSearch({ sport })} />
        <FilterRow label="Rarity" value={search.rarity} options={["all", ...rarities]} onChange={(rarity) => setSearch({ rarity })} />
        <FilterRow label="Listing" value={search.list} options={["all", "buy", "auction"]} onChange={(list) => setSearch({ list })} />
        <label className="flex flex-wrap items-center gap-3">
          <span className="stamp w-16 text-xs text-faint">Sort</span>
          <select
            value={search.sort}
            onChange={(event) => setSearch({ sort: event.target.value })}
            className="min-h-11 rounded-full border border-line bg-bg px-4"
          >
            <option value="heat">Heat</option>
            <option value="price-desc">Price, high</option>
            <option value="price-asc">Price, low</option>
            <option value="new">Name</option>
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-card border border-line bg-surface p-8">
          <h2 className="font-display text-4xl leading-none font-bold uppercase">Nothing in the wax.</h2>
          <p className="mt-3 max-w-md text-muted">That combo is not in the set. Clear it and hunt again.</p>
          <button
            type="button"
            className="mt-5 min-h-11 rounded-full bg-orange px-5 font-display font-bold uppercase text-bg"
            onClick={() => navigate({ search: marketSearch(), replace: true })}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {editorial && auctions.length > 0 && (
            <section className="mt-10" aria-labelledby="block-floor">
              <h2 id="block-floor" className="font-display text-4xl leading-none font-bold uppercase">
                On the block.
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {auctions.map((card) => (
                  <CardFace key={card.id} card={card} />
                ))}
              </div>
            </section>
          )}
          <section className="mt-10" aria-labelledby="wax-floor">
            <h2 id="wax-floor" className="font-display text-4xl leading-none font-bold uppercase">
              {editorial ? "The wax." : "In the hunt."}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {wax.map((card) => (
                <CardFace key={card.id} card={card} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="stamp w-16 text-xs text-faint">{label}</span>
      {options.map((option) => {
        const name = option === "all" ? "All" : option === "buy" ? "Buy now" : option === "auction" ? "Auction" : option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            className={
              value === option
                ? "min-h-11 rounded-full bg-fg px-4 font-display text-sm font-bold uppercase text-bg"
                : "min-h-11 rounded-full border border-line px-4 font-display text-sm font-bold uppercase text-muted"
            }
            onClick={() => onChange(option)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
