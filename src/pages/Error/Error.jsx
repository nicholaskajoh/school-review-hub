import React, { Component } from 'react';
import './Error.css';


class Error extends Component {
  render()
  {
    return (
      <div>
        {this.props.errors.map((error, key) => (
        <span>
            {error}
            <br/ >
      </span>
      ))}
      </div>
    )
  }

}

export default Error;