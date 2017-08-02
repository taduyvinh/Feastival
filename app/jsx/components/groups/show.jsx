import MapForShow from './map_only_show';
import ChatBubble from 'react-chat-bubble';
import * as constant from  '../../constant';

let translate = require('counterpart');

export default class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover_image: 'http://cdn.thedesigninspiration.com/wp-content/uploads/2012/06/Facebook-Covers-017.jpg',
      messages: [
        {
          'type': 0,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Morning!',
          'time': '12:00'
        }, {
          'type': 1,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Afternoon!',
          'time': '12:00'
        },
        {
          'type': 0,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Morning!',
          'time': '12:00'
        }, {
          'type': 1,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Afternoon!',
          'time': '12:00'
        },
        {
          'type': 0,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Morning!',
          'time': '12:00'
        }, {
          'type': 1,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Afternoon!',
          'time': '12:00'
        }, {
          'type': 0,
          'image': constant.DEFAULT_AVATAR,
          'text': 'Hello! Good Morning!',
          'time': '12:00'
        },
      ]
    }
  }

  render() {
    return (
      <section className='group-chat'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-offset-2 col-md-8 col-sm-8 pmd-card pmd-z-depth-1'>
            <div className='row'>
              <img src={this.state.cover_image} className='cover col-md-12 col-sm-12'/>
            </div>
            <div className='row group-chat-body'>
              <div className='col-md-3 col-sm-3 pmd-card pmd-z-depth-1'>
                <h1>Voucher</h1>
                <br/>
                <p>12312414</p>
                <hr/>
                <p>Description</p>
                <p>Description</p>
                <p>Description</p>
                <p>Description</p>
              </div>

              <div className='col-md-6 col-sm-6 chat-body'>
                <ChatBubble messages={this.state.messages}/>
              </div>
              <div className='col-md-3 col-sm-3'>
                <div className='group-description pmd-card pmd-z-depth-1'>
                  <p>Description</p>
                  <p>Description</p>
                  <p>Description</p>
                  <p>Description</p>

                  <div className='join-btn text-center'>
                    <div className='btn btn-primary join'>{translate('app.groups.view.leave')}</div>
                  </div>
                </div>
                <MapForShow/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
