import { Map } from 'immutable';

import {
  SET_BUSINESS_ELEMENT_EVOLUTION_DATA,
  BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD,
} from 'actions/mis/metrics';

const initialState = Map({});

const actionsMap = {
  [BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD]: (state, action) => {
    const { selector, value } = action;
    return state.set(`S${ selector }V${ value }`, { loading: true });
  },
  [SET_BUSINESS_ELEMENT_EVOLUTION_DATA]: (state, action) => {
    const { selector, value, data } = action;
    return state.set(`S${ selector }V${ value }`, { loading: false, data });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
