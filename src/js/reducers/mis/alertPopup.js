import { Map } from 'immutable';

import {
  SET_ALERTS_DATA,
  BEGIN_ALERTS_LOAD,
} from 'actions/mis/alertPopup';

const initialState = Map({
  alertData: null,
  loading: null,
});

const actionsMap = {
  [BEGIN_ALERTS_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [SET_ALERTS_DATA]: (state, action) => {
    const { data } = action;
    return state.set('alertData', data).set('loading', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
