// reducers/weatherReducer.ts

import { SET_CURRENT_CONDITIONS } from '../constants';

export const setCurrentConditions = (data: any) => ({
    type: SET_CURRENT_CONDITIONS,
    payload: data,
});