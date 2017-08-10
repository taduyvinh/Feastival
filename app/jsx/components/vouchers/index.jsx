var translate = require('counterpart');

import axios from 'axios';
import * as constant from '../../constant';
import AlertContainer from 'react-alert';

import Voucher from './show.jsx';

export default class Vouchers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchers: []
    };
  }

  componentWillMount() {
    axios.get(constant.API_RESTAURANTS_URL + this.props.restaurantId +
      constant.API_VOUCHERS_URL, constant.headers)
      .then(response => {
        this.setState({vouchers: response.data.voucher});
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png' />
    });
  }

  render() {
    return (
      <div className='vouchers'>
        <div className='tag'>Vouchers</div>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        {
          this.state.vouchers.map((voucher, index) => {
            return (
              <Voucher
                restaurantName={this.props.restaurantName}
                voucher={voucher}
                key={voucher.id}
                onButtonClick={() => this.handleVoucherClick(voucher.id)}
              />
            );
          })
        }
      </div>
    )
  }
}
