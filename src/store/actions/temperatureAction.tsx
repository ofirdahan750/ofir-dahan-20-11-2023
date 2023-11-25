import { TOGGLE_TEMPERATURE_MODE } from "../constants";

export const toggleTemperatureMode = (isFahrenheit:boolean)=> ({
  type: TOGGLE_TEMPERATURE_MODE,
  payLoad: { isFahrenheit: isFahrenheit },
});

