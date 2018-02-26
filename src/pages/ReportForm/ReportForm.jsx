import React, { Component } from "react";
import { toast } from "react-toastify";
import { css } from "glamor";
import "./ReportForm.css";
import APIHelper from "../../api-helpers.js";

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: [],
      content: "",
      toastId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    this.getSchool(id);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getSchool(id);
  }

  getSchool(id) {
    this.api.get(`school/${id}`).then(res => {
      const school = res.data;
      this.setState({ school });
    });
  }

  handleChange = event => {
    this.setState({ content: event.target.content });
  };

  handleSubmit = event => {
    const data = { content: this.state.content, school_id: this.props.id };

    this.submitReport(data);
    window.location.replace("/profile");
    event.preventDefault();
  };

  async submitReport(data) {
    this.setState({ toastId: toast("Publishing......", { autoClose: false }) });
    try {
      await this.api.post("report", data, true);
      await this.setState({
        toastId: toast.update(this.toastId, {
          render: "Done",
          type: toast.TYPE.INFO,
          autoClose: 2000,
          className: css({
            transform: "rotateY(360deg)",
            transition: "transform 0.6s"
          })
        })
      });
    } catch (e) {
      await this.setState({
        toastId: toast.update(this.toastId, {
          render: "Failed",
          type: toast.TYPE.INFO,
          autoClose: 2000,
          className: css({
            transform: "rotateY(360deg)",
            transition: "transform 0.6s"
          })
        })
      });
    }
  }

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Publish Report</h1>
            </div>
          </div>
        </section>
        <div className="section columns is-centered">
          <div className="column is-6">
            <p>
              You are about to publish a Report on
              <b> {this.state.school.name}</b>
            </p>
            <br />
            <br />
            <form onSubmit={this.handleSubmit}>
              <textarea
                className="textarea"
                placeholder="Your Report"
                rows="10"
                value={this.state.content}
                onChange={this.handleChange}
                required
              />
              <button type="submit" className="button is-danger">
                Publish
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportForm;
