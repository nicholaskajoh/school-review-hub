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
    try
    {
      await this.api.get('logout', true);
      localStorage.removeItem('authToken');
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      toast.error(`Error: ${this.state.errors}`);
      localStorage.removeItem('authToken');
    }
  }

  render() {
    return <Redirect to="/login" push={true}/>
  }
}

export default Logout;
