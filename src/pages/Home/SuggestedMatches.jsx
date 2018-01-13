import React from 'react';
import PropTypes from 'prop-types';

export const SuggestedMatches = ({matches}) => {
  return (
    <div className="column">
      <p className="title has-text-centered"><i className="fa fa-flag"></i>  Suggested Matches</p>
      <div className="section">
      {
        matches.map((match, index) =>
          <div class="level" key={index}>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">{match.school1}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <span class="button is-danger">VS</span>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">{match.school2}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </div>

  );
};

SuggestedMatches.propTypes = {
  matches: PropTypes.array.isRequired
};
