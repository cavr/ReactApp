import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { routeCodes } from 'routes';
import Collapse from 'components/Sections/Collapse';
import Avatar from './Avatar';

import logo from '../../../assets/img/common/logo.png';
import './desktop.scss';
import './mobile.scss';

export default class Sidenav extends PureComponent {
  static propTypes = {
    currentRoute: PropTypes.string,
  };
  constructor() {
    super();

    this.state = {
      showSubmenu: false,
    };
  }
  render() {
    const { currentRoute } = this.props;
    const { showSubmenu } = this.state;
    let activeClass = 'sidenav--MIS-active';
    if (currentRoute === routeCodes.RO) {
      activeClass = 'sidenav--RO-active';
    } else if (currentRoute === routeCodes.CHANGE) {
      activeClass = 'sidenav--change-active';
    } else if (currentRoute === routeCodes.INNOVATION) {
      activeClass = 'sidenav--innovation-active';
    }
    return (
      <div className={ `sidenav ${ activeClass }` }>
        <img className='sidenav__logo' src={ logo } alt='logo' />
        <Avatar />
        <ul className='sidenav__nav'>
          <Link
            className='sidenav__nav-button sidenav__nav-button--MIS'
            to={ routeCodes.MIS }
            onClick={ () => this.setState({ showSubmenu: !showSubmenu }) }
          >
            <i className='sidenav__icon icon icon__MIS' />
            MIS
            <i className={ `sidenav__menu-icon ${ showSubmenu ? 'sidenav__menu-icon--close' : '' } icon icon__menu-arrow` } />
          </Link>
          <Collapse isOpened={ showSubmenu }>
            {
              activeClass === 'sidenav--MIS-active' &&
              <div className='sidenav__nav-button sidenav__nav-button--secondary sidenav__parametrics'>
                <i className='sidenav__icon icon icon__settings' />
                Admin
              </div>
            }
          </Collapse>
          <Link
            className='sidenav__nav-button sidenav__nav-button--RO'
            to={ routeCodes.RO }
          >
            <i className='sidenav__icon icon icon__RO' />
            R&O
          </Link>
          <Link
            className='sidenav__nav-button sidenav__nav-button--change'
            to={ routeCodes.CHANGE }
          >
            <i className='sidenav__icon icon icon__change' />
            Change
          </Link>
          <Link
            className='sidenav__nav-button sidenav__nav-button--innovation'
            to={ routeCodes.INNOVATION }
          >
            <i className='sidenav__icon icon icon__innovation' />
            Innovation
          </Link>
        </ul>
        <div className='sidenav__powered'><span>Powered by</span> Produban</div>
      </div>
    );
  }
}