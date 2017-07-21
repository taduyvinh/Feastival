import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages';
import Login from './components/login';
import UserInfo from './components/user_info';
import RestaurantsList from './components/restaurants_list';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/users/:user_id' component={UserInfo}/>
    <Route path='/restaurants' component={RestaurantsList}/>
  </Router>
)
export default Routes
