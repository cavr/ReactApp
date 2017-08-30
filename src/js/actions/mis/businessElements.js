import BusinessElementsServices from 'services/api/businessElements';

export const SET_BUSINESS_ELEMENTS = 'SET_BUSINESS_ELEMENTS';
export const BEGIN_BUSINESS_ELEMENTS_LOAD = 'BEGIN_BUSINESS_ELEMENTS_LOAD';
export const END_BUSINESS_ELEMENTS_LOAD = 'END_BUSINESS_ELEMENTS_LOAD';
export const SET_BUSINESS_ELEMENT_EVOLUTION = 'SET_BUSINESS_ELEMENT_EVOLUTION';
export const BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD = 'BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD';
export const END_BUSINESS_ELEMENT_EVOLUTION_LOAD = 'END_BUSINESS_ELEMENT_EVOLUTION_LOAD';
export const CLEAR_BUSINESS_ELEMENT_EVOLUTION = 'CLEAR_BUSINESS_ELEMENT_EVOLUTION';

export function loadBusinessElements() {
  return (dispatch) => {
    dispatch({ type: BEGIN_BUSINESS_ELEMENTS_LOAD });
    BusinessElementsServices.getBusinessElements().then((response) => {
      const data = response.businessElements;
      dispatch({ type: SET_BUSINESS_ELEMENTS, data });
      dispatch({ type: END_BUSINESS_ELEMENTS_LOAD });
    });
  };
}

export function setEvolutionData(index) {
  return (dispatch, getState) => {
    const loadingEvolution = getState().mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: BEGIN_BUSINESS_ELEMENT_EVOLUTION_LOAD });
    BusinessElementsServices.getBusinessElementEvolution(index).then((response) => {
      const data = response;
      dispatch({ type: SET_BUSINESS_ELEMENT_EVOLUTION, data });
      dispatch({ type: END_BUSINESS_ELEMENT_EVOLUTION_LOAD });
    });
  };
}

export function clearBusinessElementEvolution() {
  return (dispatch, getState) => {
    const loadingEvolution = getState().mainGraph.get('loadingEvolution');
    if (loadingEvolution) return;
    dispatch({ type: CLEAR_BUSINESS_ELEMENT_EVOLUTION });
  };
}