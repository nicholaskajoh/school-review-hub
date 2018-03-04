import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './ReportForm.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';


class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      school: [],
      content: '',
      isLoaded: false,
      errors:[]
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    this.getSchool(id);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getSchool(id);
    window.scrollTo(0, 0);
  }

  async getSchool(id) {
    try
    {
      const res = await this.api.get(`school/${id}`);
      const school = res.data;
      this.setState({ school:school, isLoaded:true, errors:[] });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded:false });
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
    try
    {
      const res = await this.api.post('add-report', data, true);

      toast.info('Report published, redirecting...');
      let func = this.props.history;
      window.setTimeout(function(){
        func.push(`../report/${res.data['id']}`);
      }, 3500);
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      toast.error('An error occured');
    }
  }

  render() {
    let rendering;
    if (this.state.isLoaded)
    {
      rendering =
        <div className="section columns is-centered">
        <div className="column is-6">
          <p>
            You are about to publish a Report on
            <b> {this.state.school.name}</b>
          </p>
          <br />
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="textarea"
              placeholder="Your Report"
              rows="10"
              value={this.state.content}
              onChange={this.handleChange}
              required    
            />
            {this.state.errors.map(error => (
              <p className="help is-danger is-size-5">
                {error}
              </p>
            ))}
            <br/ >
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button type="submit" className="button is-danger">
                  Publish
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    }
    else 
    {
        rendering = 
          <div title="Reload" className="has-text-centered">
          <button className="reload-btn" onClick={this.componentDidMount}>
            <i className="fa fa-redo-alt fa-2x" />
          </button>
          </div>     
    }

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Publish Report</h1>
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
