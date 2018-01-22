import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.email,
      password: event.target.password      
    });
  }

  handleSubmit(event) {
    alert('You have attemted to login with: ' + this.state.email);
    event.preventDefault();
  }

  render() {
    return (
      <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Login</h3>
            <p class="subtitle has-text-grey">Please login to proceed.</p>
            <div class="box">
              <figure class="avatar">
                <img src="https://placehold.it/128x128" alt=""/>
              </figure>
              <form onSubmit={this.handleSubmit}>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="email" placeholder="Your Email" autoFocus value={this.state.email} onChange={this.handleChange}/>
                  </div>
                </div>
  
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="password" placeholder="Your Password" value={this.state.password} onChange={this.handleChange}/>
                  </div>
                </div>
                <div class="field">
                  <label class="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <a type="submit" class="button is-block is-info is-large">Login</a>
              </form>
            </div>
            <p class="has-text-grey">
              <Link to="/register">Register</Link> &nbsp;·&nbsp;
              <Link to="/help">Need Help?</Link>
            </p>
          </div>
        </div>
      </div>
    </section>  
    );
  }
}

export default Login;
