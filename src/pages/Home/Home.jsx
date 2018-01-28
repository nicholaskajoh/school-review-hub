import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TopSchools from './TopSchools'; 
import SuggestedMatches from './SuggestedMatches';
import TopReviews from './TopReviews';
import 'react-tabs/style/react-tabs.css';
import './Home.css';

class Home extends Component{
	constructor(props) {
    super(props);
		this.state = {
			topSchools: [],
			suggestedMatches: [],
			topReviews: []
		};
	}
	
	componentDidMount() {
		this.getSchools();
		this.getMatches();
		this.getReviews();
	}

	getSchools() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-schools`)
      .then(res => {
				const topSchools = res.data;
				this.setState({ topSchools });
      });
	}

	getMatches() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/suggested-matches`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("authToken")}`
      }
    })
    .then(res => {
      const suggestedMatches = res.data;
      this.setState({ suggestedMatches });
    });
	}

	getReviews() {
		axios.get(`${process.env.REACT_APP_API_DOMAIN_NAME}/api/top-reviews`)
      .then(res => {
			const topReviews = res.data;
			this.setState({ topReviews });
      });
	}

	render () {
		return (
      <Tabs>
        <div className="section">
          <div className="tabs is-toggle is-fullwidth is-small" style={{marginBottom: 0}}>
            <ul>
              <TabList>
                <Tab>
                  <li>
                    <a>
                      <span className="icon"><i className="fas fa-trophy"></i></span>
                      <span>Top Schools</span>
                    </a>
                  </li>
                </Tab>
                <Tab>
                  <li>
                    <a>
                      <span className="icon"><i className="fas fa-flag"></i></span>
                      <span>Suggested Matches</span>
                    </a>
                  </li>
                </Tab>
                <Tab>
                  <li>
                    <a>
                      <span className="icon"><i className="fas fa-comment-alt"></i></span>
                      <span>Top Reviews</span>
                    </a>
                  </li>
                </Tab>
              </TabList>
            </ul>
          </div>

          <TabPanel>
            <TopSchools schools={this.state.topSchools}/>
          </TabPanel>
          <TabPanel>
            <SuggestedMatches matches={this.state.suggestedMatches}/>
          </TabPanel>
          <TabPanel>
            <TopReviews reviews={this.state.topReviews}/>
          </TabPanel>
        </div>
      </Tabs>			
		);
	}
}

export default Home;