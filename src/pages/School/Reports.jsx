import React from 'react';
import PropTypes from 'prop-types';

export const Reports = ({reports}) => {
  return (
        <div className="review-body">
            <hr/>
            <div className="review-section">
                <small><strong>Anonymous</strong> @johnsmith 31m</small>
                <br /><br />
                <div className="box">
                    <small><strong>Response to:</strong></small>
                    <br />

                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit illo, nemo ipsum esse eius, excepturi repudiandae odit, facere animi dolore et deserunt earum! Sunt praesentium commodi laboriosam similique vel? Blanditiis.
                    </p>
                    <br />
                    <nav className="level is-mobile">
                    <div className="level-left">
                        <a className="level-item">
                        <span className="icon is-small"><i className="fas fa-arrow-up upvote-fa" aria-hidden="true"></i></span>&nbsp;<small>(25)</small>
                        </a>
                        <a className="level-item">
                        <span className="icon is-small"><i className="fas fa-arrow-down downvote-fa" aria-hidden="true"></i></span>&nbsp;<small>(2)</small>
                        </a>
                        <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-bookmark bookmark-fa" aria-hidden="true"></i></span>&nbsp;<small>(25)</small>
                        </a>
                    </div>
                    </nav>
                </div>
            </div>
        </div>
    //   {
    //     reports.map((report, index) =>
          
    //     )
    //   }
  );
};

Reports.propTypes = {
  reviews: PropTypes.array.isRequired
};

