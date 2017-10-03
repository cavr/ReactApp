import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class FormulaDisplay extends PureComponent {

  static propTypes = {
    operations: PropTypes.object,
    openBrackets: PropTypes.object,
    negatedParameter: PropTypes.bool,
  };

  render() {
    const { operations, openBrackets, negatedParameter } = this.props;
    let displayString = '';
    operations.forEach((operation) => {
      let formattedString = operation.data;
      if (operation.type === 'bracket') formattedString = '(';
      else if (operation.type === 'endBracket' || operation.type === 'endFunction') formattedString = ')';
      else if (operation.type === 'comma') formattedString = ',';
      else if (operation.type === 'function') formattedString = `${ operation.data }(`;
      else if (formattedString === '*') formattedString = 'x';
      else if (formattedString === '/') formattedString = '÷';
      displayString += `${ formattedString } `;
    });
    let additionalBrackets = '';
    openBrackets.forEach((brackets, index) => {
      additionalBrackets += index > 0 ? ' )' : '';
      for (let i = 0; i < brackets; i++) {
        additionalBrackets += ' )';
      }
    });
    additionalBrackets = additionalBrackets.trim();
    return (
      <div className='formula-display'>
        <div className='formula-display__title'>Create formula to calculate your metric</div>
        <div className='formula-display__input'>
          <div className='formula-display__inner-wrapper'>{ displayString }{ negatedParameter && <span>-</span> }<span className='incomplete-bracket'>{ additionalBrackets }</span></div>
        </div>
      </div>
    );
  }
}
