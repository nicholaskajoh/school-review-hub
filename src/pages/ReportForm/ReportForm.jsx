import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './ReportForm.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import ObjectNotFound from './../ObjectNotFound/ObjectNotFound';


class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: [],
      content: '',
      submitting: false,
      isLoaded: false,
      errorLoading: false,
      notFound: false,
      errors:[]
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    if (!isNaN(Number(id))) {
      this.setState({ errorLoading: false });
      this.getSchool(id);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (!isNaN(Number(id))) {
      this.setState({ errorLoading: false });
      this.getSchool(id);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  async getSchool(id) {
    try
    {
      const res = await this.api.get(`school/${id}`);
      const school = res.data;
      this.setState({ school: school, isLoaded: true, errors: [], errorLoading: false });
    }
    catch (e)
    {
      let errors = errors_to_array(e);
      this.setState({ errors: errors, isLoaded: false, errorLoading:true });
      if (errors === 404) {
        this.setState({ notFound: true });
      }
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
    this.setState({ content: event.target.value, errors:[] });
  };

  handleSubmit = event => {
    const data = { content: this.state.content, school: this.state.school.id };
    this.submitReport(data);
    event.preventDefault();
  };

  async submitReport(data) {
    this.setState({ submitting: true });
    try
    {
      const res = await this.api.post('add-report', data, true);
      this.setState({ errors: [] });
      toast.info('Report published, redirecting...');
      let func = this.props.history;
      window.setTimeout(function(){
        func.push(`../report/${res.data['id']}`);
      }, 3500);
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), submitting:false });
      toast.error('An error occured');
    }
  }

  render() {
    if (this.state.notFound) {
      return <ObjectNotFound object_model="Publish Report on School" />;
    }

    let rendering;
    if (this.state.isLoaded)
    {
      rendering =
        <div className="section has-text-centered columns is-centered">
        <div className="column is-6">
          <p className="subtitle">
            You are about to publish a report on
            <b> {this.state.school.name}</b>
          </p>
          <br />
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="textarea"
              placeholder="Your Report"
              value={this.state.content}
              onChange={this.handleChange}
              required    
            />
            {this.state.errors.map((error, index) => (
              <p key={'report_form_error ' + index} className="help is-danger is-size-5">
                {error}
              </p>
            ))}
            <br/ >
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button type="submit" className="button is-danger" disabled={this.state.submitting}>
                  <i className="fa fa-microphone"></i>&nbsp;&nbsp;Publish
                </button>
              </p>
            </div>
          </form>
          <div className="gap-small"></div>
          <div className="gap-small"></div>
          
        </div>
      </div>
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
              <h1 className="title"><i className="fa fa-microphone" /> Publish Report</h1>
            </div>
          </div>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
        </section>
        <br />
        { rendering }
      </div>
    );
  }
}

export default ReportForm;
