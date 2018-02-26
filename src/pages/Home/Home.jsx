import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TopSchools from "./TopSchools";
import SuggestedMatches from "./SuggestedMatches";
import TopReviews from "./TopReviews";
import "react-tabs/style/react-tabs.css";
import "./Home.css";
import APIHelper from "../../api-helpers.js";


class Home extends Component {
  constructor(props) {
    super(props);
    this.api = new APIHelper();
    this.state = {
      topSchools: [],
      suggestedMatches: [],
      topReviews: [],
      schoolsHaveLoaded: false,
      matchesHaveLoaded: false,
      reviewsHaveLoaded: false
    };
  }

  componentDidMount() {
    this.getSchools();
    this.getMatches();
    this.getReviews();
  }

  getSchools() {
    this.setState({ schoolsHaveLoaded: false });
    
    this.api.get('top-schools')
      .then(res => {
        const topSchools = res.data;
        this.setState({ topSchools, schoolsHaveLoaded: true });
      });
  }

  getMatches() {
    this.setState({ matchesHaveLoaded: false });
    
    this.api.get('suggested-matches', true)
      .then(res => {
        const suggestedMatches = res.data;
        this.setState({ suggestedMatches, matchesHaveLoaded: true });
      }).catch(e => {
        if (e.response.status === 401)
        {
          localStorage.removeItem("authToken");
          window.location.replace("/login");
        }
      });
  }

  getReviews() {
    this.setState({ reviewsHaveLoaded: false });

    this.api.get('top-reviews')
      .then(res => {
        const topReviews = res.data;
        this.setState({ topReviews, reviewsHaveLoaded: true });
      });
  }

  render() {

    return (
      <Tabs>
        <div
          className="tabs is-toggle columns is-centered"
          style={{ margin: 0 }}
        >
          <ul>
            <TabList>
              <Tab>
                <a>
                  <span className="icon">
                    <i className="fas fa-trophy" />
                  </span>
                  <span>Top Schools</span>
                </a>
              </Tab>
              <Tab>
                <a>
                  <span className="icon">
                    <i className="fas fa-flag" />
                  </span>
                  <span>Suggested Matches</span>
                </a>
              </Tab>
              <Tab>
                <a>
                  <span className="icon">
                    <i className="fas fa-comment-alt" />
                  </span>
                  <span>Top Reviews</span>
                </a>
              </Tab>
            </TabList>
          </ul>
        </div>

        <TabPanel>
          <TopSchools
            schools={this.state.topSchools}
            isLoaded={this.state.schoolsHaveLoaded}
        />
        </TabPanel>
        <TabPanel>
          <SuggestedMatches
            matches={this.state.suggestedMatches}
            isLoaded={this.state.matchesHaveLoaded}
          />
        </TabPanel>
        <TabPanel>
          <TopReviews
            reviews={this.state.topReviews}
            isLoaded={this.state.reviewsHaveLoaded}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Home;
