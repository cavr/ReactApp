import MetricsServices from 'services/api/metrics';
import { loadMainGraph } from 'actions/mis/mainGraph';

import { setStep } from 'actions/app';
import { SET_SELECTOR_VALUE } from 'actions/mis/selectors';

export const SET_METRICS = 'SET_METRICS';
export const BEGIN_METRICS_LOAD = 'BEGIN_METRICS_LOAD';
export const END_METRICS_LOAD = 'END_METRICS_LOAD';
export const SET_SELECTED_METRIC = 'SET_SELECTED_METRIC';
export const SET_SELECTED_BUSINESS_ELEMENT = 'SET_SELECTED_BUSINESS_ELEMENT';
export const SET_BUSINESS_ELEMENT_EVOLUTION_DATA = 'SET_BUSINESS_ELEMENT_EVOLUTION_DATA';
export const BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD = 'BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD';

export function loadMetrics() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: BEGIN_METRICS_LOAD });
    const selectors = state.selectors.get('selected').toObject();
    const index = state.mainGraph.get('selected').value;
    const subindex = state.subindexes.get('selected').value;
    MetricsServices.getMetrics({ selectors, index, subindex }).then((response) => {
      dispatch({ type: SET_METRICS, data: response.metrics });
      dispatch({ type: END_METRICS_LOAD });
    });
  };
}

export function setSelectorValue(value, selector) {
  return (dispatch) => {
    dispatch({ type: SET_SELECTOR_VALUE, value, selector });
    dispatch(loadMainGraph());
    dispatch(setStep(2));
  };
}

export function loadEvolution(metric, selector, value) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD, metric, selector, value });
    const request = {
      selectors: state.selectors.get('selected').toObject(),
      index: state.mainGraph.get('selected').value,
      subindex: state.subindexes.get('selected').value,
      metric,
      businessElement: { id: selector, value },
    };
    MetricsServices.getBusinessElementEvolution(request).then((response) => {
      dispatch({ type: SET_BUSINESS_ELEMENT_EVOLUTION_DATA, metric, data: response, selector, value });
    });
  };
}

export function setSelectedMetric(metric) {
  return ({ type: SET_SELECTED_METRIC, metric });
}

export function setSelectedBusinessElement(businessElement) {
  return ({ type: SET_SELECTED_BUSINESS_ELEMENT, businessElement });
}

export function generateXLS() {
  MetricsServices.generateXLS().then((response) => {
    window.open(response.url);
  });
}
