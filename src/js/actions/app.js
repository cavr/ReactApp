
import { loadMainGraph } from 'actions/mis/mainGraph';

export const SET_TOKEN = 'SET_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';
export const SET_STEP = 'SET_STEP';

export function setToken(data) {
  return { type: SET_TOKEN, data };
}

export function deleteToken() {
  return { type: DELETE_TOKEN };
}

export function nextStep() {
  return { type: NEXT_STEP };
}

export function previousStep() {
  return { type: PREVIOUS_STEP };
}

export function setStep(step) {
  return (dispatch, getState) => {
    if (step === 2) {
      const request = '';
      dispatch(loadMainGraph(request));
    } else if (step === 3) {
      dispatch();
    } else if (step === 4) {
      dispatch();
    }
    dispatch({ type: SET_STEP, step });
  };
}
