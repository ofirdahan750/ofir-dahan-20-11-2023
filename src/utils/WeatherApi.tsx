import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEYS = ["D1OpGw3qGszJQfxPExDY08f5KeDy2Ebw", "ThVDlcq3gk3PkpKnw6Fr4dzGkuCn5Rnv"];

const makeApiRequest = async (endpoint: string, params: Record<string, any>, key: string) => {
  try {
    const response = await axios.get(`https://dataservice.accuweather.com${endpoint}`, {
      params: { apikey: key, ...params }
    });
    return response.data;
  } catch (error:any) {
    console.error(`API request with key ${key} failed:`, error);
    toast.error(`API request failed: ${error.message}`);
    return null;
  }
};

export const fetchAutocomplete = async (query: string): Promise<string[]> => {
  for (const key of API_KEYS) {
    const result = await makeApiRequest('/locations/v1/cities/autocomplete', { q: query }, key);
    if (result) {
      return result.map((item: any) => item.LocalizedName); 
    }
  }
  toast.error("All API requests failed");
  throw new Error('All API requests failed');
};


