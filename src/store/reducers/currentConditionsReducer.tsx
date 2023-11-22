import { SET_CURRENT_CONDITIONS } from "../constants";

const initialState = {
  currentConditions: null,
};

export const currentConditionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_CONDITIONS:
      return {
        ...state,
        currentConditions: action.payload,
      };
    default:
      return state;
  }
};
