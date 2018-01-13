import React from 'react';
import PropTypes from 'prop-types';

export const TopReviews = ({reviews}) => {
  return (
    <div className="column">
      <p className="title has-text-centered"><i className="fa fa-comment-alt"></i>  Top Reviews</p>
      <div className="content">
      {
        reviews.map((review, index) =>
          <div class="card" key={index}>
            <header class="card-header">
              <p class="card-header-title">
                {review.school.name}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                {review.content}
                <br />
                <time datetime="2016-1-1">{review.created_at}</time>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
};

TopReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};
