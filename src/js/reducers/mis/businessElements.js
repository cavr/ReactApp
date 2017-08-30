import { Map } from 'immutable';

import {
  SET_BUSINESS_ELEMENTS,
  BEGIN_BUSINESS_ELEMENTS_LOAD,
  END_BUSINESS_ELEMENTS_LOAD,
} from '../../actions/mis/businessElements';

const initialState = Map({
  data: [],
  loading: false,
});

const actionsMap = {
  [SET_BUSINESS_ELEMENTS]: (state, action) => {
    return state.set('data', action.data);
  },
  [BEGIN_BUSINESS_ELEMENTS_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [END_BUSINESS_ELEMENTS_LOAD]: (state) => {
    return state.set('loading', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
