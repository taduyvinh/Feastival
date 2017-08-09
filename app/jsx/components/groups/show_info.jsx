import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';
import MapForShow from './map_only_show';
import * as constant from '../../constant';
import AlertContainer from 'react-alert';
import axios from 'axios';

let translate = require('counterpart');

export default class GroupShowInfo extends React.Component {
  constructor(props) {
    super(props);
    let myLatlng =
      new google.maps.LatLng(21.006166, 105.830996);
    this.state = {
      group: {},
      bounds: null,
      group_user: {},
      center: {
        lat: 21.006166,
        lng: 105.830996,
      },
      markers: [{
        position: myLatlng,
        infoContent: 'aaaa',
        showInfo: false
      }],
      cover_image: 'http://cdn.thedesigninspiration.com/wp-content/uploads/2012/06/Facebook-Covers-017.jpg',
      creator: null,
      users: [],
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
    axios.get(constant.API_GROUPS_URL + '/' + this.props.params.group_id,
      constant.headers)
      .then(response => {
        let position = {
          lat: response.data.group.latitude,
          lng: response.data.group.longitude
        }
        this.setState({
          group: response.data.group,
          group_user: response.data.group_user,
          users: response.data.group.users,
          creator: response.data.group.creator,
          center: position,
          markers: [{position: position}]
        })
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      })
  }

  renderJoinButton() {
    if (this.state.group_user) {
      if (this.state.group_user.status == 'pending') {
        return (
          <div className='join-btn text-center pmd-card pmd-z-depth-1'>
            <button onClick={this.handleCancelClick.bind(this)}
              className='btn btn-warning'>
              {translate('app.groups.view.cancel')}
            </button>
          </div>
        );
      } else {
        return (
          <div className='join-btn text-center pmd-card pmd-z-depth-1'>
            <button onClick={this.handleChatClick.bind(this)}
              className='btn btn-primary'>
              {translate('app.groups.view.chat')}
            </button>
          </div>
        );
      }
      return null;
    }
    return (
      <div className='join-btn text-center pmd-card pmd-z-depth-1'>
        <button onClick={this.handleJoinClick.bind(this)}
          className='btn btn-primary'>
          {translate('app.groups.view.join')}
        </button>
      </div>
    );
  }

  handleChatClick() {
    window.location = constant.GROUPS_URL + this.state.group.id
  }

  handleJoinClick() {
    let formData = new FormData();
    formData.append('group_user[user_id]', JSON.parse(localStorage.feastival_user).user_id)
    formData.append('group_user[group_id]', this.state.group.id)
    axios.post(constant.API_GROUPS_URL + '/' + this.props.params.group_id +
      constant.API_JOIN_URL, formData, constant.headers)
      .then(response => {
        this.setState({
          group_user: response.data.group_user
        })
        this.showAlert(translate('app.error.request_success'));
      })
      .catch(error =>{
        this.showAlert(translate('app.error.error'));
      });
  }

  handleCancelClick() {
    axios.delete(constant.API_GROUPS_URL + '/' +  this.props.params.group_id +
      constant.API_JOIN_URL + this.state.group_user.id, constant.headers)
      .then(() => {
        this.setState({
          group_user: null
        })
        this.showAlert(translate('app.error.cancel_success'));
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }
  showInfoUser(id){
    window.location = constant.USER_INFO_URL + id;
  }

  renderCreator() {
    if (this.state.creator) {
      return (
        <div className='pmd-card pmd-z-depth-1 text-center'
          onClick={this.showInfoUser.bind(this,this.state.creator.id)}>
          <img src={this.state.creator.profile.avatar.url} className='image'/>
          <p className='max-lines'>{this.state.creator.profile.name}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <section className='group-over-view'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='row'>
          <div className='col-md-offset-2 col-md-8 pmd-card pmd-z-depth-1 group-body'>
            <div className='row'>
              <img src={this.state.cover_image} className='cover col-md-12'/>
            </div>
            <div className='row'>
              <div className='group-users col-md-8'>
                <div className='row'>
                  <label className='col-sm-3 text-center control-label'>
                    <h1>{translate('app.groups.view.creator')}</h1>
                  </label>
                  <div className='col-sm-offset-3 col-sm-3'>
                    {this.renderCreator()}
                  </div>
                </div>
                <div className='row'>
                  <label className='text-center col-sm-3 control-label'>
                    <h1>{translate('app.groups.view.members')}</h1>
                  </label>
                  <div className='col-sm-9'>
                    {this.state.users.map((user, index) => {
                      return (
                        <div key={index} className='col-sm-4'
                          onClick={this.showInfoUser.bind(this,this.state.users[index].id)}>
                          <div className='pmd-card pmd-z-depth-1 text-center'>
                            <img src={user.profile.avatar.url} className='image'/>
                            <p className='max-lines'>{user.profile.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='group-info col-md-4'>
                {this.renderJoinButton()}
                <div className='group-description'>

                  <p>{this.state.group.title}</p>
                  <p>{this.state.group.address}</p>
                  <p>{this.state.group.time}</p>
                  <p>{this.state.group.description}</p>
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
