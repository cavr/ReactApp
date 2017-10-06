import MainGraphServices from 'services/api/mainGraph';
import FormatRequestServices from 'services/formatRequest';

import { setStep } from 'actions/app';
import { loadSubindexes } from 'actions/mis/subindexes';

export const SET_MAINGRAPH = 'SET_MAINGRAPH';
export const BEGIN_MAINGRAPH_LOAD = 'BEGIN_MAINGRAPH_LOAD';
export const END_MAINGRAPH_LOAD = 'END_MAINGRAPH_LOAD';
export const SET_SELECTED_INDEX = 'SET_SELECTED_INDEX';
export const SET_EVOLUTION_DATA = 'SET_EVOLUTION_DATA';
export const BEGIN_EVOLUTION_DATA_LOAD = 'BEGIN_EVOLUTION_DATA_LOAD';
export const END_EVOLUTION_DATA_LOAD = 'END_EVOLUTION_DATA_LOAD';
export const CLEAR_EVOLUTION_DATA = 'CLEAR_EVOLUTION_DATA';
export const SHOW_COMPARATIVE_DATA = 'SHOW_COMPARATIVE_DATA';
export const HIDE_COMPARATIVE_DATA = 'HIDE_COMPARATIVE_DATA';


export function loadMainGraph() {
  return (dispatch, getState) => {
    dispatch({ type: BEGIN_MAINGRAPH_LOAD });
    const state = getState();
    const selectors = FormatRequestServices.formatSelectors(state.selectors.get('selected').toObject());
    const token = state.app.get('token');
    MainGraphServices.getMainGraphData({ selectors }, token).then((response) => {
      const data = response.indexes;
      dispatch({ type: SET_MAINGRAPH, data });
      dispatch({ type: SET_SELECTED_INDEX, value: data[0].id, label: data[0].label });
      dispatch({ type: END_MAINGRAPH_LOAD });
    });
  };
}

export function setEvolutionData() {
  return (dispatch, getState) => {
    const state = getState();
    const loadingEvolution = state.mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: BEGIN_EVOLUTION_DATA_LOAD });
    const request = {
      selectors: FormatRequestServices.formatSelectors(state.selectors.get('selected').toObject()),
      index: state.mainGraph.get('selected').value,
    };
    const token = state.app.get('token');
    MainGraphServices.getIndexEvolution(request, token).then((response) => {
      const data = response;
      dispatch({ type: SET_EVOLUTION_DATA, data });
      dispatch({ type: END_EVOLUTION_DATA_LOAD });
    });
  };
}

export function setSelectedIndex(value, label) {
  return (dispatch, getState) => {
    const state = getState();
    const currentStep = state.app.get('currentStep');
    dispatch({ type: SET_SELECTED_INDEX, value, label });
    if (state.mainGraph.get('evolutionData')) dispatch(setEvolutionData());
    if (currentStep > 3) dispatch(loadSubindexes());
    if (currentStep > 2) dispatch(setStep(3));
  };
}

export function clearEvolutionData() {
  return (dispatch, getState) => {
    const loadingEvolution = getState().mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: CLEAR_EVOLUTION_DATA });
  };
}
