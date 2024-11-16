import l from "./darkColors.js";
import t from "./lightColors.js";
const c = (o) => {
  const r = o === "dark" ? l : o === "light" ? t : l;
  return {
    backgroundColor: `${r.surface_800}`,
    color: `${r.primary_800}`
  };
};
export {
  c as default
};
