function l(e, i, r) {
  const t = /* @__PURE__ */ new Date();
  t.setTime(t.getTime() + r * 24 * 60 * 60 * 1e3);
  let n = "expires=" + t.toUTCString();
  document.cookie = e + "=" + i + ";" + n + ";path=/";
}
function c(e) {
  let i = e + "=", t = decodeURIComponent(document.cookie).split(";");
  for (let n = 0; n < t.length; n++) {
    let o = t[n];
    for (; o.charAt(0) == " "; )
      o = o.substring(1);
    if (o.indexOf(i) == 0)
      return o.substring(i.length, o.length);
  }
  return "";
}
function s() {
  let e = c("username");
  e != "" ? alert("Welcome again " + e) : (e = prompt("Please enter your name:", ""), e != "" && e != null && l("username", e, 365));
}
export {
  s as checkCookie,
  c as getCookie,
  l as setCookie
};
