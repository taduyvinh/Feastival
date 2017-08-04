let translate = require('counterpart');

import axios from 'axios';
import * as constant from  '../../constant';
import GroupUser from './group_user';
import AlertContainer from 'react-alert';

export default class GroupUserIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_users: [],
      creator: {}
    };
  }

  componentWillMount() {
    axios.get(constant.API_GROUPS_URL + '/' + this.props.params.group_id +
      constant.API_JOIN_URL ,constant.headers)
      .then(response => {
        if (JSON.parse(localStorage.feastival_user).user_id !=
          response.data.creator.id)
          window.location = constant.BASE_URL;
        else
          this.setState({group_users: response.data.group_users});
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  handleAcceptRequest(group_user_id) {
    let formData = new FormData();
    formData.append('group_user[status]', 'joined');

    axios.put(constant.API_GROUPS_URL + '/' + this.props.params.group_id +
      constant.API_JOIN_URL + group_user_id, formData, constant.headers)
      .then(response => {
        this.setState({
          group_users: response.data.group_users,
        })
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      })
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png' />
    });
  }

  handleDeclineRequest(group_user_id) {
    axios.delete(constant.API_GROUPS_URL + '/' + this.props.params.group_id +
      constant.API_JOIN_URL + group_user_id, constant.headers)
      .then(response => {
        this.setState({group_users: response.data.group_users})
      })
      .catch(error =>{
        this.showAlert(translate('app.error.error'));
      })
  }

  render() {
    return (
      <div className='container'>
        {this.state.group_users.length == 0 ?
          <h1>{translate('app.groups.view.no_request')}</h1> : null}
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='requests'>
          {
            this.state.group_users.map((group_user, index) => {
              return (
                <GroupUser
                  key={group_user.id}
                  groupUser={group_user}
                  onAcceptRequest={() => this.handleAcceptRequest(group_user.id)}
                  onDeclineRequest={() => this.handleDeclineRequest(group_user.id)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
