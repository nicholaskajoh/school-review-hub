import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const intent_text =
  "text=Check%20out%20School%20Review%20Hub%20by%20@nicholaskajoh,%20@TNkemdilim,%20@johnayeni_%20and%20@olaoluwa_98";
const url = "&url=https://schoolreviewhub.herokuapp.com";
const hashtags = "&hashtags=schoolreviewhub,teamcodesauce,saucecode2018";
const text = "https://twitter.com/intent/tweet?" + intent_text + url + hashtags;

const Footer = () => (
  <footer className="footer is-dark">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          &copy; SchoolReviewHub, {new Date().getFullYear()}. Built with
          <i className="fa fa-heart has-text-danger" /> by{" "}
          <a
            href="https://twitter.com/nicholaskajoh"
            className="has-text-warning"
          >
            Nick{" "}
          </a>,{" "}
          <a href="https://twitter.com/TNkemdilim" className="has-text-warning">
            Toks{" "}
          </a>,{" "}
          <a href="https://twitter.com/johnayeni_" className="has-text-warning">
            John{" "}
          </a>{" "}
          and{" "}
          <a
            href="https://twitter.com/olaoluwa_98"
            className="has-text-warning"
          >
            Awo{" "}
          </a>.
        </p>
        <br />
        <Link
          className="twitter-share-button"
          target="_blank"
          to={text}
          data-size="large"
        >
          <i className="fab fa-twitter" /> Tweet about us
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
