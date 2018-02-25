import React from 'react';
import { Redirect } from 'react-router-dom';
import APIHelper from "../../api-helpers.js";


class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.logout();
    localStorage.removeItem("authToken");
  }

  logout() {
    this.api.get('logout', true)
      .catch(e => console.log(e));
  }

  render() {
    return <Redirect to="/" push={true}/>
  }
}

export default Logout;
