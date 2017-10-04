import SelectorsServices from 'services/api/selectors';

export const SET_SELECTORS = 'SET_SELECTORS';
export const BEGIN_SELECTORS_LOAD = 'BEGIN_SELECTORS_LOAD';
export const END_SELECTORS_LOAD = 'END_SELECTORS_LOAD';
export const SET_ALL_SELECTORS_VALUES = 'SET_ALL_SELECTORS_VALUES';
export const SET_SELECTOR_VALUE = 'SET_SELECTOR_VALUE';

export function loadSelectors() {
  return (dispatch, getState) => {
    dispatch({ type: BEGIN_SELECTORS_LOAD });
    const token = getState().app.get('token');
    SelectorsServices.getSelectors(token).then((response) => {
      const data = response.selectors;
      dispatch({ type: SET_SELECTORS, data });
      const selected = {};
      for (let i = 0, l = data.length; i < l; i++) {
        const selector = data[i];
        selected[selector.id] = selector.values[0];
      }
      dispatch({ type: SET_ALL_SELECTORS_VALUES, selected });
      dispatch({ type: END_SELECTORS_LOAD });
    });
  };
}

export function setSelectorValue(value, selector) {
  return { type: SET_SELECTOR_VALUE, value, selector };
}
