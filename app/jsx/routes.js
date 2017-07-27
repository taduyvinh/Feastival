import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages/static_pages';
import Signup from './components/users/signup';
import Login from './components/users/login';
import UserInfo from './components/users/user_info';
import RestaurantsList from './components/restaurants/restaurants_list';
import RestaurantInfo from './components/restaurants/restaurant_info';
import ShowMap from './components/groups/show_map';
import UserUpdate from './components/users/user_update';
import Group_Overview from './components/groups/group_overview'
import GroupCreate from './components/groups/create';

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
    <Route path='/group-over-view' component={Group_Overview}/>
    <Route path='/new-group' component={GroupCreate}/>
  </Router>
);
export default Routes;
