var Ee = Object.defineProperty;
var Ce = (a, e, t) => e in a ? Ee(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var q = (a, e, t) => Ce(a, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, ee = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let be = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (a) => new be(typeof a == "string" ? a : a + "", void 0, te), Re = (a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[o + 1], a[0]);
  return new be(t, a, te);
}, ze = (a, e) => {
  if (ee) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = F.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, a.appendChild(i);
  }
}, ne = ee ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Oe(t);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: Me, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: Ue, getOwnPropertySymbols: Le, getPrototypeOf: Ie } = Object, w = globalThis, le = w.trustedTypes, Be = le ? le.emptyScript : "", W = w.reactiveElementPolyfillSupport, T = (a, e) => a, Y = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? Be : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, e) {
  let t = a;
  switch (e) {
    case Boolean:
      t = a !== null;
      break;
    case Number:
      t = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(a);
      } catch {
        t = null;
      }
  }
  return t;
} }, ye = (a, e) => !Te(a, e), de = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: ye };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Me(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Ne(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: s, set(r) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = Ie(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, i = [...Ue(t), ...Le(t)];
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
      for (const s of i) t.unshift(ne(s));
    } else e !== void 0 && t.push(ne(e));
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
    return ze(e, this.constructor.elementStyles), e;
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
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Y).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Y;
      this._$Em = s;
      const c = n.fromAttribute(t, l.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var r;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? ye)(o, t) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: l } = r, n = this[o];
        l !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, r, n);
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[T("elementProperties")] = /* @__PURE__ */ new Map(), E[T("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: E }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ce = (a) => a, V = M.trustedTypes, pe = V ? V.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, xe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + $, He = `<${$e}>`, A = document, U = () => A.createComment(""), L = (a) => a === null || typeof a != "object" && typeof a != "function", ie = Array.isArray, Fe = (a) => ie(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ue = />/g, k = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, ge = /"/g, we = /^(?:script|style|textarea|title)$/i, Ve = (a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), h = Ve(1), C = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), S = A.createTreeWalker(A, 129);
function ke(a, e) {
  if (!ie(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pe !== void 0 ? pe.createHTML(e) : e;
}
const je = (a, e) => {
  const t = a.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = z;
  for (let l = 0; l < t; l++) {
    const n = a[l];
    let c, u, p = -1, m = 0;
    for (; m < n.length && (r.lastIndex = m, u = r.exec(n), u !== null); ) m = r.lastIndex, r === z ? u[1] === "!--" ? r = he : u[1] !== void 0 ? r = ue : u[2] !== void 0 ? (we.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = k) : u[3] !== void 0 && (r = k) : r === k ? u[0] === ">" ? (r = s ?? z, p = -1) : u[1] === void 0 ? p = -2 : (p = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? k : u[3] === '"' ? ge : fe) : r === ge || r === fe ? r = k : r === he || r === ue ? r = z : (r = k, s = void 0);
    const b = r === k && a[l + 1].startsWith("/>") ? " " : "";
    o += r === z ? n + He : p >= 0 ? (i.push(c), n.slice(0, p) + xe + n.slice(p) + $ + b) : n + $ + (p === -2 ? l : b);
  }
  return [ke(a, o + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = e.length - 1, n = this.parts, [c, u] = je(e, t);
    if (this.el = I.createElement(c, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = S.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(xe)) {
          const m = u[r++], b = s.getAttribute(p).split($), d = /([.?@])?(.*)/.exec(m);
          n.push({ type: 1, index: o, name: d[2], strings: b, ctor: d[1] === "." ? qe : d[1] === "?" ? We : d[1] === "@" ? Ke : j }), s.removeAttribute(p);
        } else p.startsWith($) && (n.push({ type: 6, index: o }), s.removeAttribute(p));
        if (we.test(s.tagName)) {
          const p = s.textContent.split($), m = p.length - 1;
          if (m > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let b = 0; b < m; b++) s.append(p[b], U()), S.nextNode(), n.push({ type: 2, index: ++o });
            s.append(p[m], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $e) n.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf($, p + 1)) !== -1; ) n.push({ type: 7, index: o }), p += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = A.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(a, e, t = a, i) {
  var r, l;
  if (e === C) return e;
  let s = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const o = L(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(a), s._$AT(a, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = O(a, s._$AS(a, e.values), s, i)), e;
}
class Ge {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    S.currentNode = s;
    let o = S.nextNode(), r = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (r === n.index) {
        let c;
        n.type === 2 ? c = new B(o, o.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (c = new Ze(o, this, e)), this._$AV.push(c), n = i[++l];
      }
      r !== (n == null ? void 0 : n.index) && (o = S.nextNode(), r++);
    }
    return S.currentNode = A, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class B {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = O(this, e, t), L(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && L(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const r = new Ge(s, this), l = r.u(this.options);
      r.p(t), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = _e.get(e.strings);
    return t === void 0 && _e.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new B(this.O(U()), this.O(U()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = ce(e).nextSibling;
      ce(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = O(this, e, t, 0), r = !L(e) || e !== this._$AH && e !== C, r && (this._$AH = e);
    else {
      const l = e;
      let n, c;
      for (e = o[0], n = 0; n < o.length - 1; n++) c = O(this, l[i + n], t, n), c === C && (c = this._$AH[n]), r || (r = !L(c) || c !== this._$AH[n]), c === f ? e = f : e !== f && (e += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class qe extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class We extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Ke extends j {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? f) === C) return;
    const i = this._$AH, s = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ze {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const Z = M.litHtmlPolyfillSupport;
Z == null || Z(I, B), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Je = (a, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new B(e.insertBefore(U(), o), o, void 0, t ?? {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class N extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Je(t, this.renderRoot, this.renderOptions);
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
    return C;
  }
}
var ve;
N._$litElement$ = !0, N.finalized = !0, (ve = P.litElementHydrateSupport) == null || ve.call(P, { LitElement: N });
const J = P.litElementPolyfillSupport;
J == null || J({ LitElement: N });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
function me(a) {
  const e = String(a || "").replace(/\D/g, "");
  return e.length === 10 ? `(${e.slice(0, 3)}) ${e.slice(3, 6)}-${e.slice(6)}` : e.length === 11 && e[0] === "1" ? `(${e.slice(1, 4)}) ${e.slice(4, 7)}-${e.slice(7)}` : a || "";
}
function Qe() {
  const a = /* @__PURE__ */ new Date(), e = new Date(a);
  e.setDate(a.getDate() + 30);
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
      appraisal_date: t(a),
      classification: "Good Condition"
    },
    valuation: {
      retail_value: 32e3,
      recon_total: 3500,
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
      highlights: [
        { description: "Upgraded alloy wheels", amount: 500 },
        { description: "New tires", amount: 750 }
      ],
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
    recon: {
      items: [
        { description: "Recon Item #1", amount: 1e3 },
        { description: "Recon Item #2", amount: 1e3 },
        { description: "Recon Item #3", amount: 500 }
      ],
      damages: [
        { description: "Front bumper scratch", amount: 350 },
        { description: "Windshield chip", amount: 150 }
      ],
      total: 3500
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
const H = [
  { label: "Extra Small", delta: -1 },
  { label: "Small", delta: 0 },
  { label: "Medium", delta: 1 },
  { label: "Large", delta: 2 },
  { label: "Extra Large", delta: 3 }
], D = ["valuation", "disclosures", "observations", "market", "recon", "photos"], Ye = {
  valuation: "Valuation",
  disclosures: "Disclosures",
  observations: "Observations",
  market: "Market",
  recon: "Recon",
  photos: "Photos"
}, Q = h`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
class X extends N {
  constructor() {
    super(), this.apiBaseUrl = "", this.apiMode = "url", this.authToken = "", this.templateMode = !1, this.payload = null, this.defaultDisplay = null, this.employees = [], this._selectedEmployeeIndex = 0, this._vehicleInfo = null, this._generalOpen = !1, this._layoutOpen = !1, this._showHideOpen = !1, this._mode = "full", this._valueDisplay = "offer", this._taxRatePct = null, this._profitName = null, this._disclaimerText = null, this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...D], this._pills = {
      "general.condition": !0,
      "valuation.retail_value": !0,
      "valuation.recon": !0,
      "valuation.fixed_overhead": !0,
      "valuation.target_profit": !0,
      "valuation.tax_savings": !0,
      "sections.observations_highlights": !0,
      "sections.observations_comments": !0
    }, this._groups = {
      valuation: "checked",
      disclosures: "checked",
      observations: "checked",
      market: "checked",
      recon: "checked",
      photos: "checked",
      signature: "checked"
    }, this._finalized = !1, this._autoPreviewDone = !1, this._autoPreviewTimer = null, this._generating = !1, this._finalizing = !1, this._statusMsg = "", this._statusError = !1, this._pdfUrl = "", this._pdfVehicle = null, this._savedConfirm = !1, this._dragSrcSection = null, this._dragSrcIndex = -1, this._placeholder = null;
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
      groups: { ...this._groups }
    };
  }
  _applyDisplayState(e) {
    e.mode !== void 0 && (this._mode = e.mode), e.valueDisplay !== void 0 && (this._valueDisplay = e.valueDisplay), e.taxRatePct !== void 0 && (this._taxRatePct = e.taxRatePct), e.disclaimerPunct !== void 0 && (this._disclaimerPunct = e.disclaimerPunct), this.templateMode && (e.profitName !== void 0 && (this._profitName = e.profitName), e.disclaimerText !== void 0 && (this._disclaimerText = e.disclaimerText)), e.fontSizeIndex !== void 0 && (this._fontSizeIndex = e.fontSizeIndex), e.photosPerRow !== void 0 && (this._photosPerRow = e.photosPerRow), e.discLayout !== void 0 && (this._discLayout = e.discLayout), e.marketDisplay !== void 0 && (this._marketDisplay = e.marketDisplay), e.reconView !== void 0 && (this._reconView = e.reconView), e.highlightsView !== void 0 && (this._highlightsView = e.highlightsView), e.sectionOrder !== void 0 && (this._sectionOrder = e.sectionOrder.filter((t) => D.includes(t))), e.pills !== void 0 && (this._pills = { ...e.pills }), e.groups !== void 0 && (this._groups = { ...e.groups });
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  firstUpdated() {
    this.dispatchEvent(new CustomEvent("component-ready", {
      bubbles: !0,
      composed: !0
    }));
  }
  updated(e) {
    var i, s, o, r, l, n;
    if (e.has("defaultDisplay") && this.defaultDisplay && (this._applyDisplayState(this.defaultDisplay), this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl && (this._savedDisplayConsumed = !0, clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      this._handleGenerate();
    }, 300))), e.has("payload") && this.payload && (this._vehicleInfo = this._vehicleInfoFromData(this.payload), this._taxRatePct === null)) {
      const c = (o = (s = (i = this.payload) == null ? void 0 : i.valuation) == null ? void 0 : s.tax_savings) == null ? void 0 : o.rate_pct;
      this._taxRatePct = c != null ? parseFloat(parseFloat(c).toFixed(2)) : 0;
    }
    if (e.has("taxRate") && this.taxRate != null && this._taxRatePct === null && (this._taxRatePct = parseFloat(parseFloat(this.taxRate).toFixed(2))), e.has("profitLabel") && this.profitLabel != null && (!this.templateMode || this._profitName === null || this._profitName === void 0) && (this._profitName = this.profitLabel), e.has("disclaimerText") && this.disclaimerText != null && (!this.templateMode || this._disclaimerText === null || this._disclaimerText === void 0) && (this._disclaimerText = this.disclaimerText), e.has("profitLabel") && this.templateMode && this._autoPreviewDone && this.apiBaseUrl && this._handleGenerate(), e.has("employees") && ((r = this.employees) != null && r.length) && ((n = (l = this.payload) == null ? void 0 : l.employee) != null && n.name)) {
      const c = this.employees.findIndex((u) => u.name === this.payload.employee.name);
      c !== -1 && (this._selectedEmployeeIndex = c);
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
      "_reconView",
      "_highlightsView",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex"
    ].some((u) => e.has(u)) && (this._savedConfirm = !1), e.has("locked") && (this._finalized = !!this.locked), !this._autoPreviewDone && this.apiBaseUrl && ["payload", "defaultDisplay", "employees", "locked"].some((c) => e.has(c)) && (clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      !this._autoPreviewDone && this.apiBaseUrl && (this.templateMode || this.payload) && (this._autoPreviewDone = !0, this._handleGenerate());
    }, 300));
    const t = this.shadowRoot;
    if (t)
      for (const [c, u] of Object.entries(this._groups)) {
        const p = t.querySelector(`input[data-group="${c}"]`);
        p && (p.indeterminate = u === "indeterminate", p.checked = u === "checked" || u === "indeterminate");
      }
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _fmtPrice(e) {
    return !e && e !== 0 ? "" : "$" + Number(e).toLocaleString();
  }
  _getPayloadData() {
    return this.payload || Qe();
  }
  _vehicleInfoFromData(e) {
    const t = e.vehicle || {}, i = e.offer || {}, s = this._fmtPrice(i.amount) + " Offer", r = [t.year, t.make, t.model, t.trim].filter(Boolean).join(" ") + (t.color ? ` (${t.color})` : "");
    return { amount: s, desc: r, vin: t.vin || "" };
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
    }
    this._groups = t;
  }
  /** When a section is hidden, push it to the bottom of layout order. */
  _syncLayoutOrder(e) {
    const t = [...this._sectionOrder], i = t.indexOf(e);
    i !== -1 && (t.splice(i, 1), t.push(e)), this._sectionOrder = t;
  }
  _restoreLayoutOrder(e) {
    var r, l;
    const t = (l = (r = this.defaultDisplay) == null ? void 0 : r.sectionOrder) != null && l.length ? this.defaultDisplay.sectionOrder : D, i = [...this._sectionOrder].filter((n) => n !== e), s = t.indexOf(e), o = i.findIndex((n) => t.indexOf(n) > s);
    o === -1 ? i.push(e) : i.splice(o, 0, e), this._sectionOrder = i;
  }
  _isOnePage() {
    return this._mode === "one_page";
  }
  _isSectionDisabled(e) {
    return this._isOnePage() && ["disclosures", "recon", "photos"].includes(e) ? !0 : this._groups[e] === "unchecked";
  }
  // ── Display block builder ──────────────────────────────────────────────────
  _buildSaveState() {
    return {
      mode: this._mode,
      valueDisplay: this._valueDisplay,
      taxRatePct: this._taxRatePct,
      profitName: this._profitName || "",
      disclaimerText: this._disclaimerText || "",
      disclaimerPunct: this._disclaimerPunct ?? ".",
      fontSizeIndex: this._fontSizeIndex,
      photosPerRow: this._photosPerRow,
      discLayout: this._discLayout,
      marketDisplay: this._marketDisplay,
      reconView: this._reconView,
      highlightsView: this._highlightsView,
      sectionOrder: [...this._sectionOrder],
      pills: { ...this._pills },
      groups: { ...this._groups }
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
        recon_breakdown: this._isOnePage() ? !1 : t.recon === "checked",
        photos: this._isOnePage() ? !1 : t.photos === "checked"
      },
      general: {
        offer_label: !1,
        condition: e["general.condition"],
        value_display: this._valueDisplay
      },
      // "summary" (default — aggregate count+total row) or "detail" (every
      // damage note listed individually, italicized-prefix, non-interleaved).
      recon_view: this._reconView,
      // Same summary/detail concept, independent toggle for Observations' Highlights.
      highlights_view: this._highlightsView
    };
  }
  // ── Event handlers ─────────────────────────────────────────────────────────
  _handleModeChange(e) {
    if (this._mode = e, e === "one_page") {
      const i = { ...this._groups };
      ["disclosures", "recon", "photos"].forEach((l) => {
        i[l] = "unchecked";
      }), this._groups = i, this._marketDisplay = "summary";
      const s = ["disclosures", "recon", "photos"], o = this._sectionOrder.filter((l) => !s.includes(l)), r = this._sectionOrder.filter((l) => s.includes(l));
      this._sectionOrder = [...o, ...r];
    } else {
      const i = { ...this._groups };
      ["disclosures", "recon", "photos"].forEach((s) => {
        i[s] = "checked";
      }), this._groups = i, this._marketDisplay = "full", this._sectionOrder = [...D];
    }
  }
  _handleGroupChange(e, t) {
    const i = { ...this._groups };
    i[e] = t ? "checked" : "unchecked", this._groups = i;
    const s = { ...this._pills };
    e === "valuation" ? (["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"].forEach((o) => {
      s[o] = t;
    }), this._pills = s) : e === "observations" && (["sections.observations_highlights", "sections.observations_comments"].forEach((o) => {
      s[o] = t;
    }), this._pills = s), e !== "signature" && (t ? this._restoreLayoutOrder(e) : this._syncLayoutOrder(e));
  }
  _handlePillClick(e, t) {
    const i = { ...this._pills };
    i[e] = !i[e], this._pills = i, t && ["valuation", "observations"].includes(t) && (this._recomputeGroupState(t), this._groups[t] === "unchecked" && this._syncLayoutOrder(t));
  }
  _handleFontSizeStep(e) {
    const t = this._fontSizeIndex + e;
    t >= 0 && t < H.length && (this._fontSizeIndex = t);
  }
  _handlePhotosPerRowStep(e) {
    const t = this._photosPerRow + e;
    t >= 2 && t <= 4 && (this._photosPerRow = t);
  }
  _handleSegmentedClick(e, t) {
    e === "value-display" ? this._valueDisplay = t : e === "disc-layout" ? this._discLayout = t : e === "market-display" ? this._marketDisplay = t : e === "recon-display" ? this._reconView = t : e === "highlights-display" && (this._highlightsView = t);
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
  _handleReset() {
    this.defaultDisplay ? this._applyDisplayState(this.defaultDisplay) : this._resetToggles();
  }
  _resetToggles() {
    var t, i, s;
    this._mode = "full", this._valueDisplay = "offer";
    const e = (s = (i = (t = this.payload) == null ? void 0 : t.valuation) == null ? void 0 : i.tax_savings) == null ? void 0 : s.rate_pct;
    this._taxRatePct = e != null ? parseFloat(parseFloat(e).toFixed(2)) : this.taxRate != null ? parseFloat(parseFloat(this.taxRate).toFixed(2)) : 0, this._profitName = this.profitLabel || "", this._disclaimerText = this.disclaimerText || "", this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...D], this._pills = {
      "general.condition": !0,
      "valuation.retail_value": !0,
      "valuation.recon": !0,
      "valuation.fixed_overhead": !0,
      "valuation.target_profit": !0,
      "valuation.tax_savings": !0,
      "sections.observations_highlights": !0,
      "sections.observations_comments": !0
    }, this._groups = {
      valuation: "checked",
      disclosures: "checked",
      observations: "checked",
      market: "checked",
      recon: "checked",
      photos: "checked",
      signature: "checked"
    };
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
    const i = e.currentTarget, s = i.getBoundingClientRect(), o = e.clientY > s.top + s.height / 2, r = i.parentNode;
    o ? r.insertBefore(this._placeholder, i.nextSibling) : r.insertBefore(this._placeholder, i);
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
      const r = this.shadowRoot.querySelector(`.sortable-item[data-section="${e}"]`);
      r && (r.classList.remove("dropped"), r.offsetWidth, r.classList.add("dropped"), setTimeout(() => r.classList.remove("dropped"), 1e3));
    }));
  }
  _handleDragEnd(e) {
    e.currentTarget.classList.remove("dragging"), this.shadowRoot.querySelectorAll(".sortable-item").forEach((t) => t.classList.remove("dragging")), this._placeholder && this._placeholder.parentNode && this._placeholder.parentNode.removeChild(this._placeholder), this._placeholder = null, this._dragSrcSection = null, this._dragSrcIndex = -1;
  }
  // ── Save Settings ──────────────────────────────────────────────────────────
  _handleSaveSettings() {
    this._dispatchDisplaySave(), this._savedConfirm = !0;
  }
  _dispatchDisplaySave() {
    const e = this.employees && this.employees.length > 0 ? this.employees[this._selectedEmployeeIndex] || this.employees[0] : null;
    this.dispatchEvent(new CustomEvent("display-save", {
      detail: { display: this._buildSaveState(), employee: e },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Generate ───────────────────────────────────────────────────────────────
  async _handleGenerate(e = !1) {
    var t, i, s, o, r, l, n, c, u, p;
    this._generating = !0, this._statusMsg = "Generating…", this._statusError = !1;
    try {
      const m = this._buildDisplay(), b = {
        mode: this._mode,
        display: m,
        preview_logo: !0,
        preview_photos: !0,
        font_roboto: !0,
        font_size_delta: H[this._fontSizeIndex].delta,
        photos_per_row: this._photosPerRow,
        section_order: this._sectionOrder,
        watermark: e
      }, d = { ...this._getPayloadData() }, se = this._profitName != null ? this._profitName : this.profitLabel;
      se != null && ((t = d.valuation) != null && t.target_profit) && (d.valuation = {
        ...d.valuation,
        target_profit: { ...d.valuation.target_profit, label: se || "Target Profit" }
      });
      const G = this._disclaimerText != null ? this._disclaimerText : this.disclaimerText ?? null;
      if (G !== null) {
        const g = this._disclaimerPunct ?? ".", v = G ? G.replace(/\.+$/, "") : "";
        d.disclaimer = v ? g + " " + v : "";
      }
      if ((s = (i = d.dealer) == null ? void 0 : i.logo_url) != null && s.startsWith("//") && (d.dealer = { ...d.dealer, logo_url: "https:" + d.dealer.logo_url }), (o = d.employee) != null && o.phone && (d.employee = { ...d.employee, phone: me(d.employee.phone) }), this.employees && this.employees.length > 0) {
        const g = this.employees[this._selectedEmployeeIndex] || this.employees[0];
        d.employee = { name: g.name || "", phone: me(g.phone || "") };
      }
      if (d.disclosures && (d.disclosures = d.disclosures.filter((g) => g.answer && g.answer.trim() !== "")), (r = d.market) != null && r.comparables) {
        const g = d.market.comparables.map((_) => ({
          ..._,
          days_on_market: _.listing_type === "delisted" && _.delisted_days || _.days_on_market
        })), v = g.map((_) => _.days_on_market).filter((_) => _ != null), y = v.length > 0 ? Math.round(v.reduce((_, x) => _ + x, 0) / v.length) : (l = d.market.summary) == null ? void 0 : l.avg_days;
        d.market = {
          ...d.market,
          comparables: g,
          summary: { ...d.market.summary, avg_days: y }
        };
      }
      if (this._taxRatePct !== null && ((n = d.valuation) != null && n.tax_savings) && ((c = d.offer) == null ? void 0 : c.amount) != null) {
        const g = Math.round(d.offer.amount * this._taxRatePct / 100);
        d.valuation = {
          ...d.valuation,
          tax_savings: {
            ...d.valuation.tax_savings,
            rate_pct: this._taxRatePct,
            amount: g,
            gross_value: d.offer.amount + g
          }
        };
      }
      const Se = { ...b, raw_payload: d }, oe = { "Content-Type": "application/json", Accept: "application/pdf" };
      this.authToken && (oe.Authorization = `Bearer ${this.authToken}`);
      const R = await fetch(`${this.apiBaseUrl}/printout-offer`, {
        method: "POST",
        headers: oe,
        body: JSON.stringify(Se)
      });
      if (this.apiMode === "binary") {
        if (!R.ok) {
          let y = "Request failed";
          try {
            y = (await R.json()).error || y;
          } catch {
          }
          throw new Error(y);
        }
        const g = await R.blob(), v = await new Promise((y, _) => {
          const x = new FileReader();
          x.onload = () => y(x.result), x.onerror = _, x.readAsDataURL(g);
        });
        this._pdfUrl = v, this._statusMsg = "", this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: v, blob: g },
          bubbles: !0,
          composed: !0
        }));
      } else {
        let g;
        try {
          g = await R.json();
        } catch {
          throw new Error("Server error — check terminal for traceback");
        }
        if (!R.ok) throw new Error(g.error || "Failed");
        const v = this.apiBaseUrl + g.pdf_url + "?t=" + Date.now();
        this._pdfVehicle = g.vehicle;
        const y = { "ngrok-skip-browser-warning": "true" };
        this.authToken && (y.Authorization = `Bearer ${this.authToken}`);
        const x = await (await fetch(v, { headers: y })).blob(), Pe = (((u = d.customer) == null ? void 0 : u.name) || "Customer").replace(/[^a-zA-Z0-9 ]/g, "").trim(), Ae = ((p = g.vehicle) == null ? void 0 : p.vin) || "offer";
        this._pdfFilename = `${Pe}_${Ae}.pdf`;
        const De = new File([x], this._pdfFilename, { type: "application/pdf" });
        this._currentBlobUrl && URL.revokeObjectURL(this._currentBlobUrl);
        const re = URL.createObjectURL(De);
        this._currentBlobUrl = re, this._pdfUrl = re, this._statusMsg = "", this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: v },
          bubbles: !0,
          composed: !0
        }));
      }
    } catch (m) {
      this._statusMsg = m.message, this._statusError = !0, this.dispatchEvent(new CustomEvent("offer-error", {
        detail: { error: m.message },
        bubbles: !0,
        composed: !0
      }));
    }
    this._generating = !1;
  }
  async _handleApply() {
    this._savedConfirm = !0, this.templateMode ? (await this._handleGenerate(!1), this._dispatchDisplaySave()) : (this._finalizing = !0, await this._handleGenerate(!1), this._finalizing = !1, this._finalized = !0, this._dispatchDisplaySave());
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
      const o = await (await fetch(this._pdfUrl, { headers: i })).blob(), r = URL.createObjectURL(o), l = document.createElement("a");
      l.href = r, l.download = e, l.click(), setTimeout(() => URL.revokeObjectURL(r), 1e4);
    } catch {
      window.open(this._pdfUrl, "_blank");
    }
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderHeader() {
    return h`
      <div class="component-header">
        <div class="wrap">
          <h1>LXN Offer Sheet Generator</h1>
        </div>
      </div>
    `;
  }
  _renderOfferCard() {
    if (this.templateMode)
      return h`
        <div class="card">
          <h2>Template</h2>
          <div style="font-size:13px; color:#667085; line-height:1.6;">
            Configure default printout settings for your location. Generate a preview below.
          </div>
        </div>
      `;
    const e = this._vehicleInfo;
    return h`
      <div class="card">
        <h2>Offer</h2>
        ${e ? h`
          <div class="vehicle-info">
            <div class="amount">${e.amount}</div>
            <div class="desc">${e.desc}</div>
            ${e.vin ? h`<div style="font-size:11px;color:#006073;margin-top:2px;">${e.vin}</div>` : f}
          </div>
        ` : h`<div style="font-size:13px; color:#aab4c0;">Loading offer details…</div>`}
      </div>
    `;
  }
  _renderCustomizeCard() {
    const e = this._isOnePage(), t = H[this._fontSizeIndex].label, i = D.map((s) => this._renderShowHideGroup(s));
    return h`
      <div class="card">
        <div>
        <div class="customize-header-row">
          <h2>Customize</h2>
          <div class="segmented-control" style="width:auto;">
            <button
              class="seg-btn ${this._mode === "full" ? "active" : ""}"
              @click="${() => this._handleModeChange("full")}"
            >Full</button>
            <button
              class="seg-btn ${e ? "active" : ""}"
              @click="${() => this._handleModeChange("one_page")}"
            >One-Page</button>
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
              <div class="segmented-control">
                <button
                  class="seg-btn ${this._valueDisplay === "offer" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("value-display", "offer")}"
                >Offer</button>
                <button
                  class="seg-btn ${this._valueDisplay === "tax_savings" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("value-display", "tax_savings")}"
                >Tax Savings</button>
              </div>
            </div>
            <div class="config-row">
              <span>Tax savings rate</span>
              <div class="tax-rate-wrapper">
                <input
                  type="number"
                  class="tax-rate-input"
                  .value="${this._taxRatePct ?? ""}"
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
                .value="${this._profitName ?? ""}"
                @input="${this._handleProfitNameInput}"
              />
            </div>
            ${!this.templateMode && this.employees && this.employees.length > 0 ? h`
              <div class="config-row">
                <span>Employee</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(s) => {
      this._selectedEmployeeIndex = parseInt(s.target.value);
    }}"
                >
                  ${this.employees.map((s, o) => h`
                    <option value="${o}" ?selected="${o === this._selectedEmployeeIndex}">${s.name}</option>
                  `)}
                </select>
              </div>
            ` : f}
            <div class="config-row">
              <span>Font size</span>
              <div class="stepper">
                <button
                  class="step-btn"
                  ?disabled="${this._fontSizeIndex <= 0}"
                  @click="${() => this._handleFontSizeStep(-1)}"
                >−</button>
                <span class="stepper-value font-size-display">${t}</span>
                <button
                  class="step-btn"
                  ?disabled="${this._fontSizeIndex >= H.length - 1}"
                  @click="${() => this._handleFontSizeStep(1)}"
                >+</button>
              </div>
            </div>
            <div class="config-row ${e ? "disabled" : ""}">
              <span>Photos (per row)</span>
              <div class="stepper">
                <button
                  class="step-btn"
                  ?disabled="${this._photosPerRow <= 2 || e}"
                  @click="${() => this._handlePhotosPerRowStep(-1)}"
                >−</button>
                <span class="stepper-value">${this._photosPerRow}</span>
                <button
                  class="step-btn"
                  ?disabled="${this._photosPerRow >= 4 || e}"
                  @click="${() => this._handlePhotosPerRowStep(1)}"
                >+</button>
              </div>
            </div>

            <div class="config-row ${e ? "disabled" : ""}">
              <span>Disclosures</span>
              <div class="segmented-control ${e ? "disabled" : ""}">
                <button
                  class="seg-btn ${this._discLayout === "vertical" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("disc-layout", "vertical")}"
                >Vertical</button>
                <button
                  class="seg-btn ${this._discLayout === "horizontal" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("disc-layout", "horizontal")}"
                >Horizontal</button>
              </div>
            </div>
            <div class="config-row ${e ? "disabled" : ""}">
              <span>Market</span>
              <div class="segmented-control ${e ? "disabled" : ""}">
                <button
                  class="seg-btn ${this._marketDisplay === "summary" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("market-display", "summary")}"
                >Summary</button>
                <button
                  class="seg-btn ${this._marketDisplay === "full" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("market-display", "full")}"
                >Full</button>
              </div>
            </div>
            <div class="config-row ${e ? "disabled" : ""}">
              <span>Recon</span>
              <div class="segmented-control ${e ? "disabled" : ""}">
                <button
                  class="seg-btn ${this._reconView === "summary" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("recon-display", "summary")}"
                >Summary</button>
                <button
                  class="seg-btn ${this._reconView === "detail" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("recon-display", "detail")}"
                >Detail</button>
              </div>
            </div>
            <div class="config-row">
              <span>Highlights</span>
              <div class="segmented-control">
                <button
                  class="seg-btn ${this._highlightsView === "summary" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("highlights-display", "summary")}"
                >Summary</button>
                <button
                  class="seg-btn ${this._highlightsView === "detail" ? "active" : ""}"
                  @click="${() => this._handleSegmentedClick("highlights-display", "detail")}"
                >Detail</button>
              </div>
            </div>
            <div style="padding:8px 0 4px;">
              <div style="font-size:12px;color:#222222;margin-bottom:6px;">Disclaimer (appended to footer)</div>
              <div class="config-row" style="margin-bottom:6px;padding-left:16px;">
                <span>Separator</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(s) => {
      this._disclaimerPunct = s.target.value;
    }}"
                >
                  <option value="," ?selected="${this._disclaimerPunct === ","}">Comma (,)</option>
                  <option value="." ?selected="${this._disclaimerPunct === "."}">Period (.)</option>
                  <option value="" ?selected="${this._disclaimerPunct === ""}">None</option>
                </select>
              </div>
              <textarea
                style="width:100%;font-size:12px;padding:6px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;outline:none;resize:vertical;min-height:60px;font-family:inherit;line-height:1.4;margin-left:16px;width:calc(100% - 16px);"
                placeholder="e.g., subject to Carfax History and Lien report."
                .value="${this._disclaimerText ?? ""}"
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
              <div class="group-header">
                <label style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#222222;cursor:default;">Header</label>
              </div>
              <div class="pill-group">
                <span
                  class="pill ${this._pills["general.condition"] ? "active" : ""}"
                  @click="${() => this._handlePillClick("general.condition", null)}"
                >Condition</span>
              </div>
            </div>
            <!-- Section groups in layout order -->
            ${i}
            <!-- Signature (always at end of PDF, not draggable) -->
            <div class="toggle-group" data-group="signature">
              <label class="group-header">
                <input
                  type="checkbox"
                  data-group="signature"
                  .checked="${this._groups.signature === "checked"}"
                  @change="${(s) => this._handleGroupChange("signature", s.target.checked)}"
                >
                Customer Signature
              </label>
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
            <div class="section-chevron">${Q}</div>
          </div>
          <div class="section-body">
            <div class="sortable-list"
              @dragover="${(s) => s.preventDefault()}"
              @drop="${(s) => this._handleListDrop(s)}"
            >
              ${this._sectionOrder.map((s) => {
      const o = this._isSectionDisabled(s);
      return h`
                  <div
                    class="sortable-item ${o ? "disabled" : ""}"
                    data-section="${s}"
                    draggable="${o ? "false" : "true"}"
                    @dragstart="${(r) => this._handleDragStart(r, s)}"
                    @dragover="${(r) => this._handleDragOver(r, s)}"
                    @drop="${(r) => this._handleDrop(r)}"
                    @dragend="${(r) => this._handleDragEnd(r)}"
                  >
                    <span class="drag-handle">⠿</span>
                    <span>${Ye[s]}</span>
                    <div class="sort-arrows">
                      <button class="sort-arrow" ?disabled="${o || this._sectionOrder.indexOf(s) === 0}" @click="${() => this._handleMoveSection(s, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${o || this._sectionOrder.indexOf(s) === this._sectionOrder.length - 1}" @click="${() => this._handleMoveSection(s, 1)}">▼</button>
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

        ${this._savedConfirm ? h`
          <div style="text-align:center;margin-top:10px;font-size:13px;color:#222222;font-weight:500;">Changes saved!</div>
        ` : f}

        <div style="text-align:center; margin-top:20px;">
          <button
            style="background:none;border:none;padding:0;font-size:14px;color:#98a2b3;cursor:pointer;text-decoration:underline;text-underline-offset:2px;"
            @click="${this._handleReset}"
          >Reset</button>
        </div>
      </div>
    `;
  }
  _renderShowHideGroup(e) {
    const i = this._isOnePage() && ["disclosures", "recon", "photos"].includes(e), s = this._groups[e];
    return e === "valuation" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="valuation">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="valuation"
              .checked="${s === "checked" || s === "indeterminate"}"
              @change="${(o) => this._handleGroupChange("valuation", o.target.checked)}"
            >
            Valuation
          </label>
          <div class="pill-group">
            ${this._renderPill("valuation.retail_value", "Retail Value", "valuation")}
            ${this._renderPill("valuation.recon", "Recon", "valuation")}
            ${this._renderPill("valuation.fixed_overhead", "Fixed Overhead", "valuation")}
            ${this._renderPill("valuation.target_profit", this._profitName || "Target Profit", "valuation")}
            ${this._renderPill("valuation.tax_savings", "Tax Savings", "valuation")}
          </div>
        </div>
      ` : e === "disclosures" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="disclosures">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="disclosures"
              .checked="${s === "checked"}"
              @change="${(o) => this._handleGroupChange("disclosures", o.target.checked)}"
            >
            Disclosures
          </label>
        </div>
      ` : e === "observations" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="observations">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="observations"
              .checked="${s === "checked" || s === "indeterminate"}"
              @change="${(o) => this._handleGroupChange("observations", o.target.checked)}"
            >
            Observations
          </label>
          <div class="pill-group">
            ${this._renderPill("sections.observations_highlights", "Highlights", "observations")}
            ${this._renderPill("sections.observations_comments", "Comments", "observations")}
          </div>
        </div>
      ` : e === "market" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="market">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="market"
              .checked="${s === "checked"}"
              @change="${(o) => this._handleGroupChange("market", o.target.checked)}"
            >
            Market
          </label>
        </div>
      ` : e === "recon" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="recon">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="recon"
              .checked="${s === "checked"}"
              @change="${(o) => this._handleGroupChange("recon", o.target.checked)}"
            >
            Recon
          </label>
        </div>
      ` : e === "photos" ? h`
        <div class="toggle-group ${i ? "disabled" : ""}" data-group="photos">
          <label class="group-header">
            <input
              type="checkbox"
              data-group="photos"
              .checked="${s === "checked"}"
              @change="${(o) => this._handleGroupChange("photos", o.target.checked)}"
            >
            Photos
          </label>
        </div>
      ` : f;
  }
  _renderPill(e, t, i) {
    const s = this._pills[e];
    return h`
      <span
        class="pill ${s ? "active" : ""}"
        @click="${() => this._handlePillClick(e, i)}"
      >${t}</span>
    `;
  }
  _renderPreviewPane() {
    const e = !!this._pdfUrl, t = this._generating || this._finalizing, i = t || !!this.apiBaseUrl && !e, o = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && navigator.pdfViewerEnabled;
    return h`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <h2>${o ? "Preview" : "PDF"}</h2>
            ${!this.templateMode && e && !t && o ? h`
              <em style="font-size:13px;color:#667085;">Download PDF via toolbar below</em>
            ` : f}
          </div>
          ${i ? h`
            <div class="preview-loading">
              <div class="pulse-dots">
                <span></span><span></span><span></span>
              </div>
              Generating preview…
            </div>
          ` : f}
          ${!i && !e ? h`
            <div class="empty-preview">Select a payload and click Refresh Preview</div>
          ` : f}
          ${e && !t && o ? h`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : f}
          ${e && !t && !o ? h`
            <div style="display:flex;align-items:center;justify-content:center;padding:20px;border:2px solid #d0d5dd;border-radius:8px;">
              ${window.natively ? h`
                <button
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;"
                  @click="${() => window.natively.openPDF({ base64: this._pdfUrl.split(",")[1], fileName: "offer.pdf", download: !0 }, () => {
    })}"
                >Open PDF</button>
              ` : h`
                <a
                  href="${this._pdfUrl}"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;text-decoration:none;"
                >Open PDF</a>
              `}
            </div>
          ` : f}
        </div>
      </div>
    `;
  }
  // ── Main render ────────────────────────────────────────────────────────────
  render() {
    return h`
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
q(X, "properties", {
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
  defaultDisplay: { type: Object },
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
  _reconView: { type: String, state: !0 },
  // 'summary' | 'detail'
  _highlightsView: { type: String, state: !0 },
  // 'summary' | 'detail'
  _sectionOrder: { type: Array, state: !0 },
  // Show/Hide pill state — flat object of path → bool
  _pills: { type: Object, state: !0 },
  // Group checkbox state: 'checked' | 'indeterminate' | 'unchecked'
  _groups: { type: Object, state: !0 },
  _finalized: { type: Boolean, state: !0 },
  _generating: { type: Boolean, state: !0 },
  _finalizing: { type: Boolean, state: !0 },
  _statusMsg: { type: String, state: !0 },
  _statusError: { type: Boolean, state: !0 },
  _pdfUrl: { type: String, state: !0 },
  _pdfVehicle: { type: Object, state: !0 },
  _savedConfirm: { type: Boolean, state: !0 }
}), q(X, "styles", Re`
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
  `);
customElements.define("lexen-offer-sheet", X);
export {
  X as LexenOfferSheet
};
