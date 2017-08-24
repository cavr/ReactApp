import { Map } from 'immutable';

import {
  IS_MOBILE,
  IS_DESKTOP,
} from '../actions/media';

const initialState = Map({
  isMobile: false,
});

const actionsMap = {
  [IS_MOBILE]: (state) => {
    document.documentElement.className = 'mobile';
    return state.set('isMobile', true);
  },

  [IS_DESKTOP]: (state) => {
    document.documentElement.className = 'desktop';
    return state.set('isMobile', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

