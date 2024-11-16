import r from "./darkColors.js";
import a from "./defaultTheme.js";
const m = (o) => ({
  ...a(o),
  backgroundColor: `${r.surface_800}`,
  color: `${r.primary_800}`,
  "&button": {
    backgroundColor: `${r.surface_500}`,
    color: `${r.primary_500}`
  }
});
export {
  m as default
};
