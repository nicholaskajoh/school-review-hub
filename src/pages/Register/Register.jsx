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
    this.errors = {
      username: [],
      email: [],
      password: [],
      __all__: []
    }
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
      const res1 = await axios.post(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/register`, {
        username, email, password
      });
      if (res1.data.token)
      {
        localStorage.setItem("authToken", res1.data.token);
        this.setState({ isAuth: true });
      }
      else
      {
        console.log('Good request but somthing is wrong, token was not given');
        this.errors = {
          username: [],
          email: [],
          password: [],
          __all__: ["registeration was successful but your authorization was not, please try to login"]
        };
        console.log(res1.data);
      }
    } catch(e) {
      if (e.response)
      {
        this.errors = {
          username: [],
          email: [],
          password: [],
          __all__: []
        };
        const errors = e.response.data.errors;
        if (errors.username)
        {
          this.errors.username = errors.username
        }
        if (errors.email)
        {
          this.errors.email = errors.email
        }
        if (errors.password)
        {
          this.errors.password = errors.password
        }
        if (errors.__all__)
        {
          this.errors.__all__ = errors.__all__
        }
        this.forceUpdate();
        console.log(this.errors);
      }
      else
      {
        this.errors = {
          username: [],
          email: [],
          password: [],
          __all__: ["OMG! Server is down. We'll notify the development team right away."]
        };
        this.forceUpdate();
        console.table(e);
      }
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

                    <p className="help is-danger">
                      {this.errors.username}
                    </p>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input class="input is-medium" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <p className="help is-danger">
                    {this.errors.email}
                    </p>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input class="input is-medium" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <p className="help is-danger">
                    {this.errors.password}
                    </p>
                  </div>
                  <p className="help is-danger">
                  {this.errors.__all__}
                  </p>
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
