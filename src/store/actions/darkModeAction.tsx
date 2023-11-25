import { TOGGLE_DARK_MODE } from "../constants";

export const toggleDarkMode = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.body.style.background = "#121212";
  } else {
    document.body.style.background = "linear-gradient(0deg, #0f284c, #0f284c), #ffffff";
  }

  return {
    type: TOGGLE_DARK_MODE,
    payLoad: { isDarkMode: isDarkMode },
  };
};
