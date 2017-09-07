import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class HeatChart extends PureComponent {

  static propTypes = {
    sections: PropTypes.object,
  };

  render() {
    const { sections } = this.props;
    const maxValue = data.sections.high;
    
    return (
      <div className='subindex-heat-chart__labels'>
        <div className='subindex-heat-chart__label'>low</div>
        <div className='subindex-heat-chart__label'>mid</div>
        <div className='subindex-heat-chart__label'>high</div>
      </div>
    );
  }
}