import { Map } from 'immutable';

import {
  SET_SELECTORS,
  BEGIN_SELECTORS_LOAD,
  END_SELECTORS_LOAD,
} from '../../actions/mis/selectors';

const initialState = Map({
  data: null,
  loading: true,
});

const actionsMap = {
  [SET_SELECTORS]: (state, action) => {
    return state.set('data', action.data);
  },
  [BEGIN_SELECTORS_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [END_SELECTORS_LOAD]: (state) => {
    return state.set('loading', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
