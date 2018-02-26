import React, { Component } from 'react';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper, { errors_to_array } from "../../api-helpers.js";
import TimeAgo from 'react-time-ago';


class Review extends Component{
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: [],
      school_name: "",
      school_id: "",
      comments: [],
      isloading: ""
    };
    this.errors = [];
  }

  componentWillReceiveProps(nextProps) {
    const reviewId = nextProps.match.params.id;
    this.getReview(reviewId);
    this.getComments(reviewId);
  }

  componentDidMount() {
    const reviewId = this.props.match.params.id;
		this.getReview(reviewId);
    this.getComments(reviewId);
	}

	getReview(id){
    this.api.get(`review/${id}`)
		.then(res => {
      const review = res.data;
      const school_name = res.data.school.name;
      const school_id = res.data.school.id;
      this.setState({ review });
      this.setState({ school_name });
      this.setState({ school_id });
		});
  }

  getComments(id) {
    this.api.get(`review/${id}/comments/1`)
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
      });
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    const data = { 
      comment: this.state.comment,
      entity_id: this.state.review['id'],
      entity: 'review'
      };
    this.submitComment(data);
    event.preventDefault();
  };

  async submitComment(data) {
    // this.setState({ toastId: toast("Publishing...", { autoClose: true }) });
    try
    {
      await this.api.post("add-comment", data, true);
      await this.setState({ toastId: toast("Comment Added", { autoClose: true }) });
      // await this.setState({
      //   toastId: toast.update(this.toastId, {
      //     render: "Done",
      //     type: toast.TYPE.SUCCESS,
      //     autoClose: 2000,
      //     className: css({
      //       transform: "rotateY(360deg)",
      //       transition: "transform 0.6s"
      //     })
      //   })
      // });
      window.location.reload();
    }
    catch (e)
    {
      this.errors = errors_to_array(e);
      await this.setState({ toastId: toast(`Error: ${this.errors}`, { autoClose: true }) });
      // await this.setState({
      //   toastId: toast.update(this.toastId, {
      //     render: `Failed ${this.errors}`,
      //     type: toast.TYPE.ERROR,
      //     autoClose: 2000,
      //     className: css({
      //       transform: "rotateY(360deg)",
      //       transition: "transform 0.6s"
      //     })
      //   })
      // });
    }
  }
  
  handleClick = event => {
    const isLoading = "is-loading";
    this.setState({isLoading});
    // this.getReview(reviewId);
    // this.getComments(reviewId);
  }

  handleUpvote = event => {
    this.upVote(this.state);
  };

  async upVote(data){
    try
    {
      await this.api.get(`upvote/${data.review['id']}/review`, true);
      await toast.info("Upvoted sucessfully");
      window.location.reload();
    }
    catch (e)
    {
      this.errors = errors_to_array(e);
      toast.error("Error occured while upvoting");
    }
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
        <ToastContainer />
        </section>
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column" />

              <div className="column is-half">
                <div className="content ">
                  <p className="title">
                      <a
                        className="has-text-black"
                        href={"/school/" + this.state.school_id}
                      >
                        {this.state.school_name} Review
                      </a>
                  </p>
                </div>
              </div>

              <div className="column" />
            </div>

            <div className="review-body">

              <div className="box">
                <div className="media-content">
                  <div className="content has-text-centered">
                    {/*<TimeAgo>{new Date(this.state.review.created_at) }</TimeAgo>*/}
                    <p className="review-content">"{this.state.review.content}"</p>
                  </div>
                  <div className="card-footer">
                  <div className="card-footer-item">Comments ({this.state.review.comments_count})</div>
                  <div className="card-footer-item">Upvotes ({this.state.review.upvotes})</div>
                  </div>
                  <div className="card-footer">
                  <div className="card-footer-item">
                    <button className="button is-danger is-small" onClick={this.handleUpvote}>Upvote Review</button>
                  </div>
                  </div>
                </div>
              </div>

              <div className="review-section">
                <h3 className="title">Your view?</h3>
                <p>
                  What's your opinion? Do you feel this review is rightly spoken?
                  Why not let others see the other side of the coin through your
                  perspective.
                </p>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea"
                        type="text"
                        value={this.state.content}
                        onChange={this.handleChange}
                        placeholder="Write a comment"
                        required
                      />
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                      <p className="control">
                        <button type="submit" className="button is-danger">
                          Post Comment
                        </button>
                      </p>
                    </div>
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
