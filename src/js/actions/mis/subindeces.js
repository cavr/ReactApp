import SubindecesServices from 'services/api/subindeces';

export const SET_SUBINDICES = 'SET_SUBINDICES';
export const BEGIN_SUBINDICES_LOAD = 'BEGIN_SUBINDICES_LOAD';
export const END_SUBINDICES_LOAD = 'END_SUBINDICES_LOAD';
export const SET_SUBINDEX_VALUE = 'SET_SUBINDEX_VALUE';

export function loadSubindices() {
  return (dispatch) => {
    dispatch({ type: BEGIN_SUBINDICES_LOAD });
    SubindecesServices.getSubindices().then((response) => {
      const data = response.SUBINDICES;
      dispatch({ type: SET_SUBINDICES, data });
      dispatch({ type: END_SUBINDICES_LOAD });
    });
  };
}

export function setSelectorValue(value, selector) {
  return { type: SET_SUBINDEX_VALUE, value, selector };
}
