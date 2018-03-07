import React, { Component } from 'react';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import TimeAgo from 'react-time-ago';
import ObjectNotFound from './../ObjectNotFound/ObjectNotFound';
import { Link } from "react-router-dom";


class Review extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: { created_at: '' },
      own_review: false,
      editing: false,
      edited_review_content: '',
      submitting_edit: '',
      school_name: '',
      school_id: '',
      comments: [],
      comment: '',
      isloading: '',
      isLoaded: false,
      current_page: 0,
      has_more_comments: false,
      upvoted: false,
      upvoting: '',
      commenting: '',
      toastId: null,
      errors: [],
      notFound: false,
      key: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const reviewId = nextProps.match.params.id;
    this.getReview(reviewId);
    this.getComments(reviewId);
    this.checkUpvote(reviewId);
    this.checkOwner(reviewId);
  }

  componentDidMount() {
    const reviewId = this.props.match.params.id;
    if (!isNaN(Number(reviewId))) {
      this.getReview(reviewId);
      this.getComments(reviewId);
      this.checkUpvote(reviewId);
      this.checkOwner(reviewId);
      window.scrollTo(0, 0);
    }
    else {
      this.setState({ notFound: true });
    }
  }

  async getReview(id) {
    try {
      const res = await this.api.get(`review/${id}`);
      const review = res.data;
      const school_name = res.data.school.name;
      const school_id = res.data.school.id;
      this.setState({
        review: review,
        edited_review_content: review.content,
        school_name: school_name,
        school_id: school_id,
        isLoaded: true,
        errors: []
      });
    }
    catch (e) {
      let errors = errors_to_array(e);
      this.setState({ errors: errors, isLoaded: false });
      if (errors === 404) {
        this.setState({ notFound: true });
      }
      if (toast.isActive(this.state.toastId)) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
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

  async getComments(id) {
    try {
      const res = await this.api.get(`review/${id}/comments/1`);
      const comments = res.data;
      const has_more_comments =
        res.headers['x-has-next'].toLowerCase() === 'true';
      const current_page = 1;

      this.setState({
        comments: comments,
        current_page: current_page,
        has_more_comments: has_more_comments,
        isLoaded: true, errors: []
      });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
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

  async checkUpvote(id) {
    try {
      await this.api.get(`check-upvote/${id}/review`, true);
      this.setState({ upvoted: true });
    }
    catch (e) {
      this.setState({ upvoted: false });
    }
  }

  async checkOwner(id) {
    try {
      await this.api.get(`check-owner/${id}/review`, true);
      this.setState({ own_review: true });
    }
    catch (e) {
      this.setState({ own_review: false });
    }
  }

  async getMoreComments(id, page) {
    try {
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
        isLoading: '', errors: []
      });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e) });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
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

  handleClick = event => {
    this.setState({ isLoading: 'is-loading' });
    this.getMoreComments(this.state.review['id'], this.state.current_page + 1);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEdit = event => {
    this.setState({ editing: true });
  }

  handleSubmit = event => {
    this.setState({ commenting: 'is-loading' });
    const data = {
      comment: this.state.comment,
      entity_id: this.state.review['id'],
      entity: 'review'
    };
    this.submitComment(data);
    event.preventDefault();
  };

  handleEditSubmit = event => {
    if (this.state.edited_review_content === this.state.review.content) {
      toast.error('You have not made any change');
      event.preventDefault();
    }
    else {
      this.setState({ submitting_edit: 'is-loading' });
      const data = {
        id: this.state.review.id,
        content: this.state.edited_review_content,
        school: this.state.school_id
      };
      this.submitEditedReview(data);
      event.preventDefault();
    }
  };

  handleUpvote = event => {
    this.setState({ upvoting: 'is-loading' });
    this.upVote(this.state);
    this.setState({ key: Math.random() });
  };

  cancelEdit = () => {
    this.setState({ editing: false, edited_review_content: this.state.review.content });
  };

  async submitComment(data) {
    try {
      await this.api.post('add-comment', data, true);

      const reviewId = this.state.review['id'];
      toast.info('Comment added');
      this.getReview(reviewId);
      this.getComments(reviewId);
      this.setState({ comment: '', error: [], commenting: '' });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), commenting: '' });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error('An error occured')
        });
      }
    }
  }

  async submitEditedReview(data) {
    try {
      const res = await this.api.post('add-review', data, true);

      toast.info('Review edited');
      this.setState({ editing: false, submitting_edit: false, review: res.data })
    }
    catch (e) {
      this.setState({ submitting_edit: false });
      toast.error(`${errors_to_array}`);
    }
  }

  toggleUpvote() {
    if (this.state.upvoted === true)
      return false;
    return true;
  }

  async upVote(data) {
    try {
      await this.api.get(`upvote/${data.review['id']}/review`, true);

      if (this.toggleUpvote() === true) { toast.info('Upvoted'); }
      else { toast.info('Removed Upvote'); }

      const reviewId = this.state.review['id'];
      this.getReview(reviewId);
      this.setState({ upvoted: this.toggleUpvote(), errors: [], upvoting: '' });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), upvoting: '' });
      if (toast.isActive(this.state.toastId) || this.state.toastId) {
        toast.update(
          this.state.toastId,
          {
            render: `${this.state.errors}`,
            type: toast.TYPE.ERROR,
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

  render() {
    if (this.state.notFound) {
      return <ObjectNotFound object_model="Review" />;
    }

    let rendering;
    if (this.state.isLoaded) {
      rendering =
        <div className="container">
          <div className="columns">
            <div className="column" />

            <div className="column is-half">
              <div className="content">
                <p className="title has-text-centered">
                  <Link
                    className="has-text-black"
                    to={"/school/" + this.state.school_id}
                  >{this.state.school_name} Review</Link>
                  {' '}
                </p>
              </div>
            </div>

            <div className="column" />
          </div>


          <div className="review-body">
            <div className="box">
              <div className="media-content">
                <div className="content has-text-centered">
                  {this.state.editing ? (
                    <form onSubmit={this.handleEditSubmit}>
                      <div className="field">
                        <div className="control">
                          <textarea
                            className="textarea"
                            type="text"
                            name="edited_review_content"
                            value={this.state.edited_review_content}
                            onChange={this.handleChange}
                            placeholder="Write a review"
                            required
                          />
                        </div>
                        {this.state.errors.map((error, index) => (
                          <p key={'edit_review_error ' + index} className="help is-danger is-size-5">
                            {error}
                          </p>
                        ))}

                        <br />

                        <div className="field is-grouped is-grouped-centered">
                          <p className="control">
                            <button type="submit" className={"button is-success is-small " + this.state.submitting_edit}>
                              <i className="far fa-check-circle"></i>&nbsp;Submit
                          </button>
                          </p>
                          <p className="control">
                            <button onClick={this.cancelEdit} className="button is-small is-warning">
                              <i className="fas fa-ban"></i>&nbsp;Cancel
                          </button>
                          </p>
                        </div>

                        <br />
                      </div>
                    </form>
                  ) : (
                      <p className="subtitle has-text-weight-light">
                        <em>"{this.state.review.content}"</em>
                      </p>
                    )}
                </div>
                <hr />
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item has-text-dark">
                      {this.state.upvoted ? (
                        <button
                          className={"button is-default is-medium" + this.state.upvoting}
                          onClick={this.handleUpvote} key={this.state.key}>
                          <i className="fa fa-thumbs-down fa has-text-danger"></i>
                        </button>
                      ) : (
                          <button className={"button is-default is-medium " + this.state.upvoting}
                            onClick={this.handleUpvote} key={this.state.key}>
                            <i className="fa fa-thumbs-up fa has-text-success"></i>
                          </button>
                        )}
                      &nbsp;{this.state.review.upvotes}
                    </div>
                  </div>

                  {this.state.own_review ? (
                    <div className="level-right">
                      <div className="level-item has-text-dark">
                      <button title="Edit this review"
                        className={"button is-default is-medium " + this.state.editing}
                        onClick={this.handleEdit}>
                        <i className="far fa-edit"></i>
                      </button>
                      </div>
                    </div>
                  ) : (
                      ''
                    )}
                  </nav>
                </div>
            </div>

            <div className="gap-medium"></div>

            <div className="review-section">
              <h3 className="title">Your view?</h3>

              <hr />

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
                      name="comment"
                      type="text"
                      value={this.state.comment}
                      onChange={this.handleChange}
                      placeholder="Write a comment"
                      required
                    />
                  </div>
                  {this.state.errors.map((error, index) => (
                    <p key={'review_error ' + index} className="help is-danger is-size-5">
                      {error}
                    </p>
                  ))}
                  <br />
                  <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                      <button type="submit" className={"button is-warning " + this.state.commenting}>
                        <i className="fa fa-comment"></i> &nbsp;Post Comment
                  </button>
                    </p>
                  </div>
                </div>
              </form>

              <div className="gap-medium"></div>

              <h3 className="title">Comments
                ({this.state.review.comments_count})
              </h3>

              <hr />
              <br />

              {this.state.comments.map(comment => (
                <CommentCard key={'review_comment ' + comment.id} comment={comment} />
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
                <div className="has-text-centered">
                  <i className="fab fa-pied-piper-alt fa-7x"></i>
                  <br /><br />

                  <p>
                    <em>The end...</em>
                  </p>
                </div>
              )}
          </div>
        </div>
    }
    else {
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
              <h1 className="title"><i className="fa fa-users" /> Review</h1>
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
