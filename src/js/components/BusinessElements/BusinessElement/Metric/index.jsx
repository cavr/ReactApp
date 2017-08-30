import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

import './desktop.scss';

export default class Metric extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    state: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const { data, state, onClick } = this.props;
    return (
      <li className='business-element-metric'>
        <Button title={ data.label } onClick={ () => onClick(data.id, data.label) } />
        <ul className='business-element-metric__semaphores'>
          <li className={ `business-element-metric__semaphore business-element-metric__semaphore--red ${ state === 0 ? 'business-element-metric__semaphore--active' : '' }` } />
          <li className={ `business-element-metric__semaphore business-element-metric__semaphore--yellow ${ state === 1 ? 'business-element-metric__semaphore--active' : '' }` } />
          <li className={ `business-element-metric__semaphore business-element-metric__semaphore--green ${ state === 2 ? 'business-element-metric__semaphore--active' : '' }` } />
        </ul>
        <div className='business-element-metric__evolution'>
          Evolution
        </div>
      </li>
    );
  };
}