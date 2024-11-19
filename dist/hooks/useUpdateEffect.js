import { useRef as f, useEffect as u } from "react";
function s(r, t) {
  const e = f(!0);
  u(() => {
    if (e.current) {
      e.current = !1;
      return;
    }
    return r();
  }, t);
}
export {
  s as default
};
