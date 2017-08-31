
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import { loadMainGraph, clearEvolutionData } from 'actions/mis/mainGraph';
import { loadSubindexes } from 'actions/mis/subindexes';
import { loadBusinessElements } from 'actions/mis/businessElements';

import LoginServices from 'services/api/login';

export const LOGIN = 'LOGIN';
export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGOUT = 'LOGOUT';
export const SET_STEP = 'SET_STEP';

export function login(user, password) {
  return (dispatch) => {
    LoginServices.login(user, password).then((response) => {
      const userInfo = response;
      const token = 'token';
      dispatch({ type: LOGIN, token, userInfo });
      browserHistory.push(routeCodes.MIS);
    });
  };
}

export function logout() {
  browserHistory.push(routeCodes.LOGIN);
  return { type: LOGOUT };
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
    setTimeout(() => {
      const top = document.getElementById(`section-${ step }`).getBoundingClientRect().top - 100;
      window.scrollBy({ top, behavior: 'smooth' });
    }, 350);
  };
}
