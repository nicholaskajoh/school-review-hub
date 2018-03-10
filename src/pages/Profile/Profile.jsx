import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import './Profile.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      user: {},
      ratings: [],
      ratingsPage: 1,
      isLoaded: false,
      errorLoading: false,
      toastId: null,
      errors: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getUserInfo();
    this.getUserRatings(1);
  }

  componentDidMount() {
    this.setState({ errorLoading: false });
    this.welcomeUser();
    this.getUserInfo();
    this.getUserRatings(1);
    window.scrollTo(0, 0);
  }

  welcomeUser() {
    this.setState({ toastId: toast.info('Welcome, You are anonymous!') });
  }

  async getUserInfo() {
    try {
      const res = await this.api.get('profile', true);
      const user = res.data;
      this.setState({ user: user, isLoaded: true, errorLoading:false });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false, errorLoading: true });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s'
            })
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async getUserRatings(page) {
    try {
      const res = await this.api.get(`profile/ratings/${page}`, true);
      const ratings = res.data;
      this.setState({ ratings: ratings, isLoaded: true, errorLoading:false });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false, errorLoading: true });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s'
            })
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async deleteRating(school1Id, school2Id) {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await this.api.delete(`rating/${school1Id}/${school2Id}`, true);
        this.getUserRatings(1);
      }
      catch (e) {
        this.setState({ errors: errors_to_array(e) });
        if (toast.isActive(this.state.toastId) || this.state.toastId) {
          toast.update(
            this.state.toastId,
            {
              render: `${this.state.errors}`,
              type: toast.TYPE.ERROR,
              className: css({
                transform: 'rotateY(360deg)',
                transition: 'transform 0.6s'
              })
            }
          )
        }
        else {
          this.setState({
            toastId: toast.error(`${this.state.errors}`)
          });
        }
      }
    }
  }

  render() {
    let rendering;
    if (this.state.isLoaded) {
      rendering =
        <div className="container">

          <h2 className="title">
            {this.state.user.first_name}{' '}
            <small>@{this.state.user.username}</small>
          </h2>
          <h4 className="subtitle">{this.state.user.email}</h4>

          <div className="notification is-light">
            Your profile is private. Only you can see it!
          </div>

          <hr />
          <br /><br />

          <h4 className="title">Ratings</h4>

          <hr />
          <div className="columns is-multiline">

            {this.state.ratings.map(rating => (
            <div className="column is-4" key={'profile_rating ' + rating[0] + ' ' + rating[1]}>

                <div className="box has-text-centered">

                  <h3 className="subtitle">
                    <Link
                      to={"/school/" + rating[0]}>
                      {rating[2]}
                    </Link>
                  </h3>
                  <br />

                  <h3 className="title">vs</h3>
                  <br />

                  <h3 className="subtitle">
                    <Link className="subtitle" to={"/school/" + rating[1]}>{rating[3]}</Link>
                  </h3>

                  <hr />
                  <Link
                    className="button is-info is-small"
                    to={"/rate/" + rating[0] + "/" + rating[1]}>
                    <i className="far fa-check-circle"></i>

                    Update
                  </Link>
                  {"   "}
                  <button
                    className="button is-warning is-small"
                    onClick={() => this.deleteRating(rating[0], rating[1])}>
                    <i className="far fa-trash-alt"></i>

                    &nbsp;&nbsp;Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
    }
    else if (this.state.errorLoading) {
      rendering =
        <div className="has-text-centered">
        <button title="Reload" className="reload-btn" onClick={this.componentDidMount}>retry</button>
        </div>
    }
    else {
      rendering =
        <div className="has-text-centered">
        <button className="reload-btn loading">...</button>
        </div>
    }

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title"><i className="fa fa-user" /> Profile</h1>
            </div>
          </div>
        </section>

        <div className="section">
          {rendering}
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      </div>
    );
  }
}

export default Profile;
