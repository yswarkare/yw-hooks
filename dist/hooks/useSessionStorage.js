import { useState as o, useEffect as n } from "react";
const u = (t, s = null) => {
  let e = sessionStorage.getItem(t);
  return e ? JSON.parse(e) : s instanceof Function ? s() : s;
}, f = (t, s) => {
  const [e, r] = o(() => u(t, s));
  return n(() => {
    sessionStorage.setItem(t, JSON.stringify(e));
  }, [e, t]), [e, r];
};
export {
  f as default
};
