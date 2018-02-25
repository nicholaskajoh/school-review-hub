import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import APIHelper from "../../api-helpers.js";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      username: "",
      password: "",
      isAuth: false
    };
    this.clicked = "";
    this.errors = {
      username: [],
      non_field_errors: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value.trim()
    });
  };

  handleSubmit = event => {
    this.clicked = "is-loading";
    this.forceUpdate();
    this.login(this.state.username, this.state.password);
    event.preventDefault();
  };

  async login(username, password) {
    try {
      const res = await this.api.post('token-auth', {username, password});
      this.clicked = "";
      localStorage.setItem("authToken", res.data.token);
      this.setState({ isAuth: true });
    } catch (e) {
      this.clicked = "";
      toast.error("Error occured!");
      if (e.response) {
        this.errors = {
          username: [],
          non_field_errors: []
        };
        const errors = e.response.data;
        // console.log(e.response);
        if (errors.username) {
          this.errors.username = errors.username;
        }
        if (errors.non_field_errors) {
          this.errors.non_field_errors = errors.non_field_errors;
        }
        this.forceUpdate();
        // console.log(this.errors);
      } else {
        this.errors = {
          username: [],
          non_field_errors: [
            "OMG! Server is down. We'll notify the development team right away."
          ]
        };
        this.forceUpdate();
        // console.table(e);
      }
    }
  }

  render() {
    if (this.state.isAuth || localStorage.getItem("authToken")) {
      return <Redirect to="/home" push={true} />;
    }

    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h2 className="title has-text-grey">Login</h2>

              <h4 className="subtitle">Please, login to proceed</h4>

              <div className="box">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoFocus
                        value={this.state.username}
                        onChange={this.handleChange}
                      />
                    </div>
                    <p className="help is-danger is-size-5">
                      {this.errors.username}
                    </p>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <p className="help is-danger is-size-5">
                    {this.errors.non_field_errors}
                  </p>
                  <button
                    type="submit"
                    className={
                      "button is-fullwidth is-info is-large " + this.clicked
                    }
                    disabled={
                      this.state.username === "" || this.state.password === ""
                    }
                  >
                    Login
                  </button>
                </form>
              </div>

              <p className="has-text-grey">
                <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    );
  }
}

export default Login;
