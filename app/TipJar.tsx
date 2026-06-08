"use client";

import { useState } from "react";

const OFFER =
  "lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qt9z5663l7xhwce70p83yrnqmx7hx7jsns0z67qh5g4ajc5rcam6zqsresyucd3d8cps7kvunh9daw6mp5hew454e676dcnfzx4jpddq4lkqqv7stuk0g8q284zlrf8488drlzeywu9v5qz8pn34r38esfd8nakdjyuz7aw3ef0ac9tqhdmghe8vrd0r04fkqgz50nrcc60dsn6mwwcq4ye73q5msv0vlzjafs92dsg26nm9k0k5kqqsev35suv8skzeprn7quj47hwjfu";

export default function TipJar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(OFFER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <div className="tip" id="tip">
      <h3>Tip the index</h3>
      <p>
        This index runs on volunteer time and AI credits. If a row here saved
        you research, tip into the reusable BOLT12 offer below — any amount,
        any time. Tips are tracked publicly in the project ledger.
      </p>
      <div className="offer-box">
        <input readOnly value={OFFER} aria-label="BOLT12 offer" />
      </div>
      <div className="tip-buttons" style={{ marginTop: 12 }}>
        <button className="btn" onClick={copy}>
          {copied ? "Copied" : "Copy offer"}
        </button>
        <a className="btn secondary" href={`lightning:${OFFER}`}>
          Open in wallet
        </a>
      </div>
      <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
        Reusable Phoenix-backed BOLT12. Never a one-shot invoice.
      </p>
    </div>
  );
}
