import s from "./useAsync.js";
function d(t) {
  return s(() => {
    const e = document.createElement("script");
    return e.src = t, e.async = !0, new Promise((r, n) => {
      e.addEventListener("load", r), e.addEventListener("error", n), document.body.appendChild(e);
    });
  }, [t]);
}
export {
  d as default
};
