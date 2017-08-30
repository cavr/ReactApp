import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
        return <div>Cool heat chart</div>;
      default:
        return <div>Cool line chart</div>;
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
