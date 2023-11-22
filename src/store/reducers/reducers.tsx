import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { currentConditionsReducer } from "./currentConditionsReducer";
import { selectedCityReducer } from "./selectedCityReducer";
import { weeklyConditionsReducer } from "./weeklyConditionsReducer";

export const rootReducer = combineReducers({
  loadingModule: loadingReducer,
  selectedCityModule: selectedCityReducer,
  currentConditionsModule: currentConditionsReducer,
  weeklyConditionsModule:  weeklyConditionsReducer,
});
