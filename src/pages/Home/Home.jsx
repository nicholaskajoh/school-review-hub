import React, { Component } from 'react';
import axios from 'axios';
import {SuggestedMatches} from './SuggestedMatches';
import {TopReviews} from './TopReviews';
import {TopSchools} from './TopSchools'; 
import './Home.css';

class Home extends Component{
	constructor(props) {
    super(props);
		this.state = {
			schools: [],
			matches: [],
			reviews: []
		};
	}
	
	componentDidMount() {
		this.getSchools();
		this.getMatches();
		this.getReviews();
	}

	getSchools() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-schools/10`)
      .then(res => {
				const schools = res.data;
				console.log(res.data);
				this.setState({ schools });
      });
	}

	getMatches() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/suggested-matches/10`)
      .then(res => {
				const matches = res.data;
				console.log(res.data);
				this.setState({ matches });
      });
	}

	getReviews() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-reviews/10`)
      .then(res => {
				const reviews = res.data;
				console.log(res.data);
				this.setState({ reviews });
      });
	}

	render () {
		return (
			<div>
				<section className="hero is-link">
					<div className="hero-body">
						<div className="container">
						<h1 className="title">
							Home
						</h1>
						</div>
					</div>
				</section>
				<div className="section">
					<div className="container">
						<div className="columns is-desktop">
							<TopSchools schools={this.state.schools}/>
							<SuggestedMatches matches={this.state.matches}/>
							<TopReviews reviews={this.state.reviews}/>
						</div>
					</div>
				</div>
			</div>			
		);
	}
} 



export default Home;
