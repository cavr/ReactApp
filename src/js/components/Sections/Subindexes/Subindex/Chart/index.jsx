import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LineChart from 'components/Charts/LineChart';
import HeatChart from 'components/Charts/HeatChart';

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
      <div className='subindex__chart'>
        { this.renderChart() }
      </div>
    );
  }
}
