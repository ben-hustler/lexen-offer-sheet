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
    scenarios: {
      market: {
        vehicles: 320, avgRetail: '$35,000', avgMileage: 45000, listedDays: 90,
        prcMkt: '100%', prcMktAdj: '95%', costMkt: '100%',
        priceRank: '160 of 320', mileageRank: '150 of 320', perception: '160 of 320',
        retail: '$32,000', ACV: '$25,000',
      },
      selected: {
        vehicles: 6, avgRetail: '$36,000', avgMileage: 45000, listedDays: 60,
        prcMkt: '110%', prcMktAdj: '100%', costMkt: '110%',
        priceRank: '3 of 6', mileageRank: '3 of 6', perception: '3 of 6',
        retail: '$32,000', ACV: '$25,000',
      },
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

const DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'market_scenarios', 'selected_scenarios', 'recon', 'photos'];

const SECTION_LABELS = {
  valuation: 'Valuation', disclosures: 'Disclosures', observations: 'Observations',
  market: 'Selected Comparables', market_scenarios: 'Market Scenarios', selected_scenarios: 'Selected Scenarios',
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

// These four start unchecked in a fresh scenario grid — noisier/less
// commonly used KPIs than the rest of SCENARIO_FIELDS.
const SCENARIO_DEFAULT_OFF_KEYS = new Set(['costMkt', 'prcMktAdj', 'retail', 'ACV']);

// ── Chevron + lock SVG helpers ────────────────────────────────────────────────
const chevronSvg    = html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const lockClosedSvg = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const lockOpenSvg   = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const mailSvg       = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
// Material Icons `local_printshop` (filled) — same printer as lxn-doc-viewer.
const printSvg      = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`;
// Material Icons `more_horiz` — opens the individual-sections print/email modal.
const moreSvg       = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
// Material Icons `undo` / `redo` — undo/redo buttons in the Customize header.
const undoSvg = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>`;
const redoSvg = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.4 3.6z"/></svg>`;
// Undo/redo keeps this many applied versions.
const HISTORY_LIMIT = 5;
// Sections One-Page leaves out (its format can't fit them). Mirrored in
// scripts/assemble-print-payload.bubble.js.
const ONE_PAGE_EXCLUDED = ['disclosures', 'recon', 'photos', 'market_scenarios', 'selected_scenarios'];
// Everything One-Page hides: those sections, plus Comments (the one
// Observations field that can run long) and the Market / Highlights views
// (shown as Summary). A display rule, not a settings change — Full still
// prints the real settings underneath.
const ONE_PAGE_LOCKED = [...ONE_PAGE_EXCLUDED, 'sections.observations_comments', 'market_display', 'highlights_display'];
const alertCircleSvg = html`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="8.3" r="0.65" fill="currentColor"/></svg>`;

// ── Main component ────────────────────────────────────────────────────────────
// ── Tooltip ──────────────────────────────────────────────────────────────────
// Copied from lxn-ui's TooltipController (src/components/tooltip/tooltip-core.ts,
// v1.33.0), ported to plain JS — this component doesn't depend on lxn-ui, so
// keep the two in sync by hand. One instance, reused for every show()/hide().
//  - portals into the nearest ancestor <dialog> (else document.body), outside
//    this component's shadow root so position:fixed can't be clipped.
//  - flips below the anchor when there's no room above; slides left/right to
//    stay clear of the viewport edge, arrow still pointing at the anchor.
//  - repositions on resize, dismisses on scroll.
//  - shrinks to the widest wrapped line; text-wrap: balance evens the lines.
const TOOLTIP_EDGE_MARGIN = 8;
const TOOLTIP_ANCHOR_GAP = 10;
const TOOLTIP_ARROW_HALF_WIDTH = 8;

// Snap to whole device pixels (not just CSS pixels) so the bubble isn't
// blurred at 125%/150% scaling.
function snapToDevicePixel(px) {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(px * dpr) / dpr;
}

class TooltipController {
  constructor() {
    this.outer = null;
    this.bubble = null;
    this.label = null;
    this.arrow = null;
    this.anchor = null;
    this.visible = false;
    this.reposition = () => this.updatePosition();
    this.dismissOnScroll = () => this.hide();
  }

  ensure() {
    if (this.outer) return;

    const outer = document.createElement('div');
    Object.assign(outer.style, {
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: '2147483647',
      pointerEvents: 'none',
    });

    const bubble = document.createElement('div');
    Object.assign(bubble.style, {
      position: 'relative',
      boxSizing: 'content-box',
      background: '#333',
      color: '#fff',
      borderRadius: '4px',
      fontSize: '14px',
      lineHeight: '1.4',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      whiteSpace: 'normal',
      textAlign: 'center',
      padding: '8px',
      maxWidth: '240px',
      opacity: '0',
      textWrap: 'balance',
    });

    const label = document.createElement('span');
    bubble.appendChild(label);

    const arrow = document.createElement('div');
    Object.assign(arrow.style, {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderStyle: 'solid',
    });
    this.setArrowOrientation(arrow, 'above');
    bubble.appendChild(arrow);

    outer.appendChild(bubble);

    this.outer = outer;
    this.bubble = bubble;
    this.label = label;
    this.arrow = arrow;
  }

  // 'above'/'below' = where the bubble sits relative to the anchor. 1px
  // overlap, not flush — avoids a hairline seam while animating.
  setArrowOrientation(arrow, placement) {
    Object.assign(
      arrow.style,
      placement === 'above'
        ? { top: 'calc(100% - 1px)', bottom: '', borderWidth: '8px 8px 0', borderColor: '#333 transparent transparent transparent' }
        : { top: '', bottom: 'calc(100% - 1px)', borderWidth: '0 8px 8px', borderColor: 'transparent transparent #333 transparent' },
    );
  }

  show(anchor, text) {
    // Guards against a double show() (e.g. mouseenter + focus from one tap)
    // restarting the fade-in mid-flight.
    if (this.visible && this.anchor === anchor) return;
    this.visible = true;

    this.ensure();
    const { outer, bubble, label } = this;
    this.anchor = anchor;

    const target = anchor.closest('dialog') ?? document.body;
    if (outer.parentElement !== target) target.appendChild(outer);

    // No CSS sizing keyword shrinks a box to its post-wrap line width, so
    // let it wrap at max-width, read the widest line via Range rects, and
    // set that as the explicit width.
    bubble.style.width = '';
    label.textContent = text;
    const range = document.createRange();
    range.selectNodeContents(label);
    const lineWidths = Array.from(range.getClientRects(), r => r.width);
    bubble.style.width = `${Math.ceil(Math.max(...lineWidths))}px`;

    this.updatePosition();

    window.addEventListener('scroll', this.dismissOnScroll, true);
    window.addEventListener('resize', this.reposition);

    bubble.getAnimations().forEach(a => a.cancel());
    bubble.animate(
      [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 160, easing: 'ease-out', fill: 'forwards' },
    );
  }

  hide() {
    this.visible = false;
    window.removeEventListener('scroll', this.dismissOnScroll, true);
    window.removeEventListener('resize', this.reposition);

    const bubble = this.bubble;
    if (!bubble) return;
    bubble.getAnimations().forEach(a => a.cancel());
    bubble.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(6px)' },
      ],
      { duration: 120, easing: 'ease-in', fill: 'forwards' },
    );
  }

  destroy() {
    this.hide();
    this.outer?.remove();
    this.outer = null;
    this.bubble = null;
    this.label = null;
    this.arrow = null;
    this.anchor = null;
  }

  updatePosition() {
    if (!this.anchor || !this.outer || !this.arrow) return;
    const outer = this.outer;
    const rect = this.anchor.getBoundingClientRect();
    const anchorCenterX = rect.left + rect.width / 2;

    // Above by default; flip below only when there isn't room above.
    const fitsAbove = rect.top - TOOLTIP_ANCHOR_GAP - outer.offsetHeight >= TOOLTIP_EDGE_MARGIN;
    this.setArrowOrientation(this.arrow, fitsAbove ? 'above' : 'below');
    const top = fitsAbove
      ? rect.top - TOOLTIP_ANCHOR_GAP - outer.offsetHeight
      : rect.bottom + TOOLTIP_ANCHOR_GAP;

    // Slide to stay clear of the viewport edge; arrow keeps pointing at the anchor.
    const maxLeft = Math.max(TOOLTIP_EDGE_MARGIN, window.innerWidth - TOOLTIP_EDGE_MARGIN - outer.offsetWidth);
    const left = Math.min(Math.max(anchorCenterX - outer.offsetWidth / 2, TOOLTIP_EDGE_MARGIN), maxLeft);
    const arrowX = Math.min(
      Math.max(anchorCenterX - left, TOOLTIP_ARROW_HALF_WIDTH),
      outer.offsetWidth - TOOLTIP_ARROW_HALF_WIDTH,
    );
    this.arrow.style.left = `${snapToDevicePixel(arrowX)}px`;

    // Pre-rounded translate3d instead of translate(-50%) — avoids sub-pixel offsets.
    outer.style.transform = `translate3d(${snapToDevicePixel(left)}px, ${snapToDevicePixel(top)}px, 0)`;
  }
}

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
    templateSharedDisplay: { type: Object },
    templatePdfDisplay:    { type: Object },
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
    _reconView:         { type: String,  state: true },  // 'summary' | 'detail'
    _highlightsView:    { type: String,  state: true },  // 'summary' | 'detail'

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
    // Locked offer (accepted/declined): "Edit anyway" lets the dealer edit
    // regardless — _lockOverridden lasts until `locked` changes again.
    _lockOverridden:    { type: Boolean, state: true },
    // "Reset to location default" is showing its inline Yes/Cancel confirm
    _confirmReset:      { type: Boolean, state: true },
    // Undo/redo: previously applied versions of the settings (see _captureSettings).
    _undoStack:         { type: Array,   state: true },
    _redoStack:         { type: Array,   state: true },
    _locks:             { type: Object,  state: true },

    // Send UI
    _splitOpen:    { type: Boolean, state: true },
    _sendVia:      { type: String,  state: true },
    _doneSentVia:  { type: String,  state: true },
    _pdfSent:      { type: Boolean, state: true },
    _confirmSendEmail: { type: Boolean, state: true },
    _sendMessageType:  { type: String,  state: true },
    _manualCustomerEmail: { type: String, state: true },
    _previewStale: { type: Boolean, state: true },
    // Individual-sections modal — selection lives for the session only, never saved
    _individualOpen:      { type: Boolean, state: true },
    _individualSections: { type: Array,   state: true },
    _individualBusy:      { type: Boolean, state: true },
    _individualError:     { type: String,  state: true },
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

    /* REMOVED (kept for reference — wider/bigger-icon version of splitting the
       send button into the .vehicle-info bubble itself, divided by a vertical
       line. Rejected again — back to the small icon+label box in
       .offer-header-row, see .email-icon-btn below.
    .vehicle-info { display: flex; align-items: stretch; overflow: hidden; }
    .vehicle-info-content { flex: 1; min-width: 0; padding: 12px 14px; }
    .vehicle-info-send-btn {
      flex-shrink: 0; width: 76px; border: none;
      border-left: 1.5px solid #7fb8c3; background: #effcff; color: #006073;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .vehicle-info-send-btn:hover:not(:disabled) { background: #d9f2f7; }
    .vehicle-info-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .vehicle-info-send-btn.done { color: #1a7a4f; cursor: default; }
    */


    /* Send confirmation modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }
    .modal-box {
      background: #fff;
      border-radius: 10px;
      padding: 24px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    }
    .modal-msg { font-size: 14px; color: #344054; line-height: 1.5; margin: 0 0 18px; }
    .modal-recipient-group { display: flex; flex-direction: column; gap: 8px; margin: 0 0 14px; }
    .modal-recipient-option {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; color: #344054; cursor: pointer; user-select: none;
    }
    .modal-recipient-option input[type="radio"],
    .modal-recipient-option input[type="checkbox"] { cursor: pointer; }
    .modal-email-input {
      width: 100%; box-sizing: border-box; padding: 8px 10px; margin: 0 0 14px;
      font-size: 13px; font-family: inherit; color: #222222;
      border: 1.5px solid #d0d5dd; border-radius: 6px;
    }
    .modal-email-input:focus { outline: none; border-color: #35BB9C; }
    .modal-btns { display: flex; gap: 8px; }
    .modal-btn-confirm {
      flex: 1; padding: 9px; background: #35BB9C; color: #fff;
      border: none; border-radius: 6px; font-size: 13px; font-weight: 600;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .modal-btn-confirm:hover:not(:disabled) { background: #2a9880; }
    .modal-btn-confirm:disabled { opacity: 0.45; cursor: not-allowed; }
    .modal-title { font-weight: 700; }
    /* Print/Email in the individual-sections modal carry their toolbar icons */
    .modal-btn-icon { display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
    .modal-btn-icon svg { width: 16px; height: 16px; flex-shrink: 0; }
    .modal-btn-teal { background: #0f8f8f; }
    .modal-btn-teal:hover:not(:disabled) { background: #0a7777; }
    .modal-btn-cancel {
      flex: 1; padding: 9px; background: transparent; color: #344054;
      border: 1px solid #d0d5dd; border-radius: 6px; font-size: 13px; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .modal-btn-cancel:hover:not(:disabled) { background: #f2f4f7; }
    .modal-btn-cancel:disabled { opacity: 0.45; cursor: not-allowed; }

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

    /* Stale — offer amount no longer matches the calculated ACV this scenario's
       ACV/Cost to Market are derived from. Same amber as .discard-btn, faded
       the same way .discard-btn:disabled fades — orange, but visibly inert. */
    .pill.stale {
      background: #fff8e1; border-color: #f59f00; color: #b45309;
      opacity: 0.55; cursor: not-allowed;
    }
    .pill-stale-icon {
      display: inline-flex; align-items: center; justify-content: center;
      margin-right: 4px;
    }

    /* The tooltip itself is NOT styled here — :host sets overflow:hidden
       (see below), which clips anything painted anywhere in this shadow
       root, position:fixed included. It's a real DOM node built and styled
       inline in TooltipController, appended straight to document.body so it
       can float above everything unclipped — same as how Tippy.js itself
       works by default. */

    .pill-toggle {
      display: inline-flex;
      align-items: center;
      padding: 4px 2px;
      font-size: 12px;
      font-weight: 700;
      color: #006073;
      cursor: pointer;
      user-select: none;
      transition: color 0.15s;
    }
    .pill-toggle:hover { color: #004f5f; text-decoration: underline; }

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
    /* REMOVED (kept for reference — Send via Email as a full-width teal button
       under Apply, matching .apply-main's exact sizing. Moved back to the
       Offer card as a small icon+label box instead — see .email-icon-btn.
    .btn-preview {
      display: block; width: 100%; padding: 10px 16px; font-size: 13px;
      font-weight: 600; font-family: inherit; border: none; border-radius: 8px;
      cursor: pointer; text-align: center; transition: background 0.15s, opacity 0.15s;
      background: #0f8f8f; color: #fff;
    }
    .btn-preview:hover:not(:disabled) { background: #0a7777; }
    .btn-preview:disabled { opacity: 0.45; cursor: not-allowed; }
    */
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
    .preview-header-right { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .segmented-control.mode-toggle { width: auto; flex-shrink: 0; }
    .preview-actions { display: flex; gap: 10px; margin-top: 12px; }
    .preview-actions .btn { width: auto; flex: 1; }

    .preview-title-group { display: flex; align-items: center; gap: 12px; }
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
    .preview-status-hit { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; margin-right: -8px; }

    /* Apply / Discard — both grey out with no pending changes, light up once
       something's been edited. Sit side by side above the reset-to-template
       button (see .action-btns). */
    .apply-btn-wrap { display: flex; gap: 8px; width: 100%; }
    .apply-main {
      flex: 1; padding: 10px 16px; font-size: 13px; font-weight: 600;
      background: #35BB9C; color: #fff; border: none;
      border-radius: 8px; cursor: pointer; font-family: inherit;
      transition: background 0.15s; text-align: center;
    }
    .apply-main:hover:not(:disabled) { background: #2a9880; }
    .apply-main:disabled { background: #d0d5dd; color: #667085; opacity: 0.55; cursor: not-allowed; }
    .discard-btn {
      flex: 1; padding: 10px 16px; font-size: 13px; font-weight: 600;
      background: #fff8e1; color: #b45309; border: 1px solid #f59f00;
      border-radius: 8px; cursor: pointer; font-family: inherit;
      transition: background 0.15s, color 0.15s, border-color 0.15s; text-align: center;
    }
    .discard-btn:hover:not(:disabled) { background: #ffedb3; border-color: #e08e00; }
    .discard-btn:disabled { opacity: 0.55; cursor: not-allowed; }

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
    .locked-notice {
      position: relative; z-index: 2; /* above the .settings-locked dimming */
      display: flex; align-items: flex-start; gap: 8px;
      margin: 14px 0 10px; padding: 12px 12px;
      background: #fff8e6; border: 1px solid #f5d48a; border-radius: 6px;
      font-size: 12px; line-height: 1.4; color: #7a4b00;
    }
    .locked-notice svg { flex-shrink: 0; margin-top: 2px; }
    .locked-notice span { flex: 1; }
    .locked-notice-edit {
      flex-shrink: 0; align-self: center; padding: 4px 10px;
      background: #fff; border: 1px solid #f5d48a; border-radius: 5px;
      font-size: 12px; font-weight: 600; color: #7a4b00; cursor: pointer;
    }
    .locked-notice-edit:hover { background: #fff3d1; }
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
      width: 20px; color: #b0b8c4; flex-shrink: 0; cursor: default;
    }
    .pill.one-page-locked { opacity: 0.55; cursor: default; }
    /* One-Page hides this — shown in place of a lock icon. */
    .full-only-chip {
      display: inline-flex; align-items: center; flex-shrink: 0;
      padding: 2px 8px; border-radius: 999px;
      background: #006073; border: 1px solid #006073; color: #effcff;
      font-size: 11px; font-weight: 500; white-space: nowrap; cursor: default;
    }
    .ctrl-group { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .ctrl-group.locked > :not(.full-only-chip):not(.lock-indicator) { opacity: 0.5; pointer-events: none; }
    .group-row { display: flex; align-items: center; justify-content: space-between; }
    .group-row label.group-header { flex: 1; }
    .group-row-locked label.group-header { opacity: 0.5; }
    .group-row-locked input[type="checkbox"] { pointer-events: none; }
    .pill-group.locked { opacity: 0.45; pointer-events: none; }
    /* Group checkbox off but chips keep their own state underneath (see
       _handleGroupChange) — dim + freeze them rather than clearing them, so
       re-checking the box shows exactly what was selected before. */
    .pill-group.group-off { opacity: 0.45; pointer-events: none; }

    .action-btns { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }


    .offer-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .offer-header-row h2 { margin-bottom: 0; }

    /* Matches the unselected/greyed segment look of .seg-btn (Full/One-Page
       etc.) — deliberately not the teal .seg-btn.active treatment. */
    .preview-icon-btns { display: flex; align-items: center; }
    .email-icon-btn {
      display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
      box-sizing: border-box; width: 40px; height: 40px; padding: 0;
      background: transparent; border: none;
      color: #475467; cursor: pointer; user-select: none; line-height: 0;
      transition: color 0.15s;
    }
    .email-icon-btn:hover:not(:disabled) { color: #1d2939; }
    .email-icon-btn:disabled { opacity: 0.45; cursor: not-allowed; }

    /* REMOVED (kept for reference — Send Email as a full-width teal button
       under the offer bubble, styled to match .apply-main exactly. Back to
       the small icon+label box opposite "Offer" instead — see .email-icon-btn.
    .send-email-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      margin-top: 10px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      background: #35BB9C;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s;
    }
    .send-email-btn:hover:not(:disabled) { background: #2a9880; }
    .send-email-btn:disabled { background: #d0d5dd; color: #667085; opacity: 0.55; cursor: not-allowed; }
    .send-email-btn.done { background: #d0d5dd; color: #667085; opacity: 0.55; cursor: default; }
    */

    .customize-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .customize-header-row h2 { margin-bottom: 0; }
    .history-btns { display: flex; gap: 2px; }
    .history-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; padding: 0;
      background: transparent; color: #667085;
      border: 1px solid transparent; border-radius: 7px; cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .history-btn:hover:not(:disabled) { background: #effcff; border-color: #7fb8c3; color: #006073; }
    .history-btn:disabled { opacity: 0.35; cursor: default; }
    .history-btn:focus-visible { outline: 2px solid #7fb8c3; outline-offset: 1px; }
    .customize-header-ctrls { display: flex; align-items: center; gap: 8px; }


    /* Reset to location default — quiet outline button under Apply/Discard,
       swaps to an inline Yes/Cancel confirm when clicked. */
    .reset-btn {
      width: 100%; padding: 9px 20px; background: transparent; color: #98a2b3;
      border: 1px solid #eaecf0; border-radius: 8px; font-size: 13px; font-weight: 500;
      cursor: pointer; font-family: inherit;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .reset-btn:hover:not(:disabled) { background: #f9fafb; color: #667085; border-color: #d0d5dd; }
    .reset-btn:disabled { opacity: 0.55; cursor: not-allowed; }
    .confirm-reset {
      padding: 10px 12px;
      background: #fff8e1; border: 1px solid #f59f00; border-radius: 8px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .confirm-reset-msg { font-size: 12px; color: #667085; font-weight: 500; }
    .confirm-reset-btns { display: flex; gap: 6px; }
    .confirm-reset-yes {
      flex: 1; padding: 6px; background: #d92d20; color: #fff;
      border: none; border-radius: 8px; font-size: 12px; font-weight: 600;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .confirm-reset-yes:hover { background: #b42318; }
    .confirm-reset-no {
      flex: 1; padding: 6px; background: transparent; color: #667085;
      border: 1px solid #eaecf0; border-radius: 8px; font-size: 12px; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .confirm-reset-no:hover { background: #f9fafb; }

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
    this.templateSharedDisplay = null;
    this.templatePdfDisplay    = null;
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
    this._reconView = 'summary';
    this._highlightsView = 'summary';

    // Layout order
    this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];

    // Show/Hide pills (path → bool)
    this._pills = this._defaultPills();

    // Group states
    this._groups = this._defaultGroups();

    // Pill-row expand/collapse — all groups start expanded.
    this._pillsOpen = { valuation: true, market_scenarios: true, selected_scenarios: true };

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
    this._confirmSendEmail = false;
    this._sendMessageType = null;
    this._manualCustomerEmail = '';
    this._previewStale = false;

    // Individual-sections modal. _sendPayloadOverride swaps the individual-sections request
    // into the shared email-confirm modal in place of the main printout.
    this._individualOpen      = false;
    this._individualSections = [];
    this._individualBusy      = false;
    this._individualError     = '';
    this._sendPayloadOverride = null;

    // Generate state
    this._generating = false;
    this._finalizing = false;
    this._statusMsg = '';
    this._statusError = false;
    this._pdfUrl = '';
    this._pdfVehicle = null;
    this._lastPrintoutRequest = null; // stored after each successful generate, fired in pdf-send
    this._savedConfirm  = false;
    this._lockOverridden = false;
    this._confirmReset = false;
    this._undoStack = [];
    this._redoStack = [];
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
      recon_display: false,
      highlights_display: false,
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

    // Shared tooltip — a real DOM node appended to document.body, not
    // rendered via Lit. :host itself sets overflow:hidden (see its styles),
    // so nothing painted anywhere inside this shadow root can ever escape
    // clipping via position:fixed — the tooltip has to live outside the
    // shadow root entirely, same as how Tippy.js itself appends to
    // document.body by default (see TooltipController above).
    this._tooltip = new TooltipController();
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
      reconView: this._reconView,
      highlightsView: this._highlightsView,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
    };
  }

  _defaultPills() {
    return {
      'general.condition': true,
      'valuation.retail_value': true,
      'valuation.recon': true,
      'valuation.fixed_overhead': true,
      'valuation.target_profit': true,
      'valuation.tax_savings': true,
      'sections.observations_highlights': true,
      'sections.observations_comments': true,
      ...Object.fromEntries(SCENARIO_FIELDS.flatMap(f => [
        [`market_scenarios.${f.key}`, !SCENARIO_DEFAULT_OFF_KEYS.has(f.key)],
        [`selected_scenarios.${f.key}`, !SCENARIO_DEFAULT_OFF_KEYS.has(f.key)],
      ])),
    };
  }

  _defaultGroups() {
    return {
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
  }

  _applySharedDisplay(d) {
    if (!d) return;
    const GROUP_KEYS = ['valuation','disclosures','observations','market','market_scenarios','selected_scenarios','recon','photos'];
    const PILL_BEARING_GROUPS = ['valuation', 'observations', 'market_scenarios', 'selected_scenarios'];
    const sec = d.sections || {};

    // Pills first — the recompute below needs the freshly loaded values.
    // Start from the hardcoded defaults, not the current (possibly dirtied
    // mid-session) pills — otherwise a pill/group missing from an older or
    // partial saved display silently inherits whatever was on-screen before
    // this load, instead of falling back to its real default.
    this._pills = { ...this._defaultPills(), ...(d.pills || {}) };

    // signature isn't part of GROUP_KEYS (that's _applyPdfDisplay's job) —
    // preserve it rather than resetting it to the default here.
    const newGroups = { ...this._defaultGroups(), signature: this._groups.signature };
    GROUP_KEYS.forEach(k => { if (sec[k] != null) newGroups[k] = sec[k] ? 'checked' : 'unchecked'; });
    this._groups = newGroups;

    // A section saved as "on" can still have only some of its fields
    // selected (e.g. the scenario KPIs default to 8/12) — re-derive the
    // real checked/indeterminate/unchecked state from those pills instead
    // of collapsing straight to a full checkmark.
    PILL_BEARING_GROUPS.forEach(group => {
      if (this._groups[group] === 'checked') this._recomputeGroupState(group);
    });

    if (d.section_order != null) this._sectionOrder = d.section_order.filter(s => DEFAULT_LAYOUT_ORDER.includes(s));
    if (d.tax_rate_pct != null)  this._taxRatePct   = d.tax_rate_pct;
    if (d.value_display != null) this._valueDisplay = d.value_display;
    if (d.profit_name != null)   this._profitName   = d.profit_name;
    if (d.market_view != null)   this._marketDisplay = d.market_view === 'summary' ? 'summary' : 'full';
    if (d.recon_view != null)       this._reconView       = d.recon_view === 'detail' ? 'detail' : 'summary';
    if (d.highlights_view != null)  this._highlightsView  = d.highlights_view === 'detail' ? 'detail' : 'summary';
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

  disconnectedCallback() {
    super.disconnectedCallback();
    this._tooltip.destroy();
  }

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
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_scenarioLayout', '_reconView', '_highlightsView',
        '_sectionOrder', '_pills', '_groups', '_selectedEmployeeIndex', '_locks'];
      if (settingKeys.some(k => changedProps.has(k))) {
        this._savedConfirm = false;
      }
    }

    // Sync locked prop → _finalized state. Locking (offer accepted/declined)
    // also drops any unapplied edits, so the preview matches what was saved.
    if (changedProps.has('locked')) {
      this._finalized = !!this.locked;
      this._lockOverridden = false;
      if (this._sheetLocked() && this._previewStale) this._handleDiscardChanges();
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
        '_fontSizeIndex', '_photosPerRow', '_discLayout', '_marketDisplay', '_scenarioLayout', '_reconView', '_highlightsView',
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

  _parseCurrency(str) {
    if (str == null) return null;
    const n = parseFloat(String(str).replace(/[^0-9.-]/g, ''));
    return Number.isFinite(n) ? n : null;
  }

  /** True once the workbench's post-scenario negotiation slider has moved the
   * offer away from the calculated ACV for this scenario — ACV and Cost to
   * Market are derived from that original valuation, so they go stale too. */
  _isScenarioStale(group) {
    const scenarioKey = group === 'market_scenarios' ? 'market' : group === 'selected_scenarios' ? 'selected' : null;
    if (!scenarioKey) return false;

    const data = this._getPayloadData();
    const offerAmount = data?.offer?.amount;
    const acv = this._parseCurrency(data?.scenarios?.[scenarioKey]?.ACV);

    if (offerAmount == null || acv == null) return false;
    return Math.round(offerAmount) !== Math.round(acv);
  }

  /** ACV and Cost to Market are the only fields tied to that valuation. */
  _isPillLockedStale(path) {
    const [group, key] = path.split('.');
    if (key !== 'ACV' && key !== 'costMkt') return false;
    return this._isScenarioStale(group);
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

  /** Layout list as shown: active sections first, inactive ones after —
   * each in their real order. Purely visual: _sectionOrder keeps inactive
   * sections where they were, so turning one back on puts it back in place. */
  _displayOrder() {
    const order = this._sectionOrder;
    return [...order.filter(x => !this._isSectionDisabled(x)), ...order.filter(x => this._isSectionDisabled(x))];
  }

  /** Writes a new sequence of the active sections back into _sectionOrder,
   * filling the slots active sections occupy so inactive ones don't move. */
  _setActiveOrder(active) {
    const queue = [...active];
    this._sectionOrder = this._sectionOrder.map(x => this._isSectionDisabled(x) ? x : queue.shift());
  }

  _isOnePage() {
    return this._mode === 'one_page';
  }

  /** True when One-Page hides `key` (a section, pill path or view control). */
  _onePageLocked(key) {
    return this._isOnePage() && ONE_PAGE_LOCKED.includes(key);
  }

  /** Groups / pills / views as they print: the real settings with One-Page's
   * locks applied on top. */
  _effectiveSettings() {
    if (!this._isOnePage()) {
      return { groups: this._groups, pills: this._pills, marketDisplay: this._marketDisplay, highlightsView: this._highlightsView };
    }
    const groups = { ...this._groups };
    const pills = { ...this._pills, 'sections.observations_comments': false };
    ONE_PAGE_EXCLUDED.forEach(g => { groups[g] = 'unchecked'; });
    if (groups.observations !== 'unchecked') {
      groups.observations = pills['sections.observations_highlights'] ? 'indeterminate' : 'unchecked';
    }
    return { groups, pills, marketDisplay: 'summary', highlightsView: 'summary' };
  }

  _isSectionDisabled(section) {
    return this._effectiveSettings().groups[section] === 'unchecked';
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
      recon_view:       this._reconView,
      highlights_view:  this._highlightsView,
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

  /** Display block for the renderer. `eff` defaults to what prints now
   * (One-Page's hiding applied). */
  _buildDisplay(eff = this._effectiveSettings()) {
    const p = eff.pills;
    const g = eff.groups;

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
        disclosures: g.disclosures === 'checked',
        disclosures_horizontal: this._discLayout === 'horizontal',
        disclosures_signature: g.signature === 'checked',
        observations: g.observations === 'checked' || g.observations === 'indeterminate',
        observations_highlights: p['sections.observations_highlights'],
        observations_comments: p['sections.observations_comments'],
        market_summary: (g.market === 'checked') && eff.marketDisplay === 'summary',
        market_comparables: (g.market === 'checked') && eff.marketDisplay === 'full',
        market_scenarios: g.market_scenarios === 'checked' || g.market_scenarios === 'indeterminate',
        selected_scenarios: g.selected_scenarios === 'checked' || g.selected_scenarios === 'indeterminate',
        recon_breakdown: g.recon === 'checked',
        photos: g.photos === 'checked',
      },
      general: {
        offer_label: false,
        condition: p['general.condition'],
        value_display: this._valueDisplay,
      },
      scenarios: {
        market: Object.fromEntries(SCENARIO_FIELDS.map(f => [f.key, this._isPillLockedStale(`market_scenarios.${f.key}`) ? false : p[`market_scenarios.${f.key}`]])),
        selected: Object.fromEntries(SCENARIO_FIELDS.map(f => [f.key, this._isPillLockedStale(`selected_scenarios.${f.key}`) ? false : p[`selected_scenarios.${f.key}`]])),
      },
      scenario_layout: this._scenarioLayout,
      // "summary" (default — aggregate count+total row) or "detail" (every
      // damage note listed individually, italicized-prefix, non-interleaved).
      recon_view: this._reconView,
      // Same summary/detail concept, independent toggle for Observations' Highlights.
      highlights_view: eff.highlightsView,
      // Tells the renderer to clamp long free text (Comments) to fit one page.
      one_page: this._isOnePage(),
    };

    return display;
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  /** "Reset to location default": goes back to the location template's own
   * baseline (or the built-in defaults when there's no template), regenerates
   * right away, and tells Bubble to clear this sheet's instance overrides. */
  async _handleReset() {
    if (this._sheetLocked()) return;
    this._confirmReset = false;
    const before = this._appliedSnapshot;
    this._pendingDataLoad = true; // suppress auto display-save during the reactive cascade
    // Not whatever's loaded in sharedDisplay/pdfDisplay — that may already be
    // an instance override.
    if (this.templateSharedDisplay || this.templatePdfDisplay) {
      if (this.templateSharedDisplay) this._applySharedDisplay(this.templateSharedDisplay);
      if (this.templatePdfDisplay)    this._applyPdfDisplay(this.templatePdfDisplay);
    } else {
      this._resetToggles();
    }
    this._previewStale = true;

    // Regenerate right away instead of leaving the preview stale until a
    // separate manual Apply click — mirrors _handleApply's own generate step.
    this._finalizing = true;
    await this._handleGenerate(false);
    this._finalizing = false;
    this._finalized = true;
    this._pushHistory(before);

    // Null values signal Bubble to clear instance-level overrides. This is
    // the authoritative save for a reset, so it's the only display-save
    // dispatched here — not _handleApply's own (non-null) one, which would
    // immediately re-create an instance override and undo the clear.
    this.dispatchEvent(new CustomEvent('display-save', {
      detail: { shared: null, pdf: null, employee: null, payload: null },
      bubbles: true, composed: true,
    }));
  }

  /** Full / One-Page toggle. One-Page is a display rule: it hides what
   * can't fit on one page (ONE_PAGE_LOCKED) without touching the real
   * settings, so Full prints exactly what it did before. Not an edit — it
   * re-renders and saves right away (an undo step, like any apply). Other
   * unapplied edits stay pending: the switch applies on top of the last
   * applied version, then the pending edits come back. */
  async _handleModeChange(value) {
    if (this._sheetLocked() || value === this._mode || this._generating || this._finalizing) return;
    const pending = this._previewStale && this._appliedSnapshot ? { ...this._captureSettings(), mode: value } : null;
    if (pending) {
      this._pendingDataLoad = true; // swap isn't an edit
      this._restoreSettings({ ...this._appliedSnapshot, mode: value });
    } else {
      this._mode = value;
    }
    await this._handleApply();
    if (pending) {
      this._pendingDataLoad = true;
      this._restoreSettings(pending);
      this._previewStale = true;
    }
  }

  _handleGroupChange(group, checked) {
    // This checkbox only shows/hides the whole section — it no longer
    // bulk-sets the individual field pills underneath, so toggling a group
    // off then back on restores exactly the same partial selection (e.g.
    // 4/5 fields) instead of resetting everything to fully on.
    this._groups = { ...this._groups, [group]: checked ? 'checked' : 'unchecked' };

    const pillBearingGroups = ['valuation', 'observations', 'market_scenarios', 'selected_scenarios'];
    if (checked && pillBearingGroups.includes(group)) {
      const pillKeys = this._pillKeysForGroup(group);
      // One-Page-locked pills (Comments) don't print, so they don't count.
      const active = pillKeys.filter(k => this._pills[k] && !this._onePageLocked(k)).length;
      if (active === 0) {
        // Every pill was individually clicked off, so there's no partial
        // selection left to restore — re-deriving from the (all-false)
        // pills would immediately recompute back to 'unchecked', which
        // re-freezes the pill-group (.group-off has pointer-events: none)
        // and leaves the checkbox impossible to check again. Turn every
        // pill on instead, same as checking a fresh group.
        const newPills = { ...this._pills };
        pillKeys.forEach(k => { newPills[k] = true; });
        this._pills = newPills;
      } else {
        // Re-derive the true tri-state from the untouched pills (e.g. still
        // indeterminate at 4/5) rather than leaving it forced to 'checked'.
        this._recomputeGroupState(group);
      }
    }

  }

  _handlePillClick(path, group) {
    const newPills = { ...this._pills };
    newPills[path] = !newPills[path];
    this._pills = newPills;

    if (group && ['valuation', 'observations', 'market_scenarios', 'selected_scenarios'].includes(group)) {
      this._recomputeGroupState(group);
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

  /** The customize-panel settings as a plain object — used for the
   * last-applied baseline (Discard). */
  _captureSettings() {
    return {
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
      reconView: this._reconView,
      highlightsView: this._highlightsView,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups },
      selectedEmployeeIndex: this._selectedEmployeeIndex,
    };
  }

  _restoreSettings(s) {
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
    this._reconView             = s.reconView;
    this._highlightsView        = s.highlightsView;
    this._sectionOrder          = [...s.sectionOrder];
    this._pills                 = { ...s.pills };
    this._groups                = { ...s.groups };
    this._selectedEmployeeIndex = s.selectedEmployeeIndex;
  }

  /** Captures the current customize-panel state as the "last applied" baseline,
   * called whenever a generate succeeds (initial auto-preview, Apply, Reopen). */
  _snapshotAppliedState() {
    this._appliedSnapshot = this._captureSettings();
  }

  /** Reverts unapplied edits back to the last-applied snapshot. */
  _handleDiscardChanges() {
    if (!this._appliedSnapshot) return;
    this._pendingDataLoad = true; // suppress re-marking stale during this cascade
    this._restoreSettings(this._appliedSnapshot);
    this._previewStale = false;
  }

  // ── Undo / redo ────────────────────────────────────────────────────────────
  // Steps through applied versions only (one step per Apply / Reset), and
  // applies immediately: regenerate + save, same as clicking Apply.
  // Unapplied edits are dropped when you undo/redo.

  /** Records `before` (the previously applied version) as an undo step if
   * the applied version actually changed. */
  _pushHistory(before) {
    const after = this._appliedSnapshot;
    if (before && after && after !== before && JSON.stringify(after) !== JSON.stringify(before)) {
      this._undoStack = [...this._undoStack, before].slice(-HISTORY_LIMIT);
      this._redoStack = [];
    }
  }

  _handleUndo() { return this._stepHistory('_undoStack', '_redoStack'); }
  _handleRedo() { return this._stepHistory('_redoStack', '_undoStack'); }

  async _stepHistory(fromKey, toKey) {
    if (this._sheetLocked() || this._generating || this._finalizing || !this[fromKey].length) return;
    const target  = this[fromKey][this[fromKey].length - 1];
    const current = this._appliedSnapshot;
    this[fromKey] = this[fromKey].slice(0, -1);
    this._restoreSettings(target);
    const applied = await this._handleApply({ fromHistory: true });
    if (applied) {
      if (current) this[toKey] = [...this[toKey], current].slice(-HISTORY_LIMIT);
    } else {
      this[fromKey] = [...this[fromKey], target]; // generate failed — keep the step
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
    this._scenarioLayout = 'tiles';
    this._reconView = 'summary';
    this._highlightsView = 'summary';
    this._sectionOrder = [...DEFAULT_LAYOUT_ORDER];
    this._pills = this._defaultPills();
    this._groups = this._defaultGroups();
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
      const active = [];
      for (const child of Array.from(list.children)) {
        if (child === this._placeholder) {
          active.push(src);
        } else if (child.dataset.section && child.dataset.section !== src && !this._isSectionDisabled(child.dataset.section)) {
          active.push(child.dataset.section);
        }
      }
      this._setActiveOrder(active);
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
    const active = this._sectionOrder.filter(x => !this._isSectionDisabled(x));
    const idx = active.indexOf(section);
    const target = idx + direction;
    if (idx === -1 || target < 0 || target >= active.length) return;
    [active[idx], active[target]] = [active[target], active[idx]];
    this._setActiveOrder(active);
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

  // ── Lock helpers — disabled for now, left in place to pick back up later ───
  //
  // /** True if `key` is explicitly locked, or if mode is locked to one_page —
  //  * every other control is inert in one-page mode, so a mode lock cascades
  //  * to lock everything else too (dealers can't edit their way back to full). */
  // _effectiveLock(key) {
  //   if (this._locks?.[key]) return true;
  //   return key !== 'mode' && this._mode === 'one_page' && !!this._locks?.mode;
  // }
  //
  // _isLocked(key) {
  //   return !this.templateMode && this._effectiveLock(key);
  // }
  //
  // _lk(key) {
  //   const locked = !!this._locks?.[key];
  //   if (this.templateMode) {
  //     return html`
  //       <button class="lock-btn ${locked ? 'locked' : ''}"
  //               title="${locked ? 'Unlock for dealers' : 'Lock for dealers'}"
  //               @click="${(e) => { e.stopPropagation(); this._locks = { ...this._locks, [key]: !locked }; }}">
  //         ${locked ? lockClosedSvg : lockOpenSvg}
  //       </button>`;
  //   }
  //   if (this._effectiveLock(key)) {
  //     return html`<span class="lock-indicator" title="Locked by template">${lockClosedSvg}</span>`;
  //   }
  //   return nothing;
  // }
  _effectiveLock(key) { return false; }
  /** True when Bubble has locked this offer's sheet (`locked` — set once the
   * offer is accepted or declined) and the dealer hasn't confirmed they want
   * to edit anyway. Everything that changes the sheet is disabled; download,
   * email and individual sections stay available.
   * Never applies in templateMode, which has no offer to lock. */
  _sheetLocked() { return !!this.locked && !this.templateMode && !this._lockOverridden; }
  _isLocked(key) { return this._onePageLocked(key); }
  _lk(key) {
    if (!this._onePageLocked(key)) return nothing;
    return html`<span class="full-only-chip"
      @mouseenter="${(e) => this._showTooltip(e, "Hidden on one page")}"
      @mouseleave="${() => this._hideTooltip()}">Full only</span>`;
  }

  // ── Save Settings ──────────────────────────────────────────────────────────

  _handleSaveSettings() {
    this._dispatchDisplaySave();
    this._savedConfirm = true;
  }

  _dispatchDisplaySave() {
    if (this._sheetLocked()) return;
    const employee = this.employees && this.employees.length > 0
      ? this.employees[this._selectedEmployeeIndex] || this.employees[0]
      : null;
    this.dispatchEvent(new CustomEvent('display-save', {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState(), employee, payload: this._lastPrintoutRequest },
      bubbles: true, composed: true,
    }));
  }

  // ── Generate ───────────────────────────────────────────────────────────────

  /** The exact /printout-offer request body for a given display block —
   * shared by the main preview and individual-section prints so both apply the
   * same payload overrides (profit label, disclaimer, employee, tax rate…). */
  _buildPrintoutRequest(display, watermark = false) {
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

    return { ...commonFields, raw_payload: payloadData };
  }

  /** POSTs a printout request and returns the rendered PDF as a Blob, handling
   * both api modes. `vehicle`/`rawUrl` are only set in url mode. */
  async _fetchPrintout(requestBody) {
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
      return { blob: await resp.blob(), vehicle: null, rawUrl: null };
    }

    // url mode
    let data;
    try { data = await resp.json(); }
    catch (e) { throw new Error('Server error — check terminal for traceback'); }
    if (!resp.ok) throw new Error(data.error || 'Failed');

    const rawUrl = this.apiBaseUrl + data.pdf_url + '?t=' + Date.now();

    // Fetch PDF as blob so the iframe never hits the API server directly.
    // Avoids ngrok interstitial and cross-origin cookie issues on mobile.
    const pdfHeaders = { 'ngrok-skip-browser-warning': 'true' };
    if (this.authToken) pdfHeaders['Authorization'] = `Bearer ${this.authToken}`;
    const pdfResp = await fetch(rawUrl, { headers: pdfHeaders });
    return { blob: await pdfResp.blob(), vehicle: data.vehicle, rawUrl };
  }

  async _handleGenerate(watermark = false) {
    this._generating = true;
    this._statusMsg = 'Generating…';
    this._statusError = false;

    try {
      const requestBody = this._buildPrintoutRequest(this._buildDisplay(), watermark);
      const payloadData = requestBody.raw_payload;

      // Snapshot the exact Lambda request body — reused by pdf-send and display-save
      // so Bubble can call /printout-offer directly without re-deriving anything.
      this._lastPrintoutRequest = { ...requestBody };

      const { blob, vehicle, rawUrl } = await this._fetchPrintout(requestBody);
      const customerName = (payloadData.customer?.name || 'Customer').replace(/[^a-zA-Z0-9 ]/g, '').trim();

      if (this.apiMode === 'binary') {
        const blobUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
        this._pdfFilename = `${customerName}_${payloadData.vehicle?.vin || 'offer'}.pdf`;
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
        this._pdfVehicle = vehicle;
        const vin = vehicle?.vin || 'offer';
        this._pdfFilename = `${customerName}_${vin}.pdf`;
        const pdfFile = new File([blob], this._pdfFilename, { type: 'application/pdf' });

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

  /** Display block for printing only `sections` on their own: every other
   * section off, simple header, no footer or signature. Each section's
   * specifics (pills, market/recon/highlights views, scenario fields, layout)
   * come straight from the main settings — whether or not that section is
   * switched on in the main sheet. */
  _buildIndividualDisplay(sections) {
    const on = (s) => sections.includes(s);
    // Real settings, not One-Page's hiding — these aren't one-page sheets.
    const display = this._buildDisplay({ groups: this._groups, pills: this._pills, marketDisplay: this._marketDisplay, highlightsView: this._highlightsView });

    // A pill group with nothing selected would print an empty section — print
    // all of its fields instead.
    const allOff = (obj) => Object.values(obj).every(v => !v);
    const allOn = (obj) => Object.fromEntries(Object.keys(obj).map(k => [k, true]));
    const valuation = allOff(display.valuation) ? allOn(display.valuation) : display.valuation;
    const scenarios = Object.fromEntries(Object.entries(display.scenarios).map(([k, flags]) => [
      k, allOff(flags) ? allOn(flags) : flags,
    ]));
    const obsAllOff = !display.sections.observations_highlights && !display.sections.observations_comments;

    return {
      ...display,
      valuation,
      scenarios,
      sections: {
        ...display.sections,
        valuation:               on('valuation'),
        disclosures:             on('disclosures'),
        disclosures_signature:   false,
        observations:            on('observations'),
        observations_highlights: obsAllOff || display.sections.observations_highlights,
        observations_comments:   obsAllOff || display.sections.observations_comments,
        market_summary:          on('market') && this._marketDisplay === 'summary',
        market_comparables:      on('market') && this._marketDisplay === 'full',
        market_scenarios:        on('market_scenarios'),
        selected_scenarios:      on('selected_scenarios'),
        recon_breakdown:         on('recon'),
        photos:                  on('photos'),
      },
      // Individual-section prints aren't one-page sheets — no clamping.
      one_page: false,
      header_footer: 'simple',
    };
  }

  _toggleIndividualSection(section, checked) {
    const set = new Set(this._individualSections);
    if (checked) set.add(section); else set.delete(section);
    this._individualSections = DEFAULT_LAYOUT_ORDER.filter(s => set.has(s));
  }

  _individualFilename(payloadData) {
    const customerName = (payloadData.customer?.name || 'Customer').replace(/[^a-zA-Z0-9 ]/g, '').trim();
    return `${customerName}_${payloadData.vehicle?.vin || 'offer'}_sections.pdf`;
  }

  async _handleIndividualPrint() {
    this._individualBusy = true;
    this._individualError = '';
    try {
      const requestBody = this._buildPrintoutRequest(this._buildIndividualDisplay(this._individualSections));
      const { blob } = await this._fetchPrintout(requestBody);
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = this._individualFilename(requestBody.raw_payload);
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      this._individualOpen = false;
    } catch (err) {
      this._individualError = err.message || 'Could not generate the printout';
    }
    this._individualBusy = false;
  }

  /** Hands the individual-sections request to the regular email-confirm modal, which
   * picks the recipient and sends it through the same pdf-send event. */
  _handleIndividualEmail() {
    const requestBody = this._buildPrintoutRequest(this._buildIndividualDisplay(this._individualSections));
    // kind/sections let send-pdf word the email as section details, not an offer.
    const sectionNames = this._sectionOrder
      .filter(sec => this._individualSections.includes(sec))
      .map(sec => (sec === 'market' && this._marketDisplay === 'summary') ? 'Market Summary' : SECTION_LABELS[sec]);
    this._sendPayloadOverride = {
      ...requestBody,
      filename: this._individualFilename(requestBody.raw_payload),
      kind: 'sections',
      sections: sectionNames,
    };
    this._individualOpen         = false;
    this._confirmSendEmail    = true;
    this._sendMessageType     = null;
    this._manualCustomerEmail = '';
  }

  _closeSendModal() {
    this._confirmSendEmail = false;
    this._sendPayloadOverride = null;
  }

  /** Generates + saves the current settings. Returns true when the generate
   * succeeded. */
  async _handleApply({ fromHistory = false } = {}) {
    if (this._sheetLocked()) return false;
    const before = this._appliedSnapshot;
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
    if (!fromHistory) this._pushHistory(before);
    return this._appliedSnapshot !== before;
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

  /** The employee an offer is sent "as" — same resolution _handleGenerate uses
   * for payloadData.employee, so the confirm modal shows the actual sender. */
  _resolveEmployee() {
    if (this.employees && this.employees.length > 0) {
      return this.employees[this._selectedEmployeeIndex] || this.employees[0] || null;
    }
    return this.payload?.employee || null;
  }

  _handleSend(sendVia, toEmail, messageType) {
    this._splitOpen   = false;

    // An individual-sections send doesn't count as sending the main offer.
    const individual = this._sendPayloadOverride;
    this._sendPayloadOverride = null;
    if (!individual) {
      this._doneSentVia = sendVia;
      this._pdfSent     = true;
    }

    const payload = individual || {
      ...this._lastPrintoutRequest,
      filename: this._pdfFilename || null,
    };

    console.log('[pdf-send] send_via:', sendVia);
    console.log('[pdf-send] to_email:', toEmail);
    console.log('[pdf-send] message_type:', messageType);
    console.log('[pdf-send] payload:', payload);

    this.dispatchEvent(new CustomEvent('pdf-send', {
      detail: { send_via: sendVia, to_email: toEmail, message_type: messageType, payload },
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
        <div class="offer-header-row">
          <h2>Offer</h2>
        </div>
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
    const fontLabel = FONT_SIZE_OPTIONS[this._fontSizeIndex].label;
    // Show/hide groups follow the saved layout order (not the Layout list's
    // on-first view, so ticking a box doesn't move its row).
    const showHideOrder = [...this._sectionOrder.filter(sec => DEFAULT_LAYOUT_ORDER.includes(sec)),
      ...DEFAULT_LAYOUT_ORDER.filter(sec => !this._sectionOrder.includes(sec))];
    const sectionGroups = showHideOrder.map(sec => this._renderShowHideGroup(sec));
    // Offer accepted/declined: dim + block every setting (.settings-locked
    // overlay), and `inert` the controls themselves so keyboard can't reach
    // them either. Section headers stay clickable to read the settings.
    const sheetLocked = this._sheetLocked();
    // No template display to fall back to — _handleReset() falls back to
    // _resetToggles()'s built-in defaults, so label the button for that.
    const hasTemplateDisplay = !!(this.templateSharedDisplay || this.templatePdfDisplay);
    const resetTargetLabel   = hasTemplateDisplay ? 'location default' : 'default';
    const resetConfirmPhrase = hasTemplateDisplay ? 'location defaults' : 'default configuration';

    return html`
      <div class="card">
        <div class="${sheetLocked ? 'settings-locked' : ''}">
        <div class="customize-header-row">
          <h2>Customize</h2>
          <div class="customize-header-ctrls" ?inert="${sheetLocked}">
          <div class="history-btns">
            <button class="history-btn" type="button" aria-label="Undo"
              ?disabled="${!this._undoStack.length || this._generating || this._finalizing}"
              @click="${() => { this._hideTooltip(); this._handleUndo(); }}"
              @mouseenter="${(e) => this._showTooltip(e, 'Undo last apply')}"
              @mouseleave="${() => this._hideTooltip()}"
            >${undoSvg}</button>
            <button class="history-btn" type="button" aria-label="Redo"
              ?disabled="${!this._redoStack.length || this._generating || this._finalizing}"
              @click="${() => { this._hideTooltip(); this._handleRedo(); }}"
              @mouseenter="${(e) => this._showTooltip(e, 'Redo apply')}"
              @mouseleave="${() => this._hideTooltip()}"
            >${redoSvg}</button>
          </div>
          </div>
        </div>

        ${sheetLocked ? html`
          <div class="locked-notice">
            ${lockClosedSvg}
            <span>This offer has been accepted or declined. Editing will change its offer sheet from the version the customer saw.</span>
            <button class="locked-notice-edit" type="button" @click="${() => { this._lockOverridden = true; }}">Edit anyway</button>
          </div>
        ` : nothing}

        <!-- General -->
        <div class="collapsible-section ${this._generalOpen ? '' : 'collapsed'}">
          <div class="section-header" @click="${() => { this._generalOpen = !this._generalOpen; }}">
            <span>General</span>
            <div class="section-chevron">${chevronSvg}</div>
          </div>
          <div class="section-body" ?inert="${sheetLocked}">
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
                ${this._lk('market_display')}
                <div class="segmented-control">
                  <button class="seg-btn ${(this._onePageLocked('market_display') || this._marketDisplay === 'summary') ? 'active' : ''}"
                          ?disabled="${this._isLocked('market_display')}"
                          @click="${() => this._handleSegmentedClick('market-display', 'summary')}">Summary</button>
                  <button class="seg-btn ${(!this._onePageLocked('market_display') && this._marketDisplay === 'full') ? 'active' : ''}"
                          ?disabled="${this._isLocked('market_display')}"
                          @click="${() => this._handleSegmentedClick('market-display', 'full')}">Full</button>
                </div>
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
            <div class="config-row">
              <span>Recon</span>
              <div class="ctrl-group ${this._isLocked('recon_display') ? 'locked' : ''}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._reconView === 'summary' ? 'active' : ''}"
                          ?disabled="${this._isLocked('recon_display')}"
                          @click="${() => this._handleSegmentedClick('recon-display', 'summary')}">Summary</button>
                  <button class="seg-btn ${this._reconView === 'detail' ? 'active' : ''}"
                          ?disabled="${this._isLocked('recon_display')}"
                          @click="${() => this._handleSegmentedClick('recon-display', 'detail')}">Detail</button>
                </div>
                ${this._lk('recon_display')}
              </div>
            </div>
            <div class="config-row">
              <span>Highlights</span>
              <div class="ctrl-group ${this._isLocked('highlights_display') ? 'locked' : ''}">
                ${this._lk('highlights_display')}
                <div class="segmented-control">
                  <button class="seg-btn ${(this._onePageLocked('highlights_display') || this._highlightsView === 'summary') ? 'active' : ''}"
                          ?disabled="${this._isLocked('highlights_display')}"
                          @click="${() => this._handleSegmentedClick('highlights-display', 'summary')}">Summary</button>
                  <button class="seg-btn ${(!this._onePageLocked('highlights_display') && this._highlightsView === 'detail') ? 'active' : ''}"
                          ?disabled="${this._isLocked('highlights_display')}"
                          @click="${() => this._handleSegmentedClick('highlights-display', 'detail')}">Detail</button>
                </div>
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
          <div class="section-body" ?inert="${sheetLocked}">
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
          <div class="section-body" ?inert="${sheetLocked}">
            <div class="sortable-list ${this._isLocked('section_order') ? 'disabled' : ''}"
              @dragover="${(e) => e.preventDefault()}"
              @drop="${(e) => this._handleListDrop(e)}"
            >
              ${(() => { const shown = this._displayOrder(); const nActive = shown.filter(x => !this._isSectionDisabled(x)).length; return shown.map((sec, i) => {
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
                      <button class="sort-arrow" ?disabled="${disabled || i >= nActive - 1}" @click="${() => this._handleMoveSection(sec, 1)}">▼</button>
                    </div>
                  </div>
                `;
              }); })()}
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

        ${!this.templateMode && !sheetLocked ? html`
          <div class="action-btns">
            <div class="apply-btn-wrap">
              <button
                class="apply-main"
                ?disabled="${!this._previewStale || this._generating || this._finalizing}"
                @click="${() => this._handleApply()}"
              >${this._generating || this._finalizing ? 'Applying…' : 'Apply Changes'}</button>
              <button
                class="discard-btn"
                ?disabled="${!this._previewStale || this._generating || this._finalizing}"
                @click="${() => this._handleDiscardChanges()}"
              >Discard Changes</button>
            </div>
            ${(this.sharedDisplay || this.pdfDisplay) ? (this._confirmReset ? html`
              <div class="confirm-reset">
                <span class="confirm-reset-msg">Reset all settings to the ${resetConfirmPhrase}?</span>
                <div class="confirm-reset-btns">
                  <button class="confirm-reset-yes" @click="${() => this._handleReset()}">Yes, reset</button>
                  <button class="confirm-reset-no"  @click="${() => { this._confirmReset = false; }}">Cancel</button>
                </div>
              </div>
            ` : html`
              <button class="reset-btn"
                ?disabled="${this._generating || this._finalizing}"
                @click="${() => { this._confirmReset = true; }}"
              >Reset to ${resetTargetLabel}</button>
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
    const groupState = this._effectiveSettings().groups[section];
    const LABELS     = { valuation:'Valuation', disclosures:'Disclosures', observations:'Observations', market:'Selected Comparables', recon:'Recon', photos:'Photos' };

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
          <div class="pill-group ${locked ? 'locked' : ''} ${groupState === 'unchecked' ? 'group-off' : ''}">
            ${open ? html`
              ${this._renderPill('valuation.retail_value', 'Retail Value', 'valuation')}
              ${this._renderPill('valuation.recon', 'Recon', 'valuation')}
              ${this._renderPill('valuation.fixed_overhead', 'Fixed Overhead', 'valuation')}
              ${this._renderPill('valuation.target_profit', this._profitName || 'Target Profit', 'valuation')}
              ${this._renderPill('valuation.tax_savings', 'Tax Savings', 'valuation')}
            ` : nothing}
            ${this._renderPillsToggle('valuation')}
          </div>
        </div>`;
    }
    if (section === 'observations') {
      return html`
        <div class="toggle-group" data-group="observations">
          ${row}
          <div class="pill-group ${locked ? 'locked' : ''} ${groupState === 'unchecked' ? 'group-off' : ''}">
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

  /** Pill keys for a toggle-able group — same lists as _recomputeGroupState. */
  _pillKeysForGroup(group) {
    if (group === 'valuation') {
      return ['valuation.retail_value', 'valuation.recon', 'valuation.fixed_overhead', 'valuation.target_profit', 'valuation.tax_savings'];
    }
    if (group === 'observations') {
      return ['sections.observations_highlights', 'sections.observations_comments'];
    }
    if (group === 'market_scenarios' || group === 'selected_scenarios') {
      return SCENARIO_FIELDS.map(f => `${group}.${f.key}`);
    }
    return [];
  }

  /** Independent toggle — not nested under Selected Comparables, not part of the
   * draggable section order (mirrors how Signature is handled). Each of the 12
   * KPI fields gets its own pill, same idiom as Valuation/Observations. */
  _renderPillsToggle(group) {
    const open = !!this._pillsOpen[group];
    const pillKeys = this._pillKeysForGroup(group);
    const active = pillKeys.filter(k => !this._isPillLockedStale(k) && this._pills[k]).length;
    const total = pillKeys.length;

    return html`
      <span
        class="pill-toggle"
        title="${open ? 'Collapse fields' : 'Expand fields'}"
        @click="${() => this._togglePillsOpen(group)}"
      >${open ? '‹ Collapse' : `Expand (${active}/${total}) ›`}</span>
    `;
  }

  _renderScenarioGroup(group, title, basis) {
    const locked = this._isLocked(group);
    const groupState = this._effectiveSettings().groups[group];
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
        <div class="pill-group ${locked ? 'locked' : ''} ${groupState === 'unchecked' ? 'group-off' : ''}">
          ${open ? SCENARIO_FIELDS.map(f => this._renderPill(`${group}.${f.key}`, f.label.replace('{basis}', basis), group)) : nothing}
          ${this._renderPillsToggle(group)}
        </div>
      </div>`;
  }

  /** Shows the shared tooltip (TooltipController, copied from lxn-ui) over
   * the hovered element. */
  _showTooltip(e, text) {
    // Icon buttons are 40px boxes around a 24px glyph — anchor to the glyph
    // so the bubble sits right above the icon, not the button's empty edge.
    const target = e.currentTarget;
    const anchor = target.classList.contains('email-icon-btn') ? (target.querySelector('svg') || target) : target;
    this._tooltip.show(anchor, text);
  }

  _hideTooltip() {
    this._tooltip.hide();
  }

  _renderPill(path, label, group) {
    const stale  = this._isPillLockedStale(path);
    const onePage = this._onePageLocked(path);
    const active = !stale && !onePage && this._pills[path];
    const tooltipText = onePage ? "Hidden on one page" : 'Not available: Offer has been adjusted manually';
    const blocked = stale || onePage;

    return html`
      <span
        class="pill ${active ? 'active' : ''} ${stale ? 'stale' : ''} ${onePage ? 'one-page-locked' : ''}"
        @mouseenter="${(e) => { if (blocked) this._showTooltip(e, tooltipText); }}"
        @mouseleave="${() => { if (blocked) this._hideTooltip(); }}"
        @click="${() => { if (!blocked) this._handlePillClick(path, group); }}"
      >${stale ? html`<span class="pill-stale-icon">${alertCircleSvg}</span>` : nothing}${label}</span>
    `;
  }

  _renderSendInline() {
    const employee     = this._resolveEmployee();
    const hasRecipient = !!this.payload?.customer || !!employee?.email;
    const hasPdf        = !!this._pdfUrl && !this._generating;

    if (!hasRecipient) return nothing;

    // Stays clickable even after a send — dealers resend, or send to the
    // other recipient, without the button locking up or changing color.
    const canSend = hasPdf;

    return html`
      <button
        class="email-icon-btn"
        ?disabled="${!canSend}"
        @mouseenter="${(e) => this._showTooltip(e, 'Email offer printout')}"
        @mouseleave="${() => this._hideTooltip()}"
        @click="${() => {
          this._hideTooltip();
          this._sendPayloadOverride = null;
          this._confirmSendEmail    = true;
          this._sendMessageType     = null;
          this._manualCustomerEmail = '';
        }}"
      >${mailSvg}</button>
    `;
  }

  _renderSendConfirmModal() {
    const employee      = this._resolveEmployee();
    const customerEmail = this.payload?.customer?.email || '';
    const employeeEmail = employee?.email || '';
    const employeeName  = employee?.name || 'an unspecified employee';

    // Default to customer when they have an email on file, otherwise fall back
    // to the employee — either way the dealer can still switch manually.
    const messageType = this._sendMessageType || (customerEmail ? 'customer' : (employeeEmail ? 'employee' : 'customer'));

    // Entered here only to fill this one send — never written back to `payload.customer`.
    const needsManualEmail = messageType === 'customer' && !customerEmail;
    const toEmail = messageType === 'employee' ? employeeEmail : (customerEmail || this._manualCustomerEmail.trim());
    const canConfirmSend = !!toEmail;

    return html`
      <div class="modal-overlay" @click="${() => this._closeSendModal()}">
        <div class="modal-box" @click="${(e) => e.stopPropagation()}">
          <p class="modal-msg">
            ${this._sendPayloadOverride
              ? html`Send the selected sections?`
              : html`Send this offer as an offer made by <strong>${employeeName}</strong>?`}
          </p>

          <div class="modal-recipient-group">
            <label class="modal-recipient-option">
              <input
                type="radio"
                name="send-recipient"
                .checked="${messageType === 'customer'}"
                @change="${() => { this._sendMessageType = 'customer'; }}"
              />
              <span>Customer's inbox${customerEmail ? html` — ${customerEmail}` : nothing}</span>
            </label>
            ${employeeEmail ? html`
              <label class="modal-recipient-option">
                <input
                  type="radio"
                  name="send-recipient"
                  .checked="${messageType === 'employee'}"
                  @change="${() => { this._sendMessageType = 'employee'; }}"
                />
                <span>Employee's inbox — ${employeeEmail}</span>
              </label>
            ` : nothing}
          </div>

          ${needsManualEmail ? html`
            <input
              type="email"
              class="modal-email-input"
              placeholder="Customer email address"
              .value="${this._manualCustomerEmail}"
              @input="${(e) => { this._manualCustomerEmail = e.target.value; }}"
            />
          ` : nothing}

          <div class="modal-btns">
            <button class="modal-btn-confirm"
              ?disabled="${!canConfirmSend}"
              @click="${() => { this._confirmSendEmail = false; this._handleSend('email', toEmail, messageType); }}"
            >Yes, send</button>
            <button class="modal-btn-cancel" @click="${() => this._closeSendModal()}">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  _renderIndividualModal() {
    const employee     = this._resolveEmployee();
    const hasRecipient = !!this.payload?.customer || !!employee?.email;
    const none         = this._individualSections.length === 0;
    const busy         = this._individualBusy;

    return html`
      <div class="modal-overlay" @click="${() => { if (!busy) this._individualOpen = false; }}">
        <div class="modal-box" @click="${(e) => e.stopPropagation()}">
          <p class="modal-msg modal-title">Download or Email Individual Sections</p>

          <div class="modal-recipient-group">
            ${this._sectionOrder.map(sec => html`
              <label class="modal-recipient-option">
                <input
                  type="checkbox"
                  .checked="${this._individualSections.includes(sec)}"
                  ?disabled="${busy}"
                  @change="${(e) => this._toggleIndividualSection(sec, e.target.checked)}"
                />
                <span>${SECTION_LABELS[sec]}</span>
              </label>
            `)}
          </div>

          ${this._individualError ? html`<div class="action-msg error" style="margin:0 0 12px;">${this._individualError}</div>` : nothing}

          <div class="modal-btns">
            <button class="modal-btn-confirm modal-btn-icon"
              ?disabled="${none || busy}"
              @click="${() => this._handleIndividualPrint()}"
            >${busy ? 'Generating…' : html`${printSvg}Download`}</button>
            ${hasRecipient ? html`
              <button class="modal-btn-confirm modal-btn-icon modal-btn-teal"
                ?disabled="${none || busy}"
                @click="${() => this._handleIndividualEmail()}"
              >${mailSvg}Email</button>
            ` : nothing}
            <button class="modal-btn-cancel" ?disabled="${busy}" @click="${() => { this._individualOpen = false; }}">Cancel</button>
          </div>
        </div>
      </div>
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

  /** Full / One-Page — a display setting, so it sits on the preview card
   * and applies right away (see _handleModeChange). */
  _renderModeToggle() {
    const disabled = this._sheetLocked() || this._generating || this._finalizing;
    return html`
      <div class="segmented-control mode-toggle">
        <button
          class="seg-btn ${this._mode === 'full' ? 'active' : ''}"
          ?disabled="${disabled}"
          @click="${() => { this._hideTooltip(); this._handleModeChange('full'); }}"
          @mouseenter="${(e) => this._showTooltip(e, 'Prints every section you have on')}"
          @mouseleave="${() => this._hideTooltip()}"
        >Full</button>
        <button
          class="seg-btn ${this._isOnePage() ? 'active' : ''}"
          ?disabled="${disabled}"
          @click="${() => { this._hideTooltip(); this._handleModeChange('one_page'); }}"
          @mouseenter="${(e) => this._showTooltip(e, "Hides sections that don't fit on one page")}"
          @mouseleave="${() => this._hideTooltip()}"
        >One-Page</button>
      </div>
    `;
  }

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
              <span
                class="preview-status-hit"
                @mouseenter="${(e) => this._showTooltip(e, this._previewStale ? 'Unapplied changes' : 'Up to date')}"
                @mouseleave="${() => this._hideTooltip()}"
              ><span class="preview-status-dot ${this._previewStale ? 'stale' : ''}"></span></span>
              <h2>${canInlinePdf ? 'Preview' : 'PDF'}</h2>
              ${this._renderModeToggle()}
            </div>
            <div class="preview-header-right">
            ${!this.templateMode ? html`
              <div class="preview-icon-btns">
                ${this._renderSendInline()}
                ${hasPdf && !busy && canInlinePdf ? html`
                  <button
                    class="email-icon-btn"
                    type="button"
                    @mouseenter="${(e) => this._showTooltip(e, 'Download printout')}"
                    @mouseleave="${() => this._hideTooltip()}"
                    @click="${() => { this._hideTooltip(); this._handleDownloadPdf(); }}"
                  >${printSvg}</button>
                ` : nothing}
                <button
                  class="email-icon-btn"
                  type="button"
                  ?disabled="${!this.apiBaseUrl}"
                  @mouseenter="${(e) => this._showTooltip(e, 'Download or Email Individual Sections')}"
                  @mouseleave="${() => this._hideTooltip()}"
                  @click="${() => { this._hideTooltip(); this._individualError = ''; this._individualOpen = true; }}"
                >${moreSvg}</button>
              </div>
              ${this._confirmSendEmail ? this._renderSendConfirmModal() : nothing}
              ${this._individualOpen ? this._renderIndividualModal() : nothing}
            ` : nothing}
            </div>
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
