import MapForShow from './map_only_show';
import ChatBubble from 'react-chat-bubble';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
import axios from 'axios'
import TextareaAutosize from 'react-autosize-textarea';

let translate = require('counterpart');

let messages_ref = null;

const textareaStyle = {
  padding: '10px 8px',
  border: '1px solid rgba(39,41,43,.15)',
  borderRadius: 4,
  fontSize: 15,
  width : '100%'
};

export default class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(constant.CONFIG_FIREBASE);
    messages_ref = firebase.database().ref('messages/' + this.props.params.group_id);

    this.state = {
      group: {},
      group_user: null,
      users: [],
      chat_box: '',
      cover_image: 'http://cdn.thedesigninspiration.com/wp-content/uploads/2012/06/Facebook-Covers-017.jpg',
      messages: []
    }
  }

  writeMessageData(data) {
    messages_ref.push(data);
  }

  addCommentElement(data) {
    this.setState({
      messages: this.state.messages.concat(data),
      chat_box: ''
    });
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  componentWillMount() {
    let self = this;
    if (localStorage.feastival_user == null) {
      window.location = constant.SIGN_IN_URL;
    }

    messages_ref.on('child_added', function (data) {
      let mes = data.val();
      if (mes.user_id == JSON.parse(localStorage.feastival_user).user_id)
        mes.type = 0;
      else
        mes.type = 1;
      self.addCommentElement(mes);
    });

    axios.get(constant.API_GROUPS_URL + '/' +
      this.props.params.group_id, constant.headers)
      .then(response => {
        let user_id = JSON.parse(localStorage.feastival_user).user_id;
        let findUser = response.data.group.users.find((user, index) => {
          return user.id == user_id;
        });
        if (!findUser && response.data.creator.id != user_id) {
          window.location = constant.GROUPS_URL + this.props.params.group_id + '/info';
        }
        this.setState({
          group: response.data.group,
          group_user: response.data.group_user,
          users: response.data.users
        })
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      })
  }

  handleLeaveGroup() {
    axios.delete(constant.API_GROUPS_URL + '/' + this.props.params.group_id +
      constant.API_JOIN_URL + this.state.group_user.id, constant.headers)
      .then(response => {
        this.showAlert(translate('app.error.success'));
        window.location = constant.BASE_URL;
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      })
  }

  onChatBoxChange(event) {
    this.setState({
      chat_box: event.target.value
    });
  }

  handleKeyDownSubmit(event) {
    if (event.key == 'Enter' && this.state.chat_box != '') {
      let avatar = '';
      if (JSON.parse(localStorage.feastival_user).avatar == null ||
        JSON.parse(localStorage.feastival_user).avatar == '')
        avatar = constant.DEFAULT_AVATAR;
      else
        avatar = JSON.parse(localStorage.feastival_user).avatar;
      let mes = {
        'user_id': JSON.parse(localStorage.feastival_user).user_id,
        'type': 0,
        'image': avatar,
        'text': this.state.chat_box,
        'time': '12:00'
      }
      this.writeMessageData(mes);

    }
  }

  renderView() {
    if (localStorage.feastival_user != null) {
      return (<section className='group-chat'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
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
                    <button
                      className='btn btn-primary join'
                      onClick={this.handleLeaveGroup.bind(this)}>
                      {translate('app.groups.view.leave')}
                    </button>
                  </div>
                </div>
                <MapForShow/>
              </div>
              <div className='row'>
                <div className='col col-md-offset-3 col-md-6'>
                  <div className='chat-box'>
                    <TextareaAutosize style={textareaStyle}
                      value={this.state.chat_box}
                      rows={2}
                      onChange={this.onChatBoxChange.bind(this)}
                      onKeyPress={this.handleKeyDownSubmit.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>);
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}
