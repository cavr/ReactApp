import BusinessElementsServices from 'services/api/businessElements';

export const SET_BUSINESS_ELEMENTS = 'SET_BUSINESS_ELEMENTS';
export const BEGIN_BUSINESS_ELEMENTS_LOAD = 'BEGIN_BUSINESS_ELEMENTS_LOAD';
export const END_BUSINESS_ELEMENTS_LOAD = 'END_BUSINESS_ELEMENTS_LOAD';

export function loadBusinessElements() {
  return (dispatch) => {
    dispatch({ type: BEGIN_BUSINESS_ELEMENTS_LOAD });
    BusinessElementsServices.getBusinessElements().then((response) => {
      dispatch({ type: SET_BUSINESS_ELEMENTS, data: response });
      dispatch({ type: END_BUSINESS_ELEMENTS_LOAD });
    });
  };
}