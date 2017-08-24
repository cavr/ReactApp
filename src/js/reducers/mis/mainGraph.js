import { Map } from 'immutable';

import {
  SET_MAINGRAPH,
  BEGIN_MAINGRAPH_LOAD,
  END_MAINGRAPH_LOAD,
} from '../../actions/mis/mainGraph';

const initialState = Map({
  data: null,
  loading: false,
});

const actionsMap = {
  [SET_MAINGRAPH]: (state, action) => {
    return state.set('data', action.data);
  },
  [BEGIN_MAINGRAPH_LOAD]: (state) => {
    return state.set('loading', true);
  },
  [END_MAINGRAPH_LOAD]: (state) => {
    return state.set('loading', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
