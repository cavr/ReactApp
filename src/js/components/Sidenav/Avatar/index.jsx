import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import { connect } from 'react-redux';
import { logout } from 'actions/app';

import './desktop.scss';

export class Avatar extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.object,
    logout: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  render() {
    const { userInfo, logout } = this.props;
    const { showMenu } = this.state;
    return (
      <div className='sidenav-avatar'>
        <img className='sidenav-avatar__image' src={ userInfo.image } alt='User' />
        <div className='sidenav-avatar__user-info-wrapper' onClick={ () => this.setState({ showMenu: !showMenu }) }>
          <div className='sidenav-avatar__name'>{ userInfo.name }</div>
          <div className='sidenav-avatar__role'>{ userInfo.role }</div>
          <i className={ `sidenav-avatar__arrow ${ showMenu ? 'sidenav-avatar__arrow--close' : '' } icon icon__menu-arrow` } />
        </div>
        <Collapse isOpened={ showMenu }>
          <ul className='sidenav-avatar__menu'>
            <li className='sidenav-avatar__option'>Settings</li>
            <li className='sidenav-avatar__option' onClick={ logout }>Logout</li>
          </ul>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.app.get('userInfo'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
