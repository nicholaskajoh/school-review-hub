import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';

const TopReviews = ({ reviews, isLoaded, errorLoading, reload }) => {
  let rendering;
  if (isLoaded) {
    rendering = (
      <div className="columns is-multiline">
        {reviews.map(review => (
          <div key={'top_reviews ' + review.id} className="column is-4">
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="has-text-centered">
                    <Link
                      className="has-text-black-ter"
                      to={'/school/' + review.school.id}
                    >
                      {review.school.name}
                    </Link>

                    <hr />
                  </div>

                  <div className="content">
                    <p>
                      <strong>
                        "{review.content.substring(0, 150).trim() +
                          (review.content.length > 150 ? '...' : '')}"
                      </strong>
                      <br />
                      <br />

                      <small>
                        <em>
                          <Link to={'/review/' + review.id}>Read more</Link>
                        </em>
                      </small>
                    </p>
                  </div>
                  <hr />
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item has-text-dark" title="upvotes">
                        <span className="icon is-small has-text-success">
                          <i className="fa fa-thumbs-up" />
                        </span>
                        &nbsp;{review.upvotes}
                      </a>
                      &nbsp;&nbsp;
                      <a className="level-item has-text-dark" title="comments">
                        <span className="icon is-small has-text-warning">
                          <i className="fas fa-comment" />
                        </span>
                        &nbsp;{review.comments_count}
                      </a>
                    </div>
                    <div className="level-right">
                      <small className="media-right">
                        <TimeAgo>{new Date(review.created_at)}</TimeAgo>
                      </small>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (errorLoading) {
    rendering =
      <div className="has-text-centered">
        <button title="Reload" className="reload-btn" onClick={reload}>retry</button>
      </div>
  }
  else {
    rendering =
      <div className="has-text-centered">
        <button className="reload-btn loading">...</button>
      </div>
  }

  return (
    <div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h1 className="title">
            <i className="fa fa-comment-alt" /> Top Reviews
          </h1>
          <hr />
          <br />
          {rendering}
        </div>
      </section>
    </div>
  );
};

export default TopReviews;
