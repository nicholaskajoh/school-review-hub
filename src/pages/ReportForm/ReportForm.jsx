import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
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
    this.setState({ content: event.target.value });
  };

  handleSubmit = event => {
    const data = { content: this.state.content, school: this.state.school.id };
    this.submitReport(data);
    event.preventDefault();
  };

  submitReport(data) {
    // this.setState({ toastId: toast("Publishing...", { autoClose: true }) });
    this.api.post("add-report", data, true)
      .then(res => {
        this.setState({ toastId: toast("Published", { autoClose: false }) });
        // this.setState({
        // toastId: toast.update(this.toastId, {
        //   render: "Done",
        //   type: toast.TYPE.SUCCESS,
        //   autoClose: 2000,
        //   className: css({
        //     transform: "rotateY(360deg)",
        //     transition: "transform 0.6s"
        //     })
        //   })
        // });
        window.location.replace(`../report/${res.data['id']}`);
      }).catch (e => {
        // this.setState({
        //   toastId: toast.update(this.toastId, {
        //     render: `Failed ${e.response.data.errors}`,
        //     type: toast.TYPE.ERROR,
        //     autoClose: 2000,
        //     className: css({
        //       transform: "rotateY(360deg)",
        //       transition: "transform 0.6s"
        //     })
        //   })
        // });
        this.setState({ toastId: toast(`Error: ${e.response.data.errors['content']}`, { autoClose: false }) });
      });
    }

    // try {
    //   await this.api.post("add-report", data, true);
    //   await this.setState({
    //     toastId: toast.update(this.toastId, {
    //       render: "Done",
    //       type: toast.TYPE.SUCCESS,
    //       autoClose: 2000,
    //       className: css({
    //         transform: "rotateY(360deg)",
    //         transition: "transform 0.6s"
    //       })
    //     })
    //   });
    // } catch (e) {
    //   await this.setState({
    //     toastId: toast.update(this.toastId, {
    //       render: `Failed ${e.response.data.errors}`,
    //       type: toast.TYPE.ERROR,
    //       autoClose: 2000,
    //       className: css({
    //         transform: "rotateY(360deg)",
    //         transition: "transform 0.6s"
    //       })
    //     })
    //   });
    // }

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Publish Report</h1>
            </div>
          </div>
          <ToastContainer />
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
