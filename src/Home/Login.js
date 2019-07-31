import React from 'react';
import PropTypes from 'prop-types';

import './Login.css';
import Logger from '../Logger/Logger';

const propTypes = {
  submitLogin: PropTypes.func
};

const defaultProps = {
  submitLogin: () => {}
};

class Login extends React.Component {
  submitLogin = e => {
    const values = e.target;
    // hardcoded username and password here
    const username = 'strongUsername';
    const password = 'impenetrablePassword';

    if (
      values.username.value === username &&
      values.password.value === password
    ) {
      localStorage.setItem('auth', true);
      this.props.history.push('/app');
    } else {
      alert('Username/Password is not correct');
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.submitLogin}>
          <div>
            <input
              className="loginInput"
              placeholder=" Username..."
              type="text"
              name="username"
            />
          </div>
          <div>
            <input
              className="loginInput"
              placeholder=" Password..."
              type="password"
              name="password"
            />
          </div>
          <div>
            <button id="loginSubmit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.defaultProps = defaultProps;
Login.propTypes = propTypes;

Login = Logger(Login, 'Login');
export default Login;
