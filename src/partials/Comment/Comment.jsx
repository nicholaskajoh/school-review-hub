import React from 'react';
import './Comment.css';

const Comment = () => (
  <div className="content">
    <div className="field">
      <p className="control">
        <textarea className="textarea" placeholder="Add a comment..."></textarea>
      </p>
    </div>
    <div className="field">
      <p className="control">
        <button className="button">Post comment</button>
      </p>
    </div>
  </div>
);

export default Comment;