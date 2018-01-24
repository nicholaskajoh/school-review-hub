import React, {Component} from 'react';
import axios from 'axios';
import Heading from './Heading';
import Highlights from './Highlights';
import Reviews from './Reviews';
import Reports from './Reports';
import './School.css';

class School extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			school: {},
            lowerRatedSchools: [],
            numLowerRatedSchools: 0
		};
	}
	
	componentWillReceiveProps(nextProps) {
        const schoolId = nextProps.match.params.id;
		this.getSchool(schoolId);
        this.getLowerRatedSchools(schoolId);
	}

	componentDidMount() {
		const schoolId = this.props.match.params.id;
		this.getSchool(schoolId);
        this.getLowerRatedSchools(schoolId);
	}

	getSchool(id){
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/school/${id}`)
		.then(res => {
			const school = res.data;
			this.setState({ school });
		});
	}

	getLowerRatedSchools(id) {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/rated-higher-than/${id}`)
        .then(res => {
            var lowerRatedSchools = res.data;
            const numLowerRatedSchools = lowerRatedSchools.length;
            lowerRatedSchools = lowerRatedSchools.slice(0, 3);
            this.setState({ lowerRatedSchools, numLowerRatedSchools });
        });
	}

	render() {
		return (
			<div>
				<Heading school={this.state.school}/>

				<Highlights
					school={this.state.school}
					lowerRatedSchools={this.state.lowerRatedSchools}
					numLowerRatedSchools={this.state.numLowerRatedSchools}/>

				
				<Reviews schoolId={this.props.match.params.id}/>

				<Reports schoolId={this.props.match.params.id}/>
			</div>		
		);
	}
}

export default School;