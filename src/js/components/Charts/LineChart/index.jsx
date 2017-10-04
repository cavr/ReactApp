import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ValueDroplet from 'components/Charts/Details/ValueDroplet';
import Target from 'components/Charts/Details/Target';
import Labels from 'components/Charts/Details/Labels';
import Waypoint from 'react-waypoint';

import anime from 'animejs';

import './desktop.scss';

export default class LineChart extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };
  constructor() {
    super();
    this.state = {
      inScreen: false,
    };
    this.animate = this.animate.bind(this);
    this.handleWaypoint = this.handleWaypoint.bind(this);
  }

  handleWaypoint() {
    const { inScreen } = this.state;
    if (!inScreen) this.animate();
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

  animate() {
    const { data } = this.props;

    const minValue = data.sections.low;
    const maxValue = data.sections.high;
    
    anime({
      duration: '350ms',
      targets: this.line,
      width: `${ this.normalizeValue(data.value, minValue, maxValue) }%`,
    });
  }

  render() {
    const { data } = this.props;
    const { inScreen } = this.state;

    const minValue = data.sections.low;
    const maxValue = data.sections.high;

    const value = this.normalizeValue(data.value, minValue, maxValue);
    const target = this.normalizeValue(data.target, minValue, maxValue);
    return (
      <div className='subindex-line-chart'>
        <Waypoint onEnter={ this.handleWaypoint } />
        <div className='subindex-line-chart__line'>
          <div ref={ (line) => this.line = line } className='subindex-line-chart__filled' />
        </div>
        { inScreen && <ValueDroplet className='subindex-line-chart__droplet' value={ data.value } position={ value } /> }
        { inScreen && <Target className='subindex-line-chart__target' value={ data.target } position={ target } /> }
        <Labels sections={ data.sections } />
        <div className='subindex-line-chart__legend-wrapper'>
          <div className='subindex-line-chart__legend'>
            <i className='subindex-line-chart__legend-icon subindex-line-chart__legend-icon--target' />
            Target
          </div>
          <div className='subindex-line-chart__legend'>
            <i className='subindex-line-chart__legend-icon subindex-line-chart__legend-icon--current' />
            Actuals
          </div>
        </div>
      </div>
    );
  }
}
