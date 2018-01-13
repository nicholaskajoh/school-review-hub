import React from 'react';
import PropTypes from 'prop-types';

export const TopSchools = ({schools}) => {
  return (
    <div className="column">
        <p className="title has-text-centered"><i className="fa fa-trophy"></i>  Top Schools</p>
        <div className="content">
          <table className="table is-fullwidth">
			<thead>
				<tr>
					<th><i className="fa fa-trophy"></i> Rank</th>
					<th><i className="fa fa-shield-alt"></i> Crest</th>
					<th><i className="fa fa-graduation-cap"></i> Name</th>
					<th><i className="fa fa-star"></i> Rating</th>
				</tr>
			</thead>
			<tbody>
		      {
		        // schools.map((school, index) =>
		        //   <tr key={index}>
		        //     <td>{school.rank}</td>
		        //     <td>
		        //       <img className="image is-48x48" src={school.logo_url} alt={school.name + " logo"} />
		        //     </td>
		        //     <td>
		        //       <Link to={"/school/" + school.id}>{school.name}</Link>
		        //     </td>
		        //     <td>{school.rating}</td>
		        //   </tr>
		        // )
		      }
		    </tbody>
		</table>
    </div>
  </div>
  );
};

TopSchools.propTypes = {
  schools: PropTypes.array.isRequired
};
