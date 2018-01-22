import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Reviews } from './Reviews';
import { Reports } from './Reports';
import './School.css';


class School extends Component{
	constructor(props) {
    super(props);
		this.state = {
			school: [],
			reviews: [],
			reports: []
		};
	}
	
	componentWillReceiveProps(nextProps) {
		this.getSchool(nextProps.match.params.id);
		this.getReviews(nextProps.match.params.id);
		this.getReports(nextProps.match.params.id);
	}

	componentDidMount() {
		this.getSchool(this.props.match.params.id);
		this.getReviews(this.props.match.params.id);
		this.getReports(this.props.match.params.id);
	}

	getSchool(id){
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${id}`)
		.then(res => {
			const school = res.data;
			this.setState({ school });
		});
	}

	getReviews(id) {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${id}/reviews/1`)
      .then(res => {
				const reviews = res.data;
				this.setState({ reviews });
      });
	}

	getReports(id) {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${id}/reports/1`)
      .then(res => {
				const reports = res.data;
				this.setState({ reports });
      });
	}

	render() {
		return (
			<div>
				<section className="hero is-link">
				  <div className="hero-body">
				    <div className="container">
						<h1 className="title">
							{this.state.school.name}Covenant University
						</h1>
						<p>{this.state.school.location}</p>
						<p>Go to the school website
							 {/* <Link to={this.state.school.website}> 
							 		here 
								</Link>  */}
						</p>
				    </div>
				  </div>
				</section>
				<div className="section">
					<div className="container">
					  <div className="tile is-ancestor">
					  <div className="tile is-vertical is-8">
						    <div className="tile">
						      <div className="tile is-parent is-vertical">
						        <article className="tile is-child notification is-danger">
						          <p className="title is-centered"><i className="fa fa-trophy"></i>   Rank</p>
						          <p className="title is-centered">1</p>
						        </article>
						        <article className="tile is-child notification is-link">
						          <p className="title"><i className="fa fa-star"></i>   Rating</p>
						          <p className="title">100</p>
						        </article>
						      </div>
						      <div className="tile is-parent">
						        <article className="tile is-child notification is-link">
						          <p className="title">Description</p>
						          <figure className="image is-4by3">
						            <img src={this.state.school.logo_url} alt=""/>
						          </figure>
											<p>{this.state.school.description}</p>
						        </article>
						      </div>
						    </div>
						  </div>
						  <div className="tile is-parent">
						    <article className="tile is-child notification is-warning">
						      <div className="content">
						        <p className="title">Rates above</p>
						        <p>With even more content</p>
						        <div className="content">
						          
						        </div>
						      </div>
						    </article>
						  </div>
						</div>
					</div>
				</div>
				<section className="hero is-link">
				  <div className="hero-body">
				    <div className="container">
						<h1 className="title">
						<i className="fa fa-users"></i>  Reviews
						</h1>
				    </div>
				  </div>
				</section>
				<Reviews reviews={this.state.reviews}/>
				<section className="hero is-link">
				  <div className="hero-body">
				    <div className="container">
						<h1 className="title">
						<i className="fa fa-comment-alt"></i>  Reports
						</h1>
				    </div>
				  </div>
				</section>
				<Reports reports={this.state.reports}/>
			</div>		
		);
	}
}


export default School;
