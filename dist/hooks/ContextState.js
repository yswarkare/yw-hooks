import { jsx as e } from "react/jsx-runtime";
import { createContext as n, useContext as r, useEffect as u } from "react";
import o from "./themes/darkTheme.js";
import S from "./themes/lightTheme.js";
import p from "./useSessionStorage.js";
const C = {
  theme: "dark"
}, a = n(C), T = () => r(a), i = n(null), U = () => r(i), j = ({ children: s, initialState: m }) => {
  const [t, c] = p("context-state", m);
  u(() => {
    console.log({ contextState: t });
  }, [t]);
  const x = (d, h) => {
    c((l) => ({ ...l, [d]: h }));
  };
  return /* @__PURE__ */ e(a.Provider, { value: t, children: /* @__PURE__ */ e(i.Provider, { value: x, children: /* @__PURE__ */ e("div", { id: "theme-context", style: t.theme === "dark" ? o(t.theme) : t.theme === "light" ? S(t.theme) : o(t.theme), children: s }) }) });
};
export {
  j as ContextStateProvider,
  T as useContextState,
  U as useUpdateContextState
};
