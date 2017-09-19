export const ADD_OPERATION = 'ADD_OPERATION';
export const DELETE_OPERATION = 'DELETE_OPERATION';
export const CLEAR_OPERATIONS = 'CLEAR_OPERATIONS';

export function addParameter(parameter) {
  return { type: ADD_OPERATION, operation: { type: 'parameter', data: parameter } }
}

export function addOperator(operator) {
  return { type: ADD_OPERATION, operation: { type: 'operator', data: operator }};
}

export function deleteOperation() {
  return { type: DELETE_OPERATION };
}

export function clearOperations() {
  return { type: CLEAR_OPERATIONS };
}

export function openBracket() {
  return { type: ADD_OPERATION, operation: { type: 'openBracket', data: "(" }}
}

export function closeBracket() {
  return { type: ADD_OPERATION, operation: { type: 'closeBracket', data: ")" }}
}

export function addComplex(complex) {
  return { type: ADD_OPERATION, operation: { type: 'complex', data: complex }}
}