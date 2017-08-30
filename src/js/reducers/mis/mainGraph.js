import { Map } from 'immutable';

import {
  SET_MAINGRAPH,
  BEGIN_MAINGRAPH_LOAD,
  END_MAINGRAPH_LOAD,
  SET_SELECTED_INDEX,
  SET_EVOLUTION_DATA,
  BEGIN_EVOLUTION_DATA_LOAD,
  END_EVOLUTION_DATA_LOAD,
  CLEAR_EVOLUTION_DATA,
  SHOW_COMPARATIVE_DATA,
  HIDE_COMPARATIVE_DATA,
} from '../../actions/mis/mainGraph';

const initialState = Map({
  data: [],
  loading: false,
  selected: {},
  evolutionData: null,
  loadingEvolution: null,
  showComparativeData: false,
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
  [SET_SELECTED_INDEX]: (state, action) => {
    return state.set('selected', { value: action.value, label: action.label });
  },
  [SET_EVOLUTION_DATA]: (state, action) => {
    return state.set('evolutionData', action.data);
  },
  [BEGIN_EVOLUTION_DATA_LOAD]: (state) => {
    return state.set('loadingEvolution', true);
  },
  [END_EVOLUTION_DATA_LOAD]: (state) => {
    return state.set('loadingEvolution', null);
  },
  [CLEAR_EVOLUTION_DATA]: (state) => {
    return state.set('evolutionData', null);
  },
  [SHOW_COMPARATIVE_DATA]: (state) => {
    return state.set('showComparativeData', true);
  },
  [HIDE_COMPARATIVE_DATA]: (state) => {
    return state.set('showComparativeData', false);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
