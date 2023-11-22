// reducers/weatherReducer.ts

import {  SET_WEEKLY_CONDITIONS } from "../constants";

export const setWeeklyConditions = (data: any) => (
    {
  type: SET_WEEKLY_CONDITIONS,
  payload: data,
});
