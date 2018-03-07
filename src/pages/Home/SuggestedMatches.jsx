import React from "react";
import { Link } from "react-router-dom";

const SuggestedMatches = ({
  matches,
  isLoaded,
  errorLoading,
  spinner,
  reload
}) => {
  let rendering;
  if (isLoaded) {
    rendering =
      <div className="columns is-multiline">

        {matches.map((match, index) => (
          <div className="column is-4">

            <div key={'match ' + index} className="box has-text-centered">
              <div>
                <h4 className="subtitle">{match.school1}</h4>
                <br />

                <h3 className="title">vs</h3>
                <br />

                <h4 className="subtitle">{match.school2}</h4>

                <hr />
                <Link
                  className="button is-success is-medium"
                  to={"/rate/" + match.school1_id + "/" + match.school2_id}>
                  <i className="fa fa-star  golden-star" />&nbsp;Rate
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>

  } else {
    rendering = (
      <div title="Reload" className="has-text-centered">
        <button
          className="reload-btn"
          disabled={errorLoading === false}
          onClick={reload}
        >
          <i className={"fa " + spinner + " fa-2x"} />
        </button>
      </div>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <h1 className="title">
          <i className="fa fa-flag" /> Suggested matches
        </h1>
        <hr />
        <br />
        {rendering}
      </div>
    </section>
  );
};

export default SuggestedMatches;
