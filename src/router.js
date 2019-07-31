import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import App from './App/App';
import Login from './Home/Login';
import Post from './Post/Post';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.auth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default (
  <Switch>
    <Route path="/" exact component={Login} />
    <ProtectedRoute path="/app" exact component={App} />
    <ProtectedRoute path="/post/*" exact component={Post} />
  </Switch>
);
