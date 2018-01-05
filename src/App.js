import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import IndexLanding from './pages/IndexLanding/IndexLanding';
import Home from './pages/Home/Home';
import SRHIndex from './pages/SRHIndex/SRHIndex';
import Match from './pages/Match/Match';
import Search from './pages/Search/Search';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';
import ReviewForm from './pages/ReviewForm/ReviewForm';
import Review from './pages/Review/Review';
import School from './pages/School/School';
import Report from './pages/Report/Report';
import NotFound from './pages/NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <DefaultLayout path="/" exact component={IndexLanding}/>
          <DefaultLayout path="/home" component={Home}/>
          <DefaultLayout path="/srh-index" component={SRHIndex}/>
          <DefaultLayout path="/match" component={Match}/>
          <DefaultLayout path="/search" component={Search}/>
          <DefaultLayout path="/register" component={Register}/>
          <DefaultLayout path="/login" component={Login}/>
          <DefaultLayout path="/profile" component={Profile}/>
          <DefaultLayout path="/help" component={Help}/>
          <DefaultLayout path="/review-form" component={ReviewForm}/>
          <DefaultLayout path="/review/:id" component={Review}/>
          <DefaultLayout path="/school/:name" component={School}/>
          <DefaultLayout path="/report/:id" component={Report}/>
          <DefaultLayout component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;