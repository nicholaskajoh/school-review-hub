import React from "react";
import "./CommentCard.css";

const CommentCard = ({ comment }) => (
  <div className="box">
    <div className="media-content">
      <div className="content">
        <p>On {new Date(comment.created_at).toDateString()}</p>
        <p>{comment.comment}</p>
      </div>
      <div className="card-footer-item">Upvotes ({comment.upvotes})</div>
    </div>
  </div>
);

export default CommentCard;
