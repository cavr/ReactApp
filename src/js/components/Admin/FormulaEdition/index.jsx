import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FormulaDisplay from './FormulaDisplay';
import FormulaInput from './FormulaInput';

import './desktop.scss';

export default class FormulaEdition extends PureComponent {
  static propTypes = {
    operations: PropTypes.object,
    openBrackets: PropTypes.object,
    negatedParameter: PropTypes.bool,
    parameters: PropTypes.array,
  };

  render() {
    const { operations, openBrackets, negatedParameter, parameters } = this.props;
    return (
      <div className='formula-edition'>
        <FormulaDisplay operations={ operations } openBrackets={ openBrackets } negatedParameter={ negatedParameter } />
        <FormulaInput parameters={ parameters } />
      </div>
    );
  }
}
