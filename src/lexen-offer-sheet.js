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
      retail_value: 32000, recon_total: 3500, fixed_overhead: 500,
      target_profit: { amount: 2500, label: 'Target Profit' },
      tax_savings: { rate_pct: 13.0, amount: 3250, gross_value: 28250 },
    },
    disclosures: [
      { question: 'Disclosure Question #1', answer: 'Answer #1' },
      { question: 'Disclosure Question #2', answer: 'Answer #2' },
      { question: 'Disclosure Question #3', answer: 'Answer #3' },
    ],
    observations: {
      highlights: [
        { description: 'Upgraded alloy wheels', amount: 500 },
        { description: 'New tires', amount: 750 },
      ],
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
      damages: [
        { description: 'Front bumper scratch', amount: 350 },
        { description: 'Windshield chip', amount: 150 },
      ],
      total: 3500,
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

const DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'recon', 'photos'];

const SECTION_LABELS = {
  valuation: 'Valuation', disclosures: 'Disclosures', observations: 'Observations',
  market: 'Market', recon: 'Recon', photos: 'Photos',
};

// ── Chevron SVG helper ────────────────────────────────────────────────────────
const chevronSvg = html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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
    defaultDisplay: { type: Object },
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
    _reconView:         { type: String,  state: true },  // 'summary' | 'detail'
    _highlightsView:    { type: String,  state: true },  // 'summary' | 'detail'

    _sectionOrder:      { type: Array,   state: true },

    // Show/Hide pill state — flat object of path → bool
    _pills:             { type: Object,  state: true },
    // Group checkbox state: 'checked' | 'indeterminate' | 'unchecked'
    _groups:            { type: Object,  state: true },

    _finalized:         { type: Boolean, state: true },
    _generating:        { type: Boolean, state: true },
    _finalizing:        { type: Boolean, state: true },
    _statusMsg:         { type: String,  state: true },
    _statusError:       { type: Boolean, state: true },
    _pdfUrl:            { type: String,  state: true },
    _pdfVehicle:        { type: Object,  state: true },
    _savedConfirm:      { type: Boolean, state: true },
  };

  static styles = css`
    :host { display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #EEEEEE; color: #222222; min-height: 100vh; }

    * { box-sizing: border-box; }

    .component-header {
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
    main { padding: 32px 0 64px; }

    .layout {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: flex-start;
    }

    .sidebar { flex: 1 1 380px; min-width: 280px; }
    .preview-pane { flex: 9999 1 280px; min-width: 280px; }

    @media (max-width: 768px) {
      .sidebar, .preview-pane { flex: 1 1 100%; }
      .preview-card { position: static; }
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
    .toggle-group { margin-bottom: 16px; }
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

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
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
    .preview-card { position: sticky; top: 24px; }
    .preview-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 300px; gap: 14px; color: #888; font-size: 14px;
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
      height: 700px;
      border: 1px solid #dde1e8;
      border-radius: 8px;
      background: #e8e8e8;
    }

    .preview-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .preview-card-header h2 { margin: 0; }
    .preview-actions { display: flex; gap: 10px; margin-top: 12px; }
    .preview-actions .btn { width: auto; flex: 1; }

    .empty-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 400px;
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
  `;

  constructor() {
    super();
    // Public
    this.apiBaseUrl = '';
    this.apiMode = 'url';
    this.authToken = '';
    this.templateMode = false;
    this.payload = null;
    this.defaultDisplay = null;
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
    this._reconView = 'summary';
    this._highlightsView = 'summary';

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
    };

    // Group states
    this._groups = {
      valuation: 'checked',
      disclosures: 'checked',
      observations: 'checked',
      market: 'checked',
      recon: 'checked',
      photos: 'checked',
      signature: 'checked',
    };

    // Finalized state
    this._finalized = false;
    // Auto-preview on initial load (non-reactive)
    this._autoPreviewDone = false;
    this._autoPreviewTimer = null;

    // Generate state
    this._generating = false;
    this._finalizing = false;
    this._statusMsg = '';
    this._statusError = false;
    this._pdfUrl = '';
    this._pdfVehicle = null;
    this._savedConfirm = false;

    // Drag-and-drop internal (non-reactive)
    this._dragSrcSection = null;
    this._dragSrcIndex = -1;
    this._placeholder = null;
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
      reconView: this._reconView,
      highlightsView: this._highlightsView,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
    };
  }

  _applyDisplayState(state) {
    if (state.mode !== undefined) this._mode = state.mode;
    if (state.valueDisplay !== undefined) this._valueDisplay = state.valueDisplay;
    if (state.taxRatePct !== undefined) this._taxRatePct = state.taxRatePct;
    // In instance mode, profitName and disclaimerText always come from the location's
    // template props (profitLabel / disclaimerText), never from the saved offer display.
    if (state.disclaimerPunct !== undefined) this._disclaimerPunct = state.disclaimerPunct;
    if (!this.templateMode) {
      // leave _profitName and _disclaimerText to be set by the prop handlers in updated()
    } else {
      if (state.profitName !== undefined) this._profitName = state.profitName;
      if (state.disclaimerText !== undefined) this._disclaimerText = state.disclaimerText;
    }
    if (state.fontSizeIndex !== undefined) this._fontSizeIndex = state.fontSizeIndex;
    if (state.photosPerRow !== undefined) this._photosPerRow = state.photosPerRow;
    if (state.discLayout !== undefined) this._discLayout = state.discLayout;
    if (state.marketDisplay !== undefined) this._marketDisplay = state.marketDisplay;
    if (state.reconView !== undefined) this._reconView = state.reconView;
    if (state.highlightsView !== undefined) this._highlightsView = state.highlightsView;
    if (state.sectionOrder !== undefined) this._sectionOrder = state.sectionOrder.filter(s => DEFAULT_LAYOUT_ORDER.includes(s));
    if (state.pills !== undefined) this._pills = { ...state.pills };
    if (state.groups !== undefined) this._groups = { ...state.groups };
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  firstUpdated() {
    this.dispatchEvent(new CustomEvent('component-ready', {
      bubbles: true, composed: true,
    }));

  }

  updated(changedProps) {
    // Apply defaultDisplay when it's first set
    if (changedProps.has('defaultDisplay') && this.defaultDisplay) {
      this._applyDisplayState(this.defaultDisplay);
      // If auto-preview already fired before saved settings arrived (Bubble async load),
      // re-trigger once with the real saved display state.
      if (this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl) {
        this._savedDisplayConsumed = true;
        clearTimeout(this._autoPreviewTimer);
        this._autoPreviewTimer = setTimeout(() => {
          this._handleGenerate();
        }, 300);
      }
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
    // Re-generate when profitLabel arrives after initial auto-preview in template mode
    if (changedProps.has('profitLabel') && this.templateMode && this._autoPreviewDone && this.apiBaseUrl) {
      this._handleGenerate();
    }

    // Auto-select the current employee when the employees list arrives
    if (changedProps.has('employees') && this.employees?.length && this.payload?.employee?.name) {
      const idx = this.employees.findIndex(e => e.name === this.payload.employee.name);
      if (idx !== -1) this._selectedEmployeeIndex = idx;
    }

    // Clear "Changes saved" message when the user modifies any setting
    if (this._savedConfirm && !changedProps.has('_savedConfirm')) {
      const settingKeys = ['_mode', '_valueDisplay', '_taxRatePct', '_profitName', '_disclaimerText', '_disclaimerPunct',
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_reconView', '_highlightsView',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex'];
      if (settingKeys.some(k => changedProps.has(k))) {
        this._savedConfirm = false;
      }
    }

    // Sync locked prop → _finalized state
    if (changedProps.has('locked')) {
      this._finalized = !!this.locked;
    }

    // Auto-preview once on initial load: debounce off the last external prop arrival
    if (!this._autoPreviewDone && this.apiBaseUrl) {
      if (['payload', 'defaultDisplay', 'employees', 'locked'].some(p => changedProps.has(p))) {
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
    const refOrder = (this.defaultDisplay?.sectionOrder?.length ? this.defaultDisplay.sectionOrder : DEFAULT_LAYOUT_ORDER);
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
    if (this._isOnePage() && ['disclosures', 'recon', 'photos'].includes(section)) return true;
    return this._groups[section] === 'unchecked';
  }

  // ── Display block builder ──────────────────────────────────────────────────

  _buildSaveState() {
    return {
      mode: this._mode,
      valueDisplay: this._valueDisplay,
      taxRatePct: this._taxRatePct,
      profitName: this._profitName || '',
      disclaimerText: this._disclaimerText || '',
      disclaimerPunct: this._disclaimerPunct ?? '.',
      fontSizeIndex: this._fontSizeIndex,
      photosPerRow: this._photosPerRow,
      discLayout: this._discLayout,
      marketDisplay: this._marketDisplay,
      reconView: this._reconView,
      highlightsView: this._highlightsView,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
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
        recon_breakdown: this._isOnePage() ? false : (g.recon === 'checked'),
        photos: this._isOnePage() ? false : (g.photos === 'checked'),
      },
      general: {
        offer_label: false,
        condition: p['general.condition'],
        value_display: this._valueDisplay,
      },
      // "summary" (default — aggregate count+total row) or "detail" (every
      // damage note listed individually, italicized-prefix, non-interleaved).
      recon_view: this._reconView,
      // Same summary/detail concept, independent toggle for Observations' Highlights.
      highlights_view: this._highlightsView,
    };

    return display;
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  _handleModeChange(value) {
    this._mode = value;
    const isOnePage = value === 'one_page';

    if (isOnePage) {
      // Disable disclosures/recon/photos groups
      const newGroups = { ...this._groups };
      ['disclosures', 'recon', 'photos'].forEach(g => {
        newGroups[g] = 'unchecked';
      });
      this._groups = newGroups;
      this._marketDisplay = 'summary';

      // Push disabled sections to bottom, preserving relative order within each group
      const disabledSections = ['disclosures', 'recon', 'photos'];
      const enabled = this._sectionOrder.filter(s => !disabledSections.includes(s));
      const disabled = this._sectionOrder.filter(s => disabledSections.includes(s));
      this._sectionOrder = [...enabled, ...disabled];
    } else {
      // Restore defaults
      const newGroups = { ...this._groups };
      ['disclosures', 'recon', 'photos'].forEach(g => {
        newGroups[g] = 'checked';
      });
      this._groups = newGroups;
      this._marketDisplay = 'full';
      this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];
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

    if (group && ['valuation', 'observations'].includes(group)) {
      this._recomputeGroupState(group);

      // If group is now fully unchecked, push section to bottom
      if (this._groups[group] === 'unchecked') {
        this._syncLayoutOrder(group);
      }
    }
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
    else if (controlId === 'recon-display') this._reconView = value;
    else if (controlId === 'highlights-display') this._highlightsView = value;
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
    if (this.defaultDisplay) {
      this._applyDisplayState(this.defaultDisplay);
    } else {
      this._resetToggles();
    }
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
    this._reconView = 'summary';
    this._highlightsView = 'summary';
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
    };
    this._groups = {
      valuation: 'checked', disclosures: 'checked', observations: 'checked',
      market: 'checked', recon: 'checked', photos: 'checked', signature: 'checked',
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
      detail: { display: this._buildSaveState(), employee },
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
        payloadData.employee = { name: emp.name || '', phone: fmtPhone(emp.phone || '') };
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
          <div class="segmented-control" style="width:auto;">
            <button
              class="seg-btn ${this._mode === 'full' ? 'active' : ''}"
              @click="${() => this._handleModeChange('full')}"
            >Full</button>
            <button
              class="seg-btn ${onePage ? 'active' : ''}"
              @click="${() => this._handleModeChange('one_page')}"
            >One-Page</button>
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
              <div class="segmented-control">
                <button
                  class="seg-btn ${this._valueDisplay === 'offer' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('value-display', 'offer')}"
                >Offer</button>
                <button
                  class="seg-btn ${this._valueDisplay === 'tax_savings' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('value-display', 'tax_savings')}"
                >Tax Savings</button>
              </div>
            </div>
            <div class="config-row">
              <span>Tax savings rate</span>
              <div class="tax-rate-wrapper">
                <input
                  type="number"
                  class="tax-rate-input"
                  .value="${this._taxRatePct ?? ''}"
                  min="0"
                  max="99"
                  step="0.01"
                  @input="${this._handleTaxRateInput}"
                />
                <span class="tax-rate-suffix">%</span>
              </div>
            </div>
            <div class="config-row">
              <span>Profit name</span>
              <input
                type="text"
                style="font-size:12px;padding:4px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;width:130px;"
                placeholder="Target Profit"
                .value="${this._profitName ?? ''}"
                @input="${this._handleProfitNameInput}"
              />
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
              <div class="stepper">
                <button
                  class="step-btn"
                  ?disabled="${this._fontSizeIndex <= 0}"
                  @click="${() => this._handleFontSizeStep(-1)}"
                >−</button>
                <span class="stepper-value font-size-display">${fontLabel}</span>
                <button
                  class="step-btn"
                  ?disabled="${this._fontSizeIndex >= FONT_SIZE_OPTIONS.length - 1}"
                  @click="${() => this._handleFontSizeStep(1)}"
                >+</button>
              </div>
            </div>
            <div class="config-row ${onePage ? 'disabled' : ''}">
              <span>Photos (per row)</span>
              <div class="stepper">
                <button
                  class="step-btn"
                  ?disabled="${this._photosPerRow <= 2 || onePage}"
                  @click="${() => this._handlePhotosPerRowStep(-1)}"
                >−</button>
                <span class="stepper-value">${this._photosPerRow}</span>
                <button
                  class="step-btn"
                  ?disabled="${this._photosPerRow >= 4 || onePage}"
                  @click="${() => this._handlePhotosPerRowStep(1)}"
                >+</button>
              </div>
            </div>

            <div class="config-row ${onePage ? 'disabled' : ''}">
              <span>Disclosures</span>
              <div class="segmented-control ${onePage ? 'disabled' : ''}">
                <button
                  class="seg-btn ${this._discLayout === 'vertical' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('disc-layout', 'vertical')}"
                >Vertical</button>
                <button
                  class="seg-btn ${this._discLayout === 'horizontal' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('disc-layout', 'horizontal')}"
                >Horizontal</button>
              </div>
            </div>
            <div class="config-row ${onePage ? 'disabled' : ''}">
              <span>Market</span>
              <div class="segmented-control ${onePage ? 'disabled' : ''}">
                <button
                  class="seg-btn ${this._marketDisplay === 'summary' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('market-display', 'summary')}"
                >Summary</button>
                <button
                  class="seg-btn ${this._marketDisplay === 'full' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('market-display', 'full')}"
                >Full</button>
              </div>
            </div>
            <div class="config-row ${onePage ? 'disabled' : ''}">
              <span>Recon</span>
              <div class="segmented-control ${onePage ? 'disabled' : ''}">
                <button
                  class="seg-btn ${this._reconView === 'summary' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('recon-display', 'summary')}"
                >Summary</button>
                <button
                  class="seg-btn ${this._reconView === 'detail' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('recon-display', 'detail')}"
                >Detail</button>
              </div>
            </div>
            <div class="config-row">
              <span>Highlights</span>
              <div class="segmented-control">
                <button
                  class="seg-btn ${this._highlightsView === 'summary' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('highlights-display', 'summary')}"
                >Summary</button>
                <button
                  class="seg-btn ${this._highlightsView === 'detail' ? 'active' : ''}"
                  @click="${() => this._handleSegmentedClick('highlights-display', 'detail')}"
                >Detail</button>
              </div>
            </div>
            <div style="padding:8px 0 4px;">
              <div style="font-size:12px;color:#222222;margin-bottom:6px;">Disclaimer (appended to footer)</div>
              <div class="config-row" style="margin-bottom:6px;padding-left:16px;">
                <span>Separator</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(e) => { this._disclaimerPunct = e.target.value; }}"
                >
                  <option value="," ?selected="${this._disclaimerPunct === ','}">Comma (,)</option>
                  <option value="." ?selected="${this._disclaimerPunct === '.'}">Period (.)</option>
                  <option value="" ?selected="${this._disclaimerPunct === ''}">None</option>
                </select>
              </div>
              <textarea
                style="width:100%;font-size:12px;padding:6px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;resize:vertical;min-height:60px;font-family:inherit;line-height:1.4;margin-left:16px;width:calc(100% - 16px);"
                placeholder="e.g., subject to Carfax History and Lien report."
                .value="${this._disclaimerText ?? ''}"
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
              <div class="group-header">
                <label style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#222222;cursor:default;">Header</label>
              </div>
              <div class="pill-group">
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
              <label class="group-header">
                <input
                  type="checkbox"
                  data-group="signature"
                  .checked="${this._groups.signature === 'checked'}"
                  @change="${(e) => this._handleGroupChange('signature', e.target.checked)}"
                >
                Customer Signature
              </label>
            </div>
          </div>
        </div>

        <div class="divider" style="margin:12px 0;"></div>

        <!-- Layout -->
        <div class="collapsible-section ${this._layoutOpen ? '' : 'collapsed'}">
          <div class="section-header" @click="${() => { this._layoutOpen = !this._layoutOpen; }}">
            <span>Layout</span>
            <div class="section-chevron">${chevronSvg}</div>
          </div>
          <div class="section-body">
            <div class="sortable-list"
              @dragover="${(e) => e.preventDefault()}"
              @drop="${(e) => this._handleListDrop(e)}"
            >
              ${this._sectionOrder.map(sec => {
                const disabled = this._isSectionDisabled(sec);
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
                      <button class="sort-arrow" ?disabled="${disabled || this._sectionOrder.indexOf(sec) === 0}" @click="${() => this._handleMoveSection(sec, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${disabled || this._sectionOrder.indexOf(sec) === this._sectionOrder.length - 1}" @click="${() => this._handleMoveSection(sec, 1)}">▼</button>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>

        </div><!-- end settings-locked wrapper -->

        <div class="divider"></div>

        <button
          class="btn btn-green"
          ?disabled="${this._generating || this._finalizing}"
          @click="${this._handleApply}"
        >Apply</button>

        ${this._savedConfirm ? html`
          <div style="text-align:center;margin-top:10px;font-size:13px;color:#222222;font-weight:500;">Changes saved!</div>
        ` : nothing}

        <div style="text-align:center; margin-top:20px;">
          <button
            style="background:none;border:none;padding:0;font-size:14px;color:#98a2b3;cursor:pointer;text-decoration:underline;text-underline-offset:2px;"
            @click="${this._handleReset}"
          >Reset</button>
        </div>
      </div>
    `;
  }

  _renderShowHideGroup(section) {
    const onePage = this._isOnePage();
    const groupDisabled = onePage && ['disclosures', 'recon', 'photos'].includes(section);
    const groupState = this._groups[section];

    if (section === 'valuation') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="valuation">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="valuation"
              .checked="${groupState === 'checked' || groupState === 'indeterminate'}"
              @change="${(e) => this._handleGroupChange('valuation', e.target.checked)}"
            >
            Valuation
          </label>
          <div class="pill-group">
            ${this._renderPill('valuation.retail_value', 'Retail Value', 'valuation')}
            ${this._renderPill('valuation.recon', 'Recon', 'valuation')}
            ${this._renderPill('valuation.fixed_overhead', 'Fixed Overhead', 'valuation')}
            ${this._renderPill('valuation.target_profit', this._profitName || 'Target Profit', 'valuation')}
            ${this._renderPill('valuation.tax_savings', 'Tax Savings', 'valuation')}
          </div>
        </div>
      `;
    } else if (section === 'disclosures') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="disclosures">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="disclosures"
              .checked="${groupState === 'checked'}"
              @change="${(e) => this._handleGroupChange('disclosures', e.target.checked)}"
            >
            Disclosures
          </label>
        </div>
      `;
    } else if (section === 'observations') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="observations">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="observations"
              .checked="${groupState === 'checked' || groupState === 'indeterminate'}"
              @change="${(e) => this._handleGroupChange('observations', e.target.checked)}"
            >
            Observations
          </label>
          <div class="pill-group">
            ${this._renderPill('sections.observations_highlights', 'Highlights', 'observations')}
            ${this._renderPill('sections.observations_comments', 'Comments', 'observations')}
          </div>
        </div>
      `;
    } else if (section === 'market') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="market">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="market"
              .checked="${groupState === 'checked'}"
              @change="${(e) => this._handleGroupChange('market', e.target.checked)}"
            >
            Market
          </label>
        </div>
      `;
    } else if (section === 'recon') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="recon">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="recon"
              .checked="${groupState === 'checked'}"
              @change="${(e) => this._handleGroupChange('recon', e.target.checked)}"
            >
            Recon
          </label>
        </div>
      `;
    } else if (section === 'photos') {
      return html`
        <div class="toggle-group ${groupDisabled ? 'disabled' : ''}" data-group="photos">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="photos"
              .checked="${groupState === 'checked'}"
              @change="${(e) => this._handleGroupChange('photos', e.target.checked)}"
            >
            Photos
          </label>
        </div>
      `;
    }
    return nothing;
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

  _renderPreviewPane() {
    const hasPdf = !!this._pdfUrl;
    const busy = this._generating || this._finalizing;
    const showLoading = busy || (!!this.apiBaseUrl && !hasPdf);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const canInlinePdf = !isMobile && navigator.pdfViewerEnabled;

    return html`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <h2>${canInlinePdf ? 'Preview' : 'PDF'}</h2>
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
            <div class="empty-preview">Select a payload and click Refresh Preview</div>
          ` : nothing}
          ${hasPdf && !busy && canInlinePdf ? html`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : nothing}
          ${hasPdf && !busy && !canInlinePdf ? html`
            <div style="display:flex;align-items:center;justify-content:center;padding:20px;border:2px solid #d0d5dd;border-radius:8px;">
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
      ${this._renderHeader()}
      <main>
        <div class="wrap">
          <div class="layout">
            <div class="sidebar">
              ${this._renderOfferCard()}
              ${this._renderCustomizeCard()}
            </div>
            ${this._renderPreviewPane()}
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('lexen-offer-sheet', LexenOfferSheet);
