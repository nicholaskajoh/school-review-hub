import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {SchoolsList} from './SchoolsList';
import './SRHIndex.css';

class SRHIndex extends Component {
	constructor(props) {
    super(props);
		this.state = {
			schools: []
		};
	}
	
	componentWillReceiveProps(nextProps) {
		this.getSchools(nextProps.match.params.page);
	}

	componentDidMount() {
		this.getSchools(this.props.match.params.page);
	}

	getSchools(page) {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/srh-index/${page}`)
      .then(res => {
				const schools = res.data;
				this.has_previous_page = (res.headers['x-has-previous'].toLowerCase() === "true");
				this.has_next_page = (res.headers['x-has-next'].toLowerCase() === "true");
				this.setState({ schools });
      });
	}

	prevPage() {
		var linkUrl;
		if(this.has_previous_page)
			linkUrl = `/srh-index/${parseInt(this.props.match.params.page, 10) - 1}`;
		else linkUrl = "/srh-index/1";
		return linkUrl;
	}

	nextPage() {
		var linkUrl = "";
		if(this.has_next_page)
			linkUrl = `/srh-index/${parseInt(this.props.match.params.page, 10) + 1}`;
		else linkUrl = `/srh-index/${this.props.match.params.page}`;
		return linkUrl;
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
					<SchoolsList schools={this.state.schools}/>
				</table>

				<nav className="pagination">
					<Link className="pagination-previous" to={this.prevPage()}>Previous</Link>
					<Link className="pagination-next" to={this.nextPage()}>Next</Link>
				</nav>
			</div>
		);
	}
}

export default SRHIndex;