import { useState as n, useEffect as o } from "react";
function u(t, r) {
  let e = sessionStorage.getItem(t);
  return e ? JSON.parse(e) : r instanceof Function ? r() : r;
}
function a(t, r) {
  const [e, s] = n(() => u(t, r));
  return o(() => {
    sessionStorage.setItem(t, JSON.stringify(e));
  }, [e, t]), [e, s];
}
export {
  a as default
};
