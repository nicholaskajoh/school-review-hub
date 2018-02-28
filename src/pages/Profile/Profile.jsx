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
    this.welcomeUser();
    this.getUserInfo();
    this.getUserRatings(1);
  }

  welcomeUser() {
    this.setState({ toastId : toast.info('Welcome, You are anonymous!') });
  }

  async getUserInfo() {
    try
    {
      const res = await this.api.get('profile', true);
      const user = res.data;
      this.setState({ user:user, isLoaded:true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded:false });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s'
            })
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured')
        });
      }
    }
  }

  async getUserRatings(page) {
    try
    {
      const res = await this.api.get(`profile/ratings/${page}`, true);
      const ratings = res.data;
      this.setState({ ratings:ratings, isLoaded:true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded:false });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s'
            })
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error('An error occured')
        });
      }
    }
  }

  async deleteRating(school1Id, school2Id) {
    if (window.confirm('Are you sure you want to delete this?')) {
      try
      {
        await this.api.delete(`rating/${school1Id}/${school2Id}`, true);
        this.getUserRatings(1);
      }
      catch (e)
      {
        this.setState({ errors: errors_to_array(e) });
        if (toast.isActive(this.state.toastId) || this.state.toastId)
        {
          toast.update(
            this.state.toastId,
            {
              render: 'An error occured',
              type: toast.TYPE.ERROR,
              className: css({
                transform: 'rotateY(360deg)',
                transition: 'transform 0.6s'
              })
            }
          )
        }
        else
        {
          this.setState({ 
            toastId:toast.error('An error occured')
          });
        }
      }
    }
  }

  render() {
    let rendering;
    if (this.state.isLoaded)
    {
      rendering = 
      <div className="container">
      <div className="notification is-light">
        Your profile is private. Only you can see it!
      </div>

      <h2 className="title">
        {this.state.user.first_name}{' '}
        <small>@{this.state.user.username}</small>
      </h2>
      <h4 className="subtitle">{this.state.user.email}</h4>

      <hr />

      <h4 className="subtitle">Ratings</h4>

      {this.state.ratings.map((rating, index) => (
        <div className="box" key={index}>
          {rating[2]} <strong> vs </strong> {rating[3]} &nbsp;
          <Link
            className="button is-info is-small"
            to={"/rate/" + rating[0] + "/" + rating[1]}
          >
            Update
          </Link>{' '}
          &nbsp;
          <button
            className="button is-danger is-small"
            onClick={() => this.deleteRating(rating[0], rating[1])}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
    }
    else 
    {
      // if (this.state.errors.length > 0)
      // {
        rendering = 
          <div title="Reload" className="has-text-centered">
          <button onClick={this.componentDidMount}>
            <i className={"fa fa-redo-alt fa-2x"} />
          </button>
          </div>  
      // }
      // else
      // {
      //   rendering = 
      //   <div className="has-text-centered">
      //     <i className="fa fa-spinner fa-spin fa-2x" />
      //   </div>
      // }      
    }

    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Profile</h1>
            </div>
          </div>
        </section>

        <div className="section">
          { rendering }
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
      </div>
    );
  }
}

export default Profile;
