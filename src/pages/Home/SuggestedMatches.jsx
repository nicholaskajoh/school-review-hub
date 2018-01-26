import React from 'react';
import { Link } from 'react-router-dom';

const SuggestedMatches = ({ matches }) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          <i className="fa fa-flag"></i> Suggested matches
        </h1>


        {matches.map((match, index) =>
          <div className="box">
            <div className="columns has-text-centered">
              <div className="column is-5">
                <div>
                  <h4 className="subtitle">{match.school1}</h4>
                </div>
              </div>
              <div className="column is-2">
                <span className="tag is-link is-rounded" style={{marginBottom: 10}}>vs</span>
                <br/>
                <Link className="button is-success is-small" to={"/rate/" + match.school1_id + "/" + match.school2_id}>Rate</Link>
              </div>
              <div className="column is-5">
                <div>
                  <h4 className="subtitle">{match.school2}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuggestedMatches;