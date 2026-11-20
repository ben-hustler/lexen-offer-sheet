var Ce = Object.defineProperty;
var Oe = (r, e, t) => e in r ? Ce(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var F = (r, e, t) => Oe(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, te = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), oe = /* @__PURE__ */ new WeakMap();
let xe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Le = (r) => new xe(typeof r == "string" ? r : r + "", void 0, ie), ze = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new xe(t, r, ie);
}, Re = (r, e) => {
  if (te) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = V.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, ae = te ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Le(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: Me, getOwnPropertyDescriptor: Be, getOwnPropertyNames: Ne, getOwnPropertySymbols: Ue, getPrototypeOf: Ie } = Object, v = globalThis, ne = v.trustedTypes, Ve = ne ? ne.emptyScript : "", G = v.reactiveElementPolyfillSupport, L = (r, e) => r, Q = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ve : null;
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
} }, ke = (r, e) => !Te(r, e), re = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: ke };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let D = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = re) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Me(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Be(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? re;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = Ie(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const t = this.properties, i = [...Ne(t), ...Ue(t)];
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
      for (const s of i) t.unshift(ae(s));
    } else e !== void 0 && t.push(ae(e));
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
    return Re(e, this.constructor.elementStyles), e;
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
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Q).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Q;
      this._$Em = s;
      const c = n.fromAttribute(t, l.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var a;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? ke)(o, t) || i.useDefault && i.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
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
        const { wrapped: l } = a, n = this[o];
        l !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, a, n);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[L("elementProperties")] = /* @__PURE__ */ new Map(), D[L("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: D }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, le = (r) => r, j = z.trustedTypes, de = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, we = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + b, je = `<${$e}>`, $ = document, T = () => $.createComment(""), M = (r) => r === null || typeof r != "object" && typeof r != "function", se = Array.isArray, He = (r) => se(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", q = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, he = />/g, x = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ue = /"/g, Se = /^(?:script|style|textarea|title)$/i, Fe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), d = Fe(1), A = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), k = $.createTreeWalker($, 129);
function Ee(r, e) {
  if (!se(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const Ge = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = O;
  for (let l = 0; l < t; l++) {
    const n = r[l];
    let c, p, h = -1, f = 0;
    for (; f < n.length && (a.lastIndex = f, p = a.exec(n), p !== null); ) f = a.lastIndex, a === O ? p[1] === "!--" ? a = ce : p[1] !== void 0 ? a = he : p[2] !== void 0 ? (Se.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = x) : p[3] !== void 0 && (a = x) : a === x ? p[0] === ">" ? (a = s ?? O, h = -1) : p[1] === void 0 ? h = -2 : (h = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? x : p[3] === '"' ? ue : pe) : a === ue || a === pe ? a = x : a === ce || a === he ? a = O : (a = x, s = void 0);
    const _ = a === x && r[l + 1].startsWith("/>") ? " " : "";
    o += a === O ? n + je : h >= 0 ? (i.push(c), n.slice(0, h) + we + n.slice(h) + b + _) : n + b + (h === -2 ? l : _);
  }
  return [Ee(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const l = e.length - 1, n = this.parts, [c, p] = Ge(e, t);
    if (this.el = B.createElement(c, i), k.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = k.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(we)) {
          const f = p[a++], _ = s.getAttribute(h).split(b), y = /([.?@])?(.*)/.exec(f);
          n.push({ type: 1, index: o, name: y[2], strings: _, ctor: y[1] === "." ? We : y[1] === "?" ? Ke : y[1] === "@" ? Ye : H }), s.removeAttribute(h);
        } else h.startsWith(b) && (n.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Se.test(s.tagName)) {
          const h = s.textContent.split(b), f = h.length - 1;
          if (f > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(h[_], T()), k.nextNode(), n.push({ type: 2, index: ++o });
            s.append(h[f], T());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $e) n.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(b, h + 1)) !== -1; ) n.push({ type: 7, index: o }), h += b.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = $.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(r, e, t = r, i) {
  var a, l;
  if (e === A) return e;
  let s = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const o = M(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = C(r, s._$AS(r, e.values), s, i)), e;
}
class qe {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? $).importNode(t, !0);
    k.currentNode = s;
    let o = k.nextNode(), a = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let c;
        n.type === 2 ? c = new N(o, o.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (c = new Ze(o, this, e)), this._$AV.push(c), n = i[++l];
      }
      a !== (n == null ? void 0 : n.index) && (o = k.nextNode(), a++);
    }
    return k.currentNode = $, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class N {
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
    e = C(this, e, t), M(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : He(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = e : this.T($.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = B.createElement(Ee(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const a = new qe(s, this), l = a.u(this.options);
      a.p(t), this.T(l), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new B(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new N(this.O(T()), this.O(T()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = le(e).nextSibling;
      le(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = C(this, e, t, 0), a = !M(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
    else {
      const l = e;
      let n, c;
      for (e = o[0], n = 0; n < o.length - 1; n++) c = C(this, l[i + n], t, n), c === A && (c = this._$AH[n]), a || (a = !M(c) || c !== this._$AH[n]), c === u ? e = u : e !== u && (e += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class We extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ke extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Ye extends H {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? u) === A) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
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
    C(this, e);
  }
}
const W = z.litHtmlPolyfillSupport;
W == null || W(B, N), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.3");
const Je = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new N(e.insertBefore(T(), o), o, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class R extends D {
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
    return A;
  }
}
var ye;
R._$litElement$ = !0, R.finalized = !0, (ye = w.litElementHydrateSupport) == null || ye.call(w, { LitElement: R });
const K = w.litElementPolyfillSupport;
K == null || K({ LitElement: R });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
function _e(r) {
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
const U = [
  { label: "Extra Small", delta: -1 },
  { label: "Small", delta: 0 },
  { label: "Medium", delta: 1 },
  { label: "Large", delta: 2 },
  { label: "Extra Large", delta: 3 }
], E = ["valuation", "disclosures", "observations", "market", "market_scenarios", "selected_scenarios", "recon", "photos"], Y = {
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
], ge = /* @__PURE__ */ new Set(["costMkt", "prcMktAdj", "retail", "ACV"]), Z = d`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`, Qe = d`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
d`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5.5" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.5V4a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const me = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`, be = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`, et = d`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`, tt = d`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>`, it = d`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.4 3.6z"/></svg>`, Pe = ["disclosures", "recon", "photos", "market_scenarios", "selected_scenarios"], st = [...Pe, "sections.observations_comments", "market_display", "highlights_display"], ot = d`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.5V6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="8.3" r="0.65" fill="currentColor"/></svg>`, I = 8, J = 10, ve = 8;
function X(r) {
  const e = window.devicePixelRatio || 1;
  return Math.round(r * e) / e;
}
class at {
  constructor() {
    this.outer = null, this.bubble = null, this.label = null, this.arrow = null, this.anchor = null, this.visible = !1, this.reposition = () => this.updatePosition(), this.dismissOnScroll = () => this.hide();
  }
  ensure() {
    if (this.outer) return;
    const e = document.createElement("div");
    Object.assign(e.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
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
      opacity: "0",
      textWrap: "balance"
    });
    const i = document.createElement("span");
    t.appendChild(i);
    const s = document.createElement("div");
    Object.assign(s.style, {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      width: "0",
      height: "0",
      borderStyle: "solid"
    }), this.setArrowOrientation(s, "above"), t.appendChild(s), e.appendChild(t), this.outer = e, this.bubble = t, this.label = i, this.arrow = s;
  }
  // 'above'/'below' = where the bubble sits relative to the anchor. 1px
  // overlap, not flush — avoids a hairline seam while animating.
  setArrowOrientation(e, t) {
    Object.assign(
      e.style,
      t === "above" ? { top: "calc(100% - 1px)", bottom: "", borderWidth: "8px 8px 0", borderColor: "#333 transparent transparent transparent" } : { top: "", bottom: "calc(100% - 1px)", borderWidth: "0 8px 8px", borderColor: "transparent transparent #333 transparent" }
    );
  }
  show(e, t) {
    if (this.visible && this.anchor === e) return;
    this.visible = !0, this.ensure();
    const { outer: i, bubble: s, label: o } = this;
    this.anchor = e;
    const a = e.closest("dialog") ?? document.body;
    i.parentElement !== a && a.appendChild(i), s.style.width = "", o.textContent = t;
    const l = document.createRange();
    l.selectNodeContents(o);
    const n = Array.from(l.getClientRects(), (c) => c.width);
    s.style.width = `${Math.ceil(Math.max(...n))}px`, this.updatePosition(), window.addEventListener("scroll", this.dismissOnScroll, !0), window.addEventListener("resize", this.reposition), s.getAnimations().forEach((c) => c.cancel()), s.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 160, easing: "ease-out", fill: "forwards" }
    );
  }
  hide() {
    this.visible = !1, window.removeEventListener("scroll", this.dismissOnScroll, !0), window.removeEventListener("resize", this.reposition);
    const e = this.bubble;
    e && (e.getAnimations().forEach((t) => t.cancel()), e.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(6px)" }
      ],
      { duration: 120, easing: "ease-in", fill: "forwards" }
    ));
  }
  destroy() {
    var e;
    this.hide(), (e = this.outer) == null || e.remove(), this.outer = null, this.bubble = null, this.label = null, this.arrow = null, this.anchor = null;
  }
  updatePosition() {
    if (!this.anchor || !this.outer || !this.arrow) return;
    const e = this.outer, t = this.anchor.getBoundingClientRect(), i = t.left + t.width / 2, s = t.top - J - e.offsetHeight >= I;
    this.setArrowOrientation(this.arrow, s ? "above" : "below");
    const o = s ? t.top - J - e.offsetHeight : t.bottom + J, a = Math.max(I, window.innerWidth - I - e.offsetWidth), l = Math.min(Math.max(i - e.offsetWidth / 2, I), a), n = Math.min(
      Math.max(i - l, ve),
      e.offsetWidth - ve
    );
    this.arrow.style.left = `${X(n)}px`, e.style.transform = `translate3d(${X(l)}px, ${X(o)}px, 0)`;
  }
}
class ee extends R {
  constructor() {
    super(), this.apiBaseUrl = "", this.apiMode = "url", this.authToken = "", this.templateMode = !1, this.payload = null, this.sharedDisplay = null, this.pdfDisplay = null, this.templateSharedDisplay = null, this.templatePdfDisplay = null, this.employees = [], this._selectedEmployeeIndex = 0, this._vehicleInfo = null, this._generalOpen = !1, this._layoutOpen = !1, this._showHideOpen = !1, this._mode = "full", this._valueDisplay = "offer", this._taxRatePct = null, this._profitName = null, this._disclaimerText = null, this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...E], this._pills = this._defaultPills(), this._groups = this._defaultGroups(), this._pillsOpen = { valuation: !0, market_scenarios: !0, selected_scenarios: !0 }, this._finalized = !1, this._autoPreviewDone = !1, this._autoPreviewTimer = null, this._autoRefreshTimer = null, this._splitOpen = !1, this._sendVia = null, this._doneSentVia = null, this._pdfSent = !1, this._confirmSendEmail = !1, this._sendMessageType = null, this._manualCustomerEmail = "", this._previewStale = !1, this._individualOpen = !1, this._individualSections = [], this._individualBusy = !1, this._individualError = "", this._sendPayloadOverride = null, this._generating = !1, this._finalizing = !1, this._statusMsg = "", this._statusError = !1, this._pdfUrl = "", this._pdfVehicle = null, this._lastPrintoutRequest = null, this._savedConfirm = !1, this._lockOverridden = !1, this._confirmReset = !1, this._undoStack = [], this._redoStack = [], this._locks = {
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
    }, this._dragSrcSection = null, this._dragSrcIndex = -1, this._placeholder = null, this._pendingDataLoad = !1, this._tooltip = new at();
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
        [`market_scenarios.${e.key}`, !ge.has(e.key)],
        [`selected_scenarios.${e.key}`, !ge.has(e.key)]
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
    }), e.section_order != null && (this._sectionOrder = e.section_order.filter((a) => E.includes(a))), e.tax_rate_pct != null && (this._taxRatePct = e.tax_rate_pct), e.value_display != null && (this._valueDisplay = e.value_display), e.profit_name != null && (this._profitName = e.profit_name), e.market_view != null && (this._marketDisplay = e.market_view === "summary" ? "summary" : "full"), e.recon_view != null && (this._reconView = e.recon_view === "detail" ? "detail" : "summary"), e.highlights_view != null && (this._highlightsView = e.highlights_view === "detail" ? "detail" : "summary");
  }
  _applyPdfDisplay(e) {
    e && (e.mode != null && (this._mode = e.mode), e.font_size_index != null && (this._fontSizeIndex = e.font_size_index), e.photos_per_row != null && (this._photosPerRow = e.photos_per_row), e.disc_layout != null && (this._discLayout = e.disc_layout), e.scenario_layout != null && (this._scenarioLayout = e.scenario_layout), e.disclaimer_text != null && (this._disclaimerText = e.disclaimer_text), e.disclaimer_punct != null && (this._disclaimerPunct = e.disclaimer_punct), e.selected_emp_idx != null && (this._selectedEmployeeIndex = e.selected_emp_idx), e.signature != null && (this._groups = { ...this._groups, signature: e.signature ? "checked" : "unchecked" }), e.locks && (this._locks = { ...this._locks, ...e.locks }));
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  disconnectedCallback() {
    super.disconnectedCallback(), this._tooltip.destroy();
  }
  firstUpdated() {
    this.dispatchEvent(new CustomEvent("component-ready", {
      bubbles: !0,
      composed: !0
    }));
  }
  updated(e) {
    var o, a, l, n, c, p;
    const t = this._pendingDataLoad;
    if (e.has("sharedDisplay") || e.has("pdfDisplay") ? this._pendingDataLoad = !0 : this._pendingDataLoad && (this._pendingDataLoad = !1), e.has("sharedDisplay") && this.sharedDisplay && this._applySharedDisplay(this.sharedDisplay), e.has("pdfDisplay") && this.pdfDisplay && this._applyPdfDisplay(this.pdfDisplay), (e.has("sharedDisplay") || e.has("pdfDisplay")) && this._autoPreviewDone && !this._savedDisplayConsumed && this.payload && this.apiBaseUrl && (this._savedDisplayConsumed = !0, clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
      this._handleGenerate();
    }, 300)), e.has("payload") && this.payload && (this._vehicleInfo = this._vehicleInfoFromData(this.payload), this._taxRatePct === null)) {
      const h = (l = (a = (o = this.payload) == null ? void 0 : o.valuation) == null ? void 0 : a.tax_savings) == null ? void 0 : l.rate_pct;
      this._taxRatePct = h != null ? parseFloat(parseFloat(h).toFixed(2)) : 0;
    }
    if (e.has("taxRate") && this.taxRate != null && this._taxRatePct === null && (this._taxRatePct = parseFloat(parseFloat(this.taxRate).toFixed(2))), e.has("profitLabel") && this.profitLabel != null && (!this.templateMode || this._profitName === null || this._profitName === void 0) && (this._profitName = this.profitLabel), e.has("disclaimerText") && this.disclaimerText != null && (!this.templateMode || this._disclaimerText === null || this._disclaimerText === void 0) && (this._disclaimerText = this.disclaimerText), e.has("employees") && ((n = this.employees) != null && n.length) && ((p = (c = this.payload) == null ? void 0 : c.employee) != null && p.name)) {
      const h = this.employees.findIndex((f) => f.name === this.payload.employee.name);
      h !== -1 && (this._selectedEmployeeIndex = h);
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
    ].some((f) => e.has(f)) && (this._savedConfirm = !1), e.has("locked") && (this._finalized = !!this.locked, this._lockOverridden = !1, this._sheetLocked() && this._previewStale && this._handleDiscardChanges()), !this._autoPreviewDone && this.apiBaseUrl && ["payload", "sharedDisplay", "pdfDisplay", "employees", "locked"].some((h) => e.has(h)) && (clearTimeout(this._autoPreviewTimer), this._autoPreviewTimer = setTimeout(() => {
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
      for (const [h, f] of Object.entries(this._groups)) {
        const _ = s.querySelector(`input[data-group="${h}"]`);
        _ && (_.indeterminate = f === "indeterminate", _.checked = f === "checked" || f === "indeterminate");
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
    var a, l, n;
    const t = e === "market_scenarios" ? "market" : e === "selected_scenarios" ? "selected" : null;
    if (!t) return !1;
    const i = this._getPayloadData(), s = (a = i == null ? void 0 : i.offer) == null ? void 0 : a.amount, o = this._parseCurrency((n = (l = i == null ? void 0 : i.scenarios) == null ? void 0 : l[t]) == null ? void 0 : n.ACV);
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
      const i = P.map((o) => `${e}.${o.key}`), s = i.filter((o) => this._pills[o]).length;
      s === 0 ? t[e] = "unchecked" : s === i.length ? t[e] = "checked" : t[e] = "indeterminate";
    }
    this._groups = t;
  }
  /** Layout list as shown: active sections first, inactive ones after —
   * each in their real order. Purely visual: _sectionOrder keeps inactive
   * sections where they were, so turning one back on puts it back in place. */
  _displayOrder() {
    const e = this._sectionOrder;
    return [...e.filter((t) => !this._isSectionDisabled(t)), ...e.filter((t) => this._isSectionDisabled(t))];
  }
  /** Writes a new sequence of the active sections back into _sectionOrder,
   * filling the slots active sections occupy so inactive ones don't move. */
  _setActiveOrder(e) {
    const t = [...e];
    this._sectionOrder = this._sectionOrder.map((i) => this._isSectionDisabled(i) ? i : t.shift());
  }
  _isOnePage() {
    return this._mode === "one_page";
  }
  /** True when One-Page hides `key` (a section, pill path or view control). */
  _onePageLocked(e) {
    return this._isOnePage() && st.includes(e);
  }
  /** Groups / pills / views as they print: the real settings with One-Page's
   * locks applied on top. */
  _effectiveSettings() {
    if (!this._isOnePage())
      return { groups: this._groups, pills: this._pills, marketDisplay: this._marketDisplay, highlightsView: this._highlightsView };
    const e = { ...this._groups }, t = { ...this._pills, "sections.observations_comments": !1 };
    return Pe.forEach((i) => {
      e[i] = "unchecked";
    }), e.observations !== "unchecked" && (e.observations = t["sections.observations_highlights"] ? "indeterminate" : "unchecked"), { groups: e, pills: t, marketDisplay: "summary", highlightsView: "summary" };
  }
  _isSectionDisabled(e) {
    return this._effectiveSettings().groups[e] === "unchecked";
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
  /** Display block for the renderer. `eff` defaults to what prints now
   * (One-Page's hiding applied). */
  _buildDisplay(e = this._effectiveSettings()) {
    const t = e.pills, i = e.groups;
    return {
      valuation: {
        retail_value: t["valuation.retail_value"],
        recon: t["valuation.recon"],
        fixed_overhead: t["valuation.fixed_overhead"],
        target_profit: t["valuation.target_profit"],
        tax_savings: t["valuation.tax_savings"]
      },
      sections: {
        valuation: i.valuation === "checked" || i.valuation === "indeterminate",
        disclosures: i.disclosures === "checked",
        disclosures_horizontal: this._discLayout === "horizontal",
        disclosures_signature: i.signature === "checked",
        observations: i.observations === "checked" || i.observations === "indeterminate",
        observations_highlights: t["sections.observations_highlights"],
        observations_comments: t["sections.observations_comments"],
        market_summary: i.market === "checked" && e.marketDisplay === "summary",
        market_comparables: i.market === "checked" && e.marketDisplay === "full",
        market_scenarios: i.market_scenarios === "checked" || i.market_scenarios === "indeterminate",
        selected_scenarios: i.selected_scenarios === "checked" || i.selected_scenarios === "indeterminate",
        recon_breakdown: i.recon === "checked",
        photos: i.photos === "checked"
      },
      general: {
        offer_label: !1,
        condition: t["general.condition"],
        value_display: this._valueDisplay
      },
      scenarios: {
        market: Object.fromEntries(P.map((o) => [o.key, this._isPillLockedStale(`market_scenarios.${o.key}`) ? !1 : t[`market_scenarios.${o.key}`]])),
        selected: Object.fromEntries(P.map((o) => [o.key, this._isPillLockedStale(`selected_scenarios.${o.key}`) ? !1 : t[`selected_scenarios.${o.key}`]]))
      },
      scenario_layout: this._scenarioLayout,
      // "summary" (default — aggregate count+total row) or "detail" (every
      // damage note listed individually, italicized-prefix, non-interleaved).
      recon_view: this._reconView,
      // Same summary/detail concept, independent toggle for Observations' Highlights.
      highlights_view: e.highlightsView,
      // Tells the renderer to clamp long free text (Comments) to fit one page.
      one_page: this._isOnePage()
    };
  }
  // ── Event handlers ─────────────────────────────────────────────────────────
  /** "Reset to location default": goes back to the location template's own
   * baseline (or the built-in defaults when there's no template), regenerates
   * right away, and tells Bubble to clear this sheet's instance overrides. */
  async _handleReset() {
    if (this._sheetLocked()) return;
    this._confirmReset = !1;
    const e = this._appliedSnapshot;
    this._pendingDataLoad = !0, this.templateSharedDisplay || this.templatePdfDisplay ? (this.templateSharedDisplay && this._applySharedDisplay(this.templateSharedDisplay), this.templatePdfDisplay && this._applyPdfDisplay(this.templatePdfDisplay)) : this._resetToggles(), this._previewStale = !0, this._finalizing = !0, await this._handleGenerate(!1), this._finalizing = !1, this._finalized = !0, this._pushHistory(e), this.dispatchEvent(new CustomEvent("display-save", {
      detail: { shared: null, pdf: null, employee: null, payload: null },
      bubbles: !0,
      composed: !0
    }));
  }
  /** Full / One-Page toggle. One-Page is a display rule: it hides what
   * can't fit on one page (ONE_PAGE_LOCKED) without touching the real
   * settings, so Full prints exactly what it did before. Not an edit — it
   * re-renders and saves right away (an undo step, like any apply). Other
   * unapplied edits stay pending: the switch applies on top of the last
   * applied version, then the pending edits come back. */
  async _handleModeChange(e) {
    if (e === this._mode || this._generating || this._finalizing) return;
    const t = this._previewStale && this._appliedSnapshot ? { ...this._captureSettings(), mode: e } : null;
    t ? (this._pendingDataLoad = !0, this._restoreSettings({ ...this._appliedSnapshot, mode: e })) : this._mode = e, await this._handleApply({ allowLocked: !0 }), t && (this._pendingDataLoad = !0, this._restoreSettings(t), this._previewStale = !0);
  }
  _handleGroupChange(e, t) {
    if (this._groups = { ...this._groups, [e]: t ? "checked" : "unchecked" }, t && ["valuation", "observations", "market_scenarios", "selected_scenarios"].includes(e)) {
      const s = this._pillKeysForGroup(e);
      if (s.filter((a) => this._pills[a] && !this._onePageLocked(a)).length === 0) {
        const a = { ...this._pills };
        s.forEach((l) => {
          a[l] = !0;
        }), this._pills = a;
      } else
        this._recomputeGroupState(e);
    }
  }
  _handlePillClick(e, t) {
    const i = { ...this._pills };
    i[e] = !i[e], this._pills = i, t && ["valuation", "observations", "market_scenarios", "selected_scenarios"].includes(t) && this._recomputeGroupState(t);
  }
  _togglePillsOpen(e) {
    this._pillsOpen = { ...this._pillsOpen, [e]: !this._pillsOpen[e] };
  }
  _handleFontSizeStep(e) {
    const t = this._fontSizeIndex + e;
    t >= 0 && t < U.length && (this._fontSizeIndex = t);
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
      selectedEmployeeIndex: this._selectedEmployeeIndex
    };
  }
  _restoreSettings(e) {
    this._mode = e.mode, this._valueDisplay = e.valueDisplay, this._taxRatePct = e.taxRatePct, this._profitName = e.profitName, this._disclaimerText = e.disclaimerText, this._disclaimerPunct = e.disclaimerPunct, this._fontSizeIndex = e.fontSizeIndex, this._photosPerRow = e.photosPerRow, this._discLayout = e.discLayout, this._marketDisplay = e.marketDisplay, this._scenarioLayout = e.scenarioLayout, this._reconView = e.reconView, this._highlightsView = e.highlightsView, this._sectionOrder = [...e.sectionOrder], this._pills = { ...e.pills }, this._groups = { ...e.groups }, this._selectedEmployeeIndex = e.selectedEmployeeIndex;
  }
  /** Captures the current customize-panel state as the "last applied" baseline,
   * called whenever a generate succeeds (initial auto-preview, Apply, Reopen). */
  _snapshotAppliedState() {
    this._appliedSnapshot = this._captureSettings();
  }
  /** Reverts unapplied edits back to the last-applied snapshot. */
  _handleDiscardChanges() {
    this._appliedSnapshot && (this._pendingDataLoad = !0, this._restoreSettings(this._appliedSnapshot), this._previewStale = !1);
  }
  // ── Undo / redo ────────────────────────────────────────────────────────────
  // Steps through applied versions only (one step per Apply / Reset), and
  // applies immediately: regenerate + save, same as clicking Apply.
  // Unapplied edits are dropped when you undo/redo.
  /** Records `before` (the previously applied version) as an undo step if
   * the applied version actually changed. */
  _pushHistory(e) {
    const t = this._appliedSnapshot;
    e && t && t !== e && JSON.stringify(t) !== JSON.stringify(e) && (this._undoStack = [...this._undoStack, e].slice(-5), this._redoStack = []);
  }
  _handleUndo() {
    return this._stepHistory("_undoStack", "_redoStack");
  }
  _handleRedo() {
    return this._stepHistory("_redoStack", "_undoStack");
  }
  async _stepHistory(e, t) {
    if (this._sheetLocked() || this._generating || this._finalizing || !this[e].length) return;
    const i = this[e][this[e].length - 1], s = this._appliedSnapshot;
    this[e] = this[e].slice(0, -1), this._restoreSettings(i), await this._handleApply({ fromHistory: !0 }) ? s && (this[t] = [...this[t], s].slice(-5)) : this[e] = [...this[e], i];
  }
  _resetToggles() {
    var t, i, s;
    this._mode = "full", this._valueDisplay = "offer";
    const e = (s = (i = (t = this.payload) == null ? void 0 : t.valuation) == null ? void 0 : i.tax_savings) == null ? void 0 : s.rate_pct;
    this._taxRatePct = e != null ? parseFloat(parseFloat(e).toFixed(2)) : this.taxRate != null ? parseFloat(parseFloat(this.taxRate).toFixed(2)) : 0, this._profitName = this.profitLabel || "", this._disclaimerText = this.disclaimerText || "", this._disclaimerPunct = ",", this._fontSizeIndex = 2, this._photosPerRow = 3, this._discLayout = "horizontal", this._marketDisplay = "full", this._scenarioLayout = "tiles", this._reconView = "summary", this._highlightsView = "summary", this._sectionOrder = [...E], this._pills = this._defaultPills(), this._groups = this._defaultGroups();
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
        s === this._placeholder ? i.push(e) : s.dataset.section && s.dataset.section !== e && !this._isSectionDisabled(s.dataset.section) && i.push(s.dataset.section);
      this._setActiveOrder(i);
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
    const i = this._sectionOrder.filter((a) => !this._isSectionDisabled(a)), s = i.indexOf(e), o = s + t;
    s === -1 || o < 0 || o >= i.length || ([i[s], i[o]] = [i[o], i[s]], this._setActiveOrder(i), this.updateComplete.then(() => {
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
  /** True when Bubble has locked this offer's sheet (`locked` — set once the
   * offer is accepted or declined) and the dealer hasn't confirmed they want
   * to edit anyway. Everything that changes the sheet is disabled; download,
   * email and individual sections stay available.
   * Never applies in templateMode, which has no offer to lock. */
  _sheetLocked() {
    return !!this.locked && !this.templateMode && !this._lockOverridden;
  }
  _isLocked(e) {
    return this._onePageLocked(e);
  }
  _lk(e) {
    return this._onePageLocked(e) ? d`<span class="full-only-chip"
      @mouseenter="${(t) => this._showTooltip(t, "Hidden on one page")}"
      @mouseleave="${() => this._hideTooltip()}">Full only</span>` : u;
  }
  // ── Save Settings ──────────────────────────────────────────────────────────
  _handleSaveSettings() {
    this._dispatchDisplaySave(), this._savedConfirm = !0;
  }
  _dispatchDisplaySave({ allowLocked: e = !1 } = {}) {
    if (this._sheetLocked() && !e) return;
    const t = this.employees && this.employees.length > 0 ? this.employees[this._selectedEmployeeIndex] || this.employees[0] : null;
    this.dispatchEvent(new CustomEvent("display-save", {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState(), employee: t, payload: this._lastPrintoutRequest },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Generate ───────────────────────────────────────────────────────────────
  /** The exact /printout-offer request body for a given display block —
   * shared by the main preview and individual-section prints so both apply the
   * same payload overrides (profit label, disclaimer, employee, tax rate…). */
  _buildPrintoutRequest(e, t = !1) {
    var l, n, c, p, h, f, _, y;
    const i = {
      mode: this._mode,
      display: e,
      preview_logo: !0,
      preview_photos: !0,
      font_roboto: !0,
      font_size_delta: U[this._fontSizeIndex].delta,
      photos_per_row: this._photosPerRow,
      section_order: this._sectionOrder,
      watermark: t
    }, s = { ...this._getPayloadData() }, o = this._profitName != null ? this._profitName : this.profitLabel;
    o != null && ((l = s.valuation) != null && l.target_profit) && (s.valuation = {
      ...s.valuation,
      target_profit: { ...s.valuation.target_profit, label: o || "Target Profit" }
    });
    const a = this._disclaimerText != null ? this._disclaimerText : this.disclaimerText ?? null;
    if (a !== null) {
      const g = this._disclaimerPunct ?? ".", S = a ? a.replace(/\.+$/, "") : "";
      s.disclaimer = S ? g + " " + S : "";
    }
    if ((c = (n = s.dealer) == null ? void 0 : n.logo_url) != null && c.startsWith("//") && (s.dealer = { ...s.dealer, logo_url: "https:" + s.dealer.logo_url }), (p = s.employee) != null && p.phone && (s.employee = { ...s.employee, phone: _e(s.employee.phone) }), this.employees && this.employees.length > 0) {
      const g = this.employees[this._selectedEmployeeIndex] || this.employees[0];
      s.employee = { name: g.name || "", phone: _e(g.phone || ""), email: g.email || "" };
    }
    if (s.disclosures && (s.disclosures = s.disclosures.filter((g) => g.answer && g.answer.trim() !== "")), (h = s.market) != null && h.comparables) {
      const g = s.market.comparables.map((m) => ({
        ...m,
        days_on_market: m.listing_type === "delisted" && m.delisted_days || m.days_on_market
      })), S = g.map((m) => m.days_on_market).filter((m) => m != null), De = S.length > 0 ? Math.round(S.reduce((m, Ae) => m + Ae, 0) / S.length) : (f = s.market.summary) == null ? void 0 : f.avg_days;
      s.market = {
        ...s.market,
        comparables: g,
        summary: { ...s.market.summary, avg_days: De }
      };
    }
    if (this._taxRatePct !== null && ((_ = s.valuation) != null && _.tax_savings) && ((y = s.offer) == null ? void 0 : y.amount) != null) {
      const g = Math.round(s.offer.amount * this._taxRatePct / 100);
      s.valuation = {
        ...s.valuation,
        tax_savings: {
          ...s.valuation.tax_savings,
          rate_pct: this._taxRatePct,
          amount: g,
          gross_value: s.offer.amount + g
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
        let n = "Request failed";
        try {
          n = (await i.json()).error || n;
        } catch {
        }
        throw new Error(n);
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
    const o = this.apiBaseUrl + s.pdf_url + "?t=" + Date.now(), a = { "ngrok-skip-browser-warning": "true" };
    return this.authToken && (a.Authorization = `Bearer ${this.authToken}`), { blob: await (await fetch(o, { headers: a })).blob(), vehicle: s.vehicle, rawUrl: o };
  }
  async _handleGenerate(e = !1) {
    var t, i;
    this._generating = !0, this._statusMsg = "Generating…", this._statusError = !1;
    try {
      const s = this._buildPrintoutRequest(this._buildDisplay(), e), o = s.raw_payload;
      this._lastPrintoutRequest = { ...s };
      const { blob: a, vehicle: l, rawUrl: n } = await this._fetchPrintout(s), c = (((t = o.customer) == null ? void 0 : t.name) || "Customer").replace(/[^a-zA-Z0-9 ]/g, "").trim();
      if (this.apiMode === "binary") {
        const p = await new Promise((h, f) => {
          const _ = new FileReader();
          _.onload = () => h(_.result), _.onerror = f, _.readAsDataURL(a);
        });
        this._pdfFilename = `${c}_${((i = o.vehicle) == null ? void 0 : i.vin) || "offer"}.pdf`, this._pdfUrl = p, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: p, blob: a },
          bubbles: !0,
          composed: !0
        }));
      } else {
        this._pdfVehicle = l;
        const p = (l == null ? void 0 : l.vin) || "offer";
        this._pdfFilename = `${c}_${p}.pdf`;
        const h = new File([a], this._pdfFilename, { type: "application/pdf" });
        this._currentBlobUrl && URL.revokeObjectURL(this._currentBlobUrl);
        const f = URL.createObjectURL(h);
        this._currentBlobUrl = f, this._pdfUrl = f, this._statusMsg = "", this._previewStale = !1, this._snapshotAppliedState(), this._doneSentVia = null, this._pdfSent = !1, this.dispatchEvent(new CustomEvent("offer-generated", {
          detail: { pdfUrl: n },
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
    const t = (c) => e.includes(c), i = this._buildDisplay({ groups: this._groups, pills: this._pills, marketDisplay: this._marketDisplay, highlightsView: this._highlightsView }), s = (c) => Object.values(c).every((p) => !p), o = (c) => Object.fromEntries(Object.keys(c).map((p) => [p, !0])), a = s(i.valuation) ? o(i.valuation) : i.valuation, l = Object.fromEntries(Object.entries(i.scenarios).map(([c, p]) => [
      c,
      s(p) ? o(p) : p
    ])), n = !i.sections.observations_highlights && !i.sections.observations_comments;
    return {
      ...i,
      valuation: a,
      scenarios: l,
      sections: {
        ...i.sections,
        valuation: t("valuation"),
        disclosures: t("disclosures"),
        disclosures_signature: !1,
        observations: t("observations"),
        observations_highlights: n || i.sections.observations_highlights,
        observations_comments: n || i.sections.observations_comments,
        market_summary: t("market") && this._marketDisplay === "summary",
        market_comparables: t("market") && this._marketDisplay === "full",
        market_scenarios: t("market_scenarios"),
        selected_scenarios: t("selected_scenarios"),
        recon_breakdown: t("recon"),
        photos: t("photos")
      },
      // Individual-section prints aren't one-page sheets — no clamping.
      one_page: !1,
      header_footer: "simple"
    };
  }
  _toggleIndividualSection(e, t) {
    const i = new Set(this._individualSections);
    t ? i.add(e) : i.delete(e), this._individualSections = E.filter((s) => i.has(s));
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
    const e = this._buildPrintoutRequest(this._buildIndividualDisplay(this._individualSections)), t = this._sectionOrder.filter((i) => this._individualSections.includes(i)).map((i) => i === "market" && this._marketDisplay === "summary" ? "Market Summary" : Y[i]);
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
  /** Generates + saves the current settings. Returns true when the generate
   * succeeded. */
  async _handleApply({ fromHistory: e = !1, allowLocked: t = !1 } = {}) {
    if (this._sheetLocked() && !t) return !1;
    const i = this._appliedSnapshot;
    return this._savedConfirm = !0, this.templateMode ? (await this._handleGenerate(!1), this._dispatchDisplaySave({ allowLocked: t }), this.dispatchEvent(new CustomEvent("template-save", {
      detail: { shared: this._buildSharedState(), pdf: this._buildPdfState() },
      bubbles: !0,
      composed: !0
    }))) : (this._finalizing = !0, await this._handleGenerate(!1), this._finalizing = !1, this._finalized = !0, this._dispatchDisplaySave({ allowLocked: t })), e || this._pushHistory(i), this._appliedSnapshot !== i;
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
      const o = await (await fetch(this._pdfUrl, { headers: i })).blob(), a = URL.createObjectURL(o), l = document.createElement("a");
      l.href = a, l.download = e, l.click(), setTimeout(() => URL.revokeObjectURL(a), 1e4);
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
    const o = s || {
      ...this._lastPrintoutRequest,
      filename: this._pdfFilename || null
    };
    console.log("[pdf-send] send_via:", e), console.log("[pdf-send] to_email:", t), console.log("[pdf-send] message_type:", i), console.log("[pdf-send] payload:", o), this.dispatchEvent(new CustomEvent("pdf-send", {
      detail: { send_via: e, to_email: t, message_type: i, payload: o },
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
    const e = U[this._fontSizeIndex].label, i = [
      ...this._sectionOrder.filter((n) => E.includes(n)),
      ...E.filter((n) => !this._sectionOrder.includes(n))
    ].map((n) => this._renderShowHideGroup(n)), s = this._sheetLocked(), o = !!(this.templateSharedDisplay || this.templatePdfDisplay), a = o ? "location default" : "default", l = o ? "location defaults" : "default configuration";
    return d`
      <div class="card">
        <div class="${s ? "settings-locked" : ""}">
        <div class="customize-header-row">
          <h2>Customize</h2>
          <div class="customize-header-ctrls" ?inert="${s}">
          <div class="history-btns">
            <button class="history-btn" type="button" aria-label="Undo"
              ?disabled="${!this._undoStack.length || this._generating || this._finalizing}"
              @click="${() => {
      this._hideTooltip(), this._handleUndo();
    }}"
              @mouseenter="${(n) => this._showTooltip(n, "Undo last apply")}"
              @mouseleave="${() => this._hideTooltip()}"
            >${tt}</button>
            <button class="history-btn" type="button" aria-label="Redo"
              ?disabled="${!this._redoStack.length || this._generating || this._finalizing}"
              @click="${() => {
      this._hideTooltip(), this._handleRedo();
    }}"
              @mouseenter="${(n) => this._showTooltip(n, "Redo apply")}"
              @mouseleave="${() => this._hideTooltip()}"
            >${it}</button>
          </div>
          </div>
        </div>

        ${s ? d`
          <div class="locked-notice">
            ${Qe}
            <span>This offer has been accepted or declined. Editing will change its offer sheet from the version the customer saw.</span>
            <button class="locked-notice-edit" type="button" @click="${() => {
      this._lockOverridden = !0;
    }}">Edit anyway</button>
          </div>
        ` : u}

        <!-- General -->
        <div class="collapsible-section ${this._generalOpen ? "" : "collapsed"}">
          <div class="section-header" @click="${() => {
      this._generalOpen = !this._generalOpen;
    }}">
            <span>General</span>
            <div class="section-chevron">${Z}</div>
          </div>
          <div class="section-body" ?inert="${s}">
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
                  @change="${(n) => {
      this._selectedEmployeeIndex = parseInt(n.target.value);
    }}"
                >
                  ${this.employees.map((n, c) => d`
                    <option value="${c}" ?selected="${c === this._selectedEmployeeIndex}">${n.name}</option>
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
                  <span class="stepper-value font-size-display">${e}</span>
                  <button class="step-btn" ?disabled="${this._fontSizeIndex >= U.length - 1 || this._isLocked("font_size")}"
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
                ${this._lk("market_display")}
                <div class="segmented-control">
                  <button class="seg-btn ${this._onePageLocked("market_display") || this._marketDisplay === "summary" ? "active" : ""}"
                          ?disabled="${this._isLocked("market_display")}"
                          @click="${() => this._handleSegmentedClick("market-display", "summary")}">Summary</button>
                  <button class="seg-btn ${!this._onePageLocked("market_display") && this._marketDisplay === "full" ? "active" : ""}"
                          ?disabled="${this._isLocked("market_display")}"
                          @click="${() => this._handleSegmentedClick("market-display", "full")}">Full</button>
                </div>
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
                ${this._lk("highlights_display")}
                <div class="segmented-control">
                  <button class="seg-btn ${this._onePageLocked("highlights_display") || this._highlightsView === "summary" ? "active" : ""}"
                          ?disabled="${this._isLocked("highlights_display")}"
                          @click="${() => this._handleSegmentedClick("highlights-display", "summary")}">Summary</button>
                  <button class="seg-btn ${!this._onePageLocked("highlights_display") && this._highlightsView === "detail" ? "active" : ""}"
                          ?disabled="${this._isLocked("highlights_display")}"
                          @click="${() => this._handleSegmentedClick("highlights-display", "detail")}">Detail</button>
                </div>
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
            <div class="section-chevron">${Z}</div>
          </div>
          <div class="section-body" ?inert="${s}">
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
            ${i}
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
              <div class="section-chevron">${Z}</div>
            </div>
          </div>
          <div class="section-body" ?inert="${s}">
            <div class="sortable-list ${this._isLocked("section_order") ? "disabled" : ""}"
              @dragover="${(n) => n.preventDefault()}"
              @drop="${(n) => this._handleListDrop(n)}"
            >
              ${(() => {
      const n = this._displayOrder(), c = n.filter((p) => !this._isSectionDisabled(p)).length;
      return n.map((p, h) => {
        const f = this._isSectionDisabled(p) || this._isLocked("section_order");
        return d`
                  <div
                    class="sortable-item ${f ? "disabled" : ""}"
                    data-section="${p}"
                    draggable="${f ? "false" : "true"}"
                    @dragstart="${(_) => this._handleDragStart(_, p)}"
                    @dragover="${(_) => this._handleDragOver(_, p)}"
                    @drop="${(_) => this._handleDrop(_)}"
                    @dragend="${(_) => this._handleDragEnd(_)}"
                  >
                    <span class="drag-handle">⠿</span>
                    <span>${Y[p]}</span>
                    <div class="sort-arrows">
                      <button class="sort-arrow" ?disabled="${f || h === 0}" @click="${() => this._handleMoveSection(p, -1)}">▲</button>
                      <button class="sort-arrow" ?disabled="${f || h >= c - 1}" @click="${() => this._handleMoveSection(p, 1)}">▼</button>
                    </div>
                  </div>
                `;
      });
    })()}
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

        ${!this.templateMode && !s ? d`
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
                <span class="confirm-reset-msg">Reset all settings to the ${l}?</span>
                <div class="confirm-reset-btns">
                  <button class="confirm-reset-yes" @click="${() => this._handleReset()}">Yes, reset</button>
                  <button class="confirm-reset-no"  @click="${() => {
      this._confirmReset = !1;
    }}">Cancel</button>
                </div>
              </div>
            ` : d`
              <button class="reset-btn"
                ?disabled="${this._generating || this._finalizing}"
                @click="${() => {
      this._confirmReset = !0;
    }}"
              >Reset to ${a}</button>
            ` : u}
          </div>
        ` : u}
      </div>
    `;
  }
  _renderShowHideGroup(e) {
    if (e === "market_scenarios") return this._renderScenarioGroup("market_scenarios", "Market Scenarios", "Market");
    if (e === "selected_scenarios") return this._renderScenarioGroup("selected_scenarios", "Selected Scenarios", "Selected");
    const t = this._isLocked(e), i = this._effectiveSettings().groups[e], o = d`
      <div class="group-row ${t ? "group-row-locked" : ""}">
        <label class="group-header">
          <input type="checkbox" data-group="${e}"
            .checked="${i === "checked" || i === "indeterminate"}"
            ?disabled="${t}"
            @change="${(a) => this._handleGroupChange(e, a.target.checked)}"
          >${{ valuation: "Valuation", disclosures: "Disclosures", observations: "Observations", market: "Selected Comparables", recon: "Recon", photos: "Photos" }[e]}
        </label>
        ${this._lk(e)}
      </div>`;
    if (e === "valuation") {
      const a = !!this._pillsOpen.valuation;
      return d`
        <div class="toggle-group" data-group="valuation">
          ${o}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${a ? d`
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
          ${o}
          <div class="pill-group ${t ? "locked" : ""} ${i === "unchecked" ? "group-off" : ""}">
            ${this._renderPill("sections.observations_highlights", "Highlights", "observations")}
            ${this._renderPill("sections.observations_comments", "Comments", "observations")}
          </div>
        </div>` : d`
      <div class="toggle-group" data-group="${e}">
        ${o}
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
    const t = !!this._pillsOpen[e], i = this._pillKeysForGroup(e), s = i.filter((a) => !this._isPillLockedStale(a) && this._pills[a]).length, o = i.length;
    return d`
      <span
        class="pill-toggle"
        title="${t ? "Collapse fields" : "Expand fields"}"
        @click="${() => this._togglePillsOpen(e)}"
      >${t ? "‹ Collapse" : `Expand (${s}/${o}) ›`}</span>
    `;
  }
  _renderScenarioGroup(e, t, i) {
    const s = this._isLocked(e), o = this._effectiveSettings().groups[e], a = o === "checked" || o === "indeterminate", l = !!this._pillsOpen[e];
    return d`
      <div class="toggle-group" data-group="${e}">
        <div class="group-row ${s ? "group-row-locked" : ""}">
          <label class="group-header">
            <input type="checkbox" data-group="${e}"
              .checked="${a}"
              ?disabled="${s}"
              @change="${(n) => this._handleGroupChange(e, n.target.checked)}"
            >${t}
          </label>
          ${this._lk(e)}
        </div>
        <div class="pill-group ${s ? "locked" : ""} ${o === "unchecked" ? "group-off" : ""}">
          ${l ? P.map((n) => this._renderPill(`${e}.${n.key}`, n.label.replace("{basis}", i), e)) : u}
          ${this._renderPillsToggle(e)}
        </div>
      </div>`;
  }
  /** Shows the shared tooltip (TooltipController, copied from lxn-ui) over
   * the hovered element. */
  _showTooltip(e, t) {
    const i = e.currentTarget, s = i.classList.contains("email-icon-btn") && i.querySelector("svg") || i;
    this._tooltip.show(s, t);
  }
  _hideTooltip() {
    this._tooltip.hide();
  }
  _renderPill(e, t, i) {
    const s = this._isPillLockedStale(e), o = this._onePageLocked(e), a = !s && !o && this._pills[e], l = o ? "Hidden on one page" : "Not available: Offer has been adjusted manually", n = s || o;
    return d`
      <span
        class="pill ${a ? "active" : ""} ${s ? "stale" : ""} ${o ? "one-page-locked" : ""}"
        @mouseenter="${(c) => {
      n && this._showTooltip(c, l);
    }}"
        @mouseleave="${() => {
      n && this._hideTooltip();
    }}"
        @click="${() => {
      n || this._handlePillClick(e, i);
    }}"
      >${s ? d`<span class="pill-stale-icon">${ot}</span>` : u}${t}</span>
    `;
  }
  _renderSendInline() {
    var o;
    const e = this._resolveEmployee(), t = !!((o = this.payload) != null && o.customer) || !!(e != null && e.email), i = !!this._pdfUrl && !this._generating;
    return t ? d`
      <button
        class="email-icon-btn"
        ?disabled="${!i}"
        @mouseenter="${(a) => this._showTooltip(a, "Email offer printout")}"
        @mouseleave="${() => this._hideTooltip()}"
        @click="${() => {
      this._hideTooltip(), this._sendPayloadOverride = null, this._confirmSendEmail = !0, this._sendMessageType = null, this._manualCustomerEmail = "";
    }}"
      >${me}</button>
    ` : u;
  }
  _renderSendConfirmModal() {
    var c, p;
    const e = this._resolveEmployee(), t = ((p = (c = this.payload) == null ? void 0 : c.customer) == null ? void 0 : p.email) || "", i = (e == null ? void 0 : e.email) || "", s = (e == null ? void 0 : e.name) || "an unspecified employee", o = this._sendMessageType || (t ? "customer" : i ? "employee" : "customer"), a = o === "customer" && !t, l = o === "employee" ? i : t || this._manualCustomerEmail.trim(), n = !!l;
    return d`
      <div class="modal-overlay" @click="${() => this._closeSendModal()}">
        <div class="modal-box" @click="${(h) => h.stopPropagation()}">
          <p class="modal-msg">
            ${this._sendPayloadOverride ? d`Send the selected sections?` : d`Send this offer as an offer made by <strong>${s}</strong>?`}
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
              <span>Customer's inbox${t ? d` — ${t}` : u}</span>
            </label>
            ${i ? d`
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
            ` : u}
          </div>

          ${a ? d`
            <input
              type="email"
              class="modal-email-input"
              placeholder="Customer email address"
              .value="${this._manualCustomerEmail}"
              @input="${(h) => {
      this._manualCustomerEmail = h.target.value;
    }}"
            />
          ` : u}

          <div class="modal-btns">
            <button class="modal-btn-confirm"
              ?disabled="${!n}"
              @click="${() => {
      this._confirmSendEmail = !1, this._handleSend("email", l, o);
    }}"
            >Yes, send</button>
            <button class="modal-btn-cancel" @click="${() => this._closeSendModal()}">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  _renderIndividualModal() {
    var o;
    const e = this._resolveEmployee(), t = !!((o = this.payload) != null && o.customer) || !!(e != null && e.email), i = this._individualSections.length === 0, s = this._individualBusy;
    return d`
      <div class="modal-overlay" @click="${() => {
      s || (this._individualOpen = !1);
    }}">
        <div class="modal-box" @click="${(a) => a.stopPropagation()}">
          <p class="modal-msg modal-title">Download or Email Individual Sections</p>

          <div class="modal-recipient-group">
            ${this._sectionOrder.map((a) => d`
              <label class="modal-recipient-option">
                <input
                  type="checkbox"
                  .checked="${this._individualSections.includes(a)}"
                  ?disabled="${s}"
                  @change="${(l) => this._toggleIndividualSection(a, l.target.checked)}"
                />
                <span>${Y[a]}</span>
              </label>
            `)}
          </div>

          ${this._individualError ? d`<div class="action-msg error" style="margin:0 0 12px;">${this._individualError}</div>` : u}

          <div class="modal-btns">
            <button class="modal-btn-confirm modal-btn-icon"
              ?disabled="${i || s}"
              @click="${() => this._handleIndividualPrint()}"
            >${s ? "Generating…" : d`${be}Download`}</button>
            ${t ? d`
              <button class="modal-btn-confirm modal-btn-icon modal-btn-teal"
                ?disabled="${i || s}"
                @click="${() => this._handleIndividualEmail()}"
              >${me}Email</button>
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
  /** Full / One-Page — a display setting, so it sits on the preview card
   * and applies right away (see _handleModeChange). */
  _renderModeToggle() {
    const e = this._generating || this._finalizing;
    return d`
      <div class="segmented-control mode-toggle">
        <button
          class="seg-btn ${this._mode === "full" ? "active" : ""}"
          ?disabled="${e}"
          @click="${() => {
      this._hideTooltip(), this._handleModeChange("full");
    }}"
          @mouseenter="${(t) => this._showTooltip(t, "Prints every section you have on")}"
          @mouseleave="${() => this._hideTooltip()}"
        >Full</button>
        <button
          class="seg-btn ${this._isOnePage() ? "active" : ""}"
          ?disabled="${e}"
          @click="${() => {
      this._hideTooltip(), this._handleModeChange("one_page");
    }}"
          @mouseenter="${(t) => this._showTooltip(t, "Hides sections that don't fit on one page")}"
          @mouseleave="${() => this._hideTooltip()}"
        >One-Page</button>
      </div>
    `;
  }
  _renderPreviewPane() {
    const e = !!this._pdfUrl, t = this._generating || this._finalizing, i = t || !!this.apiBaseUrl && !e && !this._statusError, o = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && navigator.pdfViewerEnabled;
    return d`
      <div class="preview-pane">
        <div class="card preview-card">
          <div class="preview-card-header">
            <div class="preview-title-group">
              <span
                class="preview-status-hit"
                @mouseenter="${(a) => this._showTooltip(a, this._previewStale ? "Unapplied changes" : "Up to date")}"
                @mouseleave="${() => this._hideTooltip()}"
              ><span class="preview-status-dot ${this._previewStale ? "stale" : ""}"></span></span>
              <h2>${o ? "Preview" : "PDF"}</h2>
              ${this._renderModeToggle()}
            </div>
            <div class="preview-header-right">
            ${this.templateMode ? u : d`
              <div class="preview-icon-btns">
                ${this._renderSendInline()}
                ${e && !t && o ? d`
                  <button
                    class="email-icon-btn"
                    type="button"
                    @mouseenter="${(a) => this._showTooltip(a, "Download printout")}"
                    @mouseleave="${() => this._hideTooltip()}"
                    @click="${() => {
      this._hideTooltip(), this._handleDownloadPdf();
    }}"
                  >${be}</button>
                ` : u}
                <button
                  class="email-icon-btn"
                  type="button"
                  ?disabled="${!this.apiBaseUrl}"
                  @mouseenter="${(a) => this._showTooltip(a, "Download or Email Individual Sections")}"
                  @mouseleave="${() => this._hideTooltip()}"
                  @click="${() => {
      this._hideTooltip(), this._individualError = "", this._individualOpen = !0;
    }}"
                >${et}</button>
              </div>
              ${this._confirmSendEmail ? this._renderSendConfirmModal() : u}
              ${this._individualOpen ? this._renderIndividualModal() : u}
            `}
            </div>
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
          ${e && !t && o ? d`
            <iframe class="pdf-frame" src="${this._pdfUrl}"></iframe>
          ` : u}
          ${e && !t && !o ? d`
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
F(ee, "properties", {
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
  // Locked offer (accepted/declined): "Edit anyway" lets the dealer edit
  // regardless — _lockOverridden lasts until `locked` changes again.
  _lockOverridden: { type: Boolean, state: !0 },
  // "Reset to location default" is showing its inline Yes/Cancel confirm
  _confirmReset: { type: Boolean, state: !0 },
  // Undo/redo: previously applied versions of the settings (see _captureSettings).
  _undoStack: { type: Array, state: !0 },
  _redoStack: { type: Array, state: !0 },
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
}), F(ee, "styles", ze`
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
  `);
customElements.define("lexen-offer-sheet", ee);
export {
  ee as LexenOfferSheet
};
