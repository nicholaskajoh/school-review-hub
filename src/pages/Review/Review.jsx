import React, { Component } from 'react';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import TimeAgo from 'react-time-ago';


class Review extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: {created_at: ''},
      school_name: '',
      school_id: '',
      comments: [],
      comment: '',
      isloading: '',
      isLoaded: false,
      current_page: 0,
      has_more_comments: false,
      upvoted: false,
      toastId: null,
      errors: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
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
      console.log(`I have got the review in my palm: +====>   ${review}`);
      console.log(review);
      this.setState({
        review: review,
        school_name: school_name,
        school_id: school_id,
        isLoaded:true,
        errors:[]
      });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId))
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async getComments(id) {
    try
    {
      const res = await this.api.get(`review/${id}/comments/1`);
      const comments = res.data;
      const has_more_comments =
      res.headers['x-has-next'].toLowerCase() === 'true';
      const current_page = 1;

      this.setState({
        comments: comments,
        current_page: current_page,
        has_more_comments: has_more_comments,
        isLoaded:true, errors:[]
      });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  async getMoreComments(id, page) {
    try{
      const res = await this.api.get(`review/${id}/comments/${page}`);

      let comments = res.data;
      let old_comments = this.state.comments;
      comments = old_comments.concat(comments);
      const has_more_comments =
      res.headers['x-has-next'].toLowerCase() === 'true';
      const current_page = page;
      this.setState({
        comments: comments,
        current_page: current_page,
        has_more_comments: has_more_comments,
        isLoading: '', errors:[]
      });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  handleClick = event => {
    this.setState({ isLoading: 'is-loading' });
    this.getMoreComments(this.state.review['id'], this.state.current_page + 1);
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
      this.setState({ comment: '', error:[] });
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

  async upVote(data) {
    try
    {
      await this.api.get(`upvote/${data.review['id']}/review`, true);

      toast.info('Upvoted sucessfully');
      const reviewId = this.state.review['id'];
      this.getReview(reviewId);
      this.setState({ upvoted: true, errors:[] });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      if (toast.isActive(this.state.toastId) || this.state.toastId)
      {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
          }
        )
      }
      else
      {
        this.setState({ 
          toastId:toast.error(`${this.state.errors}`)
        });
      }
    }
  }

  render() {
    let rendering;
    if (this.state.isLoaded)
    {
      rendering = 
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
              <p className="review-content">
                "{this.state.review.content}"
              </p>
            </div>
            <div className="card-footer">
              <div className="card-footer-item">
                Upvotes ({this.state.review.upvotes})
              </div>
              <div className="card-footer-item">
                {/* <TimeAgo>{new Date(this.state.review.created_at)}</TimeAgo> */}
              </div>
            </div>
            <div className="card-footer">
              <div className="card-footer-item">
                {!this.state.upvoted ? (
                  <button
                    className="button is-danger is-small"
                    onClick={this.handleUpvote}
                  >
                    Upvote Review
                  </button>
                ) : (
                  <button className="button is-danger is-small" disabled>
                    Upvoted
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3 className="title">Your view?</h3>
          <p>
            What's your opinion? Do you feel this review is rightly
            spoken? Why not let others see the other side of the coin
            through your perspective.
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
              {this.state.errors.map(error => (
                <p className="help is-danger is-size-5">
                  {error}
                </p>
              ))}
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
          <h3 className="title">Comments ({this.state.review.comments_count}):</h3>
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
        ) : (
          <p className="has-text-centered">end of comments</p>
        )}
      </div>
    </div>
  }
  else 
  {
    rendering = 
      <div title="Reload" className="has-text-centered">
      <button className="reload-btn" onClick={this.componentDidMount}>
        <i className="fa fa-redo-alt fa-2x" />
      </button>
      </div>
  }

  return (
    <div>
      <section className="hero is-small is-warning is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Review</h1>
          </div>
        </div>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.TOP_CENTER}
        />
      </section>
      <div className="section">
        {rendering}
      </div>
    </div>
  );
  }
}
export default Review;
