import { Map, List } from 'immutable';

import {
  CHANGE_SUBINDEX_MODE,
  RESET_ADMIN_SUBINDEX,
  SET_SELECTED_INDEX_IN_ADMIN_SUBINDEX,
  SET_SELECTED_SUBINDEX_IN_ADMIN_SUBINDEX,
  INIT_ADMIN_SUBINDEX_DATA,
  CLEAR_ADMIN_SUBINDEX_DATA,
  LOAD_ADMIN_SUBINDEX_DATA,
  UPDATE_SUBINDEX_TITLE,
  UPDATE_SUBINDEX_DESCRIPTION,
  UPDATE_SUBINDEX_FORMULA,
  CHANGE_GRAPH_TYPE_IN_ADMIN_SUBINDEX,
  SET_ADMIN_SUBINDEX_NEW_DATA,
} from 'actions/mis/admin/subindexManager';

const initialState = Map({
  mode: 'create',
  selectedIndex: null,
  selectedSubindex: null,
  title: null,
  description: null,
  formula: null,
  graphType: null,
  newData: null,
});

const actionsMap = {
  [CHANGE_SUBINDEX_MODE]: (state, action) => {
    return state.set('mode', action.mode);
  },
  [RESET_ADMIN_SUBINDEX]: (state) => {
    return state.merge({
      selectedIndex: null,
      selectedSubindex: null,
      title: null,
      description: null,
      formula: null,
      graphType: null,
      newData: null,
    });
  },
  [SET_SELECTED_INDEX_IN_ADMIN_SUBINDEX]: (state, action) => {
    return state.set('selectedIndex', action.index);
  },
  [SET_SELECTED_SUBINDEX_IN_ADMIN_SUBINDEX]: (state, action) => {
    return state.set('selectedSubindex', action.subindex);
  },
  [INIT_ADMIN_SUBINDEX_DATA]: (state) => {
    return state.merge({
      title: '',
      description: '',
      formula: List(),
      graphType: '1',
      newData: null,
    });
  },
  [CLEAR_ADMIN_SUBINDEX_DATA]: (state) => {
    return state.merge({
      title: null,
      description: null,
      formula: null,
      graphType: null,
    });
  },
  [LOAD_ADMIN_SUBINDEX_DATA]: (state, action) => {
    return state.merge({
      title: action.title,
      description: action.description,
      formula: List(action.formula),
      graphType: action.graphType,
    });
  },
  [UPDATE_SUBINDEX_TITLE]: (state, action) => {
    return state.set('title', action.title);
  },
  [UPDATE_SUBINDEX_DESCRIPTION]: (state, action) => {
    return state.set('description', action.description);
  },
  [UPDATE_SUBINDEX_FORMULA]: (state, action) => {
    const formula = state.get('formula');
    switch (action.action) {
      case 'add':
        return state.set('formula', formula.push(action.metric));
      case 'update':
        return state.set('formula', formula.set(action.index, action.metric));
      case 'delete':
        return state.set('formula', formula.delete(action.index));
      default:
        return state;
    }
  },
  [CHANGE_GRAPH_TYPE_IN_ADMIN_SUBINDEX]: (state, action) => {
    return state.set('graphType', action.graph);
  },
  [SET_ADMIN_SUBINDEX_NEW_DATA]: (state, action) => {
    return state.set('newData', action.metrics);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
