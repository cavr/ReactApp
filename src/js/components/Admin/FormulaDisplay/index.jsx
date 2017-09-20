import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './desktop.scss';

export class FormulaDisplay extends PureComponent {

  static propTypes = {
    operations: PropTypes.object,
  };

  render() {
    const { operations, openBrackets } = this.props;
    let displayString = '';
    operations.forEach((operation) => {
      let formattedString = operation.data;
      if(formattedString === '*') formattedString = 'x';
      if(formattedString === '/') formattedString = '÷';
      displayString += formattedString + " ";
    });
    let additionalBrackets = '';
    for(let i = 0; i < openBrackets; i++) {
      additionalBrackets += ' )';
    }
    additionalBrackets = additionalBrackets.trim();
    return (
      <div className='formula-display'>
        <div className='formula-display__inner-wrapper'>{ displayString }<span className='incomplete-bracket'>{ additionalBrackets }</span></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  operations: state.adminCreate.get('operations'),
  openBrackets: state.adminCreate.get('openBrackets'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaDisplay);
