import fs from "node:fs";
import path from "node:path";
import TipJar from "./TipJar";

type Entry = {
  id: string;
  company: string;
  category: string;
  url: string;
  model: string;
  stated_pricing: string;
  funded_grant_usd: number | null;
  funded_source: string | null;
  public_revenue_sats: number | null;
  public_revenue_period: string | null;
  credibility_notes: string;
  sources: string[];
  logged_at: string;
};

function loadDataset(): Entry[] {
  const file = path.join(process.cwd(), "data", "dataset.jsonl");
  const raw = fs.readFileSync(file, "utf8");
  return raw
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .map((l) => JSON.parse(l) as Entry);
}

function fmtUSD(n: number | null) {
  if (n === null || n === undefined) return null;
  return `$${n.toLocaleString("en-US")}`;
}

function fmtSats(n: number | null) {
  if (n === null || n === undefined) return null;
  return `${n.toLocaleString("en-US")} sats`;
}

export default function Page() {
  const dataset = loadDataset();
  const totalEntries = dataset.length;
  const fundedKnown = dataset.filter((e) => e.funded_grant_usd !== null).length;
  const revenueAttested = dataset.filter(
    (e) => e.public_revenue_sats !== null
  ).length;
  const totalGrantsUSD = dataset.reduce(
    (a, b) => a + (b.funded_grant_usd ?? 0),
    0
  );

  return (
    <main>
      <section className="hero">
        <h1>
          How many sats per dollar of <span className="accent">AI credits</span>?
        </h1>
        <p className="lede">
          Open, attested index of Lightning-native AI services. We track sats
          earned per dollar of AI inference spent — the capital efficiency of
          the L402 and Cashu economy. No paid placements. No fabricated
          numbers. Where revenue is not public, the cell is{" "}
          <code>null</code>.
        </p>
        <div className="kpis">
          <div className="kpi">
            <div className="label">Companies indexed</div>
            <div className="value">{totalEntries}</div>
            <div className="sub">Seed cohort · v0.1</div>
          </div>
          <div className="kpi">
            <div className="label">Grants/funding logged</div>
            <div className="value">{fmtUSD(totalGrantsUSD)}</div>
            <div className="sub">
              {fundedKnown}/{totalEntries} entries with public number
            </div>
          </div>
          <div className="kpi">
            <div className="label">Revenue attested</div>
            <div className="value">
              {revenueAttested}/{totalEntries}
            </div>
            <div className="sub">Self-reported or third-party</div>
          </div>
          <div className="kpi">
            <div className="label">Sats per $ of AI</div>
            <div className="value muted">—</div>
            <div className="sub">Insufficient public data (yet)</div>
          </div>
        </div>
      </section>

      <section id="dataset">
        <h2>Dataset</h2>
        <p className="section-note">
          Each row is a Lightning-native AI service or supporting protocol.
          Funding is the most-recent public grant or round. Public revenue is
          only filled when the operator has attested a number — never
          estimated. See <a href="#methodology">methodology</a> for the
          inclusion rules.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Category</th>
                <th>Funded (USD)</th>
                <th>Public revenue (sats)</th>
                <th>Period</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((e) => (
                <tr key={e.id}>
                  <td>
                    <a href={e.url} target="_blank" rel="noreferrer noopener">
                      {e.company}
                    </a>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {e.credibility_notes}
                    </div>
                  </td>
                  <td>
                    <span className="pill">{e.category}</span>
                  </td>
                  <td className="num">
                    {e.funded_grant_usd === null ? (
                      <span className="null">null</span>
                    ) : (
                      <>
                        {fmtUSD(e.funded_grant_usd)}
                        <div className="muted" style={{ fontSize: 11 }}>
                          {e.funded_source}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="num">
                    {e.public_revenue_sats === null ? (
                      <span className="null">null</span>
                    ) : (
                      fmtSats(e.public_revenue_sats)
                    )}
                  </td>
                  <td className="num">
                    {e.public_revenue_period ?? (
                      <span className="null">—</span>
                    )}
                  </td>
                  <td>
                    {e.sources.slice(0, 2).map((s, i) => (
                      <div key={i} style={{ fontSize: 12 }}>
                        <a
                          href={s}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {new URL(s).hostname.replace(/^www\./, "")}
                        </a>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>
          Want your company added or a number corrected? Open an issue on the
          dataset repo (link forthcoming) or tip the BOLT12 offer with a memo.
        </p>
      </section>

      <section id="methodology">
        <h2>Methodology</h2>
        <div className="methodology">
          <ol>
            <li>
              <strong>Inclusion.</strong> A service is included if it accepts
              Lightning, Cashu, or Liquid payments for AI inference or directly
              serves the Lightning-AI economy (protocols, directories,
              tooling).
            </li>
            <li>
              <strong>Revenue.</strong> Only attested public numbers count.
              Self-reported is allowed but flagged. Estimates are{" "}
              <code>null</code>.
            </li>
            <li>
              <strong>Funding.</strong> Most recent public grant or round, USD.
              Includes OpenSats grants, public crowdfunding, disclosed VC.
            </li>
            <li>
              <strong>The ROI ratio.</strong> Once enough rows have both AI
              credit spend and sats earned, we will compute{" "}
              <code>sats_per_usd_ai = sats_earned / usd_ai_spent</code>. Until
              then the column is <code>—</code> and we say so.
            </li>
            <li>
              <strong>No fabrication.</strong> If a number is not public, it
              stays <code>null</code>. Better an empty cell than a wrong one.
            </li>
            <li>
              <strong>License.</strong> Dataset is CC-BY 4.0. JSONL source is
              public.
            </li>
          </ol>
        </div>
        <div className="callout">
          <strong>Why this exists.</strong> Lightning-AI has directories (uptime,
          discovery) but no capital-efficiency benchmark. If you spend $100 on
          OpenAI credits to run a service, how many sats come back? Right now
          nobody publishes that number. We are starting the conversation.
        </div>
      </section>

      <section>
        <TipJar />
      </section>
    </main>
  );
}
