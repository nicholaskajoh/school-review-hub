import React, { Component } from 'react';
import './ObjectNotFound.css';
import { Link } from "react-router-dom";


class ObjectNotFound extends Component {
  render()
  {
    return (
      <div className="section">
      <div className="container">
        <h1 className="title has-text-centered">The {this.props.object_model} your looking for was not found</h1>
        <br />
        <h1 className="subtitle has-text-centered">
        However you can check {' '}
        <Link to="/srh-index/" style={{ textDecoration: 'underline' }}>
          SRH Index</Link> for the schools ranking top
      </h1>
      </div>
    </div>
    )
  }
}

export default ObjectNotFound;
