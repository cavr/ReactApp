import { Map, List } from 'immutable';

import {
  CHANGE_METRIC_MODE,
  RESET_ADMIN_METRIC,
  SET_SELECTED_INDEX_IN_ADMIN_METRIC,
  SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC,
  SET_SELECTED_METRIC_IN_ADMIN_METRIC,
  INIT_ADMIN_METRIC_DATA,
  CLEAR_ADMIN_METRIC_DATA,
  LOAD_ADMIN_METRIC_DATA,
  UPDATE_METRIC_TITLE,
  UPDATE_METRIC_DESCRIPTION,
  ADD_OPERATION,
  DELETE_OPERATION,
  CLEAR_OPERATIONS,
  CLEAR_CREATE_DATA,
  SET_ADMIN_METRIC_TARGETS,
  UPDATE_ADMIN_METRIC_TARGET,
} from 'actions/mis/admin/metricManager';

const initialState = Map({
  mode: 'create',
  selectedIndex: null,
  selectedSubindex: null,
  selectedMetric: null,
  title: null,
  description: null,
  graphType: null,
  targets: null,

  operations: null,
  openBrackets: null,
});

const actionsMap = {
  [CHANGE_METRIC_MODE]: (state, action) => {
    return state.set('mode', action.mode);
  },
  [RESET_ADMIN_METRIC]: (state) => {
    return state.merge({
      selectedIndex: null,
      selectedSubindex: null,
      selectedMetric: null,
      title: null,
      description: null,
      graphType: null,
      targets: null,

      operations: null,
      openBrackets: null,
    });
  },
  [SET_SELECTED_INDEX_IN_ADMIN_METRIC]: (state, action) => {
    return state.set('selectedIndex', action.index);
  },
  [SET_SELECTED_SUBINDEX_IN_ADMIN_METRIC]: (state, action) => {
    return state.set('selectedSubindex', action.subindex);
  },
  [SET_SELECTED_METRIC_IN_ADMIN_METRIC]: (state, action) => {
    return state.set('selectedMetric', action.metric);
  },
  [INIT_ADMIN_METRIC_DATA]: (state) => {
    return state.merge({
      title: '',
      description: '',
      graphType: 1,

      operations: List(),
      openBrackets: List([0]),
    });
  },
  [CLEAR_ADMIN_METRIC_DATA]: (state) => {
    return state.merge({
      title: null,
      description: null,
      graphType: null,

      operations: null,
      openBrackets: null,
    });
  },
  [LOAD_ADMIN_METRIC_DATA]: (state, action) => {
    return state.merge({
      title: action.title,
      description: action.description,
      graphType: action.graphType,
      targets: List(action.targets),

      operations: List(action.formula),
      openBrackets: List([0]),
    });
  },
  [UPDATE_METRIC_TITLE]: (state, action) => {
    return state.set('title', action.title);
  },
  [UPDATE_METRIC_DESCRIPTION]: (state, action) => {
    return state.set('description', action.description);
  },
  [ADD_OPERATION]: (state, action) => {
    const newOperation = action.operation;
    const operations = state.get('operations');
    const openBrackets = state.get('openBrackets');
    const lastOperation = operations.last();
    if (newOperation.type === 'parameter') {
      if (!lastOperation) return state.set('operations', operations.push(newOperation));
      if (lastOperation.type === 'parameter') {
        return state.set('operations', operations.pop().push(newOperation));
      }
      if (lastOperation.type !== 'closeBracket' && lastOperation.type !== 'closeFunction' && lastOperation.type !== 'number') return state.set('operations', operations.push(newOperation));
      return state;
    }
    if (newOperation.type === 'number') {
      if (!lastOperation) return state.set('operations', operations.push(newOperation));
      if (lastOperation.type === 'number') {
        return state.set('operations', operations.pop().push({ type: 'number', data: (lastOperation.data * 10) + newOperation.data }));
      }
      if (lastOperation.type !== 'closeBracket' && lastOperation.type !== 'closeFunction' && lastOperation.type !== 'parameter') return state.set('operations', operations.push(newOperation));
      return state;
    }
    if (newOperation.type === 'operator') {
      if (!lastOperation) return state;
      if (lastOperation.type !== 'comma' && lastOperation.type !== 'bracket' && lastOperation.type !== 'function') {
        return state.set('operations', operations.push(newOperation));
      }
      if (lastOperation.type === 'operator') return state.set('operations', operations.pop().push(newOperation));
      return state;
    }
    if (newOperation.type === 'function') {
      if (!lastOperation || lastOperation.type === 'operator' || lastOperation.type === 'bracket' || lastOperation.type === 'function') {
        return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.push(0));
      }
      return state;
    }
    if (newOperation.type === 'bracket') {
      if (lastOperation && (lastOperation.type === 'parameter' || lastOperation.type === 'number' || lastOperation.type === 'endBracket' || lastOperation.type === 'endFunction')) return state;
      return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.set(openBrackets.size - 1, openBrackets.last() + 1));
    }
    if (newOperation.type === 'endBracket') {
      if (lastOperation || (lastOperation.type !== 'comma' && lastOperation !== 'operator')) {
        const nestedOpenBrackets = openBrackets.last();
        const openBracketsIndex = openBrackets.size - 1;
        if (lastOperation.type === 'bracket') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets - 1));
        else if (nestedOpenBrackets > 0) return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets - 1));
        else if (openBracketsIndex === 0) return state;
        return state.set('operations', operations.push({ type: 'endFunction' })).set('openBrackets', openBrackets.pop());
      }
      return state;
    }
    return state;
  },
  [DELETE_OPERATION]: (state) => {
    const operations = state.get('operations');
    if (!operations.size) return state;

    const openBrackets = state.get('openBrackets');
    const lastOperation = operations.last();
    const nestedOpenBrackets = openBrackets.last();
    const openBracketsIndex = openBrackets.size - 1;

    if (lastOperation.type === 'endBracket') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets + 1));
    else if (lastOperation.type === 'endFunction') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.push(1));
    else if (lastOperation.type === 'bracket') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets - 1));
    else if (lastOperation.type === 'function') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.pop());
    else if (lastOperation.type === 'number') {
      const number = lastOperation.data;
      if (number < 10) return state.set('operations', operations.pop());
      return state.set('operations', operations.set(operations.size - 1, { type: 'number', data: Math.trunc(number / 10) }));
    }
    return state.set('operations', operations.pop());
  },
  [CLEAR_OPERATIONS]: (state) => {
    return state.set('operations', List()).set('openBrackets', 0);
  },
  [CLEAR_CREATE_DATA]: (state) => {
    return state.set('operations', List()).set('openBrackets', 0).set('title', '').set('description', '');
  },
  [SET_ADMIN_METRIC_TARGETS]: (state, action) => {
    return state.set('targets', List(action.targets));
  },
  [UPDATE_ADMIN_METRIC_TARGET]: (state, action) => {
    const targets = state.get('targets');
    return state.set('targets', targets.set(action.index, action.target));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
