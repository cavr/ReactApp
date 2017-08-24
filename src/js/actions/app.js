export const SET_TOKEN = 'SET_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';

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
