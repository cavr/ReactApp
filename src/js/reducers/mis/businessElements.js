import { Map } from 'immutable';

import {
  SET_BUSINESS_ELEMENTS,
  BEGIN_BUSINESS_ELEMENTS_LOAD,
  END_BUSINESS_ELEMENTS_LOAD,
  SET_BUSINESS_ELEMENT_EVOLUTION,
  BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD,
  END_BUSINESS_ELEMENT_EVOLUTION_LOAD,
  CLEAR_BUSINESS_ELEMENT_EVOLUTION,
} from '../../actions/mis/businessElements';

const initialState = Map({
  data: [],
  loading: false,
  selected: {},
  evolutionData: null,
  loadingEvolution: null,
  showComparativeData: false,
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
  [SET_BUSINESS_ELEMENT_EVOLUTION]: (state, action) => {
    return state.set('evolutionData', action.data);
  },
  [BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD]: (state) => {
    return state.set('loadingEvolution', true);
  },
  [END_BUSINESS_ELEMENT_EVOLUTION_LOAD]: (state) => {
    return state.set('loadingEvolution', null);
  },
  [CLEAR_BUSINESS_ELEMENT_EVOLUTION]: (state) => {
    return state.set('evolutionData', null);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
