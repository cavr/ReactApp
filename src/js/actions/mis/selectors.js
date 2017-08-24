import SelectorsServices from 'services/api/selectors';

export const SET_SELECTORS = 'SET_SELECTORS';
export const BEGIN_SELECTORS_LOAD = 'BEGIN_SELECTORS_LOAD';
export const END_SELECTORS_LOAD = 'END_SELECTORS_LOAD';

export function loadSelectors() {
  return (dispatch) => {
    dispatch({ type: BEGIN_SELECTORS_LOAD });
    SelectorsServices.getData().then((response) => {
      console.log(response);
      const data = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ];
      dispatch({ type: SET_SELECTORS, data });
      dispatch({ type: END_SELECTORS_LOAD });
    });
  };
}
