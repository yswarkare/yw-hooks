import { useState as a } from "react";
function m(r, s) {
  const [t, o] = a(r), [l, u] = a({});
  return { values: t, errors: l, handleChange: (n) => {
    const { name: e, value: c } = n.target;
    o({ ...t, [e]: c });
  }, handleSubmit: (n) => {
    n.preventDefault();
    const e = s(t);
    u(e), Object.keys(e).length;
  } };
}
export {
  m as default
};
