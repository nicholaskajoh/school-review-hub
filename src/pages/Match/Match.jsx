import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./Match.css";
import APIHelper from "../../api-helpers.js";

class Match extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
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
    this.api.get('schools-list')
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
    if (this.state.school1_id === this.state.school2_id) {
      toast.error("You can't match a school against itself!");
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
        <div className="section match-section">
          <div className="container">
            <h1 className="title has-text-centered">
              Match two schools and rate them...
            </h1>

            <form onSubmit={this.handleSubmit}>
              <div className="columns is-centered">
                <div className="column is-narrow">
                  <div className="field">
                    <div className="control">
                      <div className="select is-rounded is-fullwidth is-medium">
                        <select
                          name="school1_id"
                          value={this.state.school1_id}
                          onChange={this.handleChange}
                          className="fixed-width-select-box"
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
                    className="button is-danger is-medium"
                    disabled={
                      this.state.school1_id === "" ||
                      this.state.school2_id === ""
                    }
                  >
                    Rate
                  </button>
                </div>

                <div className="column is-narrow">
                  <div className="field has-addons">
                    <div className="control">
                      <div className="select is-rounded is-fullwidth is-medium">
                        <select
                          name="school2_id"
                          value={this.state.school2_id}
                          onChange={this.handleChange}
                          className="fixed-width-select-box"
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
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
