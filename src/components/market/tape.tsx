import { Link } from "@tanstack/react-router";
import { WaxArt } from "@/components/market/wax";
import { beats, cardById, collectorById, type DemoBeat } from "@/lib/demo";

export function Tape({ items = beats }: { items?: DemoBeat[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((beat) => {
        const card = cardById(beat.cardId);
        const actor = collectorById(beat.actorId);
        if (!card || !actor) return null;
        return (
          <li key={beat.id}>
            <Link
              to="/card/$id"
              params={{ id: card.id }}
              className="flex min-h-16 items-center gap-3 rounded-card border border-line bg-surface p-2 pr-4"
            >
              <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md">
                <WaxArt card={card} compact />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">
                  {actor.name} {beat.verb} {card.athlete}
                </span>
                <span className="stamp text-xs text-orange">Demo · {beat.detail}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
