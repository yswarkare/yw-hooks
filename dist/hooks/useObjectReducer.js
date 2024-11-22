import { useReducer as n, useEffect as s } from "react";
const c = (r, o) => {
  const e = sessionStorage.getItem(r);
  if (e && typeof e == "string" && !["undefined", "null", "", "false"].includes(e))
    try {
      const t = JSON.parse(e);
      if (typeof t == "object")
        return t;
    } catch (t) {
      console.log(t);
    }
  return o;
};
function u(r, { key: o, value: e }) {
  for (const t in r)
    if (t == o)
      return { ...r, [t]: e };
}
function i(r, o) {
  const [e, t] = n(u, r, () => c(o, r));
  return s(() => {
    sessionStorage.setItem(o, JSON.stringify(e));
  }, [e, o]), [e, t];
}
export {
  i as default
};
