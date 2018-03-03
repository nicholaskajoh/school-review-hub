import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SRHIndex.css';
import { toast, ToastContainer } from 'react-toastify';
import APIHelper, { errors_to_array } from '../../api-helpers.js';

class SRHIndex extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      schools: [],
      page: 1,
      isLoaded: false,
      toastId: null,
      errors: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getSchools(1);
  }

  componentDidMount() {
    this.getSchools(1);
    window.scrollTo(0, 0);
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
        isLoaded: true
      });
    } catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId)) {
        toast.update(this.state.toastId, {
          render: `${this.state.errors}`,
          type: toast.TYPE.ERROR
        });
      } else {
        this.setState({
          toastId: toast.error(`${this.state.errors}`)
        });
      }
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
    let rendering;
    if (this.state.isLoaded) {
      rendering = (
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
                {this.state.schools.map(school => (
                  <tr key={'srhindex_school ' + school.id}>
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
      );
    } else {
      rendering = (
        <div title="Reload" className="has-text-centered">
          <br />
          <button className="reload-btn" onClick={this.componentDidMount}>
            <i className="fa fa-redo-alt fa-2x" />
          </button>
          <br />
        </div>
      )
    }

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <i className="fa fa-list-alt" /> SRH Index
              </h1>
            </div>
          </div>
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.TOP_CENTER}
          />
        </section>

        <br />
        {rendering}
      </div>
    );
  }
}

export default SRHIndex;
