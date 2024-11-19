import { useReducer as o, useEffect as u } from "react";
const c = (r, e = null) => {
  let t = sessionStorage.getItem(r);
  return t ? JSON.parse(t) : e instanceof Function ? e() : e;
};
function d(r, e, t) {
  const [s, n] = o(r, e, () => c(t, e));
  return u(() => {
    sessionStorage.setItem(t, JSON.stringify(s));
  }, [s, t]), [s, n];
}
export {
  d as default
};
