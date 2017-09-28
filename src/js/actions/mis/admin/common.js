import AdminServices from 'services/api/admin';

export const CLEAR_ADMIN_INDEXES = 'CLEAR_ADMIN_INDEXES';
export const SET_ADMIN_INDEXES = 'SET_ADMIN_INDEXES';
export const CLEAR_ADMIN_SUBINDEXES = 'CLEAR_ADMIN_SUBINDEXES';
export const SET_ADMIN_SUBINDEXES = 'SET_ADMIN_SUBINDEXES';
export const CLEAR_ADMIN_METRICS = 'CLEAR_ADMIN_METRICS';
export const SET_ADMIN_METRICS = 'SET_ADMIN_METRICS';

export function loadIndexes() {
  return (dispatch) => {
    dispatch({ type: CLEAR_ADMIN_INDEXES });
    AdminServices.getIndexes().then((response) => {
      const indexes = response.indexes;
      dispatch({ type: SET_ADMIN_INDEXES, indexes });
    });
  };
}

export function loadSubindexes(selectedIndex) {
  return (dispatch) => {
    dispatch({ type: CLEAR_ADMIN_SUBINDEXES });
    AdminServices.getSubindexes({ selectedIndex }).then((response) => {
      const indexes = response.indexes;
      dispatch({ type: SET_ADMIN_SUBINDEXES, indexes });
    });
  };
}

export function loadMetrics(selectedIndex, selectedSubindex) {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_ADMIN_METRICS });
    AdminServices.getMetrics({ selectedIndex, selectedSubindex }).then((response) => {
      const metrics = response.metrics;
      dispatch({ type: SET_ADMIN_METRICS, metrics });
    });
  };
}