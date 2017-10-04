import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ValueDroplet from 'components/Charts/Details/ValueDroplet';
import Target from 'components/Charts/Details/Target';
import Labels from 'components/Charts/Details/Labels';
import Waypoint from 'react-waypoint';

import './desktop.scss';
import './mobile.scss';

export default class HeatChart extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };
  constructor() {
    super();
    this.state = {
      inScreen: false,
    };
    this.handleWaypoint = this.handleWaypoint.bind(this);
  }

  handleWaypoint() {
    this.setState({ inScreen: true });
  }

  normalizeValue(value, minValue, maxValue) {
    /*  Linear map
        To map
        [A, B] --> [a, b]
        (val - A)*(b-a)/(B-A) + a
        In this case
        (val - minValue) * (100 - 0) / (maxValue - minValue) + 0
    */
    return ((value - minValue) * (100 - 0) / (maxValue - minValue));
  }
  render() {
    const { data } = this.props;
    const { inScreen } = this.state;
    const minValue = data.sections.low;
    const maxValue = data.sections.high;
    
    const currentValue = this.normalizeValue(data.value, minValue, maxValue);
    const targetValue = this.normalizeValue(data.target, minValue, maxValue);
    return (
      <div className='subindex-heat-chart'>
        <Waypoint onEnter={ this.handleWaypoint } />
        <div className='subindex-heat-chart__line' style={ { backgroundImage: 'linear-gradient(-90deg, #98DA65 0%, #E14031 100%)' } } />
        { inScreen && <ValueDroplet className='subindex-heat-chart__droplet subindex-heat-chart__droplet--current' value={ data.value } position={ currentValue } /> }
        { inScreen && <Target className='subindex-heat-chart__target' value={ data.target } position={ targetValue } /> }
        <Labels sections={ data.sections } />
        <div className='subindex-heat-chart__legend-wrapper'>
          <div className='subindex-heat-chart__legend'>
            <i className='subindex-heat-chart__legend-icon subindex-heat-chart__legend-icon--target' />
            Target
          </div>
          <div className='subindex-heat-chart__legend'>
            <i className='subindex-heat-chart__legend-icon subindex-heat-chart__legend-icon--current' />
            Actuals
          </div>
        </div>
      </div>
    );
  }
}
