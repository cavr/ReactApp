import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EvolutionLineChart from './EvolutionLineChart';

export default class Evolution extends PureComponent {
  static propTypes = {
    label: PropTypes.label,
    variation: PropTypes.variation,
    points: PropTypes.array,
  };

  render() {
    const { points, label, variation } = this.props;
    return (
      <div className='evolution'>
        <div className='evolution__label'>{ label } evolution</div>
        <div className='evolution__variation'>
          <div className='evolution__variation-number'>{ variation }</div>
          <div className='evolution__variation-text'></div>
        </div>
        <EvolutionLineChart points={ points } />
      </div>
    );
  }
}