import { TodayWeatherData, WeeklyWeatherData } from "../../interfaces";
import { SET_CURRENT_CONDITIONS, SET_WEEKLY_CONDITIONS } from "../constants";

const initialState = {
  currentConditions: null,
  weeklyConditions: [],
};

export const weatherConditionsReducer = (
  state = initialState,
  action: { type: string; payLoad: TodayWeatherData | WeeklyWeatherData[] }
) => {
  switch (action.type) {
    case SET_CURRENT_CONDITIONS:
      return {
        ...state,
        currentConditions: action.payLoad as TodayWeatherData,
      };
    case SET_WEEKLY_CONDITIONS:
      return {
        ...state,
        weeklyConditions: action.payLoad as WeeklyWeatherData[],
      };
    default:
      return state;
  }
};
