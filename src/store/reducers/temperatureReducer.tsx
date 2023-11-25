import { TOGGLE_TEMPERATURE_MODE } from "../constants";

const initialState = {
  isFahrenheit: false,
};

export const temperatureReducer = (
  state = initialState,
  action: { payLoad: { isFahrenheit: boolean }; type: string }
) => {
  const { payLoad, type } = action;
  switch (type) {
    case TOGGLE_TEMPERATURE_MODE:
      return { isFahrenheit: payLoad.isFahrenheit };
    default:
      return state;
  }
};
