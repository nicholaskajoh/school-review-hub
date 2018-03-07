import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import TimeAgo from 'react-time-ago';


class Reports extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      reports: [],
      page: 1,
      isLoaded: false,
      toastId: null,
      errors: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getReports(nextProps.schoolId, 1);
  }

  componentDidMount() {
    this.getReports(this.props.schoolId, 1);
    window.scrollTo(0, 0);
  }

  async getReports(id, page) {
    try {
      const res = await this.api.get(`school/${id}/reports/${page}`);
      const reports = res.data;
      this.hasPrevPage = res.headers['x-has-previous'].toLowerCase() === 'true';
      this.hasNextPage = res.headers['x-has-next'].toLowerCase() === 'true';
      this.setState({ reports: reports, page: page, isLoaded: true });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId)) {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured while loading reports',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error('An error occured while loading reports')
        });
      }
    }
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
    let rendering;
    if (this.state.isLoaded) {
      rendering =
        <div className="section">
          <div className="columns is-multiline">
            {this.state.reports.map(report => (
            <div className="column is-4" key={'school_report ' + report.id}>

                <div className="box">
                  <article className="media">

                    <div className="media-content">
                      <div className="content">
                          <p>
                            <strong>Anonymous</strong> <small>@anonymous</small>
                          </p>
                          <p>
                            <strong>
                              "{report.content.substring(0, 150).trim() +
                                (report.content.length > 150 ?
                                  ('...') : ('')
                                )
                              }"
                            </strong>
                            <br />
                            <small><em><Link to={"/report/" + report.id}>Read more</Link></em></small>
                          </p>
                        </div>
                        <hr />
                      <nav className="level is-mobile">
                        <div className="level-left">
                          <a className="level-item has-text-dark">
                          <span className="icon is-small has-text-success" title="upvotes">
                              <i className="fa fa-thumbs-up"></i></span>
                            &nbsp;{report.upvotes}
                          </a>

                          &nbsp;&nbsp;
                          <a className="level-item has-text-dark">
                          <span className="icon is-small has-text-warning" title="comments">
                            <i className="fas fa-comment"></i>
                            </span>
                            &nbsp;{report.comments_count}
                          </a>
                        </div>
                        <div className="level-right">
                          <small className="media-right"><TimeAgo>{new Date(report.created_at)}</TimeAgo></small>
                        </div>
                      </nav>
                    </div>
                  </article>
                </div>

              </div>
            ))}
          </div>

          {
            this.state.reports.length === 0 ? (
              <div className="has-text-centered">
                <i className="fas fa-flag-checkered has-text-light fa-5x"></i>
                <br /><br />
                <h1 className="subtitle">No Reports yet!</h1>
              </div>
            ) : (
                <div>
                  <br />
                  <nav className="pagination">
                    <button
                      className="button is-default"
                      onClick={this.prevPage}
                      disabled={!this.hasPrevPage}
                    >
                      <i className="fas fa-arrow-left"></i>&nbsp;Previous
            </button>
                    <button
                      className="button is-default"
                      onClick={this.nextPage}
                      disabled={!this.hasNextPage}
                    >
                      Next &nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </nav>
                </div>
              )}

        </div>
    }
    else {
      rendering =
        <div title="Reload reports" className="has-text-centered">
          <br />
          <button className="reload-btn" onClick={this.componentDidMount}>
            <i className="fa fa-redo-alt fa-2x" />
          </button>
          <br />
        </div>
    }

    return (
      <div>
        <section className="hero is-light star-pattern">
          <div className="hero-body">
            <div className="container">

              <article className="media">
                <div className="media-left">
                  <h1 className="title">
                    <i className="fa fa-users" /> Reports
                </h1>
                </div>

                <div className="media-content"></div>

                <div className="media-right">
                  <Link
                    to={`/add-report/${this.props.schoolId}`}
                    className="button is-danger"
                  >
                    <span className="icon">
                      <i className="fa fa-microphone" />
                    </span>
                    <span>Publish Report</span>
                  </Link>
                </div>
              </article>

            </div>
          </div>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
        </section>
        {rendering}

        <div className="gap-small"></div>
      </div>

    );
  }
}

export default Reports;
