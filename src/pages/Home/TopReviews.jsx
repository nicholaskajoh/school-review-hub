import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';


const TopReviews = ({ reviews, isLoaded, errorLoading, spinner, reload }) => {
  let rendering;
  if (isLoaded)
  {
    rendering = (
      reviews.map((review, index) => (
        <div className="card" style={{ marginBottom: 15 }}>
          <header className="card-header">
            <p className="card-header-title">{review.school.name}</p>
          </header>
          <div className="card-content">
            <div className="content">
              {review.content.substring(0, 150).trim() +
                (review.content.length > 150 ? '...' : '')}{' '}
                <br />
                <strong><TimeAgo>{new Date(review.created_at)}</TimeAgo></strong>
            </div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item">
              <Link to={"/review/" + review.id}>Full review</Link>
            </div>
            <div className="card-footer-item">
              Upvotes ({review.upvotes})
            </div>
            <div className="card-footer-item">
              Comments ({review.comments_count})
            </div>
          </footer>
        </div>
      ))
    )
  }
  else
  {
    rendering = (
      <div title="Reload" className="has-text-centered">
        <button disabled={errorLoading === false}  onClick={reload}>
          <i className={"fa " + spinner + " fa-2x"} />
        </button>
      </div>
    )
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
