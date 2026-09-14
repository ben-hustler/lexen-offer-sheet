// ── Standalone print-payload assembler ──────────────────────────────────────
// Paste this whole script into a Bubble "Run Javascript" action to compute
// the exact same print payload that <lexen-offer-sheet> builds internally in
// _handleGenerate() (src/lexen-offer-sheet.js), WITHOUT the component being
// mounted on the page — e.g. from a workflow step that re-sends an existing
// offer's PDF, or any place you want the payload without opening the sheet.
//
// This is a manual re-implementation of _defaultPills/_defaultGroups,
// _applySharedDisplay, _applyPdfDisplay, _buildDisplay, and the payload
// override chain inside _handleGenerate. It has no import path back to
// src/lexen-offer-sheet.js, so if that file's assembly logic changes, this
// script has to be updated by hand to match — same maintenance model as
// migrate-legacy-display.bubble.js in this folder.
//
// Setup:
//   1. Set the vars below via Bubble's "Insert dynamic data", pointing at
//      whatever this same offer/template record already sends into the
//      <lexen-offer-sheet> web component's properties/attributes:
//        payload          → the `payload` property (raw vehicle/dealer/offer/
//                            valuation/market/scenarios/recon/photos data)
//        sharedDisplay     → the `sharedDisplay` property (saved section
//                            visibility / pills / layout / tax rate / etc.)
//        pdfDisplay        → the `pdfDisplay` property (saved mode / font
//                            size / photos per row / disclaimer / employee /
//                            signature / etc.)
//        employees         → the `employees` property (array of {name,
//                            phone, email})
//        templateMode      → the `template-mode` attribute (true/false)
//        taxRate           → the `tax-rate` attribute (fallback default,
//                            only used when payload/sharedDisplay don't
//                            already carry a tax_rate_pct)
//        profitLabel       → the `profit-label` attribute
//        disclaimerText    → the `disclaimer-text` attribute
//        watermark         → true/false — matches the `watermark` argument
//                            _handleGenerate() is called with (always false
//                            in the live component today)
//      Add ":formatted as JSON-safe" on payload/sharedDisplay/pdfDisplay/
//      employees if you're inserting them as text rather than raw objects —
//      safeParse() below handles either shape.
//   2. Add a Toolbox "Run Javascript on page load" / "expose as bubble_fn_"
//      element named `assemblePrintPayload` with one text parameter. This
//      script calls bubble_fn_assemblePrintPayload(payloadJson) once
//      assembly is done — wire the next workflow step to read that state and
//      POST it straight to /printout-offer (or store it), same as
//      lxn-pdf-generator's `_lastPrintoutRequest` snapshot is used today.

var payload = null; // ← replace `null` with the inserted dynamic value
var sharedDisplay = null; // ← replace `null` with the inserted dynamic value
var pdfDisplay = null; // ← replace `null` with the inserted dynamic value
var employees = null; // ← replace `null` with the inserted dynamic value
var templateMode = null; // ← replace `null` with the inserted dynamic value
var taxRate = null; // ← replace `null` with the inserted dynamic value
var profitLabel = null; // ← replace `null` with the inserted dynamic value
var disclaimerText = null; // ← replace `null` with the inserted dynamic value
var watermark = false; // ← replace `false` with the inserted dynamic value, if needed

(function (payloadRaw, sharedDisplayRaw, pdfDisplayRaw, employeesRaw, templateModeRaw, taxRateRaw, profitLabelRaw, disclaimerTextRaw, watermarkRaw) {

  // ── Constants mirrored from src/lexen-offer-sheet.js ──────────────────────
  var DEFAULT_LAYOUT_ORDER = ['valuation', 'disclosures', 'observations', 'market', 'market_scenarios', 'selected_scenarios', 'recon', 'photos'];

  var FONT_SIZE_OPTIONS = [
    { label: 'Extra Small', delta: -1 },
    { label: 'Small', delta: 0 },
    { label: 'Medium', delta: 1 },
    { label: 'Large', delta: 2 },
    { label: 'Extra Large', delta: 3 },
  ];

  var SCENARIO_FIELDS = [
    { key: 'vehicles' }, { key: 'avgRetail' }, { key: 'avgMileage' }, { key: 'listedDays' },
    { key: 'prcMkt' }, { key: 'prcMktAdj' }, { key: 'costMkt' }, { key: 'priceRank' },
    { key: 'mileageRank' }, { key: 'perception' }, { key: 'retail' }, { key: 'ACV' },
  ];

  var SCENARIO_DEFAULT_OFF_KEYS = { costMkt: true, prcMktAdj: true, retail: true, ACV: true };

  // Bubble sometimes hands back an already-parsed object, sometimes a raw JSON string.
  function safeParse(value) {
    if (value == null) return null;
    if (typeof value === 'object') return value;
    if (typeof value !== 'string' || value.trim() === '') return null;
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function fmtPhone(p) {
    var digits = String(p || '').replace(/\D/g, '');
    if (digits.length === 10) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    if (digits.length === 11 && digits[0] === '1') return '(' + digits.slice(1, 4) + ') ' + digits.slice(4, 7) + '-' + digits.slice(7);
    return p || '';
  }

  function parseCurrency(str) {
    if (str == null) return null;
    var n = parseFloat(String(str).replace(/[^0-9.-]/g, ''));
    return isFinite(n) ? n : null;
  }

  // ── Defaults (mirrors constructor() / _defaultPills() / _defaultGroups()) ─
  function defaultPills() {
    var pills = {
      'general.condition': true,
      'valuation.retail_value': true,
      'valuation.recon': true,
      'valuation.fixed_overhead': true,
      'valuation.target_profit': true,
      'valuation.tax_savings': true,
      'sections.observations_highlights': true,
      'sections.observations_comments': true,
    };
    SCENARIO_FIELDS.forEach(function (f) {
      pills['market_scenarios.' + f.key] = !SCENARIO_DEFAULT_OFF_KEYS[f.key];
      pills['selected_scenarios.' + f.key] = !SCENARIO_DEFAULT_OFF_KEYS[f.key];
    });
    return pills;
  }

  function defaultGroups() {
    return {
      valuation: 'checked', disclosures: 'checked', observations: 'checked', market: 'checked',
      market_scenarios: 'unchecked', selected_scenarios: 'unchecked',
      recon: 'checked', photos: 'checked', signature: 'checked',
    };
  }

  // ── _recomputeGroupState ───────────────────────────────────────────────────
  function recomputeGroupState(groups, pills, group) {
    if (group === 'valuation') {
      var keys = ['valuation.retail_value', 'valuation.recon', 'valuation.fixed_overhead', 'valuation.target_profit', 'valuation.tax_savings'];
      var active = keys.filter(function (k) { return pills[k]; }).length;
      groups.valuation = active === 0 ? 'unchecked' : (active === keys.length ? 'checked' : 'indeterminate');
    } else if (group === 'observations') {
      var keys2 = ['sections.observations_highlights', 'sections.observations_comments'];
      var active2 = keys2.filter(function (k) { return pills[k]; }).length;
      groups.observations = active2 === 0 ? 'unchecked' : (active2 === keys2.length ? 'checked' : 'indeterminate');
    } else if (group === 'market_scenarios' || group === 'selected_scenarios') {
      var keys3 = SCENARIO_FIELDS.map(function (f) { return group + '.' + f.key; });
      var active3 = keys3.filter(function (k) { return pills[k]; }).length;
      groups[group] = active3 === 0 ? 'unchecked' : (active3 === keys3.length ? 'checked' : 'indeterminate');
    }
  }

  // ── _applySharedDisplay / _applyPdfDisplay ────────────────────────────────
  function applySharedDisplay(state, d) {
    if (!d) return;
    var GROUP_KEYS = ['valuation', 'disclosures', 'observations', 'market', 'market_scenarios', 'selected_scenarios', 'recon', 'photos'];
    var PILL_BEARING_GROUPS = ['valuation', 'observations', 'market_scenarios', 'selected_scenarios'];
    var sec = d.sections || {};

    state.pills = Object.assign({}, defaultPills(), d.pills || {});

    var newGroups = Object.assign({}, defaultGroups(), { signature: state.groups.signature });
    GROUP_KEYS.forEach(function (k) { if (sec[k] != null) newGroups[k] = sec[k] ? 'checked' : 'unchecked'; });
    state.groups = newGroups;

    PILL_BEARING_GROUPS.forEach(function (group) {
      if (state.groups[group] === 'checked') recomputeGroupState(state.groups, state.pills, group);
    });

    if (d.section_order != null) state.sectionOrder = d.section_order.filter(function (s) { return DEFAULT_LAYOUT_ORDER.indexOf(s) !== -1; });
    if (d.tax_rate_pct != null) state.taxRatePct = d.tax_rate_pct;
    if (d.value_display != null) state.valueDisplay = d.value_display;
    if (d.profit_name != null) state.profitName = d.profit_name;
    if (d.market_view != null) state.marketDisplay = d.market_view === 'summary' ? 'summary' : 'full';
  }

  function applyPdfDisplay(state, d) {
    if (!d) return;
    if (d.mode != null) state.mode = d.mode;
    if (d.font_size_index != null) state.fontSizeIndex = d.font_size_index;
    if (d.photos_per_row != null) state.photosPerRow = d.photos_per_row;
    if (d.disc_layout != null) state.discLayout = d.disc_layout;
    if (d.scenario_layout != null) state.scenarioLayout = d.scenario_layout;
    if (d.disclaimer_text != null) state.disclaimerText = d.disclaimer_text;
    if (d.disclaimer_punct != null) state.disclaimerPunct = d.disclaimer_punct;
    if (d.selected_emp_idx != null) state.selectedEmpIdx = d.selected_emp_idx;
    if (d.signature != null) state.groups.signature = d.signature ? 'checked' : 'unchecked';
  }

  // ── _isScenarioStale / _isPillLockedStale ─────────────────────────────────
  function isScenarioStale(payloadRawData, group) {
    var scenarioKey = group === 'market_scenarios' ? 'market' : group === 'selected_scenarios' ? 'selected' : null;
    if (!scenarioKey) return false;
    var offerAmount = payloadRawData && payloadRawData.offer ? payloadRawData.offer.amount : null;
    var acv = parseCurrency(payloadRawData && payloadRawData.scenarios && payloadRawData.scenarios[scenarioKey] ? payloadRawData.scenarios[scenarioKey].ACV : null);
    if (offerAmount == null || acv == null) return false;
    return Math.round(offerAmount) !== Math.round(acv);
  }

  function isPillLockedStale(payloadRawData, path) {
    var parts = path.split('.');
    var key = parts[1];
    if (key !== 'ACV' && key !== 'costMkt') return false;
    return isScenarioStale(payloadRawData, parts[0]);
  }

  // ── _buildDisplay ──────────────────────────────────────────────────────────
  // NOTE: uses the RAW payload (payloadRawData), same as the component — the
  // stale-scenario check runs against _getPayloadData(), called fresh, before
  // the override chain below ever touches the payload.
  function buildDisplay(state, payloadRawData) {
    var p = state.pills;
    var g = state.groups;
    var isOnePage = state.mode === 'one_page';

    return {
      valuation: {
        retail_value: p['valuation.retail_value'],
        recon: p['valuation.recon'],
        fixed_overhead: p['valuation.fixed_overhead'],
        target_profit: p['valuation.target_profit'],
        tax_savings: p['valuation.tax_savings'],
      },
      sections: {
        valuation: g.valuation === 'checked' || g.valuation === 'indeterminate',
        disclosures: isOnePage ? false : (g.disclosures === 'checked'),
        disclosures_horizontal: state.discLayout === 'horizontal',
        disclosures_signature: g.signature === 'checked',
        observations: g.observations === 'checked' || g.observations === 'indeterminate',
        observations_highlights: p['sections.observations_highlights'],
        observations_comments: p['sections.observations_comments'],
        market_summary: (g.market === 'checked') && (isOnePage || state.marketDisplay === 'summary'),
        market_comparables: (g.market === 'checked') && !isOnePage && state.marketDisplay === 'full',
        market_scenarios: isOnePage ? false : (g.market_scenarios === 'checked' || g.market_scenarios === 'indeterminate'),
        selected_scenarios: isOnePage ? false : (g.selected_scenarios === 'checked' || g.selected_scenarios === 'indeterminate'),
        recon_breakdown: isOnePage ? false : (g.recon === 'checked'),
        photos: isOnePage ? false : (g.photos === 'checked'),
      },
      general: {
        offer_label: false,
        condition: p['general.condition'],
        value_display: state.valueDisplay,
      },
      scenarios: {
        market: Object.fromEntries(SCENARIO_FIELDS.map(function (f) {
          var k = 'market_scenarios.' + f.key;
          return [f.key, isPillLockedStale(payloadRawData, k) ? false : p[k]];
        })),
        selected: Object.fromEntries(SCENARIO_FIELDS.map(function (f) {
          var k = 'selected_scenarios.' + f.key;
          return [f.key, isPillLockedStale(payloadRawData, k) ? false : p[k]];
        })),
      },
      scenario_layout: state.scenarioLayout,
    };
  }

  // ── Assemble ───────────────────────────────────────────────────────────────
  function assemble(payloadRawData, sharedDisplayData, pdfDisplayData, employeesData, isTemplateMode, taxRateAttr, profitLabelAttr, disclaimerTextAttr, watermarkFlag) {
    var state = {
      pills: defaultPills(),
      groups: defaultGroups(),
      sectionOrder: DEFAULT_LAYOUT_ORDER.slice(),
      mode: 'full',
      valueDisplay: 'offer',
      taxRatePct: null,
      profitName: null,
      disclaimerText: null,
      disclaimerPunct: ',',
      fontSizeIndex: 2,
      photosPerRow: 3,
      discLayout: 'horizontal',
      marketDisplay: 'full',
      scenarioLayout: 'tiles',
      selectedEmpIdx: 0,
    };

    // updated() cross-prop ordering, replicated exactly:
    applySharedDisplay(state, sharedDisplayData);
    applyPdfDisplay(state, pdfDisplayData);

    // payload arrives → default tax rate from the saved offer, if not already set
    if (state.taxRatePct === null) {
      var rate = payloadRawData && payloadRawData.valuation && payloadRawData.valuation.tax_savings
        ? payloadRawData.valuation.tax_savings.rate_pct : null;
      state.taxRatePct = rate != null ? parseFloat(parseFloat(rate).toFixed(2)) : 0;
    }
    // tax-rate attribute fallback — only bites if there was no payload above
    if (taxRateAttr != null && state.taxRatePct === null) {
      state.taxRatePct = parseFloat(parseFloat(taxRateAttr).toFixed(2));
    }
    // profit-label attribute: instance mode always wins; template mode only initializes once
    if (profitLabelAttr != null) {
      if (!isTemplateMode || state.profitName === null || state.profitName === undefined) {
        state.profitName = profitLabelAttr;
      }
    }
    // disclaimer-text attribute: same rule as profit-label
    if (disclaimerTextAttr != null) {
      if (!isTemplateMode || state.disclaimerText === null || state.disclaimerText === undefined) {
        state.disclaimerText = disclaimerTextAttr;
      }
    }
    // auto-select the employee matching the saved payload's employee name
    if (employeesData && employeesData.length && payloadRawData && payloadRawData.employee && payloadRawData.employee.name) {
      var idx = employeesData.findIndex(function (e) { return e.name === payloadRawData.employee.name; });
      if (idx !== -1) state.selectedEmpIdx = idx;
    }

    var display = buildDisplay(state, payloadRawData);

    var commonFields = {
      mode: state.mode,
      display: display,
      preview_logo: true,
      preview_photos: true,
      font_roboto: true,
      font_size_delta: FONT_SIZE_OPTIONS[state.fontSizeIndex].delta,
      photos_per_row: state.photosPerRow,
      section_order: state.sectionOrder,
      watermark: !!watermarkFlag,
    };

    // ── Payload override chain (mirrors _handleGenerate) ────────────────────
    var payloadData = Object.assign({}, payloadRawData || {});

    var effectiveProfitName = state.profitName != null ? state.profitName : profitLabelAttr;
    if (effectiveProfitName != null && payloadData.valuation && payloadData.valuation.target_profit) {
      payloadData.valuation = Object.assign({}, payloadData.valuation, {
        target_profit: Object.assign({}, payloadData.valuation.target_profit, { label: effectiveProfitName || 'Target Profit' }),
      });
    }

    var rawDisclaimerText = state.disclaimerText != null ? state.disclaimerText : (disclaimerTextAttr != null ? disclaimerTextAttr : null);
    if (rawDisclaimerText !== null) {
      var punct = state.disclaimerPunct != null ? state.disclaimerPunct : '.';
      var trimmedText = rawDisclaimerText ? rawDisclaimerText.replace(/\.+$/, '') : '';
      payloadData.disclaimer = trimmedText ? (punct + ' ' + trimmedText) : '';
    }

    if (payloadData.dealer && payloadData.dealer.logo_url && payloadData.dealer.logo_url.indexOf('//') === 0) {
      payloadData.dealer = Object.assign({}, payloadData.dealer, { logo_url: 'https:' + payloadData.dealer.logo_url });
    }

    if (payloadData.employee && payloadData.employee.phone) {
      payloadData.employee = Object.assign({}, payloadData.employee, { phone: fmtPhone(payloadData.employee.phone) });
    }

    if (employeesData && employeesData.length) {
      var emp = employeesData[state.selectedEmpIdx] || employeesData[0];
      payloadData.employee = { name: emp.name || '', phone: fmtPhone(emp.phone || ''), email: emp.email || '' };
    }

    if (payloadData.disclosures) {
      payloadData.disclosures = payloadData.disclosures.filter(function (d) { return d.answer && d.answer.trim() !== ''; });
    }

    if (payloadData.market && payloadData.market.comparables) {
      var adjustedComps = payloadData.market.comparables.map(function (c) {
        return Object.assign({}, c, {
          days_on_market: c.listing_type === 'delisted' ? (c.delisted_days || c.days_on_market) : c.days_on_market,
        });
      });
      var daysValues = adjustedComps.map(function (c) { return c.days_on_market; }).filter(function (d) { return d != null; });
      var avgDays = daysValues.length > 0
        ? Math.round(daysValues.reduce(function (a, b) { return a + b; }, 0) / daysValues.length)
        : (payloadData.market.summary ? payloadData.market.summary.avg_days : null);
      payloadData.market = Object.assign({}, payloadData.market, {
        comparables: adjustedComps,
        summary: Object.assign({}, payloadData.market.summary, { avg_days: avgDays }),
      });
    }

    if (state.taxRatePct !== null && payloadData.valuation && payloadData.valuation.tax_savings && payloadData.offer && payloadData.offer.amount != null) {
      var taxAmount = Math.round(payloadData.offer.amount * state.taxRatePct / 100);
      payloadData.valuation = Object.assign({}, payloadData.valuation, {
        tax_savings: Object.assign({}, payloadData.valuation.tax_savings, {
          rate_pct: state.taxRatePct,
          amount: taxAmount,
          gross_value: payloadData.offer.amount + taxAmount,
        }),
      });
    }

    return Object.assign({}, commonFields, { raw_payload: payloadData });
  }

  var requestBody = assemble(
    safeParse(payloadRaw),
    safeParse(sharedDisplayRaw),
    safeParse(pdfDisplayRaw),
    safeParse(employeesRaw),
    !!templateModeRaw,
    taxRateRaw,
    profitLabelRaw,
    disclaimerTextRaw,
    watermarkRaw
  );

  bubble_fn_assemblePrintPayload(JSON.stringify(requestBody));

})(payload, sharedDisplay, pdfDisplay, employees, templateMode, taxRate, profitLabel, disclaimerText, watermark);
