import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages/static_pages';
import Signup from './components/users/signup';
import Login from './components/users/login';
import UserInfo from './components/users/user_info';
import RestaurantsList from './components/restaurants/restaurants_list';
import RestaurantInfo from './components/restaurants/restaurant_info';
import RestaurantShow from './components/restaurants/show';
import GroupIndex from './components/groups/index';
import UserUpdate from './components/users/user_update';
import GroupShowInfo from './components/groups/show_info';
import GroupShow from './components/groups/show';
import GroupCreate from './components/groups/create';
import GroupUserIndex from './components/group_users/index';
import VoucherCreate from './components/vouchers/create';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/login' component={Login}/>
    <Route path='/my-profile' component={UserUpdate}/>
    <Route path='/users/:user_id' component={UserInfo}/>
    <Route path='/restaurants' component={RestaurantsList}/>
    <Route path='/restaurants/:restaurant_id/update' component={RestaurantInfo}/>
    <Route path='/restaurants/:restaurant_id' component={RestaurantShow}/>
    <Route path='/groups' component={GroupIndex}/>
    <Route path='/groups/:group_id' component={GroupShow}/>
    <Route path='/groups/:group_id/info' component={GroupShowInfo}/>
    <Route path='/new-group' component={GroupCreate}/>
    <Route path='/groups/:group_id/requests' component={GroupUserIndex} />
    <Route path='/restaurants/:restaurant_id/new-voucher' component={VoucherCreate} />
  </Router>
);
export default Routes;
