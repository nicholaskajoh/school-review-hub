import React from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";

// Auth middleware
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("authToken") !== null ? (
        <DefaultLayout {...rest} component={Component} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
