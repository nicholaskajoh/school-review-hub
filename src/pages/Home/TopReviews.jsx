import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';


const TopReviews = ({ reviews, isLoaded, errorLoading, spinner, reload }) => {
  let rendering;
  if (isLoaded) {
    rendering = reviews.map(review => (
      <div key={'top_review ' + review.id} className="box">
        <div className="media-content">
          <div className="content has-text-centered">
            <p><Link to={"/school/" + review.school.id}>{review.school.name}</Link></p>
            <strong className="has-text-black">"
              {review.content.substring(0, 150).trim() +
              (review.content.length > 150 ?
                ('...') : ('')
              )
               }"
            </strong>
          </div>
          <div className="card-footer">
            <div className="card-footer-item">Upvotes ({review.upvotes})</div>
            <div className="card-footer-item">Comments ({review.comments_count})</div>
          </div>
          <div className="card-footer">
            <div className="card-footer-item">
               <Link to={"/review/" + review.id}>Full review</Link>
            </div>
            <div className="card-footer-item">
              <strong>
                <TimeAgo>{new Date(review.created_at)}</TimeAgo>
              </strong>
            </div>
          </div>
        </div>
      </div>
    ));
  } else {
    rendering = (
      <div title="Reload" className="has-text-centered">
        <button
          className="reload-btn"
          disabled={errorLoading === false}
          onClick={reload}
        >
          <i className={"fa " + spinner + " fa-2x"} />
        </button>
      </div>
    );
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
