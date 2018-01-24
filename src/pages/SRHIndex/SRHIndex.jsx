import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SRHIndex.css';

class SRHIndex extends Component {
	constructor(props) {
    super(props);
		this.state = {
			schools: [],
			page: 1
		};
	}
	
	componentWillReceiveProps(nextProps) {
		this.getSchools(1);
	}

	componentDidMount() {
		this.getSchools(1);
	}

	getSchools(page) {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/srh-index/${page}`)
      .then(res => {
			const schools = res.data;
			this.hasPrevPage = (res.headers['x-has-previous'].toLowerCase() === "true");
			this.hasNextPage = (res.headers['x-has-next'].toLowerCase() === "true");
			this.setState({ schools, page });
      });
	}

	prevPage = () => {
		if(this.hasPrevPage) {
			this.getSchools(this.state.page - 1);
		}
	}

	nextPage = () => {
		if(this.hasNextPage) {
			this.getSchools(this.state.page + 1);
		}
	}

	render() {
		return (
			<div className="container">
				<h1 className="title">
					SRH Index
				</h1>
				<h2 className="subtitle">
					SchoolReviewHub rankings
				</h2>
				<table className="table is-fullwidth">
					<thead>
						<tr>
							<th><i className="fa fa-trophy"></i> Rank</th>
							<th><i className="fa fa-shield-alt"></i> Crest</th>
							<th><i className="fa fa-graduation-cap"></i> Name</th>
							<th><i className="fa fa-star"></i> Rating</th>
							<th><i className="fa fa-users"></i> Reviews</th>
							<th><i className="fa fa-comment-alt"></i> Reports</th>
						</tr>
					</thead>

					<tbody>
						{this.state.schools.map((school, index) =>
							<tr key={index}>
								<td>{school.rank}</td>
								<td>
									<img className="image is-48x48" src={school.logo_url} alt={school.name + " logo"} />
								</td>
								<td>
									<Link to={"/school/" + school.id}>{school.name}</Link>
								</td>
								<td>{school.rating}</td>
								<td>{school.reviews_count}</td>
								<td>{school.reports_count}</td>
							</tr>
						)} 
				</tbody>
				</table>

				<nav className="pagination">
					<button className="button is-link" onClick={this.prevPage} disabled={!this.hasPrevPage}>Previous</button>
					<button className="button is-link" onClick={this.nextPage} disabled={!this.hasNextPage}>Next</button>
				</nav>

				<br/>
			</div>
		);
	}
}

export default SRHIndex;