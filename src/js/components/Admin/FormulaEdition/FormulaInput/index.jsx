import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNumber, addParameter, addOperator, addFunction, deleteOperation, clearOperations, addComma, openBracket, closeBracket } from 'actions/mis/admin/metricManager';

import Selector from 'components/Inputs/Selector';

import './desktop.scss';

export class FormulaInput extends PureComponent {

  static propTypes = {
    parameters: PropTypes.array,
    addNumber: PropTypes.func,
    addParameter: PropTypes.func,
    addFunction: PropTypes.func,
    deleteOperation: PropTypes.func,
    openBracket: PropTypes.func,
    closeBracket: PropTypes.func,
  };

  render() {
    const { parameters, addNumber, addOperator, addParameter, addFunction, deleteOperation, clearOperations, addComma, openBracket, closeBracket } = this.props;
    const options = parameters && parameters.map((element) => {
      return <li key={ `${ element.value }-parameter` } onClick={ () => addParameter(element.label) }>{ element.label }</li>;
    })
    return (
      <div className='formula-input'>
        <div className='formula-input__parameters'>
          <Selector
            className='formula-input__selector'
            title={ 'Add a parameter' }
            values={ parameters }
            currentValue={ null }
            placeholder='Parameter'
            onChange={ addParameter }
          />
        </div>
        <div className='formula-input__buttons'>
          <div className='formula-input__title'>Select operation</div>
          <div className='formula-input__button-wrapper'>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => openBracket() }>(</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => closeBracket() }>)</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addFunction('MIN') }>min</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addFunction('MAX') }>max</button>

            <button className='formula-input__button' onClick={ () => addNumber(7) }>7</button>
            <button className='formula-input__button' onClick={ () => addNumber(8) }>8</button>
            <button className='formula-input__button' onClick={ () => addNumber(9) }>9</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addOperator('+') }>+</button>

            <button className='formula-input__button' onClick={ () => addNumber(4) }>4</button>
            <button className='formula-input__button' onClick={ () => addNumber(5) }>5</button>
            <button className='formula-input__button' onClick={ () => addNumber(6) }>6</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addOperator('-') }>-</button>
            
            <button className='formula-input__button' onClick={ () => addNumber(1) }>1</button>
            <button className='formula-input__button' onClick={ () => addNumber(2) }>2</button>
            <button className='formula-input__button' onClick={ () => addNumber(3) }>3</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addOperator('*') }>x</button>
            
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addComma() }>,</button>
            <button className='formula-input__button' onClick={ () => addNumber(0) }>0</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addFunction('AVG') }>avg</button>
            <button className='formula-input__button formula-input__button--blue' onClick={ () => addOperator('/') }>/</button>

            <div className='formula-input__placeholder' />
            <div className='formula-input__placeholder' />
            <button className='formula-input__button formula-input__button--red' onClick={ () => clearOperations() }>CA</button>
            <button className='formula-input__button formula-input__button--red' onClick={ () => deleteOperation() }>CE</button>             
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (number) => dispatch(addNumber(number)),
    addParameter: (parameter) => dispatch(addParameter(parameter.value)),
    addOperator: (operator) => dispatch(addOperator(operator)),
    addFunction: (func) => dispatch(addFunction(func)),
    deleteOperation: () => dispatch(deleteOperation()),
    clearOperations: () => dispatch(clearOperations()),
    addComma: () => dispatch(addComma()),
    openBracket: () => dispatch(openBracket()),
    closeBracket: () => dispatch(closeBracket()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FormulaInput);
