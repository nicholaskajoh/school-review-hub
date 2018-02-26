import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIHelper from "../../api-helpers.js";


class Reports extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      reports: [],
      page: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getReports(nextProps.schoolId, 1);
  }

  componentDidMount() {
    this.getReports(this.props.schoolId, 1);
  }

  getReports(id, page) {
    this.api.get(`school/${id}/reports/${page}`).then(res => {
      const reports = res.data;
      this.hasPrevPage = res.headers["x-has-previous"].toLowerCase() === "true";
      this.hasNextPage = res.headers["x-has-next"].toLowerCase() === "true";
      this.setState({ reports, page });
    });
  }

  prevPage = () => {
    if (this.hasPrevPage) {
      this.getReports(this.props.schoolId, this.state.page - 1);
    }
  };

  nextPage = () => {
    if (this.hasNextPage) {
      this.getReports(this.props.schoolId, this.state.page + 1);
    }
  };

  render() {
    return (
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <i className="fa fa-users" /> Reports
              </h1>
            </div>
          </div>
        </section>
        <div className="columns is-centered">
          <section className=" column is-6 section">
            <Link
              to={`/add-report/${this.props.schoolId}`}
              className="button is-danger"
            >
              <span className="icon">
                <i className="fa fa-file-alt" />
              </span>
              <span>Publish Report on school</span>
            </Link>
            <br />
            <br />
            {this.state.reports.map(report => (
              <div className="card report">
                <header className="card-header">
                  <p className="card-header-title">
                    Last updated {new Date(report.updated_at).toDateString()}
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">{report.content}</div>
                </div>
                <footer className="card-footer">
                  <div className="card-footer-item">
                    <Link to={"/report/" + report.id}>Full report</Link>
                  </div>
                  <div className="card-footer-item">
                    Upvotes ({report.upvotes})
                  </div>
                  <div className="card-footer-item">
                    Comments ({report.comments_count})
                  </div>
                </footer>
              </div>
            ))}

            {this.state.reports.length === 0 ? (
              <p className="has-text-centered">No Reports yet!</p>
            ) : (
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
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Reports;
