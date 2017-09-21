import { Map } from 'immutable';

import {
  SET_METRICS,
  BEGIN_METRICS_LOAD,
  END_METRICS_LOAD,
  SET_SELECTED_METRIC,
  SET_SELECTED_BUSINESS_ELEMENT,
} from 'actions/mis/metrics';

const initialState = Map({
  data: null,
  selectedMetric: 0,
  selectedBusinessElement: 0,
  loading: false,
});

const actionsMap = {
  [SET_METRICS]: (state, action) => {
    return state.set('data', action.data);
  },
  [BEGIN_METRICS_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [END_METRICS_LOAD]: (state) => {
    return state.set('loading', false);
  },
  [SET_SELECTED_METRIC]: (state, action) => {
    return state.set('selectedMetric', action.metric);
  },
  [SET_SELECTED_BUSINESS_ELEMENT]: (state, action) => {
    return state.set('selectedBusinessElement', action.businessElement);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
