import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SchoolsList = ({schools}) => {
  return (
    <tbody>
      {
        schools.map((school, index) =>
          <tr key={index}>
          <th><img src={school.logo_url} alt='School Logo'/></th>
          <td>{school.rank}</td>
          <Link to={school.website} target='_blank'><td>{school.name}</td></Link>
          <td>{school.points}</td>
          <td>{school.reviews}</td>
          <td>0</td>
          </tr>
          
        )
      }
    </tbody>
  );
};

SchoolsList.propTypes = {
  schools: PropTypes.array.isRequired
};
