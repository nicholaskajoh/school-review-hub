import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Register.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import ToastError from './../ToastError/ToastError';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      username: '',
      email: '',
      password: '',
      clicked: '',
      errors: [],
      toastId: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({ clicked: 'is-loading' });
    this.register(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  };

  async register(username, email, password) {
    try
    {
      const res = await this.api.post( 'register', {username, email, password} );
      if (res.data.token)
      {
        localStorage.setItem('authToken', res.data.token);
        toast.info('Sign up sucessful, redirecting you home...');
        let func = this.props.history;
        window.setTimeout(function(){
          func.push('/home');
        }, 3500);
      }
      else
      {
        this.setState({ clicked: '',
          errors: ['registeration was successful but your authorization was not, please try to login']
        });

        toast.error('Error occured!');
        let func = this.props.history;
        window.setTimeout(function(){
          func.push('/login');
        }, 3500);
      }
    }
    catch (e)
    {
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
    window.scrollTo(0, 0);
    if (localStorage.getItem('authToken')) {
      return <Redirect to="/home" push={true} />;
    }

    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Register</h3>
              <h4 className="subtitle">Register to start reviewing schools</h4>
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
                        required
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
                    <p key={'register_error ' + index} className="help is-danger is-size-5">
                      {error}
                    </p>
                  ))}
                  <button
                    type="submit"
                    className={
                      "button is-fullwidth is-info is-large " + this.state.clicked
                    }
                    disabled={
                      this.state.username === '' ||
                      this.state.email === '' ||
                      this.state.password === ''
                    }
                  >
                    Create account
                  </button>
                </form>
              </div>

              <p className="has-text-grey">
                Have an account? {' '}
                <Link to="/login" style={{textDecoration: 'underline'}}>Login</Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
      </section>
    );
  }
}

export default Register;
