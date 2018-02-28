import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs';
import './RatingForm.css';
import '../../assets/css/pretty-checkbox.min.css';
import 'mdi/css/materialdesignicons.min.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';


class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      criteria: [],
      school1: {},
      school2: {},
      formData: {},
      isLoaded: false,
      toastId: null,
      errors: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getCriteria();
    this.getSchools(
      this.props.match.params.school1Id,
      this.props.match.params.school2Id
    );
  }

  async getCriteria() {
    try
    {
      const res = await this.api.get('criteria');
      const criteria = res.data;
      this.setState({ criteria:criteria, isLoaded: true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId))
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured')
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
      this.setState({ school1:res3.data, school2:res4.data });      
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured')
        });
      }
    }
  }

  async submitRating(data) {
    try
    {
      await this.api.post(
        'rating',
        qs.stringify({ data: JSON.stringify(data) }),
        true
      );
      toast.info('Rating submitted. Redirecting to profile...');
      let func = this.props.history;
      window.setTimeout(function(){
        func.push('/profile');
      }, 3500);
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured')
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

  render() {
    let rendering;
    if (this.state.isLoaded)
    {
      rendering = (
        <form onSubmit={this.handleSubmit}>
          {this.state.criteria.map((criterion, index) => (
            <article className="message is-info" key={index}>
              <div className="message-header">
                <p>{criterion.description}</p>
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
          <div className="has-text-right buttons is-centered">
                <button
                  className="button is-large is-success"
                  type="submit"
                  disabled={
                    Object.keys(this.state.formData).length !==
                    this.state.criteria.length
                  }
                >
                  <i className="fa fa-star golden-star" aria-hidden="true" />&nbsp;
                  Submit Ratings
                </button>
              </div>
          </form>
        )
    }
    // else if (this.state.errors.length > 0)
    // {
    //   rendering = (
    //     <div title="Reload" className="has-text-centered">
    //       <button onClick={this.componentDidMount}>
    //         <i className={"fa fa-redo-alt fa-2x"} />
    //       </button>
    //     </div>
    //   )
    // }
    else 
    {
      // if (this.state.errors.length > 0)
      // {
        rendering = 
          <div title="Reload" className="has-text-centered">
          <button onClick={this.componentDidMount}>
            <i className={"fa fa-redo-alt fa-2x"} />
          </button>
          </div>  
      // }
      // else
      // {
      //   rendering = 
      //   <div className="has-text-centered">
      //     <i className="fa fa-spinner fa-spin fa-2x" />
      //   </div>
      // }      
    }
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Rate:
                <a className="subtitle">Select the school that best fits</a>
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
