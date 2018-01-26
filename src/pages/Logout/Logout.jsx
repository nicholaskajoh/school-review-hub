import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout();
    localStorage.removeItem("authToken");
  }

  logout() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/logout`, {
      "headers": {
        "Authorization": `Token ${localStorage.getItem("authToken")}`
      }
    })
    .catch(e => console.log(e));
  }

  render() {
    return <Redirect to="/" push={true}/>
  }
}

export default Logout;
