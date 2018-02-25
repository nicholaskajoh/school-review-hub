import React, { Component } from 'react';
import './Review.css';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper from "../../api-helpers.js";


class Review extends Component{
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: [],
      school_name: "",
      schoool_id: "",
      comments: [],
      isloading: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const reviewId = nextProps.match.params.id;
    this.getReview(reviewId);
    this.getComments(reviewId);
  }

  componentDidMount() {
    const reviewId = this.props.match.params.id;
		this.getReview(reviewId);
	}

	getReview(id){
    this.api.get(`review/${id}`)
		.then(res => {
      const review = res.data;
      const school_name = res.data.school.name;
      const school_id = res.data.school.id;
      // console.log(school_id);
      this.setState({ review });
      this.setState({ school_name });
      this.setState({ school_id });
		});
  }
  
  handleClick = event => {
    const isLoading = "is-loading";
    this.setState({isLoading});
    // this.getReview(reviewId);
    // this.getComments(reviewId);
  }

  getComments(id) {
    this.api.get(`review/${id}/comments/1`)
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
      });
  }

  render() {
    return (
      <div>
        <section className="hero is-small is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Review</h1>
            </div>
          </div>
        </section>
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column" />

              <div className="column">
                <div className="content ">
                  <p>
                    <strong className="title">
                      <a
                        className="has-text-black"
                        href={"/school/" + this.state.schoool_id}
                      >
                        {this.state.school_name}
                      </a>
                    </strong>
                    <br />
                  </p>
                </div>
              </div>

              <div className="column" />
            </div>

            <div className="review-body">
              <div className="review-section">
                <p>{this.state.review.content}</p>
                <br />
                <p>
                  Last Updated at
                  {new Date(this.state.review.created_at).toDateString()}
                </p>
              </div>
              <div className="review-section comment-section">
                <button className="button is-danger">Upvote Review</button>
                <br />
                <br />
                <h3 className="title">Your view ?</h3>
                <p>
                  Whats your opinion? Do feel this is review is rightly spoken?
                  Why not let others see the other side of the coin through your
                  perspective.
                </p>
                <br />
                <form>
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea"
                        type="text"
                        placeholder="Write a comment?"
                      />
                    </div>
                    <button type="submit" className="button is-danger">
                      Post Comment
                    </button>
                  </div>
                </form>
                <br />
                <h3 className="title">Comments:</h3>
                <br />
                {this.state.comments.map(comment => (
                  <CommentCard comment={comment} />
                ))}
              </div>

              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button
                    className={"button is-danger " + this.state.isLoading}
                    id="post-comment-btn"
                    onClick={this.handleClick}
                  >
                    Load more comment
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;
