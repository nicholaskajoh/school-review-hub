import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { css } from "glamor";
import "./ReviewForm.css";
import APIHelper, { error_to_string } from "../../api-helpers.js";


class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: [],
      content: "",
      toastId: null
    };
    this.errors = [];
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
    this.submitReview(data);
    event.preventDefault();
  };

  async submitReview(data) {
    // this.setState({ toastId: toast("Publishing...", { autoClose: true }) });
    try
    {
      const res = await this.api.post("add-review", data, true);
      await this.setState({ toastId: toast("Published", { autoClose: false }) });
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
      window.location.replace(`../review/${res.data['id']}`);
    }
    catch (e)
    {
      this.errors = error_to_string(e);
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

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Publish Review</h1>
            </div>
          </div>
          <ToastContainer />
        </section>
        <div className="section columns is-centered">
          <div className="column is-6">
            <p>
              You are about to publish a review on
              <b> {this.state.school.name}</b>
            </p>
            <br />
            <form onSubmit={this.handleSubmit}>
              <textarea
                className="textarea"
                placeholder="Your Review"
                rows="10"
                value={this.state.content}
                onChange={this.handleChange}
                required
              />
              <p className="help is-danger is-size-5">
                {this.errors}
              </p>
              <br/ >
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

export default ReviewForm;
