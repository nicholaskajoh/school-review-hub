import React from 'react';
import { Link } from 'react-router-dom';


const TopSchools = ({ schools, isLoaded, errorLoading, spinner, onreload }) => {
  let rendering;
  if (isLoaded) {
    rendering = (
      schools.map((school, index) => (
        <div className="column is-3 has-text-centered" key={index}>
          <div className="box top-school-box">
            <img
              className="box-image image is-96x96"
              src={school.logo_url}
              alt={school.name + " logo"}
            />

            <div className="content has-text-centered">
              <h3 className="subtitle has-text-weight-semibold is-6 ">
                <Link to={"/school/" + school.id}>{school.name}</Link>
              </h3>
            </div>

            <div className="school-stat-tags">
              <div className="bottom-pegged-display is-centered">
                <span className="tag" title="Rank">
                  <a className="has-text-white">{school.rank}</a>
                  &nbsp;
                  <i className="fa fa-trophy has-text-warning" />
                </span>

                <span className="tag" title="Rank">
                  <a className="has-text-white">{school.rating}</a>
                  &nbsp;
                  <i className="fa fa-star has-text-info" />
                </span>

                <span className="tag" title="Rank">
                  <a className="has-text-white">
                    {school.reviews_count}
                  </a>
                  &nbsp;
                  <i className="fa fa-user has-text-success" />
                </span>

                <span className="tag" title="Rank">
                  <a className="has-text-white">
                    {school.reports_count}
                  </a>
                  &nbsp;
                  <i className="fa fa-comment-alt has-text-danger" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))
    )
  }
  else
  {
    rendering = (
      <div title="Reload" className="has-text-centered">
        <button disabled={errorLoading === false} >
          <i className={"fa " + spinner + " fa-2x"} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h1 className="title">
            <i className="fa fa-trophy has-text-danger" /> Top Schools
          </h1>
          <hr />
          <br />
          <div className="columns is-multiline">
          {rendering}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopSchools;
