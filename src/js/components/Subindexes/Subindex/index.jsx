import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Chart from './Chart';

import './desktop.scss';

export default class Subindex extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  renderVariation(variation) {
    if (variation < 0) return <div className='subindex__variation subindex__variation--red'>down { variation }</div>;
    else if (variation === 0) return <div className='subindex__variation subindex__variation--yellow'>no change</div>;
    return <div className='subindex__variation subindex__variation--green'>up { variation }</div>;
  }
  render() {
    const { data, selected, onClick } = this.props;
    const chartData = data.data;
    return (
      <li className='subindex'>
        <Button title={ data.label } selected={ selected } onClick={ () => onClick(data.id, data.label) } />
        <Chart type={ data.type } data={ chartData } />
        <div className='subindex__variation-wrapper'>
          <div className='subindex__value'>{ Math.round(chartData.value) }pts</div>
          { this.renderVariation(chartData.variation) }
        </div>
      </li>
    );
  };
}
