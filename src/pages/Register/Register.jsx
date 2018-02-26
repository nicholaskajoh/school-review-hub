import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Register.css';
import APIHelper, { errors_to_array } from "../../api-helpers.js";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      username: "",
      email: "",
      password: "",
      isAuth: false
    };
    this.clicked = "";
    this.errors = [];
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.clicked = "is-loading";
    this.forceUpdate();
    this.register(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  };

  async register(username, email, password) {
    try
    {
      const res = await this.api.post( 'register', {username, email, password} );
      this.clicked = "";
      if (res.data.token)
      {
        localStorage.setItem("authToken", res.data.token);
        this.setState({ isAuth: true });
      }
      else
      {
        toast.error("Error occured!");
        this.errors = ["registeration was successful but your authorization was not, please try to login"]
        this.forceUpdate();
      }
    }
    catch (e)
    {
      this.errors = errors_to_array(e);
      toast.error("Error occured!");
      this.clicked = "";
      this.forceUpdate();
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
              <h3 className="title has-text-grey">Register</h3>

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
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
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
                    {this.errors}
                  </p>
                  <button
                    type="submit"
                    className={
                      "button is-fullwidth is-info is-large " + this.clicked
                    }
                    disabled={
                      this.state.username === "" ||
                      this.state.email === "" ||
                      this.state.password === ""
                    }
                  >
                    Create account
                  </button>
                </form>
              </div>

              <p className="has-text-grey">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    );
  }
}

export default Register;
