import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';
import './mobile.scss';

export default class MainRadarChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    comparative: PropTypes.bool,
    peers: PropTypes.bool,
    market: PropTypes.bool,
  };

  constructor() {
    super();
    this.config = {
      axisStyle: {
        stroke: '#C4C7CC',
        strokeWidth: '0.5',
      },
      axisDensity: 10,
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
        <line key={ `v-detail-${ i }` } x1='48' x2='52' y1={ increment * i } y2={ increment * i } style={ this.config.axisStyle } />
      );
      horizontalAxisDetails.push(
        <line key={ `h-detail-${ i }` } y1='48' y2='52' x1={ increment * i } x2={ increment * i } style={ this.config.axisStyle } />
      );
    }
    return (
      <g className='axis'>
        <g className='vertical-axis'>
          <line x1='50' y1='0' x2='50' y2='100' style={ this.config.axisStyle } />
          <polygon points={ '50,0 48,2 52,2' } fill={ this.config.axisStyle.stroke } />
          <polygon points={ '50,100 48,98 52,98' } fill={ this.config.axisStyle.stroke } />
          <g className='vertical-axis__details'>
            { verticalAxisDetails }
          </g>
        </g>
        <g className='horizontal-axis'>
          <line x1='0' y1='50' x2='100' y2='50' style={ this.config.axisStyle } />
          <polygon points={ '0,50 2,48 2,52' } fill={ this.config.axisStyle.stroke } />
          <polygon points={ '100,50 98,48 98,52' } fill={ this.config.axisStyle.stroke } />
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
        <polygon strokeWidth='0.5' fillOpacity='0.3' points={ pointsString }>
          { /* <animate attributeName='points' fill='freeze' dur='500ms' from={ '50,50 50,50 50,50 50,50' } to={ pointsString } keyTimes='0' keySplines='0.23, 1, 0.32, 1' begin={ `${ delay ? delay : 0 }ms` } /> */ }
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
        <div className='main-graph-chart__label main-graph-chart__label--top'>
          <i className={ `main-graph-chart__label__icon icon icon__${ indexNames[0].id }` } />
          { indexNames[0].label }
        </div>
        <div className='main-graph-chart__label main-graph-chart__label--right'>
          <i className={ `main-graph-chart__label__icon icon icon__${ indexNames[1].id }` } />
          { indexNames[1].label }
        </div>
        <div className='main-graph-chart__label main-graph-chart__label--bottom'>
          <i className={ `main-graph-chart__label__icon icon icon__${ indexNames[2].id }` } />
          { indexNames[2].label }
        </div>
        <div className='main-graph-chart__label main-graph-chart__label--left'>
          <i className={ `main-graph-chart__label__icon icon icon__${ indexNames[3].id }` } />
          { indexNames[3].label }
        </div>
      </div>
    );
  }
  render() {
    const { data, comparative, peers, market } = this.props;
    const currentPoints = [];
    const targetPoints = [];
    const indexNames = [];
    for (let i = 0, l = data ? data.length : 0; i < l; i++) {
      currentPoints.push({ value: data[i].value, max: 11 });
      targetPoints.push({ value: data[i].target, max: 11 });
      indexNames.push({ id: data[i].id, label: data[i].label });
    }

    let extraPoints = null;
    if (comparative) extraPoints = [{ value: 3, max: 11 }, { value: 6, max: 11 }, { value: 6, max: 11 }, { value: 4, max: 11 }];
    if (peers) extraPoints = [{ value: 10, max: 11 }, { value: 5, max: 11 }, { value: 7, max: 11 }, { value: 4, max: 11 }];
    if (market) extraPoints = [{ value: 6, max: 11 }, { value: 6, max: 11 }, { value: 6, max: 11 }, { value: 6, max: 11 }];

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
              Actuals
            </div>
            {
              extraPoints &&
              <div className='main-graph-chart__legend'>
                <i className='main-graph-chart__legend-icon main-graph-chart__legend-icon--extra' />
                { peers && 'Peers' }
                { market && 'Market' }
                { comparative && 'Comparative' }
              </div>
            }
          </div>
          <svg className='main-graph-chart__svg' viewBox='0 0 100 100' style={ { backgroundColor: 'white' } }>
            { this.renderAxis() }
            { this.renderPolygon(targetPoints, 'target') }
            { this.renderPolygon(currentPoints, 'current', 300) }
            { extraPoints && this.renderPolygon(extraPoints, 'extra') }
          </svg>
        </div>
      </div>
    );
  }
}
