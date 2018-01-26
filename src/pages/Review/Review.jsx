import React from 'react';
import './Review.css';
import Comment from './../../partials/Comment/Comment';
import CommentCard from './../../partials/CommentCard/CommentCard';

const _handleOnLoadMoreClick = () => {
  var tempObj = document.getElementById('post-comment-btn');
  var objClasses = tempObj.getAttribute('class');

  tempObj.setAttribute('class', `${objClasses} is-loading`);
}

const Review = () => (
  <div className="section">
    <div className="container">

      <div className="columns">
        <div className="column"></div>

        <div className="column">
          <div className="content ">
            <p>
              <strong className="title" ><a className="has-text-black" href="/school/{id}"> Covenant University</a></strong>
              <br></br>
            </p>
          </div>
        </div>

        <div className="column"></div>
      </div>

      <div className="review-body">
        <hr></hr>

        {/* Move this to seperate card, and display on an optional basis*/}
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, veniam et! Et corporis facere ex nobis velit voluptatum vitae voluptate cupiditate culpa nemo? Quisquam voluptate iure aliquid porro vel obcaecati.
          </p>

        </div>


        <hr className="review-hr" />
        <div className="review-section upvote-section">

          <div id="upvote-text">
            <h3 className="text-bold">What's your view towards this review?</h3>
            <h5>By upvoting, you can signal to others which review really stand out.</h5>
          </div>
        </div>

        <hr className="review-hr" />


        <div className="review-section comment-section">
          <h3 className="title">Your view:</h3>
          <hr />
          <p>Whats your opinion? Do feel this is review is rightly spoken? Why not let others see the other side of the coin through your perspective.</p>
          <br />

          <Comment />
          <br /><br /><br />

          <h3 className="title">Comments:</h3>
          <hr />
          <p>Just as the saying goes, for every action, there is always an equal and opposite reaction.<br />Feel free and see what others are saying.</p>
          <br />

          {/* Dummy data creation */}
          {[0, 0, 0, 0, 0, 0, 0].map((object, i) => <CommentCard obj={object} key={i} />)}
        </div>

        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <button className="button is-danger" id="post-comment-btn" onClick={_handleOnLoadMoreClick}>Load more comment</button>
          </p>
        </div>


      </div>
    </div >
  </div >
);

export default Review;
