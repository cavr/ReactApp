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
  SET_ADMIN_METRIC_TARGETS,
  UPDATE_ADMIN_METRIC_TARGET,
  CHANGE_GRAPH_TYPE_IN_ADMIN_METRIC,
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
  negatedParameter: false,
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
      negatedParameter: false,
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
      graphType: '1',

      operations: List(),
      openBrackets: List([0]),
      negatedParameter: false,
    });
  },
  [CLEAR_ADMIN_METRIC_DATA]: (state) => {
    return state.merge({
      title: null,
      description: null,
      graphType: null,

      operations: null,
      openBrackets: null,
      negatedParameter: false,
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
      negatedParameter: false,
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
    const negatedParameter = state.get('negatedParameter');
    if (newOperation.type === 'parameter') {
      if (!lastOperation) {
        if (negatedParameter) return state.set('operations', operations.push({ type: 'parameter', data: `-${ newOperation.data }` })).set('negatedParameter', false);
        return state.set('operations', operations.push(newOperation));
      }
      if (lastOperation.type === 'parameter') {
        return state.set('operations', operations.pop().push(newOperation));
      }
      if (lastOperation.type !== 'endBracket' && lastOperation.type !== 'endFunction' && lastOperation.type !== 'number') {
        if (negatedParameter) return state.set('operations', operations.push({ type: 'parameter', data: `-${ newOperation.data }` })).set('negatedParameter', false);
        return state.set('operations', operations.push(newOperation));
      }
      return state;
    } else if (newOperation.type === 'number') {
      if (!lastOperation) {
        if (negatedParameter) return state.set('operations', operations.push({ type: 'number', data: newOperation.data * -1 })).set('negatedParameter', false);
        return state.set('operations', operations.push(newOperation));
      }
      if (lastOperation.type === 'number') {
        if (lastOperation.data > 0) {
          return state.set('operations', operations.pop().push({ type: 'number', data: (lastOperation.data * 10) + newOperation.data }));
        } else {
          return state.set('operations', operations.pop().push({ type: 'number', data: (Math.abs(lastOperation.data * 10) + newOperation.data) * -1 }));
        }
      }
      if (lastOperation.type !== 'endBracket' && lastOperation.type !== 'endFunction' && lastOperation.type !== 'parameter') {
        if (negatedParameter) return state.set('operations', operations.push({ type: 'number', data: newOperation.data * -1 })).set('negatedParameter', false);
        return state.set('operations', operations.push(newOperation));
      }
      return state;
    } else if (newOperation.type === 'operator') {
      if (newOperation.data === '-') {
        if (!lastOperation || (lastOperation.type !== 'endBracket' && lastOperation.type !== 'endFunction' && lastOperation.type !== 'parameter' && lastOperation.type !== 'number')) return state.set('negatedParameter', true);
      }
      if (newOperation.data === '+' && negatedParameter) {
        return state.set('negatedParameter', false);
      }
      if (!lastOperation) return state;
      if (lastOperation.type === 'operator') return state.set('operations', operations.pop().push(newOperation));
      if (lastOperation.type !== 'comma' && lastOperation.type !== 'bracket' && lastOperation.type !== 'function') {
        return state.set('operations', operations.push(newOperation));
      }
      return state;
    } else if (newOperation.type === 'function') {
      if (!lastOperation || lastOperation.type === 'operator' || lastOperation.type === 'bracket' || lastOperation.type === 'function') {
        return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.push(0));
      }
      return state;
    } else if (newOperation.type === 'bracket') {
      if (lastOperation && (lastOperation.type === 'parameter' || lastOperation.type === 'number' || lastOperation.type === 'endBracket' || lastOperation.type === 'endFunction')) return state;
      return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.set(openBrackets.size - 1, openBrackets.last() + 1));
    } else if (newOperation.type === 'endBracket') {
      if (lastOperation && lastOperation !== 'operator') {
        const nestedOpenBrackets = openBrackets.last();
        const openBracketsIndex = openBrackets.size - 1;
        if (lastOperation.type === 'bracket') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets - 1));
        else if (nestedOpenBrackets > 0) return state.set('operations', operations.push(newOperation)).set('openBrackets', openBrackets.set(openBracketsIndex, nestedOpenBrackets - 1));
        else if (openBracketsIndex === 0) return state;
        else if (lastOperation.type === 'comma') return state.set('operations', operations.pop().push({ type: 'endFunction' })).set('openBrackets', openBrackets.pop());
        else if (lastOperation.type === 'function') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.pop());
        return state.set('operations', operations.push({ type: 'endFunction' })).set('openBrackets', openBrackets.pop());
      }
      return state;
    } else if (newOperation.type === 'comma') {
      if (openBrackets.size < 2) return state;
      if (lastOperation.type === 'function' || lastOperation.type === 'bracket' || lastOperation.type === 'comma' || lastOperation.type === 'operator') return state;

      let operationsToAdd = operations;
      for (let i = 0, l = openBrackets.last(); i < l; i++) {
        operationsToAdd = operationsToAdd.push({ type: 'endBracket' });
      }
      operationsToAdd = operationsToAdd.push({ type: 'comma' });

      return state.set('operations', operationsToAdd).set('openBrackets', openBrackets.set(openBrackets.pop().push(0)));
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
    else if (lastOperation.type === 'endFunction') return state.set('operations', operations.pop()).set('openBrackets', openBrackets.push(0));
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
    return state.merge({
      operations: List(),
      openBrackets: List([0]),
      negatedParameter: false,
    });
  },
  [SET_ADMIN_METRIC_TARGETS]: (state, action) => {
    return state.set('targets', List(action.targets));
  },
  [UPDATE_ADMIN_METRIC_TARGET]: (state, action) => {
    const targets = state.get('targets');
    return state.set('targets', targets.set(action.index, action.target));
  },
  [CHANGE_GRAPH_TYPE_IN_ADMIN_METRIC]: (state, action) => {
    return state.set('graphType', action.graph);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
