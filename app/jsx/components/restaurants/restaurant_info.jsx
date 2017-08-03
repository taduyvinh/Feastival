let translate = require('counterpart');

import * as constant from  '../../constant';
import axios from 'axios';
import AlertContainer from 'react-alert';

export default class RestaurantInfo extends React.Component {
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
          id: this.props.id,
          title: response.data.restaurant.title,
          address: response.data.restaurant.address,
          phonenumber: response.data.restaurant.phonenumber,
          description: response.data.restaurant.description,
          website: response.data.restaurant.website
        });
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  updateRestaurantInfo() {
    let formData = new FormData();
    formData.append('restaurant[title]', this.state.title);
    formData.append('restaurant[address]', this.state.address);
    formData.append('restaurant[phonenumber]', this.state.phonenumber);
    formData.append('restaurant[description]', this.state.description);
    formData.append('restaurant[website]', this.state.website);

    axios.patch(constant.API_RESTAURANTS_URL + this.props.params.restaurant_id,
      formData, constant.headers)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        this.showAlert(translate('app.error.error_validate'));
      });
  }

  componentWillMount() {
    this.getRestaurantInfoById(this.props.params.restaurant_id);
  }

  handleUpdateInfo() {
    this.updateRestaurantInfo();
  }

  handleChangeInfo(event) {
    let target = event.target;
    this.setState({[target.name]: target.value});
  }

  checkNullInfo(restaurant) {
    restaurant.title = restaurant.title || '';
    restaurant.address = restaurant.address || '';
    restaurant.phonenumber = restaurant.phonenumber || '';
    restaurant.website = restaurant.website || '';
    restaurant.description = restaurant.description || '';
  }

  render() {
    return (
      <div className='container'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='restaurant-info'>
          <div className='row'>
            <div className='col-md-5 restaurant-ava'>
              <img src='/assets/banner.jpg'/>
            </div>
            <div className='col-md-7 update-form'>
              <div className='title'>
                <i className='fa fa-pencil' aria-hidden='true'></i>
                <div className='content'>
                  {translate('app.restaurant_info.update_title')}
                </div>
              </div>
              <input type='text' placeholder={translate('app.restaurant_info.title')}
                className='form-control empty'
                value={this.state.title}
                name='title'
                onChange={this.handleChangeInfo.bind(this)}/>
              <input type='text' placeholder={translate('app.restaurant_info.address')}
                className='form-control empty'
                value={this.state.address}
                name='address'
                onChange={this.handleChangeInfo.bind(this)}/>
              <input type='text' placeholder={translate('app.restaurant_info.phonenumber')}
                className='form-control empty'
                value={this.state.phonenumber}
                name='phonenumber'
                onChange={this.handleChangeInfo.bind(this)}/>
              <input type='text' placeholder={translate('app.restaurant_info.website')}
                className='form-control empty'
                value={this.state.website}
                name='website'
                onChange={this.handleChangeInfo.bind(this)}/>
              <input type='text' placeholder={translate('app.restaurant_info.description')}
                className='form-control empty'
                value={this.state.description}
                name='description'
                onChange={this.handleChangeInfo.bind(this)}/>
              <button className='btn btn-primary'
                onClick={this.handleUpdateInfo.bind(this)}>
                {translate('app.user_info.update')}</button>
            </div>
          </div>
          <div className='row gallery'>
            <div className='col-md-3'>
              <img src='/assets/pic1.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic2.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic3.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic4.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic5.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic6.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic7.jpg'/>
            </div>
            <div className='col-md-3'>
              <img src='/assets/pic8.jpg'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
