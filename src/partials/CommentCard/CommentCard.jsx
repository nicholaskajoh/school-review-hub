import React from 'react';
import './CommentCard.css';
import TimeAgo from 'react-time-ago';
import 'react-time-ago/Tooltip.css';


const CommentCard = ({ comment }) => (
  <div className="box">
    <article className="media">

      <div className="media-content has-text-centered">
        <div className="content">
          <p className="has-text-weight-light">
            <em>{comment.comment}</em>
          </p>
        </div>
        <hr />
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item has-text-dark">
              <span className="icon is-small has-text-success">
                <i class="fa fa-thumbs-up"></i></span>
              &nbsp;{comment.upvotes}
            </a>
            <small className="media-right"><TimeAgo>{new Date(comment.created_at)}</TimeAgo></small>
          </div>
        </nav>
      </div>
    </article>
  </div>
);

export default CommentCard;
