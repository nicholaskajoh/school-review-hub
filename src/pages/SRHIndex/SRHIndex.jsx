import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SRHIndex.css";

class SRHIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      page: 1,
      showLoadingSpinner: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getSchools(1);
  }

  componentDidMount() {
    this.getSchools(1);
  }

  getSchools(page) {
    this.setState({ showLoadingSpinner: true });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/srh-index/${page}`)
      .then(res => {
        const schools = res.data;
        this.hasPrevPage =
          res.headers["x-has-previous"].toLowerCase() === "true";
        this.hasNextPage = res.headers["x-has-next"].toLowerCase() === "true";
        this.setState({ schools, page, showLoadingSpinner: false });
      });
  }

  prevPage = () => {
    if (this.hasPrevPage) {
      this.getSchools(this.state.page - 1);
    }
  };

  nextPage = () => {
    if (this.hasNextPage) {
      this.getSchools(this.state.page + 1);
    }
  };

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">SRH Index</h1>
              <h1 className="sub-title">School Review Hub Rankings</h1>
            </div>
          </div>
        </section>
        <div className="container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>
                  <i className="fa fa-trophy" /> Rank
                </th>
                <th>
                  <i className="fa fa-shield-alt" /> Crest
                </th>
                <th>
                  <i className="fa fa-graduation-cap" /> Name
                </th>
                <th>
                  <i className="fa fa-star" /> Rating
                </th>
                <th>
                  <i className="fa fa-users" /> Reviews
                </th>
                <th>
                  <i className="fa fa-comment-alt" /> Reports
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.schools.map((school, index) => (
                <tr key={index}>
                  <td>{school.rank}</td>
                  <td>
                    <img
                      className="image is-48x48"
                      src={school.logo_url}
                      alt={school.name + " logo"}
                    />
                  </td>
                  <td>
                    <Link to={"/school/" + school.id}>{school.name}</Link>
                  </td>
                  <td>{school.rating}</td>
                  <td>{school.reviews_count}</td>
                  <td>{school.reports_count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {this.state.showLoadingSpinner ? (
            <div className="has-text-centered">
              <i className="fa fa-spinner fa-spin fa-2x" />
            </div>
          ) : (
            ""
          )}

          <nav className="pagination">
            <button
              className="button is-link"
              onClick={this.prevPage}
              disabled={!this.hasPrevPage}
            >
              Previous
            </button>
            <button
              className="button is-link"
              onClick={this.nextPage}
              disabled={!this.hasNextPage}
            >
              Next
            </button>
          </nav>

          <br />
        </div>
      </div>
    );
  }
}

export default SRHIndex;
