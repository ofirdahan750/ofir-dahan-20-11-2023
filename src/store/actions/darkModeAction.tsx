import { TOGGLE_DARK_MODE } from "../constants";

export const toggleDarkMode = (isDarkMode: boolean) => ({
  type: TOGGLE_DARK_MODE,
  payLoad: { isDarkMode: isDarkMode },
});
