import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEYS = ["D1OpGw3qGszJQfxPExDY08f5KeDy2Ebw", "ThVDlcq3gk3PkpKnw6Fr4dzGkuCn5Rnv"];
const BASE_URL = 'https://dataservice.accuweather.com';

interface CitySuggestion {
  city: string;
  key: string;
}

const makeApiRequest = async (endpoint: string, params: Record<string, any>): Promise<any> => {
  for (const key of API_KEYS) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { apikey: key, ...params }
      });
      return response.data;
    } catch (error: any) {
      console.error(`API request with key ${key} failed:`, error);
      // Continue to the next key in case of failure
    }
  }

  toast.error("All API requests failed");
  throw new Error('All API requests failed');
};

export const fetchAutocomplete = async (query: string): Promise<CitySuggestion[]> => {
  const result = await makeApiRequest('/locations/v1/cities/autocomplete', { q: query });
  return result.map((item: any) => ({
    city: item.LocalizedName,
    key: item.Key
  }));
};

export const fetchCurrentConditions = async (locationKey: string): Promise<any> => {
  return makeApiRequest(`/currentconditions/v1/${locationKey}`, {});
};
