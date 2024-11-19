import { useState as n } from "react";
import t from "./useEventListener.js";
function r() {
  const [i, e] = n({
    width: window.innerWidth,
    height: window.innerHeight
  });
  return t("resize", () => {
    e({ width: window.innerWidth, height: window.innerHeight });
  }), i;
}
export {
  r as default
};
