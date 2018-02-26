import React, { Component } from "react";
import "./Report.css";
import CommentCard from "./../../partials/CommentCard/CommentCard";
import { ToastContainer, toast } from 'react-toastify';
import APIHelper, { errors_to_array } from "../../api-helpers.js";
import TimeAgo from 'react-time-ago';


class Report extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      report: [],
      school_name: "",
      school_id: "",
      comments: [],
      comment: "",
      isloading: ""
    };
    this.errors = [];
  }

  componentWillReceiveProps(nextProps) {
    const reportId = nextProps.match.params.id;
    this.getReport(reportId);
    this.getComments(reportId);
  }

  componentDidMount() {
    const reportId = this.props.match.params.id;
    this.getReport(reportId);
    this.getComments(reportId);
  }

  getReport(id) {
    this.api.get(`report/${id}`)
      .then(res => {
        const report = res.data;
        const school_name = res.data.school.name;
        const school_id = res.data.school.id;
        this.setState({ report });
        this.setState({ school_name });
        this.setState({ school_id });
        console.log(this.state.report.comments_count);
    });
  }

  getComments(id) {
    this.api.get(`report/${id}/comments/1`)
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
      });
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    const data = { 
      comment: this.state.comment,
      entity_id: this.state.report['id'],
      entity: 'report'
      };
    this.submitComment(data);
    event.preventDefault();
  };

  async submitComment(data) {
    // this.setState({ toastId: toast("Publishing...", { autoClose: true }) });
    try
    {
      await this.api.post("add-comment", data, true);
      await this.setState({ toastId: toast("Comment Added", { autoClose: true }) });
      // await this.setState({
      //   toastId: toast.update(this.toastId, {
      //     render: "Done",
      //     type: toast.TYPE.SUCCESS,
      //     autoClose: 2000,
      //     className: css({
      //       transform: "rotateY(360deg)",
      //       transition: "transform 0.6s"
      //     })
      //   })
      // });
      window.location.reload();
    }
    catch (e)
    {
      this.errors = errors_to_array(e);
      await this.setState({ toastId: toast(`Error: ${this.errors}`, { autoClose: true }) });
      // await this.setState({
      //   toastId: toast.update(this.toastId, {
      //     render: `Failed ${this.errors}`,
      //     type: toast.TYPE.ERROR,
      //     autoClose: 2000,
      //     className: css({
      //       transform: "rotateY(360deg)",
      //       transition: "transform 0.6s"
      //     })
      //   })
      // });
    }
  }

  handleClick = event => {
    const isLoading = "is-loading";
    this.setState({ isLoading });
  };

  handleUpvote = event => {
    this.upVote(this.state);
  };

  async upVote(data){
    try
    {
      await this.api.get(`upvote/${data.report['id']}/report`, true);
      await toast.info("Upvoted sucessfully");
    }
    catch (e)
    {
      this.errors = errors_to_array(e);
      toast.error("Error occured while upvoting");
    }
  }

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Report</h1>
            </div>
          </div>
          <ToastContainer />
        </section>
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column" />

              <div className="column is-half">
                <div className="content ">
                  <p className="title">
                      <a
                        className="has-text-black"
                        href={"/school/" + this.state.school_id}
                      >
                        {this.state.school_name} Report
                      </a>
                    <br />
                  </p>
                </div>
              </div>

              <div className="column" />
            </div>

            <div className="report-body">

              <div className="box">
                <div className="media-content">
                  <div className="content has-text-centered">
                    {/*<TimeAgo>{new Date(this.state.report.created_at) }</TimeAgo>*/}
                    <p className="report-content">"{this.state.report.content}"</p>
                  </div>
                  <div className="card-footer">
                  <div className="card-footer-item">Comments ({this.state.report.comments_count})</div>
                  <div className="card-footer-item">Upvotes ({this.state.report.upvotes})</div>
                  </div>
                  <div className="card-footer">
                  <div className="card-footer-item">
                    <button className="button is-danger is-small" onClick={this.handleUpvote}>Upvote Report</button>
                  </div>
                  </div>
                </div>
              </div>
              <div className="report-section">
                <h3 className="title">Your view?</h3>
                <p>
                  What's your opinion? Do you feel this report is rightly spoken?
                  Why not let others see the other side of the coin through your
                  perspective.
                </p>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea"
                        type="text"
                        value={this.state.content}
                        onChange={this.handleChange}
                        placeholder="Write a comment"
                        required
                      />
                    </div>
                    <p className="help is-danger is-size-5">
                      {this.errors}
                    </p>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                      <p className="control">
                        <button type="submit" className="button is-danger">
                          Post Comment
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
                <br />
                <h3 className="title">Comments:</h3>
                <br />
                {this.state.comments.map(comment => (
                  <CommentCard comment={comment} />
                ))}
              </div>

              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button
                    className={"button is-danger " + this.state.isLoading}
                    id="post-comment-btn"
                    onClick={this.handleClick}
                  >
                    Load more comment
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Report;
