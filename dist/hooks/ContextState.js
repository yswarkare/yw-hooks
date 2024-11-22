import { jsx as e } from "react/jsx-runtime";
import { createContext as o, useEffect as C, useContext as n } from "react";
import d from "./useSessionStorage.js";
const p = {
  isLoggedIn: !1
}, r = o(p), g = () => n(r), a = o(null), P = () => n(a), U = ({ children: s, initialState: i }) => {
  const [t, c] = d("context-state", i);
  C(() => {
    console.log({ contextState: t });
  }, [t]);
  const x = (u, S) => {
    c((l) => ({ ...l, [u]: S }));
  };
  return /* @__PURE__ */ e(r.Provider, { value: t, children: /* @__PURE__ */ e(a.Provider, { value: x, children: s }) });
};
export {
  U as ContextStateProvider,
  g as useContextState,
  P as useUpdateContextState
};
