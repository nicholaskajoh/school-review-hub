import React, { Component } from "react";
import Heading from "./Heading";
import Highlights from "./Highlights";
import Reviews from "./Reviews";
import Reports from "./Reports";
import "./School.css";
import APIHelper from "../../api-helpers.js";

class School extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: {},
      lowerRatedSchools: [],
      numLowerRatedSchools: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const schoolId = nextProps.match.params.id;
    this.getSchool(schoolId);
    this.getLowerRatedSchools(schoolId);
  }

  componentDidMount() {
    const schoolId = this.props.match.params.id;
    this.getSchool(schoolId);
    this.getLowerRatedSchools(schoolId);
  }

  getSchool(id) {
    this.api.get(`school/${id}`).then(res => {
      const school = res.data;
      this.setState({ school });
    });
  }

  getLowerRatedSchools(id) {
    this.api.get(`rated-higher-than/${id}`).then(res => {
      var lowerRatedSchools = res.data;
      const numLowerRatedSchools = lowerRatedSchools.length;
      lowerRatedSchools = lowerRatedSchools.slice(0, 3);
      this.setState({ lowerRatedSchools, numLowerRatedSchools });
    });
  }

  render() {
    return (
      <div>
        <Heading school={this.state.school} />

        <Highlights
          school={this.state.school}
          lowerRatedSchools={this.state.lowerRatedSchools}
          numLowerRatedSchools={this.state.numLowerRatedSchools}
        />
        <Reviews schoolId={this.props.match.params.id} />

        <Reports schoolId={this.props.match.params.id} />
      </div>
    );
  }
}

export default School;
