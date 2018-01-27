import React from 'react';
import { Link } from 'react-router-dom';

const TopReviews = ({ reviews }) => {
  return (
    <div>
      <section className="section">
				<div className="container">
					<h1 className="title">
						<i className="fa fa-comment-alt"></i> Top Reviews
					</h1>

          {reviews.map((review, index) =>
            <div className="card" style={{marginBottom: 15}}>
              <header className="card-header">
                  <p className="card-header-title">
                    {review.school.name}
                  </p>
              </header>
              <div className="card-content">
              <div className="content">
                  {review.content.substring(0, 150).trim() + (review.content.length > 150 ? "..." : "")} - Last updated {review.updated_at}
              </div>
              </div>
              <footer className="card-footer">
                  {/* <div className="card-footer-item">
                      <Link to={"/review/" + review.id}>Full review</Link>
                  </div> */}
                  <div className="card-footer-item">
                      Upvotes ({review.upvotes})
                  </div>
                  <div className="card-footer-item">
                      Comments ({review.comments_count})
                  </div>
              </footer>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopReviews;