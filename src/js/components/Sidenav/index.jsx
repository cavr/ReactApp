import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { routeCodes } from 'routes';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { showMobileMenu, hideMobileMenu } from 'actions/app';
import Collapse from 'components/Sections/Collapse';
import Avatar from './Avatar';

import logo from '../../../assets/img/common/logo.png';
import './desktop.scss';
import './mobile.scss';

export class Sidenav extends PureComponent {
  static propTypes = {
    currentRoute: PropTypes.string,
    mobileMenu: PropTypes.bool,
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  };
  constructor() {
    super();

    this.state = {
      showSubmenu: false,
    };
    this.handleNavLink = this.handleNavLink.bind(this);
    this.handleSubmenu = this.handleSubmenu.bind(this);
  }

  handleNavLink(route) {
    const { currentRoute, mobileMenu, hideMenu } = this.props;
    if (currentRoute !== route) {
      if (mobileMenu) hideMenu();
      browserHistory.push(route);
    }
  }

  handleSubmenu(e) {
    e.stopPropagation();
    this.setState({ showSubmenu: !this.state.showSubmenu });
  }

  render() {
    const { currentRoute, mobileMenu, hideMenu } = this.props;
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
      <div className={ `sidenav-wrapper ${ mobileMenu ? 'sidenav-wrapper--open' : 'sidenav-wrapper--hidden' }` }>
        <div className={ `sidenav ${ activeClass }` }>
          <img className='sidenav__logo' src={ logo } alt='logo' />
          <Avatar />
          <ul className='sidenav__nav'>
            <div className='sidenav__nav-button sidenav__nav-button--MIS' onClick={ () => this.handleNavLink(routeCodes.MIS) }>
              <div className='sidenav__submenu-button' onClick={ this.handleSubmenu } />
              <i className='sidenav__icon icon icon__MIS' />
              MIS
              <i className={ `sidenav__menu-icon ${ showSubmenu ? 'sidenav__menu-icon--close' : '' } icon icon__menu-arrow` } />
            </div>
            <Collapse isOpened={ activeClass === 'sidenav--MIS-active' && showSubmenu }>
              <div
                className='sidenav__nav-button sidenav__nav-button--secondary sidenav__parametrics'
                onClick={ () => this.handleNavLink(routeCodes.MIS_ADMIN) }
              >
                <i className='sidenav__icon icon icon__settings' />
                Admin
              </div>
            </Collapse>
            <div className='sidenav__nav-button sidenav__nav-button--RO' onClick={ () => this.handleNavLink(routeCodes.RO) }>
              <i className='sidenav__icon icon icon__RO' />
              R&O
            </div>
            <div className='sidenav__nav-button sidenav__nav-button--change' onClick={ () => this.handleNavLink(routeCodes.CHANGE) }>
              <i className='sidenav__icon icon icon__change' />
              Change
            </div>
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
        <div className='sidenav-close-handler' onClick={ hideMenu } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideMenu: () => dispatch(hideMobileMenu()),
    showMenu: () => dispatch(showMobileMenu()),
  };
};

const mapStateToProps = (state) => ({
  mobileMenu: state.app.get('mobileMenu'),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidenav);
