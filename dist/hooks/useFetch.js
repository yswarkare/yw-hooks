import s from "./useAsync.js";
const u = {
  headers: { "Content-Type": "application/json" }
};
function i(t, n = {}, o = []) {
  return s(() => fetch(t, { ...u, ...n }).then((e) => e.ok ? e.json() : e.json().then((r) => Promise.reject(r))), o);
}
export {
  i as default
};
