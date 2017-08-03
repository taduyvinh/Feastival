let translate = require('counterpart');

import axios from 'axios';
import * as constant from  '../../constant';
import Restaurant from './restaurant';
import AlertContainer from 'react-alert';

export default class RestaurantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png' />
    });
  }

  componentWillMount() {
    axios.get(constant.API_RESTAURANTS_URL, constant.headers)
      .then(response => {
        this.setState({restaurants: response.data.restaurants});
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  handleRestaurantClick(restaurant_id) {
    window.location = constant.RESTAURANTS_URL + restaurant_id
  }

  render() {
    return (
      <div className='restaurants'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        {
          this.state.restaurants.map(restaurant => {
            return (
              <Restaurant
                restaurant={restaurant}
                key={restaurant.id}
                onButtonClick={this.handleRestaurantClick.bind(restaurant.id)}
              />
            );
          })
        }
      </div>
    );
  }
}
