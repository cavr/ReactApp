import { Map } from 'immutable';

import {
  SET_SELECTORS,
  BEGIN_SELECTORS_LOAD,
  END_SELECTORS_LOAD,
  SET_ALL_SELECTORS_VALUES,
  SET_SELECTOR_VALUE,
} from '../../actions/mis/selectors';

const initialState = Map({
  data: null,
  loading: true,
  selected: null,
  loaded: false,
});

const actionsMap = {
  [SET_SELECTORS]: (state, action) => {
    return state.set('data', action.data).set('loaded', true);
  },
  [BEGIN_SELECTORS_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [END_SELECTORS_LOAD]: (state) => {
    return state.set('loading', false);
  },
  [SET_ALL_SELECTORS_VALUES]: (state, action) => {
    return state.set('selected', Map(action.selected));
  },
  [SET_SELECTOR_VALUE]: (state, action) => {
    const selected = state.get('selected').set(String(action.selector), action.value);
    return state.set('selected', selected);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
