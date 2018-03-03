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
  }

  async getReports(id, page) {
    try
    {
      const res = await this.api.get(`school/${id}/reports/${page}`);
      const reports = res.data;
      this.hasPrevPage = res.headers['x-has-previous'].toLowerCase() === 'true';
      this.hasNextPage = res.headers['x-has-next'].toLowerCase() === 'true';
      this.setState({ reports:reports, page:page, isLoaded:true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded:false });
      if (toast.isActive(this.state.toastId))
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured while loading reports',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured while loading reports')
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
    if (this.state.isLoaded)
    {
      rendering = 
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
          <div key={'school_report ' + report.id} className="card report">
            <header className="card-header">
              <p className="card-header-title">
                <strong><TimeAgo>{new Date(report.created_at)}</TimeAgo></strong>
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
        <br />
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
    }
    else 
    {
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
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <i className="fa fa-users" /> Reports
              </h1>
            </div>
          </div>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
        </section>
        { rendering }
      </div>
    );
  }
}

export default Reports;
