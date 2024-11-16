import darkColors from "./darkColors";
import lightColors from "./lightColors";

const defaultTheme = (theme: string) => {
  const colors = theme === "dark" ? darkColors : theme === "light" ? lightColors : darkColors;
  return {
    backgroundColor: `${colors.surface_800}`,
    color: `${colors.primary_800}`,
  }
}

export default defaultTheme;