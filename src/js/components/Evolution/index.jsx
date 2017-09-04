import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EvolutionLineChart from './EvolutionLineChart';

import './desktop.scss';

export default class Evolution extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    variation: PropTypes.number,
    points: PropTypes.array,
    maxValue: PropTypes.number,
  };

  render() {
    const { points, label, variation, maxValue } = this.props;
    let variationClass = 'green';
    if (variation === 0) variationClass = 'yellow';
    else if (variation < 0) variationClass = 'red';

    return (
      <div className='evolution'>
        <div className='evolution__label'>{ label } evolution</div>
        <div className='evolution__variation'>
          <div className={ `evolution__variation-number evolution__variation-number--${ variationClass }` }>{ variation } %</div>
          <div className='evolution__variation-text'>variation</div>
        </div>
        <EvolutionLineChart points={ points } maxValue={ maxValue } />
      </div>
    );
  }
}
