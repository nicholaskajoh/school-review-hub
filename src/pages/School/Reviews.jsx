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
      errors: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getReviews(nextProps.schoolId, 1);
  }

  componentDidMount() {
    this.getReviews(this.props.schoolId, 1);
  }

  async getReviews(id, page) {
    try
    {
      const res = await this.api.get(`school/${id}/reviews/${page}`);
      const reviews = res.data;
      this.hasPrevPage = res.headers['x-has-previous'].toLowerCase() === 'true';
      this.hasNextPage = res.headers['x-has-next'].toLowerCase() === 'true';
      this.setState({ reviews:reviews, page:page });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e) });
      toast.error('An error occured');
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
    return (
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <i className="fa fa-users" /> Reviews
              </h1>
            </div>
          </div>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
        </section>
        <div className="columns is-centered">
          <section className="column is-6 section">
            <Link
              to={`/add-review/${this.props.schoolId}`}
              className="button is-danger"
            >
              <span className="icon">
                <i className="fa fa-file-alt" />
              </span>
              <span>Publish Review on school</span>
            </Link>
            <br />
            <br />
            {this.state.reviews.map(review => (
              <div className="card review">
                <header className="card-header">
                  <p className="card-header-title">
                    <strong><TimeAgo>{new Date(review.created_at)}</TimeAgo></strong>
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">{review.content}</div>
                </div>
                <footer className="card-footer">
                  <div className="card-footer-item">
                    <Link to={"/review/" + review.id}>Full review</Link>
                  </div>
                  <div className="card-footer-item">
                    Upvotes ({review.upvotes})
                  </div>
                  <div className="card-footer-item">
                    Comments ({review.comments_count})
                  </div>
                </footer>
              </div>
            ))}
            <br />
            {this.state.reviews.length === 0 ? (
              <p className="has-text-centered">No reviews yet!</p>
            ) : (
              <nav className="pagination">
                <button
                  className="button is-link"
                  onClick={this.prevPage}
                  disabled={!this.hasPrevPage}
                >
                  Previous
                </button>
                <button
                  className="button is-link"
                  onClick={this.nextPage}
                  disabled={!this.hasNextPage}
                >
                  Next
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Reviews;
