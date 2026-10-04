import { useState } from "react";

const CONTRACT = "0x4Afc7838167b77530278483c3d8c1fFe698a912E";
const PHARAOH =
  "https://www.phar.gg/trade?inputCurrency=0x0000000000000000000000000000000000000000&outputCurrency=0x4Afc7838167b77530278483c3d8c1fFe698a912E";

const manifesto = [
  ["01", "Sports first, crypto second.", "A community of fans who happen to live on-chain. The token is the membership card. The game is the point."],
  ["02", "Real-world, on-chain.", "Betting pools on NBA and NFL games with token stakes. Sponsorship of grassroots tournaments. Real teams, real games, real utility."],
  ["03", "Empowering youth through sport.", "Honoring the heritage while building the infrastructure for the next athletes and fans."],
  ["04", "Avalanche-native.", "ERC-314 on Apex Defi. Tradeable on Apex, Trader Joe (LFJ), Pangolin, and Pharaoh. Fast finality, low fees, big energy."],
];

const impact = [
  ["We sponsor athletes", "When a player has the talent but not the budget, BALLN steps in. Money should never decide who gets to play."],
  ["Travel, fees and gear", "Tournament entry, flights, uniforms, shoes. The quiet costs that sideline real talent. We take them off the table."],
  ["Coaching toward college", "Athletes train with current college coaches on the national circuit. Reps and exposure, aimed at a scholarship."],
  ["A national stage", "From Portland gyms to the Athens chapter. Events where the next generation gets seen."],
];

const grit = [
  ["G", "Gratitude", "For the game, the team, the chance to play."],
  ["R", "Resiliency", "Get back up. Every play, every game."],
  ["I", "Intensity", "Every minute. Full effort. No coasting."],
  ["T", "Togetherness", "One team. One unit. One mission."],
];

const squad = [
  ["Founder and head coach", "Coach Minor", "Builds real youth basketball teams and runs Friday X Spaces.", "https://x.com/BallnToken3", "@BallnToken3"],
  ["Hoops scout", "Hoop Dreams", "Eyes on every gym, court, and prospect.", "https://x.com/hoopdreamsbball", "@hoopdreamsbball"],
  ["Ambassador", "Athanasia", "Repping BALLN across the timeline.", "https://x.com/GreekAesthete", "@GreekAesthete"],
  ["Community leader", "Tommy", "Rallies the squad and keeps the energy up.", "https://x.com/onecalledthomas", "@onecalledthomas"],
  ["Community", "Zookie", "Plugged into the chats, the cabal, and the culture.", "https://x.com/ZoranGutan", "@ZoranGutan"],
];

export function FromTheCourt() {
  const [copied, setCopied] = useState(false);

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6" aria-labelledby="manifesto-title">
        <p className="kicker">The manifesto</p>
        <h2 id="manifesto-title" className="display-section mt-2 max-w-3xl">
          Built for the love of the game.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A sports community sponsoring grassroots athletes, funding tournaments, and putting young ballers on the path to college. The token keeps the lights on.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {manifesto.map(([n, title, body]) => (
            <li key={n} className="rounded-card border border-line bg-surface p-5">
              <p className="font-display text-4xl leading-none text-orange">{n}</p>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl text-sm text-faint">
          Their words, from weballn.com. This demo does not run betting pools, stakes, or a live buy.
        </p>
      </section>

      <section className="border-y border-line" aria-labelledby="why-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
          <p className="kicker">Proof of impact</p>
          <h2 id="why-title" className="display-section mt-2 max-w-3xl">
            Why we balln.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">Real money behind real kids. On the court, not the charts.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {impact.map(([title, body]) => (
              <div key={title}>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6" aria-labelledby="grit-title">
        <p className="stamp text-xs text-cyan">Portland · AAU</p>
        <h2 id="grit-title" className="display-section mt-2">
          Built on GRIT.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Coach Minor's flagship. A Portland AAU club where high school athletes train with current college coaches and play the national circuit. BALLN sponsors the athletes — travel, tournament fees, and gear — so money never sidelines talent.
        </p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {grit.map(([letter, word, body]) => (
            <li key={letter} className="rounded-card border border-line p-5">
              <p className="font-display text-6xl leading-none text-pink">{letter}</p>
              <h3 className="mt-3 text-xl font-semibold">{word}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="squad" className="border-t border-line" aria-labelledby="squad-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
          <p className="kicker">The squad</p>
          <h2 id="squad-title" className="display-section mt-2">
            The people behind the ball.
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {squad.map(([role, name, body, href, handle]) => (
              <li key={handle} className="rounded-card border border-line bg-surface p-5">
                <p className="stamp text-xs text-cyan">{role}</p>
                <h3 className="mt-2 font-display text-4xl leading-none font-bold uppercase">{name}</h3>
                <p className="mt-3 text-muted">{body}</p>
                <a className="mt-3 inline-flex min-h-11 items-center text-pink" href={href}>
                  {handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line" aria-labelledby="corner-title">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1.3fr_0.7fr] md:items-end md:px-6">
          <div>
            <p className="kicker">Coaching corner</p>
            <h2 id="corner-title" className="display-section mt-2">
              Live Fridays.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Coach Brant Minor breaks down the game, the chain, and everything in between. X Spaces plus a pod. Brant, Haxx, and Hoops. '90s sports talk energy. Spaces start Friday nights. Bring your $BALLN, win raffles.
            </p>
          </div>
          <a
            href="https://x.com/BallnToken3"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-5 font-display text-base font-bold uppercase tracking-wide text-bg"
          >
            Drop in on X
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6" aria-labelledby="token-title">
        <p className="kicker">The token</p>
        <h2 id="token-title" className="display-section mt-2 max-w-3xl">
          Get on the court.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          One contract. Four DEXs. Zero gatekeepers. Est. June 2024. The floor on this site is still a demo — these facts are the live token.
        </p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Network", "Avalanche C-Chain"],
            ["Standard", "ERC-314 via Apex Defi"],
            ["Launched", "June 2024"],
            ["Tradeable on", "Apex · LFJ · Pangolin · Pharaoh"],
          ].map(([term, detail]) => (
            <div key={term} className="rounded-card border border-line p-4">
              <dt className="stamp text-xs text-faint">{term}</dt>
              <dd className="mt-2 font-semibold">{detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-col gap-3 rounded-card border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="stamp text-xs text-faint">Contract</p>
            <p className="mt-1 truncate font-mono text-sm">{CONTRACT}</p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-line px-4 font-display text-base font-bold uppercase tracking-wide"
            onClick={copyContract}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={PHARAOH}
            className="inline-flex min-h-11 items-center rounded-full bg-orange px-5 font-display text-base font-bold uppercase tracking-wide text-bg"
          >
            Buy $BALLN
          </a>
          <a
            href="https://moats.app"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-display text-base font-bold uppercase tracking-wide"
          >
            Stake on moats.app
          </a>
        </div>
      </section>
    </>
  );
}
