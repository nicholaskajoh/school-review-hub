import React from 'react';

const Header = () => {
  return (
    <nav class="navbar is-transparent is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <img src="" alt="" width="112" height="28"/>
        </a>
        <div class="navbar-burger burger" data-target="navbarTransparent">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarTransparent" class="navbar-menu">
        <div class="navbar-start">

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <a class="navbar-item" href="">Home</a>
              <a class="navbar-item" href="">SRH Index</a>
              <a class="navbar-item" href="">Match & Review</a>
              <a class="navbar-item" href="">Search</a>
              <p class="control">
                  <a class="button is-link" href="">
                    <span>Sign In</span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-link" href="">
                    <span>Sign Up</span>
                  </a>
                </p>
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link" href="">Accounts</a>
                  
                  <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" href="">Profile</a>
                    <a class="navbar-item" href="">Help</a>
                    <a class="navbar-item" href="">Log out</a>
                  </div>
                
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
