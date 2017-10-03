import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import './desktop.scss';
import './mobile.scss';

export default class EvolutionLineChart extends PureComponent {
  static propTypes = {
    points: PropTypes.array,
    target: PropTypes.number,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
  };
  constructor() {
    super();

    this.width = 230;
    this.height = 65;

    this.animate = this.animate.bind(this);
    this.normalizePoint = this.normalizePoint.bind(this);
    this.renderPoints = this.renderPoints.bind(this);
  }
  componentDidMount() {
    this.animate();
  }

  animate() {
    const { points } = this.props;
    anime({
      targets: this.path,
      d: this.renderPoints(points),
      easing: 'easeInOutQuad',
      duration: '500ms',
      delay: '200ms',
    });
  }

  normalizePoint(point) {
    /*  Linear map
        To map
        [A, B] --> [a, b]
        (val - A)*(b-a)/(B-A) + a
        In this case
        (val - minValue) * (this.height - 0) / (maxValue - minValue) + 0
    */
    const { minValue, maxValue } = this.props;
    const normalized = (point - minValue) * ((this.height - 0) / (maxValue - minValue));
    return this.height - normalized;
  }

  renderPoints(points) {
    let pointsString = '';

    for (let i = 0, l = points.length, incr = this.width / (l - 1); i < l; i++) {
      pointsString += ` L${ i * incr },${ this.normalizePoint(points[i].value) }`;
    }
    return `M0,${ this.height } ${ pointsString } L${ this.width },${ this.height } Z`;
  }
  render() {
    const { points, target } = this.props;
    const lastMonth = points[points.length - 1];
    const firstMonth = points[0];
    const targetPoint = this.normalizePoint(target);
    const targetPosition = ((targetPoint / this.height) * 100);
    let pointsString = '';
    const lines = [];

    for (let i = 0, l = points.length, incr = this.width / (l - 1); i < l; i++) {
      pointsString += ` L${ i * incr }, ${ this.height }`;
      lines.push(<line key={ `line-${ i * incr }` } x1={ i * incr } x2={ i * incr } y1='0' y2={ this.height } strokeDasharray='5, 5' />);
    }

    return (
      <div className='evolution-line-chart'>
        <div className='evolution-line-chart__svg-wrapper'>
          <div className='evolution-line-chart__dates'>
            <div className='evolution-line-chart__date evolution-line-chart__date--first'>{ firstMonth.date.replace('-', ' ') }</div>
            <div className='evolution-line-chart__date evolution-line-chart__date--last'>{ lastMonth.date.replace('-', ' ') }</div>
          </div>
          <div className='evolution-line-chart__target' style={ { top: `${ targetPosition }%` } }>
            <div className='evolution-line-chart__target-line' />
            <div className='evolution-line-chart__target-number'>{ Math.abs(target) } pt</div>
            <div className='evolution-line-chart__target-text'>target</div>
          </div>
          <svg className='evolution-line-chart__svg' viewBox={ `0 0 ${ this.width } ${ this.height }` } preserveAspectRatio='none'>
            <defs>
              <linearGradient x1='25%' y1='75%' x2='75%' y2='75%' id='evolution-gradient'>
                <stop stopColor='#F2745F' offset='0%' />
                <stop stopColor='#E14031' offset='100%' />
              </linearGradient>
            </defs>
            <path ref={ (path) => this.path = path } fill='url(#evolution-gradient)' fillOpacity='0.4' d={ `M0,${ this.height } ${ pointsString } L${ this.width },${ this.height } Z` } />
            <g>
              { lines }
            </g>
            <line className='target-line' x1='0' x2={ this.width } y1={ targetPoint } y2={ targetPoint } />
          </svg>
        </div>
      </div>
    );
  }
}
