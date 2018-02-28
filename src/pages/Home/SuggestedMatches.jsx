import React from 'react';
import { Link } from 'react-router-dom';


const SuggestedMatches = ({ matches, isLoaded, errorLoading, onreload }) => {
  let rendering;
  if (isLoaded && !errorLoading) {
    rendering = (
      matches.map((match, index) => (
        <div className="box">
          <div className="columns has-text-centered">
            <div className="column is-5">
              <div>
                <h4 className="subtitle">{match.school1}</h4>
              </div>
            </div>
            <div className="column is-2">
              <span
                className="tag is-link is-rounded"
                style={{ marginBottom: 10 }}
              >
                vs
              </span>
              <br />
              <Link
                className="button is-success is-small"
                to={"/rate/" + match.school1_id + "/" + match.school2_id}
              >
                Rate
              </Link>
            </div>
            <div className="column is-5">
              <div>
                <h4 className="subtitle">{match.school2}</h4>
              </div>
            </div>
          </div>
        </div>
      ))
    )
  } else if (errorLoading) {
    rendering = (
      <div title="reload" className="has-text-centered">
      <button onClick={onreload}>
        <i className="fa fa-redo-alt fa-2x" />
      </button>
      </div>
    )
  }
  else {
    rendering = (
      <div className="has-text-centered">
          <i className="fa fa-spinner fa-spin fa-2x" />
      </div>
    )
  }
    
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <h1 className="title">
          <i className="fa fa-flag has-text-danger" /> Suggested matches
        </h1>
        <hr />
        <br />
        {rendering}
      </div>
    </section>
  );
};

export default SuggestedMatches;
