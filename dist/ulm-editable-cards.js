const Tc = "0.21.32";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = globalThis, cn = er.ShadowRoot && (er.ShadyCSS === void 0 || er.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ln = Symbol(), Ia = /* @__PURE__ */ new WeakMap();
let _c = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== ln) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (cn && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = Ia.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Ia.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Dc = (t) => new _c(typeof t == "string" ? t : t + "", void 0, ln), $ = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, r, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new _c(i, t, ln);
}, Uc = (t, e) => {
  if (cn) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), r = er.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, t.appendChild(o);
  }
}, ja = cn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return Dc(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bc, defineProperty: Fc, getOwnPropertyDescriptor: Hc, getOwnPropertyNames: Rc, getOwnPropertySymbols: Gc, getPrototypeOf: Wc } = Object, Ht = globalThis, Aa = Ht.trustedTypes, Kc = Aa ? Aa.emptyScript : "", Vc = Ht.reactiveElementPolyfillSupport, si = (t, e) => t, ir = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Kc : null;
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
} }, dn = (t, e) => !Bc(t, e), Ta = { attribute: !0, type: String, converter: ir, reflect: !1, useDefault: !1, hasChanged: dn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ht.litPropertyMetadata ?? (Ht.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $e = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ta) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, i);
      r !== void 0 && Fc(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: r, set: n } = Hc(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const s = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ta;
  }
  static _$Ei() {
    if (this.hasOwnProperty(si("elementProperties"))) return;
    const e = Wc(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(si("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(si("properties"))) {
      const i = this.properties, o = [...Rc(i), ...Gc(i)];
      for (const r of o) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, r] of i) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const r = this._$Eu(i, o);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const r of o) i.unshift(ja(r));
    } else e !== void 0 && i.push(ja(e));
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
    return Uc(e, this.constructor.elementStyles), e;
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
    const o = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, o);
    if (r !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : ir).toAttribute(i, o.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = o.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ir;
      this._$Em = r;
      const s = a.fromAttribute(i, n.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), o ?? (o = a.getPropertyOptions(e)), !((o.hasChanged ?? dn)(n, i) || o.useDefault && o.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: r, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, s = this[r];
        a !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, n, s);
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
$e.elementStyles = [], $e.shadowRootOptions = { mode: "open" }, $e[si("elementProperties")] = /* @__PURE__ */ new Map(), $e[si("finalized")] = /* @__PURE__ */ new Map(), Vc?.({ ReactiveElement: $e }), (Ht.reactiveElementVersions ?? (Ht.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ci = globalThis, Da = (t) => t, or = ci.trustedTypes, Ua = or ? or.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hc = "$lit$", Ft = `lit$${Math.random().toFixed(9).slice(2)}$`, pc = "?" + Ft, qc = `<${pc}>`, Qt = document, ui = () => Qt.createComment(""), mi = (t) => t === null || typeof t != "object" && typeof t != "function", un = Array.isArray, Yc = (t) => un(t) || typeof t?.[Symbol.iterator] == "function", $r = `[ 	
\f\r]`, Fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ba = /-->/g, Fa = />/g, Gt = RegExp(`>|${$r}(?:([^\\s"'>=/]+)(${$r}*=${$r}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ha = /'/g, Ra = /"/g, gc = /^(?:script|style|textarea|title)$/i, fc = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = fc(1), nr = fc(2), Rt = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ga = /* @__PURE__ */ new WeakMap(), Xt = Qt.createTreeWalker(Qt, 129);
function bc(t, e) {
  if (!un(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ua !== void 0 ? Ua.createHTML(e) : e;
}
const Jc = (t, e) => {
  const i = t.length - 1, o = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Fe;
  for (let s = 0; s < i; s++) {
    const l = t[s];
    let p, m, g = -1, v = 0;
    for (; v < l.length && (a.lastIndex = v, m = a.exec(l), m !== null); ) v = a.lastIndex, a === Fe ? m[1] === "!--" ? a = Ba : m[1] !== void 0 ? a = Fa : m[2] !== void 0 ? (gc.test(m[2]) && (r = RegExp("</" + m[2], "g")), a = Gt) : m[3] !== void 0 && (a = Gt) : a === Gt ? m[0] === ">" ? (a = r ?? Fe, g = -1) : m[1] === void 0 ? g = -2 : (g = a.lastIndex - m[2].length, p = m[1], a = m[3] === void 0 ? Gt : m[3] === '"' ? Ra : Ha) : a === Ra || a === Ha ? a = Gt : a === Ba || a === Fa ? a = Fe : (a = Gt, r = void 0);
    const x = a === Gt && t[s + 1].startsWith("/>") ? " " : "";
    n += a === Fe ? l + qc : g >= 0 ? (o.push(p), l.slice(0, g) + hc + l.slice(g) + Ft + x) : l + Ft + (g === -2 ? s : x);
  }
  return [bc(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class _i {
  constructor({ strings: e, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const s = e.length - 1, l = this.parts, [p, m] = Jc(e, i);
    if (this.el = _i.createElement(p, o), Xt.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Xt.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(hc)) {
          const v = m[a++], x = r.getAttribute(g).split(Ft), L = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: n, name: L[2], strings: x, ctor: L[1] === "." ? Xc : L[1] === "?" ? Qc : L[1] === "@" ? tl : ar }), r.removeAttribute(g);
        } else g.startsWith(Ft) && (l.push({ type: 6, index: n }), r.removeAttribute(g));
        if (gc.test(r.tagName)) {
          const g = r.textContent.split(Ft), v = g.length - 1;
          if (v > 0) {
            r.textContent = or ? or.emptyScript : "";
            for (let x = 0; x < v; x++) r.append(g[x], ui()), Xt.nextNode(), l.push({ type: 2, index: ++n });
            r.append(g[v], ui());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pc) l.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(Ft, g + 1)) !== -1; ) l.push({ type: 7, index: n }), g += Ft.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const o = Qt.createElement("template");
    return o.innerHTML = e, o;
  }
}
function Ce(t, e, i = t, o) {
  if (e === Rt) return e;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const n = mi(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = r : i._$Cl = r), r !== void 0 && (e = Ce(t, r._$AS(t, e.values), r, o)), e;
}
class Zc {
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
    const { el: { content: i }, parts: o } = this._$AD, r = (e?.creationScope ?? Qt).importNode(i, !0);
    Xt.currentNode = r;
    let n = Xt.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new zo(n, n.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (p = new el(n, this, e)), this._$AV.push(p), l = o[++s];
      }
      a !== l?.index && (n = Xt.nextNode(), a++);
    }
    return Xt.currentNode = Qt, r;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class zo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = Ce(this, e, i), mi(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== Rt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Yc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && mi(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Qt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = _i.createElement(bc(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Zc(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Ga.get(e.strings);
    return i === void 0 && Ga.set(e.strings, i = new _i(e)), i;
  }
  k(e) {
    un(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const n of e) r === i.length ? i.push(o = new zo(this.O(ui()), this.O(ui()), this, this.options)) : o = i[r], o._$AI(n), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = Da(e).nextSibling;
      Da(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ar {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, r, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = u;
  }
  _$AI(e, i = this, o, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = Ce(this, e, i, 0), a = !mi(e) || e !== this._$AH && e !== Rt, a && (this._$AH = e);
    else {
      const s = e;
      let l, p;
      for (e = n[0], l = 0; l < n.length - 1; l++) p = Ce(this, s[o + l], i, l), p === Rt && (p = this._$AH[l]), a || (a = !mi(p) || p !== this._$AH[l]), p === u ? e = u : e !== u && (e += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xc extends ar {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Qc extends ar {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class tl extends ar {
  constructor(e, i, o, r, n) {
    super(e, i, o, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ce(this, e, i, 0) ?? u) === Rt) return;
    const o = this._$AH, r = e === u && o !== u || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== u && (o === u || r);
    r && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class el {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ce(this, e);
  }
}
const il = ci.litHtmlPolyfillSupport;
il?.(_i, zo), (ci.litHtmlVersions ?? (ci.litHtmlVersions = [])).push("3.3.3");
const ol = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    o._$litPart$ = r = new zo(e.insertBefore(ui(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = globalThis;
let w = class extends $e {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ol(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Rt;
  }
};
w._$litElement$ = !0, w.finalized = !0, li.litElementHydrateSupport?.({ LitElement: w });
const rl = li.litElementPolyfillSupport;
rl?.({ LitElement: w });
(li.litElementVersions ?? (li.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nl = { attribute: !0, type: String, converter: ir, reflect: !1, hasChanged: dn }, al = (t = nl, e, i) => {
  const { kind: o, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), o === "accessor") {
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
function k(t) {
  return (e, i) => typeof i == "object" ? al(t, e, i) : ((o, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(t) {
  return k({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sl = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ae(t, e) {
  return (i, o, r) => {
    const n = (a) => a.renderRoot?.querySelector(t) ?? null;
    return sl(i, o, { get() {
      return n(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mn = { ATTRIBUTE: 1, CHILD: 2 }, _n = (t) => (...e) => ({ _$litDirective$: t, values: e });
let hn = class {
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
const yc = "important", cl = " !" + yc, d = _n(class extends hn {
  constructor(t) {
    if (super(t), t.type !== mn.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const r = e[o];
      if (r != null) {
        this.ft.add(o);
        const n = typeof r == "string" && r.endsWith(cl);
        o.includes("-") || n ? i.setProperty(o, n ? r.slice(0, -11) : r, n ? yc : "") : i[o] = r;
      }
    }
    return Rt;
  }
}), Wa = {
  yellow: "255, 145, 1",
  blue: "61, 90, 254",
  green: "1, 200, 82",
  red: "245, 68, 54",
  pink: "233, 30, 99",
  purple: "102, 31, 255",
  grey: "187, 187, 187"
}, Lt = [
  "yellow",
  "blue",
  "green",
  "red",
  "pink",
  "purple",
  "grey"
];
function b(t, e = "blue") {
  return getComputedStyle(t).getPropertyValue(`--color-${e}`).trim() || Wa[e] || Wa.blue;
}
function V(t, e, i, o, r = !1, n = !1) {
  if (!e)
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  if (n)
    return {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)"
    };
  const a = r && o ? o.join(", ") : b(t, i);
  return {
    color: `rgba(${a}, 1)`,
    backgroundColor: `rgba(${a}, 0.2)`
  };
}
const ll = {
  select: {
    mode: "dropdown",
    options: Lt.map((t) => ({ value: t, label: t }))
  }
};
function _(t = "entity", e, i = !0) {
  return {
    name: t,
    required: i,
    selector: {
      entity: e ? { domain: Array.isArray(e) ? e : [e] } : {}
    }
  };
}
function h(t) {
  return { name: t, selector: { text: {} } };
}
function E(t = "icon") {
  return { name: t, selector: { icon: {} } };
}
function f(t) {
  return { name: t, selector: { boolean: {} } };
}
function N(t) {
  return { name: t, selector: { number: { mode: "box", step: 1 } } };
}
function B(t = "color") {
  return { name: t, selector: ll };
}
function K(t, e, i = "dropdown") {
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
function dl(t, e, i, o = !0) {
  return {
    type: "expandable",
    name: t,
    title: e,
    flatten: o,
    schema: i
  };
}
function U(t) {
  return {
    type: "grid",
    name: "",
    flatten: !0,
    schema: t
  };
}
function ul(t) {
  return {
    schema: [
      _("entity", t?.domain),
      U([h("name"), E("icon")]),
      B("color"),
      f("force_background_color"),
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
function S(t) {
  return (e) => t[e.name || ""] || void 0;
}
function z(t) {
  return (e) => t[e.name || ""] || void 0;
}
const sr = $`
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
`, P = $`
  ${sr}

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
    /* Kill native focus / thumb chrome that shows as a white dot */
    outline: none;
    color: transparent;
  }

  .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
    height: 42px;
    border-radius: 14px;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .slider-wrap input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .slider-wrap input[type="range"]::-moz-range-track {
    height: 42px;
    border-radius: 14px;
    background: transparent;
    border: none;
  }

  .slider-wrap input[type="range"]::-moz-range-thumb {
    width: 0;
    height: 0;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  .slider-wrap input[type="range"]::-moz-focus-outer {
    border: 0;
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
$`
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
async function kr(t, e, i, o, r) {
  const n = JSON.stringify(i), a = t.dataset.ulmCardKey;
  if (o && a === n && o.isConnected)
    return o.hass = e, o;
  const s = r || (typeof i.type == "string" && i.type.startsWith("custom:") ? i.type.replace(/^custom:/, "") : void 0);
  let l = null;
  try {
    const p = window, m = !r && typeof i.type == "string" && !i.type.startsWith("custom:");
    if (!m && s && (customElements.get(s) || await Promise.race([
      customElements.whenDefined(s),
      new Promise(
        (g, v) => setTimeout(() => v(new Error("timeout")), 2500)
      )
    ]).catch(() => {
    }), customElements.get(s) && (l = document.createElement(s), typeof l.setConfig == "function"))) {
      const { type: g, ...v } = i;
      l.setConfig(v);
    }
    if (!l && typeof p.loadCardHelpers == "function") {
      const v = (await p.loadCardHelpers()).createCardElement(i);
      (!s || m || v.localName === s || v.localName === `hui-${s}-card`) && (l = v);
    }
  } catch {
    l = null;
  }
  return l ? (l.hass = e, t.replaceChildren(l), t.dataset.ulmCardKey = n, t.classList.add("has-card"), l) : (t.classList.remove("has-card"), delete t.dataset.ulmCardKey, null);
}
function ml(t) {
  return {
    type: "custom:light-entity-card",
    entity: t,
    persist_features: !0,
    brightness: !1,
    color_temp: !1,
    white_value: !1,
    effects_list: !1,
    hide_header: !0,
    smooth_color_wheel: !0,
    consolidate_entities: !0,
    child_card: !0
  };
}
function _l(t) {
  return {
    type: "custom:weather-radar-card",
    zoom_level: 9,
    data_source: "RainViewer-Meteored",
    show_marker: !0,
    map_style: t ? "dark" : "light"
  };
}
function W(t) {
  return t && t.charAt(0).toUpperCase() + t.slice(1);
}
function vc(t) {
  return typeof t == "number" ? Math.round(t / 255 * 100) : void 0;
}
function se(t) {
  return c`<div class="ulm-ph">
    <div
      class="ulm-ph-icon"
      style=${[
    t.iconColor ? `color:${t.iconColor}` : "",
    t.iconBg ? `background:${t.iconBg}` : ""
  ].filter(Boolean).join(";")}
    >
      <ha-icon .icon=${t.icon || "mdi:information"}></ha-icon>
    </div>
    <div class="ulm-ph-name">${t.name}</div>
    <div class="ulm-ph-label">${t.label}</div>
  </div>`;
}
function H(t) {
  const e = t.variant || "default";
  return c`<button
    class="ulm-pb ulm-pb--${e}"
    @click=${t.onClick}
    type="button"
  >
    <span
      class="ulm-pb-icon"
      style=${[
    t.iconColor ? `color:${t.iconColor}` : "",
    t.iconBg ? `background:${t.iconBg}` : ""
  ].filter(Boolean).join(";")}
    >
      <ha-icon .icon=${t.icon}></ha-icon>
    </span>
    <span class="ulm-pb-name">${t.name}</span>
  </button>`;
}
function ct(t) {
  return c`<div class="ulm-pf">
    ${H({
    icon: "mdi:arrow-left",
    name: t.backLabel || "Back",
    onClick: t.onBack,
    variant: "back"
  })}
    ${t.onPower ? H({
    icon: "mdi:power",
    name: t.powerLabel || "Power",
    onClick: t.onPower,
    variant: "power"
  }) : u}
    ${t.extra ?? u}
  </div>`;
}
function Eo(t) {
  const e = t.min ?? 0, i = t.max ?? 100, r = Math.max(
    0,
    Math.min(100, (t.value - e) / (i - e || 1) * 100)
  ), n = t.temperature ? "background: linear-gradient(180deg, #f3db6d, #fff, #c9f2fc)" : t.track ? `background:${t.track}` : "", a = t.height || "280px", s = t.width || "100px", l = t.thumbWidth ?? 50, p = [
    `height:${r}%`,
    t.fill ? `background:${t.fill}` : "",
    t.flipped ? "top:0;bottom:auto" : "bottom:0;top:auto"
  ].filter(Boolean).join(";"), m = [
    t.flipped ? `top:calc(${r}% - 2px);bottom:auto` : `bottom:calc(${r}% - 2px);top:auto`,
    `width:${t.temperature ? 0 : l}px`,
    t.temperature ? "height:0" : ""
  ].filter(Boolean).join(";"), g = t.flipped ? i + e - t.value : t.value, v = (x) => t.flipped ? i + e - x : x;
  return c`<div class="ulm-vslider" style="height:${a};width:${s}">
    <div class="ulm-vslider-track" style="height:${a};width:${s};${n}">
      ${t.temperature ? u : c`<div class="ulm-vslider-fill" style=${p}></div>`}
      <div class="ulm-vslider-thumb" style=${m}></div>
      <input
        type="range"
        min=${e}
        max=${i}
        .value=${String(g)}
        @input=${(x) => {
    const L = v(Number(x.target.value));
    t.onInput?.(L);
  }}
        @change=${(x) => t.onChange(v(Number(x.target.value)))}
      />
    </div>
  </div>`;
}
function pn(t) {
  return c`<button
    class="ulm-list-row ${t.active ? "active" : ""}"
    @click=${t.onClick}
    type="button"
  >
    <span>${t.label}</span>
    ${t.active ? c`<ha-icon icon="mdi:check"></ha-icon>` : u}
  </button>`;
}
function hl(t) {
  const o = (t.hue - 90) * Math.PI / 180, r = t.sat / 100 * 98, n = 110 + Math.cos(o) * r, a = 110 + Math.sin(o) * r, s = (l) => {
    const m = l.currentTarget.getBoundingClientRect(), g = l.clientX - m.left - 110, v = l.clientY - m.top - 110, x = Math.sqrt(g * g + v * v), L = 98, A = Math.min(x, L);
    let O = Math.atan2(v, g) * 180 / Math.PI + 90;
    O < 0 && (O += 360);
    const I = Math.round(A / L * 100);
    t.onPick(Math.round(O) % 360, I);
  };
  return c`<div
    class="ulm-wheel"
    style="width:${220}px;height:${220}px"
    @pointerdown=${(l) => {
    l.currentTarget.setPointerCapture(l.pointerId), s(l);
  }}
    @pointermove=${(l) => {
    (l.buttons & 1) !== 0 && s(l);
  }}
  >
    <div class="ulm-wheel-disc"></div>
    <div
      class="ulm-wheel-marker"
      style="left:${n}px;top:${a}px;background:hsl(${t.hue},${t.sat}%,50%)"
    ></div>
  </div>`;
}
const pl = $`
  ${sr}

  :host {
    display: contents;
    font: inherit;
    color: var(--primary-text-color);
  }

  /* display:contents can drop :host custom props in some browsers — mirror on .dialog */
  .dialog {
    --ulm-color-theme: var(--color-theme, 51, 51, 51);
    --ulm-color-yellow: var(--color-yellow, 255, 145, 1);
    --ulm-color-blue: var(--color-blue, 61, 90, 254);
    --ulm-color-green: var(--color-green, 1, 200, 82);
    --ulm-color-red: var(--color-red, 245, 68, 54);
    --ulm-color-grey: var(--color-grey, 187, 187, 187);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: grid;
    place-items: center;
    z-index: 10000;
    padding: 0;
    box-sizing: border-box;
  }

  /* browser_mod large + hide_header feel */
  .dialog {
    width: min(1000px, 100vw);
    height: min(100vh, 100dvh);
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--primary-background-color, #fafafa);
    color: var(--primary-text-color);
    border-radius: 0;
    box-shadow: none;
    padding: 2%;
    box-sizing: border-box;
    overflow: hidden;
  }

  @media (min-width: 801px) {
    .dialog {
      width: min(1000px, 96vw);
      height: min(90vh, 900px);
      border-radius: var(--border-radius, 20px);
      padding: 1.5% 2%;
    }
  }

  .dialog-close {
    position: absolute;
    top: 10px;
    right: 12px;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    z-index: 2;
    opacity: 0.55;
  }

  .dialog-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* Generic Minimalist popup grid: header / body / footer */
  .ulm-grid {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-rows: 16vh 56vh 14vh;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "body"
      "footer";
    column-gap: 24px;
    row-gap: 0;
  }

  /* Thermostat-style: modes strip always visible (also on desktop).
     Use fr (not vh) so rows fit inside the dialog — vh was clipping the footer. */
  .ulm-grid.with-buttons {
    grid-template-rows: 16fr 42fr 14fr 18fr;
    grid-template-areas:
      "header"
      "body"
      "buttons"
      "footer";
    height: 100%;
  }
  .ulm-grid.with-buttons .area-buttons {
    display: grid;
    place-items: center;
    align-content: start;
  }
  .ulm-grid.with-buttons .area-footer {
    margin-top: 8px;
    align-content: start;
  }

  .ulm-grid.cols-2 {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "header header"
      "body side"
      "footer footer";
  }

  /* Media infos: no mobile “buttons” strip (volume is a chip; side slider on desktop) */
  .ulm-grid.media-infos {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "header header"
      "body side"
      "footer footer";
  }
  .ulm-grid.media-volume,
  .ulm-grid.media-sources {
    grid-template-areas:
      "header"
      "body"
      "footer";
  }

  .ulm-grid.cols-3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "header header header"
      "c1 c2 c3"
      "footer footer footer";
  }

  .ulm-grid.outlet {
    grid-template-rows: 16vh 12vh 44vh 14vh;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header header"
      "tiles tiles"
      "graph log"
      "footer footer";
    column-gap: 30px;
  }

  .area-header {
    grid-area: header;
    display: grid;
    place-items: center;
    align-content: center;
  }
  .area-body {
    grid-area: body;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: auto;
  }
  .area-side {
    grid-area: side;
    min-height: 0;
    display: grid;
    place-items: center;
  }
  .area-c1 {
    grid-area: c1;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-c2 {
    grid-area: c2;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-c3 {
    grid-area: c3;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-tiles {
    grid-area: tiles;
    min-height: 0;
  }
  .area-graph {
    grid-area: graph;
    min-height: 0;
  }
  .area-log {
    grid-area: log;
    min-height: 0;
    overflow: auto;
  }
  .area-footer {
    grid-area: footer;
    display: grid;
    align-content: start;
    padding-top: 12px;
  }
  .area-buttons {
    grid-area: buttons;
    display: none;
  }

  @media (max-width: 800px) {
    .ulm-grid,
    .ulm-grid.cols-2,
    .ulm-grid.cols-3 {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 52vh 14vh 14vh;
      grid-template-areas:
        "header"
        "body"
        "buttons"
        "footer";
    }
    .ulm-grid.with-buttons {
      grid-template-rows: 16fr 48fr 14fr 18fr;
    }
    .ulm-grid.media-infos {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 56vh 28vh;
      grid-template-areas:
        "header"
        "body"
        "footer";
    }
    .ulm-grid.media-infos .area-side {
      display: none !important;
    }
    .ulm-grid.media-volume,
    .ulm-grid.media-sources {
      grid-template-rows: 16vh 56vh 14vh;
      grid-template-areas:
        "header"
        "body"
        "footer";
    }
    .ulm-grid.outlet {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 12vh 40vh 14vh 14vh;
      grid-template-areas:
        "header"
        "tiles"
        "graph"
        "buttons"
        "footer";
    }
    .area-side,
    .area-c2,
    .area-c3,
    .area-log {
      display: none !important;
    }
    .area-buttons {
      display: grid;
      place-items: center;
    }
    .area-c1 {
      grid-area: body;
    }
  }

  /* Header */
  .ulm-ph {
    display: grid;
    justify-items: center;
    gap: 0;
    text-align: center;
  }
  .ulm-ph-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    color: var(--color-theme, inherit);
  }
  .ulm-ph-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .ulm-ph-name {
    margin-top: 6px;
    font-weight: 700;
    font-size: 14px;
  }
  .ulm-ph-label {
    font-weight: 700;
    font-size: 12px;
    opacity: 0.4;
  }

  /* Footer buttons */
  .ulm-pf {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }
  .ulm-pb {
    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    display: grid;
    justify-items: center;
    padding: 12px;
    min-width: 72px;
  }
  .ulm-pb-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    color: var(--primary-color);
  }
  .ulm-pb-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .ulm-pb-name {
    margin-top: 12px;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
  }
  .ulm-pb--back .ulm-pb-icon {
    background: none;
    box-shadow: none;
    border: 1px solid rgba(var(--ulm-color-theme), 0.25);
  }
  .ulm-pb--back .ulm-pb-name {
    text-transform: uppercase;
    color: rgba(var(--ulm-color-theme), 0.5);
    font-size: 12px;
  }
  .ulm-pb--power .ulm-pb-icon {
    background: var(--primary-color);
    color: var(--card-background-color);
    box-shadow: none;
  }
  .ulm-pb--power .ulm-pb-name {
    text-transform: uppercase;
    color: rgba(var(--ulm-color-theme), 0.5);
    font-size: 12px;
  }
  .ulm-pb--selected .ulm-pb-icon {
    background: rgba(var(--ulm-color-blue), 0.2);
    color: rgba(var(--ulm-color-blue), 1);
  }

  /* Thermostat mode strip (YAML: rounded bar, icon-only widget_icon chips) */
  .ulm-mode-bar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 4px;
    width: 50%;
    max-width: 420px;
    margin: 0 auto;
    padding: 4px;
    border-radius: 21px;
    background: rgba(51, 51, 51, 0.1);
    box-sizing: border-box;
  }
  @media (max-width: 800px) {
    .ulm-mode-bar {
      width: 100%;
      max-width: none;
    }
  }
  .ulm-mode-chip {
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;
    display: grid;
    place-items: center;
    padding: 0;
    flex: 0 0 auto;
  }
  .ulm-mode-chip.active {
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    transform: scale(0.95);
  }
  .ulm-mode-chip ha-icon {
    --mdc-icon-size: 20px;
  }

  /* Thermostat dial: fit fully in body (no bottom clip), no drag-scroll */
  .thermo-popup .area-body {
    overflow: hidden;
    overscroll-behavior: none;
    container-type: size;
    align-content: center;
  }

  /* Desktop: gap under dial + a bit more body height for the circle */
  @media (min-width: 801px) {
    .thermo-popup.ulm-grid.with-buttons {
      row-gap: 16px;
      grid-template-rows: 14fr 46fr 14fr 16fr;
    }
    .thermo-popup .area-buttons {
      align-content: center;
    }
  }

  /* Size to body height so the full circle stays visible */
  ulm-thermo-embed {
    display: block;
    width: min(320px, 100%, 100cqh);
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1;
    justify-self: center;
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
  }

  .ulm-list-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    height: 42px;
    width: min(40vh, 100%);
    box-sizing: border-box;
    border: 1px solid rgba(var(--ulm-color-theme), 0.2);
    border-radius: 14px;
    padding: 2px 12px;
    background: transparent;
    box-shadow: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }
  .ulm-list-row span {
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
    color: rgba(var(--ulm-color-theme), 0.5);
  }
  .ulm-list-row.active {
    outline: none;
    background: rgba(var(--ulm-color-blue), 0.1);
  }
  .ulm-list-row.active span {
    color: rgba(var(--ulm-color-blue), 1);
  }

  /* Vertical slider (Minimalist my-slider-v2 look) */
  .ulm-vslider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    width: 100px;
    flex-shrink: 0;
  }
  .ulm-vslider-track {
    position: relative;
    width: 100px;
    height: 280px;
    border-radius: 14px;
    border: 2px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    background: rgba(51, 51, 51, 0.09);
    overflow: hidden;
    box-sizing: border-box;
  }
  .ulm-vslider-fill {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(255, 145, 1, 1);
    pointer-events: none;
    z-index: 1;
  }
  .ulm-vslider-thumb {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 5px;
    background: #fff;
    border-radius: 0 0 10px 10px;
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
  .ulm-vslider-track input[type="range"] {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 280px;
    height: 100px;
    margin: 0;
    padding: 0;
    transform: translate(-50%, -50%) rotate(-90deg);
    transform-origin: center;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    z-index: 3;
    opacity: 0;
    outline: none;
  }
  .ulm-vslider-track input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 48px;
    height: 48px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .ulm-vslider-track input[type="range"]::-moz-range-thumb {
    width: 48px;
    height: 48px;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .ulm-list {
    display: grid;
    gap: 8px;
    justify-items: center;
    width: 100%;
    max-height: 48vh;
    overflow: auto;
  }

  .ulm-mode-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    width: 100%;
  }

  .ulm-tile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
  }
  .ulm-tile {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 0 12px;
    align-items: center;
    background: var(--card-background-color);
    border-radius: var(--border-radius, 20px);
    box-shadow: var(--box-shadow);
    padding: 12px;
    border: 0;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    max-width: 300px;
    width: 100%;
    justify-self: center;
  }
  .ulm-tile-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(var(--ulm-color-theme), 0.05);
  }
  .ulm-tile-name {
    font-weight: 700;
    font-size: 14px;
  }
  .ulm-tile-label {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.4;
  }

  .embed-host,
  .ulm-embed-host {
    width: 100%;
    max-width: 420px;
    min-height: 0;
  }
  .embed-host.wide,
  .ulm-embed-host.wide {
    max-width: 100%;
  }
  .embed-host.vacuum {
    max-width: 40vh;
  }
  .ulm-embed-host[data-ulm-embed="light-bright"],
  .ulm-embed-host[data-ulm-embed="light-temp"],
  .ulm-embed-host[data-ulm-embed="cover-slider"],
  .ulm-embed-host[data-ulm-embed="media-vol"] {
    width: 100px;
    height: 280px;
    display: grid;
    place-items: center;
  }
  .ulm-embed-host[data-ulm-embed="light-bright"] > *,
  .ulm-embed-host[data-ulm-embed="light-temp"] > *,
  .ulm-embed-host[data-ulm-embed="cover-slider"] > * {
    width: 100px !important;
    height: 280px !important;
    display: block;
  }
  .ulm-embed-host[data-ulm-embed="media-vol"] {
    height: 30vh;
    width: calc(30vh / 2.8);
  }
  .ulm-embed-host[data-ulm-embed="light-color"] {
    width: min(260px, 100%);
    min-height: 220px;
  }
  .ulm-embed-host[data-ulm-embed="media-art"] {
    width: 25vh;
    height: 25vh;
    max-width: 220px;
    max-height: 220px;
  }
  .ulm-embed-host[data-ulm-embed="weather-radar"] {
    width: 100%;
    height: 350px;
    max-width: 100%;
    border-radius: 20px;
    overflow: hidden;
  }
  /* Hide Lit fallback only once a real card is mounted into the host */
  .ulm-embed-host.has-card:not(:empty) + .ulm-embed-fallback {
    display: none !important;
  }
  /* Keep fallback visible while host is empty (Lit cleared children mid-update) */
  .ulm-embed-fallback {
    display: grid;
    place-items: center;
  }

  /* Color wheel */
  .ulm-wheel {
    position: relative;
    border-radius: 50%;
    touch-action: none;
    cursor: crosshair;
  }
  .ulm-wheel-disc {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 90deg,
      hsl(0, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(360, 100%, 50%)
    );
    mask: radial-gradient(circle, transparent 18%, #000 19%);
    -webkit-mask: radial-gradient(circle, transparent 18%, #000 19%);
  }
  .ulm-wheel-marker {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Media layout */
  .media-panel {
    width: min(370px, calc(100vw - 60px));
    display: grid;
    gap: 8px;
    justify-items: center;
    padding: 12px 1% 8px;
    border-radius: var(--border-radius, 20px);
    background: var(--card-background-color);
    box-shadow: var(--box-shadow);
    box-sizing: border-box;
  }
  .media-app {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 0 12px;
    align-items: center;
    width: 100%;
    justify-self: stretch;
  }
  .media-app-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid;
    display: grid;
    place-items: center;
    box-sizing: border-box;
  }
  .media-app-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .media-app-name {
    font-weight: 700;
    font-size: 14px;
  }
  .media-app-label {
    font-weight: 700;
    font-size: 12px;
    opacity: 0.4;
  }

  .media-art {
    width: min(25vh, 220px);
    height: min(25vh, 220px);
    min-width: min(25vh, 220px);
    min-height: min(25vh, 220px);
    max-width: 220px;
    max-height: 220px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center;
    background: rgba(51, 51, 51, 0.06);
    flex-shrink: 0;
  }
  .media-art-empty {
    display: grid;
    place-items: center;
  }
  .media-art-empty ha-icon {
    --mdc-icon-size: 48px;
    opacity: 0.45;
  }
  .media-meta {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    display: grid;
    gap: 4px;
    justify-items: stretch;
    overflow: hidden;
    padding: 0 4px;
  }
  .media-title {
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-artist {
    font-size: 12px;
    opacity: 0.55;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-progress {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 4px;
    margin: 6px 0 0;
    padding: 0;
    border: 0;
    border-radius: 2px;
    background: rgba(51, 51, 51, 0.12);
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
  }
  .media-progress > div {
    height: 100%;
    background: blue;
  }
  .media-runtime {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    font-size: 11px;
    line-height: 1.2;
    opacity: 0.45;
    font-variant-numeric: tabular-nums;
  }
  .media-runtime > span {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-runtime > span:last-child {
    text-align: right;
  }
  .media-chips {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
    width: 100%;
  }
  /* popup_chip_controls */
  .media-controls-chip {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 4px;
    height: 42px;
    padding: 0 10px;
    border-radius: 21px;
    border: 1px solid rgba(51, 51, 51, 0.5);
    background: none;
    box-sizing: border-box;
  }
  .media-controls-chip button {
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    padding: 6px;
    display: grid;
    place-items: center;
  }
  .media-controls-chip button ha-icon {
    --mdc-icon-size: 22px;
  }
  /* popup_chip_volume */
  .media-volume-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 42px;
    padding: 0 14px 0 8px;
    border-radius: 21px;
    border: 1px solid rgba(51, 51, 51, 0.25);
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    box-sizing: border-box;
  }
  .media-volume-chip ha-icon {
    --mdc-icon-size: 20px;
  }
  .media-source-list {
    max-width: 42vh;
    width: 100%;
  }

  .forecast-hero {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 42px;
    font-weight: 700;
  }
  .forecast-list {
    width: min(420px, 100%);
    display: grid;
    gap: 6px;
  }
  .forecast-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--card-background-color);
    box-shadow: var(--box-shadow);
    font-size: 13px;
  }
  .forecast-row .left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .forecast-row .temp-pills {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .forecast-row .pill {
    display: inline-grid;
    place-items: center;
    min-width: 48px;
    height: 30px;
    padding: 0 8px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
  }
  .forecast-row .pill.low {
    background: rgba(var(--ulm-color-blue), 1);
  }
  .forecast-row .pill.high {
    background: rgba(var(--ulm-color-red), 1);
  }

  .radar-frame {
    width: 100%;
    height: 48vh;
    border: 0;
    border-radius: var(--border-radius, 20px);
    background: rgba(var(--ulm-color-theme), 0.06);
  }

  .muted {
    opacity: 0.55;
    font-size: 13px;
    text-align: center;
  }

  .history-list {
    display: grid;
    gap: 6px;
    font-size: 12px;
  }
  .history-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(var(--ulm-color-theme), 0.08);
  }
`;
function gl() {
  return "main";
}
function fl(t) {
  const e = t.stateObj, i = Number(e.attributes.current_position), o = Number.isFinite(i) ? Math.round(i) : e.state === "open" ? 100 : 0, r = e.state, n = r === "closed" || o === 0, a = n ? "rgba(var(--ulm-color-theme),0.2)" : "rgba(var(--ulm-color-blue),1)", s = n ? "rgba(var(--ulm-color-theme),0.05)" : "rgba(var(--ulm-color-blue),0.2)", l = e.state === "unavailable" || !Number.isFinite(i) || o === 0 ? W(r) : `${W(r)} • ${o}%`;
  return c`<div class="ulm-grid">
    <div class="area-header">
      ${se({
    name: e.attributes.friendly_name || t.entity,
    label: l,
    icon: e.attributes.icon || "mdi:window-shutter",
    iconColor: a,
    iconBg: s
  })}
    </div>
    <div class="area-body">
      ${Eo({
    value: o,
    flipped: !0,
    thumbWidth: 40,
    fill: "rgba(51, 51, 51, 0.9)",
    track: "rgba(51, 51, 51, 0.09)",
    onChange: (p) => t.call("cover", "set_cover_position", { position: p })
  })}
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:arrow-down",
    name: "Close",
    variant: r === "closing" || r === "closed" ? "selected" : "default",
    onClick: () => t.call("cover", "close_cover")
  })}
        ${H({
    icon: "mdi:stop",
    name: "Stop",
    onClick: () => t.call("cover", "stop_cover")
  })}
        ${H({
    icon: "mdi:arrow-up",
    name: "Open",
    variant: r === "opening" || r === "open" ? "selected" : "default",
    onClick: () => t.call("cover", "open_cover")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: t.goBack,
    onPower: () => t.call(t.domain, "toggle"),
    powerLabel: W(r)
  })}
    </div>
  </div>`;
}
function gn(t) {
  const e = t.attributes.supported_color_modes;
  return Array.isArray(e) ? e : [];
}
function en(t) {
  return gn(t).some(
    (e) => ["brightness", "hs", "color_temp", "rgb", "rgbw", "rgbww", "xy"].includes(e)
  );
}
function on(t) {
  return gn(t).some((e) => e === "color_temp" || e === "color_temp_kelvin");
}
function rn(t) {
  return gn(t).some(
    (e) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(e)
  );
}
function cr(t) {
  const e = t.attributes.effect_list;
  return Array.isArray(e) ? e : [];
}
function bl(t) {
  return "brightness";
}
function yl(t) {
  const e = t.view === "main" ? "brightness" : t.view;
  return e === "effects" ? kl(t) : e === "palette" ? Cl(t) : e === "color" ? $l(t) : e === "color_temp" ? xl(t) : wl(t);
}
function Po(t) {
  const e = t.stateObj, i = e.state === "on", o = vc(e.attributes.brightness), r = e.attributes.rgb_color, n = i ? r ? `rgba(${r.join(",")},1)` : "rgba(var(--ulm-color-yellow),1)" : "var(--color-theme)", a = i ? r ? `rgba(${r.join(",")},0.2)` : "rgba(var(--ulm-color-yellow),0.2)" : "var(--card-background-color)", s = i && o != null ? `${W(e.state)} • ${o}%` : W(e.state);
  return se({
    name: e.attributes.friendly_name || t.entity,
    label: s,
    icon: e.attributes.icon || "mdi:lightbulb",
    iconColor: n,
    iconBg: a
  });
}
function fn(t, e) {
  return ct({
    onBack: t.goBack,
    onPower: () => t.call("light", "toggle"),
    powerLabel: W(t.stateObj.state),
    extra: e ? H({
      icon: "mdi:dots-horizontal",
      name: "More",
      onClick: () => t.setView(cr(t.stateObj).length ? "effects" : "palette")
    }) : u
  });
}
function bn(t, e) {
  const i = t.stateObj, o = [];
  return en(i) && o.push(
    H({
      icon: "mdi:lightbulb-on",
      name: "Bright",
      variant: e === "brightness" ? "selected" : "default",
      onClick: () => t.setView("brightness")
    })
  ), on(i) && o.push(
    H({
      icon: "mdi:sun-thermometer-outline",
      name: "Temp",
      variant: e === "color_temp" ? "selected" : "default",
      onClick: () => t.setView("color_temp")
    })
  ), rn(i) && o.push(
    H({
      icon: "mdi:palette",
      name: "Color",
      variant: e === "color" ? "selected" : "default",
      onClick: () => t.setView("color")
    })
  ), c`<div class="ulm-mode-row">${o}</div>`;
}
function vl(t) {
  const e = t.attributes.rgb_color, i = t.state === "on";
  return t.state === "unavailable" ? { fill: "rgba(187, 187, 187, 1)", track: "rgba(187, 187, 187, 0.2)" } : i ? e ? {
    fill: `rgba(${e.join(",")}, 1)`,
    track: `rgba(${e.join(",")}, 0.2)`
  } : { fill: "rgba(255, 145, 1, 1)", track: "rgba(255, 145, 1, 0.2)" } : { fill: "rgba(51, 51, 51, 0.9)", track: "rgba(51, 51, 51, 0.09)" };
}
function wl(t) {
  const e = t.stateObj, i = vc(e.attributes.brightness) ?? (e.state === "on" ? 100 : 0), o = vl(e), r = on(e) || rn(e), n = r ? "ulm-grid cols-3" : "ulm-grid", a = cr(e).length > 0 || !!t.opts.color_palette, s = Eo({
    value: Math.max(1, i),
    min: 1,
    max: 100,
    fill: o.fill,
    track: o.track,
    onChange: (l) => t.call("light", "turn_on", { brightness_pct: l })
  });
  return c`<div class=${n}>
    <div class="area-header">${Po(t)}</div>
    ${r ? c`
          <div class="area-c1">${en(e) ? s : u}</div>
          <div class="area-c2">
            ${on(e) ? wc(t) : u}
          </div>
          <div class="area-c3">
            ${rn(e) ? xc(t) : u}
          </div>
        ` : c`<div class="area-body">
          ${en(e) ? s : u}
        </div>`}
    <div class="area-buttons">${bn(t, "brightness")}</div>
    <div class="area-footer">${fn(t, a)}</div>
  </div>`;
}
function wc(t) {
  const e = t.stateObj.attributes, i = Number(e.min_color_temp_kelvin) || (e.min_mireds != null ? Math.round(1e6 / Number(e.min_mireds)) : 2e3), o = Number(e.max_color_temp_kelvin) || (e.max_mireds != null ? Math.round(1e6 / Number(e.max_mireds)) : 6500), r = Number(e.color_temp_kelvin) || (e.color_temp != null ? Math.round(1e6 / Number(e.color_temp)) : Math.round((i + o) / 2));
  return Eo({
    value: Math.min(o, Math.max(i, r)),
    min: i,
    max: o,
    temperature: !0,
    onChange: (n) => t.call("light", "turn_on", { color_temp_kelvin: Math.round(n) })
  });
}
function xc(t) {
  const e = t.stateObj.attributes.hs_color, i = e?.[0] ?? 30, o = e?.[1] ?? 80;
  return c`<div class="ulm-embed-host" data-ulm-embed="light-color"></div>
    <div class="ulm-embed-fallback">
      ${hl({
    hue: i,
    sat: o,
    onPick: (r, n) => t.call("light", "turn_on", { hs_color: [r, n] })
  })}
    </div>`;
}
function xl(t) {
  return c`<div class="ulm-grid">
    <div class="area-header">${Po(t)}</div>
    <div class="area-body">${wc(t)}</div>
    <div class="area-buttons">${bn(t, "color_temp")}</div>
    <div class="area-footer">${fn(t, !1)}</div>
  </div>`;
}
function $l(t) {
  return c`<div class="ulm-grid">
    <div class="area-header">${Po(t)}</div>
    <div class="area-body">${xc(t)}</div>
    <div class="area-buttons">${bn(t, "color")}</div>
    <div class="area-footer">${fn(t, !1)}</div>
  </div>`;
}
function kl(t) {
  const e = cr(t.stateObj), i = String(t.stateObj.attributes.effect || ""), o = !!t.opts.color_palette;
  return c`<div class="ulm-grid">
    <div class="area-header">${Po(t)}</div>
    <div class="area-body">
      <div class="ulm-list">
        ${e.map(
    (r) => pn({
      label: r,
      active: r === i,
      onClick: () => t.call("light", "turn_on", { effect: r })
    })
  )}
      </div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:creation",
    name: "Effects",
    variant: "selected",
    onClick: () => t.setView("effects")
  })}
        ${o ? H({
    icon: "mdi:palette-swatch",
    name: "Palette",
    onClick: () => t.setView("palette")
  }) : u}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: () => t.setView("brightness"),
    onPower: () => t.call("light", "toggle"),
    powerLabel: W(t.stateObj.state)
  })}
    </div>
  </div>`;
}
function Cl(t) {
  const e = t.opts.color_palette;
  if (!e)
    return c`<div class="ulm-grid"><div class="area-body muted">No palette</div></div>`;
  const i = t.hass.states[e], o = Array.isArray(i?.attributes.options) ? i.attributes.options : [], r = e.split(".")[0];
  return c`<div class="ulm-grid">
    <div class="area-header">${Po(t)}</div>
    <div class="area-body">
      <div class="ulm-list">
        ${o.map(
    (n) => pn({
      label: n,
      active: i?.state === n,
      onClick: () => t.call(r, "select_option", {
        entity_id: e,
        option: n
      })
    })
  )}
      </div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${cr(t.stateObj).length ? H({
    icon: "mdi:creation",
    name: "Effects",
    onClick: () => t.setView("effects")
  }) : u}
        ${H({
    icon: "mdi:palette-swatch",
    name: "Palette",
    variant: "selected",
    onClick: () => t.setView("palette")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: () => t.setView("brightness"),
    onPower: () => t.call("light", "toggle"),
    powerLabel: W(t.stateObj.state)
  })}
    </div>
  </div>`;
}
function Sl() {
  return "infos";
}
function zl(t) {
  const e = t.view === "main" ? "infos" : t.view;
  return e === "volume" ? Ol(t) : e === "sources" ? Nl(t) : Ml(t);
}
function El(t) {
  const i = t.stateObj.attributes, o = String(i.app_name || "").toLowerCase(), r = String(i.media_content_id || "").toLowerCase(), n = o === "spotify" || r.includes("spotify"), a = {
    spotify: { icon: "mdi:spotify", name: "Spotify" },
    "google podcasts": { icon: "mdi:google-podcast", name: "Google-Podcast" },
    plex: { icon: "mdi:plex", name: "Plex" },
    soundcloud: { icon: "mdi:soundcloud", name: "Soundcloud" },
    "youtube music": { icon: "mdi:youtube", name: "Youtube" },
    "oto music": { icon: "mdi:music-circle", name: "Oto Music" },
    pandora: { icon: "mdi:pandora", name: "Pandora" },
    netflix: { icon: "mdi:netflix", name: "Netflix" },
    "bluetooth audio": { icon: "mdi:bluetooth", name: "Bluetooth" }
  }, s = n ? a.spotify : a[o], l = i.friendly_name || t.entity;
  return {
    icon: s?.icon || i.icon || "mdi:speaker",
    name: s?.name || l,
    label: i.media_title || l,
    iconColor: n ? "#1DB954" : "var(--color-theme, inherit)",
    iconBg: n ? "#434343" : "var(--color-theme, rgba(51,51,51,0.15))"
  };
}
function yn(t) {
  const e = t.stateObj;
  return se({
    name: e.attributes.friendly_name || t.entity,
    label: W(e.state),
    icon: e.attributes.icon || "mdi:speaker"
  });
}
function Pl(t) {
  const e = Array.isArray(t.stateObj.attributes.source_list) ? t.stateObj.attributes.source_list : [];
  return ct({
    onBack: t.goBack,
    onPower: () => t.call("media_player", "toggle"),
    powerLabel: W(t.stateObj.state),
    // Always show Source like popup_button_source (more-info if no list)
    extra: H({
      icon: "mdi:playlist-music",
      name: "Source",
      onClick: () => {
        e.length ? t.setView("sources") : t.moreInfo();
      }
    })
  });
}
function Ll(t) {
  const e = t.stateObj.attributes.entity_picture;
  if (e)
    return t.hass.hassUrl ? t.hass.hassUrl(e) : e;
}
function Ka(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const e = Math.floor(t), i = Math.floor(e / 3600), o = Math.floor(e % 3600 / 60), r = e % 60;
  return i > 0 ? `${i}:${o.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}` : `${o}:${r.toString().padStart(2, "0")}`;
}
function Ml(t) {
  const e = t.stateObj.attributes, i = e.media_title || e.media_artist || W(t.stateObj.state), o = e.media_artist || "", r = e.media_album_name || "", n = [o, r].filter(Boolean).join(" · "), a = Ll(t), s = t.stateObj.state === "playing", l = Number(e.media_position), p = Number(e.media_duration), m = Number.isFinite(l) && Number.isFinite(p) && p > 0, g = m ? Math.min(100, l / p * 100) : 0, v = Number(e.volume_level), x = Number.isFinite(v) ? Math.round(v * 100) : 0, L = El(t), A = s ? "rgba(51, 51, 51, 1)" : "rgba(51, 51, 51, 0.5)", O = (I) => {
    if (!m) return;
    const R = I.currentTarget.getBoundingClientRect(), F = Math.min(1, Math.max(0, (I.clientX - R.left) / R.width));
    t.call("media_player", "media_seek", {
      seek_position: F * p
    });
  };
  return c`<div class="ulm-grid cols-2 media-infos">
    <div class="area-header">${yn(t)}</div>
    <div class="area-body">
      <div class="media-panel">
        <div class="media-app">
          <span
            class="media-app-icon"
            style="color:${L.iconColor};background:${L.iconBg};border-color:${L.iconColor}"
          >
            <ha-icon .icon=${L.icon}></ha-icon>
          </span>
          <div class="media-app-text">
            <div class="media-app-name">${L.name}</div>
            <div class="media-app-label">${L.label}</div>
          </div>
        </div>

        ${a ? c`<img class="media-art" src=${a} alt="" width="220" height="220" />` : c`<div class="media-art media-art-empty">
              <ha-icon icon="mdi:music"></ha-icon>
            </div>`}

        <div class="media-meta">
          <div class="media-title">${i}</div>
          ${n ? c`<div class="media-artist">${n}</div>` : u}
          ${m ? c`<button
                type="button"
                class="media-progress"
                @click=${O}
              >
                <div style="width:${g}%"></div>
              </button>
              <div class="media-runtime">
                <span>${Ka(l)}</span>
                <span>${Ka(p)}</span>
              </div>` : u}
        </div>

        <!-- Legacy bar: popup_chip_controls + popup_chip_volume (no separate transport row) -->
        <div class="media-chips">
          <div class="media-controls-chip">
            <button
              type="button"
              style="color:${A}"
              @click=${() => t.call("media_player", "media_previous_track")}
            >
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button
              type="button"
              @click=${() => t.call("media_player", "media_play_pause")}
            >
              <ha-icon icon=${s ? "mdi:pause" : "mdi:play"}></ha-icon>
            </button>
            <button
              type="button"
              style="color:${A}"
              @click=${() => t.call("media_player", "media_next_track")}
            >
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
          </div>
          <button
            type="button"
            class="media-volume-chip"
            @click=${() => t.setView("volume")}
          >
            <ha-icon icon="mdi:volume-high"></ha-icon>
            <span>${x}%</span>
          </button>
        </div>
      </div>
    </div>
    <div class="area-side">
      ${Eo({
    value: x,
    height: "30vh",
    width: "calc(30vh / 2.8)",
    thumbWidth: 50,
    fill: "rgba(51, 51, 51, 0.9)",
    track: "rgba(51, 51, 51, 0.09)",
    onChange: (I) => t.call("media_player", "volume_set", { volume_level: I / 100 })
  })}
    </div>
    <div class="area-footer">${Pl(t)}</div>
  </div>`;
}
function Ol(t) {
  const e = Number(t.stateObj.attributes.volume_level), i = Number.isFinite(e) ? Math.round(e * 100) : 50;
  return c`<div class="ulm-grid media-volume">
    <div class="area-header">${yn(t)}</div>
    <div class="area-body">
      ${Eo({
    value: i,
    height: "30vh",
    width: "calc(30vh / 2.8)",
    thumbWidth: 50,
    fill: "rgba(51, 51, 51, 0.9)",
    track: "rgba(51, 51, 51, 0.09)",
    onChange: (o) => t.call("media_player", "volume_set", { volume_level: o / 100 })
  })}
    </div>
    <div class="area-footer">
      ${ct({
    onBack: () => t.setView("infos")
  })}
    </div>
  </div>`;
}
function Nl(t) {
  const e = Array.isArray(t.stateObj.attributes.source_list) ? t.stateObj.attributes.source_list : [], i = String(t.stateObj.attributes.source || "");
  return c`<div class="ulm-grid media-sources">
    <div class="area-header">${yn(t)}</div>
    <div class="area-body">
      <div class="ulm-list media-source-list">
        ${e.map(
    (o) => pn({
      label: o,
      active: o === i,
      onClick: () => t.call("media_player", "select_source", { source: o })
    })
  )}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: () => t.setView("infos"),
    onPower: () => t.call("media_player", "toggle"),
    powerLabel: W(t.stateObj.state),
    extra: H({
      icon: "mdi:volume-high",
      name: "Volume",
      onClick: () => t.setView("volume")
    })
  })}
    </div>
  </div>`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Il = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const di = (t, e) => {
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const o of i) o._$AO?.(e, !1), di(o, e);
  return !0;
}, rr = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while (i?.size === 0);
}, $c = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), Tl(e);
  }
};
function jl(t) {
  this._$AN !== void 0 ? (rr(this), this._$AM = t, $c(this)) : this._$AM = t;
}
function Al(t, e = !1, i = 0) {
  const o = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (e) if (Array.isArray(o)) for (let n = i; n < o.length; n++) di(o[n], !1), rr(o[n]);
  else o != null && (di(o, !1), rr(o));
  else di(this, t);
}
const Tl = (t) => {
  t.type == mn.CHILD && (t._$AP ?? (t._$AP = Al), t._$AQ ?? (t._$AQ = jl));
};
class Dl extends hn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, o) {
    super._$AT(e, i, o), $c(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (di(this, e), rr(this));
  }
  setValue(e) {
    if (Il(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = e, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const Cr = /* @__PURE__ */ new WeakMap(), kc = _n(class extends Dl {
  render(t) {
    return u;
  }
  update(t, [e]) {
    const i = e !== this.G;
    return i && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), u;
  }
  rt(t) {
    if (this.G !== void 0) if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let i = Cr.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Cr.set(e, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? Cr.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function Ul() {
  return "stats";
}
function Bl(t, e, i, o) {
  return (t.view === "main" ? "stats" : t.view) === "history" ? Hl(t, e, i) : Fl(t, o);
}
function Cc(t) {
  const e = t.stateObj;
  return se({
    name: e.attributes.friendly_name || t.entity,
    label: W(e.state),
    icon: e.attributes.icon || "mdi:power-socket-eu"
  });
}
function Fl(t, e) {
  const i = t.opts.sensor1 || t.opts.graph_sensor, o = t.opts.sensor2;
  return c`<div class="ulm-grid outlet">
    <div class="area-header">${Cc(t)}</div>
    <div class="area-tiles">
      <div class="ulm-tile-row">
        ${Va(t, i)}
        ${Va(t, o)}
      </div>
    </div>
    <div class="area-graph">
      <div class="embed-host wide" ${kc((r) => e?.(r))}></div>
    </div>
    <div class="area-log">
      <div class="muted" style="margin-bottom:8px">Logbook</div>
      <button class="media-chip" @click=${() => t.moreInfo()}>
        Open more-info / logbook
      </button>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:chart-line",
    name: "Stats",
    variant: "selected",
    onClick: () => t.setView("stats")
  })}
        ${H({
    icon: "mdi:history",
    name: "History",
    onClick: () => t.setView("history")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: t.goBack,
    onPower: () => t.call(t.domain, "toggle"),
    powerLabel: W(t.stateObj.state)
  })}
    </div>
  </div>`;
}
function Hl(t, e, i) {
  const o = [...e].slice(-24).reverse();
  return c`<div class="ulm-grid">
    <div class="area-header">${Cc(t)}</div>
    <div class="area-body" style="align-content:start;width:100%;padding:0 8px">
      ${i ? c`<div class="muted">Loading history…</div>` : o.length ? c`<div class="history-list">
              ${o.map(
    (r) => c`<div class="history-row">
                  <span>${Gl(r.lu || r.last_changed)}</span>
                  <span>${r.s ?? r.state ?? "—"}</span>
                </div>`
  )}
            </div>` : c`<div class="muted">No history points.</div>
              <button class="media-chip" @click=${() => t.moreInfo()}>
                Open more-info
              </button>`}
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:chart-line",
    name: "Stats",
    onClick: () => t.setView("stats")
  })}
        ${H({
    icon: "mdi:history",
    name: "History",
    variant: "selected",
    onClick: () => t.setView("history")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: t.goBack,
    onPower: () => t.call(t.domain, "toggle"),
    powerLabel: W(t.stateObj.state)
  })}
    </div>
  </div>`;
}
function Va(t, e) {
  if (!e || !t.hass.states[e])
    return c`<div class="ulm-tile">
      <div class="ulm-tile-icon"><ha-icon icon="mdi:eye"></ha-icon></div>
      <div>
        <div class="ulm-tile-name">Sensor</div>
        <div class="ulm-tile-label">—</div>
      </div>
    </div>`;
  const i = t.hass.states[e], o = i.attributes.unit_of_measurement || "";
  return c`<button class="ulm-tile" @click=${() => t.moreInfo(e)}>
    <div class="ulm-tile-icon">
      <ha-icon .icon=${i.attributes.icon || "mdi:flash"}></ha-icon>
    </div>
    <div>
      <div class="ulm-tile-name">
        ${i.attributes.friendly_name || e}
      </div>
      <div class="ulm-tile-label">${i.state}${o}</div>
    </div>
  </button>`;
}
async function Rl(t, e, i = 168) {
  const o = /* @__PURE__ */ new Date(), r = new Date(o.getTime() - i * 36e5), n = t.callWS;
  if (!n) return [];
  try {
    return (await n({
      type: "history/history_during_period",
      start_time: r.toISOString(),
      end_time: o.toISOString(),
      entity_ids: [e],
      significant_changes_only: !1,
      minimal_response: !0,
      no_attributes: !0
    }))?.[e] || [];
  } catch {
    try {
      return (await n({
        type: "history/list",
        entity_id: e,
        start_time: r.toISOString(),
        end_time: o.toISOString(),
        minimal_response: !0,
        no_attributes: !0
      }))?.[0] || [];
    } catch {
      return [];
    }
  }
}
function Gl(t) {
  if (t == null) return "";
  const e = typeof t == "number" ? new Date(t * 1e3) : new Date(String(t));
  return Number.isNaN(e.getTime()) ? String(t) : e.toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Wl(t) {
  switch (t) {
    case "heat":
      return "rgb(255, 145, 1)";
    case "cool":
    case "dry":
    case "heat_cool":
    case "auto":
      return "rgb(61, 90, 254)";
    case "fan_only":
      return "rgb(0, 186, 13)";
    case "off":
      return "rgb(158, 158, 158)";
    default:
      return "rgb(61, 90, 254)";
  }
}
function Kl(t) {
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}
const Sr = "start";
class Vl extends HTMLElement {
  constructor() {
    super(...arguments), this._entity = "", this._ready = !1, this._loading = null;
  }
  static get observedAttributes() {
    return ["entity"];
  }
  attributeChangedCallback(e, i, o) {
    e === "entity" && o && o !== this._entity && (this._entity = o, this._localValue = void 0, this._pendingMode = void 0, this._sync());
  }
  set hass(e) {
    this._hass = e;
    const i = this._stateObj()?.state;
    this._pendingMode && i && i.toLowerCase() === this._pendingMode.toLowerCase() && (this._pendingMode = void 0), this._ensureSlider().then(() => this._sync());
  }
  get hass() {
    return this._hass;
  }
  set entity(e) {
    !e || e === this._entity || (this._entity = e, this.setAttribute("entity", e), this._localValue = void 0, this._pendingMode = void 0, this._ensureSlider().then(() => this._sync()));
  }
  get entity() {
    return this._entity;
  }
  /**
   * Called from mode chips for instant dial feedback (color + label),
   * before the climate state websocket update arrives.
   */
  setHvacMode(e) {
    this._pendingMode = e, this._sync();
  }
  connectedCallback() {
    this._ensureDom(), this._observeSize(), this._ensureSlider().then(() => this._sync());
  }
  disconnectedCallback() {
    this._ro?.disconnect(), this._ro = void 0;
  }
  /** Keep dial square and fully inside the popup body (no bottom clip). */
  _fitSize() {
    const e = this.parentElement;
    if (!e) return;
    const i = e.clientHeight, o = e.clientWidth;
    if (i < 32 || o < 32) return;
    const r = Math.floor(Math.min(320, o, i));
    this.style.width = `${r}px`, this.style.height = `${r}px`, this.style.maxWidth = "100%", this.style.maxHeight = "100%";
  }
  _observeSize() {
    if (this._ro) return;
    const e = this.parentElement;
    if (!e || typeof ResizeObserver > "u") {
      this._fitSize();
      return;
    }
    this._ro = new ResizeObserver(() => this._fitSize()), this._ro.observe(e), this._fitSize();
  }
  _stateObj() {
    if (!(!this._hass || !this._entity))
      return this._hass.states?.[this._entity];
  }
  /** Effective HVAC mode: optimistic chip click, else entity state. */
  _hvacMode() {
    return this._pendingMode ? this._pendingMode.toLowerCase() : (this._stateObj()?.state || "").toLowerCase();
  }
  _ensureDom() {
    if (this.shadowRoot) return;
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          aspect-ratio: 1;
          margin: 0 auto;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: none;
          color: var(--primary-text-color);
          --mode-color: rgb(61, 90, 254);
          --control-circular-slider-color: var(--mode-color);
          --control-circular-slider-background: var(--disabled-color, #9e9e9e);
          --control-circular-slider-background-opacity: 0.3;
          --action-color: var(--mode-color);
        }
        #slider-host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: none;
        }
        #slider-host > * {
          width: 100% !important;
          height: 100% !important;
          display: block;
          max-width: 100%;
          max-height: 100%;
        }
        .info {
          pointer-events: none;
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.1px;
          line-height: 1.2;
        }
        .setpoint {
          margin: 0;
          font-size: 44px;
          font-weight: 400;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .setpoint .unit {
          font-size: 0.42em;
          margin-left: 1px;
          vertical-align: super;
        }
        .current {
          margin: 0;
          font-size: 18px;
          font-weight: 300;
          color: var(--secondary-text-color);
          direction: ltr;
        }
        .action {
          margin: 0;
          max-width: 60%;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: var(--action-color, var(--secondary-text-color));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fallback {
          min-height: 280px;
          display: grid;
          place-items: center;
          opacity: 0.5;
          font-size: 13px;
        }
      </style>
      <div id="slider-host"><div class="fallback">Loading…</div></div>
      <div class="info">
        <p class="setpoint"><span class="num">—</span><span class="unit"></span></p>
        <p class="current" hidden></p>
        <p class="action"></p>
      </div>
    `;
  }
  async _ensureCircularSliderDefined() {
    return customElements.get("ha-control-circular-slider") ? !0 : (this._loading || (this._loading = (async () => {
      const e = window;
      if (typeof e.loadCardHelpers != "function") return !1;
      try {
        (await e.loadCardHelpers()).createCardElement({
          type: "thermostat",
          entity: this._entity || "climate.ulm_loader"
        }), await Promise.race([
          customElements.whenDefined("ha-control-circular-slider"),
          new Promise((o) => setTimeout(o, 5e3))
        ]);
      } catch (i) {
        console.warn("ulm-thermo-embed: failed to load circular slider", i);
      }
      return !!customElements.get("ha-control-circular-slider");
    })()), this._loading);
  }
  async _ensureSlider() {
    if (this._ensureDom(), this._ready) return;
    const e = await this._ensureCircularSliderDefined(), i = this.shadowRoot.getElementById("slider-host");
    if (!e) {
      i.innerHTML = '<div class="fallback">Thermostat dial unavailable</div>';
      return;
    }
    const o = document.createElement("ha-control-circular-slider");
    o.setAttribute("prevent-interaction-on-scroll", ""), o.setAttribute("mode", Sr), o.style.touchAction = "none", o.style.overscrollBehavior = "none", o.style.width = "100%", o.style.height = "100%", o.style.maxWidth = "100%", o.style.maxHeight = "100%", o.style.boxSizing = "border-box", o.addEventListener("value-changing", (r) => {
      const n = r.detail?.value;
      typeof n == "number" && (this._localValue = n, this._updateInfo(n));
    }), o.addEventListener("value-changed", (r) => {
      const n = r.detail?.value;
      typeof n != "number" || !this._entity || (this._localValue = void 0, this._hass?.callService("climate", "set_temperature", {
        entity_id: this._entity,
        temperature: n
      }), this._updateInfo(n));
    }), i.replaceChildren(o), this._slider = o, this._ready = !0, requestAnimationFrame(() => {
      this._sync(), setTimeout(() => this._sync(), 50), setTimeout(() => this._sync(), 200);
    });
  }
  _sync() {
    if (!this.shadowRoot || !this._slider) return;
    this._fitSize();
    const e = this._stateObj();
    if (!e) return;
    const i = e.attributes, o = Number(i.min_temp) || 7, r = Number(i.max_temp) || 35, n = Number(i.target_temp_step) || 0.5, a = typeof i.current_temperature == "number" ? i.current_temperature : void 0, s = this._localValue ?? (typeof i.temperature == "number" ? i.temperature : a ?? Math.round((o + r) / 2)), l = this._hvacMode(), p = l !== "off", m = Wl(l), g = this._slider;
    g.min = o, g.max = r, g.step = n, g.value = s, g.current = a, g.mode = Sr, g.inactive = !p, this._slider.setAttribute("mode", Sr), this.style.setProperty("--mode-color", m), this.style.setProperty("--action-color", m), this._applyAccent(this._slider, m), this._updateInfo(s);
  }
  _applyAccent(e, i) {
    e.style.setProperty("--control-circular-slider-color", i), e.style.setProperty("--primary-color", i);
    const o = e.shadowRoot;
    if (!o) return;
    let r = o.querySelector(
      "style[data-ulm-thermo]"
    );
    r || (r = document.createElement("style"), r.setAttribute("data-ulm-thermo", "1"), o.appendChild(r)), r.textContent = `
      :host {
        --control-circular-slider-color: ${i} !important;
      }
      .value,
      .arc-active,
      .arc-colored,
      .low,
      .high {
        stroke: ${i} !important;
      }
      g circle:not([data-interaction]) {
        fill: ${i} !important;
        stroke: var(--card-background-color, #111);
        stroke-width: 2px;
      }
      circle[data-interaction] {
        fill: transparent !important;
        stroke: none !important;
      }
      .target,
      .target-border {
        display: none !important;
      }
    `, o.querySelectorAll("path.value, path.arc-active, path.arc-colored").forEach((n) => {
      n.style.stroke = i;
    }), o.querySelectorAll("g circle:not([data-interaction])").forEach((n) => {
      n.style.fill = i;
    });
  }
  _updateInfo(e) {
    if (!this.shadowRoot) return;
    const i = this._stateObj();
    if (!i) return;
    const o = i.attributes, r = this._hass?.config?.unit_system?.temperature || "°C", n = r.startsWith("°") ? r : `°${r}`, a = this._hvacMode(), s = (j) => j.toLocaleString(void 0, {
      maximumFractionDigits: 1,
      minimumFractionDigits: Number.isInteger(j) ? 0 : 1
    }), l = this.shadowRoot.querySelector(".num"), p = this.shadowRoot.querySelector(".unit"), m = this.shadowRoot.querySelector(
      ".current"
    ), g = this.shadowRoot.querySelector(
      ".action"
    );
    l.textContent = s(e), p.textContent = n;
    const v = typeof o.current_temperature == "number" ? o.current_temperature : void 0;
    v != null ? (m.hidden = !1, m.textContent = s(v)) : m.hidden = !0;
    const x = String(o.hvac_action || "").toLowerCase(), L = {
      heating: "Heating",
      cooling: "Cooling",
      drying: "Drying",
      fan: "Fan",
      idle: "Idle",
      off: "Off"
    }, A = {
      heat: "Heat",
      cool: "Cool",
      dry: "Dry",
      fan_only: "Fan",
      auto: "Auto",
      heat_cool: "Heat/Cool",
      off: "Off"
    }, O = this._hass?.localize;
    let I = A[a] || Kl(a);
    if (typeof O == "function" && a) {
      const j = `component.climate.entity_component._.state.${a}`, R = O(j);
      if (R && R !== j) I = R;
      else {
        const F = `state.climate.${a}`, J = O(F);
        J && J !== F && (I = J);
      }
    }
    if (a === "heat" && x === "heating" || a === "cool" && x === "cooling" || a === "dry" && x === "drying") {
      const j = L[x];
      if (j)
        if (typeof O == "function") {
          const R = `state_attributes.climate.hvac_action.${x}`, F = O(R);
          I = F && F !== R ? F : j;
        } else
          I = j;
    }
    g.textContent = I;
  }
}
customElements.get("ulm-thermo-embed") || customElements.define("ulm-thermo-embed", Vl);
const ql = [
  "auto",
  "heat",
  "cool",
  "dry",
  "fan_only",
  "heat_cool"
], Yl = {
  auto: "mdi:autorenew",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  dry: "mdi:water",
  heat_cool: "mdi:sun-snowflake",
  fan_only: "mdi:fan"
}, Jl = [
  "none",
  "away",
  "comfort",
  "home",
  "sleep",
  "activity"
], Zl = {
  none: "mdi:toggle-switch-off",
  away: "mdi:home-switch-outline",
  comfort: "mdi:car-seat-cooler",
  home: "mdi:home",
  sleep: "mdi:sleep",
  activity: "mdi:ticket"
};
function Xl() {
  return "main";
}
function qa(t, e, i) {
  const o = t.hass.localize;
  if (typeof o == "function") {
    const r = o(e);
    if (r && r !== e) return r;
  }
  return i;
}
function Ql(t) {
  const e = t.stateObj, i = e.attributes, o = !!t.opts.preset_mode, r = Array.isArray(i.preset_modes) ? i.preset_modes : [], n = Array.isArray(i.hvac_modes) ? i.hvac_modes : [], a = String(i.preset_mode || ""), s = e.state, l = W(e.state), p = o ? Jl.filter(
    (m) => r.some((g) => g.toLowerCase() === m)
  ).map((m) => ({
    id: r.find((v) => v.toLowerCase() === m) || m,
    icon: Zl[m],
    active: a.toLowerCase() === m
  })) : ql.filter(
    (m) => n.some((g) => g.toLowerCase() === m)
  ).map((m) => ({
    id: n.find((v) => v.toLowerCase() === m) || m,
    icon: Yl[m],
    active: s.toLowerCase() === m
  }));
  return c`<div class="ulm-grid with-buttons thermo-popup">
    <div class="area-header">
      ${se({
    name: e.attributes.friendly_name || t.entity,
    label: l,
    icon: e.attributes.icon || "mdi:thermostat"
  })}
    </div>
    <div class="area-body">
      <ulm-thermo-embed
        .hass=${t.hass}
        .entity=${t.entity}
      ></ulm-thermo-embed>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-bar">
        ${p.map(
    (m) => c`<button
            type="button"
            class="ulm-mode-chip ${m.active ? "active" : ""}"
            title=${m.id}
            @click=${(g) => {
      const x = g.currentTarget.closest(
        ".thermo-popup"
      )?.querySelector(
        "ulm-thermo-embed"
      );
      o || x?.setHvacMode?.(m.id), o ? t.call("climate", "set_preset_mode", { preset_mode: m.id }) : t.call("climate", "set_hvac_mode", { hvac_mode: m.id });
    }}
          >
            <ha-icon .icon=${m.icon}></ha-icon>
          </button>`
  )}
      </div>
    </div>
    <div class="area-footer">
      ${ct({
    onBack: t.goBack,
    backLabel: qa(t, "ui.common.back", "Back"),
    onPower: () => t.call("homeassistant", "toggle"),
    powerLabel: qa(t, "ui.common.toggle", "Toggle")
  })}
    </div>
  </div>`;
}
function td() {
  return "main";
}
function ed(t, e) {
  const i = t.stateObj, o = t.opts.camera, r = o ? t.hass.states[o] : void 0;
  let n;
  if (o && t.hass.hassUrl) {
    const a = r?.attributes.entity_picture;
    n = a ? t.hass.hassUrl(a) : t.hass.hassUrl(`/api/camera_proxy/${o}?t=${Date.now()}`);
  }
  return c`<div class="ulm-grid">
    <div class="area-header">
      ${se({
    name: i.attributes.friendly_name || t.entity,
    label: W(i.state),
    icon: i.attributes.icon || "mdi:robot-vacuum"
  })}
    </div>
    <div class="area-body">
      <div
        class="embed-host vacuum"
        ${kc((a) => e?.(a))}
      ></div>
      <div class="vacuum-fallback-ui embed-host vacuum">
        ${n ? c`<img
              src=${n}
              alt="Vacuum map"
              style="width:100%;border-radius:var(--border-radius,20px)"
            />` : u}
        <div class="ulm-mode-row" style="margin-top:12px">
          <button class="media-chip" @click=${() => t.call("vacuum", "start")}>
            <ha-icon icon="mdi:play"></ha-icon> Start
          </button>
          <button class="media-chip" @click=${() => t.call("vacuum", "pause")}>
            <ha-icon icon="mdi:pause"></ha-icon> Pause
          </button>
          <button
            class="media-chip"
            @click=${() => t.call("vacuum", "return_to_base")}
          >
            <ha-icon icon="mdi:home-map-marker"></ha-icon> Dock
          </button>
          <button class="media-chip" @click=${() => t.call("vacuum", "locate")}>
            <ha-icon icon="mdi:map-marker"></ha-icon> Locate
          </button>
        </div>
      </div>
    </div>
    <div class="area-buttons"></div>
    <div class="area-footer">
      ${ct({
    onBack: t.goBack,
    onPower: () => t.call(t.domain, "toggle"),
    powerLabel: W(i.state)
  })}
    </div>
  </div>`;
}
const Sc = {
  clear: "mdi:weather-sunny",
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
  exceptional: "mdi:alert-circle-outline"
};
function id() {
  return "forecast";
}
function od(t) {
  return (t.view === "main" ? "forecast" : t.view) === "radar" ? nd(t) : rd(t);
}
function zc(t) {
  const e = t.stateObj;
  return se({
    name: e.attributes.friendly_name || t.entity,
    label: W(e.state),
    icon: Sc[e.state] || e.attributes.icon || "mdi:weather-partly-cloudy"
  });
}
function rd(t) {
  const e = t.stateObj.attributes, i = e.temperature_unit || "°", o = Array.isArray(e.forecast) ? e.forecast : [], r = t.opts.suppress_first_forecast ? 1 : 0, n = o.slice(r, r + 6), a = n[0]?.templow, s = n[0]?.temperature;
  return c`<div class="ulm-grid cols-2">
    <div class="area-header">${zc(t)}</div>
    <div class="area-body">
      <div>
        <div class="forecast-hero" style="font-size:60px;flex-direction:column;gap:4px">
          <span>${e.temperature ?? "—"}${i}</span>
          <div class="muted" style="font-size:14px;font-weight:400">
            ${a != null || s != null ? `Max. ${s ?? "—"}${i} Min. ${a ?? "—"}${i}` : W(t.stateObj.state)}
          </div>
        </div>
        <div class="forecast-list">
          ${n.map((l) => {
    const p = String(l.condition || "");
    return c`<div class="forecast-row weather-day">
              <div class="left">
                <ha-icon
                  .icon=${Sc[p] || "mdi:weather-partly-cloudy"}
                ></ha-icon>
                <span>${ad(l)}</span>
              </div>
              <div class="temp-pills">
                <span class="pill low">${l.templow ?? "—"}${i}</span>
                <span class="pill high">${l.temperature ?? "—"}${i}</span>
              </div>
            </div>`;
  })}
        </div>
      </div>
    </div>
    <div class="area-side">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${Ec(t)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:calendar-month",
    name: "Forecast",
    variant: "selected",
    onClick: () => t.setView("forecast")
  })}
        ${H({
    icon: "mdi:radar",
    name: "Radar",
    onClick: () => t.setView("radar")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({ onBack: t.goBack })}
    </div>
  </div>`;
}
function nd(t) {
  return c`<div class="ulm-grid">
    <div class="area-header">${zc(t)}</div>
    <div class="area-body" style="width:100%;padding:0 8px">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${Ec(t)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${H({
    icon: "mdi:calendar-month",
    name: "Forecast",
    onClick: () => t.setView("forecast")
  })}
        ${H({
    icon: "mdi:radar",
    name: "Radar",
    variant: "selected",
    onClick: () => t.setView("radar")
  })}
      </div>
    </div>
    <div class="area-footer">
      ${ct({ onBack: t.goBack })}
    </div>
  </div>`;
}
function Ec(t) {
  const e = Number(t.stateObj.attributes.latitude), i = Number(t.stateObj.attributes.longitude), o = Number.isFinite(e) && Number.isFinite(i) ? `https://www.rainviewer.com/map.html?loc=${e},${i},9&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&sm=1&md=0&ul=0&pl=1&lm=1` : "https://www.rainviewer.com/map.html?c=1&o=83&sm=1";
  return c`<iframe
    class="radar-frame"
    src=${o}
    title="Weather radar"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>`;
}
function ad(t) {
  const e = t.datetime;
  if (typeof e == "string" && e) {
    const i = new Date(e);
    return Number.isNaN(i.getTime()) ? e.slice(0, 10) : i.toLocaleDateString(void 0, { weekday: "short" });
  }
  return String(t.condition || "—");
}
var sd = Object.defineProperty, cd = Object.getOwnPropertyDescriptor, Mt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && sd(e, i, r), r;
};
function zr() {
  const t = document.querySelector("home-assistant");
  return t?.shadowRoot ? t.shadowRoot : t || document.body;
}
function ht(t, e, i, o = {}) {
  let r = document.querySelector("ulm-popup-dialog") || zr().querySelector(
    "ulm-popup-dialog"
  );
  r ? r.parentNode === document.body && zr().appendChild(r) : (r = document.createElement("ulm-popup-dialog"), zr().appendChild(r)), r.attachHost(t), t.hass && (r.hass = t.hass), r.open(e, i, o);
}
let gt = class extends w {
  constructor() {
    super(...arguments), this._open = !1, this._kind = "light", this._entity = "", this._opts = {}, this._view = "main", this._history = [], this._historyLoading = !1, this._viewStack = [], this._slotEls = /* @__PURE__ */ new Map(), this._onKey = (t) => {
      t.key === "Escape" && this._open && this.close();
    }, this._setView = (t) => {
      t !== this._view && (this._viewStack.push(this._view), this._view = t, this._kind === "power_outlet" && t === "history" && this._maybeLoadHistory());
    }, this._goBack = () => {
      const t = this._viewStack.pop();
      if (t) {
        this._view = t;
        return;
      }
      const e = this._defaultView(this._kind);
      if (this._view !== e && this._view !== "main") {
        this._view = e;
        return;
      }
      this.close();
    }, this._call = (t, e, i = {}) => {
      if (!this.hass) return;
      const o = { ...i };
      o.entity_id || (o.entity_id = this._entity), this.hass.callService(t, e, o);
    }, this._moreInfo = (t) => {
      const e = t || this._entity;
      document.querySelector("home-assistant")?.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: { entityId: e }
        })
      );
    };
  }
  attachHost(t) {
    this._host = t;
  }
  open(t, e, i = {}) {
    this._kind = t, this._entity = e, this._opts = i || {}, this._view = this._defaultView(t), this._viewStack = [], this._history = [], this._vacuumEl = null, this._graphEl = null, this._slotEls.clear(), this._open = !0, this._startSync(), this._maybeLoadHistory(), window.addEventListener("keydown", this._onKey), document.body.style.overflow = "hidden";
  }
  close() {
    this._open = !1, this._stopSync(), window.removeEventListener("keydown", this._onKey), document.body.style.overflow = "";
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopSync(), window.removeEventListener("keydown", this._onKey), document.body.style.overflow = "";
  }
  updated() {
    !this._open || !this.hass || this._syncEmbeds();
  }
  async _syncEmbeds() {
    if (!this.hass) return;
    if (this._kind === "vacuum" && this._vacuumHost) {
      const e = this._opts.camera || "null";
      if (this._vacuumEl = await kr(
        this._vacuumHost,
        this.hass,
        {
          type: "custom:vacuum-card",
          entity: this._entity,
          image: "default",
          compact_view: !1,
          map: e === "null" ? void 0 : e
        },
        this._vacuumEl,
        "vacuum-card"
      ), this._vacuumEl) {
        const i = this.renderRoot.querySelector(
          ".vacuum-fallback-ui"
        );
        i && (i.style.display = "none");
      }
    }
    if (this._kind === "power_outlet" && (this._view === "stats" || this._view === "main") && this._graphHost) {
      const e = this._opts.graph_sensor || this._opts.sensor1 || this._entity;
      this._graphEl = await kr(
        this._graphHost,
        this.hass,
        {
          type: "custom:mini-graph-card",
          entities: [{ entity: e }],
          line_color: "var(--info-color)",
          height: 276,
          hours_to_show: 168,
          show: {
            name: !1,
            icon: !1,
            legend: !1,
            state: !1
          }
        },
        this._graphEl,
        "mini-graph-card"
      );
    }
    const t = [];
    this._kind === "light" && t.push({
      key: "light-color",
      config: ml(this._entity),
      tag: "light-entity-card"
    }), this._kind === "weather" && t.push({
      key: "weather-radar",
      config: _l(!!this.hass.themes?.darkMode),
      tag: "weather-radar-card"
    });
    for (const e of t) {
      const i = this.renderRoot.querySelector(
        `[data-ulm-embed="${e.key}"]`
      );
      if (!i) continue;
      const o = await kr(
        i,
        this.hass,
        e.config,
        this._slotEls.get(e.key),
        e.tag
      );
      this._slotEls.set(e.key, o);
    }
  }
  _startSync() {
    this._stopSync(), this._lastEntityState = void 0, this._syncTimer = window.setInterval(() => {
      if (!this._open) return;
      if (this._host?.hass && (this.hass = this._host.hass), this._vacuumEl && this.hass && (this._vacuumEl.hass = this.hass), this._graphEl && this.hass && (this._graphEl.hass = this.hass), this.hass)
        for (const o of this._slotEls.values())
          o && (o.hass = this.hass);
      const t = this.renderRoot?.querySelector(
        "ulm-thermo-embed"
      );
      t && this.hass && (t.hass = this.hass);
      const e = this.hass?.states?.[this._entity], i = e ? `${e.state}|${e.last_changed}|${JSON.stringify(e.attributes?.hvac_action)}|${e.attributes?.temperature}` : "";
      i && i !== this._lastEntityState && (this._lastEntityState = i, this.requestUpdate());
    }, 300);
  }
  _stopSync() {
    this._syncTimer != null && (window.clearInterval(this._syncTimer), this._syncTimer = void 0);
  }
  _defaultView(t) {
    switch (t) {
      case "light":
        return this.hass?.states[this._entity] ? bl(this.hass.states[this._entity]) : "brightness";
      case "media_player":
        return Sl();
      case "weather":
        return id();
      case "power_outlet":
        return Ul();
      case "cover":
        return gl();
      case "thermostat":
        return Xl();
      case "vacuum":
        return td();
      default:
        return "main";
    }
  }
  async _maybeLoadHistory() {
    if (this._kind !== "power_outlet" || !this.hass) return;
    const t = this._opts.graph_sensor || this._opts.sensor1 || this._entity;
    if (t) {
      this._historyLoading = !0;
      try {
        this._history = await Rl(this.hass, t, 168);
      } finally {
        this._historyLoading = !1;
      }
    }
  }
  _ctx(t) {
    return {
      hass: this.hass,
      entity: this._entity,
      stateObj: t,
      opts: this._opts,
      view: this._view,
      setView: this._setView,
      call: this._call,
      close: () => this.close(),
      goBack: this._goBack,
      moreInfo: this._moreInfo,
      domain: this._entity.split(".")[0]
    };
  }
  render() {
    if (!this._open || !this.hass) return u;
    const t = this.hass.states[this._entity];
    return t ? c`
      <div class="backdrop" @click=${this.close}>
        <div
          class="dialog"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="dialog-wrap">
            <button class="dialog-close" @click=${this.close} title="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
            ${this._renderBody(t)}
          </div>
        </div>
      </div>
    ` : c`<div class="backdrop" @click=${this.close}>
        <div class="dialog-wrap dialog" @click=${(e) => e.stopPropagation()}>
          <div class="ulm-ph-name">Entity not found</div>
          <div class="ulm-ph-label">${this._entity}</div>
          <button class="media-chip" @click=${this.close}>Close</button>
        </div>
      </div>`;
  }
  _renderBody(t) {
    const e = this._ctx(t);
    switch (this._kind) {
      case "light":
        return yl(e);
      case "cover":
        return fl(e);
      case "thermostat":
        return Ql(e);
      case "media_player":
        return zl(e);
      case "vacuum":
        return ed(e, (i) => {
          this._vacuumHost = i, i && this._syncEmbeds();
        });
      case "weather":
        return od(e);
      case "power_outlet":
        return Bl(
          e,
          this._history,
          this._historyLoading,
          (i) => {
            this._graphHost = i, i && this._syncEmbeds();
          }
        );
      default:
        return u;
    }
  }
};
gt.styles = pl;
Mt([
  k({ attribute: !1 })
], gt.prototype, "hass", 2);
Mt([
  y()
], gt.prototype, "_open", 2);
Mt([
  y()
], gt.prototype, "_kind", 2);
Mt([
  y()
], gt.prototype, "_entity", 2);
Mt([
  y()
], gt.prototype, "_opts", 2);
Mt([
  y()
], gt.prototype, "_view", 2);
Mt([
  y()
], gt.prototype, "_history", 2);
Mt([
  y()
], gt.prototype, "_historyLoading", 2);
gt = Mt([
  C("ulm-popup-dialog")
], gt);
var ld = Object.defineProperty, dd = Object.getOwnPropertyDescriptor, vn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? dd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ld(e, i, r), r;
};
let hi = class extends w {
  constructor() {
    super(...arguments), this._liveFill = (t) => {
      const e = t.target, i = this.renderRoot.querySelector(".slider-fill");
      i && (i.style.width = `${e.value}%`);
    }, this._iconTap = (t) => {
      if (t.stopPropagation(), !(!this.hass || !this._config)) {
        if (this._config.enable_popup_tap || this._config.enable_popup) {
          ht(this, "light", this._config.entity, {
            color_palette: this._config.color_palette
          });
          return;
        }
        this.hass.callService("light", "toggle", { entity_id: this._config.entity });
      }
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          ht(this, "light", this._config.entity, {
            color_palette: this._config.color_palette
          });
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
        _("entity", "light"),
        U([h("name"), E("icon")]),
        B("color"),
        f("enable_slider"),
        U([
          N("enable_slider_min"),
          N("enable_slider_max")
        ]),
        f("enable_collapse"),
        f("enable_horizontal"),
        f("enable_horizontal_wide"),
        f("enable_color"),
        f("force_background_color"),
        f("enable_popup"),
        f("enable_popup_tap"),
        h("color_palette"),
        f("enable_buttons"),
        U([
          N("brightness_low"),
          N("brightness_medium"),
          N("brightness_high")
        ])
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = e.layout || {}, o = e.colors_popup || {}, r = e.presets || {}, n = (a, s) => {
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
      enable_slider_min: n(
        t.enable_slider_min ?? i.enable_slider_min,
        0
      ),
      enable_slider_max: n(
        t.enable_slider_max ?? i.enable_slider_max,
        100
      ),
      enable_collapse: !!(t.enable_collapse ?? i.enable_collapse ?? e.ulm_card_light_enable_collapse),
      enable_horizontal: !!(t.enable_horizontal ?? i.enable_horizontal ?? e.ulm_card_light_enable_horizontal),
      enable_horizontal_wide: !!(t.enable_horizontal_wide ?? i.enable_horizontal_wide ?? e.ulm_card_light_enable_horizontal_wide),
      enable_color: !!(t.enable_color ?? o.enable_color ?? e.ulm_card_light_enable_color),
      force_background_color: !!(t.force_background_color ?? o.force_background_color ?? e.ulm_card_light_force_background_color),
      enable_buttons: !!(t.enable_buttons ?? r.enable_buttons ?? e.ulm_card_light_enable_buttons),
      brightness_low: n(
        t.brightness_low ?? r.brightness_low,
        1
      ),
      brightness_medium: n(
        t.brightness_medium ?? r.brightness_medium,
        50
      ),
      brightness_high: n(
        t.brightness_high ?? r.brightness_high,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = t.state === "unavailable", o = t.attributes.brightness, r = typeof o == "number" ? Math.round(o / 255 * 100) : void 0, n = this._config.name || t.attributes.friendly_name || t.entity_id, a = this._config.icon || t.attributes.icon || "mdi:lightbulb", s = this._config.color || "yellow", l = b(this, s), p = t.attributes.rgb_color, m = V(
      this,
      e,
      s,
      p,
      this._config.enable_color,
      !!(e && this._config.force_background_color)
    ), g = !!this._config.enable_slider && !(this._config.enable_collapse && !e), v = !!this._config.enable_buttons && !(this._config.enable_collapse && !e) && !(this._config.enable_horizontal && this._config.enable_slider), x = e && this._config.force_background_color ? this._config.enable_color && p ? `rgba(${p.join(", ")}, var(--opacity-bg, 1))` : `rgba(${l}, var(--opacity-bg, 1))` : void 0, L = this._config.enable_color && p ? `rgba(${p.join(", ")}, 1)` : `rgba(${l}, 1)`, A = this._config.enable_color && p ? `rgba(${p.join(", ")}, 0.2)` : `rgba(${l}, 0.2)`, O = this._config.enable_slider_min ?? 0, I = this._config.enable_slider_max ?? 100, j = Math.min(I, Math.max(O, r ?? (O || 1))), R = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : "",
      this._config.enable_horizontal_wide ? "wide" : "",
      i ? "unavailable" : ""
    ].filter(Boolean).join(" ");
    return c`
      <ha-card
        class="ulm-card"
        style=${d({
      backgroundColor: x,
      color: e && this._config.force_background_color ? "rgb(250,250,250)" : void 0
    })}
      >
        <div class=${R}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(m)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${a}></ha-icon>
              ${i ? c`<span
                    class="badge"
                    style="background: rgba(var(--color-red, 245,68,54),1)"
                    ><ha-icon icon="mdi:exclamation"></ha-icon
                  ></span>` : u}
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${n}</div>
              <div class="label">
                ${e && r !== void 0 ? `${r}%` : this._capitalize(t.state)}
              </div>
            </button>
          </div>

          ${g ? c`<div
                class="slider-wrap"
                style=${d({ background: e ? A : void 0 })}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${e ? j : 0}%`,
      background: e ? L : "transparent"
    })}
                ></div>
                <input
                  type="range"
                  min=${O || 1}
                  max=${I}
                  .value=${String(j || 1)}
                  ?disabled=${!e && !this._config.enable_collapse}
                  @change=${this._setBrightness}
                  @input=${this._liveFill}
                />
              </div>` : u}

          ${v ? c`<div class="widgets">
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
              </div>` : u}
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
hi.styles = P;
vn([
  k({ attribute: !1 })
], hi.prototype, "hass", 2);
vn([
  y()
], hi.prototype, "_config", 2);
hi = vn([
  C("ulm-light-card")
], hi);
var ud = Object.defineProperty, md = Object.getOwnPropertyDescriptor, wn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? md(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ud(e, i, r), r;
};
const _d = {
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
}, hd = {
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
}, pd = /* @__PURE__ */ new Set(["open", "opening", "closing"]);
let pi = class extends w {
  constructor() {
    super(...arguments), this._onSlider = (t) => {
      let e = Number(t.target.value);
      this._config?.invert_percent && (e = 100 - e), this._setPosition(e);
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          ht(this, "cover", this._config.entity);
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
        _("entity", "cover"),
        U([h("name"), E("icon")]),
        B("color"),
        f("enable_controls"),
        f("enable_slider"),
        f("enable_popup"),
        f("force_background_color"),
        f("enable_horizontal"),
        f("invert_percent"),
        f("display_left_right"),
        f("enable_tilt"),
        f("garage_large"),
        f("show_last_changed"),
        N("favorite_percentage"),
        U([N("slider_min"), N("slider_max")])
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const r = t.favorite_percentage ?? i.favorite_percentage ?? e.ulm_card_cover_favorite_percentage;
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
      favorite_percentage: r == null || r === !1 ? void 0 : Number(r),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = !!this._config.invert_percent, i = Number(t.attributes.current_position), o = !Number.isNaN(i), r = o ? e ? 100 - i : i : void 0, n = e ? !(o && i === 100) : t.state !== "closed", a = this._config.color || "blue", s = b(this, a), l = this._config.name || t.attributes.friendly_name || t.entity_id, p = String(t.attributes.device_class || ""), m = this._coverIcon(t.state, p, t), g = !!this._config.force_background_color && n, v = V(
      this,
      n,
      a,
      null,
      !1,
      g
    ), x = !!this._config.enable_controls, L = !!this._config.enable_slider, A = !!this._config.enable_tilt, O = this._config.favorite_percentage != null && !Number.isNaN(Number(this._config.favorite_percentage)), I = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : ""
    ].filter(Boolean).join(" "), j = this._closeControlIcon(p), R = this._openControlIcon(p), F = this._label(t, r, o, e), J = g ? `rgba(${s}, var(--opacity-bg, 1))` : void 0;
    return c`
      <ha-card
        class="ulm-card cover"
        style=${d(
      J ? {
        "--ha-card-background": J,
        background: J,
        backgroundColor: J,
        color: "rgb(250,250,250)"
      } : {}
    )}
      >
        <div class=${I}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(v)}
              @click=${() => this._call("toggle")}
            >
              <ha-icon .icon=${m}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${l}</div>
              <div class="label">${F}</div>
            </button>
          </div>

          ${x ? c`<div
                class="controls ${O ? "four" : ""}"
              >
                <button
                  class="widget-btn"
                  style=${d(this._widgetStyle(g, a, s))}
                  @click=${() => this._call("close_cover")}
                >
                  <ha-icon icon=${j}></ha-icon>
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
                  <ha-icon icon=${R}></ha-icon>
                </button>
                ${O ? c`<button
                      class="widget-btn"
                      style=${d(this._widgetStyle(g, a, s))}
                      @click=${() => this._setPosition(
      Number(this._config.favorite_percentage)
    )}
                    >
                      <ha-icon icon="mdi:star"></ha-icon>
                    </button>` : u}
              </div>` : u}

          ${L ? c`<div
                class="slider-wrap"
                style=${d({
      background: n ? g ? `rgba(${s}, 0.3)` : `rgba(${s}, 0.1)` : void 0
    })}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${r ?? (n ? 100 : 0)}%`,
      background: n ? g ? "rgb(250,250,250)" : `rgba(${s}, 0.8)` : "transparent"
    })}
                ></div>
                <input
                  type="range"
                  min=${this._config.slider_min ?? 0}
                  max=${this._config.slider_max ?? 100}
                  .value=${String(r ?? 0)}
                  @change=${this._onSlider}
                />
              </div>` : u}

          ${A ? c`<div class="controls">
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
              </div>` : u}
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
    const o = pd.has(t);
    return e === "garage" && this._config?.garage_large ? o ? "mdi:garage-open-variant" : "mdi:garage-variant" : (o ? _d : hd)[e] || "mdi:help-circle";
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
    const r = t.state, n = this._capitalize(r);
    if (o && i) {
      const s = {
        closed: "Open",
        closing: "Opening",
        open: "Closed",
        opening: "Closing"
      }[r] || n;
      return Number(t.attributes.current_position) === 0 ? `${s} • ${e}%` : s;
    }
    return ["unknown", "unavailable", "closed"].includes(r) || !i ? n : `${n} • ${e}%`;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
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
pi.styles = [
  P,
  $`
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
wn([
  k({ attribute: !1 })
], pi.prototype, "hass", 2);
wn([
  y()
], pi.prototype, "_config", 2);
pi = wn([
  C("ulm-cover-card")
], pi);
var gd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, xn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && gd(e, i, r), r;
};
let gi = class extends w {
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
        _("entity", "person"),
        U([h("name"), E("icon")]),
        f("use_entity_picture"),
        _("battery_entity", "sensor", !1),
        _("eta_entity", "sensor", !1),
        _("address_entity", void 0, !1)
      ],
      computeLabel: S({
        entity: "Person entity (ulm_card_person_entity)",
        name: "Name",
        icon: "Icon (ulm_card_person_icon)",
        use_entity_picture: "Use entity picture",
        battery_entity: "Battery (ulm_card_person_battery)",
        eta_entity: "ETA (ulm_card_person_eta)",
        address_entity: "Address (ulm_address)"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "home", i = b(this, e ? "blue" : "green"), o = this._config.name || t.attributes.friendly_name || t.entity_id, n = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, a = this._config.icon || "mdi:face-man", s = this._badgeIcon(t), l = this._label(t, e), p = this._batterySvg();
    return c`
      <ha-card class="ulm-person" @click=${this._moreInfo}>
        <!-- icon_info_bg grid: 'i n' / 'i l' -->
        <div class="grid">
          <div class="img-cell">
            ${n ? c`<img
                  class="entity-picture"
                  src=${n}
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
        ${p ? c`<div class="info">${p}</div>` : u}
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
      const r = this.hass.states[this._config.eta_entity];
      r && (o = ` | ${this.hass.formatEntityState?.(r) || r.state}`);
    }
    if (this._config?.address_entity && this.hass) {
      const r = this.hass.states[this._config.address_entity];
      if (r)
        return (this.hass.formatEntityState?.(r) || r.state) + o;
    }
    return i + o;
  }
  _localizePerson(t) {
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state === "home" ? "Home" : t.state === "not_home" ? "Away" : t.state;
  }
  _batterySvg() {
    if (!this._config?.battery_entity || !this.hass) return u;
    const t = this.hass.states[this._config.battery_entity];
    if (!t) return u;
    const e = Math.round(Number(t.state));
    if (Number.isNaN(e)) return u;
    const i = 20.5, o = i * 2 * Math.PI, r = o - e / 100 * o;
    return nr`
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r=${i}
          stroke="green"
          stroke-width="3"
          fill="none"
          style="transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: ${o}; stroke-dashoffset: ${r};"
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
gi.styles = $`
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
xn([
  k({ attribute: !1 })
], gi.prototype, "hass", 2);
xn([
  y()
], gi.prototype, "_config", 2);
gi = xn([
  C("ulm-person-card")
], gi);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = _n(class extends hn {
  constructor(t) {
    if (super(t), t.type !== mn.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
      const r = !!e[o];
      r === this.st.has(o) || this.nt?.has(o) || (r ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return Rt;
  }
});
var bd = Object.defineProperty, yd = Object.getOwnPropertyDescriptor, $n = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && bd(e, i, r), r;
};
const Ya = {
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
}, Ja = /* @__PURE__ */ new Set(["off", "standby", "unavailable", "unknown"]);
let fi = class extends w {
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
          ht(this, "media_player", this._config.entity);
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
        _("entity", "media_player"),
        U([h("name"), E("icon")]),
        B("color"),
        f("enable_art"),
        f("enable_controls"),
        f("enable_volume_slider"),
        f("enable_volume_buttons"),
        {
          name: "enable_volume_adjust",
          selector: { number: { mode: "box", min: 0, max: 100, step: 1 } }
        },
        f("collapsible"),
        _("player_controls_entity", "media_player", !1),
        f("enable_popup"),
        f("more_info"),
        f("power_button"),
        f("force_background_color")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const r = t.enable_volume_adjust ?? i.enable_volume_adjust ?? e.ulm_card_media_player_enable_volume_adjust;
    let n = 5;
    r === 0 || r === "0" ? n = 0 : r != null && r !== !1 && r !== "" && (n = Number(r), Number.isNaN(n) && (n = 5));
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
      enable_volume_adjust: n,
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
    return this._config?.collapsible ? !!(Ja.has(t.state) || this._config.idle_off && t.state === "idle") : !1;
  }
  _isActive(t) {
    return !(Ja.has(t.state) || this._config?.idle_off && t.state === "idle");
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
    return e && Ya[e] ? Ya[e] : String(t.attributes.icon || "mdi:speaker");
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._isActive(t), i = this._isCollapsed(t), o = this._artUrl(t), r = this._config.color || "blue", n = b(this, r), a = !!this._config.force_background_color && e && !o, s = a ? `rgba(${n}, var(--opacity-bg, 1))` : void 0, l = !!this._config.enable_controls && !i, p = !!this._config.enable_volume_slider && !i, m = !!this._config.enable_volume_buttons && !i, g = Number(t.attributes.volume_level), x = !Number.isNaN(g) ? Math.round(Math.min(1, Math.max(0, g)) * 100) : 0, L = this._iconStyle(e, !!o, a, n), A = this._textStyle(!!o, a), O = this._widgetStyle(e, !!o, a, n), I = {};
    if (o) {
      const j = o.replace(/"/g, "%22");
      I["--ha-card-background"] = "transparent", I.background = [
        "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))",
        `center / cover no-repeat url("${j}")`
      ].join(", ");
    } else s && (I["--ha-card-background"] = s, I.background = s, I.backgroundColor = s, I.color = "rgb(250,250,250)");
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      media: !0,
      "has-art": !!o
    })}
        style=${d(I)}
      >
        ${this._config.power_button ? c`<button
              class="power-btn widget-btn"
              style=${d(O)}
              @click=${() => this._call("toggle")}
              title="power"
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>` : u}

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
                style=${d(L)}
                @click=${() => this._call(this._playService(t), this._controlEntity())}
              >
                <ha-icon .icon=${this._appIcon(t)}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name" style=${d(A.name)}>
                  ${this._titleName(t)}
                </div>
                <div class="label" style=${d(A.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${l ? c`<div class="controls four">
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._call("media_previous_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-previous"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._call(this._playService(t), this._controlEntity())}
                >
                  <ha-icon icon=${this._playIcon(t)}></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._call("media_next_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-next"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${this._nameTap}
                  title="source / more info"
                >
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </button>
              </div>` : u}

          ${p ? c`<div
                class="slider-wrap"
                style=${d(this._sliderTrack(e, !!o, a, n))}
              >
                <div
                  class="slider-fill"
                  style=${d({
      width: `${x}%`,
      background: this._sliderFill(e, !!o, a, n)
    })}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(x)}
                  @change=${this._onVolumeSlider}
                />
              </div>` : u}

          ${m ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._toggleMute(t)}
                >
                  <ha-icon icon="mdi:volume-mute"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._nudgeVolume(t, -1)}
                >
                  <ha-icon icon="mdi:volume-minus"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${d(O)}
                  @click=${() => this._nudgeVolume(t, 1)}
                >
                  <ha-icon icon="mdi:volume-plus"></ha-icon>
                </button>
              </div>` : u}
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
    const o = this._volumeStep(t), r = Math.min(1, Math.max(0, i + e * o));
    this.hass.callService("media_player", "volume_set", {
      entity_id: this._controlEntity(),
      volume_level: r
    });
  }
  _capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
};
fi.styles = [
  P,
  $`
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
$n([
  k({ attribute: !1 })
], fi.prototype, "hass", 2);
$n([
  y()
], fi.prototype, "_config", 2);
fi = $n([
  C("ulm-media-player-card")
], fi);
var vd = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, kn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && vd(e, i, r), r;
};
const xd = [
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
let bi = class extends w {
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
        _("entity", "climate"),
        U([h("name"), E("icon")]),
        f("enable_controls"),
        f("enable_hvac_modes"),
        f("enable_background_color"),
        f("enable_collapse"),
        f("enable_popup"),
        f("preset_mode"),
        f("enable_horizontal"),
        f("enable_display_temperature"),
        _("fan_entity", "fan", !1),
        N("temp_step"),
        N("minimum_temp_spread")
      ],
      computeLabel: S({
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
        preset_mode: "Popup uses preset modes (ulm_card_thermostat_preset_mode)",
        fan_entity: "Separate fan entity",
        temp_step: "Temperature step",
        minimum_temp_spread: "Min spread (heat_cool)"
      }),
      computeHelper: z({
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
    const e = t, i = e.layout || {}, o = e.advanced || {}, r = t.entity || e.ulm_card_thermostat_entity;
    if (!r) throw new Error("Please define an entity");
    const n = t.temp_step ?? o.temp_step ?? e.ulm_card_thermostat_temp_step;
    this._config = {
      ...t,
      entity: r,
      name: t.name ?? e.ulm_card_thermostat_name,
      icon: t.icon || e.ulm_card_thermostat_icon || "mdi:thermometer",
      enable_collapse: !!(t.enable_collapse ?? i.enable_collapse ?? e.ulm_card_thermostat_enable_collapse),
      enable_controls: !!(t.enable_controls ?? i.enable_controls ?? e.ulm_card_thermostat_enable_controls),
      enable_hvac_modes: !!(t.enable_hvac_modes ?? i.enable_hvac_modes ?? e.ulm_card_thermostat_enable_hvac_modes),
      enable_background_color: !!(t.enable_background_color ?? i.enable_background_color ?? e.ulm_card_thermostat_enable_background_color),
      enable_display_temperature: !!(t.enable_display_temperature ?? i.enable_display_temperature ?? e.ulm_card_thermostat_enable_display_temperature),
      enable_horizontal: !!(t.enable_horizontal ?? i.enable_horizontal ?? e.ulm_card_thermostat_enable_horizontal),
      enable_popup: !!(t.enable_popup ?? i.enable_popup ?? e.ulm_card_thermostat_enable_popup),
      preset_mode: !!(t.preset_mode ?? i.preset_mode ?? e.ulm_card_thermostat_preset_mode),
      fan_entity: this._normalizeFanEntity(
        t.fan_entity ?? o.fan_entity ?? e.ulm_card_thermostat_fan_entity
      ),
      minimum_temp_spread: Number(
        t.minimum_temp_spread ?? o.minimum_temp_spread ?? e.ulm_card_thermostat_minimum_temp_spread ?? 1
      ),
      temp_step: n != null && n !== !1 ? Number(n) : void 0,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "off", i = !!this._config.enable_collapse && e, o = String(t.attributes.hvac_action || ""), r = String(t.state), n = !!this._config.enable_background_color, a = n && (r === "heat" || r === "heat_cool" && o === "heating"), s = n && (r === "cool" || r === "heat_cool" && o === "cooling"), l = o === "heating" || n && r === "heat", p = o === "cooling" || n && r === "cool";
    let m;
    a ? m = "rgba(255, 165, 0, 0.75)" : s ? m = "rgba(0, 191, 255, 0.75)" : e || (m = "rgba(var(--color-background-yellow, 250, 250, 250), var(--opacity-bg, 1))");
    const g = this._config.name || t.attributes.friendly_name || t.entity_id, v = this._config.icon || "mdi:thermometer", x = this._iconStyle(l, p), L = this._tempUnit(), A = !!this._config.enable_controls && !i, O = A && t.attributes.target_temp_high != null, I = (!!this._config.enable_hvac_modes || !!this._config.fan_entity) && !i && !this._config.enable_horizontal, j = !!this._config.enable_display_temperature && !this._config.enable_horizontal, R = M({
      stack: !0,
      horizontal: !!this._config.enable_horizontal
    }), F = t.attributes.target_temp_high ?? t.attributes.temperature, J = t.attributes.target_temp_low, ce = t.attributes.current_temperature;
    return c`
      <ha-card
        class="ulm-card thermostat"
        style=${d(
      m ? {
        // ha-card paints via --ha-card-background; override that + shorthand
        "--ha-card-background": m,
        background: m,
        backgroundColor: m
      } : {}
    )}
      >
        <div class=${R}>
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(x)}
                @click=${this._iconTap}
              >
                <ha-icon .icon=${v}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name">${g}</div>
                <div class="label">${this._label(t)}</div>
              </button>
            </div>
            ${j ? c`<div class="display-temp">
                  ${ce != null ? `${ce}${L}` : `-${L}`}
                </div>` : u}
          </div>

          ${A ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, n)
    )}
                  @click=${() => this._adjustHigh(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${F != null ? `${F}${L}` : `-${L}`}
                </div>
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, n)
    )}
                  @click=${() => this._adjustHigh(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>` : u}

          ${O ? c`<div class="controls">
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, n)
    )}
                  @click=${() => this._adjustLow(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${J != null ? `${J}${L}` : `-${L}`}
                </div>
                <button
                  class="widget-btn"
                  style=${d(
      this._widgetActiveBg(a, s, n)
    )}
                  @click=${() => this._adjustLow(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>` : u}

          ${I ? this._renderHvacModes(t, a, s, n) : u}
        </div>
      </ha-card>
    `;
  }
  _renderHvacModes(t, e, i, o) {
    const r = t.attributes.hvac_modes, n = Array.isArray(r) ? r.map(String) : [], s = !!this._normalizeFanEntity(this._config?.fan_entity) && !n.includes("fan_only"), l = this._config?.enable_hvac_modes ? xd.filter((p) => n.includes(p.mode)) : [];
    return !l.length && !s ? c`<div class="hvac-empty">
        No HVAC modes on this entity
      </div>` : c`
      <div
        class="hvac-modes"
        style=${d({
      gridTemplateColumns: `repeat(${l.length + (s ? 1 : 0)}, 1fr)`
    })}
      >
        ${l.map((p) => {
      const m = t.state === p.mode, g = m ? this._hvacActiveStyle(p.activeColor, p.activeIconColor) : this._widgetActiveBg(e, i, o), v = m ? this._hvacActiveIconColor(p.activeColor, p.activeIconColor) : {};
      return c`
            <button
              class="widget-btn hvac"
              style=${d(g)}
              @click=${() => this._setHvac(p.mode)}
              title=${p.mode}
            >
              <ha-icon
                icon=${p.icon}
                style=${d(v)}
              ></ha-icon>
            </button>
          `;
    })}
        ${s ? this._renderFanEntityBtn(e, i, o) : u}
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
    if (!o) return u;
    const r = this.hass?.states[o];
    if (!r) return u;
    const n = r.state === "on", a = b(this, "green"), s = o.split(".")[0] || "fan";
    return c`
      <button
        class="widget-btn hvac"
        style=${d(
      n ? {
        backgroundColor: "rgba(var(--color-theme, 51,51,51), 0.5)",
        color: `rgba(${a}, 1)`
      } : this._widgetActiveBg(t, e, i)
    )}
        @click=${() => this.hass?.callService(s, "toggle", { entity_id: o })}
        title=${r.attributes.friendly_name || o}
      >
        <ha-icon
          icon="mdi:fan"
          style=${d(n ? { color: `rgba(${a}, 1)` } : {})}
        ></ha-icon>
      </button>
    `;
  }
  _themeToken(t) {
    if (t === "theme") return "var(--color-theme, 51, 51, 51)";
    const e = b(this, t);
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
    const i = this._step(e) * t, o = e.attributes.target_temp_low, r = e.attributes.target_temp_high, n = e.attributes.temperature;
    if (o != null && r != null) {
      const a = parseFloat(String(r)) + i;
      let s = parseFloat(String(o));
      t < 0 && a - this._spread() < s && (s = a - this._spread()), this._call("set_temperature", {
        target_temp_low: s,
        target_temp_high: a
      });
      return;
    }
    if (n != null) {
      const a = parseFloat(String(n)) + i;
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
    const i = this._step(e) * t, o = e.attributes.target_temp_low, r = e.attributes.target_temp_high;
    if (o == null || r == null) return;
    const n = parseFloat(String(o)) + i;
    let a = parseFloat(String(r));
    t > 0 && n + this._spread() > a && (a = n + this._spread()), this._call("set_temperature", {
      target_temp_low: n,
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
        ht(this, "thermostat", this._config.entity, {
          preset_mode: this._config.preset_mode
        });
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
bi.styles = [
  P,
  $`
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
kn([
  k({ attribute: !1 })
], bi.prototype, "hass", 2);
kn([
  y()
], bi.prototype, "_config", 2);
bi = kn([
  C("ulm-thermostat-card")
], bi);
var $d = Object.defineProperty, kd = Object.getOwnPropertyDescriptor, lr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? kd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && $d(e, i, r), r;
};
let Se = class extends w {
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
        _("entity", "fan"),
        U([h("name"), E("icon")]),
        B("color"),
        f("enable_horizontal"),
        f("enable_collapse"),
        f("force_background_color"),
        f("enable_slider"),
        f("enable_button"),
        U([N("slider_min"), N("slider_max")]),
        E("button_icon"),
        h("button_service"),
        h("oscillate_attribute"),
        U([h("temp_attribute"), h("hum_attribute")]),
        f("always_show_attributes")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const o = (r) => typeof r == "string" && r.length && r !== "false" ? r : void 0;
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
        const n = Math.round(Number(t.attributes[o]) || 0);
        i += ` • ${n}°C`;
      }
      const r = this._config?.hum_attribute;
      if (r && t.attributes[r] != null) {
        const n = Math.round(Number(t.attributes[r]) || 0);
        i += ` • ${n}%`;
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = !!this._config.enable_collapse && !e, a = !!this._config.enable_slider && !n, s = !!this._config.enable_button && !!this._config.enable_slider && !n, l = this._config.name || t.attributes.friendly_name || t.entity_id, p = this._config.icon || t.attributes.icon || "mdi:fan", m = this._config.slider_min ?? 0, g = this._config.slider_max ?? 100, v = this._sliderStep(t), x = Number(t.attributes.percentage), A = !Number.isNaN(x) ? Math.min(g, Math.max(m, x)) : e ? g : m, O = this._dragPct != null ? Math.min(g, Math.max(m, this._dragPct)) : A, I = e || this._dragPct != null ? (O - m) / (g - m || 1) * 100 : 0, j = r ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, R = e ? {
      color: r ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: r ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, F = r ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, J = this._oscillating(t), ce = this._oscButtonStyle(e, J, r, o), Be = !!this._config.enable_horizontal;
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      fan: !0,
      horizontal: Be,
      "force-bg": r
    })}
        style=${d(
      j ? {
        "--ha-card-background": j,
        background: j,
        backgroundColor: j
      } : {}
    )}
      >
        <div
          class=${M({
      stack: !0,
      horizontal: Be
    })}
        >
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(R)}
                @click=${() => this._call("toggle")}
              >
                <ha-icon .icon=${p}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._moreInfo}>
                <div class="name" style=${d(F.name)}>
                  ${l}
                </div>
                <div class="label" style=${d(F.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${a || s ? c`<div
                class=${M({
      "slider-row": !0,
      "with-button": s
    })}
              >
                ${a ? c`<div
                      class="slider-wrap"
                      style=${d(
      e ? {
        background: r ? `rgba(${o}, 0.3)` : `rgba(${o}, 0.1)`
      } : {
        background: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      }
    )}
                    >
                      <div
                        class="slider-fill"
                        style=${d({
      width: `${I}%`,
      background: e || this._dragPct != null ? r ? "rgb(250,250,250)" : `rgba(${o}, 0.8)` : "rgba(var(--color-grey, 187, 187, 187), 0.8)"
    })}
                      ></div>
                      <input
                        type="range"
                        min=${m}
                        max=${g}
                        step=${v}
                        .value=${String(O)}
                        @input=${this._onSliderInput}
                        @change=${this._onSliderChange}
                      />
                    </div>` : u}
                ${s ? c`<button
                      class="widget-btn osc-btn"
                      style=${d(ce)}
                      @click=${() => this._toggleOscillate(t)}
                      title="oscillate"
                    >
                      <ha-icon
                        icon=${this._config.button_icon || "mdi:rotate-3d-variant"}
                      ></ha-icon>
                    </button>` : u}
              </div>` : u}
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
Se.styles = [
  P,
  $`
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
lr([
  k({ attribute: !1 })
], Se.prototype, "hass", 2);
lr([
  y()
], Se.prototype, "_config", 2);
lr([
  y()
], Se.prototype, "_dragPct", 2);
Se = lr([
  C("ulm-fan-card")
], Se);
var Cd = Object.defineProperty, Sd = Object.getOwnPropertyDescriptor, Cn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Sd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Cd(e, i, r), r;
};
const zd = /* @__PURE__ */ new Set([
  "cleaning",
  "mopping",
  "mowing",
  "paused",
  "returning",
  "error"
]), Za = /* @__PURE__ */ new Set(["cleaning", "mopping", "mowing"]), Ed = {
  cleaning: "blue",
  mowing: "blue",
  paused: "green",
  mopping: "yellow",
  returning: "purple",
  error: "red"
};
let yi = class extends w {
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
          ht(this, "vacuum", this._config.entity, {
            camera: this._config.camera
          });
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
        _("entity", "vacuum"),
        h("name"),
        E("icon"),
        h("label"),
        // script | automation — room clean action
        {
          name: "room",
          required: !1,
          selector: { entity: { domain: ["script", "automation"] } }
        },
        E("room_icon"),
        _("camera", "camera", !1),
        f("camera_toggle"),
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
        f("force_background_color"),
        f("enable_popup")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const o = (r) => typeof r == "string" && r.length ? r : void 0;
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
    return e && e !== "auto" && e !== "theme" ? e : e === "theme" ? "theme" : Ed[t.state.toLowerCase()] || "theme";
  }
  _isActive(t) {
    return zd.has(t.state.toLowerCase());
  }
  _showMap(t) {
    return this._config?.camera ? this._config?.camera_toggle ? Za.has(t.state.toLowerCase()) : !0 : !1;
  }
  _mapUrl(t) {
    const e = this.hass?.states[t];
    if (!e) return;
    const i = e.attributes.entity_picture || e.attributes.entity_picture_local;
    if (!(typeof i != "string" || !i.length))
      return i.startsWith("http://") || i.startsWith("https://") || i.startsWith("data:") ? i : this.hass?.hassUrl?.(i) || i;
  }
  render() {
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._isActive(t), i = this._stateColor(t), o = i === "theme" ? "var(--color-theme, 51, 51, 51)" : b(this, i), r = !!this._config.force_background_color && e && i !== "theme", n = r ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:robot-vacuum", l = this._config.label || this.hass.formatEntityState?.(t) || this._capitalize(t.state), m = e && i !== "theme" ? {
      color: r ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: r ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, g = r ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, v = this._widgetStyle(e, r, o, i), x = Za.has(t.state.toLowerCase()), L = this._showMap(t), A = L && this._config.camera ? this._mapUrl(this._config.camera) : void 0, O = !!this._config.room;
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      vacuum: !0,
      "force-bg": r
    })}
        style=${d(
      n ? {
        "--ha-card-background": n,
        background: n,
        backgroundColor: n
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
                style=${d(m)}
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

          ${L ? c`<div class="map">
                ${A ? c`<img src=${A} alt="Vacuum map" />` : c`<div class="map-empty">No map image</div>`}
              </div>` : u}

          <div
            class=${M({
      controls: !0,
      four: O
    })}
          >
            <button
              class="widget-btn"
              style=${d(v)}
              @click=${() => this._vac(x ? "stop" : "start")}
              title=${x ? "stop" : "start"}
            >
              <ha-icon icon=${x ? "mdi:stop" : "mdi:play"}></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${d(v)}
              @click=${() => this._vac("return_to_base")}
              title="dock"
            >
              <ha-icon icon="mdi:home-map-marker"></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${d(v)}
              @click=${() => this._vac("locate")}
              title="locate"
            >
              <ha-icon icon="mdi:map-marker"></ha-icon>
            </button>
            ${O ? c`<button
                  class="widget-btn"
                  style=${d(v)}
                  @click=${this._runRoom}
                  title="room"
                >
                  <ha-icon
                    icon=${this._config.room_icon || "mdi:table-chair"}
                  ></ha-icon>
                </button>` : u}
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
yi.styles = [
  P,
  $`
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
Cn([
  k({ attribute: !1 })
], yi.prototype, "hass", 2);
Cn([
  y()
], yi.prototype, "_config", 2);
yi = Cn([
  C("ulm-vacuum-card")
], yi);
var Pd = Object.defineProperty, Ld = Object.getOwnPropertyDescriptor, Sn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ld(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Pd(e, i, r), r;
};
const Md = {
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
}, Od = {
  precipitation: "mdi:weather-rainy",
  precipitation_probability: "mdi:weather-rainy",
  humidity: "mdi:water-percent",
  wind_speed: "mdi:weather-windy",
  wind_bearing: "mdi:compass",
  pressure: "mdi:gauge"
}, Nd = [
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
function Xa(t, e) {
  return t === !1 || t === "false" ? [] : t == null || t === "" ? e : Array.isArray(t) ? t.map(String).map((i) => i.trim()).filter(Boolean) : typeof t == "string" ? t.split(/[,\n]/).map((i) => i.trim()).filter((i) => i && i !== "false") : e;
}
function Id(t) {
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
let vi = class extends w {
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
        _("entity", "weather"),
        h("name"),
        h("primary_info"),
        h("secondary_info"),
        f("backdrop"),
        f("backdrop_fade"),
        h("custom")
      ],
      computeLabel: S({
        entity: "Weather entity",
        name: "Name (ulm_card_weather_name)",
        primary_info: "Primary info (ulm_card_weather_primary_info)",
        secondary_info: "Secondary info (ulm_card_weather_secondary_info)",
        backdrop: "Backdrop (ulm_card_weather_backdrop)",
        backdrop_fade: "Backdrop fade",
        custom: "Custom overrides (ulm_card_weather_custom)"
      }),
      computeHelper: z({
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
    const r = t.primary_info ?? e.ulm_card_weather_primary_info ?? "extrema", n = t.secondary_info ?? e.ulm_card_weather_secondary_info ?? "precipitation";
    this._config = {
      ...t,
      entity: t.entity || e.ulm_card_weather_entity,
      name: t.name ?? e.ulm_card_weather_name,
      primary_info: r,
      secondary_info: n,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-weather"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._customMap(), i = this._config.name ?? t.attributes.friendly_name ?? t.entity_id, o = e["icon-state"]?.state || t.state, r = Md[o] || "mdi:weather-partly-cloudy", n = this._attr(t, "temp", e), a = this._localizeState(t), s = Xa(this._config.primary_info, ["extrema"]), l = Xa(this._config.secondary_info, [
      "precipitation"
    ]), p = this._isNight(), m = this._backdropStyle(), g = !!this._config.backdrop, v = typeof this._config.backdrop == "object" && !!this._config.backdrop.fade;
    return c`
      <ha-card
        class=${M({
      "ulm-weather": !0,
      backdrop: g,
      fade: v,
      night: g && p
    })}
        style=${d(m)}
        @click=${this._moreInfo}
      >
        <ha-icon class="weather-icon" .icon=${r}></ha-icon>

        <div class="weather-info">
          <div class="row title">
            ${n != null ? c`<span class="temp"
                  >${n}${this._tempUnit(t)}</span
                >` : u}
            ${i && String(i).trim() ? c`<span class="name">${i}</span>` : u}
          </div>
          <div class="row state">${a}</div>
        </div>

        ${s.length || l.length ? c`
              <div class="weather-info add">
                ${[...s, ...l].map(
      (x) => this._renderInfo(t, x, e)
    )}
              </div>
            ` : u}
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
    const t = Id(this._config?.custom), e = {};
    if (!this.hass) return e;
    for (const i of t) {
      const [o, r] = Object.entries(i)[0] || [];
      if (!o || !r) continue;
      if (!r.includes(".")) {
        e[o] = { state: r };
        continue;
      }
      const n = this.hass.states[r];
      n && (e[o] = {
        state: n.state,
        unit: n.attributes.unit_of_measurement
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
      const o = this._forecastDay(t), r = Number(o?.temperature);
      return Number.isNaN(r) ? void 0 : r;
    }
    if (e === "low") {
      const o = this._forecastDay(t), r = Number(o?.templow);
      return Number.isNaN(r) ? void 0 : r;
    }
    if (e === "precipitation") {
      const o = this._forecastDay(t);
      if (o?.precipitation != null)
        return Math.round(Number(o.precipitation) * 100) / 100;
      const r = t.attributes.precipitation;
      return r != null ? Number(r) : void 0;
    }
    if (e === "precipitation_probability") {
      const o = this._forecastDay(t), r = Number(
        o?.precipitation_probability ?? t.attributes.precipitation_probability
      );
      return Number.isNaN(r) ? void 0 : r;
    }
    if (e === "wind_bearing") {
      const o = t.attributes.wind_bearing;
      if (o == null || o === "undefined") return;
      if (typeof o == "string") return o;
      const r = Math.floor(Number(o) / 22.5 + 0.5);
      return Nd[r % 16];
    }
    return e === "wind_speed" ? t.attributes.wind_speed ?? 0 : e === "humidity" ? t.attributes.humidity ?? 0 : e === "pressure" ? t.attributes.pressure ?? 0 : t.attributes[e];
  }
  _renderInfo(t, e, i) {
    if (e === "extrema") {
      const a = this._attr(t, "low", i), s = this._attr(t, "high", i);
      if (a == null && s == null) return u;
      const l = `${a != null ? `${a}${this._tempUnit(t)}` : ""}${a != null && s != null ? " / " : ""}${s != null ? `${s}${this._tempUnit(t)}` : ""}`;
      return c`<span class="info-icon"></span
        ><span class="info-val">${l}</span>`;
    }
    const o = this._attr(t, e, i);
    if (o == null || o === "") return u;
    const r = i[e]?.unit || this._unitFor(e, t), n = Od[e];
    return c`
      ${n ? c`<ha-icon class="info-icon" .icon=${n}></ha-icon>` : c`<span class="info-icon"></span>`}
      <span class="info-val">${o}${r}</span>
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
vi.styles = $`
    ${sr}

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
Sn([
  k({ attribute: !1 })
], vi.prototype, "hass", 2);
Sn([
  y()
], vi.prototype, "_config", 2);
vi = Sn([
  C("ulm-weather-card")
], vi);
var jd = Object.defineProperty, Ad = Object.getOwnPropertyDescriptor, zn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ad(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && jd(e, i, r), r;
};
const Qa = {
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
}, ts = {
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
let wi = class extends w {
  constructor() {
    super(...arguments), this._onTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          ht(this, "weather", this._config.entity);
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
        _("entity", "weather"),
        h("name"),
        f("enable_popup"),
        f("surpress_first_forecast")
      ],
      computeLabel: S({
        entity: "Weather entity",
        name: "Name",
        enable_popup: "Enable popup (ulm_card_weather_ulm_enable_popup)",
        surpress_first_forecast: "Suppress first forecast in popup"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-weather-ulm"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = ts[t.state] || ts.default, i = b(this, e), o = Qa[t.state] || Qa.default, r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._localizeState(t.state), a = t.attributes.humidity, s = t.attributes.temperature, l = t.attributes.temperature_unit || "°C";
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
              <div class="name">${r}</div>
              <div class="label">${n}</div>
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
wi.styles = $`
    ${P}

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
zn([
  k({ attribute: !1 })
], wi.prototype, "hass", 2);
zn([
  y()
], wi.prototype, "_config", 2);
wi = zn([
  C("ulm-weather-ulm-card")
], wi);
var Td = Object.defineProperty, Dd = Object.getOwnPropertyDescriptor, En = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Dd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Td(e, i, r), r;
};
let xi = class extends w {
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
        _("entity"),
        h("name"),
        h("attribute"),
        _("battery_state_entity", void 0, !1),
        _("charger_type_entity", void 0, !1),
        f("charging_animation"),
        N("battery_level_danger"),
        N("battery_level_warning"),
        h("color_danger"),
        h("color_warning"),
        h("color_ok")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    ), r = this._num(
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
      battery_level_warning: r,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-battery"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._level(t), i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this._icon(e), r = this._iconColor(e), n = this._label(e, t), a = this._shouldAnimate();
    return c`
      <ha-card class="ulm-card ulm-battery">
        <div class="row">
          <button
            class="icon-btn"
            style=${d({
      color: r,
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    })}
            @click=${this._moreInfo}
          >
            <ha-icon
              class=${M({ charging: a })}
              .icon=${o}
            ></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${i}</div>
            <div class="label">${n}</div>
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
xi.styles = $`
    ${P}

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
En([
  k({ attribute: !1 })
], xi.prototype, "hass", 2);
En([
  y()
], xi.prototype, "_config", 2);
xi = En([
  C("ulm-battery-card")
], xi);
var Ud = Object.defineProperty, Bd = Object.getOwnPropertyDescriptor, Pn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Ud(e, i, r), r;
};
const Fd = /* @__PURE__ */ new Set([
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
function Hd(t) {
  return !(Fd.has(t) || /\d/.test(t));
}
let $i = class extends w {
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
        _("entity", "binary_sensor"),
        h("name"),
        E("icon"),
        B("color"),
        f("show_last_changed"),
        f("force_background_color")
      ],
      computeLabel: S({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_name)",
        icon: "Icon (ulm_card_binary_sensor_icon)",
        color: "Color (ulm_card_binary_sensor_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-binary-sensor"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Hd(t.state), i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:checkbox-blank-circle", l = this._label(t), p = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, m = r ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-binary-sensor": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(m)}>${a}</div>
            <div class="label" style=${d(m)}>${l}</div>
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
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
  }
};
$i.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-binary-sensor {
      height: auto;
    }
  `;
Pn([
  k({ attribute: !1 })
], $i.prototype, "hass", 2);
Pn([
  y()
], $i.prototype, "_config", 2);
$i = Pn([
  C("ulm-binary-sensor-card")
], $i);
var Rd = Object.defineProperty, Gd = Object.getOwnPropertyDescriptor, Ln = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Rd(e, i, r), r;
};
const Wd = /* @__PURE__ */ new Set([
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
function Kd(t) {
  return !(Wd.has(t) || /\d/.test(t));
}
let ki = class extends w {
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
        _("entity", "binary_sensor"),
        h("name"),
        E("icon"),
        B("color"),
        f("show_last_changed"),
        f("force_background_color"),
        f("invert_state")
      ],
      computeLabel: S({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_alert_name)",
        icon: "Icon (ulm_card_binary_sensor_alert_icon)",
        color: "Color (ulm_card_binary_sensor_alert_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active",
        invert_state: "Invert alert (ulm_icon_alert_invert_state)"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-binary-sensor-alert"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Kd(t.state), i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:alert", l = this._label(t), p = this._showAlert(t), m = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, g = r ? { color: "rgb(250, 250, 250)" } : {}, v = b(this, "red");
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-binary-sensor-alert": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(m)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${s}></ha-icon>
            ${p ? c`<span
                  class="badge"
                  style=${d({
      backgroundColor: `rgba(${v}, 1)`
    })}
                  aria-hidden="true"
                >
                  <ha-icon .icon=${"mdi:exclamation"}></ha-icon>
                </span>` : u}
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
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
  }
};
ki.styles = $`
    ${P}

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
Ln([
  k({ attribute: !1 })
], ki.prototype, "hass", 2);
Ln([
  y()
], ki.prototype, "_config", 2);
ki = Ln([
  C("ulm-binary-sensor-alert-card")
], ki);
var Vd = Object.defineProperty, qd = Object.getOwnPropertyDescriptor, Mn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Vd(e, i, r), r;
};
function es(t, e = "blue") {
  if (typeof t != "string" || !t) return e;
  const i = t.match(/color-([a-z]+)/i);
  if (i) return i[1].toLowerCase();
  const o = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(
    o
  ) ? o : e;
}
let Ci = class extends w {
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
        h("navigation_path"),
        h("name"),
        E("icon"),
        B("color")
      ],
      computeLabel: S({
        navigation_path: "Path (ulm_card_navigate_path)",
        name: "Title (ulm_card_navigate_title)",
        icon: "Icon (ulm_card_navigate_icon)",
        color: "Icon color (ulm_card_navigate_color)"
      }),
      computeHelper: z({
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
      color: es(
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
    if (!this._config) return u;
    const t = es(this._config.color, "blue"), e = b(this, t), i = {
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
Ci.styles = $`
    ${P}

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
Mn([
  k({ attribute: !1 })
], Ci.prototype, "hass", 2);
Mn([
  y()
], Ci.prototype, "_config", 2);
Ci = Mn([
  C("ulm-navigate-card")
], Ci);
var Yd = Object.defineProperty, Jd = Object.getOwnPropertyDescriptor, On = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Jd(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Yd(e, i, r), r;
};
const Zd = /* @__PURE__ */ new Set([
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
function Xd(t) {
  return !(Zd.has(t) || /\d/.test(t));
}
let Si = class extends w {
  constructor() {
    super(...arguments), this._iconTap = (t) => {
      if (t.stopPropagation(), !this._config || !this.hass) return;
      if (this._config.enable_popup) {
        ht(this, "power_outlet", this._config.entity, {
          sensor1: this._config.consumption_sensor,
          graph_sensor: this._config.consumption_sensor
        });
        return;
      }
      const e = this._config.entity.split(".")[0];
      this.hass.callService(e, "toggle", {
        entity_id: this._config.entity
      });
    }, this._nameTap = (t) => {
      if (t.stopPropagation(), !!this._config) {
        if (this._config.enable_popup) {
          ht(this, "power_outlet", this._config.entity, {
            sensor1: this._config.consumption_sensor,
            graph_sensor: this._config.consumption_sensor
          });
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
        _("entity", ["switch", "input_boolean", "light"]),
        h("name"),
        E("icon"),
        B("color"),
        _("consumption_sensor", "sensor", !1),
        f("force_background_color"),
        f("enable_popup")
      ],
      computeLabel: S({
        entity: "Outlet / switch entity",
        name: "Name (ulm_card_power_outlet_name)",
        icon: "Icon (ulm_card_power_outlet_icon)",
        color: "Color (ulm_card_power_outlet_color)",
        consumption_sensor: "Consumption sensor (ulm_card_power_outlet_consumption_sensor)",
        force_background_color: "Force background color when on",
        enable_popup: "Enable popup (ulm_outlet_power_enable_popup)"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-power-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Xd(t.state), i = this._config.color || "yellow", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:power-socket-eu", l = this._label(t, e), p = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, m = r ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-power-outlet": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._iconTap}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._nameTap}>
            <div class="name" style=${d(m)}>${a}</div>
            <div class="label" style=${d(m)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _label(t, e) {
    const i = this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state, o = this._config?.consumption_sensor;
    if (e && o && this.hass?.states[o]) {
      const r = this.hass.states[o].state;
      return `${i} • ${r}W`;
    }
    return i;
  }
};
Si.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-power-outlet {
      height: auto;
    }
  `;
On([
  k({ attribute: !1 })
], Si.prototype, "hass", 2);
On([
  y()
], Si.prototype, "_config", 2);
Si = On([
  C("ulm-power-outlet-card")
], Si);
var Qd = Object.defineProperty, tu = Object.getOwnPropertyDescriptor, Nn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? tu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Qd(e, i, r), r;
};
const eu = /* @__PURE__ */ new Set([
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
function iu(t) {
  return !(eu.has(t) || /\d/.test(t));
}
let zi = class extends w {
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
        _("entity"),
        h("name"),
        E("icon"),
        B("color"),
        f("force_background_color")
      ],
      computeLabel: S({
        entity: "Entity",
        name: "Name (ulm_card_generic_name)",
        icon: "Icon (ulm_card_generic_icon)",
        color: "Color (ulm_card_generic_color)",
        force_background_color: "Force background color when active"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-generic"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = iu(t.state), i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._stateLabel(t), s = this._config.name || t.attributes.friendly_name || t.entity_id, l = this._config.icon || t.attributes.icon || "mdi:flash", p = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, m = r ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-generic": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${l}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(m)}>${a}</div>
            <div class="label" style=${d(m)}>${s}</div>
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
zi.styles = $`
    ${P}

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
Nn([
  k({ attribute: !1 })
], zi.prototype, "hass", 2);
Nn([
  y()
], zi.prototype, "_config", 2);
zi = Nn([
  C("ulm-generic-card")
], zi);
var ou = Object.defineProperty, ru = Object.getOwnPropertyDescriptor, In = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ru(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ou(e, i, r), r;
};
const nu = /* @__PURE__ */ new Set([
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
function au(t) {
  return !(nu.has(t) || /\d/.test(t));
}
let Ei = class extends w {
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
        _("entity"),
        h("name"),
        E("icon"),
        B("color"),
        f("force_background_color")
      ],
      computeLabel: S({
        entity: "Entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)",
        color: "Color (ulm_card_generic_swap_color)",
        force_background_color: "Force background color when active"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-generic-swap"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = au(t.state), i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._stateLabel(t), l = this._config.icon || t.attributes.icon || "mdi:swap-horizontal", p = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, m = r ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-generic-swap": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${l}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(m)}>${a}</div>
            <div class="label" style=${d(m)}>${s}</div>
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
Ei.styles = $`
    ${P}

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
In([
  k({ attribute: !1 })
], Ei.prototype, "hass", 2);
In([
  y()
], Ei.prototype, "_config", 2);
Ei = In([
  C("ulm-generic-swap-card")
], Ei);
var su = Object.defineProperty, cu = Object.getOwnPropertyDescriptor, jn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && su(e, i, r), r;
};
const lu = /* @__PURE__ */ new Set([
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
function du(t) {
  return !(lu.has(t) || /\d/.test(t));
}
let Pi = class extends w {
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
        _("entity", ["input_boolean", "switch"]),
        h("name"),
        E("icon"),
        B("color"),
        f("force_background_color")
      ],
      computeLabel: S({
        entity: "Input boolean / switch",
        name: "Name (ulm_card_input_boolean_name)",
        icon: "Icon (ulm_card_input_boolean_icon)",
        color: "Color (ulm_card_input_boolean_color)",
        force_background_color: "Force background color when on"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-boolean"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = du(t.state), i = this._config.color || "blue", o = b(this, i), r = !!this._config.force_background_color && e, n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:toggle-switch", l = this._label(t), p = r ? {
      backgroundColor: `rgba(${o}, var(--opacity-bg, 1))`
    } : {}, m = r ? { color: "rgb(250, 250, 250)" } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-input-boolean": !0,
      active: e,
      "force-bg": r
    })}
        style=${d(p)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${d(n)}
            @click=${this._toggle}
          >
            <ha-icon .icon=${s}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${d(m)}>${a}</div>
            <div class="label" style=${d(m)}>${l}</div>
          </button>
        </div>
      </ha-card>
    `;
  }
  _label(t) {
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : t.state;
  }
};
Pi.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-input-boolean {
      height: auto;
    }
  `;
jn([
  k({ attribute: !1 })
], Pi.prototype, "hass", 2);
jn([
  y()
], Pi.prototype, "_config", 2);
Pi = jn([
  C("ulm-input-boolean-card")
], Pi);
var uu = Object.defineProperty, mu = Object.getOwnPropertyDescriptor, An = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? mu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && uu(e, i, r), r;
};
function _u(t) {
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
let Li = class extends w {
  constructor() {
    super(...arguments), this._run = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config) return;
      const e = _u(this._config.service_data), i = this._config.entity || (typeof e.entity_id == "string" ? e.entity_id : void 0);
      if (!i) return;
      const { entity_id: o, ...r } = e;
      this.hass.callService("script", "turn_on", {
        entity_id: i,
        ...r
      });
    };
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", "script"),
        h("name"),
        E("icon"),
        h("service_data")
      ],
      computeLabel: S({
        entity: "Script entity",
        name: "Title (ulm_card_script_title)",
        icon: "Icon (ulm_card_script_icon)",
        service_data: "Service data (tap_action service_data)"
      }),
      computeHelper: z({
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
    const o = t.icon ?? e.ulm_card_script_icon ?? e._card_script_icon ?? "mdi:script-text", r = e.tap_action, n = typeof r?.service_data?.entity_id == "string" ? r.service_data.entity_id : void 0, a = t.entity || e.ulm_card_script_entity || n;
    this._config = {
      ...t,
      entity: a,
      name: i,
      icon: o,
      service_data: t.service_data ?? e.tap_action_service_data ?? r?.service_data,
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
    if (!this._config) return u;
    const t = b(this, "blue"), e = {
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
Li.styles = $`
    ${P}

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
An([
  k({ attribute: !1 })
], Li.prototype, "hass", 2);
An([
  y()
], Li.prototype, "_config", 2);
Li = An([
  C("ulm-script-card")
], Li);
var hu = Object.defineProperty, pu = Object.getOwnPropertyDescriptor, Tn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && hu(e, i, r), r;
};
function Pc(t, e) {
  const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
  return i && getComputedStyle(t).getPropertyValue(`--${i[1]}`).trim() || e;
}
function gu(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-background-${e}`).trim();
  i = Pc(t, i), /^\d+\s*,/.test(i) || (i = b(t, e));
  const o = getComputedStyle(t).getPropertyValue("--opacity-bg").trim() || "1";
  return `rgba(${i}, ${o})`;
}
function fu(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-${e}-text`).trim();
  return i = Pc(t, i), /^\d+\s*,/.test(i) ? `rgba(${i}, 1)` : i.startsWith("#") || i.startsWith("rgb") ? i : "var(--primary-text-color)";
}
let Mi = class extends w {
  constructor() {
    super(...arguments), this._tap = (t) => {
      if (t.stopPropagation(), !this.hass || !this._config) return;
      const e = this._config.entity, i = e.split(".")[0], o = this.hass.states[e], r = this._config.state || "on";
      switch (i) {
        case "input_select":
          this.hass.callService("input_select", "select_option", {
            entity_id: e,
            option: r
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
        _("entity"),
        h("name"),
        E("icon"),
        B("color"),
        h("state"),
        f("show_last_changed")
      ],
      computeLabel: S({
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        color: "Color (ulm_card_vertical_button_color)",
        state: "Active state (ulm_card_vertical_button_state)",
        show_last_changed: "Show last changed"
      }),
      computeHelper: z({
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-vertical-button"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.state || "on", i = t.state === e, o = this._config.color || "blue", r = V(this, i, o), n = this._displayName(t, e), a = this._config.icon || t.attributes.icon || "mdi:gesture-tap-button", s = this._label(t), l = i ? { backgroundColor: gu(this, o) } : {}, p = i ? { color: fu(this, o) } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-vertical-button": !0,
      active: i
    })}
        style=${d(l)}
        @click=${this._tap}
      >
        <div class="stack">
          <div class="icon-btn" style=${d(r)}>
            <ha-icon .icon=${a}></ha-icon>
          </div>
          ${n ? c`<div class="name" style=${d(p)}>${n}</div>` : u}
          ${s ? c`<div class="label" style=${d(p)}>
                ${s}
              </div>` : u}
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
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
  }
};
Mi.styles = $`
    ${P}

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
Tn([
  k({ attribute: !1 })
], Mi.prototype, "hass", 2);
Tn([
  y()
], Mi.prototype, "_config", 2);
Mi = Tn([
  C("ulm-vertical-button-card")
], Mi);
var bu = Object.defineProperty, yu = Object.getOwnPropertyDescriptor, Dn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && bu(e, i, r), r;
};
const is = [
  { value: "toggle", label: "toggle" },
  { value: "more-info", label: "more-info" },
  { value: "navigate", label: "navigate" },
  { value: "none", label: "none" }
], vu = /^(yellow|blue|green|red|pink|purple|grey)_(on|off|no_state|no_card)$/;
function os(t) {
  if (!t?.length) return {};
  for (const e of t) {
    const i = String(e).match(vu);
    if (!i) continue;
    const o = i[2];
    return {
      color: i[1],
      color_mode: o === "no_state" || o === "no_card" ? "always" : o
    };
  }
  return {};
}
function wu(t) {
  if (!t) return;
  if (Array.isArray(t))
    return t.map(String).map((i) => i.trim()).filter(Boolean);
  const e = String(t).split(/[,\n]/).map((i) => i.trim()).filter(Boolean);
  return e.length ? e : void 0;
}
function To(t, e, i) {
  if (!t) return i;
  const o = { action: t };
  return t === "navigate" && e && (o.navigation_path = e), o;
}
function xu(t, e = {}) {
  if (!t) return;
  const i = wu(e.flatTemplates);
  if (typeof t == "string") {
    const l = os(i);
    return {
      entity_id: t,
      color: e.flatColor || l.color,
      icon: e.flatIcon,
      templates: i,
      color_mode: l.color_mode || (e.flatColor ? "on" : void 0),
      tap_action: To(e.flatTap, e.flatNavPath, {
        action: "toggle"
      }),
      hold_action: To(e.flatHold, e.flatNavPath, {
        action: "more-info"
      })
    };
  }
  const o = t.templates?.length ? t.templates : i, r = os(o), n = t.entity_id || t.entity || "";
  if (!n) return;
  const a = t.tap_action || { action: "toggle" }, s = t.hold_action || { action: "more-info" };
  return {
    ...t,
    entity_id: n,
    templates: o,
    color: t.color || e.flatColor || r.color,
    icon: t.icon || e.flatIcon,
    color_mode: t.color_mode || r.color_mode || (t.color || e.flatColor ? "on" : void 0),
    tap_action: To(e.flatTap, e.flatNavPath, a),
    hold_action: To(e.flatHold, e.flatNavPath, s)
  };
}
function Do(t) {
  return [
    _(`entity_${t}`, void 0, !1),
    U([E(`entity_${t}_icon`), B(`entity_${t}_color`)]),
    h(`entity_${t}_templates`),
    U([
      K(`entity_${t}_tap_action`, is),
      K(`entity_${t}_hold_action`, is)
    ]),
    h(`entity_${t}_navigation_path`)
  ];
}
function $u(t) {
  return t === "on";
}
let Oi = class extends w {
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
        U([h("name"), E("icon")]),
        _("entity", void 0, !1),
        B("color"),
        h("navigation_path"),
        f("label_use_temperature"),
        f("label_use_brightness"),
        h("label"),
        ...Do(1),
        ...Do(2),
        ...Do(3),
        ...Do(4)
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = e.tap_action, o = e.label_opts || {}, r = {
      entity_1: e.sub1 || {},
      entity_2: e.sub2 || {},
      entity_3: e.sub3 || {},
      entity_4: e.sub4 || {}
    }, n = ["entity_1", "entity_2", "entity_3", "entity_4"];
    this._slots = {};
    const a = {};
    for (const p of n) {
      const m = p.slice(-1), g = r[p] || {}, v = t[p] ?? g[p] ?? g[`entity_${m}`], x = xu(v, {
        flatColor: t[`entity_${m}_color`] || g[`entity_${m}_color`],
        flatIcon: t[`entity_${m}_icon`] || g[`entity_${m}_icon`],
        flatTemplates: t[`entity_${m}_templates`] || g[`entity_${m}_templates`],
        flatTap: t[`entity_${m}_tap_action`] || g[`entity_${m}_tap_action`],
        flatHold: t[`entity_${m}_hold_action`] || g[`entity_${m}_hold_action`],
        flatNavPath: t[`entity_${m}_navigation_path`] || g[`entity_${m}_navigation_path`]
      });
      if (x) {
        this._slots[p] = x, a[p] = x.entity_id, a[`entity_${m}_color`] = x.color, a[`entity_${m}_icon`] = x.icon, x.templates?.length && (a[`entity_${m}_templates`] = x.templates.join(", ")), x.tap_action?.action && (a[`entity_${m}_tap_action`] = x.tap_action.action), x.hold_action?.action && (a[`entity_${m}_hold_action`] = x.hold_action.action);
        const L = x.tap_action?.navigation_path || x.hold_action?.navigation_path;
        L && (a[`entity_${m}_navigation_path`] = L);
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
    if (!this._config || !this.hass) return u;
    const t = !!this._slots.entity_1, e = !!this._slots.entity_2, i = t ? "full" : e ? "three" : "minimal", o = this._config.entity ? this.hass.states[this._config.entity] : void 0, r = o?.state === "unavailable", n = this._config.color, a = n ? b(this, n) : void 0, s = a ? `rgba(${a}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.2)", l = a ? `rgba(${a}, 0.2)` : "rgba(var(--color-theme, 51, 51, 51), 0.05)", p = a ? `rgba(${a}, 1)` : void 0, m = t ? "10%" : e ? "24%" : "15.8%", g = t ? "-10%" : "-24%", v = `calc(100% - (12px + ${e ? 0 : 5}px))`, x = `calc(100% - (12px + ${!t && !e ? 5 : 0}px))`;
    return c`
      <ha-card
        class=${M({
      "ulm-room": !0,
      [`layout-${i}`]: !0
    })}
        @click=${this._cardTap}
      >
        <div
          class="name"
          style=${d({
      color: p,
      marginBottom: m,
      maxWidth: v
    })}
        >
          ${this._config.name || o?.attributes.friendly_name || ""}
        </div>

        <div
          class="label"
          style=${d({
      color: p,
      marginTop: g,
      maxWidth: x
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

        ${r ? c`<div class="notification">
              <ha-icon icon="mdi:exclamation"></ha-icon>
            </div>` : u}

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
    if (!i) return u;
    const o = this.hass?.states[i.entity_id], r = o?.state ?? "unavailable", n = $u(r), a = i.color_mode || "on", s = !!i.color && (a === "always" || a === "on" && n || a === "off" && !n && r !== "unavailable"), l = i.color ? b(this, i.color) : void 0, p = s && l ? {
      color: `rgba(${l}, 1)`,
      backgroundColor: `rgba(${l}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, m = i.icon || o?.attributes.icon || this._domainIcon(i.entity_id);
    return c`
      <button
        class="chip ${e}"
        style=${d(p)}
        title=${o?.attributes.friendly_name || i.entity_id}
        @click=${(g) => this._runAction(g, i.tap_action, i.entity_id)}
        @contextmenu=${(g) => this._runAction(g, i.hold_action, i.entity_id)}
      >
        <ha-icon .icon=${m}></ha-icon>
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
        const r = e?.entity || i;
        this.hass.callService(r.split(".")[0], "toggle", {
          entity_id: r
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
        const r = e.service || e.perform_action, [n, a] = r.includes(".") ? r.split(".", 2) : [i.split(".")[0], r];
        this.hass.callService(n, a, {
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
Oi.styles = $`
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
Dn([
  k({ attribute: !1 })
], Oi.prototype, "hass", 2);
Dn([
  y()
], Oi.prototype, "_config", 2);
Oi = Dn([
  C("ulm-room-card")
], Oi);
var ku = Object.defineProperty, Cu = Object.getOwnPropertyDescriptor, Un = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Cu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ku(e, i, r), r;
};
let Ni = class extends w {
  static getConfigForm() {
    return {
      schema: [
        f("show_back"),
        dl("chips", "Chips", [
          _("chip_1_entity", void 0, !1),
          _("chip_2_entity", void 0, !1),
          _("chip_3_entity", void 0, !1),
          _("chip_4_entity", void 0, !1)
        ])
      ],
      computeLabel: S({
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
    if (!this._config || !this.hass) return u;
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
    const e = t.entity, i = e ? this.hass?.states[e] : void 0, o = t.icon || i?.attributes.icon || "mdi:checkbox-blank-circle", r = t.name || (i ? i.attributes.unit_of_measurement ? `${i.state}${i.attributes.unit_of_measurement}` : i.state : "?");
    return c`
      <button class="chip" @click=${() => this._handleChip(t)}>
        <ha-icon .icon=${o}></ha-icon>
        <span>${r}</span>
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
Ni.styles = $`
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
Un([
  k({ attribute: !1 })
], Ni.prototype, "hass", 2);
Un([
  y()
], Ni.prototype, "_config", 2);
Ni = Un([
  C("ulm-chips-card")
], Ni);
var Su = Object.defineProperty, zu = Object.getOwnPropertyDescriptor, Bn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Su(e, i, r), r;
};
let Ii = class extends w {
  static getConfigForm() {
    return {
      schema: [h("name"), h("label")],
      computeLabel: S({
        name: "Title (name)",
        label: "Subtitle (label)"
      }),
      computeHelper: z({
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
        ${this._config.name ? c`<div class="name">${this._config.name}</div>` : u}
        ${this._config.label ? c`<div class="label">${this._config.label}</div>` : u}
      </div>
    ` : u;
  }
};
Ii.styles = $`
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
Bn([
  k({ attribute: !1 })
], Ii.prototype, "hass", 2);
Bn([
  y()
], Ii.prototype, "_config", 2);
Ii = Bn([
  C("ulm-title-card")
], Ii);
var Eu = Object.defineProperty, Pu = Object.getOwnPropertyDescriptor, Lo = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Eu(e, i, r), r;
};
const Er = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5",
  "entity_6",
  "entity_7"
], Lu = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "purple"
], rs = [
  "blue",
  "yellow",
  "green",
  "purple",
  "red",
  "pink",
  "yellow"
], ns = {
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
}, Pr = {
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
function Wt(t) {
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
            options: Lu.map((e) => ({ value: e, label: e }))
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
function Mu(t) {
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
let te = class extends w {
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
        Wt(1),
        Wt(2),
        Wt(3),
        Wt(4),
        Wt(5),
        Wt(6),
        Wt(7)
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
    for (const n of Er) {
      const a = o[n];
      if (!a || typeof a != "object") continue;
      const s = {};
      for (const [l, p] of Object.entries(a))
        p === "" || p == null || (s[l] = p);
      Object.keys(s).length ? o[n] = s : delete o[n];
    }
    this._config = o;
    const r = { ...this._randomColors };
    Er.forEach((n, a) => {
      const s = o[n];
      s && !s.color && !r[n] && (r[n] = rs[a % rs.length]);
    }), this._randomColors = r;
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
    return ns[t.split("-")[0]] || ns.en;
  }
  /** First name only, Capitalized (e.g. "alessandro sabbadini" → "Alessandro") */
  _userName() {
    const t = this.hass?.user?.name?.trim() || "there", e = t.split(/\s+/)[0] || t;
    return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
  }
  _configuredPills() {
    return Er.map((t) => {
      const e = this._config[t];
      return !e || !e.entity_id && !e.nav_path && !e.name ? null : { key: t, conf: e };
    }).filter(Boolean);
  }
  render() {
    if (!this._config || !this.hass) return u;
    const t = this._isCollapsed(), e = this._configuredPills();
    return c`
      <ha-card
        class=${t ? "ulm-welcome collapsed" : "ulm-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${t || !e.length ? u : c`
              <div class="pills">
                ${e.map(({ key: i, conf: o }) => this._renderPill(i, o))}
              </div>
            `}
      </ha-card>
    `;
  }
  _renderTopbar() {
    const t = this._config.ulm_weather, e = t ? this.hass.states[t] : void 0, i = this._isCollapsed(), o = this._config.ulm_language || this.hass.language || void 0, r = (/* @__PURE__ */ new Date()).toLocaleDateString(o, {
      month: "short",
      day: "numeric"
    }), n = Pr[e?.state || ""] || Pr.default, a = e ? `${n} ${r}` : `${Pr.default} ${r}`;
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
    const i = e.entity_id ? this.hass.states[e.entity_id] : void 0, o = e.color || this._randomColors[t] || "blue", r = b(this, o), n = e.name || i?.attributes.friendly_name || e.entity_id || "", a = e.icon || i?.attributes.icon || "mdi:circle-medium";
    return c`
      <button
        class="pill"
        style=${d({
      "--pill-color": `rgb(${r})`,
      "--pill-bg": `rgba(${r}, 0.2)`
    })}
        @click=${() => this._pillAction(e)}
      >
        <span class="pill-icon">
          <ha-icon .icon=${a}></ha-icon>
        </span>
        <span class="pill-name">${n}</span>
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
    const e = t.entity_id, i = Mu(t.service_data) || {};
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
te.styles = $`
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
Lo([
  k({ attribute: !1 })
], te.prototype, "hass", 2);
Lo([
  y()
], te.prototype, "_config", 2);
Lo([
  y()
], te.prototype, "_randomColors", 2);
Lo([
  y()
], te.prototype, "_localCollapsed", 2);
te = Lo([
  C("ulm-welcome-card")
], te);
var Ou = Object.defineProperty, Nu = Object.getOwnPropertyDescriptor, Fn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Nu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Ou(e, i, r), r;
};
const Iu = /* @__PURE__ */ new Set(["geen", "none", ""]);
function $t(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (typeof o == "string" && o) return o;
  }
}
function Lr(t, e) {
  if (e)
    return t.states[e]?.state;
}
function Uo(t) {
  return t === void 0 ? !0 : Iu.has(t.toLowerCase());
}
function as(t) {
  if (!t) return !1;
  const e = t.toLowerCase();
  return e === "glas" || e === "glass";
}
let ji = class extends w {
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
        _("ulm_card_ophaling_vandaag", void 0, !1),
        _("ulm_card_ophaling_morgen", void 0, !1),
        _("ulm_card_datum_rest", void 0, !1),
        _("ulm_card_datum_papier", void 0, !1),
        _("ulm_card_datum_pmd", void 0, !1),
        _("ulm_card_datum_gft", void 0, !1),
        _("ulm_card_datum_glas", void 0, !1),
        h("ulm_ophaling"),
        h("ulm_volgende_ophaling"),
        h("name"),
        E("icon")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
      ulm_card_ophaling_vandaag: $t(e, "ulm_card_ophaling_vandaag"),
      ulm_card_ophaling_morgen: $t(e, "ulm_card_ophaling_morgen"),
      ulm_card_datum_rest: $t(e, "ulm_card_datum_rest"),
      ulm_card_datum_papier: $t(e, "ulm_card_datum_papier"),
      ulm_card_datum_pmd: $t(e, "ulm_card_datum_pmd"),
      ulm_card_datum_gft: $t(e, "ulm_card_datum_gft"),
      ulm_card_datum_glas: $t(e, "ulm_card_datum_glas"),
      name: t.name,
      ulm_ophaling: $t(e, "ulm_ophaling"),
      ulm_volgende_ophaling: $t(e, "ulm_volgende_ophaling"),
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
    if (!this._config || !this.hass) return u;
    const t = Lr(this.hass, this._config.ulm_card_ophaling_vandaag), e = Lr(this.hass, this._config.ulm_card_ophaling_morgen), i = !Uo(t) || !Uo(e), o = as(t) || as(e), r = t === "unavailable" || e === "unavailable";
    let n = "theme", a = this._config.icon || "mdi:delete";
    i && (n = "green", a = "mdi:recycle"), o && (n = "blue", a = "mdi:bottle-wine-outline"), r && (n = "red");
    const s = this._config.ulm_ophaling || this._config.name || "Garbage collection!", l = this._config.ulm_volgende_ophaling || "Next collections", p = this._config.name || (i ? s : l), m = this._labelLines(t, e), g = n === "theme" ? null : b(this, n === "red" ? "red" : n), v = n === "theme" ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    } : {
      color: `rgba(${g}, 1)`,
      backgroundColor: `rgba(${g}, 0.2)`
    };
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-afvalophaling": !0,
      collecting: i
    })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(v)}>
            <ha-icon .icon=${a}></ha-icon>
            ${r ? c`<span class="badge" aria-hidden="true"
                  ><ha-icon icon="mdi:help"></ha-icon
                ></span>` : u}
          </div>
          <div class="info-btn">
            <div class="name">${p}</div>
            <div class="label">
              ${m.length <= 1 ? m[0] || u : m.map(
      (x) => c`<div class="line">${x}</div>`
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _labelLines(t, e) {
    if (!this._config || !this.hass) return [];
    if (!Uo(t) && t !== void 0)
      return [this._localizeFraction(t)];
    if (!Uo(e) && e !== void 0)
      return [this._localizeFraction(e)];
    const i = [
      [this._config.ulm_card_datum_rest, "Residual"],
      [this._config.ulm_card_datum_papier, "Paper"],
      [this._config.ulm_card_datum_pmd, "PMD"],
      [this._config.ulm_card_datum_gft, "Organic"],
      [this._config.ulm_card_datum_glas, "Glass"]
    ], o = [];
    for (const [r, n] of i) {
      if (!r) continue;
      const a = Lr(this.hass, r);
      a !== void 0 && o.push(`${n} • ${a}`);
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
ji.styles = $`
    ${P}

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
Fn([
  k({ attribute: !1 })
], ji.prototype, "hass", 2);
Fn([
  y()
], ji.prototype, "_config", 2);
ji = Fn([
  C("ulm-custom-card-afvalophaling-card")
], ji);
var ju = Object.defineProperty, Au = Object.getOwnPropertyDescriptor, Hn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Au(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ju(e, i, r), r;
};
function kt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Ai = class extends w {
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
        _("entity", ["input_boolean", "switch"]),
        _("datetime", "input_datetime"),
        h("name"),
        E("icon"),
        B("color"),
        f("force_background_color"),
        f("horizontal"),
        f("collapse"),
        N("step")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = t.entity || kt(e, "ulm_card_alarm_time_entity");
    if (!i) throw new Error("Please define an entity");
    const o = kt(e, "step", "ulm_card_alarm_time_step"), r = typeof o == "number" ? o : Number.parseInt(String(o ?? "15"), 10) || 15;
    this._config = {
      ...t,
      entity: i,
      datetime: kt(e, "datetime", "ulm_card_alarm_time_datetime"),
      name: kt(e, "name", "ulm_card_alarm_time_name") ?? t.name,
      icon: kt(e, "icon", "ulm_card_alarm_time_icon") ?? t.icon,
      color: kt(e, "color", "ulm_card_alarm_time_color") || "blue",
      force_background_color: !!(kt(
        e,
        "force_background_color",
        "ulm_card_alarm_time_force_background_color"
      ) ?? !1),
      horizontal: !!(kt(e, "horizontal", "ulm_card_alarm_time_horizontal") ?? !1),
      collapse: !!(kt(e, "collapse", "ulm_card_alarm_time_collapse") ?? !1),
      step: r,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = b(this, i), r = !!(e && this._config.force_background_color), n = V(
      this,
      e,
      i,
      null,
      !1,
      r
    ), a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:alarm", l = e ? "On" : t.state === "off" ? "Off" : t.state, p = e, m = !!this._config.collapse && !e, g = !!this._config.horizontal, v = r ? { backgroundColor: `rgba(${o}, var(--opacity-bg, 1))` } : {}, x = r ? { color: "rgb(250, 250, 250)" } : {}, A = (this._config.datetime ? this.hass.states[this._config.datetime] : void 0)?.state ?? "—", O = r && !this.hass.themes?.darkMode ? "rgba(250,250,250,0.8)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)", I = r && !this.hass.themes?.darkMode && e ? `rgba(${o}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.9)", j = {
      backgroundColor: O,
      color: I
    };
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-alarm-time": !0,
      active: e,
      "force-bg": r,
      horizontal: g,
      collapsed: m
    })}
        style=${d(v)}
      >
        <div class="stack ${g ? "horizontal" : ""}">
          <div class="row">
            <button
              class="icon-btn"
              style=${d(n)}
              @click=${this._toggle}
            >
              <ha-icon .icon=${s}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfoEntity}>
              <div class="name" style=${d(x)}>${a}</div>
              <div class="label" style=${d(x)}>${l}</div>
            </button>
          </div>

          ${p && !m && this._config.datetime ? c`
                <div
                  class=${M({
      widgets: !0,
      "time-only": g
    })}
                >
                  ${g ? u : c`
                        <button
                          class="widget-btn"
                          style=${d(j)}
                          @click=${() => this._adjust(-1)}
                          aria-label="Decrease alarm time"
                        >
                          <ha-icon icon="mdi:minus"></ha-icon>
                        </button>
                      `}
                  <button
                    class="widget-btn time"
                    style=${d(j)}
                    @click=${this._moreInfoDatetime}
                  >
                    <span class="time-label">${A}</span>
                  </button>
                  ${g ? u : c`
                        <button
                          class="widget-btn"
                          style=${d(j)}
                          @click=${() => this._adjust(1)}
                          aria-label="Increase alarm time"
                        >
                          <ha-icon icon="mdi:plus"></ha-icon>
                        </button>
                      `}
                </div>
              ` : u}
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
    let r = Number.parseInt(o[0], 10), n = Number.parseInt(o[1], 10);
    const a = Number.parseInt(o[2] || "0", 10) || 0;
    if (Number.isNaN(r) || Number.isNaN(n)) return;
    let s = r * 60 + n + t * i;
    s = (s % 1440 + 1440) % 1440, r = Math.floor(s / 60), n = s % 60;
    const l = `${r}:${String(n).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
    this.hass.callService("input_datetime", "set_datetime", {
      entity_id: this._config.datetime,
      time: l
    });
  }
};
Ai.styles = $`
    ${P}

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
Hn([
  k({ attribute: !1 })
], Ai.prototype, "hass", 2);
Hn([
  y()
], Ai.prototype, "_config", 2);
Ai = Hn([
  C("ulm-custom-card-alarm-time-card")
], Ai);
var Tu = Object.defineProperty, Du = Object.getOwnPropertyDescriptor, Mo = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Du(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Tu(e, i, r), r;
};
const Uu = [
  { value: "radialBar", label: "radialBar" },
  { value: "donut", label: "donut" },
  { value: "pie", label: "pie" },
  { value: "line", label: "line" },
  { value: "scatter", label: "scatter" }
], He = "apexcharts-card";
function Q(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Mr(t, e) {
  return typeof t == "string" && Lt.includes(t) ? t : e;
}
function Or(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
function Bu(t) {
  const e = t.split(",").map((i) => Number.parseInt(i.trim(), 10));
  return e.length < 3 || e.some((i) => !Number.isFinite(i)) ? "#3D5AFE" : `#${e.slice(0, 3).map((i) => Math.max(0, Math.min(255, i)).toString(16).padStart(2, "0")).join("")}`;
}
let ee = class extends w {
  constructor() {
    super(...arguments), this._apexMissing = !1, this._chartKey = "", this._chartLoading = !1, this._chartDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        K("chart_type", [...Uu]),
        h("graph_span"),
        _("entity_1"),
        _("entity_2", void 0, !1),
        _("entity_3", void 0, !1),
        h("name_1"),
        h("name_2"),
        h("name_3"),
        E("icon_1"),
        E("icon_2"),
        E("icon_3"),
        B("color_1"),
        B("color_2"),
        B("color_3"),
        N("max_1"),
        N("max_2"),
        N("max_3")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    }, o = i("entity_1"), r = i("entity_2"), n = i("entity_3"), a = (typeof t.entity_1 == "string" ? t.entity_1 : void 0) || o?.entity_id;
    if (!a) throw new Error("Please define entity_1");
    this._config = {
      ...t,
      entity_1: a,
      entity_2: (typeof t.entity_2 == "string" ? t.entity_2 : void 0) || r?.entity_id,
      entity_3: (typeof t.entity_3 == "string" ? t.entity_3 : void 0) || n?.entity_id,
      name_1: Q(e, "name_1", "entity_1_name") || o?.name,
      name_2: Q(e, "name_2", "entity_2_name") || r?.name,
      name_3: Q(e, "name_3", "entity_3_name") || n?.name,
      icon_1: Q(e, "icon_1") || o?.icon,
      icon_2: Q(e, "icon_2") || r?.icon,
      icon_3: Q(e, "icon_3") || n?.icon,
      color_1: Mr(Q(e, "color_1") ?? o?.color, "yellow"),
      color_2: Mr(Q(e, "color_2") ?? r?.color, "blue"),
      color_3: Mr(Q(e, "color_3") ?? n?.color, "green"),
      max_1: Or(Q(e, "max_1") ?? o?.max_value, 100),
      max_2: Or(Q(e, "max_2") ?? r?.max_value, 100),
      max_3: Or(Q(e, "max_3") ?? n?.max_value, 100),
      chart_type: String(Q(e, "chart_type") || "radialBar"),
      graph_span: String(Q(e, "graph_span") || "1d"),
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
    if (!this._config || !this.hass) return u;
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
    const i = b(this, t.color), o = {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    }, r = t.name || e.attributes.friendly_name || e.entity_id, n = t.icon || e.attributes.icon || "mdi:chart-arc", a = this.hass.formatEntityState ? this.hass.formatEntityState(e) : e.attributes.unit_of_measurement ? `${e.state} ${e.attributes.unit_of_measurement}` : e.state;
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
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="series-text">
            <div class="series-name">${r}</div>
            <div class="series-state">${a}</div>
          </div>
        </div>
      </div>
    `;
  }
  _seriesColor(t) {
    const e = getComputedStyle(this).getPropertyValue(`--google-${t}`).trim();
    return e || Bu(b(this, t));
  }
  _buildApexConfig() {
    const t = this._config, e = this._slots(), i = t.chart_type || "radialBar", o = e.map((r) => {
      const n = r.entity ? this.hass.states[r.entity] : void 0, a = r.name || n?.attributes.friendly_name || r.entity || "", s = {
        entity: r.entity,
        name: a,
        color: this._seriesColor(r.color)
      };
      return i === "radialBar" && (s.max = r.max, s.min = 0), s;
    });
    return {
      type: `custom:${He}`,
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
          const r = window;
          if (typeof r.loadCardHelpers == "function") {
            const n = await r.loadCardHelpers();
            this._chartEl = n.createCardElement(
              i
            );
          } else {
            const n = document.createElement(He);
            n.setConfig(i), this._chartEl = n;
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
    if (customElements.get(He)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(He),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(He);
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
ee.styles = $`
    ${P}

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
Mo([
  k({ attribute: !1 })
], ee.prototype, "hass", 2);
Mo([
  y()
], ee.prototype, "_config", 2);
Mo([
  y()
], ee.prototype, "_apexMissing", 2);
Mo([
  ae(".chart-host")
], ee.prototype, "_chartHost", 2);
ee = Mo([
  C("ulm-custom-card-apexcharts-card")
], ee);
var Fu = Object.defineProperty, Hu = Object.getOwnPropertyDescriptor, Oo = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Hu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Fu(e, i, r), r;
};
const Re = "bar-card";
function ft(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Nr(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function ss(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function Ru(t) {
  const e = (t || "var(--google-blue)").trim();
  return Lt.includes(e) ? `var(--google-${e})` : e;
}
let ie = class extends w {
  constructor() {
    super(...arguments), this._barMissing = !1, this._barKey = "", this._barLoading = !1, this._barDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity"),
        h("name"),
        E("icon"),
        B("icon_color"),
        h("bar_color"),
        f("show_icon"),
        f("indicator"),
        f("show_value"),
        N("min"),
        N("max")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = t.entity || ft(e, "ulm_custom_card_bar_card_entity");
    if (!i) throw new Error("Please define an entity");
    const o = ft(
      e,
      "icon_color",
      "ulm_custom_card_bar_card_icon_color"
    );
    let r = "";
    typeof o == "string" && Lt.includes(o) && (r = o), this._config = {
      ...t,
      entity: i,
      name: ft(e, "name", "ulm_custom_card_bar_card_name") || void 0,
      icon: ft(e, "icon", "ulm_custom_card_bar_card_icon") || void 0,
      icon_color: r,
      bar_color: String(
        ft(e, "bar_color", "ulm_custom_card_bar_card_color") || "var(--google-blue)"
      ),
      show_icon: Nr(
        ft(e, "show_icon", "ulm_custom_card_bar_card_show_icon"),
        !0
      ),
      indicator: Nr(
        ft(e, "indicator", "ulm_custom_card_bar_card_indicator"),
        !1
      ),
      show_value: Nr(
        ft(e, "show_value", "ulm_custom_card_bar_card_value", "value"),
        !1
      ),
      min: ss(ft(e, "min", "ulm_custom_card_bar_card_min"), 0),
      max: ss(ft(e, "max", "ulm_custom_card_bar_card_max"), 100),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity], e = this._config.show_icon !== !1;
    return c`
      <ha-card class="ulm-card ulm-bar-card">
        ${e ? this._header(t) : u}
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
      const a = b(this, e);
      i = {
        color: `rgba(${a}, 1)`,
        backgroundColor: `rgba(${a}, 0.2)`
      };
    } else
      i = {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    const o = this._stateLabel(t), r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._config.icon || t.attributes.icon || "mdi:chart-bar";
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
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${r}</div>
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
      type: `custom:${Re}`,
      entities: [{ entity: t.entity }],
      color: Ru(t.bar_color),
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
          const r = window;
          if (typeof r.loadCardHelpers == "function") {
            const n = await r.loadCardHelpers();
            this._barEl = n.createCardElement(i);
          } else {
            const n = document.createElement(Re);
            n.setConfig(i), this._barEl = n;
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
    if (customElements.get(Re)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Re),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Re);
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
ie.styles = $`
    ${P}

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
Oo([
  k({ attribute: !1 })
], ie.prototype, "hass", 2);
Oo([
  y()
], ie.prototype, "_config", 2);
Oo([
  y()
], ie.prototype, "_barMissing", 2);
Oo([
  ae(".bar-host")
], ie.prototype, "_barHost", 2);
ie = Oo([
  C("ulm-custom-card-bar-card-card")
], ie);
var Gu = Object.defineProperty, Wu = Object.getOwnPropertyDescriptor, dr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Wu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Gu(e, i, r), r;
};
function le(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ku(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : typeof t == "string" ? t.length > 0 : e;
}
let ze = class extends w {
  constructor() {
    super(...arguments), this._pictureKey = "", this._pictureLoading = !1, this._pictureDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", "camera"),
        f("show_title"),
        h("name"),
        h("label"),
        E("icon"),
        h("aspect_ratio")
      ],
      computeLabel: S({
        entity: "Camera entity",
        show_title: "Show title header (ulm_custom_card_camera_title)",
        name: "Name (ulm_custom_card_camera_name)",
        label: "Label (ulm_custom_card_camera_label)",
        icon: "Icon",
        aspect_ratio: "Aspect ratio (ulm_custom_card_camera_aspect_ratio)"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || le(e, "ulm_custom_card_camera_entity");
    if (!i) throw new Error("Please define an entity");
    const o = le(
      e,
      "show_title",
      "ulm_custom_card_camera_title",
      "title"
    );
    this._config = {
      ...t,
      entity: i,
      show_title: Ku(o, !1),
      name: le(e, "name", "ulm_custom_card_camera_name") || void 0,
      label: le(e, "label", "ulm_custom_card_camera_label") || void 0,
      icon: le(e, "icon") || void 0,
      aspect_ratio: String(
        le(e, "aspect_ratio", "ulm_custom_card_camera_aspect_ratio") || "16:9"
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
    if (!this._config || !this.hass) return u;
    const t = !!this._config.show_title, e = this.hass.states[this._config.entity];
    return c`
      <ha-card
        class="ulm-card ulm-camera ${t ? "with-title" : "image-only"}"
      >
        ${t ? this._header(e) : u}
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
          @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._moreInfo());
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
            const r = await o.loadCardHelpers();
            this._pictureEl = r.createCardElement(
              e
            );
          } else {
            const r = document.createElement(
              "hui-picture-entity-card"
            );
            r.setConfig(e), this._pictureEl = r;
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
ze.styles = $`
    ${P}

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
dr([
  k({ attribute: !1 })
], ze.prototype, "hass", 2);
dr([
  y()
], ze.prototype, "_config", 2);
dr([
  ae(".picture-host")
], ze.prototype, "_pictureHost", 2);
ze = dr([
  C("ulm-custom-card-camera-card")
], ze);
var Vu = Object.defineProperty, qu = Object.getOwnPropertyDescriptor, Rn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qu(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Vu(e, i, r), r;
};
function G(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Bo(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
const cs = {
  auto: { icon: "mdi:autorenew", color: "green" },
  cool: { icon: "mdi:snowflake", color: "blue" },
  heat: { icon: "mdi:fire", color: "red" },
  dry: { icon: "mdi:water", color: "yellow" },
  heat_cool: { icon: "mdi:sun-snowflake", color: "purple" },
  fan_only: { icon: "mdi:fan", color: "green" },
  off: { icon: "mdi:snowflake-off", color: "grey" }
};
let Ti = class extends w {
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
        _("entity", void 0, !1),
        h("name"),
        E("icon"),
        h("label"),
        _("temperature_entity", "sensor", !1),
        _("humidity_entity", "sensor", !1),
        _("light_entity", "light", !1),
        _("climate_entity", "climate", !1),
        _("cover_entity", "cover", !1),
        E("light_icon_on"),
        E("light_icon_off"),
        E("cover_icon_open"),
        E("cover_icon_closed"),
        E("cover_icon_opening"),
        E("cover_icon_closing"),
        f("dynamic_color"),
        f("enable_light_popup"),
        f("enable_thermostat_popup"),
        f("enable_cover_popup"),
        K("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "toggle", label: "toggle" },
          { value: "none", label: "none" }
        ]),
        h("navigation_path")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    let o = "more-info", r = G(e, "navigation_path") || void 0;
    if (typeof i == "string")
      o = i;
    else if (i && typeof i == "object") {
      const n = i;
      o = n.action || "more-info", r = n.navigation_path || r;
    }
    this._config = {
      ...t,
      entity: G(e, "entity") || void 0,
      name: G(e, "name") || void 0,
      icon: G(e, "icon") || void 0,
      label: G(e, "label") || void 0,
      temperature_entity: G(e, "temperature_entity") || void 0,
      humidity_entity: G(e, "humidity_entity") || void 0,
      light_entity: G(
        e,
        "light_entity",
        "ulm_custom_card_esh_room_light_entity"
      ) || void 0,
      climate_entity: G(
        e,
        "climate_entity",
        "ulm_custom_card_esh_room_climate_entity"
      ) || void 0,
      cover_entity: G(
        e,
        "cover_entity",
        "ulm_custom_card_esh_room_cover_entity"
      ) || void 0,
      light_icon_on: String(
        G(e, "light_icon_on", "ulm_card_esh_room_light_icon_on") || "mdi:lightbulb"
      ),
      light_icon_off: String(
        G(e, "light_icon_off", "ulm_card_esh_room_light_icon_off") || "mdi:lightbulb-off"
      ),
      cover_icon_open: String(
        G(e, "cover_icon_open", "ulm_card_esh_room_cover_icon_open") || "mdi:blinds-open"
      ),
      cover_icon_closed: String(
        G(e, "cover_icon_closed", "ulm_card_esh_room_cover_icon_closed") || "mdi:roller-shade-closed"
      ),
      cover_icon_closing: String(
        G(e, "cover_icon_closing", "ulm_card_esh_room_cover_icon_closing") || "mdi:blinds"
      ),
      cover_icon_opening: String(
        G(e, "cover_icon_opening", "ulm_card_esh_room_cover_icon_opening") || "mdi:blinds"
      ),
      enable_light_popup: Bo(
        G(e, "enable_light_popup", "ulm_card_light_enable_popup"),
        !1
      ),
      enable_thermostat_popup: Bo(
        G(e, "enable_thermostat_popup", "ulm_card_thermostat_enable_popup"),
        !1
      ),
      enable_cover_popup: Bo(
        G(e, "enable_cover_popup", "ulm_card_cover_popup"),
        !1
      ),
      dynamic_color: Bo(
        G(e, "dynamic_color", "ulm_card_dynamic_color"),
        !1
      ),
      tap_action: o,
      navigation_path: r,
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = t.light_entity, i = t.climate_entity, o = t.cover_entity, r = o ? "cover" : i ? "climate" : null, n = e ? this.hass.states[e] : void 0, a = t.entity ? this.hass.states[t.entity] : void 0, s = n || a, l = n?.state === "on", p = this._lightRgb(n), m = !!t.dynamic_color && l && !!p, g = this._cardStyle(l, m, p), v = this._roomIconCellStyle(l, m, p), x = this._roomIconFgStyle(l, m), L = this._nameStyle(l, m, p), A = t.name || a?.attributes.friendly_name || n?.attributes.friendly_name || t.entity || "Room", O = t.icon || a?.attributes.icon || n?.attributes.icon || "mdi:floor-plan", I = this._resolveLabel(s), j = M({
      layout: !0,
      "has-light": !!e,
      "has-climate": r === "climate",
      "has-cover": r === "cover",
      "light-only": !!e && !r,
      "secondary-only": !e && !!r
    });
    return c`
      <ha-card
        class="ulm-card ulm-esh-room"
        style=${d(g)}
        @click=${this._cardTap}
      >
        <div class=${j}>
          <div class="room-icon" style=${d(v)}>
            <ha-icon style=${d(x)} .icon=${O}></ha-icon>
          </div>
          <div class="name" style=${d(L)}>${A}</div>
          <div class="label">${I}</div>
          ${e ? this._lightWidget(e, n) : u}
          ${r === "climate" && i ? this._climateWidget(i) : u}
          ${r === "cover" && o ? this._coverWidget(o) : u}
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
    const o = b(this, "yellow");
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
      const r = [];
      if (i && this.hass.states[i]) {
        const n = this.hass.states[i], a = n.attributes.unit_of_measurement || "°C";
        r.push(`🌡️ ${n.state} ${a}`);
      }
      if (o && this.hass.states[o]) {
        const n = this.hass.states[o], a = n.attributes.unit_of_measurement || "%";
        r.push(`💧 ${n.state} ${a}`);
      }
      if (r.length) return r.join(" ");
    }
    if (!t) return " ";
    if (t.state === "on") {
      const r = Number(t.attributes.brightness);
      if (Number.isFinite(r)) {
        const n = Math.round(r / 2.55);
        if (n) return `${n}%`;
      }
    }
    return this.hass?.formatEntityState?.(t) || t.state;
  }
  _lightWidget(t, e) {
    const i = e?.state === "on", o = this._lightRgb(e), r = !!this._config.dynamic_color && i && !!o, n = i ? this._config.light_icon_on || "mdi:lightbulb" : this._config.light_icon_off || "mdi:lightbulb-off";
    let a = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    if (i) {
      const s = b(this, "yellow");
      a = {
        color: `rgba(${s}, 1)`,
        backgroundColor: r && o ? `rgba(${o.join(", ")}, 0.3)` : `rgba(${s}, 0.2)`
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
        <ha-icon .icon=${n}></ha-icon>
      </button>
    `;
  }
  _climateWidget(t) {
    const i = this.hass.states[t]?.state || "off", o = cs[i] || cs.off, r = i !== "off" && i !== "unavailable", n = b(this, o.color), a = r ? {
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
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
    const r = i === "closed", n = b(this, "blue"), a = r ? {
      color: `rgba(${n}, 1)`,
      backgroundColor: `rgba(${n}, 0.2)`
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
      ht(this, "light", i, {});
      return;
    }
    if (e === "climate" && o.enable_thermostat_popup) {
      ht(this, "thermostat", i);
      return;
    }
    if (e === "cover" && o.enable_cover_popup) {
      ht(this, "cover", i, {});
      return;
    }
    this._moreInfo(i);
  }
};
Ti.styles = $`
    ${P}

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
Rn([
  k({ attribute: !1 })
], Ti.prototype, "hass", 2);
Rn([
  y()
], Ti.prototype, "_config", 2);
Ti = Rn([
  C("ulm-custom-card-esh-room-card")
], Ti);
var Yu = Object.defineProperty, Ju = Object.getOwnPropertyDescriptor, No = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ju(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Yu(e, i, r), r;
};
const Ge = "sun-card", Zu = [
  { value: "24h", label: "24h" },
  { value: "12h", label: "12h" }
], Xu = [
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
].map((t) => ({ value: t, label: t })), Qu = [
  { value: "auto", label: "HA theme (auto)" },
  { value: "true", label: "Dark" },
  { value: "false", label: "Light" }
];
function de(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ls(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function tm(t) {
  return t === !0 || t === "true" || t === "on" ? "true" : t === !1 || t === "false" || t === "off" ? "false" : "auto";
}
let oe = class extends w {
  constructor() {
    super(...arguments), this._sunMissing = !1, this._sunKey = "", this._sunLoading = !1, this._sunDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        h("title"),
        K("language", [
          { value: "", label: "HA language (auto)" },
          ...Xu
        ]),
        K("dark_mode", Qu),
        K("time_format", [...Zu]),
        f("show_azimuth"),
        f("show_elevation")
      ],
      computeLabel: S({
        title: "Title (sun-card title)",
        language: "Language",
        dark_mode: "Dark mode",
        time_format: "Time format (timeFormat)",
        show_azimuth: "Show azimuth (showAzimuth)",
        show_elevation: "Show elevation (showElevation)"
      }),
      computeHelper: z({
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
    const e = t, i = de(e, "time_format", "timeFormat");
    let o = "24h";
    (i === "12h" || i === "24h") && (o = i);
    const r = de(e, "language"), n = typeof r == "string" && r.trim() ? r.trim() : void 0, a = de(e, "title");
    this._config = {
      ...t,
      title: typeof a == "string" ? a : void 0,
      language: n,
      dark_mode: tm(de(e, "dark_mode", "darkMode")),
      show_azimuth: ls(de(e, "show_azimuth", "showAzimuth"), !1),
      show_elevation: ls(
        de(e, "show_elevation", "showElevation"),
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
    return !this._config || !this.hass ? u : c`
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
      type: `custom:${Ge}`,
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
          const r = window;
          if (typeof r.loadCardHelpers == "function") {
            const n = await r.loadCardHelpers();
            this._sunEl = n.createCardElement(
              i
            );
          } else {
            const n = document.createElement(Ge);
            n.setConfig(i), this._sunEl = n;
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
    if (customElements.get(Ge)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(Ge),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(Ge);
  }
};
oe.styles = $`
    ${P}

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
No([
  k({ attribute: !1 })
], oe.prototype, "hass", 2);
No([
  y()
], oe.prototype, "_config", 2);
No([
  y()
], oe.prototype, "_sunMissing", 2);
No([
  ae(".sun-host")
], oe.prototype, "_sunHost", 2);
oe = No([
  C("ulm-custom-card-httpedo13-sun-card")
], oe);
var em = Object.defineProperty, im = Object.getOwnPropertyDescriptor, Io = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? im(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && em(e, i, r), r;
};
const We = "mini-graph-card", Ir = {
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
}, om = [
  { value: 0, color: "var(--info-color)" }
];
function Ct(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function rm(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function ds(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
function nm(t) {
  return t === "" || t === "none" || t === null || t === void 0 ? "" : typeof t == "string" && Lt.includes(t) ? t : "";
}
function nn(t) {
  if (Array.isArray(t)) {
    const e = [];
    for (const i of t) {
      if (!i || typeof i != "object") continue;
      const o = i, r = Number(o.value), n = o.color;
      Number.isFinite(r) && typeof n == "string" && n && e.push({ value: r, color: n });
    }
    return e.length ? e : void 0;
  }
  if (typeof t == "string" && t.trim())
    try {
      return nn(JSON.parse(t));
    } catch {
      return;
    }
}
let re = class extends w {
  constructor() {
    super(...arguments), this._graphMissing = !1, this._graphKey = "", this._graphLoading = !1, this._graphDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", "sensor"),
        _("power_entity", "sensor", !1),
        h("name"),
        E("icon"),
        K("color", [
          { value: "", label: "None (grey)" },
          ...Lt.map((t) => ({ value: t, label: t }))
        ]),
        N("hours"),
        f("hour24"),
        N("height"),
        h("thresholds_json")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = t.entity || Ct(e, "ulm_card_power_details_entity");
    if (!i) throw new Error("Please define an entity");
    const o = Ct(
      e,
      "power_entity",
      "ulm_card_power_details_entity"
    ) || i, r = e.thresholds_json, n = typeof r == "string" && r.trim() ? nn(r) : void 0, a = nn(
      Ct(e, "thresholds", "ulm_card_power_details_thresholds")
    ), s = n || a || void 0, l = s ? JSON.stringify(s) : void 0;
    this._config = {
      ...t,
      entity: i,
      power_entity: o,
      name: Ct(e, "name", "ulm_card_power_details_name") || void 0,
      icon: Ct(e, "icon") || void 0,
      color: nm(
        e.color !== void 0 ? e.color : Ct(e, "color")
      ),
      hours: ds(Ct(e, "hours", "ulm_card_power_details_hours"), 2),
      hour24: rm(
        Ct(e, "hour24", "ulm_card_power_details_24hour"),
        !1
      ),
      height: ds(Ct(e, "height", "ulm_card_power_details_height"), 180),
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
    if (!this._config || !this.hass) return u;
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
    return Ir[t] || Ir[e] || Ir.en;
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
      const n = b(this, e);
      return {
        color: `rgba(${n}, 1)`,
        backgroundColor: `rgba(${n}, 0.2)`
      };
    })() : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, o = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._config.icon || t.attributes.icon || "mdi:flash";
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
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${r}></ha-icon>
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
    const t = this._config, e = t.hours ?? 2, i = t.power_entity || t.entity, o = t.thresholds?.length ? t.thresholds : om;
    return {
      type: `custom:${We}`,
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
          const r = window;
          if (typeof r.loadCardHelpers == "function") {
            const n = await r.loadCardHelpers();
            this._graphEl = n.createCardElement(
              i
            );
          } else {
            const n = document.createElement(We);
            n.setConfig(i), this._graphEl = n;
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
    if (customElements.get(We)) return !0;
    try {
      await Promise.race([
        customElements.whenDefined(We),
        new Promise(
          (t, e) => setTimeout(() => e(new Error("timeout")), 2500)
        )
      ]);
    } catch {
    }
    return !!customElements.get(We);
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
re.styles = $`
    ${P}

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
Io([
  k({ attribute: !1 })
], re.prototype, "hass", 2);
Io([
  y()
], re.prototype, "_config", 2);
Io([
  y()
], re.prototype, "_graphMissing", 2);
Io([
  ae(".graph-host")
], re.prototype, "_graphHost", 2);
re = Io([
  C("ulm-custom-card-damix48-power-details-card")
], re);
var am = Object.defineProperty, sm = Object.getOwnPropertyDescriptor, Gn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? sm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && am(e, i, r), r;
};
const jr = {
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
function pt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ar(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function us(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
let Di = class extends w {
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
        _("entity", "lock"),
        h("name"),
        E("icon"),
        f("tap_control"),
        f("only_open"),
        _("battery_level", ["sensor", "binary_sensor"], !1),
        N("battery_warning"),
        N("battery_warning_low"),
        f("battery_sensor_binary"),
        h("battery_sensor_binary_low_state"),
        _("door_open", "binary_sensor", !1)
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = t.entity || pt(e, "ulm_custom_card_eraycetinay_lock_entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: pt(e, "name") || void 0,
      icon: pt(e, "icon") || void 0,
      tap_control: Ar(
        pt(e, "tap_control", "ulm_custom_card_eraycetinay_lock_tap_control"),
        !1
      ),
      only_open: Ar(
        pt(e, "only_open", "ulm_custom_card_eraycetinay_lock_only_open"),
        !1
      ),
      battery_level: pt(
        e,
        "battery_level",
        "ulm_custom_card_eraycetinay_lock_battery_level"
      ) || void 0,
      battery_warning: us(
        pt(
          e,
          "battery_warning",
          "ulm_custom_card_eraycetinay_lock_battery_warning"
        ),
        20
      ),
      battery_warning_low: us(
        pt(
          e,
          "battery_warning_low",
          "ulm_custom_card_eraycetinay_lock_battery_warning_low"
        ),
        5
      ),
      battery_sensor_binary: Ar(
        pt(
          e,
          "battery_sensor_binary",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary"
        ),
        !1
      ),
      battery_sensor_binary_low_state: String(
        pt(
          e,
          "battery_sensor_binary_low_state",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state"
        ) || "on"
      ),
      door_open: pt(
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-lock"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || (this._isUnlockedLike(t.state) ? "mdi:lock-open" : "mdi:lock"), o = this._tone(t.state), r = this._iconStyle(o), n = this._label(t), a = this._batteryBadge(), s = this._doorOpenBadge(t);
    return c`
      <ha-card class="ulm-lock" @click=${this._cardTap}>
        <div class="grid">
          <div class="img-cell" style=${d(r)}>
            <ha-icon .icon=${i}></ha-icon>
          </div>
          <div class="name">${e}</div>
          <div class="label">${n}</div>

          ${s ? c`<span
                class="badge door"
                title=${s.title}
                style=${d({
      backgroundColor: `rgba(${b(this, "red")}, 1)`
    })}
              >
                <ha-icon .icon=${s.icon}></ha-icon>
              </span>` : u}
          ${a ? c`<span
                class="badge battery"
                title=${a.title}
                style=${d({
      backgroundColor: `rgba(${b(this, a.color)}, 1)`
    })}
              >
                <ha-icon .icon=${a.icon}></ha-icon>
              </span>` : u}
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return jr[t] || jr[e] || jr.en;
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
    const e = b(this, t);
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
    const r = Number.parseFloat(i.state);
    if (!Number.isFinite(r)) return null;
    const n = t.battery_warning ?? 20, a = t.battery_warning_low ?? 5;
    return r <= n ? {
      icon: "mdi:battery-low",
      title: `${o.battery_is_at} ${r}%`,
      color: r <= a ? "red" : "yellow"
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
Di.styles = $`
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
Gn([
  k({ attribute: !1 })
], Di.prototype, "hass", 2);
Gn([
  y()
], Di.prototype, "_config", 2);
Di = Gn([
  C("ulm-custom-card-eraycetinay-lock-card")
], Di);
var cm = Object.defineProperty, lm = Object.getOwnPropertyDescriptor, ur = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? lm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && cm(e, i, r), r;
};
const dm = 5e3, um = "Open", mm = "Closed & Unlocked", _m = "Closed & Locked";
function Ke(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function hm(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function pm(t) {
  return t >= 100 ? "mdi:battery" : t >= 80 ? "mdi:battery-70" : t >= 60 ? "mdi:battery-60" : t >= 50 ? "mdi:battery-50" : "mdi:battery-20";
}
let Ee = class extends w {
  constructor() {
    super(...arguments), this._controlsUnlocked = !1, this._onDoubleTap = (t) => {
      t.preventDefault(), this._config?.require_double_tap_unlock !== !1 && (this._controlsUnlocked = !0, this._clearRelock(), this._relockTimer = window.setTimeout(() => {
        this._controlsUnlocked = !1, this._relockTimer = void 0;
      }, dm));
    };
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", void 0, !1),
        h("name"),
        _("lock_entity", "lock", !1),
        _("battery_entity", "sensor", !1),
        f("require_double_tap_unlock")
      ],
      computeLabel: S({
        entity: "Door state sensor (Open / Closed & …)",
        name: "Door name (ulm_custom_card_entity_1_name)",
        lock_entity: "Lock entity (ulm_custom_card_entity_1_lock)",
        battery_entity: "Battery sensor (ulm_custom_card_entity_1_lock_battery)",
        require_double_tap_unlock: "Double-tap to unlock controls"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Ke(e, "ulm_custom_card_entity_1_door") || "", o = Ke(
      e,
      "lock_entity",
      "ulm_custom_card_entity_1_lock"
    ) || "", r = Ke(
      e,
      "battery_entity",
      "ulm_custom_card_entity_1_lock_battery"
    ) || void 0;
    this._config = {
      ...t,
      entity: i,
      name: Ke(e, "name", "ulm_custom_card_entity_1_name") || void 0,
      lock_entity: o,
      battery_entity: r,
      require_double_tap_unlock: hm(
        Ke(e, "require_double_tap_unlock"),
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
    if (!this._config || !this.hass) return u;
    const t = this._config.entity, e = t ? this.hass.states[t] : void 0, i = this._config.battery_entity, o = i ? this.hass.states[i] : void 0, r = this._config.lock_entity, n = !!(r && this.hass.states[r]), a = this._config.require_double_tap_unlock !== !1, s = !a || this._controlsUnlocked, l = this._config.name || e?.attributes.friendly_name || t || "Door", p = e?.state || "unknown", m = o ? Number.parseFloat(o.state) : NaN, g = Number.isFinite(m), x = g && m <= 40 ? "red" : "green", L = b(this, x), A = b(this, "blue"), O = [];
    return t ? e || O.push(t) : O.push("door state entity"), r ? n || O.push(r) : O.push("lock entity"), i && !o && O.push(i), c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-nik-door": !0,
      locked: a && !s
    })}
        @dblclick=${this._onDoubleTap}
      >
        ${O.length ? c`<div class="warning">
              Missing entity: ${O.join(", ")}
            </div>` : u}
        ${a && !s ? c`<div class="lock-hint" title="Double-tap to unlock controls">
              <ha-icon icon="mdi:lock"></ha-icon>
            </div>` : u}

        <div class="header">
          <div class="icon-wrap">
            <div
              class="door-icon"
              style=${d({
      color: `rgba(${A}, 1)`,
      backgroundColor: `rgba(${A}, 0.2)`
    })}
            >
              <ha-icon icon="mdi:door"></ha-icon>
            </div>
            ${g ? c`<span
                  class="bat-badge"
                  title="Battery ${m}%"
                  style=${d({
      backgroundColor: `rgba(${L}, 1)`
    })}
                >
                  <ha-icon .icon=${pm(m)}></ha-icon>
                </span>` : u}
          </div>
          <!-- Avoid global ulmCardStyles .name/.label (wrong align-self in this layout) -->
          <div class="door-name">${l}</div>
          <div class="door-state">${p}</div>
        </div>

        <div class="widgets ${s ? "" : "disabled"}">
          <button
            class="widget"
            style=${d(this._openWidgetStyle(p))}
            title="Open"
            ?disabled=${!s || !n}
            @click=${(I) => this._open(I)}
          >
            <ha-icon icon="mdi:lock-open-variant"></ha-icon>
          </button>
          <button
            class="widget"
            style=${d(this._lockWidgetStyle(p))}
            title="Lock"
            ?disabled=${!s || !n}
            @click=${(I) => this._lock(I)}
          >
            <ha-icon icon="mdi:lock"></ha-icon>
          </button>
        </div>
      </ha-card>
    `;
  }
  _openWidgetStyle(t) {
    if (t === um) {
      const e = b(this, "red");
      return {
        color: `rgba(${e}, 1)`,
        backgroundColor: `rgba(${e}, 0.2)`
      };
    }
    if (t === mm) {
      const e = b(this, "yellow");
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
    if (t === _m) {
      const e = b(this, "green");
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
Ee.styles = $`
    ${P}

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
ur([
  k({ attribute: !1 })
], Ee.prototype, "hass", 2);
ur([
  y()
], Ee.prototype, "_config", 2);
ur([
  y()
], Ee.prototype, "_controlsUnlocked", 2);
Ee = ur([
  C("ulm-custom-card-nik-door-card")
], Ee);
var gm = Object.defineProperty, fm = Object.getOwnPropertyDescriptor, mr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && gm(e, i, r), r;
};
const ms = ["gray", ...Lt], Ve = {
  icon: "mdi:help-circle-outline",
  icon_color: "gray",
  name: "n/a",
  bg_color: "gray"
};
function bm(t) {
  if (t && typeof t == "object" && !Array.isArray(t))
    return t;
}
function ym(t, e) {
  if (typeof t == "string")
    return {
      entity_id: t,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      icon_color: typeof e?.icon_color == "string" ? e.icon_color : void 0,
      bg_color: typeof e?.bg_color == "string" ? e.bg_color : void 0
    };
  const i = bm(t);
  return i ? {
    entity_id: typeof i.entity_id == "string" ? i.entity_id : void 0,
    icon: typeof i.icon == "string" ? i.icon : void 0,
    icon_color: typeof i.icon_color == "string" ? i.icon_color : void 0,
    name: typeof i.name == "string" ? i.name : void 0,
    bg_color: typeof i.bg_color == "string" ? i.bg_color : void 0
  } : {};
}
function qe(t) {
  return {
    type: "expandable",
    name: `entity_${t}`,
    title: `Scene ${t}`,
    schema: [
      _("entity_id", void 0, !1),
      {
        type: "grid",
        name: "",
        flatten: !0,
        schema: [h("name"), E("icon")]
      },
      K(
        "icon_color",
        ms.map((e) => ({ value: e, label: e }))
      ),
      K(
        "bg_color",
        ms.map((e) => ({ value: e, label: e }))
      )
    ]
  };
}
function _s(t, e, i) {
  const o = (e || "gray").toLowerCase();
  if (o === "gray" || o === "grey")
    return i === "icon" ? "rgba(var(--color-theme, 51, 51, 51), 0.20)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
  const r = Lt.includes(o) ? o : "blue", n = b(t, r);
  return i === "icon" ? `rgba(${n}, 1)` : `rgba(${n}, 0.20)`;
}
let Pe = class extends w {
  constructor() {
    super(...arguments), this._pills = [];
  }
  static getConfigForm() {
    return {
      schema: [
        qe(1),
        qe(2),
        qe(3),
        qe(4),
        qe(5)
      ],
      computeLabel: S({
        entity_id: "Entity",
        name: "Name",
        icon: "Icon",
        icon_color: "Icon color",
        bg_color: "Icon background color"
      }),
      computeHelper: z({
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
      const r = `entity_${o}`;
      i.push(
        ym(e[r], {
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
    return !this._config || !this.hass ? u : c`
      <ha-card class="ulm-card ulm-scenes">
        <div class="pills">
          ${this._pills.map((t, e) => this._renderPill(t, e))}
        </div>
      </ha-card>
    `;
  }
  _renderPill(t, e) {
    const i = t.entity_id || "", o = i ? this.hass.states[i] : void 0, r = t.name || o?.attributes.friendly_name || (i ? i.split(".").pop() : Ve.name) || Ve.name, n = t.icon || o?.attributes.icon || Ve.icon, a = t.icon_color || Ve.icon_color, s = t.bg_color || Ve.bg_color;
    return c`
      <button
        class="pill"
        type="button"
        ?disabled=${!i}
        style=${d({
      "--pill-color": _s(this, a, "icon"),
      "--pill-bg": _s(this, s, "bg")
    })}
        @click=${() => this._activate(i)}
        aria-label=${r}
        data-slot=${e + 1}
      >
        <span class="pill-icon">
          <ha-icon .icon=${n}></ha-icon>
        </span>
        <span class="pill-name">${r}</span>
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
Pe.styles = $`
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
mr([
  k({ attribute: !1 })
], Pe.prototype, "hass", 2);
mr([
  y()
], Pe.prototype, "_config", 2);
mr([
  y()
], Pe.prototype, "_pills", 2);
Pe = mr([
  C("ulm-custom-card-scenes-card")
], Pe);
var vm = Object.defineProperty, wm = Object.getOwnPropertyDescriptor, Wn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && vm(e, i, r), r;
};
const Fo = {
  black: "#000000",
  yellow: "rgb(250, 179, 0)",
  magenta: "rgb(248, 75, 122)",
  cyan: "rgb(66, 126, 222)"
};
function ue(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Kt(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ui = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity"),
        h("name"),
        E("icon"),
        _("black_entity", "sensor", !1),
        _("yellow_entity", "sensor", !1),
        _("magenta_entity", "sensor", !1),
        _("cyan_entity", "sensor", !1)
      ],
      computeLabel: S({
        entity: "Printer status entity",
        name: "Printer name (ulm_card_printer_name)",
        icon: "Icon",
        black_entity: "Black toner (ulm_card_printer_black_name)",
        yellow_entity: "Yellow toner (ulm_card_printer_yellow_name)",
        magenta_entity: "Magenta toner (ulm_card_printer_magenta_name)",
        cyan_entity: "Cyan toner (ulm_card_printer_cyan_name)"
      }),
      computeHelper: z({
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
    const e = t, i = Kt(t.entity);
    if (!i) throw new Error("Please define an entity");
    const o = Kt(
      ue(e, "black_entity", "ulm_card_printer_black_name")
    ) || "", r = Kt(
      ue(e, "yellow_entity", "ulm_card_printer_yellow_name")
    ) || "", n = Kt(
      ue(e, "magenta_entity", "ulm_card_printer_magenta_name")
    ) || "", a = Kt(
      ue(e, "cyan_entity", "ulm_card_printer_cyan_name")
    ) || "";
    this._config = {
      ...t,
      entity: i,
      name: Kt(ue(e, "name", "ulm_card_printer_name")),
      icon: Kt(ue(e, "icon")),
      black_entity: o,
      yellow_entity: r,
      magenta_entity: n,
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
    if (!this._config || !this.hass) return u;
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
        color: Fo.black
      },
      {
        key: "yellow",
        entity: this._config.yellow_entity,
        color: Fo.yellow
      },
      {
        key: "magenta",
        entity: this._config.magenta_entity,
        color: Fo.magenta
      },
      {
        key: "cyan",
        entity: this._config.cyan_entity,
        color: Fo.cyan
      }
    ];
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-mpse-printer": !0,
      active: e
    })}
      >
        ${this._renderHeader(t, e)}
        <div class="toners">
          ${i.map((o, r) => this._renderBar(o, r === i.length - 1))}
        </div>
      </ha-card>
    `;
  }
  _headerStyle(t) {
    if (!t) return {};
    let e = getComputedStyle(this).getPropertyValue("--color-background-blue").trim();
    const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
    i && (e = getComputedStyle(this).getPropertyValue(`--${i[1]}`).trim() || e), /^\d+\s*,/.test(e) || (e = b(this, "blue"));
    const o = getComputedStyle(this).getPropertyValue("--opacity-bg").trim() || "1";
    return { backgroundColor: `rgba(${e}, ${o})` };
  }
  _activeTextColor() {
    let t = getComputedStyle(this).getPropertyValue("--color-blue-text").trim();
    const e = t.match(/^var\(--([a-z0-9-]+)\)$/i);
    return e && (t = getComputedStyle(this).getPropertyValue(`--${e[1]}`).trim() || t), /^\d+\s*,/.test(t) ? `rgba(${t}, 1)` : t.startsWith("#") || t.startsWith("rgb") ? t : `rgba(${b(this, "blue")}, 1)`;
  }
  _renderHeader(t, e) {
    const i = b(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, r = e ? { color: this._activeTextColor() } : {}, n = this._config.name || t.attributes.friendly_name || t.entity_id, a = this._stateLabel(t), s = this._config.icon || t.attributes.icon || "mdi:printer";
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
            <div class="printer-name" style=${d(r)}>${n}</div>
            <div class="printer-state" style=${d(r)}>
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
    const o = Number.parseFloat(i.state), r = Number.isFinite(o) ? Math.max(0, Math.min(100, o)) : 0, n = i.attributes.unit_of_measurement, a = Number.isFinite(o) ? n ? `${Math.round(o)} ${n}` : `${Math.round(o)} %` : i.state;
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
      "--toner-pct": `${r}%`
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
Ui.styles = $`
    ${P}

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
Wn([
  k({ attribute: !1 })
], Ui.prototype, "hass", 2);
Wn([
  y()
], Ui.prototype, "_config", 2);
Ui = Wn([
  C("ulm-custom-card-mpse-printer-card")
], Ui);
var xm = Object.defineProperty, $m = Object.getOwnPropertyDescriptor, Kn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $m(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && xm(e, i, r), r;
};
function Tr(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function km(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function Cm(t) {
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
let Bi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "climate"),
        h("name"),
        N("temp_step")
      ],
      computeLabel: S({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Tr(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Tr(e, "name") || void 0,
      temp_step: km(Tr(e, "temp_step")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-aircondition">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state !== "off", i = b(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this.hass.formatEntityState?.(t) || t.state, a = Cm(t.state), s = t.attributes.temperature, l = s == null || s === "" ? "-°C" : `${s}°C`;
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
              @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), this._moreInfo());
    }}
            >
              <button
                class="icon-btn"
                type="button"
                style=${d(o)}
                tabindex="-1"
                @click=${(p) => {
      p.stopPropagation(), this._moreInfo();
    }}
              >
                <ha-icon .icon=${a}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name">${r}</div>
                <div class="label">${n}</div>
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
Bi.styles = $`
    ${P}

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
Kn([
  k({ attribute: !1 })
], Bi.prototype, "hass", 2);
Kn([
  y()
], Bi.prototype, "_config", 2);
Bi = Kn([
  C("ulm-custom-card-tpx01-aircondition-card")
], Bi);
var Sm = Object.defineProperty, zm = Object.getOwnPropertyDescriptor, Vn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Sm(e, i, r), r;
};
function Dr(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Fi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", [
          "input_number",
          "counter",
          "select",
          "input_select"
        ]),
        h("name"),
        E("icon")
      ],
      computeLabel: S({
        entity: "Entity",
        name: "Name (ulm_card_input_number_name)",
        icon: "Icon"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Dr(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Dr(e, "name", "ulm_card_input_number_name") || void 0,
      icon: Dr(e, "icon") || void 0,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-number"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || "mdi:counter", o = this.hass.formatEntityState?.(t) || t.state, r = t.last_changed ? this._relativeTime(t.last_changed) : "";
    return c`
      <ha-card class="ulm-card ulm-input-number">
        <div class="stack">
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
              <ha-icon .icon=${i}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${e}</div>
              <div class="label">${r}</div>
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
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
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
Fi.styles = $`
    ${P}

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
Vn([
  k({ attribute: !1 })
], Fi.prototype, "hass", 2);
Vn([
  y()
], Fi.prototype, "_config", 2);
Fi = Vn([
  C("ulm-custom-card-input-number-card")
], Fi);
var Em = Object.defineProperty, Pm = Object.getOwnPropertyDescriptor, qn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Em(e, i, r), r;
};
function Ho(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Lm(t, e) {
  if (typeof t == "number" && Number.isFinite(t) && t > 0) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) && i > 0 ? i : e;
}
let Hi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "input_datetime"),
        h("name"),
        E("icon"),
        N("step")
      ],
      computeLabel: S({
        entity: "input_datetime entity",
        name: "Name (ulm_card_input_datetime_name)",
        icon: "Icon",
        step: "Minute step"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Ho(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ho(e, "name", "ulm_card_input_datetime_name") || void 0,
      icon: Ho(e, "icon") || void 0,
      step: Lm(Ho(e, "step"), 15),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-input-datetime"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = this._config.icon || t.attributes.icon || "mdi:clock-outline", o = this.hass.formatEntityState?.(t) || t.state, r = t.last_changed ? this._relativeTime(t.last_changed) : "";
    return c`
      <ha-card class="ulm-card ulm-input-datetime">
        <div class="stack">
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
              <ha-icon .icon=${i}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${e}</div>
              <div class="label">${r}</div>
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
    const r = Number(t.attributes.timestamp);
    if (Number.isFinite(r) && r > 0) {
      const s = new Date(r * 1e3);
      o = s.getHours() * 60 + s.getMinutes() + e;
    } else {
      const l = String(t.state || "00:00:00").split(":"), p = Number.parseInt(l[0] || "0", 10) || 0, m = Number.parseInt(l[1] || "0", 10) || 0;
      o = p * 60 + m + e;
    }
    o = (o % 1440 + 1440) % 1440;
    const n = Math.floor(o / 60), a = o % 60;
    return `${String(n).padStart(2, "0")}:${String(a).padStart(2, "0")}:00`;
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
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
Hi.styles = $`
    ${P}

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
qn([
  k({ attribute: !1 })
], Hi.prototype, "hass", 2);
qn([
  y()
], Hi.prototype, "_config", 2);
Hi = qn([
  C("ulm-custom-card-input-datetime-card")
], Hi);
var Mm = Object.defineProperty, Om = Object.getOwnPropertyDescriptor, Yn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Om(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Mm(e, i, r), r;
};
function me(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function _e(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ro(t) {
  if (!t) return !1;
  const e = t.state;
  return e === "on" || e === "True" || e === "true";
}
let Ri = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "update", !1),
        _("core_entity", "update", !1),
        _("supervisor_entity", "update", !1),
        _("os_entity", "update", !1),
        h("updates_available"),
        h("no_updates_available")
      ],
      computeLabel: S({
        entity: "Main entity (ulm_card_homeassistant_entity)",
        core_entity: "Core update (ulm_card_homeassistant_core)",
        supervisor_entity: "Supervisor (ulm_card_homeassistant_supervisor)",
        os_entity: "OS (ulm_card_homeassistant_os)",
        updates_available: "Title when updates available",
        no_updates_available: "Title when up to date"
      }),
      computeHelper: z({
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
    const e = t, i = _e(
      me(e, "core_entity", "ulm_card_homeassistant_core")
    ), o = _e(me(e, "entity", "ulm_card_homeassistant_entity")) || i || "";
    this._config = {
      ...t,
      entity: o,
      core_entity: i,
      supervisor_entity: _e(
        me(e, "supervisor_entity", "ulm_card_homeassistant_supervisor")
      ),
      os_entity: _e(me(e, "os_entity", "ulm_card_homeassistant_os")),
      updates_available: _e(me(e, "updates_available", "ulm_updates_available")) || "Updates available",
      no_updates_available: _e(me(e, "no_updates_available", "ulm_no_updates_available")) || "Up to date",
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
    if (!this._config || !this.hass) return u;
    const t = this._config.entity || this._config.core_entity || "", e = t ? this.hass.states[t] : void 0, i = this._entity(this._config.core_entity), o = this._entity(this._config.supervisor_entity), r = this._entity(this._config.os_entity), n = Ro(i) || Ro(o) || Ro(r), a = !!e && (e.state === "on" || e.state === "unavailable"), s = b(this, "blue"), l = a ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: `rgba(${s}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, p = n ? this._config.updates_available : this._config.no_updates_available, m = this._labelLines(i, o, r);
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
                  </span>` : u}
            </div>
            <div class="title">${p}</div>
            <div class="subtitle">${m}</div>
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
    return Ro(e) && i && o ? `${t}: ${i} → ${o}` : i ? `${t}: ${i}` : `${t}: ${e.state}`;
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
Ri.styles = $`
    ${sr}

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
Yn([
  k({ attribute: !1 })
], Ri.prototype, "hass", 2);
Yn([
  y()
], Ri.prototype, "_config", 2);
Ri = Yn([
  C("ulm-custom-card-homeassistant-updates-card")
], Ri);
var Nm = Object.defineProperty, Im = Object.getOwnPropertyDescriptor, Jn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Im(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Nm(e, i, r), r;
};
function Vt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Gi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["water_heater", "switch", "climate"]),
        h("name"),
        E("icon"),
        _("consumption_sensor", "sensor", !1),
        h("label_off"),
        h("label_idle"),
        h("label_heating")
      ],
      computeLabel: S({
        entity: "Water heater / switch",
        name: "Name",
        icon: "Icon",
        consumption_sensor: "Consumption sensor (W)",
        label_off: "Label when off",
        label_idle: "Label when idle (0 W)",
        label_heating: "Label prefix when heating"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Vt(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Vt(e, "name") || void 0,
      icon: Vt(e, "icon") || void 0,
      consumption_sensor: Vt(e, "consumption_sensor", "ulm_card_water_heater_consumption") || void 0,
      label_off: Vt(e, "label_off") || void 0,
      label_idle: Vt(e, "label_idle") || void 0,
      label_heating: Vt(e, "label_heating") || void 0,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-water-heater"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._watts(), i = e > 0, o = t.state === "off", r = b(this, "red"), n = i ? {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)"
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = i ? { color: "rgb(250, 250, 250)" } : {}, s = i ? {
      backgroundColor: `rgba(${r}, var(--opacity-bg, 1))`
    } : {}, l = this._config.name || t.attributes.friendly_name || t.entity_id, p = this._config.icon || "mdi:waves", m = this._label(o, i, e);
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-water-heater": !0,
      heating: i
    })}
        style=${d(s)}
        @click=${() => this._moreInfo()}
      >
        <div class="row">
          <div class="icon-btn" style=${d(n)}>
            <ha-icon .icon=${p}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name" style=${d(a)}>${l}</div>
            <div class="label" style=${d(a)}>${m}</div>
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
Gi.styles = $`
    ${P}

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
Jn([
  k({ attribute: !1 })
], Gi.prototype, "hass", 2);
Jn([
  y()
], Gi.prototype, "_config", 2);
Gi = Jn([
  C("ulm-custom-card-water-heater-card")
], Gi);
var jm = Object.defineProperty, Am = Object.getOwnPropertyDescriptor, Zn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Am(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && jm(e, i, r), r;
};
function he(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ye(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Wi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["switch", "input_boolean", "light"]),
        h("name"),
        E("icon"),
        _("power_sensor", "sensor", !1),
        _("energy_sensor", "sensor", !1),
        _("time_sensor", "sensor", !1)
      ],
      computeLabel: S({
        entity: "Outlet / switch",
        name: "Name",
        icon: "Icon",
        power_sensor: "Power (W) — custom_card_more_power_outlet_power_sensor",
        energy_sensor: "Energy (kWh) — custom_card_more_power_outlet_energy_sensor",
        time_sensor: "Runtime — custom_card_more_power_outlet_time_sensor"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || he(e, "entity");
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ye(he(e, "name")),
      icon: Ye(he(e, "icon")),
      power_sensor: Ye(
        he(e, "power_sensor", "custom_card_more_power_outlet_power_sensor")
      ),
      energy_sensor: Ye(
        he(
          e,
          "energy_sensor",
          "custom_card_more_power_outlet_energy_sensor"
        )
      ),
      time_sensor: Ye(
        he(e, "time_sensor", "custom_card_more_power_outlet_time_sensor")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-more-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", o = V(this, e, "yellow", null, !1, !1), r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._config.icon || t.attributes.icon || "mdi:power-socket-eu", a = this.hass.formatEntityState?.(t) || t.state, s = this._buildLabel(e, a);
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-more-outlet": !0,
      on: e
    })}
        @click=${() => this._toggle()}
      >
        <div class="row">
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${r}</div>
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
    const i = this._config, o = this._state(i.power_sensor), r = this._state(i.energy_sensor), n = this._state(i.time_sensor), a = [];
    if (t)
      return o != null && a.push(`${o}W`), r != null && a.push(`${r}kWh`), n != null && a.push(this._timePart(n)), a.length ? a.join(" • ") : e;
    if (r != null) {
      const s = Number.parseFloat(r);
      if (Number.isFinite(s) && s > 0)
        return `${e} • ${r}kWh`;
    }
    return e;
  }
  _toggle() {
    if (!this.hass || !this._config) return;
    const t = this._config.entity, e = t.split(".")[0];
    this.hass.callService(e, "toggle", { entity_id: t });
  }
};
Wi.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-more-outlet {
      height: auto;
      cursor: pointer;
    }
  `;
Zn([
  k({ attribute: !1 })
], Wi.prototype, "hass", 2);
Zn([
  y()
], Wi.prototype, "_config", 2);
Wi = Zn([
  C("ulm-custom-card-more-power-outlet-card")
], Wi);
var Tm = Object.defineProperty, Dm = Object.getOwnPropertyDescriptor, _r = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Dm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Tm(e, i, r), r;
};
function qt(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : t == null || t === "" ? e : !!t;
}
function rt(t) {
  return typeof t == "string" && t.length && t !== "false" ? t : void 0;
}
let Le = class extends w {
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
        _("entity", "fan"),
        U([h("name"), E("icon")]),
        B("color"),
        f("enable_horizontal"),
        f("enable_collapse"),
        f("variant_blue"),
        f("force_background_color"),
        f("enable_slider"),
        f("enable_button"),
        U([N("slider_min"), N("slider_max")]),
        E("button_icon"),
        h("button_service"),
        h("oscillate_attribute"),
        U([h("temp_attribute"), h("hum_attribute")]),
        f("always_show_attributes")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const o = qt(
      t.variant_blue ?? e.variant_blue ?? e.ulm_card_saxel_fan_blue,
      !1
    );
    this._config = {
      ...t,
      entity: i,
      name: t.name ?? e.ulm_card_fan_name,
      icon: rt(t.icon) || rt(e.ulm_card_fan_icon) || void 0,
      color: t.color || e.ulm_card_fan_color || "blue",
      enable_horizontal: qt(
        t.enable_horizontal ?? e.ulm_card_fan_enable_horizontal ?? e.ulm_card_fan_horizontal,
        !1
      ),
      enable_collapse: qt(
        t.enable_collapse ?? e.ulm_card_fan_enable_collapse ?? e.collapsable,
        !0
      ),
      force_background_color: qt(
        t.force_background_color ?? e.ulm_card_fan_force_background_color,
        !1
      ),
      variant_blue: o,
      enable_slider: qt(
        t.enable_slider ?? e.ulm_card_fan_enable_slider,
        !0
      ),
      slider_min: Number(
        t.slider_min ?? e.ulm_card_fan_slider_min ?? 0
      ),
      slider_max: Number(
        t.slider_max ?? e.ulm_card_fan_slider_max ?? 100
      ),
      enable_button: qt(
        t.enable_button ?? e.ulm_card_fan_enable_button ?? e.ulm_show_button,
        !0
      ),
      button_icon: rt(t.button_icon) || rt(e.ulm_card_fan_button_icon) || rt(e.ulm_button_icon) || "mdi:rotate-3d-variant",
      button_service: rt(t.button_service) || rt(e.ulm_card_fan_button_service) || rt(e.ulm_button_service) || "fan.oscillate",
      oscillate_attribute: rt(t.oscillate_attribute) || rt(e.ulm_card_fan_oscillate_attribute) || rt(e.oscillate_attribute) || "oscillate",
      temp_attribute: rt(t.temp_attribute ?? e.ulm_card_fan_temp_attribute) || "temp",
      hum_attribute: rt(t.hum_attribute ?? e.ulm_card_fan_hum_attribute) || "hum",
      always_show_attributes: qt(
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
        const n = Math.round(Number(t.attributes[o]) || 0);
        i += ` • ${n}°C`;
      }
      const r = this._config?.hum_attribute;
      if (r && t.attributes[r] != null) {
        const n = Math.round(Number(t.attributes[r]) || 0);
        i += ` • ${n}%`;
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.color || "blue", o = b(this, i), r = (!!this._config.force_background_color || !!this._config.variant_blue) && e, n = !!this._config.enable_collapse && !e, a = !!this._config.enable_slider && !n, s = !!this._config.enable_button && !!this._config.enable_slider && !n, l = this._config.name || t.attributes.friendly_name || t.entity_id, p = this._config.icon || t.attributes.icon || "mdi:fan", m = this._config.slider_min ?? 0, g = this._config.slider_max ?? 100, v = this._sliderStep(t), x = Number(t.attributes.percentage), A = !Number.isNaN(x) ? Math.min(g, Math.max(m, x)) : e ? g : m, O = this._dragPct != null ? Math.min(g, Math.max(m, this._dragPct)) : A, I = e || this._dragPct != null ? (O - m) / (g - m || 1) * 100 : 0, j = r ? `rgba(${o}, var(--opacity-bg, 1))` : void 0, R = e ? {
      color: r ? "rgb(250,250,250)" : `rgba(${o}, 1)`,
      backgroundColor: r ? "rgba(250,250,250,0.2)" : `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, F = r ? {
      name: { color: "rgb(250,250,250)" },
      label: { color: "rgba(250,250,250,0.85)" }
    } : { name: {}, label: {} }, J = this._oscillating(t), ce = this._oscButtonStyle(e, J, r, o), Be = !!this._config.enable_horizontal;
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      fan: !0,
      "saxel-fan": !0,
      horizontal: Be,
      "force-bg": r
    })}
        style=${d(
      j ? {
        "--ha-card-background": j,
        background: j,
        backgroundColor: j
      } : {}
    )}
      >
        <div class=${M({ stack: !0, horizontal: Be })}>
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${d(R)}
                @click=${() => this._call("toggle")}
              >
                <ha-icon .icon=${p}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._moreInfo}>
                <div class="name" style=${d(F.name)}>
                  ${l}
                </div>
                <div class="label" style=${d(F.label)}>
                  ${this._label(t)}
                </div>
              </button>
            </div>
          </div>

          ${a || s ? c`<div
                class=${M({
      "slider-row": !0,
      "with-button": s
    })}
              >
                ${a ? c`<div
                      class="slider-wrap"
                      style=${d(
      e ? {
        background: r ? `rgba(${o}, 0.3)` : `rgba(${o}, 0.1)`
      } : {
        background: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      }
    )}
                    >
                      <div
                        class="slider-fill"
                        style=${d({
      width: `${I}%`,
      background: e || this._dragPct != null ? r ? "rgb(250,250,250)" : `rgba(${o}, 0.8)` : "rgba(var(--color-grey, 187, 187, 187), 0.8)"
    })}
                      ></div>
                      <input
                        type="range"
                        min=${m}
                        max=${g}
                        step=${v}
                        .value=${String(O)}
                        @input=${this._onSliderInput}
                        @change=${this._onSliderChange}
                      />
                    </div>` : u}
                ${s ? c`<button
                      class="widget-btn osc-btn"
                      style=${d(ce)}
                      @click=${() => this._toggleOscillate(t)}
                      title="oscillate"
                    >
                      <ha-icon
                        icon=${this._config.button_icon || "mdi:rotate-3d-variant"}
                      ></ha-icon>
                    </button>` : u}
              </div>` : u}
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
Le.styles = [
  P,
  $`
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
_r([
  k({ attribute: !1 })
], Le.prototype, "hass", 2);
_r([
  y()
], Le.prototype, "_config", 2);
_r([
  y()
], Le.prototype, "_dragPct", 2);
Le = _r([
  C("ulm-custom-card-saxel-fan-card")
], Le);
var Um = Object.defineProperty, Bm = Object.getOwnPropertyDescriptor, Xn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Um(e, i, r), r;
};
function Je(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ze(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ki = class extends w {
  constructor() {
    super(...arguments), this._moreInfo = () => {
      this._config && this._moreInfoEntity(this._config.entity);
    };
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["device_tracker", "person"]),
        h("name"),
        _("lock_entity", "lock", !1),
        _("energy_entity", "sensor", !1),
        _("range_entity", "sensor", !1)
      ],
      computeLabel: S({
        entity: "Tracker (ulm_card_schumijo_car_tracker)",
        name: "Name (ulm_card_schumijo_car_name)",
        lock_entity: "Lock (ulm_card_schumijo_car_lock)",
        energy_entity: "Energy (ulm_card_schumijo_car_energy_level)",
        range_entity: "Range (ulm_card_schumijo_car_range)"
      }),
      computeHelper: z({
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
    const e = t, i = Ze(
      Je(e, "entity", "ulm_card_schumijo_car_tracker")
    );
    if (!i) throw new Error("Please define a tracker entity");
    this._config = {
      ...t,
      entity: i,
      name: Ze(Je(e, "name", "ulm_card_schumijo_car_name")),
      lock_entity: Ze(Je(e, "lock_entity", "ulm_card_schumijo_car_lock")),
      energy_entity: Ze(
        Je(e, "energy_entity", "ulm_card_schumijo_car_energy_level")
      ),
      range_entity: Ze(
        Je(e, "range_entity", "ulm_card_schumijo_car_range")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-schumijo-car"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, i = t.last_changed ? this._relativeTime(t.last_changed) : "", o = t.state === "home", r = b(this, o ? "blue" : "green"), n = o ? "mdi:home-variant" : "mdi:road-variant", a = this._config.lock_entity, s = a ? this.hass.states[a] : void 0, l = s?.state === "locked", p = b(this, l ? "blue" : "red"), m = l ? "mdi:lock" : "mdi:lock-open";
    return c`
      <ha-card class="ulm-card ulm-schumijo-car">
        <button class="header" @click=${this._moreInfo}>
          <div class="img-wrap">
            <div class="img-cell">
              <ha-icon icon="mdi:car"></ha-icon>
            </div>
            <span
              class="badge tracker"
              style=${d({ backgroundColor: `rgba(${r}, 1)` })}
              title=${t.state}
            >
              <ha-icon .icon=${n}></ha-icon>
            </span>
            ${a ? c`<span
                  class="badge lock"
                  style=${d({
      backgroundColor: `rgba(${p}, 1)`
    })}
                  title=${s?.state || "lock"}
                >
                  <ha-icon .icon=${m}></ha-icon>
                </span>` : u}
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
    const o = Number.parseFloat(i.state), r = Number.isFinite(o) ? String(Math.round(o)) : i.state, n = i.attributes.unit_of_measurement || "", a = n ? `${n} ${e}` : e, s = i.attributes.icon || "mdi:gauge";
    return c`
      <button class="widget" @click=${() => this._moreInfoEntity(t)}>
        <div class="w-row">
          <ha-icon .icon=${s}></ha-icon>
          <span class="w-val">${r}</span>
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
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
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
Ki.styles = [
  P,
  $`
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
Xn([
  k({ attribute: !1 })
], Ki.prototype, "hass", 2);
Xn([
  y()
], Ki.prototype, "_config", 2);
Ki = Xn([
  C("ulm-custom-card-schumijo-car-card")
], Ki);
var Fm = Object.defineProperty, Hm = Object.getOwnPropertyDescriptor, hr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Hm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Fm(e, i, r), r;
};
function at(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Pt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function hs(t, e) {
  return typeof t == "string" && Lt.includes(t) ? t : e;
}
function ps(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function Go(t, e, i) {
  const o = t[`entity_${e}`];
  if (o && typeof o == "object" && !Array.isArray(o)) {
    const r = o;
    return {
      entity: Pt(at(r, "entity_id", "entity")),
      name: Pt(at(r, "name")),
      icon: Pt(at(r, "icon")),
      color: hs(at(r, "color"), i),
      max: ps(at(r, "max", "max_value", "max_1"))
    };
  }
  return {
    entity: Pt(at(t, `entity_${e}`)),
    name: Pt(at(t, `name_${e}`)),
    icon: Pt(at(t, `icon_${e}`)),
    color: hs(at(t, `color_${e}`), i),
    max: ps(at(t, `max_${e}`))
  };
}
let Me = class extends w {
  constructor() {
    super(...arguments), this._metrics = [];
  }
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["switch", "input_boolean"]),
        h("name"),
        E("icon"),
        _("entity_1", void 0, !1),
        _("entity_2", void 0, !1),
        _("entity_3", void 0, !1),
        _("entity_4", void 0, !1),
        h("name_1"),
        h("name_2"),
        h("name_3"),
        h("name_4"),
        E("icon_1"),
        E("icon_2"),
        E("icon_3"),
        E("icon_4"),
        B("color_1"),
        B("color_2"),
        B("color_3"),
        B("color_4"),
        N("max_1"),
        N("max_2"),
        N("max_3"),
        N("max_4")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = Pt(at(e, "entity"));
    if (!i) throw new Error("Please define a power entity");
    const o = ["yellow", "blue", "red", "green"], r = Go(e, 1, o[0]), n = Go(e, 2, o[1]), a = Go(e, 3, o[2]), s = Go(e, 4, o[3]);
    this._metrics = [r, n, a, s], this._config = {
      ...t,
      entity: i,
      name: Pt(at(e, "name")),
      icon: Pt(at(e, "icon")) || "mdi:nas",
      entity_1: r.entity,
      entity_2: n.entity,
      entity_3: a.entity,
      entity_4: s.entity,
      name_1: r.name,
      name_2: n.name,
      name_3: a.name,
      name_4: s.name,
      icon_1: r.icon,
      icon_2: n.icon,
      icon_3: a.icon,
      icon_4: s.icon,
      color_1: r.color,
      color_2: n.color,
      color_3: a.color,
      color_4: s.color,
      max_1: r.max,
      max_2: n.max,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-nik-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = this._config.name || t.attributes.friendly_name || "Status", o = this._config.icon || "mdi:nas", r = b(this, "blue"), n = e ? {
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = this.hass.formatEntityState?.(t) || (e ? "On" : "Off"), s = this._metrics.filter((l) => l.entity);
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-nik-nas": !0,
      on: e
    })}
      >
        <button class="status" @click=${() => this._moreInfo(this._config.entity)}>
          <div class="icon-btn" style=${d(n)}>
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${i}</div>
            <div class="label">${a}</div>
          </div>
        </button>

        ${e && s.length ? c`<div class="metrics">
              ${s.map((l) => this._metricRow(l))}
            </div>` : u}
      </ha-card>
    `;
  }
  _metricRow(t) {
    if (!t.entity || !this.hass) return u;
    const e = this.hass.states[t.entity], i = t.name || e?.attributes.friendly_name || t.entity, o = t.icon || e?.attributes.icon || "mdi:chart-donut", r = b(this, t.color), n = e ? Number.parseFloat(e.state) : NaN, a = e?.attributes.unit_of_measurement || "";
    let s;
    if (!e) s = "—";
    else if (Number.isFinite(n)) {
      const l = Math.round(n * 10) / 10;
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
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
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
Me.styles = [
  P,
  $`
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
hr([
  k({ attribute: !1 })
], Me.prototype, "hass", 2);
hr([
  y()
], Me.prototype, "_config", 2);
hr([
  y()
], Me.prototype, "_metrics", 2);
Me = hr([
  C("ulm-custom-card-nik-nas-card")
], Me);
var Rm = Object.defineProperty, Gm = Object.getOwnPropertyDescriptor, pr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Rm(e, i, r), r;
};
function nt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function lt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Wm(t) {
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
let Oe = class extends w {
  constructor() {
    super(...arguments), this._phases = [];
  }
  static getConfigForm() {
    return {
      schema: [
        _("power_entity", ["switch", "input_boolean"]),
        h("name"),
        E("icon"),
        _("machine_state", void 0, !1),
        _("job_state", void 0, !1),
        _("job_progress", ["sensor", "number"], !1),
        h("job_states"),
        h("label_idle"),
        h("label_running"),
        h("machine_stop_state"),
        h("start_service"),
        h("pause_service"),
        h("stop_service")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = lt(
      nt(e, "power_entity", "ulm_custom_card_washer_power", "entity")
    );
    if (!i) throw new Error("Please define power_entity");
    const o = Wm(
      nt(e, "job_states", "ulm_custom_card_washer_job_states")
    );
    if (this._phases = [], o)
      for (let r = 1; r <= 5; r++) {
        const n = o[`state${r}`];
        n?.name && n?.icon && this._phases.push(n);
      }
    this._config = {
      ...t,
      power_entity: i,
      name: lt(nt(e, "name")),
      icon: lt(nt(e, "icon")),
      machine_state: lt(
        nt(e, "machine_state", "ulm_custom_card_washer_machine_state")
      ),
      job_state: lt(
        nt(e, "job_state", "ulm_custom_card_washer_job_state")
      ),
      job_progress: lt(
        nt(e, "job_progress", "ulm_custom_card_washer_job_progress")
      ),
      job_states: o,
      label_idle: lt(
        nt(e, "label_idle", "ulm_custom_card_washer_label_idle")
      ),
      label_running: lt(
        nt(e, "label_running", "ulm_custom_card_washer_label_running")
      ),
      machine_stop_state: lt(
        nt(
          e,
          "machine_stop_state",
          "ulm_custom_card_washer_machine_stop_state"
        )
      ) || "stop",
      start_service: lt(nt(e, "start_service")),
      pause_service: lt(nt(e, "pause_service")),
      stop_service: lt(nt(e, "stop_service")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.power_entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-haven-washer"
        ><div class="warning">
          Entity not found: ${this._config.power_entity}
        </div></ha-card
      >`;
    const e = t.state === "on", i = b(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this._config.icon || t.attributes.icon || "mdi:washing-machine", a = this._label(e), s = this._config.job_state ? this.hass.states[this._config.job_state]?.state : void 0, l = this._progressPct(), p = e && (!!this._config.start_service || !!this._config.pause_service || !!this._config.stop_service);
    return c`
      <ha-card
        class=${M({
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
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${r}</div>
            <div class="label">${a}</div>
          </div>
        </button>

        ${e && this._phases.length ? c`<div class="phases">
              ${this._phases.map((m) => {
      const g = s != null && m.name != null && String(s).toLowerCase() === String(m.name).toLowerCase();
      return c`
                  <div
                    class=${M({ phase: !0, active: g })}
                    title=${m.name || ""}
                  >
                    <ha-icon .icon=${m.icon || "mdi:circle"}></ha-icon>
                  </div>
                `;
    })}
            </div>` : u}

        ${e && l != null ? c`<div class="progress-wrap">
              <div
                class="progress-fill"
                style=${d({
      width: `${l}%`,
      background: `rgba(${i}, 0.35)`
    })}
              ></div>
              <span class="progress-label">${Math.round(l)}%</span>
            </div>` : u}

        ${p ? c`<div class="controls">
              ${this._config.start_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.start_service)}
                  >
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>` : u}
              ${this._config.pause_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.pause_service)}
                  >
                    <ha-icon icon="mdi:pause"></ha-icon>
                  </button>` : u}
              ${this._config.stop_service ? c`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config.stop_service)}
                  >
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>` : u}
            </div>` : u}
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
Oe.styles = [
  P,
  $`
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
pr([
  k({ attribute: !1 })
], Oe.prototype, "hass", 2);
pr([
  y()
], Oe.prototype, "_config", 2);
pr([
  y()
], Oe.prototype, "_phases", 2);
Oe = pr([
  C("ulm-custom-card-haven-washer-card")
], Oe);
var Km = Object.defineProperty, Vm = Object.getOwnPropertyDescriptor, gr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Vm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Km(e, i, r), r;
};
const qm = [
  { rgb: [255, 255, 255], css: "rgba(255, 255, 255, 0.8)" },
  { rgb: [245, 68, 54], css: "rgba(245, 68, 54, 0.8)" },
  { rgb: [51, 102, 204], css: "rgba(51, 102, 204, 0.8)" },
  { rgb: [51, 204, 51], css: "rgba(51, 204, 51, 0.8)" },
  { rgb: [255, 0, 255], css: "rgba(255, 0, 255, 0.8)" },
  { rgb: [0, 255, 255], css: "rgba(0, 255, 255, 0.8)" }
];
function Wo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
let Ne = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "light"),
        h("name"),
        E("icon"),
        N("transition")
      ],
      computeLabel: S({
        entity: "Light",
        name: "Name (ulm_card_light_colorpick_name)",
        icon: "Icon",
        transition: "Color transition seconds"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Wo(e, "entity");
    if (!i) throw new Error("Please define an entity");
    const o = Number(Wo(e, "transition", "ulm_card_light_colorpick_transition"));
    this._config = {
      ...t,
      entity: i,
      name: Wo(
        e,
        "name",
        "ulm_card_light_colorpick_name",
        "ulm_card_light_slider_horizontal_name"
      ) || void 0,
      icon: Wo(e, "icon") || void 0,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-light-colorpick"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "on", i = b(this, "yellow"), o = t.attributes.brightness, r = e && typeof o == "number" ? Math.round(o / 2.55) : void 0, n = this._dragPct ?? r ?? 0, a = this._config.name || t.attributes.friendly_name || t.entity_id, s = this._config.icon || t.attributes.icon || "mdi:lightbulb", l = V(this, e, "yellow", null, !1, !1), p = r !== void 0 ? `${r}%` : this.hass.formatEntityState?.(t) || t.state, m = e ? {
      backgroundColor: `rgba(${i}, var(--opacity-bg, 1))`
    } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-light-colorpick": !0,
      on: e
    })}
        style=${d(m)}
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
              <div class="label">${p}</div>
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
      width: `${e ? n : 0}%`,
      background: e ? `rgba(${i}, 1)` : "transparent"
    })}
            ></div>
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(Math.max(1, n || 1))}
              @input=${(g) => {
      this._dragPct = Number(g.target.value);
    }}
              @change=${(g) => {
      const v = Number(g.target.value);
      this._dragPct = void 0, this._setBrightness(v);
    }}
            />
          </div>

          ${e ? c`<div class="chips">
                ${qm.map(
      (g) => c`
                    <button
                      class="chip"
                      type="button"
                      style=${d({ background: g.css })}
                      @click=${() => this._setRgb(g.rgb)}
                    ></button>
                  `
    )}
              </div>` : u}
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
Ne.styles = $`
    ${P}

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
gr([
  k({ attribute: !1 })
], Ne.prototype, "hass", 2);
gr([
  y()
], Ne.prototype, "_config", 2);
gr([
  y()
], Ne.prototype, "_dragPct", 2);
Ne = gr([
  C("ulm-custom-card-light-colorpick-card")
], Ne);
var Ym = Object.defineProperty, Jm = Object.getOwnPropertyDescriptor, Qn = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Jm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Ym(e, i, r), r;
};
function gs(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function fs(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Vi = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "media_player"),
        h("name")
      ],
      computeLabel: S({
        entity: "Media player",
        name: "Name"
      }),
      computeHelper: z({
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
    const e = t, i = fs(
      gs(e, "entity", "ulm_card_media_player_with_controls_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: fs(
        gs(e, "name", "ulm_card_media_player_with_controls_name")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-sonos"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "playing", i = V(this, e, "green"), o = this._config.name || t.attributes.friendly_name || t.entity_id, r = t.attributes.icon || "mdi:speaker", n = this._label(t), a = t.state === "paused" || t.state === "off" ? "mdi:play" : "mdi:pause";
    return c`
      <ha-card
        class=${M({
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
              <ha-icon .icon=${r}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label">${n}</div>
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
    const i = t.attributes.source || e, o = Number(t.attributes.volume_level), r = Number.isFinite(o) ? Math.round(o * 100) : 0;
    return `${i} • ${r}%`;
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
Vi.styles = $`
    ${P}

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
Qn([
  k({ attribute: !1 })
], Vi.prototype, "hass", 2);
Qn([
  y()
], Vi.prototype, "_config", 2);
Vi = Qn([
  C("ulm-custom-card-media-player-sonos-card")
], Vi);
var Zm = Object.defineProperty, Xm = Object.getOwnPropertyDescriptor, ta = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xm(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Zm(e, i, r), r;
};
function tt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function dt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function bs(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let qi = class extends w {
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
        _("entity", "person"),
        U([h("name"), E("icon")]),
        f("use_entity_picture"),
        f("multiline"),
        _("zone1", "zone", !1),
        _("zone2", "zone", !1),
        _("address", void 0, !1),
        _("address_locality", void 0, !1),
        _("driving_entity", void 0, !1),
        _("battery_entity", "sensor", !1),
        _("battery_state_entity", void 0, !1),
        _("commute_entity", "sensor", !1),
        E("commute_icon")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = dt(tt(e, "entity", "ulm_card_person_entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: dt(tt(e, "name")),
      icon: dt(tt(e, "icon")) || "mdi:face-man",
      use_entity_picture: bs(
        tt(e, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        !1
      ),
      zone1: dt(tt(e, "zone1", "ulm_card_person_zone1")),
      zone2: dt(tt(e, "zone2", "ulm_card_person_zone2")),
      address: dt(tt(e, "address", "ulm_address")),
      address_locality: dt(
        tt(e, "address_locality", "ulm_address_locality")
      ),
      driving_entity: dt(
        tt(e, "driving_entity", "ulm_card_person_driving_entity")
      ),
      battery_entity: dt(
        tt(e, "battery_entity", "ulm_card_person_battery_entity")
      ),
      battery_state_entity: dt(
        tt(e, "battery_state_entity", "ulm_card_person_battery_state_entity")
      ),
      commute_entity: dt(
        tt(e, "commute_entity", "ulm_card_person_commute_entity")
      ),
      commute_icon: dt(
        tt(
          e,
          "commute_icon",
          "ulm_card_person_commute_icon",
          "ulm_card_person_cummute_icon"
        )
      ) || "mdi:car",
      multiline: bs(tt(e, "multiline", "ulm_multiline"), !0),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-person-info"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.name || t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, r = this._config.icon || "mdi:face-man", n = this._config.multiline !== !1, a = this._badge(t), s = this._label(t), l = this._battery(), p = this._commute();
    return c`
      <ha-card
        class=${M({
      "ulm-person-info": !0,
      multiline: n
    })}
        @click=${this._moreInfo}
      >
        <div
          class="grid"
          style=${d({
      gridTemplateAreas: n ? '"i n" "i l" "battery commute"' : '"i n battery" "i l commute"',
      gridTemplateColumns: n ? "min-content auto" : "min-content auto min-content"
    })}
        >
          <div class=${M({ "img-cell": !0, picture: !!o })}>
            ${o ? c`<img
                  class="entity-picture"
                  src=${o}
                  alt=${e}
                />` : c`<ha-icon class="person-icon" .icon=${r}></ha-icon>`}
          </div>
          <div class="name">${e}</div>
          <div class="label">${s}</div>
          <div class="battery">${l}</div>
          <div class="commute">${p}</div>
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
    return b(this, t);
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
      const o = this.hass.states[e.address_locality], r = o?.attributes?.Locality ?? o?.attributes?.locality;
      if (r != null && r !== "") return String(r);
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
    if (!t || !this.hass) return u;
    const e = this.hass.states[t];
    if (!e?.state && e?.state !== "0") return u;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return u;
    const o = this._config?.battery_state_entity, r = !!o && String(this.hass.states[o]?.state || "").toLowerCase() === "charging", n = this._batteryIcon(i, r), a = this._batteryColor(i);
    return c`
      <ha-icon
        .icon=${n}
        style=${d({ color: `rgba(${a}, 1)` })}
      ></ha-icon>
      <span>${Math.round(i)}%</span>
    `;
  }
  _commute() {
    const t = this._config?.commute_entity;
    if (!t || !this.hass) return u;
    const e = this.hass.states[t];
    if (e?.state == null || e.state === "") return u;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return u;
    let o = "green";
    i >= 60 ? o = "red" : i >= 30 && (o = "yellow");
    const r = this._theme(o), n = this._config?.commute_icon || "mdi:car";
    return c`
      <ha-icon
        .icon=${n}
        style=${d({ color: `rgba(${r}, 1)` })}
      ></ha-icon>
      <span>${i} min</span>
    `;
  }
};
qi.styles = $`
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
ta([
  k({ attribute: !1 })
], qi.prototype, "hass", 2);
ta([
  y()
], qi.prototype, "_config", 2);
qi = ta([
  C("ulm-custom-card-person-info-card")
], qi);
var Qm = Object.defineProperty, t_ = Object.getOwnPropertyDescriptor, ea = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? t_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Qm(e, i, r), r;
};
const Lc = -108, Mc = 108, e_ = Mc - Lc, Oc = 38, i_ = 50, o_ = 48;
function bt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function pe(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ur(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function r_(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function ys(t, e, i, o) {
  const r = (o - 90) * Math.PI / 180;
  return { x: t + i * Math.cos(r), y: e + i * Math.sin(r) };
}
function n_(t, e, i, o, r) {
  const n = ys(t, e, i, o), a = ys(t, e, i, r);
  return `M ${n.x} ${n.y} A ${i} ${i} 0 1 1 ${a.x} ${a.y}`;
}
const vs = n_(i_, o_, Oc, Lc, Mc), ws = e_ / 360 * 2 * Math.PI * Oc;
let Yi = class extends w {
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
        _("download_entity", ["sensor", "number"]),
        _("upload_entity", ["sensor", "number"]),
        _("ping_entity", ["sensor", "number"]),
        h("download_color"),
        h("upload_color"),
        h("ping_color"),
        N("download_max"),
        N("upload_max"),
        N("ping_max"),
        f("round")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = pe(
      bt(
        e,
        "download_entity",
        "ulm_custom_card_speedtest_download_speed_entity"
      )
    ), o = pe(
      bt(
        e,
        "upload_entity",
        "ulm_custom_card_speedtest_upload_speed_entity"
      )
    ), r = pe(
      bt(e, "ping_entity", "ulm_custom_card_speedtest_ping_entity")
    );
    if (!i || !o || !r)
      throw new Error(
        "Please define download_entity, upload_entity, and ping_entity"
      );
    this._config = {
      ...t,
      download_entity: i,
      upload_entity: o,
      ping_entity: r,
      download_color: pe(
        bt(
          e,
          "download_color",
          "ulm_custom_card_speedtest_download_speed_color"
        )
      ) || "var(--google-yellow)",
      upload_color: pe(
        bt(
          e,
          "upload_color",
          "ulm_custom_card_speedtest_upload_speed_color"
        )
      ) || "var(--google-blue)",
      ping_color: pe(
        bt(e, "ping_color", "ulm_custom_card_speedtest_ping_color")
      ) || "var(--google-green)",
      download_max: Ur(
        bt(
          e,
          "download_max",
          "ulm_custom_card_speedtest_download_speed_max"
        ),
        100
      ),
      upload_max: Ur(
        bt(e, "upload_max", "ulm_custom_card_speedtest_upload_speed_max"),
        40
      ),
      ping_max: Ur(
        bt(e, "ping_max", "ulm_custom_card_speedtest_ping_max"),
        85
      ),
      round: r_(bt(e, "round", "ulm_custom_card_speedtest_round"), !1),
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
    if (!this._config || !this.hass) return u;
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
    if (!this.hass || !this._config) return u;
    const e = this.hass.states[t.entity], i = e ? Number.parseFloat(e.state) : NaN, r = (Number.isFinite(i) ? Math.min(1, Math.max(0, i / Math.max(t.max, 1e-9))) : 0) * ws, n = e?.attributes.unit_of_measurement || "";
    let a = "";
    return e?.state != null && e.state !== "" && (Number.isFinite(i) && this._config.round && t.allowRound ? a = String(Math.round(i)) : a = e.state, n && (a += ` ${n}`)), c`
      <div class="st-col">
        <div class="st-gauge" aria-hidden="true">
          ${nr`
            <svg viewBox="0 0 100 72" class="st-svg">
              <path
                class="st-track"
                d=${vs}
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
              />
              <path
                class="st-fill"
                d=${vs}
                fill="none"
                stroke=${t.color}
                stroke-width="7"
                stroke-linecap="round"
                style=${d({
      strokeDasharray: `${r} ${ws}`
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
Yi.styles = [
  P,
  $`
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
ea([
  k({ attribute: !1 })
], Yi.prototype, "hass", 2);
ea([
  y()
], Yi.prototype, "_config", 2);
Yi = ea([
  C("ulm-custom-card-speedtest-shogun160-card")
], Yi);
var a_ = Object.defineProperty, s_ = Object.getOwnPropertyDescriptor, jo = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? s_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && a_(e, i, r), r;
};
const c_ = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5"
], an = [
  "yellow",
  "blue",
  "red",
  "purple",
  "green",
  "pink"
], xs = {
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
function $s(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function l_(t) {
  if (t && typeof t == "object" && !Array.isArray(t))
    return t;
}
function d_(t) {
  let e = 0;
  for (let i = 0; i < t.length; i++)
    e = e * 31 + t.charCodeAt(i) >>> 0;
  return an[e % an.length];
}
function u_(t, e) {
  if (typeof t == "string" && t.length)
    return {
      entity: t,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      color: typeof e?.color == "string" ? e.color : void 0,
      path: typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0
    };
  const i = l_(t);
  if (!i)
    return typeof e?.entity == "string" && e.entity ? {
      entity: e.entity,
      name: typeof e?.name == "string" ? e.name : void 0,
      icon: typeof e?.icon == "string" ? e.icon : void 0,
      color: typeof e?.color == "string" ? e.color : void 0,
      path: typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0
    } : {};
  const o = typeof i.entity == "string" && i.entity || typeof i.entity_id == "string" && i.entity_id || void 0, r = typeof i.path == "string" && i.path || typeof i.nav_path == "string" && i.nav_path || typeof i.nav == "string" && i.nav || typeof e?.path == "string" && e.path || typeof e?.nav_path == "string" && e.nav_path || typeof e?.nav == "string" && e.nav || void 0;
  return {
    entity: o,
    entity_id: o,
    name: typeof i.name == "string" && i.name || typeof e?.name == "string" && e.name || void 0,
    icon: typeof i.icon == "string" && i.icon || typeof e?.icon == "string" && e.icon || void 0,
    color: typeof i.color == "string" && i.color || typeof e?.color == "string" && e.color || void 0,
    path: r,
    nav_path: r,
    nav: r
  };
}
function Ko(t) {
  return t.path || t.nav_path || t.nav || void 0;
}
function Br(t) {
  return t.entity || t.entity_id || void 0;
}
function Xe(t) {
  return {
    type: "expandable",
    name: `entity_${t}`,
    title: `Nav ${t}`,
    schema: [
      _("entity", void 0, !1),
      {
        type: "grid",
        name: "",
        flatten: !0,
        schema: [h("name"), E("icon")]
      },
      h("path"),
      B("color")
    ]
  };
}
function m_(t) {
  const e = {};
  for (const [i, o] of Object.entries(t))
    o === "" || o == null || (e[i] = o);
  return Object.keys(e).length ? e : void 0;
}
let ne = class extends w {
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
        _("weather", "weather", !1),
        _("collapse", "input_boolean", !1),
        Xe(1),
        Xe(2),
        Xe(3),
        Xe(4),
        Xe(5)
      ],
      computeLabel: S({
        weather: "Weather (weather / ulm_weather)",
        collapse: "Collapse toggle (collapse / ulm_card_esh_welcome_collapse)",
        entity: "Entity (optional)",
        name: "Name",
        icon: "Icon",
        path: "Navigation path",
        color: "Icon color"
      }),
      computeHelper: z({
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
    const e = t, i = $s(e, "weather", "ulm_weather") || void 0, o = $s(e, "collapse", "ulm_card_esh_welcome_collapse") || void 0, r = {
      ...t,
      weather: i,
      ulm_weather: i,
      collapse: o,
      ulm_card_esh_welcome_collapse: o,
      type: "custom:ulm-custom-card-esh-welcome-card"
    }, n = [];
    for (const a of c_) {
      const s = Number(a.slice(-1)), l = u_(e[a], {
        entity: e[a] === void 0 ? e[`entity_${s}`] : void 0,
        name: e[`name_${s}`] ?? e[`entity_${s}_name`],
        icon: e[`icon_${s}`] ?? e[`entity_${s}_icon`],
        color: e[`color_${s}`] ?? e[`entity_${s}_color`],
        path: e[`path_${s}`] ?? e[`entity_${s}_path`],
        nav_path: e[`nav_path_${s}`] ?? e[`entity_${s}_nav_path`],
        nav: e[`nav_${s}`] ?? e[`entity_${s}_nav`]
      }), p = m_(l);
      p ? (r[a] = p, n.push(p)) : delete r[a];
    }
    this._navs = n, this._config = r;
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
    return this._navs.filter((t) => !!(Ko(t) || t.name || Br(t) || t.icon));
  }
  _pillColor(t, e) {
    const i = (t.color || "").toString().toLowerCase();
    if (an.includes(i))
      return i;
    const o = Br(t) || Ko(t) || t.name || `nav-${e}`;
    return d_(o);
  }
  /** YAML scale: fewer pills → larger pills (min count treated as 3). */
  _pillScale(t) {
    return 1 + (5 - Math.max(t, 3)) * 0.25;
  }
  render() {
    if (!this._config || !this.hass) return u;
    const t = this._isCollapsed(), e = this._configuredNavs().filter((o) => Ko(o)), i = this._pillScale(e.length);
    return c`
      <ha-card
        class=${t ? "ulm-esh-welcome collapsed" : "ulm-esh-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${t || !e.length ? u : c`
              <div class="nav-row">
                ${e.map((o, r) => this._renderNav(o, r, i))}
              </div>
            `}
      </ha-card>
    `;
  }
  _renderTopbar() {
    const t = this._weatherEntity(), e = t ? this.hass.states[t] : void 0, i = this._isCollapsed(), o = this._collapseEntity(), r = (/* @__PURE__ */ new Date()).toLocaleDateString(
      this.hass.language || void 0,
      { month: "short", day: "numeric" }
    ), a = `${xs[e?.state || ""] || xs.default} ${r}`;
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
    const o = Br(t), r = o ? this.hass.states[o] : void 0, n = this._pillColor(t, e), a = b(this, n), s = t.name || r?.attributes.friendly_name || o?.split(".").pop() || "", l = t.icon || r?.attributes.icon || "mdi:circle-medium", p = Ko(t), m = 52 * i, g = 84 * i, v = 42 * i, x = 20 * i, L = 9.5 * i, A = 33 * i;
    return c`
      <button
        type="button"
        class="nav-pill"
        style=${d({
      "--pill-color": `rgb(${a})`,
      "--pill-bg": `rgba(${a}, 0.2)`,
      width: `${m}px`,
      minWidth: `${m}px`,
      height: `${g}px`,
      "--icon-box": `${v}px`,
      "--icon-size": `${x}px`,
      "--name-size": `${L}px`,
      "--name-width": `${A}px`
    })}
        @click=${() => this._navigate(p)}
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
ne.styles = $`
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
jo([
  k({ attribute: !1 })
], ne.prototype, "hass", 2);
jo([
  y()
], ne.prototype, "_config", 2);
jo([
  y()
], ne.prototype, "_navs", 2);
jo([
  y()
], ne.prototype, "_localCollapsed", 2);
ne = jo([
  C("ulm-custom-card-esh-welcome-card")
], ne);
var __ = Object.defineProperty, h_ = Object.getOwnPropertyDescriptor, ia = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? h_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && __(e, i, r), r;
};
function Qe(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ti(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Ji = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "sensor"),
        h("name"),
        h("text"),
        h("unit"),
        E("icon")
      ],
      computeLabel: S({
        entity: "Sensor",
        name: "Name",
        text: "Label prefix",
        unit: "Unit suffix",
        icon: "Icon"
      }),
      computeHelper: z({
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
    const e = t, i = ti(
      Qe(e, "entity", "ulm_custom_card_nas_sensor")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ti(Qe(e, "name")) || "Nas",
      text: ti(Qe(e, "text", "ulm_custom_card_nas_text")) || "",
      unit: ti(Qe(e, "unit", "ulm_custom_card_nas_unit")) || "",
      icon: ti(Qe(e, "icon")) || "mdi:nas",
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = b(this, "blue"), i = {
      color: `rgba(${e}, 1)`,
      backgroundColor: `rgba(${e}, 0.2)`
    }, o = this._config.name || "Nas", r = this._config.icon || "mdi:nas", n = this._config.text ?? "", a = this._config.unit ?? "", s = `${n} ${t.state}${a}`.trim();
    return c`
      <ha-card class="ulm-card ulm-nas" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${r}></ha-icon>
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
Ji.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-nas {
      height: auto;
      cursor: pointer;
    }
  `;
ia([
  k({ attribute: !1 })
], Ji.prototype, "hass", 2);
ia([
  y()
], Ji.prototype, "_config", 2);
Ji = ia([
  C("ulm-custom-card-nas-card")
], Ji);
function fr(t, e) {
  e?.themes?.darkMode ? t.setAttribute("dark", "") : t.removeAttribute("dark");
}
const br = $`
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
var p_ = Object.defineProperty, g_ = Object.getOwnPropertyDescriptor, oa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? g_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && p_(e, i, r), r;
};
function f_(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function b_(t) {
  return typeof t == "string" && t ? t : void 0;
}
let Zi = class extends w {
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
      schema: [_("entity", "person")],
      computeLabel: S({
        entity: "Person entity"
      }),
      computeHelper: z({
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
    const i = b_(
      f_(t, "entity", "ulm_custom_card_person_chip_entity")
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
    fr(this, this.hass);
  }
  render() {
    if (!this._config || !this.hass) return u;
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
Zi.styles = [
  br,
  $`
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
oa([
  k({ attribute: !1 })
], Zi.prototype, "hass", 2);
oa([
  y()
], Zi.prototype, "_config", 2);
Zi = oa([
  C("ulm-custom-card-person-chip-card")
], Zi);
var y_ = Object.defineProperty, Nc = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && y_(e, i, r), r;
};
const ks = "ulm-custom-card-battery-chip-card", Cs = "ulm-custom-card-iabadia-battery-chip-card";
function Vo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ss(t) {
  return typeof t == "string" && t ? t : void 0;
}
function zs(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
const Na = class Na extends w {
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
        _("entity", "sensor"),
        E("icon"),
        N("warning"),
        N("danger")
      ],
      computeLabel: S({
        entity: "Battery entity",
        icon: "Icon",
        warning: "Warning threshold %",
        danger: "Danger threshold %"
      }),
      computeHelper: z({
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
    const i = e, o = Ss(
      Vo(i, "entity", "ulm_custom_card_iAbadia_battery_chip_entity")
    );
    if (!o) throw new Error("Please define an entity");
    this._config = {
      ...e,
      entity: o,
      icon: Ss(Vo(i, "icon", "ulm_custom_card_iAbadia_battery_chip_icon")) || "mdi:battery",
      warning: zs(
        Vo(i, "warning", "ulm_custom_card_iAbadia_battery_chip_warning"),
        20
      ),
      danger: zs(
        Vo(i, "danger", "ulm_custom_card_iAbadia_battery_chip_danger"),
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
    fr(this, this.hass);
  }
  render() {
    if (!this._config || !this.hass) return u;
    const e = this.hass.states[this._config.entity];
    if (!e)
      return c`<button class="chip" disabled>
        <ha-icon .icon=${"mdi:battery-alert"}></ha-icon>
      </button>`;
    const i = Math.round(Number.parseFloat(e.state) || 0), o = this._config.warning ?? 20, r = this._config.danger ?? 10;
    let n = "var(--google-red)";
    i > o ? n = "var(--google-green)" : i > r && (n = "var(--google-yellow)");
    const a = this._config.icon || "mdi:battery";
    return c`
      <button class="chip" @click=${this._onTap}>
        <ha-icon .icon=${a} style=${d({ color: n })}></ha-icon>
      </button>
    `;
  }
};
Na.styles = [
  br,
  $`
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
let Ie = Na;
Nc([
  k({ attribute: !1 })
], Ie.prototype, "hass");
Nc([
  y()
], Ie.prototype, "_config");
class v_ extends Ie {
}
customElements.get(ks) || customElements.define(ks, Ie);
customElements.get(Cs) || customElements.define(Cs, v_);
var w_ = Object.defineProperty, x_ = Object.getOwnPropertyDescriptor, ra = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? x_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && w_(e, i, r), r;
};
function Es(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ps(t) {
  return typeof t == "string" && t ? t : void 0;
}
function $_(t) {
  return t >= -50 ? "mdi:wifi-strength-4" : t >= -60 ? "mdi:wifi-strength-3" : t >= -70 ? "mdi:wifi-strength-2" : t >= -80 ? "mdi:wifi-strength-1" : "mdi:wifi-strength-off";
}
let Xi = class extends w {
  static getConfigForm() {
    return {
      schema: [_("entity", "sensor"), h("name")],
      computeLabel: S({
        entity: "WiFi signal entity (dBm)",
        name: "Name"
      }),
      computeHelper: z({
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
    const e = t, i = Ps(Es(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ps(Es(e, "name")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-mpse-wifisignal"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Number.parseFloat(t.state), i = Number.isFinite(e) ? $_(e) : "mdi:wifi-strength-off", o = this._config.name || t.attributes.friendly_name || t.entity_id, r = `${t.state} dBm`;
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
            <div class="label">${r}</div>
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
Xi.styles = $`
    ${P}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-mpse-wifisignal {
      height: auto;
      cursor: pointer;
    }
  `;
ra([
  k({ attribute: !1 })
], Xi.prototype, "hass", 2);
ra([
  y()
], Xi.prototype, "_config", 2);
Xi = ra([
  C("ulm-custom-card-mpse-wifisignal-card")
], Xi);
var k_ = Object.defineProperty, C_ = Object.getOwnPropertyDescriptor, na = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? C_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && k_(e, i, r), r;
};
function ge(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function qo(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ls(t) {
  if (t === "bluetooth" || t === "lan" || t === "home") return t;
}
const Ms = [
  { value: "home", label: "Home" },
  { value: "bluetooth", label: "Bluetooth" },
  { value: "lan", label: "LAN" }
];
let Qi = class extends w {
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
        _("entity", ["device_tracker", "person"]),
        E("icon"),
        _("tracker_1", ["device_tracker", "person", "binary_sensor"], !1),
        K("tracker_1_type", Ms),
        _("tracker_2", ["device_tracker", "person", "binary_sensor"], !1),
        K("tracker_2_type", Ms)
      ],
      computeLabel: S({
        entity: "Device / person",
        icon: "Icon",
        tracker_1: "Tracker 1",
        tracker_1_type: "Tracker 1 type",
        tracker_2: "Tracker 2",
        tracker_2_type: "Tracker 2 type"
      }),
      computeHelper: z({
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
    const e = t, i = qo(ge(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: qo(
        ge(e, "icon", "ulm_custom_card_device_tracker_icon")
      ),
      tracker_1: qo(
        ge(e, "tracker_1", "ulm_custom_card_device_tracker_tracker_1_entity")
      ),
      tracker_1_type: Ls(
        ge(e, "tracker_1_type", "ulm_custom_card_device_tracker_tracker_1_type")
      ) || "home",
      tracker_2: qo(
        ge(e, "tracker_2", "ulm_custom_card_device_tracker_tracker_2_entity")
      ),
      tracker_2_type: Ls(
        ge(e, "tracker_2_type", "ulm_custom_card_device_tracker_tracker_2_type")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-device-tracker"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "not_home", i = b(this, "green"), o = e ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    } : {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    }, r = t.attributes.friendly_name || t.entity_id, n = this._config.icon || t.attributes.icon || "mdi:cellphone", a = this.hass.formatEntityState?.(t) || t.state;
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-device-tracker": !0,
      home: !e
    })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(o)}>
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${r}</div>
            <div class="label">${a}</div>
          </div>
        </div>
        ${this._badge(this._config.tracker_1, this._config.tracker_1_type, 1)}
        ${this._badge(this._config.tracker_2, this._config.tracker_2_type, 2)}
      </ha-card>
    `;
  }
  _badge(t, e, i) {
    if (!t || !this.hass) return u;
    const o = this.hass.states[t];
    if (!o) return u;
    const r = o.state === "home", n = b(this, r ? "blue" : "green"), a = this._trackerIcon(r, e || "home");
    return c`
      <span
        class=${M({
      "tracker-badge": !0,
      [`tracker-${i}`]: !0
    })}
        style=${d({ backgroundColor: `rgba(${n}, 1)` })}
      >
        <ha-icon .icon=${a}></ha-icon>
      </span>
    `;
  }
  _trackerIcon(t, e) {
    return e === "bluetooth" ? t ? "mdi:bluetooth" : "mdi:bluetooth-off" : e === "lan" ? t ? "mdi:lan-connect" : "mdi:lan-disconnect" : t ? "mdi:home-variant" : "mdi:home-minus";
  }
};
Qi.styles = $`
    ${P}

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
na([
  k({ attribute: !1 })
], Qi.prototype, "hass", 2);
na([
  y()
], Qi.prototype, "_config", 2);
Qi = na([
  C("ulm-custom-card-device-tracker-card")
], Qi);
var S_ = Object.defineProperty, z_ = Object.getOwnPropertyDescriptor, aa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? z_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && S_(e, i, r), r;
};
function Os(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ns(t) {
  return typeof t == "string" && t ? t : void 0;
}
let to = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "media_player"),
        h("name")
      ],
      computeLabel: S({
        entity: "Chromecast / media player",
        name: "Name"
      }),
      computeHelper: z({
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
    const e = t, i = Ns(
      Os(e, "entity", "ulm_card_media_player_with_controls_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ns(
        Os(e, "name", "ulm_card_media_player_with_controls_name")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-chromecast"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state !== "unavailable", i = V(this, e, "blue"), o = this._config.name || t.attributes.friendly_name || t.entity_id, r = t.attributes.icon || "mdi:cast", n = this.hass.formatEntityState?.(t) || t.state, a = t.state === "paused" || t.state === "off" ? "mdi:play" : "mdi:pause";
    return c`
      <ha-card
        class=${M({
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
              <ha-icon .icon=${r}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label">${n}</div>
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
to.styles = $`
    ${P}

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
aa([
  k({ attribute: !1 })
], to.prototype, "hass", 2);
aa([
  y()
], to.prototype, "_config", 2);
to = aa([
  C("ulm-custom-card-chromecast-card")
], to);
var E_ = Object.defineProperty, P_ = Object.getOwnPropertyDescriptor, sa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? P_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && E_(e, i, r), r;
};
function Is(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function js(t) {
  return typeof t == "string" && t ? t : void 0;
}
let eo = class extends w {
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
        _("entity", "media_player"),
        h("name")
      ],
      computeLabel: S({
        entity: "PlayStation media player",
        name: "Name"
      }),
      computeHelper: z({
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
    const e = t, i = js(Is(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: js(Is(e, "name")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-playstation"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._picture(t), i = !!e && t.state === "playing", o = t.state === "idle", r = i ? {
      color: "white",
      backgroundColor: "transparent"
    } : V(this, o, "blue"), n = t.attributes.friendly_name || t.entity_id, a = t.attributes.media_title, s = i ? a || this._config.name || n : this._config.name || n, l = i ? n : this.hass.formatEntityState?.(t) || t.state, p = t.attributes.icon || "mdi:sony-playstation", m = i ? {
      background: `center / cover url("${e}") rgba(0, 0, 0, 0.15)`,
      backgroundBlendMode: "multiply"
    } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-playstation": !0,
      cover: i,
      idle: o
    })}
        style=${d(m)}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(r)}>
            <ha-icon .icon=${p}></ha-icon>
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
eo.styles = $`
    ${P}

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
sa([
  k({ attribute: !1 })
], eo.prototype, "hass", 2);
sa([
  y()
], eo.prototype, "_config", 2);
eo = sa([
  C("ulm-custom-card-playstation-card")
], eo);
var L_ = Object.defineProperty, M_ = Object.getOwnPropertyDescriptor, yr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? M_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && L_(e, i, r), r;
};
function Fr(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function As(t) {
  return typeof t == "string" && t ? t : void 0;
}
function O_(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function N_(t) {
  return t < 10 ? `0${t}` : String(t);
}
let je = class extends w {
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
        f("switch_enable"),
        _("switch", ["input_boolean", "switch"], !1),
        h("language")
      ],
      computeLabel: S({
        switch_enable: "Enable switch toggle",
        switch: "Switch entity",
        language: "Date locale"
      }),
      computeHelper: z({
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
      switch: As(Fr(e, "switch", "ulm_custom_card_nik_clock_switch")),
      switch_enable: O_(
        Fr(e, "switch_enable", "ulm_custom_card_nik_clock_switch_enable"),
        !1
      ),
      language: As(Fr(e, "language", "ulm_language")),
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
    if (!this._config) return u;
    const t = `${this._now.getHours()}:${N_(this._now.getMinutes())}`, e = this._config.language || this.hass?.language || void 0, i = this._now.toLocaleDateString(e, {
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
je.styles = $`
    ${P}

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
yr([
  k({ attribute: !1 })
], je.prototype, "hass", 2);
yr([
  y()
], je.prototype, "_config", 2);
yr([
  y()
], je.prototype, "_now", 2);
je = yr([
  C("ulm-custom-card-nik-clock-card")
], je);
var I_ = Object.defineProperty, j_ = Object.getOwnPropertyDescriptor, ca = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? j_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && I_(e, i, r), r;
};
function Ts(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ds(t) {
  return typeof t == "string" && t ? t : void 0;
}
let io = class extends w {
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
      schema: [h("name"), h("nav")],
      computeLabel: S({
        name: "Title",
        nav: "Navigation path"
      }),
      computeHelper: z({
        name: "Legacy: ulm_custom_card_wilbiev_title_name",
        nav: "Legacy: ulm_custom_card_wilbiev_title_nav — shows back chevron when set"
      })
    };
  }
  static getStubConfig() {
    return { name: "Title" };
  }
  setConfig(t) {
    const e = t, i = Ds(Ts(e, "name", "ulm_custom_card_wilbiev_title_name")) || "Title", o = Ds(Ts(e, "nav", "ulm_custom_card_wilbiev_title_nav"));
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
    if (!this._config) return u;
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
              ` : u}
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
io.styles = $`
    ${P}

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
ca([
  k({ attribute: !1 })
], io.prototype, "hass", 2);
ca([
  y()
], io.prototype, "_config", 2);
io = ca([
  C("ulm-custom-card-wilbiev-title-card")
], io);
var A_ = Object.defineProperty, T_ = Object.getOwnPropertyDescriptor, la = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? T_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && A_(e, i, r), r;
};
function D_(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function U_(t) {
  return typeof t == "string" && t ? t : void 0;
}
let oo = class extends w {
  static getConfigForm() {
    return {
      schema: [h("name")],
      computeLabel: S({
        name: "Subtitle"
      }),
      computeHelper: z({
        name: "Legacy: ulm_custom_card_wilbiev_subtitle_name (also accepts wilbiev_title_name typo)"
      })
    };
  }
  static getStubConfig() {
    return { name: "Subtitle" };
  }
  setConfig(t) {
    const i = U_(
      D_(
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
    ` : u;
  }
};
oo.styles = $`
    ${P}

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
la([
  k({ attribute: !1 })
], oo.prototype, "hass", 2);
la([
  y()
], oo.prototype, "_config", 2);
oo = la([
  C("ulm-custom-card-wilbiev-subtitle-card")
], oo);
var B_ = Object.defineProperty, F_ = Object.getOwnPropertyDescriptor, da = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? F_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && B_(e, i, r), r;
};
const fe = {
  light_0: "No lights on",
  light_1: "1 light on",
  light_many: "lights on",
  cover_0: "No covers open",
  cover_1: "1 cover open",
  cover_many: "covers open"
};
function ut(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function yt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function H_(t, e = !1) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function R_(t, e = "yellow") {
  if (typeof t != "string" || !t) return e;
  const i = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(i) ? i : e;
}
function Ic(t, e) {
  const i = e.match(/^var\(--([a-z0-9-]+)\)$/i);
  return i && getComputedStyle(t).getPropertyValue(`--${i[1]}`).trim() || e;
}
function G_(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-background-${e}`).trim();
  return i = Ic(t, i), /^\d+\s*,/.test(i) || (i = b(t, e)), i;
}
function W_(t, e) {
  let i = getComputedStyle(t).getPropertyValue(`--color-${e}-text`).trim();
  return i = Ic(t, i), /^\d+\s*,/.test(i) ? i : b(t, e);
}
let ro = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["sensor", "counter"]),
        K("count_type", [
          { value: "light", label: "Lights" },
          { value: "cover", label: "Covers" }
        ]),
        E("icon_on"),
        E("icon_off"),
        B("color"),
        f("force_background_color"),
        h("light_0"),
        h("light_1"),
        h("light_many"),
        h("cover_0"),
        h("cover_1"),
        h("cover_many")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = yt(ut(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    const r = yt(
      ut(
        e,
        "count_type",
        "ulm_custom_card_yagrasdemonde_lights_count_type"
      )
    ) === "cover" ? "cover" : "light";
    this._config = {
      ...t,
      entity: i,
      count_type: r,
      icon_on: yt(
        ut(e, "icon_on", "ulm_custom_card_yagrasdemonde_lights_count_icon_on")
      ),
      icon_off: yt(
        ut(
          e,
          "icon_off",
          "ulm_custom_card_yagrasdemonde_lights_count_icon_off"
        )
      ) || "mdi:lightbulb-outline",
      color: R_(
        ut(e, "color", "ulm_custom_card_yagrasdemonde_lights_count_color"),
        "yellow"
      ),
      force_background_color: H_(
        ut(
          e,
          "force_background_color",
          "ulm_custom_card_yagrasdemonde_lights_count_force_background_color"
        ),
        !1
      ),
      light_0: yt(
        ut(e, "light_0", "ulm_custom_card_yagrasdemonde_lights_count_light_0")
      ) || fe.light_0,
      light_1: yt(
        ut(e, "light_1", "ulm_custom_card_yagrasdemonde_lights_count_light_1")
      ) || fe.light_1,
      light_many: yt(
        ut(
          e,
          "light_many",
          "ulm_custom_card_yagrasdemonde_lights_count_light_many"
        )
      ) || fe.light_many,
      cover_0: yt(
        ut(e, "cover_0", "ulm_custom_card_yagrasdemonde_lights_count_cover_0")
      ) || fe.cover_0,
      cover_1: yt(
        ut(e, "cover_1", "ulm_custom_card_yagrasdemonde_lights_count_cover_1")
      ) || fe.cover_1,
      cover_many: yt(
        ut(
          e,
          "cover_many",
          "ulm_custom_card_yagrasdemonde_lights_count_cover_many"
        )
      ) || fe.cover_many,
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-lights-count"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "unavailable" ? NaN : Number.parseFloat(t.state), i = Number.isFinite(e) && e >= 1, o = this._config.color || "yellow", r = b(this, o), n = W_(this, o), a = G_(this, o), s = !!this.hass.themes?.darkMode, l = i && (!!this._config.force_background_color || s), p = this._config.icon_off || "mdi:lightbulb-outline", m = this._config.icon_on || t.attributes.icon || "mdi:lightbulb", g = i ? m : p, v = i ? {
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, x = i ? l ? { backgroundColor: `rgba(${n}, 0.1)` } : {
      backgroundColor: `rgba(${a}, var(--opacity-bg, 1))`
    } : {}, L = i ? { color: `rgba(${n}, 1)` } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-lights-count": !0,
      active: i,
      "force-bg": l
    })}
        style=${d(x)}
      >
        <div class="row">
          <div class="icon-btn" style=${d(v)}>
            <ha-icon .icon=${g}></ha-icon>
          </div>
          <div class="label" style=${d(L)}>
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
    const r = (o ? i.cover_many : i.light_many) || "";
    return `${t} ${r}`;
  }
};
ro.styles = $`
    ${P}

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
da([
  k({ attribute: !1 })
], ro.prototype, "hass", 2);
da([
  y()
], ro.prototype, "_config", 2);
ro = da([
  C("ulm-custom-card-yagrasdemonde-lights-count-card")
], ro);
var K_ = Object.defineProperty, V_ = Object.getOwnPropertyDescriptor, ua = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? V_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && K_(e, i, r), r;
};
const q_ = [
  "group_lights",
  "group_motions",
  "group_doors",
  "group_windows",
  "group_outlets",
  "group_water"
];
function ei(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ii(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ot(t, e) {
  if (!e) return [];
  const i = t.states[e];
  if (!i) return [];
  const o = i.attributes.entity_id;
  return Array.isArray(o) ? o.filter((r) => typeof r == "string" && !!r) : [];
}
let no = class extends w {
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
        E("icon"),
        _("temperature", ["sensor"], !1),
        _("humidity", ["sensor"], !1),
        _("group_lights", ["group", "light"], !1),
        _("group_motions", ["group", "binary_sensor"], !1),
        _("group_doors", ["group", "binary_sensor"], !1),
        _("group_windows", ["group", "binary_sensor"], !1),
        _("group_outlets", ["group", "switch"], !1),
        _("group_tv", ["group", "media_player", "switch"], !1),
        _("group_water", ["group", "binary_sensor"], !1),
        _("group_windows_shutters", ["group", "cover"], !1),
        K("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "none", label: "none" }
        ]),
        h("navigation_path")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = (o) => ii(ei(e, o));
    this._config = {
      ...t,
      entity: ii(ei(e, "entity")),
      icon: ii(ei(e, "icon")) || "mdi:floor-plan",
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
      tap_action: ii(ei(e, "tap_action", "ulm_card_tap_action")) || "more-info",
      navigation_path: ii(
        ei(e, "navigation_path", "ulm_card_tap_navigate_path")
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
    if (!this._config || !this.hass) return u;
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
                  ></span>` : u}
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

          ${i ? c`<div class="sensors">${this._sensorRow()}</div>` : u}

          <div class="devices">${this._deviceRow()}</div>
        </div>
      </ha-card>
    `;
  }
  _groupId(t) {
    return this._config[t];
  }
  _sensorGroupIds() {
    return q_.map((t) => this._groupId(t)).filter(Boolean);
  }
  _unavailableCount() {
    if (!this.hass) return 0;
    let t = 0;
    for (const e of this._sensorGroupIds()) {
      const i = Ot(this.hass, e);
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
      for (const i of Ot(this.hass, e)) {
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
    for (const i of Ot(this.hass, t)) {
      const o = this.hass.states[i]?.state;
      (o === "on" || o === "open") && (e += 1);
    }
    return e === 0 && Ot(this.hass, t).length === 0 && this._groupIsOn(t) ? 1 : e;
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
        ${i && e > 0 ? c`<span class="count-badge">${e}</span>` : u}
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
    const i = this._groupIsOn(t), o = i ? this._countOnMembers(t) : 0, r = b(this, "yellow"), n = i ? {
      color: `rgba(${r}, 1)`,
      backgroundColor: `rgba(${r}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class=${M({ "device-btn": !0, on: i })}
        style=${d(n)}
        type="button"
        @click=${() => this._toggleGroup(t)}
      >
        <ha-icon .icon=${e}></ha-icon>
        ${o > 0 ? c`<span class="device-badge">${o}</span>` : u}
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
    const i = Ot(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const r of i)
        this.hass.states[r]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:lightbulb-alert";
    } else if (!i.length && e.attributes.entity_id === void 0)
      return "mdi:exclamation";
    return e.state === "on" ? "mdi:lightbulb-group" : (e.state === "off", "mdi:lightbulb-group-off");
  }
  _shuttersIcon(t) {
    if (!t || !this.hass) return "mdi:window-shutter";
    const e = this.hass.states[t];
    if (!e) return "mdi:window-shutter";
    const i = Ot(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const r of i)
        this.hass.states[r]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:window-shutter-alert";
    } else if (!i.length && e.attributes.entity_id === void 0)
      return "mdi:exclamation";
    return e.state === "on" || e.state === "open" ? "mdi:window-shutter-open" : (e.state === "off" || e.state === "closed", "mdi:window-shutter");
  }
  _outletsIcon(t) {
    if (!t || !this.hass) return "mdi:power-plug-off";
    const e = this.hass.states[t];
    if (!e) return "mdi:power-plug-off";
    const i = Ot(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const r of i)
        this.hass.states[r]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:exclamation-thick";
    }
    return e.state === "on" ? "mdi:power-plug" : e.state === "off" ? "mdi:power-plug-off" : "mdi:exclamation";
  }
  _tvIcon(t) {
    if (!t || !this.hass) return "mdi:television-off";
    const e = this.hass.states[t];
    if (!e) return "mdi:television-off";
    const i = Ot(this.hass, t);
    if (i.length) {
      let o = 0;
      for (const r of i)
        this.hass.states[r]?.state === "unavailable" && (o += 1);
      if (o === i.length) return "mdi:exclamation-thick";
    }
    return e.state === "on" ? "mdi:television" : e.state === "off" ? "mdi:television-off" : "mdi:exclamation";
  }
};
no.styles = $`
    ${P}

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
ua([
  k({ attribute: !1 })
], no.prototype, "hass", 2);
ua([
  y()
], no.prototype, "_config", 2);
no = ua([
  C("ulm-custom-card-drealine-roomview-card")
], no);
var Y_ = Object.defineProperty, J_ = Object.getOwnPropertyDescriptor, ma = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? J_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Y_(e, i, r), r;
};
const Hr = {
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
function Us(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Bs(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Z_(t, e) {
  const i = /* @__PURE__ */ new Date();
  let o;
  const r = !!t.attributes.has_date, n = !!t.attributes.has_time;
  if (r)
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
  const a = i.getTime() - o, s = Math.trunc(a / (1e3 * 60 * 60 * 24)), l = Math.trunc(Math.abs(a) / (1e3 * 60 * 60)) % 24, p = Math.trunc(Math.abs(a) / (1e3 * 60)) % 60;
  let m = "";
  return r && s > 0 && (m += `${s} ${s > 1 ? e.days : e.day} `), n && l > 0 && (m += `${l} ${l > 1 ? e.hours : e.hour} `), n && !r && p > 0 && (m += `${p} ${p > 1 ? e.minutes : e.minute} `), m = m.trim(), m.length ? `${m} ${e.ago}` : e.justnow;
}
let ao = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "input_datetime"),
        h("name")
      ],
      computeLabel: S({
        entity: "input_datetime entity",
        name: "Name"
      }),
      computeHelper: z({
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
    const e = t, i = Bs(Us(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Bs(Us(e, "name")),
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
    if (!this._config || !this.hass) return u;
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
    }, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = t.attributes.icon || "mdi:calendar-clock", r = Z_(t, this._lang());
    return c`
      <ha-card class="ulm-card ulm-elapsed-time" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${d(e)}>
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${i}</div>
            <div class="label">${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.locale?.language || this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return Hr[t] || Hr[e] || Hr.en;
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
ao.styles = $`
    ${P}

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
ma([
  k({ attribute: !1 })
], ao.prototype, "hass", 2);
ma([
  y()
], ao.prototype, "_config", 2);
ao = ma([
  C("ulm-custom-card-eraycetinay-elapsed-time-card")
], ao);
var X_ = Object.defineProperty, Q_ = Object.getOwnPropertyDescriptor, _a = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Q_(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && X_(e, i, r), r;
};
const th = [
  { mode: "off", icon: "mdi:power" },
  { mode: "heat", icon: "mdi:fire" },
  { mode: "cool", icon: "mdi:snowflake" },
  { mode: "heat_cool", icon: "mdi:sync" },
  { mode: "dry", icon: "mdi:water" },
  { mode: "fan_only", icon: "mdi:fan" }
];
function Rr(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Fs(t) {
  return typeof t == "string" && t ? t : void 0;
}
function eh(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function ih(t) {
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
function oh(t, e) {
  switch (e) {
    case "dry":
      return {
        color: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)"
      };
    case "cool":
      return {
        color: `rgba(${b(t, "blue")}, 1)`,
        backgroundColor: `rgba(${b(t, "blue")}, 0.2)`
      };
    case "heat":
      return {
        color: `rgba(${b(t, "red")}, 1)`,
        backgroundColor: `rgba(${b(t, "red")}, 0.2)`
      };
    case "fan_only":
      return {
        color: "rgba(195, 0, 255, 1)",
        backgroundColor: "rgba(195, 0, 255, 0.2)"
      };
    case "heat_cool":
      return {
        color: `rgba(${b(t, "green")}, 1)`,
        backgroundColor: `rgba(${b(t, "green")}, 0.2)`
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
  }
}
function rh(t, e, i) {
  if (!i)
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
  switch (e) {
    case "heat":
      return {
        color: `rgba(${b(t, "red")}, 1)`,
        backgroundColor: `rgba(${b(t, "red")}, 0.2)`
      };
    case "cool":
      return {
        color: `rgba(${b(t, "blue")}, 1)`,
        backgroundColor: `rgba(${b(t, "blue")}, 0.2)`
      };
    case "heat_cool":
      return {
        color: `rgba(${b(t, "green")}, 1)`,
        backgroundColor: `rgba(${b(t, "green")}, 0.2)`
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
let so = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "climate"),
        h("name"),
        N("temp_step")
      ],
      computeLabel: S({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step"
      }),
      computeHelper: z({
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
    const e = t, i = Fs(Rr(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Fs(Rr(e, "name")),
      temp_step: eh(Rr(e, "temp_step")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-heat-pump">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this.hass.formatEntityState?.(t) || t.state, r = t.attributes.hvac_action, n = t.attributes.temperature != null ? `${t.attributes.current_temperature ?? "—"}° • ${o}${r ? ` (${r})` : ""}` : o, a = t.attributes.temperature, s = a == null || a === "" ? "-°C" : `${a}°C`;
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
              style=${d(oh(this, e))}
              tabindex="-1"
              @click=${(l) => {
      l.stopPropagation(), this._moreInfo();
    }}
            >
              <ha-icon .icon=${ih(e)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${i}</div>
              <div class="label">${n}</div>
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
            ${th.map(
      ({ mode: l, icon: p }) => c`
                <button
                  class="widget-btn mode"
                  type="button"
                  aria-label=${l}
                  style=${d(
        rh(this, l, e === l)
      )}
                  @click=${() => this._setMode(l)}
                >
                  <ha-icon .icon=${p}></ha-icon>
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
so.styles = $`
    ${P}

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
_a([
  k({ attribute: !1 })
], so.prototype, "hass", 2);
_a([
  y()
], so.prototype, "_config", 2);
so = _a([
  C("ulm-custom-card-heat-pump-card")
], so);
var nh = Object.defineProperty, ah = Object.getOwnPropertyDescriptor, ha = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ah(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && nh(e, i, r), r;
};
const Hs = "#ff8100";
function Ae(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ke(t) {
  return typeof t == "string" && t ? t : void 0;
}
function sh(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const e = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(e) ? e : void 0;
}
function ch(t) {
  const e = t.variables;
  return ke(Ae(t, "entity")) || ke(e?.entity) || ke(Ae(t, "ulm_custom_card_httpedo13_thermostat_entity"));
}
function lh(t) {
  const e = t.variables;
  return ke(Ae(t, "name")) || ke(e?.name) || ke(Ae(t, "ulm_custom_card_httpedo13_thermostat_name"));
}
let co = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "climate"),
        h("name"),
        N("temp_step"),
        f("collapse")
      ],
      computeLabel: S({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step",
        collapse: "Collapse controls when off"
      }),
      computeHelper: z({
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
    const e = t, i = ch(e);
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: lh(e),
      temp_step: sh(Ae(e, "temp_step")),
      collapse: !!Ae(e, "collapse"),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-httpedo13-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.attributes.hvac_action === "heating", i = t.state !== "off", o = !this._config.collapse || t.state === "heat", r = this._config.name || t.attributes.friendly_name || this._config.entity, n = this.hass.formatEntityState?.(t) || t.state, a = e ? "mdi:radiator" : "mdi:radiator-off", s = b(this, "red"), l = e ? Hs : void 0, p = l ? { backgroundColor: l } : {}, m = e ? { color: "var(--card-background-color, #fafafa)" } : {}, g = e ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: "var(--card-background-color, #fafafa)"
    } : i ? {
      color: `rgba(${s}, 1)`,
      backgroundColor: `rgba(${s}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, v = t.attributes.current_temperature, x = v == null ? "-°C" : `${v}°C`, L = t.attributes.temperature, A = L == null ? "-°C" : `${L}°C`, j = {
      backgroundColor: e ? "var(--card-background-color, #fafafa)" : "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)"
    }, R = e ? {
      backgroundColor: Hs,
      color: "var(--card-background-color, #fafafa)",
      fontWeight: "bold"
    } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-httpedo13-thermostat": !0,
      heating: e
    })}
        style=${d(p)}
      >
        <div class="stack">
          <div class="favorite">
            <div
              class="row icon-info header"
              role="button"
              tabindex="0"
              @click=${() => this._toggleHeat()}
              @keydown=${(F) => {
      (F.key === "Enter" || F.key === " ") && (F.preventDefault(), this._toggleHeat());
    }}
            >
              <button
                class="icon-btn"
                type="button"
                style=${d(g)}
                tabindex="-1"
                @click=${(F) => {
      F.stopPropagation(), this._toggleHeat();
    }}
              >
                <ha-icon .icon=${a}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name" style=${d(m)}>${r}</div>
                <div class="label" style=${d(m)}>
                  ${n}
                </div>
              </div>
            </div>
            <div class="current-temp" style=${d(R)}>
              ${x}
            </div>
          </div>

          ${o ? c`
                <div class="controls">
                  <button
                    class="widget-btn"
                    type="button"
                    style=${d(j)}
                    aria-label="Decrease temperature"
                    @click=${() => this._adjustTemp(-1)}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <div class="temp-readout" style=${d(R)}>
                    ${A}
                  </div>
                  <button
                    class="widget-btn"
                    type="button"
                    style=${d(j)}
                    aria-label="Increase temperature"
                    @click=${() => this._adjustTemp(1)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              ` : u}
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
co.styles = $`
    ${P}

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
ha([
  k({ attribute: !1 })
], co.prototype, "hass", 2);
ha([
  y()
], co.prototype, "_config", 2);
co = ha([
  C("ulm-custom-card-httpedo13-thermostat-card")
], co);
var dh = Object.defineProperty, uh = Object.getOwnPropertyDescriptor, pa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? uh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && dh(e, i, r), r;
};
const Rs = {
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
}, mh = nr`
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
function Yo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function _h(t) {
  return typeof t == "string" && t ? t : void 0;
}
function hh(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseInt(String(t ?? ""), 10);
  return Number.isFinite(i) ? i : e;
}
function ph(t) {
  return String(t ?? "").toLowerCase() === "upcoming" ? "upcoming" : "library";
}
function gh(t) {
  const e = String(t ?? "").toLowerCase();
  if (e === "radarr" || e === "sonarr" || e === "plex") return e;
}
function fh(t) {
  return t.includes("sonarr") ? "sonarr" : t.includes("plex") ? "plex" : "radarr";
}
function bh(t) {
  return (t?.language || "en").split("-")[0].toLowerCase() === "fr" ? Rs.fr : Rs.en;
}
function yh(t, e) {
  const i = new Date(t.valueOf());
  return i.setDate(i.getDate() + e), i;
}
let lo = class extends w {
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
        _("entity", "sensor"),
        K("mode", [
          { value: "library", label: "Library (fanart)" },
          { value: "upcoming", label: "Upcoming (poster)" }
        ]),
        N("index"),
        K("platform", [
          { value: "radarr", label: "Radarr" },
          { value: "sonarr", label: "Sonarr" },
          { value: "plex", label: "Plex" }
        ])
      ],
      computeLabel: S({
        entity: "Media sensor (attributes.data)",
        mode: "Display mode",
        index: "Data array index",
        platform: "Platform (optional)"
      }),
      computeHelper: z({
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
    const e = t, i = _h(Yo(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    const o = ph(Yo(e, "mode"));
    this._config = {
      ...t,
      entity: i,
      mode: o,
      index: hh(
        Yo(e, "index", "ulm_custom_card_imswel_medias_index"),
        1
      ),
      platform: gh(
        Yo(e, "platform", "ulm_custom_card_imswel_medias_platform")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-imswel-medias"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.mode || "library", i = bh(this.hass), o = t.state === "unavailable" || t.state === "undefined" || t.state === "unknown";
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
    const r = this._config.index ?? 1, n = i ? void 0 : this._dataItem(t, r), a = n && typeof n.fanart == "string" ? n.fanart : void 0;
    let s = this._unavailableLabel();
    if (n) {
      const p = String(n.title ?? "");
      let m = "";
      n.number != null && n.number !== "" ? m = String(n.number) : typeof n.aired == "string" && (m = `(${n.aired.split("-")[0]})`), s = `${p} ${m}`.trim();
    }
    const l = a ? {
      backgroundImage: `url("${a}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-imswel-medias": !0,
      library: !0
    })}
        style=${d(l)}
        @click=${this._moreInfo}
      >
        <div class="blur-overlay" aria-hidden="true"></div>
        <div class="library-grid">
          <div class="plex-wrap">${mh}</div>
          <div class="media-name">${e.recentlyadded}</div>
          <div class="media-label">${s}</div>
        </div>
      </ha-card>
    `;
  }
  _renderUpcoming(t, e, i) {
    const o = this._config, r = o.index ?? 1, n = o.platform || fh(o.entity), a = i ? void 0 : this._dataItem(t, r), s = a && typeof a.poster == "string" ? a.poster : void 0;
    let l = this._unavailableLabel(), p = "";
    if (a) {
      if (n === "radarr") {
        l = String(a.title ?? "");
        const g = a.airdate ? new Date(String(a.airdate)) : null;
        if (g && !Number.isNaN(g.getTime())) {
          const v = this._formatDate(g, e), x = typeof a.release == "string" ? this._formatRelease(a.release, e) : "";
          p = `${v}${x ? ` ${x}` : ""}`.trim();
        }
      } else if (n === "sonarr") {
        const g = a.number != null ? String(a.number) : "";
        l = `${a.title ?? ""}${g ? ` - ${g}` : ""}`;
        const v = a.airdate ? new Date(String(a.airdate)) : null;
        v && !Number.isNaN(v.getTime()) && (p = this._formatDate(v, e));
      }
    }
    const m = s ? {
      backgroundImage: `url("${s}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    } : {};
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-imswel-medias": !0,
      upcoming: !0
    })}
        style=${d(m)}
        @click=${this._moreInfo}
      >
        <div class="poster-overlay" aria-hidden="true"></div>
        <div class="upcoming-grid">
          <div class="media-name ellipsis">${l}</div>
          <div class="media-label">${p}</div>
        </div>
      </ha-card>
    `;
  }
  _formatRelease(t, e) {
    return t.includes("Available") ? "" : t.includes("In Theaters") ? e.in_theaters : "";
  }
  _formatDate(t, e) {
    const i = /* @__PURE__ */ new Date(), o = yh(i, 1), r = t.getTime() - i.getTime(), n = Math.floor(r / 1e3);
    if (Math.floor(n / (3600 * 24)) < 6) {
      const s = e.weekday;
      return s[t.getDay()] === s[i.getDay()] ? e.today : s[t.getDay()] === s[o.getDay()] ? e.tommorow : s[t.getDay()] ?? t.toLocaleDateString(e.locale);
    }
    return t.toLocaleDateString(e.locale);
  }
};
lo.styles = [
  P,
  $`
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
pa([
  k({ attribute: !1 })
], lo.prototype, "hass", 2);
pa([
  y()
], lo.prototype, "_config", 2);
lo = pa([
  C("ulm-custom-card-imswel-medias-card")
], lo);
var vh = Object.defineProperty, wh = Object.getOwnPropertyDescriptor, ga = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && vh(e, i, r), r;
};
const xh = "Here", $h = "Absent";
function Nt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Yt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function kh(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let uo = class extends w {
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
        _("entity", "person"),
        U([E("icon"), f("use_entity_picture")]),
        _("wifi_tracker", void 0, !1),
        _("gps_tracker", void 0, !1),
        _("findmy_script", "script", !1),
        U([h("home_label"), h("not_home_label")])
      ],
      computeLabel: S({
        entity: "Person entity",
        icon: "Icon",
        use_entity_picture: "Use entity picture",
        wifi_tracker: "WiFi tracker (popup config only)",
        gps_tracker: "GPS tracker (popup config only)",
        findmy_script: "Find My script (popup config only)",
        home_label: "Home label",
        not_home_label: "Not home label"
      }),
      computeHelper: z({
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
    const e = t, i = Yt(
      Nt(e, "entity", "ulm_card_imswel_person_entity")
    );
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: Yt(Nt(e, "icon")) || "mdi:face-man",
      use_entity_picture: kh(
        Nt(e, "use_entity_picture", "ulm_card_imswel_person_use_entity_picture"),
        !1
      ),
      wifi_tracker: Yt(
        Nt(e, "wifi_tracker", "ulm_card_imswel_person_wifi_tracker")
      ),
      gps_tracker: Yt(
        Nt(e, "gps_tracker", "ulm_card_imswel_person_gps_tracker")
      ),
      findmy_script: Yt(
        Nt(e, "findmy_script", "ulm_card_imswel_person_findmy_script")
      ),
      home_label: Yt(
        Nt(e, "home_label", "ulm_custom_card_imswel_person_home")
      ),
      not_home_label: Yt(
        Nt(e, "not_home_label", "ulm_custom_card_imswel_person_not_home")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-imswel-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, r = this._config.icon || "mdi:face-man", n = this._badge(t), a = this._label(t), s = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: o ? "transparent" : "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <ha-card class="ulm-card ulm-imswel-person" @click=${this._moreInfo}>
        <div class="row">
          <div
            class=${M({ "icon-btn": !0, picture: !!o })}
            style=${d(s)}
          >
            ${o ? c`<img src=${o} alt=${e} />` : c`<ha-icon .icon=${r}></ha-icon>`}
          </div>
          <div class="info-btn">
            <div class="name">${e}</div>
            <div class="label">${a}</div>
          </div>
        </div>
        <span
          class="notification"
          style=${d({
      backgroundColor: `rgba(${n.rgb}, 1)`
    })}
        >
          <ha-icon .icon=${n.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }
  _theme(t) {
    return b(this, t);
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
      return i?.home_label || xh;
    if (e === "not_home")
      return i?.not_home_label || $h;
    if (e === "unavailable" || e === "unknown") {
      const o = `state.default.${e}`, r = this.hass?.localize?.(o);
      return r && r !== o ? r : e === "unavailable" ? "Unavailable" : "Unknown";
    }
    return e;
  }
};
uo.styles = [
  P,
  $`
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
ga([
  k({ attribute: !1 })
], uo.prototype, "hass", 2);
ga([
  y()
], uo.prototype, "_config", 2);
uo = ga([
  C("ulm-custom-card-imswel-person-card")
], uo);
var Ch = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, fa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Sh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Ch(e, i, r), r;
};
function It(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function jt(t) {
  return typeof t == "string" && t ? t : void 0;
}
let mo = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity"),
        h("name"),
        h("icon"),
        _("entity_1", void 0, !1),
        _("entity_2", void 0, !1),
        _("entity_3", void 0, !1),
        _("entity_4", void 0, !1),
        h("name_1"),
        h("name_2"),
        h("name_3"),
        h("name_4")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = jt(
      It(e, "entity", "ulm_custom_card_irmajavi_entities")
    );
    if (!i) throw new Error("Please define an entity");
    const o = (r) => jt(
      It(
        e,
        `entity_${r}`,
        `ulm_custom_card_irmajavi_entities_entity_${r}`
      )
    );
    this._config = {
      ...t,
      entity: i,
      name: jt(It(e, "name", "ulm_custom_card_irmajavi_entities_name")) || void 0,
      icon: jt(It(e, "icon", "ulm_custom_card_irmajavi_entities_icon")) || "👽",
      entity_1: o(1),
      entity_2: o(2),
      entity_3: o(3),
      entity_4: o(4),
      name_1: jt(
        It(e, "name_1", "ulm_custom_card_irmajavi_entities_name_1")
      ),
      name_2: jt(
        It(e, "name_2", "ulm_custom_card_irmajavi_entities_name_2")
      ),
      name_3: jt(
        It(e, "name_3", "ulm_custom_card_irmajavi_entities_name_3")
      ),
      name_4: jt(
        It(e, "name_4", "ulm_custom_card_irmajavi_entities_name_4")
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = this.hass.states[t.entity], i = `${t.icon} ${t.name || e?.attributes.friendly_name || t.entity}`, o = e ? this.hass.formatEntityState?.(e) || e.state : "—", r = [1, 2, 3, 4].map((n) => ({
      entity: t[`entity_${n}`],
      name: t[`name_${n}`]
    }));
    return c`
      <ha-card class="ulm-card ulm-irmajavi-entities">
        <div class="stack">
          <div class="header-pill">
            <div class="header-name">${i}</div>
            <div class="header-state">${o}</div>
          </div>
          <div class="metrics">
            ${r.map((n) => this._metricCell(n.entity, n.name))}
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
        @click=${(r) => {
      r.stopPropagation(), this._moreInfo(t);
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
mo.styles = $`
    ${P}

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
fa([
  k({ attribute: !1 })
], mo.prototype, "hass", 2);
fa([
  y()
], mo.prototype, "_config", 2);
mo = fa([
  C("ulm-custom-card-irmajavi-entities-card")
], mo);
var zh = Object.defineProperty, Eh = Object.getOwnPropertyDescriptor, ba = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Eh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && zh(e, i, r), r;
};
const Gr = {
  speedtest: "Speedtest",
  download: "Download Speed",
  upload: "Upload Speed"
};
function St(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function At(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Ph(t, e) {
  if (typeof t != "string" || !t) return e;
  const i = t.toLowerCase();
  return ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(
    i
  ) ? i : e;
}
let _o = class extends w {
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
        _("download_entity", ["sensor"], !1),
        _("upload_entity", ["sensor"], !1),
        _("ping_entity", ["sensor"], !1),
        B("color"),
        h("router_name"),
        h("router_model"),
        h("label_speedtest"),
        h("label_download"),
        h("label_upload")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = At(
      St(
        e,
        "download_entity",
        "entity",
        "ulm_custom_card_irmajavi_speedtest_download_speed_entity"
      )
    ), o = At(
      St(
        e,
        "upload_entity",
        "ulm_custom_card_irmajavi_speedtest_upload_speed_entity"
      )
    ), r = At(
      St(e, "ping_entity", "ulm_custom_card_irmajavi_speedtest_ping_entity")
    );
    if (!i && !o && !r)
      throw new Error(
        "Please define at least one of download_entity, upload_entity, or ping_entity"
      );
    this._config = {
      ...t,
      entity: i || o || r,
      color: Ph(
        St(e, "color", "ulm_custom_card_irmajavi_speedtest_color"),
        "blue"
      ),
      router_name: At(
        St(
          e,
          "router_name",
          "ulm_custom_card_irmajavi_speedtest_router_name"
        )
      ) || "router_name",
      router_model: At(
        St(
          e,
          "router_model",
          "ulm_custom_card_irmajavi_speedtest_router_model"
        )
      ) || "router_model",
      download_entity: i,
      upload_entity: o,
      ping_entity: r,
      label_speedtest: At(
        St(
          e,
          "label_speedtest",
          "ulm_custom_card_irmajavi_speedtest_speedtest"
        )
      ) || Gr.speedtest,
      label_download: At(
        St(
          e,
          "label_download",
          "ulm_custom_card_irmajavi_speedtest_download"
        )
      ) || Gr.download,
      label_upload: At(
        St(
          e,
          "label_upload",
          "ulm_custom_card_irmajavi_speedtest_upload"
        )
      ) || Gr.upload,
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = t.color || "blue", i = b(this, e), o = {
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
        @click=${(r) => {
      r.stopPropagation(), e && this._moreInfo(e);
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
_o.styles = $`
    ${P}

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
ba([
  k({ attribute: !1 })
], _o.prototype, "hass", 2);
ba([
  y()
], _o.prototype, "_config", 2);
_o = ba([
  C("ulm-custom-card-irmajavi-speedtest-card")
], _o);
var Lh = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, ya = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Mh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Lh(e, i, r), r;
};
const Oh = {
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
function Tt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Dt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Nh(t) {
  return t ? Oh[t] ?? "❔" : "❔";
}
let ho = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", "weather"),
        _("date_entity", ["sensor", "input_text"], !1),
        _("temperature_entity", ["sensor"], !1),
        _("entity_1", void 0, !1),
        _("entity_2", void 0, !1),
        _("entity_3", void 0, !1),
        _("entity_4", void 0, !1),
        h("name_1"),
        h("name_2"),
        h("name_3"),
        h("name_4")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = Dt(
      Tt(e, "entity", "ulm_custom_card_irmajavi_weather")
    );
    if (!i) throw new Error("Please define an entity");
    const o = (r) => Dt(
      Tt(
        e,
        `entity_${r}`,
        `ulm_custom_card_irmajavi_weather_entity_${r}`
      )
    );
    this._config = {
      ...t,
      entity: i,
      date_entity: Dt(
        Tt(e, "date_entity", "ulm_custom_card_irmajavi_weather_date")
      ),
      temperature_entity: Dt(
        Tt(
          e,
          "temperature_entity",
          "ulm_custom_card_irmajavi_weather_temperature_outside"
        )
      ),
      entity_1: o(1),
      entity_2: o(2),
      entity_3: o(3),
      entity_4: o(4),
      name_1: Dt(
        Tt(e, "name_1", "ulm_custom_card_irmajavi_weather_name_1")
      ),
      name_2: Dt(
        Tt(e, "name_2", "ulm_custom_card_irmajavi_weather_name_2")
      ),
      name_3: Dt(
        Tt(e, "name_3", "ulm_custom_card_irmajavi_weather_name_3")
      ),
      name_4: Dt(
        Tt(e, "name_4", "ulm_custom_card_irmajavi_weather_name_4")
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = this.hass.states[t.entity], i = Nh(e?.state), o = t.date_entity, r = o && this.hass.states[o]?.state || "", n = `${i} ${r}`.trim(), a = t.temperature_entity, s = a ? this.hass.states[a] : void 0, l = s?.attributes.unit_of_measurement || "", p = s ? `${s.state}${l ? ` ${l}` : ""}` : "—", m = [1, 2, 3, 4].map((g) => ({
      entity: t[`entity_${g}`],
      name: t[`name_${g}`]
    }));
    return c`
      <ha-card class="ulm-card ulm-irmajavi-weather">
        <div class="stack">
          <div class="header-pill">
            <div class="header-left">${n}</div>
            <div class="temp-chip">${p}</div>
          </div>
          <div class="metrics">
            ${m.map((g) => this._metricCell(g.entity, g.name))}
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
        @click=${(r) => {
      r.stopPropagation(), this._moreInfo(t);
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
ho.styles = $`
    ${P}

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
ya([
  k({ attribute: !1 })
], ho.prototype, "hass", 2);
ya([
  y()
], ho.prototype, "_config", 2);
ho = ya([
  C("ulm-custom-card-irmajavi-weather-card")
], ho);
var Ih = Object.defineProperty, jh = Object.getOwnPropertyDescriptor, va = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? jh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Ih(e, i, r), r;
};
const Ah = 200;
function oi(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Wr(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Gs(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
function Th(t, e, i) {
  if (!Number.isFinite(t)) return "180deg";
  const o = i - e || 1;
  return `${180 + (Math.min(Math.max(t, e), i) - e) / o * 180}deg`;
}
let po = class extends w {
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
        _("entity"),
        h("name"),
        h("icon"),
        N("min"),
        N("max")
      ],
      computeLabel: S({
        entity: "Gauge entity",
        name: "Name override",
        icon: "Icon override",
        min: "Minimum",
        max: "Maximum"
      }),
      computeHelper: z({
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
    const e = t, i = Wr(oi(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Wr(oi(e, "name")),
      icon: Wr(oi(e, "icon")),
      min: Gs(oi(e, "min", "ulm_card_mpse_gauge_min"), 0),
      max: Gs(oi(e, "max", "ulm_card_mpse_gauge_max"), 100),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-mpse-gauge"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._config.min ?? 0, i = this._config.max ?? 100, o = Number.parseFloat(t.state), r = Th(o, e, i), n = this._config.name || t.attributes.friendly_name || t.entity_id, a = t.state, s = this._config.icon || t.attributes.icon || "mdi:gauge", l = t.state === "unavailable", p = e === 0 && i === 100 ? "" : `${e} - ${i}`, m = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, g = {
      "--gauge-card-width": `${Ah}px`,
      "--outer-angle": r,
      "--inner-angle": r,
      "--outer-color": "var(--google-blue)",
      "--inner-color": "var(--google-blue)"
    };
    return c`
      <ha-card class="ulm-card ulm-mpse-gauge" @click=${this._moreInfo}>
        <div class="header">
          <div class="row ${l ? "unavailable" : ""}">
            <div class="icon-btn" style=${d(m)}>
              <ha-icon .icon=${s}></ha-icon>
              ${l ? c`<div class="badge">
                    <ha-icon icon="mdi:exclamation"></ha-icon>
                  </div>` : u}
            </div>
            <div class="info-btn">
              <div class="name">${n}</div>
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
              ${p ? c`<div class="gauge-title">${p}</div>` : u}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
po.styles = [
  P,
  $`
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
va([
  k({ attribute: !1 })
], po.prototype, "hass", 2);
va([
  y()
], po.prototype, "_config", 2);
po = va([
  C("ulm-custom-card-mpse-gauge-card")
], po);
var Dh = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, wa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Uh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Dh(e, i, r), r;
};
function Ws(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ks(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Bh(t) {
  return t === "cool" ? "mdi:snowflake" : t === "heat" ? "mdi:fire" : "mdi:thermostat";
}
function sn(t, e) {
  let i = getComputedStyle(t).getPropertyValue(e).trim();
  const o = i.match(/^var\(--([a-z0-9-]+)\)$/i);
  return o && (i = getComputedStyle(t).getPropertyValue(`--${o[1]}`).trim() || i), i;
}
function Vs(t, e) {
  const i = e === "heat" ? "--color-background-red" : "--color-background-blue", o = e === "heat" ? "red" : "blue";
  let r = sn(t, i);
  /^\d+\s*,/.test(r) || (r = b(t, o));
  const n = getComputedStyle(t).getPropertyValue("--opacity-bg").trim() || "1";
  return { backgroundColor: `rgba(${r}, ${n})` };
}
function Fh(t, e) {
  if (e === "heat") {
    let i = sn(t, "--color-red-text");
    return /^\d+\s*,/.test(i) || (i = b(t, "red")), { color: `rgba(${i}, 1)` };
  }
  if (e === "cool") {
    let i = sn(t, "--color-blue-text");
    return /^\d+\s*,/.test(i) || (i = b(t, "blue")), { color: `rgba(${i}, 1)` };
  }
  return {};
}
function Hh(t, e) {
  if (e === "heat") {
    const i = b(t, "red");
    return {
      row: Vs(t, "heat"),
      icon: {
        color: `rgba(${i}, 1)`,
        backgroundColor: `rgba(${i}, 0.2)`
      }
    };
  }
  if (e === "cool") {
    const i = b(t, "blue");
    return {
      row: Vs(t, "cool"),
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
let go = class extends w {
  static getConfigForm() {
    return {
      schema: [_("entity", "climate"), h("name")],
      computeLabel: S({
        entity: "Climate entity",
        name: "Name"
      }),
      computeHelper: z({
        name: "Defaults to entity friendly_name"
      })
    };
  }
  static getStubConfig() {
    return { entity: "climate.living_room" };
  }
  setConfig(t) {
    const e = t, i = Ks(Ws(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Ks(Ws(e, "name")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-mpse-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, { row: i, icon: o } = Hh(this, e), r = Fh(this, e), n = this._config.name || t.attributes.friendly_name || t.entity_id, a = this.hass.formatEntityState?.(t) || t.state, s = t.attributes.hvac_action, l = t.attributes.temperature != null ? `${t.attributes.current_temperature ?? "—"}° • ${a}${s ? ` (${s})` : ""}` : a, p = t.attributes.temperature, m = p == null || p === "" ? "-°C" : `${p}°C`;
    return c`
      <ha-card class="ulm-card ulm-mpse-thermostat">
        <div class="stack">
          <div
            class=${M({ row: !0, "icon-info": !0, [e]: !0 })}
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
              <ha-icon .icon=${Bh(e)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name" style=${d(r)}>${n}</div>
              <div class="label" style=${d(r)}>${l}</div>
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
            <div class="temp-readout">${m}</div>
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
    const o = this._step(e), r = parseFloat(String(i)) + o * t;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: r
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
go.styles = $`
    ${P}

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
wa([
  k({ attribute: !1 })
], go.prototype, "hass", 2);
wa([
  y()
], go.prototype, "_config", 2);
go = wa([
  C("ulm-custom-card-mpse-thermostat-card")
], go);
var Rh = Object.defineProperty, Gh = Object.getOwnPropertyDescriptor, vr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Rh(e, i, r), r;
};
function be(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function qs(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Jo(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === 1 ? !0 : t === "false" || t === 0 ? !1 : e;
}
let Te = class extends w {
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
        _("entity", "update"),
        h("name"),
        f("enable_controls"),
        f("collapsible"),
        f("horizontal"),
        f("narrow_buttons")
      ],
      computeLabel: S({
        entity: "Update entity",
        name: "Name",
        enable_controls: "Show install / skip buttons",
        collapsible: "Hide controls when up to date",
        horizontal: "Controls beside header",
        narrow_buttons: "Narrow control column (horizontal)"
      }),
      computeHelper: z({
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
    const e = t, i = qs(be(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: qs(be(e, "name")),
      enable_controls: Jo(
        be(e, "enable_controls", "ulm_card_neekster_update_enable_controls"),
        !1
      ),
      collapsible: Jo(
        be(e, "collapsible", "ulm_card_neekster_update_collapsible"),
        !1
      ),
      horizontal: Jo(
        be(e, "horizontal", "ulm_card_neekster_update_horizontal"),
        !1
      ),
      narrow_buttons: Jo(
        be(
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-neekster-update">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state === "off", i = this._showControls(t.state), o = this._config.name || t.attributes.friendly_name || t.entity_id, r = e ? "Up to Date." : "Update Available!", n = e ? "mdi:cloud-check" : "mdi:cloud-download", a = b(this, "green"), s = b(this, "yellow"), l = e ? {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: `rgba(${a}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: `rgba(${s}, 0.2)`
    }, p = M({
      stack: !0,
      horizontal: !!(this._config.horizontal && i),
      narrow: !!this._config.narrow_buttons
    }), m = this._config.collapsible && e ? "0px" : "12px";
    return c`
      <ha-card
        class="ulm-card ulm-neekster-update"
        style=${d({ "--stack-gap": m })}
        @click=${this._moreInfo}
      >
        <div class=${p}>
          <div class="row header">
            <button class="icon-btn" type="button" style=${d(l)}>
              <ha-icon .icon=${n}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${o}</div>
              <div class="label status">${r}</div>
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
              ` : u}
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
Te.styles = $`
    ${P}

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
vr([
  k({ attribute: !1 })
], Te.prototype, "hass", 2);
vr([
  y()
], Te.prototype, "_config", 2);
vr([
  y()
], Te.prototype, "_holdTimer", 2);
Te = vr([
  C("ulm-custom-card-neekster-update-card")
], Te);
var Wh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, xa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Wh(e, i, r), r;
};
function q(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Y(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Vh(t) {
  return t <= 30 ? "var(--google-red, var(--error-color))" : t <= 59 ? "var(--google-yellow, var(--warning-color))" : "var(--google-green, var(--success-color))";
}
let fo = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["input_boolean", "switch"]),
        h("name"),
        _("button1_entity", void 0, !1),
        _("button2_entity", void 0, !1),
        _("button3_entity", void 0, !1),
        _("restart_entity", "button", !1),
        _("reload_entity", "button", !1),
        _("maintenance_entity", void 0, !1),
        _("par1_entity", "sensor", !1),
        _("par2_entity", "sensor", !1),
        _("par3_entity", "sensor", !1),
        h("par1_name"),
        h("par2_name"),
        h("par3_name"),
        _("battery_entity", "sensor", !1),
        h("battery_name")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = Y(
      q(e, "entity", "ulm_custom_card_nik_tablet_main")
    );
    if (!i) throw new Error("Please define a main entity");
    this._config = {
      ...t,
      entity: i,
      name: Y(q(e, "name", "ulm_custom_card_nik_tablet_name")),
      button1_entity: Y(
        q(e, "button1_entity", "ulm_custom_card_nik_tablet_button1")
      ),
      button2_entity: Y(
        q(e, "button2_entity", "ulm_custom_card_nik_tablet_button2")
      ),
      button3_entity: Y(
        q(e, "button3_entity", "ulm_custom_card_nik_tablet_button3")
      ),
      restart_entity: Y(
        q(e, "restart_entity", "ulm_custom_card_nik_tablet_restart")
      ),
      reload_entity: Y(
        q(e, "reload_entity", "ulm_custom_card_nik_tablet_reload")
      ),
      maintenance_entity: Y(
        q(e, "maintenance_entity", "ulm_custom_card_nik_tablet_maintenance")
      ),
      par1_entity: Y(
        q(e, "par1_entity", "ulm_custom_card_nik_tablet_par1")
      ),
      par2_entity: Y(
        q(e, "par2_entity", "ulm_custom_card_nik_tablet_par2")
      ),
      par3_entity: Y(
        q(e, "par3_entity", "ulm_custom_card_nik_tablet_par3")
      ),
      par1_name: Y(
        q(e, "par1_name", "ulm_custom_card_nik_tablet_par1_name")
      ),
      par2_name: Y(
        q(e, "par2_name", "ulm_custom_card_nik_tablet_par2_name")
      ),
      par3_name: Y(
        q(e, "par3_name", "ulm_custom_card_nik_tablet_par3_name")
      ),
      battery_entity: Y(
        q(
          e,
          "battery_entity",
          "ulm_custom_card_nik_tablet_battery",
          "ulm_custom_bar_card_nik_tablet_card_entity"
        )
      ),
      battery_name: Y(
        q(
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
    if (!this._config || !this.hass) return u;
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
    const e = t.state === "on", i = b(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this.hass.formatEntityState?.(t) || t.state;
    return c`
      <div class="main-header">
        <div class="icon-cell" style=${d(o)}>
          <ha-icon icon="mdi:tablet"></ha-icon>
        </div>
        <div class="main-info">
          <div class="main-name">${r}</div>
          <div class="main-label">${n}</div>
        </div>
      </div>
    `;
  }
  _widgetIcon(t, e, i, o, r = "toggle") {
    if (!t)
      return c`<div class="widget empty"></div>`;
    const n = this.hass.states[t], a = n?.state === "on", s = o ? a : !0, l = b(this, i), p = s ? {
      color: `rgba(${l}, 1)`,
      backgroundColor: `rgba(${l}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    };
    return c`
      <button
        class="widget"
        style=${d(p)}
        title=${n?.state || t}
        @click=${(m) => {
      m.stopPropagation(), this._widgetAction(t, r);
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
    const i = this.hass.states[t], o = i?.attributes.unit_of_measurement || "", r = i ? o ? `${i.state}${o.startsWith(" ") ? o : ` ${o}`}` : i.state : "—", n = e || i?.attributes.friendly_name || t;
    return c`
      <button
        class="metric"
        @click=${() => this._moreInfo(t)}
      >
        <div class="metric-value">${r}</div>
        <div class="metric-name">${n}</div>
      </button>
    `;
  }
  _renderBattery() {
    const t = this._config.battery_entity;
    if (!t) return u;
    const e = this.hass.states[t], i = this._config.battery_name || e?.attributes.friendly_name || "Battery", o = e ? Number.parseFloat(e.state) : NaN, r = Number.isFinite(o) ? Math.max(1, Math.min(100, o)) : 0, n = Vh(r), a = e?.attributes.icon || "mdi:battery", s = e ? `${Math.round(r)}%` : "—";
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
      width: `${r}%`,
      backgroundColor: n
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
fo.styles = $`
    ${P}

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
xa([
  k({ attribute: !1 })
], fo.prototype, "hass", 2);
xa([
  y()
], fo.prototype, "_config", 2);
fo = xa([
  C("ulm-custom-card-nik-tablet-card")
], fo);
var qh = Object.defineProperty, Yh = Object.getOwnPropertyDescriptor, $a = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Yh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && qh(e, i, r), r;
};
const Jh = {
  6: "rgba(190, 0, 33, 1)",
  5: "rgba(240, 56, 26, 1)",
  4: "rgba(254, 154, 36, 1)",
  3: "rgba(254, 197, 77, 1)",
  2: "rgba(254, 228, 156, 1)",
  1: "rgba(219, 250, 200, 1)"
}, Ys = {
  6: "high",
  5: "medium to high",
  4: "medium",
  3: "low to mediuml",
  2: "low",
  1: "none to low",
  0: "none"
};
function vt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function wt(t) {
  return typeof t == "string" && t ? t : void 0;
}
let bo = class extends w {
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
        _("entity"),
        h("name"),
        E("icon"),
        h("label_6"),
        h("label_5"),
        h("label_4"),
        h("label_3"),
        h("label_2"),
        h("label_1"),
        h("label_none")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = wt(vt(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: wt(
        vt(
          e,
          "name",
          "ulm_custom_card_paddy_dwd_pollen_name",
          "ulm_card_generic_swap_name"
        )
      ),
      icon: wt(
        vt(
          e,
          "icon",
          "ulm_custom_card_paddy_dwd_pollen_icon",
          "ulm_card_generic_swap_icon"
        )
      ),
      label_6: wt(
        vt(e, "label_6", "ulm_custom_card_paddy_dwd_pollen_6")
      ),
      label_5: wt(
        vt(e, "label_5", "ulm_custom_card_paddy_dwd_pollen_5")
      ),
      label_4: wt(
        vt(e, "label_4", "ulm_custom_card_paddy_dwd_pollen_4")
      ),
      label_3: wt(
        vt(e, "label_3", "ulm_custom_card_paddy_dwd_pollen_3")
      ),
      label_2: wt(
        vt(e, "label_2", "ulm_custom_card_paddy_dwd_pollen_2")
      ),
      label_1: wt(
        vt(e, "label_1", "ulm_custom_card_paddy_dwd_pollen_1")
      ),
      label_none: wt(
        vt(e, "label_none", "ulm_custom_card_paddy_dwd_pollen_none")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`
        <ha-card class="ulm-card ulm-paddy-dwd-pollen">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    const e = t.state, i = this._config.name || t.attributes.friendly_name || t.entity_id, o = this._config.icon || t.attributes.icon || "mdi:flower-pollen", r = this._pollenLabel(e), n = this._iconStyle(e);
    return c`
      <ha-card class="ulm-card ulm-paddy-dwd-pollen" @click=${this._moreInfo}>
        <div class="row">
          <button class="icon-btn" type="button" style=${d(n)}>
            <ha-icon .icon=${o}></ha-icon>
          </button>
          <button class="info-btn" type="button">
            <div class="name">${i}</div>
            <div class="label">${r}</div>
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
    }[t] ?? Ys[t] ?? Ys[0];
  }
  _iconStyle(t) {
    const e = Jh[t];
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
bo.styles = $`
    ${P}

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
$a([
  k({ attribute: !1 })
], bo.prototype, "hass", 2);
$a([
  y()
], bo.prototype, "_config", 2);
bo = $a([
  C("ulm-custom-card-paddy-dwd-pollen-card")
], bo);
var Zh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, ka = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xh(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && Zh(e, i, r), r;
};
function Kr(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Vr(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Qh(t) {
  const e = t.attributes.daysTo;
  if (e == null || e === "") return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
let yo = class extends w {
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
        _("entity"),
        h("name"),
        E("icon")
      ],
      computeLabel: S({
        entity: "Waste collection entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)"
      }),
      computeHelper: z({
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
    const e = t, i = t.entity || Vr(Kr(e, "ulm_card_generic_swap_entity")) || void 0;
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Vr(Kr(e, "name", "ulm_card_generic_swap_name")),
      icon: Vr(Kr(e, "icon", "ulm_card_generic_swap_icon")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-paddy-waste"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Qh(t), o = t.state === "unavailable" || t.state === "unknown" || e === 0 || e === 1, r = e === 0, n = e === 1, a = b(this, "red"), s = {
      color: o ? `rgba(${a}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: r ? `rgba(${a}, 0.5)` : n ? `rgba(${a}, 0.05)` : "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, l = this._config.name || t.attributes.friendly_name || t.entity_id, p = this._stateLabel(t), m = this._config.icon || t.attributes.icon || "mdi:trash-can-outline";
    return c`
      <ha-card
        class="ulm-card ulm-paddy-waste"
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(s)}>
            <ha-icon .icon=${m}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${l}</div>
            <div class="label">${p}</div>
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
            ` : u}
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
yo.styles = [
  P,
  $`
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
ka([
  k({ attribute: !1 })
], yo.prototype, "hass", 2);
ka([
  y()
], yo.prototype, "_config", 2);
yo = ka([
  C("ulm-custom-card-paddy-waste-collection-card")
], yo);
var tp = Object.defineProperty, ep = Object.getOwnPropertyDescriptor, wr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ep(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && tp(e, i, r), r;
};
const mt = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  hello: "Hello"
};
function Bt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Zt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ip(t) {
  return Array.isArray(t) ? t.filter((e) => typeof e == "string" && !!e) : typeof t == "string" && t.trim() ? t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean) : [];
}
function op(t, e, i) {
  const o = Zt(Bt(t, "variant"));
  return o === "basic" || o === "weather" || o === "news" ? o : e.length ? "news" : i ? "weather" : "basic";
}
let De = class extends w {
  constructor() {
    super(...arguments), this._secondaryKey = "", this._secondaryLoading = !1, this._secondaryDirty = !1;
  }
  static getConfigForm() {
    return {
      schema: [
        K("variant", [
          { value: "basic", label: "Greeting only" },
          { value: "weather", label: "Greeting + weather" },
          { value: "news", label: "Greeting + home feed" }
        ]),
        _("time", "sensor", !1),
        _("weather", "weather", !1),
        h("news_entities"),
        U([
          h("ulm_morning"),
          h("ulm_afternoon"),
          h("ulm_evening"),
          h("ulm_hello")
        ])
      ],
      computeLabel: S({
        variant: "Layout variant",
        time: "Time sensor (ulm_custom_card_paddy_welcome_time)",
        weather: "Weather (ulm_custom_card_paddy_welcome_weather_provider)",
        news_entities: "News entities (ulm_custom_card_paddy_welcome_news_entities)",
        ulm_morning: "Morning greeting",
        ulm_afternoon: "Afternoon greeting",
        ulm_evening: "Evening greeting",
        ulm_hello: "Night greeting"
      }),
      computeHelper: z({
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
      ulm_morning: mt.morning,
      ulm_afternoon: mt.afternoon,
      ulm_evening: mt.evening,
      ulm_hello: mt.hello
    };
  }
  setConfig(t) {
    const e = t, i = Zt(
      Bt(e, "time", "ulm_custom_card_paddy_welcome_time")
    ), o = Zt(
      Bt(e, "weather", "ulm_custom_card_paddy_welcome_weather_provider")
    ), r = ip(
      Bt(e, "news_entities", "ulm_custom_card_paddy_welcome_news_entities")
    ), n = op(e, r, o);
    this._config = {
      ...t,
      variant: n,
      time: i,
      weather: o,
      news_entities: r,
      ulm_morning: Zt(Bt(e, "ulm_morning")) || mt.morning,
      ulm_afternoon: Zt(Bt(e, "ulm_afternoon")) || mt.afternoon,
      ulm_evening: Zt(Bt(e, "ulm_evening")) || mt.evening,
      ulm_hello: Zt(Bt(e, "ulm_hello")) || mt.hello,
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
    if (!this._config || !this.hass) return u;
    const t = this._config.variant || "basic", e = this._greetingLine();
    return c`
      <ha-card class="ulm-card ulm-paddy-welcome">
        <div class="stack">
          <div class="greeting-block">
            <div class="greeting">${e},</div>
            <div class="greeting user">${this._userName()}!</div>
          </div>
          ${t === "basic" ? u : c`<div class="secondary-host"></div>`}
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
    return e > "18:00" ? t.ulm_evening || mt.evening : e > "12:00" ? t.ulm_afternoon || mt.afternoon : e > "05:00" ? t.ulm_morning || mt.morning : t.ulm_hello || mt.hello;
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
            const r = await o.loadCardHelpers();
            this._secondaryEl = r.createCardElement(
              e
            );
          } else {
            const r = e.type === "weather-forecast" ? "hui-weather-forecast-card" : void 0;
            if (!r) {
              t.replaceChildren();
              return;
            }
            const n = document.createElement(r);
            n.setConfig(e), this._secondaryEl = n;
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
De.styles = [
  P,
  $`
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
wr([
  k({ attribute: !1 })
], De.prototype, "hass", 2);
wr([
  y()
], De.prototype, "_config", 2);
wr([
  ae(".secondary-host")
], De.prototype, "_secondaryHost", 2);
De = wr([
  C("ulm-custom-card-paddy-welcome-card")
], De);
var rp = Object.defineProperty, np = Object.getOwnPropertyDescriptor, Ca = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? np(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && rp(e, i, r), r;
};
const Js = 15, Zs = 30;
function _t(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function zt(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ap(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Xs(t, e) {
  const i = Number(t);
  return Number.isFinite(i) ? i : e;
}
let vo = class extends w {
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
        _("entity", "person"),
        U([E("icon"), f("use_entity_picture")]),
        _("zone1", "zone", !1),
        _("zone2", "zone", !1),
        _("address", void 0, !1),
        _("address_locality", void 0, !1),
        _("driving_entity", void 0, !1),
        _("battery_entity", "sensor", !1),
        _("battery_state_entity", void 0, !1),
        U([
          N("battery_level_danger"),
          N("battery_level_warning")
        ])
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = zt(_t(e, "entity", "ulm_card_person_entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      icon: zt(_t(e, "icon", "ulm_card_person_icon")) || "mdi:face-man",
      use_entity_picture: ap(
        _t(e, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        !0
      ),
      zone1: zt(_t(e, "zone1", "ulm_card_person_zone1")),
      zone2: zt(_t(e, "zone2", "ulm_card_person_zone2")),
      address: zt(_t(e, "address", "ulm_address")),
      address_locality: zt(
        _t(e, "address_locality", "ulm_address_locality")
      ),
      driving_entity: zt(
        _t(e, "driving_entity", "ulm_card_person_driving_entity")
      ),
      battery_entity: zt(
        _t(e, "battery_entity", "ulm_card_person_battery_entity")
      ),
      battery_state_entity: zt(
        _t(e, "battery_state_entity", "ulm_card_person_battery_state_entity")
      ),
      battery_level_danger: Xs(
        _t(e, "battery_level_danger", "ulm_card_battery_battery_level_danger"),
        Js
      ),
      battery_level_warning: Xs(
        _t(
          e,
          "battery_level_warning",
          "ulm_card_battery_battery_level_warning"
        ),
        Zs
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-person-info-small"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.attributes.friendly_name || t.entity_id, o = !!this._config.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, r = this._config.icon || "mdi:face-man", n = this._badge(t), a = this._label(t), s = this._batteryMarkup();
    return c`
      <ha-card class="ulm-card ulm-person-info-small" @click=${this._moreInfoPerson}>
        <div class="grid">
          <div class=${M({ "img-cell": !0, picture: !!o })}>
            ${o ? c`<img src=${o} alt=${e} />` : c`<ha-icon .icon=${r}></ha-icon>`}
          </div>
          <div class="battery-cell">${s}</div>
          <div class="name">${e}</div>
          <div class="label">${a}</div>
        </div>
        <span
          class="notification"
          style=${d({
      backgroundColor: n.bg
    })}
        >
          <ha-icon .icon=${n.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }
  _isDriving() {
    const t = this._config?.driving_entity;
    return !t || !this.hass ? !1 : this.hass.states[t]?.state === "on";
  }
  _badge(t) {
    const e = b(this, "blue"), i = b(this, "yellow");
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
      const o = this.hass.states[e.address_locality], r = o?.attributes?.Locality ?? o?.attributes?.locality;
      if (r != null && r !== "") return String(r);
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
    const e = this._config, i = e.battery_level_danger ?? Js, o = e.battery_level_warning ?? Zs;
    return t <= i ? "var(--google-red, var(--error-color))" : t <= o ? "var(--google-yellow, #f4b400)" : "var(--google-green, #0f9d58)";
  }
  _batteryMarkup() {
    const t = this._config?.battery_entity;
    if (!t || !this.hass) return u;
    const e = this.hass.states[t];
    if (!e?.state && e?.state !== "0") return u;
    const i = Number.parseFloat(e.state);
    if (!Number.isFinite(i)) return u;
    const o = this._config?.battery_state_entity, r = !!o && String(this.hass.states[o]?.state || "").toLowerCase() === "charging", n = this._batteryIcon(i, r), a = this._batteryColor(i);
    return c`
      <button
        type="button"
        class="battery-btn"
        @click=${this._moreInfoBattery}
        title="Battery"
      >
        <ha-icon
          .icon=${n}
          style=${d({ color: a })}
        ></ha-icon>
      </button>
    `;
  }
};
vo.styles = [
  P,
  $`
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
Ca([
  k({ attribute: !1 })
], vo.prototype, "hass", 2);
Ca([
  y()
], vo.prototype, "_config", 2);
vo = Ca([
  C("ulm-custom-card-person-info-small-card")
], vo);
var sp = Object.defineProperty, cp = Object.getOwnPropertyDescriptor, Sa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cp(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && sp(e, i, r), r;
};
function Zo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Xo(t) {
  return typeof t == "string" && t ? t : void 0;
}
function lp(t) {
  if (t.state === "unavailable") return "Indisponible";
  const e = t.attributes.brightness, i = e != null && Number.isFinite(e) ? Math.round(e / 2.55) : 0;
  let o = "Inconnue";
  return i >= 51 ? o = "Confort" : i >= 41 ? o = "Confort -1°C" : i >= 31 ? o = "Confort -2°C️" : i >= 21 ? o = "Eco️" : i >= 11 ? o = "Hors Gel️" : i >= 0 && (o = "Arrêt️"), `${o} • ${i}`;
}
let wo = class extends w {
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
        _("entity", "light"),
        h("name"),
        E("icon"),
        _("tap_entity", ["input_select", "select"], !1)
      ],
      computeLabel: S({
        entity: "Fil pilote light",
        name: "Name",
        icon: "Icon (default mdi:memory)",
        tap_entity: "More-info entity on tap"
      }),
      computeHelper: z({
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
    const e = t, i = Xo(Zo(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: Xo(Zo(e, "name")),
      icon: Xo(Zo(e, "icon")) || "mdi:memory",
      tap_entity: Xo(Zo(e, "tap_entity", "more_info_entity")),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-qubino"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state !== "off" && t.state !== "unavailable", i = V(this, e, "blue"), o = this._config.name || t.attributes.friendly_name || t.entity_id, r = lp(t);
    return c`
      <ha-card class="ulm-card ulm-qubino" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style=${d(i)}>
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${o}</div>
            <div class="label">${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
wo.styles = $`
    ${P}

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
Sa([
  k({ attribute: !1 })
], wo.prototype, "hass", 2);
Sa([
  y()
], wo.prototype, "_config", 2);
wo = Sa([
  C("ulm-custom-card-qubino-card")
], wo);
var dp = Object.defineProperty, up = Object.getOwnPropertyDescriptor, xr = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? up(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && dp(e, i, r), r;
};
const qr = "Driving";
function et(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function Ut(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Yr(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Qs(t, e) {
  const i = Number(t);
  return Number.isFinite(i) ? i : e;
}
function mp(t) {
  return Array.isArray(t) ? t.filter((e) => typeof e == "string" && !!e) : [];
}
function jc(t, e) {
  if (!e) return !1;
  const i = t.states[e]?.state;
  return i === "on" || i === "true";
}
function _p(t, e, i, o) {
  if (jc(t, o))
    return { icon: "mdi:car", color: "red" };
  const r = e.state;
  if (r === "home")
    return { icon: "mdi:home-variant", color: "green" };
  for (const n of i) {
    const a = t.states[n];
    if (a && r === a.attributes.friendly_name)
      return { icon: a.attributes.icon != null ? String(a.attributes.icon) : "mdi:help-circle", color: "yellow" };
  }
  return r === "not_home" ? { icon: "mdi:home-minus", color: "blue" } : { icon: "mdi:help-circle", color: "yellow" };
}
let Ue = class extends w {
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
        _("entity", "person"),
        U([h("name"), E("icon")]),
        U([
          f("use_entity_picture"),
          f("use_badge")
        ]),
        f("map_enable"),
        _("find_device_script", "script", !1),
        _("driving_entity", void 0, !1),
        h("driving_label"),
        h("zones"),
        _("camera_entity_light", "camera", !1),
        _("camera_entity_dark", "camera", !1),
        U([
          h("map_aspect_ratio"),
          N("map_default_zoom"),
          N("map_hours_to_show")
        ])
      ],
      computeLabel: S({
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
      computeHelper: z({
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
      driving_label: qr,
      map_aspect_ratio: "466:200",
      map_default_zoom: 11,
      map_hours_to_show: 0
    };
  }
  setConfig(t) {
    const e = t, i = t.entity;
    if (!i) throw new Error("Please define an entity");
    const o = et(e, "zones", "ulm_custom_card_ristou_zones");
    let r = mp(o);
    !r.length && typeof o == "string" && o.trim() && (r = o.split(/[\n,]/).map((n) => n.trim()).filter(Boolean)), this._config = {
      ...t,
      entity: i,
      name: Ut(et(e, "name", "ulm_custom_card_ristou_name")),
      icon: Ut(et(e, "icon", "ulm_custom_card_ristou_icon")),
      use_entity_picture: Yr(
        et(e, "use_entity_picture", "ulm_custom_card_ristou_use_entity_picture"),
        !1
      ),
      use_badge: Yr(
        et(e, "use_badge", "ulm_custom_card_ristou_use_badge"),
        !0
      ),
      map_enable: Yr(
        et(e, "map_enable", "ulm_custom_card_ristou_map_enable"),
        !1
      ),
      find_device_script: Ut(
        et(e, "find_device_script", "ulm_custom_card_ristou_find_device_script")
      ),
      zones: r,
      driving_entity: Ut(
        et(
          e,
          "driving_entity",
          "ulm_custom_card_ristou_person_driving_entity"
        )
      ),
      driving_label: Ut(
        et(
          e,
          "driving_label",
          "ulm_custom_card_ristou_person_driving"
        )
      ) || qr,
      map_aspect_ratio: Ut(
        et(e, "map_aspect_ratio", "ulm_custom_card_ristou_map_aspect_ratio")
      ) || "466:200",
      map_default_zoom: Qs(
        et(e, "map_default_zoom", "ulm_custom_card_ristou_map_default_zoom"),
        11
      ),
      map_hours_to_show: Qs(
        et(e, "map_hours_to_show", "ulm_custom_card_ristou_map_hours_to_show"),
        0
      ),
      camera_entity_light: Ut(
        et(
          e,
          "camera_entity_light",
          "ulm_custom_card_ristou_camera_entity_light"
        )
      ),
      camera_entity_dark: Ut(
        et(
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-ristou-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = this._showFooter();
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-ristou-person": !0,
      "has-footer": e
    })}
      >
        ${this._headerRow(t)}
        ${e ? c`<div class="footer-host"></div>` : u}
      </ha-card>
    `;
  }
  _showFooter() {
    const t = this._config;
    return t.map_enable ? !!t.zones?.length || !0 : !!(t.camera_entity_light && t.camera_entity_dark);
  }
  _headerRow(t) {
    const e = this._config, i = _p(
      this.hass,
      t,
      e.zones || [],
      e.driving_entity
    ), o = e.use_badge !== !1, r = o ? "mdi:face-man" : i.icon, n = o ? "theme" : i.color, a = e.name || t.attributes.friendly_name || t.entity_id, s = this._label(t), l = e.use_entity_picture && t.attributes.entity_picture ? String(t.attributes.entity_picture) : void 0, p = this._rgb(n), m = {
      color: n === "theme" ? "rgba(var(--color-theme, 51, 51, 51), 0.9)" : `rgba(${p}, 0.9)`,
      backgroundColor: l ? "transparent" : n === "theme" ? "rgba(var(--color-theme, 51, 51, 51), 0.05)" : `rgba(${p}, 0.2)`
    }, g = this._rgb(i.color), v = e.find_device_script, x = e.icon || (v && this.hass.states[v]?.attributes.icon ? String(this.hass.states[v].attributes.icon) : "mdi:cellphone-wireless");
    return c`
      <div class="header-row">
        <button
          type="button"
          class=${M({
      "avatar-btn": !0,
      picture: !!l
    })}
          style=${d(m)}
          @click=${this._moreInfoPerson}
        >
          ${l ? c`<img src=${l} alt=${a} />` : c`<ha-icon .icon=${r}></ha-icon>`}
          ${o ? c`
                <span
                  class="notification"
                  style=${d({
      backgroundColor: `rgba(${g}, 1)`
    })}
                >
                  <ha-icon .icon=${i.icon}></ha-icon>
                </span>
              ` : u}
        </button>

        <button
          type="button"
          class="info-btn"
          @click=${this._moreInfoPerson}
        >
          <div class="name">${a}</div>
          <div class="label">${s}</div>
        </button>

        ${v ? c`
              <button
                type="button"
                class="find-btn"
                @click=${this._toggleFind}
                title="Find device"
              >
                <ha-icon .icon=${x}></ha-icon>
              </button>
            ` : c`<span class="find-spacer"></span>`}
      </div>
    `;
  }
  _label(t) {
    const e = this._config;
    if (jc(this.hass, e.driving_entity))
      return e.driving_label || qr;
    const i = t.state;
    if (["home", "not_home", "unavailable", "unknown"].includes(i) && this.hass?.localize) {
      const r = `component.person.entity_component._.state.${i}`, n = this.hass.localize(r);
      if (n && n !== r) return n;
    }
    return this.hass?.formatEntityState ? this.hass.formatEntityState(t) : i;
  }
  _rgb(t) {
    return t === "theme" ? b(this, "blue") : b(this, t);
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
            const r = await o.loadCardHelpers();
            this._footerEl = r.createCardElement(
              e
            );
          } else {
            const r = e.type === "map" ? "hui-map-card" : "hui-picture-entity-card", n = document.createElement(r);
            n.setConfig(e), this._footerEl = n;
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
Ue.styles = [
  P,
  $`
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
xr([
  k({ attribute: !1 })
], Ue.prototype, "hass", 2);
xr([
  y()
], Ue.prototype, "_config", 2);
xr([
  ae(".footer-host")
], Ue.prototype, "_footerHost", 2);
Ue = xr([
  C("ulm-custom-card-ristou-person-card")
], Ue);
var hp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, za = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pp(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && hp(e, i, r), r;
};
const gp = [
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
function Jr(t, e) {
  const i = t[e];
  if (i == null || i === "") return;
  const o = Number.parseFloat(String(i));
  return Number.isFinite(o) ? o : void 0;
}
function ye(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ri(t) {
  return typeof t == "string" && t ? t : void 0;
}
function fp(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
let xo = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity", ["plant", "binary_sensor"]),
        h("name"),
        h("species"),
        f("show_bars"),
        h("label_problem"),
        h("label_correct")
      ],
      computeLabel: S({
        entity: "Plant entity (ulm_card_flower_entity)",
        name: "Name (ulm_card_flower_name)",
        species: "Species (ulm_card_flower_species)",
        show_bars: "Show attribute bars (ulm_card_flower_show_bars)",
        label_problem: "Problem label (ulm_custom_card_schumijo_flower_problem)",
        label_correct: "OK label (ulm_custom_card_schumijo_flower_correct)"
      }),
      computeHelper: z({
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
    const e = t, i = ri(ye(e, "entity", "ulm_card_flower_entity"));
    if (!i) throw new Error("Please define a plant entity");
    this._config = {
      ...t,
      entity: i,
      name: ri(ye(e, "name", "ulm_card_flower_name")),
      species: ri(ye(e, "species", "ulm_card_flower_species")),
      show_bars: fp(ye(e, "show_bars", "ulm_card_flower_show_bars"), !0),
      label_problem: ri(
        ye(e, "label_problem", "ulm_custom_card_schumijo_flower_problem")
      ) || "Problem",
      label_correct: ri(
        ye(e, "label_correct", "ulm_custom_card_schumijo_flower_correct")
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-schumijo-flower"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = t.state === "problem", i = t.state !== "on" && t.state !== "problem", o = b(this, "green"), r = e ? "mdi:alert-circle" : "mdi:flower", n = i ? {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, a = e ? this._config.label_problem : this._config.label_correct, s = this._config.name || t.attributes.friendly_name || t.entity_id;
    return c`
      <ha-card class="ulm-card ulm-schumijo-flower">
        <button class="header" @click=${() => this._moreInfo(this._config.entity)}>
          <div class="icon-cell" style=${d(n)}>
            <ha-icon .icon=${r}></ha-icon>
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
    const e = this._config.show_bars !== !1, i = t.attributes, o = gp.filter(
      (r) => i[r.key] !== void 0 && i[r.key] !== null
    );
    return o.length ? o.map((r) => {
      const n = Jr(i, r.key), a = n !== void 0, s = Jr(i, r.minKey) ?? r.defaultMin, l = Jr(i, r.maxKey) ?? r.defaultMax, p = l - s;
      let m = 0;
      a && p > 0 && (r.logScale && n > 0 && s > 0 ? m = 100 * Math.max(
        0,
        Math.min(
          1,
          (Math.log(n) - Math.log(s)) / (Math.log(l) - Math.log(s))
        )
      ) : m = 100 * Math.max(0, Math.min(1, (n - s) / p)));
      const g = a && (n < s || n > l), v = a ? g ? "bad" : "good" : "unavailable", x = a ? a && n > l ? "bad" : "good" : "unavailable", L = a && n > l ? 100 : 0, A = a ? `${r.key}: ${n} (${s} ~ ${l})` : `${r.key}: unavailable`;
      return c`
        <div class="attr" title=${A}>
          <ha-icon .icon=${r.icon}></ha-icon>
          ${e ? c`
                <div class="meter red">
                  <span
                    class=${v}
                    style=${d({ width: "100%" })}
                  ></span>
                </div>
                <div class="meter green">
                  <span
                    class=${x}
                    style=${d({
        width: a ? `${m}%` : "0%"
      })}
                  ></span>
                </div>
                <div class="meter red">
                  <span
                    class="bad"
                    style=${d({ width: `${L}%` })}
                  ></span>
                </div>
              ` : u}
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
xo.styles = $`
    ${P}

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
za([
  k({ attribute: !1 })
], xo.prototype, "hass", 2);
za([
  y()
], xo.prototype, "_config", 2);
xo = za([
  C("ulm-custom-card-schumijo-flower-card")
], xo);
var bp = Object.defineProperty, yp = Object.getOwnPropertyDescriptor, Ea = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yp(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && bp(e, i, r), r;
};
const Zr = {
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
function xt(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ni(t) {
  return typeof t == "string" && t ? t : void 0;
}
function tc(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function ec(t, e) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  const i = Number.parseFloat(String(t ?? ""));
  return Number.isFinite(i) ? i : e;
}
let $o = class extends w {
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
        _("entity", "binary_sensor"),
        _("handle", ["sensor", "binary_sensor"]),
        U([h("name"), E("icon")]),
        B("color"),
        f("force_background_color"),
        f("show_last_changed"),
        _("battery_level", "sensor", !1),
        U([
          N("battery_warning"),
          N("battery_warning_low")
        ])
      ],
      computeLabel: S({
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
      computeHelper: z({
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
    const e = t, i = ni(xt(e, "entity", "ulm_custom_card_senoro_win_entity")) || "", o = ni(xt(e, "handle", "ulm_custom_card_senoro_win_handle")) || "";
    if (!i) throw new Error("Please define an entity");
    if (!o) throw new Error("Please define a handle entity");
    this._config = {
      ...t,
      entity: i,
      handle: o,
      name: ni(xt(e, "name", "ulm_custom_card_senoro_win_name")),
      icon: ni(xt(e, "icon", "ulm_custom_card_senoro_win_icon")),
      color: xt(e, "color", "ulm_custom_card_senoro_win_color") || "blue",
      force_background_color: tc(
        xt(
          e,
          "force_background_color",
          "ulm_custom_card_senoro_win_force_background_color"
        ),
        !1
      ),
      battery_level: ni(
        xt(e, "battery_level", "ulm_custom_card_senoro_win_battery_level")
      ),
      battery_warning: ec(
        xt(
          e,
          "battery_warning",
          "ulm_custom_card_senoro_win_battery_warning"
        ),
        20
      ),
      battery_warning_low: ec(
        xt(
          e,
          "battery_warning_low",
          "ulm_custom_card_senoro_win_battery_warning_low"
        ),
        5
      ),
      show_last_changed: tc(
        xt(e, "show_last_changed", "ulm_show_last_changed"),
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity], e = this.hass.states[this._config.handle];
    if (!t)
      return c`<ha-card class="ulm-card ulm-senoro-win"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    const i = t.state, o = e?.state ?? "unavailable", r = i === "on", n = this._config.color || "blue", a = this._iconStyle(r, o, n), s = this._cardBackground(r, o, n), l = this._config.name || t.attributes.friendly_name || t.entity_id, p = this._config.icon || t.attributes.icon || "mdi:window-closed-variant", m = this._label(t, i, o), g = this._notification(i, o), v = this._batteryBadge();
    return c`
      <ha-card
        class=${M({ "ulm-card": !0, "ulm-senoro-win": !0 })}
        style=${d(s ? { backgroundColor: s } : {})}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${d(a)}>
            <ha-icon .icon=${p}></ha-icon>
            ${g ? c`<span
                  class="badge notify"
                  style=${d({
      backgroundColor: g.bg
    })}
                >
                  <ha-icon .icon=${g.icon}></ha-icon>
                </span>` : u}
            ${v ? c`<span
                  class="badge battery"
                  style=${d({ backgroundColor: v.bg })}
                >
                  <ha-icon icon="mdi:battery-low"></ha-icon>
                </span>` : u}
          </div>
          <div class="info-btn">
            <div class="name">${l}</div>
            <div class="label">${m}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _lang() {
    const t = (this.hass?.language || "en").toLowerCase(), e = t.split("-")[0];
    return Zr[t] || Zr[e] || Zr.en;
  }
  _iconStyle(t, e, i) {
    if (!t)
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
    const o = e === "Closed" ? b(this, "red") : b(this, i);
    return {
      color: `rgba(${o}, 1)`,
      backgroundColor: `rgba(${o}, 0.2)`
    };
  }
  _cardBackground(t, e, i) {
    if (!this._config?.force_background_color || !t) return;
    const r = getComputedStyle(this).getPropertyValue("--opacity-bg").trim() || "1";
    if (e === "Tilted" || e === "Open")
      return `rgba(${b(this, i)}, ${r})`;
    if (e === "Closed")
      return `rgba(${b(this, "red")}, ${r})`;
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
    const o = b(this, "green"), r = b(this, "red"), n = t === "off" && e === "Closed" ? `rgba(${o}, 1)` : `rgba(${r}, 1)`;
    return { icon: i, bg: n };
  }
  _batteryBadge() {
    const t = this._config, e = t.battery_level;
    if (!e || !this.hass) return null;
    const i = this.hass.states[e];
    if (!i) return null;
    const o = Number.parseFloat(i.state);
    if (!Number.isFinite(o)) return null;
    const r = t.battery_warning ?? 20, n = t.battery_warning_low ?? 5;
    if (o > r) return null;
    const a = b(this, "red"), s = b(this, "yellow");
    return { bg: o <= n ? `rgba(${a}, 1)` : `rgba(${s}, 1)` };
  }
  _relativeTime(t) {
    const e = new Date(t).getTime();
    if (Number.isNaN(e)) return "";
    const i = Math.max(0, Math.round((Date.now() - e) / 1e3));
    if (i < 60) return `${i}s`;
    const o = Math.round(i / 60);
    if (o < 60) return `${o}m`;
    const r = Math.round(o / 60);
    return r < 48 ? `${r}h` : `${Math.round(r / 24)}d`;
  }
};
$o.styles = $`
    ${P}

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
Ea([
  k({ attribute: !1 })
], $o.prototype, "hass", 2);
Ea([
  y()
], $o.prototype, "_config", 2);
$o = Ea([
  C("ulm-custom-card-senoro-win-card")
], $o);
var vp = Object.defineProperty, wp = Object.getOwnPropertyDescriptor, Pa = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wp(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && vp(e, i, r), r;
};
function Qo(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function tr(t) {
  return typeof t == "string" && t ? t : void 0;
}
function ic(t) {
  const e = new Option().style;
  return e.color = t, e.color !== "";
}
function xp(t) {
  if (!(!Array.isArray(t) || t.length === 0))
    return t;
}
let ko = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("entity"),
        h("name"),
        h("ulm_idle"),
        h("ulm_translation_unavailable")
      ],
      computeLabel: S({
        entity: "Printer status entity",
        name: "Printer name override",
        ulm_idle: "Idle state label (ulm_idle)",
        ulm_translation_unavailable: "Unavailable label"
      }),
      computeHelper: z({
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
    const e = t, i = tr(t.entity);
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: tr(Qo(e, "name")),
      cartridges: xp(Qo(e, "cartridges")),
      ulm_idle: tr(Qo(e, "ulm_idle")) || "idle",
      ulm_translation_unavailable: tr(Qo(e, "ulm_translation_unavailable")) || "unavailable",
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-sisimomo-printer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = (this._config.ulm_idle || "idle").toLowerCase(), i = (this._config.ulm_translation_unavailable || "unavailable").toLowerCase(), o = t.state.toLowerCase(), r = o !== e && o !== i, n = this._buildCartridges();
    return c`
      <ha-card
        class=${M({
      "ulm-card": !0,
      "ulm-sisimomo-printer": !0,
      active: r
    })}
      >
        ${this._renderHeader(t, r)}
        <div class="cartridges">${this._renderCartridgeBlock(n)}</div>
      </ha-card>
    `;
  }
  _renderHeader(t, e) {
    const i = b(this, "blue"), o = e ? {
      color: `rgba(${i}, 1)`,
      backgroundColor: `rgba(${i}, 0.2)`
    } : {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
    }, r = this._config.name || t.attributes.friendly_name || t.entity_id, n = this.hass.formatEntityState?.(t) || t.state, a = t.attributes.icon || "mdi:printer";
    return c`
      <button
        class="header"
        @click=${() => this._moreInfo(this._config.entity)}
      >
        <div class="icon-cell" style=${d(o)}>
          <ha-icon .icon=${a}></ha-icon>
        </div>
        <div class="info">
          <div class="printer-name">${r}</div>
          <div class="printer-state">${n}</div>
        </div>
      </button>
    `;
  }
  _buildCartridges() {
    const t = this._config.cartridges;
    if (!t?.length) return;
    const e = (this._config.ulm_translation_unavailable || "unavailable").toLowerCase(), i = ["unicolor", "tricolor"], o = [];
    let r = !0;
    return t.forEach((a, s) => {
      const l = a.type ?? "unicolor";
      if (a.label === void 0 && o.push(`cartridges.[${s}].label: You must provide a value.`), i.includes(l) || o.push(
        `cartridges.[${s}].type: You must provide a valid cartridge type`
      ), a.color !== void 0 ? l === "unicolor" ? (typeof a.color != "string" || !ic(a.color)) && o.push(
        `cartridges.[${s}].color: You must provide a single valid CSS color value.`
      ) : Array.isArray(a.color) && a.color.length === 3 ? a.color.forEach((p, m) => {
        ic(String(p)) || o.push(
          `cartridges.[${s}].color.[${m}]: You must provide a single valid CSS color value.`
        );
      }) : o.push(
        `cartridges.[${s}].color: Invalid combination of colour and type.`
      ) : o.push(`cartridges.[${s}].color: You must provide a value.`), a.entity_id === void 0)
        o.push(
          `cartridges.[${s}].entity_id: You must provide a value.`
        );
      else {
        const p = this.hass.states[a.entity_id];
        if (!p)
          o.push(
            `cartridges.[${s}].entity_id: You must provide a existing entity_id.`
          );
        else if (String(p.state).toLowerCase() === e)
          r = !1;
        else {
          const m = Number(p.state);
          (Number.isNaN(m) || typeof p.state == "boolean" || m < 0 || m > 100) && o.push(
            `cartridges.[${s}].entity_id: You must provide a entity representing an integer between 0 and 100 inclusively.`
          );
        }
      }
    }), o.length ? { kind: "errors", messages: o } : r ? { kind: "bars", rows: t.map((a) => {
      const s = a.type ?? "unicolor", l = this.hass.states[a.entity_id], p = Number(l.state);
      let m;
      if (s === "unicolor")
        m = {
          width: `${p}%`,
          backgroundColor: a.color
        };
      else {
        const [g, v, x] = a.color;
        m = {
          width: `${p}%`,
          background: `linear-gradient(180deg, ${g}, ${g} 33%, ${v} 33%, ${v} 66%, ${x} 66%, ${x})`
        };
      }
      return {
        label: a.label,
        pct: p,
        barStyle: m
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
    ` : u;
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
ko.styles = $`
    ${P}

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
Pa([
  k({ attribute: !1 })
], ko.prototype, "hass", 2);
Pa([
  y()
], ko.prototype, "_config", 2);
ko = Pa([
  C("ulm-custom-card-sisimomo-printer-card")
], ko);
var $p = Object.defineProperty, kp = Object.getOwnPropertyDescriptor, La = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? kp(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && $p(e, i, r), r;
};
function ve(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ai(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Cp(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function Sp(t) {
  return t === "not_home" || t === "off";
}
let Co = class extends w {
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
        _("entity", ["device_tracker", "person"]),
        h("name"),
        E("icon"),
        f("status_as_name"),
        h("color_online"),
        h("color_offline")
      ],
      computeLabel: S({
        entity: "Device tracker",
        name: "Name (custom_card_vncntdev_device_tracker_name)",
        icon: "Icon (custom_card_vncntdev_device_tracker_icon)",
        status_as_name: "Show Online/Offline as name (custom_card_vncntdev_device_tracker_status_as_name)",
        color_online: "Online icon color",
        color_offline: "Offline icon color"
      }),
      computeHelper: z({
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
    const e = t, i = ai(ve(e, "entity"));
    if (!i) throw new Error("Please define an entity");
    this._config = {
      ...t,
      entity: i,
      name: ai(
        ve(e, "name", "custom_card_vncntdev_device_tracker_name")
      ),
      icon: ai(ve(e, "icon", "custom_card_vncntdev_device_tracker_icon")) || "mdi:server",
      status_as_name: Cp(
        ve(
          e,
          "status_as_name",
          "custom_card_vncntdev_device_tracker_status_as_name"
        ),
        !1
      ),
      color_online: ai(
        ve(
          e,
          "color_online",
          "custom_card_vncntdev_device_tracker_color_online"
        )
      ) || "var(--google-green)",
      color_offline: ai(
        ve(
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
    if (!this._config || !this.hass) return u;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card class="ulm-card ulm-vncntdev-tracer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    const e = Sp(t.state), i = e ? "Offline" : "Online", o = this._config.name || t.attributes.friendly_name || t.entity_id, r = this._config.status_as_name ? i : o, n = this._config.status_as_name ? o : i, a = e ? this._config.color_offline : this._config.color_online;
    return c`
      <ha-card class="ulm-card ulm-vncntdev-tracer" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style="color: ${a};">
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${r}</div>
            <div class="label">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Co.styles = $`
    ${P}

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
La([
  k({ attribute: !1 })
], Co.prototype, "hass", 2);
La([
  y()
], Co.prototype, "_config", 2);
Co = La([
  C("ulm-custom-card-vncntdev-device-tracer-card")
], Co);
var zp = Object.defineProperty, Ep = Object.getOwnPropertyDescriptor, Ma = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ep(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && zp(e, i, r), r;
};
const Pp = {
  none: "None",
  very_low: "Very low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very high"
}, we = {
  tree: "mdi:tree",
  grass: "mdi:grass",
  weed: "mdi:flower-pollen"
};
function Z(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function X(t) {
  return typeof t == "string" && t ? t : void 0;
}
function Lp(t, e) {
  switch (e) {
    case "none":
      return {
        color: `rgba(${b(t, "grey")}, 1)`,
        backgroundColor: `rgba(${b(t, "grey")}, 0.2)`
      };
    case "very_low":
      return {
        color: `rgba(${b(t, "green")}, 1)`,
        backgroundColor: `rgba(${b(t, "green")}, 0.2)`
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
        color: `rgba(${b(t, "pink")}, 1)`,
        backgroundColor: `rgba(${b(t, "pink")}, 0.2)`
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)"
      };
  }
}
function Mp(t) {
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
let So = class extends w {
  static getConfigForm() {
    return {
      schema: [
        _("tree_entity", void 0, !1),
        _("grass_entity", void 0, !1),
        _("weed_entity", void 0, !1),
        U([h("tree_name"), E("tree_icon")]),
        U([h("grass_name"), E("grass_icon")]),
        U([h("weed_name"), E("weed_icon")]),
        h("label_none"),
        h("label_very_low"),
        h("label_low"),
        h("label_medium"),
        h("label_high"),
        h("label_very_high")
      ],
      computeLabel: S({
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
      computeHelper: z({
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
      tree_icon: we.tree,
      grass_icon: we.grass,
      weed_icon: we.weed
    };
  }
  setConfig(t) {
    const e = t, i = X(
      Z(e, "tree_entity", "custom_card_wsly_pollen_tree", "entity")
    ), o = X(
      Z(e, "grass_entity", "custom_card_wsly_pollen_grass")
    ), r = X(Z(e, "weed_entity", "custom_card_wsly_pollen_weed"));
    if (!i && !o && !r)
      throw new Error("Please define at least one pollen entity");
    this._config = {
      ...t,
      tree_entity: i,
      grass_entity: o,
      weed_entity: r,
      tree_name: X(
        Z(e, "tree_name", "custom_card_wsly_pollen_tree_name")
      ),
      grass_name: X(
        Z(e, "grass_name", "custom_card_wsly_pollen_grass_name")
      ),
      weed_name: X(
        Z(e, "weed_name", "custom_card_wsly_pollen_weed_name")
      ),
      tree_icon: X(
        Z(e, "tree_icon", "custom_card_wsly_pollen_tree_icon")
      ),
      grass_icon: X(
        Z(e, "grass_icon", "custom_card_wsly_pollen_grass_icon")
      ),
      weed_icon: X(
        Z(e, "weed_icon", "custom_card_wsly_pollen_weed_icon")
      ),
      label_none: X(
        Z(e, "label_none", "custom_card_wsly_pollen_none")
      ),
      label_very_low: X(
        Z(e, "label_very_low", "custom_card_wsly_pollen_very_low")
      ),
      label_low: X(Z(e, "label_low", "custom_card_wsly_pollen_low")),
      label_medium: X(
        Z(e, "label_medium", "custom_card_wsly_pollen_medium")
      ),
      label_high: X(Z(e, "label_high", "custom_card_wsly_pollen_high")),
      label_very_high: X(
        Z(e, "label_very_high", "custom_card_wsly_pollen_very_high")
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
    if (!this._config || !this.hass) return u;
    const t = [
      {
        entityId: this._config.tree_entity,
        name: this._config.tree_name,
        icon: this._config.tree_icon,
        fallbackIcon: we.tree,
        fallbackName: "Trees"
      },
      {
        entityId: this._config.grass_entity,
        name: this._config.grass_name,
        icon: this._config.grass_icon,
        fallbackIcon: we.grass,
        fallbackName: "Grass"
      },
      {
        entityId: this._config.weed_entity,
        name: this._config.weed_name,
        icon: this._config.weed_icon,
        fallbackIcon: we.weed,
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
  _renderColumn(t, e, i, o, r) {
    if (!t)
      return c`<div class="column"></div>`;
    const n = this.hass.states[t];
    if (!n)
      return c`
        <div class="column">
          <div class="warning small">${t}</div>
        </div>
      `;
    const a = Mp(n.state), s = Lp(this, a), l = i || n.attributes.icon || o, p = e || n.attributes.friendly_name || r, m = a === "unknown" ? this._levelLabel("none") : this._levelLabel(a), g = b(this, "red");
    return c`
      <div
        class="column"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(t)}
        @keydown=${(v) => {
      (v.key === "Enter" || v.key === " ") && (v.preventDefault(), this._moreInfo(t));
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
            ` : u}
        <div class="col-name">${p}</div>
        <div class="col-label">${m}</div>
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
    }[t] ?? Pp[t];
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
So.styles = $`
    ${P}

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
Ma([
  k({ attribute: !1 })
], So.prototype, "hass", 2);
Ma([
  y()
], So.prototype, "_config", 2);
So = Ma([
  C("ulm-custom-card-wsly-pollen-card")
], So);
const Op = [];
var Np = Object.defineProperty, oc = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && Np(e, i, r), r;
};
const rc = {
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
}, nc = {
  default: "mdi:shield-outline",
  armed_home: "mdi:shield-home",
  armed_away: "mdi:shield-lock",
  armed_night: "mdi:shield-moon",
  disarmed: "mdi:shield-off",
  arming: "mdi:shield",
  triggered: "mdi:shield-alert"
}, ac = {
  default: "var(--google-yellow)",
  armed_home: "var(--google-red)",
  armed_away: "var(--google-red)",
  armed_night: "var(--google-red)",
  disarmed: "var(--google-green)",
  arming: "var(--google-yellow)",
  triggered: "var(--google-red)"
};
function it(t, e) {
  if (!(!e || typeof e != "string"))
    return t.states[e];
}
function xe(t, e) {
  if (!e) return "";
  if (t.formatEntityState) return t.formatEntityState(e);
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
function Et(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
function Xr(t) {
  t && (history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed")));
}
function T(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function sc(t) {
  if (t == null || t === "") return "?";
  const e = Number(t);
  return !Number.isNaN(e) && !Number.isInteger(e) ? e.toFixed(1) : String(t);
}
function cc(t, e) {
  return String(T(e, "ulm_language", "language") || t.language || void 0);
}
const Ip = [
  {
    tag: "ulm-chip-back-card",
    type: "custom:ulm-chip-back-card",
    name: "ULM Chip Back",
    description: "Back navigation chip (mdi arrow)",
    fields: [E("icon"), h("navigation_path")],
    stub: { icon: "mdi:arrow-left" },
    normalize: (t) => ({
      ...t,
      icon: T(t, "icon", "ulm_chip_back_icon") || "mdi:arrow-left",
      navigation_path: T(t, "navigation_path", "ulm_chip_back_path")
    }),
    renderLabel: () => "",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:arrow-left")
    }),
    onTap: (t, e) => {
      const i = String(e.navigation_path || "");
      i ? Xr(i) : history.back();
    }
  },
  {
    tag: "ulm-chip-navigate-card",
    type: "custom:ulm-chip-navigate-card",
    name: "ULM Chip Navigate",
    description: "Navigate chip with optional label",
    fields: [
      E("icon"),
      h("navigation_path"),
      h("label"),
      h("icon_color"),
      h("label_color")
    ],
    stub: {
      icon: "mdi:page-next",
      navigation_path: "/lovelace/home",
      label: ""
    },
    normalize: (t) => ({
      ...t,
      icon: T(t, "icon", "ulm_chip_navigate_icon") || "mdi:page-next",
      navigation_path: T(t, "navigation_path", "ulm_chip_navigate_path"),
      label: T(t, "label", "ulm_chip_navigate_label") || "",
      icon_color: T(t, "icon_color", "ulm_chip_navigate_icon_color"),
      label_color: T(t, "label_color", "ulm_chip_navigate_label_color")
    }),
    renderLabel: (t, e) => String(e.label || ""),
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:page-next"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e) => Xr(String(e.navigation_path || ""))
  },
  {
    tag: "ulm-chip-icon-only-card",
    type: "custom:ulm-chip-icon-only-card",
    name: "ULM Chip Icon Only",
    description: "Emoji / text chip (no MDI)",
    fields: [h("icon")],
    stub: { icon: "💡" },
    normalize: (t) => ({
      ...t,
      icon: T(t, "icon", "ulm_chip_icon_only") || "❔"
    }),
    renderLabel: (t, e) => String(e.icon || "❔")
  },
  {
    tag: "ulm-chip-mdi-icon-only-card",
    type: "custom:ulm-chip-mdi-icon-only-card",
    name: "ULM Chip MDI Icon Only",
    description: "MDI icon chip",
    fields: [
      E("icon"),
      _("entity", void 0, !1),
      h("icon_color")
    ],
    stub: { icon: "mdi:home" },
    normalize: (t) => ({
      ...t,
      icon: T(t, "icon", "ulm_chip_mdi_icon_only_icon") || "mdi:home",
      entity: T(t, "entity", "ulm_chip_mdi_icon_only_entity"),
      icon_color: T(t, "icon_color", "ulm_chip_mdi_icon_only_icon_color")
    }),
    renderLabel: () => "",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:home"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-state-card",
    type: "custom:ulm-chip-icon-state-card",
    name: "ULM Chip Icon State",
    description: "Emoji + localized entity state",
    fields: [_("entity"), h("icon")],
    stub: { entity: "sensor.outside_temperature", icon: "🌡️" },
    normalize: (t) => ({
      ...t,
      entity: T(t, "entity", "ulm_chip_icon_state_entity"),
      icon: T(t, "icon", "ulm_chip_icon_state_icon") || "❔"
    }),
    renderLabel: (t, e) => {
      const i = it(t, e.entity), o = String(e.icon || "❔"), r = xe(t, i);
      return r ? `${o} ${r}` : o;
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-mdi-icon-state-card",
    type: "custom:ulm-chip-mdi-icon-state-card",
    name: "ULM Chip MDI Icon State",
    description: "MDI icon + localized state",
    fields: [
      _("entity"),
      E("icon"),
      h("icon_color"),
      h("label_color")
    ],
    stub: {
      entity: "sensor.outside_temperature",
      icon: "mdi:thermometer"
    },
    normalize: (t) => ({
      ...t,
      entity: T(t, "entity", "ulm_chip_mdi_icon_state_entity"),
      icon: T(t, "icon", "ulm_chip_mdi_icon_state_icon") || "mdi:information",
      icon_color: T(t, "icon_color", "ulm_chip_mdi_icon_state_icon_color"),
      label_color: T(
        t,
        "label_color",
        "ulm_chip_mdi_icon_state_label_color"
      )
    }),
    renderLabel: (t, e) => xe(t, it(t, e.entity)) || "?",
    renderIcon: (t, e) => ({
      icon: String(e.icon || "mdi:information"),
      color: e.icon_color ? String(e.icon_color) : void 0
    }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-label-card",
    type: "custom:ulm-chip-icon-label-card",
    name: "ULM Chip Icon Label",
    description: "MDI icon + custom label",
    fields: [
      E("icon"),
      h("label"),
      _("entity", void 0, !1)
    ],
    stub: { icon: "mdi:tag", label: "Label" },
    normalize: (t) => ({
      ...t,
      icon: T(t, "icon", "ulm_chip_icon_label_icon") || "mdi:tag",
      label: T(t, "label", "ulm_chip_icon_label_label") || "",
      entity: T(t, "entity", "ulm_chip_icon_label_entity")
    }),
    variant: "icon-label",
    renderLabel: (t, e) => String(e.label || ""),
    renderIcon: (t, e) => ({ icon: String(e.icon || "mdi:tag") }),
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-icon-double-state-card",
    type: "custom:ulm-chip-icon-double-state-card",
    name: "ULM Chip Icon Double State",
    description: "Emoji + two localized states (•)",
    fields: [
      _("entity_1"),
      _("entity_2"),
      h("icon"),
      h("navigation_path")
    ],
    stub: {
      entity_1: "sensor.outside_temperature",
      entity_2: "sensor.outside_humidity",
      icon: "🌡️"
    },
    normalize: (t) => ({
      ...t,
      entity_1: T(t, "entity_1", "ulm_chip_icon_double_state_entity_1"),
      entity_2: T(t, "entity_2", "ulm_chip_icon_double_state_entity_2"),
      icon: T(t, "icon", "ulm_chip_icon_double_state_icon") || "❔",
      navigation_path: T(t, "navigation_path", "ulm_chip_navigate_path")
    }),
    renderLabel: (t, e) => {
      const i = String(e.icon || "❔"), o = xe(t, it(t, e.entity_1)) || "?", r = xe(t, it(t, e.entity_2)) || "?";
      return `${i} ${o} • ${r}`;
    },
    onTap: (t, e) => {
      const i = String(e.navigation_path || "");
      i && Xr(i);
    }
  },
  {
    tag: "ulm-chip-alarm-card",
    type: "custom:ulm-chip-alarm-card",
    name: "ULM Chip Alarm",
    description: "Alarm control panel chip",
    fields: [_("entity", "alarm_control_panel")],
    stub: { entity: "alarm_control_panel.security" },
    normalize: (t) => ({
      ...t,
      entity: T(t, "entity", "ulm_chip_alarm_entity")
    }),
    variant: "icon-label",
    renderLabel: (t, e) => xe(t, it(t, e.entity)) || "unknown",
    renderIcon: (t, e) => {
      const i = (it(t, e.entity)?.state || "").toLowerCase();
      return {
        icon: nc[i] || nc.default,
        color: ac[i] || ac.default
      };
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-power-consumption-card",
    type: "custom:ulm-chip-power-consumption-card",
    name: "ULM Chip Power Consumption",
    description: "⚡ price or consumption chip",
    fields: [
      _("electric_consumption", void 0, !1),
      _("electric_price", void 0, !1)
    ],
    stub: { electric_consumption: "sensor.power_consumption" },
    normalize: (t) => ({
      ...t,
      electric_consumption: T(
        t,
        "electric_consumption",
        "ulm_chip_electric_consumption",
        "entity"
      ),
      electric_price: T(t, "electric_price", "ulm_chip_electric_price")
    }),
    renderLabel: (t, e) => {
      const i = it(t, e.electric_price);
      if (i) {
        const r = i.attributes.unit_of_measurement || "";
        return `⚡ ${i.state}${r}`;
      }
      const o = it(t, e.electric_consumption);
      return o ? `⚡ ${xe(t, o)}` : "⚡ ?";
    },
    onTap: (t, e, i) => {
      const o = String(e.electric_price || e.electric_consumption || "");
      o && Et(i, o);
    }
  },
  {
    tag: "ulm-chip-presence-detection-card",
    type: "custom:ulm-chip-presence-detection-card",
    name: "ULM Chip Presence",
    description: "🏠 residents [/ guests] counters",
    fields: [
      _("residents"),
      _("guests", void 0, !1)
    ],
    stub: {
      residents: "input_number.residents_home",
      guests: "input_number.guests_home"
    },
    normalize: (t) => ({
      ...t,
      residents: T(
        t,
        "residents",
        "ulm_chip_presence_counter_residents",
        "entity"
      ),
      guests: T(t, "guests", "ulm_chip_presence_counter_guests")
    }),
    renderLabel: (t, e) => {
      const i = it(t, e.residents)?.state ?? "?", o = it(t, e.guests);
      return o ? `🏠 ${i} / ${o.state}` : `🏠 ${i}`;
    },
    onTap: (t, e, i) => {
      typeof e.residents == "string" && Et(i, e.residents);
    }
  },
  {
    tag: "ulm-chip-temperature-card",
    type: "custom:ulm-chip-temperature-card",
    name: "ULM Chip Temperature",
    description: "Weather emoji + outside [/ inside] °",
    fields: [
      _("weather", "weather"),
      _("outside"),
      _("inside", void 0, !1)
    ],
    stub: {
      weather: "weather.demo_weather_north",
      outside: "sensor.outside_temperature"
    },
    normalize: (t) => ({
      ...t,
      weather: T(t, "weather", "ulm_chip_temperature_weather"),
      outside: T(t, "outside", "ulm_chip_temperature_outside"),
      inside: T(t, "inside", "ulm_chip_temperature_inside")
    }),
    renderLabel: (t, e) => {
      const i = it(t, e.weather), o = it(t, e.outside), r = it(t, e.inside), n = rc[i?.state || ""] || "🌡️", a = sc(
        o?.state ?? i?.attributes.temperature
      );
      return r ? `${n} ${a}° / ${sc(r.state)}°` : `${n} ${a}°`;
    },
    onTap: (t, e, i) => {
      const o = String(e.weather || e.outside || "");
      o && Et(i, o);
    }
  },
  {
    tag: "ulm-chip-weather-date-card",
    type: "custom:ulm-chip-weather-date-card",
    name: "ULM Chip Weather Date",
    description: "Weather emoji + short date",
    fields: [_("entity", "weather")],
    stub: { entity: "weather.demo_weather_north" },
    normalize: (t) => ({
      ...t,
      entity: T(t, "entity", "ulm_weather", "ulm_chip_weather_date_entity")
    }),
    renderLabel: (t, e) => {
      const i = it(t, e.entity), o = rc[i?.state || ""] || "🌡️", r = (/* @__PURE__ */ new Date()).toLocaleDateString(cc(t, e), {
        month: "short",
        day: "numeric"
      });
      return `${o} ${r}`;
    },
    onTap: (t, e, i) => {
      typeof e.entity == "string" && Et(i, e.entity);
    }
  },
  {
    tag: "ulm-chip-short-date-with-day-card",
    type: "custom:ulm-chip-short-date-with-day-card",
    name: "ULM Chip Short Date",
    description: "Weekday + short date (label only)",
    fields: [],
    stub: {},
    renderLabel: (t, e) => new Intl.DateTimeFormat(cc(t, e), {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(Date.now())
  }
];
function jp(t) {
  const i = class i extends w {
    constructor() {
      super(...arguments), this._onTap = (r) => {
        r.stopPropagation(), !(!this.hass || !this._config) && t.onTap?.(this.hass, this._config, this);
      };
    }
    static getConfigForm() {
      return { schema: t.fields };
    }
    static getStubConfig() {
      return { ...t.stub };
    }
    setConfig(r) {
      const n = { ...r }, a = t.normalize ? t.normalize(n) : n;
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
      fr(this, this.hass);
    }
    render() {
      if (!this._config || !this.hass) return u;
      const r = this._config, n = t.renderIcon?.(this.hass, r), a = t.renderLabel(this.hass, r), s = typeof r.label_color == "string" ? r.label_color : void 0, l = [
        "chip",
        t.variant === "icon-label" ? "icon-label" : "",
        n && a ? "has-icon-and-label" : ""
      ].filter(Boolean).join(" ");
      return c`
        <button class=${l} @click=${this._onTap}>
          ${n ? c`<ha-icon
                .icon=${n.icon}
                style=${d(
        n.color ? { color: n.color } : {}
      )}
              ></ha-icon>` : u}
          ${a ? c`<span
                class="label"
                style=${d(s ? { color: s } : {})}
                >${a}</span
              >` : u}
        </button>
      `;
    }
  };
  i.styles = br;
  let e = i;
  return oc([
    k({ attribute: !1 })
  ], e.prototype, "hass"), oc([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), t;
}
const Ap = Ip.map(jp);
var Tp = Object.defineProperty, lc = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && Tp(e, i, r), r;
};
const Dp = {
  new_moon: "mdi:moon-new",
  waxing_crescent: "mdi:moon-waxing-crescent",
  first_quarter: "mdi:moon-first-quarter",
  waxing_gibbous: "mdi:moon-waxing-gibbous",
  full_moon: "mdi:moon-full",
  waning_gibbous: "mdi:moon-waning-gibbous",
  last_quarter: "mdi:moon-last-quarter",
  waning_crescent: "mdi:moon-waning-crescent"
}, dc = {
  Normal: "mdi:thermometer",
  Defrost: "mdi:snowflake-melt",
  "Keep On": "mdi:heat-wave",
  "Dog Mode": "mdi:dog-side",
  "Camp Mode": "mdi:campfire",
  default: "mdi:thermometer"
}, Up = {
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
function D(t, ...e) {
  for (const i of e) {
    const o = t[i];
    if (o != null && o !== "") return o;
  }
}
function ot(t) {
  return typeof t == "string" && t ? t : void 0;
}
function uc(t, e) {
  return typeof t == "boolean" ? t : t === "true" || t === "on" || t === 1 ? !0 : t === "false" || t === "off" || t === 0 ? !1 : e;
}
function st(t, e) {
  if (!(!e || typeof e != "string"))
    return t.states[e];
}
function Jt(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
function Bp(t) {
  t && (history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed")));
}
function Qr(t) {
  if (t == null || t === "") return "?";
  const e = Number(t);
  return !Number.isNaN(e) && !Number.isInteger(e) ? e.toFixed(1) : String(t);
}
function tn(t, e) {
  const i = ot(
    D(e, "entities_active", "ulm_custom_chip_group_counter_entities_active")
  );
  if (i) {
    const l = Number.parseFloat(st(t, i)?.state ?? "");
    return Number.isFinite(l) ? Math.max(0, Math.round(l)) : 0;
  }
  const o = ot(D(e, "entity")), r = st(t, o);
  if (!r) return 0;
  const a = String(
    D(e, "count_state", "ulm_custom_chip_group_counter_count_state") || "on"
  ).split(",").map((l) => l.trim()), s = r.attributes.entity_id;
  return Array.isArray(s) && s.length ? s.filter((l) => {
    const p = t.states[String(l)];
    return p && a.includes(p.state);
  }).length : a.includes(r.state) ? 1 : 0;
}
function Fp(t, e) {
  const o = `${e}_${t === 0 ? "zero" : t === 1 ? "one" : "multiple"}`;
  return (Up[o] || `{count} ${e}`).replace("{count}", String(t));
}
function Hp(t, e, i) {
  if (!i) return "rgba(var(--color-theme),0.2)";
  const r = [
    "yellow",
    "blue",
    "green",
    "red",
    "purple",
    "pink",
    "grey"
  ].includes(e) ? e : "yellow";
  return `rgba(${b(t, r)},1)`;
}
function Rp(t, e) {
  const i = ot(
    D(e, "battery_entity", "ulm_battery_entity")
  );
  if (i) {
    const s = Number.parseFloat(st(t, i)?.state ?? "");
    return Number.isFinite(s) ? Math.round(s) : void 0;
  }
  const o = ot(D(e, "entity")), r = st(t, o);
  if (!r) return;
  const n = r.attributes.battery ?? r.attributes.battery_level, a = Number.parseFloat(String(n ?? ""));
  return Number.isFinite(a) ? Math.round(a) : void 0;
}
const Gp = [
  {
    tag: "ulm-custom-chip-group-counter-card",
    type: "custom:ulm-custom-chip-group-counter-card",
    name: "ULM Custom Chip group counter",
    description: "Count active entities in a group (lights, media, …)",
    fields: [
      _("entity", ["group", "light", "switch", "media_player"]),
      _("entities_active", "sensor", !1),
      h("counter_type"),
      h("count_state"),
      E("icon_zero"),
      E("icon_one"),
      E("icon_multiple"),
      B("color"),
      f("hide_if_zero")
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
      entity: D(t, "entity"),
      entities_active: D(
        t,
        "entities_active",
        "ulm_custom_chip_group_counter_entities_active"
      ),
      counter_type: D(
        t,
        "counter_type",
        "ulm_custom_chip_group_counter_type"
        // legacy short key from YAML variables (avoid clobbering card type)
      ) || "light",
      count_state: D(t, "count_state", "ulm_custom_chip_group_counter_count_state") || "on",
      icon_zero: D(t, "icon_zero", "ulm_custom_chip_group_counter_icon_zero") || "mdi:lightbulb-outline",
      icon_one: D(t, "icon_one", "ulm_custom_chip_group_counter_icon_one") || "mdi:lightbulb-on-outline",
      icon_multiple: D(
        t,
        "icon_multiple",
        "ulm_custom_chip_group_counter_icon_multiple"
      ) || "mdi:lightbulb-on-outline",
      color: D(t, "color", "ulm_custom_chip_group_counter_color") || "yellow",
      hide_if_zero: uc(
        D(t, "hide_if_zero", "ulm_custom_chip_group_counter_hide_if_zero"),
        !1
      )
    }),
    shouldHide: (t, e) => !!e.hide_if_zero && tn(t, e) === 0,
    renderIcon: (t, e, i) => {
      const o = tn(t, e);
      return {
        icon: String(o === 0 ? e.icon_zero || "mdi:lightbulb-outline" : o === 1 ? e.icon_one || "mdi:lightbulb-on-outline" : e.icon_multiple || "mdi:lightbulb-on-outline"),
        color: Hp(i, String(e.color || "yellow"), o > 0)
      };
    },
    renderLabel: (t, e) => Fp(
      tn(t, e),
      String(e.counter_type || "light")
    ),
    onTap: (t, e, i) => {
      const o = ot(e.entity);
      if (!o) return;
      const r = o.split(".")[0];
      r === "light" || r === "switch" || r === "group" ? t.callService("homeassistant", "toggle", { entity_id: o }) : Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-moon-card",
    type: "custom:ulm-custom-chip-moon-card",
    name: "ULM Custom Chip moon",
    description: "Moon phase icon chip",
    fields: [_("entity", "sensor")],
    stub: { entity: "sensor.moon_phase" },
    normalize: (t) => ({ ...t, entity: D(t, "entity") }),
    renderLabel: () => "",
    renderIcon: (t, e) => {
      const i = st(t, e.entity)?.state || "";
      return { icon: Dp[i] || "mdi:moon-waning-crescent" };
    },
    onTap: (t, e, i) => {
      const o = ot(e.entity);
      o && Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-myenedis-card",
    type: "custom:ulm-custom-chip-myenedis-card",
    name: "ULM Custom Chip myenedis",
    description: "MyEnedis daily cost / consumption chip",
    fields: [
      _("entity", "sensor"),
      f("separate_hp_hc"),
      h("unit_of_measurement")
    ],
    stub: { entity: "sensor.power_consumption", separate_hp_hc: !1 },
    normalize: (t) => ({
      ...t,
      entity: D(t, "entity"),
      separate_hp_hc: uc(
        D(t, "separate_hp_hc", "ulm_chip_separate_hp_hc"),
        !1
      ),
      unit_of_measurement: D(
        t,
        "unit_of_measurement",
        "ulm_chip_unit_of_measurement"
      )
    }),
    renderLabel: (t, e) => {
      const i = st(t, e.entity);
      if (!i) return "💰 —";
      const o = ot(e.unit_of_measurement) || String(i.attributes.unit_of_measurement || "kWh"), r = Number.parseFloat(String(i.attributes.daily_cost ?? ""));
      let n = `💰 ${Number.isFinite(r) ? r.toFixed(1) : "—"} €`;
      if (e.separate_hp_hc) {
        const a = Number.parseFloat(String(i.attributes.yesterday_HP ?? "")), s = Number.parseFloat(String(i.attributes.yesterday_HC ?? ""));
        n += ` ☀️ ${Number.isFinite(a) ? a.toFixed(1) : "—"} ${o}`, n += ` 🌑 ${Number.isFinite(s) ? s.toFixed(1) : "—"} ${o}`;
      } else {
        const a = Number.parseFloat(
          String(i.attributes.yesterday_HCHP ?? i.state ?? "")
        );
        n += ` ⚡ ${Number.isFinite(a) ? a.toFixed(1) : "—"} ${o}`;
      }
      return n;
    },
    onTap: (t, e, i) => {
      const o = ot(e.entity);
      o && Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-simple-temp-card",
    type: "custom:ulm-custom-chip-simple-temp-card",
    name: "ULM Custom Chip simple temp",
    description: "Temperature value chip (e.g. 21.5°)",
    fields: [_("entity", ["sensor", "climate"])],
    stub: { entity: "sensor.outside_temperature" },
    normalize: (t) => ({ ...t, entity: D(t, "entity") }),
    renderLabel: (t, e) => {
      const i = st(t, e.entity);
      if (!i) return "—°";
      const o = i.attributes.current_temperature !== void 0 ? i.attributes.current_temperature : i.state;
      return `${Qr(o)}°`;
    },
    onTap: (t, e, i) => {
      const o = ot(e.entity);
      o && Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-tesla-temperature-card",
    type: "custom:ulm-custom-chip-tesla-temperature-card",
    name: "ULM Custom Chip tesla temperature",
    description: "HVAC set / current temperature chip",
    fields: [_("hvac", "climate"), _("entity", "climate", !1)],
    stub: { hvac: "climate.hvac" },
    variant: "icon-label",
    normalize: (t) => ({
      ...t,
      hvac: D(t, "hvac", "ulm_chip_hvac", "entity"),
      entity: D(t, "entity", "ulm_chip_hvac")
    }),
    renderIcon: (t, e) => {
      const i = ot(D(e, "hvac", "entity")), o = String(st(t, i)?.attributes.preset_mode || "");
      return {
        icon: dc[o] || dc.default
      };
    },
    renderLabel: (t, e) => {
      const i = ot(D(e, "hvac", "entity")), o = st(t, i);
      if (!o) return "Set —° / Current —°";
      const r = Qr(o.attributes.temperature), n = Qr(o.attributes.current_temperature);
      return `Set ${r}° / Current ${n}°`;
    },
    onTap: (t, e, i) => {
      const o = ot(D(e, "hvac", "entity"));
      o && Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-chip-update-card",
    type: "custom:ulm-custom-chip-update-card",
    name: "ULM Custom Chip update",
    description: "Updates available / up to date navigate chip",
    fields: [
      _("entity", ["binary_sensor", "update", "sensor"]),
      h("path"),
      h("updates_available"),
      h("no_updates_available")
    ],
    stub: {
      entity: "update.demo_update_with_progress",
      path: "/config/updates",
      updates_available: "Updates available",
      no_updates_available: "Up to date"
    },
    normalize: (t) => ({
      ...t,
      entity: D(t, "entity"),
      path: D(t, "path", "ulm_chip_update_path") || "/config/updates",
      updates_available: D(t, "updates_available", "ulm_updates_available") || "Updates available",
      no_updates_available: D(t, "no_updates_available", "ulm_no_updates_available") || "Up to date"
    }),
    renderIcon: (t, e) => st(t, e.entity)?.state === "off" ? { icon: "mdi:shield-check", color: "var(--google-green)" } : { icon: "mdi:shield-alert", color: "var(--google-red)" },
    renderLabel: (t, e) => st(t, e.entity)?.state === "off" ? String(e.no_updates_available || "Up to date") : String(e.updates_available || "Updates available"),
    onTap: (t, e) => Bp(String(e.path || "/config/updates"))
  },
  {
    tag: "ulm-custom-chip-vlape-garage-card",
    type: "custom:ulm-custom-chip-vlape-garage-card",
    name: "ULM Custom Chip vlape garage",
    description: "Garage open/closed icon + state chip",
    fields: [_("entity", ["cover", "binary_sensor", "lock"])],
    stub: { entity: "cover.garage_door" },
    variant: "icon-label",
    normalize: (t) => ({ ...t, entity: D(t, "entity") }),
    renderIcon: (t, e) => {
      const i = (st(t, e.entity)?.state || "").toLowerCase(), o = i === "open" || i === "opening" || i === "on";
      return {
        icon: o ? "mdi:garage-open" : "mdi:garage",
        color: o ? "var(--google-red)" : "var(--google-green)"
      };
    },
    renderLabel: (t, e) => {
      const i = st(t, e.entity);
      return i ? t.formatEntityState ? t.formatEntityState(i) : i.state : "—";
    },
    onTap: (t, e, i) => {
      const o = ot(e.entity);
      o && Jt(i, o);
    }
  },
  {
    tag: "ulm-custom-template-shogun160-battery-info-card",
    type: "custom:ulm-custom-template-shogun160-battery-info-card",
    name: "ULM Custom Chip battery info",
    description: "Circular battery % badge (shogun160 template as chip)",
    fields: [
      _("battery_entity", "sensor", !1),
      _("entity", ["sensor", "device_tracker", "person"], !1)
    ],
    stub: { battery_entity: "sensor.outside_temperature_battery" },
    normalize: (t) => ({
      ...t,
      battery_entity: D(t, "battery_entity", "ulm_battery_entity"),
      entity: D(t, "entity")
    }),
    renderLabel: () => "",
    renderCustom: (t, e) => {
      const i = Rp(t, e);
      if (i === void 0)
        return c`<span class="label">—%</span>`;
      const o = 14, r = o * 2 * Math.PI, n = r - i / 100 * r;
      return nr`
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
        strokeDasharray: `${r}`,
        strokeDashoffset: `${n}`,
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
      const o = ot(D(e, "battery_entity", "entity"));
      o && Jt(i, o);
    }
  }
];
function Wp(t) {
  const i = class i extends w {
    constructor() {
      super(...arguments), this._onTap = (r) => {
        r.stopPropagation(), !(!this.hass || !this._config) && t.onTap?.(this.hass, this._config, this);
      };
    }
    static getConfigForm() {
      return { schema: t.fields };
    }
    static getStubConfig() {
      return { ...t.stub };
    }
    setConfig(r) {
      const n = { ...r }, a = t.normalize ? t.normalize(n) : n;
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
      fr(this, this.hass);
    }
    render() {
      if (!this._config || !this.hass) return u;
      const r = this._config;
      if (t.shouldHide?.(this.hass, r))
        return u;
      if (t.renderCustom)
        return c`
          <button class="chip bat-chip" @click=${this._onTap}>
            ${t.renderCustom(this.hass, r)}
          </button>
        `;
      const n = t.renderIcon?.(this.hass, r, this), a = t.renderLabel(this.hass, r), s = [
        "chip",
        t.variant === "icon-label" ? "icon-label" : "",
        n && a ? "has-icon-and-label" : ""
      ].filter(Boolean).join(" ");
      return c`
        <button class=${s} @click=${this._onTap}>
          ${n ? c`<ha-icon
                .icon=${n.icon}
                style=${d(
        n.color ? { color: n.color } : {}
      )}
              ></ha-icon>` : u}
          ${a ? c`<span class="label">${a}</span>` : u}
        </button>
      `;
    }
  };
  i.styles = [
    br,
    $`
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
  return lc([
    k({ attribute: !1 })
  ], e.prototype, "hass"), lc([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), t;
}
const Kp = Gp.map(Wp);
var Vp = Object.defineProperty, mc = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && Vp(e, i, r), r;
};
function qp(t) {
  return ["on", "open", "opening", "home", "playing", "cleaning"].includes(
    t.state
  );
}
function Yp(t) {
  const i = class i extends w {
    constructor() {
      super(...arguments), this._iconTap = (r) => {
        if (r.stopPropagation(), !this.hass || !this._config) return;
        const n = this.hass.states[this._config.entity];
        if (n) {
          if (t.onIconTap) {
            t.onIconTap(this.hass, this._config, n);
            return;
          }
          this._moreInfo(r);
        }
      }, this._moreInfo = (r) => {
        r.stopPropagation(), this._config && this.dispatchEvent(
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
      return ul({
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
    setConfig(r) {
      if (!r.entity) throw new Error("Please define an entity");
      this._config = {
        color: t.defaultColor || "blue",
        force_background_color: !1,
        ...r,
        type: t.type
      };
    }
    getCardSize() {
      return 1;
    }
    render() {
      if (!this._config || !this.hass) return u;
      const r = this.hass.states[this._config.entity];
      if (!r)
        return c`<ha-card class="ulm-card"
          ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
        >`;
      const n = (t.isActive || qp)(r), a = this._config.color || t.defaultColor || "blue", s = this._config.name || r.attributes.friendly_name || r.entity_id, l = this._config.icon || r.attributes.icon || t.defaultIcon, p = t.stateLabel ? t.stateLabel(this.hass, r) : r.state, m = !!(n && this._config.force_background_color), g = V(
        this,
        n,
        a,
        null,
        !1,
        m
      ), v = b(this, a), x = m ? {
        backgroundColor: `rgba(${v}, var(--opacity-bg, 1))`
      } : {}, L = m ? { color: "rgb(250, 250, 250)" } : {};
      return c`
        <ha-card class="ulm-card" style=${d(x)}>
          <div class="row">
            <button
              class="icon-btn"
              style=${d(g)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${l}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfo}>
              <div class="name" style=${d(L)}>${s}</div>
              <div class="label" style=${d(L)}>${p}</div>
            </button>
          </div>
        </ha-card>
      `;
    }
  };
  i.styles = P;
  let e = i;
  return mc([
    k({ attribute: !1 })
  ], e.prototype, "hass"), mc([
    y()
  ], e.prototype, "_config"), customElements.get(t.tag) || customElements.define(t.tag, e), { Card: e, def: t };
}
function Jp(t) {
  return t.map((e) => h(e));
}
const Zp = [
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
], Xp = /* @__PURE__ */ new Set([
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
]), Qp = Zp.filter(
  (t) => !Xp.has(t.tag)
).map(
  (t) => Yp({
    tag: t.tag,
    editorTag: t.editorTag,
    type: t.type,
    name: t.name,
    description: t.description,
    defaultIcon: t.defaultIcon,
    defaultColor: t.defaultColor,
    stubEntity: t.stubEntity,
    extraSchema: Jp([...t.extraKeys])
  })
);
console.info(
  `%c ULM-EDITABLE-CARDS %c ${Tc} `,
  "color: white; background: #434343; font-weight: 700;",
  "color: #434343; background: #FF9101; font-weight: 700;"
);
window.customCards = window.customCards || [];
window.customBadges = window.customBadges || [];
const Ac = "https://github.com/UI-Lovelace-Minimalist/UI/tree/main/editable-cards";
function Oa(t, e = !0) {
  window.customCards.push({
    ...t,
    preview: e,
    documentationURL: Ac
  });
}
function Ao(t) {
  const e = {
    ...t,
    preview: !0,
    documentationURL: Ac
  };
  window.customCards.push(e), window.customBadges.push({
    ...e,
    description: `${t.description} (also usable as a view badge)`
  });
}
const tg = [
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
for (const t of tg)
  Oa(t);
for (const { def: t } of Op)
  Oa({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
for (const t of Ap)
  Ao({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
for (const t of Kp)
  Ao({
    type: t.type.replace(/^custom:/, ""),
    name: t.name,
    description: t.description
  });
Ao({
  type: "ulm-custom-card-person-chip-card",
  name: "ULM Custom person chip",
  description: "Person picture + state chip"
});
Ao({
  type: "ulm-custom-card-battery-chip-card",
  name: "ULM Custom battery chip",
  description: "Battery level icon chip (green/yellow/red)"
});
Ao({
  type: "ulm-custom-card-iabadia-battery-chip-card",
  name: "ULM Custom iAbadia battery chip",
  description: "Alias of battery chip (legacy type name)"
});
for (const { def: t } of Qp)
  Oa(
    {
      type: t.type.replace(/^custom:/, ""),
      name: t.name,
      description: t.description
    },
    !1
  );
