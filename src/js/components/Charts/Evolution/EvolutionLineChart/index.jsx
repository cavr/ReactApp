import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import './desktop.scss';
import './mobile.scss';

export default class EvolutionLineChart extends PureComponent {
  static propTypes = {
    points: PropTypes.array,
    maxValue: PropTypes.number,
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
        (val - 0) * (this.height - 0) / (maxValue - 0) + 0
    */
    const maxValue = this.props.maxValue;
    return this.height - ((point * this.height) / maxValue);
  }

  renderPoints(points) {
    let pointsString = '';

    for (let i = 0, l = points.length, incr = this.width / (l - 1); i < l; i++) {
      pointsString += ` L${ i * incr },${ this.normalizePoint(points[i].value) }`;
    }
    return `M0,${ this.height } ${ pointsString } L${ this.width },${ this.height } Z`;
  }
  render() {
    const { points } = this.props;
    let pointsString = '';
    const lines = [];

    for (let i = 0, l = points.length, incr = this.width / (l - 1); i < l; i++) {
      pointsString += ` L${ i * incr }, ${ this.height }`;
      lines.push(<line key={ `line-${ i * incr }` } x1={ i * incr } x2={ i * incr } y1='0' y2={ this.height } />);
    }

    return (
      <div className='evolution-line-chart'>
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
        </svg>
      </div>
    );
  }
}
