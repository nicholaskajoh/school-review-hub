import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIHelper from "../../api-helpers.js";


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      reviews: [],
      page: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getReviews(nextProps.schoolId, 1);
  }

  componentDidMount() {
    this.getReviews(this.props.schoolId, 1);
  }

  getReviews(id, page) {
    this.api.get(`school/${id}/reviews/${page}`)
      .then(res => {
        const reviews = res.data;
        this.hasPrevPage = (res.headers['x-has-previous'].toLowerCase() === "true");
        this.hasNextPage = (res.headers['x-has-next'].toLowerCase() === "true");
        this.setState({ reviews, page });
      });
  }

  prevPage = () => {
    if (this.hasPrevPage) {
      this.getReviews(this.props.schoolId, this.state.page - 1);
    }
  }

  nextPage = () => {
    if (this.hasNextPage) {
      this.getReviews(this.props.schoolId, this.state.page + 1);
    }
  }

  render() {
    return (
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <i className="fa fa-users"></i> Reviews
                            </h1>
            </div>
          </div>
        </section>

        <section className="section">
          {this.state.reviews.map(review =>
            <div className="card review">
              <header className="card-header">
                <p className="card-header-title">
                  Last updated {review.updated_at}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  {review.content}
                </div>
              </div>
              <footer className="card-footer">
                {/* <div className="card-footer-item">
                                    <Link to={"/review/" + review.id}>Full review</Link>
                                </div> */}
                <div className="card-footer-item">
                  Upvotes ({review.upvotes})
                                </div>
                <div className="card-footer-item">
                  Comments ({review.comments_count})
                                </div>
              </footer>
            </div>
          )}

          {this.state.reviews.length === 0 ?
            <p className="has-text-centered">No reviews yet!</p>
            :
            <nav className="pagination">
              <button className="button is-link" onClick={this.prevPage} disabled={!this.hasPrevPage}>Previous</button>
              <button className="button is-link" onClick={this.nextPage} disabled={!this.hasNextPage}>Next</button>
            </nav>
          }
        </section>
      </div>
    );
  }
}

export default Reviews;
