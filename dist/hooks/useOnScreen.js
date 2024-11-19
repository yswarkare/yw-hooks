import { useState as c, useEffect as i } from "react";
function o(e, r = "0px") {
  const [t, s] = c(!1);
  return i(() => {
    if (e.current == null)
      return;
    const n = new IntersectionObserver(([u]) => s(u.isIntersecting), { rootMargin: r });
    return n.observe(e.current), () => {
      e.current != null && n.unobserve(e.current);
    };
  }, [e.current, r]), t;
}
export {
  o as default
};
