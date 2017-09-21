import { Map } from 'immutable';

import {
  LOAD_ASSIGN_INDEXES,
  SELECT_ASSIGN_INDEX,
  LOAD_ASSIGN_METRICS,
} from 'actions/mis/admin/assign';

const initialState = Map({
  indexes: null,
  selectedIndex: null,
  metrics: null,
});

const actionsMap = {
  [LOAD_ASSIGN_INDEXES]: (state, action) => {
    return state.set('indexes', action.indexes);
  },
  [SELECT_ASSIGN_INDEX]: (state, action) => {
    return state.set('selectedIndex', action.index);
  },
  [LOAD_ASSIGN_METRICS]: (state, action) => {
    return state.set('metrics', action.metrics);
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
