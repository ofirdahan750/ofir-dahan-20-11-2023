import { WeeklyWeatherData } from "../../interfaces";
import { SET_WEEKLY_CONDITIONS } from "../constants";

const initialState = {
  weeklyConditions: [],
};

export const weeklyConditionsReducer = (
  state = initialState,
  action: { payLoad: WeeklyWeatherData[]; type: string }
) => {
  switch (action.type) {
    case SET_WEEKLY_CONDITIONS:
      return {
        ...state,
        weeklyConditions: action.payLoad,
      };
    default:
      return state;
  }
};
