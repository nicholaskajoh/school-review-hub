import React from "react";
import { Route } from "react-router-dom";
import "./DefaultLayout.css";
import Header from "../../partials/Header/Header";
import Footer from "../../partials/Footer/Footer";

const DefaultLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div>
        <Header />
        <Component {...matchProps} />
        <Footer />
      </div>
    )}
  />
);

export default DefaultLayout;
