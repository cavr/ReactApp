import AdminServices from 'services/api/admin';
import { loadSubindexes, loadMetrics, loadParameters } from './common';

export const CHANGE_METRIC_MODE = 'CHANGE_METRIC_MODE';
export const RESET_ADMIN_METRIC = 'RESET_ADMIN_METRIC';
export const SET_SELECTED_INDEX_IN_ADMIN_METRIC = 'SET_SELECTED_INDEX_IN_ADMIN_METRIC';
export const SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC = 'SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC';
export const SET_SELECTED_METRIC_IN_ADMIN_METRIC = 'SET_SELECTED_METRIC_IN_ADMIN_METRIC';
export const INIT_ADMIN_METRIC_DATA = 'INIT_ADMIN_METRIC_DATA';
export const CLEAR_ADMIN_METRIC_DATA = 'CLEAR_ADMIN_METRIC_DATA';
export const LOAD_ADMIN_METRIC_DATA = 'LOAD_ADMIN_METRIC_DATA';
export const UPDATE_METRIC_TITLE = 'UPDATE_METRIC_TITLE';
export const UPDATE_METRIC_DESCRIPTION = 'UPDATE_METRIC_DESCRIPTION';
export const UPDATE_METRIC_FORMULA = 'UPDATE_METRIC_FORMULA';
export const SET_ADMIN_METRIC_TARGETS = 'SET_ADMIN_METRIC_TARGETS';
export const UPDATE_ADMIN_METRIC_TARGET = 'UPDATE_ADMIN_METRIC_TARGET';
export const CHANGE_GRAPH_TYPE_IN_ADMIN_METRIC = 'CHANGE_GRAPH_TYPE_IN_ADMIN_METRIC';

export const ADD_OPERATION = 'ADD_OPERATION';
export const DELETE_OPERATION = 'DELETE_OPERATION';
export const CLEAR_OPERATIONS = 'CLEAR_OPERATIONS';
export const CLEAR_CREATE_DATA = 'CLEAR_CREATE_DATA';


export function changeMode(mode) {
  return (dispatch) => {
    dispatch({ type: RESET_ADMIN_METRIC });
    dispatch({ type: CHANGE_METRIC_MODE, mode });
  };
}

export function selectIndex(index) {
  return (dispatch, getState) => {
    const mode = getState().metricManager.get('mode');
    dispatch({ type: SET_SELECTED_INDEX_IN_ADMIN_METRIC, index });
    if (mode === 'create') {
      if (getState().metricManager.get('selectedSubindex')) {
        dispatch({ type: SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC, subindex: null });
        dispatch({ type: CLEAR_ADMIN_METRIC_DATA });
      }
    } else {
      if (getState().metricManager.get('selectedMetric')) {
        dispatch({ type: SET_SELECTED_METRIC_IN_ADMIN_METRIC, metric: null });
        dispatch({ type: CLEAR_ADMIN_METRIC_DATA });
      }
      if (getState().metricManager.get('selectedSubindex')) {
        dispatch({ type: SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC, subindex: null });
      }
    }
    dispatch(loadSubindexes(index));
  };
}

export function selectSubindex(subindex) {
  return (dispatch, getState) => {
    const index = getState().metricManager.get('selectedIndex');
    const mode = getState().metricManager.get('mode');
    dispatch({ type: SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC, subindex });
    dispatch(loadParameters(index, subindex));
    if (mode === 'create') {
      AdminServices.getDefaultTargets({ index, subindex }).then((response) => {
        const targets = response.targets;
        dispatch({ type: SET_ADMIN_METRIC_TARGETS, targets });
      });
      dispatch({ type: INIT_ADMIN_METRIC_DATA });
    } else {
      if (getState().metricManager.get('selectedMetric')) {
        dispatch({ type: SET_SELECTED_METRIC_IN_ADMIN_METRIC, metric: null });
        dispatch({ type: CLEAR_ADMIN_METRIC_DATA });
      }
      dispatch(loadMetrics(index, subindex));
    }
  };
}

export function selectMetric(metric) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_METRIC_IN_ADMIN_METRIC, metric });
    dispatch({ type: CLEAR_ADMIN_METRIC_DATA });
    const index = getState().metricManager.get('selectedIndex');
    const subindex = getState().metricManager.get('selectedSubindex');
    const token = getState().app.get('token');
    AdminServices.getMetricData({ index, subindex, metric }, token).then((response) => {
      const title = response.title;
      const description = response.description;
      const graphType = response.type;
      const formula = response.formula;
      const targets = response.targets;
      dispatch({ type: LOAD_ADMIN_METRIC_DATA, title, description, graphType, formula, targets });
    });
  };
}

export function updateTitle(title) {
  return { type: UPDATE_METRIC_TITLE, title };
}

export function updateDescription(description) {
  return { type: UPDATE_METRIC_DESCRIPTION, description };
}

export function updateTarget(index, target) {
  return { type: UPDATE_ADMIN_METRIC_TARGET, index, target };
}

export function changeGraphType(graph) {
  return { type: CHANGE_GRAPH_TYPE_IN_ADMIN_METRIC, graph };
}

export function addNumber(number) {
  return { type: ADD_OPERATION, operation: { type: 'number', data: number } };
}

export function addParameter(parameter) {
  return { type: ADD_OPERATION, operation: { type: 'parameter', data: parameter } };
}

export function addOperator(operator) {
  return { type: ADD_OPERATION, operation: { type: 'operator', data: operator } };
}

export function addFunction(func) {
  return { type: ADD_OPERATION, operation: { type: 'function', data: func } };
}

export function endFunction() {
  return { type: ADD_OPERATION, operation: { type: 'endFunction' } };
}

export function openBracket() {
  return { type: ADD_OPERATION, operation: { type: 'bracket' } };
}

export function closeBracket() {
  return { type: ADD_OPERATION, operation: { type: 'endBracket' } };
}

export function addComma() {
  return { type: ADD_OPERATION, operation: { type: 'comma' } };
}

export function deleteOperation() {
  return { type: DELETE_OPERATION };
}

export function clearOperations() {
  return { type: CLEAR_OPERATIONS };
}