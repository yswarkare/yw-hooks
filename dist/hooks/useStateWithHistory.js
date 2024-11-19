import { useState as p, useRef as f, useCallback as c } from "react";
function R(i, { capacity: s = 10 } = {}) {
  const [n, u] = p(i), r = f([n]), t = f(0), l = c((e) => {
    const o = typeof e == "function" ? e(n) : e;
    if (r.current[t.current] !== o) {
      for (t.current < r.current.length - 1 && r.current.splice(t.current + 1), r.current.push(o); r.current.length > s; )
        r.current.shift();
      t.current = r.current.length - 1;
    }
    u(o);
  }, [s, n]), h = c(() => {
    t.current <= 0 || (t.current--, u(r.current[t.current]));
  }, []), a = c(() => {
    t.current >= r.current.length - 1 || (t.current++, u(r.current[t.current]));
  }, []), g = c((e) => {
    e < 0 || e > r.current.length - 1 || (t.current = e, u(r.current[t.current]));
  }, []);
  return [
    n,
    l,
    {
      history: r.current,
      pointer: t.current,
      back: h,
      forward: a,
      go: g
    }
  ];
}
export {
  R as default
};
