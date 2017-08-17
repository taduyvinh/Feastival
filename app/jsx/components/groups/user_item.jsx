var translate = require('counterpart');

import axios from 'axios';
import * as constant from '../../constant';
import AlertContainer from 'react-alert';

export default class UserItem extends React.Component {
  renderAvatar() {
    if (this.props.user.profile.avatar.url == null) {
      return (<img src={constant.DEFAULT_AVATAR}/>);
    }
    return (<img src={this.props.user.profile.avatar.url}/>);
  }

  render() {
    return(
      <div className='user'>
        {this.renderAvatar()}
        <div className='user-name'>
          {this.props.user.profile.name}
        </div>
      </div>
    )
  }
}
