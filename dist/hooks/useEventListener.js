import { useRef as o, useEffect as s } from "react";
function d(n, t, r = window) {
  const u = o(t);
  s(() => {
    u.current = t;
  }, [t]), s(() => {
    if (r == null)
      return;
    const e = (f) => u.current(f);
    return r.addEventListener(n, e), () => r.removeEventListener(n, e);
  }, [n, r]);
}
export {
  d as default
};
