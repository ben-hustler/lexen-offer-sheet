#!/usr/bin/env node
// Converts the legacy single-blob "display" settings (Bubble's offer.savedDisplay field,
// formerly passed to the component as `el.defaultDisplay`) into the two objects the current
// lexen-offer-sheet.js expects: `sharedDisplay` (dealer-facing customization, consumed by
// _applySharedDisplay) and `pdfDisplay` (PDF-rendering-only settings, consumed by
// _applyPdfDisplay). See notes/lexen-offer-sheet-comparison.md for the version history behind
// this split.
//
// Legacy shape (confirmed against real saved records, superset of the old `get display()`
// getter / offer-sheet-simon handoff doc):
//   {
//     mode, valueDisplay, fontSizeIndex, photosPerRow, discLayout, marketDisplay,
//     sectionOrder, pills, groups,
//     taxRatePct, profitName, disclaimerText, disclaimerPunct   // present on newer records
//   }
// taxRatePct/profitName/disclaimerText/disclaimerPunct are carried through when present.
// On older records that predate those fields, they're absent — in that case tax_rate_pct /
// profit_name / disclaimer_text / disclaimer_punct are left null so the component falls back
// to whatever drove them live (the tax-rate / profit-label / disclaimer-text attributes),
// same as before the migration.
//
// selected_emp_idx and locks were never part of any legacy record (no lock concept existed,
// and employee selection was always auto-matched from the payload) — always null / all-false.

import { readFileSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';

const DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'recon', 'photos'];

const DEFAULT_PILLS = {
  'general.condition': true,
  'valuation.retail_value': true,
  'valuation.recon': true,
  'valuation.fixed_overhead': true,
  'valuation.target_profit': true,
  'valuation.tax_savings': true,
  'sections.observations_highlights': true,
  'sections.observations_comments': true,
};

const DEFAULT_LOCKS = {
  mode: false, condition: false, value_display: false, tax_rate_pct: false,
  profit_label: false, font_size: false, photos_per_row: false, disc_layout: false,
  market_display: false, disclaimer: false, section_order: false,
  valuation: false, disclosures: false, observations: false,
  market: false, market_scenarios: false, recon: false, photos: false, signature: false,
};

/** Bubble sometimes hands back an already-parsed object, sometimes a raw JSON string. */
function safeParse(value) {
  if (value == null) return null;
  if (typeof value === 'object') return value;
  if (typeof value !== 'string' || value.trim() === '') return null;
  try {
    return JSON.parse(value);
  } catch (_) {
    return null;
  }
}

function toSections(groups = {}) {
  const sections = {};
  for (const key of ['valuation', 'disclosures', 'observations', 'market', 'recon', 'photos']) {
    sections[key] = (groups[key] ?? 'checked') !== 'unchecked';
  }
  // New feature — legacy records never had this group; default off unless explicitly checked.
  sections.market_scenarios = groups.market_scenarios === 'checked';
  return sections;
}

// The live component only filters section_order against valid keys — it never backfills a
// section that's missing from a stale/short array. For a migration we play it safer and
// append any missing sections at the end, so an old record never silently drops one from
// the rendered layout.
function normalizeSectionOrder(sectionOrder) {
  const filtered = Array.isArray(sectionOrder)
    ? sectionOrder.filter(s => DEFAULT_LAYOUT_ORDER.includes(s))
    : [];
  const missing = DEFAULT_LAYOUT_ORDER.filter(s => !filtered.includes(s));
  return [...filtered, ...missing];
}

/**
 * Converts one legacy `display` / `defaultDisplay` / `savedDisplay` blob into the
 * { sharedDisplay, pdfDisplay } pair the current component expects.
 * Returns { sharedDisplay: null, pdfDisplay: null } when there's nothing to migrate —
 * matches how the component treats an absent/null display today (no override, use defaults).
 */
export function convertLegacyDisplay(rawLegacy) {
  const legacy = safeParse(rawLegacy);
  if (!legacy || typeof legacy !== 'object') {
    return { sharedDisplay: null, pdfDisplay: null };
  }

  const groups = legacy.groups || {};

  const sharedDisplay = {
    sections: toSections(groups),
    market_view: legacy.marketDisplay ?? 'full',
    pills: { ...DEFAULT_PILLS, ...(legacy.pills || {}) },
    section_order: normalizeSectionOrder(legacy.sectionOrder),
    value_display: legacy.valueDisplay ?? 'offer',
    // On older legacy records these were never saved (driven live by the tax-rate/profit-label
    // attributes instead) — leaving them null there preserves that fallback. Newer legacy
    // records do carry a saved override, so pass it through when present.
    tax_rate_pct: legacy.taxRatePct ?? null,
    profit_name: legacy.profitName ?? null,
  };

  const pdfDisplay = {
    mode: legacy.mode ?? 'full',
    font_size_index: legacy.fontSizeIndex ?? 2,
    photos_per_row: legacy.photosPerRow ?? 3,
    disc_layout: legacy.discLayout ?? 'horizontal',
    // Same reasoning as tax_rate_pct/profit_name above.
    disclaimer_text: legacy.disclaimerText ?? null,
    disclaimer_punct: legacy.disclaimerPunct ?? null,
    selected_emp_idx: null,
    signature: (groups.signature ?? 'checked') !== 'unchecked',
    // Locking didn't exist in the legacy component — every legacy record migrates unlocked.
    locks: { ...DEFAULT_LOCKS },
  };

  return { sharedDisplay, pdfDisplay };
}

// ── CLI ──────────────────────────────────────────────────────────────────────
// Usage:
//   node scripts/migrate-legacy-display.js input.json [--out output.json] [--field savedDisplay] [--id-field _id]
//   cat legacy.json | node scripts/migrate-legacy-display.js
//
// input.json can be:
//   - a single legacy display object (or a JSON string of one)
//   - an array of records (e.g. a Bubble Data API export), each holding the legacy display
//     under --field (default: tries savedDisplay, then defaultDisplay, then display, then
//     falls back to treating the whole record as the legacy object)

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = argv[++i];
    else if (a === '--field') args.field = argv[++i];
    else if (a === '--id-field') args.idField = argv[++i];
    else args._.push(a);
  }
  return args;
}

function pickLegacyField(record, explicitField) {
  if (record == null || typeof record !== 'object') return record;
  if (explicitField) return record[explicitField];
  for (const key of ['savedDisplay', 'defaultDisplay', 'display']) {
    if (record[key] !== undefined) return record[key];
  }
  return record; // assume the record itself IS the legacy display object
}

function pickId(record, explicitField) {
  if (explicitField) return record[explicitField];
  return record._id ?? record.id ?? null;
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = args._[0];

  if (!inputPath && process.stdin.isTTY) {
    console.error('Usage: node scripts/migrate-legacy-display.js input.json [--out output.json] [--field name] [--id-field name]');
    console.error('       cat legacy.json | node scripts/migrate-legacy-display.js');
    process.exit(1);
  }

  const raw = inputPath ? readFileSync(inputPath, 'utf8') : await readStdin();
  if (raw.trim() === '') {
    console.error('Usage: node scripts/migrate-legacy-display.js input.json [--out output.json] [--field name] [--id-field name]');
    console.error('       cat legacy.json | node scripts/migrate-legacy-display.js');
    process.exit(1);
  }
  const parsed = JSON.parse(raw);

  let result;
  if (Array.isArray(parsed)) {
    result = parsed.map(record => ({
      id: pickId(record, args.idField),
      ...convertLegacyDisplay(pickLegacyField(record, args.field)),
    }));
  } else {
    result = convertLegacyDisplay(pickLegacyField(parsed, args.field));
  }

  const output = JSON.stringify(result, null, 2);
  if (args.out) {
    writeFileSync(args.out, output);
    console.error(`Wrote ${args.out}`);
  } else {
    console.log(output);
  }
}

const isMain = import.meta.url === pathToFileURL(process.argv[1] || '').href;
if (isMain) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
