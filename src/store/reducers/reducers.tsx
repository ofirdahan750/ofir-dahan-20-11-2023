import {combineReducers} from "redux";
import { loadingReducer } from "./loadingReducer";
export const rootReducer = combineReducers({
    loadingModule: loadingReducer,
});