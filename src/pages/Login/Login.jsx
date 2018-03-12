import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import ToastError from './../ToastError/ToastError';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      username: '',
      password: '',
      errors: [],
      clicked: '',
      toastId: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value.trim()
    });
  };

  handleSubmit = event => {
    this.setState({ clicked: 'is-loading' });
    this.login(this.state.username, this.state.password);
    event.preventDefault();
  };

  async login(username, password) {
    try {
      const res = await this.api.post('login', { username, password });
      localStorage.setItem('authToken', res.data.token);
      toast.info('Logging in...');
      let func = this.props.history;
      window.setTimeout(function() {
        func.push('/home');
      }, 3500);
    } catch (e) {
      this.setState({ errors: errors_to_array(e), clicked: '' });
      if (toast.isActive(this.state.toastId)) {
        toast.update(this.state.toastId, {
          render: <ToastError errors={this.state.errors} />,
          type: toast.TYPE.ERROR
        });
      } else {
        this.setState({
          toastId: toast.error(<ToastError errors={this.state.errors} />)
        });
      }
    }
  }

  render() {
    if (localStorage.getItem('authToken')) {
      return <Redirect to="/home" push={true} />;
    }
    window.scrollTo(0, 0);

    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h2 className="title has-text-grey">Login</h2>
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                  {this.state.errors.map((error, index) => (
                    <p
                      key={'login_error ' + index}
                      className="help is-danger is-size-5"
                    >
                      {error}
                    </p>
                  ))}
                  <button
                    type="submit"
                    className={
                      'button is-fullwidth is-info is-large ' +
                      this.state.clicked
                    }
                    disabled={
                      this.state.username === '' || this.state.password === ''
                    }
                  >
                    Login
                  </button>
                </form>
              </div>

              <p className="has-text-grey">
              Don't have an account? {' '}
                <Link to="/register" style={{textDecoration:'underline'}}>Register</Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      </section>
    );
  }
}

export default Login;
