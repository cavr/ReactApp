import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'actions/app';

import Loading from 'components/Loading';

import avatar from '../../../assets/img/common/avatar.svg';
import logo from '../../../assets/img/common/logo--login.png';
import jefe from '../../../assets/img/dev/jorge.png';

import './desktop.scss';
import './mobile.scss';

export class Login extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    login: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      otherUser: false,
      username: 'prueba',
      password: null,
      errors: '',
    };
  }
  login() {
  }
  render() {
    const { otherUser, username, password } = this.state;
    const { loading, login } = this.props;

    return (
      <div className='login'>
        <div className='login__logo-wrapper'>
          <img className='login__logo' src={ logo } alt='Logo' />
          <div className='login__brand'>
            SNS | Santander Network Services
          </div>
        </div>
        <div className='login__wrapper'>
          { loading &&
            <div className='login__loading-screen'>
              <Loading />
            </div>
          }
          <div className='login__avatar'>
            <img className='login__avatar-image' src={ otherUser ? avatar : jefe } alt='avatar' />
            { !otherUser && <div className='login__name'>Jorge Nájera</div> }
          </div>
          { otherUser && <input className='login__input' placeholder='User' onChange={ (e) => this.setState({ username: e.target.value }) } /> }
          <input className='login__input' placeholder='Password' type='password' onChange={ (e) => this.setState({ password: e.target.value }) } />
          <button className='login__submit' type='submit' onClick={ () => login(username, password) }>Login</button>
          { !otherUser && <div className='login__switch icon icon__avatar' onClick={ () => this.setState({ otherUser: true }) }>Switch user</div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.app.get('loading'),
});


const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, password) => dispatch(login(user, password)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

