import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      school: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.name,
      school: event.target.school,
      email: event.target.email,
      password: event.target.password      
    });
  }

  handleSubmit(event) {
    alert('You have attemted to Register with: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Register</h3>
            <div class="box">
              <form onSubmit={this.handleSubmit}>
              <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="text" placeholder="Your Name" autoFocus value={this.state.name} onChange={this.handleChange}/>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="text" placeholder="YourSSchool" value={this.state.school} onChange={this.handleChange}/>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="email" placeholder="Your Email" value={this.state.email} onChange={this.handleChange}/>
                  </div>
                </div>
  
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="password" placeholder="Your Password" value={this.state.password} onChange={this.handleChange}/>
                  </div>
                </div>
                <a type="submit" class="button is-block is-info is-large">Create Account</a>
              </form>
            </div>
            <p class="has-text-grey">
              <Link to="/login">Login</Link> &nbsp;·&nbsp;
              <Link to="/help">Need Help?</Link>
            </p>
          </div>
        </div>
      </div>
    </section>  
    );
  }
}

export default Register;
