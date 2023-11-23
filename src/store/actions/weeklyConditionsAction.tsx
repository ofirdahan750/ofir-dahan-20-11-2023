import { WeeklyWeatherData } from "../../interfaces";
import { SET_WEEKLY_CONDITIONS } from "../constants";

export const setWeeklyConditions = (data: WeeklyWeatherData) => ({
  type: SET_WEEKLY_CONDITIONS,
  payload: data,
});
