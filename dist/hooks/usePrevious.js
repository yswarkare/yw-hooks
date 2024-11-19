import { useRef as n } from "react";
function c(r) {
  const e = n(r), t = n();
  return e.current !== r && (t.current = e.current, e.current = r), t.current;
}
export {
  c as default
};
