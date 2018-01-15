import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {isNavbarActive: false};
  }

  toggleNavbar = () => {
    this.setState(prevState => ({
      isNavbarActive: !prevState.isNavbarActive
    }));
  }

  render() {
    return (
      <nav className="navbar is-warning is-fixed-top">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} alt="SchoolReviewHub" width="200" height="auto" />
          </Link>
          <div className={"navbar-burger burger" + (this.state.isNavbarActive ? " is-active" : "")} onClick={this.toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={"navbar-menu" + (this.state.isNavbarActive ? " is-active" : "")} onClick={this.toggleNavbar}>
          <div className="navbar-start">

          </div>

          <div className="navbar-end">
            <Link className="navbar-item" to="/home">Home</Link>
            <Link className="navbar-item" to="/srh-index/1">SRH Index</Link>
            <Link className="navbar-item" to="/match">Match & Rate</Link>
            <Link className="navbar-item" to="/search">
              <i className="fa fa-search"></i>
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Accounts</a>
              
              <div className="navbar-dropdown is-boxed">
                <Link className="navbar-item" to="/profile">Profile</Link>
                <Link className="navbar-item" to="/help">Help</Link>
                <a className="navbar-item">Log out</a>
              </div>
            </div>

            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link className="button is-success" to="/register">Sign Up</Link>
                </p>
                <p>
                  <Link className="button is-info" to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
