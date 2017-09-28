import AdminServices from 'services/api/admin';

export const CLEAR_ADMIN_INDEX_DATA = 'CLEAR_ADMIN_INDEX_DATA';
export const SET_ADMIN_INDEX_DATA = 'SET_ADMIN_INDEX_DATA';
export const SET_SELECTED_INDEX_IN_ADMIN_INDEX = 'SET_SELECTED_INDEX_IN_ADMIN_INDEX';
export const UPDATE_INDEX_DESCRIPTION = 'UPDATE_INDEX_DESCRIPTION';
export const UPDATE_INDEX_FORMULA = 'UPDATE_INDEX_FORMULA';

export function selectIndex(index) {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED_INDEX_IN_ADMIN_INDEX, index });
    dispatch({ type: CLEAR_ADMIN_INDEX_DATA });
    AdminServices.getIndexData({ index }).then((response) => {
      const description = response.description;
      const formula = response.formula;
      dispatch({ type: SET_ADMIN_INDEX_DATA, description, formula });
    });
  };
}

export function updateDescription(description) {
  return { type: UPDATE_INDEX_DESCRIPTION, description };
}

export function deleteSubindex(index) {
  return { type: UPDATE_INDEX_FORMULA, action: 'delete', index };
}

export function updateSubindex(index, subindex) {
  return { type: UPDATE_INDEX_FORMULA, action: 'update', index, subindex };
}

export function addSubindex(subindex) {
  return { type: UPDATE_INDEX_FORMULA, action: 'add', subindex };
}

export function updateIndexData() {
  return (dispatch, getState) => {
    const state = getState();
    const index = state.get('index');
    const indexData = {
      description: state.get('description'),
      formula: state.get('formula').toArray(),
    }
    AdminServices.updateIndexData({ index, indexData }).then((response) => {
      const indexes = response.indexes;
      dispatch({ type: SET_ADMIN_INDEX_DATA, indexes });
    });
  };
}
