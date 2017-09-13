import { Map } from 'immutable';

import {
  IS_MOBILE,
  IS_TABLET,
  IS_DESKTOP,
} from '../actions/media';

const initialState = Map({
  isMobile: false,
  isTablet: false,
  isTabletHorizontal: false,
});

const actionsMap = {
  [IS_MOBILE]: (state) => {
    return state.set('isMobile', true).set('isTablet', false);
  },
  [IS_TABLET]: (state) => {
    return state.set('isTablet', true).set('isMobile', false);
  },
  [IS_DESKTOP]: (state) => {
    return state.set('isMobile', false).set('isTablet', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

