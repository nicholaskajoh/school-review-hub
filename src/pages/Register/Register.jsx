import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Register.css';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      isAuth: false
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    this.register(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  }

  async register(username, email, password) {
    try {
      // register
      await axios.post(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/register`, {
        username, email, password
      });
      // login
      const res2 = await axios.post(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/token-auth`, {
        username, password
      });
      localStorage.setItem("authToken", res2.data.token);
      this.setState({ isAuth: true });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    if(this.state.isAuth) {
      return <Redirect to="/home" push={true}/>
    }

    return (
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <h3 class="title has-text-grey">Register</h3>

              <div class="box">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <div class="field">
                    <div class="control">
                      <input class="input is-medium" type="text" name="username" placeholder="Username" autoFocus value={this.state.name} onChange={this.handleChange}/>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input class="input is-medium" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                  </div>
    
                  <div class="field">
                    <div class="control">
                      <input class="input is-medium" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                  </div>

                  <button type="submit" class="button is-fullwidth is-info is-large" disabled={this.state.username === "" || this.state.email === "" || this.state.password === ""}>Create account</button>
                </form>
              </div>

              <p class="has-text-grey">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>  
    );
  }
}

export default Register;
