import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addParameter, addOperator, addComplex, clearOperations, deleteOperation, openBracket, closeBracket } from 'actions/mis/admin/create';

import './desktop.scss';

export class FormulaInput extends PureComponent {

  static propTypes = {
    operations: PropTypes.object,
  };

  render() {
    const { parameters, addOperator, addParameter, addComplex, clearOperations, deleteOperation, openBracket, closeBracket } = this.props;
    const options = parameters && parameters.map( (element) => {
      return <li key={ `${ element.id }-parameter` } onClick={ () => addParameter(element.label) }>{ element.label }</li>;
    })
    return (
      <div className='formula-input'>
        <ul className='bluetab-parameters'>
          { options }
        </ul>
        <button onClick={ () => clearOperations() }>CA</button>
        <button onClick={ () => deleteOperation() }>CE</button>
        <button onClick={ () => addOperator('+') }>+</button>
        <button onClick={ () => addOperator('-') }>-</button>
        <button onClick={ () => addOperator('/') }>/</button>
        <button onClick={ () => addOperator('*') }>*</button>
        <button onClick={ () => openBracket()}>(</button>
        <button onClick={ () => closeBracket()}>)</button>
        <button onClick={ () => addComplex('log(') }>log</button>
        <button onClick={ () => addComplex('AVG(') }>avg</button>
        <button onClick={ () => addComplex('MIN(') }>min</button>
        <button onClick={ () => addComplex('MA(') }>max</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  parameters: state.adminCreate.get('parameters'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    addParameter: (parameter) => dispatch(addParameter(parameter)),
    addOperator: (operator) => dispatch(addOperator(operator)),
    addComplex: (complex) => dispatch(addComplex(complex)),
    clearOperations: () => dispatch(clearOperations()),
    deleteOperation: () => dispatch(deleteOperation()),
    openBracket: () => dispatch(openBracket()),
    closeBracket: () => dispatch(closeBracket()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaInput);
