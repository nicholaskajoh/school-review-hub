import React from 'react';
import { Link } from 'react-router-dom';
import './IndexLanding.css';

const IndexLanding = () => (
  <div>
    <section className="hero is-medium is-light is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            This is SchoolReviewHub
          </h1>
          <h2 className="subtitle">
            Crowd-sourced anonymous reviews of Nigerian univeristies at your finger tips!
          </h2>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <nav className="columns">
          <div className="column has-text-centered">
            <div>
              <p><i className="fa fa-star fa-2x"></i></p>
              <p className="title">Rate</p>
              <p>Rate univeristies using our comparison-based system. It allows you match two univeristies against each other and choose the best under different criteria.</p>
            </div>
          </div>
          <div className="column has-text-centered">
            <div>
              <p><i className="fa fa-comments fa-2x"></i></p>
              <p className="title">Review</p>
              <p>Write reviews of univeristies detailing more nuanced opinions that our rating system might not capture.</p>
            </div>
          </div>
          <div className="column has-text-centered">
            <div>
              <p><i className="fa fa-microphone fa-2x"></i></p>
              <p className="title">Report</p>
              <p>Report events -- good, bad and ugly -- happening in any univeristy that might be of interest to the public.</p>
            </div>
          </div>
          <div className="column has-text-centered">
            <div>
              <p><i className="fa fa-trophy fa-2x"></i></p>
              <p className="title">The Index</p>
              <p>SchoolReviewHub maintains an index of all univeristies in Nigeria listed in ascending order of their rankings. Easily find out the best univeristies as rated by you!</p>
            </div>
          </div>
        </nav>
      </div>
    </section>

    <section className="hero is-warning">
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title">
            You're anonymous!
          </h1>
          <h2 className="subtitle">
            Rate, review and report anonymously. Tell the truth and nothing but the truth.
          </h2>
          <p>What are you waiting for? Sign up for or Login to SchoolReviewHub...</p>

          <Link className="button is-success is-medium" to="/sign-up">Sign Up</Link> &nbsp;
          <Link className="button is-info is-medium" to="/login">Login</Link>
        </div>
      </div>
    </section>
  </div>
);

export default IndexLanding;
