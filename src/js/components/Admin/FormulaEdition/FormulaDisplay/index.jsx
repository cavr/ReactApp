import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class FormulaDisplay extends PureComponent {

  static propTypes = {
    operations: PropTypes.object,
    openBrackets: PropTypes.object,
  };

  render() {
    const { operations, openBrackets } = this.props;
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
    openBrackets.forEach((brackets) => {
      for (let i = 0; i < brackets; i++) {
        additionalBrackets += ' )';
      }
    });
    additionalBrackets = additionalBrackets.trim();
    return (
      <div className='formula-display'>
        <div className='formula-display__title'>Create formula to calculate your metric</div>
        { /* <i className='formula-display__icon icon icon__trash' onClick={ console.log('delete') } /> */ }
        <div className='formula-display__input'>
          <div className='formula-display__inner-wrapper'>{ displayString }<span className='incomplete-bracket'>{ additionalBrackets }</span></div>
        </div>
      </div>
    );
  }
}
