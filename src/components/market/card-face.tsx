import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { DemoCard } from "@/lib/demo";
import { askOf, collectorById, formatBalln, formatDemoUsd } from "@/lib/demo";
import { useLocker } from "@/lib/floor-state";
import { cn } from "@/lib/utils";
import { WaxArt } from "@/components/market/wax";

const rarityClass: Record<DemoCard["rarity"], string> = {
  Common: "text-faint",
  Rare: "text-cyan",
  Legend: "text-orange",
  "1/1": "text-pink",
};

export function CardFace({
  card,
  featured = false,
  plate = true,
}: {
  card: DemoCard;
  featured?: boolean;
  plate?: boolean;
}) {
  const saved = useLocker((state) => state.ids.includes(card.id));
  const toggle = useLocker((state) => state.toggle);
  const seller = collectorById(card.seller);
  const ask = askOf(card);

  return (
    <article
      className={cn("slab", featured && "slab-featured", !plate && "slab-bare")}
      data-rarity={card.rarity}
    >
      <div className="slab-photo">
        <WaxArt card={card} />
      </div>
      {plate && (
        <div className="slab-plate">
          <p className="stamp text-xs text-cyan">
            {card.sport} · {card.edition}
          </p>
          <h3 className={cn("font-display leading-none font-bold uppercase", featured ? "text-5xl" : "text-2xl")}>
            {card.athlete}
          </h3>
          <p className="stamp mt-1 text-xs text-faint">{card.list === "auction" ? "Demo bid" : "Demo price"}</p>
          <p className="font-display text-2xl leading-none font-bold">
            {formatBalln(ask)} <span className="text-base font-semibold">BALLN</span>
          </p>
          <p className="text-xs text-muted">
            ≈ {formatDemoUsd(ask)} demo
            {card.list === "buy" ? ` · ${seller?.name ?? "Demo seller"}` : ""}
          </p>
        </div>
      )}
      <Link
        to="/card/$id"
        params={{ id: card.id }}
        className="absolute inset-0 z-10"
        aria-label={`${card.athlete}, ${card.sport}, ${card.rarity}, edition ${card.edition}. Demo ${card.list === "auction" ? "bid" : "price"} ${formatBalln(ask)} BALLN, about ${formatDemoUsd(ask)} at the invented peg.`}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3">
        <p className={cn("stamp rounded-full bg-bg/80 px-2 py-1 text-xs", rarityClass[card.rarity])}>{card.rarity}</p>
        <button
          type="button"
          className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full bg-bg/80"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${card.athlete} from the locker` : `Save ${card.athlete} to the locker`}
          onClick={() => toggle(card.id)}
        >
          <Heart className={cn("size-5", saved ? "fill-pink text-pink" : "text-fg")} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
