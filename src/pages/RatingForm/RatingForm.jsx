import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs';
import './RatingForm.css';
import '../../assets/css/pretty-checkbox.min.css';
import 'mdi/css/materialdesignicons.min.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import ObjectNotFound from './../ObjectNotFound/ObjectNotFound';


class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      criteria: [],
      school1: {},
      school2: {},
      formData: {},
      submitting: false,
      isLoaded: false,
      errorLoading: false,
      notFound:false,
      toastId: null,
      errors: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const id1 = this.props.match.params.school1Id;
    const id2 = this.props.match.params.school2Id;
    if ( !isNaN(Number(id1)) && !isNaN(Number(id2)) ) {
      this.setState({ errorLoading: false });
      this.getCriteria();
      this.getSchools(id1, id2);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  async getCriteria() {
    try
    {
      const res = await this.api.get('criteria');
      const criteria = res.data;
      this.setState({ criteria:criteria, isLoaded: true, errors:[], errorLoading:false });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded: false, errorLoading: true });
      if (toast.isActive(this.state.toastId))
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async getSchools(school1Id, school2Id) {
    try
    {
      const res1 = this.api.get(`school/${school1Id}`);
      const res2 = this.api.get(`school/${school2Id}`);

      const [res3, res4] = await Promise.all([res1, res2]);
      this.setState({ school1: res3.data, school2: res4.data, errors: [], errorLoading: false  });      
    }
    catch (e)
    {
      let errors = errors_to_array(e);
      this.setState({ errors: errors, isLoaded: false, errorLoading: true });
      if (errors === 404) {
        this.setState({ notFound: true });
      }

      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async submitRating(data) {
    this.setState({ submitting: true });
    try
    {
      await this.api.post(
        'rating',
        qs.stringify({ data: JSON.stringify(data) }),
        true
      );
      this.setState({ errors: [] });
      toast.info('Rating submitted. Redirecting to profile...');
      let func = this.props.history;
      window.setTimeout(function(){
        func.push('/profile');
      }, 3500);
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), submitting: false });
      if (toast.isActive(this.state.toastId))
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  handleChange = event => {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState({ formData:formData });
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
    event.preventDefault();
  };

  removeCriterion(id)
  {
    let criteria = this.state.criteria;
    let index = -1;
    for (let i = 0; i < criteria.length; i++) {
      if (id === criteria[i]['id']){
        index = i;
        break;
      }      
    }
    let formData = this.state.formData;
    delete formData[id];
    criteria.splice(index, 1);

    if (criteria.length <= 0) {
      this.setState({ submitting: true });
    }

    this.setState({ criteria: criteria, formData: formData})
  }

  render() {
    if (this.state.notFound) {
      return <ObjectNotFound object_model="Matching School" />;
    }

    let rendering;
    if (this.state.isLoaded)
    {
      rendering = (
        <form onSubmit={this.handleSubmit}>
          <div className="notification is-default">
            You do not have to select all the criteria
                </div>
          {this.state.criteria.map(criterion => (
            <article className="message is-info" key={'criterion ' + criterion.id}>
              <div className="message-header">
                <p>{criterion.description}</p>
                <button title="remove this criterion" type="button" className="delete"
                onClick={(e) => this.removeCriterion(criterion.id)}
                >
                </button>
              </div>
              <div className="message-body">
                <div className="control">
                  <div className="pretty p-default p-round">
                    <input
                      type="radio"
                      name={criterion.id}
                      value={this.state.school1.id}
                      onChange={this.handleChange}
                    />
                    <div className="state p-success-o">
                      <label>{this.state.school1.name}</label>
                    </div>
                  </div>

                  <br />
                  <br />
                  <div className="pretty p-default p-round">
                    <input
                      type="radio"
                      name={criterion.id}
                      value={this.state.school2.id}
                      onChange={this.handleChange}
                    />
                    <div className="state p-success-o">
                      <label>{this.state.school2.name}</label>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {this.state.errors.map((error, index) => (
            <p key={'rating_form_error ' + index} className="help has-text-centered is-danger is-size-5">
                {error}
            </p>
          ))}
          <div className="has-text-right buttons is-centered">
                <button
                  className="button is-large is-success"
                  type="submit"
                  // disabled={
                  //   Object.keys(this.state.formData).length !==
                  //   this.state.criteria.length
                  // }
                  disabled={this.state.submitting}
                >
                  <i className="fa fa-star golden-star" aria-hidden="true" />&nbsp;
                  Submit Ratings
                </button>
              </div>
          </form>
        )
    }
    else if (this.state.errorLoading) {
      rendering =
        <div className="has-text-centered">
          <button title="Reload" className="reload-btn" onClick={this.componentDidMount}>retry</button>
        </div>
    }
    else {
      rendering =
        <div className="has-text-centered">
          <button className="reload-btn loading">...</button>
        </div>
    }

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Rate: <span className="subtitle">Select the school that best fits criteria that you know about</span>
              </h1>
            </div>
          </div>
        </section>
        <br />
        <br />

        <div className="container">
          {rendering}
        </div>

        <br />
        <br />
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
      </div>
    );
  }
}

export default RatingForm;
