import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FormulaDisplay from './FormulaDisplay';
import FormulaInput from './FormulaInput';

export default class FormulaEdition extends PureComponent {
  static propTypes = {
    operations: PropTypes.object,
    openBrackets: PropTypes.object,
    parameters: PropTypes.array,
  };

  render() {
    const { operations, openBrackets, parameters } = this.props;
    return (
      <div className='formula-edition'>
        <FormulaDisplay operations={ operations } openBrackets={ openBrackets } />
        <FormulaInput parameters={ parameters } />
      </div>
    );
  }
}
