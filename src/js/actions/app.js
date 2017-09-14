
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import { loadMainGraph, clearEvolutionData } from 'actions/mis/mainGraph';
import { loadSubindexes } from 'actions/mis/subindexes';
import { loadMetrics } from 'actions/mis/metrics';

import LoginServices from 'services/api/login';

export const LOGIN = 'LOGIN';
export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGOUT = 'LOGOUT';
export const SET_STEP = 'SET_STEP';
export const SHOW_MOBILE_MENU = 'SHOW_MOBILE_MENU';
export const HIDE_MOBILE_MENU = 'HIDE_MOBILE_MENU';
export const SHOW_SUMMARY_MENU = 'SHOW_SUMMARY_MENU';
export const HIDE_SUMMARY_MENU = 'HIDE_SUMMARY_MENU';

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
    } else if (step === 3 && previousStep <= step) {
      const request = '';
      dispatch(loadSubindexes(request));
    } else if (step === 4) {
      const request = '';
      dispatch(loadMetrics(request));
    }
    dispatch({ type: SET_STEP, step });
    let offset;
    const className = document.documentElement.className;
    if (className === 'mobile') {
      offset = 140;
    } else if (className === 'tablet-v') {
      offset = 170;
    } else {
      offset = 100;
    }
    setTimeout(() => {
      const top = document.getElementById(`section-${ step }`).getBoundingClientRect().top - offset;
      window.scrollBy({ top, behavior: 'smooth' });
    }, 350);
  };
}

export function showMobileMenu() {
  return { type: SHOW_MOBILE_MENU };
}

export function hideMobileMenu() {
  return { type: HIDE_MOBILE_MENU };
}

export function showSummaryMenu() {
  return { type: SHOW_SUMMARY_MENU };
}

export function hideSummaryMenu() {
  return { type: HIDE_SUMMARY_MENU };
}
