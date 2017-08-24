import MainGraphServices from 'services/api/mainGraph';

export const SET_MAINGRAPH = 'SET_MAINGRAPH';
export const BEGIN_MAINGRAPH_LOAD = 'BEGIN_MAINGRAPH_LOAD';
export const END_MAINGRAPH_LOAD = 'END_MAINGRAPH_LOAD';

export function loadMainGraph() {
  return (dispatch) => {
    dispatch({ type: BEGIN_MAINGRAPH_LOAD });
    MainGraphServices.getData().then((response) => {
      console.log(response);
      const data = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ];
      dispatch({ type: SET_MAINGRAPH, data });
      dispatch({ type: END_MAINGRAPH_LOAD });
    });
  };
}
