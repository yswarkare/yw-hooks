import { useReducer as o, useEffect as n } from "react";
const u = (t, r) => {
  let e = sessionStorage.getItem(t);
  return e ? JSON.parse(e) : r;
};
function c(t, { key: r, value: e }) {
  for (const s in t)
    if (s === r)
      return { ...t, [s]: e };
}
function i(t, r) {
  const [e, s] = o(c, t, () => u(r, t));
  return n(() => {
    sessionStorage.setItem(r, JSON.stringify(e));
  }, [e, r]), [e, s];
}
export {
  i as default
};
