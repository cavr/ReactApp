import AdminServices from 'services/api/admin';
import { loadSubindexes } from './common';

export const CHANGE_SUBINDEX_MODE = 'CHANGE_SUBINDEX_MODE';
export const RESET_ADMIN_SUBINDEX = 'RESET_ADMIN_SUBINDEX';
export const SET_SELECTED_INDEX_IN_ADMIN_SUBINDEX = 'SET_SELECTED_INDEX_IN_ADMIN_SUBINDEX';
export const SET_SELECTED_SUBINDEX_IN_ADMIN_SUBINDEX = 'SET_SELECTED_SUBINDEX_IN_ADMIN_SUBINDEX';
export const INIT_ADMIN_SUBINDEX_DATA = 'INIT_ADMIN_SUBINDEX_DATA';
export const CLEAR_ADMIN_SUBINDEX_DATA = 'CLEAR_ADMIN_SUBINDEX_DATA';
export const LOAD_ADMIN_SUBINDEX_DATA = 'LOAD_ADMIN_SUBINDEX_DATA';
export const UPDATE_SUBINDEX_TITLE = 'UPDATE_SUBINDEX_TITLE';
export const UPDATE_SUBINDEX_DESCRIPTION = 'UPDATE_SUBINDEX_DESCRIPTION';
export const UPDATE_SUBINDEX_FORMULA = 'UPDATE_SUBINDEX_FORMULA';
export const CHANGE_GRAPH_TYPE_IN_ADMIN_SUBINDEX = 'CHANGE_GRAPH_TYPE_IN_ADMIN_SUBINDEX';
export const SET_ADMIN_SUBINDEX_NEW_DATA = 'SET_ADMIN_SUBINDEX_NEW_DATA';


export function changeMode(mode) {
  return (dispatch) => {
    dispatch({ type: RESET_ADMIN_SUBINDEX });
    dispatch({ type: CHANGE_SUBINDEX_MODE, mode });
  };
}

export function selectIndex(index) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_INDEX_IN_ADMIN_SUBINDEX, index });
    const mode = getState().subindexManager.get('mode');
    AdminServices.getMetrics({ index }).then((response) => {
      dispatch({ type: SET_ADMIN_SUBINDEX_NEW_DATA, metrics: response.metrics });
    });
    if (mode === 'create') {
      dispatch({ type: INIT_ADMIN_SUBINDEX_DATA });
    } else {
      dispatch(loadSubindexes(index));
    }
  };
}

export function selectSubindex(subindex) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_SUBINDEX_IN_ADMIN_SUBINDEX, subindex });
    dispatch({ type: CLEAR_ADMIN_SUBINDEX_DATA });
    const index = getState().subindexManager.get('selectedIndex');
    AdminServices.getSubindexData({ index, subindex }).then((response) => {
      const title = response.title;
      const description = response.description;
      const graphType = response.type;
      const formula = response.formula;
      dispatch({ type: LOAD_ADMIN_SUBINDEX_DATA, title, description, graphType, formula });
    });
  };
}

export function updateTitle(title) {
  return { type: UPDATE_SUBINDEX_TITLE, title };
}

export function updateDescription(description) {
  return { type: UPDATE_SUBINDEX_DESCRIPTION, description };
}

export function deleteMetric(index) {
  return { type: UPDATE_SUBINDEX_FORMULA, action: 'delete', index };
}

export function updateMetric(index, metric) {
  return { type: UPDATE_SUBINDEX_FORMULA, action: 'update', index, metric };
}

export function addMetric(metric) {
  return { type: UPDATE_SUBINDEX_FORMULA, action: 'add', metric };
}

export function changeGraphType(graph) {
  return { type: CHANGE_GRAPH_TYPE_IN_ADMIN_SUBINDEX, graph };
}

export function updateIndexData() {
  return (dispatch, getState) => {
    const state = getState();
    const index = state.subindexManager.get('index');
    const indexData = {
      description: state.get('description'),
      formula: state.get('formula').toArray(),
    };
    AdminServices.updateIndexData({ index, indexData }).then((response) => {
      const indexes = response.indexes;
    });
  };
}
