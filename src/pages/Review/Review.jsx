import React, { Component } from 'react';
import './Review.css';
import Comment from './../../partials/Comment/Comment';
import CommentCard from './../../partials/CommentCard/CommentCard';
import APIHelper from "../../api-helpers.js";


class Review extends Component{
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      review: [],
      school_name: "",
      schoool_id : "",
      comments: "",
      isloading: "" 
    };
  }
  
	componentWillReceiveProps(nextProps) {
    const reviewId = nextProps.match.params.id;
		this.getReview(reviewId);
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
  }

  render(){
    return(
      <div className="section">
        <div className="container">

          <div className="columns">
            <div className="column"></div>

            <div className="column">
              <div className="content ">
                <p>
                  <strong className="title" >
                  <a className="has-text-black" href={"/school/" + this.state.schoool_id}>
                   { this.state.school_name }
                   </a>
                  </strong>
                  <br></br>
                </p>
              </div>
            </div>

            <div className="column"></div>
          </div>

          <div className="review-body">
            <hr></hr>

            {/* Move this to seperate card, and display on an optional basis*/}
            <div className="review-section">
              <p>
                { this.state.review.content }
              </p>

            </div>

            <hr className="review-hr" />

            <div className="review-section upvote-section">

              <div id="upvote-text">
                <h3 className="text-bold">What's your view towards this review?</h3>
                <h5>By upvoting, you can signal to others which review really stand out.</h5>
              </div>
            </div>

            <hr className="review-hr" />


            <div className="review-section comment-section">
              <h3 className="title">Your view ?</h3>
              <p>Whats your opinion? Do feel this is review is rightly spoken? Why not let others see the other side of the coin through your perspective.</p>
              <br />
              <Comment />
              <br /><br /><br />

              <h3 className="title">Comments:</h3>
              <p>Just as the saying goes, for every action, there is always an equal and opposite reaction.<br />Feel free and see what others are saying.</p>
              <br />

              
            </div>

            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button className={"button is-danger " + this.state.isLoading} id="post-comment-btn" onClick={this.handleClick}>Load more comment</button>
              </p>
            </div>


          </div>
        </div >
      </div >
    );
  }
}
export default Review;
