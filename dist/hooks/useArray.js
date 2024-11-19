import { useState as a } from "react";
function h(c) {
  const [u, r] = a(c);
  function i(t) {
    r((e) => [...e, t]);
  }
  function o(t) {
    r((e) => e.filter(t));
  }
  function s(t, e) {
    r((n) => [...n.slice(0, t), e, ...n.slice(t + 1, n.length)]);
  }
  function f(t) {
    r((e) => [...e.slice(0, t), ...e.slice(t + 1, e.length)]);
  }
  function l() {
    r([]);
  }
  return { array: u, set: r, push: i, filter: o, update: s, remove: f, clear: l };
}
export {
  h as default
};
