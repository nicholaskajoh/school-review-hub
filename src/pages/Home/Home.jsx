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

      schoolsErrorLoading: false,
      matchesErrorLoading: false,
      reviewsErrorLoading: false,

      schoolsSpinner: 'fa-spinner fa-spin',
      matchesSpinner: 'fa-spinner fa-spin',
      reviewsSpinner: 'fa-spinner fa-spin',
      toastId: null,
      errors: []
    };
    this.getSchools = this.getSchools.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.getReviews = this.getReviews.bind(this);

  }

  componentDidMount() {
    this.getSchools();
    this.getMatches();
    this.getReviews();
  }

  async getSchools() {
    this.setState({ schoolsHaveLoaded: false, schoolsErrorLoading: false,
      schoolsSpinner: 'fa-spinner fa-spin' });
    try
    {
      const res = await this.api.get('top-schools');
      const topSchools = res.data;
      this.setState({ topSchools: topSchools, schoolsHaveLoaded: true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e),
        schoolsErrorLoading:true, schoolsSpinner:'fa-redo-alt'
      });
      if (toast.isActive(this.state.toastId))
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

  async getMatches() {
    this.setState({ matchesHaveLoaded: false, matchesErrorLoading: false,
      matchesSpinner: 'fa-spinner fa-spin' });
    try
    {
      const res = await this.api.get('suggested-matches', true);
      const suggestedMatches = res.data;
      this.setState({ suggestedMatches: suggestedMatches, matchesHaveLoaded: true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), matchesErrorLoading:true,
        matchesSpinner:'fa-redo-alt' });
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

  async getReviews() {
    this.setState({ reviewsHaveLoaded: false, reviewsErrorLoading:false,
      reviewsSpinner: 'fa-spinner fa-spin' });
    try
    {
      const res = await this.api.get('top-reviews');
      const topReviews = res.data;
      this.setState({ topReviews: topReviews, reviewsHaveLoaded: true });
    }
    catch (e)
    {
      this.setState({ errors: errors_to_array(e), reviewsErrorLoading:true,
        reviewsSpinner:'fa-redo-alt' });
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
            errorLoading={this.state.schoolsErrorLoading}
            spinner={this.state.schoolsSpinner}
            reload={this.getSchools}
        />
        </TabPanel>
        <TabPanel>
          <SuggestedMatches
            matches={this.state.suggestedMatches}
            isLoaded={this.state.matchesHaveLoaded}
            errorLoading={this.state.matchesErrorLoading}
            spinner={this.state.matchesSpinner}
            reload={this.getMatches}
          />
        </TabPanel>
        <TabPanel>
          <TopReviews
            reviews={this.state.topReviews}
            isLoaded={this.state.reviewsHaveLoaded}
            errorLoading={this.state.reviewsErrorLoading}
            spinner={this.state.reviewsSpinner}
            reload={this.getReviews}
          />
        </TabPanel>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
      </Tabs>
    );
  }
}

export default Home;
