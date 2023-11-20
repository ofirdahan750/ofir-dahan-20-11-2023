import {SET_LOADING} from "../constants.tsx";

export const setLoading = (isLoading:boolean) => {
  return {type: SET_LOADING, payLoad: {isLoading: isLoading}};
};
