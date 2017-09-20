import { List, Map } from 'immutable';

import {
  LOAD_CREATE_INDEXES,
  SELECT_CREATE_INDEX,
  LOAD_PARAMETERS,
  UPDATE_TITLE,
  UPDATE_DESCRIPTION,
  ADD_OPERATION,
  DELETE_OPERATION,
  CLEAR_OPERATIONS,
  CLEAR_CREATE_DATA,
} from 'actions/mis/admin/create';

const initialState = Map({
  indexes: null,
  selectedIndex: null,
  parameters: null,
  title: '',
  description: '',
  operations: List(),
  openBrackets: 0,
  negatedParameter: false,
});

const actionsMap = {
  [LOAD_CREATE_INDEXES]: (state, action) => {
    return state.set('indexes', action.indexes);
  },
  [SELECT_CREATE_INDEX]: (state, action) => {
    return state.set('selectedIndex', action.index);
  },
  [LOAD_PARAMETERS]: (state, action) => {
    return state.set('parameters', action.parameters);
  },
  [UPDATE_TITLE]: (state, action) => {
    return state.set('title', action.text);
  },
  [UPDATE_DESCRIPTION]: (state, action) => {
    return state.set('description', action.text);
  },
  [ADD_OPERATION]: (state, action) => {
    const newOperation = action.operation;
    const operations = state.get('operations');
    const openBrackets = state.get('openBrackets');
    const lastOperation = operations.last();
    if (newOperation.type === 'parameter') {
      if (!lastOperation) return state.set('operations', operations.push(newOperation));
      if (lastOperation.type === 'parameter') return state.set('operations', operations.pop().push(newOperation));
      if (lastOperation.type !== 'closeBracket') return state.set('operations', operations.push(newOperation));
      return state;
    }
    if (newOperation.type === 'openBracket') {
      if(lastOperation && (lastOperation.type === 'parameter' || lastOperation.type === 'closeBracket')) return state;
      return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets + 1);
    }
    if (newOperation.type === 'closeBracket') {
      if (lastOperation) {
        if (lastOperation.type === 'operator' || openBrackets === 0) return state;
        if (lastOperation.type === 'openBracket' || lastOperation.type === 'complex') return state.set('operations', operations.pop()).set('openBrackets', openBrackets - 1);
      }
      return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets - 1);
    }
    if (newOperation.type === 'operator') {
      if (!lastOperation) return state;
      if (lastOperation.type === 'parameter' || lastOperation.type === 'closeBracket') return state.set('operations', operations.push(newOperation));
      if (lastOperation.type === 'operator') return state.set('operations', operations.pop().push(newOperation));
      return state;
    }
    if (newOperation.type === 'complex') {
      if (lastOperation && lastOperation.type !== 'parameter' && lastOperation.type !== 'closeBracket') {
        return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets + 1);
      }
      return state;
    }
  },
  [DELETE_OPERATION]: (state) => {
    const operations = state.get('operations');
    if (!operations.size) return state;

    const openBrackets = state.get('openBrackets');
    const lastOperation = operations.last();
    if (lastOperation.type === 'closeBracket') return state.set('operations', operations.pop()).set('openBrackets', openBrackets + 1);
    if (lastOperation.type === 'openBracket' || lastOperation.type === 'complex') return state.set('operations', operations.pop()).set('openBrackets', openBrackets - 1);
    return state.set('operations', operations.pop());
  },
  [CLEAR_OPERATIONS]: (state) => {
    return state.set('operations', List()).set('openBrackets', 0);
  },
  [CLEAR_CREATE_DATA]: (state) => {
    return state.set('operations', List()).set('openBrackets', 0).set('title', '').set('description','');
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
