import React from 'react';
import './NotFound.css';
import { Link } from "react-router-dom";


const NotFound = () => (
  <div className="section">
    <div className="container">
      <h1 className="title has-text-centered">Sorry, the page you are looking for was not found</h1>
      <br />
      <h1 className="subtitle has-text-centered">
      However you can check {' '}
      <Link to="/srh-index/" style={{textDecoration: 'underline'}}>
      SRH Index</Link> for the schools ranking top
      </h1>
    </div>
  </div>
);

export default NotFound;