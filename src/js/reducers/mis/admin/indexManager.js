import { Map, List } from 'immutable';

import {
  CLEAR_ADMIN_INDEX_DATA,
  SET_ADMIN_INDEX_DATA,
  SET_SELECTED_INDEX_IN_ADMIN_INDEX,
  UPDATE_INDEX_DESCRIPTION,
  UPDATE_INDEX_FORMULA,
} from 'actions/mis/admin/indexManager';

const initialState = Map({
  selectedIndex: null,
  description: null,
  formula: null,
});

const actionsMap = {
  [CLEAR_ADMIN_INDEX_DATA]: (state, action) => {
    return state.set('description', null).set('formula', null);
  },
  [SET_ADMIN_INDEX_DATA]: (state, action) => {
    return state.set('description', action.description).set('formula', List(action.formula));
  },
  [SET_SELECTED_INDEX_IN_ADMIN_INDEX]: (state, action) => {
    return state.set('selectedIndex', action.index);
  },
  [UPDATE_INDEX_DESCRIPTION]: (state, action) => {
    return state.set('description', action.description);
  },
  [UPDATE_INDEX_FORMULA]: (state, action) => {
    const formula = state.get('formula');
    switch(action.action) {
      case 'add':
        return state.set('formula', formula.push(action.subindex));
      case 'update':
        return state.set('formula', formula.set(action.index, action.subindex));
      case 'delete':
        return state.set('formula', formula.delete(action.index));
      default:
        return state;
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
