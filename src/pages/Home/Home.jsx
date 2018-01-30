import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TopSchools from "./TopSchools";
import SuggestedMatches from "./SuggestedMatches";
import TopReviews from "./TopReviews";
import "react-tabs/style/react-tabs.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSchools: [],
      suggestedMatches: [],
      topReviews: [],
      schoolsHaveLoaded: false,
      matchesHaveLoaded: false,
      reviewsHaveLoaded: false,
    };
  }

  componentDidMount() {
    this.getSchools();
    this.getMatches();
    this.getReviews();
  }

  getSchools() {
    this.setState({ schoolsHaveLoaded: false });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-schools`)
      .then(res => {
        const topSchools = res.data;
        this.setState({ topSchools, schoolsHaveLoaded: true });
      });
  }

  getMatches() {
    this.setState({ matchesHaveLoaded: false });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/suggested-matches`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`
        }
      })
      .then(res => {
        const suggestedMatches = res.data;
        this.setState({ suggestedMatches, matchesHaveLoaded: true });
      });
  }

  getReviews() {
    this.setState({ reviewsHaveLoaded: false });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-reviews`)
      .then(res => {
        const topReviews = res.data;
        this.setState({ topReviews, reviewsHaveLoaded: true });
      });
  }

  render() {
    return (
      <Tabs>
        <div className="tabs is-toggle columns is-centered" style={{ margin: 0 }}>
          <ul>
            <TabList>
              <Tab>
                <li>
                  <a>
                    <span className="icon">
                      <i className="fas fa-trophy" />
                    </span>
                    <span>Top Schools</span>
                  </a>
                </li>
              </Tab>
              <Tab>
                <li>
                  <a>
                    <span className="icon">
                      <i className="fas fa-flag" />
                    </span>
                    <span>Suggested Matches</span>
                  </a>
                </li>
              </Tab>
              <Tab>
                <li>
                  <a>
                    <span className="icon">
                      <i className="fas fa-comment-alt" />
                    </span>
                    <span>Top Reviews</span>
                  </a>
                </li>
              </Tab>
            </TabList>
          </ul>
        </div>

        <TabPanel>
          <TopSchools schools={this.state.topSchools} isLoaded={this.state.schoolsHaveLoaded} />
        </TabPanel>
        <TabPanel>
          <SuggestedMatches matches={this.state.suggestedMatches} isLoaded={this.state.matchesHaveLoaded} />
        </TabPanel>
        <TabPanel>
          <TopReviews reviews={this.state.topReviews} isLoaded={this.state.reviewsHaveLoaded} />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Home;
