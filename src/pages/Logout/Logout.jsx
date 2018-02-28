import React from 'react';
import { Redirect } from 'react-router-dom';
import APIHelper from '../../api-helpers.js';


class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.logout();
  }

  async logout() {
    localStorage.removeItem('authToken');
    try
    {
      await this.api.get('logout', true);
    }
    catch (e)
    {
      console.log('I no actually get work do for here');
    }
  }

  render() {
    return <Redirect to="/login" push={true}/>
  }
}

export default Logout;
