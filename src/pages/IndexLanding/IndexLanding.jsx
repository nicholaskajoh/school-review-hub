import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./IndexLanding.css";
import ratingImg from "../../assets/img/rating.png";
import reportImg from "../../assets/img/report.png";
import reviewImg from "../../assets/img/review.png";
import rankingImg from "../../assets/img/ranking.png";
import { getAuth } from "../../api-helpers.js";


class IndexLanding extends Component {
  isAuth() {
    return getAuth();
  }

  render() {
    return (
      <div>
        <section className="hero is-medium has-bg-img">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-white">
                This is School Review Hub
              </h1>
              <h2 className="subtitle has-text-white">
                Crowd-sourced anonymous reviews of Nigerian universities at your
                finger tips!
              </h2>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <nav className="columns">
              <div className="column has-text-centered ">
                <div>
                  <img src={ratingImg} className="shield-img" alt="rating" />
                  <p className="title is-4">Ratings</p>
                  <p>
                    Rate univeristies using our comparison-based system. It
                    allows you match two univeristies against each other and
                    choose the best under different criteria.
                  </p>
                </div>
              </div>
              <div className="column has-text-centered ">
                <div>
                  <img src={reviewImg} className="shield-img" alt="review" />
                  <p className="title is-4">Reviews</p>
                  <p>
                    Write reviews of univeristies detailing more nuanced
                    opinions that our rating system might not capture.
                  </p>
                </div>
              </div>
              <div className="column has-text-centered ">
                <div>
                  <img src={reportImg} className="shield-img" alt="repott" />
                  <p className="title is-4">Reports</p>
                  <p>
                    Report events -- good, bad and ugly -- happening in any
                    univeristy that might be of interest to the public.
                  </p>
                </div>
              </div>
              <div className="column has-text-centered ">
                <div>
                  <img src={rankingImg} className="shield-img" alt="ranking" />
                  <p className="title is-4">Rankings</p>
                  <p>
                    SchoolReviewHub maintains an index of all univeristies in
                    Nigeria listed in ascending order of their rankings. Easily
                    find out the best univeristies as rated by you!
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </section>

        <section className="hero is-pattern-bg">
          <div className="hero-body content has-text-centered">
            <div className="container">
              <h1 className="title has-text-danger has-text-weight-bold">
                You're anonymous!
              </h1>
              <h2 className="subtitle">
                Rate, review and report anonymously. Tell the truth and nothing
                but the truth.
              </h2>
              {!this.isAuth() ? (
                <div>
                  <p>
                    What are you waiting for? Sign up for or Login to
                    SchoolReviewHub...
                  </p>
                  <Link className="button is-success is-medium" to="/register">
                    Sign Up
                  </Link>{" "}
                  &nbsp;
                  <Link className="button is-info is-medium" to="/login">
                    Login
                  </Link>
                </div>
              ) : (
                <Link className="button is-info is-success" to="/home">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default IndexLanding;
