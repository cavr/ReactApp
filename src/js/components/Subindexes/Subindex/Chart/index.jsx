import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LineChart from './LineChart';
import HeatChart from './HeatChart';

export default class Chart extends PureComponent {

  static propTypes = {
    type: PropTypes.number,
    data: PropTypes.object,
  };

  constructor() {
    super();
    this.renderChart = this.renderChart.bind(this);
  }

  renderChart() {
    const { type, data } = this.props;
    switch (type) {
      case 2:
        return <HeatChart data={ data } />;
      default:
        return <LineChart data={ data } />;
    }
  }

  render() {
    return (
      <div className='bluetab-sns-subindex__chart'>
        { this.renderChart() }
      </div>
    );
  }
}
