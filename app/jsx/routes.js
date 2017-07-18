import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages';
import Login from './components/login'
import UserInfo from './components/user_info'

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/userinfo' component={UserInfo}/>
  </Router>
)
export default Routes
