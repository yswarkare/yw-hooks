import { useRef as o, useEffect as f, useCallback as s } from "react";
function R(r, u) {
  const c = o(r), n = o();
  f(() => {
    c.current = r;
  }, [r]);
  const t = s(() => {
    n.current = setTimeout(() => c.current(), u);
  }, [u]), e = s(() => {
    n.current && clearTimeout(n.current);
  }, []);
  return f(() => (t(), e), [u, t, e]), { reset: s(() => {
    e(), t();
  }, [e, t]), clear: e };
}
export {
  R as default
};
