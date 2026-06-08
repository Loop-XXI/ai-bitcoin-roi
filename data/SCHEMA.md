# Dataset Schema (`dataset.jsonl`)

One JSON object per line. Fields:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable id: `ext_YYYY-MM-DD_NNN` |
| `company` | string | Service / project name |
| `category` | string | Free-form tag |
| `url` | string | Canonical homepage / repo |
| `model` | string | One-line pricing/business model |
| `stated_pricing` | string | Operator-stated pricing detail |
| `funded_grant_usd` | number \| null | Most recent public grant or round, USD. `null` if unknown. |
| `funded_source` | string \| null | Where the funding came from |
| `public_revenue_sats` | number \| null | Attested revenue in sats. **Never estimate. Always `null` if not public.** |
| `public_revenue_period` | string \| null | The period the revenue covers |
| `credibility_notes` | string | Short note on trustworthiness of figures |
| `sources` | string[] | URLs backing the row |
| `logged_at` | string (YYYY-MM-DD) | When the row was first added |

## Contributing a row

Open a PR. We will reject rows that fill in revenue without a source.
