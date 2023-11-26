import { TodayWeatherData } from "../../interfaces";
import { SET_CURRENT_CONDITIONS } from "../constants";

export const setCurrentConditions = (data: TodayWeatherData) => ({
  type: SET_CURRENT_CONDITIONS,
  payLoad: data,
});
