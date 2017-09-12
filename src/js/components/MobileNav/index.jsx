import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMobileMenu } from 'actions/app';

import logo from '../../../assets/img/common/logo.png';
import './mobile.scss';

export class MobileNav extends PureComponent {
  static propTypes = {
    showMenu: PropTypes.func,
  };
  render() {
    const { showMenu } = this.props;
    return (
      <div className='mobile-nav'>
        <div className='mobile-nav__menu icon icon__nav-menu--mobile' onClick={ showMenu } />
        <img className='mobile-nav__logo' src={ logo } alt='logo' />
        <div className='mobile-nav__summary icon icon__summary' />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => dispatch(showMobileMenu()),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(MobileNav);
