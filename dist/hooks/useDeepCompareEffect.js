import { useRef as mt, useEffect as Et } from "react";
var ht = typeof global == "object" && global && global.Object === Object && global, xt = typeof self == "object" && self && self.Object === Object && self, y = ht || xt || Function("return this")(), S = y.Symbol, yt = Object.prototype, Ct = yt.hasOwnProperty, It = yt.toString, E = S ? S.toStringTag : void 0;
function Rt(t) {
  var e = Ct.call(t, E), r = t[E];
  try {
    t[E] = void 0;
    var n = !0;
  } catch {
  }
  var i = It.call(t);
  return n && (e ? t[E] = r : delete t[E]), i;
}
var Dt = Object.prototype, Lt = Dt.toString;
function Mt(t) {
  return Lt.call(t);
}
var Ft = "[object Null]", Gt = "[object Undefined]", Q = S ? S.toStringTag : void 0;
function D(t) {
  return t == null ? t === void 0 ? Gt : Ft : Q && Q in Object(t) ? Rt(t) : Mt(t);
}
function C(t) {
  return t != null && typeof t == "object";
}
var G = Array.isArray;
function vt(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Nt = "[object AsyncFunction]", zt = "[object Function]", Ut = "[object GeneratorFunction]", Bt = "[object Proxy]";
function bt(t) {
  if (!vt(t))
    return !1;
  var e = D(t);
  return e == zt || e == Ut || e == Nt || e == Bt;
}
var B = y["__core-js_shared__"], V = function() {
  var t = /[^.]+$/.exec(B && B.keys && B.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ht(t) {
  return !!V && V in t;
}
var Kt = Function.prototype, qt = Kt.toString;
function $(t) {
  if (t != null) {
    try {
      return qt.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Wt = /[\\^$.*+?()[\]{}|]/g, Xt = /^\[object .+?Constructor\]$/, Jt = Function.prototype, Yt = Object.prototype, Zt = Jt.toString, Qt = Yt.hasOwnProperty, Vt = RegExp(
  "^" + Zt.call(Qt).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function kt(t) {
  if (!vt(t) || Ht(t))
    return !1;
  var e = bt(t) ? Vt : Xt;
  return e.test($(t));
}
function te(t, e) {
  return t == null ? void 0 : t[e];
}
function m(t, e) {
  var r = te(t, e);
  return kt(r) ? r : void 0;
}
var q = m(y, "WeakMap"), ee = 9007199254740991, re = /^(?:0|[1-9]\d*)$/;
function ne(t, e) {
  var r = typeof t;
  return e = e ?? ee, !!e && (r == "number" || r != "symbol" && re.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Tt(t, e) {
  return t === e || t !== t && e !== e;
}
var ae = 9007199254740991;
function At(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ae;
}
function ie(t) {
  return t != null && At(t.length) && !bt(t);
}
var oe = Object.prototype;
function se(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || oe;
  return t === r;
}
function ue(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var fe = "[object Arguments]";
function k(t) {
  return C(t) && D(t) == fe;
}
var Ot = Object.prototype, ce = Ot.hasOwnProperty, pe = Ot.propertyIsEnumerable, le = k(/* @__PURE__ */ function() {
  return arguments;
}()) ? k : function(t) {
  return C(t) && ce.call(t, "callee") && !pe.call(t, "callee");
};
function ge() {
  return !1;
}
var wt = typeof exports == "object" && exports && !exports.nodeType && exports, tt = wt && typeof module == "object" && module && !module.nodeType && module, de = tt && tt.exports === wt, et = de ? y.Buffer : void 0, _e = et ? et.isBuffer : void 0, W = _e || ge, he = "[object Arguments]", ye = "[object Array]", ve = "[object Boolean]", be = "[object Date]", Te = "[object Error]", Ae = "[object Function]", Oe = "[object Map]", we = "[object Number]", je = "[object Object]", $e = "[object RegExp]", Pe = "[object Set]", Se = "[object String]", me = "[object WeakMap]", Ee = "[object ArrayBuffer]", xe = "[object DataView]", Ce = "[object Float32Array]", Ie = "[object Float64Array]", Re = "[object Int8Array]", De = "[object Int16Array]", Le = "[object Int32Array]", Me = "[object Uint8Array]", Fe = "[object Uint8ClampedArray]", Ge = "[object Uint16Array]", Ne = "[object Uint32Array]", o = {};
o[Ce] = o[Ie] = o[Re] = o[De] = o[Le] = o[Me] = o[Fe] = o[Ge] = o[Ne] = !0;
o[he] = o[ye] = o[Ee] = o[ve] = o[xe] = o[be] = o[Te] = o[Ae] = o[Oe] = o[we] = o[je] = o[$e] = o[Pe] = o[Se] = o[me] = !1;
function ze(t) {
  return C(t) && At(t.length) && !!o[D(t)];
}
function Ue(t) {
  return function(e) {
    return t(e);
  };
}
var jt = typeof exports == "object" && exports && !exports.nodeType && exports, x = jt && typeof module == "object" && module && !module.nodeType && module, Be = x && x.exports === jt, H = Be && ht.process, rt = function() {
  try {
    var t = x && x.require && x.require("util").types;
    return t || H && H.binding && H.binding("util");
  } catch {
  }
}(), nt = rt && rt.isTypedArray, $t = nt ? Ue(nt) : ze, He = Object.prototype, Ke = He.hasOwnProperty;
function qe(t, e) {
  var r = G(t), n = !r && le(t), i = !r && !n && W(t), a = !r && !n && !i && $t(t), u = r || n || i || a, f = u ? ue(t.length, String) : [], c = f.length;
  for (var s in t)
    Ke.call(t, s) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    (s == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (s == "offset" || s == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (s == "buffer" || s == "byteLength" || s == "byteOffset") || // Skip index properties.
    ne(s, c))) && f.push(s);
  return f;
}
function We(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Xe = We(Object.keys, Object), Je = Object.prototype, Ye = Je.hasOwnProperty;
function Ze(t) {
  if (!se(t))
    return Xe(t);
  var e = [];
  for (var r in Object(t))
    Ye.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function Qe(t) {
  return ie(t) ? qe(t) : Ze(t);
}
var I = m(Object, "create");
function Ve() {
  this.__data__ = I ? I(null) : {}, this.size = 0;
}
function ke(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var tr = "__lodash_hash_undefined__", er = Object.prototype, rr = er.hasOwnProperty;
function nr(t) {
  var e = this.__data__;
  if (I) {
    var r = e[t];
    return r === tr ? void 0 : r;
  }
  return rr.call(e, t) ? e[t] : void 0;
}
var ar = Object.prototype, ir = ar.hasOwnProperty;
function or(t) {
  var e = this.__data__;
  return I ? e[t] !== void 0 : ir.call(e, t);
}
var sr = "__lodash_hash_undefined__";
function ur(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = I && e === void 0 ? sr : e, this;
}
function j(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
j.prototype.clear = Ve;
j.prototype.delete = ke;
j.prototype.get = nr;
j.prototype.has = or;
j.prototype.set = ur;
function fr() {
  this.__data__ = [], this.size = 0;
}
function z(t, e) {
  for (var r = t.length; r--; )
    if (Tt(t[r][0], e))
      return r;
  return -1;
}
var cr = Array.prototype, pr = cr.splice;
function lr(t) {
  var e = this.__data__, r = z(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : pr.call(e, r, 1), --this.size, !0;
}
function gr(t) {
  var e = this.__data__, r = z(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function dr(t) {
  return z(this.__data__, t) > -1;
}
function _r(t, e) {
  var r = this.__data__, n = z(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function v(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
v.prototype.clear = fr;
v.prototype.delete = lr;
v.prototype.get = gr;
v.prototype.has = dr;
v.prototype.set = _r;
var R = m(y, "Map");
function hr() {
  this.size = 0, this.__data__ = {
    hash: new j(),
    map: new (R || v)(),
    string: new j()
  };
}
function yr(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function U(t, e) {
  var r = t.__data__;
  return yr(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function vr(t) {
  var e = U(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function br(t) {
  return U(this, t).get(t);
}
function Tr(t) {
  return U(this, t).has(t);
}
function Ar(t, e) {
  var r = U(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function P(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
P.prototype.clear = hr;
P.prototype.delete = vr;
P.prototype.get = br;
P.prototype.has = Tr;
P.prototype.set = Ar;
function Or(t, e) {
  for (var r = -1, n = e.length, i = t.length; ++r < n; )
    t[i + r] = e[r];
  return t;
}
function wr() {
  this.__data__ = new v(), this.size = 0;
}
function jr(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function $r(t) {
  return this.__data__.get(t);
}
function Pr(t) {
  return this.__data__.has(t);
}
var Sr = 200;
function mr(t, e) {
  var r = this.__data__;
  if (r instanceof v) {
    var n = r.__data__;
    if (!R || n.length < Sr - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new P(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function A(t) {
  var e = this.__data__ = new v(t);
  this.size = e.size;
}
A.prototype.clear = wr;
A.prototype.delete = jr;
A.prototype.get = $r;
A.prototype.has = Pr;
A.prototype.set = mr;
function Er(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = 0, a = []; ++r < n; ) {
    var u = t[r];
    e(u, r, t) && (a[i++] = u);
  }
  return a;
}
function xr() {
  return [];
}
var Cr = Object.prototype, Ir = Cr.propertyIsEnumerable, at = Object.getOwnPropertySymbols, Rr = at ? function(t) {
  return t == null ? [] : (t = Object(t), Er(at(t), function(e) {
    return Ir.call(t, e);
  }));
} : xr;
function Dr(t, e, r) {
  var n = e(t);
  return G(t) ? n : Or(n, r(t));
}
function it(t) {
  return Dr(t, Qe, Rr);
}
var X = m(y, "DataView"), J = m(y, "Promise"), Y = m(y, "Set"), ot = "[object Map]", Lr = "[object Object]", st = "[object Promise]", ut = "[object Set]", ft = "[object WeakMap]", ct = "[object DataView]", Mr = $(X), Fr = $(R), Gr = $(J), Nr = $(Y), zr = $(q), T = D;
(X && T(new X(new ArrayBuffer(1))) != ct || R && T(new R()) != ot || J && T(J.resolve()) != st || Y && T(new Y()) != ut || q && T(new q()) != ft) && (T = function(t) {
  var e = D(t), r = e == Lr ? t.constructor : void 0, n = r ? $(r) : "";
  if (n)
    switch (n) {
      case Mr:
        return ct;
      case Fr:
        return ot;
      case Gr:
        return st;
      case Nr:
        return ut;
      case zr:
        return ft;
    }
  return e;
});
var pt = y.Uint8Array, Ur = "__lodash_hash_undefined__";
function Br(t) {
  return this.__data__.set(t, Ur), this;
}
function Hr(t) {
  return this.__data__.has(t);
}
function N(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new P(); ++e < r; )
    this.add(t[e]);
}
N.prototype.add = N.prototype.push = Br;
N.prototype.has = Hr;
function Kr(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function qr(t, e) {
  return t.has(e);
}
var Wr = 1, Xr = 2;
function Pt(t, e, r, n, i, a) {
  var u = r & Wr, f = t.length, c = e.length;
  if (f != c && !(u && c > f))
    return !1;
  var s = a.get(t), _ = a.get(e);
  if (s && _)
    return s == e && _ == t;
  var l = -1, p = !0, h = r & Xr ? new N() : void 0;
  for (a.set(t, e), a.set(e, t); ++l < f; ) {
    var g = t[l], d = e[l];
    if (n)
      var b = u ? n(d, g, l, e, t, a) : n(g, d, l, t, e, a);
    if (b !== void 0) {
      if (b)
        continue;
      p = !1;
      break;
    }
    if (h) {
      if (!Kr(e, function(O, w) {
        if (!qr(h, w) && (g === O || i(g, O, r, n, a)))
          return h.push(w);
      })) {
        p = !1;
        break;
      }
    } else if (!(g === d || i(g, d, r, n, a))) {
      p = !1;
      break;
    }
  }
  return a.delete(t), a.delete(e), p;
}
function Jr(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n, i) {
    r[++e] = [i, n];
  }), r;
}
function Yr(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n) {
    r[++e] = n;
  }), r;
}
var Zr = 1, Qr = 2, Vr = "[object Boolean]", kr = "[object Date]", tn = "[object Error]", en = "[object Map]", rn = "[object Number]", nn = "[object RegExp]", an = "[object Set]", on = "[object String]", sn = "[object Symbol]", un = "[object ArrayBuffer]", fn = "[object DataView]", lt = S ? S.prototype : void 0, K = lt ? lt.valueOf : void 0;
function cn(t, e, r, n, i, a, u) {
  switch (r) {
    case fn:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case un:
      return !(t.byteLength != e.byteLength || !a(new pt(t), new pt(e)));
    case Vr:
    case kr:
    case rn:
      return Tt(+t, +e);
    case tn:
      return t.name == e.name && t.message == e.message;
    case nn:
    case on:
      return t == e + "";
    case en:
      var f = Jr;
    case an:
      var c = n & Zr;
      if (f || (f = Yr), t.size != e.size && !c)
        return !1;
      var s = u.get(t);
      if (s)
        return s == e;
      n |= Qr, u.set(t, e);
      var _ = Pt(f(t), f(e), n, i, a, u);
      return u.delete(t), _;
    case sn:
      if (K)
        return K.call(t) == K.call(e);
  }
  return !1;
}
var pn = 1, ln = Object.prototype, gn = ln.hasOwnProperty;
function dn(t, e, r, n, i, a) {
  var u = r & pn, f = it(t), c = f.length, s = it(e), _ = s.length;
  if (c != _ && !u)
    return !1;
  for (var l = c; l--; ) {
    var p = f[l];
    if (!(u ? p in e : gn.call(e, p)))
      return !1;
  }
  var h = a.get(t), g = a.get(e);
  if (h && g)
    return h == e && g == t;
  var d = !0;
  a.set(t, e), a.set(e, t);
  for (var b = u; ++l < c; ) {
    p = f[l];
    var O = t[p], w = e[p];
    if (n)
      var Z = u ? n(w, O, p, e, t, a) : n(O, w, p, t, e, a);
    if (!(Z === void 0 ? O === w || i(O, w, r, n, a) : Z)) {
      d = !1;
      break;
    }
    b || (b = p == "constructor");
  }
  if (d && !b) {
    var L = t.constructor, M = e.constructor;
    L != M && "constructor" in t && "constructor" in e && !(typeof L == "function" && L instanceof L && typeof M == "function" && M instanceof M) && (d = !1);
  }
  return a.delete(t), a.delete(e), d;
}
var _n = 1, gt = "[object Arguments]", dt = "[object Array]", F = "[object Object]", hn = Object.prototype, _t = hn.hasOwnProperty;
function yn(t, e, r, n, i, a) {
  var u = G(t), f = G(e), c = u ? dt : T(t), s = f ? dt : T(e);
  c = c == gt ? F : c, s = s == gt ? F : s;
  var _ = c == F, l = s == F, p = c == s;
  if (p && W(t)) {
    if (!W(e))
      return !1;
    u = !0, _ = !1;
  }
  if (p && !_)
    return a || (a = new A()), u || $t(t) ? Pt(t, e, r, n, i, a) : cn(t, e, c, r, n, i, a);
  if (!(r & _n)) {
    var h = _ && _t.call(t, "__wrapped__"), g = l && _t.call(e, "__wrapped__");
    if (h || g) {
      var d = h ? t.value() : t, b = g ? e.value() : e;
      return a || (a = new A()), i(d, b, r, n, a);
    }
  }
  return p ? (a || (a = new A()), dn(t, e, r, n, i, a)) : !1;
}
function St(t, e, r, n, i) {
  return t === e ? !0 : t == null || e == null || !C(t) && !C(e) ? t !== t && e !== e : yn(t, e, r, n, St, i);
}
function vn(t, e) {
  return St(t, e);
}
function Tn(t, e) {
  const r = mt();
  vn(r.current, e) || (r.current = e), Et(t, [r.current]);
}
export {
  Tn as default
};
