import type { DemoCard, Sport } from "@/lib/demo";
import { cn } from "@/lib/utils";

const rarityWax: Record<DemoCard["rarity"], string> = {
  Common: "wax-common",
  Rare: "wax-rare",
  Legend: "wax-legend",
  "1/1": "wax-one",
};

export function lastName(athlete: string) {
  return athlete.replace(/\s+Jr\.?$/i, "").split(" ").at(-1)?.toUpperCase() ?? athlete.toUpperCase();
}

export function SportField({ sport }: { sport: Sport }) {
  if (sport === "Basketball") {
    return (
      <svg className="sport-field" viewBox="0 0 400 500" fill="none" aria-hidden="true">
        <path d="M36 500V348C36 250 108 176 200 176s164 74 164 172V500" />
        <rect x="128" y="292" width="144" height="208" />
        <circle cx="200" cy="292" r="42" />
        <line x1="24" y1="500" x2="376" y2="500" />
      </svg>
    );
  }
  if (sport === "Football") {
    return (
      <svg className="sport-field" viewBox="0 0 400 500" fill="none" aria-hidden="true">
        <line x1="28" y1="70" x2="372" y2="70" />
        <line x1="28" y1="140" x2="372" y2="140" />
        <line x1="28" y1="210" x2="372" y2="210" />
        <line x1="28" y1="280" x2="372" y2="280" />
        <line x1="28" y1="350" x2="372" y2="350" />
        <line x1="28" y1="420" x2="372" y2="420" />
        <line x1="148" y1="40" x2="148" y2="470" />
        <line x1="252" y1="40" x2="252" y2="470" />
      </svg>
    );
  }
  if (sport === "Baseball") {
    return (
      <svg className="sport-field" viewBox="0 0 400 500" fill="none" aria-hidden="true">
        <line x1="200" y1="430" x2="28" y2="70" />
        <line x1="200" y1="430" x2="372" y2="70" />
        <polygon points="200,418 312,306 200,194 88,306" />
        <circle cx="200" cy="306" r="16" />
      </svg>
    );
  }
  return (
    <svg className="sport-field" viewBox="0 0 400 500" fill="none" aria-hidden="true">
      <rect x="36" y="36" width="328" height="428" />
      <line x1="36" y1="250" x2="364" y2="250" />
      <circle cx="200" cy="250" r="52" />
      <rect x="112" y="36" width="176" height="86" />
      <rect x="112" y="378" width="176" height="86" />
    </svg>
  );
}

export function WaxArt({ card, compact = false }: { card: DemoCard; compact?: boolean }) {
  return (
    <div className={cn("wax", rarityWax[card.rarity], compact && "wax-compact")} data-sport={card.sport}>
      <SportField sport={card.sport} />
      <div className="wax-body">
        <p className="wax-num">{card.number}</p>
        <p className="wax-kicker">
          {card.setName}
          {card.list === "auction" && card.clock ? ` · ${card.clock}` : ""}
        </p>
        <p className="wax-name">{lastName(card.athlete)}</p>
        <p className="wax-sport">
          {card.sport} · {card.edition}
        </p>
      </div>
    </div>
  );
}
