let translate = require('counterpart');

import axios from 'axios';
import * as constant from  '../constant';
import Restaurant from './restaurant';

export default class RestaurantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentWillMount() {
    axios.get(constant.API_RESTAURANTS_URL, constant.headers)
      .then(response => {
        this.setState({restaurants: response.data.restaurants});
      })
      .catch(function(error) {
        alert(error);
      });
  }

  render() {
    return (
      <div className='restaurants'>
        {
          this.state.restaurants.map(restaurant => {
            return <Restaurant restaurant={restaurant} key={restaurant.id} />;
          })
        }
      </div>
    );
  }
}
