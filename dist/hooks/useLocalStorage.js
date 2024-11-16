import { useState as s, useEffect as u } from "react";
const n = (e, r = null) => {
  let t = localStorage.getItem(e);
  return t ? JSON.parse(t) : r instanceof Function ? r() : r;
}, c = (e, r) => {
  const [t, o] = s(() => n(e, r));
  return u(() => {
    localStorage.setItem(e, JSON.stringify(t));
  }, [t, e]), [t, o];
};
export {
  c as default
};
