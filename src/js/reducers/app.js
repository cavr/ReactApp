import { Map } from 'immutable';
import jefe from '../../assets/img/dev/jorge.png';

import {
  LOGIN,
  LOGIN_LOAD,
  LOGIN_END_LOAD,
  LOGOUT,
  SET_STEP,
  SHOW_MOBILE_MENU,
  HIDE_MOBILE_MENU,
  SHOW_SUMMARY_MENU,
  HIDE_SUMMARY_MENU,
} from '../actions/app';

const initialState = Map({
  loading: false,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDU5MDM2NzZ9.4hVM5xGL9lSufvB5fNFD1G2lQKKKDjARGeCAPozHCJ8',
  userInfo: {
    name: 'Jorge Nájera',
    role: 'Managing Director',
    image: jefe,
  },
  mobileMenu: false,
  summaryMenu: false,
  currentStep: 1,
});

const actionsMap = {
  [LOGIN]: (state, action) => {
    return state.set('token', action.token).set('userInfo', action.userInfo).set('loading', false);
  },
  [LOGIN_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [LOGIN_END_LOAD]: (state) => {
    return state.set('loading', false);
  },
  [LOGOUT]: (state) => {
    return state.set('token', null).set('userInfo', null);
  },
  [SET_STEP]: (state, action) => {
    return state.set('currentStep', action.step);
  },
  [SHOW_MOBILE_MENU]: (state) => {
    return state.set('mobileMenu', true);
  },
  [HIDE_MOBILE_MENU]: (state) => {
    return state.set('mobileMenu', false);
  },
  [SHOW_SUMMARY_MENU]: (state) => {
    return state.set('summaryMenu', true);
  },
  [HIDE_SUMMARY_MENU]: (state) => {
    return state.set('summaryMenu', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

