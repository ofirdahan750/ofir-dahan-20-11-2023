import { SET_WEEKLY_CONDITIONS } from "../constants";

const initialState = {
  weeklyConditions: null,
};

export const weeklyConditionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WEEKLY_CONDITIONS:
      return {
        ...state,
        weeklyConditions: action.payload,
      };
    default:
      return state;
  }
};
