import { List, Map } from 'immutable';

import {
  ADD_OPERATION,
  DELETE_OPERATION,
  CLEAR_OPERATIONS,
} from 'actions/mis/admin';

const initialState = Map({
  operations: List(),
  openBrackets: 0,
  negatedParameter: false,
});

const actionsMap = {
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
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
