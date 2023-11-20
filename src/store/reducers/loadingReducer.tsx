import { SET_LOADING } from "../constants.tsx";

const initialState = { isLoading: false };

export function loadingReducer(
  state = initialState,
  action: { payLoad: {isLoading : boolean}; type: string }
) {
  const { payLoad, type } = action;
  switch (type) {
    case SET_LOADING:
      return { isLoading: payLoad.isLoading };
    default:
      return state;
  }
}
