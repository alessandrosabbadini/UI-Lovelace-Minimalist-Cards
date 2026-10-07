const nc = "0.19.50";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qo = globalThis, Wn = qo.ShadowRoot && (qo.ShadyCSS === void 0 || qo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Kn = Symbol(), da = /* @__PURE__ */ new WeakMap();
let Fs = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== Kn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Wn && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = da.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && da.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const rc = (t) => new Fs(typeof t == "string" ? t : t + "", void 0, Kn), w = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, n, r) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[r + 1], t[0]);
  return new Fs(i, t, Kn);
}, ac = (t, e) => {
  if (Wn) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), n = qo.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = i.cssText, t.appendChild(o);
  }
}, ua = Wn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return rc(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: sc, defineProperty: cc, getOwnPropertyDescriptor: lc, getOwnPropertyNames: dc, getOwnPropertySymbols: uc, getPrototypeOf: _c } = Object, At = globalThis, _a = At.trustedTypes, mc = _a ? _a.emptyScript : "", hc = At.reactiveElementPolyfillSupport, ii = (t, e) => t, Yo = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? mc : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Vn = (t, e) => !sc(t, e), ma = { attribute: !0, type: String, converter: Yo, reflect: !1, useDefault: !1, hasChanged: Vn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), At.litPropertyMetadata ?? (At.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ma) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), n = this.getPropertyDescriptor(e, o, i);
      n !== void 0 && cc(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: n, set: r } = lc(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const s = n?.call(this);
      r?.call(this, a), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ma;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ii("elementProperties"))) return;
    const e = _c(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ii("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ii("properties"))) {
      const i = this.properties, o = [...dc(i), ...uc(i)];
      for (const n of o) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, n] of i) this.elementProperties.set(o, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const n = this._$Eu(i, o);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const n of o) i.unshift(ua(n));
    } else e !== void 0 && i.push(ua(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ac(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    const o = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, o);
    if (n !== void 0 && o.reflect === !0) {
      const r = (o.converter?.toAttribute !== void 0 ? o.converter : Yo).toAttribute(i, o.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, n = o._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = o.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Yo;
      this._$Em = n;
      const s = a.fromAttribute(i, r.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, n = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[e]), o ?? (o = a.getPropertyOptions(e)), !((o.hasChanged ?? Vn)(r, i) || o.useDefault && o.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: n, wrapped: r }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: a } = r, s = this[n];
        a !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, r, s);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
be.elementStyles = [], be.shadowRootOptions = { mode: "open" }, be[ii("elementProperties")] = /* @__PURE__ */ new Map(), be[ii("finalized")] = /* @__PURE__ */ new Map(), hc?.({ ReactiveElement: be }), (At.reactiveElementVersions ?? (At.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oi = globalThis, ha = (t) => t, Jo = oi.trustedTypes, pa = Jo ? Jo.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Bs = "$lit$", Dt = `lit$${Math.random().toFixed(9).slice(2)}$`, Hs = "?" + Dt, pc = `<${Hs}>`, qt = document, ri = () => qt.createComment(""), ai = (t) => t === null || typeof t != "object" && typeof t != "function", qn = Array.isArray, gc = (t) => qn(t) || typeof t?.[Symbol.iterator] == "function", hn = `[ 	
\f\r]`, De = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ga = /-->/g, fa = />/g, Ut = RegExp(`>|${hn}(?:([^\\s"'>=/]+)(${hn}*=${hn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ba = /'/g, ya = /"/g, Rs = /^(?:script|style|textarea|title)$/i, Gs = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Gs(1), Zo = Gs(2), Tt = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), va = /* @__PURE__ */ new WeakMap(), Vt = qt.createTreeWalker(qt, 129);
function Ws(t, e) {
  if (!qn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pa !== void 0 ? pa.createHTML(e) : e;
}
const fc = (t, e) => {
  const i = t.length - 1, o = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = De;
  for (let s = 0; s < i; s++) {
    const l = t[s];
    let h, p, g = -1, z = 0;
    for (; z < l.length && (a.lastIndex = z, p = a.exec(l), p !== null); ) z = a.lastIndex, a === De ? p[1] === "!--" ? a = ga : p[1] !== void 0 ? a = fa : p[2] !== void 0 ? (Rs.test(p[2]) && (n = RegExp("</" + p[2], "g")), a = Ut) : p[3] !== void 0 && (a = Ut) : a === Ut ? p[0] === ">" ? (a = n ?? De, g = -1) : p[1] === void 0 ? g = -2 : (g = a.lastIndex - p[2].length, h = p[1], a = p[3] === void 0 ? Ut : p[3] === '"' ? ya : ba) : a === ya || a === ba ? a = Ut : a === ga || a === fa ? a = De : (a = Ut, n = void 0);
    const P = a === Ut && t[s + 1].startsWith("/>") ? " " : "";
    r += a === De ? l + pc : g >= 0 ? (o.push(h), l.slice(0, g) + Bs + l.slice(g) + Dt + P) : l + Dt + (g === -2 ? s : P);
  }
  return [Ws(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class si {
  constructor({ strings: e, _$litType$: i }, o) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const s = e.length - 1, l = this.parts, [h, p] = fc(e, i);
    if (this.el = si.createElement(h, o), Vt.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (n = Vt.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const g of n.getAttributeNames()) if (g.endsWith(Bs)) {
          const z = p[a++], P = n.getAttribute(g).split(Dt), O = /([.?@])?(.*)/.exec(z);
          l.push({ type: 1, index: r, name: O[2], strings: P, ctor: O[1] === "." ? yc : O[1] === "?" ? vc : O[1] === "@" ? wc : Xo }), n.removeAttribute(g);
        } else g.startsWith(Dt) && (l.push({ type: 6, index: r }), n.removeAttribute(g));
        if (Rs.test(n.tagName)) {
          const g = n.textContent.split(Dt), z = g.length - 1;
          if (z > 0) {
            n.textContent = Jo ? Jo.emptyScript : "";
            for (let P = 0; P < z; P++) n.append(g[P], ri()), Vt.nextNode(), l.push({ type: 2, index: ++r });
            n.append(g[z], ri());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Hs) l.push({ type: 2, index: r });
      else {
        let g = -1;
        for (; (g = n.data.indexOf(Dt, g + 1)) !== -1; ) l.push({ type: 7, index: r }), g += Dt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const o = qt.createElement("template");
    return o.innerHTML = e, o;
  }
}
function ve(t, e, i = t, o) {
  if (e === Tt) return e;
  let n = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const r = ai(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(t), n._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = n : i._$Cl = n), n !== void 0 && (e = ve(t, n._$AS(t, e.values), n, o)), e;
}
class bc {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: o } = this._$AD, n = (e?.creationScope ?? qt).importNode(i, !0);
    Vt.currentNode = n;
    let r = Vt.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new wo(r, r.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (h = new xc(r, this, e)), this._$AV.push(h), l = o[++s];
      }
      a !== l?.index && (r = Vt.nextNode(), a++);
    }
    return Vt.currentNode = qt, n;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class wo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, n) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = ve(this, e, i), ai(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== Tt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : gc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && ai(this._$AH) ? this._$AA.nextSibling.data = e : this.T(qt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = si.createElement(Ws(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new bc(n, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = va.get(e.strings);
    return i === void 0 && va.set(e.strings, i = new si(e)), i;
  }
  k(e) {
    qn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, n = 0;
    for (const r of e) n === i.length ? i.push(o = new wo(this.O(ri()), this.O(ri()), this, this.options)) : o = i[n], o._$AI(r), n++;
    n < i.length && (this._$AR(o && o._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = ha(e).nextSibling;
      ha(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Xo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, n, r) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = _;
  }
  _$AI(e, i = this, o, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = ve(this, e, i, 0), a = !ai(e) || e !== this._$AH && e !== Tt, a && (this._$AH = e);
    else {
      const s = e;
      let l, h;
      for (e = r[0], l = 0; l < r.length - 1; l++) h = ve(this, s[o + l], i, l), h === Tt && (h = this._$AH[l]), a || (a = !ai(h) || h !== this._$AH[l]), h === _ ? e = _ : e !== _ && (e += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class yc extends Xo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _ ? void 0 : e;
  }
}
class vc extends Xo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== _);
  }
}
class wc extends Xo {
  constructor(e, i, o, n, r) {
    super(e, i, o, n, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ve(this, e, i, 0) ?? _) === Tt) return;
    const o = this._$AH, n = e === _ && o !== _ || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== _ && (o === _ || n);
    n && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class xc {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ve(this, e);
  }
}
const $c = oi.litHtmlPolyfillSupport;
$c?.(si, wo), (oi.litHtmlVersions ?? (oi.litHtmlVersions = [])).push("3.3.3");
const kc = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let n = o._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    o._$litPart$ = n = new wo(e.insertBefore(ri(), r), r, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = globalThis;
let v = class extends be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = kc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Tt;
  }
};
v._$litElement$ = !0, v.finalized = !0, ni.litElementHydrateSupport?.({ LitElement: v });
const Cc = ni.litElementPolyfillSupport;
Cc?.({ LitElement: v });
(ni.litElementVersions ?? (ni.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sc = { attribute: !0, type: String, converter: Yo, reflect: !1, hasChanged: Vn }, zc = (t = Sc, e, i) => {
  const { kind: o, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), o === "accessor") {
    const { name: a } = i;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(a, l, t, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, t, s), s;
    } };
  }
  if (o === "setter") {
    const { name: a } = i;
    return function(s) {
      const l = this[a];
      e.call(this, s), this.requestUpdate(a, l, t, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function x(t) {
  return (e, i) => typeof i == "object" ? zc(t, e, i) : ((o, n, r) => {
    const a = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, o), a ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(t) {
  return x({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ec = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ie(t, e) {
  return (i, o, n) => {
    const r = (a) => a.renderRoot?.querySelector(t) ?? null;
    return Ec(i, o, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ks = { ATTRIBUTE: 1 }, Vs = (t) => (...e) => ({ _$litDirective$: t, values: e });
let qs = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, o) {
    this._$Ct = e, this._$AM = i, this._$Ci = o;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ys = "important", Pc = " !" + Ys, d = Vs(class extends qs {
  constructor(t) {
    if (super(t), t.type !== Ks.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const o = t[i];
      return o == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const o of this.ft) e[o] == null && (this.ft.delete(o), o.includes("-") ? i.removeProperty(o) : i[o] = null);
    for (const o in e) {
      const n = e[o];
      if (n != null) {
        this.ft.add(o);
        const r = typeof n == "string" && n.endsWith(Pc);
        o.includes("-") || r ? i.setProperty(o, r ? n.slice(0, -11) : n, r ? Ys : "") : i[o] = n;
      }
    }
    return Tt;
  }
}), wa = {
  yellow: "255, 145, 1",
  blue: "61, 90, 254",
  green: "1, 200, 82",
  red: "245, 68, 54",
  pink: "233, 30, 99",
  purple: "102, 31, 255",
  grey: "187, 187, 187"
}, St = [
  "yellow",
  "blue",
  "green",
  "red",
  "pink",
  "purple",
  "grey"
];
function f(t, e = "blue") {
  return getComputedStyle(t).getPropertyValue(`--color-${e}`).trim() || wa[e] || wa.blue;
}
function R(t, e, i, o, n = !1, r = !1) {
  if (!e)
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  if (r)
    return {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)"
    };
  const a = n && o ? o.join(", ") : f(t, i);
  return {
    color: `rgba(${a}, 1)`,
    backgroundColor: `rgba(${a}, 0.2)`
  };
}
const Lc = {
  select: {
    mode: "dropdown",
    options: St.map((t) => ({ value: t, label: t }))
  }
};
function u(t = "entity", e, i = !0) {
  return {
    name: t,
    required: i,
    selector: {
      entity: e ? { domain: Array.isArray(e) ? e : [e] } : {}
    }
  };
}
function m(t) {
  return { name: t, selector: { text: {} } };
}
function S(t = "icon") {
  return { name: t, selector: { icon: {} } };
}
function b(t) {
  return { name: t, selector: { boolean: {} } };
}
function M(t) {
  return { name: t, selector: { number: { mode: "box", step: 1 } } };
}
function A(t = "color") {
  return { name: t, selector: Lc };
}
function H(t, e, i = "dropdown") {
  return {
    name: t,
    selector: {
      select: {
        mode: i,
        options: e
      }
    }
  };
}
function Mc(t, e, i, o = !0) {
  return {
    type: "expandable",
    name: t,
    title: e,
    flatten: o,
    schema: i
  };
}
function D(t) {
  return {
    type: "grid",
    name: "",
    flatten: !0,
    schema: t
  };
}
function Oc(t) {
  return {
    schema: [
      u("entity", t?.domain),
      D([m("name"), S("icon")]),
      A("color"),
      b("force_background_color"),
      ...t?.extra || []
    ],
    computeLabel: (e) => ({
      entity: "Entity",
      name: "Name",
      icon: "Icon",
      color: "Color",
      force_background_color: "Force colored background when active"
    })[e.name || ""] || void 0
  };
}
function k(t) {
  return (e) => t[e.name || ""] || void 0;
}
function C(t) {
  return (e) => t[e.name || ""] || void 0;
}
const Yn = w`
  :host {
    --ulm-radius: var(--border-radius, 20px);
    --ulm-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
    --ulm-color-theme: var(--color-theme, 51, 51, 51);
    --ulm-color-yellow: var(--color-yellow, 255, 145, 1);
    --ulm-color-blue: var(--color-blue, 61, 90, 254);
    --ulm-color-green: var(--color-green, 1, 200, 82);
    --ulm-color-red: var(--color-red, 245, 68, 54);
    --ulm-color-pink: var(--color-pink, 233, 30, 99);
    --ulm-color-purple: var(--color-purple, 102, 31, 255);
    --ulm-color-grey: var(--color-grey, 187, 187, 187);
    /* Matches themes' light-mode color-background-yellow (subtle, not accent yellow) */
    --ulm-color-bg-yellow: var(--color-background-yellow, 250, 250, 250);
    --ulm-opacity-bg: var(--opacity-bg, 1);
  }
`, E = w`
  ${Yn}

  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }

  ha-card.ulm-card {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: var(--ulm-radius);
    box-shadow: var(--ulm-shadow);
    border: none;
    padding: 12px;
    overflow: hidden;
    background: var(--card-background-color, #fafafa);
    color: var(--primary-text-color);
    transition: background-color 0.2s ease;
  }

  ha-card.ulm-card > .stack {
    flex: 1;
    min-height: 0;
  }

  .warning {
    padding: 8px;
    color: var(--error-color);
    font-size: 14px;
  }

  /* Matches original icon_info grid: 'i n' / 'i l', columns min-content auto */
  .row {
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: min-content min-content;
    grid-template-areas:
      "icon name"
      "icon label";
    align-items: center;
    column-gap: 0;
  }

  .icon-btn,
  .info-btn,
  .widget-btn {
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .icon-btn {
    grid-area: icon;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .icon-btn ha-icon {
    /* Original icon_info size: 20px */
    --mdc-icon-size: 20px;
  }

  .icon-btn img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  .badge {
    position: absolute;
    left: 24px;
    top: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--card-background-color, #fafafa);
    display: grid;
    place-items: center;
    z-index: 1;
  }

  .badge.right {
    left: auto;
    right: -2px;
    top: -2px;
  }

  .badge ha-icon {
    --mdc-icon-size: 10px;
    color: var(--primary-background-color, #fff);
  }

  /* info-btn wraps name+label; original puts margin-left: 12px on each */
  .info-btn {
    grid-area: 1 / 2 / 3 / 3;
    min-width: 0;
    display: grid;
    grid-template-rows: min-content min-content;
    align-content: center;
    padding: 0;
    margin: 0;
  }

  .name {
    align-self: end;
    justify-self: start;
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .label {
    align-self: start;
    justify-self: start;
    font-size: 12px;
    font-weight: bolder;
    opacity: 0.4;
    line-height: 1.2;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stack.horizontal {
    flex-direction: row;
    align-items: center;
  }

  .stack.horizontal .row {
    flex: 1;
    min-width: 0;
  }

  .stack.horizontal .slider-wrap,
  .stack.horizontal .widgets,
  .stack.horizontal .controls {
    flex: 1;
  }

  .stack.horizontal.wide .slider-wrap {
    flex: 2;
  }

  .slider-wrap {
    height: 42px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    background: rgba(var(--ulm-color-theme), 0.05);
  }

  .slider-wrap input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 42px;
    margin: 0;
    background: transparent;
    cursor: pointer;
  }

  .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
    height: 42px;
    border-radius: 14px;
    background: transparent;
  }

  .slider-wrap input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 42px;
    border-radius: 0;
    background: transparent;
  }

  .slider-fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 14px;
    pointer-events: none;
  }

  .widgets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .widget-btn {
    height: 42px;
    border-radius: 14px;
    background: rgba(var(--ulm-color-theme), 0.05);
    display: grid;
    place-items: center;
  }

  .widget-btn ha-icon {
    --mdc-icon-size: 20px;
    color: rgba(var(--ulm-color-theme), 0.9);
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .controls.four {
    grid-template-columns: repeat(4, 1fr);
  }

  .unavailable .icon-btn {
    overflow: visible;
  }
`;
w`
  .form {
    display: grid;
    gap: 12px;
    padding: 4px 0;
  }

  .section {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    opacity: 0.55;
  }

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  label.check {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }
`;
var Nc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, xo = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Ic(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Nc(e, i, n), n;
};
function dt(t, e, i) {
  let o = document.querySelector("ulm-popup-dialog");
  o || (o = document.createElement("ulm-popup-dialog"), document.body.appendChild(o));
  const n = t;
  n.hass && (o.hass = n.hass), o.open(e, i);
}
let Yt = class extends v {
  constructor() {
    super(...arguments), this._open = !1, this._kind = "light", this._entity = "";
  }
  open(t, e) {
    this._kind = t, this._entity = e, this._open = !0;
  }
  close() {
    this._open = !1;
  }
  render() {
    if (!this._open || !this.hass) return _;
    const t = this.hass.states[this._entity];
    if (!t)
      return c`<div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(i) => i.stopPropagation()}>
          <div class="title">Entity not found</div>
          <button class="close" @click=${this.close}>Close</button>
        </div>
      </div>`;
    const e = t.attributes.friendly_name || this._entity;
    return c`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(i) => i.stopPropagation()}>
          <div class="header">
            <div>
              <div class="title">${e}</div>
              <div class="sub">${this._kind} · ${t.state}</div>
            </div>
            <button class="close" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="body">${this._renderBody(t.state)}</div>
        </div>
      </div>
    `;
  }
  _renderBody(t) {
    switch (this._kind) {
      case "light":
        return c`
          <div class="actions">
            <button @click=${() => this._call("light", "toggle")}>Toggle</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 30 })}>30%</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 60 })}>60%</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 100 })}>100%</button>
          </div>
          <label class="slider">
            Brightness
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(
          Math.round(
            (this.hass.states[this._entity].attributes.brightness || 0) / 255 * 100
          ) || 1
        )}
              @change=${(e) => this._call("light", "turn_on", {
          brightness_pct: Number(e.target.value)
        })}
            />
          </label>
        `;
      case "cover":
        return c`<div class="actions">
          <button @click=${() => this._call("cover", "open_cover")}>Open</button>
          <button @click=${() => this._call("cover", "stop_cover")}>Stop</button>
          <button @click=${() => this._call("cover", "close_cover")}>Close</button>
        </div>`;
      case "thermostat":
        return c`<div class="actions">
          <button @click=${() => this._adjustTemp(-0.5)}>-0.5°</button>
          <button
            @click=${() => this._call("climate", "set_hvac_mode", {
          hvac_mode: t === "off" ? "heat" : "off"
        })}
          >
            Power
          </button>
          <button @click=${() => this._adjustTemp(0.5)}>+0.5°</button>
        </div>`;
      case "media_player":
        return c`<div class="actions">
          <button @click=${() => this._call("media_player", "media_previous_track")}>Prev</button>
          <button @click=${() => this._call("media_player", "media_play_pause")}>Play/Pause</button>
          <button @click=${() => this._call("media_player", "media_next_track")}>Next</button>
        </div>`;
      case "vacuum":
        return c`<div class="actions">
          <button @click=${() => this._call("vacuum", "start")}>Start</button>
          <button @click=${() => this._call("vacuum", "pause")}>Pause</button>
          <button @click=${() => this._call("vacuum", "return_to_base")}>Dock</button>
        </div>`;
      case "weather": {
        const e = this.hass.states[this._entity].attributes, i = Array.isArray(e.forecast) ? e.forecast.slice(0, 5) : [], o = e.temperature_unit || "°";
        return c`<div class="info">
          <div>Condition: ${t}</div>
          <div>
            Temperature: ${e.temperature ?? "n/a"}${o}
            ${e.humidity != null ? c` · Humidity: ${e.humidity}%` : _}
          </div>
          ${i.length ? c`<div class="forecast">
                ${i.map(
          (n) => c`<div class="f-row">
                    <span>${String(n.condition || n.datetime || "").toString().slice(0, 16)}</span>
                    <span>${n.templow != null ? `${n.templow}/` : ""}${n.temperature}${o}</span>
                  </div>`
        )}
              </div>` : _}
        </div>`;
      }
      case "power_outlet":
        return c`<div class="actions">
          <button
            @click=${() => this._call(this._entity.split(".")[0], "toggle")}
          >
            Toggle
          </button>
        </div>`;
      default:
        return _;
    }
  }
  _adjustTemp(t) {
    const e = Number(
      this.hass?.states[this._entity]?.attributes.temperature
    );
    Number.isNaN(e) || this._call("climate", "set_temperature", { temperature: e + t });
  }
  _call(t, e, i = {}) {
    this.hass && this.hass.callService(t, e, {
      entity_id: this._entity,
      ...i
    });
  }
};
Yt.styles = w`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: grid;
      place-items: center;
      z-index: 10000;
      padding: 16px;
    }
    .dialog {
      width: min(420px, 100%);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0 8px 24px rgba(0, 0, 0, 0.25));
      padding: 16px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .sub {
      opacity: 0.65;
      font-size: 12px;
      margin-top: 4px;
      text-transform: capitalize;
    }
    .close {
      border: 0;
      background: transparent;
      cursor: pointer;
      color: inherit;
    }
    .actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .actions button,
    .close {
      font: inherit;
    }
    .actions button {
      border: 0;
      border-radius: 12px;
      padding: 10px 8px;
      background: rgba(var(--color-theme, 51, 51, 51), 0.08);
      cursor: pointer;
      color: inherit;
    }
    .slider {
      display: grid;
      gap: 8px;
      margin-top: 16px;
      font-size: 13px;
    }
    .forecast {
      margin-top: 12px;
      display: grid;
      gap: 6px;
    }
    .f-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      opacity: 0.85;
      font-size: 13px;
    }
    .info {
      font-size: 14px;
      line-height: 1.5;
    }
  `;
xo([
  x({ attribute: !1 })
], Yt.prototype, "hass", 2);
xo([
  y()
], Yt.prototype, "_open", 2);
xo([
  y()
], Yt.prototype, "_kind", 2);
xo([
  y()
], Yt.prototype, "_entity", 2);
Yt = xo([
  $("ulm-popup-dialog")
], Yt);
var jc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, Jn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Dc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && jc(e, i, n), n;
};
let ci = class extends v {
  constructor() {
    super(...arguments), this._liveFill = (t) => {
      const e = t.target, i = this.renderRoot.querySelector(".slider-fill");
      i && (i.style.width = `${e.value}%`);
    }, this._iconTap = (t) => {
      if (t.stopPropagation(), !(!this.hass || !this._config)) {
        if (this._config.enable_popup_tap || this._config.enable_popup) {
          dt(this, "light", this._config.entity);
          return;
        }
        this.hass.callService("light", "toggle", { entity_id: this._config.entity });
      }
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "light", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    }, this._setBrightness = (t) => {
      const e = Number(t.target.value);
      this._setPct(e);
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        u("entity", "light"),
        D([m("name"), S("icon")]),
        A("color"),
        b("enable_slider"),
        D([
          M("enable_slider_min"),
          M("enable_slider_max")
        ]),
        b("enable_collapse"),
        b("enable_horizontal"),
        b("enable_horizontal_wide"),
        b("enable_color"),
        b("force_background_color"),
        b("enable_popup"),
        b("enable_popup_tap"),
        m("color_palette"),
        b("enable_buttons"),
        D([
          M("brightness_low"),
          M("brightness_medium"),
          M("brightness_high")
        ])
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_light_name)",
        icon: "Icon (ulm_card_light_icon)",
        color: "Color (ulm_card_light_color)",
        enable_slider: "Enable slider (ulm_card_light_enable_slider)",
        enable_slider_min: "Slider min",
        enable_slider_max: "Slider max",
        enable_collapse: "Collapse when off (ulm_card_light_enable_collapse)",
        enable_horizontal: "Horizontal layout (ulm_card_light_enable_horizontal)",
        enable_horizontal_wide: "Wider slider (ulm_card_light_enable_horizontal_wide)",
        enable_color: "Use light RGB (ulm_card_light_enable_color)",
        force_background_color: "Force colored background (ulm_card_light_force_background_color)",
        enable_popup: "Enable popup (ulm_card_light_enable_popup)",
        enable_popup_tap: "Popup on icon tap (ulm_card_light_enable_popup_tap)",
        color_palette: "Color palette entity",
        enable_buttons: "Enable brightness buttons (ulm_card_light_enable_buttons)",
        brightness_low: "Low %",
        brightness_medium: "Medium %",
        brightness_high: "High %"
      }),
      computeHelper: C({
        entity: "Light entity to control.",
        enable_slider: "Show a brightness slider under the name row.",
        enable_collapse: "Hide slider and preset buttons when the light is off.",
        enable_horizontal: "Put name and slider on one row.",
        enable_color: "Tint icon/slider from the light RGB color when on.",
        force_background_color: "Use light/theme color as the card background when on.",
        enable_popup: "Open the ULM light popup from the name (and icon).",
        enable_popup_tap: "Open the popup on icon tap instead of toggling.",
        color_palette: "Optional input_select for a color palette.",
        enable_buttons: "Show low / medium / high brightness preset buttons."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "light.bed_light",
      enable_slider: !0,
      enable_color: !0,
      color: "yellow"
    };
  }
  setConfig(t) {
    if (!t.entity) throw new Error("Please define an entity");
    const e = t, i = e.layout || {}, o = e.colors_popup || {}, n = e.presets || {}, r = (a, s) => {
      if (a == null || a === !1 || a === "") return s;
      const l = Number(a);
      return Number.isNaN(l) ? s : l;
    };
    this._config = {
      ...t,
      name: t.name ?? e.ulm_card_light_name,
      icon: t.icon ?? e.ulm_card_light_icon,
      color: t.color || e.ulm_card_light_color || "yellow",
      enable_slider: !!(t.enable_slider ?? i.enable_slider ?? e.ulm_card_light_enable_slider),
      enable_slider_min: r(
        t.enable_slider_min ?? i.enable_slider_min,
        0
      ),
      enable_slider_max: r(
        t.enable_slider_max ?? i.enable_slider_max,
        100
      ),
      enable_collapse: !!(t.enable_collapse ?? i.enable_collapse ?? e.ulm_card_light_enable_collapse),
      enable_horizontal: !!(t.enable_horizontal ?? i.enable_horizontal ?? e.ulm_card_light_enable_horizontal),
      enable_horizontal_wide: !!(t.enable_horizontal_wide ?? i.enable_horizontal_wide ?? e.ulm_card_light_enable_horizontal_wide),
      enable_color: !!(t.enable_color ?? o.enable_color ?? e.ulm_card_light_enable_color),
      force_background_color: !!(t.force_background_color ?? o.force_background_color ?? e.ulm_card_light_force_background_color),
      enable_buttons: !!(t.enable_buttons ?? n.enable_buttons ?? e.ulm_card_light_enable_buttons),
      brightness_low: r(
        t.brightness_low ?? n.brightness_low,
        1
      ),
      brightness_medium: r(
        t.brightness_medium ?? n.brightness_medium,
        50
      ),
      brightness_high: r(
        t.brightness_high ?? n.brightness_high,
        100
      ),
      enable_popup: !!(t.enable_popup ?? o.enable_popup ?? e.ulm_card_light_enable_popup),
      enable_popup_tap: !!(t.enable_popup_tap ?? o.enable_popup_tap ?? e.ulm_card_light_enable_popup_tap),
      color_palette: t.color_palette ?? o.color_palette,
      type: "custom:ulm-light-card"
    };
  }
  getCardSize() {
    return this._contentRows();
  }
  /** Sections view — declare size so HA enables full resize without warning */
  getGridOptions() {
    const t = this._contentRows(), e = !!this._config?.enable_horizontal;
    return {
      columns: e ? 12 : 6,
      rows: t,
      min_rows: 1,
      min_columns: e ? 6 : 3,
      max_columns: 12
    };
  }
  _contentRows() {
    if (!this._config) return 1;
    const e = this.hass?.states[this._config.entity]?.state === "on";
    if (this._config.enable_collapse && !e || this._config.enable_horizontal) return 1;
    let i = 1;
    return this._config.enable_slider && (i += 1), this._config.enable_buttons && (i += 1), i;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = t.state === "unavailable", o = t.attributes.brightness, n = typeof o == "number" ? Math.round(o / 255 * 100) : void 0, r = this._config.name || t.attributes.friendly_name || t.entity_id, a = this._config.icon || t.attributes.icon || "mdi:lightbulb", s = this._config.color || "yellow", l = f(this, s), h = t.attributes.rgb_color, p = R(
      this,
      e,
      s,
      h,
      this._config.enable_color,
      !!(e && this._config.force_background_color)
    ), g = !!this._config.enable_slider && !(this._config.enable_collapse && !e), z = !!this._config.enable_buttons && !(this._config.enable_collapse && !e) && !(this._config.enable_horizontal && this._config.enable_slider), P = e && this._config.force_background_color ? this._config.enable_color && h ? `rgba(${h.join(", ")}, var(--opacity-bg, 1))` : `rgba(${l}, var(--opacity-bg, 1))` : void 0, O = this._config.enable_color && h ? `rgba(${h.join(", ")}, 1)` : `rgba(${l}, 1)`, T = this._config.enable_color && h ? `rgba(${h.join(", ")}, 0.2)` : `rgba(${l}, 0.2)`, N = this._config.enable_slider_min ?? 0, U = this._config.enable_slider_max ?? 100, F = Math.min(U, Math.max(N, n ?? (N || 1))), nt = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : "",
      this._config.enable_horizontal_wide ? "wide" : "",
      i ? "unavailable" : ""
    ].filter(Boolean).join(" ");
    return c`
      <ha-card
        class="ulm-card"
        style=${d({
      backgroundColor: P,
      color: e && this._config.force_background_color ? "rgb(250,250,250)" : void 0
    })}
      >
        <div class=${nt}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(p)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${a}></ha-icon>
              ${i ? c`<span
                    class="badge"
                    style="background: rgba(var(--color-red, 245,68,54),1)"
                    ><ha-icon icon="mdi:exclamation"></ha-icon
                  ></span>` : _}
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${r}</div>
              <div class="label">
                ${e && n !== void 0 ? `${n}%` : this._capitalize(t.state)}
              </div>
            </button>
          </div>

          ${g ? c`<div
                class="slider-wrap"
                style=${d({ background: e ? T : void 0 })}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${e ? F : 0}%`,
      background: e ? O : "transparent"
    })}
                ></div>
                <input
                  type="range"
                  min=${N || 1}
                  max=${U}
                  .value=${String(F || 1)}
                  ?disabled=${!e && !this._config.enable_collapse}
                  @change=${this._setBrightness}
                  @input=${this._liveFill}
                />
              </div>` : _}

          ${z ? c`<div class="widgets">
                <button
                  class="widget-btn"
                  @click=${() => this._setPct(this._config.brightness_low ?? 1)}
                >
                  <ha-icon icon="mdi:lightbulb-on-10"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  @click=${() => this._setPct(this._config.brightness_medium ?? 50)}
                >
                  <ha-icon icon="mdi:lightbulb-on-50"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  @click=${() => this._setPct(this._config.brightness_high ?? 100)}
                >
                  <ha-icon icon="mdi:lightbulb-on"></ha-icon>
                </button>
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  _setPct(t) {
    !this.hass || !this._config || Number.isNaN(t) || this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: t
    });
  }
};
ci.styles = E;
Jn([
  x({ attribute: !1 })
], ci.prototype, "hass", 2);
Jn([
  y()
], ci.prototype, "_config", 2);
ci = Jn([
  $("ulm-light-card")
], ci);
var Ac = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, Zn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Tc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Ac(e, i, n), n;
};
const Uc = {
  awning: "mdi:window-open",
  blind: "mdi:blinds-open",
  curtain: "mdi:curtains",
  damper: "mdi:circle-outline",
  door: "mdi:door-open",
  garage: "mdi:garage-open",
  gate: "mdi:gate-open",
  shade: "mdi:roller-shade",
  shutter: "mdi:window-shutter-open",
  window: "mdi:window-open"
}, Fc = {
  awning: "mdi:window-closed",
  blind: "mdi:blinds",
  curtain: "mdi:curtains-closed",
  damper: "mdi:circle-slice-8",
  door: "mdi:door-closed",
  garage: "mdi:garage",
  gate: "mdi:gate",
  shade: "mdi:roller-shade-closed",
  shutter: "mdi:window-shutter",
  window: "mdi:window-closed"
}, Bc = /* @__PURE__ */ new Set(["open", "opening", "closing"]);
let li = class extends v {
  constructor() {
    super(...arguments), this._onSlider = (t) => {
      let e = Number(t.target.value);
      this._config?.invert_percent && (e = 100 - e), this._setPosition(e);
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "cover", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        u("entity", "cover"),
        D([m("name"), S("icon")]),
        A("color"),
        b("enable_controls"),
        b("enable_slider"),
        b("enable_popup"),
        b("force_background_color"),
        b("enable_horizontal"),
        b("invert_percent"),
        b("display_left_right"),
        b("enable_tilt"),
        b("garage_large"),
        b("show_last_changed"),
        M("favorite_percentage"),
        D([M("slider_min"), M("slider_max")])
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_cover_name)",
        icon: "Icon (ulm_card_cover_icon)",
        color: "Color (ulm_card_cover_color)",
        enable_controls: "Enable controls",
        enable_slider: "Enable slider",
        enable_horizontal: "Horizontal layout",
        invert_percent: "Invert percent (100% = closed)",
        display_left_right: "Left/right buttons",
        enable_tilt: "Tilt controls",
        garage_large: "Garage large icon",
        enable_popup: "Enable popup",
        force_background_color: "Force colored background when open",
        show_last_changed: "Show last changed",
        favorite_percentage: "Favorite %",
        slider_min: "Slider min",
        slider_max: "Slider max"
      }),
      computeHelper: C({
        entity: "Cover entity to control.",
        enable_horizontal: "Place controls/slider beside the icon row when enabled.",
        favorite_percentage: "Optional preset position button (0–100).",
        invert_percent: "Use when your cover reports 100% as closed."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "cover.living_room_window",
      enable_controls: !0,
      enable_slider: !0,
      color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = e.controls || {}, o = t.entity || e.ulm_card_cover_entity;
    if (!o) throw new Error("Please define an entity");
    const n = t.favorite_percentage ?? i.favorite_percentage ?? e.ulm_card_cover_favorite_percentage;
    this._config = {
      ...t,
      entity: o,
      name: t.name ?? e.ulm_card_cover_name,
      icon: t.icon || e.ulm_card_cover_icon,
      color: t.color || e.ulm_card_cover_color || "blue",
      enable_controls: !!(t.enable_controls ?? i.enable_controls ?? e.ulm_card_cover_enable_controls),
      enable_slider: !!(t.enable_slider ?? i.enable_slider ?? e.ulm_card_cover_enable_slider),
      enable_horizontal: !!(t.enable_horizontal ?? i.enable_horizontal ?? e.ulm_card_cover_enable_horizontal),
      enable_popup: !!(t.enable_popup ?? i.enable_popup ?? e.ulm_card_cover_enable_popup),
      force_background_color: !!(t.force_background_color ?? i.force_background_color ?? e.ulm_card_cover_force_background_color),
      invert_percent: !!(t.invert_percent ?? i.invert_percent ?? e.ulm_card_invert_percent ?? e.ulm_card_cover_invert_percent),
      display_left_right: !!(t.display_left_right ?? i.display_left_right ?? e.ulm_card_cover_display_left_right),
      enable_tilt: !!(t.enable_tilt ?? i.enable_tilt ?? e.ulm_card_cover_enable_tilt),
      garage_large: !!(t.garage_large ?? i.garage_large ?? e.ulm_card_cover_garage_large),
      show_last_changed: !!(t.show_last_changed ?? i.show_last_changed ?? e.ulm_card_cover_show_last_changed),
      favorite_percentage: n == null || n === !1 ? void 0 : Number(n),
      slider_min: Number(
        t.slider_min ?? i.slider_min ?? e.ulm_card_cover_slider_min ?? 0
      ),
      slider_max: Number(
        t.slider_max ?? i.slider_max ?? e.ulm_card_cover_slider_max ?? 100
      ),
      type: "custom:ulm-cover-card"
    };
  }
  getCardSize() {
    return this._contentRows();
  }
  getGridOptions() {
    const t = !!this._config?.enable_horizontal;
    return {
      columns: t ? 12 : 6,
      min_columns: t ? 6 : 3,
      max_columns: 12
    };
  }
  _contentRows() {
    let t = 1;
    return this._config?.enable_controls && t++, this._config?.enable_slider && t++, this._config?.enable_tilt && t++, this._config?.enable_horizontal ? Math.max(1, t - 1) : t;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = !!this._config.invert_percent, i = Number(t.attributes.current_position), o = !Number.isNaN(i), n = o ? e ? 100 - i : i : void 0, r = e ? !(o && i === 100) : t.state !== "closed", a = this._config.color || "blue", s = f(this, a), l = this._config.name || t.attributes.friendly_name || t.entity_id, h = String(t.attributes.device_class || ""), p = this._coverIcon(t.state, h, t), g = !!this._config.force_background_color && r, z = R(
      this,
      r,
      a,
      null,
      !1,
      g
    ), P = !!this._config.enable_controls, O = !!this._config.enable_slider, T = !!this._config.enable_tilt, N = this._config.favorite_percentage != null && !Number.isNaN(Number(this._config.favorite_percentage)), U = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : ""
    ].filter(Boolean).join(" "), F = this._closeControlIcon(h), nt = this._openControlIcon(h), G = this._label(t, n, o, e), ut = g ? `rgba(${s}, var(--opacity-bg, 1))` : void 0;
    return c`
      <ha-card
        class="ulm-card cover"
        style=${d(
      ut ? {
        "--ha-card-background": ut,
        background: ut,
        backgroundColor: ut,
        color: "rgb(250,250,250)"
      } : {}
    )}
      >
        <div class=${U}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(z)}
              @click=${() => this._call("toggle")}
            >
              <ha-icon .icon=${p}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${l}</div>
              <div class="label">${G}</div>
            </button>
          </div>

          ${P ? c`<div
                class="controls ${N ? "four" : ""}"
              >
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("close_cover")}
                >
                  <ha-icon icon=${F}></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("stop_cover")}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("open_cover")}
                >
                  <ha-icon icon=${nt}></ha-icon>
                </button>
                ${N ? c`<button
                      class="widget-btn"
                      style=${d(this._widgetStyle(g, a, s))}
                      @click=${() => this._setPosition(
      Number(this._config.favorite_percentage)
    )}
                    >
                      <ha-icon icon="mdi:star"></ha-icon>
                    </button>` : _}
              </div>` : _}

          ${O ? c`<div
                class="slider-wrap"
                style=${d({
      background: r ? g ? `rgba(${s}, 0.3)` : `rgba(${s}, 0.1)` : void 0
    })}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${n ?? (r ? 100 : 0)}%`,
      background: r ? g ? "rgb(250,250,250)" : `rgba(${s}, 0.8)` : "transparent"
    })}
                ></div>
                <input
                  type="range"
                  min=${this._config.slider_min ?? 0}
                  max=${this._config.slider_max ?? 100}
                  .value=${String(n ?? 0)}
                  @change=${this._onSlider}
                />
              </div>` : _}

          ${T ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("close_cover_tilt")}
                >
                  <ha-icon icon="mdi:arrow-bottom-left"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("stop_cover_tilt")}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("open_cover_tilt")}
                >
                  <ha-icon icon="mdi:arrow-top-right"></ha-icon>
                </button>
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _widgetStyle(t, e, i) {
    return t ? {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${i}, 1)`
    } : {};
  }
  _coverIcon(t, e, i) {
    if (this._config?.icon) return this._config.icon;
    if (i.attributes.icon) return String(i.attributes.icon);
    const o = Bc.has(t);
    return e === "garage" && this._config?.garage_large ? o ? "mdi:garage-open-variant" : "mdi:garage-variant" : (o ? Uc : Fc)[e] || "mdi:help-circle";
  }
  _horizontalDevice(t) {
    return t === "curtain" || t === "gate" || t === "awning";
  }
  _closeControlIcon(t) {
    return this._config?.display_left_right ? "mdi:arrow-left" : this._horizontalDevice(t) ? "mdi:arrow-collapse-horizontal" : "mdi:arrow-down";
  }
  _openControlIcon(t) {
    return this._config?.display_left_right ? "mdi:arrow-right" : this._horizontalDevice(t) ? "mdi:arrow-expand-horizontal" : "mdi:arrow-up";
  }
  _label(t, e, i, o) {
    if (this._config?.show_last_changed && t.last_changed)
      return this._relativeTime(t.last_changed);
    const n = t.state, r = this._capitalize(n);
    if (o && i) {
      const s = {
        closed: "Open",
        closing: "Opening",
        open: "Closed",
        opening: "Closing"
      }[n] || r;
      return Number(t.attributes.current_position) === 0 ? `${s} • ${e}%` : s;
    }
    return ["unknown", "unavailable", "closed"].includes(n) || !i ? r : `${r} • ${e}%`;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  _call(t) {
    !this.hass || !this._config || this.hass.callService("cover", t, { entity_id: this._config.entity });
  }
  _setPosition(t) {
    !this.hass || !this._config || Number.isNaN(t) || this.hass.callService("cover", "set_cover_position", {
      entity_id: this._config.entity,
      position: t
    });
  }
};
li.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.cover {
        height: auto;
        overflow: visible;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }
    `
];
Zn([
  x({ attribute: !1 })
], li.prototype, "hass", 2);
Zn([
  y()
], li.prototype, "_config", 2);
li = Zn([
  $("ulm-cover-card")
], li);
var Hc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, Xn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Rc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Hc(e, i, n), n;
};
let di = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        u("entity", "person"),
        D([m("name"), S("icon")]),
        b("use_entity_picture"),
        u("battery_entity", "sensor", !1),
        u("eta_entity", "sensor", !1),
        u("address_entity", void 0, !1)
      ],
      computeLabel: k({
        entity: "Person entity (ulm_card_person_entity)",
        name: "Name",
        icon: "Icon (ulm_card_person_icon)",
        use_entity_picture: "Use entity picture",
        battery_entity: "Battery (ulm_card_person_battery)",
        eta_entity: "ETA (ulm_card_person_eta)",
        address_entity: "Address (ulm_address)"
      }),
      computeHelper: C({
        use_entity_picture: "Show entity_picture instead of the icon (default false).",
        battery_entity: "Battery % ring in the top-right corner.",
        eta_entity: "Shown in the label when the person is not home.",
        address_entity: "Replaces the zone label with an address sensor."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.anne_therese",
      use_entity_picture: !1,
      icon: "mdi:face-man"
    };
  }
  setConfig(t) {
    const e = t, i = e.extras || {}, o = t.entity || e.ulm_card_person_entity;
    if (!o) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: o,
      icon: t.icon || e.ulm_card_person_icon || "mdi:face-man",
      use_entity_picture: !!(t.use_entity_picture ?? e.ulm_card_person_use_entity_picture),
      battery_entity: t.battery_entity || i.battery_entity || e.ulm_card_person_battery,
      eta_entity: t.eta_entity || i.eta_entity || e.ulm_card_person_eta,
      address_entity: t.address_entity || i.address_entity || e.ulm_address,
      type: "custom:ulm-person-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "home", i = f(this, e ? "blue" : "green"), o = this._config.name || t.attributes.friendly_name || t.entity_id, r = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, a = this._config.icon || "mdi:face-man", s = this._badgeIcon(t), l = this._label(t, e), h = this._batterySvg();
    return c`
      <ha-card class="ulm-person" @click=${this._moreInfo}>
        <!-- icon_info_bg grid: 'i n' / 'i l' -->
        <div class="grid">
          <div class="img-cell">
            ${r ? c`<img
                  class="entity-picture"
                  src=${r}
                  alt=${o}
                />` : c`<ha-icon
                  class="person-icon"
                  .icon=${a}
                  style=${d({
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      width: "20px",
      height: "20px"
    })}
                ></ha-icon>`}
          </div>
          <div class="name">${o}</div>
          <div class="label">${l}</div>
        </div>

        <!-- custom_fields.notification — absolute on card -->
        <span
          class="notification"
          style=${d({
      backgroundColor: `rgba(${i}, 1)`
    })}
        >
          <ha-icon .icon=${s}></ha-icon>
        </span>

        <!-- custom_fields.info — battery ring absolute on card -->
        ${h ? c`<div class="info">${h}</div>` : _}
      </ha-card>
    `;
  }
  _badgeIcon(t) {
    if (t.state === "home") return "mdi:home-variant";
    if (this.hass)
      for (const [e, i] of Object.entries(this.hass.states)) {
        if (!e.startsWith("zone.")) continue;
        const o = i.attributes.persons;
        if (!i.attributes.passive && (o?.includes(t.state) || o?.includes(t.entity_id) || e === `zone.${t.state}` || i.attributes.friendly_name === t.state))
          return i.attributes.icon != null ? String(i.attributes.icon) : "mdi:help-circle";
      }
    return "mdi:home-minus";
  }
  _label(t, e) {
    let i = this._localizePerson(t), o = "";
    if (this._config?.eta_entity && !e && this.hass) {
      const n = this.hass.states[this._config.eta_entity];
      n && (o = ` | ${this.hass.formatEntityState?.(n) || n.state}`);
    }
    if (this._config?.address_entity && this.hass) {
      const n = this.hass.states[this._config.address_entity];
      if (n)
        return (this.hass.formatEntityState?.(n) || n.state) + o;
    }
    return i + o;
  }
  _localizePerson(t) {
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state === "home" ? "Home" : t.state === "not_home" ? "Away" : t.state;
  }
  _batterySvg() {
    if (!this._config?.battery_entity || !this.hass) return _;
    const t = this.hass.states[this._config.battery_entity];
    if (!t) return _;
    const e = Math.round(Number(t.state));
    if (Number.isNaN(e)) return _;
    const i = 20.5, o = i * 2 * Math.PI, n = o - e / 100 * o;
    return Zo`
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r=${i}
          stroke="green"
          stroke-width="3"
          fill="none"
          style="transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: ${o}; stroke-dashoffset: ${n};"
        />
        <text
          x="50%"
          y="54%"
          fill="var(--primary-text-color)"
          font-size="16"
          font-weight="bold"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          ${e}<tspan font-size="10">%</tspan>
        </text>
      </svg>
    `;
  }
};
di.styles = w`
    :host {
      display: block;
      width: 100%;
      /* Content height like original button-card (not stretched) */
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    /*
     * icon_info_bg styles.card — padding 12px, height = 12+42+12 ≈ 66px
     */
    ha-card.ulm-person {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    /*
     * icon_info_bg styles.grid:
     * 'i n' / 'i l', columns min-content auto, rows min-content min-content
     *
     * button-card sizes the two rows against the 42px img_cell span, so each
     * row becomes ~21px; name (align end) + label (align start) meet at the
     * midline. Force the same by locking grid height to the icon.
     */
    .grid {
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      column-gap: 0;
      row-gap: 0;
      height: 42px;
      width: 100%;
      align-content: stretch;
    }

    /* icon_info_bg styles.img_cell */
    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* card_person styles.icon — 20px / picture 42px stretch */
    .person-icon {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      line-height: 0;
    }

    .entity-picture {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* icon_info_bg styles.name — align-self end, margin-left 12px, 14px bold */
    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /* icon_info_bg styles.label — align-self start, 12px bold, opacity 40% */
    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /*
     * card_person notification — absolute on card padding box
     * left: 38px; top: 8px; 16×16 (border 2px → 12px content box)
     */
    .notification {
      position: absolute;
      left: 38px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: var(--primary-background-color, #fff);
    }

    .notification ha-icon svg {
      display: block;
      width: 10px;
      height: 10px;
    }

    /* card_person info — right: 6px; top: 6px; 25×25 */
    .info {
      position: absolute;
      right: 6px;
      top: 6px;
      width: 25px;
      height: 25px;
      pointer-events: none;
      z-index: 2;
    }

    .info svg {
      width: 25px;
      height: 25px;
      display: block;
    }
  `;
Xn([
  x({ attribute: !1 })
], di.prototype, "hass", 2);
Xn([
  y()
], di.prototype, "_config", 2);
di = Xn([
  $("ulm-person-card")
], di);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = Vs(class extends qs {
  constructor(t) {
    if (super(t), t.type !== Ks.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in e) e[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const o of this.st) o in e || (i.remove(o), this.st.delete(o));
    for (const o in e) {
      const n = !!e[o];
      n === this.st.has(o) || this.nt?.has(o) || (n ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return Tt;
  }
});
var Gc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, Qn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Wc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Gc(e, i, n), n;
};
const xa = {
  spotify: "mdi:spotify",
  "google podcasts": "mdi:google-podcast",
  plex: "mdi:plex",
  soundcloud: "mdi:soundcloud",
  "youtube music": "mdi:youtube",
  "oto music": "mdi:music-circle",
  pandora: "mdi:pandora",
  netflix: "mdi:netflix",
  hulu: "mdi:hulu",
  "bluetooth audio": "mdi:bluetooth"
}, $a = /* @__PURE__ */ new Set(["off", "standby", "unavailable", "unknown"]);
let ui = class extends v {
  constructor() {
    super(...arguments), this._onVolumeSlider = (t) => {
      if (!this.hass || !this._config) return;
      const e = Number(t.target.value);
      Number.isNaN(e) || this.hass.callService("media_player", "volume_set", {
        entity_id: this._controlEntity(),
        volume_level: Math.min(1, Math.max(0, e / 100))
      });
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "media_player", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // All original card_media_player variables (top-level for HA persistence)
        u("entity", "media_player"),
        D([m("name"), S("icon")]),
        A("color"),
        b("enable_art"),
        b("enable_controls"),
        b("enable_volume_slider"),
        b("enable_volume_buttons"),
        {
          name: "enable_volume_adjust",
          selector: { number: { mode: "box", min: 0, max: 100, step: 1 } }
        },
        b("collapsible"),
        u("player_controls_entity", "media_player", !1),
        b("enable_popup"),
        b("more_info"),
        b("power_button"),
        b("force_background_color")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_media_player_name)",
        icon: "Icon (ulm_card_media_player_icon)",
        color: "Color (ulm_card_media_player_color)",
        enable_art: "Enable album art background",
        enable_controls: "Enable controls",
        enable_volume_slider: "Enable volume slider",
        enable_volume_buttons: "Enable volume buttons",
        enable_volume_adjust: "Volume adjust amount (%)",
        collapsible: "Collapsible when off",
        player_controls_entity: "Player controls entity",
        enable_popup: "Enable popup",
        more_info: "More info (artist • album)",
        power_button: "Power button",
        force_background_color: "Force background color when active"
      }),
      computeHelper: C({
        enable_art: "Album picture as card background when entity_picture is set.",
        enable_volume_adjust: "Percent step for +/- buttons (default 5). 0 = TV 1% / speaker 5%.",
        collapsible: "Hide controls and volume when state is off/standby.",
        player_controls_entity: "Optional other media_player for play/volume commands (default: entity).",
        more_info: "Show artist and album in the sub-label.",
        force_background_color: "Use color as card background when the player is active (no art)."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "media_player.living_room",
      enable_controls: !0,
      enable_volume_slider: !0,
      color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = e.more || {}, o = t.entity || e.ulm_card_media_player_entity;
    if (!o) throw new Error("Please define an entity");
    const n = t.enable_volume_adjust ?? i.enable_volume_adjust ?? e.ulm_card_media_player_enable_volume_adjust;
    let r = 5;
    n === 0 || n === "0" ? r = 0 : n != null && n !== !1 && n !== "" && (r = Number(n), Number.isNaN(r) && (r = 5));
    const a = [
      t.player_controls_entity,
      i.player_controls_entity,
      e.ulm_card_media_player_player_controls_entity
    ].find((s) => typeof s == "string" && s.includes("."));
    this._config = {
      ...t,
      entity: o,
      name: t.name ?? e.ulm_card_media_player_name,
      icon: typeof t.icon == "string" && t.icon || (typeof e.ulm_card_media_player_icon == "string" ? e.ulm_card_media_player_icon : void 0) || void 0,
      color: t.color || e.ulm_card_media_player_color || "blue",
      enable_art: !!(t.enable_art ?? e.ulm_card_media_player_enable_art),
      enable_controls: !!(t.enable_controls ?? e.ulm_card_media_player_enable_controls),
      enable_volume_slider: !!(t.enable_volume_slider ?? e.ulm_card_media_player_enable_volume_slider),
      enable_volume_buttons: !!(t.enable_volume_buttons ?? e.ulm_card_media_player_enable_volume_buttons),
      enable_volume_adjust: r,
      collapsible: !!(t.collapsible ?? i.collapsible ?? e.ulm_card_media_player_collapsible),
      idle_off: !!(t.idle_off ?? i.idle_off ?? e.ulm_card_media_player_idle_off),
      player_controls_entity: a,
      enable_popup: !!(t.enable_popup ?? e.ulm_card_media_player_enable_popup),
      more_info: !!(t.more_info ?? i.more_info ?? e.ulm_card_media_player_more_info),
      power_button: !!(t.power_button ?? i.power_button ?? e.ulm_card_media_player_power_button),
      force_background_color: !!(t.force_background_color ?? e.ulm_card_media_player_force_background_color),
      type: "custom:ulm-media-player-card"
    };
  }
  getCardSize() {
    return this._contentRows();
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12
    };
  }
  _contentRows() {
    if (!this._config) return 1;
    let t = 1;
    return this._config.enable_controls && t++, this._config.enable_volume_slider && t++, this._config.enable_volume_buttons && t++, t;
  }
  _isCollapsed(t) {
    return this._config?.collapsible ? !!($a.has(t.state) || this._config.idle_off && t.state === "idle") : !1;
  }
  _isActive(t) {
    return !($a.has(t.state) || this._config?.idle_off && t.state === "idle");
  }
  _artUrl(t) {
    if (!this._config?.enable_art) return;
    const e = t.attributes.entity_picture || t.attributes.media_image_url || t.attributes.entity_picture_local;
    if (!(typeof e != "string" || !e.length))
      return this._resolveMediaUrl(e);
  }
  _resolveMediaUrl(t) {
    return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("data:") ? t : this.hass?.hassUrl ? this.hass.hassUrl(t) : t;
  }
  _controlEntity() {
    return this._config.player_controls_entity || this._config.entity;
  }
  _appIcon(t) {
    if (this._config?.icon) return this._config.icon;
    const e = String(t.attributes.app_name || "").toLowerCase();
    return e && xa[e] ? xa[e] : String(t.attributes.icon || "mdi:speaker");
  }
  _titleName(t) {
    const e = this._config?.name || t.attributes.friendly_name || t.entity_id;
    if (t.state === "off" || t.state === "standby")
      return e;
    const i = !!this._config?.idle_off && t.state === "idle";
    return t.attributes.media_title && !i ? String(t.attributes.media_title) : e;
  }
  _label(t) {
    const e = !!this._config?.idle_off && t.state === "idle";
    if (t.state === "off" || t.state === "standby" || e)
      return this.hass?.formatEntityState?.(t) || this._capitalize(t.state);
    const i = t.attributes.media_artist, o = t.attributes.media_album_name;
    return this._config?.more_info && i && o ? `${i} • ${o}` : o ? String(o) : i ? String(i) : this.hass?.formatEntityState?.(t) || this._capitalize(t.state);
  }
  _playIcon(t) {
    return t.state === "playing" ? "mdi:pause" : ["paused", "off", "standby", "idle"].includes(t.state) ? "mdi:play" : Number(t.attributes.media_duration) > 0 ? "mdi:pause" : "mdi:stop";
  }
  _playService(t) {
    return Number(t.attributes.media_duration) > 0 ? "media_play_pause" : t.state === "playing" ? "media_stop" : "media_play";
  }
  _volumeStep(t) {
    const e = Number(this._config?.enable_volume_adjust ?? 5);
    if (e > 0)
      return e > 1 ? e / 100 : e;
    const i = String(t.attributes.device_class || "");
    return i === "tv" ? 0.01 : i === "speaker" ? 0.05 : 0.025;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._isActive(t), i = this._isCollapsed(t), o = this._artUrl(t), n = this._config.color || "blue", r = f(this, n), a = !!this._config.force_background_color && e && !o, s = a ? `rgba(${r}, var(--opacity-bg, 1))` : void 0, l = !!this._config.enable_controls && !i, h = !!this._config.enable_volume_slider && !i, p = !!this._config.enable_volume_buttons && !i, g = Number(t.attributes.volume_level), P = !Number.isNaN(g) ? Math.round(Math.min(1, Math.max(0, g)) * 100) : 0, O = this._iconStyle(e, !!o, a, r), T = this._textStyle(!!o, a), N = this._widgetStyle(e, !!o, a, r), U = {};
    if (o) {
      const F = o.replace(/"/g, "%22");
      U["--ha-card-background"] = "transparent", U.background = [
        "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))",
        `center / cover no-repeat url("${F}")`
      ].join(", ");
    } else s && (U["--ha-card-background"] = s, U.background = s, U.backgroundColor = s, U.color = "rgb(250,250,250)");
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      media: !0,
      "has-art": !!o
    })}
        style=${d(U)}
      >
        ${this._config.power_button ? c`<button
              class="power-btn widget-btn"
              style=${d(N)}
              @click=${() => this._call("toggle")}
              title="power"
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>` : _}

        <div
          class="stack"
          style=${d({
      gap: i ? "0px" : "12px"
    })}
        >
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(O)}
                @click=${() => this._call(this._playService(t), this._controlEntity())}
              >
                <ha-icon .icon=${this._appIcon(t)}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name" style=${d(T.name)}>
                  ${this._titleName(t)}
                </div>
                <div class="label" style=${d(T.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${l ? c`<div class="controls four">
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._call("media_previous_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-previous"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._call(this._playService(t), this._controlEntity())}
                >
                  <ha-icon icon=${this._playIcon(t)}></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._call("media_next_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-next"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${this._nameTap}
                  title="source / more info"
                >
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </button>
              </div>` : _}

          ${h ? c`<div
                class="slider-wrap"
                style=${d(this._sliderTrack(e, !!o, a, r))}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${P}%`,
      background: this._sliderFill(e, !!o, a, r)
    })}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(P)}
                  @change=${this._onVolumeSlider}
                />
              </div>` : _}

          ${p ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._toggleMute(t)}
                >
                  <ha-icon icon="mdi:volume-mute"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._nudgeVolume(t, -1)}
                >
                  <ha-icon icon="mdi:volume-minus"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(N)}
                  @click=${() => this._nudgeVolume(t, 1)}
                >
                  <ha-icon icon="mdi:volume-plus"></ha-icon>
                </button>
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _iconStyle(t, e, i, o) {
    return e ? {
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.2)"
    } : i && t ? {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)"
    } : t ? {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  }
  _textStyle(t, e) {
    return t ? {
      name: { color: "white", textShadow: "0 0 black" },
      label: { color: "white", textShadow: "0 0 black", opacity: "1" }
    } : e ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.5)", opacity: "1" }
    } : { name: {}, label: {} };
  }
  _widgetStyle(t, e, i, o) {
    return e ? {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "white"
    } : i && t ? {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${o}, 1)`
    } : {};
  }
  _sliderTrack(t, e, i, o) {
    return t ? e ? { background: "rgba(0, 0, 0, 0.3)" } : i ? { background: `rgba(${o}, 0.3)` } : { background: `rgba(${o}, 0.2)` } : {};
  }
  _sliderFill(t, e, i, o) {
    return t ? e ? "rgba(0, 0, 0, 0.5)" : i ? "rgb(250,250,250)" : `rgba(${o}, 1)` : "transparent";
  }
  _call(t, e) {
    !this.hass || !this._config || this.hass.callService("media_player", t, {
      entity_id: e || this._config.entity
    });
  }
  _toggleMute(t) {
    if (!this.hass || !this._config) return;
    const e = !!t.attributes.is_volume_muted;
    this.hass.callService("media_player", "volume_mute", {
      entity_id: this._controlEntity(),
      is_volume_muted: !e
    });
  }
  _nudgeVolume(t, e) {
    if (!this.hass || !this._config) return;
    const i = Number(t.attributes.volume_level);
    if (Number.isNaN(i)) return;
    const o = this._volumeStep(t), n = Math.min(1, Math.max(0, i + e * o));
    this.hass.callService("media_player", "volume_set", {
      entity_id: this._controlEntity(),
      volume_level: n
    });
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
};
ui.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.media {
        position: relative;
        height: auto;
        overflow: hidden;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        background-size: cover;
        background-position: center;
        transition: background-color 0.2s ease;
      }

      ha-card.media.has-art {
        color: white;
        /* Inline background (art) must win over shared ulm-card background */
        background-color: transparent;
      }

      .stack {
        display: flex;
        flex-direction: column;
      }

      .header {
        min-width: 0;
      }

      .power-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 42px;
        z-index: 2;
      }

      ha-card.media.has-art .widget-btn ha-icon {
        color: white;
      }

      ha-card.media.has-art .slider-wrap {
        background: rgba(0, 0, 0, 0.3);
      }
    `
];
Qn([
  x({ attribute: !1 })
], ui.prototype, "hass", 2);
Qn([
  y()
], ui.prototype, "_config", 2);
ui = Qn([
  $("ulm-media-player-card")
], ui);
var Kc = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, tr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Vc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Kc(e, i, n), n;
};
const qc = [
  { mode: "auto", icon: "mdi:autorenew", activeColor: "green" },
  { mode: "heat", icon: "mdi:fire", activeColor: "red" },
  { mode: "cool", icon: "mdi:snowflake", activeColor: "blue" },
  { mode: "dry", icon: "mdi:water", activeColor: "yellow" },
  { mode: "heat_cool", icon: "mdi:sun-snowflake", activeColor: "purple" },
  // Original: bg --color-theme 0.5, icon green
  {
    mode: "fan_only",
    icon: "mdi:fan",
    activeColor: "theme",
    activeIconColor: "green"
  }
];
let _i = class extends v {
  constructor() {
    super(...arguments), this._iconTap = (t) => {
      t.stopPropagation(), this._open();
    }, this._nameTap = (t) => {
      t.stopPropagation(), this._open();
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        u("entity", "climate"),
        D([m("name"), S("icon")]),
        b("enable_controls"),
        b("enable_hvac_modes"),
        b("enable_background_color"),
        b("enable_collapse"),
        b("enable_popup"),
        b("enable_horizontal"),
        b("enable_display_temperature"),
        u("fan_entity", "fan", !1),
        M("temp_step"),
        M("minimum_temp_spread")
      ],
      computeLabel: k({
        entity: "Climate entity",
        name: "Name (ulm_card_thermostat_name)",
        icon: "Icon (ulm_card_thermostat_icon)",
        enable_controls: "Enable temperature controls",
        enable_hvac_modes: "Enable HVAC modes",
        enable_collapse: "Collapse when off",
        enable_horizontal: "Horizontal layout",
        enable_display_temperature: "Show current temp (top right)",
        enable_background_color: "Colored background when heating/cooling",
        enable_popup: "Enable thermostat popup",
        fan_entity: "Separate fan entity",
        temp_step: "Temperature step",
        minimum_temp_spread: "Min spread (heat_cool)"
      }),
      computeHelper: C({
        enable_hvac_modes: "Shows heat/cool/auto/… from the climate entity hvac_modes attribute.",
        enable_collapse: "Hides controls and HVAC row when climate is off.",
        enable_background_color: "Orange in heat, blue in cool. Other modes keep the normal on-state background.",
        fan_entity: "Only shown if set and the climate has no fan_only mode. (climate.hvac already has fan_only.)",
        temp_step: "Defaults to entity target_temp_step or 0.5°C / 1°F."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "climate.hvac",
      enable_controls: !0,
      enable_hvac_modes: !0,
      enable_collapse: !0,
      icon: "mdi:thermometer"
    };
  }
  setConfig(t) {
    const e = t, i = e.layout || {}, o = e.advanced || {}, n = t.entity || e.ulm_card_thermostat_entity;
    if (!n) throw new Error("Please define an entity");
    const r = t.temp_step ?? o.temp_step ?? e.ulm_card_thermostat_temp_step;
    this._config = {
      ...t,
      entity: n,
      name: t.name ?? e.ulm_card_thermostat_name,
      icon: t.icon || e.ulm_card_thermostat_icon || "mdi:thermometer",
      enable_collapse: !!(t.enable_collapse ?? i.enable_collapse ?? e.ulm_card_thermostat_enable_collapse),
      enable_controls: !!(t.enable_controls ?? i.enable_controls ?? e.ulm_card_thermostat_enable_controls),
      enable_hvac_modes: !!(t.enable_hvac_modes ?? i.enable_hvac_modes ?? e.ulm_card_thermostat_enable_hvac_modes),
      enable_background_color: !!(t.enable_background_color ?? i.enable_background_color ?? e.ulm_card_thermostat_enable_background_color),
      enable_display_temperature: !!(t.enable_display_temperature ?? i.enable_display_temperature ?? e.ulm_card_thermostat_enable_display_temperature),
      enable_horizontal: !!(t.enable_horizontal ?? i.enable_horizontal ?? e.ulm_card_thermostat_enable_horizontal),
      enable_popup: !!(t.enable_popup ?? i.enable_popup ?? e.ulm_card_thermostat_enable_popup),
      fan_entity: this._normalizeFanEntity(
        t.fan_entity ?? o.fan_entity ?? e.ulm_card_thermostat_fan_entity
      ),
      minimum_temp_spread: Number(
        t.minimum_temp_spread ?? o.minimum_temp_spread ?? e.ulm_card_thermostat_minimum_temp_spread ?? 1
      ),
      temp_step: r != null && r !== !1 ? Number(r) : void 0,
      type: "custom:ulm-thermostat-card"
    };
  }
  getCardSize() {
    return this._contentRows();
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: this._config?.enable_horizontal ? 6 : 3,
      max_columns: 12
    };
  }
  _contentRows() {
    if (!this._config || !this.hass) return 1;
    const t = this.hass.states[this._config.entity], e = this._config.enable_collapse && t?.state === "off";
    if (this._config.enable_horizontal) return 1;
    let i = 1;
    return !e && this._config.enable_controls && i++, !e && this._config.enable_controls && t?.attributes.target_temp_high != null && i++, !e && (this._config.enable_hvac_modes || this._config.fan_entity) && i++, i;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "off", i = !!this._config.enable_collapse && e, o = String(t.attributes.hvac_action || ""), n = String(t.state), r = !!this._config.enable_background_color, a = r && (n === "heat" || n === "heat_cool" && o === "heating"), s = r && (n === "cool" || n === "heat_cool" && o === "cooling"), l = o === "heating" || r && n === "heat", h = o === "cooling" || r && n === "cool";
    let p;
    a ? p = "rgba(255, 165, 0, 0.75)" : s ? p = "rgba(0, 191, 255, 0.75)" : e || (p = "rgba(var(--color-background-yellow, 250, 250, 250), var(--opacity-bg, 1))");
    const g = this._config.name || t.attributes.friendly_name || t.entity_id, z = this._config.icon || "mdi:thermometer", P = this._iconStyle(l, h), O = this._tempUnit(), T = !!this._config.enable_controls && !i, N = T && t.attributes.target_temp_high != null, U = (!!this._config.enable_hvac_modes || !!this._config.fan_entity) && !i && !this._config.enable_horizontal, F = !!this._config.enable_display_temperature && !this._config.enable_horizontal, nt = L({
      stack: !0,
      horizontal: !!this._config.enable_horizontal
    }), G = t.attributes.target_temp_high ?? t.attributes.temperature, ut = t.attributes.target_temp_low, oe = t.attributes.current_temperature;
    return c`
      <ha-card
        class="ulm-card thermostat"
        style=${d(
      p ? {
        // ha-card paints via --ha-card-background; override that + shorthand
        "--ha-card-background": p,
        background: p,
        backgroundColor: p
      } : {}
    )}
      >
        <div class=${nt}>
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(P)}
                @click=${this._iconTap}
              >
                <ha-icon .icon=${z}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name">${g}</div>
                <div class="label">${this._label(t)}</div>
              </button>
            </div>
            ${F ? c`<div class="display-temp">
                  ${oe != null ? `${oe}${O}` : `-${O}`}
                </div>` : _}
          </div>

          ${T ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, r)
    )}
                  @click=${() => this._adjustHigh(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${G != null ? `${G}${O}` : `-${O}`}
                </div>
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, r)
    )}
                  @click=${() => this._adjustHigh(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>` : _}

          ${N ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, r)
    )}
                  @click=${() => this._adjustLow(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${ut != null ? `${ut}${O}` : `-${O}`}
                </div>
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, r)
    )}
                  @click=${() => this._adjustLow(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>` : _}

          ${U ? this._renderHvacModes(t, a, s, r) : _}
        </div>
      </ha-card>
    `;
  }
  _renderHvacModes(t, e, i, o) {
    const n = t.attributes.hvac_modes, r = Array.isArray(n) ? n.map(String) : [], s = !!this._normalizeFanEntity(this._config?.fan_entity) && !r.includes("fan_only"), l = this._config?.enable_hvac_modes ? qc.filter((h) => r.includes(h.mode)) : [];
    return !l.length && !s ? c`<div class="hvac-empty">
        No HVAC modes on this entity
      </div>` : c`
      <div
        class="hvac-modes"
        style=${d({
      gridTemplateColumns: `repeat(${l.length + (s ? 1 : 0)}, 1fr)`
    })}
      >
        ${l.map((h) => {
      const p = t.state === h.mode, g = p ? this._hvacActiveStyle(h.activeColor, h.activeIconColor) : this._widgetActiveBg(e, i, o), z = p ? this._hvacActiveIconColor(h.activeColor, h.activeIconColor) : {};
      return c`
            <button
              class="widget-btn hvac"
              style=${d(g)}
              @click=${() => this._setHvac(h.mode)}
              title=${h.mode}
            >
              <ha-icon
                icon=${h.icon}
                style=${d(z)}
              ></ha-icon>
            </button>
          `;
    })}
        ${s ? this._renderFanEntityBtn(e, i, o) : _}
      </div>
    `;
  }
  _normalizeFanEntity(t) {
    if (typeof t != "string") return;
    const e = t.trim();
    if (!(!e || e === "null" || e === "undefined" || !e.includes(".")))
      return e;
  }
  _renderFanEntityBtn(t, e, i) {
    const o = this._normalizeFanEntity(this._config?.fan_entity);
    if (!o) return _;
    const n = this.hass?.states[o];
    if (!n) return _;
    const r = n.state === "on", a = f(this, "green"), s = o.split(".")[0] || "fan";
    return c`
      <button
        class="widget-btn hvac"
        style=${d(
      r ? {
        backgroundColor: "rgba(var(--color-theme, 51,51,51), 0.5)",
        color: `rgba(${a}, 1)`
      } : this._widgetActiveBg(t, e, i)
    )}
        @click=${() => this.hass?.callService(s, "toggle", { entity_id: o })}
        title=${n.attributes.friendly_name || o}
      >
        <ha-icon
          icon="mdi:fan"
          style=${d(r ? { color: `rgba(${a}, 1)` } : {})}
        ></ha-icon>
      </button>
    `;
  }
  _themeToken(t) {
    if (t === "theme") return "var(--color-theme, 51, 51, 51)";
    const e = f(this, t);
    return `var(--color-${t}, ${e})`;
  }
  _hvacActiveStyle(t, e) {
    const i = this._themeToken(t), o = this._themeToken(e || t);
    return {
      backgroundColor: `rgba(${i}, 0.5)`,
      color: `rgba(${o}, 1)`
    };
  }
  _hvacActiveIconColor(t, e) {
    return { color: `rgba(${this._themeToken(e || t)}, 1)` };
  }
  _iconStyle(t, e) {
    if (t) {
      const i = this._themeToken("red");
      return {
        color: `rgba(${i}, 1)`,
        backgroundColor: `rgba(${i}, 0.2)`
      };
    }
    if (e) {
      const i = this._themeToken("blue");
      return {
        color: `rgba(${i}, 1)`,
        backgroundColor: `rgba(${i}, 0.2)`
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  }
  _widgetActiveBg(t, e, i) {
    return (t || e) && i ? { backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.15)" } : {};
  }
  _label(t) {
    const e = this.hass?.formatEntityState?.(t) || this._capitalize(t.state), i = t.attributes.current_temperature;
    return i != null && !this._config?.enable_display_temperature ? `${i}° · ${e}` : e;
  }
  _tempUnit() {
    return this.hass?.config?.unit_system?.temperature || "°C";
  }
  _step(t) {
    if (this._config?.temp_step != null && !Number.isNaN(this._config.temp_step))
      return Number(this._config.temp_step);
    const e = Number(t.attributes.target_temp_step);
    return !Number.isNaN(e) && e > 0 ? e : this._tempUnit() === "°F" ? 1 : 0.5;
  }
  _spread() {
    return Number(this._config?.minimum_temp_spread ?? 1) || 1;
  }
  /** Adjust high setpoint (or single temperature) — original item2 minus/plus */
  _adjustHigh(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = this._step(e) * t, o = e.attributes.target_temp_low, n = e.attributes.target_temp_high, r = e.attributes.temperature;
    if (o != null && n != null) {
      const a = parseFloat(String(n)) + i;
      let s = parseFloat(String(o));
      t < 0 && a - this._spread() < s && (s = a - this._spread()), this._call("set_temperature", {
        target_temp_low: s,
        target_temp_high: a
      });
      return;
    }
    if (r != null) {
      const a = parseFloat(String(r)) + i;
      this._call("set_temperature", {
        temperature: t < 0 ? Math.max(a, 0) : a
      });
    }
  }
  /** Adjust low setpoint — original low_temp_adjustment row */
  _adjustLow(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = this._step(e) * t, o = e.attributes.target_temp_low, n = e.attributes.target_temp_high;
    if (o == null || n == null) return;
    const r = parseFloat(String(o)) + i;
    let a = parseFloat(String(n));
    t > 0 && r + this._spread() > a && (a = r + this._spread()), this._call("set_temperature", {
      target_temp_low: r,
      target_temp_high: a
    });
  }
  _setHvac(t) {
    this._call("set_hvac_mode", { hvac_mode: t });
  }
  _call(t, e = {}) {
    !this.hass || !this._config || this.hass.callService("climate", t, {
      entity_id: this._config.entity,
      ...e
    });
  }
  _open() {
    if (this._config) {
      if (this._config.enable_popup) {
        dt(this, "thermostat", this._config.entity);
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    }
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
};
_i.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.thermostat {
        height: auto;
        overflow: visible;
        /* Prefer --ha-card-background set inline when colored */
        background: var(--ha-card-background, var(--card-background-color, #fafafa));
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .hvac-empty {
        font-size: 12px;
        opacity: 0.55;
        padding: 4px 0;
      }

      .stack.horizontal {
        flex-direction: row;
        align-items: center;
      }

      .stack.horizontal .header {
        flex: 1;
        min-width: 0;
      }

      .stack.horizontal .controls {
        flex: 1;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .header .row {
        flex: 1;
        min-width: 0;
      }

      .display-temp {
        font-weight: bold;
        font-size: 14px;
        white-space: nowrap;
        padding-right: 4px;
      }

      .controls {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 12px;
        align-items: center;
      }

      .temp-readout {
        text-align: center;
        font-weight: bold;
        font-size: 14px;
        min-width: 3.5em;
        background: none;
        box-shadow: none;
      }

      .hvac-modes {
        display: grid;
        gap: 7px;
      }

      .widget-btn.hvac ha-icon {
        --mdc-icon-size: 20px;
      }
    `
];
tr([
  x({ attribute: !1 })
], _i.prototype, "hass", 2);
tr([
  y()
], _i.prototype, "_config", 2);
_i = tr([
  $("ulm-thermostat-card")
], _i);
var Yc = Object.defineProperty, Jc = Object.getOwnPropertyDescriptor, Qo = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Jc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Yc(e, i, n), n;
};
let we = class extends v {
  constructor() {
    super(...arguments), this._onSliderInput = (t) => {
      const e = Number(t.target.value);
      Number.isNaN(e) || (this._dragPct = e);
    }, this._onSliderChange = (t) => {
      if (!this.hass || !this._config) return;
      const e = Number(t.target.value);
      Number.isNaN(e) || (this._dragPct = e, this.hass.callService("fan", "set_percentage", {
        entity_id: this._config.entity,
        percentage: e
      }));
    }, this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "fan"),
        D([m("name"), S("icon")]),
        A("color"),
        b("enable_horizontal"),
        b("enable_collapse"),
        b("force_background_color"),
        b("enable_slider"),
        b("enable_button"),
        D([M("slider_min"), M("slider_max")]),
        S("button_icon"),
        m("button_service"),
        m("oscillate_attribute"),
        D([m("temp_attribute"), m("hum_attribute")]),
        b("always_show_attributes")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_fan_name)",
        icon: "Icon (ulm_card_fan_icon)",
        color: "Color (ulm_card_fan_color)",
        enable_horizontal: "Horizontal layout",
        enable_collapse: "Collapse speed row when off",
        force_background_color: "Force background color when on",
        enable_slider: "Enable speed slider",
        enable_button: "Enable oscillation button",
        slider_min: "Slider min",
        slider_max: "Slider max",
        button_icon: "Button icon (ulm_card_fan_button_icon)",
        button_service: "Button service (ulm_card_fan_button_service)",
        oscillate_attribute: "Oscillate attribute name",
        temp_attribute: "Temp attribute (ulm_card_fan_temp_attribute)",
        hum_attribute: "Humidity attribute (ulm_card_fan_hum_attribute)",
        always_show_attributes: "Always show temp/humidity when off"
      }),
      computeHelper: C({
        enable_horizontal: "Place the speed row beside the icon/name (docs screenshot layout).",
        enable_collapse: "Hide slider + oscillation button when the fan is off.",
        enable_button: "Button next to the slider (fan.oscillate by default).",
        oscillate_attribute: "Attribute key for oscillation. Tries oscillating and oscillate.",
        temp_attribute: "Entity attribute key shown as °C in the label.",
        hum_attribute: "Entity attribute key shown as % in the label.",
        button_service: "e.g. fan.oscillate"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "fan.living_room_fan",
      enable_slider: !0,
      enable_button: !0,
      enable_collapse: !0,
      color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_fan_entity;
    if (!i) throw new Error("Please define an entity");
    const o = (n) => typeof n == "string" && n.length && n !== "false" ? n : void 0;
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_fan_name,
      icon: o(t.icon) || o(e.ulm_card_fan_icon) || void 0,
      color: t.color || e.ulm_card_fan_color || "blue",
      enable_horizontal: !!(t.enable_horizontal ?? e.ulm_card_fan_enable_horizontal ?? e.ulm_card_fan_horizontal),
      enable_collapse: !!(t.enable_collapse ?? e.ulm_card_fan_enable_collapse),
      force_background_color: !!(t.force_background_color ?? e.ulm_card_fan_force_background_color),
      enable_slider: !!(t.enable_slider ?? e.ulm_card_fan_enable_slider),
      slider_min: Number(
        t.slider_min ?? e.ulm_card_fan_slider_min ?? 0
      ),
      slider_max: Number(
        t.slider_max ?? e.ulm_card_fan_slider_max ?? 100
      ),
      enable_button: !!(t.enable_button ?? e.ulm_card_fan_enable_button ?? e.ulm_show_button),
      button_icon: o(t.button_icon) || o(e.ulm_card_fan_button_icon) || o(e.ulm_button_icon) || "mdi:rotate-3d-variant",
      button_service: o(t.button_service) || o(e.ulm_card_fan_button_service) || o(e.ulm_button_service) || "fan.oscillate",
      oscillate_attribute: o(t.oscillate_attribute) || o(e.ulm_card_fan_oscillate_attribute) || o(e.oscillate_attribute) || "oscillating",
      temp_attribute: o(
        t.temp_attribute ?? e.ulm_card_fan_temp_attribute
      ),
      hum_attribute: o(
        t.hum_attribute ?? e.ulm_card_fan_hum_attribute
      ),
      always_show_attributes: !!(t.always_show_attributes ?? e.always_show_attributes),
      type: "custom:ulm-fan-card"
    };
  }
  getCardSize() {
    if (this._config?.enable_horizontal) return 1;
    let t = 1;
    return this._config?.enable_slider && t++, t;
  }
  getGridOptions() {
    return {
      columns: this._config?.enable_horizontal ? 12 : 6,
      min_columns: this._config?.enable_horizontal ? 6 : 3,
      max_columns: 12
    };
  }
  _oscAttrKeys() {
    const e = [this._config?.oscillate_attribute || "oscillating", "oscillating", "oscillate"];
    return [...new Set(e)];
  }
  _oscillating(t) {
    for (const e of this._oscAttrKeys())
      if (e in t.attributes) return !!t.attributes[e];
    return !1;
  }
  _label(t) {
    if (t.state === "unavailable") return "Unavailable";
    const e = t.state !== "off" || !!this._config?.always_show_attributes;
    let i = "";
    if (e) {
      const o = this._config?.temp_attribute;
      if (o && t.attributes[o] != null) {
        const r = Math.round(Number(t.attributes[o]) || 0);
        i += ` • ${r}°C`;
      }
      const n = this._config?.hum_attribute;
      if (n && t.attributes[n] != null) {
        const r = Math.round(Number(t.attributes[n]) || 0);
        i += ` • ${r}%`;
      }
    }
    if (t.state !== "off") {
      const o = t.attributes.percentage;
      return o != null ? `${Number(o) || 0}%${i}` : `On${i}`;
    }
    return `Off${i}`;
  }
  _sliderStep(t) {
    const e = Number(t.attributes.percentage_step);
    return !Number.isNaN(e) && e > 0 ? Math.max(1, Math.round(e)) : 1;
  }
  updated(t) {
    if ((t.has("hass") || t.has("_config")) && this._dragPct != null && this._config && this.hass) {
      const e = this.hass.states[this._config.entity], i = Number(e?.attributes.percentage);
      !Number.isNaN(i) && Math.abs(i - this._dragPct) < 1 && (this._dragPct = void 0);
    }
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = !!this._config.enable_collapse && !e, a = !!this._config.enable_slider && !r, s = !!this._config.enable_button && !!this._config.enable_slider && !r, l = this._config.name || t.attributes.friendly_name || t.entity_id, h = this._config.icon || t.attributes.icon || "mdi:fan", p = this._config.slider_min ?? 0, g = this._config.slider_max ?? 100, z = this._sliderStep(t), P = Number(t.attributes.percentage), T = !Number.isNaN(P) ? Math.min(g, Math.max(p, P)) : e ? g : p, N = this._dragPct != null ? Math.min(g, Math.max(p, this._dragPct)) : T, U = e || this._dragPct != null ? (N - p) / (g - p || 1) * 100 : 0, F = n ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, nt = e ? {
      color: n ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: n ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, G = n ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, ut = this._oscillating(t), oe = this._oscButtonStyle(e, ut, n, o), je = !!this._config.enable_horizontal;
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      fan: !0,
      horizontal: je,
      "force-bg": n
    })}
        style=${d(
      F ? {
        "--ha-card-background": F,
        background: F,
        backgroundColor: F
      } : {}
    )}
      >
        <div
          class=${L({
      stack: !0,
      horizontal: je
    })}
        >
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(nt)}
                @click=${() => this._call("toggle")}
              >
                <ha-icon .icon=${h}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._moreInfo}>
                <div class="name" style=${d(G.name)}>
                  ${l}
                </div>
                <div class="label" style=${d(G.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${a || s ? c`<div
                class=${L({
      "slider-row": !0,
      "with-button": s
    })}
              >
                ${a ? c`<div
                      class="slider-wrap"
                      style=${d(
      e ? {
        background: n ? `rgba(${o}, 0.3)` : `rgba(${o}, 0.1)`
      } : {
        background: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      }
    )}
                    >
                      <div
                        class="slider-fill"
                        style=${d({
      width: `${U}%`,
      background: e || this._dragPct != null ? n ? "rgb(250,250,250)" : `rgba(${o}, 0.8)` : "rgba(var(--color-grey, 187, 187, 187), 0.8)"
    })}
                      ></div>
                      <input
                        type="range"
                        min=${p}
                        max=${g}
                        step=${z}
                        .value=${String(N)}
                        @input=${this._onSliderInput}
                        @change=${this._onSliderChange}
                      />
                    </div>` : _}
                ${s ? c`<button
                      class="widget-btn osc-btn"
                      style=${d(oe)}
                      @click=${() => this._toggleOscillate(t)}
                      title="oscillate"
                    >
                      <ha-icon
                        icon=${this._config.button_icon || "mdi:rotate-3d-variant"}
                      ></ha-icon>
                    </button>` : _}
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _oscButtonStyle(t, e, i, o) {
    return t ? e ? {
      backgroundColor: i ? "rgba(250, 250, 250, 1)" : `rgba(${o}, 0.2)`,
      color: `rgba(${o}, 1)`
    } : i ? {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${o}, 1)`
    } : {} : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)"
    };
  }
  _call(t) {
    !this.hass || !this._config || this.hass.callService("fan", t, { entity_id: this._config.entity });
  }
  _toggleOscillate(t) {
    if (!this.hass || !this._config) return;
    const e = this._config.button_service || "fan.oscillate", [i, o] = e.includes(".") ? e.split(".", 2) : ["fan", e];
    this.hass.callService(i, o, {
      entity_id: this._config.entity,
      oscillating: !this._oscillating(t)
    });
  }
};
we.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.fan {
        height: auto;
        overflow: visible;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      /* Official enable_horizontal: icon+name | slider+button */
      .stack.horizontal {
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .stack.horizontal .header {
        flex: 1 1 40%;
        min-width: 0;
      }

      .stack.horizontal .slider-row {
        flex: 1 1 60%;
        min-width: 0;
      }

      .slider-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        align-items: center;
      }

      .slider-row.with-button {
        grid-template-columns: 2fr 1fr;
      }

      .osc-btn {
        width: 100%;
        min-width: 42px;
      }

      .slider-wrap {
        height: 42px;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
      }
    `
];
Qo([
  x({ attribute: !1 })
], we.prototype, "hass", 2);
Qo([
  y()
], we.prototype, "_config", 2);
Qo([
  y()
], we.prototype, "_dragPct", 2);
we = Qo([
  $("ulm-fan-card")
], we);
var Zc = Object.defineProperty, Xc = Object.getOwnPropertyDescriptor, er = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Xc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Zc(e, i, n), n;
};
const Qc = /* @__PURE__ */ new Set([
  "cleaning",
  "mopping",
  "mowing",
  "paused",
  "returning",
  "error"
]), ka = /* @__PURE__ */ new Set(["cleaning", "mopping", "mowing"]), tl = {
  cleaning: "blue",
  mowing: "blue",
  paused: "green",
  mopping: "yellow",
  returning: "purple",
  error: "red"
};
let mi = class extends v {
  constructor() {
    super(...arguments), this._runRoom = () => {
      !this.hass || !this._config?.room || this.hass.callService("script", "turn_on", {
        entity_id: this._config.room
      });
    }, this._iconTap = (t) => {
      t.stopPropagation(), this._nameTap(t);
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "vacuum", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Exact docs order — all top-level so HA persists them
        u("entity", "vacuum"),
        m("name"),
        S("icon"),
        m("label"),
        // script | automation — room clean action
        {
          name: "room",
          required: !1,
          selector: { entity: { domain: ["script", "automation"] } }
        },
        S("room_icon"),
        u("camera", "camera", !1),
        b("camera_toggle"),
        {
          name: "color",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "auto (state based)" },
                { value: "blue", label: "blue" },
                { value: "green", label: "green" },
                { value: "yellow", label: "yellow" },
                { value: "red", label: "red" },
                { value: "purple", label: "purple" },
                { value: "pink", label: "pink" },
                { value: "grey", label: "grey" }
              ]
            }
          }
        },
        b("force_background_color"),
        b("enable_popup")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_vacuum_name)",
        icon: "Icon (ulm_card_vacuum_icon)",
        label: "Label (ulm_card_vacuum_label)",
        room: "Room script (ulm_card_vacuum_room)",
        room_icon: "Room icon (ulm_card_vacuum_room_icon)",
        camera: "Camera map (ulm_card_vacuum_camera)",
        camera_toggle: "Camera only while cleaning (ulm_card_vacuum_camera_toggle)",
        color: "Color (ulm_card_vacuum_color)",
        force_background_color: "Force background color (ulm_card_vacuum_force_background_color)",
        enable_popup: "Enable popup (ulm_card_vacuum_enable_popup)"
      }),
      computeHelper: C({
        name: "Custom name. Default: friendly_name.",
        icon: "Custom MDI icon.",
        label: "Custom sub-label. Default: translated state.",
        room: "Script/automation to clean a specific room (4th button).",
        room_icon: "Icon for the room clean button.",
        camera: "Camera entity for the vacuum map image.",
        camera_toggle: "Only show the map while cleaning/mopping/mowing.",
        color: "Custom color, or auto (state based: cleaning=blue, …).",
        force_background_color: "Use color as card background when the vacuum is active."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "vacuum.demo_vacuum_0_ground_floor",
      color: "auto"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_vacuum_entity;
    if (!i) throw new Error("Please define an entity");
    const o = (n) => typeof n == "string" && n.length ? n : void 0;
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_vacuum_name,
      icon: o(t.icon) || o(e.ulm_card_vacuum_icon) || void 0,
      label: o(t.label) || o(e.ulm_card_vacuum_label) || void 0,
      room: o(t.room) || o(e.ulm_card_vacuum_room) || void 0,
      room_icon: o(t.room_icon) || o(e.ulm_card_vacuum_room_icon) || "mdi:table-chair",
      camera: o(t.camera) || o(e.ulm_card_vacuum_camera) || void 0,
      camera_toggle: !!(t.camera_toggle ?? e.ulm_card_vacuum_camera_toggle),
      enable_popup: !!(t.enable_popup ?? e.ulm_card_vacuum_enable_popup),
      color: t.color || e.ulm_card_vacuum_color || "auto",
      force_background_color: !!(t.force_background_color ?? e.ulm_card_vacuum_force_background_color),
      type: "custom:ulm-vacuum-card"
    };
  }
  getCardSize() {
    let t = 2;
    return this._config?.camera && t++, t;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12
    };
  }
  _stateColor(t) {
    const e = this._config?.color;
    return e && e !== "auto" && e !== "theme" ? e : e === "theme" ? "theme" : tl[t.state.toLowerCase()] || "theme";
  }
  _isActive(t) {
    return Qc.has(t.state.toLowerCase());
  }
  _showMap(t) {
    return this._config?.camera ? this._config?.camera_toggle ? ka.has(t.state.toLowerCase()) : !0 : !1;
  }
  _mapUrl(t) {
    const e = this.hass?.states[t];
    if (!e) return;
    const i = e.attributes.entity_picture || e.attributes.entity_picture_local;
    if (!(typeof i != "string" || !i.length))
      return i.startsWith("http://") || i.startsWith("https://") || i.startsWith("data:") ? i : this.hass?.hassUrl?.(i) || i;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._isActive(t), i = this._stateColor(t), o = i === "theme" ? "var(--color-theme, 51, 51, 51)" : f(this, i), n = !!this._config.force_background_color && e && i !== "theme", r = n ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:robot-vacuum", l = this._config.label || this.hass.formatEntityState?.(t) || this._capitalize(t.state), p = e && i !== "theme" ? {
      color: n ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: n ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, g = n ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, z = this._widgetStyle(e, n, o, i), P = ka.has(t.state.toLowerCase()), O = this._showMap(t), T = O && this._config.camera ? this._mapUrl(this._config.camera) : void 0, N = !!this._config.room;
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      vacuum: !0,
      "force-bg": n
    })}
        style=${d(
      r ? {
        "--ha-card-background": r,
        background: r,
        backgroundColor: r
      } : e && i !== "theme" && this.hass.themes?.darkMode ? {
        backgroundColor: `rgba(${o}, 0.1)`
      } : {}
    )}
      >
        <div class="stack">
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(p)}
                @click=${this._iconTap}
              >
                <ha-icon .icon=${s}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name" style=${d(g.name)}>
                  ${a}
                </div>
                <div class="label" style=${d(g.label)}>
                  ${l}
                </div>
              </button>
            </div>
          </div>

          ${O ? c`<div class="map">
                ${T ? c`<img src=${T} alt="Vacuum map" />` : c`<div class="map-empty">No map image</div>`}
              </div>` : _}

          <div
            class=${L({
      controls: !0,
      four: N
    })}
          >
            <button
              class="widget-btn"
              style=${d(z)}
              @click=${() => this._vac(P ? "stop" : "start")}
              title=${P ? "stop" : "start"}
            >
              <ha-icon icon=${P ? "mdi:stop" : "mdi:play"}></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${d(z)}
              @click=${() => this._vac("return_to_base")}
              title="dock"
            >
              <ha-icon icon="mdi:home-map-marker"></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${d(z)}
              @click=${() => this._vac("locate")}
              title="locate"
            >
              <ha-icon icon="mdi:map-marker"></ha-icon>
            </button>
            ${N ? c`<button
                  class="widget-btn"
                  style=${d(z)}
                  @click=${this._runRoom}
                  title="room"
                >
                  <ha-icon
                    icon=${this._config.room_icon || "mdi:table-chair"}
                  ></ha-icon>
                </button>` : _}
          </div>
        </div>
      </ha-card>
    `;
  }
  _widgetStyle(t, e, i, o) {
    return e && t && o !== "theme" ? {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${i}, 1)`
    } : {};
  }
  _vac(t) {
    !this.hass || !this._config || this.hass.callService("vacuum", t, {
      entity_id: this._config.entity
    });
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
};
mi.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.vacuum {
        height: auto;
        overflow: hidden;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .map {
        border-radius: 20px;
        overflow: hidden;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        min-height: 120px;
      }

      .map img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .map-empty {
        padding: 24px;
        text-align: center;
        opacity: 0.5;
        font-size: 12px;
      }
    `
];
er([
  x({ attribute: !1 })
], mi.prototype, "hass", 2);
er([
  y()
], mi.prototype, "_config", 2);
mi = er([
  $("ulm-vacuum-card")
], mi);
var el = Object.defineProperty, il = Object.getOwnPropertyDescriptor, ir = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? il(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && el(e, i, n), n;
};
const ol = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
  exceptional: "mdi:weather-sunny-alert"
}, nl = {
  precipitation: "mdi:weather-rainy",
  precipitation_probability: "mdi:weather-rainy",
  humidity: "mdi:water-percent",
  wind_speed: "mdi:weather-windy",
  wind_bearing: "mdi:compass",
  pressure: "mdi:gauge"
}, rl = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW"
];
function Ca(t, e) {
  return t === !1 || t === "false" ? [] : t == null || t === "" ? e : Array.isArray(t) ? t.map(String).map((i) => i.trim()).filter(Boolean) : typeof t == "string" ? t.split(/[,\n]/).map((i) => i.trim()).filter((i) => i && i !== "false") : e;
}
function al(t) {
  if (!t) return [];
  if (Array.isArray(t)) return t;
  if (typeof t == "string")
    try {
      const e = JSON.parse(t);
      return Array.isArray(e) ? e : [];
    } catch {
      return [];
    }
  return [];
}
let hi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "weather"),
        m("name"),
        m("primary_info"),
        m("secondary_info"),
        b("backdrop"),
        b("backdrop_fade"),
        m("custom")
      ],
      computeLabel: k({
        entity: "Weather entity",
        name: "Name (ulm_card_weather_name)",
        primary_info: "Primary info (ulm_card_weather_primary_info)",
        secondary_info: "Secondary info (ulm_card_weather_secondary_info)",
        backdrop: "Backdrop (ulm_card_weather_backdrop)",
        backdrop_fade: "Backdrop fade",
        custom: "Custom overrides (ulm_card_weather_custom)"
      }),
      computeHelper: C({
        primary_info: 'Comma-separated: extrema, humidity, wind_speed, … — or "false" to hide.',
        secondary_info: 'Comma-separated: precipitation, precipitation_probability, … — or "false".',
        custom: 'JSON array of overrides, e.g. [{"temp":"sensor.temperature"}].'
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "weather.demo_weather_north",
      primary_info: "extrema",
      secondary_info: "precipitation",
      backdrop: !1
    };
  }
  setConfig(t) {
    const e = t;
    if (!t.entity && !e.ulm_card_weather_entity)
      throw new Error("Please define an entity");
    let o = t.backdrop ?? e.ulm_card_weather_backdrop ?? !1;
    e.backdrop_fade && o === !0 ? o = { fade: !0 } : e.backdrop_fade && o && typeof o == "object" && (o = { ...o, fade: !0 });
    const n = t.primary_info ?? e.ulm_card_weather_primary_info ?? "extrema", r = t.secondary_info ?? e.ulm_card_weather_secondary_info ?? "precipitation";
    this._config = {
      ...t,
      entity: t.entity || e.ulm_card_weather_entity,
      name: t.name ?? e.ulm_card_weather_name,
      primary_info: n,
      secondary_info: r,
      backdrop: o,
      custom: t.custom ?? e.ulm_card_weather_custom,
      type: "custom:ulm-weather-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-weather"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._customMap(), i = this._config.name ?? t.attributes.friendly_name ?? t.entity_id, o = e["icon-state"]?.state || t.state, n = ol[o] || "mdi:weather-partly-cloudy", r = this._attr(t, "temp", e), a = this._localizeState(t), s = Ca(this._config.primary_info, ["extrema"]), l = Ca(this._config.secondary_info, [
      "precipitation"
    ]), h = this._isNight(), p = this._backdropStyle(), g = !!this._config.backdrop, z = typeof this._config.backdrop == "object" && !!this._config.backdrop.fade;
    return c`
      <ha-card
        class=${L({
      "ulm-weather": !0,
      backdrop: g,
      fade: z,
      night: g && h
    })}
        style=${d(p)}
        @click=${this._moreInfo}
      >
        <ha-icon class="weather-icon" .icon=${n}></ha-icon>

        <div class="weather-info">
          <div class="row title">
            ${r != null ? c`<span class="temp"
                  >${r}${this._tempUnit(t)}</span
                >` : _}
            ${i && String(i).trim() ? c`<span class="name">${i}</span>` : _}
          </div>
          <div class="row state">${a}</div>
        </div>

        ${s.length || l.length ? c`
              <div class="weather-info add">
                ${[...s, ...l].map(
      (P) => this._renderInfo(t, P, e)
    )}
              </div>
            ` : _}
      </ha-card>
    `;
  }
  _localizeState(t) {
    const e = `component.weather.entity_component._.state.${t.state}`, i = this.hass?.localize?.(e);
    return i && i !== e ? i : t.state.charAt(0).toUpperCase() + t.state.slice(1).replace(/-/g, " ");
  }
  _isNight() {
    return this.hass?.states["sun.sun"]?.state === "below_horizon";
  }
  _customMap() {
    const t = al(this._config?.custom), e = {};
    if (!this.hass) return e;
    for (const i of t) {
      const [o, n] = Object.entries(i)[0] || [];
      if (!o || !n) continue;
      if (!n.includes(".")) {
        e[o] = { state: n };
        continue;
      }
      const r = this.hass.states[n];
      r && (e[o] = {
        state: r.state,
        unit: r.attributes.unit_of_measurement
      });
    }
    return e;
  }
  _forecastDay(t) {
    const e = t.attributes.forecast;
    if (!(!Array.isArray(e) || !e.length))
      return e[0];
  }
  _attr(t, e, i) {
    if (i[e]?.state != null) return i[e].state;
    if (e === "temp" || e === "temperature")
      return t.attributes.temperature;
    if (e === "state") return this._localizeState(t);
    if (e === "high") {
      const o = this._forecastDay(t), n = Number(o?.temperature);
      return Number.isNaN(n) ? void 0 : n;
    }
    if (e === "low") {
      const o = this._forecastDay(t), n = Number(o?.templow);
      return Number.isNaN(n) ? void 0 : n;
    }
    if (e === "precipitation") {
      const o = this._forecastDay(t);
      if (o?.precipitation != null)
        return Math.round(Number(o.precipitation) * 100) / 100;
      const n = t.attributes.precipitation;
      return n != null ? Number(n) : void 0;
    }
    if (e === "precipitation_probability") {
      const o = this._forecastDay(t), n = Number(
        o?.precipitation_probability ?? t.attributes.precipitation_probability
      );
      return Number.isNaN(n) ? void 0 : n;
    }
    if (e === "wind_bearing") {
      const o = t.attributes.wind_bearing;
      if (o == null || o === "undefined") return;
      if (typeof o == "string") return o;
      const n = Math.floor(Number(o) / 22.5 + 0.5);
      return rl[n % 16];
    }
    return e === "wind_speed" ? t.attributes.wind_speed ?? 0 : e === "humidity" ? t.attributes.humidity ?? 0 : e === "pressure" ? t.attributes.pressure ?? 0 : t.attributes[e];
  }
  _renderInfo(t, e, i) {
    if (e === "extrema") {
      const a = this._attr(t, "low", i), s = this._attr(t, "high", i);
      if (a == null && s == null) return _;
      const l = `${a != null ? `${a}${this._tempUnit(t)}` : ""}${a != null && s != null ? " / " : ""}${s != null ? `${s}${this._tempUnit(t)}` : ""}`;
      return c`<span class="info-icon"></span
        ><span class="info-val">${l}</span>`;
    }
    const o = this._attr(t, e, i);
    if (o == null || o === "") return _;
    const n = i[e]?.unit || this._unitFor(e, t), r = nl[e];
    return c`
      ${r ? c`<ha-icon class="info-icon" .icon=${r}></ha-icon>` : c`<span class="info-icon"></span>`}
      <span class="info-val">${o}${n}</span>
    `;
  }
  _unitFor(t, e) {
    if (t === "humidity" || t === "precipitation_probability") return "%";
    if (t === "pressure")
      return e.attributes.pressure_unit || " hPa";
    if (t === "wind_speed") {
      const i = e.attributes.wind_speed_unit || "km/h";
      return i.startsWith(" ") ? i : ` ${i}`;
    }
    if (t === "precipitation") {
      const i = e.attributes.precipitation_unit || "mm";
      return i.startsWith(" ") ? i : ` ${i}`;
    }
    return "";
  }
  _tempUnit(t) {
    return t.attributes.temperature_unit || "°C";
  }
  _backdropStyle() {
    const t = this._config?.backdrop;
    return t ? t === !0 ? {
      "--day-color": "#45aaf2",
      "--night-color": "#a55eea",
      "--text-color": "var(--text-dark-color, #fff)"
    } : {
      "--day-color": t.day || "#45aaf2",
      "--night-color": t.night || "#a55eea",
      "--text-color": t.text || "var(--text-dark-color, #fff)"
    } : {};
  }
};
hi.styles = w`
    ${Yn}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    /* card_weather.yaml card_mod + simple-weather-card defaults */
    ha-card.ulm-weather {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: flex;
      flex-flow: row;
      align-items: center;
      border-radius: 14px;
      box-shadow: var(--ulm-shadow);
      border: none;
      padding: 24px;
      overflow: hidden;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      font-weight: 400;
      cursor: pointer;
      transition: background 1s;
    }

    ha-card.ulm-weather.backdrop {
      font-weight: 500;
      background: var(--day-color, #45aaf2);
      color: var(--text-color, #fff);
    }

    ha-card.ulm-weather.backdrop.night {
      background: var(--night-color, #a55eea);
    }

    ha-card.ulm-weather.backdrop.fade {
      background: linear-gradient(var(--day-color, #45aaf2), transparent 250%);
    }

    ha-card.ulm-weather.backdrop.fade.night {
      background: linear-gradient(
        var(--night-color, #a55eea) 0%,
        transparent 300%
      );
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    .weather-icon {
      height: 40px;
      width: 40px;
      --mdc-icon-size: 40px;
      flex: 0 0 40px;
      margin-right: 16px;
    }

    .weather-info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      min-height: 42px;
      min-width: 0;
    }

    /*
     * 2-column grid keeps icons/values aligned; MDI size ~1em like before.
     */
    .weather-info.add {
      display: grid;
      grid-template-columns: 1em max-content;
      column-gap: 0.25em;
      row-gap: 0.15em;
      align-items: center;
      justify-content: end;
      margin-left: auto;
      padding-left: 8px;
      font-size: 1rem;
      line-height: 1em;
    }

    .weather-info.add .info-icon {
      width: 1em;
      height: 1em;
      justify-self: center;
      align-self: center;
      color: inherit;
    }

    ha-icon.info-icon {
      --mdc-icon-size: 1em;
      --ha-icon-display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
    }

    .weather-info.add span.info-icon {
      width: 1em;
      height: 1em;
    }

    .weather-info.add .info-val {
      display: flex;
      align-items: center;
      height: 1em;
      font-size: 1em;
      line-height: 1em;
      white-space: nowrap;
      color: inherit;
    }

    .row {
      display: flex;
      align-items: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      gap: 0.35em;
    }

    .name,
    .state {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      text-transform: capitalize;
    }
  `;
ir([
  x({ attribute: !1 })
], hi.prototype, "hass", 2);
ir([
  y()
], hi.prototype, "_config", 2);
hi = ir([
  $("ulm-weather-card")
], hi);
var sl = Object.defineProperty, cl = Object.getOwnPropertyDescriptor, or = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? cl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && sl(e, i, n), n;
};
const Sa = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:weather-sunny-alert",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  default: "mdi:crosshairs-question"
}, za = {
  "clear-night": "yellow",
  cloudy: "blue",
  exceptional: "red",
  fog: "grey",
  hail: "blue",
  lightning: "blue",
  "lightning-rainy": "blue",
  partlycloudy: "yellow",
  pouring: "grey",
  rainy: "blue",
  snowy: "blue",
  "snowy-rainy": "blue",
  sunny: "yellow",
  windy: "grey",
  default: "grey"
};
let pi = class extends v {
  constructor() {
    super(...arguments), this._onTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "weather", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "weather"),
        m("name"),
        b("enable_popup"),
        b("surpress_first_forecast")
      ],
      computeLabel: k({
        entity: "Weather entity",
        name: "Name",
        enable_popup: "Enable popup (ulm_card_weather_ulm_enable_popup)",
        surpress_first_forecast: "Suppress first forecast in popup"
      }),
      computeHelper: C({
        enable_popup: "Opens the ULM weather popup on tap.",
        surpress_first_forecast: "YAML: ulm_weather_popup_surpress_first_forecast (popup option)."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "weather.demo_weather_north",
      enable_popup: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_weather_ulm_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_weather_ulm_name,
      enable_popup: !!(t.enable_popup ?? e.ulm_card_weather_ulm_enable_popup),
      surpress_first_forecast: !!(t.surpress_first_forecast ?? e.ulm_weather_popup_surpress_first_forecast),
      type: "custom:ulm-weather-ulm-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-weather-ulm"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = za[t.state] || za.default, i = f(this, e), o = Sa[t.state] || Sa.default, n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._localizeState(t.state), a = t.attributes.humidity, s = t.attributes.temperature, l = t.attributes.temperature_unit || "°C";
    return c`
      <ha-card class="ulm-card ulm-weather-ulm">
        <div class="stack">
          <div class="row">
            <button
              class="icon-btn"
              style=${d({
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    })}
              @click=${this._onTap}
            >
              <ha-icon .icon=${o}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._onTap}>
              <div class="name">${n}</div>
              <div class="label">${r}</div>
            </button>
          </div>

          <div class="chips">
            <div class="chip">
              <div class="chip-content">
                <ha-icon icon="mdi:water"></ha-icon>
                <span class="chip-value"
                  >${a != null ? `${a}%` : "—"}</span
                >
              </div>
            </div>
            <div class="chip">
              <div class="chip-content">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span class="chip-value"
                  >${s != null ? `${s}${l}` : "—"}</span
                >
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _localizeState(t) {
    const e = `component.weather.entity_component._.state.${t}`, i = this.hass?.localize?.(e);
    return i && i !== e ? i : t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " ");
  }
};
pi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-weather-ulm {
      height: auto;
    }

    /* card_weather_ulm: two content rows, gap 12px — not stretched 1fr/1fr */
    .stack {
      display: grid;
      grid-template-rows: min-content min-content;
      row-gap: 12px;
      height: auto;
    }

    /* list_2_items: columns 1fr 1fr, column-gap 7px */
    .chips {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 7px;
      align-items: center;
    }

    .chip {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 42px;
      border-radius: 14px;
      background-color: rgba(var(--color-theme, var(--ulm-color-theme)), 0.05);
      box-shadow: none;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }

    /* Shrink-wrapped group; true center in the chip (not 40/60 split) */
    .chip-content {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 6px;
      width: max-content;
      max-width: 100%;
    }

    .chip ha-icon {
      --mdc-icon-size: 20px;
      --ha-icon-display: flex;
      width: 20px;
      min-width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 20px;
      margin: 0;
      padding: 0;
      color: rgba(var(--color-theme, var(--ulm-color-theme)), 0.9);
    }

    .chip-value {
      flex: 0 0 auto;
      margin: 0;
      padding: 0;
      font-size: 1rem;
      line-height: 20px;
      height: 20px;
      white-space: nowrap;
    }
  `;
or([
  x({ attribute: !1 })
], pi.prototype, "hass", 2);
or([
  y()
], pi.prototype, "_config", 2);
pi = or([
  $("ulm-weather-ulm-card")
], pi);
var ll = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, nr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? dl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && ll(e, i, n), n;
};
let gi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        m("attribute"),
        u("battery_state_entity", void 0, !1),
        u("charger_type_entity", void 0, !1),
        b("charging_animation"),
        M("battery_level_danger"),
        M("battery_level_warning"),
        m("color_danger"),
        m("color_warning"),
        m("color_ok")
      ],
      computeLabel: k({
        entity: "Battery entity",
        name: "Name (ulm_card_battery_name)",
        attribute: "Level attribute (ulm_card_battery_attribute)",
        battery_state_entity: "Charging state entity (ulm_card_battery_battery_state_entity_id)",
        charger_type_entity: "Charger type entity (ulm_card_battery_charger_type_entity_id)",
        charging_animation: "Charging animation",
        battery_level_danger: "Danger level %",
        battery_level_warning: "Warning level %",
        color_danger: "Danger color",
        color_warning: "Warning color",
        color_ok: "OK color"
      }),
      computeHelper: C({
        attribute: "If the % lives in an attribute (e.g. battery_percent), set it here.",
        battery_state_entity: 'Entity state "charging" shows charging icon.',
        charger_type_entity: "wireless / ac / usb / charging — replaces battery_state_entity.",
        charging_animation: "Requires battery_state_entity; ignores charger_type_entity.",
        battery_level_danger: "Must be lower than warning. Colors icon below this.",
        battery_level_warning: "Colors icon between danger and this value.",
        color_danger: "Default: var(--google-red)",
        color_warning: "Default: var(--google-yellow)",
        color_ok: "Default: var(--google-green)"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.outside_temperature_battery",
      battery_state_entity: "binary_sensor.outside_temperature_battery_charging",
      battery_level_danger: 20,
      battery_level_warning: 50,
      charging_animation: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_battery_entity;
    if (!i) throw new Error("Please define an entity");
    const o = this._num(
      t.battery_level_danger ?? e.ulm_card_battery_battery_level_danger
    ), n = this._num(
      t.battery_level_warning ?? e.ulm_card_battery_battery_level_warning ?? e.ulm_card_battery_battery_level_waring
    );
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_battery_name,
      attribute: t.attribute ?? e.ulm_card_battery_attribute,
      battery_state_entity: t.battery_state_entity ?? e.ulm_card_battery_battery_state_entity_id,
      charger_type_entity: t.charger_type_entity ?? e.ulm_card_battery_charger_type_entity_id,
      charging_animation: !!(t.charging_animation ?? e.ulm_card_battery_charging_animation ?? !1),
      battery_level_danger: o,
      battery_level_warning: n,
      color_danger: t.color_danger ?? e.ulm_card_battery_color_battery_level_danger ?? "var(--google-red)",
      color_warning: t.color_warning ?? e.ulm_card_battery_color_battery_level_warning ?? "var(--google-yellow)",
      color_ok: t.color_ok ?? e.ulm_card_battery_color_battery_level_ok ?? "var(--google-green)",
      type: "custom:ulm-battery-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-battery"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._level(t), i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this._icon(e), n = this._iconColor(e), r = this._label(e, t), a = this._shouldAnimate();
    return c`
      <ha-card class="ulm-card ulm-battery">
        <div class="row">
          <button
            class="icon-btn"
            style=${d({
      color: n,
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    })}
            @click=${this._moreInfo}
          >
            <ha-icon
              class=${L({ charging: a })}
              .icon=${o}
            ></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${i}</div>
            <div class="label">${r}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _num(t) {
    if (t == null || t === "") return;
    const e = Number(t);
    return Number.isFinite(e) ? e : void 0;
  }
  _level(t) {
    const e = this._config?.attribute, i = e && t.attributes[e] != null ? t.attributes[e] : t.state;
    if (i === "unknown" || i === "unavailable") return i;
    const o = Number(i);
    return Number.isFinite(o) ? o : "unknown";
  }
  _chargingInfix() {
    const t = this._config;
    if (t.charger_type_entity && this.hass?.states[t.charger_type_entity])
      switch (String(this.hass.states[t.charger_type_entity].state).toLowerCase()) {
        case "wireless":
          return "-charging-wireless";
        case "charging":
        case "ac":
        case "usb":
          return "-charging";
        default:
          return "";
      }
    if (!t.charging_animation && t.battery_state_entity && this.hass?.states[t.battery_state_entity] && String(this.hass.states[t.battery_state_entity].state).toLowerCase() === "charging")
      return "-charging";
    if (!t.charging_animation && t.battery_state_entity && this.hass?.states[t.battery_state_entity]) {
      const e = String(
        this.hass.states[t.battery_state_entity].state
      ).toLowerCase();
      if (e === "on" || e === "charging") return "-charging";
    }
    return "";
  }
  _icon(t) {
    if (t === "unknown" || t === "unavailable")
      return "mdi:battery-off";
    const e = this._chargingInfix();
    if (t === 100) return "mdi:battery";
    if (t < 10) return `mdi:battery${e}-outline`;
    const i = Math.floor(t / 10) * 10;
    return `mdi:battery${e}-${i}`;
  }
  _iconColor(t) {
    const e = this._config, i = "rgba(var(--color-theme, 51, 51, 51), 0.9)";
    return t === "unavailable" || e.battery_level_danger == null && e.battery_level_warning == null ? t === "unknown" || t === "unavailable" ? e.color_danger || "var(--google-red)" : i : t === "unknown" || t === "unavailable" || e.battery_level_danger != null && t <= e.battery_level_danger ? e.color_danger || "var(--google-red)" : e.battery_level_warning != null && t <= e.battery_level_warning ? e.color_warning || "var(--google-yellow)" : e.color_ok || "var(--google-green)";
  }
  _label(t, e) {
    return t === "unknown" || t === "unavailable" ? this.hass?.formatEntityState ? this.hass.formatEntityState(e) : String(t) : `${t}%`;
  }
  _shouldAnimate() {
    const t = this._config;
    if (!t?.charging_animation || !t.battery_state_entity || !this.hass)
      return !1;
    const e = this.hass.states[t.battery_state_entity];
    if (!e) return !1;
    const i = String(e.state).toLowerCase();
    return i === "charging" || i === "on";
  }
};
gi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-battery {
      height: auto;
    }

    .icon-btn ha-icon.charging {
      animation: charge 3s linear infinite;
    }

    @keyframes charge {
      0%,
      80% {
        clip-path: inset(0 0 0 0);
      }
      10% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 66%,
          34% 66%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      20% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 62%,
          34% 62%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      30% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 58%,
          34% 58%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      40% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 54%,
          34% 54%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      50% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 50%,
          34% 50%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      60% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 46%,
          34% 46%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      70% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 40%,
          34% 40%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
    }
  `;
nr([
  x({ attribute: !1 })
], gi.prototype, "hass", 2);
nr([
  y()
], gi.prototype, "_config", 2);
gi = nr([
  $("ulm-battery-card")
], gi);
var ul = Object.defineProperty, _l = Object.getOwnPropertyDescriptor, rr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? _l(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && ul(e, i, n), n;
};
const ml = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function hl(t) {
  return !(ml.has(t) || /\d/.test(t));
}
let fi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "binary_sensor"),
        m("name"),
        S("icon"),
        A("color"),
        b("show_last_changed"),
        b("force_background_color")
      ],
      computeLabel: k({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_name)",
        icon: "Icon (ulm_card_binary_sensor_icon)",
        color: "Color (ulm_card_binary_sensor_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active"
      }),
      computeHelper: C({
        show_last_changed: "Replaces the state label with a relative last-changed time.",
        force_background_color: "Tints the card with the selected color while active."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "binary_sensor.basement_floor_wet",
      color: "blue",
      show_last_changed: !1,
      force_background_color: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_binary_sensor_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_binary_sensor_name,
      icon: t.icon ?? e.ulm_card_binary_sensor_icon,
      color: t.color || e.ulm_card_binary_sensor_color || "blue",
      show_last_changed: !!(t.show_last_changed ?? e.ulm_card_binary_sensor_show_last_changed ?? e.ulm_show_last_changed ?? !1),
      force_background_color: !!(t.force_background_color ?? e.ulm_card_binary_sensor_force_background_color ?? !1),
      type: "custom:ulm-binary-sensor-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-binary-sensor"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = hl(t.state), i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:checkbox-blank-circle", l = this._label(t), h = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, p = n ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-binary-sensor": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(h)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(p)}>${a}</div>
            <div class="label" style=${d(p)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _label(t) {
    return this._config?.show_last_changed && t.last_changed ? this._relativeTime(t.last_changed) : this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
};
fi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-binary-sensor {
      height: auto;
    }
  `;
rr([
  x({ attribute: !1 })
], fi.prototype, "hass", 2);
rr([
  y()
], fi.prototype, "_config", 2);
fi = rr([
  $("ulm-binary-sensor-card")
], fi);
var pl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, ar = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? gl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && pl(e, i, n), n;
};
const fl = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function bl(t) {
  return !(fl.has(t) || /\d/.test(t));
}
let bi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "binary_sensor"),
        m("name"),
        S("icon"),
        A("color"),
        b("show_last_changed"),
        b("force_background_color"),
        b("invert_state")
      ],
      computeLabel: k({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_alert_name)",
        icon: "Icon (ulm_card_binary_sensor_alert_icon)",
        color: "Color (ulm_card_binary_sensor_alert_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active",
        invert_state: "Invert alert (ulm_icon_alert_invert_state)"
      }),
      computeHelper: C({
        show_last_changed: "Replaces the state label with a relative last-changed time.",
        force_background_color: "Tints the card with the selected color while active.",
        invert_state: "Show the alert badge when the sensor is off instead of on."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "binary_sensor.movement_backyard",
      color: "blue",
      show_last_changed: !1,
      force_background_color: !1,
      invert_state: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_binary_sensor_alert_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_binary_sensor_alert_name,
      icon: t.icon ?? e.ulm_card_binary_sensor_alert_icon,
      color: t.color || e.ulm_card_binary_sensor_alert_color || "blue",
      show_last_changed: !!(t.show_last_changed ?? e.ulm_card_binary_sensor_alert_show_last_changed ?? e.ulm_card_binary_sensor_show_last_changed ?? e.ulm_show_last_changed ?? !1),
      force_background_color: !!(t.force_background_color ?? e.ulm_card_binary_sensor_alert_force_background_color ?? !1),
      invert_state: !!(t.invert_state ?? e.ulm_icon_alert_invert_state ?? !1),
      type: "custom:ulm-binary-sensor-alert-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-binary-sensor-alert"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = bl(t.state), i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:alert", l = this._label(t), h = this._showAlert(t), p = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, g = n ? { color: "rgb(250, 250, 250)" } : {}, z = f(this, "red");
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-binary-sensor-alert": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${s}></ha-icon>
            ${h ? c`<span
                  class="badge"
                  style=${d({
      backgroundColor: `rgba(${z}, 1)`
    })}
                  aria-hidden="true"
                >
                  <ha-icon .icon=${"mdi:exclamation"}></ha-icon>
                </span>` : _}
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(g)}>${a}</div>
            <div class="label" style=${d(g)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  /** icon_alert: badge when on/unavailable (or off when inverted) */
  _showAlert(t) {
    const e = this._config?.invert_state ? "off" : "on";
    return t.state === "unavailable" || t.state === e;
  }
  _label(t) {
    return this._config?.show_last_changed && t.last_changed ? this._relativeTime(t.last_changed) : this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
};
bi.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
      overflow: visible !important;
    }

    ha-card.ulm-binary-sensor-alert,
    .row,
    .icon-btn {
      overflow: visible !important;
    }

    ha-card.ulm-binary-sensor-alert {
      height: auto;
    }

    /*
     * Red disc + white ring. Prefer box-shadow for the ring (not clipped as
     * easily as border when slightly outside the icon cell). Keep the 16px
     * disc inside the 42px icon so the fill always paints.
     */
    .icon-btn .badge {
      position: absolute;
      left: 24px;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 0;
      box-sizing: border-box;
      box-shadow: 0 0 0 2px #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 5;
      pointer-events: none;
    }

    .icon-btn .badge ha-icon {
      --mdc-icon-size: 10px !important;
      width: 10px !important;
      height: 10px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: #fff;
    }
  `;
ar([
  x({ attribute: !1 })
], bi.prototype, "hass", 2);
ar([
  y()
], bi.prototype, "_config", 2);
bi = ar([
  $("ulm-binary-sensor-alert-card")
], bi);
var yl = Object.defineProperty, vl = Object.getOwnPropertyDescriptor, sr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? vl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && yl(e, i, n), n;
};
function Ea(t, e = "blue") {
  if (typeof t != "string" || !t) return e;
  const i = t.match(/color-([a-z]+)/i);
  if (i) return i[1].toLowerCase();
  const o = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(
    o
  ) ? o : e;
}
let yi = class extends v {
  constructor() {
    super(...arguments), this._navigate = (t) => {
      t.stopPropagation();
      const e = this._config?.navigation_path;
      e && (history.pushState(null, "", e), window.dispatchEvent(new Event("location-changed")));
    };
  }
  static getConfigForm() {
    return {
      schema: [
        m("navigation_path"),
        m("name"),
        S("icon"),
        A("color")
      ],
      computeLabel: k({
        navigation_path: "Path (ulm_card_navigate_path)",
        name: "Title (ulm_card_navigate_title)",
        icon: "Icon (ulm_card_navigate_icon)",
        color: "Icon color (ulm_card_navigate_color)"
      }),
      computeHelper: C({
        navigation_path: "Lovelace path, e.g. /lovelace/home or /dashboard-test/0",
        name: "Label shown next to the icon."
      })
    };
  }
  static getStubConfig() {
    return {
      navigation_path: "/lovelace/home",
      name: "Media",
      icon: "mdi:television",
      color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = t.navigation_path || e.ulm_card_navigate_path || "";
    if (!i) throw new Error("Please define a navigation path");
    const o = t.name ?? t.title ?? e.ulm_card_navigate_title;
    if (!o) throw new Error("Please define a title");
    this._config = {
      ...t,
      navigation_path: i,
      name: o,
      icon: t.icon ?? e.ulm_card_navigate_icon ?? "mdi:page-next",
      color: Ea(
        t.color ?? e.ulm_card_navigate_color,
        "blue"
      ),
      type: "custom:ulm-navigate-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config) return _;
    const t = Ea(this._config.color, "blue"), e = f(this, t), i = {
      color: `rgba(${e}, 1)`,
      backgroundColor: `rgba(${e}, 0.2)`
    };
    return c`
      <ha-card class="ulm-card ulm-navigate" @click=${this._navigate}>
        <div class="row">
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${this._config.icon || "mdi:page-next"}></ha-icon>
          </div>
          <div class="label">${this._config.name}</div>
        </div>
      </ha-card>
    `;
  }
};
yi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-navigate {
      height: auto;
      cursor: pointer;
    }

    /* icon_only + navigate overrides: single row icon | label */
    .row {
      display: grid;
      grid-template-columns: min-content min-content;
      grid-template-rows: min-content;
      grid-template-areas: "icon label";
      align-items: center;
      column-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      cursor: pointer;
      /* not a real button — whole card navigates */
      pointer-events: none;
    }

    /* Override ulmCardStyles .label opacity:0.4 — title must read solid */
    .label {
      grid-area: label;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;
      filter: none;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
  `;
sr([
  x({ attribute: !1 })
], yi.prototype, "hass", 2);
sr([
  y()
], yi.prototype, "_config", 2);
yi = sr([
  $("ulm-navigate-card")
], yi);
var wl = Object.defineProperty, xl = Object.getOwnPropertyDescriptor, cr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? xl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && wl(e, i, n), n;
};
const $l = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function kl(t) {
  return !($l.has(t) || /\d/.test(t));
}
let vi = class extends v {
  constructor() {
    super(...arguments), this._iconTap = (t) => {
      if (t.stopPropagation(), !this._config || !this.hass) return;
      if (this._config.enable_popup) {
        dt(this, "power_outlet", this._config.entity);
        return;
      }
      const e = this._config.entity.split(".")[0];
      this.hass.callService(e, "toggle", {
        entity_id: this._config.entity
      });
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          dt(this, "power_outlet", this._config.entity);
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["switch", "input_boolean", "light"]),
        m("name"),
        S("icon"),
        A("color"),
        u("consumption_sensor", "sensor", !1),
        b("force_background_color"),
        b("enable_popup")
      ],
      computeLabel: k({
        entity: "Outlet / switch entity",
        name: "Name (ulm_card_power_outlet_name)",
        icon: "Icon (ulm_card_power_outlet_icon)",
        color: "Color (ulm_card_power_outlet_color)",
        consumption_sensor: "Consumption sensor (ulm_card_power_outlet_consumption_sensor)",
        force_background_color: "Force background color when on",
        enable_popup: "Enable popup (ulm_outlet_power_enable_popup)"
      }),
      computeHelper: C({
        consumption_sensor: "When the outlet is on, shows state • {value}W from this sensor.",
        enable_popup: "Opens the ULM power outlet popup on tap."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "switch.ac",
      color: "yellow",
      consumption_sensor: "sensor.power_consumption",
      force_background_color: !1,
      enable_popup: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_power_outlet_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_power_outlet_name,
      icon: t.icon ?? e.ulm_card_power_outlet_icon,
      color: t.color || e.ulm_card_power_outlet_color || "yellow",
      consumption_sensor: t.consumption_sensor ?? e.ulm_card_power_outlet_consumption_sensor,
      force_background_color: !!(t.force_background_color ?? e.ulm_card_power_outlet_force_background_color ?? !1),
      enable_popup: !!(t.enable_popup ?? e.ulm_outlet_power_enable_popup ?? !1),
      type: "custom:ulm-power-outlet-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-power-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = kl(t.state), i = this._config.color || "yellow", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:power-socket-eu", l = this._label(t, e), h = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, p = n ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-power-outlet": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(h)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._iconTap}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._nameTap}>
            <div class="name" style=${d(p)}>${a}</div>
            <div class="label" style=${d(p)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _label(t, e) {
    const i = this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state, o = this._config?.consumption_sensor;
    if (e && o && this.hass?.states[o]) {
      const n = this.hass.states[o].state;
      return `${i} • ${n}W`;
    }
    return i;
  }
};
vi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-power-outlet {
      height: auto;
    }
  `;
cr([
  x({ attribute: !1 })
], vi.prototype, "hass", 2);
cr([
  y()
], vi.prototype, "_config", 2);
vi = cr([
  $("ulm-power-outlet-card")
], vi);
var Cl = Object.defineProperty, Sl = Object.getOwnPropertyDescriptor, lr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Sl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Cl(e, i, n), n;
};
const zl = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function El(t) {
  return !(zl.has(t) || /\d/.test(t));
}
let wi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        A("color"),
        b("force_background_color")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_generic_name)",
        icon: "Icon (ulm_card_generic_icon)",
        color: "Color (ulm_card_generic_color)",
        force_background_color: "Force background color when active"
      }),
      computeHelper: C({
        name: "Shown as the secondary line under the state value.",
        force_background_color: "Only applies when the entity is in an active (non-numeric) state."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.outside_temperature",
      color: "blue",
      force_background_color: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_generic_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_generic_name,
      icon: t.icon ?? e.ulm_card_generic_icon,
      color: t.color || e.ulm_card_generic_color || "blue",
      force_background_color: !!(t.force_background_color ?? e.ulm_card_generic_force_background_color ?? !1),
      type: "custom:ulm-generic-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-generic"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = El(t.state), i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._stateLabel(t), s = this._config.name || t.attributes.friendly_name || t.entity_id, l = this._config.icon || t.attributes.icon || "mdi:flash", h = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, p = n ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-generic": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(h)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${l}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(p)}>${a}</div>
            <div class="label" style=${d(p)}>${s}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _stateLabel(t) {
    if (this.hass?.formatEntityState)
      return this.hass.formatEntityState(t);
    const e = t.attributes.unit_of_measurement;
    return e ? `${t.state} ${e}` : t.state;
  }
};
wi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-generic {
      height: auto;
    }

    /* Keep secondary line readable when not force-bg */
    .label {
      opacity: 0.4;
    }

    .force-bg .label {
      opacity: 1;
    }
  `;
lr([
  x({ attribute: !1 })
], wi.prototype, "hass", 2);
lr([
  y()
], wi.prototype, "_config", 2);
wi = lr([
  $("ulm-generic-card")
], wi);
var Pl = Object.defineProperty, Ll = Object.getOwnPropertyDescriptor, dr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Ll(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Pl(e, i, n), n;
};
const Ml = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function Ol(t) {
  return !(Ml.has(t) || /\d/.test(t));
}
let xi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        A("color"),
        b("force_background_color")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)",
        color: "Color (ulm_card_generic_swap_color)",
        force_background_color: "Force background color when active"
      }),
      computeHelper: C({
        name: "Shown as the primary bold line; state is secondary underneath.",
        force_background_color: "Only applies when the entity is in an active (non-numeric) state."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.outside_temperature",
      color: "blue",
      force_background_color: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_generic_swap_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_generic_swap_name,
      icon: t.icon ?? e.ulm_card_generic_swap_icon,
      color: t.color || e.ulm_card_generic_swap_color || "blue",
      force_background_color: !!(t.force_background_color ?? e.ulm_card_generic_swap_force_background_color ?? !1),
      type: "custom:ulm-generic-swap-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-generic-swap"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Ol(t.state), i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._stateLabel(t), l = this._config.icon || t.attributes.icon || "mdi:swap-horizontal", h = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, p = n ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-generic-swap": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(h)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${l}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(p)}>${a}</div>
            <div class="label" style=${d(p)}>${s}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _stateLabel(t) {
    if (this.hass?.formatEntityState)
      return this.hass.formatEntityState(t);
    const e = t.attributes.unit_of_measurement;
    return e ? `${t.state} ${e}` : t.state;
  }
};
xi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-generic-swap {
      height: auto;
    }

    .label {
      opacity: 0.4;
    }

    .force-bg .label {
      opacity: 1;
    }
  `;
dr([
  x({ attribute: !1 })
], xi.prototype, "hass", 2);
dr([
  y()
], xi.prototype, "_config", 2);
xi = dr([
  $("ulm-generic-swap-card")
], xi);
var Nl = Object.defineProperty, Il = Object.getOwnPropertyDescriptor, ur = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Il(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Nl(e, i, n), n;
};
const jl = /* @__PURE__ */ new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused"
]);
function Dl(t) {
  return !(jl.has(t) || /\d/.test(t));
}
let $i = class extends v {
  constructor() {
    super(...arguments), this._toggle = (t) => {
      if (t.stopPropagation(), !this._config || !this.hass) return;
      const e = this._config.entity.split(".")[0];
      this.hass.callService(e, "toggle", {
        entity_id: this._config.entity
      });
    }, this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["input_boolean", "switch"]),
        m("name"),
        S("icon"),
        A("color"),
        b("force_background_color")
      ],
      computeLabel: k({
        entity: "Input boolean / switch",
        name: "Name (ulm_card_input_boolean_name)",
        icon: "Icon (ulm_card_input_boolean_icon)",
        color: "Color (ulm_card_input_boolean_color)",
        force_background_color: "Force background color when on"
      }),
      computeHelper: C({
        entity: "Icon tap toggles the entity; name opens more-info."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "switch.decorative_lights",
      color: "blue",
      force_background_color: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_input_boolean_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_input_boolean_name,
      icon: t.icon ?? e.ulm_card_input_boolean_icon,
      color: t.color || e.ulm_card_input_boolean_color || "blue",
      force_background_color: !!(t.force_background_color ?? e.ulm_card_input_boolean_force_background_color ?? !1),
      type: "custom:ulm-input-boolean-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-boolean"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Dl(t.state), i = this._config.color || "blue", o = f(this, i), n = !!this._config.force_background_color && e, r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:toggle-switch", l = this._label(t), h = n ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, p = n ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-input-boolean": !0,
      active: e,
      "force-bg": n
    })}
        style=${d(h)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(r)}
            @click=${this._toggle}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(p)}>${a}</div>
            <div class="label" style=${d(p)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _label(t) {
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
};
$i.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-input-boolean {
      height: auto;
    }
  `;
ur([
  x({ attribute: !1 })
], $i.prototype, "hass", 2);
ur([
  y()
], $i.prototype, "_config", 2);
$i = ur([
  $("ulm-input-boolean-card")
], $i);
var Al = Object.defineProperty, Tl = Object.getOwnPropertyDescriptor, _r = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Tl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Al(e, i, n), n;
};
function Ul(t) {
  if (!t) return {};
  if (typeof t == "object" && !Array.isArray(t))
    return t;
  if (typeof t == "string")
    try {
      const e = JSON.parse(t);
      return e && typeof e == "object" && !Array.isArray(e) ? e : {};
    } catch {
      return {};
    }
  return {};
}
let ki = class extends v {
  constructor() {
    super(...arguments), this._run = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config) return;
      const e = Ul(this._config.service_data), i = this._config.entity || (typeof e.entity_id == "string" ? e.entity_id : void 0);
      if (!i) return;
      const { entity_id: o, ...n } = e;
      this.hass.callService("script", "turn_on", {
        entity_id: i,
        ...n
      });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "script"),
        m("name"),
        S("icon"),
        m("service_data")
      ],
      computeLabel: k({
        entity: "Script entity",
        name: "Title (ulm_card_script_title)",
        icon: "Icon (ulm_card_script_icon)",
        service_data: "Service data (tap_action service_data)"
      }),
      computeHelper: C({
        entity: "Runs script.turn_on for this entity on tap.",
        service_data: 'Optional JSON object, e.g. {"brightness": 50}. entity_id is set automatically.'
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "script.romantic_lights",
      name: "Romantic Light",
      icon: "mdi:candle"
    };
  }
  setConfig(t) {
    const e = t, i = t.name ?? t.title ?? e.ulm_card_script_title;
    if (!i) throw new Error("Please define a title");
    const o = t.icon ?? e.ulm_card_script_icon ?? e._card_script_icon ?? "mdi:script-text", n = e.tap_action, r = typeof n?.service_data?.entity_id == "string" ? n.service_data.entity_id : void 0, a = t.entity || e.ulm_card_script_entity || r;
    this._config = {
      ...t,
      entity: a,
      name: i,
      icon: o,
      service_data: t.service_data ?? e.tap_action_service_data ?? n?.service_data,
      type: "custom:ulm-script-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config) return _;
    const t = f(this, "blue"), e = {
      color: `rgba(${t}, 1)`,
      backgroundColor: `rgba(${t}, 0.2)`
    };
    return c`
      <ha-card class="ulm-card ulm-script" @click=${this._run}>
        <div class="row">
          <div class="icon-btn" style=${d(e)}>
            <ha-icon .icon=${this._config.icon || "mdi:script-text"}></ha-icon>
          </div>
          <div class="label">${this._config.name}</div>
        </div>
      </ha-card>
    `;
  }
};
ki.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-script {
      height: auto;
      cursor: pointer;
    }

    .row {
      display: grid;
      grid-template-columns: min-content min-content;
      grid-template-rows: min-content;
      grid-template-areas: "icon label";
      align-items: center;
      column-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .label {
      grid-area: label;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;
      filter: none;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
  `;
_r([
  x({ attribute: !1 })
], ki.prototype, "hass", 2);
_r([
  y()
], ki.prototype, "_config", 2);
ki = _r([
  $("ulm-script-card")
], ki);
var Fl = Object.defineProperty, Bl = Object.getOwnPropertyDescriptor, mr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Bl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Fl(e, i, n), n;
};
function Js(t, e) {
  const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
  return i && getComputedStyle(t).getPropertyValue(`--${i[1]}`).trim() || e;
}
function Hl(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-background-${e}`).trim();
  i = Js(t, i), /^\d+\s*,/.test(i) || (i = f(t, e));
  const o = getComputedStyle(t).getPropertyValue("--opacity-bg").trim() || "1";
  return `rgba(${i}, ${o})`;
}
function Rl(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-${e}-text`).trim();
  return i = Js(t, i), /^\d+\s*,/.test(i) ? `rgba(${i}, 1)` : i.startsWith("#") || i.startsWith("rgb") ? i : "var(--primary-text-color)";
}
let Ci = class extends v {
  constructor() {
    super(...arguments), this._tap = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config) return;
      const e = this._config.entity, i = e.split(".")[0], o = this.hass.states[e], n = this._config.state || "on";
      switch (i) {
        case "input_select":
          this.hass.callService("input_select", "select_option", {
            entity_id: e,
            option: n
          });
          return;
        case "input_boolean":
        case "switch":
        case "light":
        case "automation":
        case "fan":
        case "vacuum":
        case "script":
          this.hass.callService(i, "toggle", { entity_id: e });
          return;
        case "input_button":
          this.hass.callService("input_button", "press", { entity_id: e });
          return;
        case "button":
          this.hass.callService("button", "press", { entity_id: e });
          return;
        case "lock":
          this.hass.callService(
            "lock",
            o?.state === "locked" ? "unlock" : "lock",
            { entity_id: e }
          );
          return;
        default:
          return;
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        A("color"),
        m("state"),
        b("show_last_changed")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        color: "Color (ulm_card_vertical_button_color)",
        state: "Active state (ulm_card_vertical_button_state)",
        show_last_changed: "Show last changed"
      }),
      computeHelper: C({
        entity: "Tap toggles / selects based on domain (input_select, switch, light, …).",
        state: 'Button is active when entity.state equals this value (default "on"). Required for input_select options.',
        show_last_changed: "Show relative last-changed under the name."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_select.scene_mode",
      name: "Away",
      icon: "mdi:home-export-outline",
      color: "green",
      state: "Away",
      show_last_changed: !1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_vertical_button_entity;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: t.name,
      icon: t.icon,
      color: t.color || e.ulm_card_vertical_button_color || "blue",
      state: String(
        t.state ?? e.ulm_card_vertical_button_state ?? "on"
      ),
      show_last_changed: !!(t.show_last_changed ?? e.show_last_changed ?? !1),
      type: "custom:ulm-vertical-button-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 3,
      min_columns: 2,
      max_columns: 6
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-vertical-button"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.state || "on", i = t.state === e, o = this._config.color || "blue", n = R(this, i, o), r = this._displayName(t, e), a = this._config.icon || t.attributes.icon || "mdi:gesture-tap-button", s = this._label(t), l = i ? { backgroundColor: Hl(this, o) } : {}, h = i ? { color: Rl(this, o) } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-vertical-button": !0,
      active: i
    })}
        style=${d(l)}
        @click=${this._tap}
      >
        <div class="stack">
          <div class="icon-btn" style=${d(n)}>
            <ha-icon .icon=${a}></ha-icon>
          </div>
          ${r ? c`<div class="name" style=${d(h)}>${r}</div>` : _}
          ${s ? c`<div class="label" style=${d(h)}>
                ${s}
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _displayName(t, e) {
    if (this._config?.name) return this._config.name;
    const i = t.entity_id;
    return i.startsWith("input_select.") ? e : i.startsWith("input_boolean.") ? t.attributes.friendly_name || "" : t.state;
  }
  _label(t) {
    return this._config?.show_last_changed && t.last_changed ? this._relativeTime(t.last_changed) : "";
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
};
Ci.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-vertical-button {
      height: auto;
      cursor: pointer;
      padding: 10px 0 8px;
    }

    .stack {
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "label";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content;
      justify-items: center;
      row-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      pointer-events: none;
      place-self: center;
    }

    .name {
      grid-area: name;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      color: var(--primary-text-color);
    }

    .label {
      grid-area: label;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      opacity: 0.4;
      filter: none;
      margin-left: 0;
      text-align: center;
      color: var(--primary-text-color);
    }
  `;
mr([
  x({ attribute: !1 })
], Ci.prototype, "hass", 2);
mr([
  y()
], Ci.prototype, "_config", 2);
Ci = mr([
  $("ulm-vertical-button-card")
], Ci);
var Gl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, hr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Wl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Gl(e, i, n), n;
};
const Pa = [
  { value: "toggle", label: "toggle" },
  { value: "more-info", label: "more-info" },
  { value: "navigate", label: "navigate" },
  { value: "none", label: "none" }
], Kl = /^(yellow|blue|green|red|pink|purple|grey)_(on|off|no_state|no_card)$/;
function La(t) {
  if (!t?.length) return {};
  for (const e of t) {
    const i = String(e).match(Kl);
    if (!i) continue;
    const o = i[2];
    return {
      color: i[1],
      color_mode: o === "no_state" || o === "no_card" ? "always" : o
    };
  }
  return {};
}
function Vl(t) {
  if (!t) return;
  if (Array.isArray(t))
    return t.map(String).map((i) => i.trim()).filter(Boolean);
  const e = String(t).split(/[,\n]/).map((i) => i.trim()).filter(Boolean);
  return e.length ? e : void 0;
}
function Lo(t, e, i) {
  if (!t) return i;
  const o = { action: t };
  return t === "navigate" && e && (o.navigation_path = e), o;
}
function ql(t, e = {}) {
  if (!t) return;
  const i = Vl(e.flatTemplates);
  if (typeof t == "string") {
    const l = La(i);
    return {
      entity_id: t,
      color: e.flatColor || l.color,
      icon: e.flatIcon,
      templates: i,
      color_mode: l.color_mode || (e.flatColor ? "on" : void 0),
      tap_action: Lo(e.flatTap, e.flatNavPath, {
        action: "toggle"
      }),
      hold_action: Lo(e.flatHold, e.flatNavPath, {
        action: "more-info"
      })
    };
  }
  const o = t.templates?.length ? t.templates : i, n = La(o), r = t.entity_id || t.entity || "";
  if (!r) return;
  const a = t.tap_action || { action: "toggle" }, s = t.hold_action || { action: "more-info" };
  return {
    ...t,
    entity_id: r,
    templates: o,
    color: t.color || e.flatColor || n.color,
    icon: t.icon || e.flatIcon,
    color_mode: t.color_mode || n.color_mode || (t.color || e.flatColor ? "on" : void 0),
    tap_action: Lo(e.flatTap, e.flatNavPath, a),
    hold_action: Lo(e.flatHold, e.flatNavPath, s)
  };
}
function Mo(t) {
  return [
    u(`entity_${t}`, void 0, !1),
    D([S(`entity_${t}_icon`), A(`entity_${t}_color`)]),
    m(`entity_${t}_templates`),
    D([
      H(`entity_${t}_tap_action`, Pa),
      H(`entity_${t}_hold_action`, Pa)
    ]),
    m(`entity_${t}_navigation_path`)
  ];
}
function Yl(t) {
  return t === "on";
}
let Si = class extends v {
  constructor() {
    super(...arguments), this._slots = {}, this._cardTap = (t) => {
      if (t.stopPropagation(), this._config?.navigation_path) {
        this._navigate(this._config.navigation_path);
        return;
      }
      this._config?.entity && this._moreInfo(this._config.entity);
    };
  }
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        D([m("name"), S("icon")]),
        u("entity", void 0, !1),
        A("color"),
        m("navigation_path"),
        b("label_use_temperature"),
        b("label_use_brightness"),
        m("label"),
        ...Mo(1),
        ...Mo(2),
        ...Mo(3),
        ...Mo(4)
      ],
      computeLabel: k({
        name: "Name",
        icon: "Icon",
        entity: "Main entity",
        color: "Room color (blue_no_state / red_no_state…)",
        navigation_path: "Navigation path (tap_action navigate)",
        label: "Override label text",
        label_use_temperature: "label_use_temperature",
        label_use_brightness: "label_use_brightness",
        entity_1: "entity_1",
        entity_2: "entity_2",
        entity_3: "entity_3",
        entity_4: "entity_4",
        entity_1_icon: "entity_1 icon",
        entity_2_icon: "entity_2 icon",
        entity_3_icon: "entity_3 icon",
        entity_4_icon: "entity_4 icon",
        entity_1_color: "entity_1 color (yellow_on…)",
        entity_2_color: "entity_2 color (yellow_on…)",
        entity_3_color: "entity_3 color (yellow_on…)",
        entity_4_color: "entity_4 color (yellow_on…)",
        entity_1_templates: "entity_1 templates",
        entity_2_templates: "entity_2 templates",
        entity_3_templates: "entity_3 templates",
        entity_4_templates: "entity_4 templates",
        entity_1_tap_action: "entity_1 tap_action",
        entity_2_tap_action: "entity_2 tap_action",
        entity_3_tap_action: "entity_3 tap_action",
        entity_4_tap_action: "entity_4 tap_action",
        entity_1_hold_action: "entity_1 hold_action",
        entity_2_hold_action: "entity_2 hold_action",
        entity_3_hold_action: "entity_3 hold_action",
        entity_4_hold_action: "entity_4 hold_action",
        entity_1_navigation_path: "entity_1 navigation_path",
        entity_2_navigation_path: "entity_2 navigation_path",
        entity_3_navigation_path: "entity_3 navigation_path",
        entity_4_navigation_path: "entity_4 navigation_path"
      }),
      computeHelper: C({
        entity: "Entity used for label (temperature / brightness / state).",
        color: "Colors large icon + name + label (like *_no_state).",
        label_use_brightness: "Only used when label_use_temperature is false.",
        entity_1_templates: "Comma-separated button-card templates, e.g. yellow_on, green_off.",
        entity_2_templates: "Comma-separated button-card templates, e.g. yellow_on, green_off.",
        entity_3_templates: "Comma-separated button-card templates, e.g. yellow_on, green_off.",
        entity_4_templates: "Comma-separated button-card templates, e.g. yellow_on, green_off.",
        entity_1_navigation_path: "Used when tap/hold action is navigate.",
        entity_2_navigation_path: "Used when tap/hold action is navigate.",
        entity_3_navigation_path: "Used when tap/hold action is navigate.",
        entity_4_navigation_path: "Used when tap/hold action is navigate."
      })
    };
  }
  static getStubConfig() {
    return {
      name: "Living Room",
      icon: "mdi:sofa-single",
      color: "blue",
      entity: "sensor.outside_temperature",
      label_use_temperature: !0,
      label_use_brightness: !1,
      entity_1: "light.bed_light",
      entity_1_color: "yellow",
      entity_2: "switch.decorative_lights",
      entity_2_color: "green",
      entity_3: "sensor.outside_temperature",
      entity_3_color: "red",
      entity_4: "media_player.living_room",
      entity_4_color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = e.tap_action, o = e.label_opts || {}, n = {
      entity_1: e.sub1 || {},
      entity_2: e.sub2 || {},
      entity_3: e.sub3 || {},
      entity_4: e.sub4 || {}
    }, r = ["entity_1", "entity_2", "entity_3", "entity_4"];
    this._slots = {};
    const a = {};
    for (const h of r) {
      const p = h.slice(-1), g = n[h] || {}, z = t[h] ?? g[h] ?? g[`entity_${p}`], P = ql(z, {
        flatColor: t[`entity_${p}_color`] || g[`entity_${p}_color`],
        flatIcon: t[`entity_${p}_icon`] || g[`entity_${p}_icon`],
        flatTemplates: t[`entity_${p}_templates`] || g[`entity_${p}_templates`],
        flatTap: t[`entity_${p}_tap_action`] || g[`entity_${p}_tap_action`],
        flatHold: t[`entity_${p}_hold_action`] || g[`entity_${p}_hold_action`],
        flatNavPath: t[`entity_${p}_navigation_path`] || g[`entity_${p}_navigation_path`]
      });
      if (P) {
        this._slots[h] = P, a[h] = P.entity_id, a[`entity_${p}_color`] = P.color, a[`entity_${p}_icon`] = P.icon, P.templates?.length && (a[`entity_${p}_templates`] = P.templates.join(", ")), P.tap_action?.action && (a[`entity_${p}_tap_action`] = P.tap_action.action), P.hold_action?.action && (a[`entity_${p}_hold_action`] = P.hold_action.action);
        const O = P.tap_action?.navigation_path || P.hold_action?.navigation_path;
        O && (a[`entity_${p}_navigation_path`] = O);
      }
    }
    const s = t.label_use_temperature ?? o.label_use_temperature, l = t.label_use_brightness ?? o.label_use_brightness;
    this._config = {
      icon: "mdi:sofa-single",
      ...t,
      ...a,
      label_use_temperature: s != null ? !!s : !0,
      label_use_brightness: l != null ? !!l : !1,
      label: t.label ?? o.label ?? void 0,
      navigation_path: t.navigation_path || i?.navigation_path,
      type: "custom:ulm-room-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 4,
      rows: 4,
      min_columns: 3,
      min_rows: 3,
      max_columns: 6,
      max_rows: 6
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = !!this._slots.entity_1, e = !!this._slots.entity_2, i = t ? "full" : e ? "three" : "minimal", o = this._config.entity ? this.hass.states[this._config.entity] : void 0, n = o?.state === "unavailable", r = this._config.color, a = r ? f(this, r) : void 0, s = a ? `rgba(${a}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.2)", l = a ? `rgba(${a}, 0.2)` : "rgba(var(--color-theme, 51, 51, 51), 0.05)", h = a ? `rgba(${a}, 1)` : void 0, p = t ? "10%" : e ? "24%" : "15.8%", g = t ? "-10%" : "-24%", z = `calc(100% - (12px + ${e ? 0 : 5}px))`, P = `calc(100% - (12px + ${!t && !e ? 5 : 0}px))`;
    return c`
      <ha-card
        class=${L({
      "ulm-room": !0,
      [`layout-${i}`]: !0
    })}
        @click=${this._cardTap}
      >
        <div
          class="name"
          style=${d({
      color: h,
      marginBottom: p,
      maxWidth: z
    })}
        >
          ${this._config.name || o?.attributes.friendly_name || ""}
        </div>

        <div
          class="label"
          style=${d({
      color: h,
      marginTop: g,
      maxWidth: P
    })}
        >
          ${this._label(o)}
        </div>

        <!-- grid placeholder for area 'i' (icon is absolutely positioned) -->
        <div class="icon-slot"></div>

        <!-- styles.img_cell from card_room.yaml — absolute on the card -->
        <button
          class="room-icon"
          style=${d({
      color: s,
      backgroundColor: l
    })}
          @click=${this._cardTap}
          aria-label="room"
        >
          <ha-icon
            .icon=${this._config.icon || o?.attributes.icon || "mdi:sofa-single"}
          ></ha-icon>
        </button>

        ${n ? c`<div class="notification">
              <ha-icon icon="mdi:exclamation"></ha-icon>
            </div>` : _}

        ${this._renderChip("entity_1", "i1")}
        ${this._renderChip("entity_2", "i2")}
        ${this._renderChip("entity_3", "i3")}
        ${this._renderChip("entity_4", "i4")}
      </ha-card>
    `;
  }
  /** Label logic copied from card_room.yaml */
  _label(t) {
    if (this._config?.label != null && this._config.label !== "")
      return this._config.label;
    if (!t) return "";
    if (this._config?.label_use_temperature) {
      const e = t.attributes.current_temperature ?? t.attributes.temperature ?? t.attributes.device_temperature ?? t.state ?? "-", i = t.attributes.unit_of_measurement || "°C";
      return `${e}${i}`;
    }
    return this._config?.label_use_brightness && t.state === "on" && t.attributes.brightness != null ? `${Math.round(Number(t.attributes.brightness) / 2.55) || 0}%` : this._capitalize(t.state);
  }
  _renderChip(t, e) {
    const i = this._slots[t];
    if (!i) return _;
    const o = this.hass?.states[i.entity_id], n = o?.state ?? "unavailable", r = Yl(n), a = i.color_mode || "on", s = !!i.color && (a === "always" || a === "on" && r || a === "off" && !r && n !== "unavailable"), l = i.color ? f(this, i.color) : void 0, h = s && l ? {
      color: `rgba(${l}, 1)`,
      backgroundColor: `rgba(${l}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, p = i.icon || o?.attributes.icon || this._domainIcon(i.entity_id);
    return c`
      <button
        class="chip ${e}"
        style=${d(h)}
        title=${o?.attributes.friendly_name || i.entity_id}
        @click=${(g) => this._runAction(g, i.tap_action, i.entity_id)}
        @contextmenu=${(g) => this._runAction(g, i.hold_action, i.entity_id)}
      >
        <ha-icon .icon=${p}></ha-icon>
      </button>
    `;
  }
  _domainIcon(t) {
    const e = t.split(".")[0];
    return {
      light: "mdi:lightbulb",
      switch: "mdi:power-socket-eu",
      fan: "mdi:fan",
      climate: "mdi:thermometer",
      sensor: "mdi:thermometer",
      binary_sensor: "mdi:motion-sensor",
      media_player: "mdi:speaker",
      cover: "mdi:window-shutter",
      input_boolean: "mdi:toggle-switch"
    }[e] || "mdi:circle-medium";
  }
  _runAction(t, e, i) {
    t.preventDefault(), t.stopPropagation();
    const o = e?.action || "none";
    if (o !== "none") {
      if (o === "toggle") {
        if (!this.hass) return;
        const n = e?.entity || i;
        this.hass.callService(n.split(".")[0], "toggle", {
          entity_id: n
        });
        return;
      }
      if (o === "more-info") {
        this._moreInfo(e?.entity || i);
        return;
      }
      if (o === "navigate" && e?.navigation_path) {
        this._navigate(e.navigation_path);
        return;
      }
      if ((o === "call-service" || o === "perform-action") && this.hass && (e?.service || e?.perform_action)) {
        const n = e.service || e.perform_action, [r, a] = n.includes(".") ? n.split(".", 2) : [i.split(".")[0], n];
        this.hass.callService(r, a, {
          entity_id: e.entity || i,
          ...e.data || e.service_data || {}
        });
      }
    }
  }
  _navigate(t) {
    const e = t.startsWith("/") ? t : `/${t}`;
    history.pushState(null, "", e), window.dispatchEvent(new Event("location-changed"));
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
};
Si.styles = w`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    /* styles.card from card_room.yaml — fill section cell (no empty gap below) */
    ha-card.ulm-room {
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 20px;
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 5px;
      overflow: hidden;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      display: grid;
      justify-items: center;
      --ha-card-border-width: 0px;
      /* For cqmin sizing so circles stay round when the cell isn't square */
      container-type: size;
    }

    /*
     * styles.grid from card_room.yaml:
     * entity_1 → 4×4 ; else → 3×3
     */
    ha-card.ulm-room.layout-full {
      grid-template-areas:
        "n n n i1"
        "l l l i2"
        "i i . i3"
        "i i . i4";
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }

    ha-card.ulm-room.layout-three {
      grid-template-areas:
        "n n i2"
        "l l i3"
        "i i i4";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }

    ha-card.ulm-room.layout-minimal {
      grid-template-areas:
        "n n n"
        "l l i3"
        "i i i4";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }

    /* styles.name */
    .name {
      grid-area: n;
      justify-self: start;
      align-self: end;
      font-weight: bold;
      font-size: 18px;
      margin-left: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.2;
      z-index: 2;
      pointer-events: none;
    }

    /* styles.label — filter: opacity(40%) */
    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 14px;
      filter: opacity(40%);
      margin-left: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.2;
      z-index: 2;
      pointer-events: none;
    }

    .icon-slot {
      grid-area: i;
    }

    /*
     * styles.img_cell — absolute over the whole card.
     * Offsets match YAML (%, relative to the card). Size uses cqmin so the
     * circle stays round when the section cell is resized non-square.
     */
    .room-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin-top: 25%;
      margin-left: -25%;
      width: 75cqmin;
      height: 75cqmin;
      aspect-ratio: 1 / 1;
      border: 0;
      border-radius: 50%;
      padding: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      z-index: 1;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    @supports not (width: 1cqmin) {
      .room-icon {
        width: min(75%, 75vh);
        height: auto;
        aspect-ratio: 1 / 1;
        max-height: 75%;
      }
    }

    /* size: 45% on card_room → icon ≈ 60% of the circle */
    .room-icon ha-icon {
      width: 60%;
      height: 60%;
      --mdc-icon-size: 100%;
      pointer-events: none;
    }

    /*
     * unavailable notification — absolute, same offsets as YAML
     */
    .notification {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin-top: 35%;
      margin-left: -35%;
      width: 24.5px;
      height: 24.5px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      background-color: rgba(var(--color-red, 245, 68, 54), 1);
      display: grid;
      place-items: center;
      line-height: 0;
      z-index: 3;
      pointer-events: none;
    }

    .notification ha-icon {
      width: 50%;
      height: 50%;
      --mdc-icon-size: 100%;
      color: var(--primary-background-color, #fff);
    }

    /*
     * custom_fields i1–i4 + widget_icon_room
     * Original: 80% of each grid cell. On a square card that is
     * 80%/4 = 20% (full) or 80%/3 ≈ 26.7% (three/minimal) of the card.
     * Size from cqmin so chips stay perfectly round when the cell isn't square.
     */
    .chip {
      border: 0;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      width: 20cqmin;
      height: 20cqmin;
      place-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      line-height: 0;
      cursor: pointer;
      box-shadow: none;
      z-index: 2;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    ha-card.ulm-room.layout-three .chip,
    ha-card.ulm-room.layout-minimal .chip {
      width: calc(80cqmin / 3);
      height: calc(80cqmin / 3);
    }

    @supports not (width: 1cqmin) {
      .chip {
        width: 80%;
        height: auto;
        max-height: 80%;
        aspect-ratio: 1 / 1;
      }
    }

    /* widget_icon_room: icon 50% of chip, centered */
    .chip ha-icon {
      width: 50%;
      height: 50%;
      --mdc-icon-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      pointer-events: none;
    }

    .chip.i1 {
      grid-area: i1;
    }
    .chip.i2 {
      grid-area: i2;
    }
    .chip.i3 {
      grid-area: i3;
    }
    .chip.i4 {
      grid-area: i4;
    }
  `;
hr([
  x({ attribute: !1 })
], Si.prototype, "hass", 2);
hr([
  y()
], Si.prototype, "_config", 2);
Si = hr([
  $("ulm-room-card")
], Si);
var Jl = Object.defineProperty, Zl = Object.getOwnPropertyDescriptor, pr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Zl(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Jl(e, i, n), n;
};
let zi = class extends v {
  static getConfigForm() {
    return {
      schema: [
        b("show_back"),
        Mc("chips", "Chips", [
          u("chip_1_entity", void 0, !1),
          u("chip_2_entity", void 0, !1),
          u("chip_3_entity", void 0, !1),
          u("chip_4_entity", void 0, !1)
        ])
      ],
      computeLabel: k({
        show_back: "Show back chip",
        chip_1_entity: "Chip 1 entity",
        chip_2_entity: "Chip 2 entity",
        chip_3_entity: "Chip 3 entity",
        chip_4_entity: "Chip 4 entity"
      })
    };
  }
  static getStubConfig() {
    return {
      show_back: !0,
      chip_1_entity: "weather.demo_weather_north",
      chip_2_entity: "sensor.outside_temperature"
    };
  }
  setConfig(t) {
    this._config = { show_back: !1, ...t, type: "custom:ulm-chips-card" };
  }
  getCardSize() {
    return 1;
  }
  _chips() {
    if (!this._config) return [];
    if (this._config.chips?.length) return this._config.chips;
    const t = [];
    this._config.show_back && t.push({ type: "back", icon: "mdi:arrow-left" });
    for (const e of [
      "chip_1_entity",
      "chip_2_entity",
      "chip_3_entity",
      "chip_4_entity"
    ]) {
      const i = this._config[e];
      i && t.push({ type: "entity", entity: i, tap_action: "more-info" });
    }
    return t;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._chips();
    return c`
      <div class="chips">
        ${t.map((e) => this._renderChip(e))}
      </div>
    `;
  }
  _renderChip(t) {
    if (t.type === "spacer")
      return c`<div class="spacer"></div>`;
    if (t.type === "back")
      return c`
        <button class="chip" @click=${() => history.back()}>
          <ha-icon .icon=${t.icon || "mdi:arrow-left"}></ha-icon>
        </button>
      `;
    const e = t.entity, i = e ? this.hass?.states[e] : void 0, o = t.icon || i?.attributes.icon || "mdi:checkbox-blank-circle", n = t.name || (i ? i.attributes.unit_of_measurement ? `${i.state}${i.attributes.unit_of_measurement}` : i.state : "?");
    return c`
      <button class="chip" @click=${() => this._handleChip(t)}>
        <ha-icon .icon=${o}></ha-icon>
        <span>${n}</span>
      </button>
    `;
  }
  _handleChip(t) {
    if (!this.hass || !t.entity) {
      t.navigation_path && (history.pushState(null, "", t.navigation_path), window.dispatchEvent(new Event("location-changed")));
      return;
    }
    if (t.tap_action === "toggle") {
      const e = t.entity.split(".")[0];
      this.hass.callService(e, "toggle", { entity_id: t.entity });
      return;
    }
    if (t.tap_action === "navigate" && t.navigation_path) {
      history.pushState(null, "", t.navigation_path), window.dispatchEvent(new Event("location-changed"));
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t.entity }
      })
    );
  }
};
zi.styles = w`
    :host {
      display: block;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 0;
      border-radius: 999px;
      padding: 8px 12px;
      background: var(--card-background-color, #fafafa);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }
    .chip span {
      font-size: 13px;
      font-weight: 500;
    }
    .spacer {
      flex: 1;
    }
  `;
pr([
  x({ attribute: !1 })
], zi.prototype, "hass", 2);
pr([
  y()
], zi.prototype, "_config", 2);
zi = pr([
  $("ulm-chips-card")
], zi);
var Xl = Object.defineProperty, Ql = Object.getOwnPropertyDescriptor, gr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Ql(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Xl(e, i, n), n;
};
let Ei = class extends v {
  static getConfigForm() {
    return {
      schema: [m("name"), m("label")],
      computeLabel: k({
        name: "Title (name)",
        label: "Subtitle (label)"
      }),
      computeHelper: C({
        name: "Main title — at least one of title or subtitle is required.",
        label: "Optional subtitle under the title."
      })
    };
  }
  static getStubConfig() {
    return { name: "Living Room", label: "Light" };
  }
  setConfig(t) {
    const e = t, i = t.name ?? e.ulm_card_title_name ?? e.title, o = t.label ?? e.ulm_card_title_label ?? e.subtitle;
    if (!i && !o)
      throw new Error("Please define a title (name) and/or subtitle (label)");
    this._config = {
      ...t,
      name: i,
      label: o,
      type: "custom:ulm-title-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6
    };
  }
  render() {
    return this._config ? c`
      <div class="title">
        ${this._config.name ? c`<div class="name">${this._config.name}</div>` : _}
        ${this._config.label ? c`<div class="label">${this._config.label}</div>` : _}
      </div>
    ` : _;
  }
};
Ei.styles = w`
    :host {
      display: block;
      height: auto !important;
      align-self: start;
      background: transparent;
      box-shadow: none;
    }

    /* card_title.yaml — transparent, no chrome */
    .title {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content;
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;
      height: auto;
      width: auto;
      margin: 6px 0 0 18px;
      padding: 6px;
      box-sizing: border-box;
    }

    .name {
      justify-self: start;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.2;
      color: var(--primary-text-color);
    }

    .label {
      justify-self: start;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.2;
      opacity: 0.4;
      color: var(--primary-text-color);
    }
  `;
gr([
  x({ attribute: !1 })
], Ei.prototype, "hass", 2);
gr([
  y()
], Ei.prototype, "_config", 2);
Ei = gr([
  $("ulm-title-card")
], Ei);
var td = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, $o = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? ed(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && td(e, i, n), n;
};
const pn = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5",
  "entity_6",
  "entity_7"
], id = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "purple"
], Ma = [
  "blue",
  "yellow",
  "green",
  "purple",
  "red",
  "pink",
  "yellow"
], Oa = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    hello: "Hello"
  },
  it: {
    morning: "Buongiorno",
    afternoon: "Buon pomeriggio",
    evening: "Buonasera",
    hello: "Ciao"
  }
}, gn = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️",
  default: "🌡️"
};
function Ft(t) {
  return {
    type: "expandable",
    name: `entity_${t}`,
    title: `Shortcut ${t}`,
    schema: [
      {
        type: "grid",
        name: "",
        flatten: !0,
        schema: [
          { name: "name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } }
        ]
      },
      {
        name: "nav_path",
        selector: { text: { type: "text" } }
      },
      {
        name: "color",
        selector: {
          select: {
            mode: "dropdown",
            options: id.map((e) => ({ value: e, label: e }))
          }
        }
      },
      { name: "entity_id", selector: { entity: {} } },
      { name: "state", selector: { text: {} } },
      {
        name: "service_data",
        selector: { text: { multiline: !0, type: "text" } }
      }
    ]
  };
}
function od(t) {
  if (!(t == null || t === "")) {
    if (typeof t == "object" && !Array.isArray(t))
      return t;
    if (typeof t == "string")
      try {
        const e = JSON.parse(t);
        if (e && typeof e == "object" && !Array.isArray(e))
          return e;
      } catch {
      }
  }
}
let Jt = class extends v {
  constructor() {
    super(...arguments), this._randomColors = {}, this._localCollapsed = !1, this._toggleCollapse = (t) => {
      t.preventDefault(), t.stopPropagation();
      const e = this._collapseEntity();
      if (e && this.hass) {
        this.hass.callService("input_boolean", "toggle", {
          entity_id: e
        }), this.updateComplete.then(() => this._applyLayoutSize());
        return;
      }
      this._localCollapsed = !this._localCollapsed, this.updateComplete.then(() => this._applyLayoutSize());
    };
  }
  /** HA built-in visual editor (ha-form) — see developers.home-assistant.io */
  static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        {
          name: "ulm_weather",
          selector: { entity: { domain: "weather" } }
        },
        {
          name: "ulm_card_welcome_scenes_collapse",
          selector: { entity: { domain: "input_boolean" } }
        },
        {
          name: "ulm_language",
          selector: { text: {} }
        },
        {
          type: "grid",
          name: "",
          flatten: !0,
          schema: [
            { name: "ulm_morning", selector: { text: {} } },
            { name: "ulm_afternoon", selector: { text: {} } },
            { name: "ulm_evening", selector: { text: {} } },
            { name: "ulm_hello", selector: { text: {} } }
          ]
        },
        Ft(1),
        Ft(2),
        Ft(3),
        Ft(4),
        Ft(5),
        Ft(6),
        Ft(7)
      ],
      computeLabel: (t) => ({
        ulm_weather: "Weather (ulm_weather)",
        ulm_card_welcome_scenes_collapse: "Collapse toggle (ulm_card_welcome_scenes_collapse)",
        ulm_language: "Language (ulm_language)",
        ulm_morning: "Morning",
        ulm_afternoon: "Afternoon",
        ulm_evening: "Evening",
        ulm_hello: "Hello",
        name: "Name",
        icon: "Icon",
        nav_path: "Navigation path",
        color: "Icon color",
        entity_id: "Entity (optional)",
        state: "Active state (optional)",
        service_data: "service_data (JSON)"
      })[t.name || ""] || void 0,
      computeHelper: (t) => {
        switch (t.name) {
          case "ulm_weather":
            return "Weather entity for the top chip (emoji + date).";
          case "ulm_card_welcome_scenes_collapse":
            return "Optional input_boolean. When set, chevron toggles it and hides pills while on.";
          case "ulm_language":
            return 'BCP-47 tag, e.g. "it" or "en-US".';
          case "nav_path":
            return "View path on tap, e.g. /lovelace/lights. Pure navigation — no toggle.";
          case "color":
            return "Color of the icon circle only. Pill background stays white.";
          case "entity_id":
            return "Optional. Leave empty for navigation-only shortcuts.";
          case "service_data":
            return 'JSON object passed to scene/script turn_on, e.g. {"brightness": 50}.';
          default:
            return;
        }
      }
    };
  }
  static getStubConfig() {
    return {
      ulm_weather: "weather.demo_weather_north",
      entity_1: {
        name: "House",
        icon: "mdi:home",
        color: "blue",
        nav_path: "/lovelace/0"
      },
      entity_2: {
        name: "Lights",
        icon: "mdi:lightbulb",
        color: "yellow",
        nav_path: "/lovelace/0"
      },
      entity_3: {
        name: "Secure",
        icon: "mdi:shield",
        color: "green",
        nav_path: "/lovelace/0"
      },
      entity_4: {
        name: "Lab",
        icon: "mdi:view-dashboard",
        color: "purple",
        nav_path: "/lovelace/0"
      },
      entity_5: {
        name: "Lab",
        icon: "mdi:flask",
        color: "red",
        nav_path: "/lovelace/0"
      }
    };
  }
  setConfig(t) {
    const i = t.greetings || {}, o = {
      ...t,
      ulm_morning: t.ulm_morning ?? i.ulm_morning,
      ulm_afternoon: t.ulm_afternoon ?? i.ulm_afternoon,
      ulm_evening: t.ulm_evening ?? i.ulm_evening,
      ulm_hello: t.ulm_hello ?? i.ulm_hello,
      type: "custom:ulm-welcome-card"
    };
    for (const r of pn) {
      const a = o[r];
      if (!a || typeof a != "object") continue;
      const s = {};
      for (const [l, h] of Object.entries(a))
        h === "" || h == null || (s[l] = h);
      Object.keys(s).length ? o[r] = s : delete o[r];
    }
    this._config = o;
    const n = { ...this._randomColors };
    pn.forEach((r, a) => {
      const s = o[r];
      s && !s.color && !n[r] && (n[r] = Ma[a % Ma.length]);
    }), this._randomColors = n;
  }
  /** Masonry: 1 ≈ 50px */
  getCardSize() {
    return this._isCollapsed() ? 2 : 4;
  }
  /**
   * Sections view — omit `rows` so HA ignores the row grid and sizes
   * to content (avoids empty space under the card).
   */
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6
    };
  }
  _collapseEntity() {
    const t = this._config?.ulm_card_welcome_scenes_collapse;
    return t && typeof t == "string" && t.length ? t : void 0;
  }
  _isCollapsed() {
    const t = this._collapseEntity();
    return t && this.hass?.states[t] ? this.hass.states[t].state === "on" : this._localCollapsed;
  }
  _langPack() {
    const t = (this._config?.ulm_language || this.hass?.language || "en").toLowerCase();
    return Oa[t.split("-")[0]] || Oa.en;
  }
  /** First name only, Capitalized (e.g. "alessandro sabbadini" → "Alessandro") */
  _userName() {
    const t = this.hass?.user?.name?.trim() || "there", e = t.split(/\s+/)[0] || t;
    return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
  }
  _configuredPills() {
    return pn.map((t) => {
      const e = this._config[t];
      return !e || !e.entity_id && !e.nav_path && !e.name ? null : { key: t, conf: e };
    }).filter(Boolean);
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._isCollapsed(), e = this._configuredPills();
    return c`
      <ha-card
        class=${t ? "ulm-welcome collapsed" : "ulm-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${t || !e.length ? _ : c`
              <div class="pills">
                ${e.map(({ key: i, conf: o }) => this._renderPill(i, o))}
              </div>
            `}
      </ha-card>
    `;
  }
  _renderTopbar() {
    const t = this._config.ulm_weather, e = t ? this.hass.states[t] : void 0, i = this._isCollapsed(), o = this._config.ulm_language || this.hass.language || void 0, n = (/* @__PURE__ */ new Date()).toLocaleDateString(o, {
      month: "short",
      day: "numeric"
    }), r = gn[e?.state || ""] || gn.default, a = e ? `${r} ${n}` : `${gn.default} ${n}`;
    return c`
      <div class="topbar">
        <button
          type="button"
          class="chip round"
          @click=${this._toggleCollapse}
          title=${i ? "Expand" : "Collapse"}
        >
          <ha-icon
            .icon=${i ? "mdi:chevron-down" : "mdi:chevron-up"}
          ></ha-icon>
        </button>

        <button
          class="chip weather"
          ?disabled=${!e}
          @click=${() => t && this._moreInfo(t)}
        >
          <span>${a}</span>
        </button>

        <button
          class="chip round"
          @click=${() => this._navigate("/config/dashboard")}
          title="Settings"
        >
          <ha-icon icon="mdi:cog-outline"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderGreeting() {
    const t = this._langPack(), e = (/* @__PURE__ */ new Date()).getHours();
    let i = this._config.ulm_hello || t.hello;
    return e >= 18 ? i = this._config.ulm_evening || t.evening : e >= 12 ? i = this._config.ulm_afternoon || t.afternoon : e >= 5 && (i = this._config.ulm_morning || t.morning), c`
      <div class="greeting">
        <div class="line">${i},</div>
        <div class="line">${this._userName()}!</div>
      </div>
    `;
  }
  _renderPill(t, e) {
    const i = e.entity_id ? this.hass.states[e.entity_id] : void 0, o = e.color || this._randomColors[t] || "blue", n = f(this, o), r = e.name || i?.attributes.friendly_name || e.entity_id || "", a = e.icon || i?.attributes.icon || "mdi:circle-medium";
    return c`
      <button
        class="pill"
        style=${d({
      "--pill-color": `rgb(${n})`,
      "--pill-bg": `rgba(${n}, 0.2)`
    })}
        @click=${() => this._pillAction(e)}
      >
        <span class="pill-icon">
          <ha-icon .icon=${a}></ha-icon>
        </span>
        <span class="pill-name">${r}</span>
      </button>
    `;
  }
  _pillAction(t) {
    if (!this.hass) return;
    if (t.nav_path) {
      this._navigate(t.nav_path);
      return;
    }
    if (!t.entity_id) return;
    const e = t.entity_id, i = od(t.service_data) || {};
    if (e.startsWith("scene.")) {
      this.hass.callService("scene", "turn_on", {
        entity_id: e,
        ...i
      });
      return;
    }
    if (e.startsWith("script.")) {
      this.hass.callService("script", "turn_on", {
        entity_id: e,
        ...i
      });
      return;
    }
    if (e.startsWith("input_select.") && t.state) {
      this.hass.callService("input_select", "select_option", {
        entity_id: e,
        option: t.state,
        ...i
      });
      return;
    }
    if (e.startsWith("media_player.")) {
      this.hass.callService("media_player", "media_play_pause", {
        entity_id: e,
        ...i
      });
      return;
    }
    this._moreInfo(e);
  }
  /** After collapse/expand, drop forced row spans so auto height reflows */
  _applyLayoutSize() {
    this.style.height = "auto", this.style.alignSelf = "start", this.style.removeProperty("--row-size");
    let t = this.parentElement;
    for (let e = 0; e < 4 && t && (t.style.height = "auto", t.style.alignSelf = "start", t.style.removeProperty("--row-size"), t.style.removeProperty("grid-row-end"), !(t.tagName.includes("HUI-CARD") || t.classList.contains("card"))); e++)
      t = t.parentElement;
    this.dispatchEvent(
      new CustomEvent("iron-resize", { bubbles: !0, composed: !0 })
    ), window.dispatchEvent(new Event("resize"));
  }
  firstUpdated() {
    this._applyLayoutSize(), this._syncDarkAttr();
  }
  updated(t) {
    t.has("_localCollapsed") && this._applyLayoutSize(), t.has("hass") && (this._syncDarkAttr(), this._collapseEntity() && this._applyLayoutSize());
  }
  /** Original chips/pills use a stronger shadow when hass.themes.darkMode */
  _syncDarkAttr() {
    this.hass?.themes?.darkMode ? this.setAttribute("dark", "") : this.removeAttribute("dark");
  }
  _navigate(t) {
    const e = t.startsWith("/") ? t : `/${t}`;
    window.history.pushState(null, "", e), window.dispatchEvent(
      new CustomEvent("location-changed", {
        detail: { replace: !1 },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
Jt.styles = w`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      margin: 0;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
    }

    ha-card.ulm-welcome {
      height: auto;
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      /* Original card padding — no extra HA card padding */
      padding: 10px;
      margin: 0;
      background: var(--card-background-color, #fafafa);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 0;
      transition: none;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      gap: 8px;
      flex-shrink: 0;
    }

    .chip {
      border: 0;
      cursor: pointer;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: var(--card-background-color, #fff);
      /* chips.yaml — light: var(--box-shadow); dark: hard shadow */
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      /* Original chips template */
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
      height: 36px;
      border-radius: 18px;
      width: auto;
    }

    :host([dark]) .chip {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .chip:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .chip.round {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      padding: 0;
    }

    .chip.round ha-icon {
      --mdc-icon-size: 18px;
      pointer-events: none;
    }

    /* Welcome topbar overrides chip width to 100px */
    .chip.weather {
      width: 100px;
      min-width: 100px;
      padding: 0 6px;
      white-space: nowrap;
    }

    .chip.weather span {
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
    }

    .greeting {
      /* Original item2: margin-left 16px, padding-bottom 8px */
      margin: 0;
      padding: 0 0 8px 16px;
      text-align: left;
      flex-shrink: 0;
    }

    .greeting .line {
      font-weight: bold;
      font-size: 24px;
      line-height: 1.15;
      color: var(--primary-text-color);
    }

    .pills {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      flex-wrap: nowrap;
      gap: 12px;
      margin: 0;
      padding: 0;
      flex-shrink: 0;
    }

    .pills .empty {
      opacity: 0.5;
      font-size: 12px;
      text-align: center;
      width: 100%;
      padding: 16px;
    }

    /* card_scenes_pill_welcome — width 52px, height 84px, row-gap 12px */
    .pill {
      width: 52px;
      min-width: 52px;
      height: 84px;
      box-sizing: border-box;
      border: 0;
      border-radius: 50px;
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 5px;
      cursor: pointer;
      color: inherit;
      font: inherit;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: none;
    }

    :host([dark]) .pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:hover,
    .pill:focus,
    .pill:active {
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      outline: none;
    }

    .pill-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pill-color);
    }

    /*
     * Original name styles + item2 card:
     * padding-bottom 7px, padding 0 5px 5px, margin-top -5px
     */
    .pill-name {
      font-weight: bold;
      font-size: 9.5px;
      line-height: 1.1;
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: -5px;
      padding: 0 5px 7px;
      box-sizing: border-box;
    }
  `;
$o([
  x({ attribute: !1 })
], Jt.prototype, "hass", 2);
$o([
  y()
], Jt.prototype, "_config", 2);
$o([
  y()
], Jt.prototype, "_randomColors", 2);
$o([
  y()
], Jt.prototype, "_localCollapsed", 2);
Jt = $o([
  $("ulm-welcome-card")
], Jt);
var nd = Object.defineProperty, rd = Object.getOwnPropertyDescriptor, fr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? rd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && nd(e, i, n), n;
};
const ad = /* @__PURE__ */ new Set(["geen", "none", ""]);
function yt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (typeof o == "string" && o) return o;
  }
}
function fn(t, e) {
  if (e)
    return t.states[e]?.state;
}
function Oo(t) {
  return t === void 0 ? !0 : ad.has(t.toLowerCase());
}
function Na(t) {
  if (!t) return !1;
  const e = t.toLowerCase();
  return e === "glas" || e === "glass";
}
let Pi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      if (t.stopPropagation(), !this._config) return;
      const e = this._config.ulm_card_ophaling_vandaag || this._config.ulm_card_ophaling_morgen || this._config.ulm_card_datum_rest;
      e && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: e }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("ulm_card_ophaling_vandaag", void 0, !1),
        u("ulm_card_ophaling_morgen", void 0, !1),
        u("ulm_card_datum_rest", void 0, !1),
        u("ulm_card_datum_papier", void 0, !1),
        u("ulm_card_datum_pmd", void 0, !1),
        u("ulm_card_datum_gft", void 0, !1),
        u("ulm_card_datum_glas", void 0, !1),
        m("ulm_ophaling"),
        m("ulm_volgende_ophaling"),
        m("name"),
        S("icon")
      ],
      computeLabel: k({
        ulm_card_ophaling_vandaag: "Collection today",
        ulm_card_ophaling_morgen: "Collection tomorrow",
        ulm_card_datum_rest: "Next residual waste date",
        ulm_card_datum_papier: "Next paper date",
        ulm_card_datum_pmd: "Next PMD date",
        ulm_card_datum_gft: "Next organic (GFT) date",
        ulm_card_datum_glas: "Next glass date",
        ulm_ophaling: "Title when collecting soon",
        ulm_volgende_ophaling: "Title for upcoming list",
        name: "Name override",
        icon: "Icon override"
      }),
      computeHelper: C({
        ulm_card_ophaling_vandaag: `State "None" / "Geen" = no collection. Other values show as today's fraction.`,
        ulm_ophaling: 'Default: "Garbage collection!"',
        ulm_volgende_ophaling: 'Default: "Next collections"'
      })
    };
  }
  static getStubConfig() {
    return {
      ulm_card_ophaling_vandaag: "sensor.afval_vandaag",
      ulm_card_ophaling_morgen: "sensor.afval_morgen",
      ulm_card_datum_rest: "sensor.afval_datum_rest",
      ulm_card_datum_papier: "sensor.afval_datum_papier",
      ulm_card_datum_pmd: "sensor.afval_datum_pmd",
      ulm_card_datum_gft: "sensor.afval_datum_gft",
      ulm_card_datum_glas: "sensor.afval_datum_glas",
      ulm_ophaling: "Garbage collection!",
      ulm_volgende_ophaling: "Next collections",
      icon: "mdi:delete"
    };
  }
  setConfig(t) {
    const e = t;
    this._config = {
      ...t,
      ulm_card_ophaling_vandaag: yt(e, "ulm_card_ophaling_vandaag"),
      ulm_card_ophaling_morgen: yt(e, "ulm_card_ophaling_morgen"),
      ulm_card_datum_rest: yt(e, "ulm_card_datum_rest"),
      ulm_card_datum_papier: yt(e, "ulm_card_datum_papier"),
      ulm_card_datum_pmd: yt(e, "ulm_card_datum_pmd"),
      ulm_card_datum_gft: yt(e, "ulm_card_datum_gft"),
      ulm_card_datum_glas: yt(e, "ulm_card_datum_glas"),
      name: t.name,
      ulm_ophaling: yt(e, "ulm_ophaling"),
      ulm_volgende_ophaling: yt(e, "ulm_volgende_ophaling"),
      icon: t.icon || "mdi:delete",
      type: "custom:ulm-custom-card-afvalophaling-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = fn(this.hass, this._config.ulm_card_ophaling_vandaag), e = fn(this.hass, this._config.ulm_card_ophaling_morgen), i = !Oo(t) || !Oo(e), o = Na(t) || Na(e), n = t === "unavailable" || e === "unavailable";
    let r = "theme", a = this._config.icon || "mdi:delete";
    i && (r = "green", a = "mdi:recycle"), o && (r = "blue", a = "mdi:bottle-wine-outline"), n && (r = "red");
    const s = this._config.ulm_ophaling || this._config.name || "Garbage collection!", l = this._config.ulm_volgende_ophaling || "Next collections", h = this._config.name || (i ? s : l), p = this._labelLines(t, e), g = r === "theme" ? null : f(this, r === "red" ? "red" : r), z = r === "theme" ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    } : {
      color: `rgba(${g}, 1)`,
      backgroundColor: `rgba(${g}, 0.2)`
    };
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-afvalophaling": !0,
      collecting: i
    })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(z)}>
            <ha-icon .icon=${a}></ha-icon>
            ${n ? c`<span class="badge" aria-hidden="true"
                  ><ha-icon icon="mdi:help"></ha-icon
                ></span>` : _}
          </div>
          <div class="info-btn">
            <div class="name">${h}</div>
            <div class="label">
              ${p.length <= 1 ? p[0] || _ : p.map(
      (P) => c`<div class="line">${P}</div>`
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _labelLines(t, e) {
    if (!this._config || !this.hass) return [];
    if (!Oo(t) && t !== void 0)
      return [this._localizeFraction(t)];
    if (!Oo(e) && e !== void 0)
      return [this._localizeFraction(e)];
    const i = [
      [this._config.ulm_card_datum_rest, "Residual"],
      [this._config.ulm_card_datum_papier, "Paper"],
      [this._config.ulm_card_datum_pmd, "PMD"],
      [this._config.ulm_card_datum_gft, "Organic"],
      [this._config.ulm_card_datum_glas, "Glass"]
    ], o = [];
    for (const [n, r] of i) {
      if (!n) continue;
      const a = fn(this.hass, n);
      a !== void 0 && o.push(`${r} • ${a}`);
    }
    return o;
  }
  _localizeFraction(t) {
    return {
      restafval: "Residual",
      rest: "Residual",
      papier: "Paper",
      paper: "Paper",
      pmd: "PMD",
      gft: "Organic",
      organic: "Organic",
      glas: "Glass",
      glass: "Glass"
    }[t.toLowerCase()] || t;
  }
};
Pi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-afvalophaling {
      height: auto;
      cursor: pointer;
    }

    /* icon_info: name on top row, label under — shared .row + .info-btn */
    .icon-btn {
      overflow: visible;
    }

    .name {
      align-self: end;
      margin-bottom: 4px;
    }

    .label {
      align-self: start;
      font-weight: bold;
      white-space: normal;
      overflow: visible;
      text-overflow: unset;
      line-height: 1.35;
    }

    .label .line + .line {
      margin-top: 1px;
    }

    .badge {
      left: 28px;
      top: -2px;
      border: 2px solid var(--card-background-color, #fafafa);
      background: rgba(var(--color-red, 245, 68, 54), 1);
      z-index: 2;
    }

    .badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }
  `;
fr([
  x({ attribute: !1 })
], Pi.prototype, "hass", 2);
fr([
  y()
], Pi.prototype, "_config", 2);
Pi = fr([
  $("ulm-custom-card-afvalophaling-card")
], Pi);
var sd = Object.defineProperty, cd = Object.getOwnPropertyDescriptor, br = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? cd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && sd(e, i, n), n;
};
function vt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Li = class extends v {
  constructor() {
    super(...arguments), this._toggle = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config) return;
      const e = this._config.entity.split(".")[0];
      this.hass.callService(e, "toggle", {
        entity_id: this._config.entity
      });
    }, this._moreInfoEntity = (t) => {
      t.stopPropagation(), this._fireMoreInfo(this._config?.entity);
    }, this._moreInfoDatetime = (t) => {
      t.stopPropagation(), this._fireMoreInfo(this._config?.datetime);
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["input_boolean", "switch"]),
        u("datetime", "input_datetime"),
        m("name"),
        S("icon"),
        A("color"),
        b("force_background_color"),
        b("horizontal"),
        b("collapse"),
        M("step")
      ],
      computeLabel: k({
        entity: "Alarm toggle (ulm_card_alarm_time entity)",
        datetime: "Alarm time (ulm_card_alarm_time_datetime)",
        name: "Name (ulm_card_alarm_time_name)",
        icon: "Icon (ulm_card_alarm_time_icon)",
        color: "Color (ulm_card_alarm_time_color)",
        force_background_color: "Force background when on",
        horizontal: "Horizontal layout",
        collapse: "Collapse controls when off",
        step: "Minute step (+/-)"
      }),
      computeHelper: C({
        entity: "Icon toggles on/off; name opens more-info.",
        datetime: "input_datetime with has_time. Shown with +/- when alarm is on.",
        step: "Default 15. Hidden in horizontal mode (time only).",
        collapse: "When off, hide the time row entirely."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_boolean.alarm_weekday",
      datetime: "input_datetime.alarm_weekday_time",
      color: "blue",
      force_background_color: !1,
      horizontal: !1,
      collapse: !1,
      step: 15,
      icon: "mdi:alarm"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || vt(e, "ulm_card_alarm_time_entity");
    if (!i) throw new Error("Please define an entity");
    const o = vt(e, "step", "ulm_card_alarm_time_step"), n = typeof o == "number" ? o : Number.parseInt(String(o ?? "15"), 10) || 15;
    this._config = {
      ...t,
      entity: i,
      datetime: vt(e, "datetime", "ulm_card_alarm_time_datetime"),
      name: vt(e, "name", "ulm_card_alarm_time_name") ?? t.name,
      icon: vt(e, "icon", "ulm_card_alarm_time_icon") ?? t.icon,
      color: vt(e, "color", "ulm_card_alarm_time_color") || "blue",
      force_background_color: !!(vt(
        e,
        "force_background_color",
        "ulm_card_alarm_time_force_background_color"
      ) ?? !1),
      horizontal: !!(vt(e, "horizontal", "ulm_card_alarm_time_horizontal") ?? !1),
      collapse: !!(vt(e, "collapse", "ulm_card_alarm_time_collapse") ?? !1),
      step: n,
      type: "custom:ulm-custom-card-alarm-time-card"
    };
  }
  getCardSize() {
    if (!this._config || !this.hass) return 1;
    const t = this.hass.states[this._config.entity]?.state === "on";
    return this._config.collapse && !t || this._config.horizontal ? 1 : t || !this._config.collapse ? 2 : 1;
  }
  getGridOptions() {
    const t = !!this._config?.horizontal;
    return {
      columns: t ? 12 : 6,
      min_columns: t ? 6 : 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = f(this, i), n = !!(e && this._config.force_background_color), r = R(
      this,
      e,
      i,
      null,
      !1,
      n
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:alarm", l = e ? "On" : t.state === "off" ? "Off" : t.state, h = e, p = !!this._config.collapse && !e, g = !!this._config.horizontal, z = n ? { backgroundColor: `rgba(${o}, var(--opacity-bg, 1))` } : {}, P = n ? { color: "rgb(250, 250, 250)" } : {}, T = (this._config.datetime ? this.hass.states[this._config.datetime] : void 0)?.state ?? "—", N = n && !this.hass.themes?.darkMode ? "rgba(250,250,250,0.8)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)", U = n && !this.hass.themes?.darkMode && e ? `rgba(${o}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.9)", F = {
      backgroundColor: N,
      color: U
    };
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-alarm-time": !0,
      active: e,
      "force-bg": n,
      horizontal: g,
      collapsed: p
    })}
        style=${d(z)}
      >
        <div class="stack ${g ? "horizontal" : ""}">
          <div class="row">
            <button
              class="icon-btn"
              style=${d(r)}
              @click=${this._toggle}
            >
              <ha-icon .icon=${s}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfoEntity}>
              <div class="name" style=${d(P)}>${a}</div>
              <div class="label" style=${d(P)}>${l}</div>
            </button>
          </div>

          ${h && !p && this._config.datetime ? c`
                <div
                  class=${L({
      widgets: !0,
      "time-only": g
    })}
                >
                  ${g ? _ : c`
                        <button
                          class="widget-btn"
                          style=${d(F)}
                          @click=${() => this._adjust(-1)}
                          aria-label="Decrease alarm time"
                        >
                          <ha-icon icon="mdi:minus"></ha-icon>
                        </button>
                      `}
                  <button
                    class="widget-btn time"
                    style=${d(F)}
                    @click=${this._moreInfoDatetime}
                  >
                    <span class="time-label">${T}</span>
                  </button>
                  ${g ? _ : c`
                        <button
                          class="widget-btn"
                          style=${d(F)}
                          @click=${() => this._adjust(1)}
                          aria-label="Increase alarm time"
                        >
                          <ha-icon icon="mdi:plus"></ha-icon>
                        </button>
                      `}
                </div>
              ` : _}
        </div>
      </ha-card>
    `;
  }
  _fireMoreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
  /** +/- step minutes on the input_datetime time */
  _adjust(t) {
    if (!this.hass || !this._config?.datetime) return;
    const e = this.hass.states[this._config.datetime];
    if (!e) return;
    const i = this._config.step || 15, o = String(e.state).split(":");
    if (o.length < 2) return;
    let n = Number.parseInt(o[0], 10), r = Number.parseInt(o[1], 10);
    const a = Number.parseInt(o[2] || "0", 10) || 0;
    if (Number.isNaN(n) || Number.isNaN(r)) return;
    let s = n * 60 + r + t * i;
    s = (s % 1440 + 1440) % 1440, n = Math.floor(s / 60), r = s % 60;
    const l = `${n}:${String(r).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
    this.hass.callService("input_datetime", "set_datetime", {
      entity_id: this._config.datetime,
      time: l
    });
  }
};
Li.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-alarm-time {
      height: auto;
    }

    .stack {
      gap: 12px;
    }

    .stack.horizontal {
      align-items: stretch;
    }

    .stack.horizontal .row {
      flex: 1;
      min-width: 0;
    }

    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    .widgets.time-only {
      grid-template-columns: 1fr;
      flex: 1;
    }

    .widget-btn.time {
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
    }

    .time-label {
      line-height: 1;
    }
  `;
br([
  x({ attribute: !1 })
], Li.prototype, "hass", 2);
br([
  y()
], Li.prototype, "_config", 2);
Li = br([
  $("ulm-custom-card-alarm-time-card")
], Li);
var ld = Object.defineProperty, dd = Object.getOwnPropertyDescriptor, ko = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? dd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && ld(e, i, n), n;
};
const ud = [
  { value: "radialBar", label: "radialBar" },
  { value: "donut", label: "donut" },
  { value: "pie", label: "pie" },
  { value: "line", label: "line" },
  { value: "scatter", label: "scatter" }
], Ae = "apexcharts-card";
function Y(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function bn(t, e) {
  return typeof t == "string" && St.includes(t) ? t : e;
}
function yn(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
function _d(t) {
  const e = t.split(",").map((i) => Number.parseInt(i.trim(), 10));
  return e.length < 3 || e.some((i) => !Number.isFinite(i)) ? "#3D5AFE" : `#${e.slice(0, 3).map((i) => Math.max(0, Math.min(255, i)).toString(16).padStart(2, "0")).join("")}`;
}
let Zt = class extends v {
  constructor() {
    super(...arguments), this._apexMissing = !1, this._chartKey = "", this._chartLoading = !1, this._chartDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        H("chart_type", [...ud]),
        m("graph_span"),
        u("entity_1"),
        u("entity_2", void 0, !1),
        u("entity_3", void 0, !1),
        m("name_1"),
        m("name_2"),
        m("name_3"),
        S("icon_1"),
        S("icon_2"),
        S("icon_3"),
        A("color_1"),
        A("color_2"),
        A("color_3"),
        M("max_1"),
        M("max_2"),
        M("max_3")
      ],
      computeLabel: k({
        chart_type: "Chart type",
        graph_span: "Graph span",
        entity_1: "Entity 1",
        entity_2: "Entity 2",
        entity_3: "Entity 3",
        name_1: "Name 1",
        name_2: "Name 2",
        name_3: "Name 3",
        icon_1: "Icon 1",
        icon_2: "Icon 2",
        icon_3: "Icon 3",
        color_1: "Color 1",
        color_2: "Color 2",
        color_3: "Color 3",
        max_1: "Max value 1",
        max_2: "Max value 2",
        max_3: "Max value 3"
      }),
      computeHelper: C({
        chart_type: "Requires HACS apexcharts-card: line, scatter, pie, donut, radialBar",
        graph_span: "Time span for line/scatter (e.g. 1d, 1h, 12min)",
        max_1: "Used as series max for radialBar (default 100)"
      })
    };
  }
  static getStubConfig() {
    return {
      entity_1: "sensor.outside_temperature",
      entity_2: "sensor.outside_humidity",
      entity_3: "sensor.power_consumption",
      color_1: "yellow",
      color_2: "blue",
      color_3: "green",
      max_1: 40,
      max_2: 100,
      max_3: 1e3,
      chart_type: "radialBar",
      graph_span: "1d"
    };
  }
  setConfig(t) {
    const e = t, i = (s) => {
      const l = e[s];
      if (l && typeof l == "object" && !Array.isArray(l))
        return l;
    }, o = i("entity_1"), n = i("entity_2"), r = i("entity_3"), a = (typeof t.entity_1 == "string" ? t.entity_1 : void 0) || o?.entity_id;
    if (!a) throw new Error("Please define entity_1");
    this._config = {
      ...t,
      entity_1: a,
      entity_2: (typeof t.entity_2 == "string" ? t.entity_2 : void 0) || n?.entity_id,
      entity_3: (typeof t.entity_3 == "string" ? t.entity_3 : void 0) || r?.entity_id,
      name_1: Y(e, "name_1", "entity_1_name") || o?.name,
      name_2: Y(e, "name_2", "entity_2_name") || n?.name,
      name_3: Y(e, "name_3", "entity_3_name") || r?.name,
      icon_1: Y(e, "icon_1") || o?.icon,
      icon_2: Y(e, "icon_2") || n?.icon,
      icon_3: Y(e, "icon_3") || r?.icon,
      color_1: bn(Y(e, "color_1") ?? o?.color, "yellow"),
      color_2: bn(Y(e, "color_2") ?? n?.color, "blue"),
      color_3: bn(Y(e, "color_3") ?? r?.color, "green"),
      max_1: yn(Y(e, "max_1") ?? o?.max_value, 100),
      max_2: yn(Y(e, "max_2") ?? n?.max_value, 100),
      max_3: yn(Y(e, "max_3") ?? r?.max_value, 100),
      chart_type: String(Y(e, "chart_type") || "radialBar"),
      graph_span: String(Y(e, "graph_span") || "1d"),
      type: "custom:ulm-custom-card-apexcharts-card"
    }, this._chartKey = "";
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._chartEl || this._apexMissing ? this._syncChart() : this._chartEl && (this._chartEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._slots();
    return c`
      <ha-card class="ulm-card ulm-apexcharts">
        <div class="layout">
          <div class="entities">
            ${t.map((e) => this._entityRow(e))}
          </div>
          <div class="chart">
            ${this._apexMissing ? c`<div class="missing-dep">
                  Install
                  <strong>apexcharts-card</strong>
                  from HACS (RomRider) and add it as a Lovelace resource.
                </div>` : c`<div class="chart-host"></div>`}
          </div>
        </div>
      </ha-card>
    `;
  }
  _slots() {
    const t = this._config;
    return [
      {
        entity: t.entity_1,
        name: t.name_1,
        icon: t.icon_1,
        color: t.color_1 || "yellow",
        max: t.max_1 || 100
      },
      {
        entity: t.entity_2,
        name: t.name_2,
        icon: t.icon_2,
        color: t.color_2 || "blue",
        max: t.max_2 || 100
      },
      {
        entity: t.entity_3,
        name: t.name_3,
        icon: t.icon_3,
        color: t.color_3 || "green",
        max: t.max_3 || 100
      }
    ].filter((e) => !!e.entity);
  }
  _entityRow(t) {
    const e = t.entity ? this.hass.states[t.entity] : void 0;
    if (!e)
      return c`<div class="entity-slot missing">
        <div class="warning">Entity not found: ${t.entity}</div>
      </div>`;
    const i = f(this, t.color), o = {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    }, n = t.name || e.attributes.friendly_name || e.entity_id, r = t.icon || e.attributes.icon || "mdi:chart-arc", a = this.hass.formatEntityState ? this.hass.formatEntityState(e) : e.attributes.unit_of_measurement ? `${e.state} ${e.attributes.unit_of_measurement}` : e.state;
    return c`
      <div class="entity-slot">
        <div
          class="series"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(t.entity)}
          @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this._moreInfo(t.entity));
    }}
        >
          <div class="series-icon" style=${d(o)}>
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="series-text">
            <div class="series-name">${n}</div>
            <div class="series-state">${a}</div>
          </div>
        </div>
      </div>
    `;
  }
  _seriesColor(t) {
    const e = getComputedStyle(this).getPropertyValue(`--google-${t}`).trim();
    return e || _d(f(this, t));
  }
  _buildApexConfig() {
    const t = this._config, e = this._slots(), i = t.chart_type || "radialBar", o = e.map((n) => {
      const r = n.entity ? this.hass.states[n.entity] : void 0, a = n.name || r?.attributes.friendly_name || n.entity || "", s = {
        entity: n.entity,
        name: a,
        color: this._seriesColor(n.color)
      };
      return i === "radialBar" && (s.max = n.max, s.min = 0), s;
    });
    return {
      type: `custom:${Ae}`,
      graph_span: t.graph_span || "1d",
      chart_type: i,
      header: { show: !1 },
      // Match original YAML apex_config (+ height 100% so it fills without overflow)
      apex_config: {
        title: {
          floating: !1,
          align: "top",
          style: { fontSize: "2px", fontWeight: "bold" }
        },
        chart: {
          foreColor: "rgb(148,148,148)",
          offsetY: 5,
          height: "100%",
          parentHeightOffset: 0
        },
        legend: { show: !1 }
      },
      card_mod: {
        style: `
          ha-card {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 0 0 10px !important;
            margin: 0 !important;
            overflow: hidden !important;
            height: 100% !important;
          }
          #graph-wrapper, .wrapper {
            height: 100% !important;
            overflow: hidden !important;
            max-width: 100% !important;
          }
        `
      },
      series: o
    };
  }
  async _syncChart() {
    if (!(!this._config || !this.hass)) {
      if (this._chartLoading) {
        this._chartDirty = !0;
        return;
      }
      this._chartLoading = !0, this._chartDirty = !1;
      try {
        if (!await this._ensureApexLoaded()) {
          this._apexMissing || (this._apexMissing = !0);
          return;
        }
        this._apexMissing && (this._apexMissing = !1), await this.updateComplete;
        const e = this._chartHost;
        if (!e) {
          this._chartDirty = !0;
          return;
        }
        const i = this._buildApexConfig(), o = JSON.stringify(i);
        if (!this._chartEl || o !== this._chartKey) {
          this._chartKey = o;
          const n = window;
          if (typeof n.loadCardHelpers == "function") {
            const r = await n.loadCardHelpers();
            this._chartEl = r.createCardElement(
              i
            );
          } else {
            const r = document.createElement(Ae);
            r.setConfig(i), this._chartEl = r;
          }
          this._chartEl.hass = this.hass, e.replaceChildren(this._chartEl);
        } else
          this._chartEl.hass = this.hass;
      } finally {
        this._chartLoading = !1, this._chartDirty && (this._chartDirty = !1, this._syncChart());
      }
    }
  }
  async _ensureApexLoaded() {
    if (customElements.get(Ae)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Ae),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Ae);
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
Zt.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      container-type: inline-size;
      /* Prevent HA/theme RTL from flipping icon↔text and entities↔chart */
      direction: ltr;
    }

    /* Original: padding 0, aspect_ratio 2/1, grid 35%/65% × 3 rows */
    ha-card.ulm-card.ulm-apexcharts {
      width: 100%;
      max-width: 100%;
      aspect-ratio: 2 / 1;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* Original grid: 35% entities / 65% chart, 3 equal rows */
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 35%) minmax(0, 65%);
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
        "entities chart"
        "entities chart"
        "entities chart";
      width: 100%;
      height: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      box-sizing: border-box;
      overflow: hidden;
      direction: ltr !important;
    }

    @container (max-width: 340px) {
      ha-card.ulm-card.ulm-apexcharts {
        aspect-ratio: auto;
      }

      .layout {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto minmax(140px, 160px);
        grid-template-areas:
          "entities"
          "chart";
      }
    }

    .entities {
      grid-area: entities;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      min-width: 0;
      max-width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0;
      box-sizing: border-box;
    }

    .entity-slot {
      display: flex;
      align-items: center;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    /*
      Matches nested card_generic_swap inside apexcharts.yaml:
      - icon_more_info_new card padding: 12px
      - apexcharts overrides only padding-top/bottom: 1px
      → effective: 1px 12px 1px 12px
      - icon_info: 42px circle, name/label margin-left: 12px, icon 20px
    */
    .series {
      position: relative;
      display: block;
      width: 100%;
      max-width: 100%;
      min-height: 42px;
      margin: 0;
      /* top/right/bottom/left — left reserves 12 + 42 + 12 for icon+gap */
      padding: 1px 12px 1px 66px;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left !important;
      direction: ltr !important;
      cursor: pointer;
      box-sizing: border-box;
      overflow: hidden;
    }

    .series-icon {
      position: absolute !important;
      left: 12px !important;
      right: auto !important;
      top: 50%;
      transform: translateY(-50%);
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    .series-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    .series-text {
      display: block;
      width: 100%;
      max-width: 100%;
      text-align: left !important;
      overflow: hidden;
    }

    .series-name,
    .series-state {
      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      text-align: left !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .series-name {
      font-size: 14px;
      font-weight: bold;
    }

    .series-state {
      font-size: 12px;
      font-weight: bolder;
      opacity: 0.4;
    }

    .chart {
      grid-area: chart;
      position: relative;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      /* Original apexcharts-card style: padding-left: 10px */
      padding-left: 10px;
    }

    .chart-host {
      width: 100%;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }

    .chart-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      height: 100% !important;
      max-height: 100% !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px;
      box-sizing: border-box;
    }

    .missing {
      padding: 4px;
      overflow: hidden;
    }
  `;
ko([
  x({ attribute: !1 })
], Zt.prototype, "hass", 2);
ko([
  y()
], Zt.prototype, "_config", 2);
ko([
  y()
], Zt.prototype, "_apexMissing", 2);
ko([
  ie(".chart-host")
], Zt.prototype, "_chartHost", 2);
Zt = ko([
  $("ulm-custom-card-apexcharts-card")
], Zt);
var md = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, Co = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? hd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && md(e, i, n), n;
};
const Te = "bar-card";
function mt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function vn(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Ia(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function pd(t) {
  const e = (t || "var(--google-blue)").trim();
  return St.includes(e) ? `var(--google-${e})` : e;
}
let Xt = class extends v {
  constructor() {
    super(...arguments), this._barMissing = !1, this._barKey = "", this._barLoading = !1, this._barDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        A("icon_color"),
        m("bar_color"),
        b("show_icon"),
        b("indicator"),
        b("show_value"),
        M("min"),
        M("max")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_custom_card_bar_card_name)",
        icon: "Icon (ulm_custom_card_bar_card_icon)",
        icon_color: "Icon color (ulm_custom_card_bar_card_icon_color)",
        bar_color: "Bar color (ulm_custom_card_bar_card_color)",
        show_icon: "Show header (ulm_custom_card_bar_card_show_icon)",
        indicator: "Show bar indicator",
        show_value: "Show value inside bar",
        min: "Min (ulm_custom_card_bar_card_min)",
        max: "Max (ulm_custom_card_bar_card_max)"
      }),
      computeHelper: C({
        show_icon: "Original YAML hides the whole card_generic header when false",
        bar_color: "CSS color or theme name. Default var(--google-blue). Requires HACS bar-card.",
        icon_color: "Theme color for the icon chip; empty = grey"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.outside_humidity",
      name: "Humidity",
      icon: "mdi:water-percent",
      icon_color: "blue",
      bar_color: "var(--google-blue)",
      show_icon: !0,
      indicator: !1,
      show_value: !0,
      min: 0,
      max: 100
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || mt(e, "ulm_custom_card_bar_card_entity");
    if (!i) throw new Error("Please define an entity");
    const o = mt(
      e,
      "icon_color",
      "ulm_custom_card_bar_card_icon_color"
    );
    let n = "";
    typeof o == "string" && St.includes(o) && (n = o), this._config = {
      ...t,
      entity: i,
      name: mt(e, "name", "ulm_custom_card_bar_card_name") || void 0,
      icon: mt(e, "icon", "ulm_custom_card_bar_card_icon") || void 0,
      icon_color: n,
      bar_color: String(
        mt(e, "bar_color", "ulm_custom_card_bar_card_color") || "var(--google-blue)"
      ),
      show_icon: vn(
        mt(e, "show_icon", "ulm_custom_card_bar_card_show_icon"),
        !0
      ),
      indicator: vn(
        mt(e, "indicator", "ulm_custom_card_bar_card_indicator"),
        !1
      ),
      show_value: vn(
        mt(e, "show_value", "ulm_custom_card_bar_card_value", "value"),
        !1
      ),
      min: Ia(mt(e, "min", "ulm_custom_card_bar_card_min"), 0),
      max: Ia(mt(e, "max", "ulm_custom_card_bar_card_max"), 100),
      type: "custom:ulm-custom-card-bar-card-card"
    }, this._barKey = "";
  }
  getCardSize() {
    return this._config?.show_icon === !1 ? 1 : 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 1
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._barEl || this._barMissing ? this._syncBar() : this._barEl && (this._barEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity], e = this._config.show_icon !== !1;
    return c`
      <ha-card class="ulm-card ulm-bar-card">
        ${e ? this._header(t) : _}
        <div class="bar-wrap">
          ${this._barMissing ? c`<div class="missing-dep">
                Install <strong>bar-card</strong> from HACS (custom-cards) and
                add it as a Lovelace resource.
              </div>` : c`<div class="bar-host"></div>`}
        </div>
      </ha-card>
    `;
  }
  _header(t) {
    if (!t)
      return c`<div class="header missing">
        <div class="warning">Entity not found: ${this._config.entity}</div>
      </div>`;
    const e = this._config.icon_color;
    let i;
    if (e) {
      const a = f(this, e);
      i = {
        color: `rgba(${a}, 1)`,
        backgroundColor: `rgba(${a}, 0.2)`
      };
    } else
      i = {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    const o = this._stateLabel(t), n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._config.icon || t.attributes.icon || "mdi:chart-bar";
    return c`
      <div class="header">
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo()}
          @keydown=${(a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this._moreInfo());
    }}
        >
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${n}</div>
          </div>
        </div>
      </div>
    `;
  }
  _stateLabel(t) {
    if (this.hass?.formatEntityState)
      return this.hass.formatEntityState(t);
    const e = t.attributes.unit_of_measurement;
    return e ? `${t.state} ${e}` : t.state;
  }
  _buildBarConfig() {
    const t = this._config;
    return {
      type: `custom:${Te}`,
      entities: [{ entity: t.entity }],
      color: pd(t.bar_color),
      min: t.min ?? 0,
      max: t.max ?? 100,
      positions: {
        icon: "off",
        indicator: t.indicator ? "inside" : "off",
        minmax: "off",
        title: "off",
        value: t.show_value ? "inside" : "off",
        name: "off"
      },
      card_mod: {
        style: `
          ha-card {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            border-radius: var(--border-radius, 20px) !important;
          }
          bar-card-currentbar {
            border-radius: 0px !important;
            right: 0;
          }
          bar-card-backgroundbar {
            border-radius: 0px !important;
            right: 0;
          }
          #states {
            padding: 0;
            height: 35px;
          }
          bar-card-background {
            height: 35px !important;
          }
          bar-card-indicator {
            left: 10px;
          }
          bar-card-value {
            font-weight: bold;
            font-size: 12px;
          }
        `
      }
    };
  }
  async _syncBar() {
    if (!(!this._config || !this.hass)) {
      if (this._barLoading) {
        this._barDirty = !0;
        return;
      }
      this._barLoading = !0, this._barDirty = !1;
      try {
        if (!await this._ensureBarLoaded()) {
          this._barMissing || (this._barMissing = !0);
          return;
        }
        this._barMissing && (this._barMissing = !1), await this.updateComplete;
        const e = this._barHost;
        if (!e) {
          this._barDirty = !0;
          return;
        }
        const i = this._buildBarConfig(), o = JSON.stringify(i);
        if (!this._barEl || o !== this._barKey) {
          this._barKey = o;
          const n = window;
          if (typeof n.loadCardHelpers == "function") {
            const r = await n.loadCardHelpers();
            this._barEl = r.createCardElement(i);
          } else {
            const r = document.createElement(Te);
            r.setConfig(i), this._barEl = r;
          }
          this._barEl.hass = this.hass, e.replaceChildren(this._barEl);
        } else
          this._barEl.hass = this.hass;
      } finally {
        this._barLoading = !1, this._barDirty && (this._barDirty = !1, this._syncBar());
      }
    }
  }
  async _ensureBarLoaded() {
    if (customElements.get(Te)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Te),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Te);
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Xt.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* extended_card: padding 0 */
    ha-card.ulm-card.ulm-bar-card {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
    }

    /* item1 card_generic: top radii, padding 12px, no shadow */
    .header {
      padding: 12px;
      box-sizing: border-box;
      border-radius: var(--ulm-radius) var(--ulm-radius) 0 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      cursor: pointer;
      direction: ltr;
    }

    .header .label {
      opacity: 0.4;
    }

    .bar-wrap {
      width: 100%;
      min-height: 35px;
      overflow: hidden;
      box-sizing: border-box;
    }

    .bar-host {
      width: 100%;
      min-height: 35px;
      overflow: hidden;
    }

    .bar-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px 12px;
    }

    .missing {
      padding: 8px 12px;
    }
  `;
Co([
  x({ attribute: !1 })
], Xt.prototype, "hass", 2);
Co([
  y()
], Xt.prototype, "_config", 2);
Co([
  y()
], Xt.prototype, "_barMissing", 2);
Co([
  ie(".bar-host")
], Xt.prototype, "_barHost", 2);
Xt = Co([
  $("ulm-custom-card-bar-card-card")
], Xt);
var gd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, tn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? fd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && gd(e, i, n), n;
};
function ne(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function bd(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : typeof t == "string" ? t.length > 0 : e;
}
let xe = class extends v {
  constructor() {
    super(...arguments), this._pictureKey = "", this._pictureLoading = !1, this._pictureDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "camera"),
        b("show_title"),
        m("name"),
        m("label"),
        S("icon"),
        m("aspect_ratio")
      ],
      computeLabel: k({
        entity: "Camera entity",
        show_title: "Show title header (ulm_custom_card_camera_title)",
        name: "Name (ulm_custom_card_camera_name)",
        label: "Label (ulm_custom_card_camera_label)",
        icon: "Icon",
        aspect_ratio: "Aspect ratio (ulm_custom_card_camera_aspect_ratio)"
      }),
      computeHelper: C({
        show_title: "Original YAML treats ulm_custom_card_camera_title as a boolean switch for the header",
        aspect_ratio: "Passed to picture-entity, e.g. 16:9 or 1",
        name: "Header primary line when show_title is on",
        label: "Header secondary line when show_title is on"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "camera.front_door",
      show_title: !0,
      name: "Front door",
      label: "Live",
      icon: "mdi:cctv",
      aspect_ratio: "16:9"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || ne(e, "ulm_custom_card_camera_entity");
    if (!i) throw new Error("Please define an entity");
    const o = ne(
      e,
      "show_title",
      "ulm_custom_card_camera_title",
      "title"
    );
    this._config = {
      ...t,
      entity: i,
      show_title: bd(o, !1),
      name: ne(e, "name", "ulm_custom_card_camera_name") || void 0,
      label: ne(e, "label", "ulm_custom_card_camera_label") || void 0,
      icon: ne(e, "icon") || void 0,
      aspect_ratio: String(
        ne(e, "aspect_ratio", "ulm_custom_card_camera_aspect_ratio") || "16:9"
      ),
      type: "custom:ulm-custom-card-camera-card"
    }, this._pictureKey = "";
  }
  getCardSize() {
    return this._config?.show_title ? 4 : 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._pictureEl ? this._syncPicture() : this._pictureEl && (this._pictureEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = !!this._config.show_title, e = this.hass.states[this._config.entity];
    return c`
      <ha-card
        class="ulm-card ulm-camera ${t ? "with-title" : "image-only"}"
      >
        ${t ? this._header(e) : _}
        <div class="picture-wrap">
          <div class="picture-host"></div>
        </div>
      </ha-card>
    `;
  }
  _header(t) {
    const e = this._config.name || t?.attributes.friendly_name || this._config.entity, i = this._config.label || "", o = this._config.icon || t?.attributes.icon || "mdi:cctv";
    return c`
      <div class="header">
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo()}
          @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this._moreInfo());
    }}
        >
          <div class="icon-btn">
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${e}</div>
            ${i ? c`<div class="label">${i}</div>` : c`<div class="label">&nbsp;</div>`}
          </div>
        </div>
      </div>
    `;
  }
  _buildPictureConfig() {
    const t = this._config;
    return {
      type: "picture-entity",
      entity: t.entity,
      camera_image: t.entity,
      camera_view: "live",
      show_name: !1,
      show_state: !1,
      aspect_ratio: t.aspect_ratio || "16:9"
    };
  }
  async _syncPicture() {
    if (!(!this._config || !this.hass)) {
      if (this._pictureLoading) {
        this._pictureDirty = !0;
        return;
      }
      this._pictureLoading = !0, this._pictureDirty = !1;
      try {
        await this.updateComplete;
        const t = this._pictureHost;
        if (!t) {
          this._pictureDirty = !0;
          return;
        }
        const e = this._buildPictureConfig(), i = JSON.stringify(e);
        if (!this._pictureEl || i !== this._pictureKey) {
          this._pictureKey = i;
          const o = window;
          if (typeof o.loadCardHelpers == "function") {
            const n = await o.loadCardHelpers();
            this._pictureEl = n.createCardElement(
              e
            );
          } else {
            const n = document.createElement(
              "hui-picture-entity-card"
            );
            n.setConfig(e), this._pictureEl = n;
          }
          this._pictureEl.hass = this.hass, t.replaceChildren(this._pictureEl);
        } else
          this._pictureEl.hass = this.hass;
      } finally {
        this._pictureLoading = !1, this._pictureDirty && (this._pictureDirty = !1, this._syncPicture());
      }
    }
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
xe.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    ha-card.ulm-card.ulm-camera {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
      /* Original border-radius 20px */
      border-radius: 20px;
    }

    /* With title: padding 12px + row-gap 12px; without: padding 0 */
    ha-card.ulm-camera.with-title {
      padding: 12px;
      gap: 12px;
    }

    ha-card.ulm-camera.image-only {
      padding: 0;
      gap: 0;
    }

    .header {
      min-width: 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      cursor: pointer;
      direction: ltr;
    }

    /* blue_no_state */
    .header .icon-btn {
      color: rgba(var(--color-blue, 61, 90, 254), 1);
      background-color: rgba(var(--color-blue, 61, 90, 254), 0.2);
    }

    .header .name {
      filter: opacity(100%);
    }

    .header .label {
      opacity: 0.4;
    }

    .picture-wrap {
      width: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      border-radius: 12px;
      box-sizing: border-box;
    }

    ha-card.ulm-camera.image-only .picture-wrap {
      border-radius: 20px;
    }

    .picture-host {
      width: 100%;
      overflow: hidden;
    }

    .picture-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    /* Flatten nested picture-entity ha-card chrome */
    .picture-host > * {
      --ha-card-border-width: 0px;
      --ha-card-border-radius: 12px;
      --ha-card-box-shadow: none;
    }

    ha-card.ulm-camera.image-only .picture-host > * {
      --ha-card-border-radius: 20px;
    }
  `;
tn([
  x({ attribute: !1 })
], xe.prototype, "hass", 2);
tn([
  y()
], xe.prototype, "_config", 2);
tn([
  ie(".picture-host")
], xe.prototype, "_pictureHost", 2);
xe = tn([
  $("ulm-custom-card-camera-card")
], xe);
var yd = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, yr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? vd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && yd(e, i, n), n;
};
function B(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function No(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
const ja = {
  auto: { icon: "mdi:autorenew", color: "green" },
  cool: { icon: "mdi:snowflake", color: "blue" },
  heat: { icon: "mdi:fire", color: "red" },
  dry: { icon: "mdi:water", color: "yellow" },
  heat_cool: { icon: "mdi:sun-snowflake", color: "purple" },
  fan_only: { icon: "mdi:fan", color: "green" },
  off: { icon: "mdi:snowflake-off", color: "grey" }
};
let Mi = class extends v {
  constructor() {
    super(...arguments), this._cardTap = () => {
      const t = this._config, e = typeof t.tap_action == "string" ? t.tap_action : t.tap_action?.action || "more-info", i = t.navigation_path || (typeof t.tap_action == "object" ? t.tap_action?.navigation_path : void 0), o = t.entity || t.light_entity;
      if (e !== "none") {
        if (e === "navigate" && i) {
          this._navigate(i);
          return;
        }
        if (e === "toggle" && o && this.hass) {
          this.hass.callService("homeassistant", "toggle", {
            entity_id: o
          });
          return;
        }
        o && this._moreInfo(o);
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", void 0, !1),
        m("name"),
        S("icon"),
        m("label"),
        u("temperature_entity", "sensor", !1),
        u("humidity_entity", "sensor", !1),
        u("light_entity", "light", !1),
        u("climate_entity", "climate", !1),
        u("cover_entity", "cover", !1),
        S("light_icon_on"),
        S("light_icon_off"),
        S("cover_icon_open"),
        S("cover_icon_closed"),
        S("cover_icon_opening"),
        S("cover_icon_closing"),
        b("dynamic_color"),
        b("enable_light_popup"),
        b("enable_thermostat_popup"),
        b("enable_cover_popup"),
        H("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "toggle", label: "toggle" },
          { value: "none", label: "none" }
        ]),
        m("navigation_path")
      ],
      computeLabel: k({
        entity: "Room entity (icon / fallback label)",
        name: "Room name",
        icon: "Room icon",
        label: "Override label (static text / emoji)",
        temperature_entity: "Temperature sensor (label helper)",
        humidity_entity: "Humidity sensor (label helper)",
        light_entity: "Light (ulm_custom_card_esh_room_light_entity)",
        climate_entity: "Climate (ulm_custom_card_esh_room_climate_entity)",
        cover_entity: "Cover (ulm_custom_card_esh_room_cover_entity)",
        light_icon_on: "Light ON icon (ulm_card_esh_room_light_icon_on)",
        light_icon_off: "Light OFF icon (ulm_card_esh_room_light_icon_off)",
        cover_icon_open: "Cover open icon",
        cover_icon_closed: "Cover closed icon",
        cover_icon_opening: "Cover opening icon",
        cover_icon_closing: "Cover closing icon",
        dynamic_color: "Dynamic color (ulm_card_dynamic_color)",
        enable_light_popup: "Light popup (ulm_card_light_enable_popup)",
        enable_thermostat_popup: "Thermostat popup (ulm_card_thermostat_enable_popup)",
        enable_cover_popup: "Cover popup (ulm_card_cover_popup)",
        tap_action: "Card tap_action",
        navigation_path: "navigation_path (when tap_action = navigate)"
      }),
      computeHelper: C({
        label: "Static override. Or set temperature_entity/humidity_entity for the docs 🌡️/💧 pattern. JS templates from button-card are not evaluated.",
        light_entity: "Light widget (top-right) + default brightness label when light is on.",
        climate_entity: "Climate widget. With light: grid is light+climate (unless cover is also set — cover wins).",
        cover_entity: "Cover widget. With light: grid 'i light / n cover / l cover'. Without light: cover top-right.",
        dynamic_color: "Requires light_entity; uses rgb_color when on.",
        navigation_path: "Example: bathroom or /lovelace/bathroom"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "light.bed_light",
      name: "Bathroom",
      icon: "mdi:bathtub",
      light_entity: "light.bed_light",
      climate_entity: "climate.hvac",
      cover_entity: void 0,
      dynamic_color: !1,
      tap_action: "more-info",
      enable_light_popup: !1
    };
  }
  setConfig(t) {
    const e = t, i = e.tap_action;
    let o = "more-info", n = B(e, "navigation_path") || void 0;
    if (typeof i == "string")
      o = i;
    else if (i && typeof i == "object") {
      const r = i;
      o = r.action || "more-info", n = r.navigation_path || n;
    }
    this._config = {
      ...t,
      entity: B(e, "entity") || void 0,
      name: B(e, "name") || void 0,
      icon: B(e, "icon") || void 0,
      label: B(e, "label") || void 0,
      temperature_entity: B(e, "temperature_entity") || void 0,
      humidity_entity: B(e, "humidity_entity") || void 0,
      light_entity: B(
        e,
        "light_entity",
        "ulm_custom_card_esh_room_light_entity"
      ) || void 0,
      climate_entity: B(
        e,
        "climate_entity",
        "ulm_custom_card_esh_room_climate_entity"
      ) || void 0,
      cover_entity: B(
        e,
        "cover_entity",
        "ulm_custom_card_esh_room_cover_entity"
      ) || void 0,
      light_icon_on: String(
        B(e, "light_icon_on", "ulm_card_esh_room_light_icon_on") || "mdi:lightbulb"
      ),
      light_icon_off: String(
        B(e, "light_icon_off", "ulm_card_esh_room_light_icon_off") || "mdi:lightbulb-off"
      ),
      cover_icon_open: String(
        B(e, "cover_icon_open", "ulm_card_esh_room_cover_icon_open") || "mdi:blinds-open"
      ),
      cover_icon_closed: String(
        B(e, "cover_icon_closed", "ulm_card_esh_room_cover_icon_closed") || "mdi:roller-shade-closed"
      ),
      cover_icon_closing: String(
        B(e, "cover_icon_closing", "ulm_card_esh_room_cover_icon_closing") || "mdi:blinds"
      ),
      cover_icon_opening: String(
        B(e, "cover_icon_opening", "ulm_card_esh_room_cover_icon_opening") || "mdi:blinds"
      ),
      enable_light_popup: No(
        B(e, "enable_light_popup", "ulm_card_light_enable_popup"),
        !1
      ),
      enable_thermostat_popup: No(
        B(e, "enable_thermostat_popup", "ulm_card_thermostat_enable_popup"),
        !1
      ),
      enable_cover_popup: No(
        B(e, "enable_cover_popup", "ulm_card_cover_popup"),
        !1
      ),
      dynamic_color: No(
        B(e, "dynamic_color", "ulm_card_dynamic_color"),
        !1
      ),
      tap_action: o,
      navigation_path: n,
      type: "custom:ulm-custom-card-esh-room-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = t.light_entity, i = t.climate_entity, o = t.cover_entity, n = o ? "cover" : i ? "climate" : null, r = e ? this.hass.states[e] : void 0, a = t.entity ? this.hass.states[t.entity] : void 0, s = r || a, l = r?.state === "on", h = this._lightRgb(r), p = !!t.dynamic_color && l && !!h, g = this._cardStyle(l, p, h), z = this._roomIconCellStyle(l, p, h), P = this._roomIconFgStyle(l, p), O = this._nameStyle(l, p, h), T = t.name || a?.attributes.friendly_name || r?.attributes.friendly_name || t.entity || "Room", N = t.icon || a?.attributes.icon || r?.attributes.icon || "mdi:floor-plan", U = this._resolveLabel(s), F = L({
      layout: !0,
      "has-light": !!e,
      "has-climate": n === "climate",
      "has-cover": n === "cover",
      "light-only": !!e && !n,
      "secondary-only": !e && !!n
    });
    return c`
      <ha-card
        class="ulm-card ulm-esh-room"
        style=${d(g)}
        @click=${this._cardTap}
      >
        <div class=${F}>
          <div class="room-icon" style=${d(z)}>
            <ha-icon style=${d(P)} .icon=${N}></ha-icon>
          </div>
          <div class="name" style=${d(O)}>${T}</div>
          <div class="label">${U}</div>
          ${e ? this._lightWidget(e, r) : _}
          ${n === "climate" && i ? this._climateWidget(i) : _}
          ${n === "cover" && o ? this._coverWidget(o) : _}
        </div>
      </ha-card>
    `;
  }
  _lightRgb(t) {
    const e = t?.attributes.rgb_color;
    return Array.isArray(e) && e.length >= 3 ? [Number(e[0]), Number(e[1]), Number(e[2])] : null;
  }
  _cardStyle(t, e, i) {
    return !this._config?.light_entity || !t ? {} : e && i ? { backgroundColor: `rgba(${i.join(", ")}, 0.2)` } : {
      backgroundColor: "rgba(var(--color-background-yellow, 250, 250, 250), 0.2)"
    };
  }
  /** img_cell styles from YAML (circle background + inherited icon color). */
  _roomIconCellStyle(t, e, i) {
    if (!this._config?.light_entity || !t)
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    if (e && i)
      return {
        color: `rgba(${i.join(", ")}, 1)`,
        backgroundColor: `rgba(${i.join(", ")}, 0.3)`
      };
    const o = f(this, "yellow");
    return {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    };
  }
  /** styles.icon filter — only on the glyph, not the circle bg (YAML). */
  _roomIconFgStyle(t, e) {
    return this._config?.light_entity && t && e ? { filter: "contrast(0.6) saturate(1.7)" } : {};
  }
  _nameStyle(t, e, i) {
    return this._config?.light_entity ? t ? e && i ? {
      color: `rgba(${i.join(", ")}, 1)`,
      filter: "contrast(0.6) saturate(1.7)"
    } : {
      color: "var(--color-yellow-text, var(--primary-text-color))"
    } : { color: "rgba(var(--color-theme, 51, 51, 51), 0.6)" } : { color: "rgba(var(--color-theme, 51, 51, 51), 0.6)" };
  }
  _resolveLabel(t) {
    const e = this._config;
    if (e.label) return e.label;
    const i = e.temperature_entity, o = e.humidity_entity;
    if (i || o) {
      const n = [];
      if (i && this.hass.states[i]) {
        const r = this.hass.states[i], a = r.attributes.unit_of_measurement || "°C";
        n.push(`🌡️ ${r.state} ${a}`);
      }
      if (o && this.hass.states[o]) {
        const r = this.hass.states[o], a = r.attributes.unit_of_measurement || "%";
        n.push(`💧 ${r.state} ${a}`);
      }
      if (n.length) return n.join(" ");
    }
    if (!t) return " ";
    if (t.state === "on") {
      const n = Number(t.attributes.brightness);
      if (Number.isFinite(n)) {
        const r = Math.round(n / 2.55);
        if (r) return `${r}%`;
      }
    }
    return this.hass?.formatEntityState?.(t) || t.state;
  }
  _lightWidget(t, e) {
    const i = e?.state === "on", o = this._lightRgb(e), n = !!this._config.dynamic_color && i && !!o, r = i ? this._config.light_icon_on || "mdi:lightbulb" : this._config.light_icon_off || "mdi:lightbulb-off";
    let a = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    if (i) {
      const s = f(this, "yellow");
      a = {
        color: `rgba(${s}, 1)`,
        backgroundColor: n && o ? `rgba(${o.join(", ")}, 0.3)` : `rgba(${s}, 0.2)`
      };
    }
    return c`
      <button
        class="widget light"
        style=${d(a)}
        title="Light"
        @click=${(s) => this._widgetTap(s, "light", t)}
        @contextmenu=${(s) => this._widgetHold(s, "light", t)}
      >
        <ha-icon .icon=${r}></ha-icon>
      </button>
    `;
  }
  _climateWidget(t) {
    const i = this.hass.states[t]?.state || "off", o = ja[i] || ja.off, n = i !== "off" && i !== "unavailable", r = f(this, o.color), a = n ? {
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class="widget climate"
        style=${d(a)}
        title="Climate"
        @click=${(s) => this._widgetTap(s, "climate", t)}
        @contextmenu=${(s) => this._widgetHold(s, "climate", t)}
      >
        <ha-icon .icon=${o.icon}></ha-icon>
      </button>
    `;
  }
  _coverWidget(t) {
    const i = this.hass.states[t]?.state || "closed";
    let o = this._config.cover_icon_closed || "mdi:roller-shade-closed";
    i === "open" ? o = this._config.cover_icon_open || "mdi:blinds-open" : i === "closing" ? o = this._config.cover_icon_closing || "mdi:blinds" : i === "opening" && (o = this._config.cover_icon_opening || "mdi:blinds");
    const n = i === "closed", r = f(this, "blue"), a = n ? {
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class="widget cover"
        style=${d(a)}
        title="Cover"
        @click=${(s) => this._widgetTap(s, "cover", t)}
        @contextmenu=${(s) => this._widgetHold(s, "cover", t)}
      >
        <ha-icon .icon=${o}></ha-icon>
      </button>
    `;
  }
  _navigate(t) {
    const e = t.startsWith("/") ? t : `/${t}`;
    history.pushState(null, "", e), window.dispatchEvent(new Event("location-changed"));
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
  _widgetTap(t, e, i) {
    if (t.stopPropagation(), !!this.hass) {
      if (e === "light") {
        this.hass.callService("light", "toggle", { entity_id: i });
        return;
      }
      if (e === "cover") {
        this.hass.callService("cover", "toggle", { entity_id: i });
        return;
      }
      this.hass.callService("homeassistant", "toggle", { entity_id: i });
    }
  }
  _widgetHold(t, e, i) {
    t.preventDefault(), t.stopPropagation();
    const o = this._config;
    if (e === "light" && o.enable_light_popup) {
      dt(this, "light", i);
      return;
    }
    if (e === "climate" && o.enable_thermostat_popup) {
      dt(this, "thermostat", i);
      return;
    }
    if (e === "cover" && o.enable_cover_popup) {
      dt(this, "cover", i);
      return;
    }
    this._moreInfo(i);
  }
};
Mi.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      direction: ltr;
    }

    ha-card.ulm-card.ulm-esh-room {
      padding: 12px;
      border-radius: 20px;
      height: auto;
      cursor: pointer;
      direction: ltr;
      box-sizing: border-box;
      overflow: hidden;
      transition: background-color 0.2s ease;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* YAML: grid-template-rows: min-content (repeats) */
      grid-template-rows: min-content min-content min-content;
      width: 100%;
      min-width: 0;
      direction: ltr;
    }

    /* Default: icon | empty ; name spanning ; label spanning */
    .layout {
      grid-template-areas:
        "icon ."
        "name name"
        "label label";
    }

    .layout.has-light.light-only {
      grid-template-areas:
        "icon light"
        "name name"
        "label label";
    }

    .layout.has-light.has-climate {
      grid-template-areas:
        "icon light"
        "name climate"
        "label climate";
    }

    .layout.has-light.has-cover {
      grid-template-areas:
        "icon light"
        "name cover"
        "label cover";
    }

    .layout.secondary-only.has-climate {
      grid-template-areas:
        "icon ."
        "name climate"
        "label climate";
    }

    .layout.secondary-only.has-cover {
      grid-template-areas:
        "icon cover"
        "name name"
        "label label";
    }

    .room-icon {
      grid-area: icon;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin-left: 12px;
      justify-self: start;
      overflow: hidden;
      box-sizing: border-box;
    }

    .room-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    .name {
      grid-area: name;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      margin-top: 12px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .layout.has-climate .name,
    .layout.has-cover .name {
      margin-top: 8px;
      max-width: 85%;
    }

    .layout.has-light.light-only .name {
      margin-top: 12px;
      max-width: 100%;
    }

    .label {
      grid-area: label;
      justify-self: start;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      /* YAML: filter: opacity(40%) */
      filter: opacity(40%);
      margin-left: 12px;
      margin-bottom: 3px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .layout.has-climate .label,
    .layout.has-cover .label {
      margin-bottom: 0;
      max-width: 85%;
    }

    /* widget_icon.yaml — fixed 42× full-column pill, place-self center */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      max-width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      cursor: pointer;
      box-shadow: none;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      box-sizing: border-box;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }

    .widget.light {
      grid-area: light;
    }

    .widget.climate {
      grid-area: climate;
      margin-top: 5px;
    }

    .widget.cover {
      grid-area: cover;
      margin-top: 5px;
    }
  `;
yr([
  x({ attribute: !1 })
], Mi.prototype, "hass", 2);
yr([
  y()
], Mi.prototype, "_config", 2);
Mi = yr([
  $("ulm-custom-card-esh-room-card")
], Mi);
var wd = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, So = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? xd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && wd(e, i, n), n;
};
const Ue = "sun-card", $d = [
  { value: "24h", label: "24h" },
  { value: "12h", label: "12h" }
], kd = [
  "da",
  "de",
  "en",
  "es",
  "et",
  "fi",
  "fr",
  "hu",
  "it",
  "nl",
  "pl",
  "pt-BR",
  "ru",
  "sl",
  "sv"
].map((t) => ({ value: t, label: t })), Cd = [
  { value: "auto", label: "HA theme (auto)" },
  { value: "true", label: "Dark" },
  { value: "false", label: "Light" }
];
function re(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Da(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Sd(t) {
  return t === !0 || t === "true" || t === "on" ? "true" : t === !1 || t === "false" || t === "off" ? "false" : "auto";
}
let Qt = class extends v {
  constructor() {
    super(...arguments), this._sunMissing = !1, this._sunKey = "", this._sunLoading = !1, this._sunDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        m("title"),
        H("language", [
          { value: "", label: "HA language (auto)" },
          ...kd
        ]),
        H("dark_mode", Cd),
        H("time_format", [...$d]),
        b("show_azimuth"),
        b("show_elevation")
      ],
      computeLabel: k({
        title: "Title (sun-card title)",
        language: "Language",
        dark_mode: "Dark mode",
        time_format: "Time format (timeFormat)",
        show_azimuth: "Show azimuth (showAzimuth)",
        show_elevation: "Show elevation (showElevation)"
      }),
      computeHelper: C({
        title: "Empty = no title (sun-card default)",
        language: "Supported: da, de, en, es, et, fi, fr, hu, it, nl, pl, pt-BR, ru, sl, sv. Empty uses hass.language.",
        dark_mode: "Original YAML always mirrors hass.themes.darkMode unless overridden",
        time_format: "YAML default is 24h",
        show_azimuth: "Requires HACS sun-card + Sun integration",
        show_elevation: "Requires HACS sun-card + Sun integration"
      })
    };
  }
  static getStubConfig() {
    return {
      dark_mode: "auto",
      time_format: "24h",
      show_azimuth: !1,
      show_elevation: !1
    };
  }
  setConfig(t) {
    const e = t, i = re(e, "time_format", "timeFormat");
    let o = "24h";
    (i === "12h" || i === "24h") && (o = i);
    const n = re(e, "language"), r = typeof n == "string" && n.trim() ? n.trim() : void 0, a = re(e, "title");
    this._config = {
      ...t,
      title: typeof a == "string" ? a : void 0,
      language: r,
      dark_mode: Sd(re(e, "dark_mode", "darkMode")),
      show_azimuth: Da(re(e, "show_azimuth", "showAzimuth"), !1),
      show_elevation: Da(
        re(e, "show_elevation", "showElevation"),
        !1
      ),
      time_format: o,
      type: "custom:ulm-custom-card-httpedo13-sun-card"
    }, this._sunKey = "";
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._sunEl || this._sunMissing ? this._syncSun() : this._sunEl && (this._sunEl.hass = this.hass));
  }
  render() {
    return !this._config || !this.hass ? _ : c`
      <ha-card class="ulm-card ulm-httpedo13-sun">
        ${this._sunMissing ? c`<div class="missing-dep">
              Install <strong>sun-card</strong> from HACS
              (AitorDB/home-assistant-sun-card) and enable the
              <strong>Sun</strong> integration.
            </div>` : c`<div class="sun-host"></div>`}
      </ha-card>
    `;
  }
  _resolveDarkMode() {
    const t = this._config.dark_mode ?? "auto";
    return t === "true" || t === !0 ? !0 : t === "false" || t === !1 ? !1 : !!this.hass?.themes?.darkMode;
  }
  _buildSunConfig() {
    const t = this._config, e = {
      type: `custom:${Ue}`,
      darkMode: this._resolveDarkMode(),
      language: t.language || this.hass?.language || "en",
      showAzimuth: !!t.show_azimuth,
      showElevation: !!t.show_elevation,
      timeFormat: t.time_format || "24h",
      card_mod: {
        style: `
          ha-card.type-custom-sun-card,
          ha-card {
            border-radius: 14px !important;
            box-shadow: none !important;
            border: none !important;
          }
        `
      }
    };
    return t.title && (e.title = t.title), e;
  }
  async _syncSun() {
    if (!(!this._config || !this.hass)) {
      if (this._sunLoading) {
        this._sunDirty = !0;
        return;
      }
      this._sunLoading = !0, this._sunDirty = !1;
      try {
        if (!await this._ensureSunLoaded()) {
          this._sunMissing || (this._sunMissing = !0);
          return;
        }
        this._sunMissing && (this._sunMissing = !1), await this.updateComplete;
        const e = this._sunHost;
        if (!e) {
          this._sunDirty = !0;
          return;
        }
        const i = this._buildSunConfig(), o = JSON.stringify(i);
        if (!this._sunEl || o !== this._sunKey) {
          this._sunKey = o;
          const n = window;
          if (typeof n.loadCardHelpers == "function") {
            const r = await n.loadCardHelpers();
            this._sunEl = r.createCardElement(
              i
            );
          } else {
            const r = document.createElement(Ue);
            r.setConfig(i), this._sunEl = r;
          }
          this._sunEl.hass = this.hass, e.replaceChildren(this._sunEl);
        } else
          this._sunEl.hass = this.hass;
      } finally {
        this._sunLoading = !1, this._sunDirty && (this._sunDirty = !1, this._syncSun());
      }
    }
  }
  async _ensureSunLoaded() {
    if (customElements.get(Ue)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Ue),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Ue);
  }
};
Qt.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* YAML styles.card: padding 12px, radius, shadow */
    ha-card.ulm-card.ulm-httpedo13-sun {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 12px;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
      cursor: default;
    }

    .sun-host {
      width: 100%;
      min-width: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    .sun-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 4px 0;
    }
  `;
So([
  x({ attribute: !1 })
], Qt.prototype, "hass", 2);
So([
  y()
], Qt.prototype, "_config", 2);
So([
  y()
], Qt.prototype, "_sunMissing", 2);
So([
  ie(".sun-host")
], Qt.prototype, "_sunHost", 2);
Qt = So([
  $("ulm-custom-card-httpedo13-sun-card")
], Qt);
var zd = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, zo = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Ed(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && zd(e, i, n), n;
};
const Fe = "mini-graph-card", wn = {
  en: {
    hour: "hour",
    hours: "hours",
    in_the_last: "In the last",
    in_the_lasts: "In the last"
  },
  it: {
    hour: "ora",
    hours: "ore",
    in_the_last: "Nell'ultima",
    in_the_lasts: "Nelle ultime"
  },
  de: {
    hour: "Stunde",
    hours: "Stunden",
    in_the_last: "In der letzten",
    in_the_lasts: "In den letzten"
  },
  es: {
    hour: "hora",
    hours: "horas",
    in_the_last: "En la última",
    in_the_lasts: "En las últimas"
  },
  fr: {
    hour: "dernière heure",
    hours: "dernières heures",
    in_the_last: "Dans la",
    in_the_lasts: "Dans les"
  },
  nl: {
    hour: "uur",
    hours: "uren",
    in_the_last: "In de laatste",
    in_the_lasts: "In de laatste"
  },
  pl: {
    hour: "godziny",
    hours: "godzin",
    in_the_last: "W ciągu ostatniej",
    in_the_lasts: "W ciągu ostatnich"
  },
  sv: {
    hour: "timmen",
    hours: "timmarna",
    in_the_last: "Den senaste",
    in_the_lasts: "De senaste"
  }
}, Pd = [
  { value: 0, color: "var(--info-color)" }
];
function wt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ld(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Aa(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
function Md(t) {
  return t === "" || t === "none" || t === null || t === void 0 ? "" : typeof t == "string" && St.includes(t) ? t : "";
}
function Hn(t) {
  if (Array.isArray(t)) {
    const e = [];
    for (const i of t) {
      if (!i || typeof i != "object") continue;
      const o = i, n = Number(o.value), r = o.color;
      Number.isFinite(n) && typeof r == "string" && r && e.push({ value: n, color: r });
    }
    return e.length ? e : void 0;
  }
  if (typeof t == "string" && t.trim())
    try {
      return Hn(JSON.parse(t));
    } catch {
      return;
    }
}
let te = class extends v {
  constructor() {
    super(...arguments), this._graphMissing = !1, this._graphKey = "", this._graphLoading = !1, this._graphDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "sensor"),
        u("power_entity", "sensor", !1),
        m("name"),
        S("icon"),
        H("color", [
          { value: "", label: "None (grey)" },
          ...St.map((t) => ({ value: t, label: t }))
        ]),
        M("hours"),
        b("hour24"),
        M("height"),
        m("thresholds_json")
      ],
      computeLabel: k({
        entity: "Entity (header icon / fallback)",
        power_entity: "Graph entity (ulm_card_power_details_entity)",
        name: "Name (ulm_card_power_details_name)",
        icon: "Icon",
        color: "Header icon color",
        hours: "Hours to show (ulm_card_power_details_hours)",
        hour24: "24h format (ulm_card_power_details_24hour)",
        height: "Graph height (ulm_card_power_details_height)",
        thresholds_json: "Thresholds JSON (ulm_card_power_details_thresholds)"
      }),
      computeHelper: C({
        entity: "Required since Minimalist v1.0.2 (header entity)",
        power_entity: "Defaults to entity when empty. Requires HACS mini-graph-card.",
        color: "None = grey inactive chip (original look for numeric sensors)",
        hours: "Default 2. Drives subtitle and hours_to_show / points_per_hour",
        hour24: "YAML default false (AM/PM). Set true for 24h axis labels",
        height: "Default 180",
        thresholds_json: 'e.g. [{"value":0,"color":"#43A047"},{"value":2500,"color":"#FFA600"}]'
      })
    };
  }
  static getStubConfig() {
    const t = [
      { value: 0, color: "#43A047" },
      { value: 2500, color: "#FFA600" },
      { value: 3e3, color: "#DB4437" }
    ];
    return {
      entity: "sensor.power_consumption",
      power_entity: "sensor.power_consumption",
      name: "Power",
      icon: "mdi:flash",
      color: "",
      hours: 2,
      hour24: !0,
      height: 180,
      thresholds: t,
      thresholds_json: JSON.stringify(t)
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || wt(e, "ulm_card_power_details_entity");
    if (!i) throw new Error("Please define an entity");
    const o = wt(
      e,
      "power_entity",
      "ulm_card_power_details_entity"
    ) || i, n = e.thresholds_json, r = typeof n == "string" && n.trim() ? Hn(n) : void 0, a = Hn(
      wt(e, "thresholds", "ulm_card_power_details_thresholds")
    ), s = r || a || void 0, l = s ? JSON.stringify(s) : void 0;
    this._config = {
      ...t,
      entity: i,
      power_entity: o,
      name: wt(e, "name", "ulm_card_power_details_name") || void 0,
      icon: wt(e, "icon") || void 0,
      color: Md(
        e.color !== void 0 ? e.color : wt(e, "color")
      ),
      hours: Aa(wt(e, "hours", "ulm_card_power_details_hours"), 2),
      hour24: Ld(
        wt(e, "hour24", "ulm_card_power_details_24hour"),
        !1
      ),
      height: Aa(wt(e, "height", "ulm_card_power_details_height"), 180),
      thresholds: s,
      thresholds_json: l,
      type: "custom:ulm-custom-card-damix48-power-details-card"
    }, this._graphKey = "";
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._graphEl || this._graphMissing ? this._syncGraph() : this._graphEl && (this._graphEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    return c`
      <ha-card class="ulm-card ulm-power-details">
        ${this._header(t)}
        <div class="graph-wrap">
          ${this._graphMissing ? c`<div class="missing-dep">
                Install <strong>mini-graph-card</strong> from HACS and add it as
                a Lovelace resource.
              </div>` : c`<div class="graph-host"></div>`}
        </div>
      </ha-card>
    `;
  }
  _langPack() {
    const t = (this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return wn[t] || wn[e] || wn.en;
  }
  _hoursLabel() {
    const t = this._config.hours ?? 2, e = this._langPack();
    return t === 1 ? `${e.in_the_last} ${e.hour}` : `${e.in_the_lasts} ${t} ${e.hours}`;
  }
  _header(t) {
    if (!t)
      return c`<div class="header missing">
        <div class="warning">Entity not found: ${this._config.entity}</div>
      </div>`;
    const e = this._config.color, i = e ? (() => {
      const r = f(this, e);
      return {
        color: `rgba(${r}, 1)`,
        backgroundColor: `rgba(${r}, 0.2)`
      };
    })() : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, o = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._config.icon || t.attributes.icon || "mdi:flash";
    return c`
      <div class="header">
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo()}
          @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._moreInfo());
    }}
        >
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${this._hoursLabel()}</div>
          </div>
        </div>
      </div>
    `;
  }
  _buildGraphConfig() {
    const t = this._config, e = t.hours ?? 2, i = t.power_entity || t.entity, o = t.thresholds?.length ? t.thresholds : Pd;
    return {
      type: `custom:${Fe}`,
      entities: [{ entity: i }],
      color_thresholds: o,
      hours_to_show: e,
      points_per_hour: Math.floor(120 / e),
      name: t.name || "",
      hour24: !!t.hour24,
      decimals: 1,
      show: {
        name: !1,
        icon: !1,
        legend: !1,
        state: !0
      },
      align_state: "center",
      height: t.height ?? 180,
      card_mod: {
        style: `
          ha-card {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            border-radius: var(--border-radius, 20px) !important;
          }
          ha-card .state {
            font-weight: bold;
            font-size: 14px;
          }
          ha-card .graph__labels > span {
            background: var(--card-background-color);
            color: var(--secondary-text-color);
          }
        `
      }
    };
  }
  async _syncGraph() {
    if (!(!this._config || !this.hass)) {
      if (this._graphLoading) {
        this._graphDirty = !0;
        return;
      }
      this._graphLoading = !0, this._graphDirty = !1;
      try {
        if (!await this._ensureGraphLoaded()) {
          this._graphMissing || (this._graphMissing = !0);
          return;
        }
        this._graphMissing && (this._graphMissing = !1), await this.updateComplete;
        const e = this._graphHost;
        if (!e) {
          this._graphDirty = !0;
          return;
        }
        const i = this._buildGraphConfig(), o = JSON.stringify(i);
        if (!this._graphEl || o !== this._graphKey) {
          this._graphKey = o;
          const n = window;
          if (typeof n.loadCardHelpers == "function") {
            const r = await n.loadCardHelpers();
            this._graphEl = r.createCardElement(
              i
            );
          } else {
            const r = document.createElement(Fe);
            r.setConfig(i), this._graphEl = r;
          }
          this._graphEl.hass = this.hass, e.replaceChildren(this._graphEl);
        } else
          this._graphEl.hass = this.hass;
      } finally {
        this._graphLoading = !1, this._graphDirty && (this._graphDirty = !1, this._syncGraph());
      }
    }
  }
  async _ensureGraphLoaded() {
    if (customElements.get(Fe)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Fe),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Fe);
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
te.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* YAML styles.card: padding 0 */
    ha-card.ulm-card.ulm-power-details {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
    }

    /* item1: top radii, padding 12px, no shadow */
    .header {
      padding: 12px;
      box-sizing: border-box;
      border-radius: var(--ulm-radius) var(--ulm-radius) 0 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      cursor: pointer;
      direction: ltr;
    }

    .header .label {
      opacity: 0.4;
    }

    .graph-wrap {
      width: 100%;
      min-width: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    .graph-host {
      width: 100%;
      min-width: 0;
      overflow: hidden;
    }

    .graph-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px 12px;
    }

    .missing {
      padding: 8px 12px;
    }
  `;
zo([
  x({ attribute: !1 })
], te.prototype, "hass", 2);
zo([
  y()
], te.prototype, "_config", 2);
zo([
  y()
], te.prototype, "_graphMissing", 2);
zo([
  ie(".graph-host")
], te.prototype, "_graphHost", 2);
te = zo([
  $("ulm-custom-card-damix48-power-details-card")
], te);
var Od = Object.defineProperty, Nd = Object.getOwnPropertyDescriptor, vr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Nd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Od(e, i, n), n;
};
const xn = {
  en: {
    locked: "locked",
    unlocked: "unlocked",
    locking: "locking",
    unlocking: "unlocking",
    unavailable: "unavailable",
    jammed: "jammed",
    locked_and_opened: "The door is locked but still open.",
    battery_is_at: "Battery is at",
    battery_is_low: "Battery is low"
  },
  de: {
    locked: "verriegelt",
    unlocked: "entriegelt",
    locking: "verriegeln",
    unlocking: "entriegeln",
    unavailable: "nicht verfügbar",
    jammed: "blockiert",
    locked_and_opened: "Die Tür ist verschlossen, aber noch offen.",
    battery_is_at: "Batterie ist an",
    battery_is_low: "Batterie schwach"
  },
  es: {
    locked: "bloqueado",
    unlocked: "desbloqueado",
    locking: "bloqueando",
    unlocking: "desbloqueando",
    unavailable: "no disponible",
    jammed: "apretada",
    locked_and_opened: "La puerta está cerrada pero aún abierta.",
    battery_is_at: "la batería está en",
    battery_is_low: "La batería está baja"
  },
  pl: {
    locked: "zamknięty",
    unlocked: "otwarty",
    locking: "zamykanie",
    unlocking: "otwieranie",
    unavailable: "niedostępny",
    jammed: "zacięty",
    locked_and_opened: "Drzwi są zamknięte, ale nadal otwarte.",
    battery_is_at: "Bateria jest na",
    battery_is_low: "Bateria jest słaba"
  },
  sv: {
    locked: "låst",
    unlocked: "olåst",
    locking: "låser",
    unlocking: "låser upp",
    unavailable: "otillgängligt",
    jammed: "fastnat",
    locked_and_opened: "Dörren är låst men fortfarande öppen.",
    battery_is_at: "Batterinivån är",
    battery_is_low: "Batteriet är lågt"
  },
  tr: {
    locked: "kilitli",
    unlocked: "kilitli değil",
    locking: "kilitleniyor",
    unlocking: "kilit açılıyor",
    unavailable: "müsait değil",
    jammed: "sıkışmış",
    locked_and_opened: "Kapı kilitli ama hala açık",
    battery_is_at: "pil",
    battery_is_low: "pil zayıf"
  }
};
function _t(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function $n(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Ta(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
let Oi = class extends v {
  constructor() {
    super(...arguments), this._cardTap = () => {
      const t = this._config;
      if (!this.hass) return;
      const e = this.hass.states[t.entity];
      if (e) {
        if (!t.tap_control) {
          this._moreInfo();
          return;
        }
        if (t.only_open) {
          this.hass.callService("lock", "open", { entity_id: t.entity });
          return;
        }
        if (e.state === "locked") {
          this.hass.callService("lock", "unlock", { entity_id: t.entity });
          return;
        }
        if (e.state === "unlocked") {
          this.hass.callService("lock", "lock", { entity_id: t.entity });
          return;
        }
        this._moreInfo();
      }
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "lock"),
        m("name"),
        S("icon"),
        b("tap_control"),
        b("only_open"),
        u("battery_level", ["sensor", "binary_sensor"], !1),
        M("battery_warning"),
        M("battery_warning_low"),
        b("battery_sensor_binary"),
        m("battery_sensor_binary_low_state"),
        u("door_open", "binary_sensor", !1)
      ],
      computeLabel: k({
        entity: "Lock entity",
        name: "Name",
        icon: "Icon",
        tap_control: "Tap locks/unlocks (ulm_…_tap_control)",
        only_open: "Only lock.open on tap (ulm_…_only_open)",
        battery_level: "Battery entity (ulm_…_battery_level)",
        battery_warning: "Low battery % (default 20)",
        battery_warning_low: "Very low battery % (default 5)",
        battery_sensor_binary: "Battery is binary sensor",
        battery_sensor_binary_low_state: "Binary low state (default on)",
        door_open: "Door open binary (ulm_…_door_open)"
      }),
      computeHelper: C({
        tap_control: "When false, tap opens more-info. When true, toggles lock/unlock (or open).",
        only_open: "Requires tap_control. Always calls lock.open.",
        battery_level: "Shows a corner badge when battery is low",
        door_open: "Red door-open badge when lock is locked but door sensor is on",
        battery_sensor_binary: "Ignores % thresholds; uses battery_sensor_binary_low_state"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "lock.front_door",
      name: "Door Lock",
      icon: "mdi:lock",
      tap_control: !0,
      only_open: !1,
      battery_warning: 20,
      battery_warning_low: 5,
      battery_sensor_binary: !1,
      battery_sensor_binary_low_state: "on"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || _t(e, "ulm_custom_card_eraycetinay_lock_entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: _t(e, "name") || void 0,
      icon: _t(e, "icon") || void 0,
      tap_control: $n(
        _t(e, "tap_control", "ulm_custom_card_eraycetinay_lock_tap_control"),
        !1
      ),
      only_open: $n(
        _t(e, "only_open", "ulm_custom_card_eraycetinay_lock_only_open"),
        !1
      ),
      battery_level: _t(
        e,
        "battery_level",
        "ulm_custom_card_eraycetinay_lock_battery_level"
      ) || void 0,
      battery_warning: Ta(
        _t(
          e,
          "battery_warning",
          "ulm_custom_card_eraycetinay_lock_battery_warning"
        ),
        20
      ),
      battery_warning_low: Ta(
        _t(
          e,
          "battery_warning_low",
          "ulm_custom_card_eraycetinay_lock_battery_warning_low"
        ),
        5
      ),
      battery_sensor_binary: $n(
        _t(
          e,
          "battery_sensor_binary",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary"
        ),
        !1
      ),
      battery_sensor_binary_low_state: String(
        _t(
          e,
          "battery_sensor_binary_low_state",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state"
        ) || "on"
      ),
      door_open: _t(
        e,
        "door_open",
        "ulm_custom_card_eraycetinay_lock_door_open"
      ) || void 0,
      type: "custom:ulm-custom-card-eraycetinay-lock-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: 1,
      min_rows: 1
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-lock"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || (this._isUnlockedLike(t.state) ? "mdi:lock-open" : "mdi:lock"), o = this._tone(t.state), n = this._iconStyle(o), r = this._label(t), a = this._batteryBadge(), s = this._doorOpenBadge(t);
    return c`
      <ha-card class="ulm-lock" @click=${this._cardTap}>
        <div class="grid">
          <div class="img-cell" style=${d(n)}>
            <ha-icon .icon=${i}></ha-icon>
          </div>
          <div class="name">${e}</div>
          <div class="label">${r}</div>

          ${s ? c`<span
                class="badge door"
                title=${s.title}
                style=${d({
      backgroundColor: `rgba(${f(this, "red")}, 1)`
    })}
              >
                <ha-icon .icon=${s.icon}></ha-icon>
              </span>` : _}
          ${a ? c`<span
                class="badge battery"
                title=${a.title}
                style=${d({
      backgroundColor: `rgba(${f(this, a.color)}, 1)`
    })}
              >
                <ha-icon .icon=${a.icon}></ha-icon>
              </span>` : _}
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return xn[t] || xn[e] || xn.en;
  }
  _isUnlockedLike(t) {
    return ["unlocked", "open", "opened", "unlocking"].includes(t);
  }
  _isLockedLike(t) {
    return ["locked", "closed", "locking"].includes(t);
  }
  /** Intended colors (original YAML state templates were buggy). */
  _tone(t) {
    return this._isUnlockedLike(t) ? "yellow" : this._isLockedLike(t) ? "green" : "grey";
  }
  _iconStyle(t) {
    if (t === "grey")
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    const e = f(this, t);
    return {
      color: `rgba(${e}, 1)`,
      backgroundColor: `rgba(${e}, 0.2)`
    };
  }
  _label(t) {
    const e = this._lang(), i = {
      locked: e.locked,
      unlocked: e.unlocked,
      locking: e.locking,
      unlocking: e.unlocking,
      unavailable: e.unavailable,
      jammed: e.jammed,
      open: e.unlocked,
      opened: e.unlocked,
      closed: e.locked
    };
    return i[t.state] ? i[t.state] : this.hass?.formatEntityState?.(t) || t.state;
  }
  _doorOpenBadge(t) {
    const e = this._config.door_open;
    if (!e || !this.hass) return null;
    const i = this.hass.states[e];
    return i && t.state === "locked" && i.state === "on" ? {
      icon: "mdi:door-open",
      title: this._lang().locked_and_opened
    } : null;
  }
  _batteryBadge() {
    const t = this._config, e = t.battery_level;
    if (!e || !this.hass) return null;
    const i = this.hass.states[e];
    if (!i) return null;
    const o = this._lang();
    if (t.battery_sensor_binary)
      return i.state === (t.battery_sensor_binary_low_state || "on") ? {
        icon: "mdi:battery-low",
        title: o.battery_is_low,
        color: "red"
      } : null;
    const n = Number.parseFloat(i.state);
    if (!Number.isFinite(n)) return null;
    const r = t.battery_warning ?? 20, a = t.battery_warning_low ?? 5;
    return n <= r ? {
      icon: "mdi:battery-low",
      title: `${o.battery_is_at} ${n}%`,
      color: n <= a ? "red" : "yellow"
    } : null;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Oi.styles = w`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-lock {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    .grid {
      position: relative;
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      height: 42px;
      width: 100%;
      align-content: stretch;
    }

    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    .img-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /* YAML custom_fields notification_* — absolute on grid */
    .badge {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .badge.door {
      left: 28px;
      top: -6px;
    }

    .badge.battery {
      left: -6px;
      top: -6px;
    }

    .badge ha-icon {
      --mdc-icon-size: 12px;
      width: 12px;
      height: 12px;
      color: var(--primary-background-color, #fff);
    }
  `;
vr([
  x({ attribute: !1 })
], Oi.prototype, "hass", 2);
vr([
  y()
], Oi.prototype, "_config", 2);
Oi = vr([
  $("ulm-custom-card-eraycetinay-lock-card")
], Oi);
var Id = Object.defineProperty, jd = Object.getOwnPropertyDescriptor, en = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? jd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Id(e, i, n), n;
};
const Dd = 5e3, Ad = "Open", Td = "Closed & Unlocked", Ud = "Closed & Locked";
function Be(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Fd(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Bd(t) {
  return t >= 100 ? "mdi:battery" : t >= 80 ? "mdi:battery-70" : t >= 60 ? "mdi:battery-60" : t >= 50 ? "mdi:battery-50" : "mdi:battery-20";
}
let $e = class extends v {
  constructor() {
    super(...arguments), this._controlsUnlocked = !1, this._onDoubleTap = (t) => {
      t.preventDefault(), this._config?.require_double_tap_unlock !== !1 && (this._controlsUnlocked = !0, this._clearRelock(), this._relockTimer = window.setTimeout(() => {
        this._controlsUnlocked = !1, this._relockTimer = void 0;
      }, Dd));
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", void 0, !1),
        m("name"),
        u("lock_entity", "lock", !1),
        u("battery_entity", "sensor", !1),
        b("require_double_tap_unlock")
      ],
      computeLabel: k({
        entity: "Door state sensor (Open / Closed & …)",
        name: "Door name (ulm_custom_card_entity_1_name)",
        lock_entity: "Lock entity (ulm_custom_card_entity_1_lock)",
        battery_entity: "Battery sensor (ulm_custom_card_entity_1_lock_battery)",
        require_double_tap_unlock: "Double-tap to unlock controls"
      }),
      computeHelper: C({
        entity: "Nuki-style states: Open / Closed & Unlocked / Closed & Locked",
        lock_entity: "Must be a lock.* entity (receives lock.open / lock.lock)",
        battery_entity: "Optional. Badge on the door icon (red ≤40%, else green)",
        require_double_tap_unlock: "Original button-card lock unlock: double_tap — prevents accidental open"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.nuki_door_security_state",
      name: "Door",
      lock_entity: "lock.front_door_lock",
      battery_entity: "sensor.front_door_battery",
      require_double_tap_unlock: !0
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || Be(e, "ulm_custom_card_entity_1_door") || "", o = Be(
      e,
      "lock_entity",
      "ulm_custom_card_entity_1_lock"
    ) || "", n = Be(
      e,
      "battery_entity",
      "ulm_custom_card_entity_1_lock_battery"
    ) || void 0;
    this._config = {
      ...t,
      entity: i,
      name: Be(e, "name", "ulm_custom_card_entity_1_name") || void 0,
      lock_entity: o,
      battery_entity: n,
      require_double_tap_unlock: Fd(
        Be(e, "require_double_tap_unlock"),
        !0
      ),
      type: "custom:ulm-custom-card-nik-door-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearRelock();
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config.entity, e = t ? this.hass.states[t] : void 0, i = this._config.battery_entity, o = i ? this.hass.states[i] : void 0, n = this._config.lock_entity, r = !!(n && this.hass.states[n]), a = this._config.require_double_tap_unlock !== !1, s = !a || this._controlsUnlocked, l = this._config.name || e?.attributes.friendly_name || t || "Door", h = e?.state || "unknown", p = o ? Number.parseFloat(o.state) : NaN, g = Number.isFinite(p), P = g && p <= 40 ? "red" : "green", O = f(this, P), T = f(this, "blue"), N = [];
    return t ? e || N.push(t) : N.push("door state entity"), n ? r || N.push(n) : N.push("lock entity"), i && !o && N.push(i), c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-nik-door": !0,
      locked: a && !s
    })}
        @dblclick=${this._onDoubleTap}
      >
        ${N.length ? c`<div class="warning">
              Missing entity: ${N.join(", ")}
            </div>` : _}
        ${a && !s ? c`<div class="lock-hint" title="Double-tap to unlock controls">
              <ha-icon icon="mdi:lock"></ha-icon>
            </div>` : _}

        <div class="header">
          <div class="icon-wrap">
            <div
              class="door-icon"
              style=${d({
      color: `rgba(${T}, 1)`,
      backgroundColor: `rgba(${T}, 0.2)`
    })}
            >
              <ha-icon icon="mdi:door"></ha-icon>
            </div>
            ${g ? c`<span
                  class="bat-badge"
                  title="Battery ${p}%"
                  style=${d({
      backgroundColor: `rgba(${O}, 1)`
    })}
                >
                  <ha-icon .icon=${Bd(p)}></ha-icon>
                </span>` : _}
          </div>
          <!-- Avoid global ulmCardStyles .name/.label (wrong align-self in this layout) -->
          <div class="door-name">${l}</div>
          <div class="door-state">${h}</div>
        </div>

        <div class="widgets ${s ? "" : "disabled"}">
          <button
            class="widget"
            style=${d(this._openWidgetStyle(h))}
            title="Open"
            ?disabled=${!s || !r}
            @click=${(U) => this._open(U)}
          >
            <ha-icon icon="mdi:lock-open-variant"></ha-icon>
          </button>
          <button
            class="widget"
            style=${d(this._lockWidgetStyle(h))}
            title="Lock"
            ?disabled=${!s || !r}
            @click=${(U) => this._lock(U)}
          >
            <ha-icon icon="mdi:lock"></ha-icon>
          </button>
        </div>
      </ha-card>
    `;
  }
  _openWidgetStyle(t) {
    if (t === Ad) {
      const e = f(this, "red");
      return {
        color: `rgba(${e}, 1)`,
        backgroundColor: `rgba(${e}, 0.2)`
      };
    }
    if (t === Td) {
      const e = f(this, "yellow");
      return {
        color: `rgba(${e}, 1)`,
        backgroundColor: `rgba(${e}, 0.2)`
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  }
  _lockWidgetStyle(t) {
    if (t === Ud) {
      const e = f(this, "green");
      return {
        color: `rgba(${e}, 1)`,
        backgroundColor: `rgba(${e}, 0.2)`
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  }
  _clearRelock() {
    this._relockTimer !== void 0 && (window.clearTimeout(this._relockTimer), this._relockTimer = void 0);
  }
  _open(t) {
    t.stopPropagation(), !(!this._config?.lock_entity || !this.hass) && (this._config.require_double_tap_unlock !== !1 && !this._controlsUnlocked || this.hass.states[this._config.lock_entity] && this.hass.callService("lock", "open", {
      entity_id: this._config.lock_entity
    }));
  }
  _lock(t) {
    t.stopPropagation(), !(!this._config?.lock_entity || !this.hass) && (this._config.require_double_tap_unlock !== !1 && !this._controlsUnlocked || this.hass.states[this._config.lock_entity] && this.hass.callService("lock", "lock", {
      entity_id: this._config.lock_entity
    }));
  }
};
$e.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-nik-door {
      position: relative;
      padding: 12px;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
      overflow: visible;
      cursor: default;
    }

    .warning {
      padding: 4px 0;
      color: var(--error-color);
      font-size: 14px;
    }

    .lock-hint {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(var(--color-theme, 51, 51, 51), 0.12);
      display: grid;
      place-items: center;
      z-index: 3;
      pointer-events: none;
    }

    .lock-hint ha-icon {
      --mdc-icon-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.55);
    }

    /* icon_more_info + icon_info: 'i n' / 'i l', height = icon 42px */
    .header {
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      height: 42px;
      width: 100%;
      min-width: 0;
      column-gap: 0;
      align-content: stretch;
    }

    .icon-wrap {
      grid-area: i;
      position: relative;
      width: 42px;
      height: 42px;
      place-self: center;
    }

    .door-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .door-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    /* YAML: left 30px; top 24px; 18×18 on icon_more_info */
    .bat-badge {
      position: absolute;
      left: 26px;
      top: 24px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .bat-badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    .door-name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      min-width: 0;
    }

    .door-state {
      grid-area: l;
      align-self: start;
      justify-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      min-width: 0;
    }

    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      width: 100%;
    }

    .widgets.disabled {
      opacity: 0.45;
    }

    /* widget_icon */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: none;
      box-sizing: border-box;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .widget:disabled {
      cursor: not-allowed;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
en([
  x({ attribute: !1 })
], $e.prototype, "hass", 2);
en([
  y()
], $e.prototype, "_config", 2);
en([
  y()
], $e.prototype, "_controlsUnlocked", 2);
$e = en([
  $("ulm-custom-card-nik-door-card")
], $e);
var Hd = Object.defineProperty, Rd = Object.getOwnPropertyDescriptor, on = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Rd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Hd(e, i, n), n;
};
const Ua = ["gray", ...St], He = {
  icon: "mdi:help-circle-outline",
  icon_color: "gray",
  name: "n/a",
  bg_color: "gray"
};
function Gd(t) {
  if (t && typeof t == "object" && !Array.isArray(t))
    return t;
}
function Wd(t, e) {
  if (typeof t == "string")
    return {
      entity_id: t,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      icon_color: typeof e?.icon_color == "string" ? e.icon_color : void 0,
      bg_color: typeof e?.bg_color == "string" ? e.bg_color : void 0
    };
  const i = Gd(t);
  return i ? {
    entity_id: typeof i.entity_id == "string" ? i.entity_id : void 0,
    icon: typeof i.icon == "string" ? i.icon : void 0,
    icon_color: typeof i.icon_color == "string" ? i.icon_color : void 0,
    name: typeof i.name == "string" ? i.name : void 0,
    bg_color: typeof i.bg_color == "string" ? i.bg_color : void 0
  } : {};
}
function Re(t) {
  return {
    type: "expandable",
    name: `entity_${t}`,
    title: `Scene ${t}`,
    schema: [
      u("entity_id", void 0, !1),
      {
        type: "grid",
        name: "",
        flatten: !0,
        schema: [m("name"), S("icon")]
      },
      H(
        "icon_color",
        Ua.map((e) => ({ value: e, label: e }))
      ),
      H(
        "bg_color",
        Ua.map((e) => ({ value: e, label: e }))
      )
    ]
  };
}
function Fa(t, e, i) {
  const o = (e || "gray").toLowerCase();
  if (o === "gray" || o === "grey")
    return i === "icon" ? "rgba(var(--color-theme, 51, 51, 51), 0.20)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
  const n = St.includes(o) ? o : "blue", r = f(t, n);
  return i === "icon" ? `rgba(${r}, 1)` : `rgba(${r}, 0.20)`;
}
let ke = class extends v {
  constructor() {
    super(...arguments), this._pills = [];
  }
  static getConfigForm() {
    return {
      schema: [
        Re(1),
        Re(2),
        Re(3),
        Re(4),
        Re(5)
      ],
      computeLabel: k({
        entity_id: "Entity",
        name: "Name",
        icon: "Icon",
        icon_color: "Icon color",
        bg_color: "Icon background color"
      }),
      computeHelper: C({
        entity_id: "scene / script / automation / switch — tap triggers turn_on (or automation.trigger)",
        icon_color: "gray = theme tint (original). Other values use ULM theme colors.",
        bg_color: "Background of the 42px icon circle"
      })
    };
  }
  static getStubConfig() {
    return {
      entity_1: {
        entity_id: "script.movie_time",
        name: "Movie",
        icon: "mdi:movie-open",
        icon_color: "blue",
        bg_color: "blue"
      },
      entity_2: {
        entity_id: "script.romantic_lights",
        name: "Romance",
        icon: "mdi:candle",
        icon_color: "pink",
        bg_color: "pink"
      },
      entity_3: {
        entity_id: "automation.ulm_set_minimalist_desktop_theme_on_start",
        name: "Theme",
        icon: "mdi:palette",
        icon_color: "purple",
        bg_color: "purple"
      },
      entity_4: {
        entity_id: "",
        name: "n/a",
        icon: "mdi:help-circle-outline",
        icon_color: "gray",
        bg_color: "gray"
      },
      entity_5: {
        entity_id: "",
        name: "n/a",
        icon: "mdi:help-circle-outline",
        icon_color: "gray",
        bg_color: "gray"
      }
    };
  }
  setConfig(t) {
    const e = t, i = [];
    for (let o = 1; o <= 5; o++) {
      const n = `entity_${o}`;
      i.push(
        Wd(e[n], {
          name: e[`name_${o}`],
          icon: e[`icon_${o}`],
          icon_color: e[`icon_color_${o}`],
          bg_color: e[`bg_color_${o}`]
        })
      );
    }
    this._pills = i, this._config = { ...t, type: "custom:ulm-custom-card-scenes-card" };
  }
  getCardSize() {
    return 2;
  }
  updated() {
    this.hass?.themes?.darkMode ? this.setAttribute("dark", "") : this.removeAttribute("dark");
  }
  render() {
    return !this._config || !this.hass ? _ : c`
      <ha-card class="ulm-card ulm-scenes">
        <div class="pills">
          ${this._pills.map((t, e) => this._renderPill(t, e))}
        </div>
      </ha-card>
    `;
  }
  _renderPill(t, e) {
    const i = t.entity_id || "", o = i ? this.hass.states[i] : void 0, n = t.name || o?.attributes.friendly_name || (i ? i.split(".").pop() : He.name) || He.name, r = t.icon || o?.attributes.icon || He.icon, a = t.icon_color || He.icon_color, s = t.bg_color || He.bg_color;
    return c`
      <button
        class="pill"
        type="button"
        ?disabled=${!i}
        style=${d({
      "--pill-color": Fa(this, a, "icon"),
      "--pill-bg": Fa(this, s, "bg")
    })}
        @click=${() => this._activate(i)}
        aria-label=${n}
        data-slot=${e + 1}
      >
        <span class="pill-icon">
          <ha-icon .icon=${r}></ha-icon>
        </span>
        <span class="pill-name">${n}</span>
      </button>
    `;
  }
  _activate(t) {
    if (!this.hass || !t) return;
    if (t.split(".")[0] === "automation") {
      this.hass.callService("automation", "trigger", { entity_id: t });
      return;
    }
    this.hass.callService("homeassistant", "turn_on", { entity_id: t });
  }
};
ke.styles = w`
    :host {
      display: block;
    }

    ha-card.ulm-card.ulm-scenes {
      border-radius: var(--border-radius, 12px);
      box-shadow: var(--box-shadow);
      padding: 12px;
      background: var(--card-background-color, var(--ha-card-background, #fff));
    }

    .pills {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-items: center;
      column-gap: auto;
      align-items: start;
    }

    /* card_scenes_pill — 52×84, row-gap 12px */
    .pill {
      width: 52px;
      min-width: 52px;
      height: 84px;
      box-sizing: border-box;
      border: 0;
      border-radius: 50px;
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 5px;
      cursor: pointer;
      color: inherit;
      font: inherit;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: none;
    }

    :host([dark]) .pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:hover,
    .pill:focus,
    .pill:active {
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      outline: none;
    }

    :host([dark]) .pill:hover,
    :host([dark]) .pill:focus,
    :host([dark]) .pill:active {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:disabled {
      cursor: default;
      opacity: 1;
    }

    .pill-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pill-color);
    }

    .pill-name {
      font-weight: bold;
      font-size: 9.5px;
      line-height: 1.1;
      text-align: center;
      width: 33px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 7px;
      box-sizing: border-box;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }
  `;
on([
  x({ attribute: !1 })
], ke.prototype, "hass", 2);
on([
  y()
], ke.prototype, "_config", 2);
on([
  y()
], ke.prototype, "_pills", 2);
ke = on([
  $("ulm-custom-card-scenes-card")
], ke);
var Kd = Object.defineProperty, Vd = Object.getOwnPropertyDescriptor, wr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Vd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Kd(e, i, n), n;
};
const Io = {
  black: "#000000",
  yellow: "rgb(250, 179, 0)",
  magenta: "rgb(248, 75, 122)",
  cyan: "rgb(66, 126, 222)"
};
function ae(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Bt(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ni = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        u("black_entity", "sensor", !1),
        u("yellow_entity", "sensor", !1),
        u("magenta_entity", "sensor", !1),
        u("cyan_entity", "sensor", !1)
      ],
      computeLabel: k({
        entity: "Printer status entity",
        name: "Printer name (ulm_card_printer_name)",
        icon: "Icon",
        black_entity: "Black toner (ulm_card_printer_black_name)",
        yellow_entity: "Yellow toner (ulm_card_printer_yellow_name)",
        magenta_entity: "Magenta toner (ulm_card_printer_magenta_name)",
        cyan_entity: "Cyan toner (ulm_card_printer_cyan_name)"
      }),
      computeHelper: C({
        entity: "Status sensor (e.g. IPP). Header turns blue when state ≠ idle.",
        name: "Display name on the icon_info header",
        black_entity: "Numeric % sensor for black toner",
        yellow_entity: "Numeric % sensor for yellow toner",
        magenta_entity: "Numeric % sensor for magenta toner",
        cyan_entity: "Numeric % sensor for cyan toner"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.demo_printer_status",
      name: "Demo Printer",
      icon: "mdi:printer",
      black_entity: "sensor.demo_printer_black_toner",
      yellow_entity: "sensor.demo_printer_yellow_toner",
      magenta_entity: "sensor.demo_printer_magenta_toner",
      cyan_entity: "sensor.demo_printer_cyan_toner"
    };
  }
  setConfig(t) {
    const e = t, i = Bt(t.entity);
    if (!i) throw new Error("Please define an entity");
    const o = Bt(
      ae(e, "black_entity", "ulm_card_printer_black_name")
    ) || "", n = Bt(
      ae(e, "yellow_entity", "ulm_card_printer_yellow_name")
    ) || "", r = Bt(
      ae(e, "magenta_entity", "ulm_card_printer_magenta_name")
    ) || "", a = Bt(
      ae(e, "cyan_entity", "ulm_card_printer_cyan_name")
    ) || "";
    this._config = {
      ...t,
      entity: i,
      name: Bt(ae(e, "name", "ulm_card_printer_name")),
      icon: Bt(ae(e, "icon")),
      black_entity: o,
      yellow_entity: n,
      magenta_entity: r,
      cyan_entity: a,
      type: "custom:ulm-custom-card-mpse-printer-card"
    };
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-mpse-printer">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state !== "idle", i = [
      {
        key: "black",
        entity: this._config.black_entity,
        color: Io.black
      },
      {
        key: "yellow",
        entity: this._config.yellow_entity,
        color: Io.yellow
      },
      {
        key: "magenta",
        entity: this._config.magenta_entity,
        color: Io.magenta
      },
      {
        key: "cyan",
        entity: this._config.cyan_entity,
        color: Io.cyan
      }
    ];
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-mpse-printer": !0,
      active: e
    })}
      >
        ${this._renderHeader(t, e)}
        <div class="toners">
          ${i.map((o, n) => this._renderBar(o, n === i.length - 1))}
        </div>
      </ha-card>
    `;
  }
  _headerStyle(t) {
    if (!t) return {};
    let e = getComputedStyle(this).getPropertyValue("--color-background-blue").trim();
    const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
    i && (e = getComputedStyle(this).getPropertyValue(`--${i[1]}`).trim() || e), /^\d+\s*,/.test(e) || (e = f(this, "blue"));
    const o = getComputedStyle(this).getPropertyValue("--opacity-bg").trim() || "1";
    return { backgroundColor: `rgba(${e}, ${o})` };
  }
  _activeTextColor() {
    let t = getComputedStyle(this).getPropertyValue("--color-blue-text").trim();
    const e = t.match(/^var\(--([a-z0-9-]+)\)$/i);
    return e && (t = getComputedStyle(this).getPropertyValue(`--${e[1]}`).trim() || t), /^\d+\s*,/.test(t) ? `rgba(${t}, 1)` : t.startsWith("#") || t.startsWith("rgb") ? t : `rgba(${f(this, "blue")}, 1)`;
  }
  _renderHeader(t, e) {
    const i = f(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, n = e ? { color: this._activeTextColor() } : {}, r = this._config.name || t.attributes.friendly_name || t.entity_id, a = this._stateLabel(t), s = this._config.icon || t.attributes.icon || "mdi:printer";
    return c`
      <div class="header" style=${d(this._headerStyle(e))}>
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(this._config.entity)}
          @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), this._moreInfo(this._config.entity));
    }}
        >
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${s}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="printer-name" style=${d(n)}>${r}</div>
            <div class="printer-state" style=${d(n)}>
              ${a}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _renderBar(t, e) {
    if (!t.entity)
      return c`<div class="toner-row ${e ? "last" : ""} empty"></div>`;
    const i = this.hass.states[t.entity];
    if (!i)
      return c`
        <div class="toner-row ${e ? "last" : ""}">
          <div class="bar missing-bar">Missing: ${t.entity}</div>
        </div>
      `;
    const o = Number.parseFloat(i.state), n = Number.isFinite(o) ? Math.max(0, Math.min(100, o)) : 0, r = i.attributes.unit_of_measurement, a = Number.isFinite(o) ? r ? `${Math.round(o)} ${r}` : `${Math.round(o)} %` : i.state;
    return c`
      <div
        class="toner-row ${e ? "last" : ""}"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(t.entity)}
        @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this._moreInfo(t.entity));
    }}
      >
        <div
          class="bar"
          style=${d({
      "--toner-color": t.color,
      "--toner-pct": `${n}%`
    })}
        >
          <div class="bar-fill"></div>
          <span class="bar-value">${a}</span>
        </div>
      </div>
    `;
  }
  _stateLabel(t) {
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
Ni.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-mpse-printer {
      border-radius: 20px;
      box-shadow: var(--box-shadow);
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: auto;
      box-sizing: border-box;
    }

    .warning {
      padding: 12px;
      color: var(--error-color);
    }

    /* item1 icon_info — padding 12px */
    .header {
      padding: 12px;
      box-sizing: border-box;
    }

    .row {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      column-gap: 12px;
      cursor: pointer;
      min-width: 0;
    }

    .icon-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    .info-btn {
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Avoid ulmCardStyles .name/.label conflicts */
    .printer-name {
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .printer-state {
      font-weight: bold;
      font-size: 12px;
      line-height: 1.2;
      filter: opacity(40%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    ha-card.active .printer-state {
      filter: none;
    }

    .toners {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    /* bar-card card_mod: #states padding 0 16px; last adds bottom 16px */
    .toner-row {
      padding: 0 16px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .toner-row.last {
      padding-bottom: 16px;
    }

    .toner-row.empty {
      min-height: 0;
      padding: 0;
    }

    /* Native bar matching original bar-card height 20px + border-radius 5px */
    .bar {
      position: relative;
      height: 20px;
      margin: 4px 0;
      border-radius: 5px;
      border: 0.01rem solid rgba(var(--color-theme, 51, 51, 51), 0.4);
      box-sizing: border-box;
      overflow: hidden;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bar-fill {
      position: absolute;
      inset: 0 auto 0 0;
      width: var(--toner-pct, 0%);
      background: var(--toner-color, black);
      border-radius: 5px;
      pointer-events: none;
    }

    .bar-value {
      position: relative;
      z-index: 1;
      font-size: 12px;
      font-weight: 500;
      color: grey;
      line-height: 1;
      pointer-events: none;
    }

    .missing-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--error-color);
      font-size: 11px;
      border-style: dashed;
    }
  `;
wr([
  x({ attribute: !1 })
], Ni.prototype, "hass", 2);
wr([
  y()
], Ni.prototype, "_config", 2);
Ni = wr([
  $("ulm-custom-card-mpse-printer-card")
], Ni);
var qd = Object.defineProperty, Yd = Object.getOwnPropertyDescriptor, xr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Yd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && qd(e, i, n), n;
};
function kn(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Jd(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function Zd(t) {
  switch (t) {
    case "dry":
      return "mdi:water";
    case "heat":
      return "mdi:radiator";
    case "cool":
      return "mdi:snowflake";
    case "fan_only":
      return "mdi:fan";
    default:
      return "mdi:air-conditioner";
  }
}
let Ii = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "climate"),
        m("name"),
        M("temp_step")
      ],
      computeLabel: k({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step"
      }),
      computeHelper: C({
        entity: "Air conditioner / climate entity",
        name: "Display name",
        temp_step: "± step for minus/plus. Default: entity target_temp_step, else 0.5"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "climate.hvac",
      name: "A/C Livingroom"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || kn(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: kn(e, "name") || void 0,
      temp_step: Jd(kn(e, "temp_step")),
      type: "custom:ulm-custom-card-tpx01-aircondition-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-aircondition">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state !== "off", i = f(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this.hass.formatEntityState?.(t) || t.state, a = Zd(t.state), s = t.attributes.temperature, l = s == null || s === "" ? "-°C" : `${s}°C`;
    return c`
      <ha-card class="ulm-card ulm-aircondition">
        <div class="stack">
          <!-- list_items_favorite: item1 spans 2 cols, item2 = power -->
          <div class="favorite">
            <div
              class="row icon-info"
              role="button"
              tabindex="0"
              @click=${() => this._moreInfo()}
              @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), this._moreInfo());
    }}
            >
              <button
                class="icon-btn"
                type="button"
                style=${d(o)}
                tabindex="-1"
                @click=${(h) => {
      h.stopPropagation(), this._moreInfo();
    }}
              >
                <ha-icon .icon=${a}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name">${n}</div>
                <div class="label">${r}</div>
              </div>
            </div>
            <button
              class="widget-btn power"
              type="button"
              aria-label=${e ? "Turn off" : "Turn on (cool)"}
              @click=${() => this._togglePower(e)}
            >
              <ha-icon .icon=${e ? "mdi:power-off" : "mdi:power"}></ha-icon>
            </button>
          </div>

          <!-- list_3_items / list_items: − | temp | + -->
          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <div class="temp-readout">${l}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _togglePower(t) {
    !this.hass || !this._config || this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: t ? "off" : "cool"
    });
  }
  _adjustTemp(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = e.attributes.temperature;
    if (i == null) return;
    const o = parseFloat(String(i)) + this._step(e) * t;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: o
    });
  }
  _step(t) {
    if (this._config?.temp_step != null && this._config.temp_step > 0)
      return this._config.temp_step;
    const e = Number(t.attributes.target_temp_step);
    return !Number.isNaN(e) && e > 0 ? e : 0.5;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Ii.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    /* Outer with_buttons card — padding 12px, row-gap 12px */
    ha-card.ulm-card.ulm-aircondition {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-aircondition > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .warning {
      padding: 4px 0;
      color: var(--error-color);
    }

    /*
     * list_items_favorite:
     * areas "item1 item1 item2", columns 1fr 1fr 1fr, column-gap 7px
     */
    .favorite {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    /* icon_info fills the first two columns */
    .favorite .icon-info {
      grid-column: 1 / span 2;
      min-width: 0;
      /* icon_info card: padding 0, no shadow, pill radius on left */
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
    }

    .favorite .power {
      grid-column: 3;
      width: 100%;
    }

    /*
     * list_3_items (list_items):
     * columns 1fr 1fr 1fr, column-gap 7px — NOT 12px
     */
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      row-gap: 0;
      gap: 0 7px;
      align-items: center;
      width: 100%;
    }

    /* widget_icon — shared .widget-btn already 42px / radius 14px / tint */
    .widget-btn {
      width: 100%;
      place-self: center;
    }

    /*
     * widget_temperature — label only, transparent bg, height 42px
     */
    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: transparent;
      box-shadow: none;
      padding: 0;
      text-align: center;
      line-height: 1;
    }
  `;
xr([
  x({ attribute: !1 })
], Ii.prototype, "hass", 2);
xr([
  y()
], Ii.prototype, "_config", 2);
Ii = xr([
  $("ulm-custom-card-tpx01-aircondition-card")
], Ii);
var Xd = Object.defineProperty, Qd = Object.getOwnPropertyDescriptor, $r = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Qd(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Xd(e, i, n), n;
};
function Cn(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let ji = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", [
          "input_number",
          "counter",
          "select",
          "input_select"
        ]),
        m("name"),
        S("icon")
      ],
      computeLabel: k({
        entity: "Entity",
        name: "Name (ulm_card_input_number_name)",
        icon: "Icon"
      }),
      computeHelper: C({
        entity: "input_number / counter / select / input_select — arrows call decrement/increment or previous/next"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_number.residents_home",
      icon: "mdi:counter"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || Cn(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Cn(e, "name", "ulm_card_input_number_name") || void 0,
      icon: Cn(e, "icon") || void 0,
      type: "custom:ulm-custom-card-input-number-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-number"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || "mdi:counter", o = this.hass.formatEntityState?.(t) || t.state, n = t.last_changed ? this._relativeTime(t.last_changed) : "";
    return c`
      <ha-card class="ulm-card ulm-input-number">
        <div class="stack">
          <div
            class="row"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._moreInfo());
    }}
          >
            <div class="icon-btn">
              <ha-icon .icon=${i}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${e}</div>
              <div class="label">${n}</div>
            </div>
          </div>
          <div class="controls">
            <button class="widget-btn" type="button" @click=${() => this._step(-1)}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="value-readout">${o}</div>
            <button class="widget-btn" type="button" @click=${() => this._step(1)}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _step(t) {
    if (!this.hass || !this._config) return;
    const e = this._config.entity, i = e.split(".")[0];
    if (i === "input_number") {
      this.hass.callService(
        "input_number",
        t < 0 ? "decrement" : "increment",
        { entity_id: e }
      );
      return;
    }
    if (i === "counter") {
      this.hass.callService(
        "counter",
        t < 0 ? "decrement" : "increment",
        { entity_id: e }
      );
      return;
    }
    (i === "select" || i === "input_select") && this.hass.callService(
      i,
      t < 0 ? "select_previous" : "select_next",
      { entity_id: e }
    );
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
ji.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-input-number {
      height: auto !important;
      display: block;
      padding: 12px;
    }

    ha-card.ulm-card.ulm-input-number > .stack {
      flex: none;
      gap: 12px;
    }

    .controls {
      gap: 0 7px;
      column-gap: 7px;
    }

    .icon-btn {
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .value-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }
  `;
$r([
  x({ attribute: !1 })
], ji.prototype, "hass", 2);
$r([
  y()
], ji.prototype, "_config", 2);
ji = $r([
  $("ulm-custom-card-input-number-card")
], ji);
var tu = Object.defineProperty, eu = Object.getOwnPropertyDescriptor, kr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? eu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && tu(e, i, n), n;
};
function jo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function iu(t, e) {
  if (typeof t == "number" && Number.isFinite(t) && t > 0) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
let Di = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "input_datetime"),
        m("name"),
        S("icon"),
        M("step")
      ],
      computeLabel: k({
        entity: "input_datetime entity",
        name: "Name (ulm_card_input_datetime_name)",
        icon: "Icon",
        step: "Minute step"
      }),
      computeHelper: C({
        entity: "Prefer has_time. Arrows adjust by step minutes.",
        step: "Default 15. Original YAML used opaque second offsets."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_datetime.alarm_weekday_time",
      name: "Alarm time",
      icon: "mdi:clock-outline",
      step: 15
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || jo(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: jo(e, "name", "ulm_card_input_datetime_name") || void 0,
      icon: jo(e, "icon") || void 0,
      step: iu(jo(e, "step"), 15),
      type: "custom:ulm-custom-card-input-datetime-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-datetime"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || "mdi:clock-outline", o = this.hass.formatEntityState?.(t) || t.state, n = t.last_changed ? this._relativeTime(t.last_changed) : "";
    return c`
      <ha-card class="ulm-card ulm-input-datetime">
        <div class="stack">
          <div
            class="row"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._moreInfo());
    }}
          >
            <div class="icon-btn">
              <ha-icon .icon=${i}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${e}</div>
              <div class="label">${n}</div>
            </div>
          </div>
          <div class="controls">
            <button class="widget-btn" type="button" @click=${() => this._adjust(-1)}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="value-readout">${o}</div>
            <button class="widget-btn" type="button" @click=${() => this._adjust(1)}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _adjust(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = this._config.step ?? 15, o = this._nextTime(e, t * i);
    o && this.hass.callService("input_datetime", "set_datetime", {
      entity_id: this._config.entity,
      time: o
    });
  }
  _nextTime(t, e) {
    if (!(t.attributes.has_time !== !1)) return null;
    let o;
    const n = Number(t.attributes.timestamp);
    if (Number.isFinite(n) && n > 0) {
      const s = new Date(n * 1e3);
      o = s.getHours() * 60 + s.getMinutes() + e;
    } else {
      const l = String(t.state || "00:00:00").split(":"), h = Number.parseInt(l[0] || "0", 10) || 0, p = Number.parseInt(l[1] || "0", 10) || 0;
      o = h * 60 + p + e;
    }
    o = (o % 1440 + 1440) % 1440;
    const r = Math.floor(o / 60), a = o % 60;
    return `${String(r).padStart(2, "0")}:${String(a).padStart(2, "0")}:00`;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Di.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-input-datetime {
      height: auto !important;
      display: block;
      padding: 12px;
    }

    ha-card.ulm-card.ulm-input-datetime > .stack {
      flex: none;
      gap: 12px;
    }

    .controls {
      gap: 0 7px;
      column-gap: 7px;
    }

    .icon-btn {
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .value-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
    }
  `;
kr([
  x({ attribute: !1 })
], Di.prototype, "hass", 2);
kr([
  y()
], Di.prototype, "_config", 2);
Di = kr([
  $("ulm-custom-card-input-datetime-card")
], Di);
var ou = Object.defineProperty, nu = Object.getOwnPropertyDescriptor, Cr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? nu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && ou(e, i, n), n;
};
function se(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ce(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Do(t) {
  if (!t) return !1;
  const e = t.state;
  return e === "on" || e === "True" || e === "true";
}
let Ai = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "update", !1),
        u("core_entity", "update", !1),
        u("supervisor_entity", "update", !1),
        u("os_entity", "update", !1),
        m("updates_available"),
        m("no_updates_available")
      ],
      computeLabel: k({
        entity: "Main entity (ulm_card_homeassistant_entity)",
        core_entity: "Core update (ulm_card_homeassistant_core)",
        supervisor_entity: "Supervisor (ulm_card_homeassistant_supervisor)",
        os_entity: "OS (ulm_card_homeassistant_os)",
        updates_available: "Title when updates available",
        no_updates_available: "Title when up to date"
      }),
      computeHelper: C({
        entity: "Drives icon badge (on / unavailable → party-popper)",
        core_entity: "Shows Core installed → latest in the label"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "update.demo_update_with_progress",
      core_entity: "update.demo_update_with_progress",
      supervisor_entity: "update.demo_add_on",
      os_entity: "update.demo_no_update",
      updates_available: "Updates available",
      no_updates_available: "Up to date"
    };
  }
  setConfig(t) {
    const e = t, i = ce(
      se(e, "core_entity", "ulm_card_homeassistant_core")
    ), o = ce(se(e, "entity", "ulm_card_homeassistant_entity")) || i || "";
    this._config = {
      ...t,
      entity: o,
      core_entity: i,
      supervisor_entity: ce(
        se(e, "supervisor_entity", "ulm_card_homeassistant_supervisor")
      ),
      os_entity: ce(se(e, "os_entity", "ulm_card_homeassistant_os")),
      updates_available: ce(se(e, "updates_available", "ulm_updates_available")) || "Updates available",
      no_updates_available: ce(se(e, "no_updates_available", "ulm_no_updates_available")) || "Up to date",
      type: "custom:ulm-custom-card-homeassistant-updates-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config.entity || this._config.core_entity || "", e = t ? this.hass.states[t] : void 0, i = this._entity(this._config.core_entity), o = this._entity(this._config.supervisor_entity), n = this._entity(this._config.os_entity), r = Do(i) || Do(o) || Do(n), a = !!e && (e.state === "on" || e.state === "unavailable"), s = f(this, "blue"), l = a ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: `rgba(${s}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, h = r ? this._config.updates_available : this._config.no_updates_available, p = this._labelLines(i, o, n);
    return c`
      <ha-card class="ulm-ha-updates">
        <div class="stack">
          <!-- icon_info_updates: grid 'i n' / 'i l' -->
          <div class="header">
            <div class="icon-cell">
              <div class="icon-btn" style=${d(l)}>
                <ha-icon icon="mdi:home-assistant"></ha-icon>
              </div>
              ${a ? c`<span
                    class="notification"
                    style=${d({
      backgroundColor: `rgba(${s}, 1)`
    })}
                  >
                    <ha-icon icon="mdi:party-popper"></ha-icon>
                  </span>` : _}
            </div>
            <div class="title">${h}</div>
            <div class="subtitle">${p}</div>
          </div>

          <!-- list_3_items: column-gap 7px -->
          <div class="widgets">
            <button
              class="widget"
              type="button"
              @click=${() => this._openUrl(
      "https://www.home-assistant.io/latest-release-notes/"
    )}
            >
              <ha-icon icon="mdi:file-document"></ha-icon>
            </button>
            <button
              class="widget"
              type="button"
              @click=${() => this._navigate("/developer-tools/yaml")}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
            <button
              class="widget"
              type="button"
              @click=${() => this._navigate("/config/dashboard")}
            >
              <ha-icon icon="mdi:update"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _entity(t) {
    if (!(!t || !this.hass))
      return this.hass.states[t];
  }
  _line(t, e) {
    if (!e) return null;
    const i = e.attributes.installed_version, o = e.attributes.latest_version;
    return Do(e) && i && o ? `${t}: ${i} → ${o}` : i ? `${t}: ${i}` : `${t}: ${e.state}`;
  }
  _labelLines(t, e, i) {
    if (t && e && i)
      return [
        this._line("Supervisor", e),
        this._line("Core", t),
        this._line("OS", i)
      ].join(`
`);
    const o = [
      this._line("Supervisor", e),
      this._line("Core", t),
      this._line("OS", i)
    ].filter(Boolean);
    return o.length ? o.join(`
`) : "—";
  }
  _openUrl(t) {
    window.open(t, "_blank", "noopener,noreferrer");
  }
  _navigate(t) {
    history.pushState(null, "", t), window.dispatchEvent(
      new CustomEvent("location-changed", {
        bubbles: !0,
        composed: !0,
        detail: { replace: !1 }
      })
    );
  }
};
Ai.styles = w`
    ${Yn}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-ha-updates {
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow);
      padding: 12px;
      height: auto;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /*
     * icon_info_updates styles.grid:
     *   areas 'i n' / 'i l'
     *   columns min-content auto
     *   rows min-content min-content
     * img_cell place-self: center → icon vertically centered on name+label
     */
    .header {
      display: grid;
      grid-template-areas:
        "icon title"
        "icon subtitle";
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      column-gap: 0;
      align-items: center;
      /* icon_info_updates card border-radius */
      border-radius: 21px 8px 8px 21px;
    }

    .icon-cell {
      grid-area: icon;
      place-self: center;
      position: relative;
      width: 42px;
      height: 42px;
    }

    .icon-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
      color: inherit;
    }

    /* custom_fields.notification — left 28px, top 8px */
    .notification {
      position: absolute;
      left: 28px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: grid;
      place-items: center;
      box-sizing: border-box;
      z-index: 1;
      line-height: 0;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    /* name: align-self end, margin-left 16px, margin-bottom 4px */
    .title {
      grid-area: title;
      align-self: end;
      justify-self: start;
      margin-left: 16px;
      margin-bottom: 4px;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      min-width: 0;
    }

    /* label: align-self start, margin-left 16px, opacity 40% */
    .subtitle {
      grid-area: subtitle;
      align-self: start;
      justify-self: start;
      margin-left: 16px;
      font-weight: bolder;
      font-size: 12px;
      line-height: 1.35;
      text-align: start;
      white-space: pre-line;
      opacity: 0.4;
      min-width: 0;
    }

    /* list_3_items: 1fr 1fr 1fr, column-gap 7px */
    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
      align-items: center;
    }

    /* widget_icon */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      font: inherit;
      box-sizing: border-box;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
Cr([
  x({ attribute: !1 })
], Ai.prototype, "hass", 2);
Cr([
  y()
], Ai.prototype, "_config", 2);
Ai = Cr([
  $("ulm-custom-card-homeassistant-updates-card")
], Ai);
var ru = Object.defineProperty, au = Object.getOwnPropertyDescriptor, Sr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? au(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && ru(e, i, n), n;
};
function Ht(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Ti = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["water_heater", "switch", "climate"]),
        m("name"),
        S("icon"),
        u("consumption_sensor", "sensor", !1),
        m("label_off"),
        m("label_idle"),
        m("label_heating")
      ],
      computeLabel: k({
        entity: "Water heater / switch",
        name: "Name",
        icon: "Icon",
        consumption_sensor: "Consumption sensor (W)",
        label_off: "Label when off",
        label_idle: "Label when idle (0 W)",
        label_heating: "Label prefix when heating"
      }),
      computeHelper: C({
        consumption_sensor: "When > 0, card turns red and shows Heating • {W}W",
        label_off: 'Default "Forced off" (original FR: Arrêt forcé)'
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "water_heater.demo_water_heater",
      icon: "mdi:waves",
      consumption_sensor: "sensor.power_consumption"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || Ht(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ht(e, "name") || void 0,
      icon: Ht(e, "icon") || void 0,
      consumption_sensor: Ht(e, "consumption_sensor", "ulm_card_water_heater_consumption") || void 0,
      label_off: Ht(e, "label_off") || void 0,
      label_idle: Ht(e, "label_idle") || void 0,
      label_heating: Ht(e, "label_heating") || void 0,
      type: "custom:ulm-custom-card-water-heater-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-water-heater"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._watts(), i = e > 0, o = t.state === "off", n = f(this, "red"), r = i ? {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)"
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = i ? { color: "rgb(250, 250, 250)" } : {}, s = i ? {
      backgroundColor: `rgba(${n}, var(--opacity-bg, 1))`
    } : {}, l = this._config.name || t.attributes.friendly_name || t.entity_id, h = this._config.icon || "mdi:waves", p = this._label(o, i, e);
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-water-heater": !0,
      heating: i
    })}
        style=${d(s)}
        @click=${() => this._moreInfo()}
      >
        <div class="row">
          <div class="icon-btn" style=${d(r)}>
            <ha-icon .icon=${h}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name" style=${d(a)}>${l}</div>
            <div class="label" style=${d(a)}>${p}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _watts() {
    const t = this._config?.consumption_sensor;
    if (!t || !this.hass) return 0;
    const e = this.hass.states[t];
    if (!e) return 0;
    const i = Number.parseFloat(e.state);
    return Number.isFinite(i) ? i : 0;
  }
  _label(t, e, i) {
    return t ? this._config?.label_off || "Forced off" : e ? `${this._config?.label_heating || "Heating"} • ${i}W` : this._config?.label_idle || "Idle";
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Ti.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-water-heater {
      height: auto;
      cursor: pointer;
    }

    .icon-btn ha-icon {
      color: inherit;
    }

    ha-card.heating .label {
      filter: none;
      opacity: 1;
    }
  `;
Sr([
  x({ attribute: !1 })
], Ti.prototype, "hass", 2);
Sr([
  y()
], Ti.prototype, "_config", 2);
Ti = Sr([
  $("ulm-custom-card-water-heater-card")
], Ti);
var su = Object.defineProperty, cu = Object.getOwnPropertyDescriptor, zr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? cu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && su(e, i, n), n;
};
function le(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ge(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ui = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["switch", "input_boolean", "light"]),
        m("name"),
        S("icon"),
        u("power_sensor", "sensor", !1),
        u("energy_sensor", "sensor", !1),
        u("time_sensor", "sensor", !1)
      ],
      computeLabel: k({
        entity: "Outlet / switch",
        name: "Name",
        icon: "Icon",
        power_sensor: "Power (W) — custom_card_more_power_outlet_power_sensor",
        energy_sensor: "Energy (kWh) — custom_card_more_power_outlet_energy_sensor",
        time_sensor: "Runtime — custom_card_more_power_outlet_time_sensor"
      }),
      computeHelper: C({
        time_sensor: "If value < 1, shown as Mins (×100); else Hrs"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "switch.decorative_lights",
      icon: "mdi:power-socket-eu",
      power_sensor: "sensor.power_consumption"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || le(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ge(le(e, "name")),
      icon: Ge(le(e, "icon")),
      power_sensor: Ge(
        le(e, "power_sensor", "custom_card_more_power_outlet_power_sensor")
      ),
      energy_sensor: Ge(
        le(
          e,
          "energy_sensor",
          "custom_card_more_power_outlet_energy_sensor"
        )
      ),
      time_sensor: Ge(
        le(e, "time_sensor", "custom_card_more_power_outlet_time_sensor")
      ),
      type: "custom:ulm-custom-card-more-power-outlet-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-more-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", o = R(this, e, "yellow", null, !1, !1), n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._config.icon || t.attributes.icon || "mdi:power-socket-eu", a = this.hass.formatEntityState?.(t) || t.state, s = this._buildLabel(e, a);
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-more-outlet": !0,
      on: e
    })}
        @click=${() => this._toggle()}
      >
        <div class="row">
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${n}</div>
            <div class="label">${s}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _state(t) {
    if (!(!t || !this.hass))
      return this.hass.states[t]?.state;
  }
  _timePart(t) {
    const e = Number.parseFloat(t);
    return Number.isFinite(e) ? e < 1 ? `${e * 100}Mins` : `${e}Hrs` : t;
  }
  _buildLabel(t, e) {
    const i = this._config, o = this._state(i.power_sensor), n = this._state(i.energy_sensor), r = this._state(i.time_sensor), a = [];
    if (t)
      return o != null && a.push(`${o}W`), n != null && a.push(`${n}kWh`), r != null && a.push(this._timePart(r)), a.length ? a.join(" • ") : e;
    if (n != null) {
      const s = Number.parseFloat(n);
      if (Number.isFinite(s) && s > 0)
        return `${e} • ${n}kWh`;
    }
    return e;
  }
  _toggle() {
    if (!this.hass || !this._config) return;
    const t = this._config.entity, e = t.split(".")[0];
    this.hass.callService(e, "toggle", { entity_id: t });
  }
};
Ui.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-more-outlet {
      height: auto;
      cursor: pointer;
    }
  `;
zr([
  x({ attribute: !1 })
], Ui.prototype, "hass", 2);
zr([
  y()
], Ui.prototype, "_config", 2);
Ui = zr([
  $("ulm-custom-card-more-power-outlet-card")
], Ui);
var lu = Object.defineProperty, du = Object.getOwnPropertyDescriptor, nn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? du(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && lu(e, i, n), n;
};
function Rt(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : t == null || t === "" ? e : !!t;
}
function tt(t) {
  return typeof t == "string" && t.length && t !== "false" ? t : void 0;
}
let Ce = class extends v {
  constructor() {
    super(...arguments), this._onSliderInput = (t) => {
      const e = Number(t.target.value);
      Number.isNaN(e) || (this._dragPct = e);
    }, this._onSliderChange = (t) => {
      if (!this.hass || !this._config) return;
      const e = Number(t.target.value);
      Number.isNaN(e) || (this._dragPct = e, this.hass.callService("fan", "set_percentage", {
        entity_id: this._config.entity,
        percentage: e
      }));
    }, this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "fan"),
        D([m("name"), S("icon")]),
        A("color"),
        b("enable_horizontal"),
        b("enable_collapse"),
        b("variant_blue"),
        b("force_background_color"),
        b("enable_slider"),
        b("enable_button"),
        D([M("slider_min"), M("slider_max")]),
        S("button_icon"),
        m("button_service"),
        m("oscillate_attribute"),
        D([m("temp_attribute"), m("hum_attribute")]),
        b("always_show_attributes")
      ],
      computeLabel: k({
        entity: "Fan entity",
        name: "Name",
        icon: "Icon",
        color: "Color",
        enable_horizontal: "Horizontal (ulm_card_fan_horizontal)",
        enable_collapse: "Collapse when off (collapsable)",
        variant_blue: "Blue filled card when on",
        force_background_color: "Force background color when on",
        enable_slider: "Enable speed slider",
        enable_button: "Enable oscillation button (ulm_show_button)",
        slider_min: "Slider min",
        slider_max: "Slider max",
        button_icon: "Button icon (ulm_button_icon)",
        button_service: "Button service (ulm_button_service)",
        oscillate_attribute: "Oscillate attribute (default oscillate)",
        temp_attribute: "Temp attribute (default temp)",
        hum_attribute: "Humidity attribute (default hum)",
        always_show_attributes: "Always show temp/humidity when off"
      }),
      computeHelper: C({
        variant_blue: "Matches custom_card_saxel_fan_blue — solid blue when on",
        enable_collapse: "Hide slider + button when fan is off",
        button_service: "e.g. fan.oscillate",
        oscillate_attribute: "Default oscillate (also tries oscillating)"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "fan.living_room_fan",
      enable_slider: !0,
      enable_button: !0,
      enable_collapse: !0,
      color: "blue"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.ulm_card_fan_entity;
    if (!i) throw new Error("Please define an entity");
    const o = Rt(
      t.variant_blue ?? e.variant_blue ?? e.ulm_card_saxel_fan_blue,
      !1
    );
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_fan_name,
      icon: tt(t.icon) || tt(e.ulm_card_fan_icon) || void 0,
      color: t.color || e.ulm_card_fan_color || "blue",
      enable_horizontal: Rt(
        t.enable_horizontal ?? e.ulm_card_fan_enable_horizontal ?? e.ulm_card_fan_horizontal,
        !1
      ),
      enable_collapse: Rt(
        t.enable_collapse ?? e.ulm_card_fan_enable_collapse ?? e.collapsable,
        !0
      ),
      force_background_color: Rt(
        t.force_background_color ?? e.ulm_card_fan_force_background_color,
        !1
      ),
      variant_blue: o,
      enable_slider: Rt(
        t.enable_slider ?? e.ulm_card_fan_enable_slider,
        !0
      ),
      slider_min: Number(
        t.slider_min ?? e.ulm_card_fan_slider_min ?? 0
      ),
      slider_max: Number(
        t.slider_max ?? e.ulm_card_fan_slider_max ?? 100
      ),
      enable_button: Rt(
        t.enable_button ?? e.ulm_card_fan_enable_button ?? e.ulm_show_button,
        !0
      ),
      button_icon: tt(t.button_icon) || tt(e.ulm_card_fan_button_icon) || tt(e.ulm_button_icon) || "mdi:rotate-3d-variant",
      button_service: tt(t.button_service) || tt(e.ulm_card_fan_button_service) || tt(e.ulm_button_service) || "fan.oscillate",
      oscillate_attribute: tt(t.oscillate_attribute) || tt(e.ulm_card_fan_oscillate_attribute) || tt(e.oscillate_attribute) || "oscillate",
      temp_attribute: tt(t.temp_attribute ?? e.ulm_card_fan_temp_attribute) || "temp",
      hum_attribute: tt(t.hum_attribute ?? e.ulm_card_fan_hum_attribute) || "hum",
      always_show_attributes: Rt(
        t.always_show_attributes ?? e.always_show_attributes,
        !1
      ),
      type: "custom:ulm-custom-card-saxel-fan-card"
    };
  }
  getCardSize() {
    if (this._config?.enable_horizontal) return 1;
    let t = 1;
    return this._config?.enable_slider && t++, t;
  }
  getGridOptions() {
    return {
      columns: this._config?.enable_horizontal ? 12 : 6,
      min_columns: this._config?.enable_horizontal ? 6 : 3,
      max_columns: 12
    };
  }
  _oscAttrKeys() {
    const t = this._config?.oscillate_attribute || "oscillate";
    return [.../* @__PURE__ */ new Set([t, "oscillating", "oscillate"])];
  }
  _oscillating(t) {
    for (const e of this._oscAttrKeys())
      if (e in t.attributes) return !!t.attributes[e];
    return !1;
  }
  _label(t) {
    if (t.state === "unavailable") return "Unavailable";
    const e = t.state !== "off" || !!this._config?.always_show_attributes;
    let i = "";
    if (e) {
      const o = this._config?.temp_attribute;
      if (o && t.attributes[o] != null) {
        const r = Math.round(Number(t.attributes[o]) || 0);
        i += ` • ${r}°C`;
      }
      const n = this._config?.hum_attribute;
      if (n && t.attributes[n] != null) {
        const r = Math.round(Number(t.attributes[n]) || 0);
        i += ` • ${r}%`;
      }
    }
    if (t.state !== "off") {
      const o = t.attributes.percentage;
      return o != null ? `${Number(o) || 0}%${i}` : `On${i}`;
    }
    return `Off${i}`;
  }
  _sliderStep(t) {
    const e = Number(t.attributes.percentage_step);
    return !Number.isNaN(e) && e > 0 ? Math.max(1, Math.round(e)) : 1;
  }
  updated(t) {
    if ((t.has("hass") || t.has("_config")) && this._dragPct != null && this._config && this.hass) {
      const e = this.hass.states[this._config.entity], i = Number(e?.attributes.percentage);
      !Number.isNaN(i) && Math.abs(i - this._dragPct) < 1 && (this._dragPct = void 0);
    }
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = f(this, i), n = (!!this._config.force_background_color || !!this._config.variant_blue) && e, r = !!this._config.enable_collapse && !e, a = !!this._config.enable_slider && !r, s = !!this._config.enable_button && !!this._config.enable_slider && !r, l = this._config.name || t.attributes.friendly_name || t.entity_id, h = this._config.icon || t.attributes.icon || "mdi:fan", p = this._config.slider_min ?? 0, g = this._config.slider_max ?? 100, z = this._sliderStep(t), P = Number(t.attributes.percentage), T = !Number.isNaN(P) ? Math.min(g, Math.max(p, P)) : e ? g : p, N = this._dragPct != null ? Math.min(g, Math.max(p, this._dragPct)) : T, U = e || this._dragPct != null ? (N - p) / (g - p || 1) * 100 : 0, F = n ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, nt = e ? {
      color: n ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: n ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, G = n ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, ut = this._oscillating(t), oe = this._oscButtonStyle(e, ut, n, o), je = !!this._config.enable_horizontal;
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      fan: !0,
      "saxel-fan": !0,
      horizontal: je,
      "force-bg": n
    })}
        style=${d(
      F ? {
        "--ha-card-background": F,
        background: F,
        backgroundColor: F
      } : {}
    )}
      >
        <div class=${L({ stack: !0, horizontal: je })}>
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(nt)}
                @click=${() => this._call("toggle")}
              >
                <ha-icon .icon=${h}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._moreInfo}>
                <div class="name" style=${d(G.name)}>
                  ${l}
                </div>
                <div class="label" style=${d(G.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${a || s ? c`<div
                class=${L({
      "slider-row": !0,
      "with-button": s
    })}
              >
                ${a ? c`<div
                      class="slider-wrap"
                      style=${d(
      e ? {
        background: n ? `rgba(${o}, 0.3)` : `rgba(${o}, 0.1)`
      } : {
        background: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      }
    )}
                    >
                      <div
                        class="slider-fill"
                        style=${d({
      width: `${U}%`,
      background: e || this._dragPct != null ? n ? "rgb(250,250,250)" : `rgba(${o}, 0.8)` : "rgba(var(--color-grey, 187, 187, 187), 0.8)"
    })}
                      ></div>
                      <input
                        type="range"
                        min=${p}
                        max=${g}
                        step=${z}
                        .value=${String(N)}
                        @input=${this._onSliderInput}
                        @change=${this._onSliderChange}
                      />
                    </div>` : _}
                ${s ? c`<button
                      class="widget-btn osc-btn"
                      style=${d(oe)}
                      @click=${() => this._toggleOscillate(t)}
                      title="oscillate"
                    >
                      <ha-icon
                        icon=${this._config.button_icon || "mdi:rotate-3d-variant"}
                      ></ha-icon>
                    </button>` : _}
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _oscButtonStyle(t, e, i, o) {
    return t ? e ? {
      backgroundColor: i ? "rgba(250, 250, 250, 1)" : `rgba(${o}, 0.2)`,
      color: `rgba(${o}, 1)`
    } : i ? {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${o}, 1)`
    } : {} : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)"
    };
  }
  _call(t) {
    !this.hass || !this._config || this.hass.callService("fan", t, { entity_id: this._config.entity });
  }
  _toggleOscillate(t) {
    if (!this.hass || !this._config) return;
    const e = this._config.button_service || "fan.oscillate", [i, o] = e.includes(".") ? e.split(".", 2) : ["fan", e];
    this.hass.callService(i, o, {
      entity_id: this._config.entity,
      oscillating: !this._oscillating(t)
    });
  }
};
Ce.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.saxel-fan {
        height: auto;
        overflow: visible;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .stack.horizontal {
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .stack.horizontal .header {
        flex: 1 1 40%;
        min-width: 0;
      }

      .stack.horizontal .slider-row {
        flex: 1 1 60%;
        min-width: 0;
      }

      .slider-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        align-items: center;
      }

      .slider-row.with-button {
        grid-template-columns: 2fr 1fr;
      }

      .osc-btn {
        width: 100%;
        min-width: 42px;
      }

      .slider-wrap {
        height: 42px;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
      }

      .slider-wrap input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 42px;
        margin: 0;
        background: transparent;
        cursor: pointer;
      }

      .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
        height: 42px;
        border-radius: 14px;
        background: transparent;
      }

      .slider-wrap input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 42px;
        border-radius: 0;
        background: transparent;
      }
    `
];
nn([
  x({ attribute: !1 })
], Ce.prototype, "hass", 2);
nn([
  y()
], Ce.prototype, "_config", 2);
nn([
  y()
], Ce.prototype, "_dragPct", 2);
Ce = nn([
  $("ulm-custom-card-saxel-fan-card")
], Ce);
var uu = Object.defineProperty, _u = Object.getOwnPropertyDescriptor, Er = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? _u(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && uu(e, i, n), n;
};
function We(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ke(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Fi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = () => {
      this._config && this._moreInfoEntity(this._config.entity);
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["device_tracker", "person"]),
        m("name"),
        u("lock_entity", "lock", !1),
        u("energy_entity", "sensor", !1),
        u("range_entity", "sensor", !1)
      ],
      computeLabel: k({
        entity: "Tracker (ulm_card_schumijo_car_tracker)",
        name: "Name (ulm_card_schumijo_car_name)",
        lock_entity: "Lock (ulm_card_schumijo_car_lock)",
        energy_entity: "Energy (ulm_card_schumijo_car_energy_level)",
        range_entity: "Range (ulm_card_schumijo_car_range)"
      }),
      computeHelper: C({
        entity: "Person / device_tracker used for home vs away badge",
        lock_entity: "locked → blue lock; else red lock-open"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.alessandro_sabbadini",
      name: "Car",
      lock_entity: "lock.front_door_lock",
      energy_entity: "sensor.power_consumption",
      range_entity: "sensor.outside_temperature"
    };
  }
  setConfig(t) {
    const e = t, i = Ke(
      We(e, "entity", "ulm_card_schumijo_car_tracker")
    );
    if (!i) throw new Error("Please define a tracker entity");
    this._config = {
      ...t,
      entity: i,
      name: Ke(We(e, "name", "ulm_card_schumijo_car_name")),
      lock_entity: Ke(We(e, "lock_entity", "ulm_card_schumijo_car_lock")),
      energy_entity: Ke(
        We(e, "energy_entity", "ulm_card_schumijo_car_energy_level")
      ),
      range_entity: Ke(
        We(e, "range_entity", "ulm_card_schumijo_car_range")
      ),
      type: "custom:ulm-custom-card-schumijo-car-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-schumijo-car"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = t.last_changed ? this._relativeTime(t.last_changed) : "", o = t.state === "home", n = f(this, o ? "blue" : "green"), r = o ? "mdi:home-variant" : "mdi:road-variant", a = this._config.lock_entity, s = a ? this.hass.states[a] : void 0, l = s?.state === "locked", h = f(this, l ? "blue" : "red"), p = l ? "mdi:lock" : "mdi:lock-open";
    return c`
      <ha-card class="ulm-card ulm-schumijo-car">
        <button class="header" @click=${this._moreInfo}>
          <div class="img-wrap">
            <div class="img-cell">
              <ha-icon icon="mdi:car"></ha-icon>
            </div>
            <span
              class="badge tracker"
              style=${d({ backgroundColor: `rgba(${n}, 1)` })}
              title=${t.state}
            >
              <ha-icon .icon=${r}></ha-icon>
            </span>
            ${a ? c`<span
                  class="badge lock"
                  style=${d({
      backgroundColor: `rgba(${h}, 1)`
    })}
                  title=${s?.state || "lock"}
                >
                  <ha-icon .icon=${p}></ha-icon>
                </span>` : _}
          </div>
          <div class="info">
            <div class="name">${e}</div>
            <div class="label">${i}</div>
          </div>
        </button>

        <div class="widgets">
          ${this._metricWidget(this._config.energy_entity, "Energy")}
          ${this._metricWidget(this._config.range_entity, "Range")}
        </div>
      </ha-card>
    `;
  }
  _metricWidget(t, e) {
    if (!t || !this.hass)
      return c`<div class="widget empty"></div>`;
    const i = this.hass.states[t];
    if (!i)
      return c`<div class="widget">
        <div class="w-val">—</div>
        <div class="w-name">${e}</div>
      </div>`;
    const o = Number.parseFloat(i.state), n = Number.isFinite(o) ? String(Math.round(o)) : i.state, r = i.attributes.unit_of_measurement || "", a = r ? `${r} ${e}` : e, s = i.attributes.icon || "mdi:gauge";
    return c`
      <button class="widget" @click=${() => this._moreInfoEntity(t)}>
        <div class="w-row">
          <ha-icon .icon=${s}></ha-icon>
          <span class="w-val">${n}</span>
        </div>
        <div class="w-name">${a}</div>
      </button>
    `;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
  _moreInfoEntity(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
Fi.styles = [
  E,
  w`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-schumijo-car {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        overflow: visible;
      }

      .header {
        display: grid;
        grid-template-columns: min-content 1fr;
        gap: 0;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        text-align: left;
        color: inherit;
        width: 100%;
      }

      .img-wrap {
        position: relative;
        width: 42px;
        height: 42px;
      }

      .img-cell {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .img-cell ha-icon {
        --mdc-icon-size: 20px;
      }

      .badge {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 2;
        pointer-events: none;
      }

      .badge.tracker {
        left: 30px;
        top: -2px;
      }

      .badge.lock {
        left: 30px;
        top: 24px;
      }

      .badge ha-icon {
        --mdc-icon-size: 10px;
        color: var(--primary-background-color, #fff);
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .widgets {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .widget {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 42px;
        border: none;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        padding: 4px 8px;
        cursor: pointer;
        color: inherit;
        text-align: left;
      }

      .widget.empty {
        visibility: hidden;
      }

      .w-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .w-row ha-icon {
        --mdc-icon-size: 20px;
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .w-val {
        font-size: 18px;
        font-weight: 600;
      }

      .w-name {
        font-weight: bold;
        font-size: 10px;
        filter: opacity(40%);
        margin-top: 1px;
      }
    `
];
Er([
  x({ attribute: !1 })
], Fi.prototype, "hass", 2);
Er([
  y()
], Fi.prototype, "_config", 2);
Fi = Er([
  $("ulm-custom-card-schumijo-car-card")
], Fi);
var mu = Object.defineProperty, hu = Object.getOwnPropertyDescriptor, rn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? hu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && mu(e, i, n), n;
};
function it(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ct(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ba(t, e) {
  return typeof t == "string" && St.includes(t) ? t : e;
}
function Ha(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function Ao(t, e, i) {
  const o = t[`entity_${e}`];
  if (o && typeof o == "object" && !Array.isArray(o)) {
    const n = o;
    return {
      entity: Ct(it(n, "entity_id", "entity")),
      name: Ct(it(n, "name")),
      icon: Ct(it(n, "icon")),
      color: Ba(it(n, "color"), i),
      max: Ha(it(n, "max", "max_value", "max_1"))
    };
  }
  return {
    entity: Ct(it(t, `entity_${e}`)),
    name: Ct(it(t, `name_${e}`)),
    icon: Ct(it(t, `icon_${e}`)),
    color: Ba(it(t, `color_${e}`), i),
    max: Ha(it(t, `max_${e}`))
  };
}
let Se = class extends v {
  constructor() {
    super(...arguments), this._metrics = [];
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["switch", "input_boolean"]),
        m("name"),
        S("icon"),
        u("entity_1", void 0, !1),
        u("entity_2", void 0, !1),
        u("entity_3", void 0, !1),
        u("entity_4", void 0, !1),
        m("name_1"),
        m("name_2"),
        m("name_3"),
        m("name_4"),
        S("icon_1"),
        S("icon_2"),
        S("icon_3"),
        S("icon_4"),
        A("color_1"),
        A("color_2"),
        A("color_3"),
        A("color_4"),
        M("max_1"),
        M("max_2"),
        M("max_3"),
        M("max_4")
      ],
      computeLabel: k({
        entity: "NAS power switch",
        name: "Name",
        icon: "Status icon",
        entity_1: "Metric 1",
        entity_2: "Metric 2",
        entity_3: "Metric 3",
        entity_4: "Metric 4",
        name_1: "Name 1",
        name_2: "Name 2",
        name_3: "Name 3",
        name_4: "Name 4",
        icon_1: "Icon 1",
        icon_2: "Icon 2",
        icon_3: "Icon 3",
        icon_4: "Icon 4",
        color_1: "Color 1",
        color_2: "Color 2",
        color_3: "Color 3",
        color_4: "Color 4",
        max_1: "Max 1 (optional)",
        max_2: "Max 2",
        max_3: "Max 3",
        max_4: "Max 4"
      }),
      computeHelper: C({
        entity: "When off: single status row. When on: status + metrics",
        max_1: "Shown as value/max when set"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "switch.ac",
      name: "NAS",
      icon: "mdi:nas",
      entity_1: "sensor.power_consumption",
      name_1: "CPU",
      icon_1: "mdi:cpu-64-bit",
      color_1: "blue",
      entity_2: "sensor.outside_temperature",
      name_2: "Temp",
      icon_2: "mdi:thermometer",
      color_2: "red",
      entity_3: "sensor.outside_humidity",
      name_3: "RAM",
      icon_3: "mdi:memory",
      color_3: "green",
      entity_4: "sensor.demo",
      name_4: "Disk",
      icon_4: "mdi:harddisk",
      color_4: "yellow"
    };
  }
  setConfig(t) {
    const e = t, i = Ct(it(e, "entity"));
    if (!i) throw new Error("Please define a power entity");
    const o = ["yellow", "blue", "red", "green"], n = Ao(e, 1, o[0]), r = Ao(e, 2, o[1]), a = Ao(e, 3, o[2]), s = Ao(e, 4, o[3]);
    this._metrics = [n, r, a, s], this._config = {
      ...t,
      entity: i,
      name: Ct(it(e, "name")),
      icon: Ct(it(e, "icon")) || "mdi:nas",
      entity_1: n.entity,
      entity_2: r.entity,
      entity_3: a.entity,
      entity_4: s.entity,
      name_1: n.name,
      name_2: r.name,
      name_3: a.name,
      name_4: s.name,
      icon_1: n.icon,
      icon_2: r.icon,
      icon_3: a.icon,
      icon_4: s.icon,
      color_1: n.color,
      color_2: r.color,
      color_3: a.color,
      color_4: s.color,
      max_1: n.max,
      max_2: r.max,
      max_3: a.max,
      max_4: s.max,
      type: "custom:ulm-custom-card-nik-nas-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-nik-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.name || t.attributes.friendly_name || "Status", o = this._config.icon || "mdi:nas", n = f(this, "blue"), r = e ? {
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = this.hass.formatEntityState?.(t) || (e ? "On" : "Off"), s = this._metrics.filter((l) => l.entity);
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-nik-nas": !0,
      on: e
    })}
      >
        <button class="status" @click=${() => this._moreInfo(this._config.entity)}>
          <div class="icon-btn" style=${d(r)}>
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${i}</div>
            <div class="label">${a}</div>
          </div>
        </button>

        ${e && s.length ? c`<div class="metrics">
              ${s.map((l) => this._metricRow(l))}
            </div>` : _}
      </ha-card>
    `;
  }
  _metricRow(t) {
    if (!t.entity || !this.hass) return _;
    const e = this.hass.states[t.entity], i = t.name || e?.attributes.friendly_name || t.entity, o = t.icon || e?.attributes.icon || "mdi:chart-donut", n = f(this, t.color), r = e ? Number.parseFloat(e.state) : NaN, a = e?.attributes.unit_of_measurement || "";
    let s;
    if (!e) s = "—";
    else if (Number.isFinite(r)) {
      const l = Math.round(r * 10) / 10;
      s = t.max != null ? `${l}/${t.max}${a ? ` ${a}` : ""}` : `${l}${a ? ` ${a}` : ""}`;
    } else
      s = `${e.state}${a ? ` ${a}` : ""}`;
    return c`
      <button
        class="metric"
        @click=${() => this._moreInfo(t.entity)}
      >
        <div
          class="m-icon"
          style=${d({
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
    })}
        >
          <ha-icon .icon=${o}></ha-icon>
        </div>
        <div class="m-info">
          <div class="m-name">${i}</div>
          <div class="m-val">${s}</div>
        </div>
      </button>
    `;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
Se.styles = [
  E,
  w`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-nik-nas {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
        border: 2px solid var(--google-grey, #9e9e9e);
        border-radius: 14px;
        background: transparent;
        padding: 8px;
        cursor: pointer;
        color: inherit;
        text-align: left;
        box-sizing: border-box;
      }

      .icon-btn {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .metrics {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        padding: 4px 0;
        cursor: pointer;
        color: inherit;
        text-align: left;
        width: 100%;
      }

      .m-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .m-icon ha-icon {
        --mdc-icon-size: 18px;
      }

      .m-info {
        margin-left: 10px;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }

      .m-name {
        font-size: 12px;
        font-weight: bold;
        filter: opacity(40%);
      }

      .m-val {
        font-size: 14px;
        font-weight: 600;
      }
    `
];
rn([
  x({ attribute: !1 })
], Se.prototype, "hass", 2);
rn([
  y()
], Se.prototype, "_config", 2);
rn([
  y()
], Se.prototype, "_metrics", 2);
Se = rn([
  $("ulm-custom-card-nik-nas-card")
], Se);
var pu = Object.defineProperty, gu = Object.getOwnPropertyDescriptor, an = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? gu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && pu(e, i, n), n;
};
function et(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function rt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function fu(t) {
  if (t) {
    if (typeof t == "string") {
      try {
        const e = JSON.parse(t);
        if (e && typeof e == "object")
          return e;
      } catch {
        return;
      }
      return;
    }
    if (typeof t == "object") return t;
  }
}
let ze = class extends v {
  constructor() {
    super(...arguments), this._phases = [];
  }
  static getConfigForm() {
    return {
      schema: [
        u("power_entity", ["switch", "input_boolean"]),
        m("name"),
        S("icon"),
        u("machine_state", void 0, !1),
        u("job_state", void 0, !1),
        u("job_progress", ["sensor", "number"], !1),
        m("job_states"),
        m("label_idle"),
        m("label_running"),
        m("machine_stop_state"),
        m("start_service"),
        m("pause_service"),
        m("stop_service")
      ],
      computeLabel: k({
        power_entity: "Power (ulm_custom_card_washer_power)",
        name: "Name",
        icon: "Icon",
        machine_state: "Machine state entity",
        job_state: "Job / phase state entity",
        job_progress: "Progress entity (%)",
        job_states: "Phases JSON ({state1:{name,icon},...})",
        label_idle: "Idle label",
        label_running: "Running label",
        machine_stop_state: "Stop state value (default stop)",
        start_service: "Start service (domain.service)",
        pause_service: "Pause service",
        stop_service: "Stop service"
      }),
      computeHelper: C({
        job_states: 'e.g. {"state1":{"name":"wash","icon":"mdi:washing-machine"}}',
        start_service: "Called with entity_id = power_entity when set"
      })
    };
  }
  static getStubConfig() {
    return {
      power_entity: "switch.decorative_lights",
      name: "Washer",
      icon: "mdi:washing-machine",
      machine_state: "sensor.demo",
      job_progress: "sensor.power_consumption",
      job_states: JSON.stringify({
        state1: { name: "wash", icon: "mdi:waves" },
        state2: { name: "rinse", icon: "mdi:water" },
        state3: { name: "spin", icon: "mdi:rotate-right" }
      })
    };
  }
  setConfig(t) {
    const e = t, i = rt(
      et(e, "power_entity", "ulm_custom_card_washer_power", "entity")
    );
    if (!i) throw new Error("Please define power_entity");
    const o = fu(
      et(e, "job_states", "ulm_custom_card_washer_job_states")
    );
    if (this._phases = [], o)
      for (let n = 1; n <= 5; n++) {
        const r = o[`state${n}`];
        r?.name && r?.icon && this._phases.push(r);
      }
    this._config = {
      ...t,
      power_entity: i,
      name: rt(et(e, "name")),
      icon: rt(et(e, "icon")),
      machine_state: rt(
        et(e, "machine_state", "ulm_custom_card_washer_machine_state")
      ),
      job_state: rt(
        et(e, "job_state", "ulm_custom_card_washer_job_state")
      ),
      job_progress: rt(
        et(e, "job_progress", "ulm_custom_card_washer_job_progress")
      ),
      job_states: o,
      label_idle: rt(
        et(e, "label_idle", "ulm_custom_card_washer_label_idle")
      ),
      label_running: rt(
        et(e, "label_running", "ulm_custom_card_washer_label_running")
      ),
      machine_stop_state: rt(
        et(
          e,
          "machine_stop_state",
          "ulm_custom_card_washer_machine_stop_state"
        )
      ) || "stop",
      start_service: rt(et(e, "start_service")),
      pause_service: rt(et(e, "pause_service")),
      stop_service: rt(et(e, "stop_service")),
      type: "custom:ulm-custom-card-haven-washer-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.power_entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-haven-washer"
        ><div class="warning">
          Entity not found: ${this._config.power_entity}
        </div></ha-card
      >`;
    const e = t.state === "on", i = f(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._config.icon || t.attributes.icon || "mdi:washing-machine", a = this._label(e), s = this._config.job_state ? this.hass.states[this._config.job_state]?.state : void 0, l = this._progressPct(), h = e && (!!this._config.start_service || !!this._config.pause_service || !!this._config.stop_service);
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-haven-washer": !0,
      on: e
    })}
      >
        <button
          class="header"
          @click=${() => this._moreInfo(this._config.power_entity)}
        >
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${n}</div>
            <div class="label">${a}</div>
          </div>
        </button>

        ${e && this._phases.length ? c`<div class="phases">
              ${this._phases.map((p) => {
      const g = s != null && p.name != null && String(s).toLowerCase() === String(p.name).toLowerCase();
      return c`
                  <div
                    class=${L({ phase: !0, active: g })}
                    title=${p.name || ""}
                  >
                    <ha-icon .icon=${p.icon || "mdi:circle"}></ha-icon>
                  </div>
                `;
    })}
            </div>` : _}

        ${e && l != null ? c`<div class="progress-wrap">
              <div
                class="progress-fill"
                style=${d({
      width: `${l}%`,
      background: `rgba(${i}, 0.35)`
    })}
              ></div>
              <span class="progress-label">${Math.round(l)}%</span>
            </div>` : _}

        ${h ? c`<div class="controls">
              ${this._config.start_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.start_service)}
                  >
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>` : _}
              ${this._config.pause_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.pause_service)}
                  >
                    <ha-icon icon="mdi:pause"></ha-icon>
                  </button>` : _}
              ${this._config.stop_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.stop_service)}
                  >
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>` : _}
            </div>` : _}
      </ha-card>
    `;
  }
  _label(t) {
    const e = this._config;
    if (!t) return e.label_idle || "idle";
    const i = e.machine_stop_state || "stop";
    if (e.machine_state && this.hass) {
      const o = this.hass.states[e.machine_state];
      if (o && o.state !== i)
        return e.label_running || "run";
    }
    if (e.job_state && this.hass) {
      const o = this.hass.states[e.job_state];
      if (o?.state) return String(o.state);
    }
    return e.label_idle || "idle";
  }
  _progressPct() {
    const t = this._config?.job_progress;
    if (!t || !this.hass) return null;
    const e = this.hass.states[t];
    if (!e) return null;
    const i = Number.parseFloat(e.state);
    return Number.isFinite(i) ? Math.max(0, Math.min(100, i)) : null;
  }
  _runService(t) {
    if (!this.hass || !this._config) return;
    const [e, i] = t.includes(".") ? t.split(".", 2) : ["homeassistant", t];
    this.hass.callService(e, i, {
      entity_id: this._config.power_entity
    });
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
ze.styles = [
  E,
  w`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-haven-washer {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .header {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: inherit;
        text-align: left;
        width: 100%;
      }

      .icon-btn {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .phases {
        display: flex;
        gap: 7px;
        justify-content: center;
        padding: 8px;
        border-radius: var(--border-radius, 14px);
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      }

      .phase {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        opacity: 0.45;
      }

      .phase.active {
        opacity: 1;
        background: white;
        color: black;
        transform: scale(1.08);
      }

      .phase ha-icon {
        --mdc-icon-size: 20px;
      }

      .progress-wrap {
        position: relative;
        height: 28px;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.12);
        overflow: hidden;
      }

      .progress-fill {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 14px;
      }

      .progress-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        z-index: 1;
      }

      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(42px, 1fr));
        gap: 8px;
      }

      .ctrl {
        height: 42px;
        border: none;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        cursor: pointer;
        color: inherit;
        display: grid;
        place-items: center;
      }

      .ctrl ha-icon {
        --mdc-icon-size: 22px;
      }
    `
];
an([
  x({ attribute: !1 })
], ze.prototype, "hass", 2);
an([
  y()
], ze.prototype, "_config", 2);
an([
  y()
], ze.prototype, "_phases", 2);
ze = an([
  $("ulm-custom-card-haven-washer-card")
], ze);
var bu = Object.defineProperty, yu = Object.getOwnPropertyDescriptor, sn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? yu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && bu(e, i, n), n;
};
const vu = [
  { rgb: [255, 255, 255], css: "rgba(255, 255, 255, 0.8)" },
  { rgb: [245, 68, 54], css: "rgba(245, 68, 54, 0.8)" },
  { rgb: [51, 102, 204], css: "rgba(51, 102, 204, 0.8)" },
  { rgb: [51, 204, 51], css: "rgba(51, 204, 51, 0.8)" },
  { rgb: [255, 0, 255], css: "rgba(255, 0, 255, 0.8)" },
  { rgb: [0, 255, 255], css: "rgba(0, 255, 255, 0.8)" }
];
function To(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Ee = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "light"),
        m("name"),
        S("icon"),
        M("transition")
      ],
      computeLabel: k({
        entity: "Light",
        name: "Name (ulm_card_light_colorpick_name)",
        icon: "Icon",
        transition: "Color transition seconds"
      }),
      computeHelper: C({
        transition: "Default 1 — passed to light.turn_on for RGB presets"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "light.living_room_rgbww_lights",
      icon: "mdi:lightbulb",
      transition: 1
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || To(e, "entity");
    if (!i) throw new Error("Please define an entity");
    const o = Number(To(e, "transition", "ulm_card_light_colorpick_transition"));
    this._config = {
      ...t,
      entity: i,
      name: To(
        e,
        "name",
        "ulm_card_light_colorpick_name",
        "ulm_card_light_slider_horizontal_name"
      ) || void 0,
      icon: To(e, "icon") || void 0,
      transition: Number.isFinite(o) && o >= 0 ? o : 1,
      type: "custom:ulm-custom-card-light-colorpick-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-light-colorpick"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = f(this, "yellow"), o = t.attributes.brightness, n = e && typeof o == "number" ? Math.round(o / 2.55) : void 0, r = this._dragPct ?? n ?? 0, a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:lightbulb", l = R(this, e, "yellow", null, !1, !1), h = n !== void 0 ? `${n}%` : this.hass.formatEntityState?.(t) || t.state, p = e ? {
      backgroundColor: `rgba(${i}, var(--opacity-bg, 1))`
    } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-light-colorpick": !0,
      on: e
    })}
        style=${d(p)}
      >
        <div class="grid">
          <div class="row header">
            <button
              class="icon-btn"
              type="button"
              style=${d(l)}
              @click=${() => this._toggle()}
            >
              <ha-icon .icon=${s}></ha-icon>
            </button>
            <button class="info-btn" type="button" @click=${() => this._moreInfo()}>
              <div class="name">${a}</div>
              <div class="label">${h}</div>
            </button>
          </div>

          <div
            class="slider-wrap"
            style=${d({
      background: e ? `rgba(${i}, 0.2)` : "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    })}
          >
            <div
              class="slider-fill"
              style=${d({
      width: `${e ? r : 0}%`,
      background: e ? `rgba(${i}, 1)` : "transparent"
    })}
            ></div>
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(Math.max(1, r || 1))}
              @input=${(g) => {
      this._dragPct = Number(g.target.value);
    }}
              @change=${(g) => {
      const z = Number(g.target.value);
      this._dragPct = void 0, this._setBrightness(z);
    }}
            />
          </div>

          ${e ? c`<div class="chips">
                ${vu.map(
      (g) => c`
                    <button
                      class="chip"
                      type="button"
                      style=${d({ background: g.css })}
                      @click=${() => this._setRgb(g.rgb)}
                    ></button>
                  `
    )}
              </div>` : _}
        </div>
      </ha-card>
    `;
  }
  _toggle() {
    !this.hass || !this._config || this.hass.callService("light", "toggle", {
      entity_id: this._config.entity
    });
  }
  _setBrightness(t) {
    !this.hass || !this._config || this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: t
    });
  }
  _setRgb(t) {
    !this.hass || !this._config || this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      rgb_color: t,
      transition: this._config.transition ?? 1
    });
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Ee.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-light-colorpick {
      height: auto;
      padding: 12px;
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "header slider"
        "chips chips";
      gap: 0 12px;
      align-items: center;
    }

    ha-card.on .grid {
      row-gap: 12px;
    }

    .header {
      grid-area: header;
      min-width: 0;
    }

    .slider-wrap {
      grid-area: slider;
      height: 42px;
      border-radius: 14px;
    }

    .slider-wrap input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 42px;
      margin: 0;
      background: transparent;
      cursor: pointer;
    }

    .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
      height: 42px;
      border-radius: 14px;
      background: transparent;
    }

    .slider-wrap input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 42px;
      border-radius: 0;
      background: transparent;
    }

    .chips {
      grid-area: chips;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 8px;
    }

    .chip {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid rgba(var(--color-theme, 51, 51, 51), 0.15);
      padding: 0;
      cursor: pointer;
      box-sizing: border-box;
    }
  `;
sn([
  x({ attribute: !1 })
], Ee.prototype, "hass", 2);
sn([
  y()
], Ee.prototype, "_config", 2);
sn([
  y()
], Ee.prototype, "_dragPct", 2);
Ee = sn([
  $("ulm-custom-card-light-colorpick-card")
], Ee);
var wu = Object.defineProperty, xu = Object.getOwnPropertyDescriptor, Pr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? xu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && wu(e, i, n), n;
};
function Ra(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ga(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Bi = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "media_player"),
        m("name")
      ],
      computeLabel: k({
        entity: "Media player",
        name: "Name"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_card_media_player_with_controls_entity",
        name: "Legacy: ulm_card_media_player_with_controls_name"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "media_player.sonos_living_room",
      name: "Sonos"
    };
  }
  setConfig(t) {
    const e = t, i = Ga(
      Ra(e, "entity", "ulm_card_media_player_with_controls_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ga(
        Ra(e, "name", "ulm_card_media_player_with_controls_name")
      ),
      type: "custom:ulm-custom-card-media-player-sonos-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-sonos"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "playing", i = R(this, e, "green"), o = this._config.name || t.attributes.friendly_name || t.entity_id, n = t.attributes.icon || "mdi:speaker", r = this._label(t), a = t.state === "paused" || t.state === "off" ? "mdi:play" : "mdi:pause";
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-sonos": !0,
      playing: e
    })}
      >
        <div class="stack">
          <button
            class="sonos-header"
            type="button"
            @click=${() => this._moreInfo()}
          >
            <div class="icon-btn" style=${d(i)}>
              <ha-icon .icon=${n}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label">${r}</div>
            </div>
          </button>

          <div class="widgets">
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("volume_down")}
            >
              <ha-icon icon="mdi:volume-minus"></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("media_play_pause")}
            >
              <ha-icon .icon=${a}></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("volume_up")}
            >
              <ha-icon icon="mdi:volume-plus"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _label(t) {
    const e = this.hass?.formatEntityState?.(t) || t.state;
    if (t.state === "idle" || t.state === "paused" || t.state === "unavailable")
      return e;
    const i = t.attributes.source || e, o = Number(t.attributes.volume_level), n = Number.isFinite(o) ? Math.round(o * 100) : 0;
    return `${i} • ${n}%`;
  }
  _call(t) {
    !this.hass || !this._config || this.hass.callService("media_player", t, {
      entity_id: this._config.entity
    });
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Bi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-sonos {
      height: auto;
    }

    .sonos-header {
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      grid-template-areas:
        "icon name"
        "icon label";
      align-items: center;
      width: 100%;
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      color: inherit;
      font: inherit;
      text-align: left;
    }

    .sonos-header .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .sonos-header .info-btn {
      grid-area: 1 / 2 / 3 / 3;
      pointer-events: none;
    }
  `;
Pr([
  x({ attribute: !1 })
], Bi.prototype, "hass", 2);
Pr([
  y()
], Bi.prototype, "_config", 2);
Bi = Pr([
  $("ulm-custom-card-media-player-sonos-card")
], Bi);
var $u = Object.defineProperty, ku = Object.getOwnPropertyDescriptor, Lr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? ku(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && $u(e, i, n), n;
};
function J(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function at(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Wa(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let Hi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "person"),
        D([m("name"), S("icon")]),
        b("use_entity_picture"),
        b("multiline"),
        u("zone1", "zone", !1),
        u("zone2", "zone", !1),
        u("address", void 0, !1),
        u("address_locality", void 0, !1),
        u("driving_entity", void 0, !1),
        u("battery_entity", "sensor", !1),
        u("battery_state_entity", void 0, !1),
        u("commute_entity", "sensor", !1),
        S("commute_icon")
      ],
      computeLabel: k({
        entity: "Person entity",
        name: "Name",
        icon: "Icon",
        use_entity_picture: "Use entity picture",
        multiline: "Multiline layout",
        zone1: "Zone 1",
        zone2: "Zone 2",
        address: "Address sensor",
        address_locality: "Address locality sensor",
        driving_entity: "Driving entity",
        battery_entity: "Battery % sensor",
        battery_state_entity: "Battery charging state",
        commute_entity: "Commute (minutes) sensor",
        commute_icon: "Commute icon"
      }),
      computeHelper: C({
        use_entity_picture: "Show entity_picture instead of the icon (default false).",
        multiline: "Battery/commute on a third row when true; beside name/label when false.",
        address: "Label shows this sensor's state when set.",
        address_locality: "Fallback label from attributes.Locality when address is empty.",
        driving_entity: "When on, badge turns red and label shows Driving - …",
        battery_state_entity: 'Charging when state is "charging" (case-insensitive).',
        commute_icon: "Default mdi:car"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.anne_therese",
      use_entity_picture: !1,
      icon: "mdi:face-man",
      commute_icon: "mdi:car",
      multiline: !0
    };
  }
  setConfig(t) {
    const e = t, i = at(J(e, "entity", "ulm_card_person_entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: at(J(e, "name")),
      icon: at(J(e, "icon")) || "mdi:face-man",
      use_entity_picture: Wa(
        J(e, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        !1
      ),
      zone1: at(J(e, "zone1", "ulm_card_person_zone1")),
      zone2: at(J(e, "zone2", "ulm_card_person_zone2")),
      address: at(J(e, "address", "ulm_address")),
      address_locality: at(
        J(e, "address_locality", "ulm_address_locality")
      ),
      driving_entity: at(
        J(e, "driving_entity", "ulm_card_person_driving_entity")
      ),
      battery_entity: at(
        J(e, "battery_entity", "ulm_card_person_battery_entity")
      ),
      battery_state_entity: at(
        J(e, "battery_state_entity", "ulm_card_person_battery_state_entity")
      ),
      commute_entity: at(
        J(e, "commute_entity", "ulm_card_person_commute_entity")
      ),
      commute_icon: at(
        J(
          e,
          "commute_icon",
          "ulm_card_person_commute_icon",
          "ulm_card_person_cummute_icon"
        )
      ) || "mdi:car",
      multiline: Wa(J(e, "multiline", "ulm_multiline"), !0),
      type: "custom:ulm-custom-card-person-info-card"
    };
  }
  getCardSize() {
    return this._config?.multiline === !1 ? 1 : 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-person-info"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, n = this._config.icon || "mdi:face-man", r = this._config.multiline !== !1, a = this._badge(t), s = this._label(t), l = this._battery(), h = this._commute();
    return c`
      <ha-card
        class=${L({
      "ulm-person-info": !0,
      multiline: r
    })}
        @click=${this._moreInfo}
      >
        <div
          class="grid"
          style=${d({
      gridTemplateAreas: r ? '"i n" "i l" "battery commute"' : '"i n battery" "i l commute"',
      gridTemplateColumns: r ? "min-content auto" : "min-content auto min-content"
    })}
        >
          <div class=${L({ "img-cell": !0, picture: !!o })}>
            ${o ? c`<img
                  class="entity-picture"
                  src=${o}
                  alt=${e}
                />` : c`<ha-icon class="person-icon" .icon=${n}></ha-icon>`}
          </div>
          <div class="name">${e}</div>
          <div class="label">${s}</div>
          <div class="battery">${l}</div>
          <div class="commute">${h}</div>
        </div>

        <span
          class="notification"
          style=${d({
      backgroundColor: `rgba(${a.rgb}, 1)`
    })}
        >
          <ha-icon .icon=${a.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }
  _theme(t) {
    return f(this, t);
  }
  _isDriving() {
    const t = this._config?.driving_entity;
    return !t || !this.hass ? !1 : this.hass.states[t]?.state === "on";
  }
  _badge(t) {
    return this._isDriving() ? { icon: "mdi:car", rgb: this._theme("red") } : t.state !== "home" ? {
      icon: this._zoneIcon(t.state) || "mdi:home-minus",
      rgb: this._theme("green")
    } : { icon: "mdi:home-variant", rgb: this._theme("blue") };
  }
  _zoneIcon(t) {
    if (!(!this.hass || !this._config))
      for (const e of [this._config.zone1, this._config.zone2]) {
        if (!e) continue;
        const i = this.hass.states[e];
        if (i && t === i.attributes.friendly_name)
          return i.attributes.icon != null ? String(i.attributes.icon) : "mdi:help-circle";
      }
  }
  _label(t) {
    if (!this.hass || !this._config) return t.state;
    const e = this._config;
    if (e.address) {
      const o = this.hass.states[e.address];
      if (o)
        return this.hass.formatEntityState?.(o) || o.state;
    }
    if (e.address_locality) {
      const o = this.hass.states[e.address_locality], n = o?.attributes?.Locality ?? o?.attributes?.locality;
      if (n != null && n !== "") return String(n);
    }
    const i = this._localizePerson(t);
    return this._isDriving() ? `Driving - ${i}` : i;
  }
  _localizePerson(t) {
    if (this.hass?.localize) {
      const e = `component.person.entity_component._.state.${t.state}`, i = this.hass.localize(e);
      if (i && i !== e) return i;
    }
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state === "home" ? "Home" : t.state === "not_home" ? "Away" : t.state;
  }
  _batteryIcon(t, e) {
    const i = e ? "mdi:battery-charging" : "mdi:battery", o = Math.ceil(t / 10) * 10;
    return o === 100 ? i : `${i}-${o}`;
  }
  _batteryColor(t) {
    return t <= 25 ? this._theme("red") : t <= 50 ? this._theme("yellow") : this._theme("green");
  }
  _battery() {
    const t = this._config?.battery_entity;
    if (!t || !this.hass) return _;
    const e = this.hass.states[t];
    if (!e?.state && e?.state !== "0") return _;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return _;
    const o = this._config?.battery_state_entity, n = !!o && String(this.hass.states[o]?.state || "").toLowerCase() === "charging", r = this._batteryIcon(i, n), a = this._batteryColor(i);
    return c`
      <ha-icon
        .icon=${r}
        style=${d({ color: `rgba(${a}, 1)` })}
      ></ha-icon>
      <span>${Math.round(i)}%</span>
    `;
  }
  _commute() {
    const t = this._config?.commute_entity;
    if (!t || !this.hass) return _;
    const e = this.hass.states[t];
    if (e?.state == null || e.state === "") return _;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return _;
    let o = "green";
    i >= 60 ? o = "red" : i >= 30 && (o = "yellow");
    const n = this._theme(o), r = this._config?.commute_icon || "mdi:car";
    return c`
      <ha-icon
        .icon=${r}
        style=${d({ color: `rgba(${n}, 1)` })}
      ></ha-icon>
      <span>${i} min</span>
    `;
  }
};
Hi.styles = w`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    ha-card.ulm-person-info {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    .grid {
      display: grid;
      grid-template-rows: min-content min-content;
      column-gap: 0;
      row-gap: 0;
      width: 100%;
      align-content: start;
    }

    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    .img-cell.picture {
      place-self: stretch stretch;
    }

    .person-icon {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      line-height: 0;
    }

    .entity-picture {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .battery,
    .commute {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 1;
      min-height: 16px;
    }

    .battery {
      grid-area: battery;
      align-self: center;
      justify-self: start;
    }

    .commute {
      grid-area: commute;
      align-self: center;
      justify-self: end;
      margin-top: 6px;
    }

    ha-card.ulm-person-info.multiline .battery {
      margin-top: 6px;
    }

    ha-card.ulm-person-info:not(.multiline) .battery,
    ha-card.ulm-person-info:not(.multiline) .commute {
      margin-top: 0;
      margin-left: 8px;
    }

    .battery ha-icon,
    .commute ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      margin: 0 2px 0 0;
    }

    .battery span,
    .commute span {
      padding-top: 2px;
    }

    .notification {
      position: absolute;
      left: 38px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: var(--primary-background-color, #fff);
    }

    .notification ha-icon svg {
      display: block;
      width: 10px;
      height: 10px;
    }
  `;
Lr([
  x({ attribute: !1 })
], Hi.prototype, "hass", 2);
Lr([
  y()
], Hi.prototype, "_config", 2);
Hi = Lr([
  $("ulm-custom-card-person-info-card")
], Hi);
var Cu = Object.defineProperty, Su = Object.getOwnPropertyDescriptor, Mr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Su(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Cu(e, i, n), n;
};
const Zs = -108, Xs = 108, zu = Xs - Zs, Qs = 38, Eu = 50, Pu = 48;
function ht(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function de(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Sn(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function Lu(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Ka(t, e, i, o) {
  const n = (o - 90) * Math.PI / 180;
  return { x: t + i * Math.cos(n), y: e + i * Math.sin(n) };
}
function Mu(t, e, i, o, n) {
  const r = Ka(t, e, i, o), a = Ka(t, e, i, n);
  return `M ${r.x} ${r.y} A ${i} ${i} 0 1 1 ${a.x} ${a.y}`;
}
const Va = Mu(Eu, Pu, Qs, Zs, Xs), qa = zu / 360 * 2 * Math.PI * Qs;
let Ri = class extends v {
  constructor() {
    super(...arguments), this._onKeydown = (t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._refreshEntities());
    }, this._refreshEntities = () => {
      if (!this.hass || !this._config) return;
      const t = [
        this._config.download_entity,
        this._config.upload_entity,
        this._config.ping_entity
      ].filter(Boolean);
      t.length && this.hass.callService("homeassistant", "update_entity", {
        entity_id: t
      });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("download_entity", ["sensor", "number"]),
        u("upload_entity", ["sensor", "number"]),
        u("ping_entity", ["sensor", "number"]),
        m("download_color"),
        m("upload_color"),
        m("ping_color"),
        M("download_max"),
        M("upload_max"),
        M("ping_max"),
        b("round")
      ],
      computeLabel: k({
        download_entity: "Download entity",
        upload_entity: "Upload entity",
        ping_entity: "Ping entity",
        download_color: "Download color (CSS)",
        upload_color: "Upload color (CSS)",
        ping_color: "Ping color (CSS)",
        download_max: "Download max",
        upload_max: "Upload max",
        ping_max: "Ping max",
        round: "Round values"
      }),
      computeHelper: C({
        download_entity: "Also accepts ulm_custom_card_speedtest_download_speed_entity",
        download_color: "Default var(--google-yellow)",
        upload_color: "Default var(--google-blue)",
        ping_color: "Default var(--google-green)",
        download_max: "Default 100",
        upload_max: "Default 40",
        ping_max: "Default 85",
        round: "Round download/upload numeric states (YAML behavior)"
      })
    };
  }
  static getStubConfig() {
    return {
      download_entity: "sensor.speedtest_download",
      upload_entity: "sensor.speedtest_upload",
      ping_entity: "sensor.speedtest_ping",
      download_color: "var(--google-yellow)",
      upload_color: "var(--google-blue)",
      ping_color: "var(--google-green)",
      download_max: 100,
      upload_max: 40,
      ping_max: 85,
      round: !1
    };
  }
  setConfig(t) {
    const e = t, i = de(
      ht(
        e,
        "download_entity",
        "ulm_custom_card_speedtest_download_speed_entity"
      )
    ), o = de(
      ht(
        e,
        "upload_entity",
        "ulm_custom_card_speedtest_upload_speed_entity"
      )
    ), n = de(
      ht(e, "ping_entity", "ulm_custom_card_speedtest_ping_entity")
    );
    if (!i || !o || !n)
      throw new Error(
        "Please define download_entity, upload_entity, and ping_entity"
      );
    this._config = {
      ...t,
      download_entity: i,
      upload_entity: o,
      ping_entity: n,
      download_color: de(
        ht(
          e,
          "download_color",
          "ulm_custom_card_speedtest_download_speed_color"
        )
      ) || "var(--google-yellow)",
      upload_color: de(
        ht(
          e,
          "upload_color",
          "ulm_custom_card_speedtest_upload_speed_color"
        )
      ) || "var(--google-blue)",
      ping_color: de(
        ht(e, "ping_color", "ulm_custom_card_speedtest_ping_color")
      ) || "var(--google-green)",
      download_max: Sn(
        ht(
          e,
          "download_max",
          "ulm_custom_card_speedtest_download_speed_max"
        ),
        100
      ),
      upload_max: Sn(
        ht(e, "upload_max", "ulm_custom_card_speedtest_upload_speed_max"),
        40
      ),
      ping_max: Sn(
        ht(e, "ping_max", "ulm_custom_card_speedtest_ping_max"),
        85
      ),
      round: Lu(ht(e, "round", "ulm_custom_card_speedtest_round"), !1),
      type: "custom:ulm-custom-card-speedtest-shogun160-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = [
      {
        entity: t.download_entity,
        name: "Download",
        icon: "mdi:download",
        color: t.download_color || "var(--google-yellow)",
        max: t.download_max ?? 100,
        allowRound: !0
      },
      {
        entity: t.upload_entity,
        name: "Upload",
        icon: "mdi:upload",
        color: t.upload_color || "var(--google-blue)",
        max: t.upload_max ?? 40,
        allowRound: !0
      },
      {
        entity: t.ping_entity,
        name: "Ping",
        icon: "mdi:wan",
        color: t.ping_color || "var(--google-green)",
        max: t.ping_max ?? 85,
        allowRound: !1
      }
    ];
    return c`
      <ha-card
        class="ulm-card ulm-speedtest"
        @click=${this._refreshEntities}
        role="button"
        tabindex="0"
        @keydown=${this._onKeydown}
      >
        <div class="st-cols">
          ${e.map((i) => this._column(i))}
        </div>
      </ha-card>
    `;
  }
  _column(t) {
    if (!this.hass || !this._config) return _;
    const e = this.hass.states[t.entity], i = e ? Number.parseFloat(e.state) : NaN, n = (Number.isFinite(i) ? Math.min(1, Math.max(0, i / Math.max(t.max, 1e-9))) : 0) * qa, r = e?.attributes.unit_of_measurement || "";
    let a = "";
    return e?.state != null && e.state !== "" && (Number.isFinite(i) && this._config.round && t.allowRound ? a = String(Math.round(i)) : a = e.state, r && (a += ` ${r}`)), c`
      <div class="st-col">
        <div class="st-gauge" aria-hidden="true">
          ${Zo`
            <svg viewBox="0 0 100 72" class="st-svg">
              <path
                class="st-track"
                d=${Va}
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
              />
              <path
                class="st-fill"
                d=${Va}
                fill="none"
                stroke=${t.color}
                stroke-width="7"
                stroke-linecap="round"
                style=${d({
      strokeDasharray: `${n} ${qa}`
    })}
              />
            </svg>
          `}
        </div>
        <div class="st-info">
          <div class="st-icon-cell">
            <ha-icon
              .icon=${t.icon}
              style=${d({ color: t.color })}
            ></ha-icon>
          </div>
          <div class="st-value">${a || "—"}</div>
          <div class="st-caption">${t.name}</div>
        </div>
      </div>
    `;
  }
};
Ri.styles = [
  E,
  w`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-speedtest {
        padding: 0;
        cursor: pointer;
        overflow: hidden;
      }

      /* list_3_items row of 3 columns */
      .st-cols {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
        align-items: stretch;
      }

      /* list_2_items_1_row: fixed 100px, gauge + overlay info */
      .st-col {
        position: relative;
        height: 100px;
        min-width: 0;
        overflow: hidden;
      }

      .st-gauge {
        position: absolute;
        top: -2%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 140px;
        place-self: center;
        pointer-events: none;
      }

      .st-svg {
        width: 100%;
        height: auto;
        display: block;
      }

      .st-track {
        stroke: rgba(var(--color-theme, 51, 51, 51), 0.12);
      }

      .st-fill {
        transition: stroke-dasharray 0.35s ease;
      }

      /* YAML item2: top 15%, width 115%, grid 'i' 'l' 'n' */
      .st-info {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        width: 115%;
        display: grid;
        grid-template-areas: "i" "l" "n";
        grid-template-columns: 1fr;
        justify-items: center;
        pointer-events: none;
        z-index: 1;
      }

      .st-icon-cell {
        grid-area: i;
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
      }

      .st-icon-cell ha-icon {
        --mdc-icon-size: 24px;
        width: 24px;
        height: 24px;
      }

      .st-value {
        grid-area: l;
        justify-self: center;
        align-self: start;
        font-weight: bold;
        font-size: 14px;
        line-height: 1.2;
        text-align: center;
        margin: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .st-caption {
        grid-area: n;
        margin-top: 5px;
        justify-self: center;
        font-weight: bolder;
        font-size: 12px;
        filter: opacity(40%);
        text-align: center;
        line-height: 1.2;
      }
    `
];
Mr([
  x({ attribute: !1 })
], Ri.prototype, "hass", 2);
Mr([
  y()
], Ri.prototype, "_config", 2);
Ri = Mr([
  $("ulm-custom-card-speedtest-shogun160-card")
], Ri);
var Ou = Object.defineProperty, Nu = Object.getOwnPropertyDescriptor, Eo = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Nu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Ou(e, i, n), n;
};
const Iu = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5"
], Rn = [
  "yellow",
  "blue",
  "red",
  "purple",
  "green",
  "pink"
], Ya = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️",
  default: "🌡️"
};
function Ja(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ju(t) {
  if (t && typeof t == "object" && !Array.isArray(t))
    return t;
}
function Du(t) {
  let e = 0;
  for (let i = 0; i < t.length; i++)
    e = e * 31 + t.charCodeAt(i) >>> 0;
  return Rn[e % Rn.length];
}
function Au(t, e) {
  if (typeof t == "string" && t.length)
    return {
      entity: t,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      color: typeof e?.color == "string" ? e.color : void 0,
      path: typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0
    };
  const i = ju(t);
  if (!i)
    return typeof e?.entity == "string" && e.entity ? {
      entity: e.entity,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      color: typeof e?.color == "string" ? e.color : void 0,
      path: typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0
    } : {};
  const o = typeof i.entity == "string" && i.entity || typeof i.entity_id == "string" && i.entity_id || void 0, n = typeof i.path == "string" && i.path || typeof i.nav_path == "string" && i.nav_path || typeof i.nav == "string" && i.nav || typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0;
  return {
    entity: o,
    entity_id: o,
    name: typeof i.name == "string" && i.name || typeof e?.name == "string" && e.name || void 0,
    icon: typeof i.icon == "string" && i.icon || typeof e?.icon == "string" && e.icon || void 0,
    color: typeof i.color == "string" && i.color || typeof e?.color == "string" && e.color || void 0,
    path: n,
    nav_path: n,
    nav: n
  };
}
function Uo(t) {
  return t.path || t.nav_path || t.nav || void 0;
}
function zn(t) {
  return t.entity || t.entity_id || void 0;
}
function Ve(t) {
  return {
    type: "expandable",
    name: `entity_${t}`,
    title: `Nav ${t}`,
    schema: [
      u("entity", void 0, !1),
      {
        type: "grid",
        name: "",
        flatten: !0,
        schema: [m("name"), S("icon")]
      },
      m("path"),
      A("color")
    ]
  };
}
function Tu(t) {
  const e = {};
  for (const [i, o] of Object.entries(t))
    o === "" || o == null || (e[i] = o);
  return Object.keys(e).length ? e : void 0;
}
let ee = class extends v {
  constructor() {
    super(...arguments), this._navs = [], this._localCollapsed = !1, this._toggleCollapse = (t) => {
      t.preventDefault(), t.stopPropagation();
      const e = this._collapseEntity();
      if (e && this.hass) {
        this.hass.callService("input_boolean", "toggle", {
          entity_id: e
        }), this.updateComplete.then(() => this._applyLayoutSize());
        return;
      }
      this._localCollapsed = !this._localCollapsed, this.updateComplete.then(() => this._applyLayoutSize());
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("weather", "weather", !1),
        u("collapse", "input_boolean", !1),
        Ve(1),
        Ve(2),
        Ve(3),
        Ve(4),
        Ve(5)
      ],
      computeLabel: k({
        weather: "Weather (weather / ulm_weather)",
        collapse: "Collapse toggle (collapse / ulm_card_esh_welcome_collapse)",
        entity: "Entity (optional)",
        name: "Name",
        icon: "Icon",
        path: "Navigation path",
        color: "Icon color"
      }),
      computeHelper: C({
        weather: "Weather entity for the topbar chip (emoji + date).",
        collapse: "Optional input_boolean. When on, the nav row is hidden. Chevron toggles it.",
        entity: "Optional. Used for name/icon fallback when not set explicitly.",
        path: "View path on tap, e.g. /lovelace/lights or lights. Aliases: nav_path, nav.",
        color: "Theme color (yellow/blue/red/purple/green/pink). If omitted, a stable hash from the entity/path is used."
      })
    };
  }
  static getStubConfig() {
    return {
      weather: "weather.demo_weather_north",
      entity_1: {
        name: "Home",
        icon: "mdi:home",
        color: "blue",
        path: "/lovelace/0"
      },
      entity_2: {
        name: "Lights",
        icon: "mdi:lightbulb",
        color: "yellow",
        path: "/lovelace/0"
      },
      entity_3: {
        name: "Secure",
        icon: "mdi:shield",
        color: "green",
        path: "/lovelace/0"
      },
      entity_4: {
        name: "Climate",
        icon: "mdi:thermometer",
        color: "purple",
        path: "/lovelace/0"
      },
      entity_5: {
        name: "Media",
        icon: "mdi:speaker",
        color: "red",
        path: "/lovelace/0"
      }
    };
  }
  setConfig(t) {
    const e = t, i = Ja(e, "weather", "ulm_weather") || void 0, o = Ja(e, "collapse", "ulm_card_esh_welcome_collapse") || void 0, n = {
      ...t,
      weather: i,
      ulm_weather: i,
      collapse: o,
      ulm_card_esh_welcome_collapse: o,
      type: "custom:ulm-custom-card-esh-welcome-card"
    }, r = [];
    for (const a of Iu) {
      const s = Number(a.slice(-1)), l = Au(e[a], {
        entity: e[a] === void 0 ? e[`entity_${s}`] : void 0,
        name: e[`name_${s}`] ?? e[`entity_${s}_name`],
        icon: e[`icon_${s}`] ?? e[`entity_${s}_icon`],
        color: e[`color_${s}`] ?? e[`entity_${s}_color`],
        path: e[`path_${s}`] ?? e[`entity_${s}_path`],
        nav_path: e[`nav_path_${s}`] ?? e[`entity_${s}_nav_path`],
        nav: e[`nav_${s}`] ?? e[`entity_${s}_nav`]
      }), h = Tu(l);
      h ? (n[a] = h, r.push(h)) : delete n[a];
    }
    this._navs = r, this._config = n;
  }
  getCardSize() {
    return this._isCollapsed() ? 2 : 4;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6
    };
  }
  _collapseEntity() {
    const t = this._config?.collapse || this._config?.ulm_card_esh_welcome_collapse;
    return t && typeof t == "string" && t.length ? t : void 0;
  }
  _weatherEntity() {
    const t = this._config?.weather || this._config?.ulm_weather;
    return t && typeof t == "string" && t.length ? t : void 0;
  }
  _isCollapsed() {
    const t = this._collapseEntity();
    return t && this.hass?.states[t] ? this.hass.states[t].state === "on" : t ? this._localCollapsed : !1;
  }
  _userName() {
    return this.hass?.user?.name?.trim() || "there";
  }
  _greeting() {
    const t = (/* @__PURE__ */ new Date()).getHours();
    return t >= 18 ? "Good evening" : t >= 12 ? "Good afternoon" : t >= 5 ? "Good morning" : "Hello";
  }
  _configuredNavs() {
    return this._navs.filter((t) => !!(Uo(t) || t.name || zn(t) || t.icon));
  }
  _pillColor(t, e) {
    const i = (t.color || "").toString().toLowerCase();
    if (Rn.includes(i))
      return i;
    const o = zn(t) || Uo(t) || t.name || `nav-${e}`;
    return Du(o);
  }
  /** YAML scale: fewer pills → larger pills (min count treated as 3). */
  _pillScale(t) {
    return 1 + (5 - Math.max(t, 3)) * 0.25;
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._isCollapsed(), e = this._configuredNavs().filter((o) => Uo(o)), i = this._pillScale(e.length);
    return c`
      <ha-card
        class=${t ? "ulm-esh-welcome collapsed" : "ulm-esh-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${t || !e.length ? _ : c`
              <div class="nav-row">
                ${e.map((o, n) => this._renderNav(o, n, i))}
              </div>
            `}
      </ha-card>
    `;
  }
  _renderTopbar() {
    const t = this._weatherEntity(), e = t ? this.hass.states[t] : void 0, i = this._isCollapsed(), o = this._collapseEntity(), n = (/* @__PURE__ */ new Date()).toLocaleDateString(
      this.hass.language || void 0,
      { month: "short", day: "numeric" }
    ), a = `${Ya[e?.state || ""] || Ya.default} ${n}`;
    return c`
      <div class="topbar">
        ${o ? c`
              <button
                type="button"
                class="chip round"
                @click=${this._toggleCollapse}
                title=${i ? "Expand" : "Collapse"}
              >
                <ha-icon
                  .icon=${i ? "mdi:chevron-down" : "mdi:chevron-up"}
                ></ha-icon>
              </button>
            ` : c`<span class="chip-spacer"></span>`}

        <button
          type="button"
          class="chip weather"
          ?disabled=${!e}
          @click=${() => t && this._moreInfo(t)}
        >
          <span>${a}</span>
        </button>

        <button
          type="button"
          class="chip round"
          @click=${() => this._navigate("/config/dashboard")}
          title="Settings"
        >
          <ha-icon icon="mdi:cog-outline"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderGreeting() {
    return c`
      <div class="greeting">
        <div class="line">${this._greeting()},</div>
        <div class="line">${this._userName()}!</div>
      </div>
    `;
  }
  _renderNav(t, e, i) {
    const o = zn(t), n = o ? this.hass.states[o] : void 0, r = this._pillColor(t, e), a = f(this, r), s = t.name || n?.attributes.friendly_name || o?.split(".").pop() || "", l = t.icon || n?.attributes.icon || "mdi:circle-medium", h = Uo(t), p = 52 * i, g = 84 * i, z = 42 * i, P = 20 * i, O = 9.5 * i, T = 33 * i;
    return c`
      <button
        type="button"
        class="nav-pill"
        style=${d({
      "--pill-color": `rgb(${a})`,
      "--pill-bg": `rgba(${a}, 0.2)`,
      width: `${p}px`,
      minWidth: `${p}px`,
      height: `${g}px`,
      "--icon-box": `${z}px`,
      "--icon-size": `${P}px`,
      "--name-size": `${O}px`,
      "--name-width": `${T}px`
    })}
        @click=${() => this._navigate(h)}
      >
        <span class="pill-icon">
          <ha-icon .icon=${l}></ha-icon>
        </span>
        <span class="pill-name">${s}</span>
      </button>
    `;
  }
  _applyLayoutSize() {
    this.style.height = "auto", this.style.alignSelf = "start", this.style.removeProperty("--row-size");
    let t = this.parentElement;
    for (let e = 0; e < 4 && t && (t.style.height = "auto", t.style.alignSelf = "start", t.style.removeProperty("--row-size"), t.style.removeProperty("grid-row-end"), !(t.tagName.includes("HUI-CARD") || t.classList.contains("card"))); e++)
      t = t.parentElement;
    this.dispatchEvent(
      new CustomEvent("iron-resize", { bubbles: !0, composed: !0 })
    ), window.dispatchEvent(new Event("resize"));
  }
  firstUpdated() {
    this._applyLayoutSize(), this._syncDarkAttr();
  }
  updated(t) {
    t.has("_localCollapsed") && this._applyLayoutSize(), t.has("hass") && (this._syncDarkAttr(), this._collapseEntity() && this._applyLayoutSize());
  }
  _syncDarkAttr() {
    this.hass?.themes?.darkMode ? this.setAttribute("dark", "") : this.removeAttribute("dark");
  }
  _navigate(t) {
    const e = t.startsWith("/") ? t : `/${t}`, i = this.hass?.navigate;
    if (typeof i == "function") {
      i(e);
      return;
    }
    window.history.pushState(null, "", e), window.dispatchEvent(
      new CustomEvent("location-changed", {
        detail: { replace: !1 },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
ee.styles = w`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      margin: 0;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
    }

    ha-card.ulm-esh-welcome {
      height: auto;
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 10px;
      margin: 0;
      background: var(--card-background-color, #fafafa);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 0;
      transition: none;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      gap: 8px;
      flex-shrink: 0;
    }

    .chip-spacer {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .chip {
      border: 0;
      cursor: pointer;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
      height: 36px;
      border-radius: 18px;
      width: auto;
    }

    :host([dark]) .chip {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .chip:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .chip.round {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      padding: 0;
    }

    .chip.round ha-icon {
      --mdc-icon-size: 18px;
      pointer-events: none;
    }

    .chip.weather {
      width: 100px;
      min-width: 100px;
      padding: 0 6px;
      white-space: nowrap;
    }

    .chip.weather span {
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
    }

    .greeting {
      margin: 0;
      padding: 0 0 8px 16px;
      text-align: left;
      flex-shrink: 0;
    }

    .greeting .line {
      font-weight: bold;
      font-size: 24px;
      line-height: 1.15;
      color: var(--primary-text-color);
    }

    .nav-row {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      flex-wrap: nowrap;
      gap: 12px;
      margin: 0;
      padding: 4px;
      flex-shrink: 0;
    }

    .nav-pill {
      box-sizing: border-box;
      border: 0;
      border-radius: 50px;
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 5px;
      cursor: pointer;
      color: inherit;
      font: inherit;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: none;
    }

    :host([dark]) .nav-pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .nav-pill:hover,
    .nav-pill:focus,
    .nav-pill:active {
      background: var(--card-background-color, #fff);
      outline: none;
    }

    .pill-icon {
      width: var(--icon-box, 42px);
      height: var(--icon-box, 42px);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: var(--icon-size, 20px);
      color: var(--pill-color);
    }

    .pill-name {
      font-weight: bold;
      font-size: var(--name-size, 9.5px);
      line-height: 1.1;
      text-align: center;
      width: var(--name-width, 33px);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: -5px;
      padding: 0 5px 7px;
      box-sizing: border-box;
    }
  `;
Eo([
  x({ attribute: !1 })
], ee.prototype, "hass", 2);
Eo([
  y()
], ee.prototype, "_config", 2);
Eo([
  y()
], ee.prototype, "_navs", 2);
Eo([
  y()
], ee.prototype, "_localCollapsed", 2);
ee = Eo([
  $("ulm-custom-card-esh-welcome-card")
], ee);
var Uu = Object.defineProperty, Fu = Object.getOwnPropertyDescriptor, Or = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Fu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Uu(e, i, n), n;
};
function qe(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ye(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Gi = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "sensor"),
        m("name"),
        m("text"),
        m("unit"),
        S("icon")
      ],
      computeLabel: k({
        entity: "Sensor",
        name: "Name",
        text: "Label prefix",
        unit: "Unit suffix",
        icon: "Icon"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_custom_card_nas_sensor",
        text: "Legacy: ulm_custom_card_nas_text — shown before state",
        unit: "Legacy: ulm_custom_card_nas_unit — appended after state"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.nas_volume_used",
      name: "Nas",
      text: "Used",
      unit: "%",
      icon: "mdi:nas"
    };
  }
  setConfig(t) {
    const e = t, i = Ye(
      qe(e, "entity", "ulm_custom_card_nas_sensor")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ye(qe(e, "name")) || "Nas",
      text: Ye(qe(e, "text", "ulm_custom_card_nas_text")) || "",
      unit: Ye(qe(e, "unit", "ulm_custom_card_nas_unit")) || "",
      icon: Ye(qe(e, "icon")) || "mdi:nas",
      type: "custom:ulm-custom-card-nas-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = f(this, "blue"), i = {
      color: `rgba(${e}, 1)`,
      backgroundColor: `rgba(${e}, 0.2)`
    }, o = this._config.name || "Nas", n = this._config.icon || "mdi:nas", r = this._config.text ?? "", a = this._config.unit ?? "", s = `${r} ${t.state}${a}`.trim();
    return c`
      <ha-card class="ulm-card ulm-nas" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${s}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Gi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-nas {
      height: auto;
      cursor: pointer;
    }
  `;
Or([
  x({ attribute: !1 })
], Gi.prototype, "hass", 2);
Or([
  y()
], Gi.prototype, "_config", 2);
Gi = Or([
  $("ulm-custom-card-nas-card")
], Gi);
function cn(t, e) {
  e?.themes?.darkMode ? t.setAttribute("dark", "") : t.removeAttribute("dark");
}
const ln = w`
  :host {
    display: inline-flex;
    width: fit-content;
    max-width: 100%;
    vertical-align: top;
    /* Badge slot: don't stretch to full badge chrome width */
    flex: 0 0 auto;
  }

  button.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    border: 0;
    border-radius: 18px;
    height: 36px;
    width: auto;
    padding: 0 6px;
    background: var(--card-background-color, #fafafa);
    box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 100%;
  }

  /* chips.yaml darkMode — theme --box-shadow is none */
  :host([dark]) button.chip {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
  }

  button.chip.has-icon-and-label {
    gap: 2px;
  }

  button.chip.icon-label {
    padding: 6px 6px 6px 12px;
    gap: 0;
  }

  .chip ha-icon {
    --mdc-icon-size: 18px;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
  }

  .chip.icon-label ha-icon {
    --mdc-icon-size: 14px;
    width: 14px;
    height: 24px;
  }

  .chip .label {
    justify-self: center;
    padding: 0 6px;
    font-weight: bold;
    font-size: 14px;
    line-height: 100%;
    white-space: nowrap;
  }

  .chip.icon-label .label {
    font-size: 12px;
    margin: 0;
    padding: 0 6px;
  }
`;
var Bu = Object.defineProperty, Hu = Object.getOwnPropertyDescriptor, Nr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Hu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Bu(e, i, n), n;
};
function Ru(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Gu(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Wi = class extends v {
  constructor() {
    super(...arguments), this._onTap = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [u("entity", "person")],
      computeLabel: k({
        entity: "Person entity"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_custom_card_person_chip_entity"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.demo"
    };
  }
  setConfig(t) {
    const i = Gu(
      Ru(t, "entity", "ulm_custom_card_person_chip_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      type: "custom:ulm-custom-card-person-chip-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 2,
      min_columns: 2,
      max_columns: 6,
      rows: "auto",
      min_rows: 1
    };
  }
  updated() {
    cn(this, this.hass);
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<button class="chip" disabled>
        <span class="label">Entity not found</span>
      </button>`;
    const e = t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, i = this._localizePerson(t);
    return c`
      <button class="chip has-icon-and-label" @click=${this._onTap}>
        ${e ? c`<span class="pic-cell">
              <img class="picture" src=${e} alt="" />
            </span>` : c`<ha-icon
              .icon=${"mdi:face-man"}
              style=${d({
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)"
    })}
            ></ha-icon>`}
        <span class="label">${i}</span>
      </button>
    `;
  }
  _localizePerson(t) {
    if (this.hass?.localize) {
      const e = `component.person.entity_component._.state.${t.state}`, i = this.hass.localize(e);
      if (i && i !== e) return i;
    }
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
};
Wi.styles = [
  ln,
  w`
      :host {
        display: block;
        width: fit-content;
        max-width: 100%;
        height: auto !important;
        min-height: 0 !important;
        align-self: start;
        justify-self: start;
        /* Keep shadow inside host if a parent clips overflow */
        padding: 0 2px 6px;
        overflow: visible;
        box-sizing: border-box;
        line-height: 0;
        background: transparent;
        box-shadow: none;
      }

      button.chip {
        height: 36px;
        min-height: 36px;
        max-height: 36px;
        max-width: 100%;
        min-width: 0;
        margin: 0;
        vertical-align: top;
      }

      .pic-cell {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
        display: grid;
        place-items: center;
      }

      .pic-cell .picture {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .chip .label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 36px;
      }
    `
];
Nr([
  x({ attribute: !1 })
], Wi.prototype, "hass", 2);
Nr([
  y()
], Wi.prototype, "_config", 2);
Wi = Nr([
  $("ulm-custom-card-person-chip-card")
], Wi);
var Wu = Object.defineProperty, tc = (t, e, i, o) => {
  for (var n = void 0, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = a(e, i, n) || n);
  return n && Wu(e, i, n), n;
};
const Za = "ulm-custom-card-battery-chip-card", Xa = "ulm-custom-card-iabadia-battery-chip-card";
function Fo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Qa(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ts(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
const la = class la extends v {
  constructor() {
    super(...arguments), this._onTap = (e) => {
      e.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "sensor"),
        S("icon"),
        M("warning"),
        M("danger")
      ],
      computeLabel: k({
        entity: "Battery entity",
        icon: "Icon",
        warning: "Warning threshold %",
        danger: "Danger threshold %"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_custom_card_iAbadia_battery_chip_entity",
        icon: "Legacy: ulm_custom_card_iAbadia_battery_chip_icon — default mdi:battery",
        warning: "Legacy: ulm_custom_card_iAbadia_battery_chip_warning — default 20",
        danger: "Legacy: ulm_custom_card_iAbadia_battery_chip_danger — default 10"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.outside_temperature_battery",
      icon: "mdi:battery",
      warning: 20,
      danger: 10
    };
  }
  setConfig(e) {
    const i = e, o = Qa(
      Fo(i, "entity", "ulm_custom_card_iAbadia_battery_chip_entity")
    );
    if (!o) throw new Error("Please define an entity");
    this._config = {
      ...e,
      entity: o,
      icon: Qa(Fo(i, "icon", "ulm_custom_card_iAbadia_battery_chip_icon")) || "mdi:battery",
      warning: ts(
        Fo(i, "warning", "ulm_custom_card_iAbadia_battery_chip_warning"),
        20
      ),
      danger: ts(
        Fo(i, "danger", "ulm_custom_card_iAbadia_battery_chip_danger"),
        10
      ),
      type: "custom:ulm-custom-card-battery-chip-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 2,
      min_columns: 2,
      max_columns: 6,
      rows: "auto",
      min_rows: 1
    };
  }
  updated() {
    cn(this, this.hass);
  }
  render() {
    if (!this._config || !this.hass) return _;
    const e = this.hass.states[this._config.entity];
    if (!e)
      return c`<button class="chip" disabled>
        <ha-icon .icon=${"mdi:battery-alert"}></ha-icon>
      </button>`;
    const i = Math.round(Number.parseFloat(e.state) || 0), o = this._config.warning ?? 20, n = this._config.danger ?? 10;
    let r = "var(--google-red)";
    i > o ? r = "var(--google-green)" : i > n && (r = "var(--google-yellow)");
    const a = this._config.icon || "mdi:battery";
    return c`
      <button class="chip" @click=${this._onTap}>
        <ha-icon .icon=${a} style=${d({ color: r })}></ha-icon>
      </button>
    `;
  }
};
la.styles = [
  ln,
  w`
      :host {
        display: block;
        width: fit-content;
        max-width: 100%;
        height: auto !important;
        min-height: 0 !important;
        align-self: start;
        justify-self: start;
        /* Keep shadow inside host if a parent clips overflow */
        padding: 0 2px 6px;
        overflow: visible;
        box-sizing: border-box;
        line-height: 0;
        background: transparent;
        box-shadow: none;
      }

      button.chip {
        height: 36px;
        min-height: 36px;
        max-height: 36px;
        margin: 0;
        vertical-align: top;
      }
    `
];
let Pe = la;
tc([
  x({ attribute: !1 })
], Pe.prototype, "hass");
tc([
  y()
], Pe.prototype, "_config");
class Ku extends Pe {
}
customElements.get(Za) || customElements.define(Za, Pe);
customElements.get(Xa) || customElements.define(Xa, Ku);
var Vu = Object.defineProperty, qu = Object.getOwnPropertyDescriptor, Ir = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? qu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Vu(e, i, n), n;
};
function es(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function is(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Yu(t) {
  return t >= -50 ? "mdi:wifi-strength-4" : t >= -60 ? "mdi:wifi-strength-3" : t >= -70 ? "mdi:wifi-strength-2" : t >= -80 ? "mdi:wifi-strength-1" : "mdi:wifi-strength-off";
}
let Ki = class extends v {
  static getConfigForm() {
    return {
      schema: [u("entity", "sensor"), m("name")],
      computeLabel: k({
        entity: "WiFi signal entity (dBm)",
        name: "Name"
      }),
      computeHelper: C({
        entity: "Numeric sensor reporting signal strength in dBm",
        name: "Defaults to entity friendly_name"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.wifi_signal"
    };
  }
  setConfig(t) {
    const e = t, i = is(es(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: is(es(e, "name")),
      type: "custom:ulm-custom-card-mpse-wifisignal-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-mpse-wifisignal"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Number.parseFloat(t.state), i = Number.isFinite(e) ? Yu(e) : "mdi:wifi-strength-off", o = this._config.name || t.attributes.friendly_name || t.entity_id, n = `${t.state} dBm`;
    return c`
      <ha-card
        class="ulm-card ulm-mpse-wifisignal"
        @click=${() => this._moreInfo()}
      >
        <div class="row">
          <div class="icon-btn" style=${d({
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    })}>
            <ha-icon .icon=${i}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
Ki.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-mpse-wifisignal {
      height: auto;
      cursor: pointer;
    }
  `;
Ir([
  x({ attribute: !1 })
], Ki.prototype, "hass", 2);
Ir([
  y()
], Ki.prototype, "_config", 2);
Ki = Ir([
  $("ulm-custom-card-mpse-wifisignal-card")
], Ki);
var Ju = Object.defineProperty, Zu = Object.getOwnPropertyDescriptor, jr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Zu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Ju(e, i, n), n;
};
function ue(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Bo(t) {
  return typeof t == "string" && t ? t : void 0;
}
function os(t) {
  if (t === "bluetooth" || t === "lan" || t === "home") return t;
}
const ns = [
  { value: "home", label: "Home" },
  { value: "bluetooth", label: "Bluetooth" },
  { value: "lan", label: "LAN" }
];
let Vi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["device_tracker", "person"]),
        S("icon"),
        u("tracker_1", ["device_tracker", "person", "binary_sensor"], !1),
        H("tracker_1_type", ns),
        u("tracker_2", ["device_tracker", "person", "binary_sensor"], !1),
        H("tracker_2_type", ns)
      ],
      computeLabel: k({
        entity: "Device / person",
        icon: "Icon",
        tracker_1: "Tracker 1",
        tracker_1_type: "Tracker 1 type",
        tracker_2: "Tracker 2",
        tracker_2_type: "Tracker 2 type"
      }),
      computeHelper: C({
        entity: "Main device_tracker or person entity",
        icon: "Legacy: ulm_custom_card_device_tracker_icon",
        tracker_1: "Legacy: ulm_custom_card_device_tracker_tracker_1_entity",
        tracker_1_type: "Legacy: ulm_custom_card_device_tracker_tracker_1_type (home / bluetooth / lan)",
        tracker_2: "Legacy: ulm_custom_card_device_tracker_tracker_2_entity",
        tracker_2_type: "Legacy: ulm_custom_card_device_tracker_tracker_2_type (home / bluetooth / lan)"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "device_tracker.phone",
      icon: "mdi:cellphone"
    };
  }
  setConfig(t) {
    const e = t, i = Bo(ue(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: Bo(
        ue(e, "icon", "ulm_custom_card_device_tracker_icon")
      ),
      tracker_1: Bo(
        ue(e, "tracker_1", "ulm_custom_card_device_tracker_tracker_1_entity")
      ),
      tracker_1_type: os(
        ue(e, "tracker_1_type", "ulm_custom_card_device_tracker_tracker_1_type")
      ) || "home",
      tracker_2: Bo(
        ue(e, "tracker_2", "ulm_custom_card_device_tracker_tracker_2_entity")
      ),
      tracker_2_type: os(
        ue(e, "tracker_2_type", "ulm_custom_card_device_tracker_tracker_2_type")
      ) || "home",
      type: "custom:ulm-custom-card-device-tracker-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-device-tracker"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "not_home", i = f(this, "green"), o = e ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    } : {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    }, n = t.attributes.friendly_name || t.entity_id, r = this._config.icon || t.attributes.icon || "mdi:cellphone", a = this.hass.formatEntityState?.(t) || t.state;
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-device-tracker": !0,
      home: !e
    })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${n}</div>
            <div class="label">${a}</div>
          </div>
        </div>
        ${this._badge(this._config.tracker_1, this._config.tracker_1_type, 1)}
        ${this._badge(this._config.tracker_2, this._config.tracker_2_type, 2)}
      </ha-card>
    `;
  }
  _badge(t, e, i) {
    if (!t || !this.hass) return _;
    const o = this.hass.states[t];
    if (!o) return _;
    const n = o.state === "home", r = f(this, n ? "blue" : "green"), a = this._trackerIcon(n, e || "home");
    return c`
      <span
        class=${L({
      "tracker-badge": !0,
      [`tracker-${i}`]: !0
    })}
        style=${d({ backgroundColor: `rgba(${r}, 1)` })}
      >
        <ha-icon .icon=${a}></ha-icon>
      </span>
    `;
  }
  _trackerIcon(t, e) {
    return e === "bluetooth" ? t ? "mdi:bluetooth" : "mdi:bluetooth-off" : e === "lan" ? t ? "mdi:lan-connect" : "mdi:lan-disconnect" : t ? "mdi:home-variant" : "mdi:home-minus";
  }
};
Vi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-device-tracker {
      position: relative;
      height: auto;
      overflow: visible;
      cursor: pointer;
    }

    .icon-btn {
      overflow: visible;
      pointer-events: none;
    }

    .info-btn {
      pointer-events: none;
    }

    .tracker-badge {
      position: absolute;
      left: 38px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      z-index: 2;
      pointer-events: none;
      line-height: 0;
    }

    .tracker-1 {
      top: 8px;
    }

    .tracker-2 {
      top: 38px;
    }

    .tracker-badge ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      color: var(--primary-background-color, #fff);
    }
  `;
jr([
  x({ attribute: !1 })
], Vi.prototype, "hass", 2);
jr([
  y()
], Vi.prototype, "_config", 2);
Vi = jr([
  $("ulm-custom-card-device-tracker-card")
], Vi);
var Xu = Object.defineProperty, Qu = Object.getOwnPropertyDescriptor, Dr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Qu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Xu(e, i, n), n;
};
function rs(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function as(t) {
  return typeof t == "string" && t ? t : void 0;
}
let qi = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "media_player"),
        m("name")
      ],
      computeLabel: k({
        entity: "Chromecast / media player",
        name: "Name"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_card_media_player_with_controls_entity",
        name: "Legacy: ulm_card_media_player_with_controls_name"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "media_player.chromecast",
      name: "Chromecast"
    };
  }
  setConfig(t) {
    const e = t, i = as(
      rs(e, "entity", "ulm_card_media_player_with_controls_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: as(
        rs(e, "name", "ulm_card_media_player_with_controls_name")
      ),
      type: "custom:ulm-custom-card-chromecast-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-chromecast"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state !== "unavailable", i = R(this, e, "blue"), o = this._config.name || t.attributes.friendly_name || t.entity_id, n = t.attributes.icon || "mdi:cast", r = this.hass.formatEntityState?.(t) || t.state, a = t.state === "paused" || t.state === "off" ? "mdi:play" : "mdi:pause";
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-chromecast": !0,
      available: e
    })}
      >
        <div class="stack">
          <button
            class="cast-header"
            type="button"
            @click=${() => this._moreInfo()}
          >
            <div class="icon-btn" style=${d(i)}>
              <ha-icon .icon=${n}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label">${r}</div>
            </div>
          </button>

          <div class="widgets">
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("toggle")}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("media_play_pause")}
            >
              <ha-icon .icon=${a}></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("toggle")}
            >
              <ha-icon icon="mdi:video-input-hdmi"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _call(t) {
    !this.hass || !this._config || this.hass.callService("media_player", t, {
      entity_id: this._config.entity
    });
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
qi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-chromecast {
      height: auto;
    }

    .cast-header {
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      grid-template-areas:
        "icon name"
        "icon label";
      align-items: center;
      width: 100%;
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      color: inherit;
      font: inherit;
      text-align: left;
    }

    .cast-header .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .cast-header .info-btn {
      grid-area: 1 / 2 / 3 / 3;
      pointer-events: none;
    }
  `;
Dr([
  x({ attribute: !1 })
], qi.prototype, "hass", 2);
Dr([
  y()
], qi.prototype, "_config", 2);
qi = Dr([
  $("ulm-custom-card-chromecast-card")
], qi);
var t_ = Object.defineProperty, e_ = Object.getOwnPropertyDescriptor, Ar = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? e_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && t_(e, i, n), n;
};
function ss(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function cs(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Yi = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "media_player"),
        m("name")
      ],
      computeLabel: k({
        entity: "PlayStation media player",
        name: "Name"
      }),
      computeHelper: C({
        entity: "PS4 / PS5 media_player entity",
        name: "Override friendly name when idle/standby"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "media_player.playstation",
      name: "PlayStation"
    };
  }
  setConfig(t) {
    const e = t, i = cs(ss(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: cs(ss(e, "name")),
      type: "custom:ulm-custom-card-playstation-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-playstation"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._picture(t), i = !!e && t.state === "playing", o = t.state === "idle", n = i ? {
      color: "white",
      backgroundColor: "transparent"
    } : R(this, o, "blue"), r = t.attributes.friendly_name || t.entity_id, a = t.attributes.media_title, s = i ? a || this._config.name || r : this._config.name || r, l = i ? r : this.hass.formatEntityState?.(t) || t.state, h = t.attributes.icon || "mdi:sony-playstation", p = i ? {
      background: `center / cover url("${e}") rgba(0, 0, 0, 0.15)`,
      backgroundBlendMode: "multiply"
    } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-playstation": !0,
      cover: i,
      idle: o
    })}
        style=${d(p)}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(n)}>
            <ha-icon .icon=${h}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${s}</div>
            <div class="label">${l}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _picture(t) {
    const e = t.attributes.entity_picture || t.attributes.entity_picture_local || t.attributes.media_image_url;
    if (!(typeof e != "string" || !e.length))
      return e.startsWith("http") || e.startsWith("/") || e.startsWith("data:"), e;
  }
};
Yi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-playstation {
      height: auto;
      cursor: pointer;
      background-size: cover;
      background-position: center;
    }

    ha-card.ulm-card.ulm-playstation.cover {
      color: white;
      background-color: transparent;
    }

    ha-card.ulm-card.ulm-playstation.cover .name,
    ha-card.ulm-card.ulm-playstation.cover .label {
      color: white;
    }

    ha-card.ulm-card.ulm-playstation.cover .label {
      opacity: 1;
      filter: none;
    }

    .row,
    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
Ar([
  x({ attribute: !1 })
], Yi.prototype, "hass", 2);
Ar([
  y()
], Yi.prototype, "_config", 2);
Yi = Ar([
  $("ulm-custom-card-playstation-card")
], Yi);
var i_ = Object.defineProperty, o_ = Object.getOwnPropertyDescriptor, dn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? o_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && i_(e, i, n), n;
};
function En(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ls(t) {
  return typeof t == "string" && t ? t : void 0;
}
function n_(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function r_(t) {
  return t < 10 ? `0${t}` : String(t);
}
let Le = class extends v {
  constructor() {
    super(...arguments), this._now = /* @__PURE__ */ new Date(), this._toggle = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config?.switch || !this._config.switch_enable)
        return;
      const e = this._config.switch, i = e.split(".")[0] || "input_boolean";
      this.hass.callService(i, "toggle", { entity_id: e });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        b("switch_enable"),
        u("switch", ["input_boolean", "switch"], !1),
        m("language")
      ],
      computeLabel: k({
        switch_enable: "Enable switch toggle",
        switch: "Switch entity",
        language: "Date locale"
      }),
      computeHelper: C({
        switch_enable: "Legacy: ulm_custom_card_nik_clock_switch_enable — tap toggles the switch",
        switch: "Legacy: ulm_custom_card_nik_clock_switch",
        language: "Legacy: ulm_language — BCP47 locale (default: HA language)"
      })
    };
  }
  static getStubConfig() {
    return {
      switch_enable: !1
    };
  }
  setConfig(t) {
    const e = t;
    this._config = {
      ...t,
      switch: ls(En(e, "switch", "ulm_custom_card_nik_clock_switch")),
      switch_enable: n_(
        En(e, "switch_enable", "ulm_custom_card_nik_clock_switch_enable"),
        !1
      ),
      language: ls(En(e, "language", "ulm_language")),
      type: "custom:ulm-custom-card-nik-clock-card"
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._now = /* @__PURE__ */ new Date(), this._timer = setInterval(() => {
      this._now = /* @__PURE__ */ new Date();
    }, 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timer !== void 0 && (clearInterval(this._timer), this._timer = void 0);
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto"
    };
  }
  render() {
    if (!this._config) return _;
    const t = `${this._now.getHours()}:${r_(this._now.getMinutes())}`, e = this._config.language || this.hass?.language || void 0, i = this._now.toLocaleDateString(e, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }), o = !!(this._config.switch_enable && this._config.switch);
    return c`
      <ha-card
        class="ulm-card ulm-nik-clock"
        ?clickable=${o}
        @click=${o ? this._toggle : void 0}
      >
        <div class="time">${t}</div>
        <div class="date">${i}</div>
      </ha-card>
    `;
  }
};
Le.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-nik-clock {
      background-color: transparent;
      box-shadow: none;
      height: 100px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: default;
    }

    ha-card.ulm-nik-clock[clickable] {
      cursor: pointer;
    }

    .time {
      font-size: 290%;
      font-weight: bold;
      line-height: 1.1;
      text-align: center;
      color: var(--primary-text-color);
    }

    .date {
      font-size: 110%;
      text-align: center;
      color: var(--primary-text-color);
      margin-top: 4px;
    }
  `;
dn([
  x({ attribute: !1 })
], Le.prototype, "hass", 2);
dn([
  y()
], Le.prototype, "_config", 2);
dn([
  y()
], Le.prototype, "_now", 2);
Le = dn([
  $("ulm-custom-card-nik-clock-card")
], Le);
var a_ = Object.defineProperty, s_ = Object.getOwnPropertyDescriptor, Tr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? s_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && a_(e, i, n), n;
};
function ds(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function us(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ji = class extends v {
  constructor() {
    super(...arguments), this._navigate = (t) => {
      t.stopPropagation();
      const e = this._config?.nav;
      if (!e) return;
      const i = this.hass?.navigate;
      if (typeof i == "function") {
        i(e);
        return;
      }
      history.pushState(null, "", e), window.dispatchEvent(new Event("location-changed"));
    };
  }
  static getConfigForm() {
    return {
      schema: [m("name"), m("nav")],
      computeLabel: k({
        name: "Title",
        nav: "Navigation path"
      }),
      computeHelper: C({
        name: "Legacy: ulm_custom_card_wilbiev_title_name",
        nav: "Legacy: ulm_custom_card_wilbiev_title_nav — shows back chevron when set"
      })
    };
  }
  static getStubConfig() {
    return { name: "Title" };
  }
  setConfig(t) {
    const e = t, i = us(ds(e, "name", "ulm_custom_card_wilbiev_title_name")) || "Title", o = us(ds(e, "nav", "ulm_custom_card_wilbiev_title_nav"));
    this._config = {
      ...t,
      name: i,
      nav: o,
      type: "custom:ulm-custom-card-wilbiev-title-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto"
    };
  }
  render() {
    if (!this._config) return _;
    const t = this._config.nav, e = !!t;
    return c`
      <ha-card
        class="ulm-card ulm-wilbiev-title"
        ?clickable=${e}
        @click=${e ? this._navigate : void 0}
      >
        <div class="row ${t ? "with-nav" : ""}">
          ${t ? c`
                <button
                  class="back"
                  type="button"
                  aria-label="Back"
                  @click=${this._navigate}
                >
                  <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
                </button>
              ` : _}
          <div class="divider">
            <span class="line"></span>
            <span class="text">${this._config.name}</span>
            <span class="line"></span>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ji.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-wilbiev-title {
      height: auto;
      padding: 5px;
      background-color: lightgray;
      border: 2px solid black;
      border-style: outset;
      box-shadow: none;
      cursor: default;
      color: black;
    }

    ha-card.ulm-wilbiev-title[clickable] {
      cursor: pointer;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content;
      align-items: center;
      column-gap: 8px;
    }

    .row.with-nav {
      grid-template-columns: min-content 1fr;
    }

    .back {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: #e8e9eb;
      color: black;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .back ha-icon {
      --mdc-icon-size: 24px;
      color: black;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-width: 0;
    }

    .line {
      flex: 1;
      height: 3px;
      background: black;
      min-width: 12px;
    }

    .text {
      flex-shrink: 0;
      font-size: 36px;
      font-weight: 500;
      line-height: 1.2;
      color: black;
      background: lightgray;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  `;
Tr([
  x({ attribute: !1 })
], Ji.prototype, "hass", 2);
Tr([
  y()
], Ji.prototype, "_config", 2);
Ji = Tr([
  $("ulm-custom-card-wilbiev-title-card")
], Ji);
var c_ = Object.defineProperty, l_ = Object.getOwnPropertyDescriptor, Ur = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? l_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && c_(e, i, n), n;
};
function d_(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function u_(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Zi = class extends v {
  static getConfigForm() {
    return {
      schema: [m("name")],
      computeLabel: k({
        name: "Subtitle"
      }),
      computeHelper: C({
        name: "Legacy: ulm_custom_card_wilbiev_subtitle_name (also accepts wilbiev_title_name typo)"
      })
    };
  }
  static getStubConfig() {
    return { name: "Subtitle" };
  }
  setConfig(t) {
    const i = u_(
      d_(
        t,
        "name",
        "ulm_custom_card_wilbiev_subtitle_name",
        "ulm_custom_card_wilbiev_title_name"
      )
    ) || "Subtitle";
    this._config = {
      ...t,
      name: i,
      type: "custom:ulm-custom-card-wilbiev-subtitle-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto"
    };
  }
  render() {
    return this._config ? c`
      <ha-card class="ulm-card ulm-wilbiev-subtitle">
        <div class="divider">
          <span class="line"></span>
          <span class="text">${this._config.name}</span>
          <span class="line"></span>
        </div>
        <div class="rule"></div>
      </ha-card>
    ` : _;
  }
};
Zi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-wilbiev-subtitle {
      height: auto;
      padding: 8px 12px;
      background-color: #e8e9eb;
      box-shadow: none;
      border: none;
      color: black;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .line {
      flex: 1;
      height: 2px;
      background: black;
      min-width: 12px;
    }

    .text {
      flex-shrink: 0;
      font-size: 24px;
      font-weight: 500;
      line-height: 1.2;
      color: black;
      background: #e8e9eb;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .rule {
      height: 1px;
      background: rgb(210, 210, 210);
      margin-top: 8px;
    }
  `;
Ur([
  x({ attribute: !1 })
], Zi.prototype, "hass", 2);
Ur([
  y()
], Zi.prototype, "_config", 2);
Zi = Ur([
  $("ulm-custom-card-wilbiev-subtitle-card")
], Zi);
var __ = Object.defineProperty, m_ = Object.getOwnPropertyDescriptor, Fr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? m_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && __(e, i, n), n;
};
const _e = {
  light_0: "No lights on",
  light_1: "1 light on",
  light_many: "lights on",
  cover_0: "No covers open",
  cover_1: "1 cover open",
  cover_many: "covers open"
};
function st(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function pt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function h_(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function p_(t, e = "yellow") {
  if (typeof t != "string" || !t) return e;
  const i = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(i) ? i : e;
}
function ec(t, e) {
  const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
  return i && getComputedStyle(t).getPropertyValue(`--${i[1]}`).trim() || e;
}
function g_(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-background-${e}`).trim();
  return i = ec(t, i), /^\d+\s*,/.test(i) || (i = f(t, e)), i;
}
function f_(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-${e}-text`).trim();
  return i = ec(t, i), /^\d+\s*,/.test(i) ? i : f(t, e);
}
let Xi = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["sensor", "counter"]),
        H("count_type", [
          { value: "light", label: "Lights" },
          { value: "cover", label: "Covers" }
        ]),
        S("icon_on"),
        S("icon_off"),
        A("color"),
        b("force_background_color"),
        m("light_0"),
        m("light_1"),
        m("light_many"),
        m("cover_0"),
        m("cover_1"),
        m("cover_many")
      ],
      computeLabel: k({
        entity: "Count entity",
        count_type: "Type (light | cover)",
        icon_on: "Icon when count > 0",
        icon_off: "Icon when count is 0",
        color: "Theme color",
        force_background_color: "Force background color when active",
        light_0: "Lights — zero label",
        light_1: "Lights — singular label",
        light_many: "Lights — plural suffix",
        cover_0: "Covers — zero label",
        cover_1: "Covers — singular label",
        cover_many: "Covers — plural suffix"
      }),
      computeHelper: C({
        entity: "Counter or sensor with numeric state",
        count_type: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_type",
        icon_on: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_icon_on (default: entity icon)",
        icon_off: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_icon_off",
        color: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_color (default yellow)",
        force_background_color: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_force_background_color"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.lights_on",
      count_type: "light",
      color: "yellow",
      icon_off: "mdi:lightbulb-outline",
      force_background_color: !1
    };
  }
  setConfig(t) {
    const e = t, i = pt(st(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    const n = pt(
      st(
        e,
        "count_type",
        "ulm_custom_card_yagrasdemonde_lights_count_type"
      )
    ) === "cover" ? "cover" : "light";
    this._config = {
      ...t,
      entity: i,
      count_type: n,
      icon_on: pt(
        st(e, "icon_on", "ulm_custom_card_yagrasdemonde_lights_count_icon_on")
      ),
      icon_off: pt(
        st(
          e,
          "icon_off",
          "ulm_custom_card_yagrasdemonde_lights_count_icon_off"
        )
      ) || "mdi:lightbulb-outline",
      color: p_(
        st(e, "color", "ulm_custom_card_yagrasdemonde_lights_count_color"),
        "yellow"
      ),
      force_background_color: h_(
        st(
          e,
          "force_background_color",
          "ulm_custom_card_yagrasdemonde_lights_count_force_background_color"
        ),
        !1
      ),
      light_0: pt(
        st(e, "light_0", "ulm_custom_card_yagrasdemonde_lights_count_light_0")
      ) || _e.light_0,
      light_1: pt(
        st(e, "light_1", "ulm_custom_card_yagrasdemonde_lights_count_light_1")
      ) || _e.light_1,
      light_many: pt(
        st(
          e,
          "light_many",
          "ulm_custom_card_yagrasdemonde_lights_count_light_many"
        )
      ) || _e.light_many,
      cover_0: pt(
        st(e, "cover_0", "ulm_custom_card_yagrasdemonde_lights_count_cover_0")
      ) || _e.cover_0,
      cover_1: pt(
        st(e, "cover_1", "ulm_custom_card_yagrasdemonde_lights_count_cover_1")
      ) || _e.cover_1,
      cover_many: pt(
        st(
          e,
          "cover_many",
          "ulm_custom_card_yagrasdemonde_lights_count_cover_many"
        )
      ) || _e.cover_many,
      type: "custom:ulm-custom-card-yagrasdemonde-lights-count-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-lights-count"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "unavailable" ? NaN : Number.parseFloat(t.state), i = Number.isFinite(e) && e >= 1, o = this._config.color || "yellow", n = f(this, o), r = f_(this, o), a = g_(this, o), s = !!this.hass.themes?.darkMode, l = i && (!!this._config.force_background_color || s), h = this._config.icon_off || "mdi:lightbulb-outline", p = this._config.icon_on || t.attributes.icon || "mdi:lightbulb", g = i ? p : h, z = i ? {
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, P = i ? l ? { backgroundColor: `rgba(${r}, 0.1)` } : {
      backgroundColor: `rgba(${a}, var(--opacity-bg, 1))`
    } : {}, O = i ? { color: `rgba(${r}, 1)` } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-lights-count": !0,
      active: i,
      "force-bg": l
    })}
        style=${d(P)}
      >
        <div class="row">
          <div class="icon-btn" style=${d(z)}>
            <ha-icon .icon=${g}></ha-icon>
          </div>
          <div class="label" style=${d(O)}>
            ${this._label(e, t.state)}
          </div>
        </div>
      </ha-card>
    `;
  }
  _label(t, e) {
    const i = this._config;
    if (!Number.isFinite(t) || e === "unavailable")
      return "Unavailable";
    const o = i.count_type === "cover";
    if (t === 0)
      return (o ? i.cover_0 : i.light_0) || "";
    if (t === 1)
      return (o ? i.cover_1 : i.light_1) || "";
    const n = (o ? i.cover_many : i.light_many) || "";
    return `${t} ${n}`;
  }
};
Xi.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-lights-count {
      height: auto;
    }

    /* icon_only: icon | name */
    .row {
      display: grid;
      grid-template-columns: min-content min-content;
      grid-template-rows: min-content;
      grid-template-areas: "icon label";
      align-items: center;
      column-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .label {
      grid-area: label;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;
      filter: none;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
  `;
Fr([
  x({ attribute: !1 })
], Xi.prototype, "hass", 2);
Fr([
  y()
], Xi.prototype, "_config", 2);
Xi = Fr([
  $("ulm-custom-card-yagrasdemonde-lights-count-card")
], Xi);
var b_ = Object.defineProperty, y_ = Object.getOwnPropertyDescriptor, Br = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? y_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && b_(e, i, n), n;
};
const v_ = [
  "group_lights",
  "group_motions",
  "group_doors",
  "group_windows",
  "group_outlets",
  "group_water"
];
function Je(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ze(t) {
  return typeof t == "string" && t ? t : void 0;
}
function zt(t, e) {
  if (!e) return [];
  const i = t.states[e];
  if (!i) return [];
  const o = i.attributes.entity_id;
  return Array.isArray(o) ? o.filter((n) => typeof n == "string" && !!n) : [];
}
let Qi = class extends v {
  constructor() {
    super(...arguments), this._headerTap = () => {
      const t = this._config, e = t.tap_action || "more-info";
      if (e === "none") return;
      if (e === "navigate" && t.navigation_path) {
        const o = t.navigation_path.startsWith("/") ? t.navigation_path : `/${t.navigation_path}`;
        history.pushState(null, "", o), window.dispatchEvent(new Event("location-changed"));
        return;
      }
      const i = t.entity || t.group_lights || t.temperature || t.group_motions;
      i && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: i }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        S("icon"),
        u("temperature", ["sensor"], !1),
        u("humidity", ["sensor"], !1),
        u("group_lights", ["group", "light"], !1),
        u("group_motions", ["group", "binary_sensor"], !1),
        u("group_doors", ["group", "binary_sensor"], !1),
        u("group_windows", ["group", "binary_sensor"], !1),
        u("group_outlets", ["group", "switch"], !1),
        u("group_tv", ["group", "media_player", "switch"], !1),
        u("group_water", ["group", "binary_sensor"], !1),
        u("group_windows_shutters", ["group", "cover"], !1),
        H("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "none", label: "none" }
        ]),
        m("navigation_path")
      ],
      computeLabel: k({
        icon: "Room icon",
        temperature: "Temperature sensor",
        humidity: "Humidity sensor",
        group_lights: "Lights group",
        group_motions: "Motions group",
        group_doors: "Doors group",
        group_windows: "Windows group",
        group_outlets: "Outlets group",
        group_tv: "TV group",
        group_water: "Water/leak group",
        group_windows_shutters: "Window shutters group",
        tap_action: "Header tap (ulm_card_tap_action)",
        navigation_path: "Navigate path (ulm_card_tap_navigate_path)"
      }),
      computeHelper: C({
        group_lights: "Group entity with entity_id members — toggled on double-click/tap",
        navigation_path: "Used when tap_action is navigate"
      })
    };
  }
  static getStubConfig() {
    return {
      icon: "mdi:sofa",
      temperature: "sensor.temperature",
      humidity: "sensor.humidity",
      group_lights: "light.living_room",
      tap_action: "navigate",
      navigation_path: "living-room"
    };
  }
  setConfig(t) {
    const e = t, i = (o) => Ze(Je(e, o));
    this._config = {
      ...t,
      entity: Ze(Je(e, "entity")),
      icon: Ze(Je(e, "icon")) || "mdi:floor-plan",
      group_lights: i("group_lights"),
      group_motions: i("group_motions"),
      group_doors: i("group_doors"),
      group_windows: i("group_windows"),
      group_outlets: i("group_outlets"),
      group_tv: i("group_tv"),
      group_water: i("group_water"),
      group_windows_shutters: i("group_windows_shutters"),
      temperature: i("temperature"),
      humidity: i("humidity"),
      tap_action: Ze(Je(e, "tap_action", "ulm_card_tap_action")) || "more-info",
      navigation_path: Ze(
        Je(e, "navigation_path", "ulm_card_tap_navigate_path")
      ),
      type: "custom:ulm-custom-card-drealine-roomview-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = this._unavailableCount() >= 1, i = this._shouldShowSensorsRow();
    return c`
      <ha-card class="ulm-card ulm-drealine-roomview">
        <div class="root">
          <button
            class="header"
            type="button"
            @click=${this._headerTap}
          >
            <div class="header-icon-wrap">
              <div class="header-icon">
                <ha-icon .icon=${t.icon}></ha-icon>
              </div>
              ${e ? c`<span class="warn-badge"
                    ><ha-icon icon="mdi:exclamation-thick"></ha-icon
                  ></span>` : _}
            </div>
            <div class="header-text">
              <div class="header-line">
                <ha-icon icon="mdi:thermometer" class="mini-icon"></ha-icon>
                <span>${this._tempLine()}</span>
              </div>
              <div class="header-line">
                <ha-icon icon="mdi:water-percent" class="mini-icon"></ha-icon>
                <span>${this._humidityLine()}</span>
              </div>
            </div>
          </button>

          ${i ? c`<div class="sensors">${this._sensorRow()}</div>` : _}

          <div class="devices">${this._deviceRow()}</div>
        </div>
      </ha-card>
    `;
  }
  _groupId(t) {
    return this._config[t];
  }
  _sensorGroupIds() {
    return v_.map((t) => this._groupId(t)).filter(Boolean);
  }
  _unavailableCount() {
    if (!this.hass) return 0;
    let t = 0;
    for (const e of this._sensorGroupIds()) {
      const i = zt(this.hass, e);
      if (i.length)
        for (const o of i)
          this.hass.states[o]?.state === "unavailable" && (t += 1);
      else this.hass.states[e]?.state === "unavailable" && (t += 1);
    }
    return t;
  }
  _lowBatteryCount() {
    if (!this.hass) return 0;
    let t = 0;
    for (const e of this._sensorGroupIds())
      for (const i of zt(this.hass, e)) {
        const o = this.hass.states[i]?.attributes.battery;
        typeof o == "number" && o <= 20 && (t += 1);
      }
    return t;
  }
  _shouldShowSensorsRow() {
    if (!this.hass) return !1;
    if (this._lowBatteryCount() >= 1) return !0;
    for (const t of this._sensorGroupIds())
      if (this.hass.states[t]?.state === "on") return !0;
    return !1;
  }
  _countOnMembers(t) {
    if (!t || !this.hass) return 0;
    let e = 0;
    for (const i of zt(this.hass, t)) {
      const o = this.hass.states[i]?.state;
      (o === "on" || o === "open") && (e += 1);
    }
    return e === 0 && zt(this.hass, t).length === 0 && this._groupIsOn(t) ? 1 : e;
  }
  _tempLine() {
    const t = this._config.temperature;
    if (!t || !this.hass?.states[t]) return "N/A";
    const e = this.hass.states[t], i = e.attributes.unit_of_measurement || "";
    return `${e.state}${i}`;
  }
  _humidityLine() {
    const t = this._config.humidity;
    if (!t || !this.hass?.states[t]) return "N/A";
    const e = this.hass.states[t], i = e.attributes.unit_of_measurement || "";
    return `${e.state}${i}`;
  }
  _sensorRow() {
    const t = this._config, e = this._lowBatteryCount(), i = [];
    return t.group_doors && this._groupIsOn(t.group_doors) && i.push(
      this._sensorIcon(
        "mdi:door-open",
        this._countOnMembers(t.group_doors),
        !0
      )
    ), e >= 1 && i.push(
      c`<div class="sensor-icon">
          <ha-icon icon="mdi:battery-20"></ha-icon>
          <span class="count-badge">${e}</span>
        </div>`
    ), t.group_windows && this._groupIsOn(t.group_windows) && i.push(
      this._sensorIcon(
        "mdi:window-closed-variant",
        this._countOnMembers(t.group_windows),
        !0
      )
    ), t.group_motions && this._groupIsOn(t.group_motions) && i.push(this._sensorIcon("mdi:motion-sensor", 0, !1)), t.group_water && this._groupIsOn(t.group_water) && i.push(this._sensorIcon("mdi:water", 0, !1)), i;
  }
  _groupIsOn(t) {
    const e = this.hass?.states[t]?.state;
    return e ? e === "on" || e === "open" : !1;
  }
  _sensorIcon(t, e, i) {
    return c`
      <div class="sensor-icon">
        <ha-icon .icon=${t}></ha-icon>
        ${i && e > 0 ? c`<span class="count-badge">${e}</span>` : _}
      </div>
    `;
  }
  _deviceRow() {
    const t = this._config;
    return [
      {
        id: t.group_lights,
        icon: this._lightsIcon(t.group_lights),
        show: !!t.group_lights
      },
      {
        id: t.group_windows_shutters,
        icon: this._shuttersIcon(t.group_windows_shutters),
        show: !!t.group_windows_shutters
      },
      {
        id: t.group_outlets,
        icon: this._outletsIcon(t.group_outlets),
        show: !!t.group_outlets
      },
      {
        id: t.group_tv,
        icon: this._tvIcon(t.group_tv),
        show: !!t.group_tv
      }
    ].filter((i) => i.show && i.id).map((i) => this._deviceButton(i.id, i.icon));
  }
  _deviceButton(t, e) {
    const i = this._groupIsOn(t), o = i ? this._countOnMembers(t) : 0, n = f(this, "yellow"), r = i ? {
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class=${L({ "device-btn": !0, on: i })}
        style=${d(r)}
        type="button"
        @click=${() => this._toggleGroup(t)}
      >
        <ha-icon .icon=${e}></ha-icon>
        ${o > 0 ? c`<span class="device-badge">${o}</span>` : _}
      </button>
    `;
  }
  _toggleGroup(t) {
    this.hass && this.hass.callService("homeassistant", "toggle", {
      entity_id: t
    });
  }
  _lightsIcon(t) {
    if (!t || !this.hass) return "mdi:lightbulb-group-off";
    const e = this.hass.states[t];
    if (!e) return "mdi:lightbulb-group-off";
    const i = zt(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const n of i)
        this.hass.states[n]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:lightbulb-alert";
    } else if (!i.length && e.attributes.entity_id === void 0)
      return "mdi:exclamation";
    return e.state === "on" ? "mdi:lightbulb-group" : (e.state === "off", "mdi:lightbulb-group-off");
  }
  _shuttersIcon(t) {
    if (!t || !this.hass) return "mdi:window-shutter";
    const e = this.hass.states[t];
    if (!e) return "mdi:window-shutter";
    const i = zt(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const n of i)
        this.hass.states[n]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:window-shutter-alert";
    } else if (!i.length && e.attributes.entity_id === void 0)
      return "mdi:exclamation";
    return e.state === "on" || e.state === "open" ? "mdi:window-shutter-open" : (e.state === "off" || e.state === "closed", "mdi:window-shutter");
  }
  _outletsIcon(t) {
    if (!t || !this.hass) return "mdi:power-plug-off";
    const e = this.hass.states[t];
    if (!e) return "mdi:power-plug-off";
    const i = zt(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const n of i)
        this.hass.states[n]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:exclamation-thick";
    }
    return e.state === "on" ? "mdi:power-plug" : e.state === "off" ? "mdi:power-plug-off" : "mdi:exclamation";
  }
  _tvIcon(t) {
    if (!t || !this.hass) return "mdi:television-off";
    const e = this.hass.states[t];
    if (!e) return "mdi:television-off";
    const i = zt(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const n of i)
        this.hass.states[n]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:exclamation-thick";
    }
    return e.state === "on" ? "mdi:television" : e.state === "off" ? "mdi:television-off" : "mdi:exclamation";
  }
};
Qi.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    .root {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .header {
      border: 0;
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-areas: "icon text";
      align-items: center;
      border-radius: 21px 8px 8px 21px;
      text-align: left;
      font: inherit;
      color: inherit;
      width: 100%;
      position: relative;
    }

    .header-icon-wrap {
      grid-area: icon;
      position: relative;
    }

    .header-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .header-icon ha-icon {
      --mdc-icon-size: 20px;
      transform: scale(1.2);
    }

    .warn-badge {
      position: absolute;
      left: 28px;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      background: rgba(var(--color-red, 245, 68, 54), 1);
      display: grid;
      place-items: center;
    }

    .warn-badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    .header-text {
      grid-area: text;
      min-width: 0;
    }

    .header-line {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(50%);
      margin-left: 10px;
      display: flex;
      align-items: center;
      gap: 2px;
      line-height: 1.3;
    }

    .header-line:first-child {
      margin-top: 2px;
    }

    .mini-icon {
      --mdc-icon-size: 17px;
      width: 17px;
      height: 17px;
      color: grey;
      flex-shrink: 0;
    }

    .sensors {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      gap: 0;
    }

    .sensor-icon {
      position: relative;
      width: 35px;
      display: grid;
      place-items: center;
    }

    .sensor-icon ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .count-badge {
      position: absolute;
      left: 58%;
      top: 5%;
      min-width: 13px;
      height: 13px;
      padding: 0 2px;
      border-radius: 50%;
      font-weight: 900;
      font-size: 10px;
      line-height: 13px;
      text-align: center;
      color: white;
      background: rgba(var(--color-blue, 61, 90, 254), 0.75);
    }

    .devices {
      display: flex;
      flex-wrap: wrap;
      gap: 2%;
      justify-content: flex-start;
      align-items: stretch;
    }

    .device-btn {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      border: 0;
      outline: none;
      box-shadow: none;
      flex: 1 1 0;
      min-width: 40px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      margin: 0;
      overflow: visible;
      box-sizing: border-box;
    }

    .device-btn ha-icon {
      --mdc-icon-size: 20px;
      width: 24px;
      height: 40px;
      color: inherit;
      display: grid;
      place-items: center;
    }

    .device-btn.on ha-icon {
      color: inherit;
    }

    .device-badge {
      position: absolute;
      left: 50.5%;
      top: 24%;
      min-width: 13px;
      height: 13px;
      padding: 0 2px;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 900;
      line-height: 13px;
      text-align: center;
      background: rgba(var(--color-blue, 61, 90, 254), 0.75);
      color: white;
    }
  `;
Br([
  x({ attribute: !1 })
], Qi.prototype, "hass", 2);
Br([
  y()
], Qi.prototype, "_config", 2);
Qi = Br([
  $("ulm-custom-card-drealine-roomview-card")
], Qi);
var w_ = Object.defineProperty, x_ = Object.getOwnPropertyDescriptor, Hr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? x_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && w_(e, i, n), n;
};
const Pn = {
  en: {
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    ago: "ago",
    justnow: "just now"
  },
  de: {
    day: "Tag",
    days: "Tage",
    hour: "Stunde",
    hours: "Stunden",
    minute: "Minute",
    minutes: "Minuten",
    ago: "her",
    justnow: "Jetzt"
  },
  es: {
    day: "día",
    days: "días",
    hour: "hora",
    hours: "horas",
    minute: "minuto",
    minutes: "minutos",
    ago: "atrás",
    justnow: "justo ahora"
  },
  tr: {
    day: "gün",
    days: "gün",
    hour: "saat",
    hours: "saat",
    minute: "dakika",
    minutes: "dakika",
    ago: "önce",
    justnow: "az önce"
  },
  pl: {
    day: "dzień",
    days: "dni",
    hour: "godzinę",
    hours: "godzin",
    minute: "minutę",
    minutes: "minut",
    ago: "temu",
    justnow: "przed chwilą"
  },
  hu: {
    day: "nappal",
    days: "nappal",
    hour: "órával",
    hours: "órával",
    minute: "perccel",
    minutes: "perccel",
    ago: "ezelőtt",
    justnow: "éppen most"
  }
};
function _s(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ms(t) {
  return typeof t == "string" && t ? t : void 0;
}
function $_(t, e) {
  const i = /* @__PURE__ */ new Date();
  let o;
  const n = !!t.attributes.has_date, r = !!t.attributes.has_time;
  if (n)
    o = new Date(String(t.state).replace(" ", "T")).getTime();
  else {
    const g = /* @__PURE__ */ new Date();
    g.setHours(
      Number(t.attributes.hour) || 0,
      Number(t.attributes.minute) || 0,
      Number(t.attributes.second) || 0,
      0
    ), o = g.getTime();
  }
  const a = i.getTime() - o, s = Math.trunc(a / (1e3 * 60 * 60 * 24)), l = Math.trunc(Math.abs(a) / (1e3 * 60 * 60)) % 24, h = Math.trunc(Math.abs(a) / (1e3 * 60)) % 60;
  let p = "";
  return n && s > 0 && (p += `${s} ${s > 1 ? e.days : e.day} `), r && l > 0 && (p += `${l} ${l > 1 ? e.hours : e.hour} `), r && !n && h > 0 && (p += `${h} ${h > 1 ? e.minutes : e.minute} `), p = p.trim(), p.length ? `${p} ${e.ago}` : e.justnow;
}
let to = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "input_datetime"),
        m("name")
      ],
      computeLabel: k({
        entity: "input_datetime entity",
        name: "Name"
      }),
      computeHelper: C({
        entity: "Date/time to measure elapsed time from",
        name: "Defaults to entity friendly_name"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_datetime.example"
    };
  }
  setConfig(t) {
    const e = t, i = ms(_s(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ms(_s(e, "name")),
      type: "custom:ulm-custom-card-eraycetinay-elapsed-time-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 4,
      min_columns: 3,
      max_columns: 6,
      rows: "auto",
      min_rows: 1
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._timer = window.setInterval(() => this.requestUpdate(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timer != null && (window.clearInterval(this._timer), this._timer = void 0);
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-elapsed-time">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = t.attributes.icon || "mdi:calendar-clock", n = $_(t, this._lang());
    return c`
      <ha-card class="ulm-card ulm-elapsed-time" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${d(e)}>
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${i}</div>
            <div class="label">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.locale?.language || this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return Pn[t] || Pn[e] || Pn.en;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
to.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      min-height: 0 !important;
      align-self: start;
      justify-self: start;
    }

    ha-card.ulm-card.ulm-elapsed-time {
      /* Override ulmCardStyles height:100% / flex stretch */
      height: auto !important;
      min-height: 0;
      display: block;
      cursor: pointer;
      box-sizing: border-box;
    }

    ha-card.ulm-elapsed-time .row {
      height: 42px;
      align-content: center;
    }
  `;
Hr([
  x({ attribute: !1 })
], to.prototype, "hass", 2);
Hr([
  y()
], to.prototype, "_config", 2);
to = Hr([
  $("ulm-custom-card-eraycetinay-elapsed-time-card")
], to);
var k_ = Object.defineProperty, C_ = Object.getOwnPropertyDescriptor, Rr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? C_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && k_(e, i, n), n;
};
const S_ = [
  { mode: "off", icon: "mdi:power" },
  { mode: "heat", icon: "mdi:fire" },
  { mode: "cool", icon: "mdi:snowflake" },
  { mode: "heat_cool", icon: "mdi:sync" },
  { mode: "dry", icon: "mdi:water" },
  { mode: "fan_only", icon: "mdi:fan" }
];
function Ln(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function hs(t) {
  return typeof t == "string" && t ? t : void 0;
}
function z_(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function E_(t) {
  switch (t) {
    case "dry":
      return "mdi:water";
    case "heat":
      return "mdi:fire";
    case "cool":
      return "mdi:snowflake";
    case "fan_only":
      return "mdi:fan";
    case "heat_cool":
      return "mdi:sync";
    default:
      return "mdi:thermostat";
  }
}
function P_(t, e) {
  switch (e) {
    case "dry":
      return {
        color: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)"
      };
    case "cool":
      return {
        color: `rgba(${f(t, "blue")}, 1)`,
        backgroundColor: `rgba(${f(t, "blue")}, 0.2)`
      };
    case "heat":
      return {
        color: `rgba(${f(t, "red")}, 1)`,
        backgroundColor: `rgba(${f(t, "red")}, 0.2)`
      };
    case "fan_only":
      return {
        color: "rgba(195, 0, 255, 1)",
        backgroundColor: "rgba(195, 0, 255, 0.2)"
      };
    case "heat_cool":
      return {
        color: `rgba(${f(t, "green")}, 1)`,
        backgroundColor: `rgba(${f(t, "green")}, 0.2)`
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
  }
}
function L_(t, e, i) {
  if (!i)
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  switch (e) {
    case "heat":
      return {
        color: `rgba(${f(t, "red")}, 1)`,
        backgroundColor: `rgba(${f(t, "red")}, 0.2)`
      };
    case "cool":
      return {
        color: `rgba(${f(t, "blue")}, 1)`,
        backgroundColor: `rgba(${f(t, "blue")}, 0.2)`
      };
    case "heat_cool":
      return {
        color: `rgba(${f(t, "green")}, 1)`,
        backgroundColor: `rgba(${f(t, "green")}, 0.2)`
      };
    case "dry":
      return {
        color: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)"
      };
    case "fan_only":
      return {
        color: "rgba(195, 0, 255, 1)",
        backgroundColor: "rgba(195, 0, 255, 0.2)"
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
  }
}
let eo = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "climate"),
        m("name"),
        M("temp_step")
      ],
      computeLabel: k({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step"
      }),
      computeHelper: C({
        entity: "Heat pump / climate entity",
        name: "Display name (defaults to friendly_name)",
        temp_step: "± step for minus/plus. Default: entity target_temp_step, else 0.5"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "climate.heat_pump"
    };
  }
  setConfig(t) {
    const e = t, i = hs(Ln(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: hs(Ln(e, "name")),
      temp_step: z_(Ln(e, "temp_step")),
      type: "custom:ulm-custom-card-heat-pump-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-heat-pump">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this.hass.formatEntityState?.(t) || t.state, n = t.attributes.hvac_action, r = t.attributes.temperature != null ? `${t.attributes.current_temperature ?? "—"}° • ${o}${n ? ` (${n})` : ""}` : o, a = t.attributes.temperature, s = a == null || a === "" ? "-°C" : `${a}°C`;
    return c`
      <ha-card class="ulm-card ulm-heat-pump">
        <div class="stack">
          <div
            class="row icon-info"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), this._moreInfo());
    }}
          >
            <button
              class="icon-btn"
              type="button"
              style=${d(P_(this, e))}
              tabindex="-1"
              @click=${(l) => {
      l.stopPropagation(), this._moreInfo();
    }}
            >
              <ha-icon .icon=${E_(e)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${i}</div>
              <div class="label">${r}</div>
            </div>
          </div>

          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="temp-readout">${s}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>

          <div class="modes">
            ${S_.map(
      ({ mode: l, icon: h }) => c`
                <button
                  class="widget-btn mode"
                  type="button"
                  aria-label=${l}
                  style=${d(
        L_(this, l, e === l)
      )}
                  @click=${() => this._setMode(l)}
                >
                  <ha-icon .icon=${h}></ha-icon>
                </button>
              `
    )}
          </div>
        </div>
      </ha-card>
    `;
  }
  _setMode(t) {
    !this.hass || !this._config || this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: t
    });
  }
  _adjustTemp(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = e.attributes.temperature;
    if (i == null) return;
    const o = parseFloat(String(i)) + this._step(e) * t;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: o
    });
  }
  _step(t) {
    if (this._config?.temp_step != null && this._config.temp_step > 0)
      return this._config.temp_step;
    const e = Number(t.attributes.target_temp_step);
    return !Number.isNaN(e) && e > 0 ? e : 0.5;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
eo.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-heat-pump {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-heat-pump > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .icon-info {
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      box-shadow: none;
      background: transparent;
    }

    .modes {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 7px;
      width: 100%;
    }

    .widget-btn.mode {
      width: 100%;
      place-self: center;
    }
  `;
Rr([
  x({ attribute: !1 })
], eo.prototype, "hass", 2);
Rr([
  y()
], eo.prototype, "_config", 2);
eo = Rr([
  $("ulm-custom-card-heat-pump-card")
], eo);
var M_ = Object.defineProperty, O_ = Object.getOwnPropertyDescriptor, Gr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? O_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && M_(e, i, n), n;
};
const ps = "#ff8100";
function Me(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ye(t) {
  return typeof t == "string" && t ? t : void 0;
}
function N_(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function I_(t) {
  const e = t.variables;
  return ye(Me(t, "entity")) || ye(e?.entity) || ye(Me(t, "ulm_custom_card_httpedo13_thermostat_entity"));
}
function j_(t) {
  const e = t.variables;
  return ye(Me(t, "name")) || ye(e?.name) || ye(Me(t, "ulm_custom_card_httpedo13_thermostat_name"));
}
let io = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "climate"),
        m("name"),
        M("temp_step"),
        b("collapse")
      ],
      computeLabel: k({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step",
        collapse: "Collapse controls when off"
      }),
      computeHelper: C({
        entity: "Legacy: variables.entity",
        name: "Legacy: variables.name — defaults to entity id",
        temp_step: "± step for minus/plus (default 0.5)",
        collapse: "Hide temperature row unless HVAC mode is heat"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "climate.thermostat",
      name: "Thermostat",
      temp_step: 0.5,
      collapse: !1
    };
  }
  setConfig(t) {
    const e = t, i = I_(e);
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: j_(e),
      temp_step: N_(Me(e, "temp_step")),
      collapse: !!Me(e, "collapse"),
      type: "custom:ulm-custom-card-httpedo13-thermostat-card"
    };
  }
  getCardSize() {
    if (!this._config || !this.hass) return 2;
    const t = this.hass.states[this._config.entity];
    return this._config.collapse && t?.state !== "heat" ? 1 : 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-httpedo13-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.attributes.hvac_action === "heating", i = t.state !== "off", o = !this._config.collapse || t.state === "heat", n = this._config.name || t.attributes.friendly_name || this._config.entity, r = this.hass.formatEntityState?.(t) || t.state, a = e ? "mdi:radiator" : "mdi:radiator-off", s = f(this, "red"), l = e ? ps : void 0, h = l ? { backgroundColor: l } : {}, p = e ? { color: "var(--card-background-color, #fafafa)" } : {}, g = e ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: "var(--card-background-color, #fafafa)"
    } : i ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: `rgba(${s}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, z = t.attributes.current_temperature, P = z == null ? "-°C" : `${z}°C`, O = t.attributes.temperature, T = O == null ? "-°C" : `${O}°C`, F = {
      backgroundColor: e ? "var(--card-background-color, #fafafa)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)"
    }, nt = e ? {
      backgroundColor: ps,
      color: "var(--card-background-color, #fafafa)",
      fontWeight: "bold"
    } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-httpedo13-thermostat": !0,
      heating: e
    })}
        style=${d(h)}
      >
        <div class="stack">
          <div class="favorite">
            <div
              class="row icon-info header"
              role="button"
              tabindex="0"
              @click=${() => this._toggleHeat()}
              @keydown=${(G) => {
      (G.key === "Enter" || G.key === " ") && (G.preventDefault(), this._toggleHeat());
    }}
            >
              <button
                class="icon-btn"
                type="button"
                style=${d(g)}
                tabindex="-1"
                @click=${(G) => {
      G.stopPropagation(), this._toggleHeat();
    }}
              >
                <ha-icon .icon=${a}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name" style=${d(p)}>${n}</div>
                <div class="label" style=${d(p)}>
                  ${r}
                </div>
              </div>
            </div>
            <div class="current-temp" style=${d(nt)}>
              ${P}
            </div>
          </div>

          ${o ? c`
                <div class="controls">
                  <button
                    class="widget-btn"
                    type="button"
                    style=${d(F)}
                    aria-label="Decrease temperature"
                    @click=${() => this._adjustTemp(-1)}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <div class="temp-readout" style=${d(nt)}>
                    ${T}
                  </div>
                  <button
                    class="widget-btn"
                    type="button"
                    style=${d(F)}
                    aria-label="Increase temperature"
                    @click=${() => this._adjustTemp(1)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              ` : _}
        </div>
      </ha-card>
    `;
  }
  _toggleHeat() {
    if (!this.hass || !this._config) return;
    const t = this.hass.states[this._config.entity];
    if (!t) return;
    const e = t.state === "off" ? "heat" : t.state === "heat" ? "off" : "heat";
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: e
    });
  }
  _adjustTemp(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = e.attributes.temperature;
    if (i == null) return;
    const o = parseFloat(String(i)) + this._step(e) * t;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: o
    });
  }
  _step(t) {
    if (this._config?.temp_step != null && this._config.temp_step > 0)
      return this._config.temp_step;
    const e = Number(t.attributes.target_temp_step);
    return !Number.isNaN(e) && e > 0 ? e : 0.5;
  }
};
io.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-httpedo13-thermostat {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
      transition: background-color 0.2s ease;
    }

    ha-card.ulm-card.ulm-httpedo13-thermostat > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .favorite {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    .favorite .header {
      grid-column: 1 / span 2;
      min-width: 0;
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .current-temp {
      grid-column: 3;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 1;
      background: var(--card-background-color, #fafafa);
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: bold;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: var(--card-background-color, #fafafa);
      box-shadow: none;
      padding: 0;
      text-align: center;
      line-height: 1;
    }

    /* Override ulmCardStyles .label opacity when heating (white on orange) */
    ha-card.heating .header .name,
    ha-card.heating .header .label {
      opacity: 1;
      filter: none;
    }
  `;
Gr([
  x({ attribute: !1 })
], io.prototype, "hass", 2);
Gr([
  y()
], io.prototype, "_config", 2);
io = Gr([
  $("ulm-custom-card-httpedo13-thermostat-card")
], io);
var D_ = Object.defineProperty, A_ = Object.getOwnPropertyDescriptor, Wr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? A_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && D_(e, i, n), n;
};
const gs = {
  en: {
    recentlyadded: "Recently added",
    in_theaters: "in theathers",
    weekday: [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    today: "Today",
    tommorow: "Tommorow",
    locale: "en-US"
  },
  fr: {
    recentlyadded: "Récemment ajouté",
    in_theaters: "au cinéma",
    weekday: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ],
    today: "Aujourd'hui",
    tommorow: "Demain",
    locale: "fr-FR"
  }
}, T_ = Zo`
  <svg viewBox="0 0 50 50" class="plex-icon" aria-hidden="true">
    <path
      d="M7.7.3h34.6c4.1 0 7.4 3.3 7.4 7.4v34.6c0 4.1-3.3 7.4-7.4 7.4H7.7c-4.1 0-7.4-3.3-7.4-7.4V7.7C.3 3.6 3.6.3 7.7.3z"
      fill="#282a2d"
    />
    <path
      d="M25,7.1H14.6L25,25L14.6,42.9H25L35.4,25L25,7.1z"
      fill="#e5a00d"
    />
  </svg>
`;
function Ho(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function U_(t) {
  return typeof t == "string" && t ? t : void 0;
}
function F_(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseInt(String(t ?? ""), 10);
  return Number.isFinite(i) ? i : e;
}
function B_(t) {
  return String(t ?? "").toLowerCase() === "upcoming" ? "upcoming" : "library";
}
function H_(t) {
  const e = String(t ?? "").toLowerCase();
  if (e === "radarr" || e === "sonarr" || e === "plex") return e;
}
function R_(t) {
  return t.includes("sonarr") ? "sonarr" : t.includes("plex") ? "plex" : "radarr";
}
function G_(t) {
  return (t?.language || "en").split("-")[0].toLowerCase() === "fr" ? gs.fr : gs.en;
}
function W_(t, e) {
  const i = new Date(t.valueOf());
  return i.setDate(i.getDate() + e), i;
}
let oo = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "sensor"),
        H("mode", [
          { value: "library", label: "Library (fanart)" },
          { value: "upcoming", label: "Upcoming (poster)" }
        ]),
        M("index"),
        H("platform", [
          { value: "radarr", label: "Radarr" },
          { value: "sonarr", label: "Sonarr" },
          { value: "plex", label: "Plex" }
        ])
      ],
      computeLabel: k({
        entity: "Media sensor (attributes.data)",
        mode: "Display mode",
        index: "Data array index",
        platform: "Platform (optional)"
      }),
      computeHelper: C({
        entity: "Sensor with attributes.data[] (fanart/poster, title, etc.)",
        mode: "Default library",
        index: "Legacy ulm_custom_card_imswel_medias_index (default 1)",
        platform: "Legacy ulm_custom_card_imswel_medias_platform — auto-detected from entity_id if empty"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.plex_recently_added",
      mode: "library",
      index: 1
    };
  }
  setConfig(t) {
    const e = t, i = U_(Ho(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    const o = B_(Ho(e, "mode"));
    this._config = {
      ...t,
      entity: i,
      mode: o,
      index: F_(
        Ho(e, "index", "ulm_custom_card_imswel_medias_index"),
        1
      ),
      platform: H_(
        Ho(e, "platform", "ulm_custom_card_imswel_medias_platform")
      ),
      type: "custom:ulm-custom-card-imswel-medias-card"
    };
  }
  getCardSize() {
    return this._config?.mode === "upcoming" ? 3 : 2;
  }
  /**
   * Standard HA section grid units (no CSS aspect-ratio):
   * - library (fanart): 6×2
   * - upcoming (poster): 3×4
   */
  getGridOptions() {
    return this._config?.mode === "upcoming" ? {
      columns: 3,
      min_columns: 2,
      max_columns: 6,
      rows: 4,
      min_rows: 2,
      max_rows: 6
    } : {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: 2,
      min_rows: 1,
      max_rows: 4
    };
  }
  updated(t) {
    if (!t.has("_config")) return;
    const e = t.get("_config");
    e && e.mode !== this._config?.mode && this.dispatchEvent(
      new Event("ll-rebuild", { bubbles: !0, composed: !0 })
    );
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-imswel-medias"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.mode || "library", i = G_(this.hass), o = t.state === "unavailable" || t.state === "undefined" || t.state === "unknown";
    return e === "library" ? this._renderLibrary(t, i, o) : this._renderUpcoming(t, i, o);
  }
  _dataItem(t, e) {
    const i = t.attributes.data;
    if (!Array.isArray(i) || e < 0 || e >= i.length)
      return;
    const o = i[e];
    return o && typeof o == "object" ? o : void 0;
  }
  _unavailableLabel() {
    const t = "state.default.unavailable", e = this.hass?.localize?.(t);
    return e && e !== t ? e : "Unavailable";
  }
  _renderLibrary(t, e, i) {
    const n = this._config.index ?? 1, r = i ? void 0 : this._dataItem(t, n), a = r && typeof r.fanart == "string" ? r.fanart : void 0;
    let s = this._unavailableLabel();
    if (r) {
      const h = String(r.title ?? "");
      let p = "";
      r.number != null && r.number !== "" ? p = String(r.number) : typeof r.aired == "string" && (p = `(${r.aired.split("-")[0]})`), s = `${h} ${p}`.trim();
    }
    const l = a ? {
      backgroundImage: `url("${a}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-imswel-medias": !0,
      library: !0
    })}
        style=${d(l)}
        @click=${this._moreInfo}
      >
        <div class="blur-overlay" aria-hidden="true"></div>
        <div class="library-grid">
          <div class="plex-wrap">${T_}</div>
          <div class="media-name">${e.recentlyadded}</div>
          <div class="media-label">${s}</div>
        </div>
      </ha-card>
    `;
  }
  _renderUpcoming(t, e, i) {
    const o = this._config, n = o.index ?? 1, r = o.platform || R_(o.entity), a = i ? void 0 : this._dataItem(t, n), s = a && typeof a.poster == "string" ? a.poster : void 0;
    let l = this._unavailableLabel(), h = "";
    if (a) {
      if (r === "radarr") {
        l = String(a.title ?? "");
        const g = a.airdate ? new Date(String(a.airdate)) : null;
        if (g && !Number.isNaN(g.getTime())) {
          const z = this._formatDate(g, e), P = typeof a.release == "string" ? this._formatRelease(a.release, e) : "";
          h = `${z}${P ? ` ${P}` : ""}`.trim();
        }
      } else if (r === "sonarr") {
        const g = a.number != null ? String(a.number) : "";
        l = `${a.title ?? ""}${g ? ` - ${g}` : ""}`;
        const z = a.airdate ? new Date(String(a.airdate)) : null;
        z && !Number.isNaN(z.getTime()) && (h = this._formatDate(z, e));
      }
    }
    const p = s ? {
      backgroundImage: `url("${s}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    } : {};
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-imswel-medias": !0,
      upcoming: !0
    })}
        style=${d(p)}
        @click=${this._moreInfo}
      >
        <div class="poster-overlay" aria-hidden="true"></div>
        <div class="upcoming-grid">
          <div class="media-name ellipsis">${l}</div>
          <div class="media-label">${h}</div>
        </div>
      </ha-card>
    `;
  }
  _formatRelease(t, e) {
    return t.includes("Available") ? "" : t.includes("In Theaters") ? e.in_theaters : "";
  }
  _formatDate(t, e) {
    const i = /* @__PURE__ */ new Date(), o = W_(i, 1), n = t.getTime() - i.getTime(), r = Math.floor(n / 1e3);
    if (Math.floor(r / (3600 * 24)) < 6) {
      const s = e.weekday;
      return s[t.getDay()] === s[i.getDay()] ? e.today : s[t.getDay()] === s[o.getDay()] ? e.tommorow : s[t.getDay()] ?? t.toLocaleDateString(e.locale);
    }
    return t.toLocaleDateString(e.locale);
  }
};
oo.styles = [
  E,
  w`
      /* Fill the HA section cell (fit-rows from getGridOptions) */
      :host {
        display: block;
        width: 100%;
        height: 100% !important;
        min-height: 0;
        align-self: stretch;
        justify-self: stretch;
      }

      ha-card.ulm-imswel-medias {
        position: relative;
        width: 100%;
        height: 100% !important;
        min-height: 0;
        padding: 0;
        cursor: pointer;
        color: white;
        text-shadow: 1px 1px 5px rgba(18, 22, 23, 0.9);
        border: none;
        overflow: hidden;
        display: block;
        box-sizing: border-box;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .blur-overlay,
      .poster-overlay {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
      }

      .blur-overlay {
        background: linear-gradient(
          rgba(0, 0, 0, 0) 40%,
          rgba(0, 0, 0, 0.8) 100%
        );
      }

      .poster-overlay {
        background: linear-gradient(
          rgba(0, 0, 0, 0) 50%,
          rgba(0, 0, 0, 0.8) 100%
        );
      }

      .library-grid {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-areas:
          "icon ."
          "n n"
          "l l"
          ". .";
        grid-template-rows: auto repeat(2, min-content) 12px;
        height: 100%;
        box-sizing: border-box;
        padding: 12px 12px 0;
      }

      .plex-wrap {
        grid-area: icon;
        width: 24px;
        height: 24px;
      }

      .plex-icon {
        width: 24px;
        height: 24px;
        display: block;
      }

      .upcoming-grid {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-areas:
          ". . ."
          ". n ."
          ". l ."
          ". . .";
        grid-template-columns: 8px 1fr 8px;
        grid-template-rows: auto repeat(2, min-content) 8px;
        height: 100%;
        align-content: end;
        box-sizing: border-box;
      }

      .media-name {
        grid-area: n;
        font-weight: bold;
        font-size: 14px;
        z-index: 2;
      }

      .library-grid .media-name {
        align-self: end;
        justify-self: start;
      }

      .upcoming-grid .media-name {
        align-self: end;
        justify-self: center;
        text-align: center;
      }

      .media-label {
        grid-area: l;
        font-weight: bold;
        font-size: 12px;
        filter: opacity(60%);
        z-index: 2;
      }

      .library-grid .media-label {
        align-self: start;
        justify-self: start;
      }

      .upcoming-grid .media-label {
        align-self: start;
        justify-self: center;
        text-align: center;
      }

      .ellipsis {
        white-space: normal;
        word-wrap: break-word;
        max-height: 2.4em;
        line-height: 1.2em;
        overflow: hidden;
      }

      .name,
      .label {
        margin-left: 0;
        opacity: 1;
        color: white;
      }
    `
];
Wr([
  x({ attribute: !1 })
], oo.prototype, "hass", 2);
Wr([
  y()
], oo.prototype, "_config", 2);
oo = Wr([
  $("ulm-custom-card-imswel-medias-card")
], oo);
var K_ = Object.defineProperty, V_ = Object.getOwnPropertyDescriptor, Kr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? V_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && K_(e, i, n), n;
};
const q_ = "Here", Y_ = "Absent";
function Et(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Gt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function J_(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let no = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "person"),
        D([S("icon"), b("use_entity_picture")]),
        u("wifi_tracker", void 0, !1),
        u("gps_tracker", void 0, !1),
        u("findmy_script", "script", !1),
        D([m("home_label"), m("not_home_label")])
      ],
      computeLabel: k({
        entity: "Person entity",
        icon: "Icon",
        use_entity_picture: "Use entity picture",
        wifi_tracker: "WiFi tracker (popup config only)",
        gps_tracker: "GPS tracker (popup config only)",
        findmy_script: "Find My script (popup config only)",
        home_label: "Home label",
        not_home_label: "Not home label"
      }),
      computeHelper: C({
        entity: "Also accepts ulm_card_imswel_person_entity",
        use_entity_picture: "Also ulm_card_imswel_person_use_entity_picture (default false)",
        wifi_tracker: "Legacy ulm_card_imswel_person_wifi_tracker — stored for YAML parity",
        gps_tracker: "Legacy ulm_card_imswel_person_gps_tracker",
        findmy_script: "Legacy ulm_card_imswel_person_findmy_script",
        home_label: "Default from languages/en.yaml (Here); legacy ulm_custom_card_imswel_person_home",
        not_home_label: "Default from languages/en.yaml (Absent); legacy ulm_custom_card_imswel_person_not_home"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.anne_therese",
      icon: "mdi:face-man",
      use_entity_picture: !1
    };
  }
  setConfig(t) {
    const e = t, i = Gt(
      Et(e, "entity", "ulm_card_imswel_person_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: Gt(Et(e, "icon")) || "mdi:face-man",
      use_entity_picture: J_(
        Et(e, "use_entity_picture", "ulm_card_imswel_person_use_entity_picture"),
        !1
      ),
      wifi_tracker: Gt(
        Et(e, "wifi_tracker", "ulm_card_imswel_person_wifi_tracker")
      ),
      gps_tracker: Gt(
        Et(e, "gps_tracker", "ulm_card_imswel_person_gps_tracker")
      ),
      findmy_script: Gt(
        Et(e, "findmy_script", "ulm_card_imswel_person_findmy_script")
      ),
      home_label: Gt(
        Et(e, "home_label", "ulm_custom_card_imswel_person_home")
      ),
      not_home_label: Gt(
        Et(e, "not_home_label", "ulm_custom_card_imswel_person_not_home")
      ),
      type: "custom:ulm-custom-card-imswel-person-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-imswel-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, n = this._config.icon || "mdi:face-man", r = this._badge(t), a = this._label(t), s = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: o ? "transparent" : "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <ha-card class="ulm-card ulm-imswel-person" @click=${this._moreInfo}>
        <div class="row">
          <div
            class=${L({ "icon-btn": !0, picture: !!o })}
            style=${d(s)}
          >
            ${o ? c`<img src=${o} alt=${e} />` : c`<ha-icon .icon=${n}></ha-icon>`}
          </div>
          <div class="info-btn">
            <div class="name">${e}</div>
            <div class="label">${a}</div>
          </div>
        </div>
        <span
          class="notification"
          style=${d({
      backgroundColor: `rgba(${r.rgb}, 1)`
    })}
        >
          <ha-icon .icon=${r.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }
  _theme(t) {
    return f(this, t);
  }
  _badge(t) {
    const e = t.state;
    return e === "unavailable" || e === "unknown" ? { icon: "mdi:alert", rgb: this._theme("red") } : e === "home" ? { icon: "mdi:home-variant", rgb: this._theme("blue") } : {
      icon: this._zoneIcon(e) || "mdi:home-minus",
      rgb: this._theme("green")
    };
  }
  _zoneIcon(t) {
    if (this.hass) {
      if (t === "not_home") return "mdi:home-minus";
      for (const e of Object.keys(this.hass.states)) {
        if (!e.startsWith("zone.")) continue;
        const i = this.hass.states[e];
        if (t === i.attributes.friendly_name)
          return i.attributes.icon != null ? String(i.attributes.icon) : "mdi:help-circle";
      }
    }
  }
  _label(t) {
    const e = t.state, i = this._config;
    if (e === "home")
      return i?.home_label || q_;
    if (e === "not_home")
      return i?.not_home_label || Y_;
    if (e === "unavailable" || e === "unknown") {
      const o = `state.default.${e}`, n = this.hass?.localize?.(o);
      return n && n !== o ? n : e === "unavailable" ? "Unavailable" : "Unknown";
    }
    return e;
  }
};
no.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-imswel-person {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .icon-btn.picture {
        padding: 0;
        overflow: hidden;
      }

      .icon-btn.picture ha-icon {
        display: none;
      }

      .icon-btn.picture img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .notification {
        position: absolute;
        left: 38px;
        top: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 2;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 10px;
        width: 10px;
        height: 10px;
        color: var(--primary-background-color, #fff);
      }
    `
];
Kr([
  x({ attribute: !1 })
], no.prototype, "hass", 2);
Kr([
  y()
], no.prototype, "_config", 2);
no = Kr([
  $("ulm-custom-card-imswel-person-card")
], no);
var Z_ = Object.defineProperty, X_ = Object.getOwnPropertyDescriptor, Vr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? X_(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Z_(e, i, n), n;
};
function Pt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Lt(t) {
  return typeof t == "string" && t ? t : void 0;
}
let ro = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        m("icon"),
        u("entity_1", void 0, !1),
        u("entity_2", void 0, !1),
        u("entity_3", void 0, !1),
        u("entity_4", void 0, !1),
        m("name_1"),
        m("name_2"),
        m("name_3"),
        m("name_4")
      ],
      computeLabel: k({
        entity: "Main entity (ulm_custom_card_irmajavi_entities)",
        name: "Header name (ulm_custom_card_irmajavi_entities_name)",
        icon: "Header emoji/icon (ulm_custom_card_irmajavi_entities_icon)",
        entity_1: "Metric 1 entity",
        entity_2: "Metric 2 entity",
        entity_3: "Metric 3 entity",
        entity_4: "Metric 4 entity",
        name_1: "Metric 1 caption (ulm_custom_card_irmajavi_entities_name_1)",
        name_2: "Metric 2 caption",
        name_3: "Metric 3 caption",
        name_4: "Metric 4 caption"
      }),
      computeHelper: C({
        icon: "Emoji or text shown before the header name (default 👽)",
        entity_1: "Legacy: ulm_custom_card_irmajavi_entities_entity_1",
        entity_2: "Legacy: ulm_custom_card_irmajavi_entities_entity_2",
        entity_3: "Legacy: ulm_custom_card_irmajavi_entities_entity_3",
        entity_4: "Legacy: ulm_custom_card_irmajavi_entities_entity_4"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.demo",
      name: "Entities",
      icon: "👽",
      entity_1: "sensor.demo",
      name_1: "Metric 1"
    };
  }
  setConfig(t) {
    const e = t, i = Lt(
      Pt(e, "entity", "ulm_custom_card_irmajavi_entities")
    );
    if (!i) throw new Error("Please define an entity");
    const o = (n) => Lt(
      Pt(
        e,
        `entity_${n}`,
        `ulm_custom_card_irmajavi_entities_entity_${n}`
      )
    );
    this._config = {
      ...t,
      entity: i,
      name: Lt(Pt(e, "name", "ulm_custom_card_irmajavi_entities_name")) || void 0,
      icon: Lt(Pt(e, "icon", "ulm_custom_card_irmajavi_entities_icon")) || "👽",
      entity_1: o(1),
      entity_2: o(2),
      entity_3: o(3),
      entity_4: o(4),
      name_1: Lt(
        Pt(e, "name_1", "ulm_custom_card_irmajavi_entities_name_1")
      ),
      name_2: Lt(
        Pt(e, "name_2", "ulm_custom_card_irmajavi_entities_name_2")
      ),
      name_3: Lt(
        Pt(e, "name_3", "ulm_custom_card_irmajavi_entities_name_3")
      ),
      name_4: Lt(
        Pt(e, "name_4", "ulm_custom_card_irmajavi_entities_name_4")
      ),
      type: "custom:ulm-custom-card-irmajavi-entities-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = this.hass.states[t.entity], i = `${t.icon} ${t.name || e?.attributes.friendly_name || t.entity}`, o = e ? this.hass.formatEntityState?.(e) || e.state : "—", n = [1, 2, 3, 4].map((r) => ({
      entity: t[`entity_${r}`],
      name: t[`name_${r}`]
    }));
    return c`
      <ha-card class="ulm-card ulm-irmajavi-entities">
        <div class="stack">
          <div class="header-pill">
            <div class="header-name">${i}</div>
            <div class="header-state">${o}</div>
          </div>
          <div class="metrics">
            ${n.map((r) => this._metricCell(r.entity, r.name))}
          </div>
        </div>
      </ha-card>
    `;
  }
  _metricCell(t, e) {
    if (!t)
      return c`<div class="metric empty"></div>`;
    const i = this.hass.states[t], o = i ? this._formatState(i) : "—";
    return c`
      <button
        class="metric"
        type="button"
        @click=${(n) => {
      n.stopPropagation(), this._moreInfo(t);
    }}
      >
        <div class="metric-state">${o}</div>
        <div class="metric-caption">${e || ""}</div>
      </button>
    `;
  }
  _formatState(t) {
    return this.hass?.formatEntityState?.(t) || t.state;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
ro.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-irmajavi-entities {
      border-radius: 30px;
      height: 160px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-pill {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 20px;
      height: 70px;
      box-sizing: border-box;
      display: grid;
      grid-template-areas:
        "name"
        "state";
      grid-template-rows: min-content min-content;
      align-content: center;
      padding: 0;
    }

    .header-name {
      grid-area: name;
      align-self: start;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      line-height: 1.2;
    }

    .header-state {
      grid-area: state;
      justify-self: start;
      align-self: end;
      font-weight: bold;
      font-size: 14px;
      filter: opacity(40%);
      margin-left: 35px;
      line-height: 1.2;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 7px;
    }

    .metric {
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      display: grid;
      grid-template-areas:
        "state"
        "caption";
      grid-template-rows: min-content min-content;
      min-width: 0;
      font: inherit;
      color: inherit;
    }

    .metric.empty {
      pointer-events: none;
    }

    .metric-state {
      grid-area: state;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
    }

    .metric-caption {
      grid-area: caption;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      line-height: 1.2;
      text-align: center;
    }
  `;
Vr([
  x({ attribute: !1 })
], ro.prototype, "hass", 2);
Vr([
  y()
], ro.prototype, "_config", 2);
ro = Vr([
  $("ulm-custom-card-irmajavi-entities-card")
], ro);
var Q_ = Object.defineProperty, tm = Object.getOwnPropertyDescriptor, qr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? tm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Q_(e, i, n), n;
};
const Mn = {
  speedtest: "Speedtest",
  download: "Download Speed",
  upload: "Upload Speed"
};
function xt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Mt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function em(t, e) {
  if (typeof t != "string" || !t) return e;
  const i = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(
    i
  ) ? i : e;
}
let ao = class extends v {
  constructor() {
    super(...arguments), this._refreshEntities = () => {
      if (!this.hass || !this._config) return;
      const t = [
        this._config.download_entity,
        this._config.upload_entity,
        this._config.ping_entity
      ].filter(Boolean);
      t.length && this.hass.callService("homeassistant", "update_entity", {
        entity_id: t
      });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("download_entity", ["sensor"], !1),
        u("upload_entity", ["sensor"], !1),
        u("ping_entity", ["sensor"], !1),
        A("color"),
        m("router_name"),
        m("router_model"),
        m("label_speedtest"),
        m("label_download"),
        m("label_upload")
      ],
      computeLabel: k({
        download_entity: "Download sensor (ulm_custom_card_irmajavi_speedtest_download_speed_entity)",
        upload_entity: "Upload sensor (ulm_custom_card_irmajavi_speedtest_upload_speed_entity)",
        ping_entity: "Ping sensor (ulm_custom_card_irmajavi_speedtest_ping_entity)",
        color: "Accent color (ulm_custom_card_irmajavi_speedtest_color)",
        router_name: "Router name (ulm_custom_card_irmajavi_speedtest_router_name)",
        router_model: "Router model (ulm_custom_card_irmajavi_speedtest_router_model)",
        label_speedtest: "Speedtest bar label (ulm_custom_card_irmajavi_speedtest_speedtest)",
        label_download: "Download caption (ulm_custom_card_irmajavi_speedtest_download)",
        label_upload: "Upload caption (ulm_custom_card_irmajavi_speedtest_upload)"
      }),
      computeHelper: C({
        color: "Default blue — colors router wifi icon",
        label_speedtest: "Default: Speedtest (from languages/en.yaml)",
        label_download: "Default: Download Speed",
        label_upload: "Default: Upload Speed"
      })
    };
  }
  static getStubConfig() {
    return {
      download_entity: "sensor.speedtest_download",
      upload_entity: "sensor.speedtest_upload",
      ping_entity: "sensor.speedtest_ping",
      color: "blue",
      router_name: "Router",
      router_model: "Model"
    };
  }
  setConfig(t) {
    const e = t, i = Mt(
      xt(
        e,
        "download_entity",
        "entity",
        "ulm_custom_card_irmajavi_speedtest_download_speed_entity"
      )
    ), o = Mt(
      xt(
        e,
        "upload_entity",
        "ulm_custom_card_irmajavi_speedtest_upload_speed_entity"
      )
    ), n = Mt(
      xt(e, "ping_entity", "ulm_custom_card_irmajavi_speedtest_ping_entity")
    );
    if (!i && !o && !n)
      throw new Error(
        "Please define at least one of download_entity, upload_entity, or ping_entity"
      );
    this._config = {
      ...t,
      entity: i || o || n,
      color: em(
        xt(e, "color", "ulm_custom_card_irmajavi_speedtest_color"),
        "blue"
      ),
      router_name: Mt(
        xt(
          e,
          "router_name",
          "ulm_custom_card_irmajavi_speedtest_router_name"
        )
      ) || "router_name",
      router_model: Mt(
        xt(
          e,
          "router_model",
          "ulm_custom_card_irmajavi_speedtest_router_model"
        )
      ) || "router_model",
      download_entity: i,
      upload_entity: o,
      ping_entity: n,
      label_speedtest: Mt(
        xt(
          e,
          "label_speedtest",
          "ulm_custom_card_irmajavi_speedtest_speedtest"
        )
      ) || Mn.speedtest,
      label_download: Mt(
        xt(
          e,
          "label_download",
          "ulm_custom_card_irmajavi_speedtest_download"
        )
      ) || Mn.download,
      label_upload: Mt(
        xt(
          e,
          "label_upload",
          "ulm_custom_card_irmajavi_speedtest_upload"
        )
      ) || Mn.upload,
      type: "custom:ulm-custom-card-irmajavi-speedtest-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = t.color || "blue", i = f(this, e), o = {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    };
    return c`
      <ha-card class="ulm-card ulm-irmajavi-speedtest">
        <div class="stack">
          <div class="router">
            <div class="router-icon" style=${d(o)}>
              <ha-icon icon="mdi:wifi"></ha-icon>
            </div>
            <div class="router-name">${t.router_name}</div>
            <div class="router-model">${t.router_model}</div>
          </div>

          <button
            class="speedtest-bar"
            type="button"
            @click=${this._refreshEntities}
          >
            <ha-icon class="bar-icon" icon="mdi:speedometer"></ha-icon>
            <span class="bar-label">${t.label_speedtest}</span>
            <ha-icon class="bar-chevron" icon="mdi:chevron-right"></ha-icon>
          </button>

          <div class="tiles">
            ${this._speedTile(
      t.label_download,
      t.download_entity
    )}
            ${this._speedTile(t.label_upload, t.upload_entity)}
          </div>
        </div>
      </ha-card>
    `;
  }
  _speedTile(t, e) {
    const i = e ? this.hass.states[e] : void 0, o = i ? this._stateWithUnit(i) : "";
    return c`
      <button
        class="tile"
        type="button"
        ?disabled=${!e}
        @click=${(n) => {
      n.stopPropagation(), e && this._moreInfo(e);
    }}
      >
        <div class="tile-value">${o || "—"}</div>
        <div class="tile-caption">${t || ""}</div>
      </button>
    `;
  }
  _stateWithUnit(t) {
    const e = t.attributes.unit_of_measurement;
    let i = t.state;
    return e && (i += e), i;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
ao.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .router {
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "model";
      justify-items: center;
    }

    .router-icon {
      grid-area: icon;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .router-icon ha-icon {
      --mdc-icon-size: 32px;
    }

    .router-name {
      grid-area: name;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
    }

    .router-model {
      grid-area: model;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
    }

    .speedtest-bar {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 10px;
      height: 40px;
      padding: 0 8px 0 5px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 40px 1fr auto;
      grid-template-areas: "icon label chevron";
      align-items: center;
      column-gap: 0;
      cursor: pointer;
      background: transparent;
      font: inherit;
      color: inherit;
      width: 100%;
    }

    .bar-icon {
      grid-area: icon;
      --mdc-icon-size: 20px;
      width: 40px;
      justify-self: start;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .bar-label {
      grid-area: label;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
      justify-self: start;
      line-height: 1;
    }

    .bar-chevron {
      grid-area: chevron;
      --mdc-icon-size: 20px;
      justify-self: end;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .tiles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 7px;
    }

    .tile {
      border: 0;
      border-radius: 14px;
      height: 80px;
      padding: 15px 8px 10px;
      box-sizing: border-box;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      grid-template-areas:
        "value"
        "caption";
      grid-template-rows: min-content min-content;
      justify-items: center;
      align-content: start;
      text-align: center;
      cursor: pointer;
      font: inherit;
      color: inherit;
    }

    .tile:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .tile-value {
      grid-area: value;
      font-weight: bold;
      font-size: 23px;
      line-height: 1.1;
      justify-self: center;
      text-align: center;
    }

    .tile-caption {
      grid-area: caption;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      justify-self: center;
      text-align: center;
    }
  `;
qr([
  x({ attribute: !1 })
], ao.prototype, "hass", 2);
qr([
  y()
], ao.prototype, "_config", 2);
ao = qr([
  $("ulm-custom-card-irmajavi-speedtest-card")
], ao);
var im = Object.defineProperty, om = Object.getOwnPropertyDescriptor, Yr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? om(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && im(e, i, n), n;
};
const nm = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️"
};
function Ot(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Nt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function rm(t) {
  return t ? nm[t] ?? "❔" : "❔";
}
let so = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", "weather"),
        u("date_entity", ["sensor", "input_text"], !1),
        u("temperature_entity", ["sensor"], !1),
        u("entity_1", void 0, !1),
        u("entity_2", void 0, !1),
        u("entity_3", void 0, !1),
        u("entity_4", void 0, !1),
        m("name_1"),
        m("name_2"),
        m("name_3"),
        m("name_4")
      ],
      computeLabel: k({
        entity: "Weather entity (ulm_custom_card_irmajavi_weather)",
        date_entity: "Date label (ulm_custom_card_irmajavi_weather_date)",
        temperature_entity: "Outside temp (ulm_custom_card_irmajavi_weather_temperature_outside)",
        entity_1: "Metric 1 (ulm_custom_card_irmajavi_weather_entity_1)",
        entity_2: "Metric 2",
        entity_3: "Metric 3",
        entity_4: "Metric 4",
        name_1: "Metric 1 name (ulm_custom_card_irmajavi_weather_name_1)",
        name_2: "Metric 2 name",
        name_3: "Metric 3 name",
        name_4: "Metric 4 name"
      }),
      computeHelper: C({
        entity: "Condition state drives the header weather emoji",
        date_entity: "Shown next to emoji in the header",
        temperature_entity: "Large temp chip on the header right"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "weather.home",
      date_entity: "sensor.date",
      temperature_entity: "sensor.outside_temperature",
      entity_1: "sensor.humidity",
      name_1: "Humidity"
    };
  }
  setConfig(t) {
    const e = t, i = Nt(
      Ot(e, "entity", "ulm_custom_card_irmajavi_weather")
    );
    if (!i) throw new Error("Please define an entity");
    const o = (n) => Nt(
      Ot(
        e,
        `entity_${n}`,
        `ulm_custom_card_irmajavi_weather_entity_${n}`
      )
    );
    this._config = {
      ...t,
      entity: i,
      date_entity: Nt(
        Ot(e, "date_entity", "ulm_custom_card_irmajavi_weather_date")
      ),
      temperature_entity: Nt(
        Ot(
          e,
          "temperature_entity",
          "ulm_custom_card_irmajavi_weather_temperature_outside"
        )
      ),
      entity_1: o(1),
      entity_2: o(2),
      entity_3: o(3),
      entity_4: o(4),
      name_1: Nt(
        Ot(e, "name_1", "ulm_custom_card_irmajavi_weather_name_1")
      ),
      name_2: Nt(
        Ot(e, "name_2", "ulm_custom_card_irmajavi_weather_name_2")
      ),
      name_3: Nt(
        Ot(e, "name_3", "ulm_custom_card_irmajavi_weather_name_3")
      ),
      name_4: Nt(
        Ot(e, "name_4", "ulm_custom_card_irmajavi_weather_name_4")
      ),
      type: "custom:ulm-custom-card-irmajavi-weather-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto",
      min_rows: 3
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config, e = this.hass.states[t.entity], i = rm(e?.state), o = t.date_entity, n = o && this.hass.states[o]?.state || "", r = `${i} ${n}`.trim(), a = t.temperature_entity, s = a ? this.hass.states[a] : void 0, l = s?.attributes.unit_of_measurement || "", h = s ? `${s.state}${l ? ` ${l}` : ""}` : "—", p = [1, 2, 3, 4].map((g) => ({
      entity: t[`entity_${g}`],
      name: t[`name_${g}`]
    }));
    return c`
      <ha-card class="ulm-card ulm-irmajavi-weather">
        <div class="stack">
          <div class="header-pill">
            <div class="header-left">${r}</div>
            <div class="temp-chip">${h}</div>
          </div>
          <div class="metrics">
            ${p.map((g) => this._metricCell(g.entity, g.name))}
          </div>
        </div>
      </ha-card>
    `;
  }
  _metricCell(t, e) {
    if (!t)
      return c`<div class="metric empty"></div>`;
    const i = this.hass.states[t], o = i ? this._stateWithUnit(i) : "—";
    return c`
      <button
        class="metric"
        type="button"
        @click=${(n) => {
      n.stopPropagation(), this._moreInfo(t);
    }}
      >
        <div class="metric-state">${o}</div>
        <div class="metric-caption">${e || ""}</div>
      </button>
    `;
  }
  _stateWithUnit(t) {
    const e = t.attributes.unit_of_measurement, i = t.state;
    return e ? `${i} ${e}` : i;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
so.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-irmajavi-weather {
      border-radius: 30px;
      height: 160px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-pill {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 20px;
      height: 70px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: "left chip";
      align-items: center;
      column-gap: 8px;
      padding: 0 10px 0 12px;
    }

    .header-left {
      grid-area: left;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0;
      line-height: 1.2;
      white-space: nowrap;
    }

    .temp-chip {
      grid-area: chip;
      justify-self: end;
      align-self: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
      /* YAML uses 10px grey border as chip padding */
      border: 10px solid var(--google-grey, var(--divider-color));
      background-color: var(--google-grey, var(--divider-color));
      color: #000;
      border-radius: 12px;
      margin: 0;
      line-height: 1;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 7px;
    }

    .metric {
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      width: 100%;
      min-width: 0;
      cursor: pointer;
      display: grid;
      grid-template-areas:
        "state"
        "caption";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content;
      justify-items: center;
      text-align: center;
      font: inherit;
      color: inherit;
    }

    .metric.empty {
      pointer-events: none;
    }

    .metric-state {
      grid-area: state;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      width: 100%;
    }

    .metric-caption {
      grid-area: caption;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      line-height: 1.2;
      text-align: center;
      width: 100%;
    }
  `;
Yr([
  x({ attribute: !1 })
], so.prototype, "hass", 2);
Yr([
  y()
], so.prototype, "_config", 2);
so = Yr([
  $("ulm-custom-card-irmajavi-weather-card")
], so);
var am = Object.defineProperty, sm = Object.getOwnPropertyDescriptor, Jr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? sm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && am(e, i, n), n;
};
const cm = 200;
function Xe(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function On(t) {
  return typeof t == "string" && t ? t : void 0;
}
function fs(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function lm(t, e, i) {
  if (!Number.isFinite(t)) return "180deg";
  const o = i - e || 1;
  return `${180 + (Math.min(Math.max(t, e), i) - e) / o * 180}deg`;
}
let co = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        m("icon"),
        M("min"),
        M("max")
      ],
      computeLabel: k({
        entity: "Gauge entity",
        name: "Name override",
        icon: "Icon override",
        min: "Minimum",
        max: "Maximum"
      }),
      computeHelper: C({
        min: "Legacy ulm_card_mpse_gauge_min (default 0)",
        max: "Legacy ulm_card_mpse_gauge_max (default 100)",
        name: "Defaults to entity friendly_name",
        icon: "Defaults to entity icon"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.example",
      min: 0,
      max: 100
    };
  }
  setConfig(t) {
    const e = t, i = On(Xe(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: On(Xe(e, "name")),
      icon: On(Xe(e, "icon")),
      min: fs(Xe(e, "min", "ulm_card_mpse_gauge_min"), 0),
      max: fs(Xe(e, "max", "ulm_card_mpse_gauge_max"), 100),
      type: "custom:ulm-custom-card-mpse-gauge-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-mpse-gauge"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.min ?? 0, i = this._config.max ?? 100, o = Number.parseFloat(t.state), n = lm(o, e, i), r = this._config.name || t.attributes.friendly_name || t.entity_id, a = t.state, s = this._config.icon || t.attributes.icon || "mdi:gauge", l = t.state === "unavailable", h = e === 0 && i === 100 ? "" : `${e} - ${i}`, p = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, g = {
      "--gauge-card-width": `${cm}px`,
      "--outer-angle": n,
      "--inner-angle": n,
      "--outer-color": "var(--google-blue)",
      "--inner-color": "var(--google-blue)"
    };
    return c`
      <ha-card class="ulm-card ulm-mpse-gauge" @click=${this._moreInfo}>
        <div class="header">
          <div class="row ${l ? "unavailable" : ""}">
            <div class="icon-btn" style=${d(p)}>
              <ha-icon .icon=${s}></ha-icon>
              ${l ? c`<div class="badge">
                    <ha-icon icon="mdi:exclamation"></ha-icon>
                  </div>` : _}
            </div>
            <div class="info-btn">
              <div class="name">${r}</div>
              <div class="label">${a}</div>
            </div>
          </div>
        </div>

        <div class="gauge-dual-card" style=${d(g)}>
          <div class="gauge-dual">
            <div class="gauge-frame">
              <div class="gauge-background circle-container">
                <div class="circle"></div>
              </div>
              <div class="outer-gauge circle-container">
                <div class="circle"></div>
              </div>
              <div class="inner-gauge circle-container small-circle">
                <div class="circle"></div>
              </div>
              ${h ? c`<div class="gauge-title">${h}</div>` : _}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
co.styles = [
  E,
  w`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-mpse-gauge {
        padding: 0;
        cursor: pointer;
        overflow: hidden;
      }

      /* item1: icon_info with padding 12px */
      .header {
        padding: 12px;
      }

      /* icon_info card chrome */
      .header .row {
        pointer-events: none;
        border-radius: 21px 8px 8px 21px;
        box-sizing: border-box;
      }

      /*
       * dual-gauge-card styles (cardwidth 200, shadeInner false).
       * Values/labels omitted — YAML hides them with transparent color.
       */
      .gauge-dual-card {
        --gauge-background-color: var(--secondary-background-color);
        --gauge-width: calc(var(--gauge-card-width) / 10.5);
        --title-font-size: calc(var(--gauge-card-width) / 16);
        width: var(--gauge-card-width);
        padding: 16px;
        box-sizing: border-box;
        margin: 0 auto;
        color: var(--google-grey, var(--secondary-text-color));
      }

      .gauge-dual-card div {
        box-sizing: border-box;
      }

      .gauge-dual {
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 50%;
      }

      .gauge-frame {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
      }

      .circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        border-radius: 100%;
        border: var(--gauge-width) solid;
        transition: border-color 0.5s linear;
      }

      .circle-container {
        position: absolute;
        transform-origin: 50% 100%;
        top: 0;
        left: 0;
        height: 50%;
        width: 100%;
        overflow: hidden;
        transition: transform 0.5s linear;
      }

      .small-circle .circle {
        top: 20%;
        left: 10%;
        width: 80%;
        height: 160%;
      }

      .gauge-background .circle {
        border: calc(var(--gauge-width) * 2 - 2px) solid
          var(--gauge-background-color);
      }

      .gauge-title {
        position: absolute;
        bottom: 51%;
        margin-bottom: 0.1em;
        text-align: center;
        width: 100%;
        font-size: var(--title-font-size);
        color: var(--google-grey, var(--secondary-text-color));
        pointer-events: none;
      }

      .outer-gauge {
        transform: rotate(var(--outer-angle));
      }

      .outer-gauge .circle {
        border-color: var(--outer-color);
      }

      .inner-gauge {
        transform: rotate(var(--inner-angle));
      }

      .inner-gauge .circle {
        border-color: var(--inner-color);
      }
    `
];
Jr([
  x({ attribute: !1 })
], co.prototype, "hass", 2);
Jr([
  y()
], co.prototype, "_config", 2);
co = Jr([
  $("ulm-custom-card-mpse-gauge-card")
], co);
var dm = Object.defineProperty, um = Object.getOwnPropertyDescriptor, Zr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? um(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && dm(e, i, n), n;
};
function bs(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ys(t) {
  return typeof t == "string" && t ? t : void 0;
}
function _m(t) {
  return t === "cool" ? "mdi:snowflake" : t === "heat" ? "mdi:fire" : "mdi:thermostat";
}
function Gn(t, e) {
  let i = getComputedStyle(t).getPropertyValue(e).trim();
  const o = i.match(/^var\(--([a-z0-9-]+)\)$/i);
  return o && (i = getComputedStyle(t).getPropertyValue(`--${o[1]}`).trim() || i), i;
}
function vs(t, e) {
  const i = e === "heat" ? "--color-background-red" : "--color-background-blue", o = e === "heat" ? "red" : "blue";
  let n = Gn(t, i);
  /^\d+\s*,/.test(n) || (n = f(t, o));
  const r = getComputedStyle(t).getPropertyValue("--opacity-bg").trim() || "1";
  return { backgroundColor: `rgba(${n}, ${r})` };
}
function mm(t, e) {
  if (e === "heat") {
    let i = Gn(t, "--color-red-text");
    return /^\d+\s*,/.test(i) || (i = f(t, "red")), { color: `rgba(${i}, 1)` };
  }
  if (e === "cool") {
    let i = Gn(t, "--color-blue-text");
    return /^\d+\s*,/.test(i) || (i = f(t, "blue")), { color: `rgba(${i}, 1)` };
  }
  return {};
}
function hm(t, e) {
  if (e === "heat") {
    const i = f(t, "red");
    return {
      row: vs(t, "heat"),
      icon: {
        color: `rgba(${i}, 1)`,
        backgroundColor: `rgba(${i}, 0.2)`
      }
    };
  }
  if (e === "cool") {
    const i = f(t, "blue");
    return {
      row: vs(t, "cool"),
      icon: {
        color: `rgba(${i}, 1)`,
        backgroundColor: `rgba(${i}, 0.2)`
      }
    };
  }
  return {
    row: {},
    icon: {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }
  };
}
let lo = class extends v {
  static getConfigForm() {
    return {
      schema: [u("entity", "climate"), m("name")],
      computeLabel: k({
        entity: "Climate entity",
        name: "Name"
      }),
      computeHelper: C({
        name: "Defaults to entity friendly_name"
      })
    };
  }
  static getStubConfig() {
    return { entity: "climate.living_room" };
  }
  setConfig(t) {
    const e = t, i = ys(bs(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ys(bs(e, "name")),
      type: "custom:ulm-custom-card-mpse-thermostat-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-mpse-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, { row: i, icon: o } = hm(this, e), n = mm(this, e), r = this._config.name || t.attributes.friendly_name || t.entity_id, a = this.hass.formatEntityState?.(t) || t.state, s = t.attributes.hvac_action, l = t.attributes.temperature != null ? `${t.attributes.current_temperature ?? "—"}° • ${a}${s ? ` (${s})` : ""}` : a, h = t.attributes.temperature, p = h == null || h === "" ? "-°C" : `${h}°C`;
    return c`
      <ha-card class="ulm-card ulm-mpse-thermostat">
        <div class="stack">
          <div
            class=${L({ row: !0, "icon-info": !0, [e]: !0 })}
            style=${d(i)}
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(g) => {
      (g.key === "Enter" || g.key === " ") && (g.preventDefault(), this._moreInfo());
    }}
          >
            <button
              class="icon-btn"
              type="button"
              style=${d(o)}
              tabindex="-1"
              @click=${(g) => {
      g.stopPropagation(), this._moreInfo();
    }}
            >
              <ha-icon .icon=${_m(e)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name" style=${d(n)}>${r}</div>
              <div class="label" style=${d(n)}>${l}</div>
            </div>
          </div>

          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="temp-readout">${p}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  _adjustTemp(t) {
    if (!this.hass || !this._config) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const i = e.attributes.temperature;
    if (i == null) return;
    const o = this._step(e), n = parseFloat(String(i)) + o * t;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: n
    });
  }
  _step(t) {
    const e = Number(t.attributes.target_temp_step);
    return !Number.isNaN(e) && e > 0 ? e : 0.5;
  }
  _moreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: this._config.entity }
      })
    );
  }
};
lo.styles = w`
    ${E}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-mpse-thermostat {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
    }

    ha-card.ulm-mpse-thermostat > .stack {
      flex: none;
      gap: 12px;
    }

    .icon-info {
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .icon-info.heat .label,
    .icon-info.cool .label {
      opacity: 1;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      align-items: center;
    }

    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: transparent;
      box-shadow: none;
      text-align: center;
      min-width: 0;
    }

    .icon-info .label {
      filter: none;
    }
  `;
Zr([
  x({ attribute: !1 })
], lo.prototype, "hass", 2);
Zr([
  y()
], lo.prototype, "_config", 2);
lo = Zr([
  $("ulm-custom-card-mpse-thermostat-card")
], lo);
var pm = Object.defineProperty, gm = Object.getOwnPropertyDescriptor, un = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? gm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && pm(e, i, n), n;
};
function me(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ws(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ro(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === 1 ? !0 : t === "false" || t === 0 ? !1 : e;
}
let Oe = class extends v {
  constructor() {
    super(...arguments), this._holdFired = !1, this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "update"),
        m("name"),
        b("enable_controls"),
        b("collapsible"),
        b("horizontal"),
        b("narrow_buttons")
      ],
      computeLabel: k({
        entity: "Update entity",
        name: "Name",
        enable_controls: "Show install / skip buttons",
        collapsible: "Hide controls when up to date",
        horizontal: "Controls beside header",
        narrow_buttons: "Narrow control column (horizontal)"
      }),
      computeHelper: C({
        enable_controls: "Legacy: ulm_card_neekster_update_enable_controls",
        collapsible: "Legacy: ulm_card_neekster_update_collapsible",
        horizontal: "Legacy: ulm_card_neekster_update_horizontal",
        narrow_buttons: "Legacy: ulm_card_neekster_update_narrow_buttons"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "update.home_assistant_core",
      enable_controls: !0,
      collapsible: !1,
      horizontal: !1,
      narrow_buttons: !1
    };
  }
  setConfig(t) {
    const e = t, i = ws(me(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ws(me(e, "name")),
      enable_controls: Ro(
        me(e, "enable_controls", "ulm_card_neekster_update_enable_controls"),
        !1
      ),
      collapsible: Ro(
        me(e, "collapsible", "ulm_card_neekster_update_collapsible"),
        !1
      ),
      horizontal: Ro(
        me(e, "horizontal", "ulm_card_neekster_update_horizontal"),
        !1
      ),
      narrow_buttons: Ro(
        me(
          e,
          "narrow_buttons",
          "ulm_card_neekster_update_narrow_buttons"
        ),
        !1
      ),
      type: "custom:ulm-custom-card-neekster-update-card"
    };
  }
  getCardSize() {
    return !this._config || !this.hass || !this._showControls(this.hass.states[this._config.entity]?.state) || this._config.horizontal ? 1 : 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 1
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-neekster-update">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state === "off", i = this._showControls(t.state), o = this._config.name || t.attributes.friendly_name || t.entity_id, n = e ? "Up to Date." : "Update Available!", r = e ? "mdi:cloud-check" : "mdi:cloud-download", a = f(this, "green"), s = f(this, "yellow"), l = e ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: `rgba(${a}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: `rgba(${s}, 0.2)`
    }, h = L({
      stack: !0,
      horizontal: !!(this._config.horizontal && i),
      narrow: !!this._config.narrow_buttons
    }), p = this._config.collapsible && e ? "0px" : "12px";
    return c`
      <ha-card
        class="ulm-card ulm-neekster-update"
        style=${d({ "--stack-gap": p })}
        @click=${this._moreInfo}
      >
        <div class=${h}>
          <div class="row header">
            <button class="icon-btn" type="button" style=${d(l)}>
              <ha-icon .icon=${r}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label status">${n}</div>
            </div>
          </div>

          ${i ? c`
                <div class="controls" @click=${(g) => g.stopPropagation()}>
                  <button
                    class="widget-btn"
                    type="button"
                    aria-label="Install update"
                    @click=${() => this._install()}
                  >
                    <ha-icon icon="mdi:package-down"></ha-icon>
                  </button>
                  <button
                    class="widget-btn"
                    type="button"
                    aria-label="Skip update (hold to clear skipped)"
                    @pointerdown=${() => this._startHoldClear()}
                    @pointerup=${() => this._cancelHold()}
                    @pointerleave=${() => this._cancelHold()}
                    @click=${() => this._skip()}
                  >
                    <ha-icon icon="mdi:cancel"></ha-icon>
                  </button>
                </div>
              ` : _}
        </div>
      </ha-card>
    `;
  }
  _showControls(t) {
    return !(!this._config?.enable_controls || this._config.collapsible && t !== "on");
  }
  _install() {
    !this.hass || !this._config || this.hass.callService("update", "install", {
      entity_id: this._config.entity
    });
  }
  _skip() {
    if (this._holdFired) {
      this._holdFired = !1;
      return;
    }
    !this.hass || !this._config || this.hass.callService("update", "skip", {
      entity_id: this._config.entity
    });
  }
  _startHoldClear() {
    this._cancelHold(), this._holdFired = !1, this._holdTimer = setTimeout(() => {
      this._holdTimer = void 0, this._holdFired = !0, !(!this.hass || !this._config) && this.hass.callService("update", "clear_skipped", {
        entity_id: this._config.entity
      });
    }, 600);
  }
  _cancelHold() {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cancelHold();
  }
};
Oe.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-neekster-update {
      height: auto !important;
      cursor: pointer;
      padding: 12px;
    }

    ha-card.ulm-neekster-update > .stack {
      flex: none;
      gap: var(--stack-gap, 12px);
    }

    .stack.horizontal {
      flex-direction: row;
      align-items: center;
    }

    .stack.horizontal.narrow .controls {
      flex: 1;
    }

    .stack.horizontal:not(.narrow) .row {
      flex: 1;
      min-width: 0;
    }

    .stack.horizontal.narrow .row {
      flex: 2;
      min-width: 0;
    }

    .header .label.status {
      opacity: 1;
      filter: none;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }

    .stack.horizontal .controls {
      min-width: 0;
    }

    .row.header {
      padding: 0;
      background: none;
      box-shadow: none;
    }
  `;
un([
  x({ attribute: !1 })
], Oe.prototype, "hass", 2);
un([
  y()
], Oe.prototype, "_config", 2);
un([
  y()
], Oe.prototype, "_holdTimer", 2);
Oe = un([
  $("ulm-custom-card-neekster-update-card")
], Oe);
var fm = Object.defineProperty, bm = Object.getOwnPropertyDescriptor, Xr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? bm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && fm(e, i, n), n;
};
function W(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function K(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ym(t) {
  return t <= 30 ? "var(--google-red, var(--error-color))" : t <= 59 ? "var(--google-yellow, var(--warning-color))" : "var(--google-green, var(--success-color))";
}
let uo = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["input_boolean", "switch"]),
        m("name"),
        u("button1_entity", void 0, !1),
        u("button2_entity", void 0, !1),
        u("button3_entity", void 0, !1),
        u("restart_entity", "button", !1),
        u("reload_entity", "button", !1),
        u("maintenance_entity", void 0, !1),
        u("par1_entity", "sensor", !1),
        u("par2_entity", "sensor", !1),
        u("par3_entity", "sensor", !1),
        m("par1_name"),
        m("par2_name"),
        m("par3_name"),
        u("battery_entity", "sensor", !1),
        m("battery_name")
      ],
      computeLabel: k({
        entity: "Main status (ulm_custom_card_nik_tablet_main)",
        name: "Tablet name (ulm_custom_card_nik_tablet_name)",
        button1_entity: "USB (ulm_custom_card_nik_tablet_button1)",
        button2_entity: "Motion (ulm_custom_card_nik_tablet_button2)",
        button3_entity: "Monitor (ulm_custom_card_nik_tablet_button3)",
        restart_entity: "Restart button (ulm_custom_card_nik_tablet_restart)",
        reload_entity: "Reload button (ulm_custom_card_nik_tablet_reload)",
        maintenance_entity: "Maintenance (ulm_custom_card_nik_tablet_maintenance)",
        par1_entity: "Metric 1 (ulm_custom_card_nik_tablet_par1)",
        par2_entity: "Metric 2 (ulm_custom_card_nik_tablet_par2)",
        par3_entity: "Metric 3 (ulm_custom_card_nik_tablet_par3)",
        par1_name: "Metric 1 label (ulm_custom_card_nik_tablet_par1_name)",
        par2_name: "Metric 2 label (ulm_custom_card_nik_tablet_par2_name)",
        par3_name: "Metric 3 label (ulm_custom_card_nik_tablet_par3_name)",
        battery_entity: "Battery (ulm_custom_card_nik_tablet_battery)",
        battery_name: "Battery label (ulm_custom_card_nik_tablet_battery_name)"
      }),
      computeHelper: C({
        entity: "Header row (tap disabled in original YAML)",
        button1_entity: "Green widget_icon — toggles on tap",
        restart_entity: "Blue widget — button.press on tap"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "input_boolean.tablet_status",
      name: "Tablet",
      button1_entity: "switch.demo",
      button2_entity: "binary_sensor.demo",
      button3_entity: "switch.demo_2",
      restart_entity: "button.tablet_restart",
      reload_entity: "button.tablet_reload",
      maintenance_entity: "input_boolean.maintenance",
      par1_entity: "sensor.demo",
      par1_name: "CPU",
      par2_entity: "sensor.demo_2",
      par2_name: "RAM",
      par3_entity: "sensor.demo_3",
      par3_name: "Temp",
      battery_entity: "sensor.tablet_battery",
      battery_name: "Battery"
    };
  }
  setConfig(t) {
    const e = t, i = K(
      W(e, "entity", "ulm_custom_card_nik_tablet_main")
    );
    if (!i) throw new Error("Please define a main entity");
    this._config = {
      ...t,
      entity: i,
      name: K(W(e, "name", "ulm_custom_card_nik_tablet_name")),
      button1_entity: K(
        W(e, "button1_entity", "ulm_custom_card_nik_tablet_button1")
      ),
      button2_entity: K(
        W(e, "button2_entity", "ulm_custom_card_nik_tablet_button2")
      ),
      button3_entity: K(
        W(e, "button3_entity", "ulm_custom_card_nik_tablet_button3")
      ),
      restart_entity: K(
        W(e, "restart_entity", "ulm_custom_card_nik_tablet_restart")
      ),
      reload_entity: K(
        W(e, "reload_entity", "ulm_custom_card_nik_tablet_reload")
      ),
      maintenance_entity: K(
        W(e, "maintenance_entity", "ulm_custom_card_nik_tablet_maintenance")
      ),
      par1_entity: K(
        W(e, "par1_entity", "ulm_custom_card_nik_tablet_par1")
      ),
      par2_entity: K(
        W(e, "par2_entity", "ulm_custom_card_nik_tablet_par2")
      ),
      par3_entity: K(
        W(e, "par3_entity", "ulm_custom_card_nik_tablet_par3")
      ),
      par1_name: K(
        W(e, "par1_name", "ulm_custom_card_nik_tablet_par1_name")
      ),
      par2_name: K(
        W(e, "par2_name", "ulm_custom_card_nik_tablet_par2_name")
      ),
      par3_name: K(
        W(e, "par3_name", "ulm_custom_card_nik_tablet_par3_name")
      ),
      battery_entity: K(
        W(
          e,
          "battery_entity",
          "ulm_custom_card_nik_tablet_battery",
          "ulm_custom_bar_card_nik_tablet_card_entity"
        )
      ),
      battery_name: K(
        W(
          e,
          "battery_name",
          "ulm_custom_card_nik_tablet_battery_name",
          "ulm_custom_bar_card_nik_tablet_card_name"
        )
      ),
      type: "custom:ulm-custom-card-nik-tablet-card"
    };
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 4
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    return t ? c`
      <ha-card class="ulm-card ulm-nik-tablet">
        ${this._renderMainHeader(t)}
        <div class="gap"></div>
        <div class="row-3">
          ${this._widgetIcon(
      this._config.button1_entity,
      "mdi:usb",
      "green",
      !0
    )}
          ${this._widgetIcon(
      this._config.button2_entity,
      "mdi:motion-sensor",
      "green",
      !0
    )}
          ${this._widgetIcon(
      this._config.button3_entity,
      "mdi:monitor",
      "green",
      !0
    )}
        </div>
        <div class="gap"></div>
        <div class="row-3">
          ${this._widgetIcon(
      this._config.restart_entity,
      "mdi:restart-alert",
      "blue",
      !1,
      "press"
    )}
          ${this._widgetIcon(
      this._config.maintenance_entity,
      "mdi:account-hard-hat-outline",
      "yellow",
      !0
    )}
          ${this._widgetIcon(
      this._config.reload_entity,
      "mdi:reload",
      "blue",
      !1,
      "press"
    )}
        </div>
        <div class="row-3 metrics">
          ${this._metricWidget(this._config.par1_entity, this._config.par1_name)}
          ${this._metricWidget(this._config.par2_entity, this._config.par2_name)}
          ${this._metricWidget(this._config.par3_entity, this._config.par3_name)}
        </div>
        ${this._renderBattery()}
      </ha-card>
    ` : c`<ha-card class="ulm-card ulm-nik-tablet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
  }
  _renderMainHeader(t) {
    const e = t.state === "on", i = f(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this.hass.formatEntityState?.(t) || t.state;
    return c`
      <div class="main-header">
        <div class="icon-cell" style=${d(o)}>
          <ha-icon icon="mdi:tablet"></ha-icon>
        </div>
        <div class="main-info">
          <div class="main-name">${n}</div>
          <div class="main-label">${r}</div>
        </div>
      </div>
    `;
  }
  _widgetIcon(t, e, i, o, n = "toggle") {
    if (!t)
      return c`<div class="widget empty"></div>`;
    const r = this.hass.states[t], a = r?.state === "on", s = o ? a : !0, l = f(this, i), h = s ? {
      color: `rgba(${l}, 1)`,
      backgroundColor: `rgba(${l}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class="widget"
        style=${d(h)}
        title=${r?.state || t}
        @click=${(p) => {
      p.stopPropagation(), this._widgetAction(t, n);
    }}
      >
        <ha-icon .icon=${e}></ha-icon>
      </button>
    `;
  }
  _widgetAction(t, e) {
    if (this.hass) {
      if (e === "press") {
        this.hass.callService("button", "press", { entity_id: t });
        return;
      }
      this.hass.callService("homeassistant", "toggle", { entity_id: t });
    }
  }
  _metricWidget(t, e) {
    if (!t)
      return c`<div class="metric empty"></div>`;
    const i = this.hass.states[t], o = i?.attributes.unit_of_measurement || "", n = i ? o ? `${i.state}${o.startsWith(" ") ? o : ` ${o}`}` : i.state : "—", r = e || i?.attributes.friendly_name || t;
    return c`
      <button
        class="metric"
        @click=${() => this._moreInfo(t)}
      >
        <div class="metric-value">${n}</div>
        <div class="metric-name">${r}</div>
      </button>
    `;
  }
  _renderBattery() {
    const t = this._config.battery_entity;
    if (!t) return _;
    const e = this.hass.states[t], i = this._config.battery_name || e?.attributes.friendly_name || "Battery", o = e ? Number.parseFloat(e.state) : NaN, n = Number.isFinite(o) ? Math.max(1, Math.min(100, o)) : 0, r = ym(n), a = e?.attributes.icon || "mdi:battery", s = e ? `${Math.round(n)}%` : "—";
    return c`
      <div class="battery-block">
        <button class="battery-header" @click=${() => this._moreInfo(t)}>
          <div class="icon-cell bat-icon">
            <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="main-info">
            <div class="main-name">${s}</div>
            <div class="main-label">${i}</div>
          </div>
        </button>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-background"></div>
          <div
            class="bar-fill"
            style=${d({
      width: `${n}%`,
      backgroundColor: r
    })}
          ></div>
          <span class="bar-value">${s}</span>
        </div>
      </div>
    `;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
uo.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-nik-tablet {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 12px;
      overflow: visible;
    }

    .gap {
      height: 10px;
      flex-shrink: 0;
    }

    .main-header,
    .battery-header {
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      grid-template-areas:
        "icon name"
        "icon label";
      align-items: center;
      column-gap: 0;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      text-align: left;
      color: inherit;
      width: 100%;
      cursor: default;
    }

    .battery-header {
      cursor: pointer;
      /* Align with main header / widgets (outer card already has 12px) */
      padding: 0;
      margin-top: 0;
    }

    .icon-cell {
      grid-area: icon;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .main-info {
      display: contents;
    }

    .bat-icon {
      /* card_generic inactive numeric → theme 0.2 / 0.05 */
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .main-name {
      grid-area: name;
      align-self: end;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .main-label {
      grid-area: label;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      margin-left: 12px;
      line-height: 1.2;
      filter: opacity(40%);
    }

    .row-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
    }

    .widget {
      height: 42px;
      border: none;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }

    .widget.empty,
    .metric.empty {
      visibility: hidden;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }

    /* YAML: item3 → item4 → item5 are consecutive min-content (no 10px spacer) */
    .metrics {
      margin-top: 0;
    }

    .metric {
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      color: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .metric-value {
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
    }

    .metric-name {
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
    }

    .battery-block {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
    }

    /* Pill bar: same width as widgets, under battery header */
    .bar-track {
      position: relative;
      height: 35px;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      border-radius: 14px;
    }

    .bar-background {
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: rgba(var(--color-theme, 51, 51, 51), 0.08);
      pointer-events: none;
    }

    .bar-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: auto;
      border-radius: 14px;
      pointer-events: none;
    }

    .bar-value {
      position: relative;
      z-index: 1;
      font-weight: bold;
      font-size: 12px;
      line-height: 35px;
      pointer-events: none;
    }
  `;
Xr([
  x({ attribute: !1 })
], uo.prototype, "hass", 2);
Xr([
  y()
], uo.prototype, "_config", 2);
uo = Xr([
  $("ulm-custom-card-nik-tablet-card")
], uo);
var vm = Object.defineProperty, wm = Object.getOwnPropertyDescriptor, Qr = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? wm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && vm(e, i, n), n;
};
const xm = {
  6: "rgba(190, 0, 33, 1)",
  5: "rgba(240, 56, 26, 1)",
  4: "rgba(254, 154, 36, 1)",
  3: "rgba(254, 197, 77, 1)",
  2: "rgba(254, 228, 156, 1)",
  1: "rgba(219, 250, 200, 1)"
}, xs = {
  6: "high",
  5: "medium to high",
  4: "medium",
  3: "low to mediuml",
  2: "low",
  1: "none to low",
  0: "none"
};
function gt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ft(t) {
  return typeof t == "string" && t ? t : void 0;
}
let _o = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon"),
        m("label_6"),
        m("label_5"),
        m("label_4"),
        m("label_3"),
        m("label_2"),
        m("label_1"),
        m("label_none")
      ],
      computeLabel: k({
        entity: "Pollen sensor",
        name: "Name",
        icon: "Icon",
        label_6: "Level 6 label",
        label_5: "Level 5 label",
        label_4: "Level 4 label",
        label_3: "Level 3 label",
        label_2: "Level 2 label",
        label_1: "Level 1 label",
        label_none: "Level 0 label"
      }),
      computeHelper: C({
        name: "Legacy: ulm_custom_card_paddy_dwd_pollen_name",
        icon: "Legacy: ulm_custom_card_paddy_dwd_pollen_icon",
        label_6: "Legacy: ulm_custom_card_paddy_dwd_pollen_6",
        label_5: "Legacy: ulm_custom_card_paddy_dwd_pollen_5",
        label_4: "Legacy: ulm_custom_card_paddy_dwd_pollen_4",
        label_3: "Legacy: ulm_custom_card_paddy_dwd_pollen_3",
        label_2: "Legacy: ulm_custom_card_paddy_dwd_pollen_2",
        label_1: "Legacy: ulm_custom_card_paddy_dwd_pollen_1",
        label_none: "Legacy: ulm_custom_card_paddy_dwd_pollen_none"
      })
    };
  }
  static getStubConfig() {
    return { entity: "sensor.pollen_index" };
  }
  setConfig(t) {
    const e = t, i = ft(gt(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ft(
        gt(
          e,
          "name",
          "ulm_custom_card_paddy_dwd_pollen_name",
          "ulm_card_generic_swap_name"
        )
      ),
      icon: ft(
        gt(
          e,
          "icon",
          "ulm_custom_card_paddy_dwd_pollen_icon",
          "ulm_card_generic_swap_icon"
        )
      ),
      label_6: ft(
        gt(e, "label_6", "ulm_custom_card_paddy_dwd_pollen_6")
      ),
      label_5: ft(
        gt(e, "label_5", "ulm_custom_card_paddy_dwd_pollen_5")
      ),
      label_4: ft(
        gt(e, "label_4", "ulm_custom_card_paddy_dwd_pollen_4")
      ),
      label_3: ft(
        gt(e, "label_3", "ulm_custom_card_paddy_dwd_pollen_3")
      ),
      label_2: ft(
        gt(e, "label_2", "ulm_custom_card_paddy_dwd_pollen_2")
      ),
      label_1: ft(
        gt(e, "label_1", "ulm_custom_card_paddy_dwd_pollen_1")
      ),
      label_none: ft(
        gt(e, "label_none", "ulm_custom_card_paddy_dwd_pollen_none")
      ),
      type: "custom:ulm-custom-card-paddy-dwd-pollen-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 1
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-paddy-dwd-pollen">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this._config.icon || t.attributes.icon || "mdi:flower-pollen", n = this._pollenLabel(e), r = this._iconStyle(e);
    return c`
      <ha-card class="ulm-card ulm-paddy-dwd-pollen" @click=${this._moreInfo}>
        <div class="row">
          <button class="icon-btn" type="button" style=${d(r)}>
            <ha-icon .icon=${o}></ha-icon>
          </button>
          <button class="info-btn" type="button">
            <div class="name">${i}</div>
            <div class="label">${n}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _pollenLabel(t) {
    const e = this._config;
    return {
      6: e?.label_6,
      5: e?.label_5,
      4: e?.label_4,
      3: e?.label_3,
      2: e?.label_2,
      1: e?.label_1,
      0: e?.label_none
    }[t] ?? xs[t] ?? xs[0];
  }
  _iconStyle(t) {
    const e = xm[t];
    return e ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: e
    } : t === "0" ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  }
};
_o.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-paddy-dwd-pollen {
      height: auto !important;
      cursor: pointer;
      padding: 12px;
    }

    .row .info-btn {
      padding: 6px 0;
      margin-left: -6px;
    }
  `;
Qr([
  x({ attribute: !1 })
], _o.prototype, "hass", 2);
Qr([
  y()
], _o.prototype, "_config", 2);
_o = Qr([
  $("ulm-custom-card-paddy-dwd-pollen-card")
], _o);
var $m = Object.defineProperty, km = Object.getOwnPropertyDescriptor, ta = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? km(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && $m(e, i, n), n;
};
function Nn(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function In(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Cm(t) {
  const e = t.attributes.daysTo;
  if (e == null || e === "") return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
let mo = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        S("icon")
      ],
      computeLabel: k({
        entity: "Waste collection entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)"
      }),
      computeHelper: C({
        entity: "Entity with attributes.daysTo for collection countdown",
        name: "Primary line; defaults to friendly name",
        icon: "Defaults to entity icon"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.waste_collection",
      icon: "mdi:trash-can-outline"
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || In(Nn(e, "ulm_card_generic_swap_entity")) || void 0;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: In(Nn(e, "name", "ulm_card_generic_swap_name")),
      icon: In(Nn(e, "icon", "ulm_card_generic_swap_icon")),
      type: "custom:ulm-custom-card-paddy-waste-collection-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-paddy-waste"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Cm(t), o = t.state === "unavailable" || t.state === "unknown" || e === 0 || e === 1, n = e === 0, r = e === 1, a = f(this, "red"), s = {
      color: o ? `rgba(${a}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: n ? `rgba(${a}, 0.5)` : r ? `rgba(${a}, 0.05)` : "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, l = this._config.name || t.attributes.friendly_name || t.entity_id, h = this._stateLabel(t), p = this._config.icon || t.attributes.icon || "mdi:trash-can-outline";
    return c`
      <ha-card
        class="ulm-card ulm-paddy-waste"
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(s)}>
            <ha-icon .icon=${p}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${l}</div>
            <div class="label">${h}</div>
          </div>
        </div>
        ${o ? c`
              <span
                class="notification"
                style=${d({
      backgroundColor: `rgba(${a}, 1)`
    })}
              >
                <ha-icon icon="mdi:exclamation"></ha-icon>
              </span>
            ` : _}
      </ha-card>
    `;
  }
  _stateLabel(t) {
    if (this.hass?.formatEntityState)
      return this.hass.formatEntityState(t);
    const e = t.attributes.unit_of_measurement;
    return e ? `${t.state} ${e}` : t.state;
  }
};
mo.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-paddy-waste {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .notification {
        position: absolute;
        left: 38px;
        top: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 1;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 12px;
        width: 12px;
        height: 12px;
        color: var(--primary-background-color, #fff);
      }
    `
];
ta([
  x({ attribute: !1 })
], mo.prototype, "hass", 2);
ta([
  y()
], mo.prototype, "_config", 2);
mo = ta([
  $("ulm-custom-card-paddy-waste-collection-card")
], mo);
var Sm = Object.defineProperty, zm = Object.getOwnPropertyDescriptor, _n = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? zm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Sm(e, i, n), n;
};
const ct = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  hello: "Hello"
};
function jt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Kt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Em(t) {
  return Array.isArray(t) ? t.filter((e) => typeof e == "string" && !!e) : typeof t == "string" && t.trim() ? t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean) : [];
}
function Pm(t, e, i) {
  const o = Kt(jt(t, "variant"));
  return o === "basic" || o === "weather" || o === "news" ? o : e.length ? "news" : i ? "weather" : "basic";
}
let Ne = class extends v {
  constructor() {
    super(...arguments), this._secondaryKey = "", this._secondaryLoading = !1, this._secondaryDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        H("variant", [
          { value: "basic", label: "Greeting only" },
          { value: "weather", label: "Greeting + weather" },
          { value: "news", label: "Greeting + home feed" }
        ]),
        u("time", "sensor", !1),
        u("weather", "weather", !1),
        m("news_entities"),
        D([
          m("ulm_morning"),
          m("ulm_afternoon"),
          m("ulm_evening"),
          m("ulm_hello")
        ])
      ],
      computeLabel: k({
        variant: "Layout variant",
        time: "Time sensor (ulm_custom_card_paddy_welcome_time)",
        weather: "Weather (ulm_custom_card_paddy_welcome_weather_provider)",
        news_entities: "News entities (ulm_custom_card_paddy_welcome_news_entities)",
        ulm_morning: "Morning greeting",
        ulm_afternoon: "Afternoon greeting",
        ulm_evening: "Evening greeting",
        ulm_hello: "Night greeting"
      }),
      computeHelper: C({
        variant: "Leave on auto-detect: news list → news, weather entity → weather, else basic only.",
        time: "Sensor state compared as HH:MM (e.g. sensor.time). Falls back to local clock.",
        weather: "Embedded weather-forecast card (show_forecast: false).",
        news_entities: "Comma- or newline-separated entity ids for custom:home-feed-card.",
        ulm_morning: "From ulm_language_variables when omitted."
      })
    };
  }
  static getStubConfig() {
    return {
      variant: "basic",
      time: "sensor.time",
      ulm_morning: ct.morning,
      ulm_afternoon: ct.afternoon,
      ulm_evening: ct.evening,
      ulm_hello: ct.hello
    };
  }
  setConfig(t) {
    const e = t, i = Kt(
      jt(e, "time", "ulm_custom_card_paddy_welcome_time")
    ), o = Kt(
      jt(e, "weather", "ulm_custom_card_paddy_welcome_weather_provider")
    ), n = Em(
      jt(e, "news_entities", "ulm_custom_card_paddy_welcome_news_entities")
    ), r = Pm(e, n, o);
    this._config = {
      ...t,
      variant: r,
      time: i,
      weather: o,
      news_entities: n,
      ulm_morning: Kt(jt(e, "ulm_morning")) || ct.morning,
      ulm_afternoon: Kt(jt(e, "ulm_afternoon")) || ct.afternoon,
      ulm_evening: Kt(jt(e, "ulm_evening")) || ct.evening,
      ulm_hello: Kt(jt(e, "ulm_hello")) || ct.hello,
      type: "custom:ulm-custom-card-paddy-welcome-card"
    }, this._secondaryKey = "";
  }
  getCardSize() {
    return this._config?.variant === "basic" ? 2 : 4;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto"
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._secondaryEl ? this._syncSecondary() : this._secondaryEl && (this._secondaryEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config.variant || "basic", e = this._greetingLine();
    return c`
      <ha-card class="ulm-card ulm-paddy-welcome">
        <div class="stack">
          <div class="greeting-block">
            <div class="greeting">${e},</div>
            <div class="greeting user">${this._userName()}!</div>
          </div>
          ${t === "basic" ? _ : c`<div class="secondary-host"></div>`}
        </div>
      </ha-card>
    `;
  }
  _userName() {
    return this.hass?.user?.name?.trim() || "there";
  }
  /** YAML compares sensor.time state as HH:MM strings. */
  _timeString() {
    const t = this._config?.time;
    if (t && this.hass?.states[t])
      return String(this.hass.states[t].state);
    const e = /* @__PURE__ */ new Date(), i = String(e.getHours()).padStart(2, "0"), o = String(e.getMinutes()).padStart(2, "0");
    return `${i}:${o}`;
  }
  _greetingLine() {
    const t = this._config, e = this._timeString();
    return e > "18:00" ? t.ulm_evening || ct.evening : e > "12:00" ? t.ulm_afternoon || ct.afternoon : e > "05:00" ? t.ulm_morning || ct.morning : t.ulm_hello || ct.hello;
  }
  _buildSecondaryConfig() {
    const t = this._config;
    if (t.variant === "weather" && t.weather)
      return {
        type: "weather-forecast",
        entity: t.weather,
        show_forecast: !1
      };
    if (t.variant === "news" && t.news_entities?.length)
      return {
        type: "custom:home-feed-card",
        card_id: "main_feed",
        show_empty: !1,
        more_info_on_tap: !0,
        state_color: !1,
        compact_mode: !0,
        max_item_count: 3,
        show_icons: !0,
        entities: t.news_entities
      };
  }
  async _syncSecondary() {
    if (!(!this._config || !this.hass)) {
      if (this._config.variant === "basic") {
        this._secondaryEl = void 0, this._secondaryHost?.replaceChildren();
        return;
      }
      if (this._secondaryLoading) {
        this._secondaryDirty = !0;
        return;
      }
      this._secondaryLoading = !0, this._secondaryDirty = !1;
      try {
        await this.updateComplete;
        const t = this._secondaryHost;
        if (!t) {
          this._secondaryDirty = !0;
          return;
        }
        const e = this._buildSecondaryConfig();
        if (!e) {
          t.replaceChildren(), this._secondaryEl = void 0;
          return;
        }
        const i = JSON.stringify(e);
        if (!this._secondaryEl || i !== this._secondaryKey) {
          this._secondaryKey = i;
          const o = window;
          if (typeof o.loadCardHelpers == "function") {
            const n = await o.loadCardHelpers();
            this._secondaryEl = n.createCardElement(
              e
            );
          } else {
            const n = e.type === "weather-forecast" ? "hui-weather-forecast-card" : void 0;
            if (!n) {
              t.replaceChildren();
              return;
            }
            const r = document.createElement(n);
            r.setConfig(e), this._secondaryEl = r;
          }
          this._secondaryEl.hass = this.hass, t.replaceChildren(this._secondaryEl);
        } else
          this._secondaryEl.hass = this.hass;
      } finally {
        this._secondaryLoading = !1, this._secondaryDirty && (this._secondaryDirty = !1, this._syncSecondary());
      }
    }
  }
};
Ne.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-paddy-welcome {
        height: auto;
        cursor: default;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .greeting-block {
        border-radius: 14px;
        box-shadow: none;
        text-align: left;
        line-height: 1.15;
      }

      .greeting {
        font-size: 30px;
        font-weight: bold;
        color: var(--primary-text-color);
      }

      .secondary-host {
        min-height: 0;
      }

      .secondary-host ::slotted(*),
      .secondary-host > * {
        display: block;
      }

      .secondary-host ha-card,
      .secondary-host hui-weather-forecast-card {
        border-radius: 14px !important;
        box-shadow: none !important;
      }

      .secondary-host hui-weather-forecast-card .state,
      .secondary-host hui-weather-forecast-card .name {
        text-align: left;
        font-size: 14px;
      }

      .secondary-host hui-weather-forecast-card .state {
        font-weight: bolder;
      }

      .secondary-host hui-weather-forecast-card .temp-attribute,
      .secondary-host hui-weather-forecast-card .temp,
      .secondary-host hui-weather-forecast-card .temp span,
      .secondary-host hui-weather-forecast-card .attribute {
        text-align: right;
      }

      .secondary-host hui-weather-forecast-card .temp,
      .secondary-host hui-weather-forecast-card .temp span {
        font-size: medium;
        font-weight: bolder;
        margin-right: 16px;
      }

      .secondary-host hui-weather-forecast-card .attribute {
        font-size: smaller;
      }
    `
];
_n([
  x({ attribute: !1 })
], Ne.prototype, "hass", 2);
_n([
  y()
], Ne.prototype, "_config", 2);
_n([
  ie(".secondary-host")
], Ne.prototype, "_secondaryHost", 2);
Ne = _n([
  $("ulm-custom-card-paddy-welcome-card")
], Ne);
var Lm = Object.defineProperty, Mm = Object.getOwnPropertyDescriptor, ea = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Mm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Lm(e, i, n), n;
};
const $s = 15, ks = 30;
function lt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function $t(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Om(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Cs(t, e) {
  const i = Number(t);
  return Number.isFinite(i) ? i : e;
}
let ho = class extends v {
  constructor() {
    super(...arguments), this._moreInfoPerson = (t) => {
      t.target.closest(".battery-btn") || (t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      ));
    }, this._moreInfoBattery = (t) => {
      t.stopPropagation();
      const e = this._config?.battery_entity;
      e && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: e }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "person"),
        D([S("icon"), b("use_entity_picture")]),
        u("zone1", "zone", !1),
        u("zone2", "zone", !1),
        u("address", void 0, !1),
        u("address_locality", void 0, !1),
        u("driving_entity", void 0, !1),
        u("battery_entity", "sensor", !1),
        u("battery_state_entity", void 0, !1),
        D([
          M("battery_level_danger"),
          M("battery_level_warning")
        ])
      ],
      computeLabel: k({
        entity: "Person (ulm_card_person_entity)",
        icon: "Icon (ulm_card_person_icon)",
        use_entity_picture: "Use entity picture",
        zone1: "Zone 1 (ulm_card_person_zone1)",
        zone2: "Zone 2 (ulm_card_person_zone2)",
        address: "Address (ulm_address)",
        address_locality: "Locality (ulm_address_locality)",
        driving_entity: "Driving entity",
        battery_entity: "Battery % sensor",
        battery_state_entity: "Battery charging state",
        battery_level_danger: "Battery danger ≤ (default 15)",
        battery_level_warning: "Battery warning ≤ (default 30)"
      }),
      computeHelper: C({
        use_entity_picture: "YAML default true",
        battery_level_danger: "ulm_card_battery_battery_level_danger",
        battery_level_warning: "ulm_card_battery_battery_level_warning"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.anne_therese",
      use_entity_picture: !0,
      icon: "mdi:face-man"
    };
  }
  setConfig(t) {
    const e = t, i = $t(lt(e, "entity", "ulm_card_person_entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: $t(lt(e, "icon", "ulm_card_person_icon")) || "mdi:face-man",
      use_entity_picture: Om(
        lt(e, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        !0
      ),
      zone1: $t(lt(e, "zone1", "ulm_card_person_zone1")),
      zone2: $t(lt(e, "zone2", "ulm_card_person_zone2")),
      address: $t(lt(e, "address", "ulm_address")),
      address_locality: $t(
        lt(e, "address_locality", "ulm_address_locality")
      ),
      driving_entity: $t(
        lt(e, "driving_entity", "ulm_card_person_driving_entity")
      ),
      battery_entity: $t(
        lt(e, "battery_entity", "ulm_card_person_battery_entity")
      ),
      battery_state_entity: $t(
        lt(e, "battery_state_entity", "ulm_card_person_battery_state_entity")
      ),
      battery_level_danger: Cs(
        lt(e, "battery_level_danger", "ulm_card_battery_battery_level_danger"),
        $s
      ),
      battery_level_warning: Cs(
        lt(
          e,
          "battery_level_warning",
          "ulm_card_battery_battery_level_warning"
        ),
        ks
      ),
      type: "custom:ulm-custom-card-person-info-small-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-person-info-small"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, n = this._config.icon || "mdi:face-man", r = this._badge(t), a = this._label(t), s = this._batteryMarkup();
    return c`
      <ha-card class="ulm-card ulm-person-info-small" @click=${this._moreInfoPerson}>
        <div class="grid">
          <div class=${L({ "img-cell": !0, picture: !!o })}>
            ${o ? c`<img src=${o} alt=${e} />` : c`<ha-icon .icon=${n}></ha-icon>`}
          </div>
          <div class="battery-cell">${s}</div>
          <div class="name">${e}</div>
          <div class="label">${a}</div>
        </div>
        <span
          class="notification"
          style=${d({
      backgroundColor: r.bg
    })}
        >
          <ha-icon .icon=${r.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }
  _isDriving() {
    const t = this._config?.driving_entity;
    return !t || !this.hass ? !1 : this.hass.states[t]?.state === "on";
  }
  _badge(t) {
    const e = f(this, "blue"), i = f(this, "yellow");
    return t.state === "home" ? {
      icon: "mdi:home-variant",
      bg: `rgba(${e}, 1)`
    } : {
      icon: this._zoneIcon(t.state) || "mdi:home-minus",
      bg: `rgba(${i}, 1)`
    };
  }
  _zoneIcon(t) {
    if (!(!this.hass || !this._config))
      for (const e of [this._config.zone1, this._config.zone2]) {
        if (!e) continue;
        const i = this.hass.states[e];
        if (i && t === i.attributes.friendly_name)
          return i.attributes.icon != null ? String(i.attributes.icon) : "mdi:help-circle";
      }
  }
  _label(t) {
    if (!this.hass || !this._config) return t.state;
    const e = this._config;
    if (e.address) {
      const o = this.hass.states[e.address];
      if (o)
        return this.hass.formatEntityState?.(o) || o.state;
    }
    if (e.address_locality) {
      const o = this.hass.states[e.address_locality], n = o?.attributes?.Locality ?? o?.attributes?.locality;
      if (n != null && n !== "") return String(n);
    }
    const i = this._localizePerson(t);
    return this._isDriving() ? `Driving - ${i}` : i;
  }
  _localizePerson(t) {
    if (this.hass?.localize) {
      const e = `component.person.entity_component._.state.${t.state}`, i = this.hass.localize(e);
      if (i && i !== e) return i;
    }
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
  _batteryIcon(t, e) {
    const i = e ? "-charging" : "";
    if (t === 100) return e ? "mdi:battery-charging" : "mdi:battery";
    if (t < 10) return `mdi:battery${i}-outline`;
    const o = Math.floor(t / 10) * 10;
    return o === 100 ? e ? "mdi:battery-charging" : "mdi:battery" : `mdi:battery${i}-${o}`;
  }
  _batteryColor(t) {
    const e = this._config, i = e.battery_level_danger ?? $s, o = e.battery_level_warning ?? ks;
    return t <= i ? "var(--google-red, var(--error-color))" : t <= o ? "var(--google-yellow, #f4b400)" : "var(--google-green, #0f9d58)";
  }
  _batteryMarkup() {
    const t = this._config?.battery_entity;
    if (!t || !this.hass) return _;
    const e = this.hass.states[t];
    if (!e?.state && e?.state !== "0") return _;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return _;
    const o = this._config?.battery_state_entity, n = !!o && String(this.hass.states[o]?.state || "").toLowerCase() === "charging", r = this._batteryIcon(i, n), a = this._batteryColor(i);
    return c`
      <button
        type="button"
        class="battery-btn"
        @click=${this._moreInfoBattery}
        title="Battery"
      >
        <ha-icon
          .icon=${r}
          style=${d({ color: a })}
        ></ha-icon>
      </button>
    `;
  }
};
ho.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-person-info-small {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .grid {
        display: grid;
        grid-template-areas:
          "i battery"
          "n n"
          "l l";
        grid-template-columns: min-content 1fr;
        grid-template-rows: min-content min-content min-content;
        width: 100%;
        align-items: center;
      }

      .img-cell {
        grid-area: i;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
        display: grid;
        place-items: center;
        place-self: start;
        overflow: hidden;
      }

      .img-cell ha-icon {
        --mdc-icon-size: 20px;
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .img-cell.picture {
        padding: 0;
      }

      .img-cell img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .battery-cell {
        grid-area: battery;
        justify-self: end;
        align-self: center;
      }

      .battery-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        background: rgba(var(--primary-background-color, 255, 255, 255), 0.5);
        padding: 0;
        margin: 0;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: inherit;
      }

      .battery-btn ha-icon {
        --mdc-icon-size: 27px;
        width: 27px;
        height: 27px;
      }

      .name {
        grid-area: n;
        place-self: center;
        font-weight: bold;
        font-size: 14px;
        margin: 6% 0 0;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .label {
        grid-area: l;
        place-self: center;
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
        text-transform: capitalize;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .notification {
        position: absolute;
        top: 7%;
        left: 38px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 2;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 11px;
        width: 11px;
        height: 11px;
        color: var(--primary-background-color, #fff);
      }
    `
];
ea([
  x({ attribute: !1 })
], ho.prototype, "hass", 2);
ea([
  y()
], ho.prototype, "_config", 2);
ho = ea([
  $("ulm-custom-card-person-info-small-card")
], ho);
var Nm = Object.defineProperty, Im = Object.getOwnPropertyDescriptor, ia = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Im(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Nm(e, i, n), n;
};
function Go(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Wo(t) {
  return typeof t == "string" && t ? t : void 0;
}
function jm(t) {
  if (t.state === "unavailable") return "Indisponible";
  const e = t.attributes.brightness, i = e != null && Number.isFinite(e) ? Math.round(e / 2.55) : 0;
  let o = "Inconnue";
  return i >= 51 ? o = "Confort" : i >= 41 ? o = "Confort -1°C" : i >= 31 ? o = "Confort -2°C️" : i >= 21 ? o = "Eco️" : i >= 11 ? o = "Hors Gel️" : i >= 0 && (o = "Arrêt️"), `${o} • ${i}`;
}
let po = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      if (t.stopPropagation(), !this._config) return;
      const e = this._config.tap_entity || this._config.entity;
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: e }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "light"),
        m("name"),
        S("icon"),
        u("tap_entity", ["input_select", "select"], !1)
      ],
      computeLabel: k({
        entity: "Fil pilote light",
        name: "Name",
        icon: "Icon (default mdi:memory)",
        tap_entity: "More-info entity on tap"
      }),
      computeHelper: C({
        entity: "Light entity whose brightness encodes fil pilote consigne",
        tap_entity: "Optional. YAML default: input_select for ordres fil pilote"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "light.fil_pilote",
      icon: "mdi:memory",
      tap_entity: "input_select.ordres_fil_pilote"
    };
  }
  setConfig(t) {
    const e = t, i = Wo(Go(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Wo(Go(e, "name")),
      icon: Wo(Go(e, "icon")) || "mdi:memory",
      tap_entity: Wo(Go(e, "tap_entity", "more_info_entity")),
      type: "custom:ulm-custom-card-qubino-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-qubino"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state !== "off" && t.state !== "unavailable", i = R(this, e, "blue"), o = this._config.name || t.attributes.friendly_name || t.entity_id, n = jm(t);
    return c`
      <ha-card class="ulm-card ulm-qubino" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
po.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-qubino {
      height: auto;
      cursor: pointer;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
ia([
  x({ attribute: !1 })
], po.prototype, "hass", 2);
ia([
  y()
], po.prototype, "_config", 2);
po = ia([
  $("ulm-custom-card-qubino-card")
], po);
var Dm = Object.defineProperty, Am = Object.getOwnPropertyDescriptor, mn = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Am(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Dm(e, i, n), n;
};
const jn = "Driving";
function Z(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function It(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Dn(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Ss(t, e) {
  const i = Number(t);
  return Number.isFinite(i) ? i : e;
}
function Tm(t) {
  return Array.isArray(t) ? t.filter((e) => typeof e == "string" && !!e) : [];
}
function ic(t, e) {
  if (!e) return !1;
  const i = t.states[e]?.state;
  return i === "on" || i === "true";
}
function Um(t, e, i, o) {
  if (ic(t, o))
    return { icon: "mdi:car", color: "red" };
  const n = e.state;
  if (n === "home")
    return { icon: "mdi:home-variant", color: "green" };
  for (const r of i) {
    const a = t.states[r];
    if (a && n === a.attributes.friendly_name)
      return { icon: a.attributes.icon != null ? String(a.attributes.icon) : "mdi:help-circle", color: "yellow" };
  }
  return n === "not_home" ? { icon: "mdi:home-minus", color: "blue" } : { icon: "mdi:help-circle", color: "yellow" };
}
let Ie = class extends v {
  constructor() {
    super(...arguments), this._footerKey = "", this._footerLoading = !1, this._footerDirty = !1, this._moreInfoPerson = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    }, this._toggleFind = (t) => {
      t.stopPropagation();
      const e = this._config?.find_device_script;
      !e || !this.hass || this.hass.callService("script", "toggle", { entity_id: e });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "person"),
        D([m("name"), S("icon")]),
        D([
          b("use_entity_picture"),
          b("use_badge")
        ]),
        b("map_enable"),
        u("find_device_script", "script", !1),
        u("driving_entity", void 0, !1),
        m("driving_label"),
        m("zones"),
        u("camera_entity_light", "camera", !1),
        u("camera_entity_dark", "camera", !1),
        D([
          m("map_aspect_ratio"),
          M("map_default_zoom"),
          M("map_hours_to_show")
        ])
      ],
      computeLabel: k({
        entity: "Person entity",
        name: "Name (ulm_custom_card_ristou_name)",
        icon: "Find-device icon (ulm_custom_card_ristou_icon)",
        use_entity_picture: "Use entity picture",
        use_badge: "Status badge on avatar",
        map_enable: "Show map row (ulm_custom_card_ristou_map_enable)",
        find_device_script: "Find device script",
        driving_entity: "Driving binary_sensor",
        driving_label: "Driving label (languages/en.yaml)",
        zones: "Zone entity ids (comma-separated)",
        camera_entity_light: "Static map camera (light theme)",
        camera_entity_dark: "Static map camera (dark theme)",
        map_aspect_ratio: "Map aspect ratio",
        map_default_zoom: "Map default zoom",
        map_hours_to_show: "Map hours to show"
      }),
      computeHelper: C({
        use_badge: "When off, status icon/color replaces the person avatar icon.",
        zones: "ulm_custom_card_ristou_zones — also passed to map entities.",
        camera_entity_light: "Second row when map disabled and both cameras configured."
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "person.anne_therese",
      use_entity_picture: !1,
      use_badge: !0,
      map_enable: !1,
      driving_label: jn,
      map_aspect_ratio: "466:200",
      map_default_zoom: 11,
      map_hours_to_show: 0
    };
  }
  setConfig(t) {
    const e = t, i = t.entity;
    if (!i) throw new Error("Please define an entity");
    const o = Z(e, "zones", "ulm_custom_card_ristou_zones");
    let n = Tm(o);
    !n.length && typeof o == "string" && o.trim() && (n = o.split(/[\n,]/).map((r) => r.trim()).filter(Boolean)), this._config = {
      ...t,
      entity: i,
      name: It(Z(e, "name", "ulm_custom_card_ristou_name")),
      icon: It(Z(e, "icon", "ulm_custom_card_ristou_icon")),
      use_entity_picture: Dn(
        Z(e, "use_entity_picture", "ulm_custom_card_ristou_use_entity_picture"),
        !1
      ),
      use_badge: Dn(
        Z(e, "use_badge", "ulm_custom_card_ristou_use_badge"),
        !0
      ),
      map_enable: Dn(
        Z(e, "map_enable", "ulm_custom_card_ristou_map_enable"),
        !1
      ),
      find_device_script: It(
        Z(e, "find_device_script", "ulm_custom_card_ristou_find_device_script")
      ),
      zones: n,
      driving_entity: It(
        Z(
          e,
          "driving_entity",
          "ulm_custom_card_ristou_person_driving_entity"
        )
      ),
      driving_label: It(
        Z(
          e,
          "driving_label",
          "ulm_custom_card_ristou_person_driving"
        )
      ) || jn,
      map_aspect_ratio: It(
        Z(e, "map_aspect_ratio", "ulm_custom_card_ristou_map_aspect_ratio")
      ) || "466:200",
      map_default_zoom: Ss(
        Z(e, "map_default_zoom", "ulm_custom_card_ristou_map_default_zoom"),
        11
      ),
      map_hours_to_show: Ss(
        Z(e, "map_hours_to_show", "ulm_custom_card_ristou_map_hours_to_show"),
        0
      ),
      camera_entity_light: It(
        Z(
          e,
          "camera_entity_light",
          "ulm_custom_card_ristou_camera_entity_light"
        )
      ),
      camera_entity_dark: It(
        Z(
          e,
          "camera_entity_dark",
          "ulm_custom_card_ristou_camera_entity_dark"
        )
      ),
      type: "custom:ulm-custom-card-ristou-person-card"
    }, this._footerKey = "";
  }
  getCardSize() {
    return this._config && this._showFooter() ? 5 : 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto"
    };
  }
  updated(t) {
    !this._config || !this.hass || (t.has("_config") || t.has("hass") || !this._footerEl ? this._syncFooter() : this._footerEl && (this._footerEl.hass = this.hass));
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-ristou-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._showFooter();
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-ristou-person": !0,
      "has-footer": e
    })}
      >
        ${this._headerRow(t)}
        ${e ? c`<div class="footer-host"></div>` : _}
      </ha-card>
    `;
  }
  _showFooter() {
    const t = this._config;
    return t.map_enable ? !!t.zones?.length || !0 : !!(t.camera_entity_light && t.camera_entity_dark);
  }
  _headerRow(t) {
    const e = this._config, i = Um(
      this.hass,
      t,
      e.zones || [],
      e.driving_entity
    ), o = e.use_badge !== !1, n = o ? "mdi:face-man" : i.icon, r = o ? "theme" : i.color, a = e.name || t.attributes.friendly_name || t.entity_id, s = this._label(t), l = e.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, h = this._rgb(r), p = {
      color: r === "theme" ? "rgba(var(--color-theme, 51, 51, 51), 0.9)" : `rgba(${h}, 0.9)`,
      backgroundColor: l ? "transparent" : r === "theme" ? "rgba(var(--color-theme, 51, 51, 51), 0.05)" : `rgba(${h}, 0.2)`
    }, g = this._rgb(i.color), z = e.find_device_script, P = e.icon || (z && this.hass.states[z]?.attributes.icon ? String(this.hass.states[z].attributes.icon) : "mdi:cellphone-wireless");
    return c`
      <div class="header-row">
        <button
          type="button"
          class=${L({
      "avatar-btn": !0,
      picture: !!l
    })}
          style=${d(p)}
          @click=${this._moreInfoPerson}
        >
          ${l ? c`<img src=${l} alt=${a} />` : c`<ha-icon .icon=${n}></ha-icon>`}
          ${o ? c`
                <span
                  class="notification"
                  style=${d({
      backgroundColor: `rgba(${g}, 1)`
    })}
                >
                  <ha-icon .icon=${i.icon}></ha-icon>
                </span>
              ` : _}
        </button>

        <button
          type="button"
          class="info-btn"
          @click=${this._moreInfoPerson}
        >
          <div class="name">${a}</div>
          <div class="label">${s}</div>
        </button>

        ${z ? c`
              <button
                type="button"
                class="find-btn"
                @click=${this._toggleFind}
                title="Find device"
              >
                <ha-icon .icon=${P}></ha-icon>
              </button>
            ` : c`<span class="find-spacer"></span>`}
      </div>
    `;
  }
  _label(t) {
    const e = this._config;
    if (ic(this.hass, e.driving_entity))
      return e.driving_label || jn;
    const i = t.state;
    if (["home", "not_home", "unavailable", "unknown"].includes(i) && this.hass?.localize) {
      const n = `component.person.entity_component._.state.${i}`, r = this.hass.localize(n);
      if (r && r !== n) return r;
    }
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : i;
  }
  _rgb(t) {
    return t === "theme" ? f(this, "blue") : f(this, t);
  }
  _footerCameraEntity() {
    const t = this._config;
    return t.map_enable ? void 0 : !!this.hass?.themes?.darkMode ? t.camera_entity_dark : t.camera_entity_light;
  }
  _buildFooterConfig() {
    const t = this._config;
    if (t.map_enable)
      return {
        type: "map",
        default_zoom: t.map_default_zoom ?? 11,
        aspect_ratio: t.map_aspect_ratio || "466:200",
        hours_to_show: t.map_hours_to_show ?? 0,
        entities: t.zones || [t.entity]
      };
    const e = this._footerCameraEntity();
    if (e)
      return {
        type: "picture-entity",
        entity: e,
        show_state: !1,
        show_name: !1,
        camera_view: "auto"
      };
  }
  async _syncFooter() {
    if (!(!this._config || !this.hass)) {
      if (!this._showFooter()) {
        this._footerHost?.replaceChildren(), this._footerEl = void 0;
        return;
      }
      if (this._footerLoading) {
        this._footerDirty = !0;
        return;
      }
      this._footerLoading = !0, this._footerDirty = !1;
      try {
        await this.updateComplete;
        const t = this._footerHost;
        if (!t) {
          this._footerDirty = !0;
          return;
        }
        const e = this._buildFooterConfig();
        if (!e) {
          t.replaceChildren();
          return;
        }
        const i = JSON.stringify(e);
        if (!this._footerEl || i !== this._footerKey) {
          this._footerKey = i;
          const o = window;
          if (typeof o.loadCardHelpers == "function") {
            const n = await o.loadCardHelpers();
            this._footerEl = n.createCardElement(
              e
            );
          } else {
            const n = e.type === "map" ? "hui-map-card" : "hui-picture-entity-card", r = document.createElement(n);
            r.setConfig(e), this._footerEl = r;
          }
          this._footerEl.hass = this.hass, t.replaceChildren(this._footerEl);
        } else
          this._footerEl.hass = this.hass;
      } finally {
        this._footerLoading = !1, this._footerDirty && (this._footerDirty = !1, this._syncFooter());
      }
    }
  }
};
Ie.styles = [
  E,
  w`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-ristou-person {
        padding: 0;
        height: auto;
        overflow: hidden;
      }

      ha-card.ulm-ristou-person.has-footer .header-row {
        border-radius: var(--border-radius, var(--ulm-radius, 20px))
          var(--border-radius, var(--ulm-radius, 20px)) 0 0;
      }

      .header-row {
        display: grid;
        grid-template-columns: min-content 1fr auto;
        grid-template-rows: min-content;
        align-items: center;
        padding: 12px 12px 12px 0;
        gap: 0;
      }

      .avatar-btn {
        position: relative;
        width: 42px;
        height: 42px;
        border: 0;
        border-radius: 50%;
        margin-left: 12px;
        padding: 0;
        display: grid;
        place-items: center;
        cursor: pointer;
        overflow: visible;
      }

      .avatar-btn.picture {
        overflow: hidden;
      }

      .avatar-btn img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .avatar-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .notification {
        position: absolute;
        left: 38px;
        top: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 10px;
        color: var(--primary-background-color, #fff);
      }

      .info-btn {
        border: 0;
        background: transparent;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        color: inherit;
        font: inherit;
        min-width: 0;
      }

      .find-btn,
      .find-spacer {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
      }

      .find-btn {
        border: 0;
        border-radius: var(--border-radius, 20px);
        background: rgba(var(--color-blue, 61, 90, 254), 0.2);
        display: grid;
        place-items: center;
        cursor: pointer;
        margin-right: 12px;
        color: rgba(var(--color-blue, 61, 90, 254), 1);
      }

      .find-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .footer-host {
        min-height: 0;
      }

      .footer-host ha-card {
        box-shadow: none !important;
        border-radius: 0 0 var(--border-radius, 20px) var(--border-radius, 20px);
      }
    `
];
mn([
  x({ attribute: !1 })
], Ie.prototype, "hass", 2);
mn([
  y()
], Ie.prototype, "_config", 2);
mn([
  ie(".footer-host")
], Ie.prototype, "_footerHost", 2);
Ie = mn([
  $("ulm-custom-card-ristou-person-card")
], Ie);
var Fm = Object.defineProperty, Bm = Object.getOwnPropertyDescriptor, oa = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Bm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Fm(e, i, n), n;
};
const Hm = [
  {
    key: "moisture",
    icon: "mdi:water-percent",
    minKey: "min_moisture",
    maxKey: "max_moisture",
    defaultMin: 20,
    defaultMax: 60
  },
  {
    key: "conductivity",
    icon: "mdi:flash",
    minKey: "min_conductivity",
    maxKey: "max_conductivity",
    defaultMin: 500,
    defaultMax: 3e3
  },
  {
    key: "brightness",
    icon: "mdi:brightness-6",
    minKey: "min_brightness",
    maxKey: "max_brightness",
    defaultMin: 500,
    defaultMax: 3e4,
    logScale: !0
  },
  {
    key: "temperature",
    icon: "mdi:thermometer",
    minKey: "min_temperature",
    maxKey: "max_temperature",
    defaultMin: 15,
    defaultMax: 30
  },
  {
    key: "humidity",
    icon: "mdi:water",
    minKey: "min_humidity",
    maxKey: "max_humidity",
    defaultMin: 30,
    defaultMax: 80
  }
];
function An(t, e) {
  const i = t[e];
  if (i == null || i === "") return;
  const o = Number.parseFloat(String(i));
  return Number.isFinite(o) ? o : void 0;
}
function he(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Qe(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Rm(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let go = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["plant", "binary_sensor"]),
        m("name"),
        m("species"),
        b("show_bars"),
        m("label_problem"),
        m("label_correct")
      ],
      computeLabel: k({
        entity: "Plant entity (ulm_card_flower_entity)",
        name: "Name (ulm_card_flower_name)",
        species: "Species (ulm_card_flower_species)",
        show_bars: "Show attribute bars (ulm_card_flower_show_bars)",
        label_problem: "Problem label (ulm_custom_card_schumijo_flower_problem)",
        label_correct: "OK label (ulm_custom_card_schumijo_flower_correct)"
      }),
      computeHelper: C({
        entity: "Tap header for more-info",
        show_bars: "When off, icons only (flower-card hides values in YAML)",
        species: "Original flower-card species string — cosmetic in this port"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "plant.monstera",
      name: "Monstera",
      species: "monstera",
      show_bars: !0,
      label_problem: "Problem",
      label_correct: "Correct"
    };
  }
  setConfig(t) {
    const e = t, i = Qe(he(e, "entity", "ulm_card_flower_entity"));
    if (!i) throw new Error("Please define a plant entity");
    this._config = {
      ...t,
      entity: i,
      name: Qe(he(e, "name", "ulm_card_flower_name")),
      species: Qe(he(e, "species", "ulm_card_flower_species")),
      show_bars: Rm(he(e, "show_bars", "ulm_card_flower_show_bars"), !0),
      label_problem: Qe(
        he(e, "label_problem", "ulm_custom_card_schumijo_flower_problem")
      ) || "Problem",
      label_correct: Qe(
        he(e, "label_correct", "ulm_custom_card_schumijo_flower_correct")
      ) || "Correct",
      type: "custom:ulm-custom-card-schumijo-flower-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-schumijo-flower"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "problem", i = t.state !== "on" && t.state !== "problem", o = f(this, "green"), n = e ? "mdi:alert-circle" : "mdi:flower", r = i ? {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = e ? this._config.label_problem : this._config.label_correct, s = this._config.name || t.attributes.friendly_name || t.entity_id;
    return c`
      <ha-card class="ulm-card ulm-schumijo-flower">
        <button class="header" @click=${() => this._moreInfo(this._config.entity)}>
          <div class="icon-cell" style=${d(r)}>
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info">
            <div class="flower-name">${s}</div>
            <div class="flower-label">${a}</div>
          </div>
        </button>
        <div class="attrs">${this._renderAttributes(t)}</div>
      </ha-card>
    `;
  }
  _renderAttributes(t) {
    const e = this._config.show_bars !== !1, i = t.attributes, o = Hm.filter(
      (n) => i[n.key] !== void 0 && i[n.key] !== null
    );
    return o.length ? o.map((n) => {
      const r = An(i, n.key), a = r !== void 0, s = An(i, n.minKey) ?? n.defaultMin, l = An(i, n.maxKey) ?? n.defaultMax, h = l - s;
      let p = 0;
      a && h > 0 && (n.logScale && r > 0 && s > 0 ? p = 100 * Math.max(
        0,
        Math.min(
          1,
          (Math.log(r) - Math.log(s)) / (Math.log(l) - Math.log(s))
        )
      ) : p = 100 * Math.max(0, Math.min(1, (r - s) / h)));
      const g = a && (r < s || r > l), z = a ? g ? "bad" : "good" : "unavailable", P = a ? a && r > l ? "bad" : "good" : "unavailable", O = a && r > l ? 100 : 0, T = a ? `${n.key}: ${r} (${s} ~ ${l})` : `${n.key}: unavailable`;
      return c`
        <div class="attr" title=${T}>
          <ha-icon .icon=${n.icon}></ha-icon>
          ${e ? c`
                <div class="meter red">
                  <span
                    class=${z}
                    style=${d({ width: "100%" })}
                  ></span>
                </div>
                <div class="meter green">
                  <span
                    class=${P}
                    style=${d({
        width: a ? `${p}%` : "0%"
      })}
                  ></span>
                </div>
                <div class="meter red">
                  <span
                    class="bad"
                    style=${d({ width: `${O}%` })}
                  ></span>
                </div>
              ` : _}
        </div>
      `;
    }) : c`<div class="attrs-empty">No plant attributes on entity</div>`;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
go.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-schumijo-flower {
      border-radius: 20px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow: visible;
    }

    .header {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      gap: 12px;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: left;
      color: inherit;
      width: 100%;
    }

    .icon-cell {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .flower-name {
      font-weight: bold;
      font-size: 14px;
    }

    .flower-label {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
    }

    /* flower-card .attributes — padding 0 via YAML card_mod */
    .attrs {
      display: flex;
      flex-wrap: wrap;
      white-space: nowrap;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
      row-gap: 6px;
    }

    .attrs-empty {
      font-size: 12px;
      opacity: 0.5;
      text-align: center;
      width: 100%;
    }

    /* flower-card .attribute — 50% width, icon + 3 meters */
    .attr {
      display: flex;
      align-items: center;
      width: 50%;
      box-sizing: border-box;
      white-space: nowrap;
      min-width: 0;
      padding-right: 4px;
    }

    .attr ha-icon {
      --mdc-icon-size: 16px;
      margin-left: 5px;
      margin-right: 10px;
      flex-shrink: 0;
      color: rgba(var(--color-theme, 51, 51, 51), 0.85);
    }

    /* Three equal-width meter segments */
    .meter {
      height: 8px;
      background-color: var(
        --primary-background-color,
        rgba(var(--color-theme, 51, 51, 51), 0.12)
      );
      border-radius: 2px;
      display: inline-grid;
      overflow: hidden;
      flex: 1 1 0;
      min-width: 0;
      margin-right: 4px;
    }

    .meter:last-of-type {
      margin-right: 0;
    }

    .meter.red,
    .meter.green {
      max-width: none;
    }

    .meter > span {
      grid-row: 1;
      grid-column: 1;
      height: 100%;
      display: block;
    }

    .meter > .good {
      background-color: rgba(43, 194, 83, 1);
    }

    .meter > .bad {
      background-color: rgba(240, 163, 163, 1);
    }

    .meter > .unavailable {
      background-color: rgba(158, 158, 158, 1);
    }
  `;
oa([
  x({ attribute: !1 })
], go.prototype, "hass", 2);
oa([
  y()
], go.prototype, "_config", 2);
go = oa([
  $("ulm-custom-card-schumijo-flower-card")
], go);
var Gm = Object.defineProperty, Wm = Object.getOwnPropertyDescriptor, na = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Wm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Gm(e, i, n), n;
};
const Tn = {
  en: {
    open: "Open",
    tilted: "Tilted",
    closed: "Closed",
    locked: "Locked",
    manipulated: "Manipulated",
    unavailable: "Unavailable",
    unknown: "Unknown"
  },
  de: {
    open: "Offen",
    tilted: "Gekippt",
    closed: "Geschlossen",
    locked: "Verschlossen",
    manipulated: "Manipuliert",
    unavailable: "Nicht verfügbar",
    unknown: "Unbekannt"
  }
};
function bt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ti(t) {
  return typeof t == "string" && t ? t : void 0;
}
function zs(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Es(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
let fo = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", "binary_sensor"),
        u("handle", ["sensor", "binary_sensor"]),
        D([m("name"), S("icon")]),
        A("color"),
        b("force_background_color"),
        b("show_last_changed"),
        u("battery_level", "sensor", !1),
        D([
          M("battery_warning"),
          M("battery_warning_low")
        ])
      ],
      computeLabel: k({
        entity: "Contact sensor",
        handle: "Handle sensor (Closed / Tilted / Open)",
        name: "Name (ulm_custom_card_senoro_win_name)",
        icon: "Icon (ulm_custom_card_senoro_win_icon)",
        color: "Accent color (ulm_custom_card_senoro_win_color)",
        force_background_color: "Force colored background (ulm_custom_card_senoro_win_force_background_color)",
        show_last_changed: "Show last changed (ulm_show_last_changed)",
        battery_level: "Battery % (ulm_custom_card_senoro_win_battery_level)",
        battery_warning: "Battery warning %",
        battery_warning_low: "Battery critical %"
      }),
      computeHelper: C({
        entity: "Legacy: ulm_custom_card_senoro_win_entity defaults to card entity",
        handle: "Legacy: ulm_custom_card_senoro_win_handle",
        battery_level: "Corner badge when level ≤ battery warning"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "binary_sensor.window_contact",
      handle: "sensor.window_handle",
      color: "blue",
      force_background_color: !1,
      battery_warning: 20,
      battery_warning_low: 5,
      show_last_changed: !1
    };
  }
  setConfig(t) {
    const e = t, i = ti(bt(e, "entity", "ulm_custom_card_senoro_win_entity")) || "", o = ti(bt(e, "handle", "ulm_custom_card_senoro_win_handle")) || "";
    if (!i) throw new Error("Please define an entity");
    if (!o) throw new Error("Please define a handle entity");
    this._config = {
      ...t,
      entity: i,
      handle: o,
      name: ti(bt(e, "name", "ulm_custom_card_senoro_win_name")),
      icon: ti(bt(e, "icon", "ulm_custom_card_senoro_win_icon")),
      color: bt(e, "color", "ulm_custom_card_senoro_win_color") || "blue",
      force_background_color: zs(
        bt(
          e,
          "force_background_color",
          "ulm_custom_card_senoro_win_force_background_color"
        ),
        !1
      ),
      battery_level: ti(
        bt(e, "battery_level", "ulm_custom_card_senoro_win_battery_level")
      ),
      battery_warning: Es(
        bt(
          e,
          "battery_warning",
          "ulm_custom_card_senoro_win_battery_warning"
        ),
        20
      ),
      battery_warning_low: Es(
        bt(
          e,
          "battery_warning_low",
          "ulm_custom_card_senoro_win_battery_warning_low"
        ),
        5
      ),
      show_last_changed: zs(
        bt(e, "show_last_changed", "ulm_show_last_changed"),
        !1
      ),
      type: "custom:ulm-custom-card-senoro-win-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity], e = this.hass.states[this._config.handle];
    if (!t)
      return c`<ha-card class="ulm-card ulm-senoro-win"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    const i = t.state, o = e?.state ?? "unavailable", n = i === "on", r = this._config.color || "blue", a = this._iconStyle(n, o, r), s = this._cardBackground(n, o, r), l = this._config.name || t.attributes.friendly_name || t.entity_id, h = this._config.icon || t.attributes.icon || "mdi:window-closed-variant", p = this._label(t, i, o), g = this._notification(i, o), z = this._batteryBadge();
    return c`
      <ha-card
        class=${L({ "ulm-card": !0, "ulm-senoro-win": !0 })}
        style=${d(s ? { backgroundColor: s } : {})}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(a)}>
            <ha-icon .icon=${h}></ha-icon>
            ${g ? c`<span
                  class="badge notify"
                  style=${d({
      backgroundColor: g.bg
    })}
                >
                  <ha-icon .icon=${g.icon}></ha-icon>
                </span>` : _}
            ${z ? c`<span
                  class="badge battery"
                  style=${d({ backgroundColor: z.bg })}
                >
                  <ha-icon icon="mdi:battery-low"></ha-icon>
                </span>` : _}
          </div>
          <div class="info-btn">
            <div class="name">${l}</div>
            <div class="label">${p}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return Tn[t] || Tn[e] || Tn.en;
  }
  _iconStyle(t, e, i) {
    if (!t)
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    const o = e === "Closed" ? f(this, "red") : f(this, i);
    return {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    };
  }
  _cardBackground(t, e, i) {
    if (!this._config?.force_background_color || !t) return;
    const n = getComputedStyle(this).getPropertyValue("--opacity-bg").trim() || "1";
    if (e === "Tilted" || e === "Open")
      return `rgba(${f(this, i)}, ${n})`;
    if (e === "Closed")
      return `rgba(${f(this, "red")}, ${n})`;
  }
  _label(t, e, i) {
    if (this._config?.show_last_changed && t.last_changed)
      return this._relativeTime(t.last_changed);
    const o = this._lang();
    return e === "unavailable" || i === "unavailable" ? o.unavailable : e === "off" && i === "Closed" ? o.locked : e === "off" && (i === "Tilted" || i === "Open") ? o.closed : e === "on" && i === "Tilted" ? o.tilted : e === "on" && i === "Open" ? o.open : e === "on" && i === "Closed" ? o.manipulated : o.unknown;
  }
  _notification(t, e) {
    let i;
    if (e === "Tilted" || e === "Open" ? i = "mdi:lock-open-variant" : t === "off" && e === "Closed" ? i = "mdi:lock" : t === "on" && e === "Closed" && (i = "mdi:alert"), !i) return null;
    const o = f(this, "green"), n = f(this, "red"), r = t === "off" && e === "Closed" ? `rgba(${o}, 1)` : `rgba(${n}, 1)`;
    return { icon: i, bg: r };
  }
  _batteryBadge() {
    const t = this._config, e = t.battery_level;
    if (!e || !this.hass) return null;
    const i = this.hass.states[e];
    if (!i) return null;
    const o = Number.parseFloat(i.state);
    if (!Number.isFinite(o)) return null;
    const n = t.battery_warning ?? 20, r = t.battery_warning_low ?? 5;
    if (o > n) return null;
    const a = f(this, "red"), s = f(this, "yellow");
    return { bg: o <= r ? `rgba(${a}, 1)` : `rgba(${s}, 1)` };
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const n = Math.round(o / 60);
    return n < 48 ? `${n}h` : `${Math.round(n / 24)}d`;
  }
};
fo.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-senoro-win {
      position: relative;
      height: auto;
      overflow: visible;
      cursor: pointer;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }

    .icon-btn {
      overflow: visible;
    }

    .badge {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .badge.notify {
      left: 28px;
      top: -6px;
    }

    .badge.battery {
      left: -6px;
      top: -6px;
    }

    .badge ha-icon {
      --mdc-icon-size: 12px;
      width: 12px;
      height: 12px;
      color: var(--primary-background-color, #fff);
    }
  `;
na([
  x({ attribute: !1 })
], fo.prototype, "hass", 2);
na([
  y()
], fo.prototype, "_config", 2);
fo = na([
  $("ulm-custom-card-senoro-win-card")
], fo);
var Km = Object.defineProperty, Vm = Object.getOwnPropertyDescriptor, ra = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Vm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Km(e, i, n), n;
};
function Ko(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Vo(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ps(t) {
  const e = new Option().style;
  return e.color = t, e.color !== "";
}
function qm(t) {
  if (!(!Array.isArray(t) || t.length === 0))
    return t;
}
let bo = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("entity"),
        m("name"),
        m("ulm_idle"),
        m("ulm_translation_unavailable")
      ],
      computeLabel: k({
        entity: "Printer status entity",
        name: "Printer name override",
        ulm_idle: "Idle state label (ulm_idle)",
        ulm_translation_unavailable: "Unavailable label"
      }),
      computeHelper: C({
        entity: "Header turns blue when state ≠ idle and not unavailable",
        name: "Defaults to entity friendly_name",
        ulm_idle: 'Default "idle" — compared case-insensitively',
        ulm_translation_unavailable: 'Default "unavailable". Configure cartridges array in YAML (see original card).'
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "sensor.demo_printer",
      name: "Demo Printer",
      ulm_idle: "idle",
      ulm_translation_unavailable: "unavailable",
      cartridges: [
        {
          label: "Black",
          type: "unicolor",
          color: "#000000",
          entity_id: "sensor.demo_printer_black_toner"
        },
        {
          label: "Color",
          type: "tricolor",
          color: ["#00FFFF", "#FF00FF", "#FFFF00"],
          entity_id: "sensor.demo_printer_color_toner"
        }
      ]
    };
  }
  setConfig(t) {
    const e = t, i = Vo(t.entity);
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Vo(Ko(e, "name")),
      cartridges: qm(Ko(e, "cartridges")),
      ulm_idle: Vo(Ko(e, "ulm_idle")) || "idle",
      ulm_translation_unavailable: Vo(Ko(e, "ulm_translation_unavailable")) || "unavailable",
      type: "custom:ulm-custom-card-sisimomo-printer-card"
    };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-sisimomo-printer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = (this._config.ulm_idle || "idle").toLowerCase(), i = (this._config.ulm_translation_unavailable || "unavailable").toLowerCase(), o = t.state.toLowerCase(), n = o !== e && o !== i, r = this._buildCartridges();
    return c`
      <ha-card
        class=${L({
      "ulm-card": !0,
      "ulm-sisimomo-printer": !0,
      active: n
    })}
      >
        ${this._renderHeader(t, n)}
        <div class="cartridges">${this._renderCartridgeBlock(r)}</div>
      </ha-card>
    `;
  }
  _renderHeader(t, e) {
    const i = f(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, n = this._config.name || t.attributes.friendly_name || t.entity_id, r = this.hass.formatEntityState?.(t) || t.state, a = t.attributes.icon || "mdi:printer";
    return c`
      <button
        class="header"
        @click=${() => this._moreInfo(this._config.entity)}
      >
        <div class="icon-cell" style=${d(o)}>
          <ha-icon .icon=${a}></ha-icon>
        </div>
        <div class="info">
          <div class="printer-name">${n}</div>
          <div class="printer-state">${r}</div>
        </div>
      </button>
    `;
  }
  _buildCartridges() {
    const t = this._config.cartridges;
    if (!t?.length) return;
    const e = (this._config.ulm_translation_unavailable || "unavailable").toLowerCase(), i = ["unicolor", "tricolor"], o = [];
    let n = !0;
    return t.forEach((a, s) => {
      const l = a.type ?? "unicolor";
      if (a.label === void 0 && o.push(`cartridges.[${s}].label: You must provide a value.`), i.includes(l) || o.push(
        `cartridges.[${s}].type: You must provide a valid cartridge type`
      ), a.color !== void 0 ? l === "unicolor" ? (typeof a.color != "string" || !Ps(a.color)) && o.push(
        `cartridges.[${s}].color: You must provide a single valid CSS color value.`
      ) : Array.isArray(a.color) && a.color.length === 3 ? a.color.forEach((h, p) => {
        Ps(String(h)) || o.push(
          `cartridges.[${s}].color.[${p}]: You must provide a single valid CSS color value.`
        );
      }) : o.push(
        `cartridges.[${s}].color: Invalid combination of colour and type.`
      ) : o.push(`cartridges.[${s}].color: You must provide a value.`), a.entity_id === void 0)
        o.push(
          `cartridges.[${s}].entity_id: You must provide a value.`
        );
      else {
        const h = this.hass.states[a.entity_id];
        if (!h)
          o.push(
            `cartridges.[${s}].entity_id: You must provide a existing entity_id.`
          );
        else if (String(h.state).toLowerCase() === e)
          n = !1;
        else {
          const p = Number(h.state);
          (Number.isNaN(p) || typeof h.state == "boolean" || p < 0 || p > 100) && o.push(
            `cartridges.[${s}].entity_id: You must provide a entity representing an integer between 0 and 100 inclusively.`
          );
        }
      }
    }), o.length ? { kind: "errors", messages: o } : n ? { kind: "bars", rows: t.map((a) => {
      const s = a.type ?? "unicolor", l = this.hass.states[a.entity_id], h = Number(l.state);
      let p;
      if (s === "unicolor")
        p = {
          width: `${h}%`,
          backgroundColor: a.color
        };
      else {
        const [g, z, P] = a.color;
        p = {
          width: `${h}%`,
          background: `linear-gradient(180deg, ${g}, ${g} 33%, ${z} 33%, ${z} 66%, ${P} 66%, ${P})`
        };
      }
      return {
        label: a.label,
        pct: h,
        barStyle: p
      };
    }) } : { kind: "unavailable" };
  }
  _renderCartridgeBlock(t) {
    return t ? t.kind === "errors" ? c`
        <div class="error-container">
          <b>Configuration Error:</b>
          <ul>
            ${t.messages.map((e) => c`<li>${e}</li>`)}
          </ul>
        </div>
      ` : t.kind === "unavailable" ? c`<div class="info-unavailable">Toner Information Unavailable</div>` : c`
      <div class="wrapper">
        ${t.rows.flatMap((e) => [
      c`<div class="label">${e.label}</div>`,
      c`<div class="container-bar">
            <div class="bar" style=${d(e.barStyle)}></div>
          </div>`,
      c`<div class="state">${e.pct}%</div>`
    ])}
      </div>
    ` : _;
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
bo.styles = w`
    ${E}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
      cursor: default;
    }

    ha-card.ulm-sisimomo-printer {
      padding: 12px;
      display: flex;
      flex-direction: column;
      /* YAML: printer_state then cartridges — no extra card row-gap */
      gap: 0;
      overflow: visible;
    }

    .header {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      column-gap: 0;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: left;
      color: inherit;
      width: 100%;
    }

    .header .icon-cell {
      margin: 0;
    }

    .header .info {
      margin-left: 12px;
      min-width: 0;
    }

    .icon-cell {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .printer-name {
      font-weight: bold;
      font-size: 14px;
    }

    .printer-state {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      text-transform: capitalize;
    }

    ha-card.active .printer-state {
      filter: none;
      color: rgba(var(--color-blue-text, var(--color-blue, 61, 90, 254)), 1);
    }

    /* card_mod cartridges wrapper — 12px top separates bars from header */
    .wrapper {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
      padding: 12px 8px 8px;
      align-items: center;
      box-sizing: border-box;
    }

    .wrapper > *:nth-child(3n-2),
    .wrapper > *:nth-child(3n) {
      place-self: center start;
    }

    .wrapper > .container-bar {
      place-self: center stretch;
      width: 100%;
      min-width: 0;
      align-self: center;
    }

    .label {
      filter: opacity(70%);
      font-size: medium;
      line-height: 20px;
      white-space: nowrap;
    }

    .container-bar {
      position: relative;
      border-radius: 4px;
      border: 0.01rem solid rgba(var(--color-theme, 51, 51, 51), 0.35);
      box-sizing: border-box;
      overflow: hidden;
      height: 20px;
      background: transparent;
    }

    .bar {
      height: 20px;
      border-radius: 4px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .state {
      filter: opacity(40%);
      font-size: medium;
      line-height: 20px;
      white-space: nowrap;
      text-align: left;
    }

    .error-container {
      text-align: left;
      font-size: 75%;
      font-family: var(--code-font-family, monospace);
      padding: 10px;
      background-color: rgba(219, 68, 55, 0.75);
      margin-top: 10px;
      border-radius: 8px;
    }

    .error-container ul {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-wrap: break-word;
    }

    .error-container li {
      margin-top: 0.5em;
    }

    .info-unavailable {
      padding: 1em;
      margin-top: 10px;
      border-radius: 8px;
      opacity: 60%;
    }
  `;
ra([
  x({ attribute: !1 })
], bo.prototype, "hass", 2);
ra([
  y()
], bo.prototype, "_config", 2);
bo = ra([
  $("ulm-custom-card-sisimomo-printer-card")
], bo);
var Ym = Object.defineProperty, Jm = Object.getOwnPropertyDescriptor, aa = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Jm(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Ym(e, i, n), n;
};
function pe(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ei(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Zm(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Xm(t) {
  return t === "not_home" || t === "off";
}
let yo = class extends v {
  constructor() {
    super(...arguments), this._moreInfo = (t) => {
      t.stopPropagation(), this._config && this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: this._config.entity }
        })
      );
    };
  }
  static getConfigForm() {
    return {
      schema: [
        u("entity", ["device_tracker", "person"]),
        m("name"),
        S("icon"),
        b("status_as_name"),
        m("color_online"),
        m("color_offline")
      ],
      computeLabel: k({
        entity: "Device tracker",
        name: "Name (custom_card_vncntdev_device_tracker_name)",
        icon: "Icon (custom_card_vncntdev_device_tracker_icon)",
        status_as_name: "Show Online/Offline as name (custom_card_vncntdev_device_tracker_status_as_name)",
        color_online: "Online icon color",
        color_offline: "Offline icon color"
      }),
      computeHelper: C({
        status_as_name: "When true, friendly name moves to the label and status is the title.",
        color_online: "Default var(--google-green)",
        color_offline: "Default var(--google-red)"
      })
    };
  }
  static getStubConfig() {
    return {
      entity: "device_tracker.server",
      icon: "mdi:server",
      status_as_name: !1,
      color_online: "var(--google-green)",
      color_offline: "var(--google-red)"
    };
  }
  setConfig(t) {
    const e = t, i = ei(pe(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ei(
        pe(e, "name", "custom_card_vncntdev_device_tracker_name")
      ),
      icon: ei(pe(e, "icon", "custom_card_vncntdev_device_tracker_icon")) || "mdi:server",
      status_as_name: Zm(
        pe(
          e,
          "status_as_name",
          "custom_card_vncntdev_device_tracker_status_as_name"
        ),
        !1
      ),
      color_online: ei(
        pe(
          e,
          "color_online",
          "custom_card_vncntdev_device_tracker_color_online"
        )
      ) || "var(--google-green)",
      color_offline: ei(
        pe(
          e,
          "color_offline",
          "custom_card_vncntdev_device_tracker_color_offline"
        )
      ) || "var(--google-red)",
      type: "custom:ulm-custom-card-vncntdev-device-tracer-card"
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto"
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-vncntdev-tracer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Xm(t.state), i = e ? "Offline" : "Online", o = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._config.status_as_name ? i : o, r = this._config.status_as_name ? o : i, a = e ? this._config.color_offline : this._config.color_online;
    return c`
      <ha-card class="ulm-card ulm-vncntdev-tracer" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style="color: ${a};">
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${n}</div>
            <div class="label">${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
yo.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-vncntdev-tracer {
      height: auto;
      cursor: pointer;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
aa([
  x({ attribute: !1 })
], yo.prototype, "hass", 2);
aa([
  y()
], yo.prototype, "_config", 2);
yo = aa([
  $("ulm-custom-card-vncntdev-device-tracer-card")
], yo);
var Qm = Object.defineProperty, th = Object.getOwnPropertyDescriptor, sa = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? th(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, i, n) : a(n)) || n);
  return o && n && Qm(e, i, n), n;
};
const eh = {
  none: "None",
  very_low: "Very low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very high"
}, ge = {
  tree: "mdi:tree",
  grass: "mdi:grass",
  weed: "mdi:flower-pollen"
};
function V(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function q(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ih(t, e) {
  switch (e) {
    case "none":
      return {
        color: `rgba(${f(t, "grey")}, 1)`,
        backgroundColor: `rgba(${f(t, "grey")}, 0.2)`
      };
    case "very_low":
      return {
        color: `rgba(${f(t, "green")}, 1)`,
        backgroundColor: `rgba(${f(t, "green")}, 0.2)`
      };
    case "low":
      return {
        color: "rgba(241, 196, 15, 1)",
        backgroundColor: "rgba(241, 196, 15, 0.2)"
      };
    case "medium":
      return {
        color: "rgba(243, 156, 18, 1)",
        backgroundColor: "rgba(243, 156, 18, 0.2)"
      };
    case "high":
      return {
        color: "rgba(231, 76, 60, 1)",
        backgroundColor: "rgba(231, 76, 60, 0.2)"
      };
    case "very_high":
      return {
        color: `rgba(${f(t, "pink")}, 1)`,
        backgroundColor: `rgba(${f(t, "pink")}, 0.2)`
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
  }
}
function oh(t) {
  const e = t.trim().toLowerCase().replace(/\s+/g, "_");
  if (e === "none" || e === "very_low" || e === "low" || e === "medium" || e === "high" || e === "very_high")
    return e;
  if (e === "verylow" || e === "sehr_niedrig" || e === "zeer_laag")
    return "very_low";
  if (e === "sehr_hoch" || e === "veryhigh" || e === "extreem_hoog")
    return "very_high";
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i <= 0 ? "none" : i <= 1 ? "very_low" : i <= 2 ? "low" : i <= 3 ? "medium" : i <= 4 ? "high" : "very_high" : "unknown";
}
let vo = class extends v {
  static getConfigForm() {
    return {
      schema: [
        u("tree_entity", void 0, !1),
        u("grass_entity", void 0, !1),
        u("weed_entity", void 0, !1),
        D([m("tree_name"), S("tree_icon")]),
        D([m("grass_name"), S("grass_icon")]),
        D([m("weed_name"), S("weed_icon")]),
        m("label_none"),
        m("label_very_low"),
        m("label_low"),
        m("label_medium"),
        m("label_high"),
        m("label_very_high")
      ],
      computeLabel: k({
        tree_entity: "Tree pollen entity",
        grass_entity: "Grass pollen entity",
        weed_entity: "Weed pollen entity",
        tree_name: "Tree column name",
        grass_name: "Grass column name",
        weed_name: "Weed column name",
        tree_icon: "Tree icon",
        grass_icon: "Grass icon",
        weed_icon: "Weed icon",
        label_none: "Label: none",
        label_very_low: "Label: very low",
        label_low: "Label: low",
        label_medium: "Label: medium",
        label_high: "Label: high",
        label_very_high: "Label: very high"
      }),
      computeHelper: C({
        tree_entity: "Legacy: custom_card_wsly_pollen_tree",
        grass_entity: "Legacy: custom_card_wsly_pollen_grass",
        weed_entity: "Legacy: custom_card_wsly_pollen_weed",
        tree_name: "Legacy: custom_card_wsly_pollen_tree_name (default Trees)",
        grass_name: "Legacy: custom_card_wsly_pollen_grass_name",
        weed_name: "Legacy: custom_card_wsly_pollen_weed_name",
        label_none: "Legacy: custom_card_wsly_pollen_none"
      })
    };
  }
  static getStubConfig() {
    return {
      tree_entity: "sensor.pollen_tree",
      grass_entity: "sensor.pollen_grass",
      weed_entity: "sensor.pollen_weed",
      tree_name: "Trees",
      grass_name: "Grass",
      weed_name: "Weeds",
      tree_icon: ge.tree,
      grass_icon: ge.grass,
      weed_icon: ge.weed
    };
  }
  setConfig(t) {
    const e = t, i = q(
      V(e, "tree_entity", "custom_card_wsly_pollen_tree", "entity")
    ), o = q(
      V(e, "grass_entity", "custom_card_wsly_pollen_grass")
    ), n = q(V(e, "weed_entity", "custom_card_wsly_pollen_weed"));
    if (!i && !o && !n)
      throw new Error("Please define at least one pollen entity");
    this._config = {
      ...t,
      tree_entity: i,
      grass_entity: o,
      weed_entity: n,
      tree_name: q(
        V(e, "tree_name", "custom_card_wsly_pollen_tree_name")
      ),
      grass_name: q(
        V(e, "grass_name", "custom_card_wsly_pollen_grass_name")
      ),
      weed_name: q(
        V(e, "weed_name", "custom_card_wsly_pollen_weed_name")
      ),
      tree_icon: q(
        V(e, "tree_icon", "custom_card_wsly_pollen_tree_icon")
      ),
      grass_icon: q(
        V(e, "grass_icon", "custom_card_wsly_pollen_grass_icon")
      ),
      weed_icon: q(
        V(e, "weed_icon", "custom_card_wsly_pollen_weed_icon")
      ),
      label_none: q(
        V(e, "label_none", "custom_card_wsly_pollen_none")
      ),
      label_very_low: q(
        V(e, "label_very_low", "custom_card_wsly_pollen_very_low")
      ),
      label_low: q(V(e, "label_low", "custom_card_wsly_pollen_low")),
      label_medium: q(
        V(e, "label_medium", "custom_card_wsly_pollen_medium")
      ),
      label_high: q(V(e, "label_high", "custom_card_wsly_pollen_high")),
      label_very_high: q(
        V(e, "label_very_high", "custom_card_wsly_pollen_very_high")
      ),
      type: "custom:ulm-custom-card-wsly-pollen-card"
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 6,
      max_columns: 12,
      rows: "auto",
      min_rows: 2
    };
  }
  render() {
    if (!this._config || !this.hass) return _;
    const t = [
      {
        entityId: this._config.tree_entity,
        name: this._config.tree_name,
        icon: this._config.tree_icon,
        fallbackIcon: ge.tree,
        fallbackName: "Trees"
      },
      {
        entityId: this._config.grass_entity,
        name: this._config.grass_name,
        icon: this._config.grass_icon,
        fallbackIcon: ge.grass,
        fallbackName: "Grass"
      },
      {
        entityId: this._config.weed_entity,
        name: this._config.weed_name,
        icon: this._config.weed_icon,
        fallbackIcon: ge.weed,
        fallbackName: "Weeds"
      }
    ];
    return t.some((e) => e.entityId) ? c`
      <ha-card class="ulm-card ulm-wsly-pollen">
        <div class="columns">
          ${t.map(
      (e) => this._renderColumn(
        e.entityId,
        e.name,
        e.icon,
        e.fallbackIcon,
        e.fallbackName
      )
    )}
        </div>
      </ha-card>
    ` : c`
        <ha-card class="ulm-card ulm-wsly-pollen">
          <div class="warning">No pollen entities configured</div>
        </ha-card>
      `;
  }
  _renderColumn(t, e, i, o, n) {
    if (!t)
      return c`<div class="column"></div>`;
    const r = this.hass.states[t];
    if (!r)
      return c`
        <div class="column">
          <div class="warning small">${t}</div>
        </div>
      `;
    const a = oh(r.state), s = ih(this, a), l = i || r.attributes.icon || o, h = e || r.attributes.friendly_name || n, p = a === "unknown" ? this._levelLabel("none") : this._levelLabel(a), g = f(this, "red");
    return c`
      <div
        class="column"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(t)}
        @keydown=${(z) => {
      (z.key === "Enter" || z.key === " ") && (z.preventDefault(), this._moreInfo(t));
    }}
      >
        <div class="icon-btn" style=${d(s)}>
          <ha-icon .icon=${l}></ha-icon>
        </div>
        ${a === "very_high" ? c`
              <!-- custom_fields.extreme — absolute on card, not on icon -->
              <div
                class="extreme"
                style=${d({
      backgroundColor: `rgba(${g}, 1)`
    })}
              >
                <ha-icon icon="mdi:exclamation-thick"></ha-icon>
              </div>
            ` : _}
        <div class="col-name">${h}</div>
        <div class="col-label">${p}</div>
      </div>
    `;
  }
  _levelLabel(t) {
    const e = this._config;
    return {
      none: e?.label_none,
      very_low: e?.label_very_low,
      low: e?.label_low,
      medium: e?.label_medium,
      high: e?.label_high,
      very_high: e?.label_very_high
    }[t] ?? eh[t];
  }
  _moreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: t }
      })
    );
  }
};
vo.styles = w`
    ${E}

    :host {
      height: auto !important;
      align-self: start;
    }

    /* Outer: list_3_items padding 0 + card shadow/radius from custom_card_wsly_pollen */
    ha-card.ulm-wsly-pollen {
      height: auto !important;
      padding: 0;
      overflow: visible;
      box-shadow: var(--ulm-shadow);
      border-radius: var(--ulm-radius);
    }

    /* list_3_items grid */
    .columns {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      width: 100%;
      box-sizing: border-box;
    }

    /*
     * vertical_buttons item with box-shadow: none
     * (one shared outer card — not three mini-cards)
     */
    .column {
      position: relative;
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "label";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content;
      justify-items: center;
      align-content: start;
      padding: 10px 0 8px;
      border-radius: var(--ulm-radius);
      box-shadow: none;
      background: transparent;
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
      min-width: 0;
    }

    .column:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .icon-btn {
      grid-area: icon;
      place-self: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      position: relative;
      overflow: visible;
      border: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      box-sizing: border-box;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    .col-name {
      grid-area: name;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      justify-self: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 4px;
      box-sizing: border-box;
    }

    .col-label {
      grid-area: label;
      font-size: 12px;
      font-weight: bolder;
      filter: opacity(40%);
      text-align: center;
      align-self: start;
      justify-self: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 4px;
      box-sizing: border-box;
    }

    /*
     * custom_fields.extreme — circle position from YAML (do not change):
     * left 38px; right 0; top 8px; margin auto; 16×16 + 2px border.
     */
    .extreme {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 38px;
      right: 0;
      top: 8px;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color);
      font-size: 12px;
      line-height: 14px;
      color: white;
      box-sizing: content-box;
      padding: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
    }

    /* Center ! inside the red disc only — does not move .extreme */
    .extreme ha-icon {
      --mdc-icon-size: 12px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      margin: 0;
      padding: 0;
      display: block;
      line-height: 0;
      color: var(--primary-background-color);
    }

    .warning.small {
      font-size: 11px;
      padding: 8px 4px;
      text-align: center;
      word-break: break-all;
    }
  `;
sa([
  x({ attribute: !1 })
], vo.prototype, "hass", 2);
sa([
  y()
], vo.prototype, "_config", 2);
vo = sa([
  $("ulm-custom-card-wsly-pollen-card")
], vo);
const nh = [];
var rh = Object.defineProperty, Ls = (t, e, i, o) => {
  for (var n = void 0, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = a(e, i, n) || n);
  return n && rh(e, i, n), n;
};
const Ms = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️"
}, Os = {
  default: "mdi:shield-outline",
  armed_home: "mdi:shield-home",
  armed_away: "mdi:shield-lock",
  armed_night: "mdi:shield-moon",
  disarmed: "mdi:shield-off",
  arming: "mdi:shield",
  triggered: "mdi:shield-alert"
}, Ns = {
  default: "var(--google-yellow)",
  armed_home: "var(--google-red)",
  armed_away: "var(--google-red)",
  armed_night: "var(--google-red)",
  disarmed: "var(--google-green)",
  arming: "var(--google-yellow)",
  triggered: "var(--google-red)"
};
function X(t, e) {
  if (!(!e || typeof e != "string"))
    return t.states[e];
}
function fe(t, e) {
  if (!e) return "";
  if (t.formatEntityState) return t.formatEntityState(e);
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
function kt(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
function Un(t) {
  t && (history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed")));
}
function I(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Is(t) {
  if (t == null || t === "") return "?";
  const e = Number(t);
  return !Number.isNaN(e) && !Number.isInteger(e) ? e.toFixed(1) : String(t);
}
function js(t, e) {
  return String(I(e, "ulm_language", "language") || t.language || void 0);
}
const ah = [
  {
    tag: "ulm-chip-back-card",
    type: "custom:ulm-chip-back-card",
    name: "ULM Chip Back",
    description: "Back navigation chip (mdi arrow)",
    fields: [S("icon"), m("navigation_path")],
    stub: { icon: "mdi:arrow-left" },
    normalize: (t) => ({
      ...t,
      icon: I(t, "icon", "ulm_chip_back_icon") || "mdi:arrow-left",
      navigation_path: I(t, "navigation_path", "ulm_chip_back_path")
    }),
    renderLabel: () => "",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:arrow-left")
    }),
    onTap: (t, e) => {
      const i = String(e.navigation_path || "");
      i ? Un(i) : history.back();
    }
  },
  {
    tag: "ulm-chip-navigate-card",
    type: "custom:ulm-chip-navigate-card",
    name: "ULM Chip Navigate",
    description: "Navigate chip with optional label",
    fields: [
      S("icon"),
      m("navigation_path"),
      m("label"),
      m("icon_color"),
      m("label_color")
    ],
    stub: {
      icon: "mdi:page-next",
      navigation_path: "/lovelace/home",
      label: ""
    },
    normalize: (t) => ({
      ...t,
      icon: I(t, "icon", "ulm_chip_navigate_icon") || "mdi:page-next",
      navigation_path: I(t, "navigation_path", "ulm_chip_navigate_path"),
      label: I(t, "label", "ulm_chip_navigate_label") || "",
      icon_color: I(t, "icon_color", "ulm_chip_navigate_icon_color"),
      label_color: I(t, "label_color", "ulm_chip_navigate_label_color")
    }),
    renderLabel: (t, e) => String(e.label || ""),
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:page-next"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e) => Un(String(e.navigation_path || ""))
  },
  {
    tag: "ulm-chip-icon-only-card",
    type: "custom:ulm-chip-icon-only-card",
    name: "ULM Chip Icon Only",
    description: "Emoji / text chip (no MDI)",
    fields: [m("icon")],
    stub: { icon: "💡" },
    normalize: (t) => ({
      ...t,
      icon: I(t, "icon", "ulm_chip_icon_only") || "❔"
    }),
    renderLabel: (t, e) => String(e.icon || "❔")
  },
  {
    tag: "ulm-chip-mdi-icon-only-card",
    type: "custom:ulm-chip-mdi-icon-only-card",
    name: "ULM Chip MDI Icon Only",
    description: "MDI icon chip",
    fields: [
      S("icon"),
      u("entity", void 0, !1),
      m("icon_color")
    ],
    stub: { icon: "mdi:home" },
    normalize: (t) => ({
      ...t,
      icon: I(t, "icon", "ulm_chip_mdi_icon_only_icon") || "mdi:home",
      entity: I(t, "entity", "ulm_chip_mdi_icon_only_entity"),
      icon_color: I(t, "icon_color", "ulm_chip_mdi_icon_only_icon_color")
    }),
    renderLabel: () => "",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:home"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-state-card",
    type: "custom:ulm-chip-icon-state-card",
    name: "ULM Chip Icon State",
    description: "Emoji + localized entity state",
    fields: [u("entity"), m("icon")],
    stub: { entity: "sensor.outside_temperature", icon: "🌡️" },
    normalize: (t) => ({
      ...t,
      entity: I(t, "entity", "ulm_chip_icon_state_entity"),
      icon: I(t, "icon", "ulm_chip_icon_state_icon") || "❔"
    }),
    renderLabel: (t, e) => {
      const i = X(t, e.entity), o = String(e.icon || "❔"), n = fe(t, i);
      return n ? `${o} ${n}` : o;
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-mdi-icon-state-card",
    type: "custom:ulm-chip-mdi-icon-state-card",
    name: "ULM Chip MDI Icon State",
    description: "MDI icon + localized state",
    fields: [
      u("entity"),
      S("icon"),
      m("icon_color"),
      m("label_color")
    ],
    stub: {
      entity: "sensor.outside_temperature",
      icon: "mdi:thermometer"
    },
    normalize: (t) => ({
      ...t,
      entity: I(t, "entity", "ulm_chip_mdi_icon_state_entity"),
      icon: I(t, "icon", "ulm_chip_mdi_icon_state_icon") || "mdi:information",
      icon_color: I(t, "icon_color", "ulm_chip_mdi_icon_state_icon_color"),
      label_color: I(
        t,
        "label_color",
        "ulm_chip_mdi_icon_state_label_color"
      )
    }),
    renderLabel: (t, e) => fe(t, X(t, e.entity)) || "?",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:information"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-label-card",
    type: "custom:ulm-chip-icon-label-card",
    name: "ULM Chip Icon Label",
    description: "MDI icon + custom label",
    fields: [
      S("icon"),
      m("label"),
      u("entity", void 0, !1)
    ],
    stub: { icon: "mdi:tag", label: "Label" },
    normalize: (t) => ({
      ...t,
      icon: I(t, "icon", "ulm_chip_icon_label_icon") || "mdi:tag",
      label: I(t, "label", "ulm_chip_icon_label_label") || "",
      entity: I(t, "entity", "ulm_chip_icon_label_entity")
    }),
    variant: "icon-label",
    renderLabel: (t, e) => String(e.label || ""),
    renderIcon: (t, e) => ({ icon: String(e.icon || "mdi:tag") }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-double-state-card",
    type: "custom:ulm-chip-icon-double-state-card",
    name: "ULM Chip Icon Double State",
    description: "Emoji + two localized states (•)",
    fields: [
      u("entity_1"),
      u("entity_2"),
      m("icon"),
      m("navigation_path")
    ],
    stub: {
      entity_1: "sensor.outside_temperature",
      entity_2: "sensor.outside_humidity",
      icon: "🌡️"
    },
    normalize: (t) => ({
      ...t,
      entity_1: I(t, "entity_1", "ulm_chip_icon_double_state_entity_1"),
      entity_2: I(t, "entity_2", "ulm_chip_icon_double_state_entity_2"),
      icon: I(t, "icon", "ulm_chip_icon_double_state_icon") || "❔",
      navigation_path: I(t, "navigation_path", "ulm_chip_navigate_path")
    }),
    renderLabel: (t, e) => {
      const i = String(e.icon || "❔"), o = fe(t, X(t, e.entity_1)) || "?", n = fe(t, X(t, e.entity_2)) || "?";
      return `${i} ${o} • ${n}`;
    },
    onTap: (t, e) => {
      const i = String(e.navigation_path || "");
      i && Un(i);
    }
  },
  {
    tag: "ulm-chip-alarm-card",
    type: "custom:ulm-chip-alarm-card",
    name: "ULM Chip Alarm",
    description: "Alarm control panel chip",
    fields: [u("entity", "alarm_control_panel")],
    stub: { entity: "alarm_control_panel.security" },
    normalize: (t) => ({
      ...t,
      entity: I(t, "entity", "ulm_chip_alarm_entity")
    }),
    variant: "icon-label",
    renderLabel: (t, e) => fe(t, X(t, e.entity)) || "unknown",
    renderIcon: (t, e) => {
      const i = (X(t, e.entity)?.state || "").toLowerCase();
      return {
        icon: Os[i] || Os.default,
        color: Ns[i] || Ns.default
      };
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-power-consumption-card",
    type: "custom:ulm-chip-power-consumption-card",
    name: "ULM Chip Power Consumption",
    description: "⚡ price or consumption chip",
    fields: [
      u("electric_consumption", void 0, !1),
      u("electric_price", void 0, !1)
    ],
    stub: { electric_consumption: "sensor.power_consumption" },
    normalize: (t) => ({
      ...t,
      electric_consumption: I(
        t,
        "electric_consumption",
        "ulm_chip_electric_consumption",
        "entity"
      ),
      electric_price: I(t, "electric_price", "ulm_chip_electric_price")
    }),
    renderLabel: (t, e) => {
      const i = X(t, e.electric_price);
      if (i) {
        const n = i.attributes.unit_of_measurement || "";
        return `⚡ ${i.state}${n}`;
      }
      const o = X(t, e.electric_consumption);
      return o ? `⚡ ${fe(t, o)}` : "⚡ ?";
    },
    onTap: (t, e, i) => {
      const o = String(e.electric_price || e.electric_consumption || "");
      o && kt(i, o);
    }
  },
  {
    tag: "ulm-chip-presence-detection-card",
    type: "custom:ulm-chip-presence-detection-card",
    name: "ULM Chip Presence",
    description: "🏠 residents [/ guests] counters",
    fields: [
      u("residents"),
      u("guests", void 0, !1)
    ],
    stub: {
      residents: "input_number.residents_home",
      guests: "input_number.guests_home"
    },
    normalize: (t) => ({
      ...t,
      residents: I(
        t,
        "residents",
        "ulm_chip_presence_counter_residents",
        "entity"
      ),
      guests: I(t, "guests", "ulm_chip_presence_counter_guests")
    }),
    renderLabel: (t, e) => {
      const i = X(t, e.residents)?.state ?? "?", o = X(t, e.guests);
      return o ? `🏠 ${i} / ${o.state}` : `🏠 ${i}`;
    },
    onTap: (t, e, i) => {
      typeof e.residents == "string" && kt(i, e.residents);
    }
  },
  {
    tag: "ulm-chip-temperature-card",
    type: "custom:ulm-chip-temperature-card",
    name: "ULM Chip Temperature",
    description: "Weather emoji + outside [/ inside] °",
    fields: [
      u("weather", "weather"),
      u("outside"),
      u("inside", void 0, !1)
    ],
    stub: {
      weather: "weather.demo_weather_north",
      outside: "sensor.outside_temperature"
    },
    normalize: (t) => ({
      ...t,
      weather: I(t, "weather", "ulm_chip_temperature_weather"),
      outside: I(t, "outside", "ulm_chip_temperature_outside"),
      inside: I(t, "inside", "ulm_chip_temperature_inside")
    }),
    renderLabel: (t, e) => {
      const i = X(t, e.weather), o = X(t, e.outside), n = X(t, e.inside), r = Ms[i?.state || ""] || "🌡️", a = Is(
        o?.state ?? i?.attributes.temperature
      );
      return n ? `${r} ${a}° / ${Is(n.state)}°` : `${r} ${a}°`;
    },
    onTap: (t, e, i) => {
      const o = String(e.weather || e.outside || "");
      o && kt(i, o);
    }
  },
  {
    tag: "ulm-chip-weather-date-card",
    type: "custom:ulm-chip-weather-date-card",
    name: "ULM Chip Weather Date",
    description: "Weather emoji + short date",
    fields: [u("entity", "weather")],
    stub: { entity: "weather.demo_weather_north" },
    normalize: (t) => ({
      ...t,
      entity: I(t, "entity", "ulm_weather", "ulm_chip_weather_date_entity")
    }),
    renderLabel: (t, e) => {
      const i = X(t, e.entity), o = Ms[i?.state || ""] || "🌡️", n = (/* @__PURE__ */ new Date()).toLocaleDateString(js(t, e), {
        month: "short",
        day: "numeric"
      });
      return `${o} ${n}`;
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && kt(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-short-date-with-day-card",
    type: "custom:ulm-chip-short-date-with-day-card",
    name: "ULM Chip Short Date",
    description: "Weekday + short date (label only)",
    fields: [],
    stub: {},
    renderLabel: (t, e) => new Intl.DateTimeFormat(js(t, e), {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(Date.now())
  }
];
function sh(t) {
  const i = class i extends v {
    constructor() {
      super(...arguments), this._onTap = (n) => {
        n.stopPropagation(), !(!this.hass || !this._config) && t.onTap?.(this.hass, this._config, this);
      };
    }
    static getConfigForm() {
      return { schema: t.fields };
    }
    static getStubConfig() {
      return { ...t.stub };
    }
    setConfig(n) {
      const r = { ...n }, a = t.normalize ? t.normalize(r) : r;
      this._config = { ...a, type: t.type };
    }
    getCardSize() {
      return 1;
    }
    getGridOptions() {
      return {
        columns: 3,
        min_columns: 2,
        max_columns: 12
      };
    }
    updated() {
      cn(this, this.hass);
    }
    render() {
      if (!this._config || !this.hass) return _;
      const n = this._config, r = t.renderIcon?.(this.hass, n), a = t.renderLabel(this.hass, n), s = typeof n.label_color == "string" ? n.label_color : void 0, l = [
        "chip",
        t.variant === "icon-label" ? "icon-label" : "",
        r && a ? "has-icon-and-label" : ""
      ].filter(Boolean).join(" ");
      return c`
        <button class=${l} @click=${this._onTap}>
          ${r ? c`<ha-icon
                .icon=${r.icon}
                style=${d(
        r.color ? { color: r.color } : {}
      )}
              ></ha-icon>` : _}
          ${a ? c`<span
                class="label"
                style=${d(s ? { color: s } : {})}
                >${a}</span
              >` : _}
        </button>
      `;
    }
  };
  i.styles = ln;
  let e = i;
  return Ls([
    x({ attribute: !1 })
  ], e.prototype, "hass"), Ls([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), t;
}
const ch = ah.map(sh);
var lh = Object.defineProperty, Ds = (t, e, i, o) => {
  for (var n = void 0, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = a(e, i, n) || n);
  return n && lh(e, i, n), n;
};
const dh = {
  new_moon: "mdi:moon-new",
  waxing_crescent: "mdi:moon-waxing-crescent",
  first_quarter: "mdi:moon-first-quarter",
  waxing_gibbous: "mdi:moon-waxing-gibbous",
  full_moon: "mdi:moon-full",
  waning_gibbous: "mdi:moon-waning-gibbous",
  last_quarter: "mdi:moon-last-quarter",
  waning_crescent: "mdi:moon-waning-crescent"
}, As = {
  Normal: "mdi:thermometer",
  Defrost: "mdi:snowflake-melt",
  "Keep On": "mdi:heat-wave",
  "Dog Mode": "mdi:dog-side",
  "Camp Mode": "mdi:campfire",
  default: "mdi:thermometer"
}, uh = {
  light_zero: "No lights",
  light_one: "One light",
  light_multiple: "{count} lights",
  media_player_zero: "No media players",
  media_player_one: "One media player",
  media_player_multiple: "{count} media players",
  speaker_zero: "No speakers",
  speaker_one: "One speaker",
  speaker_multiple: "{count} speakers",
  television_zero: "No TVs",
  television_one: "One TV",
  television_multiple: "{count} TVs"
};
function j(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Q(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ts(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function ot(t, e) {
  if (!(!e || typeof e != "string"))
    return t.states[e];
}
function Wt(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
function _h(t) {
  t && (history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed")));
}
function Fn(t) {
  if (t == null || t === "") return "?";
  const e = Number(t);
  return !Number.isNaN(e) && !Number.isInteger(e) ? e.toFixed(1) : String(t);
}
function Bn(t, e) {
  const i = Q(
    j(e, "entities_active", "ulm_custom_chip_group_counter_entities_active")
  );
  if (i) {
    const l = Number.parseFloat(ot(t, i)?.state ?? "");
    return Number.isFinite(l) ? Math.max(0, Math.round(l)) : 0;
  }
  const o = Q(j(e, "entity")), n = ot(t, o);
  if (!n) return 0;
  const a = String(
    j(e, "count_state", "ulm_custom_chip_group_counter_count_state") || "on"
  ).split(",").map((l) => l.trim()), s = n.attributes.entity_id;
  return Array.isArray(s) && s.length ? s.filter((l) => {
    const h = t.states[String(l)];
    return h && a.includes(h.state);
  }).length : a.includes(n.state) ? 1 : 0;
}
function mh(t, e) {
  const o = `${e}_${t === 0 ? "zero" : t === 1 ? "one" : "multiple"}`;
  return (uh[o] || `{count} ${e}`).replace("{count}", String(t));
}
function hh(t, e, i) {
  if (!i) return "rgba(var(--color-theme),0.2)";
  const n = [
    "yellow",
    "blue",
    "green",
    "red",
    "purple",
    "pink",
    "grey"
  ].includes(e) ? e : "yellow";
  return `rgba(${f(t, n)},1)`;
}
function ph(t, e) {
  const i = Q(
    j(e, "battery_entity", "ulm_battery_entity")
  );
  if (i) {
    const s = Number.parseFloat(ot(t, i)?.state ?? "");
    return Number.isFinite(s) ? Math.round(s) : void 0;
  }
  const o = Q(j(e, "entity")), n = ot(t, o);
  if (!n) return;
  const r = n.attributes.battery ?? n.attributes.battery_level, a = Number.parseFloat(String(r ?? ""));
  return Number.isFinite(a) ? Math.round(a) : void 0;
}
const gh = [
  {
    tag: "ulm-custom-chip-group-counter-card",
    type: "custom:ulm-custom-chip-group-counter-card",
    name: "ULM Custom Chip group counter",
    description: "Count active entities in a group (lights, media, …)",
    fields: [
      u("entity", ["group", "light", "switch", "media_player"]),
      u("entities_active", "sensor", !1),
      m("counter_type"),
      m("count_state"),
      S("icon_zero"),
      S("icon_one"),
      S("icon_multiple"),
      A("color"),
      b("hide_if_zero")
    ],
    stub: {
      entity: "light.ceiling_lights",
      counter_type: "light",
      count_state: "on",
      icon_zero: "mdi:lightbulb-outline",
      icon_one: "mdi:lightbulb-on-outline",
      icon_multiple: "mdi:lightbulb-on-outline",
      color: "yellow",
      hide_if_zero: !1
    },
    normalize: (t) => ({
      ...t,
      entity: j(t, "entity"),
      entities_active: j(
        t,
        "entities_active",
        "ulm_custom_chip_group_counter_entities_active"
      ),
      counter_type: j(
        t,
        "counter_type",
        "ulm_custom_chip_group_counter_type"
        // legacy short key from YAML variables (avoid clobbering card type)
      ) || "light",
      count_state: j(t, "count_state", "ulm_custom_chip_group_counter_count_state") || "on",
      icon_zero: j(t, "icon_zero", "ulm_custom_chip_group_counter_icon_zero") || "mdi:lightbulb-outline",
      icon_one: j(t, "icon_one", "ulm_custom_chip_group_counter_icon_one") || "mdi:lightbulb-on-outline",
      icon_multiple: j(
        t,
        "icon_multiple",
        "ulm_custom_chip_group_counter_icon_multiple"
      ) || "mdi:lightbulb-on-outline",
      color: j(t, "color", "ulm_custom_chip_group_counter_color") || "yellow",
      hide_if_zero: Ts(
        j(t, "hide_if_zero", "ulm_custom_chip_group_counter_hide_if_zero"),
        !1
      )
    }),
    shouldHide: (t, e) => !!e.hide_if_zero && Bn(t, e) === 0,
    renderIcon: (t, e, i) => {
      const o = Bn(t, e);
      return {
        icon: String(o === 0 ? e.icon_zero || "mdi:lightbulb-outline" : o === 1 ? e.icon_one || "mdi:lightbulb-on-outline" : e.icon_multiple || "mdi:lightbulb-on-outline"),
        color: hh(i, String(e.color || "yellow"), o > 0)
      };
    },
    renderLabel: (t, e) => mh(
      Bn(t, e),
      String(e.counter_type || "light")
    ),
    onTap: (t, e, i) => {
      const o = Q(e.entity);
      if (!o) return;
      const n = o.split(".")[0];
      n === "light" || n === "switch" || n === "group" ? t.callService("homeassistant", "toggle", { entity_id: o }) : Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-moon-card",
    type: "custom:ulm-custom-chip-moon-card",
    name: "ULM Custom Chip moon",
    description: "Moon phase icon chip",
    fields: [u("entity", "sensor")],
    stub: { entity: "sensor.moon_phase" },
    normalize: (t) => ({ ...t, entity: j(t, "entity") }),
    renderLabel: () => "",
    renderIcon: (t, e) => {
      const i = ot(t, e.entity)?.state || "";
      return { icon: dh[i] || "mdi:moon-waning-crescent" };
    },
    onTap: (t, e, i) => {
      const o = Q(e.entity);
      o && Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-myenedis-card",
    type: "custom:ulm-custom-chip-myenedis-card",
    name: "ULM Custom Chip myenedis",
    description: "MyEnedis daily cost / consumption chip",
    fields: [
      u("entity", "sensor"),
      b("separate_hp_hc"),
      m("unit_of_measurement")
    ],
    stub: { entity: "sensor.power_consumption", separate_hp_hc: !1 },
    normalize: (t) => ({
      ...t,
      entity: j(t, "entity"),
      separate_hp_hc: Ts(
        j(t, "separate_hp_hc", "ulm_chip_separate_hp_hc"),
        !1
      ),
      unit_of_measurement: j(
        t,
        "unit_of_measurement",
        "ulm_chip_unit_of_measurement"
      )
    }),
    renderLabel: (t, e) => {
      const i = ot(t, e.entity);
      if (!i) return "💰 —";
      const o = Q(e.unit_of_measurement) || String(i.attributes.unit_of_measurement || "kWh"), n = Number.parseFloat(String(i.attributes.daily_cost ?? ""));
      let r = `💰 ${Number.isFinite(n) ? n.toFixed(1) : "—"} €`;
      if (e.separate_hp_hc) {
        const a = Number.parseFloat(String(i.attributes.yesterday_HP ?? "")), s = Number.parseFloat(String(i.attributes.yesterday_HC ?? ""));
        r += ` ☀️ ${Number.isFinite(a) ? a.toFixed(1) : "—"} ${o}`, r += ` 🌑 ${Number.isFinite(s) ? s.toFixed(1) : "—"} ${o}`;
      } else {
        const a = Number.parseFloat(
          String(i.attributes.yesterday_HCHP ?? i.state ?? "")
        );
        r += ` ⚡ ${Number.isFinite(a) ? a.toFixed(1) : "—"} ${o}`;
      }
      return r;
    },
    onTap: (t, e, i) => {
      const o = Q(e.entity);
      o && Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-simple-temp-card",
    type: "custom:ulm-custom-chip-simple-temp-card",
    name: "ULM Custom Chip simple temp",
    description: "Temperature value chip (e.g. 21.5°)",
    fields: [u("entity", ["sensor", "climate"])],
    stub: { entity: "sensor.outside_temperature" },
    normalize: (t) => ({ ...t, entity: j(t, "entity") }),
    renderLabel: (t, e) => {
      const i = ot(t, e.entity);
      if (!i) return "—°";
      const o = i.attributes.current_temperature !== void 0 ? i.attributes.current_temperature : i.state;
      return `${Fn(o)}°`;
    },
    onTap: (t, e, i) => {
      const o = Q(e.entity);
      o && Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-tesla-temperature-card",
    type: "custom:ulm-custom-chip-tesla-temperature-card",
    name: "ULM Custom Chip tesla temperature",
    description: "HVAC set / current temperature chip",
    fields: [u("hvac", "climate"), u("entity", "climate", !1)],
    stub: { hvac: "climate.hvac" },
    variant: "icon-label",
    normalize: (t) => ({
      ...t,
      hvac: j(t, "hvac", "ulm_chip_hvac", "entity"),
      entity: j(t, "entity", "ulm_chip_hvac")
    }),
    renderIcon: (t, e) => {
      const i = Q(j(e, "hvac", "entity")), o = String(ot(t, i)?.attributes.preset_mode || "");
      return {
        icon: As[o] || As.default
      };
    },
    renderLabel: (t, e) => {
      const i = Q(j(e, "hvac", "entity")), o = ot(t, i);
      if (!o) return "Set —° / Current —°";
      const n = Fn(o.attributes.temperature), r = Fn(o.attributes.current_temperature);
      return `Set ${n}° / Current ${r}°`;
    },
    onTap: (t, e, i) => {
      const o = Q(j(e, "hvac", "entity"));
      o && Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-update-card",
    type: "custom:ulm-custom-chip-update-card",
    name: "ULM Custom Chip update",
    description: "Updates available / up to date navigate chip",
    fields: [
      u("entity", ["binary_sensor", "update", "sensor"]),
      m("path"),
      m("updates_available"),
      m("no_updates_available")
    ],
    stub: {
      entity: "update.demo_update_with_progress",
      path: "/config/updates",
      updates_available: "Updates available",
      no_updates_available: "Up to date"
    },
    normalize: (t) => ({
      ...t,
      entity: j(t, "entity"),
      path: j(t, "path", "ulm_chip_update_path") || "/config/updates",
      updates_available: j(t, "updates_available", "ulm_updates_available") || "Updates available",
      no_updates_available: j(t, "no_updates_available", "ulm_no_updates_available") || "Up to date"
    }),
    renderIcon: (t, e) => ot(t, e.entity)?.state === "off" ? { icon: "mdi:shield-check", color: "var(--google-green)" } : { icon: "mdi:shield-alert", color: "var(--google-red)" },
    renderLabel: (t, e) => ot(t, e.entity)?.state === "off" ? String(e.no_updates_available || "Up to date") : String(e.updates_available || "Updates available"),
    onTap: (t, e) => _h(String(e.path || "/config/updates"))
  },
  {
    tag: "ulm-custom-chip-vlape-garage-card",
    type: "custom:ulm-custom-chip-vlape-garage-card",
    name: "ULM Custom Chip vlape garage",
    description: "Garage open/closed icon + state chip",
    fields: [u("entity", ["cover", "binary_sensor", "lock"])],
    stub: { entity: "cover.garage_door" },
    variant: "icon-label",
    normalize: (t) => ({ ...t, entity: j(t, "entity") }),
    renderIcon: (t, e) => {
      const i = (ot(t, e.entity)?.state || "").toLowerCase(), o = i === "open" || i === "opening" || i === "on";
      return {
        icon: o ? "mdi:garage-open" : "mdi:garage",
        color: o ? "var(--google-red)" : "var(--google-green)"
      };
    },
    renderLabel: (t, e) => {
      const i = ot(t, e.entity);
      return i ? t.formatEntityState ? t.formatEntityState(i) : i.state : "—";
    },
    onTap: (t, e, i) => {
      const o = Q(e.entity);
      o && Wt(i, o);
    }
  },
  {
    tag: "ulm-custom-template-shogun160-battery-info-card",
    type: "custom:ulm-custom-template-shogun160-battery-info-card",
    name: "ULM Custom Chip battery info",
    description: "Circular battery % badge (shogun160 template as chip)",
    fields: [
      u("battery_entity", "sensor", !1),
      u("entity", ["sensor", "device_tracker", "person"], !1)
    ],
    stub: { battery_entity: "sensor.outside_temperature_battery" },
    normalize: (t) => ({
      ...t,
      battery_entity: j(t, "battery_entity", "ulm_battery_entity"),
      entity: j(t, "entity")
    }),
    renderLabel: () => "",
    renderCustom: (t, e) => {
      const i = ph(t, e);
      if (i === void 0)
        return c`<span class="label">—%</span>`;
      const o = 14, n = o * 2 * Math.PI, r = n - i / 100 * n;
      return Zo`
        <svg class="bat-ring" viewBox="0 0 36 36" aria-hidden="true">
          <circle
            class="bat-bg"
            cx="18"
            cy="18"
            r=${o}
            fill="var(--card-background-color)"
            stroke="rgba(var(--color-theme),0.15)"
            stroke-width="3"
          />
          <circle
            class="bat-fg"
            cx="18"
            cy="18"
            r=${o}
            fill="none"
            stroke="var(--google-green)"
            stroke-width="3"
            stroke-linecap="round"
            style=${d({
        strokeDasharray: `${n}`,
        strokeDashoffset: `${r}`,
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%"
      })}
          />
          <text
            x="50%"
            y="54%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="bat-text"
          >${i}<tspan class="bat-pct">%</tspan></text>
        </svg>
      `;
    },
    onTap: (t, e, i) => {
      const o = Q(j(e, "battery_entity", "entity"));
      o && Wt(i, o);
    }
  }
];
function fh(t) {
  const i = class i extends v {
    constructor() {
      super(...arguments), this._onTap = (n) => {
        n.stopPropagation(), !(!this.hass || !this._config) && t.onTap?.(this.hass, this._config, this);
      };
    }
    static getConfigForm() {
      return { schema: t.fields };
    }
    static getStubConfig() {
      return { ...t.stub };
    }
    setConfig(n) {
      const r = { ...n }, a = t.normalize ? t.normalize(r) : r;
      this._config = { ...a, type: t.type };
    }
    getCardSize() {
      return 1;
    }
    getGridOptions() {
      return {
        columns: 3,
        min_columns: 2,
        max_columns: 12
      };
    }
    updated() {
      cn(this, this.hass);
    }
    render() {
      if (!this._config || !this.hass) return _;
      const n = this._config;
      if (t.shouldHide?.(this.hass, n))
        return _;
      if (t.renderCustom)
        return c`
          <button class="chip bat-chip" @click=${this._onTap}>
            ${t.renderCustom(this.hass, n)}
          </button>
        `;
      const r = t.renderIcon?.(this.hass, n, this), a = t.renderLabel(this.hass, n), s = [
        "chip",
        t.variant === "icon-label" ? "icon-label" : "",
        r && a ? "has-icon-and-label" : ""
      ].filter(Boolean).join(" ");
      return c`
        <button class=${s} @click=${this._onTap}>
          ${r ? c`<ha-icon
                .icon=${r.icon}
                style=${d(
        r.color ? { color: r.color } : {}
      )}
              ></ha-icon>` : _}
          ${a ? c`<span class="label">${a}</span>` : _}
        </button>
      `;
    }
  };
  i.styles = [
    ln,
    w`
        button.chip.bat-chip {
          padding: 2px;
          height: 36px;
          width: 36px;
          border-radius: 50%;
        }
        .bat-ring {
          width: 32px;
          height: 32px;
          display: block;
        }
        .bat-text {
          fill: var(--primary-text-color);
          font-size: 11px;
          font-weight: bold;
        }
        .bat-pct {
          font-size: 7px;
        }
      `
  ];
  let e = i;
  return Ds([
    x({ attribute: !1 })
  ], e.prototype, "hass"), Ds([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), t;
}
const bh = gh.map(fh);
var yh = Object.defineProperty, Us = (t, e, i, o) => {
  for (var n = void 0, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = a(e, i, n) || n);
  return n && yh(e, i, n), n;
};
function vh(t) {
  return ["on", "open", "opening", "home", "playing", "cleaning"].includes(
    t.state
  );
}
function wh(t) {
  const i = class i extends v {
    constructor() {
      super(...arguments), this._iconTap = (n) => {
        if (n.stopPropagation(), !this.hass || !this._config) return;
        const r = this.hass.states[this._config.entity];
        if (r) {
          if (t.onIconTap) {
            t.onIconTap(this.hass, this._config, r);
            return;
          }
          this._moreInfo(n);
        }
      }, this._moreInfo = (n) => {
        n.stopPropagation(), this._config && this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          })
        );
      };
    }
    /** Official HA form editor — https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/ */
    static getConfigForm() {
      return Oc({
        domain: t.entityDomain,
        extra: t.extraSchema
      });
    }
    static getStubConfig() {
      return {
        entity: t.stubEntity || "sensor.demo",
        color: t.defaultColor || "blue"
      };
    }
    setConfig(n) {
      if (!n.entity) throw new Error("Please define an entity");
      this._config = {
        color: t.defaultColor || "blue",
        force_background_color: !1,
        ...n,
        type: t.type
      };
    }
    getCardSize() {
      return 1;
    }
    render() {
      if (!this._config || !this.hass) return _;
      const n = this.hass.states[this._config.entity];
      if (!n)
        return c`<ha-card class="ulm-card"
          ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
        >`;
      const r = (t.isActive || vh)(n), a = this._config.color || t.defaultColor || "blue", s = this._config.name || n.attributes.friendly_name || n.entity_id, l = this._config.icon || n.attributes.icon || t.defaultIcon, h = t.stateLabel ? t.stateLabel(this.hass, n) : n.state, p = !!(r && this._config.force_background_color), g = R(
        this,
        r,
        a,
        null,
        !1,
        p
      ), z = f(this, a), P = p ? {
        backgroundColor: `rgba(${z}, var(--opacity-bg, 1))`
      } : {}, O = p ? { color: "rgb(250, 250, 250)" } : {};
      return c`
        <ha-card class="ulm-card" style=${d(P)}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(g)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${l}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfo}>
              <div class="name" style=${d(O)}>${s}</div>
              <div class="label" style=${d(O)}>${h}</div>
            </button>
          </div>
        </ha-card>
      `;
    }
  };
  i.styles = E;
  let e = i;
  return Us([
    x({ attribute: !1 })
  ], e.prototype, "hass"), Us([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), { Card: e, def: t };
}
function xh(t) {
  return t.map((e) => m(e));
}
const $h = [
  {
    dir: "custom_card_afvalophaling",
    tag: "ulm-custom-card-afvalophaling-card",
    editorTag: "ulm-custom-card-afvalophaling-card-editor",
    type: "custom:ulm-custom-card-afvalophaling-card",
    name: "ULM Custom afvalophaling",
    description: "Minimalist custom card port: custom_card_afvalophaling",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_alarm_time",
    tag: "ulm-custom-card-alarm-time-card",
    editorTag: "ulm-custom-card-alarm-time-card-editor",
    type: "custom:ulm-custom-card-alarm-time-card",
    name: "ULM Custom alarm time",
    description: "Minimalist custom card port: custom_card_alarm_time",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_apexcharts",
    tag: "ulm-custom-card-apexcharts-card",
    editorTag: "ulm-custom-card-apexcharts-card-editor",
    type: "custom:ulm-custom-card-apexcharts-card",
    name: "ULM Custom apexcharts",
    description: "Minimalist custom card port: custom_card_apexcharts",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_bar_card",
    tag: "ulm-custom-card-bar-card-card",
    editorTag: "ulm-custom-card-bar-card-card-editor",
    type: "custom:ulm-custom-card-bar-card-card",
    name: "ULM Custom bar card",
    description: "Minimalist custom card port: custom_card_bar_card",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_camera",
    tag: "ulm-custom-card-camera-card",
    editorTag: "ulm-custom-card-camera-card-editor",
    type: "custom:ulm-custom-card-camera-card",
    name: "ULM Custom camera",
    description: "Minimalist custom card port: custom_card_camera",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_camera_aspect_ratio",
      "ulm_custom_card_camera_label",
      "ulm_custom_card_camera_name",
      "ulm_custom_card_camera_title"
    ]
  },
  {
    dir: "custom_card_chromecast",
    tag: "ulm-custom-card-chromecast-card",
    editorTag: "ulm-custom-card-chromecast-card-editor",
    type: "custom:ulm-custom-card-chromecast-card",
    name: "ULM Custom chromecast",
    description: "Minimalist custom card port: custom_card_chromecast",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_media_player_with_controls_entity",
      "ulm_card_media_player_with_controls_name"
    ]
  },
  {
    dir: "custom_card_damix48_power_details",
    tag: "ulm-custom-card-damix48-power-details-card",
    editorTag: "ulm-custom-card-damix48-power-details-card-editor",
    type: "custom:ulm-custom-card-damix48-power-details-card",
    name: "ULM Custom damix48 power details",
    description: "Minimalist custom card port: custom_card_damix48_power_details",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_power_details_entity"
    ]
  },
  {
    dir: "custom_card_device_tracker",
    tag: "ulm-custom-card-device-tracker-card",
    editorTag: "ulm-custom-card-device-tracker-card-editor",
    type: "custom:ulm-custom-card-device-tracker-card",
    name: "ULM Custom device tracker",
    description: "Minimalist custom card port: custom_card_device_tracker",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_device_tracker_tracker_1_entity",
      "ulm_custom_card_device_tracker_tracker_2_entity"
    ]
  },
  {
    dir: "custom_card_drealine_roomview",
    tag: "ulm-custom-card-drealine-roomview-card",
    editorTag: "ulm-custom-card-drealine-roomview-card-editor",
    type: "custom:ulm-custom-card-drealine-roomview-card",
    name: "ULM Custom drealine roomview",
    description: "Minimalist custom card port: custom_card_drealine_roomview",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_eraycetinay_elapsed_time",
    tag: "ulm-custom-card-eraycetinay-elapsed-time-card",
    editorTag: "ulm-custom-card-eraycetinay-elapsed-time-card-editor",
    type: "custom:ulm-custom-card-eraycetinay-elapsed-time-card",
    name: "ULM Custom eraycetinay elapsed time",
    description: "Minimalist custom card port: custom_card_eraycetinay_elapsed_time",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_eraycetinay_lock",
    tag: "ulm-custom-card-eraycetinay-lock-card",
    editorTag: "ulm-custom-card-eraycetinay-lock-card-editor",
    type: "custom:ulm-custom-card-eraycetinay-lock-card",
    name: "ULM Custom eraycetinay lock",
    description: "Minimalist custom card port: custom_card_eraycetinay_lock",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_eraycetinay_lock_battery_is_at",
      "ulm_custom_card_eraycetinay_lock_battery_is_low",
      "ulm_custom_card_eraycetinay_lock_battery_level",
      "ulm_custom_card_eraycetinay_lock_battery_sensor_binary",
      "ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state",
      "ulm_custom_card_eraycetinay_lock_battery_warning"
    ]
  },
  {
    dir: "custom_card_esh_room",
    tag: "ulm-custom-card-esh-room-card",
    editorTag: "ulm-custom-card-esh-room-card-editor",
    type: "custom:ulm-custom-card-esh-room-card",
    name: "ULM Custom esh room",
    description: "Minimalist custom card port: custom_card_esh_room",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_cover_popup",
      "ulm_card_esh_room_cover_icon_closed",
      "ulm_card_esh_room_cover_icon_closing",
      "ulm_card_esh_room_cover_icon_open",
      "ulm_card_esh_room_cover_icon_opening",
      "ulm_card_esh_room_light_icon_off"
    ]
  },
  {
    dir: "custom_card_esh_welcome",
    tag: "ulm-custom-card-esh-welcome-card",
    editorTag: "ulm-custom-card-esh-welcome-card-editor",
    type: "custom:ulm-custom-card-esh-welcome-card",
    name: "ULM Custom esh welcome",
    description: "Minimalist custom card port: custom_card_esh_welcome",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_weather"
    ]
  },
  {
    dir: "custom_card_haven_washer",
    tag: "ulm-custom-card-haven-washer-card",
    editorTag: "ulm-custom-card-haven-washer-card-editor",
    type: "custom:ulm-custom-card-haven-washer-card",
    name: "ULM Custom haven washer",
    description: "Washer power + phase icons + progress bar",
    defaultIcon: "mdi:washing-machine",
    defaultColor: "blue",
    stubEntity: "switch.decorative_lights",
    extraKeys: []
  },
  {
    dir: "custom_card_heat_pump",
    tag: "ulm-custom-card-heat-pump-card",
    editorTag: "ulm-custom-card-heat-pump-card-editor",
    type: "custom:ulm-custom-card-heat-pump-card",
    name: "ULM Custom heat pump",
    description: "Minimalist custom card port: custom_card_heat_pump",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_homeassistant_updates",
    tag: "ulm-custom-card-homeassistant-updates-card",
    editorTag: "ulm-custom-card-homeassistant-updates-card-editor",
    type: "custom:ulm-custom-card-homeassistant-updates-card",
    name: "ULM Custom Home Assistant updates",
    description: "Core / Supervisor / OS update status + shortcuts",
    defaultIcon: "mdi:home-assistant",
    defaultColor: "blue",
    stubEntity: "update.demo_update_with_progress",
    extraKeys: [
      "ulm_card_homeassistant_entity",
      "ulm_no_updates_available",
      "ulm_updates_available"
    ]
  },
  {
    dir: "custom_card_httpedo13_sun",
    tag: "ulm-custom-card-httpedo13-sun-card",
    editorTag: "ulm-custom-card-httpedo13-sun-card-editor",
    type: "custom:ulm-custom-card-httpedo13-sun-card",
    name: "ULM Custom httpedo13 sun",
    description: "Minimalist custom card port: custom_card_httpedo13_sun",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_httpedo13_thermostat",
    tag: "ulm-custom-card-httpedo13-thermostat-card",
    editorTag: "ulm-custom-card-httpedo13-thermostat-card-editor",
    type: "custom:ulm-custom-card-httpedo13-thermostat-card",
    name: "ULM Custom httpedo13 thermostat",
    description: "Minimalist custom card port: custom_card_httpedo13_thermostat",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_iAbadia_battery_chip",
    tag: "ulm-custom-card-battery-chip-card",
    editorTag: "ulm-custom-card-battery-chip-card-editor",
    type: "custom:ulm-custom-card-battery-chip-card",
    name: "ULM Custom battery chip",
    description: "Minimalist custom card port: custom_card_iAbadia_battery_chip",
    defaultIcon: "mdi:battery",
    defaultColor: "blue",
    stubEntity: "sensor.outside_temperature_battery",
    extraKeys: [
      "ulm_custom_card_iAbadia_battery_chip_entity"
    ]
  },
  {
    dir: "custom_card_imswel_medias",
    tag: "ulm-custom-card-imswel-medias-card",
    editorTag: "ulm-custom-card-imswel-medias-card-editor",
    type: "custom:ulm-custom-card-imswel-medias-card",
    name: "ULM Custom imswel medias",
    description: "Minimalist custom card port: custom_card_imswel_medias",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_imswel_medias_index",
      "ulm_custom_card_imswel_medias_platform"
    ]
  },
  {
    dir: "custom_card_imswel_person",
    tag: "ulm-custom-card-imswel-person-card",
    editorTag: "ulm-custom-card-imswel-person-card-editor",
    type: "custom:ulm-custom-card-imswel-person-card",
    name: "ULM Custom imswel person",
    description: "Minimalist custom card port: custom_card_imswel_person",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_imswel_person_entity",
      "ulm_card_imswel_person_findmy_script",
      "ulm_card_imswel_person_gps_tracker",
      "ulm_card_imswel_person_use_entity_picture",
      "ulm_card_imswel_person_wifi_tracker",
      "ulm_custom_card_imswel_person_findmy"
    ]
  },
  {
    dir: "custom_card_input_datetime",
    tag: "ulm-custom-card-input-datetime-card",
    editorTag: "ulm-custom-card-input-datetime-card-editor",
    type: "custom:ulm-custom-card-input-datetime-card",
    name: "ULM Custom input datetime",
    description: "Time helper with minute step arrows",
    defaultIcon: "mdi:clock-outline",
    defaultColor: "blue",
    stubEntity: "input_datetime.alarm_weekday_time",
    extraKeys: []
  },
  {
    dir: "custom_card_input_number",
    tag: "ulm-custom-card-input-number-card",
    editorTag: "ulm-custom-card-input-number-card-editor",
    type: "custom:ulm-custom-card-input-number-card",
    name: "ULM Custom input number",
    description: "Number / counter / select with down-up controls",
    defaultIcon: "mdi:counter",
    defaultColor: "blue",
    stubEntity: "input_number.residents_home",
    extraKeys: []
  },
  {
    dir: "custom_card_irmajavi_entities",
    tag: "ulm-custom-card-irmajavi-entities-card",
    editorTag: "ulm-custom-card-irmajavi-entities-card-editor",
    type: "custom:ulm-custom-card-irmajavi-entities-card",
    name: "ULM Custom irmajavi entities",
    description: "Minimalist custom card port: custom_card_irmajavi_entities",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_irmajavi_entities_entity_1",
      "ulm_custom_card_irmajavi_entities_entity_2",
      "ulm_custom_card_irmajavi_entities_entity_3",
      "ulm_custom_card_irmajavi_entities_entity_4"
    ]
  },
  {
    dir: "custom_card_irmajavi_speedtest",
    tag: "ulm-custom-card-irmajavi-speedtest-card",
    editorTag: "ulm-custom-card-irmajavi-speedtest-card-editor",
    type: "custom:ulm-custom-card-irmajavi-speedtest-card",
    name: "ULM Custom irmajavi speedtest",
    description: "Minimalist custom card port: custom_card_irmajavi_speedtest",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_irmajavi_speedtest_download_speed_entity",
      "ulm_custom_card_irmajavi_speedtest_ping_entity",
      "ulm_custom_card_irmajavi_speedtest_upload_speed_entity"
    ]
  },
  {
    dir: "custom_card_irmajavi_weather",
    tag: "ulm-custom-card-irmajavi-weather-card",
    editorTag: "ulm-custom-card-irmajavi-weather-card-editor",
    type: "custom:ulm-custom-card-irmajavi-weather-card",
    name: "ULM Custom irmajavi weather",
    description: "Minimalist custom card port: custom_card_irmajavi_weather",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_irmajavi_weather",
      "ulm_custom_card_irmajavi_weather_date",
      "ulm_custom_card_irmajavi_weather_entity_1",
      "ulm_custom_card_irmajavi_weather_entity_2",
      "ulm_custom_card_irmajavi_weather_entity_3",
      "ulm_custom_card_irmajavi_weather_entity_4"
    ]
  },
  {
    dir: "custom_card_light_colorpick",
    tag: "ulm-custom-card-light-colorpick-card",
    editorTag: "ulm-custom-card-light-colorpick-card-editor",
    type: "custom:ulm-custom-card-light-colorpick-card",
    name: "ULM Custom light colorpick",
    description: "Light with brightness slider + RGB preset chips",
    defaultIcon: "mdi:palette",
    defaultColor: "yellow",
    stubEntity: "light.living_room_rgbww_lights",
    extraKeys: [
      "ulm_card_light_colorpick_name",
      "ulm_card_light_colorpick_transition",
      "ulm_card_light_slider_horizontal_name"
    ]
  },
  {
    dir: "custom_card_media_player_sonos",
    tag: "ulm-custom-card-media-player-sonos-card",
    editorTag: "ulm-custom-card-media-player-sonos-card-editor",
    type: "custom:ulm-custom-card-media-player-sonos-card",
    name: "ULM Custom media player sonos",
    description: "Minimalist custom card port: custom_card_media_player_sonos",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_media_player_with_controls_entity",
      "ulm_card_media_player_with_controls_name"
    ]
  },
  {
    dir: "custom_card_more_power_outlet",
    tag: "ulm-custom-card-more-power-outlet-card",
    editorTag: "ulm-custom-card-more-power-outlet-card-editor",
    type: "custom:ulm-custom-card-more-power-outlet-card",
    name: "ULM Custom more power outlet",
    description: "Outlet with power / energy / runtime label",
    defaultIcon: "mdi:power-socket-eu",
    defaultColor: "yellow",
    stubEntity: "switch.decorative_lights",
    extraKeys: []
  },
  {
    dir: "custom_card_mpse_gauge",
    tag: "ulm-custom-card-mpse-gauge-card",
    editorTag: "ulm-custom-card-mpse-gauge-card-editor",
    type: "custom:ulm-custom-card-mpse-gauge-card",
    name: "ULM Custom mpse gauge",
    description: "Minimalist custom card port: custom_card_mpse_gauge",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_mpse_printer",
    tag: "ulm-custom-card-mpse-printer-card",
    editorTag: "ulm-custom-card-mpse-printer-card-editor",
    type: "custom:ulm-custom-card-mpse-printer-card",
    name: "ULM Custom Printer",
    description: "Printer status header + CMYK toner level bars",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_printer_black_name",
      "ulm_card_printer_cyan_name",
      "ulm_card_printer_magenta_name",
      "ulm_card_printer_name",
      "ulm_card_printer_yellow_name"
    ]
  },
  {
    dir: "custom_card_mpse_thermostat",
    tag: "ulm-custom-card-mpse-thermostat-card",
    editorTag: "ulm-custom-card-mpse-thermostat-card-editor",
    type: "custom:ulm-custom-card-mpse-thermostat-card",
    name: "ULM Custom mpse thermostat",
    description: "Minimalist custom card port: custom_card_mpse_thermostat",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_mpse_wifisignal",
    tag: "ulm-custom-card-mpse-wifisignal-card",
    editorTag: "ulm-custom-card-mpse-wifisignal-card-editor",
    type: "custom:ulm-custom-card-mpse-wifisignal-card",
    name: "ULM Custom mpse wifisignal",
    description: "Minimalist custom card port: custom_card_mpse_wifisignal",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_nas",
    tag: "ulm-custom-card-nas-card",
    editorTag: "ulm-custom-card-nas-card-editor",
    type: "custom:ulm-custom-card-nas-card",
    name: "ULM Custom nas",
    description: "Minimalist custom card port: custom_card_nas",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_nas_sensor",
      "ulm_custom_card_nas_text",
      "ulm_custom_card_nas_unit"
    ]
  },
  {
    dir: "custom_card_neekster_update",
    tag: "ulm-custom-card-neekster-update-card",
    editorTag: "ulm-custom-card-neekster-update-card-editor",
    type: "custom:ulm-custom-card-neekster-update-card",
    name: "ULM Custom neekster update",
    description: "Minimalist custom card port: custom_card_neekster_update",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_neekster_update_collapsible",
      "ulm_card_neekster_update_enable_controls",
      "ulm_card_neekster_update_horizontal",
      "ulm_card_neekster_update_icon",
      "ulm_card_neekster_update_narrow_buttons"
    ]
  },
  {
    dir: "custom_card_nik_clock",
    tag: "ulm-custom-card-nik-clock-card",
    editorTag: "ulm-custom-card-nik-clock-card-editor",
    type: "custom:ulm-custom-card-nik-clock-card",
    name: "ULM Custom nik clock",
    description: "Minimalist custom card port: custom_card_nik_clock",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_nik_clock_switch",
      "ulm_custom_card_nik_clock_switch_enable"
    ]
  },
  {
    dir: "custom_card_nik_door",
    tag: "ulm-custom-card-nik-door-card",
    editorTag: "ulm-custom-card-nik-door-card-editor",
    type: "custom:ulm-custom-card-nik-door-card",
    name: "ULM Custom nik door",
    description: "Minimalist custom card port: custom_card_nik_door",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_entity_1_lock",
      "ulm_custom_card_entity_1_lock_battery",
      "ulm_custom_card_entity_1_name"
    ]
  },
  {
    dir: "custom_card_nik_nas",
    tag: "ulm-custom-card-nik-nas-card",
    editorTag: "ulm-custom-card-nik-nas-card-editor",
    type: "custom:ulm-custom-card-nik-nas-card",
    name: "ULM Custom nik nas",
    description: "NAS power status + up to 4 metric rows",
    defaultIcon: "mdi:nas",
    defaultColor: "blue",
    stubEntity: "switch.ac",
    extraKeys: []
  },
  {
    dir: "custom_card_nik_tablet",
    tag: "ulm-custom-card-nik-tablet-card",
    editorTag: "ulm-custom-card-nik-tablet-card-editor",
    type: "custom:ulm-custom-card-nik-tablet-card",
    name: "ULM Custom nik tablet",
    description: "Minimalist custom card port: custom_card_nik_tablet",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_bar_card_nik_tablet_card_entity"
    ]
  },
  {
    dir: "custom_card_paddy_dwd_pollen",
    tag: "ulm-custom-card-paddy-dwd-pollen-card",
    editorTag: "ulm-custom-card-paddy-dwd-pollen-card-editor",
    type: "custom:ulm-custom-card-paddy-dwd-pollen-card",
    name: "ULM Custom paddy dwd pollen",
    description: "Minimalist custom card port: custom_card_paddy_dwd_pollen",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_paddy_waste_collection",
    tag: "ulm-custom-card-paddy-waste-collection-card",
    editorTag: "ulm-custom-card-paddy-waste-collection-card-editor",
    type: "custom:ulm-custom-card-paddy-waste-collection-card",
    name: "ULM Custom paddy waste collection",
    description: "Minimalist custom card port: custom_card_paddy_waste_collection",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_paddy_welcome",
    tag: "ulm-custom-card-paddy-welcome-card",
    editorTag: "ulm-custom-card-paddy-welcome-card-editor",
    type: "custom:ulm-custom-card-paddy-welcome-card",
    name: "ULM Custom paddy welcome",
    description: "Minimalist custom card port: custom_card_paddy_welcome",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_paddy_welcome_weather_provider"
    ]
  },
  {
    dir: "custom_card_person_chip",
    tag: "ulm-custom-card-person-chip-card",
    editorTag: "ulm-custom-card-person-chip-card-editor",
    type: "custom:ulm-custom-card-person-chip-card",
    name: "ULM Custom person chip",
    description: "Minimalist custom card port: custom_card_person_chip",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_person_chip_entity"
    ]
  },
  {
    dir: "custom_card_person_info",
    tag: "ulm-custom-card-person-info-card",
    editorTag: "ulm-custom-card-person-info-card-editor",
    type: "custom:ulm-custom-card-person-info-card",
    name: "ULM Custom person info",
    description: "Minimalist custom card port: custom_card_person_info",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_person_battery_entity",
      "ulm_card_person_battery_state_entity",
      "ulm_card_person_commute_entity",
      "ulm_card_person_commute_icon",
      "ulm_card_person_cummute_icon",
      "ulm_card_person_driving_entity"
    ]
  },
  {
    dir: "custom_card_person_info_small",
    tag: "ulm-custom-card-person-info-small-card",
    editorTag: "ulm-custom-card-person-info-small-card-editor",
    type: "custom:ulm-custom-card-person-info-small-card",
    name: "ULM Custom person info small",
    description: "Minimalist custom card port: custom_card_person_info_small",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_person_battery_entity",
      "ulm_card_person_battery_state_entity",
      "ulm_card_person_driving_entity",
      "ulm_card_person_entity",
      "ulm_card_person_icon",
      "ulm_card_person_use_entity_picture"
    ]
  },
  {
    dir: "custom_card_playstation",
    tag: "ulm-custom-card-playstation-card",
    editorTag: "ulm-custom-card-playstation-card-editor",
    type: "custom:ulm-custom-card-playstation-card",
    name: "ULM Custom playstation",
    description: "Minimalist custom card port: custom_card_playstation",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_qubino",
    tag: "ulm-custom-card-qubino-card",
    editorTag: "ulm-custom-card-qubino-card-editor",
    type: "custom:ulm-custom-card-qubino-card",
    name: "ULM Custom qubino",
    description: "Minimalist custom card port: custom_card_qubino",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_ristou_person",
    tag: "ulm-custom-card-ristou-person-card",
    editorTag: "ulm-custom-card-ristou-person-card-editor",
    type: "custom:ulm-custom-card-ristou-person-card",
    name: "ULM Custom ristou person",
    description: "Minimalist custom card port: custom_card_ristou_person",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_ristou_camera_entity_dark",
      "ulm_custom_card_ristou_camera_entity_light",
      "ulm_custom_card_ristou_person_driving",
      "ulm_custom_card_ristou_person_driving_entity",
      "ulm_custom_card_ristou_person_language_variables",
      "ulm_custom_card_ristou_person_language_variables1"
    ]
  },
  {
    dir: "custom_card_saxel_fan",
    tag: "ulm-custom-card-saxel-fan-card",
    editorTag: "ulm-custom-card-saxel-fan-card-editor",
    type: "custom:ulm-custom-card-saxel-fan-card",
    name: "ULM Custom saxel fan",
    description: "Fan with slider, oscillate button, temp/hum attributes",
    defaultIcon: "mdi:fan",
    defaultColor: "blue",
    stubEntity: "fan.living_room_fan",
    extraKeys: [
      "ulm_card_fan_horizontal",
      "ulm_card_fan_hum_attribute",
      "ulm_card_fan_temp_attribute"
    ]
  },
  {
    dir: "custom_card_scenes",
    tag: "ulm-custom-card-scenes-card",
    editorTag: "ulm-custom-card-scenes-card-editor",
    type: "custom:ulm-custom-card-scenes-card",
    name: "ULM Custom scenes",
    description: "Minimalist custom card port: custom_card_scenes",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_schumijo_car",
    tag: "ulm-custom-card-schumijo-car-card",
    editorTag: "ulm-custom-card-schumijo-car-card-editor",
    type: "custom:ulm-custom-card-schumijo-car-card",
    name: "ULM Custom schumijo car",
    description: "Car tracker + lock badges with energy/range widgets",
    defaultIcon: "mdi:car",
    defaultColor: "blue",
    stubEntity: "person.alessandro_sabbadini",
    extraKeys: [
      "ulm_card_schumijo_car_lock"
    ]
  },
  {
    dir: "custom_card_schumijo_flower",
    tag: "ulm-custom-card-schumijo-flower-card",
    editorTag: "ulm-custom-card-schumijo-flower-card-editor",
    type: "custom:ulm-custom-card-schumijo-flower-card",
    name: "ULM Custom schumijo flower",
    description: "Minimalist custom card port: custom_card_schumijo_flower",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_card_flower_entity"
    ]
  },
  {
    dir: "custom_card_senoro_win",
    tag: "ulm-custom-card-senoro-win-card",
    editorTag: "ulm-custom-card-senoro-win-card-editor",
    type: "custom:ulm-custom-card-senoro-win-card",
    name: "ULM Custom senoro win",
    description: "Minimalist custom card port: custom_card_senoro_win",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_senoro_win_entity",
      "ulm_custom_card_senoro_win_locked"
    ]
  },
  {
    dir: "custom_card_sisimomo_printer",
    tag: "ulm-custom-card-sisimomo-printer-card",
    editorTag: "ulm-custom-card-sisimomo-printer-card-editor",
    type: "custom:ulm-custom-card-sisimomo-printer-card",
    name: "ULM Custom sisimomo printer",
    description: "Minimalist custom card port: custom_card_sisimomo_printer",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_speedtest_shogun160",
    tag: "ulm-custom-card-speedtest-shogun160-card",
    editorTag: "ulm-custom-card-speedtest-shogun160-card-editor",
    type: "custom:ulm-custom-card-speedtest-shogun160-card",
    name: "ULM Custom speedtest shogun160",
    description: "Minimalist custom card port: custom_card_speedtest_shogun160",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_speedtest_download_speed_entity",
      "ulm_custom_card_speedtest_ping_entity",
      "ulm_custom_card_speedtest_upload_speed_entity"
    ]
  },
  {
    dir: "custom_card_tpx01_aircondition",
    tag: "ulm-custom-card-tpx01-aircondition-card",
    editorTag: "ulm-custom-card-tpx01-aircondition-card-editor",
    type: "custom:ulm-custom-card-tpx01-aircondition-card",
    name: "ULM Custom AirCondition",
    description: "Air conditioner with power and temperature controls",
    defaultIcon: "mdi:air-conditioner",
    defaultColor: "blue",
    stubEntity: "climate.hvac",
    extraKeys: []
  },
  {
    dir: "custom_card_vncntdev_device_tracer",
    tag: "ulm-custom-card-vncntdev-device-tracer-card",
    editorTag: "ulm-custom-card-vncntdev-device-tracer-card-editor",
    type: "custom:ulm-custom-card-vncntdev-device-tracer-card",
    name: "ULM Custom vncntdev device tracer",
    description: "Minimalist custom card port: custom_card_vncntdev_device_tracer",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_water_heater",
    tag: "ulm-custom-card-water-heater-card",
    editorTag: "ulm-custom-card-water-heater-card-editor",
    type: "custom:ulm-custom-card-water-heater-card",
    name: "ULM Custom water heater",
    description: "Water heater with consumption-driven heating state",
    defaultIcon: "mdi:waves",
    defaultColor: "red",
    stubEntity: "water_heater.demo_water_heater",
    extraKeys: []
  },
  {
    dir: "custom_card_wilbiev_subtitle",
    tag: "ulm-custom-card-wilbiev-subtitle-card",
    editorTag: "ulm-custom-card-wilbiev-subtitle-card-editor",
    type: "custom:ulm-custom-card-wilbiev-subtitle-card",
    name: "ULM Custom wilbiev subtitle",
    description: "Minimalist custom card port: custom_card_wilbiev_subtitle",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_wilbiev_title",
    tag: "ulm-custom-card-wilbiev-title-card",
    editorTag: "ulm-custom-card-wilbiev-title-card-editor",
    type: "custom:ulm-custom-card-wilbiev-title-card",
    name: "ULM Custom wilbiev title",
    description: "Minimalist custom card port: custom_card_wilbiev_title",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_wsly_pollen",
    tag: "ulm-custom-card-wsly-pollen-card",
    editorTag: "ulm-custom-card-wsly-pollen-card-editor",
    type: "custom:ulm-custom-card-wsly-pollen-card",
    name: "ULM Custom wsly pollen",
    description: "Minimalist custom card port: custom_card_wsly_pollen",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_card_yagrasdemonde_lights_count",
    tag: "ulm-custom-card-yagrasdemonde-lights-count-card",
    editorTag: "ulm-custom-card-yagrasdemonde-lights-count-card-editor",
    type: "custom:ulm-custom-card-yagrasdemonde-lights-count-card",
    name: "ULM Custom yagrasdemonde lights count",
    description: "Minimalist custom card port: custom_card_yagrasdemonde_lights_count",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_custom_card_yagrasdemonde_lights_count_color",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_0",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_1",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_many",
      "ulm_custom_card_yagrasdemonde_lights_count_force_background_color",
      "ulm_custom_card_yagrasdemonde_lights_count_icon_off"
    ]
  },
  {
    dir: "custom_chip_group_counter",
    tag: "ulm-custom-chip-group-counter-card",
    editorTag: "ulm-custom-chip-group-counter-card-editor",
    type: "custom:ulm-custom-chip-group-counter-card",
    name: "ULM Custom Chip group counter",
    description: "Minimalist custom card port: custom_chip_group_counter",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_chip_moon",
    tag: "ulm-custom-chip-moon-card",
    editorTag: "ulm-custom-chip-moon-card-editor",
    type: "custom:ulm-custom-chip-moon-card",
    name: "ULM Custom Chip moon",
    description: "Minimalist custom card port: custom_chip_moon",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_chip_myenedis",
    tag: "ulm-custom-chip-myenedis-card",
    editorTag: "ulm-custom-chip-myenedis-card-editor",
    type: "custom:ulm-custom-chip-myenedis-card",
    name: "ULM Custom Chip myenedis",
    description: "Minimalist custom card port: custom_chip_myenedis",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_chip_simple_temp",
    tag: "ulm-custom-chip-simple-temp-card",
    editorTag: "ulm-custom-chip-simple-temp-card-editor",
    type: "custom:ulm-custom-chip-simple-temp-card",
    name: "ULM Custom Chip simple temp",
    description: "Minimalist custom card port: custom_chip_simple_temp",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_chip_tesla_temperature",
    tag: "ulm-custom-chip-tesla-temperature-card",
    editorTag: "ulm-custom-chip-tesla-temperature-card-editor",
    type: "custom:ulm-custom-chip-tesla-temperature-card",
    name: "ULM Custom Chip tesla temperature",
    description: "Minimalist custom card port: custom_chip_tesla_temperature",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_chip_update",
    tag: "ulm-custom-chip-update-card",
    editorTag: "ulm-custom-chip-update-card-editor",
    type: "custom:ulm-custom-chip-update-card",
    name: "ULM Custom Chip update",
    description: "Minimalist custom card port: custom_chip_update",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_chip_update_path",
      "ulm_no_updates_available",
      "ulm_updates_available"
    ]
  },
  {
    dir: "custom_chip_vlape_garage",
    tag: "ulm-custom-chip-vlape-garage-card",
    editorTag: "ulm-custom-chip-vlape-garage-card-editor",
    type: "custom:ulm-custom-chip-vlape-garage-card",
    name: "ULM Custom Chip vlape garage",
    description: "Minimalist custom card port: custom_chip_vlape_garage",
    defaultIcon: "mdi:circle-small",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: []
  },
  {
    dir: "custom_template_shogun160_battery_info",
    tag: "ulm-custom-template-shogun160-battery-info-card",
    editorTag: "ulm-custom-template-shogun160-battery-info-card-editor",
    type: "custom:ulm-custom-template-shogun160-battery-info-card",
    name: "ULM Custom Template shogun160 battery info",
    description: "Minimalist custom card port: custom_template_shogun160_battery_info",
    defaultIcon: "mdi:puzzle",
    defaultColor: "blue",
    stubEntity: "sensor.demo",
    extraKeys: [
      "ulm_battery_entity"
    ]
  }
], kh = /* @__PURE__ */ new Set([
  "ulm-custom-card-afvalophaling-card",
  "ulm-custom-card-alarm-time-card",
  "ulm-custom-card-apexcharts-card",
  "ulm-custom-card-bar-card-card",
  "ulm-custom-card-camera-card",
  "ulm-custom-card-damix48-power-details-card",
  "ulm-custom-card-eraycetinay-lock-card",
  "ulm-custom-card-esh-room-card",
  "ulm-custom-card-httpedo13-sun-card",
  "ulm-custom-card-mpse-printer-card",
  "ulm-custom-card-nik-door-card",
  "ulm-custom-card-scenes-card",
  "ulm-custom-card-tpx01-aircondition-card",
  "ulm-custom-card-input-number-card",
  "ulm-custom-card-input-datetime-card",
  "ulm-custom-card-homeassistant-updates-card",
  "ulm-custom-card-water-heater-card",
  "ulm-custom-card-more-power-outlet-card",
  "ulm-custom-card-saxel-fan-card",
  "ulm-custom-card-schumijo-car-card",
  "ulm-custom-card-nik-nas-card",
  "ulm-custom-card-haven-washer-card",
  "ulm-custom-card-light-colorpick-card",
  "ulm-custom-card-media-player-sonos-card",
  "ulm-custom-card-person-info-card",
  "ulm-custom-card-speedtest-shogun160-card",
  "ulm-custom-card-esh-welcome-card",
  "ulm-custom-card-nas-card",
  "ulm-custom-chip-group-counter-card",
  "ulm-custom-chip-moon-card",
  "ulm-custom-chip-myenedis-card",
  "ulm-custom-chip-simple-temp-card",
  "ulm-custom-chip-tesla-temperature-card",
  "ulm-custom-chip-update-card",
  "ulm-custom-chip-vlape-garage-card",
  "ulm-custom-template-shogun160-battery-info-card",
  "ulm-custom-card-person-chip-card",
  "ulm-custom-card-iabadia-battery-chip-card",
  "ulm-custom-card-battery-chip-card",
  "ulm-custom-card-mpse-wifisignal-card",
  "ulm-custom-card-device-tracker-card",
  "ulm-custom-card-chromecast-card",
  "ulm-custom-card-playstation-card",
  "ulm-custom-card-nik-clock-card",
  "ulm-custom-card-wilbiev-title-card",
  "ulm-custom-card-wilbiev-subtitle-card",
  "ulm-custom-card-yagrasdemonde-lights-count-card",
  "ulm-custom-card-drealine-roomview-card",
  "ulm-custom-card-eraycetinay-elapsed-time-card",
  "ulm-custom-card-heat-pump-card",
  "ulm-custom-card-httpedo13-thermostat-card",
  "ulm-custom-card-imswel-medias-card",
  "ulm-custom-card-imswel-person-card",
  "ulm-custom-card-irmajavi-entities-card",
  "ulm-custom-card-irmajavi-speedtest-card",
  "ulm-custom-card-irmajavi-weather-card",
  "ulm-custom-card-mpse-gauge-card",
  "ulm-custom-card-mpse-thermostat-card",
  "ulm-custom-card-neekster-update-card",
  "ulm-custom-card-nik-tablet-card",
  "ulm-custom-card-paddy-dwd-pollen-card",
  "ulm-custom-card-paddy-waste-collection-card",
  "ulm-custom-card-paddy-welcome-card",
  "ulm-custom-card-person-info-small-card",
  "ulm-custom-card-qubino-card",
  "ulm-custom-card-ristou-person-card",
  "ulm-custom-card-schumijo-flower-card",
  "ulm-custom-card-senoro-win-card",
  "ulm-custom-card-sisimomo-printer-card",
  "ulm-custom-card-vncntdev-device-tracer-card",
  "ulm-custom-card-wsly-pollen-card"
]), Ch = $h.filter(
  (t) => !kh.has(t.tag)
).map(
  (t) => wh({
    tag: t.tag,
    editorTag: t.editorTag,
    type: t.type,
    name: t.name,
    description: t.description,
    defaultIcon: t.defaultIcon,
    defaultColor: t.defaultColor,
    stubEntity: t.stubEntity,
    extraSchema: xh([...t.extraKeys])
  })
);
console.info(
  `%c ULM-EDITABLE-CARDS %c ${nc} `,
  "color: white; background: #434343; font-weight: 700;",
  "color: #434343; background: #FF9101; font-weight: 700;"
);
window.customCards = window.customCards || [];
window.customBadges = window.customBadges || [];
const oc = "https://github.com/UI-Lovelace-Minimalist/UI/tree/main/editable-cards";
function ca(t, e = !0) {
  window.customCards.push({
    ...t,
    preview: e,
    documentationURL: oc
  });
}
function Po(t) {
  const e = {
    ...t,
    preview: !0,
    documentationURL: oc
  };
  window.customCards.push(e), window.customBadges.push({
    ...e,
    description: `${t.description} (also usable as a view badge)`
  });
}
const Sh = [
  {
    type: "ulm-light-card",
    name: "ULM Light",
    description: "Minimalist-inspired light card with UI editor"
  },
  {
    type: "ulm-cover-card",
    name: "ULM Cover",
    description: "Cover/blinds card with controls and slider"
  },
  {
    type: "ulm-person-card",
    name: "ULM Person",
    description: "Person presence card"
  },
  {
    type: "ulm-media-player-card",
    name: "ULM Media Player",
    description: "Media player card with transport controls"
  },
  {
    type: "ulm-thermostat-card",
    name: "ULM Thermostat",
    description: "Climate/thermostat card"
  },
  {
    type: "ulm-fan-card",
    name: "ULM Fan",
    description: "Fan card with speed slider and oscillation"
  },
  {
    type: "ulm-vacuum-card",
    name: "ULM Vacuum",
    description: "Vacuum card with map camera and room script"
  },
  {
    type: "ulm-weather-card",
    name: "ULM Weather",
    description: "Weather card (simple-weather style, no dependency)"
  },
  {
    type: "ulm-weather-ulm-card",
    name: "ULM Weather ULM",
    description: "Native weather card with humidity/temp chips"
  },
  {
    type: "ulm-battery-card",
    name: "ULM Battery",
    description: "Battery level with charging icon and thresholds"
  },
  {
    type: "ulm-binary-sensor-card",
    name: "ULM Binary Sensor",
    description: "Binary sensor with color and last-changed options"
  },
  {
    type: "ulm-binary-sensor-alert-card",
    name: "ULM Binary Sensor Alert",
    description: "Binary sensor with alert badge when on/unavailable"
  },
  {
    type: "ulm-navigate-card",
    name: "ULM Navigate",
    description: "Dashboard navigation shortcut"
  },
  {
    type: "ulm-power-outlet-card",
    name: "ULM Power Outlet",
    description: "Switch/outlet with optional consumption and popup"
  },
  {
    type: "ulm-generic-card",
    name: "ULM Generic",
    description: "Generic sensor card (state primary, name secondary)"
  },
  {
    type: "ulm-generic-swap-card",
    name: "ULM Generic Swap",
    description: "Generic card (name primary, state secondary)"
  },
  {
    type: "ulm-input-boolean-card",
    name: "ULM Input Boolean",
    description: "Toggle input_boolean / switch card"
  },
  {
    type: "ulm-script-card",
    name: "ULM Script",
    description: "Run a script from a compact icon+title card"
  },
  {
    type: "ulm-vertical-button-card",
    name: "ULM Vertical Button",
    description: "Vertical scene/toggle button with active state color"
  },
  {
    type: "ulm-room-card",
    name: "ULM Room",
    description: "Room card with quick entity chips"
  },
  {
    type: "ulm-chips-card",
    name: "ULM Chips Row",
    description: "Row helper for multiple chips"
  },
  {
    type: "ulm-title-card",
    name: "ULM Title",
    description: "Section title and optional subtitle"
  },
  {
    type: "ulm-welcome-card",
    name: "ULM Welcome",
    description: "Welcome card with greeting and navigation shortcuts"
  },
  {
    type: "ulm-custom-card-afvalophaling-card",
    name: "ULM Custom afvalophaling",
    description: "Dutch waste collection schedule card"
  },
  {
    type: "ulm-custom-card-alarm-time-card",
    name: "ULM Custom alarm time",
    description: "Alarm toggle with adjustable input_datetime time"
  },
  {
    type: "ulm-custom-card-apexcharts-card",
    name: "ULM Custom apexcharts",
    description: "Three entities + apexcharts-card (line/scatter/pie/donut/radialBar)"
  },
  {
    type: "ulm-custom-card-bar-card-card",
    name: "ULM Custom bar card",
    description: "Generic header + HACS bar-card progress bar"
  },
  {
    type: "ulm-custom-card-camera-card",
    name: "ULM Custom camera",
    description: "Optional blue title row + live picture-entity camera"
  },
  {
    type: "ulm-custom-card-esh-room-card",
    name: "ULM Custom Room (esh)",
    description: "Rectangular room card with light / climate / cover widgets"
  },
  {
    type: "ulm-custom-card-httpedo13-sun-card",
    name: "ULM Custom Sun",
    description: "Minimalist shell around HACS sun-card (azimuth / elevation / times)"
  },
  {
    type: "ulm-custom-card-damix48-power-details-card",
    name: "ULM Custom Power details",
    description: "Power header + mini-graph-card with hours window and thresholds"
  },
  {
    type: "ulm-custom-card-eraycetinay-lock-card",
    name: "ULM Custom Lock",
    description: "Door lock with tap control, battery and door-open warning badges"
  },
  {
    type: "ulm-custom-card-nik-door-card",
    name: "ULM Custom Minimal Door Lock",
    description: "Nik door lock: state sensor + battery badge + open/lock widgets"
  },
  {
    type: "ulm-custom-card-scenes-card",
    name: "ULM Custom scenes",
    description: "Row of up to 5 scene / script / automation pills"
  },
  {
    type: "ulm-custom-card-mpse-printer-card",
    name: "ULM Custom Printer",
    description: "Printer status header + CMYK toner level bars"
  },
  {
    type: "ulm-custom-card-tpx01-aircondition-card",
    name: "ULM Custom AirCondition",
    description: "Air conditioner with power and temperature controls"
  },
  {
    type: "ulm-custom-card-input-number-card",
    name: "ULM Custom input number",
    description: "Number / counter / select with down-up controls"
  },
  {
    type: "ulm-custom-card-input-datetime-card",
    name: "ULM Custom input datetime",
    description: "Time helper with minute step arrows"
  },
  {
    type: "ulm-custom-card-homeassistant-updates-card",
    name: "ULM Custom Home Assistant updates",
    description: "Core / Supervisor / OS update status + shortcuts"
  },
  {
    type: "ulm-custom-card-water-heater-card",
    name: "ULM Custom water heater",
    description: "Water heater with consumption-driven heating state"
  },
  {
    type: "ulm-custom-card-more-power-outlet-card",
    name: "ULM Custom more power outlet",
    description: "Outlet with power / energy / runtime label"
  },
  {
    type: "ulm-custom-card-saxel-fan-card",
    name: "ULM Custom saxel fan",
    description: "Fan with slider, oscillate button, temp/hum attributes"
  },
  {
    type: "ulm-custom-card-schumijo-car-card",
    name: "ULM Custom schumijo car",
    description: "Car tracker + lock badges with energy/range widgets"
  },
  {
    type: "ulm-custom-card-nik-nas-card",
    name: "ULM Custom nik nas",
    description: "NAS power status + up to 4 metric rows"
  },
  {
    type: "ulm-custom-card-haven-washer-card",
    name: "ULM Custom haven washer",
    description: "Washer power + phase icons + progress bar"
  },
  {
    type: "ulm-custom-card-light-colorpick-card",
    name: "ULM Custom light colorpick",
    description: "Light with brightness slider + RGB preset chips"
  },
  {
    type: "ulm-custom-card-media-player-sonos-card",
    name: "ULM Custom Sonos",
    description: "Sonos media player with volume and play/pause widgets"
  },
  {
    type: "ulm-custom-card-person-info-card",
    name: "ULM Custom person info",
    description: "Person card with zone badge, battery and commute"
  },
  {
    type: "ulm-custom-card-speedtest-shogun160-card",
    name: "ULM Custom speedtest",
    description: "Download / upload / ping gauges (CSS, no apexcharts)"
  },
  {
    type: "ulm-custom-card-esh-welcome-card",
    name: "ULM Custom esh welcome",
    description: "Welcome greeting with weather topbar and nav pills"
  },
  {
    type: "ulm-custom-card-nas-card",
    name: "ULM Custom nas",
    description: "Simple NAS sensor icon_info (blue)"
  },
  {
    type: "ulm-custom-card-mpse-wifisignal-card",
    name: "ULM Custom wifi signal",
    description: "WiFi dBm strength icon_info"
  },
  {
    type: "ulm-custom-card-device-tracker-card",
    name: "ULM Custom device tracker",
    description: "Device tracker with optional source badges"
  },
  {
    type: "ulm-custom-card-chromecast-card",
    name: "ULM Custom chromecast",
    description: "Chromecast media player with power / play / HDMI"
  },
  {
    type: "ulm-custom-card-playstation-card",
    name: "ULM Custom playstation",
    description: "PlayStation media card with cover art"
  },
  {
    type: "ulm-custom-card-nik-clock-card",
    name: "ULM Custom nik clock",
    description: "Large clock + date, optional switch toggle"
  },
  {
    type: "ulm-custom-card-wilbiev-title-card",
    name: "ULM Custom wilbiev title",
    description: "Section title with optional navigate"
  },
  {
    type: "ulm-custom-card-wilbiev-subtitle-card",
    name: "ULM Custom wilbiev subtitle",
    description: "Section subtitle divider"
  },
  {
    type: "ulm-custom-card-yagrasdemonde-lights-count-card",
    name: "ULM Custom lights count",
    description: "Lights / covers count with icon"
  },
  {
    type: "ulm-custom-card-drealine-roomview-card",
    name: "ULM Custom drealine roomview",
    description: "Room overview with sensor alerts and device toggles"
  },
  {
    type: "ulm-custom-card-eraycetinay-elapsed-time-card",
    name: "ULM Custom elapsed time",
    description: "input_datetime elapsed time label (days/hours ago)"
  },
  {
    type: "ulm-custom-card-heat-pump-card",
    name: "ULM Custom heat pump",
    description: "Climate heat pump with temp and HVAC mode widgets"
  },
  {
    type: "ulm-custom-card-httpedo13-thermostat-card",
    name: "ULM Custom httpedo13 thermostat",
    description: "Radiator thermostat with orange heating state"
  },
  {
    type: "ulm-custom-card-imswel-medias-card",
    name: "ULM Custom imswel medias",
    description: "Plex/Radarr/Sonarr recently-added or upcoming artwork"
  },
  {
    type: "ulm-custom-card-imswel-person-card",
    name: "ULM Custom imswel person",
    description: "Person presence with zone badge"
  },
  {
    type: "ulm-custom-card-irmajavi-entities-card",
    name: "ULM Custom irmajavi entities",
    description: "Header status + four metric entities"
  },
  {
    type: "ulm-custom-card-irmajavi-speedtest-card",
    name: "ULM Custom irmajavi speedtest",
    description: "Router speedtest refresh + download/upload tiles"
  },
  {
    type: "ulm-custom-card-irmajavi-weather-card",
    name: "ULM Custom irmajavi weather",
    description: "Weather emoji header + four sensor metrics"
  },
  {
    type: "ulm-custom-card-mpse-gauge-card",
    name: "ULM Custom mpse gauge",
    description: "icon_info header + dual concentric gauge"
  },
  {
    type: "ulm-custom-card-mpse-thermostat-card",
    name: "ULM Custom mpse thermostat",
    description: "Climate header with heat/cool tint and temp arrows"
  },
  {
    type: "ulm-custom-card-neekster-update-card",
    name: "ULM Custom neekster update",
    description: "Update entity status with install/skip actions"
  },
  {
    type: "ulm-custom-card-nik-tablet-card",
    name: "ULM Custom nik tablet",
    description: "Tablet controls, metrics, and battery bar"
  },
  {
    type: "ulm-custom-card-paddy-dwd-pollen-card",
    name: "ULM Custom paddy DWD pollen",
    description: "DWD pollen level with colored icon cell"
  },
  {
    type: "ulm-custom-card-paddy-waste-collection-card",
    name: "ULM Custom paddy waste collection",
    description: "Waste collection days with urgency badge"
  },
  {
    type: "ulm-custom-card-paddy-welcome-card",
    name: "ULM Custom paddy welcome",
    description: "Time-based greeting with optional weather/feed"
  },
  {
    type: "ulm-custom-card-person-info-small-card",
    name: "ULM Custom person info small",
    description: "Compact person card with battery and zone badge"
  },
  {
    type: "ulm-custom-card-qubino-card",
    name: "ULM Custom qubino",
    description: "Fil pilote light with French consigne labels"
  },
  {
    type: "ulm-custom-card-ristou-person-card",
    name: "ULM Custom ristou person",
    description: "Person header with map or camera footer"
  },
  {
    type: "ulm-custom-card-schumijo-flower-card",
    name: "ULM Custom schumijo flower",
    description: "Plant status with attribute meters"
  },
  {
    type: "ulm-custom-card-senoro-win-card",
    name: "ULM Custom senoro win",
    description: "Window contact/handle status with badges"
  },
  {
    type: "ulm-custom-card-sisimomo-printer-card",
    name: "ULM Custom sisimomo printer",
    description: "Printer status with cartridge toner bars"
  },
  {
    type: "ulm-custom-card-vncntdev-device-tracer-card",
    name: "ULM Custom vncntdev device tracer",
    description: "Device online/offline status row"
  },
  {
    type: "ulm-custom-card-wsly-pollen-card",
    name: "ULM Custom wsly pollen",
    description: "Tree/grass/weed pollen columns"
  }
];
for (const t of Sh)
  ca(t);
for (const { def: t } of nh)
  ca({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
for (const t of ch)
  Po({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
for (const t of bh)
  Po({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
Po({
  type: "ulm-custom-card-person-chip-card",
  name: "ULM Custom person chip",
  description: "Person picture + state chip"
});
Po({
  type: "ulm-custom-card-battery-chip-card",
  name: "ULM Custom battery chip",
  description: "Battery level icon chip (green/yellow/red)"
});
Po({
  type: "ulm-custom-card-iabadia-battery-chip-card",
  name: "ULM Custom iAbadia battery chip",
  description: "Alias of battery chip (legacy type name)"
});
for (const { def: t } of Ch)
  ca(
    {
      type: t.type.replace(/^custom:/, ""),
      name: t.name,
      description: t.description
    },
    !1
  );
