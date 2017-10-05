import AdminServices from 'services/api/admin';

export const CLEAR_ADMIN_INDEX_DATA = 'CLEAR_ADMIN_INDEX_DATA';
export const SET_ADMIN_INDEX_DATA = 'SET_ADMIN_INDEX_DATA';
export const SET_SELECTED_INDEX_IN_ADMIN_INDEX = 'SET_SELECTED_INDEX_IN_ADMIN_INDEX';
export const UPDATE_INDEX_DESCRIPTION = 'UPDATE_INDEX_DESCRIPTION';
export const UPDATE_INDEX_FORMULA = 'UPDATE_INDEX_FORMULA';
export const SET_ADMIN_INDEX_NEW_DATA = 'SET_ADMIN_INDEX_NEW_DATA';

export function selectIndex(index) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_INDEX_IN_ADMIN_INDEX, index });
    dispatch({ type: CLEAR_ADMIN_INDEX_DATA });
    const token = getState().app.get('token');
    AdminServices.getIndexData({ index }, token).then((response) => {
      const description = response.description;
      const formula = response.formula;
      dispatch({ type: SET_ADMIN_INDEX_DATA, description, formula });
    });
    AdminServices.getSubindexes({ index }, token).then((response) => {
      dispatch({ type: SET_ADMIN_INDEX_NEW_DATA, subindexes: response.subindexes });
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

