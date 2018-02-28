import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer is-dark">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          &copy; SchoolReviewHub, {new Date().getFullYear()}. Built with
          <i className="fa fa-heart has-text-danger" /> by
          <a href="https://twitter.com/nicholaskajoh">Nick </a>,
          <a href="https://twitter.com/TNkemdilim">Toks </a>,
          <a href="https://twitter.com/johnayeni_">John </a> and
          <a href="https://twitter.com/olaoluwa_98">Awo </a>.
        </p>
        <br />
        <Link
          className="twitter-share-button"
          target="_blank"
          to="https://twitter.com/intent/tweet?text=Check%20out%20School%20Review%20Hub%20by%20@nicholaskajoh,%20@TNkemdilim,%20@johnayeni_%20and%20@olaoluwa_98&url=https://schoolreviewhub.herokuapp.com"
          data-size="large"
        >
          <i className="fab fa-twitter" /> Tweet about us
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
