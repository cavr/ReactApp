import MainGraphServices from 'services/api/mainGraph';

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
  return (dispatch) => {
    dispatch({ type: BEGIN_MAINGRAPH_LOAD });
    MainGraphServices.getMainGraphData().then((response) => {
      const data = response.indexes;
      dispatch({ type: SET_MAINGRAPH, data });
      dispatch({ type: SET_SELECTED_INDEX, value: data[0].id, label: data[0].label });
      dispatch({ type: END_MAINGRAPH_LOAD });
    });
  };
}

export function setSelectedIndex(value, label) {
  return { type: SET_SELECTED_INDEX, value, label };
}

export function setEvolutionData(index) {
  return (dispatch, getState) => {
    const loadingEvolution = getState().mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: BEGIN_EVOLUTION_DATA_LOAD });
    MainGraphServices.getIndexEvolution(index).then((response) => {
      const data = response;
      dispatch({ type: SET_EVOLUTION_DATA, data });
      dispatch({ type: END_EVOLUTION_DATA_LOAD });
    });
  };
}

export function clearEvolutionData() {
  return (dispatch, getState) => {
    const loadingEvolution = getState().mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: CLEAR_EVOLUTION_DATA });
  };
}
