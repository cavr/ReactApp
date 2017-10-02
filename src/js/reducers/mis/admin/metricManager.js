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
  operations: null,
  openBrackets: null,
  graphType: null,
  targets: null,
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
      operations: null,
      openBrackets: null,
      graphType: null,
      targets: null,
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
      operations: List(),
      openBrackets: List(),
      graphType: 1,
    });
  },
  [CLEAR_ADMIN_METRIC_DATA]: (state) => {
    return state.merge({
      title: null,
      description: null,
      operations: null,
      openBrackets: null,
      graphType: null,
    });
  },
  [LOAD_ADMIN_METRIC_DATA]: (state, action) => {
    return state.merge({
      title: action.title,
      description: action.description,
      operations: List(action.formula),
      openBrackets: List(),
      graphType: action.graphType,
      targets: List(action.targets),
    });
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
      if (lastOperation && (lastOperation.type === 'parameter' || lastOperation.type === 'closeBracket')) return state;
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
    return state;
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
    return state.set('operations', List()).set('openBrackets', 0).set('title', '').set('description', '');
  },
  [SET_ADMIN_METRIC_TARGETS]: (state, action) => {
    return state.set('targets', List(action.targets));
  },
  [UPDATE_ADMIN_METRIC_TARGET]: (state, action) => {
    return state.set('targets', action.targets);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
