import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./RatingForm.css";
import "../../assets/css/pretty-checkbox.min.css";
import "mdi/css/materialdesignicons.min.css";

class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: [],
      school1: {},
      school2: {},
      formData: {},
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getCriteria();
    this.getSchools(
      this.props.match.params.school1Id,
      this.props.match.params.school2Id
    );
  }

  getCriteria() {
    this.setState({ isLoaded: false });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/criteria`)
      .then(res => {
        const criteria = res.data;
        this.setState({ criteria, isLoaded: true });
      });
  }

  getSchools(school1Id, school2Id) {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${school1Id}`
        ),
        axios.get(
          `${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${school2Id}`
        )
      ])
      .then(
        axios.spread((res1, res2) => {
          const school1 = res1.data;
          const school2 = res2.data;
          this.setState({ school1, school2 });
        })
      );
  }

  handleChange = event => {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = event => {
    const schools = {
      school1_id: this.state.school1.id,
      school2_id: this.state.school2.id
    };
    let choices = [];
    Object.entries(this.state.formData).forEach(([key, value]) => {
      choices.push({
        criterion_id: key,
        choice: value
      });
    });
    const data = { schools, choices };
    this.submitRating(data);
    window.location.replace("/profile");
    event.preventDefault();
  };

  async submitRating(data) {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN_NAME}/api/rating`,
      data: qs.stringify({ data: JSON.stringify(data) }),
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`
      }
    });
  }

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Rate:{" "}
                <a className="subtitle">Select the school that best fits</a>
              </h1>
            </div>
          </div>
        </section>

        <br />
        <br />

        <div className="container">
          {this.state.isLoaded ? (
            <form onSubmit={this.handleSubmit}>
              {this.state.criteria.map((criterion, index) => (
                <article class="message is-info" key={index}>
                  <div class="message-header">
                    <p>{criterion.description}</p>
                  </div>
                  <div class="message-body">
                    <div className="control">
                      <div class="pretty p-default p-round">
                        <input
                          type="radio"
                          name={criterion.id}
                          value={this.state.school1.id}
                          onChange={this.handleChange}
                        />
                        <div class="state p-success-o">
                          <label>{this.state.school1.name}</label>
                        </div>
                      </div>

                      <br />
                      <br />
                      <div class="pretty p-default p-round">
                        <input
                          type="radio"
                          name={criterion.id}
                          value={this.state.school2.id}
                          onChange={this.handleChange}
                        />
                        <div class="state p-success-o">
                          <label>{this.state.school2.name}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="has-text-right buttons is-centered">
                <button
                  className="button is-large is-success"
                  type="submit"
                  disabled={
                    Object.keys(this.state.formData).length !==
                    this.state.criteria.length
                  }
                >
                  <i class="fa fa-star golden-star" aria-hidden="true" />&nbsp;
                  Submit Ratings
                </button>
              </div>
            </form>
          ) : (
            <div className="has-text-centered">
              <i className="fa fa-spinner fa-spin fa-2x" />
            </div>
          )}
        </div>

        <br />
        <br />
      </div>
    );
  }
}

export default RatingForm;
