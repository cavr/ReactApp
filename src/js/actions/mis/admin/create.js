import AdminServices from 'services/api/admin';

export const LOAD_CREATE_INDEXES = 'LOAD_CREATE_INDEXES';
export const SELECT_CREATE_INDEX = 'SELECT_CREATE_INDEX';
export const LOAD_PARAMETERS = 'LOAD_PARAMETERS';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const ADD_OPERATION = 'ADD_OPERATION';
export const DELETE_OPERATION = 'DELETE_OPERATION';
export const CLEAR_OPERATIONS = 'CLEAR_OPERATIONS';
export const CLEAR_CREATE_DATA = 'CLEAR_CREATE_DATA';

export function updateTitle(text) {
  return { type: UPDATE_TITLE, text };
}

export function updateDescription(text) {
  return { type: UPDATE_DESCRIPTION, text };
}

export function loadIndexes() {
  return (dispatch) => {
    AdminServices.getIndexes().then((response) => {
      const indexes = response.indexes;
      dispatch({ type: LOAD_CREATE_INDEXES, indexes });
    });
  };
}

export function selectIndex(index, section) {
  return (dispatch) => {
    dispatch({ type: SELECT_CREATE_INDEX, index });
    dispatch(loadParameters(section))
  }
}

export function loadParameters(section) {
  return (dispatch, getState) => {
    const selectedIndex = getState().adminCreate.get('selectedIndex');
    if(section === 'metrics') {
      AdminServices.getMetrics({ selectedIndex }).then((response) => {
      const parameters = response.metrics;
      dispatch({ type: LOAD_PARAMETERS, parameters });
    });
    } else {
      AdminServices.getParameters({ selectedIndex }).then((response) => {
      const parameters = response.parameters;
      dispatch({ type: LOAD_PARAMETERS, parameters });
    });
    }
  }
}

export function createMetric() {
  return (dispatch, getState) => {
    const state = getState();
    const formula = state.adminCreate.get('operations');
    const title = state.adminCreate.get('title');
    const description = state.adminCreate.get('description');
    AdminServices.createMetrics({ formula, title, description }).then((response) => {
      const parameters = response.metrics;
    });
  };
}

export function createParameter() {
  return (dispatch, getState) => {
    const state = getState();
    const formula = state.adminCreate.get('operations');
    const title = state.adminCreate.get('title');
    const description = state.adminCreate.get('description');
    AdminServices.createParameter({ formula, title, description }).then((response) => {
      const parameters = response.metrics;
    });
  };
}

export function addParameter(parameter) {
  return { type: ADD_OPERATION, operation: { type: 'parameter', data: parameter } }
}

export function addOperator(operator) {
  return { type: ADD_OPERATION, operation: { type: 'operator', data: operator }};
}

export function addComplex(complex) {
  return { type: ADD_OPERATION, operation: { type: 'complex', data: complex }}
}

export function deleteOperation() {
  return { type: DELETE_OPERATION };
}

export function clearOperations() {
  return { type: CLEAR_OPERATIONS };
}

export function openBracket() {
  return { type: ADD_OPERATION, operation: { type: 'openBracket', data: "(" }}
}

export function closeBracket() {
  return { type: ADD_OPERATION, operation: { type: 'closeBracket', data: ")" }}
}

export function clearData() {
  return { type: CLEAR_CREATE_DATA };
}
