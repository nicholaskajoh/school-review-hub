import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.png';
import { getAuth } from '../../api-helpers.js';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isNavbarActive: false };
  }

  toggleNavbar = () => {
    this.setState(prevState => ({
      isNavbarActive: !prevState.isNavbarActive
    }));
  };

  isAuth() {
    return getAuth();
  }

  render() {
    return (
      <nav className="navbar is-link is-fixed-top">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} alt="SchoolReviewHub" width="40px" height="auto" />
            &nbsp;<h3 style={{ color: "#fff" }} className="title">
            </h3>
          </Link>
          <div
            className={
              "navbar-burger burger" +
              (this.state.isNavbarActive ? " is-active" : '')
            }
            onClick={this.toggleNavbar}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div
          className={
            "navbar-menu" + (this.state.isNavbarActive ? " is-active" : '')
          }
          onClick={this.toggleNavbar}
        >
          <div className="navbar-start" />

          <div className="navbar-end">
            {this.isAuth() ? (
              <Link className="navbar-item" to="/home">
                Home
              </Link>
            ) : (
              ''
            )}
            <Link className="navbar-item" to="/srh-index">
              SRH Index
            </Link>
            {this.isAuth() ? (
              <Link className="navbar-item" to="/match">
                Match & Rate
              </Link>
            ) : (
              ''
            )}
            {/* <Link className="navbar-item" to="/search">
              <i className="fa fa-search"></i>
            </Link> */}

            {this.isAuth() ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Account</a>

                <div className="navbar-dropdown is-boxed">
                  <Link className="navbar-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="navbar-item" to="/help">
                    Help
                  </Link>
                  <Link className="navbar-item" to="/logout">
                    Log out
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}

            {!this.isAuth() ? (
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <Link className="button is-success" to="/register">
                      Sign Up
                    </Link>
                  </p>
                  <p>
                    <Link className="button is-warning" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
