import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TopSchools from './TopSchools';
import SuggestedMatches from './SuggestedMatches';
import TopReviews from './TopReviews';
import { ToastContainer, toast } from 'react-toastify';
import 'react-tabs/style/react-tabs.css';
import './Home.css';
import APIHelper, { errors_to_array } from '../../api-helpers.js';


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
      reviewsHaveLoaded: false,
      errors: []
    };
    this.toastId = null;
  }

  componentDidMount() {
    this.getSchools();
    this.getMatches();
    this.getReviews();
  }

  async getSchools() {
    this.setState({ schoolsHaveLoaded: false });
    try
    {
      const res = await this.api.get('top-schools');
      const topSchools = res.data;
      this.setState({ topSchools: topSchools, schoolsHaveLoaded: true });
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

  async getMatches() {
    this.setState({ matchesHaveLoaded: false });
    try
    {
      const res = await this.api.get('suggested-matches', true);
      const suggestedMatches = res.data;
      this.setState({ suggestedMatches: suggestedMatches, matchesHaveLoaded: true });
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

  async getReviews() {
    this.setState({ reviewsHaveLoaded: false });
    try
    {
      const res = await this.api.get('top-reviews');
      const topReviews = res.data;
      this.setState({ topReviews: topReviews, reviewsHaveLoaded: true });
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
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
      </Tabs>
    );
  }
}

export default Home;
