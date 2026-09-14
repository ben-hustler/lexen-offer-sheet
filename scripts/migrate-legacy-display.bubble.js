// ── Legacy display settings → sharedDisplay / pdfDisplay migration aid ─────
// Paste this whole script into a Bubble "Run Javascript" action.
//
// Setup:
//   1. Set `legacyDisplay` below — click into the `null` and use Bubble's
//      "Insert dynamic data" to point at the offer's legacy saved-display field
//      (add ":formatted as JSON-safe" to the dynamic value).
//   2. Set `recordType` below to whichever dynamic value tells you this record's
//      an "offer" or a "template" — passed straight through untouched.
//   3. Add a Toolbox "Run Javascript on page load" / "expose as bubble_fn_"
//      element named `migration_aid` with three text parameters. This script
//      calls bubble_fn_migration_aid([sharedDisplayJson, pdfDisplayJson, recordType])
//      once conversion is done — wire the next workflow step to read those
//      three states; save the first two (raw, no JSON-safe — same as the old
//      display field was saved) into the offer's new sharedDisplay / pdfDisplay
//      fields, and branch on the third to know which record type you're on.
//
// This used to mirror a Node CLI version (migrate-legacy-display.js) for
// running the same conversion outside Bubble — that's been removed, so this
var legacyDisplay = null; // ← replace `null` with the inserted dynamic value
var recordType = null; // ← replace `null` with the inserted dynamic value ("offer" or "template")

(function (legacyDisplayRaw, recordTypeRaw) {

  var DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'market_scenarios', 'selected_scenarios', 'recon', 'photos'];

  var DEFAULT_PILLS = {
    'general.condition': true,
    'valuation.retail_value': true,
    'valuation.recon': true,
    'valuation.fixed_overhead': true,
    'valuation.target_profit': true,
    'valuation.tax_savings': true,
    'sections.observations_highlights': true,
    'sections.observations_comments': true,
  };

  var DEFAULT_LOCKS = {
    mode: false, condition: false, value_display: false, tax_rate_pct: false,
    profit_label: false, font_size: false, photos_per_row: false, disc_layout: false,
    market_display: false, disclaimer: false, section_order: false,
    valuation: false, disclosures: false, observations: false,
    market: false, market_scenarios: false, selected_scenarios: false, recon: false, photos: false, signature: false,
  };

  // Bubble sometimes hands back an already-parsed object, sometimes a raw JSON string.
  function safeParse(value) {
    if (value == null) return null;
    if (typeof value === 'object') return value;
    if (typeof value !== 'string' || value.trim() === '') return null;
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  // Legacy `groups[key]` shows up as either the tri-state string
  // ('checked'/'unchecked'/'indeterminate') the live component uses, or a
  // plain boolean on some records. A raw `!== 'unchecked'` string compare
  // treats boolean `false` as "not the string unchecked" — i.e. shown — so
  // normalize both shapes here instead. `defaultShown` is what a
  // missing/null key falls back to.
  function isGroupChecked(raw, defaultShown) {
    if (raw == null) return defaultShown;
    if (typeof raw === 'boolean') return raw;
    return raw !== 'unchecked';
  }

  // market_scenarios/selected_scenarios are new — no legacy record ever had
  // them, so only an explicit affirmative counts as on (unlike the six
  // above, which default to shown). Same boolean-vs-string normalization.
  function isGroupExplicitlyOn(raw) {
    if (typeof raw === 'boolean') return raw;
    return raw === 'checked';
  }

  function toSections(groups) {
    groups = groups || {};
    var sections = {};
    ['valuation', 'disclosures', 'observations', 'market', 'recon', 'photos'].forEach(function (key) {
      sections[key] = isGroupChecked(groups[key], true);
    });
    sections.market_scenarios = isGroupExplicitlyOn(groups.market_scenarios);
    sections.selected_scenarios = isGroupExplicitlyOn(groups.selected_scenarios);
    return sections;
  }

  // Only filters against valid keys, then appends any section missing from the
  // legacy order at the end — so a stale/short array never drops a section
  // from the rendered layout.
  function normalizeSectionOrder(sectionOrder) {
    var filtered = Array.isArray(sectionOrder)
      ? sectionOrder.filter(function (s) { return DEFAULT_LAYOUT_ORDER.indexOf(s) !== -1; })
      : [];
    var missing = DEFAULT_LAYOUT_ORDER.filter(function (s) { return filtered.indexOf(s) === -1; });
    return filtered.concat(missing);
  }

  // Converts one legacy `display` / `defaultDisplay` / `savedDisplay` blob into the
  // { sharedDisplay, pdfDisplay } pair the current lexen-offer-sheet.js expects.
  function convertLegacyDisplay(rawLegacy) {
    var legacy = safeParse(rawLegacy);
    if (!legacy || typeof legacy !== 'object') {
      return { sharedDisplay: null, pdfDisplay: null };
    }

    var groups = legacy.groups || {};

    var sharedDisplay = {
      sections: toSections(groups),
      market_view: legacy.marketDisplay != null ? legacy.marketDisplay : 'full',
      pills: Object.assign({}, DEFAULT_PILLS, legacy.pills || {}),
      section_order: normalizeSectionOrder(legacy.sectionOrder),
      value_display: legacy.valueDisplay != null ? legacy.valueDisplay : 'offer',
      // Carried through when the legacy record has them (newer records do); left null on
      // older records so the component falls back to the tax-rate/profit-label attributes,
      // same as before the migration.
      tax_rate_pct: legacy.taxRatePct != null ? legacy.taxRatePct : null,
      profit_name: legacy.profitName != null ? legacy.profitName : null,
    };

    var pdfDisplay = {
      mode: legacy.mode != null ? legacy.mode : 'full',
      font_size_index: legacy.fontSizeIndex != null ? legacy.fontSizeIndex : 2,
      photos_per_row: legacy.photosPerRow != null ? legacy.photosPerRow : 3,
      disc_layout: legacy.discLayout != null ? legacy.discLayout : 'horizontal',
      // Same reasoning as tax_rate_pct/profit_name above.
      disclaimer_text: legacy.disclaimerText != null ? legacy.disclaimerText : null,
      disclaimer_punct: legacy.disclaimerPunct != null ? legacy.disclaimerPunct : null,
      // Never part of any legacy record — employee selection was always auto-matched
      // from the payload, so there's nothing to carry forward.
      selected_emp_idx: null,
      signature: isGroupChecked(groups.signature, true),
      // Locking didn't exist in the legacy component — every legacy record migrates unlocked.
      locks: Object.assign({}, DEFAULT_LOCKS),
    };

    return { sharedDisplay: sharedDisplay, pdfDisplay: pdfDisplay };
  }

  var result = convertLegacyDisplay(legacyDisplayRaw);

  bubble_fn_migrationAid([
    result.sharedDisplay ? JSON.stringify(result.sharedDisplay) : '',
    result.pdfDisplay ? JSON.stringify(result.pdfDisplay) : '',
    recordTypeRaw
  ]);

})(legacyDisplay, recordType);
