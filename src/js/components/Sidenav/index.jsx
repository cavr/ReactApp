import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { routeCodes } from 'routes';

import logo from '../../../assets/img/common/logo.png';
import './desktop.scss';

export default class Sidenav extends PureComponent {
  static propTypes = {
    setToken: PropTypes.func,
    currentRoute: PropTypes.string,
  };

  render() {
    const { currentRoute } = this.props;
    let activeClass = 'bluetab-sns-sidenav--MIS-active';
    if (currentRoute === routeCodes.RO) {
      activeClass = 'bluetab-sns-sidenav--RO-active';
    } else if (currentRoute === routeCodes.CHANGE) {
      activeClass = 'bluetab-sns-sidenav--change-active';
    } else if (currentRoute === routeCodes.INNOVATION) {
      activeClass = 'bluetab-sns-sidenav--innovation-active';
    }
    return (
      <div className={ `bluetab-sns-sidenav ${ activeClass }` }>
        <img className='bluetab-sns-sidenav__logo' src={ logo } alt='logo' />
        <ul className='bluetab-sns-sidenav__nav'>
          <Link
            className='bluetab-sns-sidenav__nav-button bluetab-sns-sidenav__nav-button--MIS'
            to={ routeCodes.MIS }
          >
            <i className='bluetab-sns-sidenav__icon icon icon__MIS' />
            MIS
          </Link>
          <Link
            className='bluetab-sns-sidenav__nav-button bluetab-sns-sidenav__nav-button--RO'
            to={ routeCodes.RO }
          >
            <i className='bluetab-sns-sidenav__icon icon icon__RO' />
            RO
          </Link>
          <Link
            className='bluetab-sns-sidenav__nav-button bluetab-sns-sidenav__nav-button--change'
            to={ routeCodes.CHANGE }
          >
            <i className='bluetab-sns-sidenav__icon icon icon__change' />
            Change
          </Link>
          <Link
            className='bluetab-sns-sidenav__nav-button bluetab-sns-sidenav__nav-button--innovation'
            to={ routeCodes.INNOVATION }
          >
            <i className='bluetab-sns-sidenav__icon icon icon__innovation' />
            Innovation
          </Link>
        </ul>
      </div>
    );
  }
}
