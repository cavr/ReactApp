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
        <button className='mobile-nav__menu' />
        <img className='mobile-nav__logo' src={ logo } alt='logo' />
        <button className='mobile-nav__resume' />
      </div>
    );
  }
}
