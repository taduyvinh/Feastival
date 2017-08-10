var translate = require('counterpart');

import axios from 'axios';
import * as constant from '../../constant';
import moment from 'moment';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class Voucher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    };
  }

    handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }


  render() {
    return(
      <div className='voucher' onClick={this.handleClick.bind(this)}>
        <div key={4}>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose.bind(this)}>
              <ModalDialog onClose={this.handleClose.bind(this)}>
                <div className='voucher-detail-info'>
                  <div className='container'>
                    <div className='row'>
                      <div className='voucher-info'>
                        <div className='restaurant-name'>
                          {this.props.restaurantName}
                        </div>
                        <button className='recv-vou-btn'>
                          {translate('app.vouchers.receive_voucher')}
                        </button>
                        <div className='time'>
                          <div className='from'>
                            <strong>{translate('app.vouchers.from')}:</strong> 
                            {moment(this.props.voucher.from).format('DD-MM-YYYY hh:mm')}
                          </div>
                          <div className='to'>
                            <strong>{translate('app.vouchers.from')}:</strong> 
                            {moment(this.props.voucher.to).format('DD-MM-YYYY hh:mm')}
                          </div>
                        </div>
                        <div className='description'>
                          {this.props.voucher.description}
                        </div>
                      </div>
                    </div>
                    <div className='footer'>
                      <div className='col-md-6 address-info'>
                        {translate('app.static-pages.address.title')}
                        <br/>
                        {translate('app.static-pages.address.content_1')}
                        <br/>
                        {translate('app.static-pages.address.content_2')}
                        <br/>
                      </div>
                      <div className='col-md-6 app-name'>
                        Feastival
                      </div>
                    </div>
                  </div>
                </div>
              </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div className='punch'></div>
        <div className='inner'>
          <div className='restaurant-name'>
            {this.props.restaurantName}
          </div>
          <div className='divider'>
            <i className='fa fa-star' aria-hidden='true'></i>
          </div>
          <div className='time'>
            <div className='from'>
              <strong>{translate('app.vouchers.from')}:</strong> 
              {moment(this.props.voucher.from).format('DD-MM-YYYY hh:mm')}
            </div>
            <div className='to'>
              <strong>{translate('app.vouchers.to')}:</strong> 
              {moment(this.props.voucher.to).format('DD-MM-YYYY hh:mm')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
