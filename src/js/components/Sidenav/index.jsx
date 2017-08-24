import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeCodes } from 'routes';

import './desktop.scss';

export default class Sidenav extends PureComponent {
  static propTypes = {
    setToken: PropTypes.func,
  };

  render() {
    return (
      <div className='bluetab-sns-sidenav'>
        <div className='bluetab-sns-sidenav__title'>
          SNS
        </div>
        <ul className='bluetab-sns-sidenav__nav'>
          <li className='bluetab-sns-sidenav__nav-button'></li>
          <li className='bluetab-sns-sidenav__nav-button'></li>
          <li className='bluetab-sns-sidenav__nav-button'></li>
          <li className='bluetab-sns-sidenav__nav-button'></li>
        </ul>
      </div>
    );
  }
}
