import React from 'react';
import './Review.css';
import Comment from './../../partials/Comment/Comment';
import UpvoteButon from './../../partials/UpvoteButton/UpvoteButon';
import CommentCard from './../../partials/CommentCard/CommentCard';


const Review = () => (
  <div className="section">
    <div className="container">

      <div className="columns">
        <div className="column"></div>

        <div className="column">
          <div className="content">
            <p>
              <strong className="title">Covenant University</strong>
              <br></br>
            </p>
          </div>
        </div>

        <div className="column"></div>
      </div>

      <div className="review-body">
        <hr></hr>

        <div className="review-section">
          <small><strong>Anonymous</strong> @johnsmith 31m</small>
          <br /><br />

          <div className="box">
            <small><strong>Response to:</strong></small>
            <br />

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit illo, nemo ipsum esse eius, excepturi repudiandae odit, facere animi dolore et deserunt earum! Sunt praesentium commodi laboriosam similique vel? Blanditiis.
            </p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
          </p>
        </div>


        <hr className="review-hr" />
        <div className="review-section upvote-section">
          <UpvoteButon />

          <div id="upvote-text">
            <h3 className="text-bold">What's your view towards this review?</h3>
            <h5>By upvoting, you can signal to others which review really stand out.</h5>
          </div>
        </div>

        <hr className="review-hr" />


        <div className="review-section comment-section">
          <h3 className="title">Your view:</h3>
          <hr />
          <br />

          <Comment />
          <br /><br /><br />

          <h3 className="title">Comments:</h3>
          <hr />
          <br />

          {/* Dummy data creation */}
          {[0, 0, 0, 0, 0, 0, 0].map((object, i) => <CommentCard obj={object} key={i} />)}
        </div>

      </div>
    </div >
  </div >
);

export default Review;
