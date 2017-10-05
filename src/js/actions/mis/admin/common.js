import AdminServices from 'services/api/admin';

export const CLEAR_ADMIN_INDEXES = 'CLEAR_ADMIN_INDEXES';
export const SET_ADMIN_INDEXES = 'SET_ADMIN_INDEXES';
export const CLEAR_ADMIN_SUBINDEXES = 'CLEAR_ADMIN_SUBINDEXES';
export const SET_ADMIN_SUBINDEXES = 'SET_ADMIN_SUBINDEXES';
export const CLEAR_ADMIN_METRICS = 'CLEAR_ADMIN_METRICS';
export const SET_ADMIN_METRICS = 'SET_ADMIN_METRICS';
export const CLEAR_ADMIN_PARAMETERS = 'CLEAR_ADMIN_PARAMETERS';
export const SET_ADMIN_PARAMETERS = 'SET_ADMIN_PARAMETERS';

export function loadIndexes() {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_ADMIN_INDEXES });
    const token = getState().app.get('token');
    AdminServices.getIndexes(token).then((response) => {
      const indexes = response.indexes;
      dispatch({ type: SET_ADMIN_INDEXES, indexes });
    });
  };
}

export function loadSubindexes(selectedIndex) {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_ADMIN_SUBINDEXES });
    const token = getState().app.get('token');
    AdminServices.getSubindexes({ index: selectedIndex }, token).then((response) => {
      const subindexes = response.subindexes;
      dispatch({ type: SET_ADMIN_SUBINDEXES, subindexes });
    });
  };
}

export function loadMetrics(selectedIndex, selectedSubindex) {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_ADMIN_METRICS });
    const token = getState().app.get('token');
    AdminServices.getMetrics({ index: selectedIndex, subindex: selectedSubindex }, token).then((response) => {
      const metrics = response.metrics;
      dispatch({ type: SET_ADMIN_METRICS, metrics });
    });
  };
}

export function loadParameters(selectedIndex, selectedSubindex) {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_ADMIN_PARAMETERS });
    const token = getState().app.get('token');
    AdminServices.getParameters({ index: selectedIndex, subindex: selectedSubindex }, token).then((response) => {
      const parameters = response.parameters;
      dispatch({ type: SET_ADMIN_PARAMETERS, parameters });
    });
  };
}
