import React from 'react';
import { Link } from 'react-router-dom';

const TopSchools = ({ schools }) => {
  return (
    <div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h1 className="title">
            <i className="fa fa-trophy"></i> Top Schools
          </h1>

          {schools.map((school, index) =>
            <div className="box" key={index}>
              <article className="media">
                <figure className="media-left">
                  <p className="image is-48x48">
                    <img src={school.logo_url} alt={school.name + " logo"}/>
                  </p>
                </figure>

                <div className="media-content">
                  <div className="content">
                    <h2 className="title">
                      <Link to={"/school/" + school.id}>{school.name}</Link>
                    </h2>

                    <p className="school-stat-tags">
                      <span className="tag is-warning is-rounded" title="Rank">
                        <i className="fa fa-trophy"></i> &nbsp; {school.rank}
                      </span>
                      <span className="tag is-info is-rounded" title="Rating">
                        <i className="fa fa-star"></i> &nbsp; {school.rating}
                      </span>
                      <span className="tag is-success is-rounded" title="Reviews">
                        <i className="fa fa-user"></i> &nbsp; {school.reviews_count}
                      </span>
                      <span className="tag is-danger is-rounded" title="Reports">
                        <i className="fa fa-comment-alt"></i> &nbsp; {school.reports_count}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>
  	</div>
  );
};

export default TopSchools;
