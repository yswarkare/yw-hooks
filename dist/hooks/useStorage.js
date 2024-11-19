import { useState as s, useEffect as f, useCallback as l } from "react";
function a(e, n, o) {
  const t = o.getItem(e);
  return t != null ? JSON.parse(t) : typeof n == "function" ? n() : n;
}
function S(e, n) {
  return u(e, n, window.localStorage);
}
function m(e, n) {
  return u(e, n, window.sessionStorage);
}
function u(e, n, o) {
  const [t, r] = s(a(e, n, o));
  f(() => {
    if (t === void 0)
      return o.removeItem(e);
    o.setItem(e, JSON.stringify(t));
  }, [e, t, o]);
  const i = l(() => {
    r(null);
  }, []);
  return [t, r, i];
}
export {
  S as useLocalStorage,
  m as useSessionStorage
};
