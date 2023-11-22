// reducers/weatherReducer.ts

import { SET_CITY } from "../constants";

export const setCurrentCity = (data: string) => ({
  type: SET_CITY,
  payload: data,
});
