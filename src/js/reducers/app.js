import { Map } from 'immutable';

import {
  SET_TOKEN,
  DELETE_TOKEN,
  SET_STEP,
} from '../actions/app';

const initialState = Map({
  token: null,
  currentStep: 1,
});

const actionsMap = {
  [SET_TOKEN]: (state, action) => {
    return state.set('token', action.data);
  },
  [DELETE_TOKEN]: (state) => {
    return state.set('token', null);
  },
  [SET_STEP]: (state, action) => {
    return state.set('currentStep', action.step);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

