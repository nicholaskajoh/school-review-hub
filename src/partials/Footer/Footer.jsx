import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
const intent_text =
  'text=Check%20out%20School%20Review%20Hub%20by%20@nicholaskajoh,%20@TNkemdilim,%20@johnayeni_%20and%20@olaoluwa_98';
const url = '&url=https://schoolreviewhub.herokuapp.com';
const hashtags = '&hashtags=schoolreviewhub,teamcodesauce,saucecode2018';
const twitter_text =
  'https://twitter.com/intent/tweet?' + intent_text + url + hashtags;
const facebook_text = 'http://www.facebook.com/sharer/sharer.php?';
const instagram_text = '';
const Footer = () => (
  <footer className="footer is-dark">
    <div className="container">
      <nav className="level has-text-centered">
        <div className="level-left">
          <small>
            <em>
              &copy; SchoolReviewHub, {new Date().getFullYear()}. Built with
              {" "}<i className="fa fa-heart has-text-danger" /> by{' '}
              <a
                href="https://twitter.com/nicholaskajoh"
                className="has-text-warning"
              >
                Nick{' '}
              </a>,{' '}
              <a
                href="https://twitter.com/TNkemdilim"
                className="has-text-warning"
              >
                Toks{' '}
              </a>,{' '}
              <a
                href="https://twitter.com/johnayeni_"
                className="has-text-warning"
              >
                John{' '}
              </a>{' '}
              and{' '}
              <a
                href="https://twitter.com/olaoluwa_98"
                className="has-text-warning"
              >
                Awo{' '}
              </a>.
            </em>
          </small>
        </div>
        <br />
        <br />
        <div className="level-left">
          Share via: &nbsp;&nbsp;
          <Link target="_blank" to={facebook_text} data-size="large">
            <i className="fab fa-facebook-f fa-2x  footer-glyph" />
          </Link>
          &nbsp;&nbsp;
          <Link target="_blank" to={twitter_text} data-size="large">
            <i className="fab fa-twitter fa-2x  footer-glyph" />
          </Link>
          &nbsp;&nbsp;
          <Link target="_blank" to={instagram_text} data-size="large">
            <i className="fab fa-instagram fa-2x  footer-glyph" />
          </Link>
        </div>
      </nav>
    </div>
  </footer >
);

export default Footer;
