import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ValueDroplet from 'components/Charts/Details/ValueDroplet';
import Labels from 'components/Charts/Details/Labels';

import './desktop.scss';

export default class HeatChart extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };
  normalizeValue(value, maxValue) {
    /*  Linear map
        To map
        [A, B] --> [a, b]
        (val - A)*(b-a)/(B-A) + a
        In this case
        (val - 0) * (100 - 0) / (maxValue - 0) + 0
    */
    return (value * 100) / maxValue;
  }
  render() {
    const { data } = this.props;
    const maxValue = data.sections.high;
    
    const currentValue = this.normalizeValue(data.value, maxValue);
    const targetValue = this.normalizeValue(data.target, maxValue);
    return (
      <div className='subindex-heat-chart'>
        <div className='subindex-heat-chart__line' style={ { backgroundImage: 'linear-gradient(-90deg, #98DA65 0%, #E14031 100%)' } } />
        <ValueDroplet className='subindex-heat-chart__droplet subindex-heat-chart__droplet--current' value={ data.value } position={ currentValue } />
        <ValueDroplet className='subindex-heat-chart__droplet subindex-heat-chart__droplet--target' value={ data.target } position={ targetValue } />
        <Labels sections={ data.sections } />
        <div className='subindex-heat-chart__legend-wrapper'>
          <div className='subindex-heat-chart__legend'>
            <i className='subindex-heat-chart__legend-icon subindex-heat-chart__legend-icon--target' />
            Target
          </div>
          <div className='subindex-heat-chart__legend'>
            <i className='subindex-heat-chart__legend-icon subindex-heat-chart__legend-icon--current' />
            Actual
          </div>
        </div>
      </div>
    );
  }
}
