import darkColors from "./darkColors";
import defaultTheme from "./defaultTheme";

const darkTheme = (theme: string) => {
  return {
    ...defaultTheme(theme),
    backgroundColor: `${darkColors.surface_800}`,
    color: `${darkColors.primary_800}`,
    '&button': {
      backgroundColor: `${darkColors.surface_500}`,
      color: `${darkColors.primary_500}`,
    }
  }
};

export default darkTheme; 