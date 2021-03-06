import SubindexesServices from 'services/api/subindexes';
import FormatRequestServices from 'services/formatRequest';

import { setStep } from 'actions/app';

export const SET_SUBINDICES = 'SET_SUBINDICES';
export const BEGIN_SUBINDICES_LOAD = 'BEGIN_SUBINDICES_LOAD';
export const END_SUBINDICES_LOAD = 'END_SUBINDICES_LOAD';
export const SET_SUBINDEX_VALUE = 'SET_SUBINDEX_VALUE';
export const CLEAR_SUBINDEX_VALUE = 'CLEAR_SUBINDEX_VALUE';

export function loadSubindexes() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: BEGIN_SUBINDICES_LOAD });
    const request = {
      selectors: FormatRequestServices.formatSelectors(state.selectors.get('selected').toObject()),
      index: state.mainGraph.get('selected').value,
    };
    const token = state.app.get('token');
    SubindexesServices.getSubindexes(request, token).then((response) => {
      const data = response.subindexes;
      dispatch({ type: SET_SUBINDICES, data });
      dispatch({ type: CLEAR_SUBINDEX_VALUE });
      dispatch({ type: END_SUBINDICES_LOAD });
    });
  };
}

export function setSubindex(value, label) {
  return (dispatch) => {
    dispatch({ type: SET_SUBINDEX_VALUE, value, label });
    dispatch(setStep(4));
  };
}

export function clearSubindex() {
  return (dispatch) => {
    dispatch({ type: CLEAR_SUBINDEX_VALUE });
    dispatch(setStep(3));
  };
}
