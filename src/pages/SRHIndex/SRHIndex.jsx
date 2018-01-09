import React from 'react';
import {SchoolsList} from './SchoolsList';
import {Schools} from '../../demo-data/Schools';
import './SRHIndex.css';

const SRHIndex = () => (
    <section class="hero is-link">
	  <div class="hero-body">
	    <div class="container">
	      <h1 class="title">
	        School Ratings
	      </h1>
	      <h2 class="subtitle">
	        Top 20
	      </h2>
	      <table className="table is-fullwidth">
		  <thead>
		    <tr>
		      <th><i class="fa fa-shield"></i>  School Crest</th>
		      <th><i class="fa fa-star"></i>  Rank</th>
		      <th><i class="fa fa-square"></i>  School Name</th>
		      <th><i class="fa fa-star-half"></i>  Rating</th>
		      <th><i class="fa fa-users"></i>  Reviews</th>
		      <th><i class="fa fa-user-plus"></i>  Reports</th>
		    </tr>
		  </thead>
		  	<SchoolsList  schools={Schools}/>
		</table>
	    </div>
	  </div>
	</section>
);

export default SRHIndex;
