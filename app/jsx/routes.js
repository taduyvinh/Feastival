import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages';
import Signup from './components/signup';
import Login from './components/login';
import UserInfo from './components/user_info';
import RestaurantsList from './components/restaurants_list';
import RestaurantInfo from './components/restaurant_info';
import ShowMap from './components/show_map';
import UserUpdate from './components/user_update';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/login' component={Login}/>
    <Route path='/my-profile' component={UserUpdate}/>
    <Route path='/users/:user_id' component={UserInfo}/>
    <Route path='/restaurants' component={RestaurantsList}/>
    <Route path='/restaurants/:restaurant_id' component={RestaurantInfo}/>
    <Route path='/showmap' component={ShowMap}/>
  </Router>
);
export default Routes;
