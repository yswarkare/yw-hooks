import { useState as a } from "react";
function i(e) {
  const [n, t] = a(e);
  function o(c, r) {
    t((s) => ({ ...s, [c]: r }));
  }
  function u() {
    t({});
  }
  return { obj: n, set: t, update: o, clear: u };
}
export {
  i as default
};
