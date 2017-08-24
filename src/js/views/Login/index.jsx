import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeCodes } from 'routes';
import LoginServices from 'services/api/login';
import { connect } from 'react-redux';
import { setToken } from 'actions/app';

import './desktop.scss';

export class Login extends PureComponent {
  static propTypes = {
    setToken: PropTypes.func,
    router: PropTypes.obj,
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      username: null,
      password: null,
      errors: '',
    };
  }
  login() {
    const { username, password } = this.state;
    this.setState({ loading: true });
    LoginServices.login(username, password).then((response) => {
      this.props.setToken('token');
      this.setState({ loading: false });
      this.props.router.push(routeCodes.MIS);
      console.log(response);
    });
  }
  render() {
    return (
      <div className='bluetab-sns-login'>
        <div className='bluetab-sns-login__wrapper'>
          <div className='bluetab-sns-login__brand'>
            SNS | Santander Network
            <br />
            Services
          </div>
          <input placeholder='User' onChange={ (username) => this.setState({ username }) } />
          <input placeholder='Password' onChange={ (password) => this.setState({ password }) } />
          <button type='submit' onClick={ () => this.login() }>Login</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setToken(token)),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(Login);

