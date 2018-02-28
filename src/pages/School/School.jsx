import React, { Component } from 'react';
import Heading from './Heading';
import Highlights from './Highlights';
import Reviews from './Reviews';
import Reports from './Reports';
import './School.css';
import { toast, ToastContainer } from 'react-toastify';
import APIHelper, { errors_to_array } from '../../api-helpers.js';


class School extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: {},
      lowerRatedSchools: [],
      numLowerRatedSchools: 0,
      errors: []
    };
    this.toastId = toast();
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

  async getSchool(id) {
    try
    {
      const res = await this.api.get(`school/${id}`);
      const school = res.data;
      this.setState({ school:school });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      toast.update(
        this.toastId,
        {
          render: `Error: ${this.state.errors}`,
          type: toast.TYPE.ERROR,
        }
      );
    }
  }

  async getLowerRatedSchools(id) {
    try
    {
      const res = await this.api.get(`rated-higher-than/${id}`);
      let lowerRatedSchools = res.data;
      const numLowerRatedSchools = lowerRatedSchools.length;
      lowerRatedSchools = lowerRatedSchools.slice(0, 3);
      this.setState({ lowerRatedSchools:lowerRatedSchools, numLowerRatedSchools:numLowerRatedSchools });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      toast.update(
        this.toastId,
        {
          render: `Error: ${this.state.errors}`,
          type: toast.TYPE.ERROR,
        }
      );
    }
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
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
        <Reviews schoolId={this.props.match.params.id} />

        <Reports schoolId={this.props.match.params.id} />
      </div>
    );
  }
}

export default School;
