import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';

let translate = require('counterpart');

const BaseGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default class Group_Overview extends React.Component {
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

  handleMarkerClick(targetMarker) {
    targetMarker.infoShow = true;
    this.setState({
      info_show: true,
      name: targetMarker.infoContent,
      markers: this.state.markers.map(marker => {
        marker.showInfo = (marker === targetMarker);
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      info_show: false,
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          marker.showInfo = false;
        }
        return marker;
      }),
    });
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
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
                <BaseGoogleMap
                  containerElement={
                    <div className='map-only-show'/>
                  }
                  mapElement={
                    <div style={{height: '100%'}}/>
                  }
                  center={this.state.center}
                  onMapMounted={this.handleMapMounted.bind(this)}
                  onBoundsChanged={this.handleBoundsChanged.bind(this)}
                  bounds={this.state.bounds}
                  markers={this.state.markers}
                  onMarkerClick={this.handleMarkerClick.bind(this)}
                  onMarkerClose={this.handleMarkerClose.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
