import { useReducer as n, useEffect as u } from "react";
const c = (s, e = null) => {
  let t = sessionStorage.getItem(s);
  return t ? JSON.parse(t) : e instanceof Function ? e() : e;
}, d = (s, e, t) => {
  const [r, o] = n(s, e, () => c(t, e));
  return u(() => {
    sessionStorage.setItem(t, JSON.stringify(r));
  }, [r, t]), [r, o];
};
export {
  d as default
};
