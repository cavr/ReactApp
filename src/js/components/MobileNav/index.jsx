import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMobileMenu, showSummaryMenu } from 'actions/app';
import Hammer from 'react-hammerjs';

import logo from '../../../assets/img/common/logo.png';
import './common.scss';

export class MobileNav extends PureComponent {
  static propTypes = {
    showMobileMenu: PropTypes.func,
    showSummaryMenu: PropTypes.func,
  };
  render() {
    const { showMobileMenu, showSummaryMenu } = this.props;
    return (
      <div className='mobile-nav'>
        <div className='mobile-nav__menu icon icon__nav-menu--mobile' onClick={ showMobileMenu }/>
        <img className='mobile-nav__logo' src={ logo } alt='logo' />
        <div className='mobile-nav__summary icon icon__summary' onClick={ showSummaryMenu }/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMobileMenu: () => dispatch(showMobileMenu()),
    showSummaryMenu: () => dispatch(showSummaryMenu()),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(MobileNav);
