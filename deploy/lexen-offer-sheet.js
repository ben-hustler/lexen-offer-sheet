var Se = Object.defineProperty;
var Ee = (n, e, t) => e in n ? Se(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var F = (n, e, t) => Ee(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, Q = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), te = /* @__PURE__ */ new WeakMap();
let ge = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Q && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = te.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && te.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (n) => new ge(typeof n == "string" ? n : n + "", void 0, X), De = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[a + 1], n[0]);
  return new ge(t, n, X);
}, Oe = (n, e) => {
  if (Q) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = U.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, ie = Q ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Pe(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ce, defineProperty: Ae, getOwnPropertyDescriptor: Le, getOwnPropertyNames: Re, getOwnPropertySymbols: ze, getPrototypeOf: Te } = Object, v = globalThis, se = v.trustedTypes, Me = se ? se.emptyScript : "", H = v.reactiveElementPolyfillSupport, L = (n, e) => n, Z = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Me : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, be = (n, e) => !Ce(n, e), oe = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let D = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = oe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ae(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: a } = Le(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = Te(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const t = this.properties, i = [...Re(t), ...ze(t)];
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
      for (const s of i) t.unshift(ie(s));
    } else e !== void 0 && t.push(ie(e));
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
    return Oe(e, this.constructor.elementStyles), e;
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
    var a;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : Z).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, o;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), r = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : Z;
      this._$Em = s;
      const p = r.fromAttribute(t, l.type);
      this[s] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, a) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (a = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? be)(a, t) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, o] of s) {
        const { wrapped: l } = o, r = this[a];
        l !== !0 || this._$AL.has(a) || r === void 0 || this.C(a, void 0, o, r);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[L("elementProperties")] = /* @__PURE__ */ new Map(), D[L("finalized")] = /* @__PURE__ */ new Map(), H == null || H({ ReactiveElement: D }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, ae = (n) => n, V = R.trustedTypes, re = V ? V.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ve = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + b, Be = `<${ye}>`, S = document, T = () => S.createComment(""), M = (n) => n === null || typeof n != "object" && typeof n != "function", ee = Array.isArray, Ie = (n) => ee(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ne = /-->/g, le = />/g, x = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ce = /"/g, xe = /^(?:script|style|textarea|title)$/i, Ne = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), d = Ne(1), O = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), w = S.createTreeWalker(S, 129);
function ke(n, e) {
  if (!ee(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return re !== void 0 ? re.createHTML(e) : e;
}
const Ue = (n, e) => {
  const t = n.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = A;
  for (let l = 0; l < t; l++) {
    const r = n[l];
    let p, h, c = -1, f = 0;
    for (; f < r.length && (o.lastIndex = f, h = o.exec(r), h !== null); ) f = o.lastIndex, o === A ? h[1] === "!--" ? o = ne : h[1] !== void 0 ? o = le : h[2] !== void 0 ? (xe.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = x) : h[3] !== void 0 && (o = x) : o === x ? h[0] === ">" ? (o = s ?? A, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, p = h[1], o = h[3] === void 0 ? x : h[3] === '"' ? ce : de) : o === ce || o === de ? o = x : o === ne || o === le ? o = A : (o = x, s = void 0);
    const _ = o === x && n[l + 1].startsWith("/>") ? " " : "";
    a += o === A ? r + Be : c >= 0 ? (i.push(p), r.slice(0, c) + ve + r.slice(c) + b + _) : r + b + (c === -2 ? l : _);
  }
  return [ke(n, a + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const l = e.length - 1, r = this.parts, [p, h] = Ue(e, t);
    if (this.el = B.createElement(p, i), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = w.nextNode()) !== null && r.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ve)) {
          const f = h[o++], _ = s.getAttribute(c).split(b), y = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: a, name: y[2], strings: _, ctor: y[1] === "." ? je : y[1] === "?" ? Fe : y[1] === "@" ? He : j }), s.removeAttribute(c);
        } else c.startsWith(b) && (r.push({ type: 6, index: a }), s.removeAttribute(c));
        if (xe.test(s.tagName)) {
          const c = s.textContent.split(b), f = c.length - 1;
          if (f > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(c[_], T()), w.nextNode(), r.push({ type: 2, index: ++a });
            s.append(c[f], T());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ye) r.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(b, c + 1)) !== -1; ) r.push({ type: 7, index: a }), c += b.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(n, e, t = n, i) {
  var o, l;
  if (e === O) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const a = M(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), a === void 0 ? s = void 0 : (s = new a(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = C(n, s._$AS(n, e.values), s, i)), e;
}
class Ve {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? S).importNode(t, !0);
    w.currentNode = s;
    let a = w.nextNode(), o = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let p;
        r.type === 2 ? p = new I(a, a.nextSibling, this, e) : r.type === 1 ? p = new r.ctor(a, r.name, r.strings, this, e) : r.type === 6 && (p = new Ge(a, this, e)), this._$AV.push(p), r = i[++l];
      }
      o !== (r == null ? void 0 : r.index) && (a = w.nextNode(), o++);
    }
    return w.currentNode = S, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class I {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = C(this, e, t), M(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ie(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = B.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(t);
    else {
      const o = new Ve(s, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = pe.get(e.strings);
    return t === void 0 && pe.set(e.strings, t = new B(e)), t;
  }
  k(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new I(this.O(T()), this.O(T()), this, this.options)) : i = t[s], i._$AI(a), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = ae(e).nextSibling;
      ae(e).remove(), e = s;
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
  constructor(e, t, i, s, a) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = C(this, e, t, 0), o = !M(e) || e !== this._$AH && e !== O, o && (this._$AH = e);
    else {
      const l = e;
      let r, p;
      for (e = a[0], r = 0; r < a.length - 1; r++) p = C(this, l[i + r], t, r), p === O && (p = this._$AH[r]), o || (o = !M(p) || p !== this._$AH[r]), p === u ? e = u : e !== u && (e += (p ?? "") + a[r + 1]), this._$AH[r] = p;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class je extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Fe extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class He extends j {
  constructor(e, t, i, s, a) {
    super(e, t, i, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? u) === O) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ge {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const q = R.litHtmlPolyfillSupport;
q == null || q(B, I), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.3");
const qe = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new I(e.insertBefore(T(), a), a, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis;
class z extends D {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qe(t, this.renderRoot, this.renderOptions);
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
var me;
z._$litElement$ = !0, z.finalized = !0, (me = $.litElementHydrateSupport) == null || me.call($, { LitElement: z });
const K = $.litElementPolyfillSupport;
K == null || K({ LitElement: z });
($.litElementVersions ?? ($.litElementVersions = [])).push("4.2.2");
function he(n) {
  const e = String(n || "").replace(/\D/g, "");
  return e.length === 10 ? `(${e.slice(0, 3)}) ${e.slice(3, 6)}-${e.slice(6)}` : e.length === 11 && e[0] === "1" ? `(${e.slice(1, 4)}) ${e.slice(4, 7)}-${e.slice(7)}` : n || "";
}
function Ke() {
  const n = /* @__PURE__ */ new Date(), e = new Date(n);
  e.setDate(n.getDate() + 30);
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
      appraisal_date: t(n),
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
const N = [
  { label: "Extra Small", delta: -1 },
  { label: "Small", delta: 0 },
  { label: "Medium", delta: 1 },
  { label: "Large", delta: 2 },
  { label: "Extra Large", delta: 3 }
], k = ["valuation", "disclosures", "observations", "market", "market_scenarios", "selected_scenarios", "recon", "photos"], W = {
  valuation: "Valuation",
  disclosures: "Disclosures",
  observations: "Observations",
  market: "Selected Comparables",
  market_scenarios: "Market Scenarios",
  selected_scenarios: "Selected Scenarios",
  recon: "Recon",
  photos: "Photos"
}, P = [
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
], ue = /* @__PURE__ */ new Set(["costMkt", "prcMktAdj", "retail", "ACV"]), Y = d`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
d`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
d`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const fe = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`, _e = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`, We = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`, Ye = d`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="8.3" r="0.65" fill="currentColor"/></svg>`;
class J extends z {
  constructor() {
    super(), this.apiBaseUrl = "", this.apiMode = "url", this.authToken = "", this.templateMode = !1, this.payload = null, this.sharedDisplay = null, this.pdfDisplay = null, this.templateSharedDisplay = null, this.templatePdfDisplay = null, this.employees = [], this._selectedEmployeeIndex = 0, this._vehicleInfo = null, this._generalOpen = !1, this._layoutOpen = !1, this._showHideOpen = !1, this._mode = "full", this._valueDisplay = "offer", this._taxRatePct = null, this._profitName = null, this._disclaimerText = null, this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...k], this._pills = this._defaultPills(), this._groups = this._defaultGroups(), this._pillsOpen = { valuation: !0, market_scenarios: !0, selected_scenarios: !0 }, this._finalized = !1, this._autoPreviewDone = !1, this._autoPreviewTimer = null, this._autoRefreshTimer = null, this._splitOpen = !1, this._sendVia = null, this._doneSentVia = null, this._pdfSent = !1, this._confirmSendEmail = !1, this._sendMessageType = null, this._manualCustomerEmail = "", this._previewStale = !1, this._individualOpen = !1, this._individualSections = [], this._individualBusy = !1, this._individualError = "", this._sendPayloadOverride = null, this._generating = !1, this._finalizing = !1, this._statusMsg = "", this._statusError = !1, this._pdfUrl = "", this._pdfVehicle = null, this._lastPrintoutRequest = null, this._savedConfirm = !1, this._confirmReset = !1, this._locks = {
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
      recon_display: !1,
      highlights_display: !1,
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
      reconView: this._reconView,
      highlightsView: this._highlightsView,
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
      ...Object.fromEntries(P.flatMap((e) => [
        [`market_scenarios.${e.key}`, !ue.has(e.key)],
        [`selected_scenarios.${e.key}`, !ue.has(e.key)]
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
    const a = { ...this._defaultGroups(), signature: this._groups.signature };
    t.forEach((o) => {
      s[o] != null && (a[o] = s[o] ? "checked" : "unchecked");
    }), this._groups = a, i.forEach((o) => {
      this._groups[o] === "checked" && this._recomputeGroupState(o);
    }), e.section_order != null && (this._sectionOrder = e.section_order.filter((o) => k.includes(o))), e.tax_rate_pct != null && (this._taxRatePct = e.tax_rate_pct), e.value_display != null && (this._valueDisplay = e.value_display), e.profit_name != null && (this._profitName = e.profit_name), e.market_view != null && (this._marketDisplay = e.market_view === "summary" ? "summary" : "full"), e.recon_view != null && (this._reconView = e.recon_view === "detail" ? "detail" : "summary"), e.highlights_view != null && (this._highlightsView = e.highlights_view === "detail" ? "detail" : "summary");
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
    var a, o, l, r, p, h;
    const t = this._pendingDataLoad;
    if (e.has("sharedDisplay") || e.has("pdfDisplay") ? this._pendingDataLoad = !0 : this._pendingDataLoad && (this._pendingDataLoad = !1), e.has("sharedDisplay") && this.sharedDisplay && this._applySharedDisplay(this.sharedDisplay), e.has("pdfDisplay") && this.pdfDisplay && this._applyPdfDisplay(this.pdfDisplay), (e.has("sharedDisplay") || e.has("pdfDisplay")) && this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl && (this._savedDisplayConsumed = !0, clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      this._handleGenerate();
    }, 300)), e.has("payload") && this.payload && (this._vehicleInfo = this._vehicleInfoFromData(this.payload), this._taxRatePct === null)) {
      const c = (l = (o = (a = this.payload) == null ? void 0 : a.valuation) == null ? void 0 : o.tax_savings) == null ? void 0 : l.rate_pct;
      this._taxRatePct = c != null ? parseFloat(parseFloat(c).toFixed(2)) : 0;
    }
    if (e.has("taxRate") && this.taxRate != null && this._taxRatePct === null && (this._taxRatePct = parseFloat(parseFloat(this.taxRate).toFixed(2))), e.has("profitLabel") && this.profitLabel != null && (!this.templateMode || this._profitName === null || this._profitName === void 0) && (this._profitName = this.profitLabel), e.has("disclaimerText") && this.disclaimerText != null && (!this.templateMode || this._disclaimerText === null || this._disclaimerText === void 0) && (this._disclaimerText = this.disclaimerText), e.has("employees") && ((r = this.employees) != null && r.length) && ((h = (p = this.payload) == null ? void 0 : p.employee) != null && h.name)) {
      const c = this.employees.findIndex((f) => f.name === this.payload.employee.name);
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
      "_scenarioLayout",
      "_reconView",
      "_highlightsView",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex",
      "_locks"
    ].some((f) => e.has(f)) && (this._savedConfirm = !1), this._mode === "one_page" && !e.has("_mode") && !t && !this._isLocked("mode") && [
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
      "_reconView",
      "_highlightsView",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex"
    ].some((f) => e.has(f)) && (this._mode = "full", this._preOnePageState = null), e.has("locked") && (this._finalized = !!this.locked), !this._autoPreviewDone && this.apiBaseUrl && ["payload", "sharedDisplay", "pdfDisplay", "employees", "locked"].some((c) => e.has(c)) && (clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
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
      "_reconView",
      "_highlightsView",
      "_sectionOrder",
      "_pills",
      "_groups",
      "_selectedEmployeeIndex"
    ].some((_) => e.has(_)) && (this._previewStale = !0);
    const s = this.shadowRoot;
    if (s)
      for (const [c, f] of Object.entries(this._groups)) {
        const _ = s.querySelector(`input[data-group="${c}"]`);
        _ && (_.indeterminate = f === "indeterminate", _.checked = f === "checked" || f === "indeterminate");
      }
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _fmtPrice(e) {
    return !e && e !== 0 ? "" : "$" + Number(e).toLocaleString();
  }
  _getPayloadData() {
    return this.payload || Ke();
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
    var o, l, r;
    const t = e === "market_scenarios" ? "market" : e === "selected_scenarios" ? "selected" : null;
    if (!t) return !1;
    const i = this._getPayloadData(), s = (o = i == null ? void 0 : i.offer) == null ? void 0 : o.amount, a = this._parseCurrency((r = (l = i == null ? void 0 : i.scenarios) == null ? void 0 : l[t]) == null ? void 0 : r.ACV);
    return s == null || a == null ? !1 : Math.round(s) !== Math.round(a);
  }
  /** ACV and Cost to Market are the only fields tied to that valuation. */
  _isPillLockedStale(e) {
    const [t, i] = e.split(".");
    return i !== "ACV" && i !== "costMkt" ? !1 : this._isScenarioStale(t);
  }
  _vehicleInfoFromData(e) {
    const t = e.vehicle || {}, i = e.offer || {}, s = this._fmtPrice(i.amount) + " Offer", o = [t.year, t.make, t.model, t.trim].filter(Boolean).join(" ") + (t.color ? ` (${t.color})` : "");
    return { amount: s, desc: o, vin: t.vin || "" };
  }
  _getGroupState(e) {
    return this._groups[e] || "checked";
  }
  /** Recompute a group's state from its pills. */
  _recomputeGroupState(e) {
    const t = { ...this._groups };
    if (e === "valuation") {
      const i = ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"], s = i.filter((a) => this._pills[a]).length;
      s === 0 ? t.valuation = "unchecked" : s === i.length ? t.valuation = "checked" : t.valuation = "indeterminate";
    } else if (e === "observations") {
      const i = ["sections.observations_highlights", "sections.observations_comments"], s = i.filter((a) => this._pills[a]).length;
      s === 0 ? t.observations = "unchecked" : s === i.length ? t.observations = "checked" : t.observations = "indeterminate";
    } else if (e === "market_scenarios" || e === "selected_scenarios") {
      const i = P.map((a) => `${e}.${a.key}`), s = i.filter((a) => this._pills[a]).length;
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
    var o, l;
    const t = (l = (o = this.sharedDisplay) == null ? void 0 : o.section_order) != null && l.length ? this.sharedDisplay.section_order : k, i = [...this._sectionOrder].filter((r) => r !== e), s = t.indexOf(e), a = i.findIndex((r) => t.indexOf(r) > s);
    a === -1 ? i.push(e) : i.splice(a, 0, e), this._sectionOrder = i;
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
      recon_view: this._reconView,
      highlights_view: this._highlightsView,
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
        market: Object.fromEntries(P.map((s) => [s.key, this._isPillLockedStale(`market_scenarios.${s.key}`) ? !1 : e[`market_scenarios.${s.key}`]])),
        selected: Object.fromEntries(P.map((s) => [s.key, this._isPillLockedStale(`selected_scenarios.${s.key}`) ? !1 : e[`selected_scenarios.${s.key}`]]))
      },
      scenario_layout: this._scenarioLayout,
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
      this._preOnePageState = {
        groups: { ...this._groups },
        pills: { ...this._pills },
        marketDisplay: this._marketDisplay,
        sectionOrder: [...this._sectionOrder]
      };
      const i = { ...this._groups };
      ["disclosures", "recon", "photos", "market_scenarios", "selected_scenarios"].forEach((r) => {
        i[r] = "unchecked";
      }), ["valuation", "observations", "market"].forEach((r) => {
        this._isLocked(r) || (i[r] = "checked");
      }), this._groups = i;
      const s = { ...this._pills };
      this._isLocked("valuation") || ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"].forEach((r) => {
        s[r] = !0;
      }), this._isLocked("observations") || (s["sections.observations_comments"] = !0, s["sections.observations_highlights"] = !1), this._pills = s, this._marketDisplay = "summary";
      const a = ["disclosures", "recon", "photos", "market_scenarios", "selected_scenarios"], o = this._sectionOrder.filter((r) => !a.includes(r)), l = this._sectionOrder.filter((r) => a.includes(r));
      this._sectionOrder = [...o, ...l];
    } else if (this._preOnePageState) {
      const i = this._preOnePageState;
      this._groups = { ...i.groups }, this._pills = { ...i.pills }, this._marketDisplay = i.marketDisplay, this._sectionOrder = i.sectionOrder, this._preOnePageState = null;
    } else {
      const i = { ...this._groups };
      ["disclosures", "recon", "photos", "valuation", "observations", "market"].forEach((s) => {
        this._isLocked(s) || (i[s] = "checked");
      }), ["market_scenarios", "selected_scenarios"].forEach((s) => {
        this._isLocked(s) || (i[s] = "unchecked");
      }), this._groups = i, this._marketDisplay = "full", this._sectionOrder = [...k];
    }
  }
  _handleGroupChange(e, t) {
    if (this._groups = { ...this._groups, [e]: t ? "checked" : "unchecked" }, t && ["valuation", "observations", "market_scenarios", "selected_scenarios"].includes(e)) {
      const s = this._pillKeysForGroup(e);
      if (s.filter((o) => this._pills[o]).length === 0) {
        const o = { ...this._pills };
        s.forEach((l) => {
          o[l] = !0;
        }), this._pills = o;
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
    t >= 0 && t < N.length && (this._fontSizeIndex = t);
  }
  _handlePhotosPerRowStep(e) {
    const t = this._photosPerRow + e;
    t >= 2 && t <= 4 && (this._photosPerRow = t);
  }
  _handleSegmentedClick(e, t) {
    e === "value-display" ? this._valueDisplay = t : e === "disc-layout" ? this._discLayout = t : e === "market-display" ? this._marketDisplay = t : e === "scenario-layout" ? this._scenarioLayout = t : e === "recon-display" ? this._reconView = t : e === "highlights-display" && (this._highlightsView = t);
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
      reconView: this._reconView,
      highlightsView: this._highlightsView,
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
    this._mode = e.mode, this._valueDisplay = e.valueDisplay, this._taxRatePct = e.taxRatePct, this._profitName = e.profitName, this._disclaimerText = e.disclaimerText, this._disclaimerPunct = e.disclaimerPunct, this._fontSizeIndex = e.fontSizeIndex, this._photosPerRow = e.photosPerRow, this._discLayout = e.discLayout, this._marketDisplay = e.marketDisplay, this._scenarioLayout = e.scenarioLayout, this._reconView = e.reconView, this._highlightsView = e.highlightsView, this._sectionOrder = [...e.sectionOrder], this._pills = { ...e.pills }, this._groups = { ...e.groups }, this._selectedEmployeeIndex = e.selectedEmployeeIndex, this._previewStale = !1;
  }
  _resetToggles() {
    var t, i, s;
    this._mode = "full", this._valueDisplay = "offer";
    const e = (s = (i = (t = this.payload) == null ? void 0 : t.valuation) == null ? void 0 : i.tax_savings) == null ? void 0 : s.rate_pct;
    this._taxRatePct = e != null ? parseFloat(parseFloat(e).toFixed(2)) : this.taxRate != null ? parseFloat(parseFloat(this.taxRate).toFixed(2)) : 0, this._profitName = this.profitLabel || "", this._disclaimerText = this.disclaimerText || "", this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...k], this._pills = this._defaultPills(), this._groups = this._defaultGroups();
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
    const i = e.currentTarget, s = i.getBoundingClientRect(), a = e.clientY > s.top + s.height / 2, o = i.parentNode;
    a ? o.insertBefore(this._placeholder, i.nextSibling) : o.insertBefore(this._placeholder, i);
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
    const i = [...this._sectionOrder], s = i.indexOf(e), a = s + t;
    a < 0 || a >= i.length || ([i[s], i[a]] = [i[a], i[s]], this._sectionOrder = i, this.updateComplete.then(() => {
      const o = this.shadowRoot.querySelector(`.sortable-item[data-section="${e}"]`);
      o && (o.classList.remove("dropped"), o.offsetWidth, o.classList.add("dropped"), setTimeout(() => o.classList.remove("dropped"), 1e3));
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
    return u;
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
  /** The exact /printout-offer request body for a given display block —
   * shared by the main preview and individual-section prints so both apply the
   * same payload overrides (profit label, disclaimer, employee, tax rate…). */
  _buildPrintoutRequest(e, t = !1) {
    var l, r, p, h, c, f, _, y;
    const i = {
      mode: this._mode,
      display: e,
      preview_logo: !0,
      preview_photos: !0,
      font_roboto: !0,
      font_size_delta: N[this._fontSizeIndex].delta,
      photos_per_row: this._photosPerRow,
      section_order: this._sectionOrder,
      watermark: t
    }, s = { ...this._getPayloadData() }, a = this._profitName != null ? this._profitName : this.profitLabel;
    a != null && ((l = s.valuation) != null && l.target_profit) && (s.valuation = {
      ...s.valuation,
      target_profit: { ...s.valuation.target_profit, label: a || "Target Profit" }
    });
    const o = this._disclaimerText != null ? this._disclaimerText : this.disclaimerText ?? null;
    if (o !== null) {
      const m = this._disclaimerPunct ?? ".", E = o ? o.replace(/\.+$/, "") : "";
      s.disclaimer = E ? m + " " + E : "";
    }
    if ((p = (r = s.dealer) == null ? void 0 : r.logo_url) != null && p.startsWith("//") && (s.dealer = { ...s.dealer, logo_url: "https:" + s.dealer.logo_url }), (h = s.employee) != null && h.phone && (s.employee = { ...s.employee, phone: he(s.employee.phone) }), this.employees && this.employees.length > 0) {
      const m = this.employees[this._selectedEmployeeIndex] || this.employees[0];
      s.employee = { name: m.name || "", phone: he(m.phone || ""), email: m.email || "" };
    }
    if (s.disclosures && (s.disclosures = s.disclosures.filter((m) => m.answer && m.answer.trim() !== "")), (c = s.market) != null && c.comparables) {
      const m = s.market.comparables.map((g) => ({
        ...g,
        days_on_market: g.listing_type === "delisted" && g.delisted_days || g.days_on_market
      })), E = m.map((g) => g.days_on_market).filter((g) => g != null), we = E.length > 0 ? Math.round(E.reduce((g, $e) => g + $e, 0) / E.length) : (f = s.market.summary) == null ? void 0 : f.avg_days;
      s.market = {
        ...s.market,
        comparables: m,
        summary: { ...s.market.summary, avg_days: we }
      };
    }
    if (this._taxRatePct !== null && ((_ = s.valuation) != null && _.tax_savings) && ((y = s.offer) == null ? void 0 : y.amount) != null) {
      const m = Math.round(s.offer.amount * this._taxRatePct / 100);
      s.valuation = {
        ...s.valuation,
        tax_savings: {
          ...s.valuation.tax_savings,
          rate_pct: this._taxRatePct,
          amount: m,
          gross_value: s.offer.amount + m
        }
      };
    }
    return { ...i, raw_payload: s };
  }
  /** POSTs a printout request and returns the rendered PDF as a Blob, handling
   * both api modes. `vehicle`/`rawUrl` are only set in url mode. */
  async _fetchPrintout(e) {
    const t = { "Content-Type": "application/json", Accept: "application/pdf" };
    this.authToken && (t.Authorization = `Bearer ${this.authToken}`);
    const i = await fetch(`${this.apiBaseUrl}/printout-offer`, {
      method: "POST",
      headers: t,
      body: JSON.stringify(e)
    });
    if (this.apiMode === "binary") {
      if (!i.ok) {
        let r = "Request failed";
        try {
          r = (await i.json()).error || r;
        } catch {
        }
        throw new Error(r);
      }
      return { blob: await i.blob(), vehicle: null, rawUrl: null };
    }
    let s;
    try {
      s = await i.json();
    } catch {
      throw new Error("Server error — check terminal for traceback");
    }
    if (!i.ok) throw new Error(s.error || "Failed");
    const a = this.apiBaseUrl + s.pdf_url + "?t=" + Date.now(), o = { "ngrok-skip-browser-warning": "true" };
    return this.authToken && (o.Authorization = `Bearer ${this.authToken}`), { blob: await (await fetch(a, { headers: o })).blob(), vehicle: s.vehicle, rawUrl: a };
  }
  async _handleGenerate(e = !1) {
    var t, i;
    this._generating = !0, this._statusMsg = "Generating…", this._statusError = !1;
    try {
      const s = this._buildPrintoutRequest(this._buildDisplay(), e), a = s.raw_payload;
      this._lastPrintoutRequest = { ...s };
      const { blob: o, vehicle: l, rawUrl: r } = await this._fetchPrintout(s), p = (((t = a.customer) == null ? void 0 : t.name) || "Customer").replace(/[^a-zA-Z0-9 ]/g, "").trim();
      if (this.apiMode === "binary") {
        const h = await new Promise((c, f) => {
          const _ = new FileReader();
          _.onload = () => c(_.result), _.onerror = f, _.readAsDataURL(o);
        });
        this._pdfFilename = `${p}_${((i = a.vehicle) == null ? void 0 : i.vin) || "offer"}.pdf`, this._pdfUrl = h, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: h, blob: o },
          bubbles: !0,
          composed: !0
        }));
      } else {
        this._pdfVehicle = l;
        const h = (l == null ? void 0 : l.vin) || "offer";
        this._pdfFilename = `${p}_${h}.pdf`;
        const c = new File([o], this._pdfFilename, { type: "application/pdf" });
        this._currentBlobUrl && URL.revokeObjectURL(this._currentBlobUrl);
        const f = URL.createObjectURL(c);
        this._currentBlobUrl = f, this._pdfUrl = f, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: r },
          bubbles: !0,
          composed: !0
        }));
      }
    } catch (s) {
      this._statusMsg = s.message, this._statusError = !0, this.dispatchEvent(new CustomEvent("offer-error", {
        detail: { error: s.message },
        bubbles: !0,
        composed: !0
      }));
    }
    this._generating = !1;
  }
  /** Display block for printing only `sections` on their own: every other
   * section off, simple header, no footer or signature. Each section's
   * specifics (pills, market/recon/highlights views, scenario fields, layout)
   * come straight from the main settings — whether or not that section is
   * switched on in the main sheet. */
  _buildIndividualDisplay(e) {
    const t = (p) => e.includes(p), i = this._buildDisplay(), s = (p) => Object.values(p).every((h) => !h), a = (p) => Object.fromEntries(Object.keys(p).map((h) => [h, !0])), o = s(i.valuation) ? a(i.valuation) : i.valuation, l = Object.fromEntries(Object.entries(i.scenarios).map(([p, h]) => [
      p,
      s(h) ? a(h) : h
    ])), r = !i.sections.observations_highlights && !i.sections.observations_comments;
    return {
      ...i,
      valuation: o,
      scenarios: l,
      sections: {
        ...i.sections,
        valuation: t("valuation"),
        disclosures: t("disclosures"),
        disclosures_signature: !1,
        observations: t("observations"),
        observations_highlights: r || i.sections.observations_highlights,
        observations_comments: r || i.sections.observations_comments,
        market_summary: t("market") && this._marketDisplay === "summary",
        market_comparables: t("market") && this._marketDisplay === "full",
        market_scenarios: t("market_scenarios"),
        selected_scenarios: t("selected_scenarios"),
        recon_breakdown: t("recon"),
        photos: t("photos")
      },
      header_footer: "simple"
    };
  }
  _toggleIndividualSection(e, t) {
    const i = new Set(this._individualSections);
    t ? i.add(e) : i.delete(e), this._individualSections = k.filter((s) => i.has(s));
  }
  _individualFilename(e) {
    var i, s;
    return `${(((i = e.customer) == null ? void 0 : i.name) || "Customer").replace(/[^a-zA-Z0-9 ]/g, "").trim()}_${((s = e.vehicle) == null ? void 0 : s.vin) || "offer"}_sections.pdf`;
  }
  async _handleIndividualPrint() {
    this._individualBusy = !0, this._individualError = "";
    try {
      const e = this._buildPrintoutRequest(this._buildIndividualDisplay(this._individualSections)), { blob: t } = await this._fetchPrintout(e), i = URL.createObjectURL(t), s = document.createElement("a");
      s.href = i, s.download = this._individualFilename(e.raw_payload), s.click(), setTimeout(() => URL.revokeObjectURL(i), 1e4), this._individualOpen = !1;
    } catch (e) {
      this._individualError = e.message || "Could not generate the printout";
    }
    this._individualBusy = !1;
  }
  /** Hands the individual-sections request to the regular email-confirm modal, which
   * picks the recipient and sends it through the same pdf-send event. */
  _handleIndividualEmail() {
    const e = this._buildPrintoutRequest(this._buildIndividualDisplay(this._individualSections)), t = this._sectionOrder.filter((i) => this._individualSections.includes(i)).map((i) => i === "market" && this._marketDisplay === "summary" ? "Market Summary" : W[i]);
    this._sendPayloadOverride = {
      ...e,
      filename: this._individualFilename(e.raw_payload),
      kind: "sections",
      sections: t
    }, this._individualOpen = !1, this._confirmSendEmail = !0, this._sendMessageType = null, this._manualCustomerEmail = "";
  }
  _closeSendModal() {
    this._confirmSendEmail = !1, this._sendPayloadOverride = null;
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
      const a = await (await fetch(this._pdfUrl, { headers: i })).blob(), o = URL.createObjectURL(a), l = document.createElement("a");
      l.href = o, l.download = e, l.click(), setTimeout(() => URL.revokeObjectURL(o), 1e4);
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
    this._splitOpen = !1;
    const s = this._sendPayloadOverride;
    this._sendPayloadOverride = null, s || (this._doneSentVia = e, this._pdfSent = !0);
    const a = s || {
      ...this._lastPrintoutRequest,
      filename: this._pdfFilename || null
    };
    console.log("[pdf-send] send_via:", e), console.log("[pdf-send] to_email:", t), console.log("[pdf-send] message_type:", i), console.log("[pdf-send] payload:", a), this.dispatchEvent(new CustomEvent("pdf-send", {
      detail: { send_via: e, to_email: t, message_type: i, payload: a },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderHeader() {
    return d`
      <div class="component-header">
        <div class="wrap">
          <h1>LXN Offer Sheet Generator</h1>
        </div>
      </div>
    `;
  }
  _renderOfferCard() {
    if (this.templateMode)
      return d`
        <div class="card">
          <h2>Template</h2>
          <div style="font-size:13px; color:#667085; line-height:1.6;">
            Configure default printout settings for your location. Generate a preview below.
          </div>
        </div>
      `;
    const e = this._vehicleInfo;
    return d`
      <div class="card">
        <div class="offer-header-row">
          <h2>Offer</h2>
        </div>
        ${e ? d`
          <div class="vehicle-info">
            <div class="amount">${e.amount}</div>
            <div class="desc">${e.desc}</div>
            ${e.vin ? d`<div style="font-size:11px;color:#006073;margin-top:2px;">${e.vin}</div>` : u}
          </div>
        ` : d`<div style="font-size:13px; color:#aab4c0;">Loading offer details…</div>`}
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
    const e = this._isOnePage(), t = N[this._fontSizeIndex].label, i = !!(this.templateSharedDisplay || this.templatePdfDisplay), s = i ? "template" : "default", a = i ? "template defaults" : "default configuration", o = k.map((l) => this._renderShowHideGroup(l));
    return d`
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
                @mouseenter="${(l) => this._showTooltip(l, "Current display is restored when returning to 'Full'")}"
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
            <div class="section-chevron">${Y}</div>
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
            ${!this.templateMode && this.employees && this.employees.length > 0 ? d`
              <div class="config-row">
                <span>Employee</span>
                <select
                  style="font-size:12px;padding:3px 8px;border:1.5px solid #d0d5dd;border-radius:6px;background:#fff;color:#222222;cursor:pointer;outline:none;"
                  @change="${(l) => {
      this._selectedEmployeeIndex = parseInt(l.target.value);
    }}"
                >
                  ${this.employees.map((l, r) => d`
                    <option value="${r}" ?selected="${r === this._selectedEmployeeIndex}">${l.name}</option>
                  `)}
                </select>
              </div>
            ` : u}
            <div class="config-row">
              <span>Font size</span>
              <div class="ctrl-group ${this._isLocked("font_size") ? "locked" : ""}">
                <div class="stepper">
                  <button class="step-btn" ?disabled="${this._fontSizeIndex <= 0 || this._isLocked("font_size")}"
                          @click="${() => this._handleFontSizeStep(-1)}">−</button>
                  <span class="stepper-value font-size-display">${t}</span>
                  <button class="step-btn" ?disabled="${this._fontSizeIndex >= N.length - 1 || this._isLocked("font_size")}"
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
            <div class="config-row">
              <span>Recon</span>
              <div class="ctrl-group ${this._isLocked("recon_display") ? "locked" : ""}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._reconView === "summary" ? "active" : ""}"
                          ?disabled="${this._isLocked("recon_display")}"
                          @click="${() => this._handleSegmentedClick("recon-display", "summary")}">Summary</button>
                  <button class="seg-btn ${this._reconView === "detail" ? "active" : ""}"
                          ?disabled="${this._isLocked("recon_display")}"
                          @click="${() => this._handleSegmentedClick("recon-display", "detail")}">Detail</button>
                </div>
                ${this._lk("recon_display")}
              </div>
            </div>
            <div class="config-row">
              <span>Highlights</span>
              <div class="ctrl-group ${this._isLocked("highlights_display") ? "locked" : ""}">
                <div class="segmented-control">
                  <button class="seg-btn ${this._highlightsView === "summary" ? "active" : ""}"
                          ?disabled="${this._isLocked("highlights_display")}"
                          @click="${() => this._handleSegmentedClick("highlights-display", "summary")}">Summary</button>
                  <button class="seg-btn ${this._highlightsView === "detail" ? "active" : ""}"
                          ?disabled="${this._isLocked("highlights_display")}"
                          @click="${() => this._handleSegmentedClick("highlights-display", "detail")}">Detail</button>
                </div>
                ${this._lk("highlights_display")}
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
                  @change="${(l) => {
      this._disclaimerPunct = l.target.value;
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
            <div class="section-chevron">${Y}</div>
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
            ${o}
            <!-- Signature (always at end of PDF, not draggable) -->
            <div class="toggle-group" data-group="signature">
              <div class="group-row ${this._isLocked("signature") ? "group-row-locked" : ""}">
                <label class="group-header">
                  <input
                    type="checkbox"
                    data-group="signature"
                    .checked="${this._groups.signature === "checked"}"
                    ?disabled="${this._isLocked("signature")}"
                    @change="${(l) => this._handleGroupChange("signature", l.target.checked)}"
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
              <div class="section-chevron">${Y}</div>
            </div>
          </div>
          <div class="section-body">
            <div class="sortable-list ${this._isLocked("section_order") ? "disabled" : ""}"
              @dragover="${(l) => l.preventDefault()}"
              @drop="${(l) => this._handleListDrop(l)}"
            >
              ${this._sectionOrder.map((l, r) => {
      const p = this._isSectionDisabled(l) || this._isLocked("section_order");
      return d`
                  <div
                    class="sortable-item ${p ? "disabled" : ""}"
                    data-section="${l}"
                    draggable="${p ? "false" : "true"}"
                    @dragstart="${(h) => this._handleDragStart(h, l)}"
                    @dragover="${(h) => this._handleDragOver(h, l)}"
                    @drop="${(h) => this._handleDrop(h)}"
                    @dragend="${(h) => this._handleDragEnd(h)}"
                  >
                    <span class="drag-handle">⠿</span>
                    <span>${W[l]}</span>
                    <div class="sort-arrows">
                      <button class="sort-arrow" ?disabled="${p || r === 0}" @click="${() => this._handleMoveSection(l, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${p || r === this._sectionOrder.length - 1}" @click="${() => this._handleMoveSection(l, 1)}">▼</button>
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>
        </div>

        </div><!-- end settings-locked wrapper -->

        <div class="divider"></div>

        ${this._statusError && this._statusMsg ? d`
          <div class="action-msg error">${this._statusMsg}</div>
        ` : u}

        ${this.templateMode ? d`
          <button
            class="btn btn-green"
            ?disabled="${this._generating || this._finalizing}"
            @click="${() => this._handleApply()}"
          >${this._generating ? "Saving…" : this._savedConfirm ? "Saved ✓" : "Save Template"}</button>
        ` : u}

        ${this.templateMode ? u : d`
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
            ${this.sharedDisplay || this.pdfDisplay ? this._confirmReset ? d`
              <div class="confirm-reset">
                <span class="confirm-reset-msg">Reset all settings to the ${a}?</span>
                <div class="confirm-reset-btns">
                  <button class="confirm-reset-yes" @click="${() => this._handleReset()}">Yes, reset</button>
                  <button class="confirm-reset-no"  @click="${() => {
      this._confirmReset = !1;
    }}">Cancel</button>
                </div>
              </div>
            ` : d`
              <button class="reset-btn" @click="${() => {
      this._confirmReset = !0;
    }}">Reset to ${s}</button>
            ` : u}
          </div>
        `}
      </div>
    `;
  }
  _renderShowHideGroup(e) {
    if (e === "market_scenarios") return this._renderScenarioGroup("market_scenarios", "Market Scenarios", "Market");
    if (e === "selected_scenarios") return this._renderScenarioGroup("selected_scenarios", "Selected Scenarios", "Selected");
    const t = this._isLocked(e), i = this._groups[e], a = d`
      <div class="group-row ${t ? "group-row-locked" : ""}">
        <label class="group-header">
          <input type="checkbox" data-group="${e}"
            .checked="${i === "checked" || i === "indeterminate"}"
            ?disabled="${t}"
            @change="${(o) => this._handleGroupChange(e, o.target.checked)}"
          >${{ valuation: "Valuation", disclosures: "Disclosures", observations: "Observations", market: "Selected Comparables", recon: "Recon", photos: "Photos" }[e]}
        </label>
        ${this._lk(e)}
      </div>`;
    if (e === "valuation") {
      const o = !!this._pillsOpen.valuation;
      return d`
        <div class="toggle-group" data-group="valuation">
          ${a}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${o ? d`
              ${this._renderPill("valuation.retail_value", "Retail Value", "valuation")}
              ${this._renderPill("valuation.recon", "Recon", "valuation")}
              ${this._renderPill("valuation.fixed_overhead", "Fixed Overhead", "valuation")}
              ${this._renderPill("valuation.target_profit", this._profitName || "Target Profit", "valuation")}
              ${this._renderPill("valuation.tax_savings", "Tax Savings", "valuation")}
            ` : u}
            ${this._renderPillsToggle("valuation")}
          </div>
        </div>`;
    }
    return e === "observations" ? d`
        <div class="toggle-group" data-group="observations">
          ${a}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${this._renderPill("sections.observations_highlights", "Highlights", "observations")}
            ${this._renderPill("sections.observations_comments", "Comments", "observations")}
          </div>
        </div>` : d`
      <div class="toggle-group" data-group="${e}">
        ${a}
      </div>`;
  }
  /** Pill keys for a toggle-able group — same lists as _recomputeGroupState. */
  _pillKeysForGroup(e) {
    return e === "valuation" ? ["valuation.retail_value", "valuation.recon", "valuation.fixed_overhead", "valuation.target_profit", "valuation.tax_savings"] : e === "observations" ? ["sections.observations_highlights", "sections.observations_comments"] : e === "market_scenarios" || e === "selected_scenarios" ? P.map((t) => `${e}.${t.key}`) : [];
  }
  /** Independent toggle — not nested under Selected Comparables, not part of the
   * draggable section order (mirrors how Signature is handled). Each of the 12
   * KPI fields gets its own pill, same idiom as Valuation/Observations. */
  _renderPillsToggle(e) {
    const t = !!this._pillsOpen[e], i = this._pillKeysForGroup(e), s = i.filter((o) => !this._isPillLockedStale(o) && this._pills[o]).length, a = i.length;
    return d`
      <span
        class="pill-toggle"
        title="${t ? "Collapse fields" : "Expand fields"}"
        @click="${() => this._togglePillsOpen(e)}"
      >${t ? "‹ Collapse" : `Expand (${s}/${a}) ›`}</span>
    `;
  }
  _renderScenarioGroup(e, t, i) {
    const s = this._isLocked(e), a = this._groups[e], o = a === "checked" || a === "indeterminate", l = !!this._pillsOpen[e];
    return d`
      <div class="toggle-group" data-group="${e}">
        <div class="group-row ${s ? "group-row-locked" : ""}">
          <label class="group-header">
            <input type="checkbox" data-group="${e}"
              .checked="${o}"
              ?disabled="${s}"
              @change="${(r) => this._handleGroupChange(e, r.target.checked)}"
            >${t}
          </label>
          ${this._lk(e)}
        </div>
        <div class="pill-group ${s ? "locked" : ""} ${a === "unchecked" ? "group-off" : ""}">
          ${l ? P.map((r) => this._renderPill(`${e}.${r.key}`, r.label.replace("{basis}", i), e)) : u}
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
    const i = this._ensureTooltip(), s = this._tooltipBubble, a = this._tooltipLabel, o = e.currentTarget, r = (o.classList.contains("email-icon-btn") && o.querySelector("svg") || o).getBoundingClientRect();
    s.style.width = "", a.textContent = t;
    const p = document.createRange();
    p.selectNodeContents(a);
    const h = Array.from(p.getClientRects(), (c) => c.width);
    s.style.width = `${Math.ceil(Math.max(...h))}px`, i.style.top = `${r.top - 10}px`, i.style.left = `${r.left + r.width / 2}px`, s.getAnimations().forEach((c) => c.cancel()), s.animate(
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
    const s = this._isPillLockedStale(e), a = !s && this._pills[e], o = "Not available: Offer has been adjusted manually";
    return d`
      <span
        class="pill ${a ? "active" : ""} ${s ? "stale" : ""}"
        @mouseenter="${(l) => {
      s && this._showTooltip(l, o);
    }}"
        @mouseleave="${() => {
      s && this._hideTooltip();
    }}"
        @click="${() => {
      s || this._handlePillClick(e, i);
    }}"
      >${s ? d`<span class="pill-stale-icon">${Ye}</span>` : u}${t}</span>
    `;
  }
  _renderSendInline() {
    var a;
    const e = this._resolveEmployee(), t = !!((a = this.payload) != null && a.customer) || !!(e != null && e.email), i = !!this._pdfUrl && !this._generating;
    return t ? d`
      <button
        class="email-icon-btn"
        ?disabled="${!i}"
        @mouseenter="${(o) => this._showTooltip(o, "Email offer printout")}"
        @mouseleave="${() => this._hideTooltip()}"
        @click="${() => {
      this._hideTooltip(), this._sendPayloadOverride = null, this._confirmSendEmail = !0, this._sendMessageType = null, this._manualCustomerEmail = "";
    }}"
      >${fe}</button>
    ` : u;
  }
  _renderSendConfirmModal() {
    var p, h;
    const e = this._resolveEmployee(), t = ((h = (p = this.payload) == null ? void 0 : p.customer) == null ? void 0 : h.email) || "", i = (e == null ? void 0 : e.email) || "", s = (e == null ? void 0 : e.name) || "an unspecified employee", a = this._sendMessageType || (t ? "customer" : i ? "employee" : "customer"), o = a === "customer" && !t, l = a === "employee" ? i : t || this._manualCustomerEmail.trim(), r = !!l;
    return d`
      <div class="modal-overlay" @click="${() => this._closeSendModal()}">
        <div class="modal-box" @click="${(c) => c.stopPropagation()}">
          <p class="modal-msg">
            ${this._sendPayloadOverride ? d`Send the selected sections?` : d`Send this offer as an offer made by <strong>${s}</strong>?`}
          </p>

          <div class="modal-recipient-group">
            <label class="modal-recipient-option">
              <input
                type="radio"
                name="send-recipient"
                .checked="${a === "customer"}"
                @change="${() => {
      this._sendMessageType = "customer";
    }}"
              />
              <span>Customer's inbox${t ? d` — ${t}` : u}</span>
            </label>
            ${i ? d`
              <label class="modal-recipient-option">
                <input
                  type="radio"
                  name="send-recipient"
                  .checked="${a === "employee"}"
                  @change="${() => {
      this._sendMessageType = "employee";
    }}"
                />
                <span>Employee's inbox — ${i}</span>
              </label>
            ` : u}
          </div>

          ${o ? d`
            <input
              type="email"
              class="modal-email-input"
              placeholder="Customer email address"
              .value="${this._manualCustomerEmail}"
              @input="${(c) => {
      this._manualCustomerEmail = c.target.value;
    }}"
            />
          ` : u}

          <div class="modal-btns">
            <button class="modal-btn-confirm"
              ?disabled="${!r}"
              @click="${() => {
      this._confirmSendEmail = !1, this._handleSend("email", l, a);
    }}"
            >Yes, send</button>
            <button class="modal-btn-cancel" @click="${() => this._closeSendModal()}">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  _renderIndividualModal() {
    var a;
    const e = this._resolveEmployee(), t = !!((a = this.payload) != null && a.customer) || !!(e != null && e.email), i = this._individualSections.length === 0, s = this._individualBusy;
    return d`
      <div class="modal-overlay" @click="${() => {
      s || (this._individualOpen = !1);
    }}">
        <div class="modal-box" @click="${(o) => o.stopPropagation()}">
          <p class="modal-msg modal-title">Download or Email Individual Sections</p>

          <div class="modal-recipient-group">
            ${this._sectionOrder.map((o) => d`
              <label class="modal-recipient-option">
                <input
                  type="checkbox"
                  .checked="${this._individualSections.includes(o)}"
                  ?disabled="${s}"
                  @change="${(l) => this._toggleIndividualSection(o, l.target.checked)}"
                />
                <span>${W[o]}</span>
              </label>
            `)}
          </div>

          ${this._individualError ? d`<div class="action-msg error" style="margin:0 0 12px;">${this._individualError}</div>` : u}

          <div class="modal-btns">
            <button class="modal-btn-confirm modal-btn-icon"
              ?disabled="${i || s}"
              @click="${() => this._handleIndividualPrint()}"
            >${s ? "Generating…" : d`${_e}Download`}</button>
            ${t ? d`
              <button class="modal-btn-confirm modal-btn-icon modal-btn-teal"
                ?disabled="${i || s}"
                @click="${() => this._handleIndividualEmail()}"
              >${fe}Email</button>
            ` : u}
            <button class="modal-btn-cancel" ?disabled="${s}" @click="${() => {
      this._individualOpen = !1;
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
    const e = !!this._pdfUrl, t = this._generating || this._finalizing, i = t || !!this.apiBaseUrl && !e && !this._statusError, a = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && navigator.pdfViewerEnabled;
    return d`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <div
              class="preview-title-group"
              @mouseenter="${(o) => this._showTooltip(o, this._previewStale ? "Unapplied changes" : "Up to date")}"
              @mouseleave="${() => this._hideTooltip()}"
            >
              <h2>${a ? "Preview" : "PDF"}</h2>
              <span class="preview-status-dot ${this._previewStale ? "stale" : ""}"></span>
            </div>
            ${this.templateMode ? u : d`
              <div class="preview-icon-btns">
                ${this._renderSendInline()}
                ${e && !t && a ? d`
                  <button
                    class="email-icon-btn"
                    type="button"
                    @mouseenter="${(o) => this._showTooltip(o, "Download printout")}"
                    @mouseleave="${() => this._hideTooltip()}"
                    @click="${() => {
      this._hideTooltip(), this._handleDownloadPdf();
    }}"
                  >${_e}</button>
                ` : u}
                <button
                  class="email-icon-btn"
                  type="button"
                  ?disabled="${!this.apiBaseUrl}"
                  @mouseenter="${(o) => this._showTooltip(o, "Download or Email Individual Sections")}"
                  @mouseleave="${() => this._hideTooltip()}"
                  @click="${() => {
      this._hideTooltip(), this._individualError = "", this._individualOpen = !0;
    }}"
                >${We}</button>
              </div>
              ${this._confirmSendEmail ? this._renderSendConfirmModal() : u}
              ${this._individualOpen ? this._renderIndividualModal() : u}
            `}
          </div>
          ${i ? d`
            <div class="preview-loading">
              <div class="pulse-dots">
                <span></span><span></span><span></span>
              </div>
              Generating preview…
            </div>
          ` : u}
          ${!i && !e ? d`
            <div class="empty-preview">${this._statusError && this._statusMsg ? this._statusMsg : "Preview will appear once a payload is loaded"}</div>
          ` : u}
          ${e && !t && a ? d`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : u}
          ${e && !t && !a ? d`
            <div style="width:100%;aspect-ratio:612/792;display:flex;align-items:center;justify-content:center;padding:20px;border:2px solid #d0d5dd;border-radius:8px;">
              ${window.natively ? d`
                <button
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;"
                  @click="${() => window.natively.openPDF({ base64: this._pdfUrl.split(",")[1], fileName: "offer.pdf", download: !0 }, () => {
    })}"
                >Open PDF</button>
              ` : d`
                <a
                  href="${this._pdfUrl}"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                  style="width:auto;padding:10px 24px;text-decoration:none;"
                >Open PDF</a>
              `}
            </div>
          ` : u}
        </div>
      </div>
    `;
  }
  // ── Main render ────────────────────────────────────────────────────────────
  render() {
    return d`
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
F(J, "properties", {
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
  _reconView: { type: String, state: !0 },
  // 'summary' | 'detail'
  _highlightsView: { type: String, state: !0 },
  // 'summary' | 'detail'
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
  _previewStale: { type: Boolean, state: !0 },
  // Individual-sections modal — selection lives for the session only, never saved
  _individualOpen: { type: Boolean, state: !0 },
  _individualSections: { type: Array, state: !0 },
  _individualBusy: { type: Boolean, state: !0 },
  _individualError: { type: String, state: !0 }
}), F(J, "styles", De`
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
customElements.define("lexen-offer-sheet", J);
export {
  J as LexenOfferSheet
};
