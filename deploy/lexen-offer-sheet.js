var Oe = Object.defineProperty;
var Le = (r, e, t) => e in r ? Oe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var K = (r, e, t) => Le(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, te = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), le = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = le.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && le.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Re = (r) => new ke(typeof r == "string" ? r : r + "", void 0, ie), ze = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new ke(t, r, ie);
}, Te = (r, e) => {
  if (te) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = H.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, de = te ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Re(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Me, defineProperty: Be, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: Ue, getOwnPropertySymbols: Ie, getPrototypeOf: je } = Object, w = globalThis, ce = w.trustedTypes, Fe = ce ? ce.emptyScript : "", W = w.reactiveElementPolyfillSupport, T = (r, e) => r, X = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Fe : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, we = (r, e) => !Me(r, e), pe = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = pe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Be(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Ne(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, i = [...Ue(t), ...Ie(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(de(s));
    } else e !== void 0 && t.push(de(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Te(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : X).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : X;
      this._$Em = s;
      const p = l.fromAttribute(t, n.type);
      this[s] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? we)(o, t) || i.useDefault && i.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) {
        const { wrapped: n } = a, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[T("elementProperties")] = /* @__PURE__ */ new Map(), C[T("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: C }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, he = (r) => r, G = M.trustedTypes, ue = G ? G.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, $e = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + k, He = `<${Se}>`, P = document, N = () => P.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", se = Array.isArray, Ge = (r) => se(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, _e = />/g, $ = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, ge = /"/g, Ee = /^(?:script|style|textarea|title)$/i, Ve = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), c = Ve(1), O = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), S = P.createTreeWalker(P, 129);
function Pe(r, e) {
  if (!se(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const qe = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = z;
  for (let n = 0; n < t; n++) {
    const l = r[n];
    let p, f, d = -1, _ = 0;
    for (; _ < l.length && (a.lastIndex = _, f = a.exec(l), f !== null); ) _ = a.lastIndex, a === z ? f[1] === "!--" ? a = fe : f[1] !== void 0 ? a = _e : f[2] !== void 0 ? (Ee.test(f[2]) && (s = RegExp("</" + f[2], "g")), a = $) : f[3] !== void 0 && (a = $) : a === $ ? f[0] === ">" ? (a = s ?? z, d = -1) : f[1] === void 0 ? d = -2 : (d = a.lastIndex - f[2].length, p = f[1], a = f[3] === void 0 ? $ : f[3] === '"' ? ge : me) : a === ge || a === me ? a = $ : a === fe || a === _e ? a = z : (a = $, s = void 0);
    const g = a === $ && r[n + 1].startsWith("/>") ? " " : "";
    o += a === z ? l + He : d >= 0 ? (i.push(p), l.slice(0, d) + $e + l.slice(d) + k + g) : l + k + (d === -2 ? n : g);
  }
  return [Pe(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, l = this.parts, [p, f] = qe(e, t);
    if (this.el = I.createElement(p, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = S.nextNode()) !== null && l.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith($e)) {
          const _ = f[a++], g = s.getAttribute(d).split(k), u = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: o, name: u[2], strings: g, ctor: u[1] === "." ? We : u[1] === "?" ? Ye : u[1] === "@" ? Ze : V }), s.removeAttribute(d);
        } else d.startsWith(k) && (l.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Ee.test(s.tagName)) {
          const d = s.textContent.split(k), _ = d.length - 1;
          if (_ > 0) {
            s.textContent = G ? G.emptyScript : "";
            for (let g = 0; g < _; g++) s.append(d[g], N()), S.nextNode(), l.push({ type: 2, index: ++o });
            s.append(d[_], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Se) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(k, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += k.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = P.createElement("template");
    return i.innerHTML = e, i;
  }
}
function L(r, e, t = r, i) {
  var a, n;
  if (e === O) return e;
  let s = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const o = U(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = L(r, s._$AS(r, e.values), s, i)), e;
}
class Ke {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? P).importNode(t, !0);
    S.currentNode = s;
    let o = S.nextNode(), a = 0, n = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new j(o, o.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (p = new Je(o, this, e)), this._$AV.push(p), l = i[++n];
      }
      a !== (l == null ? void 0 : l.index) && (o = S.nextNode(), a++);
    }
    return S.currentNode = P, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class j {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = L(this, e, t), U(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ge(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(P.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(Pe(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const a = new Ke(s, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = be.get(e.strings);
    return t === void 0 && be.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new j(this.O(N()), this.O(N()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = he(e).nextSibling;
      he(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = L(this, e, t, 0), a = !U(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
    else {
      const n = e;
      let l, p;
      for (e = o[0], l = 0; l < o.length - 1; l++) p = L(this, n[i + l], t, l), p === O && (p = this._$AH[l]), a || (a = !U(p) || p !== this._$AH[l]), p === h ? e = h : e !== h && (e += (p ?? "") + o[l + 1]), this._$AH[l] = p;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class We extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Ye extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ze extends V {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = L(this, e, t, 0) ?? h) === O) return;
    const i = this._$AH, s = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Je {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const Z = M.litHtmlPolyfillSupport;
Z == null || Z(I, j), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Qe = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new j(e.insertBefore(N(), o), o, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class B extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Qe(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return O;
  }
}
var xe;
B._$litElement$ = !0, B.finalized = !0, (xe = E.litElementHydrateSupport) == null || xe.call(E, { LitElement: B });
const J = E.litElementPolyfillSupport;
J == null || J({ LitElement: B });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
function ye(r) {
  const e = String(r || "").replace(/\D/g, "");
  return e.length === 10 ? `(${e.slice(0, 3)}) ${e.slice(3, 6)}-${e.slice(6)}` : e.length === 11 && e[0] === "1" ? `(${e.slice(1, 4)}) ${e.slice(4, 7)}-${e.slice(7)}` : r || "";
}
function Xe() {
  const r = /* @__PURE__ */ new Date(), e = new Date(r);
  e.setDate(r.getDate() + 30);
  const t = (s) => s.toISOString().slice(0, 10);
  return {
    dealer: {
      name: "Dealership Name",
      location: "Dealership Name",
      address: `1234 Street
City, PR`,
      phone: null,
      logo_url: null
    },
    employee: { name: "Employee Name", phone: "(000) 000-0000" },
    customer: { name: "Customer Name" },
    vehicle: {
      year: 2024,
      make: "Make",
      model: "Model",
      trim: "Trim",
      color: "Colour",
      vin: "1A2B3C4D5E6F7G8H9",
      mileage_km: 5e4
    },
    offer: {
      amount: 25e3,
      valid_until: t(e),
      appraisal_date: t(r),
      classification: "Good Condition"
    },
    valuation: {
      retail_value: 32e3,
      recon_total: 2500,
      fixed_overhead: 500,
      target_profit: { amount: 2500, label: "Target Profit" },
      tax_savings: { rate_pct: 13, amount: 3250, gross_value: 28250 }
    },
    disclosures: [
      { question: "Disclosure Question #1", answer: "Answer #1" },
      { question: "Disclosure Question #2", answer: "Answer #2" },
      { question: "Disclosure Question #3", answer: "Answer #3" }
    ],
    observations: {
      highlights: "Vehicle Highlights",
      comments: "Vehicle Comments",
      claims: { count: 0, amount: 0 }
    },
    market: {
      summary: {
        comparables_count: 6,
        avg_mileage_km: 45e3,
        avg_price: 35e3,
        avg_distance_km: 100,
        avg_days: 90
      },
      comparables: [
        { year: 2024, description: "Make Model", trim: "Trim A", vin: "1A2B3C4D5E6F7G8H1", dealer: "Dealer Name", mileage_km: 42e3, price: 36500, distance_km: 85, days_on_market: 45 },
        { year: 2024, description: "Make Model", trim: "Trim B", vin: "1A2B3C4D5E6F7G8H2", dealer: "Dealer Name", mileage_km: 38e3, price: 37200, distance_km: 120, days_on_market: 30 },
        { year: 2024, description: "Make Model", trim: "Trim C", vin: "1A2B3C4D5E6F7G8H3", dealer: "Dealer Name", mileage_km: 51e3, price: 34800, distance_km: 60, days_on_market: 90 },
        { year: 2023, description: "Make Model", trim: "Trim A", vin: "1A2B3C4D5E6F7G8H4", dealer: "Dealer Name", mileage_km: 65e3, price: 33e3, distance_km: 95, days_on_market: 120 },
        { year: 2023, description: "Make Model", trim: "Trim D", vin: "1A2B3C4D5E6F7G8H5", dealer: "Dealer Name", mileage_km: 47e3, price: 35500, distance_km: 150, days_on_market: 60 },
        { year: 2024, description: "Make Model", trim: "Trim B", vin: "1A2B3C4D5E6F7G8H6", dealer: "Dealer Name", mileage_km: 29e3, price: 38e3, distance_km: 110, days_on_market: 15 }
      ]
    },
    scenarios: {
      market: {
        vehicles: 320,
        avgRetail: "$35,000",
        avgMileage: 45e3,
        listedDays: 90,
        prcMkt: "100%",
        prcMktAdj: "95%",
        costMkt: "100%",
        priceRank: "160 of 320",
        mileageRank: "150 of 320",
        perception: "160 of 320",
        retail: "$32,000",
        ACV: "$25,000"
      },
      selected: {
        vehicles: 6,
        avgRetail: "$36,000",
        avgMileage: 45e3,
        listedDays: 60,
        prcMkt: "110%",
        prcMktAdj: "100%",
        costMkt: "110%",
        priceRank: "3 of 6",
        mileageRank: "3 of 6",
        perception: "3 of 6",
        retail: "$32,000",
        ACV: "$25,000"
      }
    },
    recon: {
      items: [
        { description: "Recon Item #1", amount: 1e3 },
        { description: "Recon Item #2", amount: 1e3 },
        { description: "Recon Item #3", amount: 500 }
      ],
      total: 2500
    },
    photos: [
      { url: "placeholder", category: "Exterior", caption: null },
      { url: "placeholder", category: "Exterior", caption: null },
      { url: "placeholder", category: "Exterior", caption: null },
      { url: "placeholder", category: "Exterior", caption: null },
      { url: "placeholder", category: "Exterior", caption: null },
      { url: "placeholder", category: "Interior", caption: null },
      { url: "placeholder", category: "Interior", caption: null },
      { url: "placeholder", category: "Interior", caption: null },
      { url: "placeholder", category: "Interior", caption: null },
      { url: "placeholder", category: "Highlights", caption: null },
      { url: "placeholder", category: "Highlights", caption: null },
      { url: "placeholder", category: "Damages ($000)", caption: "Sample Damage" }
    ],
    disclaimer: ", subject to Carfax History and Lien Report"
  };
}
const F = [
  { label: "Extra Small", delta: -1 },
  { label: "Small", delta: 0 },
  { label: "Medium", delta: 1 },
  { label: "Large", delta: 2 },
  { label: "Extra Large", delta: 3 }
], D = ["valuation", "disclosures", "observations", "market", "market_scenarios", "selected_scenarios", "recon", "photos"], et = {
  valuation: "Valuation",
  disclosures: "Disclosures",
  observations: "Observations",
  market: "Market Comparables",
  market_scenarios: "Market Scenarios",
  selected_scenarios: "Selected Scenarios",
  recon: "Recon",
  photos: "Photos"
}, A = [
  { key: "vehicles", label: "Vehicles" },
  { key: "avgRetail", label: "Average Retail" },
  { key: "avgMileage", label: "Average Mileage" },
  { key: "listedDays", label: "Listed Days" },
  { key: "prcMkt", label: "Price to {basis}" },
  { key: "prcMktAdj", label: "Adj. Price to {basis}" },
  { key: "costMkt", label: "Cost to {basis}" },
  { key: "priceRank", label: "Price Rank" },
  { key: "mileageRank", label: "Mileage Rank" },
  { key: "perception", label: "Perception" },
  { key: "retail", label: "Retail" },
  { key: "ACV", label: "Actual Cash Value" }
], ve = /* @__PURE__ */ new Set(["costMkt", "prcMktAdj", "retail", "ACV"]), Q = c`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
c`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
c`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const tt = c`<svg width="26" height="26" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`, it = c`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="8.3" r="0.65" fill="currentColor"/></svg>`;
class ee extends B {
  constructor() {
    super(), this.apiBaseUrl = "", this.apiMode = "url", this.authToken = "", this.templateMode = !1, this.payload = null, this.sharedDisplay = null, this.pdfDisplay = null, this.templateSharedDisplay = null, this.templatePdfDisplay = null, this.employees = [], this._selectedEmployeeIndex = 0, this._vehicleInfo = null, this._generalOpen = !1, this._layoutOpen = !1, this._showHideOpen = !1, this._mode = "full", this._valueDisplay = "offer", this._taxRatePct = null, this._profitName = null, this._disclaimerText = null, this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._sectionOrder = [...D], this._pills = this._defaultPills(), this._groups = this._defaultGroups(), this._pillsOpen = { valuation: !1, market_scenarios: !1, selected_scenarios: !1 }, this._finalized = !1, this._autoPreviewDone = !1, this._autoPreviewTimer = null, this._autoRefreshTimer = null, this._splitOpen = !1, this._sendVia = null, this._doneSentVia = null, this._pdfSent = !1, this._confirmSendEmail = !1, this._sendMessageType = null, this._manualCustomerEmail = "", this._previewStale = !1, this._generating = !1, this._finalizing = !1, this._statusMsg = "", this._statusError = !1, this._pdfUrl = "", this._pdfVehicle = null, this._lastPrintoutRequest = null, this._savedConfirm = !1, this._confirmReset = !1, this._locks = {
      mode: !1,
      condition: !1,
      value_display: !1,
      tax_rate_pct: !1,
      profit_label: !1,
      font_size: !1,
      photos_per_row: !1,
      disc_layout: !1,
      market_display: !1,
      scenario_layout: !1,
      disclaimer: !1,
      section_order: !1,
      valuation: !1,
      disclosures: !1,
      observations: !1,
      market: !1,
      market_scenarios: !1,
      selected_scenarios: !1,
      recon: !1,
      photos: !1,
      signature: !1
    }, this._dragSrcSection = null, this._dragSrcIndex = -1, this._placeholder = null, this._pendingDataLoad = !1, this._tooltipEl = null, this._tooltipBubble = null, this._tooltipLabel = null;
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
      groups: { ...this._groups }
    };
  }
  _defaultPills() {
    return {
      "general.condition": !0,
      "valuation.retail_value": !0,
      "valuation.recon": !0,
      "valuation.fixed_overhead": !0,
      "valuation.target_profit": !0,
      "valuation.tax_savings": !0,
      "sections.observations_highlights": !0,
      "sections.observations_comments": !0,
      ...Object.fromEntries(A.flatMap((e) => [
        [`market_scenarios.${e.key}`, !ve.has(e.key)],
        [`selected_scenarios.${e.key}`, !ve.has(e.key)]
      ]))
    };
  }
  _defaultGroups() {
    return {
      valuation: "checked",
      disclosures: "checked",
      observations: "checked",
      market: "checked",
      market_scenarios: "unchecked",
      // new feature — off by default
      selected_scenarios: "unchecked",
      // new feature — off by default
      recon: "checked",
      photos: "checked",
      signature: "checked"
    };
  }
  _applySharedDisplay(e) {
    if (!e) return;
    const t = ["valuation", "disclosures", "observations", "market", "market_scenarios", "selected_scenarios", "recon", "photos"], i = ["valuation", "observations", "market_scenarios", "selected_scenarios"], s = e.sections || {};
    this._pills = { ...this._defaultPills(), ...e.pills || {} };
    const o = { ...this._defaultGroups(), signature: this._groups.signature };
    t.forEach((a) => {
      s[a] != null && (o[a] = s[a] ? "checked" : "unchecked");
    }), this._groups = o, i.forEach((a) => {
      this._groups[a] === "checked" && this._recomputeGroupState(a);
    }), e.section_order != null && (this._sectionOrder = e.section_order.filter((a) => D.includes(a))), e.tax_rate_pct != null && (this._taxRatePct = e.tax_rate_pct), e.value_display != null && (this._valueDisplay = e.value_display), e.profit_name != null && (this._profitName = e.profit_name), e.market_view != null && (this._marketDisplay = e.market_view === "summary" ? "summary" : "full");
  }
  _applyPdfDisplay(e) {
    e && (e.mode != null && (this._mode = e.mode), e.font_size_index != null && (this._fontSizeIndex = e.font_size_index), e.photos_per_row != null && (this._photosPerRow = e.photos_per_row), e.disc_layout != null && (this._discLayout = e.disc_layout), e.scenario_layout != null && (this._scenarioLayout = e.scenario_layout), e.disclaimer_text != null && (this._disclaimerText = e.disclaimer_text), e.disclaimer_punct != null && (this._disclaimerPunct = e.disclaimer_punct), e.selected_emp_idx != null && (this._selectedEmployeeIndex = e.selected_emp_idx), e.signature != null && (this._groups = { ...this._groups, signature: e.signature ? "checked" : "unchecked" }), e.locks && (this._locks = { ...this._locks, ...e.locks }));
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  disconnectedCallback() {
    super.disconnectedCallback(), this._tooltipEl && (this._tooltipEl.remove(), this._tooltipEl = null, this._tooltipBubble = null, this._tooltipLabel = null);
  }
  firstUpdated() {
    this.dispatchEvent(new CustomEvent("component-ready", {
      bubbles: !0,
      composed: !0
    }));
  }
  updated(e) {
    var o, a, n, l, p, f;
    const t = this._pendingDataLoad;
    if (e.has("sharedDisplay") || e.has("pdfDisplay") ? this._pendingDataLoad = !0 : this._pendingDataLoad && (this._pendingDataLoad = !1), e.has("sharedDisplay") && this.sharedDisplay && this._applySharedDisplay(this.sharedDisplay), e.has("pdfDisplay") && this.pdfDisplay && this._applyPdfDisplay(this.pdfDisplay), (e.has("sharedDisplay") || e.has("pdfDisplay")) && this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl && (this._savedDisplayConsumed = !0, clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      this._handleGenerate();
    }, 300)), e.has("payload") && this.payload && (this._vehicleInfo = this._vehicleInfoFromData(this.payload), this._taxRatePct === null)) {
      const d = (n = (a = (o = this.payload) == null ? void 0 : o.valuation) == null ? void 0 : a.tax_savings) == null ? void 0 : n.rate_pct;
      this._taxRatePct = d != null ? parseFloat(parseFloat(d).toFixed(2)) : 0;
    }
    if (e.has("taxRate") && this.taxRate != null && this._taxRatePct === null && (this._taxRatePct = parseFloat(parseFloat(this.taxRate).toFixed(2))), e.has("profitLabel") && this.profitLabel != null && (!this.templateMode || this._profitName === null || this._profitName === void 0) && (this._profitName = this.profitLabel), e.has("disclaimerText") && this.disclaimerText != null && (!this.templateMode || this._disclaimerText === null || this._disclaimerText === void 0) && (this._disclaimerText = this.disclaimerText), e.has("employees") && ((l = this.employees) != null && l.length) && ((f = (p = this.payload) == null ? void 0 : p.employee) != null && f.name)) {
      const d = this.employees.findIndex((_) => _.name === this.payload.employee.name);
      d !== -1 && (this._selectedEmployeeIndex = d);
    }
    this._savedConfirm && !e.has("_savedConfirm") && [
      "_mode",
      "_valueDisplay",
      "_taxRatePct",
      "_profitName",
      "_disclaimerText",
      "_disclaimerPunct",
      "_fontSizeIndex",
      "_photosPerRow",
      "_discLayout",
      "_marketDisplay",
      "_scenarioLayout",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex",
      "_locks"
    ].some((_) => e.has(_)) && (this._savedConfirm = !1), this._mode === "one_page" && !e.has("_mode") && !t && !this._isLocked("mode") && [
      "_valueDisplay",
      "_taxRatePct",
      "_profitName",
      "_disclaimerText",
      "_disclaimerPunct",
      "_fontSizeIndex",
      "_photosPerRow",
      "_discLayout",
      "_marketDisplay",
      "_scenarioLayout",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex"
    ].some((_) => e.has(_)) && (this._mode = "full", this._preOnePageState = null), e.has("locked") && (this._finalized = !!this.locked), !this._autoPreviewDone && this.apiBaseUrl && ["payload", "sharedDisplay", "pdfDisplay", "employees", "locked"].some((d) => e.has(d)) && (clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      !this._autoPreviewDone && this.apiBaseUrl && (this.templateMode || this.payload) && (this._autoPreviewDone = !0, this._handleGenerate());
    }, 300)), this._autoPreviewDone && this.apiBaseUrl && !(t || e.has("sharedDisplay") || e.has("pdfDisplay") || e.has("payload") || e.has("employees")) && [
      "_mode",
      "_valueDisplay",
      "_taxRatePct",
      "_profitName",
      "_disclaimerText",
      "_disclaimerPunct",
      "_fontSizeIndex",
      "_photosPerRow",
      "_discLayout",
      "_marketDisplay",
      "_scenarioLayout",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex"
    ].some((g) => e.has(g)) && (this._previewStale = !0);
    const s = this.shadowRoot;
    if (s)
      for (const [d, _] of Object.entries(this._groups)) {
        const g = s.querySelector(`input[data-group="${d}"]`);
        g && (g.indeterminate = _ === "indeterminate", g.checked = _ === "checked" || _ === "indeterminate");
      }
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _fmtPrice(e) {
    return !e && e !== 0 ? "" : "$" + Number(e).toLocaleString();
  }
  _getPayloadData() {
    return this.payload || Xe();
  }
  _parseCurrency(e) {
    if (e == null) return null;
    const t = parseFloat(String(e).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(t) ? t : null;
  }
  /** True once the workbench's post-scenario negotiation slider has moved the
   * offer away from the calculated ACV for this scenario — ACV and Cost to
   * Market are derived from that original valuation, so they go stale too. */
  _isScenarioStale(e) {
    var a, n, l;
    const t = e === "market_scenarios" ? "market" : e === "selected_scenarios" ? "selected" : null;
    if (!t) return !1;
    const i = this._getPayloadData(), s = (a = i == null ? void 0 : i.offer) == null ? void 0 : a.amount, o = this._parseCurrency((l = (n = i == null ? void 0 : i.scenarios) == null ? void 0 : n[t]) == null ? void 0 : l.ACV);
    return s == null || o == null ? !1 : Math.round(s) !== Math.round(o);
  }
  /** ACV and Cost to Market are the only fields tied to that valuation. */
  _isPillLockedStale(e) {
    const [t, i] = e.split(".");
    return i !== "ACV" && i !== "costMkt" ? !1 : this._isScenarioStale(t);
  }
  _vehicleInfoFromData(e) {
    const t = e.vehicle || {}, i = e.offer || {}, s = this._fmtPrice(i.amount) + " Offer", a = [t.year, t.make, t.model, t.trim].filter(Boolean).join(" ") + (t.color ? ` (${t.color})` : "");
    return { amount: s, desc: a, vin: t.vin || "" };
  }
  _getGroupState(e) {
    return this._groups[e] || "checked";
  }
  /** Recompute a group's state from its pills. */
  _recomputeGroupState(e) {
    const t = { ...this._groups };
    if (e === "valuation") {
      const i = ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"], s = i.filter((o) => this._pills[o]).length;
      s === 0 ? t.valuation = "unchecked" : s === i.length ? t.valuation = "checked" : t.valuation = "indeterminate";
    } else if (e === "observations") {
      const i = ["sections.observations_highlights", "sections.observations_comments"], s = i.filter((o) => this._pills[o]).length;
      s === 0 ? t.observations = "unchecked" : s === i.length ? t.observations = "checked" : t.observations = "indeterminate";
    } else if (e === "market_scenarios" || e === "selected_scenarios") {
      const i = A.map((o) => `${e}.${o.key}`), s = i.filter((o) => this._pills[o]).length;
      s === 0 ? t[e] = "unchecked" : s === i.length ? t[e] = "checked" : t[e] = "indeterminate";
    }
    this._groups = t;
  }
  /** When a section is hidden, push it to the bottom of layout order. */
  _syncLayoutOrder(e) {
    const t = [...this._sectionOrder], i = t.indexOf(e);
    i !== -1 && (t.splice(i, 1), t.push(e)), this._sectionOrder = t;
  }
  _restoreLayoutOrder(e) {
    var a, n;
    const t = (n = (a = this.sharedDisplay) == null ? void 0 : a.section_order) != null && n.length ? this.sharedDisplay.section_order : D, i = [...this._sectionOrder].filter((l) => l !== e), s = t.indexOf(e), o = i.findIndex((l) => t.indexOf(l) > s);
    o === -1 ? i.push(e) : i.splice(o, 0, e), this._sectionOrder = i;
  }
  _isOnePage() {
    return this._mode === "one_page";
  }
  _isSectionDisabled(e) {
    return this._groups[e] === "unchecked";
  }
  // ── Display block builder ──────────────────────────────────────────────────
  _buildSharedState() {
    const e = this._groups;
    return {
      sections: {
        valuation: e.valuation !== "unchecked",
        disclosures: e.disclosures !== "unchecked",
        observations: e.observations !== "unchecked",
        market: e.market !== "unchecked",
        market_scenarios: e.market_scenarios !== "unchecked",
        selected_scenarios: e.selected_scenarios !== "unchecked",
        recon: e.recon !== "unchecked",
        photos: e.photos !== "unchecked"
      },
      market_view: this._marketDisplay,
      pills: { ...this._pills },
      section_order: [...this._sectionOrder],
      value_display: this._valueDisplay,
      tax_rate_pct: this._taxRatePct,
      profit_name: this._profitName || null
    };
  }
  _buildPdfState() {
    return {
      mode: this._mode,
      font_size_index: this._fontSizeIndex,
      photos_per_row: this._photosPerRow,
      disc_layout: this._discLayout,
      scenario_layout: this._scenarioLayout,
      disclaimer_text: this._disclaimerText || "",
      disclaimer_punct: this._disclaimerPunct ?? ",",
      selected_emp_idx: this._selectedEmployeeIndex,
      signature: this._groups.signature !== "unchecked",
      locks: { ...this._locks }
    };
  }
  _buildDisplay() {
    const e = this._pills, t = this._groups;
    return {
      valuation: {
        retail_value: e["valuation.retail_value"],
        recon: e["valuation.recon"],
        fixed_overhead: e["valuation.fixed_overhead"],
        target_profit: e["valuation.target_profit"],
        tax_savings: e["valuation.tax_savings"]
      },
      sections: {
        valuation: t.valuation === "checked" || t.valuation === "indeterminate",
        disclosures: this._isOnePage() ? !1 : t.disclosures === "checked",
        disclosures_horizontal: this._discLayout === "horizontal",
        disclosures_signature: t.signature === "checked",
        observations: t.observations === "checked" || t.observations === "indeterminate",
        observations_highlights: e["sections.observations_highlights"],
        observations_comments: e["sections.observations_comments"],
        market_summary: t.market === "checked" && (this._isOnePage() || this._marketDisplay === "summary"),
        market_comparables: t.market === "checked" && !this._isOnePage() && this._marketDisplay === "full",
        market_scenarios: this._isOnePage() ? !1 : t.market_scenarios === "checked" || t.market_scenarios === "indeterminate",
        selected_scenarios: this._isOnePage() ? !1 : t.selected_scenarios === "checked" || t.selected_scenarios === "indeterminate",
        recon_breakdown: this._isOnePage() ? !1 : t.recon === "checked",
        photos: this._isOnePage() ? !1 : t.photos === "checked"
      },
      general: {
        offer_label: !1,
        condition: e["general.condition"],
        value_display: this._valueDisplay
      },
      scenarios: {
        market: Object.fromEntries(A.map((s) => [s.key, this._isPillLockedStale(`market_scenarios.${s.key}`) ? !1 : e[`market_scenarios.${s.key}`]])),
        selected: Object.fromEntries(A.map((s) => [s.key, this._isPillLockedStale(`selected_scenarios.${s.key}`) ? !1 : e[`selected_scenarios.${s.key}`]]))
      },
      scenario_layout: this._scenarioLayout
    };
  }
  // ── Event handlers ─────────────────────────────────────────────────────────
  _handleModeChange(e) {
    if (this._mode = e, e === "one_page") {
      this._preOnePageState = {
        groups: { ...this._groups },
        pills: { ...this._pills },
        marketDisplay: this._marketDisplay,
        sectionOrder: [...this._sectionOrder]
      };
      const i = { ...this._groups };
      ["disclosures", "recon", "photos", "market_scenarios", "selected_scenarios"].forEach((l) => {
        i[l] = "unchecked";
      }), ["valuation", "observations", "market"].forEach((l) => {
        this._isLocked(l) || (i[l] = "checked");
      }), this._groups = i;
      const s = { ...this._pills };
      this._isLocked("valuation") || ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"].forEach((l) => {
        s[l] = !0;
      }), this._isLocked("observations") || (s["sections.observations_comments"] = !0, s["sections.observations_highlights"] = !1), this._pills = s, this._marketDisplay = "summary";
      const o = ["disclosures", "recon", "photos", "market_scenarios", "selected_scenarios"], a = this._sectionOrder.filter((l) => !o.includes(l)), n = this._sectionOrder.filter((l) => o.includes(l));
      this._sectionOrder = [...a, ...n];
    } else if (this._preOnePageState) {
      const i = this._preOnePageState;
      this._groups = { ...i.groups }, this._pills = { ...i.pills }, this._marketDisplay = i.marketDisplay, this._sectionOrder = i.sectionOrder, this._preOnePageState = null;
    } else {
      const i = { ...this._groups };
      ["disclosures", "recon", "photos", "valuation", "observations", "market"].forEach((s) => {
        this._isLocked(s) || (i[s] = "checked");
      }), ["market_scenarios", "selected_scenarios"].forEach((s) => {
        this._isLocked(s) || (i[s] = "unchecked");
      }), this._groups = i, this._marketDisplay = "full", this._sectionOrder = [...D];
    }
  }
  _handleGroupChange(e, t) {
    if (this._groups = { ...this._groups, [e]: t ? "checked" : "unchecked" }, t && ["valuation", "observations", "market_scenarios", "selected_scenarios"].includes(e)) {
      const s = this._pillKeysForGroup(e);
      if (s.filter((a) => this._pills[a]).length === 0) {
        const a = { ...this._pills };
        s.forEach((n) => {
          a[n] = !0;
        }), this._pills = a;
      } else
        this._recomputeGroupState(e);
    }
    e !== "signature" && (t ? this._restoreLayoutOrder(e) : this._syncLayoutOrder(e));
  }
  _handlePillClick(e, t) {
    const i = { ...this._pills };
    i[e] = !i[e], this._pills = i, t && ["valuation", "observations", "market_scenarios", "selected_scenarios"].includes(t) && (this._recomputeGroupState(t), this._groups[t] === "unchecked" && this._syncLayoutOrder(t));
  }
  _togglePillsOpen(e) {
    this._pillsOpen = { ...this._pillsOpen, [e]: !this._pillsOpen[e] };
  }
  _handleFontSizeStep(e) {
    const t = this._fontSizeIndex + e;
    t >= 0 && t < F.length && (this._fontSizeIndex = t);
  }
  _handlePhotosPerRowStep(e) {
    const t = this._photosPerRow + e;
    t >= 2 && t <= 4 && (this._photosPerRow = t);
  }
  _handleSegmentedClick(e, t) {
    e === "value-display" ? this._valueDisplay = t : e === "disc-layout" ? this._discLayout = t : e === "market-display" ? this._marketDisplay = t : e === "scenario-layout" && (this._scenarioLayout = t);
  }
  _handleTaxRateInput(e) {
    const t = parseFloat(e.target.value);
    this._taxRatePct = isNaN(t) ? 0 : Math.max(0, Math.min(99, parseFloat(t.toFixed(2))));
  }
  _handleProfitNameInput(e) {
    this._profitName = e.target.value;
  }
  _handleDisclaimerInput(e) {
    this._disclaimerText = e.target.value;
  }
  async _handleReset() {
    this._confirmReset = !1, this._pendingDataLoad = !0, this.templateSharedDisplay || this.templatePdfDisplay ? (this.templateSharedDisplay && this._applySharedDisplay(this.templateSharedDisplay), this.templatePdfDisplay && this._applyPdfDisplay(this.templatePdfDisplay)) : this._resetToggles(), this._previewStale = !0, this._finalizing = !0, await this._handleGenerate(!1), this._finalizing = !1, this._finalized = !0, this.dispatchEvent(new CustomEvent("display-save", {
      detail: { shared: null, pdf: null, employee: null, payload: null },
      bubbles: !0,
      composed: !0
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
      selectedEmployeeIndex: this._selectedEmployeeIndex
    };
  }
  /** Reverts unapplied edits back to the last-applied snapshot — distinct from
   * "Reset to template", which goes back to the template defaults instead. */
  _handleDiscardChanges() {
    if (!this._appliedSnapshot) return;
    this._pendingDataLoad = !0;
    const e = this._appliedSnapshot;
    this._mode = e.mode, this._valueDisplay = e.valueDisplay, this._taxRatePct = e.taxRatePct, this._profitName = e.profitName, this._disclaimerText = e.disclaimerText, this._disclaimerPunct = e.disclaimerPunct, this._fontSizeIndex = e.fontSizeIndex, this._photosPerRow = e.photosPerRow, this._discLayout = e.discLayout, this._marketDisplay = e.marketDisplay, this._scenarioLayout = e.scenarioLayout, this._sectionOrder = [...e.sectionOrder], this._pills = { ...e.pills }, this._groups = { ...e.groups }, this._selectedEmployeeIndex = e.selectedEmployeeIndex, this._previewStale = !1;
  }
  _resetToggles() {
    var t, i, s;
    this._mode = "full", this._valueDisplay = "offer";
    const e = (s = (i = (t = this.payload) == null ? void 0 : t.valuation) == null ? void 0 : i.tax_savings) == null ? void 0 : s.rate_pct;
    this._taxRatePct = e != null ? parseFloat(parseFloat(e).toFixed(2)) : this.taxRate != null ? parseFloat(parseFloat(this.taxRate).toFixed(2)) : 0, this._profitName = this.profitLabel || "", this._disclaimerText = this.disclaimerText || "", this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._sectionOrder = [...D], this._pills = this._defaultPills(), this._groups = this._defaultGroups();
  }
  // ── Drag-and-drop ──────────────────────────────────────────────────────────
  _handleDragStart(e, t) {
    const i = e.currentTarget;
    if (i.classList.contains("disabled")) {
      e.preventDefault();
      return;
    }
    this._dragSrcSection = t, this._dragSrcIndex = this._sectionOrder.indexOf(t), e.dataTransfer.effectAllowed = "move";
    const s = document.createElement("div");
    s.className = "drop-line", this._placeholder = s, setTimeout(() => i.classList.add("dragging"), 0);
  }
  _handleDragOver(e, t) {
    if (e.preventDefault(), e.dataTransfer.dropEffect = "move", t === this._dragSrcSection || !this._placeholder) return;
    const i = e.currentTarget, s = i.getBoundingClientRect(), o = e.clientY > s.top + s.height / 2, a = i.parentNode;
    o ? a.insertBefore(this._placeholder, i.nextSibling) : a.insertBefore(this._placeholder, i);
  }
  _commitDrop() {
    const e = this._dragSrcSection;
    if (!e) return;
    const t = this.shadowRoot.querySelector(".sortable-list");
    if (t && this._placeholder && this._placeholder.parentNode === t) {
      const i = [];
      for (const s of Array.from(t.children))
        s === this._placeholder ? i.push(e) : s.dataset.section && s.dataset.section !== e && i.push(s.dataset.section);
      this._sectionOrder = i;
    }
    this._placeholder && this._placeholder.parentNode && this._placeholder.parentNode.removeChild(this._placeholder), this._placeholder = null, this._dragSrcSection = null, this._dragSrcIndex = -1, this.updateComplete.then(() => {
      const i = this.shadowRoot.querySelector(`.sortable-item[data-section="${e}"]`);
      i && (i.classList.remove("dropped"), i.offsetWidth, i.classList.add("dropped"), setTimeout(() => i.classList.remove("dropped"), 1e3));
    });
  }
  _handleDrop(e) {
    e.preventDefault(), e.stopPropagation(), this._commitDrop();
  }
  _handleListDrop(e) {
    e.preventDefault(), this._commitDrop();
  }
  _handleMoveSection(e, t) {
    const i = [...this._sectionOrder], s = i.indexOf(e), o = s + t;
    o < 0 || o >= i.length || ([i[s], i[o]] = [i[o], i[s]], this._sectionOrder = i, this.updateComplete.then(() => {
      const a = this.shadowRoot.querySelector(`.sortable-item[data-section="${e}"]`);
      a && (a.classList.remove("dropped"), a.offsetWidth, a.classList.add("dropped"), setTimeout(() => a.classList.remove("dropped"), 1e3));
    }));
  }
  _handleDragEnd(e) {
    e.currentTarget.classList.remove("dragging"), this.shadowRoot.querySelectorAll(".sortable-item").forEach((t) => t.classList.remove("dragging")), this._placeholder && this._placeholder.parentNode && this._placeholder.parentNode.removeChild(this._placeholder), this._placeholder = null, this._dragSrcSection = null, this._dragSrcIndex = -1;
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
  _effectiveLock(e) {
    return !1;
  }
  _isLocked(e) {
    return !1;
  }
  _lk(e) {
    return h;
  }
  // ── Save Settings ──────────────────────────────────────────────────────────
  _handleSaveSettings() {
    this._dispatchDisplaySave(), this._savedConfirm = !0;
  }
  _dispatchDisplaySave() {
    const e = this.employees && this.employees.length > 0 ? this.employees[this._selectedEmployeeIndex] || this.employees[0] : null;
    this.dispatchEvent(new CustomEvent("display-save", {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState(), employee: e, payload: this._lastPrintoutRequest },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Generate ───────────────────────────────────────────────────────────────
  async _handleGenerate(e = !1) {
    var t, i, s, o, a, n, l, p, f, d;
    this._generating = !0, this._statusMsg = "Generating…", this._statusError = !1;
    try {
      const _ = this._buildDisplay(), g = {
        mode: this._mode,
        display: _,
        preview_logo: !0,
        preview_photos: !0,
        font_roboto: !0,
        font_size_delta: F[this._fontSizeIndex].delta,
        photos_per_row: this._photosPerRow,
        section_order: this._sectionOrder,
        watermark: e
      }, u = { ...this._getPayloadData() }, oe = this._profitName != null ? this._profitName : this.profitLabel;
      oe != null && ((t = u.valuation) != null && t.target_profit) && (u.valuation = {
        ...u.valuation,
        target_profit: { ...u.valuation.target_profit, label: oe || "Target Profit" }
      });
      const q = this._disclaimerText != null ? this._disclaimerText : this.disclaimerText ?? null;
      if (q !== null) {
        const m = this._disclaimerPunct ?? ".", y = q ? q.replace(/\.+$/, "") : "";
        u.disclaimer = y ? m + " " + y : "";
      }
      if ((s = (i = u.dealer) == null ? void 0 : i.logo_url) != null && s.startsWith("//") && (u.dealer = { ...u.dealer, logo_url: "https:" + u.dealer.logo_url }), (o = u.employee) != null && o.phone && (u.employee = { ...u.employee, phone: ye(u.employee.phone) }), this.employees && this.employees.length > 0) {
        const m = this.employees[this._selectedEmployeeIndex] || this.employees[0];
        u.employee = { name: m.name || "", phone: ye(m.phone || ""), email: m.email || "" };
      }
      if (u.disclosures && (u.disclosures = u.disclosures.filter((m) => m.answer && m.answer.trim() !== "")), (a = u.market) != null && a.comparables) {
        const m = u.market.comparables.map((b) => ({
          ...b,
          days_on_market: b.listing_type === "delisted" && b.delisted_days || b.days_on_market
        })), y = m.map((b) => b.days_on_market).filter((b) => b != null), v = y.length > 0 ? Math.round(y.reduce((b, x) => b + x, 0) / y.length) : (n = u.market.summary) == null ? void 0 : n.avg_days;
        u.market = {
          ...u.market,
          comparables: m,
          summary: { ...u.market.summary, avg_days: v }
        };
      }
      if (this._taxRatePct !== null && ((l = u.valuation) != null && l.tax_savings) && ((p = u.offer) == null ? void 0 : p.amount) != null) {
        const m = Math.round(u.offer.amount * this._taxRatePct / 100);
        u.valuation = {
          ...u.valuation,
          tax_savings: {
            ...u.valuation.tax_savings,
            rate_pct: this._taxRatePct,
            amount: m,
            gross_value: u.offer.amount + m
          }
        };
      }
      const ae = { ...g, raw_payload: u };
      this._lastPrintoutRequest = { ...ae };
      const re = { "Content-Type": "application/json", Accept: "application/pdf" };
      this.authToken && (re.Authorization = `Bearer ${this.authToken}`);
      const R = await fetch(`${this.apiBaseUrl}/printout-offer`, {
        method: "POST",
        headers: re,
        body: JSON.stringify(ae)
      });
      if (this.apiMode === "binary") {
        if (!R.ok) {
          let v = "Request failed";
          try {
            v = (await R.json()).error || v;
          } catch {
          }
          throw new Error(v);
        }
        const m = await R.blob(), y = await new Promise((v, b) => {
          const x = new FileReader();
          x.onload = () => v(x.result), x.onerror = b, x.readAsDataURL(m);
        });
        this._pdfUrl = y, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: y, blob: m },
          bubbles: !0,
          composed: !0
        }));
      } else {
        let m;
        try {
          m = await R.json();
        } catch {
          throw new Error("Server error — check terminal for traceback");
        }
        if (!R.ok) throw new Error(m.error || "Failed");
        const y = this.apiBaseUrl + m.pdf_url + "?t=" + Date.now();
        this._pdfVehicle = m.vehicle;
        const v = { "ngrok-skip-browser-warning": "true" };
        this.authToken && (v.Authorization = `Bearer ${this.authToken}`);
        const x = await (await fetch(y, { headers: v })).blob(), De = (((f = u.customer) == null ? void 0 : f.name) || "Customer").replace(/[^a-zA-Z0-9 ]/g, "").trim(), Ae = ((d = m.vehicle) == null ? void 0 : d.vin) || "offer";
        this._pdfFilename = `${De}_${Ae}.pdf`;
        const Ce = new File([x], this._pdfFilename, { type: "application/pdf" });
        this._currentBlobUrl && URL.revokeObjectURL(this._currentBlobUrl);
        const ne = URL.createObjectURL(Ce);
        this._currentBlobUrl = ne, this._pdfUrl = ne, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: y },
          bubbles: !0,
          composed: !0
        }));
      }
    } catch (_) {
      this._statusMsg = _.message, this._statusError = !0, this.dispatchEvent(new CustomEvent("offer-error", {
        detail: { error: _.message },
        bubbles: !0,
        composed: !0
      }));
    }
    this._generating = !1;
  }
  async _handleApply() {
    this._savedConfirm = !0, this.templateMode ? (await this._handleGenerate(!1), this._dispatchDisplaySave(), this.dispatchEvent(new CustomEvent("template-save", {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState() },
      bubbles: !0,
      composed: !0
    }))) : (this._finalizing = !0, await this._handleGenerate(!1), this._finalizing = !1, this._finalized = !0, this._dispatchDisplaySave());
  }
  async _handleReopen() {
    this._finalized = !1, await this._handleGenerate();
  }
  async _handleDownloadPdf() {
    var t;
    if (!this._pdfUrl) return;
    const e = this._pdfFilename || `${((t = this._pdfVehicle) == null ? void 0 : t.vin) || "offer"}.pdf`;
    try {
      const i = { "ngrok-skip-browser-warning": "true" };
      this.authToken && (i.Authorization = `Bearer ${this.authToken}`);
      const o = await (await fetch(this._pdfUrl, { headers: i })).blob(), a = URL.createObjectURL(o), n = document.createElement("a");
      n.href = a, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(a), 1e4);
    } catch {
      window.open(this._pdfUrl, "_blank");
    }
  }
  // ── Send ───────────────────────────────────────────────────────────────────
  get _primaryAction() {
    var t;
    if (this._doneSentVia) return null;
    const e = ((t = this.payload) == null ? void 0 : t.customer) || {};
    return this._sendVia ? this._sendVia : e.email ? "email" : null;
  }
  /** The employee an offer is sent "as" — same resolution _handleGenerate uses
   * for payloadData.employee, so the confirm modal shows the actual sender. */
  _resolveEmployee() {
    var e;
    return this.employees && this.employees.length > 0 ? this.employees[this._selectedEmployeeIndex] || this.employees[0] || null : ((e = this.payload) == null ? void 0 : e.employee) || null;
  }
  _handleSend(e, t, i) {
    this._splitOpen = !1, this._doneSentVia = e, this._pdfSent = !0;
    const s = {
      ...this._lastPrintoutRequest,
      filename: this._pdfFilename || null
    };
    console.log("[pdf-send] send_via:", e), console.log("[pdf-send] to_email:", t), console.log("[pdf-send] message_type:", i), console.log("[pdf-send] payload:", s), this.dispatchEvent(new CustomEvent("pdf-send", {
      detail: { send_via: e, to_email: t, message_type: i, payload: s },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderHeader() {
    return c`
      <div class="component-header">
        <div class="wrap">
          <h1>LXN Offer Sheet Generator</h1>
        </div>
      </div>
    `;
  }
  _renderOfferCard() {
    if (this.templateMode)
      return c`
        <div class="card">
          <h2>Template</h2>
          <div style="font-size:13px; color:#667085; line-height:1.6;">
            Configure default printout settings for your location. Generate a preview below.
          </div>
        </div>
      `;
    const e = this._vehicleInfo;
    return c`
      <div class="card">
        <div class="offer-header-row">
          <h2>Offer</h2>
          ${this._renderSendInline()}
        </div>
        ${e ? c`
          <div class="vehicle-info">
            <div class="amount">${e.amount}</div>
            <div class="desc">${e.desc}</div>
            ${e.vin ? c`<div style="font-size:11px;color:#006073;margin-top:2px;">${e.vin}</div>` : h}
          </div>
        ` : c`<div style="font-size:13px; color:#aab4c0;">Loading offer details…</div>`}
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
    const e = this._isOnePage(), t = F[this._fontSizeIndex].label, i = !!(this.templateSharedDisplay || this.templatePdfDisplay), s = i ? "template" : "default", o = i ? "template defaults" : "default configuration", a = D.map((n) => this._renderShowHideGroup(n));
    return c`
      <div class="card">
        <div>
        <div class="customize-header-row">
          <h2>Customize</h2>
          <div class="ctrl-group ${this._isLocked("mode") ? "locked" : ""}">
            <div class="segmented-control" style="width:auto;">
              <button
                class="seg-btn ${this._mode === "full" ? "active" : ""}"
                ?disabled="${this._isLocked("mode")}"
                @click="${() => this._handleModeChange("full")}"
              >Full</button>
              <button
                class="seg-btn ${e ? "active" : ""}"
                ?disabled="${this._isLocked("mode")}"
                @click="${() => this._handleModeChange("one_page")}"
                @mouseenter="${(n) => this._showTooltip(n, "Current display is restored when returning to 'Full'")}"
                @mouseleave="${() => this._hideTooltip()}"
              >One-Page</button>
            </div>
            ${this._lk("mode")}
          </div>
        </div>

        <!-- General -->
        <div class="collapsible-section ${this._generalOpen ? "" : "collapsed"}">
          <div class="section-header" @click="${() => {
      this._generalOpen = !this._generalOpen;
    }}">
            <span>General</span>
            <div class="section-chevron">${Q}</div>
          </div>
          <div class="section-body">
            <div class="config-row">
              <span>$ Amount (header)</span>
              <div class="ctrl-group ${this._isLocked("value_display") ? "locked" : ""}">
                <div class="segmented-control">
                  <button
                    class="seg-btn ${this._valueDisplay === "offer" ? "active" : ""}"
                    ?disabled="${this._isLocked("value_display")}"
                    @click="${() => this._handleSegmentedClick("value-display", "offer")}"
                  >Offer</button>
                  <button
                    class="seg-btn ${this._valueDisplay === "tax_savings" ? "active" : ""}"
                    ?disabled="${this._isLocked("value_display")}"
                    @click="${() => this._handleSegmentedClick("value-display", "tax_savings")}"
                  >Tax Savings</button>
                </div>
                ${this._lk("value_display")}
              </div>
            </div>
            <div class="config-row">
              <span>Tax Savings Rate</span>
              <div class="ctrl-group ${this._isLocked("tax_rate_pct") ? "locked" : ""}">
                <div class="tax-rate-wrapper">
                  <input
                    type="number"
                    class="tax-rate-input"
                    .value="${this._taxRatePct ?? ""}"
                    min="0"
                    max="99"
                    step="0.01"
                    ?disabled="${this._isLocked("tax_rate_pct")}"
                    @input="${this._handleTaxRateInput}"
                  />
                  <span class="tax-rate-suffix">%</span>
                </div>
                ${this._lk("tax_rate_pct")}
              </div>
            </div>
            <div class="config-row">
              <span>Profit label</span>
              <div class="ctrl-group ${this._isLocked("profit_label") ? "locked" : ""}">
                <input
                  type="text"
                  style="font-size:12px;padding:4px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;width:110px;"
                  placeholder="Target Profit"
                  .value="${this._profitName ?? ""}"
                  ?disabled="${this._isLocked("profit_label")}"
                  @input="${this._handleProfitNameInput}"
                />
                ${this._lk("profit_label")}
              </div>
            </div>
            ${!this.templateMode && this.employees && this.employees.length > 0 ? c`
              <div class="config-row">
                <span>Employee</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(n) => {
      this._selectedEmployeeIndex = parseInt(n.target.value);
    }}"
                >
                  ${this.employees.map((n, l) => c`
                    <option value="${l}" ?selected="${l === this._selectedEmployeeIndex}">${n.name}</option>
                  `)}
                </select>
              </div>
            ` : h}
            <div class="config-row">
              <span>Font size</span>
              <div class="ctrl-group ${this._isLocked("font_size") ? "locked" : ""}">
                <div class="stepper">
                  <button class="step-btn" ?disabled="${this._fontSizeIndex <= 0 || this._isLocked("font_size")}"
                          @click="${() => this._handleFontSizeStep(-1)}">−</button>
                  <span class="stepper-value font-size-display">${t}</span>
                  <button class="step-btn" ?disabled="${this._fontSizeIndex >= F.length - 1 || this._isLocked("font_size")}"
                          @click="${() => this._handleFontSizeStep(1)}">+</button>
                </div>
                ${this._lk("font_size")}
              </div>
            </div>
            <div class="config-row">
              <span>Photos (per row)</span>
              <div class="ctrl-group ${this._isLocked("photos_per_row") ? "locked" : ""}">
                <div class="stepper">
                  <button class="step-btn" ?disabled="${this._photosPerRow <= 2 || this._isLocked("photos_per_row")}"
                          @click="${() => this._handlePhotosPerRowStep(-1)}">−</button>
                  <span class="stepper-value">${this._photosPerRow}</span>
                  <button class="step-btn" ?disabled="${this._photosPerRow >= 4 || this._isLocked("photos_per_row")}"
                          @click="${() => this._handlePhotosPerRowStep(1)}">+</button>
                </div>
                ${this._lk("photos_per_row")}
              </div>
            </div>
            <div class="config-row">
              <span>Disclosures</span>
              <div class="ctrl-group ${this._isLocked("disc_layout") ? "locked" : ""}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._discLayout === "vertical" ? "active" : ""}"
                          ?disabled="${this._isLocked("disc_layout")}"
                          @click="${() => this._handleSegmentedClick("disc-layout", "vertical")}">Vertical</button>
                  <button class="seg-btn ${this._discLayout === "horizontal" ? "active" : ""}"
                          ?disabled="${this._isLocked("disc_layout")}"
                          @click="${() => this._handleSegmentedClick("disc-layout", "horizontal")}">Horizontal</button>
                </div>
                ${this._lk("disc_layout")}
              </div>
            </div>
            <div class="config-row">
              <span>Market</span>
              <div class="ctrl-group ${this._isLocked("market_display") ? "locked" : ""}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._marketDisplay === "summary" ? "active" : ""}"
                          ?disabled="${this._isLocked("market_display")}"
                          @click="${() => this._handleSegmentedClick("market-display", "summary")}">Summary</button>
                  <button class="seg-btn ${this._marketDisplay === "full" ? "active" : ""}"
                          ?disabled="${this._isLocked("market_display")}"
                          @click="${() => this._handleSegmentedClick("market-display", "full")}">Full</button>
                </div>
                ${this._lk("market_display")}
              </div>
            </div>
            <div class="config-row">
              <span>Scenarios</span>
              <div class="ctrl-group ${this._isLocked("scenario_layout") ? "locked" : ""}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._scenarioLayout === "tiles" ? "active" : ""}"
                          ?disabled="${this._isLocked("scenario_layout")}"
                          @click="${() => this._handleSegmentedClick("scenario-layout", "tiles")}">Tiles</button>
                  <button class="seg-btn ${this._scenarioLayout === "rows" ? "active" : ""}"
                          ?disabled="${this._isLocked("scenario_layout")}"
                          @click="${() => this._handleSegmentedClick("scenario-layout", "rows")}">Rows</button>
                </div>
                ${this._lk("scenario_layout")}
              </div>
            </div>
            <div style="padding:8px 0 4px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <span style="font-size:12px;color:#222222;">Disclaimer (appended to footer)</span>
                ${this._lk("disclaimer")}
              </div>
              <div class="config-row ${this._isLocked("disclaimer") ? "disabled" : ""}" style="margin-bottom:6px;padding-left:16px;">
                <span>Separator</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  ?disabled="${this._isLocked("disclaimer")}"
                  @change="${(n) => {
      this._disclaimerPunct = n.target.value;
    }}"
                >
                  <option value="," ?selected="${this._disclaimerPunct === ","}">Comma (,)</option>
                  <option value="." ?selected="${this._disclaimerPunct === "."}">Period (.)</option>
                  <option value="" ?selected="${this._disclaimerPunct === ""}">None</option>
                </select>
              </div>
              <textarea
                style="width:calc(100% - 16px);font-size:12px;padding:6px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;resize:vertical;min-height:60px;font-family:inherit;line-height:1.4;margin-left:16px;${this._isLocked("disclaimer") ? "opacity:0.5;pointer-events:none;" : ""}"
                placeholder="e.g., subject to Carfax History and Lien report."
                .value="${this._disclaimerText ?? ""}"
                ?disabled="${this._isLocked("disclaimer")}"
                @input="${this._handleDisclaimerInput}"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="divider" style="margin:12px 0;"></div>

        <!-- Show / Hide -->
        <div class="collapsible-section ${this._showHideOpen ? "" : "collapsed"}">
          <div class="section-header" @click="${() => {
      this._showHideOpen = !this._showHideOpen;
    }}">
            <span>Show / Hide</span>
            <div class="section-chevron">${Q}</div>
          </div>
          <div class="section-body">
            <!-- Header group (no checkbox) -->
            <div class="toggle-group">
              <div class="group-row">
                <label style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#222222;cursor:default;">Header</label>
                ${this._lk("condition")}
              </div>
              <div class="pill-group ${this._isLocked("condition") ? "locked" : ""}">
                <span
                  class="pill ${this._pills["general.condition"] ? "active" : ""}"
                  @click="${() => this._handlePillClick("general.condition", null)}"
                >Condition</span>
              </div>
            </div>
            <!-- Section groups in layout order -->
            ${a}
            <!-- Signature (always at end of PDF, not draggable) -->
            <div class="toggle-group" data-group="signature">
              <div class="group-row ${this._isLocked("signature") ? "group-row-locked" : ""}">
                <label class="group-header">
                  <input
                    type="checkbox"
                    data-group="signature"
                    .checked="${this._groups.signature === "checked"}"
                    ?disabled="${this._isLocked("signature")}"
                    @change="${(n) => this._handleGroupChange("signature", n.target.checked)}"
                  >
                  Customer Signature
                </label>
                ${this._lk("signature")}
              </div>
            </div>
          </div>
        </div>

        <div class="divider" style="margin:12px 0;"></div>

        <!-- Layout -->
        <div class="collapsible-section ${this._layoutOpen ? "" : "collapsed"}">
          <div class="section-header" @click="${() => {
      this._layoutOpen = !this._layoutOpen;
    }}">
            <span>Layout</span>
            <div style="display:flex;align-items:center;gap:6px;">
              ${this._lk("section_order")}
              <div class="section-chevron">${Q}</div>
            </div>
          </div>
          <div class="section-body">
            <div class="sortable-list ${this._isLocked("section_order") ? "disabled" : ""}"
              @dragover="${(n) => n.preventDefault()}"
              @drop="${(n) => this._handleListDrop(n)}"
            >
              ${this._sectionOrder.map((n, l) => {
      const p = this._isSectionDisabled(n) || this._isLocked("section_order");
      return c`
                  <div
                    class="sortable-item ${p ? "disabled" : ""}"
                    data-section="${n}"
                    draggable="${p ? "false" : "true"}"
                    @dragstart="${(f) => this._handleDragStart(f, n)}"
                    @dragover="${(f) => this._handleDragOver(f, n)}"
                    @drop="${(f) => this._handleDrop(f)}"
                    @dragend="${(f) => this._handleDragEnd(f)}"
                  >
                    <span class="drag-handle">⠿</span>
                    <span>${et[n]}</span>
                    <div class="sort-arrows">
                      <button class="sort-arrow" ?disabled="${p || l === 0}" @click="${() => this._handleMoveSection(n, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${p || l === this._sectionOrder.length - 1}" @click="${() => this._handleMoveSection(n, 1)}">▼</button>
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>
        </div>

        </div><!-- end settings-locked wrapper -->

        <div class="divider"></div>

        ${this._statusError && this._statusMsg ? c`
          <div class="action-msg error">${this._statusMsg}</div>
        ` : h}

        ${this.templateMode ? c`
          <button
            class="btn btn-green"
            ?disabled="${this._generating || this._finalizing}"
            @click="${() => this._handleApply()}"
          >${this._generating ? "Saving…" : this._savedConfirm ? "Saved ✓" : "Save Template"}</button>
        ` : h}

        ${this.templateMode ? h : c`
          <div class="action-btns">
            <div class="apply-btn-wrap">
              <button
                class="apply-main"
                ?disabled="${!this._previewStale || this._generating || this._finalizing}"
                @click="${() => this._handleApply()}"
              >${this._generating || this._finalizing ? "Applying…" : "Apply Changes"}</button>
              <button
                class="discard-btn"
                ?disabled="${!this._previewStale || this._generating || this._finalizing}"
                @click="${() => this._handleDiscardChanges()}"
              >Discard Changes</button>
            </div>
            ${this.sharedDisplay || this.pdfDisplay ? this._confirmReset ? c`
              <div class="confirm-reset">
                <span class="confirm-reset-msg">Reset all settings to the ${o}?</span>
                <div class="confirm-reset-btns">
                  <button class="confirm-reset-yes" @click="${() => this._handleReset()}">Yes, reset</button>
                  <button class="confirm-reset-no"  @click="${() => {
      this._confirmReset = !1;
    }}">Cancel</button>
                </div>
              </div>
            ` : c`
              <button class="reset-btn" @click="${() => {
      this._confirmReset = !0;
    }}">Reset to ${s}</button>
            ` : h}
          </div>
        `}
      </div>
    `;
  }
  _renderShowHideGroup(e) {
    if (e === "market_scenarios") return this._renderScenarioGroup("market_scenarios", "Market Scenarios", "Market");
    if (e === "selected_scenarios") return this._renderScenarioGroup("selected_scenarios", "Selected Scenarios", "Selected");
    const t = this._isLocked(e), i = this._groups[e], o = c`
      <div class="group-row ${t ? "group-row-locked" : ""}">
        <label class="group-header">
          <input type="checkbox" data-group="${e}"
            .checked="${i === "checked" || i === "indeterminate"}"
            ?disabled="${t}"
            @change="${(a) => this._handleGroupChange(e, a.target.checked)}"
          >${{ valuation: "Valuation", disclosures: "Disclosures", observations: "Observations", market: "Market Comparables", recon: "Recon", photos: "Photos" }[e]}
        </label>
        ${this._lk(e)}
      </div>`;
    if (e === "valuation") {
      const a = !!this._pillsOpen.valuation;
      return c`
        <div class="toggle-group" data-group="valuation">
          ${o}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${a ? c`
              ${this._renderPill("valuation.retail_value", "Retail Value", "valuation")}
              ${this._renderPill("valuation.recon", "Recon", "valuation")}
              ${this._renderPill("valuation.fixed_overhead", "Fixed Overhead", "valuation")}
              ${this._renderPill("valuation.target_profit", this._profitName || "Target Profit", "valuation")}
              ${this._renderPill("valuation.tax_savings", "Tax Savings", "valuation")}
            ` : h}
            ${this._renderPillsToggle("valuation")}
          </div>
        </div>`;
    }
    return e === "observations" ? c`
        <div class="toggle-group" data-group="observations">
          ${o}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${this._renderPill("sections.observations_highlights", "Highlights", "observations")}
            ${this._renderPill("sections.observations_comments", "Comments", "observations")}
          </div>
        </div>` : c`
      <div class="toggle-group" data-group="${e}">
        ${o}
      </div>`;
  }
  /** Pill keys for a toggle-able group — same lists as _recomputeGroupState. */
  _pillKeysForGroup(e) {
    return e === "valuation" ? ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"] : e === "observations" ? ["sections.observations_highlights", "sections.observations_comments"] : e === "market_scenarios" || e === "selected_scenarios" ? A.map((t) => `${e}.${t.key}`) : [];
  }
  /** Independent toggle — not nested under Market Comparables, not part of the
   * draggable section order (mirrors how Signature is handled). Each of the 12
   * KPI fields gets its own pill, same idiom as Valuation/Observations. */
  _renderPillsToggle(e) {
    const t = !!this._pillsOpen[e], i = this._pillKeysForGroup(e), s = i.filter((a) => !this._isPillLockedStale(a) && this._pills[a]).length, o = i.length;
    return c`
      <span
        class="pill-toggle"
        title="${t ? "Collapse fields" : "Expand fields"}"
        @click="${() => this._togglePillsOpen(e)}"
      >${t ? "‹ Collapse" : `Expand (${s}/${o}) ›`}</span>
    `;
  }
  _renderScenarioGroup(e, t, i) {
    const s = this._isLocked(e), o = this._groups[e], a = o === "checked" || o === "indeterminate", n = !!this._pillsOpen[e];
    return c`
      <div class="toggle-group" data-group="${e}">
        <div class="group-row ${s ? "group-row-locked" : ""}">
          <label class="group-header">
            <input type="checkbox" data-group="${e}"
              .checked="${a}"
              ?disabled="${s}"
              @change="${(l) => this._handleGroupChange(e, l.target.checked)}"
            >${t}
          </label>
          ${this._lk(e)}
        </div>
        <div class="pill-group ${s ? "locked" : ""} ${o === "unchecked" ? "group-off" : ""}">
          ${n ? A.map((l) => this._renderPill(`${e}.${l.key}`, l.label.replace("{basis}", i), e)) : h}
          ${this._renderPillsToggle(e)}
        </div>
      </div>`;
  }
  /** Lazily builds the shared tooltip node — see the constructor comment for
   * why this lives in document.body instead of a Lit template. Visuals match
   * Bubble's Tippy.js output (.tippy-box/.tippy-content/.tippy-arrow)
   * pixel-for-pixel; positioning + the rise-in animation are done by hand
   * here since Tippy itself drives those via Popper + its own JS, not CSS.
   * One reused node for every tooltip in this component (stale pills, the
   * preview status dot, ...) — text and position update per show() call. */
  _ensureTooltip() {
    if (this._tooltipEl) return this._tooltipEl;
    const e = document.createElement("div");
    Object.assign(e.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
      transform: "translate(-50%, -100%)",
      zIndex: "2147483647",
      pointerEvents: "none"
    });
    const t = document.createElement("div");
    Object.assign(t.style, {
      position: "relative",
      boxSizing: "content-box",
      background: "#333",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "14px",
      lineHeight: "1.4",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      whiteSpace: "normal",
      textAlign: "center",
      padding: "8px",
      maxWidth: "240px",
      opacity: "0"
    });
    const i = document.createElement("span");
    t.appendChild(i);
    const s = document.createElement("div");
    return Object.assign(s.style, {
      position: "absolute",
      // Overlaps the bubble by 1px instead of sitting flush at 100% —
      // two adjacent elements meeting at an exact sub-pixel boundary can
      // render with a hairline gap between them once the bubble is
      // animating (transform/opacity commonly promotes it to its own
      // compositor layer), so nudge the arrow up into the body to
      // guarantee no seam regardless of sub-pixel rounding.
      top: "calc(100% - 1px)",
      left: "50%",
      transform: "translateX(-50%)",
      width: "0",
      height: "0",
      borderStyle: "solid",
      borderWidth: "8px 8px 0",
      borderColor: "#333 transparent transparent transparent"
    }), t.appendChild(s), e.appendChild(t), document.body.appendChild(e), this._tooltipEl = e, this._tooltipBubble = t, this._tooltipLabel = i, e;
  }
  _showTooltip(e, t) {
    const i = this._ensureTooltip(), s = this._tooltipBubble, o = this._tooltipLabel, a = e.currentTarget.getBoundingClientRect();
    s.style.width = "", o.textContent = t;
    const n = document.createRange();
    n.selectNodeContents(o);
    const l = Array.from(n.getClientRects(), (p) => p.width);
    s.style.width = `${Math.ceil(Math.max(...l))}px`, i.style.top = `${a.top - 10}px`, i.style.left = `${a.left + a.width / 2}px`, s.getAnimations().forEach((p) => p.cancel()), s.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 160, easing: "ease-out", fill: "forwards" }
    );
  }
  _hideTooltip() {
    const e = this._tooltipBubble;
    e && (e.getAnimations().forEach((t) => t.cancel()), e.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(6px)" }
      ],
      { duration: 160, easing: "ease-in", fill: "forwards" }
    ));
  }
  _renderPill(e, t, i) {
    const s = this._isPillLockedStale(e), o = !s && this._pills[e], a = "Not available: Offer has been adjusted manually";
    return c`
      <span
        class="pill ${o ? "active" : ""} ${s ? "stale" : ""}"
        @mouseenter="${(n) => {
      s && this._showTooltip(n, a);
    }}"
        @mouseleave="${() => {
      s && this._hideTooltip();
    }}"
        @click="${() => {
      s || this._handlePillClick(e, i);
    }}"
      >${s ? c`<span class="pill-stale-icon">${it}</span>` : h}${t}</span>
    `;
  }
  _renderSendInline() {
    var o;
    const e = this._resolveEmployee(), t = !!((o = this.payload) != null && o.customer) || !!(e != null && e.email), i = !!this._pdfUrl && !this._generating;
    return t ? c`
      <button
        class="email-icon-btn"
        ?disabled="${!i}"
        @click="${() => {
      this._confirmSendEmail = !0, this._sendMessageType = null, this._manualCustomerEmail = "";
    }}"
      >${tt}</button>
      ${this._confirmSendEmail ? this._renderSendConfirmModal() : h}
    ` : h;
  }
  _renderSendConfirmModal() {
    var p, f;
    const e = this._resolveEmployee(), t = ((f = (p = this.payload) == null ? void 0 : p.customer) == null ? void 0 : f.email) || "", i = (e == null ? void 0 : e.email) || "", s = (e == null ? void 0 : e.name) || "an unspecified employee", o = this._sendMessageType || (t ? "customer" : i ? "employee" : "customer"), a = o === "customer" && !t, n = o === "employee" ? i : t || this._manualCustomerEmail.trim(), l = !!n;
    return c`
      <div class="modal-overlay" @click="${() => {
      this._confirmSendEmail = !1;
    }}">
        <div class="modal-box" @click="${(d) => d.stopPropagation()}">
          <p class="modal-msg">
            Send this offer as an offer made by <strong>${s}</strong>?
          </p>

          <div class="modal-recipient-group">
            <label class="modal-recipient-option">
              <input
                type="radio"
                name="send-recipient"
                .checked="${o === "customer"}"
                @change="${() => {
      this._sendMessageType = "customer";
    }}"
              />
              <span>Customer's inbox${t ? c` — ${t}` : h}</span>
            </label>
            ${i ? c`
              <label class="modal-recipient-option">
                <input
                  type="radio"
                  name="send-recipient"
                  .checked="${o === "employee"}"
                  @change="${() => {
      this._sendMessageType = "employee";
    }}"
                />
                <span>Employee's inbox — ${i}</span>
              </label>
            ` : h}
          </div>

          ${a ? c`
            <input
              type="email"
              class="modal-email-input"
              placeholder="Customer email address"
              .value="${this._manualCustomerEmail}"
              @input="${(d) => {
      this._manualCustomerEmail = d.target.value;
    }}"
            />
          ` : h}

          <div class="modal-btns">
            <button class="modal-btn-confirm"
              ?disabled="${!l}"
              @click="${() => {
      this._confirmSendEmail = !1, this._handleSend("email", n, o);
    }}"
            >Yes, send</button>
            <button class="modal-btn-cancel" @click="${() => {
      this._confirmSendEmail = !1;
    }}">Cancel</button>
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
  _renderPreviewPane() {
    const e = !!this._pdfUrl, t = this._generating || this._finalizing, i = t || !!this.apiBaseUrl && !e && !this._statusError, o = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && navigator.pdfViewerEnabled;
    return c`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <div
              class="preview-title-group"
              @mouseenter="${(a) => this._showTooltip(a, this._previewStale ? "Unapplied changes" : "Up to date")}"
              @mouseleave="${() => this._hideTooltip()}"
            >
              <h2>${o ? "Preview" : "PDF"}</h2>
              <span class="preview-status-dot ${this._previewStale ? "stale" : ""}"></span>
            </div>
            ${!this.templateMode && e && !t && o ? c`
              <em style="font-size:13px;color:#667085;">Download PDF via toolbar below</em>
            ` : h}
          </div>
          ${i ? c`
            <div class="preview-loading">
              <div class="pulse-dots">
                <span></span><span></span><span></span>
              </div>
              Generating preview…
            </div>
          ` : h}
          ${!i && !e ? c`
            <div class="empty-preview">${this._statusError && this._statusMsg ? this._statusMsg : "Preview will appear once a payload is loaded"}</div>
          ` : h}
          ${e && !t && o ? c`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : h}
          ${e && !t && !o ? c`
            <div style="width:100%;aspect-ratio:612/792;display:flex;align-items:center;justify-content:center;padding:20px;border:2px solid #d0d5dd;border-radius:8px;">
              ${window.natively ? c`
                <button
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;"
                  @click="${() => window.natively.openPDF({ base64: this._pdfUrl.split(",")[1], fileName: "offer.pdf", download: !0 }, () => {
    })}"
                >Open PDF</button>
              ` : c`
                <a
                  href="${this._pdfUrl}"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;text-decoration:none;"
                >Open PDF</a>
              `}
            </div>
          ` : h}
        </div>
      </div>
    `;
  }
  // ── Main render ────────────────────────────────────────────────────────────
  render() {
    return c`
      <div class="shell">
        ${this._renderHeader()}
        <main @click="${() => {
      this._splitOpen && (this._splitOpen = !1);
    }}">
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
K(ee, "properties", {
  // Public attributes
  apiBaseUrl: { type: String, attribute: "api-base-url" },
  apiMode: { type: String, attribute: "api-mode" },
  authToken: { type: String, attribute: "auth-token" },
  templateMode: { type: Boolean, attribute: "template-mode" },
  taxRate: { type: Number, attribute: "tax-rate" },
  profitLabel: { type: String, attribute: "profit-label" },
  disclaimerText: { type: String, attribute: "disclaimer-text" },
  // Public properties (settable from Bubble JS)
  payload: { type: Object },
  sharedDisplay: { type: Object },
  pdfDisplay: { type: Object },
  templateSharedDisplay: { type: Object },
  templatePdfDisplay: { type: Object },
  employees: { type: Array },
  locked: { type: Boolean },
  _selectedEmployeeIndex: { type: Number, state: !0 },
  // Internal reactive state
  _vehicleInfo: { type: Object, state: !0 },
  _generalOpen: { type: Boolean, state: !0 },
  _layoutOpen: { type: Boolean, state: !0 },
  _showHideOpen: { type: Boolean, state: !0 },
  _mode: { type: String, state: !0 },
  // 'full' | 'one_page'
  _valueDisplay: { type: String, state: !0 },
  // 'offer' | 'tax_savings'
  _taxRatePct: { type: Number, state: !0 },
  // tax savings rate as % (e.g. 12 for 12%)
  _profitName: { type: String, state: !0 },
  // target profit label override
  _disclaimerText: { type: String, state: !0 },
  // footer disclaimer text override
  _disclaimerPunct: { type: String, state: !0 },
  // punctuation prepended to disclaimer ('.' | ',' | '')
  _fontSizeIndex: { type: Number, state: !0 },
  _photosPerRow: { type: Number, state: !0 },
  _discLayout: { type: String, state: !0 },
  // 'vertical' | 'horizontal'
  _marketDisplay: { type: String, state: !0 },
  // 'summary' | 'full'
  _scenarioLayout: { type: String, state: !0 },
  // 'tiles' | 'rows'
  _sectionOrder: { type: Array, state: !0 },
  // Show/Hide pill state — flat object of path → bool
  _pills: { type: Object, state: !0 },
  // Group checkbox state: 'checked' | 'indeterminate' | 'unchecked'
  _groups: { type: Object, state: !0 },
  // Pill-row expand/collapse, per group — { valuation: bool, market_scenarios: bool, selected_scenarios: bool }
  _pillsOpen: { type: Object, state: !0 },
  _finalized: { type: Boolean, state: !0 },
  _generating: { type: Boolean, state: !0 },
  _finalizing: { type: Boolean, state: !0 },
  _statusMsg: { type: String, state: !0 },
  _statusError: { type: Boolean, state: !0 },
  _pdfUrl: { type: String, state: !0 },
  _pdfVehicle: { type: Object, state: !0 },
  _savedConfirm: { type: Boolean, state: !0 },
  _confirmReset: { type: Boolean, state: !0 },
  _locks: { type: Object, state: !0 },
  // Send UI
  _splitOpen: { type: Boolean, state: !0 },
  _sendVia: { type: String, state: !0 },
  _doneSentVia: { type: String, state: !0 },
  _pdfSent: { type: Boolean, state: !0 },
  _confirmSendEmail: { type: Boolean, state: !0 },
  _sendMessageType: { type: String, state: !0 },
  _manualCustomerEmail: { type: String, state: !0 },
  _previewStale: { type: Boolean, state: !0 }
}), K(ee, "styles", ze`
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
    .modal-recipient-option input[type="radio"] { cursor: pointer; }
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
    .modal-btn-cancel {
      flex: 1; padding: 9px; background: transparent; color: #344054;
      border: 1px solid #d0d5dd; border-radius: 6px; font-size: 13px; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .modal-btn-cancel:hover { background: #f2f4f7; }

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
       inline in _ensureTooltip(), appended straight to document.body so it
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
    /* Group checkbox off but chips keep their own state underneath (see
       _handleGroupChange) — dim + freeze them rather than clearing them, so
       re-checking the box shows exactly what was selected before. */
    .pill-group.group-off { opacity: 0.45; pointer-events: none; }

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

    /* Matches the unselected/greyed segment look of .seg-btn (Full/One-Page
       etc.) — deliberately not the teal .seg-btn.active treatment. */
    .email-icon-btn {
      display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
      padding: 0; background: transparent; border: none;
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
  `);
customElements.define("lexen-offer-sheet", ee);
export {
  ee as LexenOfferSheet
};
