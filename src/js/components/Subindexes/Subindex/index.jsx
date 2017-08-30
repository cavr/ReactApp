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

  render() {
    const { data, selected, onClick } = this.props;
    return (
      <li className='bluetab-sns-subindex'>
        <Button title={ data.label } selected={ selected } onClick={ () => onClick(data.id, data.label) } />
        <Chart type={ data.type } data={ data.data } />
        <div className='bluetab-sns-subindex__variation-wrapper'>
          <div className='bluetab-sns-subindex__value'>{ Math.round(data.data.value) }pts</div>
          <div className='bluetab-sns-subindex__variation'></div>
        </div>
      </li>
    );
  };
}
