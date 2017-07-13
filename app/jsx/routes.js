import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages';
import Login from './components/login'

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/login' component={Login}/>
  </Router>
)
export default Routes
