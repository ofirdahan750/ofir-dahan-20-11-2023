import { TodayWeatherData, WeeklyWeatherData } from "../../interfaces";
import { SET_CURRENT_CONDITIONS, SET_WEEKLY_CONDITIONS } from "../constants";

export const setCurrentConditions = (data: TodayWeatherData) => ({
  type: SET_CURRENT_CONDITIONS,
  payLoad: data,
});

export const setWeeklyConditions = (data: WeeklyWeatherData[]) => ({
  type: SET_WEEKLY_CONDITIONS,
  payLoad: data,
});
