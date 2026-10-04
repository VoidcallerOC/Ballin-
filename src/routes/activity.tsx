import { createFileRoute } from "@tanstack/react-router";
import { Tape } from "@/components/market/tape";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "The tape — BALLN demo" },
      {
        name: "description",
        content: "Staged collector activity for the Balln demo. Not live sales.",
      },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
      <p className="kicker">Not a sale feed</p>
      <h1 className="display-section mt-2">The tape.</h1>
      <p className="mt-3 max-w-xl text-muted">
        What the floor would feel like if people were actually moving cards. Every line is written for the demo. Nobody paid.
      </p>
      <div className="mt-8">
        <Tape />
      </div>
    </main>
  );
}
