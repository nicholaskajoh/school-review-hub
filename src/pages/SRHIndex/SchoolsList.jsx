import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SchoolsList = ({schools}) => {
  return (
    <tbody>
      {
        schools.map((school, index) =>
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
        )
      }
    </tbody>
  );
};

SchoolsList.propTypes = {
  schools: PropTypes.array.isRequired
};
