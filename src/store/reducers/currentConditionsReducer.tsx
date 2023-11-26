import { TodayWeatherData } from "../../interfaces";
import { SET_CURRENT_CONDITIONS } from "../constants";

const initialState = {
  currentConditions: null,
};

export const currentConditionsReducer = (
  state = initialState,
  action: { type: string; payLoad: TodayWeatherData }
) => {
  switch (action.type) {
    case SET_CURRENT_CONDITIONS:
      return {
        ...state,
        currentConditions: action.payLoad,
      };
    default:
      return state;
  }
};
