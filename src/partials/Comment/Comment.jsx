import React from 'react';
import './Comment.css';

const Comment = () => (
  <div className="content">
    <div className="field is-grouped is-centered">
      <p className="control is-expanded">
        <textarea className="textarea" placeholder="What do you feel?"></textarea>
      </p>

      <p className="control">
        <button className="button is-danger">
          <i className="fa fa-comment" aria-hidden="true"></i>&nbsp;Post comment</button>
      </p>
    </div>
    <div className="field">

    </div>
  </div>
);

export default Comment;