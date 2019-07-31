import React from 'react';

import './Login.css';
import Logger from '../Logger/Logger';

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
            <input type="text" name="username" />
          </div>
          <div>
            <input type="password" name="password" />
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

Login = Logger(Login, 'Login');
export default Login;
