import { useState as e, useCallback as i, useEffect as f } from "react";
function m(r, c = []) {
  const [n, t] = e(!0), [l, o] = e(), [u, a] = e(), s = i(() => {
    t(!0), o(void 0), a(void 0), r().then(a).catch(o).finally(() => t(!1));
  }, c);
  return f(() => {
    s();
  }, [s]), { loading: n, error: l, value: u };
}
export {
  m as default
};
