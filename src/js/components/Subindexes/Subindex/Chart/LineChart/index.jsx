import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ValueDroplet from '../ValueDroplet';

import './desktop.scss';

export default class LineChart extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    const { data } = this.props;
    const maxValue = 100;
    /* Linear map
    To map
    [A, B] --> [a, b]
    (val - A)*(b-a)/(B-A) + a
    In this case
    (val - 0) * (100 - 0) / (maxValue - 0) + 0
    */
    const value = (data.value * 100) / maxValue;
    return (
      <div className='subindex-line-chart'>
        <div className='subindex-line-chart__line'>
          <div className='subindex-line-chart__filled' style={ { width: `${ value }%` } } />
        </div>
        <ValueDroplet className='subindex-line-chart__droplet' value={ data.value } position={ value } />
        <div className='subindex-line-chart__labels'>
          <div className='subindex-line-chart__label'>low</div>
          <div className='subindex-line-chart__label'>mid</div>
          <div className='subindex-line-chart__label'>high</div>
        </div>
      </div>
    );
  }
}
