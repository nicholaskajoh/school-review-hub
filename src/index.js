import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bulma.min.css';
import './index.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import PrivateRoute from './auth';
import IndexLanding from './pages/IndexLanding/IndexLanding';
import Home from './pages/Home/Home';
import SRHIndex from './pages/SRHIndex/SRHIndex';
// import Match from './pages/Match/Match';
// import Search from './pages/Search/Search';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';
import RatingForm from './pages/RatingForm/RatingForm';
import Review from './pages/Review/Review';
import School from './pages/School/School';
import Report from './pages/Report/Report';
import NotFound from './pages/NotFound/NotFound';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <DefaultLayout path="/" exact component={IndexLanding}/>
          <PrivateRoute path="/home" component={Home}/>
          <DefaultLayout path="/srh-index" component={SRHIndex}/>
          {/* <PrivateRoute path="/match" component={Match}/> */}
          {/* <DefaultLayout path="/search" component={Search}/> */}
          <DefaultLayout path="/register" component={Register}/>
          <DefaultLayout path="/login" component={Login}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <DefaultLayout path="/help" component={Help}/>
          <PrivateRoute path="/rate/:school1Id/:school2Id" component={RatingForm}/>
          <DefaultLayout path="/review/:id" component={Review}/>
          <DefaultLayout path="/school/:id" component={School}/>
          <DefaultLayout path="/report/:id" component={Report}/>
          <Route path="/logout" component={Logout}/>
          <DefaultLayout component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App /> , document.getElementById('root'));
registerServiceWorker();