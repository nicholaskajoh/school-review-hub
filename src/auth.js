import React from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { getAuth } from "./api-helpers.js";

// Auth middleware
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getAuth() ? (
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
