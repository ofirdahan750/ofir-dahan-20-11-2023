// reducers/weatherReducer.ts

import { CitySuggestion } from "../../interfaces";
import { SET_CITY } from "../constants";

export const setCurrentCity = (data: CitySuggestion) => ({
  type: SET_CITY,
  payload: data,
});
