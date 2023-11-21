import { SET_CITY } from "../constants";

const initialState = {
  selectedCity: "",
};

export const selectedCityReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };
    default:
      return state;
  }
};
