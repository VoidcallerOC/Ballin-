import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <p className="kicker">Whistle</p>
      <h1 className="font-display text-5xl font-bold uppercase">The whistle blew.</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
      <button
        type="button"
        className="inline-flex min-h-11 items-center rounded-full bg-pink px-5 font-display text-base font-bold uppercase tracking-wide text-pink-ink"
        onClick={() => window.location.reload()}
      >
        Run it back
      </button>
    </main>
  );
}
