import {combineReducers} from "redux";
import { loadingReducer } from "./loadingReducer";
import { currentConditionsReducer } from "./currentConditionsReducer";
export const rootReducer = combineReducers({
    loadingModule: loadingReducer,
    currentConditionsModule: currentConditionsReducer
});