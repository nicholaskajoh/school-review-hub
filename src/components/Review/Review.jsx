import React from 'react';

const Review = () => {
  return (
    <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
            <div class="tile">
            <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-warning">
                <p class="title">Review Page</p>
                <p class="subtitle">Top tile</p>
                </article>
            </div>
            </div>
        </div>
    </div> 
  );
};

export default Review;
