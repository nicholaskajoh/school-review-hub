import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './RatingForm.css';

class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: [],
      school1: {},
      school2: {},
      formData: {}
    }
  }

  componentDidMount() {
    this.getCriteria();
    this.getSchools(this.props.match.params.school1Id, this.props.match.params.school2Id);
  }

  getCriteria() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/criteria`)
      .then(res => {
        const criteria = res.data;
        this.setState({criteria});
      });
  }

  getSchools(school1Id, school2Id) {
    axios.all([
      axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${school1Id}`),
      axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${school2Id}`)
    ])
    .then(axios.spread((res1, res2) => {
      const school1 = res1.data;
      const school2 = res2.data;
      this.setState({school1, school2});
    }));
  }

  handleChange = (event) => {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  }

  handleSubmit = (event) => {
    const schools = {
      "school1_id": this.state.school1.id,
      "school2_id": this.state.school2.id
    }
    let choices = [];
    Object.entries(this.state.formData).forEach(([key, value]) =>{
      choices.push({
        "criterion_id": key,
        "choice": value
      });
    });
    const data = {schools, choices};
    this.submitRating(data);
    window.location.replace("/profile");
    event.preventDefault();
  }

  async submitRating(data) {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN_NAME}/api/rating`,
      data: qs.stringify({data: JSON.stringify(data)}),
      headers: {
        "Authorization": `Token ${localStorage.getItem("authToken")}`
      }
    });
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.state.criteria.map((criterion, index) =>
              <div className="box" key={index}>
                <h4 className="subtitle">{criterion.description}</h4>

                <div className="field columns is-centered">
                  <div className="control">
                    <label className="radio">
                      <input type="radio" name={criterion.id} value={this.state.school1.id} onChange={this.handleChange}/> &nbsp;
                      {this.state.school1.name}
                    </label>

                    <strong>&nbsp; OR &nbsp;</strong>

                    <label className="radio">
                      {this.state.school2.name} &nbsp;
                      <input type="radio" name={criterion.id} value={this.state.school2.id} onChange={this.handleChange}/>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="has-text-right">
              <button className="button is-large is-success" type="submit" disabled={Object.keys(this.state.formData).length !== this.state.criteria.length}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RatingForm;
