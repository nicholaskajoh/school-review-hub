import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>&copy; SchoolReviewHub, {new Date().getFullYear()}. Built with <i className="fa fa-heart has-text-danger"></i> by <a href="https://twitter.com/nicholaskajoh">Nick</a>, <a href="https://twitter.com/TNkemdilim">Toks</a>, <a href="https://twitter.com/johnayeni_">John</a> and <a href="https://twitter.com/olaoluwa_98">Awo</a>.</p>
      </div>
    </div>
  </footer>
);

export default Footer;