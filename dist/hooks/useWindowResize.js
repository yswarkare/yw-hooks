import { useState as i, useEffect as s } from "react";
const d = () => {
  const [n, t] = i(window.innerWidth), [r, o] = i(window.innerHeight), e = () => {
    t(window.innerWidth), o(window.innerHeight);
  };
  return s(() => (window.addEventListener("resize", e), () => {
    window.removeEventListener("resize", e);
  }), []), {
    width: n,
    height: r
  };
};
export {
  d as useWindowResize
};
