let translate = require('counterpart');

import * as constant from  '../../constant';
import axios from 'axios';
import AlertContainer from 'react-alert';
import Vouchers from '../vouchers/index.jsx';

export default class RestaurantShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': '',
      'title': '',
      'address': '',
      'phonenumber': '',
      'description': '',
      'website': ''
    }
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png' />
    });
  }

  getRestaurantInfoById(id) {
    axios.get(constant.API_RESTAURANTS_URL + id, constant.headers)
      .then(response => {
        this.checkNullInfo(response.data.restaurant);
        this.setState({
          title: response.data.restaurant.title,
          address: response.data.restaurant.address,
          phonenumber: response.data.restaurant.phonenumber,
          description: response.data.restaurant.description,
          website: response.data.restaurant.website
        });
      })
      .catch(error => {
        this.showAlert(error);
      });
  }

  checkNullInfo(restaurant) {
    restaurant.title = restaurant.title || '';
    restaurant.address = restaurant.address || '';
    restaurant.phonenumber = restaurant.phonenumber || '';
    restaurant.website = restaurant.website || '';
    restaurant.description = restaurant.description || '';
  }

  componentWillMount() {
    this.getRestaurantInfoById(this.props.params.restaurant_id);
  }

  render(){
    return(
      <div className='container restaurant-show'>
        <div className='row main-info'>
          <div className='col-md-5 restaurant-ava'>
            <img src='/assets/banner.jpg'/>
          </div>
          <div className='col-md-7 base-info'>
            <div className='title'>{this.state.title}</div>
            <div className='address'>
              <i className='fa fa-map-marker' aria-hidden='true'></i>
              {this.state.address}
            </div>
            <br/>
            <div className='phonenumber'>
              <i className='fa fa-phone' aria-hidden='true'></i>
              {this.state.phonenumber}
            </div>
            <div className='website'>
              <i className='fa fa-safari' aria-hidden='true'></i>
              {this.state.website}
            </div>
            <div className='description'>
              <i className='fa fa-pencil' aria-hidden='true'></i>
              {this.state.description}
            </div>
          </div>
        </div>
        <div className='row footer-info'>
          <div className='col-md-5'>
            <div className='album'>
              <div className='tag'>Album</div>
              <img src='/assets/pic1.jpg'/>
              <img src='/assets/pic2.jpg'/>
              <img src='/assets/pic3.jpg'/>
              <img src='/assets/pic4.jpg'/>
              <img src='/assets/pic5.jpg'/>
            </div>
          </div>
          <div className='col-md-7'>
            <Vouchers restaurantName={this.state.title}
              restaurantId={this.props.params.restaurant_id}/>
          </div>
        </div>
      </div>
    );
  }
}
