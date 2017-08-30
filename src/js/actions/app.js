
import { loadMainGraph, clearEvolutionData } from 'actions/mis/mainGraph';
import { loadSubindexes } from 'actions/mis/subindexes';
import { loadBusinessElements } from 'actions/mis/businessElements';

export const SET_TOKEN = 'SET_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const SET_STEP = 'SET_STEP';

export function setToken(data) {
  return { type: SET_TOKEN, data };
}

export function deleteToken() {
  return { type: DELETE_TOKEN };
}

export function setStep(step) {
  return (dispatch, getState) => {
    const currentState = getState();
    const previousStep = currentState.app.get('currentStep');
    if (currentState.mainGraph.get('evolutionData') && step < 2) dispatch(clearEvolutionData());
    if (step === 2 && previousStep < step) {
      const request = '';
      dispatch(loadMainGraph(request));
    } else if (step === 3 && previousStep < step) {
      const request = '';
      dispatch(loadSubindexes(request));
    } else if (step === 4) {
      const request = '';
      dispatch(loadBusinessElements(request));
    }
    dispatch({ type: SET_STEP, step });
  };
}
