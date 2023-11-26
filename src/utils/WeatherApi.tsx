import axios from "axios";
import { toast } from "react-toastify";
import {
  CitySuggestion,
  LocationData,
  TodayWeatherData,
  WeeklyWeatherData,
} from "../interfaces";

const API_KEYS = [
  "D1OpGw3qGszJQfxPExDY08f5KeDy2Ebw",
  "ThVDlcq3gk3PkpKnw6Fr4dzGkuCn5Rnv",
  "5GOdpVUrCrDLQ35E2A36jSvFGscCrR3g",
  "QcvmBl8ogAGfntKG7AYfzawbQcbnLnHl",
  "ISsKew98LvoX2E99WiBeksgSVGkiPA8u",
  "Dv85ppEOg273zVkSltbD0MLYMrV2zr78",
  "MbItC0vekgfHL9PkpEVLi1c9oRx78hIq",
];
const BASE_URL = "https://dataservice.accuweather.com";

const makeApiRequest = async (
  endpoint: string,
  params: Record<string, any>
): Promise<any> => {
  for (const key of API_KEYS) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { apikey: key, ...params },
      });
      return response.data;
    } catch (error: any) {
      console.error(`API request with key ${key} failed: ${error}`);
    }
  }

  toast.error("All API requests failed");
  throw new Error("All API requests failed");
};

export const fetchAutocomplete = async (
  query: string
): Promise<CitySuggestion[]> => {
  const result = await makeApiRequest("/locations/v1/cities/autocomplete", {
    q: query,
  });
  return result.map((item: LocationData) => ({
    city: item.LocalizedName,
    key: item.Key,
  }));
};

export const fetchCurrentConditions = async (
  locationKey: string
): Promise<TodayWeatherData[]> => {
  return makeApiRequest(`/currentconditions/v1/${locationKey}`, {});
};

export const fetchFiveDayForecast = async (
  locationKey: string
): Promise<WeeklyWeatherData[]> => {
  const res = await makeApiRequest(
    `/forecasts/v1/daily/5day/${locationKey}`,
    {}
  );
  return res.DailyForecasts;
};
