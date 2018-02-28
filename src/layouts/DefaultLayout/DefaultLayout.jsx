import React from "react";
import { Route } from "react-router-dom";
import "./DefaultLayout.css";
import Header from "../../partials/Header/Header";
import Footer from "../../partials/Footer/Footer";

const DefaultLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div id="layoutContent">
        <Header />
        <main id="layoutMain">
          <Component {...matchProps} />
        </main>
        <Footer />
      </div>
    )}
  />
);

export default DefaultLayout;
