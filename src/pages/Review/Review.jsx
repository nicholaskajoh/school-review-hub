import React, { Component } from 'react';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import TimeAgo from 'react-time-ago';


class Review extends Component{
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: [],
      school_name: '',
      school_id: '',
      comments: [],
      comment: '',
      isloading: '',
      current_page: 0,
      has_more_comments : false,
      errors: []
    };
    this.toastId = null;
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
  
  async getReview(id) {
    try
    {
      const res = await this.api.get(`review/${id}`);
      const review = res.data;
      const school_name = res.data.school.name;
      const school_id = res.data.school.id;
      this.setState({ review:review, school_name:school_name, school_id:school_id });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      if (this.toastId)
      {
        toast.update(
          this.toastId,
          {
            render: `Error: ${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        );
      }
      else
      {
        this.toastId = toast.error(`Error: ${this.state.errors}`);
      }
    }
  }

  async getComments(id) {
    try
    {
      const res = await this.api.get(`review/${id}/comments/1`);
      const comments = res.data;
      const has_more_comments = res.headers['x-has-next'].toLowerCase() === 'true';
      const current_page = 1;

      this.setState({ comments:comments,
        current_page:current_page,
        has_more_comments:has_more_comments
      });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      if (this.toastId)
      {
        toast.update(
          this.toastId,
          {
            render: `Error: ${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        );
      }
      else
      {
        this.toastId = toast.error(`Error: ${this.state.errors}`);
      }
    }
  }

  async getMoreComments(id, page) {
    try
    {
      const res = await this.api.get(`review/${id}/comments/${page}`);

      let comments = res.data;
      let old_comments = this.state.comments;
      comments = old_comments.concat(comments);
      const has_more_comments = res.headers['x-has-next'].toLowerCase() === 'true';
      const current_page = page;
      this.setState({ comments:comments,
        current_page:current_page,
        has_more_comments:has_more_comments,
        isLoading: ''
      });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoading: '' });
      if (this.toastId)
      {
        toast.update(
          this.toastId,
          {
            render: `Error: ${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        );
      }
      else
      {
        this.toastId = toast.error(`Error: ${this.state.errors}`);
      }
    }
  }

  handleClick = event => {
    this.setState({ isLoading:'is-loading' });
    this.getMoreComments(this.state.review['id'], this.state.current_page+1);
  };

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

  handleUpvote = event => {
    this.upVote(this.state);
  };

  async submitComment(data) {
    try
    {
      await this.api.post('add-comment', data, true);

      const reviewId = this.state.review['id'];
      toast.info('Comment added');      
      this.getReview(reviewId);
      this.getComments(reviewId);
      this.setState( { comment:'' } );
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      this.toastId = toast.error(`Error: ${this.state.errors}`);
    }
  }

  async upVote(data){
    try
    {
      await this.api.get(`upvote/${data.review['id']}/review`, true);

      toast.info('Upvoted sucessfully');
      const reviewId = this.state.review['id'];
      this.getReview(reviewId);
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      this.toastId = toast.error(`Error: ${this.state.errors}`);
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
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
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
                        value={this.state.comment}
                        onChange={this.handleChange}
                        placeholder="Write a comment"
                        required
                      />
                    </div>
                    <p className="help is-danger is-size-5">
                    {this.state.errors}
                    </p>
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
              {this.state.has_more_comments ? (
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
              ): (
              <p className="has-text-centered">end of comments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;
