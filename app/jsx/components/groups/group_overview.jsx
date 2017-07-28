import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';
import MapForShow from './map_only_show';

let translate = require('counterpart');

export default class GroupOverView extends React.Component {
  constructor(props) {
    super(props);
    let myLatlng =
      new google.maps.LatLng(21.006166, 105.830996);
    this.state = {
      bounds: null,
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
      admin: {
        name: 'aaaaaa',
        img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
      },
      users: [
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
        {
          name: 'aaaaaa',
          img: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        },
      ],
    };
  }

  render() {
    return (
      <section className='group-over-view'>
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
                    <div className='pmd-card pmd-z-depth-1 text-center'>
                      <img src={this.state.admin.img} className='image'/>
                      <p className='max-lines'>{this.state.admin.name}</p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <label className='text-center col-sm-3 control-label'>
                    <h1>{translate('app.groups.view.members')}</h1>
                  </label>
                  <div className='col-sm-9'>
                    {this.state.users.map((user, index) => {
                      return (
                        <div key={index} className='col-sm-4'>
                          <div className='pmd-card pmd-z-depth-1 text-center'>
                            <img src={user.img} className='image'/>
                            <p className='max-lines'>{user.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='group-info col-md-4'>
                <div className='join-btn text-center pmd-card pmd-z-depth-1'>
                  <div className='btn btn-primary join'>{translate('app.groups.view.join')}</div>
                </div>
                <div className='group-description'>
                  <p>Description</p>
                  <p>Description</p>
                  <p>Description</p>
                  <p>Description</p>
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
