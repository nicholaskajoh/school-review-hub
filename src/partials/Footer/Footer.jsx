import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>&copy; School Review Hub, {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
);

export default Footer;
