import defaultTheme from "./defaultTheme";
import lightColors from "./lightColors";

const lightTheme = (theme: string) => {
  return {
    ...defaultTheme(theme),
    backgroundColor: `${lightColors.surface_500}`,
    color: `${lightColors.primary_900}`,
  }
};

export default lightTheme;