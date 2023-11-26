import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { selectedCityReducer } from "./selectedCityReducer";
import { temperatureReducer } from "./temperatureReducer";
import { darkModeReducer } from "./darkModeReducer";
import { weatherConditionsReducer } from "./weatherConditionsReducer";

export const rootReducer = combineReducers({
  loadingModule: loadingReducer,
  darkModeModule: darkModeReducer,
  temperatureModule: temperatureReducer,
  selectedCityModule: selectedCityReducer,
  weatherConditionsModule: weatherConditionsReducer,
});
