import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Alert extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    state: PropTypes.number,
  };

  render() {
    const { email, state } = this.props;
    return (
      <div className='bluetab-alert'>
        <div className='bluetab-alert__email'>{ email }</div>
        <ul className='bluetab-alert__semaphores'>
          <li className={ `bluetab-alert__semaphore bluetab-alert__semaphore--red ${ state === 0 ? 'bluetab-alert__semaphore--active' : '' }` } />
          <li className={ `bluetab-alert__semaphore bluetab-alert__semaphore--yellow ${ state === 1 ? 'bluetab-alert__semaphore--active' : '' }` } />
          <li className={ `bluetab-alert__semaphore bluetab-alert__semaphore--green ${ state === 2 ? 'bluetab-alert__semaphore--active' : '' }` } />
        </ul>
        <div className='bluetab-alert__button-wrapper'>
          <button className='bluetab-alert__button icon icon__edit' />
          <button className='bluetab-alert__button icon icon__trash' />
        </div>
      </div>
    );
  }
}
