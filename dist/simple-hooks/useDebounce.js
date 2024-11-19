import { useState as r, useEffect as c } from "react";
function f(e, t) {
  const [o, u] = r(e);
  return c(
    () => {
      const n = setTimeout(() => {
        u(e);
      }, t);
      return () => {
        clearTimeout(n);
      };
    },
    [e, t]
    // Only re-call effect if value or delay changes
  ), o;
}
export {
  f as useDebounce
};
