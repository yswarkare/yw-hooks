import { useState as u, useEffect as n } from "react";
const s = (e, r = null) => {
  let t = localStorage.getItem(e);
  return t ? JSON.parse(t) : r instanceof Function ? r() : r;
};
function c(e, r) {
  const [t, o] = u(() => s(e, r));
  return n(() => {
    localStorage.setItem(e, JSON.stringify(t));
  }, [t, e]), [t, o];
}
export {
  c as default
};
