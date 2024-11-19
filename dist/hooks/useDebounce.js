import { useEffect as o } from "react";
import s from "./useTimeout.js";
function i(t, r, u) {
  const { reset: e, clear: f } = s(t, r);
  o(e, [...u, e]), o(f, []);
}
export {
  i as default
};
