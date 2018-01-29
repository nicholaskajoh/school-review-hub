import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import './Match.css';


class Match extends Component{
  constructor(props) {
    super(props);
		this.state = {
      schools: [],
      school1_id: "",
      school2_id: "",
      isSelected: false
		};
	}
	componentDidMount() {
		this.getSchools();
	}

	getSchools() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/schools-list`)
      .then(res => {
        const schools = res.data;
        this.setState({schools});
      });
  }
  
  handleChange = (event) => {
    this.setState({
      school1_id: event.target.school1_id,
      school2_id: event.target.school2_id
    });
  }

  handleSubmit = (event) => {
    this.setState({isSelected: true});
    event.preventDefault();
  }


  render(){

    if(this.state.isSelected) {
      return <Redirect to={"/rate/" + this.state.school1_id + "/" + this.state.school2_id} push={true}/>
    }


    var {schools} = this.state;
    return(
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Match and Rate
              </h1>
            </div>
          </div>
        </section>
        <div className="section match-section">
          <h1 className="title has-text-centered">Match 2 schools and rate them</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="columns is-centered">
              <div className="column is-narrow">
                <div clasNames="field">
                  <div className="control">
                    <div className="select is-rounded is-large">
                      <select value={this.state.school1_id} onChange={this.handleChange}>
                        <option>Select School</option>
                        <option value="svdsfs">Me</option>                        
                        {schools.map((school, i) => {
                            return <option value={school.id} key={i}>{school.name}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <a type="submit" class="button is-danger is-large" disabled={this.state.school1_id === "" || this.state.school2_id === ""}>Rate</a>
              </div>
              <div className="column is-narrow">
                <div clasNames="field">
                  <div className="control">
                    <div className="select is-rounded is-large">
                      <select value={this.state.school2_id} onChange={this.handleChange}>
                        <option>Select School</option>
                        <option value="svdsfs">Me</option>                        
                        {schools.map((school, i) => {
                            return <option value={school.id} key={i}>{school.name}</option>
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
    );
  }
}

export default Match;
