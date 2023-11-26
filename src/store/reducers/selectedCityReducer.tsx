import { CitySuggestion } from "../../interfaces";
import { SET_CITY } from "../constants";

const initialState = {
  selectedCity: { city: "", key: "" },
};

export const selectedCityReducer = (
  state = initialState,
  action: { payLoad: CitySuggestion; type: string }
) => {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        selectedCity: action.payLoad,
      };
    default:
      return state;
  }
};
