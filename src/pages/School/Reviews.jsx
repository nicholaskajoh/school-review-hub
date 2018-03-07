import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import APIHelper, { errors_to_array } from '../../api-helpers.js';
import TimeAgo from 'react-time-ago';


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      reviews: [],
      page: 1,
      isLoaded: false,
      toastId: null,
      errors: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getReviews(nextProps.schoolId, 1);
  }

  componentDidMount() {
    this.getReviews(this.props.schoolId, 1);
    window.scrollTo(0, 0);
  }

  async getReviews(id, page) {
    try {
      const res = await this.api.get(`school/${id}/reviews/${page}`);
      const reviews = res.data;
      this.hasPrevPage = res.headers['x-has-previous'].toLowerCase() === 'true';
      this.hasNextPage = res.headers['x-has-next'].toLowerCase() === 'true';
      this.setState({ reviews: reviews, page: page, isLoaded: true });
    }
    catch (e) {
      this.setState({ errors: errors_to_array(e), isLoaded: false });
      if (toast.isActive(this.state.toastId)) {
        toast.update(
          this.state.toastId,
          {
            render: 'An error occured while loading reviews',
            type: toast.TYPE.ERROR,
          }
        )
      }
      else {
        this.setState({
          toastId: toast.error('An error occured while loading reviews')
        });
      }
    }
  }

  prevPage = () => {
    if (this.hasPrevPage) {
      this.getReviews(this.props.schoolId, this.state.page - 1);
    }
  };

  nextPage = () => {
    if (this.hasNextPage) {
      this.getReviews(this.props.schoolId, this.state.page + 1);
    }
  };

  render() {
    let rendering;
    if (this.state.isLoaded) {
      rendering =
        <div className="section">
          <div className="columns is-multiline">
            {this.state.reviews.map(review => (
              <div className="column is-4">

                <div className="box">
                  <article className="media">

                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>Anonymous</strong> <small>@anonymous</small>

                          <br />
                          {review.content.substr(0, 280)}

                          <br /><br />

                          <small><em><Link to={"/review/" + review.id}>Read more</Link></em></small>
                        </p>
                      </div>

                      <hr />

                      <nav className="level is-mobile">
                        <div className="level-left">
                          <a className="level-item has-text-dark">
                            <span className="icon is-small has-text-success">
                              <i class="fa fa-thumbs-up"></i></span>
                            &nbsp;{review.upvotes}
                          </a>

                          &nbsp;&nbsp;
                          <a className="level-item has-text-dark">
                            <span className="icon is-small has-text-warning"><i class="fas fa-comment"></i></span>
                            &nbsp;{review.comments_count}
                          </a>
                        </div>
                        <div className="level-right">
                          <small className="media-right"><TimeAgo>{new Date(review.created_at)}</TimeAgo></small>
                        </div>
                      </nav>
                    </div>
                  </article>
                </div>

              </div>
            ))}
          </div>

          <div>
            {this.state.reviews.length === 0 ? (
              <div className="has-text-centered">
                <i class="fas fa-file-alt has-text-light fa-5x"></i>
                <br /><br />
                <h1 className="subtitle">No reviews yet!</h1>
              </div>
            ) : (
                <div>
                  <br />
                  <nav className="pagination">
                    <button
                      className="button is-default"
                      onClick={this.prevPage}
                      disabled={!this.hasPrevPage}
                    >
                      <i class="fas fa-arrow-left"></i>&nbsp;Previous
                  </button>
                    <button
                      className="button is-default"
                      onClick={this.nextPage}
                      disabled={!this.hasNextPage}
                    >
                      Next &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
                    </button>
                  </nav>
                </div>
              )}
            <div className="gap-small"></div>
          </div>
        </div>
    }
    else {
      rendering =
        <div title="Reload reviews" className="has-text-centered">
          <br />
          <button className="reload-btn" onClick={this.componentDidMount}>
            <i className="fa fa-redo-alt fa-2x" />
          </button>
          <br />
        </div>
    }

    return (
      <div>
        <div className="gap-small"></div>
        <section className="hero star-pattern is-light">
          <div className="hero-body">
            <div className="container">

              <article className="media">
                <div className="media-left">
                  <h1 className="title has-text-darkblue">
                    <i className="fa fa-users" /> Reviews
                  </h1>
                </div>
                <div className="media-content"></div>
                <div className="media-right">
                  <Link
                    to={`/add-review/${this.props.schoolId}`}
                    className="button is-danger"
                  >
                    <span className="icon">
                      <i className="fa fa-comment" />
                    </span>
                    <span>New Review</span>
                  </Link>
                </div>
              </article>

            </div>
          </div>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
        </section>
        {rendering}
      </div>
    );
  }
}

export default Reviews;
