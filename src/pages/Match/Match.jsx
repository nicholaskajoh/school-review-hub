import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Match.css";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      school1_id: "",
      school2_id: "",
      hasSelectedSchools: false
    };
  }
  componentDidMount() {
    this.getSchools();
  }

  getSchools() {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/schools-list`)
      .then(res => {
        const schools = res.data;
        this.setState({ schools });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    if (this.state.school1_id == this.state.school2_id) {
      alert("You can't match a school against itself!");
    } else {
      this.setState({ hasSelectedSchools: true });
    }
    event.preventDefault();
  };

  render() {
    if (this.state.hasSelectedSchools) {
      return (
        <Redirect
          to={"/rate/" + this.state.school1_id + "/" + this.state.school2_id}
          push={true}
        />
      );
    }

    const { schools } = this.state;

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Match and Rate</h1>
            </div>
          </div>
        </section>

        <div className="section match-section">
          <div className="container">
            <h1 className="title has-text-centered">
              Match two schools and rate them...
            </h1>

            <form onSubmit={this.handleSubmit}>
              <div className="columns is-centered">
                <div className="column is-narrow">
                  <div clasNames="field">
                    <div className="control">
                      <div className="select is-rounded is-large">
                        <select
                          name="school1_id"
                          value={this.state.school1_id}
                          onChange={this.handleChange}
                        >
                          <option value="">Select School</option>
                          {schools.map((school, i) => {
                            return (
                              <option value={school.id} key={i}>
                                {school.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-narrow">
                  <button
                    type="submit"
                    class="button is-danger is-large"
                    disabled={
                      this.state.school1_id === "" ||
                      this.state.school2_id === ""
                    }
                  >
                    Rate
                  </button>
                </div>
                <div className="column is-narrow">
                  <div clasNames="field">
                    <div className="control">
                      <div className="select is-rounded is-large">
                        <select
                          name="school2_id"
                          value={this.state.school2_id}
                          onChange={this.handleChange}
                        >
                          <option value="">Select School</option>
                          {schools.map((school, i) => {
                            return (
                              <option value={school.id} key={i}>
                                {school.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
