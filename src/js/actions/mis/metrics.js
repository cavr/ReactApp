import MetricsServices from 'services/api/metrics';
import { loadMainGraph } from 'actions/mis/mainGraph';

import { setStep } from 'actions/app';
import { SET_SELECTOR_VALUE } from 'actions/mis/selectors';

export const SET_METRICS = 'SET_METRICS';
export const BEGIN_METRICS_LOAD = 'BEGIN_METRICS_LOAD';
export const END_METRICS_LOAD = 'END_METRICS_LOAD';

export function loadMetrics() {
  return (dispatch) => {
    dispatch({ type: BEGIN_METRICS_LOAD });
    MetricsServices.getMetrics().then((response) => {
      dispatch({ type: SET_METRICS, data: response });
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