# Recon / Highlights payload changes — what Bubble needs to send

This documents the new `payload.recon` / `payload.observations` shape the offer-sheet
renderer (`render.py`) and the `<lexen-offer-sheet>` component now expect, and exactly
what to change in the Bubble "Run Javascript" payload-assembly script to produce it.

**Nothing here touches `payload.display`.** The summary/detail toggles (`recon_view`,
`highlights_view`) and the visibility pills (`sections.recon_breakdown`,
`sections.observations_highlights`) are entirely client-side state inside
`<lexen-offer-sheet>`, saved/restored opaquely through `el.defaultDisplay` /
`bubble_fn_saveDisplay`. Bubble doesn't need to know their shape — it just keeps storing
and replaying whatever JSON blob the component hands it, same as today.

## New payload shape

```jsonc
payload.recon = {
  items: [                          // presets + custom "Other" — UNCHANGED, same source/shape as today
    { "description": "Oil Change", "amount": 130 },
  ],
  damages: [                        // NEW — one entry per damage InspectionNote (was collapsed into a single
    { "description": "Front bumper scratch", "amount": 350 },  // "Visible Damage (N)" row merged into `items`)
    { "description": "Windshield chip", "amount": 150 },
  ],
  total: 3500,                      // UNCHANGED formula: reconAmount + reconAdjustment. Must stay numerically
},                                   // equal to payload.valuation.recon_total (see "Keep these in sync" below).

payload.observations = {
  highlights: [                     // NEW — was a single freeform joined-text string. Now itemized, one entry
    { "description": "Upgraded alloy wheels", "amount": 500 },  // per highlight InspectionNote, carrying the
    { "description": "New tires", "amount": 750 },              // note's highlightAmount for the first time.
  ],
  comments: "Vehicle Comments",     // UNCHANGED
  claims: { "count": 0, "amount": 0 },  // UNCHANGED
};
```

`payload.recon.highlights` does **not** exist — highlights live under `observations`,
never under `recon`, and their amounts never factor into `recon.total` /
`valuation.recon_total` / the offer amount. That's intentional: a highlight's
"added value" is informational only (mirrors the inspection tool's own invariant that
`highlightAmount` never feeds recon math).

## What's unchanged

- `payload.recon.items` — same `reconItems` merge/sort/format-as-JSON logic as today, untouched.
- `payload.valuation.recon_total` — same formula (`reconAmount + reconAdjustment`), untouched.
- `payload.recon.total` — same formula, untouched — just needs to keep matching `valuation.recon_total` (already guaranteed today since both come from the identical expression).
- `payload.photos` — the per-photo caption logic (`p.highlight`, `p.repairPart`, `p.repairAmount`) is a separate, independent display area and doesn't need to change.
- Everything else in the script (dealer, employee, customer, vehicle, offer, disclosures, market, employees, display-settings wiring) — untouched.

## Script changes

### 1. Recon — stop collapsing damages into `items`, send them individually

**Remove:**
```js
var _dmgCount  = Number("Search for InspectionNotes:count");
var _dmgAmount = Number("Search for InspectionNotes:each item's repairAmount:sum");
```
and the merge that prepends the synthetic aggregate row:
```js
var _reconItems = [{"description": "Visible Damage (" + _dmgCount + ")", "amount": _dmgAmount}].concat(_reconBase);
```

**Replace with** a real itemized search over damage notes, reshaped the same way
`market.comparables` already is (raw search → `safeParse` → `.map()`):
```js
var damagesRaw = '[' + `Search for InspectionNotes (appraisal = this appraisal, noteType = Damages, repairAmount > 0) formatted as JSON text` + ']';
var damagesParsed = safeParse(damagesRaw) || [];
var _damages = damagesParsed.map(function(d) {
  return { description: d.repairPart || 'Damage', amount: Number(d.repairAmount) || 0 };
});
```

**Update the `payload.recon` assignment:**
```js
payload.recon = {
  items: _reconBase,     // was `_reconItems` (the merged-in-damages version) — now just the presets/other list
  damages: _damages,     // NEW
  total: Number("Current page's Offer's appraisal's reconAmount") + Number("Current page's Offer's appraisal's reconAdjustment"), // unchanged
};
```

### 2. Observations — highlights become itemized, not a joined string

**Remove:**
```js
var _highlights = `Search for InspectionNotes:format as text`;
```

**Replace with** the same raw-search-then-map pattern:
```js
var highlightsRaw = '[' + `Search for InspectionNotes (appraisal = this appraisal, noteType = Highlights) formatted as JSON text` + ']';
var highlightsParsed = safeParse(highlightsRaw) || [];
var _highlightItems = highlightsParsed.map(function(h) {
  return { description: h.highlight || h.description || 'Highlight', amount: Number(h.highlightAmount) || 0 };
});
```

**Update the `payload.observations` assignment:**
```js
payload.observations = {
  highlights: _highlightItems,  // was the plain `_highlights` string
  comments:   _comments,        // unchanged
  claims: {
    count:  Number("Current page's Offer's appraisal's vehicleClaims is Yes:formatted as text"),
    amount: Number("Current page's Offer's appraisal's vehicleClaims is Yes:formatted as text"),
  },
};
```

## Things to double-check on the Bubble side

- **Field names are illustrative.** `repairPart` / `repairAmount` / `highlight` are the
  field names this same script already references elsewhere (in the `payload.photos`
  caption logic), so they're the best guess for the InspectionNote data type — confirm
  they're the actual field names before wiring the searches above.
- **`highlightAmount` (or whatever it's called on the InspectionNote data type) has
  never been queried into any payload before.** It's captured and saved by the
  inspection tool today, but no existing Bubble script reads it back out — this is new
  plumbing, not a rename. Confirm the field exists and is populated on real records
  before shipping, or highlights will show `$0` amounts even when data was entered.
- **Keep `recon.total` and `valuation.recon_total` numerically identical.** The offer
  sheet's Recon card derives its displayed "Recon Adjustment" line by subtracting
  `items` + `damages` back out of `valuation.recon_total` (not `recon.total`, which
  render.py doesn't read at all — it's kept only for parity/debugging). If the two
  ever drift apart, the Recon card's total will disagree with the Valuation section's
  "Recon" row.
