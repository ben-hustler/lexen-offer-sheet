import { LitElement, html, css, nothing } from 'lit';

// ── Template placeholder payload ──────────────────────────────────────────────
function fmtPhone(p) {
  const digits = String(p || '').replace(/\D/g, '');
  if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits[0] === '1') return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  return p || '';
}


function _templatePayload() {
  const today = new Date();
  const validUntil = new Date(today); validUntil.setDate(today.getDate() + 30);
  const fmt = d => d.toISOString().slice(0, 10);

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const address = '1234 Street\nCity, PR';

  return {
    dealer: {
      name: 'Dealership Name', location: 'Dealership Name',
      address,
      phone: null, logo_url: null,
    },
    employee: { name: 'Employee Name', phone: '(000) 000-0000' },
    customer: { name: 'Customer Name' },
    vehicle: {
      year: 2024, make: 'Make', model: 'Model', trim: 'Trim',
      color: 'Colour', vin: '1A2B3C4D5E6F7G8H9', mileage_km: 50000,
    },
    offer: {
      amount: 25000, valid_until: fmt(validUntil),
      appraisal_date: fmt(today), classification: 'Good Condition',
    },
    valuation: {
      retail_value: 32000, recon_total: 2500, fixed_overhead: 500,
      target_profit: { amount: 2500, label: 'Target Profit' },
      tax_savings: { rate_pct: 13.0, amount: 3250, gross_value: 28250 },
    },
    disclosures: [
      { question: 'Disclosure Question #1', answer: 'Answer #1' },
      { question: 'Disclosure Question #2', answer: 'Answer #2' },
      { question: 'Disclosure Question #3', answer: 'Answer #3' },
    ],
    observations: {
      highlights: 'Vehicle Highlights',
      comments: 'Vehicle Comments',
      claims: { count: 0, amount: 0 },
    },
    market: {
      summary: {
        comparables_count: 6, avg_mileage_km: 45000,
        avg_price: 35000, avg_distance_km: 100, avg_days: 90,
      },
      comparables: [
        { year: 2024, description: 'Make Model', trim: 'Trim A', vin: '1A2B3C4D5E6F7G8H1', dealer: 'Dealer Name', mileage_km: 42000, price: 36500, distance_km: 85, days_on_market: 45 },
        { year: 2024, description: 'Make Model', trim: 'Trim B', vin: '1A2B3C4D5E6F7G8H2', dealer: 'Dealer Name', mileage_km: 38000, price: 37200, distance_km: 120, days_on_market: 30 },
        { year: 2024, description: 'Make Model', trim: 'Trim C', vin: '1A2B3C4D5E6F7G8H3', dealer: 'Dealer Name', mileage_km: 51000, price: 34800, distance_km: 60,  days_on_market: 90 },
        { year: 2023, description: 'Make Model', trim: 'Trim A', vin: '1A2B3C4D5E6F7G8H4', dealer: 'Dealer Name', mileage_km: 65000, price: 33000, distance_km: 95,  days_on_market: 120 },
        { year: 2023, description: 'Make Model', trim: 'Trim D', vin: '1A2B3C4D5E6F7G8H5', dealer: 'Dealer Name', mileage_km: 47000, price: 35500, distance_km: 150, days_on_market: 60 },
        { year: 2024, description: 'Make Model', trim: 'Trim B', vin: '1A2B3C4D5E6F7G8H6', dealer: 'Dealer Name', mileage_km: 29000, price: 38000, distance_km: 110, days_on_market: 15 },
      ],
    },
    recon: {
      items: [
        { description: 'Recon Item #1', amount: 1000 },
        { description: 'Recon Item #2', amount: 1000 },
        { description: 'Recon Item #3', amount: 500 },
      ],
      total: 2500,
    },
    photos: [
      { url: 'placeholder', category: 'Exterior', caption: null },
      { url: 'placeholder', category: 'Exterior', caption: null },
      { url: 'placeholder', category: 'Exterior', caption: null },
      { url: 'placeholder', category: 'Exterior', caption: null },
      { url: 'placeholder', category: 'Exterior', caption: null },
      { url: 'placeholder', category: 'Interior', caption: null },
      { url: 'placeholder', category: 'Interior', caption: null },
      { url: 'placeholder', category: 'Interior', caption: null },
      { url: 'placeholder', category: 'Interior', caption: null },
      { url: 'placeholder', category: 'Highlights', caption: null },
      { url: 'placeholder', category: 'Highlights', caption: null },
      { url: 'placeholder', category: 'Damages ($000)', caption: 'Sample Damage' },
    ],
    disclaimer: ', subject to Carfax History and Lien Report',
  };
}


// ── Font size options ─────────────────────────────────────────────────────────
const FONT_SIZE_OPTIONS = [
  { label: 'Extra Small', delta: -1 },
  { label: 'Small',       delta:  0 },
  { label: 'Medium',      delta:  1 },
  { label: 'Large',       delta:  2 },
  { label: 'Extra Large', delta:  3 },
];

const DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'market_scenarios', 'selected_scenarios', 'recon', 'photos'];

const SECTION_LABELS = {
  valuation: 'Valuation', disclosures: 'Disclosures', observations: 'Observations',
  market: 'Market Comparables', market_scenarios: 'Market Scenarios', selected_scenarios: 'Selected Scenarios',
  recon: 'Recon', photos: 'Photos',
};

// Per-field pills for the Market/Selected Scenarios KPI grids — mirrors
// SCENARIO_FIELD_DEFS in render.py. "{basis}" is replaced with "Market" or
// "Selected" depending on which group the pill belongs to.
const SCENARIO_FIELDS = [
  { key: 'vehicles',    label: 'Vehicles' },
  { key: 'avgRetail',   label: 'Average Retail' },
  { key: 'avgMileage',  label: 'Average Mileage' },
  { key: 'listedDays',  label: 'Listed Days' },
  { key: 'prcMkt',      label: 'Price to {basis}' },
  { key: 'prcMktAdj',   label: 'Adj. Price to {basis}' },
  { key: 'costMkt',     label: 'Cost to {basis}' },
  { key: 'priceRank',   label: 'Price Rank' },
  { key: 'mileageRank', label: 'Mileage Rank' },
  { key: 'perception',  label: 'Perception' },
  { key: 'retail',      label: 'Retail' },
  { key: 'ACV',         label: 'Actual Cash Value' },
];

// ── Chevron + lock SVG helpers ────────────────────────────────────────────────
const chevronSvg    = html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const lockClosedSvg = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const lockOpenSvg   = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const undoSvg       = html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="9 14 4 9 9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 20v-7a4 4 0 0 0-4-4H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ── Main component ────────────────────────────────────────────────────────────
export class LexenOfferSheet extends LitElement {

  static properties = {
    // Public attributes
    apiBaseUrl:     { type: String,  attribute: 'api-base-url' },
    apiMode:        { type: String,  attribute: 'api-mode' },
    authToken:      { type: String,  attribute: 'auth-token' },
    templateMode:   { type: Boolean, attribute: 'template-mode' },
    taxRate:        { type: Number,  attribute: 'tax-rate' },
    profitLabel:    { type: String,  attribute: 'profit-label' },
    disclaimerText: { type: String,  attribute: 'disclaimer-text' },

    // Public properties (settable from Bubble JS)
    payload:        { type: Object },
    sharedDisplay:  { type: Object },
    pdfDisplay:     { type: Object },
    employees:      { type: Array },
    locked:         { type: Boolean },

    _selectedEmployeeIndex: { type: Number, state: true },

    // Internal reactive state
    _vehicleInfo:       { type: Object,  state: true },

    _generalOpen:       { type: Boolean, state: true },
    _layoutOpen:        { type: Boolean, state: true },
    _showHideOpen:      { type: Boolean, state: true },

    _mode:              { type: String,  state: true },  // 'full' | 'one_page'
    _valueDisplay:      { type: String,  state: true },  // 'offer' | 'tax_savings'
    _taxRatePct:        { type: Number,  state: true },  // tax savings rate as % (e.g. 12 for 12%)
    _profitName:        { type: String,  state: true },  // target profit label override
    _disclaimerText:    { type: String,  state: true },  // footer disclaimer text override
    _disclaimerPunct:   { type: String,  state: true },  // punctuation prepended to disclaimer ('.' | ',' | '')
    _fontSizeIndex:     { type: Number,  state: true },
    _photosPerRow:      { type: Number,  state: true },
    _discLayout:        { type: String,  state: true },  // 'vertical' | 'horizontal'
    _marketDisplay:     { type: String,  state: true },  // 'summary' | 'full'
    _scenarioLayout:    { type: String,  state: true },  // 'tiles' | 'rows'

    _sectionOrder:      { type: Array,   state: true },

    // Show/Hide pill state — flat object of path → bool
    _pills:             { type: Object,  state: true },
    // Group checkbox state: 'checked' | 'indeterminate' | 'unchecked'
    _groups:            { type: Object,  state: true },
    // Pill-row expand/collapse, per group — { valuation: bool, market_scenarios: bool, selected_scenarios: bool }
    _pillsOpen:         { type: Object,  state: true },

    _finalized:         { type: Boolean, state: true },
    _generating:        { type: Boolean, state: true },
    _finalizing:        { type: Boolean, state: true },
    _statusMsg:         { type: String,  state: true },
    _statusError:       { type: Boolean, state: true },
    _pdfUrl:            { type: String,  state: true },
    _pdfVehicle:        { type: Object,  state: true },
    _savedConfirm:      { type: Boolean, state: true },
    _confirmReset:      { type: Boolean, state: true },
    _locks:             { type: Object,  state: true },

    // Send UI
    _splitOpen:    { type: Boolean, state: true },
    _sendVia:      { type: String,  state: true },
    _doneSentVia:  { type: String,  state: true },
    _pdfSent:      { type: Boolean, state: true },
    _previewStale: { type: Boolean, state: true },
  };

  static styles = css`
    /* Kept deliberately simple — a host page can (and here, does) target
       "lexen-offer-sheet" by tag name from outside the shadow DOM, which can
       override :host rules. The actual split-scroll layout lives on .shell
       below instead, which light-DOM CSS can never reach. */
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #EEEEEE;
      color: #222222;
      /* Viewport-relative, not %, on purpose — the real Bubble embed wraps this
         in a plain <div style="min-height: 600px"> with no explicit height, so
         height:100% has nothing definite to resolve against and silently
         becomes auto. dvh gives :host a real, self-sufficient size regardless
         of what the parent container does. min-height mirrors that wrapper's
         own floor as a fallback. */
      height: 100dvh;
      min-height: 600px;
      overflow: hidden;
    }

    .shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    * { box-sizing: border-box; }

    .component-header {
      flex-shrink: 0;
      background: #fff;
      padding: 20px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .component-header .wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: space-between;
    }

    .component-header h1 { color: #222222; font-size: 20px; font-weight: 600; margin: 0; padding: 0; }

    .component-header .badge {
      background: #f2f4f7;
      color: #667085;
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 12px;
    }

    .header-left { display: flex; align-items: center; gap: 12px; }

    .setup-toggle-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 500;
      background: transparent;
      color: #98a2b3;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }

    .setup-toggle-btn:hover { background: #f2f4f7; color: #344054; }
    .setup-toggle-btn.active { color: #344054; }

    .wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    /* Split scroll: main is a fixed-height row (viewport minus the header),
       and the sidebar / preview pane each scroll independently within it —
       same pattern as lxn-customizer's .lxn-cust-split. */
    main {
      flex: 1;
      display: flex;
      overflow: hidden;
      min-height: 0;
    }

    .layout {
      display: flex;
      gap: 24px;
      align-items: stretch;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      min-height: 0;
      overflow: hidden;
    }

    .sidebar { flex: 1 1 440px; min-width: 320px; overflow-y: auto; min-height: 0; }
    /* Never scrolls — the card inside fills this pane exactly (flex column) instead. */
    .preview-pane { flex: 9999 1 280px; min-width: 280px; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }

    @media (max-width: 768px) {
      /* Below the breakpoint, drop the split-scroll and let the whole
         component flow/scroll as one page instead — two independently
         scrolling narrow columns don't work well stacked. */
      :host { height: auto; overflow: visible; }
      main { overflow: visible; }
      .layout { flex-wrap: wrap; overflow: visible; }
      .sidebar, .preview-pane { flex: 1 1 100%; overflow: visible; min-height: auto; display: block; }
      .preview-card { flex: none; }
      .preview-loading { flex: none; height: 300px; }
      .empty-preview { flex: none; height: 400px; }
      .pdf-frame { flex: none; height: 700px; }
    }

    /* Cards */
    .card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      padding: 24px;
      margin-bottom: 20px;
    }

    .card h2 {
      font-size: 14px;
      font-weight: 600;
      color: #222222;
      margin: 0 0 16px 0;
      padding: 0;
    }

    /* Payload picker */
    .picker select {
      width: 100%;
      padding: 10px 12px;
      font-size: 13px;
      border: 2px solid #d0d5dd;
      border-radius: 8px;
      outline: none;
      background: #fff;
      color: #222222;
      cursor: pointer;
    }

    .picker select:focus { border-color: #35BB9C; }

    .vehicle-info {
      margin-top: 14px;
      padding: 12px 14px;
      background: #effcff;
      border: 1.5px solid #7fb8c3;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
    }

    .vehicle-info .amount {
      font-size: 20px;
      font-weight: 700;
      color: #006073;
      margin-bottom: 4px;
    }

    .vehicle-info .desc { color: #006073; }

    /* Toggle groups */
    .toggle-group { margin-bottom: 4px; }
    .toggle-group:last-child { margin-bottom: 0; }

    .group-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      cursor: pointer;
      user-select: none;
    }

    .group-header input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border: 2px solid #d0d5dd;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      flex-shrink: 0;
      position: relative;
      transition: background 0.15s, border-color 0.15s;
    }

    .group-header input[type="checkbox"]:checked {
      background: #006073;
      border-color: #006073;
    }

    .group-header input[type="checkbox"]:checked::after {
      content: '';
      position: absolute;
      left: 3px;
      top: -1px;
      width: 5px;
      height: 9px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
    }

    .group-header input[type="checkbox"]:indeterminate {
      background: #006073;
      border-color: #006073;
    }

    .group-header input[type="checkbox"]:indeterminate::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 5px;
      width: 8px;
      height: 2px;
      background: #fff;
    }

    label.group-header {
      display: flex;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #222222;
    }

    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 0 4px 24px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      border: 1.5px solid #d0d5dd;
      background: #f2f4f7;
      color: #98a2b3;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      user-select: none;
    }

    .pill.active {
      background: #effcff;
      border-color: #7fb8c3;
      color: #006073;
    }

    .pill.active::after {
      content: '×';
      margin-left: 5px;
      font-size: 14px;
      line-height: 1;
      opacity: 0.6;
    }

    .pill-toggle:hover { border-color: #98a2b3; color: #667085; }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
      font-family: inherit;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s;
      text-decoration: none;
      width: 100%;
    }

    .btn-primary { background: #35BB9C; color: #fff; }
    .btn-primary:hover { background: #2a9880; }
    .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
    .btn-preview { background: #0f8f8f; color: #fff; }
    .btn-preview:hover { background: #0a7777; }
    .btn-preview:disabled { opacity: 0.45; cursor: not-allowed; }
    .btn-reopen { background: #FAB515; color: #373737; }
    .btn-reopen:hover { color: #000; }
    .btn-reopen:disabled { opacity: 0.45; cursor: not-allowed; }
    .btn-green { background: #35BB9C; color: #fff; }
    .btn-green:hover { background: #2a9880; }
    .btn-green:disabled { background: #d0d5dd; color: #98a2b3; cursor: not-allowed; }

    /* Status */
    .status { margin-top: 10px; font-size: 13px; min-height: 18px; text-align: center; }
    .status.error { color: #c0392b; }

    .spinner {
      display: inline-block; width: 14px; height: 14px;
      border: 2.5px solid rgba(53,187,156,0.2);
      border-top-color: #35BB9C;
      border-radius: 50%;
      animation: spin 0.65s linear infinite;
      vertical-align: middle;
      margin-right: 6px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Preview */
    .preview-card {
      flex: none;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 0;
    }
    .preview-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 100%; aspect-ratio: 612 / 792; gap: 14px; color: #888; font-size: 14px;
    }
    .pulse-dots { display: flex; gap: 7px; }
    .pulse-dots span {
      width: 9px; height: 9px; border-radius: 50%; background: #35BB9C;
      animation: pulse-dot 1.2s ease-in-out infinite;
    }
    .pulse-dots span:nth-child(2) { animation-delay: 0.2s; }
    .pulse-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse-dot {
      0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
      40%            { transform: scale(1);    opacity: 1; }
    }

    .pdf-frame {
      width: 100%;
      aspect-ratio: 612 / 792; /* US Letter — matches render.py's PAGE_W/PAGE_H */
      height: auto;
      border: 1px solid #dde1e8;
      border-radius: 8px;
      background: #e8e8e8;
    }

    .preview-card-header { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .preview-card-header h2 { margin: 0; }
    .preview-actions { display: flex; gap: 10px; margin-top: 12px; }
    .preview-actions .btn { width: auto; flex: 1; }

    .preview-title-group { display: flex; align-items: center; gap: 8px; }
    .preview-title-group h2 { line-height: 1; }

    /* REMOVED (kept for reference — old clickable inline refresh trigger)
    .preview-refresh-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .preview-refresh-trigger:hover:not(.busy) h2 { color: #004f5f; text-decoration: underline; }
    .preview-refresh-trigger:hover:not(.busy) .preview-refresh-icon { color: #004f5f; }
    .preview-refresh-trigger.busy { cursor: not-allowed; opacity: 0.45; }
    .preview-refresh-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      transition: color 0.15s;
    }
    */

    .preview-status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #35BB9C;
      flex-shrink: 0;
    }
    .preview-status-dot.stale { background: #f59f00; }

    /* Apply — greys out with no pending changes, lights up (with a Discard
       split side-button) once something's been edited. Mirrors .split-btn-wrap
       below, used for Send. */
    .apply-btn-wrap { display: flex; gap: 0; width: 100%; }
    .apply-main {
      flex: 1; padding: 10px 16px; font-size: 13px; font-weight: 600;
      background: #35BB9C; color: #fff; border: none;
      border-radius: 8px; cursor: pointer; font-family: inherit;
      transition: background 0.15s; text-align: center;
    }
    .apply-main.split { border-radius: 8px 0 0 8px; }
    .apply-main:hover:not(:disabled) { background: #2a9880; }
    .apply-main.inactive, .apply-main:disabled { background: #d0d5dd; color: #667085; cursor: not-allowed; }
    .apply-discard-btn {
      width: 34px; flex-shrink: 0; padding: 0;
      background: #2a9880; color: #fff; border: none;
      border-left: 1px solid rgba(255,255,255,0.25);
      border-radius: 0 8px 8px 0; cursor: pointer;
      font-size: 14px; transition: background 0.15s;
      display: flex; align-items: center; justify-content: center;
    }
    .apply-discard-btn:hover:not(:disabled) { background: #1e7a68; }
    .apply-discard-btn:disabled { opacity: 0.6; cursor: not-allowed; }

    /* REMOVED (kept for reference — old "Refresh Preview" text button)
    .refresh-text-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 100%;
      padding: 4px 0;
      background: none;
      border: none;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      color: #006073;
      cursor: pointer;
    }
    .refresh-text-btn:hover:not(:disabled) { color: #004f5f; text-decoration: underline; }
    .refresh-text-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    */

    .empty-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 612 / 792;
      color: #aab4c0;
      font-size: 14px;
      border: 2px dashed #dde1e8;
      border-radius: 8px;
    }

    /* Segmented control */
    .segmented-control {
      display: flex;
      gap: 3px;
      padding: 3px;
      background: #f2f4f7;
      border-radius: 9px;
    }

    .seg-btn {
      flex: 1;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 500;
      background: transparent;
      border: 1.5px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      color: #667085;
      white-space: nowrap;
      transition: all 0.15s;
      outline: none;
    }

    .seg-btn.active {
      background: #effcff;
      border-color: #7fb8c3;
      color: #006073;
      font-weight: 700;
    }

    .settings-locked { position: relative; }
    .settings-locked::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.55); pointer-events: all; z-index: 1; }
    .settings-locked .section-header { position: relative; z-index: 2; cursor: pointer; }
    .segmented-control.disabled { opacity: 0.35; pointer-events: none; }
    .pill.disabled { opacity: 0.35; pointer-events: none; }
    .toggle-group.disabled { opacity: 0.35; pointer-events: none; }
    .config-row.disabled { opacity: 0.35; pointer-events: none; }

    /* Collapsible */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 6px 0;
      margin-bottom: 8px;
      user-select: none;
    }

    .section-header span {
      font-size: 13px;
      font-weight: 600;
      color: #222222;
    }

    .section-chevron {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667085;
      transition: transform 0.2s;
    }

    .section-chevron svg { display: block; }
    .collapsible-section.collapsed .section-chevron { transform: rotate(-90deg); }
    .collapsible-section.collapsed .section-body { display: none; }

    /* Config row */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0 2px 0;
      gap: 8px;
      font-size: 12px;
      color: #222222;
    }

    .config-row select {
      font-size: 12px;
      padding: 3px 8px;
      border: 1.5px solid #d0d5dd;
      border-radius: 6px;
      background: #fff;
      color: #222222;
      cursor: pointer;
      outline: none;
    }

    .config-row select:focus { border-color: #006073; }

    .tax-rate-wrapper {
      display: flex;
      align-items: center;
      border: 1.5px solid #d0d5dd;
      border-radius: 6px;
      background: #fff;
      overflow: hidden;
    }
    .tax-rate-wrapper:focus-within { border-color: #006073; }
    .tax-rate-input {
      width: 40px;
      font-size: 12px;
      padding: 3px 4px 3px 8px;
      border: none;
      background: transparent;
      color: #222222;
      outline: none;
      text-align: right;
    }
    .tax-rate-input::-webkit-outer-spin-button,
    .tax-rate-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .tax-rate-input[type=number] { -moz-appearance: textfield; }
    .tax-rate-suffix {
      font-size: 12px;
      padding: 3px 8px 3px 2px;
      color: #667085;
    }

    /* Stepper */
    .stepper { display: flex; align-items: center; gap: 8px; }

    .step-btn {
      width: 24px;
      height: 24px;
      border: 1.5px solid #d0d5dd;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font-size: 15px;
      line-height: 1;
      color: #344054;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.15s, color 0.15s;
      padding: 0;
    }

    .step-btn:hover:not(:disabled) { border-color: #006073; color: #006073; }
    .step-btn:disabled { opacity: 0.35; cursor: default; }

    .stepper-value {
      font-size: 12px;
      font-weight: 600;
      color: #344054;
      min-width: 22px;
      text-align: center;
    }

    .font-size-display { min-width: 82px; }

    /* Divider */
    .divider { height: 1px; background: #eaecf0; margin: 16px 0; }

    /* Sortable list */
    .sortable-list { display: flex; flex-direction: column; gap: 4px; }

    .sortable-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      background: #f8f9fb;
      border: 1.5px solid #e4e7ec;
      border-radius: 6px;
      cursor: grab;
      user-select: none;
      font-size: 12px;
      font-weight: 500;
      color: #344054;
      transition: background 0.1s, border-color 0.1s;
    }

    .sortable-item:active { cursor: grabbing; }
    .sortable-item.dragging { display: none; }
    .drop-line {
      height: 2px;
      background: #006073;
      border-radius: 1px;
      pointer-events: none;
    }

    .sortable-item.disabled {
      opacity: 0.35;
      pointer-events: none;
      cursor: default;
    }

    @keyframes dropFade {
      0%   { background: #effcff; border-color: #7fb8c3; color: #006073; }
      75%  { background: #effcff; border-color: #7fb8c3; color: #006073; }
      100% { background: #f8f9fb; border-color: #e4e7ec; color: #344054; }
    }

    .sortable-item.dropped {
      animation: dropFade 1s ease-out forwards;
    }

    .drag-handle { color: #b0b8c4; font-size: 14px; line-height: 1; flex-shrink: 0; }
    .sort-arrows { display: none; flex-direction: column; gap: 0; flex-shrink: 0; margin-left: auto; }
    .sort-arrow { background: none; border: none; padding: 0 6px; min-height: 22px; font-size: 14px; color: #b0b8c4; cursor: pointer; line-height: 1; display: flex; align-items: center; justify-content: center; }
    .sort-arrow:active { color: #006073; }
    .sort-arrow:disabled { opacity: 0.2; cursor: default; }
    @media (hover: none) and (pointer: coarse) {
      .sortable-item { min-height: 44px; padding: 10px; cursor: default; }
      .drag-handle { display: none; }
      .sort-arrows { display: flex; }
    }

    /* Textarea */
    .paste-textarea {
      width: 100%;
      height: 180px;
      font-size: 11px;
      font-family: ui-monospace, monospace;
      border: 2px solid #d0d5dd;
      border-radius: 8px;
      padding: 10px 12px;
      resize: vertical;
      outline: none;
      color: #222;
      line-height: 1.5;
      transition: border-color 0.15s;
      box-sizing: border-box;
    }

    .convert-btn {
      margin-top: 8px;
      width: 100%;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      background: #f2f4f7;
      color: #344054;
      border: 1.5px solid #d0d5dd;
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }

    .convert-btn:hover { border-color: #006073; color: #006073; }

    .parse-error {
      margin-top: 8px;
      font-size: 12px;
      color: #c0392b;
    }

    .action-msg { font-size: 12px; line-height: 1.4; margin-top: 10px; text-align: center; }
    .action-msg.success { color: #27ae60; }
    .action-msg.error   { color: #c0392b; }

    /* Lock controls */
    .lock-btn {
      width: 26px; height: 26px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: none; border: 1.5px solid #d0d5dd; border-radius: 6px;
      cursor: pointer; color: #98a2b3; transition: all 0.15s; padding: 0;
    }
    .lock-btn:hover { background: #f2f4f7; color: #344054; border-color: #b0b8c4; }
    .lock-btn.locked { background: #fff3cd; border-color: #f59f00; color: #b45309; }
    .lock-indicator {
      display: inline-flex; align-items: center; justify-content: center;
      width: 20px; color: #b0b8c4; flex-shrink: 0;
    }
    .ctrl-group { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .ctrl-group.locked > :first-child { opacity: 0.5; pointer-events: none; }
    .group-row { display: flex; align-items: center; justify-content: space-between; }
    .group-row label.group-header { flex: 1; }
    .group-row-locked label.group-header { opacity: 0.5; }
    .group-row-locked input[type="checkbox"] { pointer-events: none; }
    .pill-group.locked { opacity: 0.45; pointer-events: none; }

    .reset-btn {
      width: 100%; padding: 9px 20px; background: transparent; color: #667085;
      border: 1px solid #d0d5dd; border-radius: 8px; font-size: 13px; font-weight: 500;
      cursor: pointer; font-family: inherit;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .reset-btn:hover { background: #f9fafb; color: #344054; border-color: #b0b8c4; }

    .action-btns { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }

    .confirm-reset {
      margin-top: 8px; padding: 10px 12px;
      background: #fff8e1; border: 1px solid #f59f00; border-radius: 8px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .confirm-reset-msg { font-size: 12px; color: #344054; font-weight: 500; }
    .confirm-reset-btns { display: flex; gap: 6px; }
    .confirm-reset-yes {
      flex: 1; padding: 6px; background: #d92d20; color: #fff;
      border: none; border-radius: 6px; font-size: 12px; font-weight: 600;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .confirm-reset-yes:hover { background: #b42318; }
    .confirm-reset-no {
      flex: 1; padding: 6px; background: transparent; color: #344054;
      border: 1px solid #d0d5dd; border-radius: 6px; font-size: 12px; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .confirm-reset-no:hover { background: #f2f4f7; }

    .offer-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .offer-header-row h2 { margin-bottom: 0; }

    .customize-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .customize-header-row h2 { margin-bottom: 0; }

    /* ── Send card ─────────────────────────────────────────────────────────── */
    .send-card { display: flex; flex-direction: column; gap: 10px; }
    .send-card h2 { margin-bottom: 0; }

    .split-btn-wrap { display: flex; gap: 0; position: relative; width: 100%; }
    .split-main {
      flex: 1; padding: 10px 16px; font-size: 13px; font-weight: 600;
      background: #35BB9C; color: #fff; border: none;
      border-radius: 8px 0 0 8px; cursor: pointer; font-family: inherit;
      transition: background 0.15s; text-align: center;
    }
    .split-main:hover:not(:disabled) { background: #2a9880; }
    .split-main:disabled { opacity: 0.6; cursor: not-allowed; }
    .split-main.done { background: #d0d5dd; color: #667085; border-radius: 8px; cursor: default; }
    .split-main.done:hover { background: #d0d5dd; }
    .split-arrow-btn {
      width: 34px; flex-shrink: 0; padding: 0;
      background: #2a9880; color: #fff; border: none;
      border-left: 1px solid rgba(255,255,255,0.25);
      border-radius: 0 8px 8px 0; cursor: pointer;
      font-size: 10px; transition: background 0.15s;
      display: flex; align-items: center; justify-content: center;
    }
    .split-arrow-btn:hover { background: #1e7a68; }

    .split-menu {
      position: absolute; top: calc(100% + 4px); right: 0; z-index: 10;
      background: #fff; border: 1.5px solid #d0d5dd; border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.12); min-width: 160px; overflow: hidden;
    }
    .split-menu-item {
      display: block; width: 100%; padding: 9px 14px; font-size: 13px;
      background: none; border: none; cursor: pointer; text-align: left;
      color: #344054; font-family: inherit; transition: background 0.1s;
    }
    .split-menu-item:hover { background: #f2f4f7; }

    .send-no-contact {
      font-size: 12px; color: #98a2b3; text-align: center; padding: 4px 0;
    }
  `;

  constructor() {
    super();
    // Public
    this.apiBaseUrl = '';
    this.apiMode = 'url';
    this.authToken = '';
    this.templateMode = false;
    this.payload       = null;
    this.sharedDisplay = null;
    this.pdfDisplay    = null;
    this.employees = [];
    this._selectedEmployeeIndex = 0;

    this._vehicleInfo = null;

    // Collapsibles
    this._generalOpen = false;
    this._layoutOpen = false;
    this._showHideOpen = false;

    // Customize
    this._mode = 'full';
    this._valueDisplay = 'offer';
    this._taxRatePct = null;
    this._profitName = null;
    this._disclaimerText = null;
    this._disclaimerPunct = ',';
    this._fontSizeIndex = 2;  // Medium
    this._photosPerRow = 3;
    this._discLayout = 'horizontal';
    this._marketDisplay = 'full';
    this._scenarioLayout = 'tiles';

    // Layout order
    this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];

    // Show/Hide pills (path → bool)
    this._pills = {
      'general.condition': true,
      'valuation.retail_value': true,
      'valuation.recon': true,
      'valuation.fixed_overhead': true,
      'valuation.target_profit': true,
      'valuation.tax_savings': true,
      'sections.observations_highlights': true,
      'sections.observations_comments': true,
      ...Object.fromEntries(SCENARIO_FIELDS.flatMap(f => [
        [`market_scenarios.${f.key}`, true],
        [`selected_scenarios.${f.key}`, true],
      ])),
    };

    // Group states
    this._groups = {
      valuation: 'checked',
      disclosures: 'checked',
      observations: 'checked',
      market: 'checked',
      market_scenarios: 'unchecked', // new feature — off by default
      selected_scenarios: 'unchecked', // new feature — off by default
      recon: 'checked',
      photos: 'checked',
      signature: 'checked',
    };

    // Pill-row expand/collapse — all groups start collapsed.
    this._pillsOpen = { valuation: false, market_scenarios: false, selected_scenarios: false };

    // Finalized state
    this._finalized = false;
    // Auto-preview on initial load (non-reactive)
    this._autoPreviewDone = false;
    this._autoPreviewTimer = null;
    // Auto-refresh on settings change (non-reactive)
    this._autoRefreshTimer = null;

    // Send UI
    this._splitOpen    = false;
    this._sendVia      = null;
    this._doneSentVia  = null;
    this._pdfSent      = false;
    this._previewStale = false;

    // Generate state
    this._generating = false;
    this._finalizing = false;
    this._statusMsg = '';
    this._statusError = false;
    this._pdfUrl = '';
    this._pdfVehicle = null;
    this._lastPrintoutRequest = null; // stored after each successful generate, fired in pdf-send
    this._savedConfirm  = false;
    this._confirmReset  = false;
    this._locks = {
      mode:           false,
      condition:      false,
      value_display:  false,
      tax_rate_pct:   false,
      profit_label:   false,
      font_size:      false,
      photos_per_row: false,
      disc_layout:    false,
      market_display: false,
      scenario_layout: false,
      disclaimer:     false,
      section_order:  false,
      valuation:        false,
      disclosures:      false,
      observations:     false,
      market:           false,
      market_scenarios: false,
      selected_scenarios: false,
      recon:            false,
      photos:           false,
      signature:        false,
    };

    // Drag-and-drop internal (non-reactive)
    this._dragSrcSection = null;
    this._dragSrcIndex = -1;
    this._placeholder = null;

    // Suppress auto display-save during data-load reactive cascades (non-reactive)
    this._pendingDataLoad = false;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /** Returns the full current customization state. Save this to restore later. */
  get display() {
    return {
      mode: this._mode,
      valueDisplay: this._valueDisplay,
      fontSizeIndex: this._fontSizeIndex,
      photosPerRow: this._photosPerRow,
      discLayout: this._discLayout,
      marketDisplay: this._marketDisplay,
      scenarioLayout: this._scenarioLayout,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
    };
  }

  _applySharedDisplay(d) {
    if (!d) return;
    const GROUP_KEYS = ['valuation','disclosures','observations','market','market_scenarios','selected_scenarios','recon','photos'];
    const sec = d.sections || {};
    const newGroups = { ...this._groups };
    GROUP_KEYS.forEach(k => { if (sec[k] != null) newGroups[k] = sec[k] ? 'checked' : 'unchecked'; });
    this._groups = newGroups;
    if (d.pills != null)         this._pills        = { ...this._pills, ...d.pills };
    if (d.section_order != null) this._sectionOrder = d.section_order.filter(s => DEFAULT_LAYOUT_ORDER.includes(s));
    if (d.tax_rate_pct != null)  this._taxRatePct   = d.tax_rate_pct;
    if (d.value_display != null) this._valueDisplay = d.value_display;
    if (d.profit_name != null)   this._profitName   = d.profit_name;
    if (d.market_view != null)   this._marketDisplay = d.market_view === 'summary' ? 'summary' : 'full';
  }

  _applyPdfDisplay(d) {
    if (!d) return;
    if (d.mode != null)             this._mode                  = d.mode;
    if (d.font_size_index != null)  this._fontSizeIndex         = d.font_size_index;
    if (d.photos_per_row != null)   this._photosPerRow          = d.photos_per_row;
    if (d.disc_layout != null)      this._discLayout            = d.disc_layout;
    if (d.scenario_layout != null)  this._scenarioLayout        = d.scenario_layout;
    if (d.disclaimer_text != null)  this._disclaimerText        = d.disclaimer_text;
    if (d.disclaimer_punct != null) this._disclaimerPunct       = d.disclaimer_punct;
    if (d.selected_emp_idx != null) this._selectedEmployeeIndex = d.selected_emp_idx;
    if (d.signature != null)        this._groups = { ...this._groups, signature: d.signature ? 'checked' : 'unchecked' };
    if (d.locks)                    this._locks = { ...this._locks, ...d.locks };
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  firstUpdated() {
    this.dispatchEvent(new CustomEvent('component-ready', {
      bubbles: true, composed: true,
    }));

  }

  updated(changedProps) {
    // Track data-load cycles to avoid firing display-save during reactive cascades
    const wasDataLoad = this._pendingDataLoad;
    if (changedProps.has('sharedDisplay') || changedProps.has('pdfDisplay')) {
      this._pendingDataLoad = true;
    } else if (this._pendingDataLoad) {
      this._pendingDataLoad = false;
    }

    if (changedProps.has('sharedDisplay') && this.sharedDisplay) {
      this._applySharedDisplay(this.sharedDisplay);
    }
    if (changedProps.has('pdfDisplay') && this.pdfDisplay) {
      this._applyPdfDisplay(this.pdfDisplay);
    }
    // If auto-preview already fired before saved settings arrived (Bubble async load),
    // re-trigger once with the real saved display state.
    const savedDisplayArrived = changedProps.has('sharedDisplay') || changedProps.has('pdfDisplay');
    if (savedDisplayArrived && this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl) {
      this._savedDisplayConsumed = true;
      clearTimeout(this._autoPreviewTimer);
      this._autoPreviewTimer = setTimeout(() => { this._handleGenerate(); }, 300);
    }

    // Update vehicle info when payload is set externally
    if (changedProps.has('payload') && this.payload) {
      this._vehicleInfo = this._vehicleInfoFromData(this.payload);
      if (this._taxRatePct === null) {
        const rate = this.payload?.valuation?.tax_savings?.rate_pct;
        this._taxRatePct = rate != null ? parseFloat(parseFloat(rate).toFixed(2)) : 0;
      }
    }

    // taxRate prop provides initial rate for template mode (fallback when no saved display state)
    if (changedProps.has('taxRate') && this.taxRate != null && this._taxRatePct === null) {
      this._taxRatePct = parseFloat(parseFloat(this.taxRate).toFixed(2));
    }

    // profitLabel prop: in instance mode always wins; in template mode initialises once
    if (changedProps.has('profitLabel') && this.profitLabel != null) {
      if (!this.templateMode || this._profitName === null || this._profitName === undefined) {
        this._profitName = this.profitLabel;
      }
    }
    // disclaimerText prop: in instance mode always wins; in template mode initialises once
    if (changedProps.has('disclaimerText') && this.disclaimerText != null) {
      if (!this.templateMode || this._disclaimerText === null || this._disclaimerText === undefined) {
        this._disclaimerText = this.disclaimerText;
      }
    }
    // Auto-select the current employee when the employees list arrives
    if (changedProps.has('employees') && this.employees?.length && this.payload?.employee?.name) {
      const idx = this.employees.findIndex(e => e.name === this.payload.employee.name);
      if (idx !== -1) this._selectedEmployeeIndex = idx;
    }

    // Clear "Changes saved" message when the user modifies any setting
    if (this._savedConfirm && !changedProps.has('_savedConfirm')) {
      const settingKeys = ['_mode', '_valueDisplay', '_taxRatePct', '_profitName', '_disclaimerText', '_disclaimerPunct',
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_scenarioLayout',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex', '_locks'];
      if (settingKeys.some(k => changedProps.has(k))) {
        this._savedConfirm = false;
      }
    }

    // Editing anything while in One-Page mode "bakes" the current (trimmed) state
    // into Full and drops the tab back to Full — One-Page stops being a separate
    // cached configuration the moment you touch something, rather than reverting
    // to whatever Full was before you entered One-Page.
    // !changedProps.has('_mode') excludes the mode-switch's own update (which sets
    // _mode alongside its own group-forcing) — only a change on a LATER cycle,
    // while already sitting in One-Page, should trigger this. !wasDataLoad excludes
    // sharedDisplay/pdfDisplay data-load cascades (same guard used below).
    if (this._mode === 'one_page' && !changedProps.has('_mode') && !wasDataLoad) {
      const editKeys = ['_valueDisplay', '_taxRatePct', '_profitName', '_disclaimerText', '_disclaimerPunct',
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_scenarioLayout',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex'];
      if (editKeys.some(k => changedProps.has(k))) {
        this._mode = 'full';
        this._preOnePageState = null;
      }
    }

    // Sync locked prop → _finalized state
    if (changedProps.has('locked')) {
      this._finalized = !!this.locked;
    }

    // Auto-preview once on initial load: debounce off the last external prop arrival
    if (!this._autoPreviewDone && this.apiBaseUrl) {
      if (['payload', 'sharedDisplay', 'pdfDisplay', 'employees', 'locked'].some(p => changedProps.has(p))) {
        clearTimeout(this._autoPreviewTimer);
        this._autoPreviewTimer = setTimeout(() => {
          if (!this._autoPreviewDone && this.apiBaseUrl && (this.templateMode || this.payload)) {
            this._autoPreviewDone = true;
            // Generate without watermark if already locked/confirmed
            this._handleGenerate();
          }
        }, 300);
      }
    }

    // Mark preview stale when settings change after the initial generate.
    // No auto-save, no auto-regenerate — the user must click Apply, which does
    // both together. (No longer gated on !_finalized — the visual "settings
    // locked" overlay this used to pair with is currently unused, so settings
    // stay editable after finalizing and staleness must still track that.)
    if (this._autoPreviewDone && this.apiBaseUrl) {
      const isDataLoad = wasDataLoad || changedProps.has('sharedDisplay') || changedProps.has('pdfDisplay')
        || changedProps.has('payload') || changedProps.has('employees');
      const settingKeys = [
        '_mode', '_valueDisplay', '_taxRatePct', '_profitName', '_disclaimerText', '_disclaimerPunct',
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_scenarioLayout',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex',
      ];
      if (!isDataLoad && settingKeys.some(k => changedProps.has(k))) {
        this._previewStale = true;
      }
    }

    /* ── REMOVED (kept for reference — revert here for auto-save-on-every-change) ──
    // Auto-dispatch display-save on every config change (mirrors customizer behaviour)
    if (this._autoPreviewDone && !wasDataLoad
        && !changedProps.has('sharedDisplay') && !changedProps.has('pdfDisplay')) {
      const CONFIG_KEYS = [
        '_mode', '_valueDisplay', '_taxRatePct', '_profitName', '_disclaimerText', '_disclaimerPunct',
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex', '_locks',
      ];
      if (CONFIG_KEYS.some(k => changedProps.has(k))) {
        this._dispatchDisplaySave();
      }
    }
    ── end removed ────────────────────────────────────────────────────────────── */

    // Set indeterminate property on group checkboxes (can't be done via attribute)
    const root = this.shadowRoot;
    if (!root) return;

    for (const [group, state] of Object.entries(this._groups)) {
      const cb = root.querySelector(`input[data-group="${group}"]`);
      if (cb) {
        cb.indeterminate = (state === 'indeterminate');
        cb.checked = (state === 'checked' || state === 'indeterminate');
      }
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  _fmtPrice(v) {
    if (!v && v !== 0) return '';
    return '$' + Number(v).toLocaleString();
  }

  _getPayloadData() {
    return this.payload || _templatePayload();
  }

  _vehicleInfoFromData(data) {
    const v = data.vehicle || {};
    const o = data.offer || {};
    const amountStr = this._fmtPrice(o.amount) + ' Offer';
    const parts = [v.year, v.make, v.model, v.trim].filter(Boolean).join(' ');
    const desc = parts + (v.color ? ` (${v.color})` : '');
    return { amount: amountStr, desc, vin: v.vin || '' };
  }

  _getGroupState(group) {
    return this._groups[group] || 'checked';
  }

  /** Recompute a group's state from its pills. */
  _recomputeGroupState(group) {
    const newGroups = { ...this._groups };

    if (group === 'valuation') {
      const pillKeys = ['valuation.retail_value', 'valuation.recon', 'valuation.fixed_overhead', 'valuation.target_profit', 'valuation.tax_savings'];
      const active = pillKeys.filter(k => this._pills[k]).length;
      if (active === 0) newGroups.valuation = 'unchecked';
      else if (active === pillKeys.length) newGroups.valuation = 'checked';
      else newGroups.valuation = 'indeterminate';
    } else if (group === 'observations') {
      const pillKeys = ['sections.observations_highlights', 'sections.observations_comments'];
      const active = pillKeys.filter(k => this._pills[k]).length;
      if (active === 0) newGroups.observations = 'unchecked';
      else if (active === pillKeys.length) newGroups.observations = 'checked';
      else newGroups.observations = 'indeterminate';
    } else if (group === 'market_scenarios' || group === 'selected_scenarios') {
      const pillKeys = SCENARIO_FIELDS.map(f => `${group}.${f.key}`);
      const active = pillKeys.filter(k => this._pills[k]).length;
      if (active === 0) newGroups[group] = 'unchecked';
      else if (active === pillKeys.length) newGroups[group] = 'checked';
      else newGroups[group] = 'indeterminate';
    }

    this._groups = newGroups;
  }

  /** When a section is hidden, push it to the bottom of layout order. */
  _syncLayoutOrder(hiddenSection) {
    const order = [...this._sectionOrder];
    const idx = order.indexOf(hiddenSection);
    if (idx !== -1) {
      order.splice(idx, 1);
      order.push(hiddenSection);
    }
    this._sectionOrder = order;
  }

  _restoreLayoutOrder(section) {
    const refOrder = this.sharedDisplay?.section_order?.length
      ? this.sharedDisplay.section_order
      : DEFAULT_LAYOUT_ORDER;
    const order = [...this._sectionOrder].filter(s => s !== section);
    const refIdx = refOrder.indexOf(section);
    const insertBefore = order.findIndex(s => refOrder.indexOf(s) > refIdx);
    if (insertBefore === -1) {
      order.push(section);
    } else {
      order.splice(insertBefore, 0, section);
    }
    this._sectionOrder = order;
  }

  _isOnePage() {
    return this._mode === 'one_page';
  }

  _isSectionDisabled(section) {
    return this._groups[section] === 'unchecked';
  }

  // ── Display block builder ──────────────────────────────────────────────────

  _buildSharedState() {
    const g = this._groups;
    return {
      sections: {
        valuation:        g.valuation        !== 'unchecked',
        disclosures:      g.disclosures      !== 'unchecked',
        observations:     g.observations     !== 'unchecked',
        market:           g.market           !== 'unchecked',
        market_scenarios: g.market_scenarios !== 'unchecked',
        selected_scenarios: g.selected_scenarios !== 'unchecked',
        recon:            g.recon            !== 'unchecked',
        photos:           g.photos           !== 'unchecked',
      },
      market_view:   this._marketDisplay,
      pills:         { ...this._pills },
      section_order: [...this._sectionOrder],
      value_display: this._valueDisplay,
      tax_rate_pct:  this._taxRatePct,
      profit_name:   this._profitName || null,
    };
  }

  _buildPdfState() {
    return {
      mode:             this._mode,
      font_size_index:  this._fontSizeIndex,
      photos_per_row:   this._photosPerRow,
      disc_layout:      this._discLayout,
      scenario_layout:  this._scenarioLayout,
      disclaimer_text:  this._disclaimerText || '',
      disclaimer_punct: this._disclaimerPunct ?? ',',
      selected_emp_idx: this._selectedEmployeeIndex,
      signature:        this._groups.signature !== 'unchecked',
      locks:            { ...this._locks },
    };
  }

  _buildDisplay() {
    const p = this._pills;
    const g = this._groups;

    const display = {
      valuation: {
        retail_value: p['valuation.retail_value'],
        recon: p['valuation.recon'],
        fixed_overhead: p['valuation.fixed_overhead'],
        target_profit: p['valuation.target_profit'],
        tax_savings: p['valuation.tax_savings'],
      },
      sections: {
        valuation: g.valuation === 'checked' || g.valuation === 'indeterminate',
        disclosures: this._isOnePage() ? false : (g.disclosures === 'checked'),
        disclosures_horizontal: this._discLayout === 'horizontal',
        disclosures_signature: g.signature === 'checked',
        observations: g.observations === 'checked' || g.observations === 'indeterminate',
        observations_highlights: p['sections.observations_highlights'],
        observations_comments: p['sections.observations_comments'],
        market_summary: (g.market === 'checked') && (this._isOnePage() || this._marketDisplay === 'summary'),
        market_comparables: (g.market === 'checked') && !this._isOnePage() && this._marketDisplay === 'full',
        market_scenarios: this._isOnePage() ? false : (g.market_scenarios === 'checked' || g.market_scenarios === 'indeterminate'),
        selected_scenarios: this._isOnePage() ? false : (g.selected_scenarios === 'checked' || g.selected_scenarios === 'indeterminate'),
        recon_breakdown: this._isOnePage() ? false : (g.recon === 'checked'),
        photos: this._isOnePage() ? false : (g.photos === 'checked'),
      },
      general: {
        offer_label: false,
        condition: p['general.condition'],
        value_display: this._valueDisplay,
      },
      scenarios: {
        market: Object.fromEntries(SCENARIO_FIELDS.map(f => [f.key, p[`market_scenarios.${f.key}`]])),
        selected: Object.fromEntries(SCENARIO_FIELDS.map(f => [f.key, p[`selected_scenarios.${f.key}`]])),
      },
      scenario_layout: this._scenarioLayout,
    };

    return display;
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  _handleModeChange(value) {
    this._mode = value;
    const isOnePage = value === 'one_page';

    if (isOnePage) {
      // Snapshot the true prior state (including pills) so exiting without any
      // further edit restores exactly what Full had — the additive re-check
      // below only touches the live one-page view, not this cache.
      this._preOnePageState = {
        groups: { ...this._groups },
        pills: { ...this._pills },
        marketDisplay: this._marketDisplay,
        sectionOrder: [...this._sectionOrder],
      };

      const newGroups = { ...this._groups };
      // One-page's format can't fit these — categorically excluded regardless of prior state.
      ['disclosures', 'recon', 'photos', 'market_scenarios', 'selected_scenarios'].forEach(g => { newGroups[g] = 'unchecked'; });
      // Additive for everything one-page CAN fit: re-check anything the user had
      // hidden, so a trimmed-down Full config doesn't produce a sparser-than-
      // necessary one-pager just because it's not adaptively looking for more
      // content to fill the page.
      ['valuation', 'observations', 'market'].forEach(g => { newGroups[g] = 'checked'; });
      this._groups = newGroups;

      const newPills = { ...this._pills };
      ['valuation.retail_value', 'valuation.recon', 'valuation.fixed_overhead', 'valuation.target_profit', 'valuation.tax_savings',
        'sections.observations_comments'].forEach(k => { newPills[k] = true; });
      // Trim, not additive: one-page needs the space back (real-world logo
      // height in Bubble eats into the budget too), and highlights is the
      // easiest thing to drop without losing anything essential.
      newPills['sections.observations_highlights'] = false;
      this._pills = newPills;

      this._marketDisplay = 'summary';

      const disabled = ['disclosures', 'recon', 'photos', 'market_scenarios', 'selected_scenarios'];
      const enabled = this._sectionOrder.filter(s => !disabled.includes(s));
      const disabledOrdered = this._sectionOrder.filter(s => disabled.includes(s));
      this._sectionOrder = [...enabled, ...disabledOrdered];
    } else {
      if (this._preOnePageState) {
        const saved = this._preOnePageState;
        this._groups = { ...saved.groups };
        this._pills = { ...saved.pills };
        this._marketDisplay = saved.marketDisplay;
        this._sectionOrder = saved.sectionOrder;
        this._preOnePageState = null;
      } else {
        const newGroups = { ...this._groups };
        ['disclosures', 'recon', 'photos', 'valuation', 'observations', 'market'].forEach(g => { newGroups[g] = 'checked'; });
        ['market_scenarios', 'selected_scenarios'].forEach(g => { newGroups[g] = 'unchecked'; });
        this._groups = newGroups;
        this._marketDisplay = 'full';
        this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];
      }
    }
  }

  _handleGroupChange(group, checked) {
    const newGroups = { ...this._groups };
    newGroups[group] = checked ? 'checked' : 'unchecked';
    this._groups = newGroups;

    // Update pills for groups that have them
    const newPills = { ...this._pills };
    if (group === 'valuation') {
      ['valuation.retail_value', 'valuation.recon', 'valuation.fixed_overhead', 'valuation.target_profit', 'valuation.tax_savings'].forEach(k => {
        newPills[k] = checked;
      });
      this._pills = newPills;
    } else if (group === 'observations') {
      ['sections.observations_highlights', 'sections.observations_comments'].forEach(k => {
        newPills[k] = checked;
      });
      this._pills = newPills;
    } else if (group === 'market_scenarios' || group === 'selected_scenarios') {
      SCENARIO_FIELDS.forEach(f => { newPills[`${group}.${f.key}`] = checked; });
      this._pills = newPills;
    }

    if (group !== 'signature') {
      if (!checked) {
        this._syncLayoutOrder(group);
      } else {
        this._restoreLayoutOrder(group);
      }
    }
  }

  _handlePillClick(path, group) {
    const newPills = { ...this._pills };
    newPills[path] = !newPills[path];
    this._pills = newPills;

    if (group && ['valuation', 'observations', 'market_scenarios', 'selected_scenarios'].includes(group)) {
      this._recomputeGroupState(group);

      // If group is now fully unchecked, push section to bottom
      if (this._groups[group] === 'unchecked') {
        this._syncLayoutOrder(group);
      }
    }
  }

  _togglePillsOpen(group) {
    this._pillsOpen = { ...this._pillsOpen, [group]: !this._pillsOpen[group] };
  }

  _handleFontSizeStep(dir) {
    const newIdx = this._fontSizeIndex + dir;
    if (newIdx >= 0 && newIdx < FONT_SIZE_OPTIONS.length) {
      this._fontSizeIndex = newIdx;
    }
  }

  _handlePhotosPerRowStep(dir) {
    const newVal = this._photosPerRow + dir;
    if (newVal >= 2 && newVal <= 4) {
      this._photosPerRow = newVal;
    }
  }

  _handleSegmentedClick(controlId, value) {
    if (controlId === 'value-display') this._valueDisplay = value;
    else if (controlId === 'disc-layout') this._discLayout = value;
    else if (controlId === 'market-display') this._marketDisplay = value;
    else if (controlId === 'scenario-layout') this._scenarioLayout = value;
  }

  _handleTaxRateInput(e) {
    const val = parseFloat(e.target.value);
    this._taxRatePct = isNaN(val) ? 0 : Math.max(0, Math.min(99, parseFloat(val.toFixed(2))));
  }

  _handleProfitNameInput(e) {
    this._profitName = e.target.value;
  }

  _handleDisclaimerInput(e) {
    this._disclaimerText = e.target.value;
  }

  _handleReset() {
    this._confirmReset = false;
    this._pendingDataLoad = true; // suppress auto display-save during the reactive cascade
    if (this.sharedDisplay || this.pdfDisplay) {
      if (this.sharedDisplay) this._applySharedDisplay(this.sharedDisplay);
      if (this.pdfDisplay)    this._applyPdfDisplay(this.pdfDisplay);
    } else {
      this._resetToggles();
    }
    this._previewStale = true;
    // Null values signal Bubble to clear instance-level overrides.
    this.dispatchEvent(new CustomEvent('display-save', {
      detail: { shared: null, pdf: null, employee: null },
      bubbles: true, composed: true,
    }));
  }

  /** Captures the current customize-panel state as the "last applied" baseline,
   * called whenever a generate succeeds (initial auto-preview, Apply, Reopen). */
  _snapshotAppliedState() {
    this._appliedSnapshot = {
      mode: this._mode,
      valueDisplay: this._valueDisplay,
      taxRatePct: this._taxRatePct,
      profitName: this._profitName,
      disclaimerText: this._disclaimerText,
      disclaimerPunct: this._disclaimerPunct,
      fontSizeIndex: this._fontSizeIndex,
      photosPerRow: this._photosPerRow,
      discLayout: this._discLayout,
      marketDisplay: this._marketDisplay,
      scenarioLayout: this._scenarioLayout,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
      selectedEmployeeIndex: this._selectedEmployeeIndex,
    };
  }

  /** Reverts unapplied edits back to the last-applied snapshot — distinct from
   * "Reset to template", which goes back to the template defaults instead. */
  _handleDiscardChanges() {
    if (!this._appliedSnapshot) return;
    this._pendingDataLoad = true; // suppress re-marking stale during this cascade
    const s = this._appliedSnapshot;
    this._mode                  = s.mode;
    this._valueDisplay          = s.valueDisplay;
    this._taxRatePct            = s.taxRatePct;
    this._profitName            = s.profitName;
    this._disclaimerText        = s.disclaimerText;
    this._disclaimerPunct       = s.disclaimerPunct;
    this._fontSizeIndex         = s.fontSizeIndex;
    this._photosPerRow          = s.photosPerRow;
    this._discLayout            = s.discLayout;
    this._marketDisplay         = s.marketDisplay;
    this._scenarioLayout        = s.scenarioLayout;
    this._sectionOrder          = [...s.sectionOrder];
    this._pills                 = { ...s.pills };
    this._groups                = { ...s.groups };
    this._selectedEmployeeIndex = s.selectedEmployeeIndex;
    this._previewStale = false;
  }

  _resetToggles() {
    this._mode = 'full';
    this._valueDisplay = 'offer';
    const payloadRate = this.payload?.valuation?.tax_savings?.rate_pct;
    this._taxRatePct = payloadRate != null
      ? parseFloat(parseFloat(payloadRate).toFixed(2))
      : (this.taxRate != null ? parseFloat(parseFloat(this.taxRate).toFixed(2)) : 0);
    this._profitName = this.profitLabel || '';
    this._disclaimerText = this.disclaimerText || '';
    this._disclaimerPunct = ',';
    this._fontSizeIndex = 2;
    this._photosPerRow = 3;
    this._discLayout = 'horizontal';
    this._marketDisplay = 'full';
    this._scenarioLayout = 'tiles';
    this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];
    this._pills = {
      'general.condition': true,
      'valuation.retail_value': true,
      'valuation.recon': true,
      'valuation.fixed_overhead': true,
      'valuation.target_profit': true,
      'valuation.tax_savings': true,
      'sections.observations_highlights': true,
      'sections.observations_comments': true,
      ...Object.fromEntries(SCENARIO_FIELDS.flatMap(f => [
        [`market_scenarios.${f.key}`, true],
        [`selected_scenarios.${f.key}`, true],
      ])),
    };
    this._groups = {
      valuation: 'checked', disclosures: 'checked', observations: 'checked',
      market: 'checked', market_scenarios: 'unchecked', selected_scenarios: 'unchecked',
      recon: 'checked', photos: 'checked', signature: 'checked',
    };
  }

  // ── Drag-and-drop ──────────────────────────────────────────────────────────

  _handleDragStart(e, section) {
    const item = e.currentTarget;
    if (item.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }
    this._dragSrcSection = section;
    this._dragSrcIndex = this._sectionOrder.indexOf(section);
    e.dataTransfer.effectAllowed = 'move';

    const line = document.createElement('div');
    line.className = 'drop-line';
    this._placeholder = line;

    setTimeout(() => item.classList.add('dragging'), 0);
  }

  _handleDragOver(e, section) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (section === this._dragSrcSection || !this._placeholder) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const after = e.clientY > rect.top + rect.height / 2;
    const list = el.parentNode;

    if (after) {
      list.insertBefore(this._placeholder, el.nextSibling);
    } else {
      list.insertBefore(this._placeholder, el);
    }
  }

  _commitDrop() {
    const src = this._dragSrcSection;
    if (!src) return;

    const list = this.shadowRoot.querySelector('.sortable-list');
    if (list && this._placeholder && this._placeholder.parentNode === list) {
      const newOrder = [];
      for (const child of Array.from(list.children)) {
        if (child === this._placeholder) {
          newOrder.push(src);
        } else if (child.dataset.section && child.dataset.section !== src) {
          newOrder.push(child.dataset.section);
        }
      }
      this._sectionOrder = newOrder;
    }

    if (this._placeholder && this._placeholder.parentNode) {
      this._placeholder.parentNode.removeChild(this._placeholder);
    }
    this._placeholder = null;
    this._dragSrcSection = null;
    this._dragSrcIndex = -1;

    this.updateComplete.then(() => {
      const el = this.shadowRoot.querySelector(`.sortable-item[data-section="${src}"]`);
      if (el) {
        el.classList.remove('dropped');
        void el.offsetWidth;
        el.classList.add('dropped');
        setTimeout(() => el.classList.remove('dropped'), 1000);
      }
    });
  }

  _handleDrop(e) {
    e.preventDefault();
    e.stopPropagation(); // prevent bubbling to list handler
    this._commitDrop();
  }

  _handleListDrop(e) {
    e.preventDefault();
    this._commitDrop();
  }

  _handleMoveSection(section, direction) {
    const order = [...this._sectionOrder];
    const idx = order.indexOf(section);
    const target = idx + direction;
    if (target < 0 || target >= order.length) return;
    [order[idx], order[target]] = [order[target], order[idx]];
    this._sectionOrder = order;
    this.updateComplete.then(() => {
      const el = this.shadowRoot.querySelector(`.sortable-item[data-section="${section}"]`);
      if (el) {
        el.classList.remove('dropped');
        void el.offsetWidth;
        el.classList.add('dropped');
        setTimeout(() => el.classList.remove('dropped'), 1000);
      }
    });
  }

  _handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    this.shadowRoot.querySelectorAll('.sortable-item').forEach(i => i.classList.remove('dragging'));
    if (this._placeholder && this._placeholder.parentNode) {
      this._placeholder.parentNode.removeChild(this._placeholder);
    }
    this._placeholder = null;
    this._dragSrcSection = null;
    this._dragSrcIndex = -1;
  }

  // ── Lock helpers ───────────────────────────────────────────────────────────

  _isLocked(key) {
    return !this.templateMode && !!this._locks?.[key];
  }

  _lk(key) {
    const locked = !!this._locks?.[key];
    if (this.templateMode) {
      return html`
        <button class="lock-btn ${locked ? 'locked' : ''}"
                title="${locked ? 'Unlock for dealers' : 'Lock for dealers'}"
                @click="${(e) => { e.stopPropagation(); this._locks = { ...this._locks, [key]: !locked }; }}">
          ${locked ? lockClosedSvg : lockOpenSvg}
        </button>`;
    }
    if (locked) {
      return html`<span class="lock-indicator" title="Locked by template">${lockClosedSvg}</span>`;
    }
    return nothing;
  }

  // ── Save Settings ──────────────────────────────────────────────────────────

  _handleSaveSettings() {
    this._dispatchDisplaySave();
    this._savedConfirm = true;
  }

  _dispatchDisplaySave() {
    const employee = this.employees && this.employees.length > 0
      ? this.employees[this._selectedEmployeeIndex] || this.employees[0]
      : null;
    this.dispatchEvent(new CustomEvent('display-save', {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState(), employee },
      bubbles: true, composed: true,
    }));
  }

  // ── Generate ───────────────────────────────────────────────────────────────

  async _handleGenerate(watermark = false) {
    this._generating = true;
    this._statusMsg = 'Generating…';
    this._statusError = false;

    try {
      const display = this._buildDisplay();
      const commonFields = {
        mode: this._mode,
        display,
        preview_logo: true,
        preview_photos: true,
        font_roboto: true,
        font_size_delta: FONT_SIZE_OPTIONS[this._fontSizeIndex].delta,
        photos_per_row: this._photosPerRow,
        section_order: this._sectionOrder,
        watermark,
      };

      const payloadData = { ...this._getPayloadData() };

      // Override target profit label from _profitName (set via template settings or profitLabel prop)
      const effectiveProfitName = this._profitName != null ? this._profitName : this.profitLabel;
      if (effectiveProfitName != null && payloadData.valuation?.target_profit) {
        payloadData.valuation = {
          ...payloadData.valuation,
          target_profit: { ...payloadData.valuation.target_profit, label: effectiveProfitName || 'Target Profit' },
        };
      }

      // Override disclaimer: combine punctuation + space + text, or empty if no text
      const rawDisclaimerText = this._disclaimerText != null ? this._disclaimerText : (this.disclaimerText ?? null);
      if (rawDisclaimerText !== null) {
        const punct = this._disclaimerPunct ?? '.';
        const trimmedText = rawDisclaimerText ? rawDisclaimerText.replace(/\.+$/, '') : '';
        payloadData.disclaimer = trimmedText ? (punct + ' ' + trimmedText) : '';
      }

      // Fix protocol-relative logo URLs (Bubble CDN returns "//..." without scheme)
      if (payloadData.dealer?.logo_url?.startsWith('//')) {
        payloadData.dealer = { ...payloadData.dealer, logo_url: 'https:' + payloadData.dealer.logo_url };
      }

      // Format phone number
      if (payloadData.employee?.phone) {
        payloadData.employee = { ...payloadData.employee, phone: fmtPhone(payloadData.employee.phone) };
      }

      // Override employee from selector if available
      if (this.employees && this.employees.length > 0) {
        const emp = this.employees[this._selectedEmployeeIndex] || this.employees[0];
        payloadData.employee = { name: emp.name || '', phone: fmtPhone(emp.phone || ''), email: emp.email || '' };
      }

      // Filter disclosures with no answer
      if (payloadData.disclosures) {
        payloadData.disclosures = payloadData.disclosures.filter(d => d.answer && d.answer.trim() !== '');
      }

      // Resolve days_on_market for delisted comparables; recompute avg_days from adjusted values
      if (payloadData.market?.comparables) {
        const adjustedComps = payloadData.market.comparables.map(c => ({
          ...c,
          days_on_market: c.listing_type === 'delisted' ? (c.delisted_days || c.days_on_market) : c.days_on_market,
        }));
        const daysValues = adjustedComps.map(c => c.days_on_market).filter(d => d != null);
        const avgDays = daysValues.length > 0
          ? Math.round(daysValues.reduce((a, b) => a + b, 0) / daysValues.length)
          : payloadData.market.summary?.avg_days;
        payloadData.market = {
          ...payloadData.market,
          comparables: adjustedComps,
          summary: { ...payloadData.market.summary, avg_days: avgDays },
        };
      }
      // Override tax savings with custom rate
      if (this._taxRatePct !== null && payloadData.valuation?.tax_savings && payloadData.offer?.amount != null) {
        const taxAmount = Math.round(payloadData.offer.amount * this._taxRatePct / 100);
        payloadData.valuation = {
          ...payloadData.valuation,
          tax_savings: {
            ...payloadData.valuation.tax_savings,
            rate_pct: this._taxRatePct,
            amount: taxAmount,
            gross_value: payloadData.offer.amount + taxAmount,
          },
        };
      }

      const requestBody = { ...commonFields, raw_payload: payloadData };

      // Snapshot the printout inputs so _handleSend can include them in the pdf-send event.
      this._lastPrintoutRequest = {
        raw_payload:    payloadData,
        display,
        font_size_delta: FONT_SIZE_OPTIONS[this._fontSizeIndex].delta,
        photos_per_row:  this._photosPerRow,
        section_order:   [...this._sectionOrder],
      };

      const headers = { 'Content-Type': 'application/json', 'Accept': 'application/pdf' };
      if (this.authToken) headers['Authorization'] = `Bearer ${this.authToken}`;

      const resp = await fetch(`${this.apiBaseUrl}/printout-offer`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (this.apiMode === 'binary') {
        if (!resp.ok) {
          let errMsg = 'Request failed';
          try {
            const errData = await resp.json();
            errMsg = errData.error || errMsg;
          } catch (_) {}
          throw new Error(errMsg);
        }
        const blob = await resp.blob();
        const blobUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
        this._pdfUrl = blobUrl;
        this._statusMsg = '';
        this._previewStale = false;
        this._snapshotAppliedState();
        this._doneSentVia  = null;
        this._pdfSent      = false;
        this.dispatchEvent(new CustomEvent('offer-generated', {
          detail: { pdfUrl: blobUrl, blob },
          bubbles: true, composed: true,
        }));
      } else {
        // url mode
        let data;
        try { data = await resp.json(); }
        catch (e) { throw new Error('Server error — check terminal for traceback'); }
        if (!resp.ok) throw new Error(data.error || 'Failed');

        const rawUrl = this.apiBaseUrl + data.pdf_url + '?t=' + Date.now();
        this._pdfVehicle = data.vehicle;

        // Fetch PDF as blob so the iframe never hits the API server directly.
        // Avoids ngrok interstitial and cross-origin cookie issues on mobile.
        const pdfHeaders = { 'ngrok-skip-browser-warning': 'true' };
        if (this.authToken) pdfHeaders['Authorization'] = `Bearer ${this.authToken}`;
        const pdfResp = await fetch(rawUrl, { headers: pdfHeaders });
        const pdfBlob = await pdfResp.blob();

        const customerName = (payloadData.customer?.name || 'Customer').replace(/[^a-zA-Z0-9 ]/g, '').trim();
        const vin = data.vehicle?.vin || 'offer';
        this._pdfFilename = `${customerName}_${vin}.pdf`;
        const pdfFile = new File([pdfBlob], this._pdfFilename, { type: 'application/pdf' });

        if (this._currentBlobUrl) URL.revokeObjectURL(this._currentBlobUrl);
        const blobUrl = URL.createObjectURL(pdfFile);
        this._currentBlobUrl = blobUrl;
        this._pdfUrl = blobUrl;
        this._statusMsg = '';
        this._previewStale = false;
        this._snapshotAppliedState();
        this._doneSentVia  = null;
        this._pdfSent      = false;
        this.dispatchEvent(new CustomEvent('offer-generated', {
          detail: { pdfUrl: rawUrl },
          bubbles: true, composed: true,
        }));
      }
    } catch (err) {
      this._statusMsg = err.message;
      this._statusError = true;
      this.dispatchEvent(new CustomEvent('offer-error', {
        detail: { error: err.message },
        bubbles: true, composed: true,
      }));
    }

    this._generating = false;
  }

  async _handleApply() {
    this._savedConfirm = true;
    if (this.templateMode) {
      await this._handleGenerate(false);
      this._dispatchDisplaySave();
      this.dispatchEvent(new CustomEvent('template-save', {
        detail: { shared: this._buildSharedState(), pdf: this._buildPdfState() },
        bubbles: true, composed: true,
      }));
    } else {
      this._finalizing = true;
      await this._handleGenerate(false);
      this._finalizing = false;
      this._finalized = true;
      this._dispatchDisplaySave();
    }
  }

  async _handleReopen() {
    this._finalized = false;
    await this._handleGenerate();
  }

  async _handleDownloadPdf() {
    if (!this._pdfUrl) return;
    const filename = this._pdfFilename || `${this._pdfVehicle?.vin || 'offer'}.pdf`;
    try {
      const headers = { 'ngrok-skip-browser-warning': 'true' };
      if (this.authToken) headers['Authorization'] = `Bearer ${this.authToken}`;
      const resp = await fetch(this._pdfUrl, { headers });
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (_) {
      window.open(this._pdfUrl, '_blank');
    }
  }

  // ── Send ───────────────────────────────────────────────────────────────────

  get _primaryAction() {
    if (this._doneSentVia) return null; // main button inert after sending; dropdown handles resends
    const c = this.payload?.customer || {};
    if (this._sendVia) return this._sendVia;
    if (c.email) return 'email';
    return null;
  }

  _handleSend(sendVia) {
    this._splitOpen   = false;
    this._doneSentVia = sendVia;
    this._pdfSent     = true;

    const payload = {
      ...this._lastPrintoutRequest,
      filename: this._pdfFilename || null,
    };

    console.log('[pdf-send] send_via:', sendVia);
    console.log('[pdf-send] payload:', payload);

    this.dispatchEvent(new CustomEvent('pdf-send', {
      detail: { send_via: sendVia, payload },
      bubbles: true, composed: true,
    }));
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  _renderHeader() {
    return html`
      <div class="component-header">
        <div class="wrap">
          <h1>LXN Offer Sheet Generator</h1>
        </div>
      </div>
    `;
  }

  _renderOfferCard() {
    if (this.templateMode) {
      return html`
        <div class="card">
          <h2>Template</h2>
          <div style="font-size:13px; color:#667085; line-height:1.6;">
            Configure default printout settings for your location. Generate a preview below.
          </div>
        </div>
      `;
    }
    const vi = this._vehicleInfo;
    return html`
      <div class="card">
        <h2>Offer</h2>
        ${vi ? html`
          <div class="vehicle-info">
            <div class="amount">${vi.amount}</div>
            <div class="desc">${vi.desc}</div>
            ${vi.vin ? html`<div style="font-size:11px;color:#006073;margin-top:2px;">${vi.vin}</div>` : nothing}
          </div>
        ` : html`<div style="font-size:13px; color:#aab4c0;">Loading offer details…</div>`}
      </div>
    `;
  }

  /* ── REMOVED (kept for reference — old "Refresh Preview" button, replaced by
     the Apply split-button rendered in its place inside _renderCustomizeCard's
     .action-btns below):

  ${this._previewStale ? html`
    <button
      class="refresh-text-btn"
      ?disabled="${this._generating || this._finalizing}"
      @click="${() => this._handleGenerate()}"
    >Refresh Preview ↻</button>
  ` : nothing}

  ── end removed ─────────────────────────────────────────────────────────────── */

  _renderCustomizeCard() {
    const onePage = this._isOnePage();
    const fontLabel = FONT_SIZE_OPTIONS[this._fontSizeIndex].label;

    // Show/hide groups always in default order
    const sectionGroups = DEFAULT_LAYOUT_ORDER.map(sec => this._renderShowHideGroup(sec));

    return html`
      <div class="card">
        <div>
        <div class="customize-header-row">
          <h2>Customize</h2>
          <div class="ctrl-group ${this._isLocked('mode') ? 'locked' : ''}">
            <div class="segmented-control" style="width:auto;">
              <button
                class="seg-btn ${this._mode === 'full' ? 'active' : ''}"
                ?disabled="${this._isLocked('mode')}"
                @click="${() => this._handleModeChange('full')}"
              >Full</button>
              <button
                class="seg-btn ${onePage ? 'active' : ''}"
                ?disabled="${this._isLocked('mode')}"
                @click="${() => this._handleModeChange('one_page')}"
              >One-Page</button>
            </div>
            ${this._lk('mode')}
          </div>
        </div>

        <!-- General -->
        <div class="collapsible-section ${this._generalOpen ? '' : 'collapsed'}">
          <div class="section-header" @click="${() => { this._generalOpen = !this._generalOpen; }}">
            <span>General</span>
            <div class="section-chevron">${chevronSvg}</div>
          </div>
          <div class="section-body">
            <div class="config-row">
              <span>$ Amount (header)</span>
              <div class="ctrl-group ${this._isLocked('value_display') ? 'locked' : ''}">
                <div class="segmented-control">
                  <button
                    class="seg-btn ${this._valueDisplay === 'offer' ? 'active' : ''}"
                    ?disabled="${this._isLocked('value_display')}"
                    @click="${() => this._handleSegmentedClick('value-display', 'offer')}"
                  >Offer</button>
                  <button
                    class="seg-btn ${this._valueDisplay === 'tax_savings' ? 'active' : ''}"
                    ?disabled="${this._isLocked('value_display')}"
                    @click="${() => this._handleSegmentedClick('value-display', 'tax_savings')}"
                  >Tax Savings</button>
                </div>
                ${this._lk('value_display')}
              </div>
            </div>
            <div class="config-row">
              <span>Tax Savings Rate</span>
              <div class="ctrl-group ${this._isLocked('tax_rate_pct') ? 'locked' : ''}">
                <div class="tax-rate-wrapper">
                  <input
                    type="number"
                    class="tax-rate-input"
                    .value="${this._taxRatePct ?? ''}"
                    min="0"
                    max="99"
                    step="0.01"
                    ?disabled="${this._isLocked('tax_rate_pct')}"
                    @input="${this._handleTaxRateInput}"
                  />
                  <span class="tax-rate-suffix">%</span>
                </div>
                ${this._lk('tax_rate_pct')}
              </div>
            </div>
            <div class="config-row">
              <span>Profit label</span>
              <div class="ctrl-group ${this._isLocked('profit_label') ? 'locked' : ''}">
                <input
                  type="text"
                  style="font-size:12px;padding:4px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;width:110px;"
                  placeholder="Target Profit"
                  .value="${this._profitName ?? ''}"
                  ?disabled="${this._isLocked('profit_label')}"
                  @input="${this._handleProfitNameInput}"
                />
                ${this._lk('profit_label')}
              </div>
            </div>
            ${!this.templateMode && this.employees && this.employees.length > 0 ? html`
              <div class="config-row">
                <span>Employee</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(e) => { this._selectedEmployeeIndex = parseInt(e.target.value); }}"
                >
                  ${this.employees.map((emp, i) => html`
                    <option value="${i}" ?selected="${i === this._selectedEmployeeIndex}">${emp.name}</option>
                  `)}
                </select>
              </div>
            ` : nothing}
            <div class="config-row">
              <span>Font size</span>
              <div class="ctrl-group ${this._isLocked('font_size') ? 'locked' : ''}">
                <div class="stepper">
                  <button class="step-btn" ?disabled="${this._fontSizeIndex <= 0 || this._isLocked('font_size')}"
                          @click="${() => this._handleFontSizeStep(-1)}">−</button>
                  <span class="stepper-value font-size-display">${fontLabel}</span>
                  <button class="step-btn" ?disabled="${this._fontSizeIndex >= FONT_SIZE_OPTIONS.length - 1 || this._isLocked('font_size')}"
                          @click="${() => this._handleFontSizeStep(1)}">+</button>
                </div>
                ${this._lk('font_size')}
              </div>
            </div>
            <div class="config-row">
              <span>Photos (per row)</span>
              <div class="ctrl-group ${this._isLocked('photos_per_row') ? 'locked' : ''}">
                <div class="stepper">
                  <button class="step-btn" ?disabled="${this._photosPerRow <= 2 || this._isLocked('photos_per_row')}"
                          @click="${() => this._handlePhotosPerRowStep(-1)}">−</button>
                  <span class="stepper-value">${this._photosPerRow}</span>
                  <button class="step-btn" ?disabled="${this._photosPerRow >= 4 || this._isLocked('photos_per_row')}"
                          @click="${() => this._handlePhotosPerRowStep(1)}">+</button>
                </div>
                ${this._lk('photos_per_row')}
              </div>
            </div>
            <div class="config-row">
              <span>Disclosures</span>
              <div class="ctrl-group ${this._isLocked('disc_layout') ? 'locked' : ''}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._discLayout === 'vertical' ? 'active' : ''}"
                          ?disabled="${this._isLocked('disc_layout')}"
                          @click="${() => this._handleSegmentedClick('disc-layout', 'vertical')}">Vertical</button>
                  <button class="seg-btn ${this._discLayout === 'horizontal' ? 'active' : ''}"
                          ?disabled="${this._isLocked('disc_layout')}"
                          @click="${() => this._handleSegmentedClick('disc-layout', 'horizontal')}">Horizontal</button>
                </div>
                ${this._lk('disc_layout')}
              </div>
            </div>
            <div class="config-row">
              <span>Market</span>
              <div class="ctrl-group ${this._isLocked('market_display') ? 'locked' : ''}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._marketDisplay === 'summary' ? 'active' : ''}"
                          ?disabled="${this._isLocked('market_display')}"
                          @click="${() => this._handleSegmentedClick('market-display', 'summary')}">Summary</button>
                  <button class="seg-btn ${this._marketDisplay === 'full' ? 'active' : ''}"
                          ?disabled="${this._isLocked('market_display')}"
                          @click="${() => this._handleSegmentedClick('market-display', 'full')}">Full</button>
                </div>
                ${this._lk('market_display')}
              </div>
            </div>
            <div class="config-row">
              <span>Scenarios</span>
              <div class="ctrl-group ${this._isLocked('scenario_layout') ? 'locked' : ''}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._scenarioLayout === 'tiles' ? 'active' : ''}"
                          ?disabled="${this._isLocked('scenario_layout')}"
                          @click="${() => this._handleSegmentedClick('scenario-layout', 'tiles')}">Tiles</button>
                  <button class="seg-btn ${this._scenarioLayout === 'rows' ? 'active' : ''}"
                          ?disabled="${this._isLocked('scenario_layout')}"
                          @click="${() => this._handleSegmentedClick('scenario-layout', 'rows')}">Rows</button>
                </div>
                ${this._lk('scenario_layout')}
              </div>
            </div>
            <div style="padding:8px 0 4px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <span style="font-size:12px;color:#222222;">Disclaimer (appended to footer)</span>
                ${this._lk('disclaimer')}
              </div>
              <div class="config-row ${this._isLocked('disclaimer') ? 'disabled' : ''}" style="margin-bottom:6px;padding-left:16px;">
                <span>Separator</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  ?disabled="${this._isLocked('disclaimer')}"
                  @change="${(e) => { this._disclaimerPunct = e.target.value; }}"
                >
                  <option value="," ?selected="${this._disclaimerPunct === ','}">Comma (,)</option>
                  <option value="." ?selected="${this._disclaimerPunct === '.'}">Period (.)</option>
                  <option value="" ?selected="${this._disclaimerPunct === ''}">None</option>
                </select>
              </div>
              <textarea
                style="width:calc(100% - 16px);font-size:12px;padding:6px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;resize:vertical;min-height:60px;font-family:inherit;line-height:1.4;margin-left:16px;${this._isLocked('disclaimer') ? 'opacity:0.5;pointer-events:none;' : ''}"
                placeholder="e.g., subject to Carfax History and Lien report."
                .value="${this._disclaimerText ?? ''}"
                ?disabled="${this._isLocked('disclaimer')}"
                @input="${this._handleDisclaimerInput}"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="divider" style="margin:12px 0;"></div>

        <!-- Show / Hide -->
        <div class="collapsible-section ${this._showHideOpen ? '' : 'collapsed'}">
          <div class="section-header" @click="${() => { this._showHideOpen = !this._showHideOpen; }}">
            <span>Show / Hide</span>
            <div class="section-chevron">${chevronSvg}</div>
          </div>
          <div class="section-body">
            <!-- Header group (no checkbox) -->
            <div class="toggle-group">
              <div class="group-row">
                <label style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#222222;cursor:default;">Header</label>
                ${this._lk('condition')}
              </div>
              <div class="pill-group ${this._isLocked('condition') ? 'locked' : ''}">
                <span
                  class="pill ${this._pills['general.condition'] ? 'active' : ''}"
                  @click="${() => this._handlePillClick('general.condition', null)}"
                >Condition</span>
              </div>
            </div>
            <!-- Section groups in layout order -->
            ${sectionGroups}
            <!-- Signature (always at end of PDF, not draggable) -->
            <div class="toggle-group" data-group="signature">
              <div class="group-row ${this._isLocked('signature') ? 'group-row-locked' : ''}">
                <label class="group-header">
                  <input
                    type="checkbox"
                    data-group="signature"
                    .checked="${this._groups.signature === 'checked'}"
                    ?disabled="${this._isLocked('signature')}"
                    @change="${(e) => this._handleGroupChange('signature', e.target.checked)}"
                  >
                  Customer Signature
                </label>
                ${this._lk('signature')}
              </div>
            </div>
          </div>
        </div>

        <div class="divider" style="margin:12px 0;"></div>

        <!-- Layout -->
        <div class="collapsible-section ${this._layoutOpen ? '' : 'collapsed'}">
          <div class="section-header" @click="${() => { this._layoutOpen = !this._layoutOpen; }}">
            <span>Layout</span>
            <div style="display:flex;align-items:center;gap:6px;">
              ${this._lk('section_order')}
              <div class="section-chevron">${chevronSvg}</div>
            </div>
          </div>
          <div class="section-body">
            <div class="sortable-list ${this._isLocked('section_order') ? 'disabled' : ''}"
              @dragover="${(e) => e.preventDefault()}"
              @drop="${(e) => this._handleListDrop(e)}"
            >
              ${this._sectionOrder.map((sec, i) => {
                const disabled = this._isSectionDisabled(sec) || this._isLocked('section_order');
                return html`
                  <div
                    class="sortable-item ${disabled ? 'disabled' : ''}"
                    data-section="${sec}"
                    draggable="${disabled ? 'false' : 'true'}"
                    @dragstart="${(e) => this._handleDragStart(e, sec)}"
                    @dragover="${(e) => this._handleDragOver(e, sec)}"
                    @drop="${(e) => this._handleDrop(e)}"
                    @dragend="${(e) => this._handleDragEnd(e)}"
                  >
                    <span class="drag-handle">⠿</span>
                    <span>${SECTION_LABELS[sec]}</span>
                    <div class="sort-arrows">
                      <button class="sort-arrow" ?disabled="${disabled || i === 0}" @click="${() => this._handleMoveSection(sec, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${disabled || i === this._sectionOrder.length - 1}" @click="${() => this._handleMoveSection(sec, 1)}">▼</button>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>

        </div><!-- end settings-locked wrapper -->

        <div class="divider"></div>

        ${this._statusError && this._statusMsg ? html`
          <div class="action-msg error">${this._statusMsg}</div>
        ` : nothing}

        ${this.templateMode ? html`
          <button
            class="btn btn-green"
            ?disabled="${this._generating || this._finalizing}"
            @click="${() => this._handleApply()}"
          >${this._generating ? 'Saving…' : this._savedConfirm ? 'Saved ✓' : 'Save Template'}</button>
        ` : nothing}

        ${!this.templateMode ? html`
          <div class="action-btns">
            <div class="apply-btn-wrap">
              <button
                class="apply-main ${this._previewStale ? 'split' : 'inactive'}"
                ?disabled="${!this._previewStale || this._generating || this._finalizing}"
                @click="${() => this._handleApply()}"
              >${this._generating || this._finalizing ? 'Applying…' : 'Apply'}</button>
              ${this._previewStale ? html`
                <button
                  class="apply-discard-btn"
                  title="Discard unapplied changes"
                  ?disabled="${this._generating || this._finalizing}"
                  @click="${() => this._handleDiscardChanges()}"
                >${undoSvg}</button>
              ` : nothing}
            </div>
            ${this._renderSendInline()}
            ${(this.sharedDisplay || this.pdfDisplay) ? (this._confirmReset ? html`
              <div class="confirm-reset">
                <span class="confirm-reset-msg">Reset all settings to the template defaults?</span>
                <div class="confirm-reset-btns">
                  <button class="confirm-reset-yes" @click="${() => this._handleReset()}">Yes, reset</button>
                  <button class="confirm-reset-no"  @click="${() => { this._confirmReset = false; }}">Cancel</button>
                </div>
              </div>
            ` : html`
              <button class="reset-btn" @click="${() => { this._confirmReset = true; }}">Reset to template</button>
            `) : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  _renderShowHideGroup(section) {
    if (section === 'market_scenarios') return this._renderScenarioGroup('market_scenarios', 'Market Scenarios', 'Market');
    if (section === 'selected_scenarios') return this._renderScenarioGroup('selected_scenarios', 'Selected Scenarios', 'Selected');

    const locked     = this._isLocked(section);
    const groupState = this._groups[section];
    const LABELS     = { valuation:'Valuation', disclosures:'Disclosures', observations:'Observations', market:'Market Comparables', recon:'Recon', photos:'Photos' };

    const row = html`
      <div class="group-row ${locked ? 'group-row-locked' : ''}">
        <label class="group-header">
          <input type="checkbox" data-group="${section}"
            .checked="${groupState === 'checked' || groupState === 'indeterminate'}"
            ?disabled="${locked}"
            @change="${(e) => this._handleGroupChange(section, e.target.checked)}"
          >${LABELS[section]}
        </label>
        ${this._lk(section)}
      </div>`;

    if (section === 'valuation') {
      const open = !!this._pillsOpen.valuation;
      return html`
        <div class="toggle-group" data-group="valuation">
          ${row}
          <div class="pill-group ${locked ? 'locked' : ''}">
            ${this._renderPillsToggle('valuation')}
            ${open ? html`
              ${this._renderPill('valuation.retail_value', 'Retail Value', 'valuation')}
              ${this._renderPill('valuation.recon', 'Recon', 'valuation')}
              ${this._renderPill('valuation.fixed_overhead', 'Fixed Overhead', 'valuation')}
              ${this._renderPill('valuation.target_profit', this._profitName || 'Target Profit', 'valuation')}
              ${this._renderPill('valuation.tax_savings', 'Tax Savings', 'valuation')}
            ` : nothing}
          </div>
        </div>`;
    }
    if (section === 'observations') {
      return html`
        <div class="toggle-group" data-group="observations">
          ${row}
          <div class="pill-group ${locked ? 'locked' : ''}">
            ${this._renderPill('sections.observations_highlights', 'Highlights', 'observations')}
            ${this._renderPill('sections.observations_comments', 'Comments', 'observations')}
          </div>
        </div>`;
    }
    return html`
      <div class="toggle-group" data-group="${section}">
        ${row}
      </div>`;
  }

  /** Independent toggle — not nested under Market Comparables, not part of the
   * draggable section order (mirrors how Signature is handled). Each of the 12
   * KPI fields gets its own pill, same idiom as Valuation/Observations. */
  _renderPillsToggle(group) {
    const open = !!this._pillsOpen[group];
    return html`
      <span
        class="pill pill-toggle"
        title="${open ? 'Collapse fields' : 'Expand fields'}"
        @click="${() => this._togglePillsOpen(group)}"
      >${open ? 'Collapse ‹' : 'Expand ›'}</span>
    `;
  }

  _renderScenarioGroup(group, title, basis) {
    const locked = this._isLocked(group);
    const groupState = this._groups[group];
    const checked = groupState === 'checked' || groupState === 'indeterminate';
    const open = !!this._pillsOpen[group];
    return html`
      <div class="toggle-group" data-group="${group}">
        <div class="group-row ${locked ? 'group-row-locked' : ''}">
          <label class="group-header">
            <input type="checkbox" data-group="${group}"
              .checked="${checked}"
              ?disabled="${locked}"
              @change="${(e) => this._handleGroupChange(group, e.target.checked)}"
            >${title}
          </label>
          ${this._lk(group)}
        </div>
        <div class="pill-group ${locked ? 'locked' : ''}">
          ${this._renderPillsToggle(group)}
          ${open ? SCENARIO_FIELDS.map(f => this._renderPill(`${group}.${f.key}`, f.label.replace('{basis}', basis), group)) : nothing}
        </div>
      </div>`;
  }

  _renderPill(path, label, group) {
    const active = this._pills[path];
    return html`
      <span
        class="pill ${active ? 'active' : ''}"
        @click="${() => this._handlePillClick(path, group)}"
      >${label}</span>
    `;
  }

  _renderSendInline() {
    const hasEmail = !!this.payload?.customer?.email;
    const hasPdf   = !!this._pdfUrl && !this._generating;

    if (!hasEmail) return nothing;

    const mainLabel = this._doneSentVia ? 'Email Sent ✓' : 'Send via Email';
    const canSend   = hasPdf && !this._doneSentVia;

    return html`
      <button
        class="split-main ${this._doneSentVia ? 'done' : ''}"
        style="border-radius:8px;width:100%;padding:10px 16px;font-size:13px;"
        ?disabled="${!canSend}"
        @click="${() => this._handleSend('email')}"
      >${mainLabel}</button>
    `;
  }

  /* ── REMOVED (kept for reference — the old clickable inline refresh trigger,
     replaced by the Apply button in the sidebar). Was the whole contents of
     .preview-title-group in _renderPreviewPane below:

  <div class="preview-title-group">
    <span
      class="preview-refresh-trigger ${busy ? 'busy' : ''}"
      title="${this._previewStale ? 'Refresh preview' : ''}"
      @click="${() => { if (!this._generating && !this._finalizing) this._handleGenerate(); }}"
    >
      ${this._previewStale ? html`<span class="preview-refresh-icon">↻</span>` : nothing}
      <h2>${canInlinePdf ? 'Preview' : 'PDF'}</h2>
    </span>
    <span
      class="preview-status-dot ${this._previewStale ? 'stale' : ''}"
      title="${this._previewStale ? 'Preview is out of date' : 'Preview is up to date'}"
    ></span>
  </div>

  ── end removed ─────────────────────────────────────────────────────────────── */

  _renderPreviewPane() {
    const hasPdf = !!this._pdfUrl;
    const busy = this._generating || this._finalizing;
    // Excludes _statusError — otherwise a failed generate leaves showLoading stuck
    // true forever (busy goes false, but hasPdf never becomes true either), so the
    // spinner never clears and the error never gets its own state in the pane.
    const showLoading = busy || (!!this.apiBaseUrl && !hasPdf && !this._statusError);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const canInlinePdf = !isMobile && navigator.pdfViewerEnabled;

    return html`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <div class="preview-title-group">
              <h2>${canInlinePdf ? 'Preview' : 'PDF'}</h2>
              <span
                class="preview-status-dot ${this._previewStale ? 'stale' : ''}"
                title="${this._previewStale ? 'Unapplied changes — click Apply to update' : 'Up to date'}"
              ></span>
            </div>
            ${!this.templateMode && hasPdf && !busy && canInlinePdf ? html`
              <em style="font-size:13px;color:#667085;">Download PDF via toolbar below</em>
            ` : nothing}
          </div>
          ${showLoading ? html`
            <div class="preview-loading">
              <div class="pulse-dots">
                <span></span><span></span><span></span>
              </div>
              Generating preview…
            </div>
          ` : nothing}
          ${!showLoading && !hasPdf ? html`
            <div class="empty-preview">${this._statusError && this._statusMsg ? this._statusMsg : 'Preview will appear once a payload is loaded'}</div>
          ` : nothing}
          ${hasPdf && !busy && canInlinePdf ? html`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : nothing}
          ${hasPdf && !busy && !canInlinePdf ? html`
            <div style="width:100%;aspect-ratio:612/792;display:flex;align-items:center;justify-content:center;padding:20px;border:2px solid #d0d5dd;border-radius:8px;">
              ${window.natively ? html`
                <button
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;"
                  @click="${() => window.natively.openPDF({ base64: this._pdfUrl.split(',')[1], fileName: 'offer.pdf', download: true }, () => {})}"
                >Open PDF</button>
              ` : html`
                <a
                  href="${this._pdfUrl}"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;text-decoration:none;"
                >Open PDF</a>
              `}
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  // ── Main render ────────────────────────────────────────────────────────────

  render() {
    return html`
      <div class="shell">
        ${this._renderHeader()}
        <main @click="${() => { if (this._splitOpen) this._splitOpen = false; }}">
          <div class="layout">
            <div class="sidebar">
              ${this._renderOfferCard()}
              ${this._renderCustomizeCard()}
            </div>
            ${this._renderPreviewPane()}
          </div>
        </main>
      </div>
    `;
  }
}

customElements.define('lexen-offer-sheet', LexenOfferSheet);
