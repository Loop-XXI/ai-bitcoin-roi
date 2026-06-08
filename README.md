# AI → Bitcoin ROI Index

Open index tracking **sats earned per AI-credit dollar spent** across Lightning-native AI services. Capital-efficiency benchmark for the L402 / Cashu economy.

**Live:** https://ai-bitcoin-roi.vercel.app

## What this is

Most directories tell you *which* Lightning-AI services exist and *whether* they're up. This index asks the harder question:

> If a service spends $X on AI inference (OpenAI, Anthropic, OpenRouter, ...), how many sats does it earn back in user payments?

That ratio — `sats_per_usd_ai` — is the capital efficiency benchmark for the entire Lightning-AI economy. Until someone publishes it, no one knows whether these businesses are viable.

## Rules

1. **No fabrication.** Public revenue numbers are `null` unless attested by the operator or a credible third party.
2. **Funding** = most recent public grant or round, USD.
3. Inclusion: accepts Lightning, Cashu, or Liquid payments for AI inference, OR is core L402 / Cashu infrastructure.
4. License: dataset is CC-BY 4.0. Source code is MIT.

## Dataset

Source of truth: [`data/dataset.jsonl`](data/dataset.jsonl) — one JSON object per line. Schema lives in the file's first row of comments inside the project ledger repo.

## Contribute

- Open a PR adding a row to `data/dataset.jsonl`
- Or open an issue with a public link backing the number
- Or tip the [BOLT12 offer](https://ai-bitcoin-roi.vercel.app/#tip) with a memo

## Tech

Next.js 14 (app router) · static export · Vercel. Reusable Phoenix-backed BOLT12 offer for tips.

## License

Code: MIT. Dataset: CC-BY 4.0.
