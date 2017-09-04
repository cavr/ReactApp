import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class MainRadarChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
  };

  constructor() {
    super();
    this.config = {
      axisStyle: {
        stroke: '#C4C7CC',
        strokeWidth: '0.5',
      },
      axisDensity: 40,
    };

    this.renderAxis = this.renderAxis.bind(this);
    this.renderPolygon = this.renderPolygon.bind(this);
    this.renderLabels = this.renderLabels.bind(this);
  }
  renderAxis() {
    const verticalAxisDetails = [];
    const horizontalAxisDetails = [];
    for (let i = 1, l = this.config.axisDensity, increment = 100 / this.config.axisDensity; i < l; i++) {
      verticalAxisDetails.push(
        <line key={ `v-detail-${ i }` } x1='49' x2='51' y1={ increment * i } y2={ increment * i } style={ this.config.axisStyle } />
      );
      horizontalAxisDetails.push(
        <line key={ `h-detail-${ i }` } y1='49' y2='51' x1={ increment * i } x2={ increment * i } style={ this.config.axisStyle } />
      );
    }
    return (
      <g className='axis'>
        <g className='vertical-axis'>
          <line x1='50' y1='0' x2='50' y2='100' style={ this.config.axisStyle } />
          <g className='vertical-axis__details'>
            { verticalAxisDetails }
          </g>
        </g>
        <g className='horizontal-axis'>
          <line x1='0' y1='50' x2='100' y2='50' style={ this.config.axisStyle } />
          <g className='horizontal-axis__details'>
            { horizontalAxisDetails }
          </g>
        </g>
      </g>
    );
  }
  renderPolygon(points, name, delay) {
    if (points.length < 0) return <polygon />;

    const normPoints = points.map((originalPoint, index) => {
      /* Linear map
      To map
      [A, B] --> [a, b]
      (val - A)*(b-a)/(B-A) + a
      In this case
      (val - 0) * (50 - 0) / (B - 0) + 0
      */
      const point = (originalPoint.value * 50) / originalPoint.max;
      if (index === 0 || index === 3) return 50 - point;
      return point + 50;
    });
    const pointsString = `50, ${ normPoints[0] } ${ normPoints[1] },50 50,${ normPoints[2] } ${ normPoints[3] },50`;
    return (
      <g className={ name }>
        <polygon strokeWidth='1' fillOpacity='0.5' fill={ `url(#${ name }-background)` } points={ '50,50 50,50 50,50 50,50' }>
          <animate attributeName='points' fill='freeze' dur='500ms' to={ pointsString } keyTimes='0' keySplines='0.23, 1, 0.32, 1' begin={ `${ delay ? delay : 0 }ms` } />
        </polygon>
        <circle cx='50' cy={ normPoints[0] } r='1.33' />
        <circle cx={ normPoints[1] } cy='50' r='1.33' />
        <circle cx='50' cy={ normPoints[2] } r='1.33' />
        <circle cx={ normPoints[3] } cy='50' r='1.33' />
      </g>
    );
  }
  renderLabels(indexNames) {
    return (
      <div className='main-graph-chart__labels'>
        <div className='main-graph-chart__label main-graph-chart__label--top'>{ indexNames[0] }</div>
        <div className='main-graph-chart__label main-graph-chart__label--right'>{ indexNames[1] }</div>
        <div className='main-graph-chart__label main-graph-chart__label--bottom'>{ indexNames[2] }</div>
        <div className='main-graph-chart__label main-graph-chart__label--left'>{ indexNames[3] }</div>
      </div>
    );
  }
  render() {
    const { data } = this.props;
    const currentPoints = [];
    const targetPoints = [];
    const indexNames = [];
    for (let i = 0, l = data ? data.length : 0; i < l; i++) {
      currentPoints.push({ value: data[i].value, max: 15 });
      targetPoints.push({ value: data[i].target, max: 15 });
      indexNames.push(data[i].label);
    }
    return (
      <div className='main-graph-chart'>
        <div className='main-graph-chart__svg-wrapper'>
          { this.renderLabels(indexNames) }
          <div className='main-graph-chart__legend-wrapper'>
            <div className='main-graph-chart__legend'>
              <i className='main-graph-chart__legend-icon main-graph-chart__legend-icon--target' />
              Target
            </div>
            <div className='main-graph-chart__legend'>
              <i className='main-graph-chart__legend-icon main-graph-chart__legend-icon--current' />
              Current
            </div>
          </div>
          <svg className='main-graph-chart__svg' viewBox='0 0 100 100' style={ { backgroundColor: 'white' } }>
            <defs>
              <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='current-background'>
                <stop stopColor='#EF3535' offset='0%' />
                <stop stopColor='#F27A7A' offset='100%' />
              </linearGradient>
              <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='target-background'>
                <stop stopColor='#FAD961' offset='0%' />
                <stop stopColor='#F76B1C' offset='100%' />
              </linearGradient>
            </defs>
            { this.renderAxis() }
            { this.renderPolygon(targetPoints, 'target') }
            { this.renderPolygon(currentPoints, 'current', 300) }
          </svg>
        </div>
      </div>
    );
  }
}
