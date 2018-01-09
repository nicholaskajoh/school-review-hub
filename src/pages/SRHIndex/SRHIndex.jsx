import React from 'react';
import {SchoolsList} from './SchoolsList';
import {Schools} from '../../demo-data/Schools';
import './SRHIndex.css';

const SRHIndex = () => ( 
	<div class="container">
		<h1 class="title">
			SRH Index
		</h1>
		<h2 class="subtitle">
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
			<SchoolsList schools={Schools}/>
		</table>
	</div>
);

export default SRHIndex;
