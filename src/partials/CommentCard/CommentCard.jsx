import React from 'react';
import './CommentCard.css';
import TimeAgo from 'react-time-ago';
import 'react-time-ago/Tooltip.css';


const CommentCard = ({ comment, upvote }) => (
  <div className="box">
    <article className="media">

      <div className="media-content">
        <div className="content">
          {/* <p>
            <strong>Anonymous</strong> <small>@anonymous</small>
          </p> */}
          <p className="has-text-weight-light has-text-centered">
            <em>{comment.comment}</em>
          </p>
        </div>
        <hr />
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item has-text-dark">
              <span className="icon is-small has-text-success" title="upvotes"
                onClick={(e) => upvote(comment.id)}
              >
                <i className="fa fa-thumbs-up"></i>
              </span>
              &nbsp;{comment.upvotes}
            </a>
          </div>
          <div className="level-right">
            <small className="media-right"><TimeAgo>{new Date(comment.created_at)}</TimeAgo></small>
          </div>
        </nav>
      </div>
    </article>
  </div>
);

export default CommentCard;
