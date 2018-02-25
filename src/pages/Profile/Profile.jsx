import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Profile.css';
import APIHelper from "../../api-helpers.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      user: {},
      ratings: [],
      ratingsPage: 1
    }
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

  welcomeUser(){
    toast.info("Welcome, You are anonymous!")
  }
  
  getUserInfo() {
    this.api.get('profile', true)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      });
  }

  getUserRatings(page) {
    this.api.get(`profile/ratings/${page}`, true)
    .then(res => {
      const ratings = res.data;
      // console.log(ratings);
      this.setState({ ratings });
    });
  }

  deleteRating = (school1Id, school2Id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      this.api.delete(`rating/${school1Id}/${school2Id}`, true)
      .then(res => {
        this.getUserRatings(1);
      });
    }
  }

  render() {
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
          <div className="container">
            <div className="notification is-light">
              Your profile is private. Only you can see it!
            </div>

            <h2 className="title">{this.state.user.first_name} <small>@{this.state.user.username}</small></h2>
            <h4 className="subtitle">{this.state.user.email}</h4>

            <hr/>

            <h4 className="subtitle">Ratings</h4>

            {this.state.ratings.map((rating, index) =>
              <div className="box" key={index}>
                {rating[2]} <strong> vs </strong> {rating[3]} &nbsp;
                
                <Link className="button is-info is-small" to={"/rate/" + rating[0] + "/" + rating[1]}>Update</Link> &nbsp;

                <button className="button is-danger is-small" onClick={() => this.deleteRating(rating[0], rating[1])}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Profile;
