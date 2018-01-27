import React, { Component } from 'react';
import axios from 'axios';
import TopSchools from './TopSchools'; 
import SuggestedMatches from './SuggestedMatches';
import TopReviews from './TopReviews';
import './Home.css';

class Home extends Component{
	constructor(props) {
    super(props);
		this.state = {
			topSchools: [],
			suggestedMatches: [],
			topReviews: []
		};
	}
	
	componentDidMount() {
		this.getSchools();
		this.getMatches();
		this.getReviews();
	}

	getSchools() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-schools`)
      .then(res => {
				const topSchools = res.data;
				console.log(res.data);
				this.setState({ topSchools });
      });
	}

	getMatches() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/suggested-matches`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("authToken")}`
      }
    })
    .then(res => {
      const suggestedMatches = res.data;
      console.log(res.data);
      this.setState({ suggestedMatches });
    });
	}

	getReviews() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-reviews`)
      .then(res => {
				const topReviews = res.data;
				console.log(res.data);
				this.setState({ topReviews });
      });
	}

	render () {
		return (
			<div>
        <TopSchools schools={this.state.topSchools}/>
        <SuggestedMatches matches={this.state.suggestedMatches}/>
        <TopReviews reviews={this.state.topReviews}/>
			</div>			
		);
	}
}

export default Home;