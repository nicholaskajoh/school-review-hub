import React from 'react';
import './CommentCard.css';
import TimeAgo from 'react-time-ago';
import 'react-time-ago/Tooltip.css';


const CommentCard = ({ comment }) => (
  <div className="box">
    <div className="media-content">
      <div className="content has-text-centered">        
        <p>{comment.comment}</p>
      </div>
      <div className="card-footer">
	      <div className="card-footer-item">Upvotes ({comment.upvotes})</div>
	      <div className="card-footer-item">
        <strong>
        <TimeAgo>{new Date(comment.created_at) }</TimeAgo>
        </strong>
        </div>
	  </div>
    </div>
  </div>
);

export default CommentCard;
