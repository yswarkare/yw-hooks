import { useState as l } from "react";
function r(t) {
  const [o, u] = l(t);
  function n(e) {
    u((a) => typeof e == "boolean" ? e : !a);
  }
  return [o, n];
}
export {
  r as default
};
