import { createFileRoute, Link } from "@tanstack/react-router";
import { marketSearch } from "@/lib/demo";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Not in the wax — BALLN" },
      { name: "description", content: "That page is not on the Balln demo floor." },
    ],
  }),
  component: Missing,
});

function Missing() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-4 py-20">
      <p className="kicker">Pulled from the pack</p>
      <h1 className="display-section mt-3">Not in the wax.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">That page was never in the set. The cards are.</p>
      <Link to="/market" search={marketSearch()} className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full bg-orange px-5 font-display font-bold uppercase text-bg">
        Walk the floor
      </Link>
    </main>
  );
}
