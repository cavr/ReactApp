import AdminServices from 'services/api/admin';

export const LOAD_ASSIGN_INDEXES = 'LOAD_ASSIGN_INDEXES';
export const SELECT_ASSIGN_INDEX = 'SELECT_ASSIGN_INDEX';
export const LOAD_ASSIGN_METRICS = 'LOAD_ASSIGN_METRICS';

export function loadIndexes() {
  return (dispatch) => {
    AdminServices.getIndexes().then((response) => {
      const indexes = response.indexes;
      dispatch({ type: LOAD_ASSIGN_INDEXES, indexes });
      dispatch({ type: SELECT_ASSIGN_INDEX, value: indexes[0].id, label: indexes[0].label });
    });
  };
}

export function selectIndex(index) {
  return (dispatch) => {
    dispatch({ type: SELECT_ASSIGN_INDEX, index });
    dispatch(loadMetrics())
  }
}

export function loadMetrics() {
  return (dispatch, getState) => {
    const selectedIndex = getState().adminAssign.get('selectedIndex');
    AdminServices.getMetrics({ selectedIndex }).then((response) => {
      const metrics = response.metrics;
      dispatch({ type: LOAD_ASSIGN_METRICS, metrics });
    });
  };
}

export function updateMetricTarget(metric) {
  return (dispatch, getState) => {
    const index = getState().adminAssign.get('selectedIndex');
    AdminServices.updateMetricTarget({ index, metric }).then((response) => {
      
    });
  };
}