import { TOGGLE_TEMPERATURE_MODE } from "../constants";

const initialState = {
  isFahrenheit: false,
};

export const temperatureReducer = (
  state = initialState,
  action: { type: string }
) => {
  switch (action.type) {
    case TOGGLE_TEMPERATURE_MODE:
      return {
        ...state,
        isFahrenheit: !state.isFahrenheit,
      };
    default:
      return state;
  }
};
