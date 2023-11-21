import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { currentConditionsReducer } from "./currentConditionsReducer";
import { selectedCityReducer } from "./selectedCityReducer";
export const rootReducer = combineReducers({
  loadingModule: loadingReducer,
  currentConditionsModule: currentConditionsReducer,
  selectedCityModule: selectedCityReducer,
});
