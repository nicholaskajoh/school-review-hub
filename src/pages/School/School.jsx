import React, { Component } from 'react';
import Heading from './Heading';
import Highlights from './Highlights';
import Reviews from './Reviews';
import Reports from './Reports';
import './School.css';
import { toast, ToastContainer } from 'react-toastify';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import ObjectNotFound from './../ObjectNotFound/ObjectNotFound';


class School extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: {},
      lowerRatedSchools: [],
      numLowerRatedSchools: 0,
      isLoaded: false,
      errorLoading: false,
      toastId: null,
      errors: [],
      notFound: false,
    };
    this.googleMapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;    
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const schoolId = this.props.match.params.id;
    if (!isNaN(Number(schoolId))) {
      this.getSchool(schoolId);
      this.getLowerRatedSchools(schoolId);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  componentDidMount() {
    const schoolId = this.props.match.params.id;
    if (!isNaN(Number(schoolId))) {
      this.getSchool(schoolId);
      this.getLowerRatedSchools(schoolId);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  async getSchool(id) {
    try {
      const res = await this.api.get(`school/${id}`);
      const school = res.data;
      this.setState({ school: school, errors: [], isLoaded: true, errorLoading: false });
    }
    catch (e) {
      let errors = errors_to_array(e);
      this.setState({ errors: errors, isLoaded: false, errorLoading: true });
      if (errors === 404) {
        this.setState({ notFound: true });
      }
      if (toast.isActive(this.state.toastId)) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async getLowerRatedSchools(id) {
    try {
      const res = await this.api.get(`rated-higher-than/${id}`);
      let lowerRatedSchools = res.data;
      const numLowerRatedSchools = lowerRatedSchools.length;
      lowerRatedSchools = lowerRatedSchools.slice(0, 3);
      this.setState({
        lowerRatedSchools: lowerRatedSchools,
        numLowerRatedSchools: numLowerRatedSchools, isLoaded: true, errorLoading:false
      });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false, errorLoading: true });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  render() {
    if (this.state.notFound) {
      return <ObjectNotFound object_model="School" />;
    }

    let rendering;
    if (this.state.isLoaded) {
      rendering =
        <div>
        <Heading school={this.state.school} google_api_key={this.googleMapAPIKey} />

          <Highlights
            school={this.state.school}
            lowerRatedSchools={this.state.lowerRatedSchools}
            numLowerRatedSchools={this.state.numLowerRatedSchools}
          />
          <Reviews schoolId={this.props.match.params.id} />

          <Reports schoolId={this.props.match.params.id} />
        </div >
    }
    else if (this.state.errorLoading) {
      rendering =
        <div className="has-text-centered">
        <br />
          <button title="Reload" className="reload-btn" onClick={this.componentDidMount}>retry</button>
        </div>
    }
    else {
      rendering =
        <div className="has-text-centered">
        <br />
          <button className="reload-btn loading">...</button>
        </div>
    }
    return (
      <div>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
        {rendering}
      </div>
    );
  }
}

export default School;
