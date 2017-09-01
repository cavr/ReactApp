import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class EvolutionLineChart extends PureComponent {
  static propTypes = {
    points: PropTypes.array,
  };

  render() {
    const { points } = this.props;
    return (
      <div>Im a cool chart</div>
    );
  }
}
