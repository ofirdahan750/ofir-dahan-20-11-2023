import { TOGGLE_DARK_MODE } from "../constants";

const initialState = {
  isDarkMode: false,
};

export const darkModeReducer = (
  state = initialState,
  action: { payLoad: { isDarkMode: boolean }; type: string }
) => {
  const { payLoad, type } = action;
  switch (type) {
    case TOGGLE_DARK_MODE:
      return { isDarkMode: payLoad.isDarkMode };
    default:
      return state;
  }
};
