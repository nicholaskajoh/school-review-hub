import React from 'react';
import './CommentCard.css';

const CommentCard = ({comment}) => (
  <div className="box">
    <article className="media">

      <div className="media-content">
        <div className="content">
          <p>
            <strong>Anonymous</strong> <small>@johnsmith</small> <small>31m</small>
            <br></br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
              </p>
        </div>
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
    </article>
  </div>
);

export default CommentCard;