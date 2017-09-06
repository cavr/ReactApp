import { Map } from 'immutable';
import jefe from '../../assets/img/dev/jorge.png';

import {
  LOGIN,
  LOGIN_LOAD,
  LOGOUT,
  SET_STEP,
} from '../actions/app';

const initialState = Map({
  loading: false,
  token: null,
  userInfo: {
    name: 'Jorge Nájera',
    role: 'Managing Director',
    image: jefe,
  },
  currentStep: 1,
});

const actionsMap = {
  [LOGIN]: (state, action) => {
    return state.set('token', action.token).set('userInfo', action.userInfo).set('loading', false);
  },
  [LOGIN_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [LOGOUT]: (state) => {
    return state.set('token', null).set('userInfo', null);
  },
  [SET_STEP]: (state, action) => {
    return state.set('currentStep', action.step);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

