import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import logo from '../../../assets/img/common/logo.png';
import './mobile.scss';

export default class Sidenav extends PureComponent {
  static propTypes = {
    currentRoute: PropTypes.string,
  };
  render() {
    return (
      <div className='mobile-nav'>
        <div className='mobile-nav__menu icon icon__nav-menu--mobile' />
        <img className='mobile-nav__logo' src={ logo } alt='logo' />
        <div className='mobile-nav__summary icon icon__summary' />
      </div>
    );
  }
}
