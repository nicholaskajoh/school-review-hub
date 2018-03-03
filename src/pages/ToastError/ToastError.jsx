import React, { Component } from 'react';
import './ToastError.css';


class ToastError extends Component {
  render()
  {
    return (
      <div>
        {this.props.errors.map((error, index) => (
        <span key={'toast_error ' + index}>
            {error}
            <br/ >
      </span>
      ))}
      </div>
    )
  }

}

export default ToastError;