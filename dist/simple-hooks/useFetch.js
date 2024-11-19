import { useState as t, useEffect as u } from "react";
function d(a) {
  const [s, n] = t(null), [o, r] = t(!0), [c, f] = t(null);
  return u(() => {
    (async () => {
      try {
        const l = await (await fetch(a)).json();
        n(l);
      } catch (e) {
        f(e);
      } finally {
        r(!1);
      }
    })();
  }, [a]), { data: s, loading: o, error: c };
}
export {
  d as default
};
