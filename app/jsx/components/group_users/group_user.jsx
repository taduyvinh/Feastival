let translate = require('counterpart');
import AlertContainer from 'react-alert';

export default class GroupUser extends React.Component {

  render() {
    return (
      <li className='pmd-card pmd-card-media-inline pmd-z-depth-1'>
        <div className='pmd-card-media'>
          <div className='request-item media-left media-middle'>
            <img src={this.props.groupUser.user.profile.avatar} />
            {this.props.groupUser.user.profile.name}
            {this.props.groupUser.user.profile.gender}
            {this.props.groupUser.user.profile.age}
          </div>
          <div className='media-right media-middle'>
            <button
              type='button'
              className='btn btn-primary media-middle'
              onClick={this.props.onAcceptRequest}>
              {translate('app.groups.view.accept')}
            </button>
            <button
              type='button'
              className='btn btn-danger media-middle'
              onClick={this.props.onDeclineRequest}>
              {translate('app.groups.view.decline')}
            </button>
          </div>
        </div>
      </li>
    )
  }
}
