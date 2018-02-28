import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SRHIndex.css';
import { toast, ToastContainer } from 'react-toastify';
import { PacmanLoader } from 'react-spinners';
import APIHelper, { errors_to_array } from '../../api-helpers.js';

class SRHIndex extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      schools: [],
      page: 1,
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getSchools(1);
  }

  componentDidMount() {
    this.getSchools(1);
  }

  async getSchools(page) {
    this.setState({ loading: true });
    try {
      const res = await this.api.get(`srh-index/${page}`);
      const schools = res.data;
      this.hasPrevPage = res.headers['x-has-previous'].toLowerCase() === 'true';
      this.hasNextPage = res.headers['x-has-next'].toLowerCase() === 'true';
      this.setState({
        schools: schools,
        page: page,
        loading: false
      });
    } catch (e) {
      this.setState({ errors: errors_to_array(e) });
      toast.error(`Error: ${this.state.errors}`);
    }
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
            </div>
          </div>
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.TOP_CENTER}
          />
        </section>

        <br />

        <div className="container">
          <div className="container responsive-table">
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>
                    <i className="fa fa-trophy is-custom-yellow" /> Rank
                  </th>
                  <th>
                    <i className="fa fa-shield-alt is-custom-yellow" /> Crest
                  </th>
                  <th>
                    <i className="fa fa-graduation-cap is-custom-yellow" /> Name
                  </th>
                  <th>
                    <i className="fa fa-star is-custom-yellow" /> Rating
                  </th>
                  <th>
                    <i className="fa fa-users is-custom-yellow" /> Reviews
                  </th>
                  <th>
                    <i className="fa fa-comment-alt is-custom-yellow" /> Reports
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.schools.map((school, index) => (
                  <tr key={index}>
                    <td>{school.rank}</td>
                    <td>
                      <img
                        className="image is-48x48 rounded-img"
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
          </div>
          <div class="is-centered">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <PacmanLoader color={"#FF3860"} loading={this.state.loading} />
            </div>
          </div>

          <br />
          <br />

          <nav className="pagination">
            <button
              className="button is-small is-transparent"
              onClick={this.prevPage}
              disabled={!this.hasPrevPage}
            >
              <i className="fa fa-arrow-circle-left" aria-hidden="true" />&nbsp;
              Previous
            </button>
            <button
              className="button is-small is-transparent"
              onClick={this.nextPage}
              disabled={!this.hasNextPage}
            >
              Next &nbsp;&nbsp;&nbsp;<i
                className="fa fa-arrow-circle-right"
                aria-hidden="true"
              />
            </button>
          </nav>

          <br />
        </div>
      </div>
    );
  }
}

export default SRHIndex;
