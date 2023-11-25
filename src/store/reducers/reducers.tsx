import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { currentConditionsReducer } from "./currentConditionsReducer";
import { selectedCityReducer } from "./selectedCityReducer";
import { weeklyConditionsReducer } from "./weeklyConditionsReducer";
import { temperatureReducer } from "./temperatureReducer";

export const rootReducer = combineReducers({
  loadingModule: loadingReducer,
  selectedCityModule: selectedCityReducer,
  currentConditionsModule: currentConditionsReducer,
  weeklyConditionsModule: weeklyConditionsReducer,
  temperatureModule: temperatureReducer,
});
