import AlertsServices from 'services/api/alerts';

export const SET_ALERTS_DATA = 'SET_ALERTS_DATA';
export const BEGIN_ALERTS_LOAD = 'BEGIN_ALERTS_LOAD';

export function loadCurrentAlerts(metric, selector, value) {
  return (dispatch) => {
    dispatch({ type: BEGIN_ALERTS_LOAD });
    AlertsServices.getAlerts({ metric, selector, value }).then((response) => {
      const data = response.alerts;
      dispatch({ type: SET_ALERTS_DATA, data });
    });
  };
}
