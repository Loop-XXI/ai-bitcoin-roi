import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI → Bitcoin ROI Index",
  description:
    "Open index tracking sats earned per AI-credit dollar spent across Lightning-native AI services. Capital efficiency benchmark for the L402 / Cashu economy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="site-header">
            <div className="brand">
              <span className="brand-mark">◐</span>
              <span className="brand-name">AI → Bitcoin ROI Index</span>
            </div>
            <nav className="site-nav">
              <a href="#methodology">Methodology</a>
              <a href="#dataset">Dataset</a>
              <a href="#tip">Tip</a>
            </nav>
          </header>
          {children}
          <Analytics />
          <SpeedInsights />
          <footer className="site-footer">
            <div>Open dataset · JSONL · CC-BY 4.0</div>
            <div className="muted">
              Public revenue numbers are <code>null</code> unless attested. We
              never fabricate.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
