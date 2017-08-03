import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import MarkerInfo from './marker_info';
import axios from 'axios';
import * as constant from  '../../constant';

let classNames = require('classnames');
let translate = require('counterpart');

const INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  marginTop: '27px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
};

const BaseGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick.bind()}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder={translate('app.map.searchbox')}
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        icon={marker.icon}
        clickable={marker.clickable}
        draggable={marker.draggable}
        onClick={() => props.onMarkerClick(marker)}
        onDragEnd={(event) => props.onMarkerDragEnd(marker, index, event)}
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

export default class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      distance: 4000,
      lat: 1,
      lng: 1,
      center: {
        lat: 21.006166,
        lng: 105.830996,
      },
      info_show: false,
      name: '',
      markers: [],
      groups: [],
      restaurants: [],
      restaurantsMarkers: [],
      restaurant: null
    };
  }

  handleDistanceChange(event) {
    this.setState({
      distance: event.target.value
    })
    this.replaceMarkers(this.state.markers[0].position, event.target.value)
  }

  getCurrentLocation() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function(location) {
      let my_location = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
      self.loadRecentMarker(my_location);
    });
  }

  loadRecentMarker(location) {
    let restaurantMarkers =[];
    let groupMarkers =[];
    let mapCenter = {
      lat: location.lat,
      lng: location.lng
    }
    let myMarker = {
      infoContent: translate('app.map.my_location'),
      id: 'myMarker',
      draggable: true,
      position: {
        lat: location.lat,
        lng: location.lng
      },
      type: constant.marker_types.user
    }
    axios.get(constant.API_GROUPS_URL,
      {
        params: {
          lat: location.lat,
          lng: location.lng,
          distance: this.state.distance
        }
      }, constant.headers)
      .then(response => {
        let marker;
        response.data.restaurants.map(restaurant => {
          marker = {
            id: restaurant.id,
            infoContent: restaurant.title,
            position: {
              lat: restaurant.latitude,
              lng: restaurant.longitude
            },
            icon: '/assets/restaurant_marker.png',
            type: constant.marker_types.restaurant
          }
          restaurantMarkers.push(marker)
        });
        response.data.groups.map(group => {
          marker = {
            id: group.id,
            infoContent: group.title,
            position: {
              lat: group.latitude,
              lng: group.longitude
            },
            icon: '/assets/group_marker.png',
            type: constant.marker_types.group
          }
          groupMarkers.push(marker)
        })
        this.setState({
          restaurants: response.data.restaurants,
          center: mapCenter,
          markers: this.state.markers.concat(myMarker, restaurantMarkers, groupMarkers)
        })
      })
      .catch(error => alert(error));
  }

  componentWillMount() {
    this.getCurrentLocation();
  }

  handleMapClick(event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.state.markers[0] = {
      position: position,
      type: constant.marker_types.user,
      draggable: true
    }
    this.setState({markers: this.state.markers});
    this.replaceMarkers(position)
  }

  handleMarkerClick(targetMarker) {
    let new_state = {};

    if (targetMarker.type != constant.marker_types.restaurant) {
      if (this.state.info_show) {
        let name = '';

        if (targetMarker.type == constant.marker_types.user) {
          name = translate('app.map.my_location');
        } else if (targetMarker.type == constant.marker_types.group) {
          Object.assign(new_state, {
            info_show: true,
            name: targetMarker.infocontent
          })
          axios.get(constant.API_GROUPS_URL + targetMarker-id)
            .then(response => {
              this.setState({group: response.data.group})
            })
            .catch(error => alert(error));
        } else {
          name = targetMarker.infoContent;
        }
        Object.assign(new_state, {info_show: false, name: name});
      }
    } else {
      Object.assign(new_state, {
        info_show: true,
        name: targetMarker.infoContent,
      });
      axios.get(constant.API_RESTAURANTS_URL + targetMarker.id)
        .then(response => {
          this.setState({restaurant: response.data.restaurant});
        })
        .catch(error => console.log(error));
    }

    let markers = this.state.markers.map(marker => {
      marker.showInfo = (marker === targetMarker);
      return marker;
    });
    Object.assign(new_state, {markers});
    this.setState(new_state);
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

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  replaceMarkers(position, distance = null) {
    this.setState({
      markers: [this.state.markers[0]],
      lat: position.lat,
      lng: position.lng
    })
    let myMarker = {
      position: {lat: position.lng, lng: position.lng}
    }
    let restaurantMarkers = [], groupMarkers = [];
    axios.get(constant.API_GROUPS_URL,
      {
        params: {
          lat: position.lat,
          lng: position.lng,
          distance: distance || this.state.distance
        }
      }, constant.headers)
    .then(response => {
      let marker;
      response.data.restaurants.map(restaurant => {
        marker = {
          id: restaurant.id,
          infoContent: restaurant.title,
          position: {
            lat: restaurant.latitude,
            lng: restaurant.longitude
          },
          icon: '/assets/restaurant_marker.png',
          type: constant.marker_types.restaurant
        }
        restaurantMarkers.push(marker);
      });
      response.data.groups.map(group => {
        marker = {
          id: group.id,
          infoContent: group.title,
          position: {
            lat: group.latitude,
            lng: group.longitude
          },
          icon: '/assets/group_marker.png',
          type: constant.marker_types.group
        }
        groupMarkers.push(marker);
      })
      this.setState({
        center: {
          lat: position.lat,
          lng: position.lng
        },
        restaurants: response.data.restaurants,
        markers: this.state.markers.concat(myMarker, restaurantMarkers, groupMarkers)
      })
    })
    .catch(error => alert(error));
  }

  handleMarkerDrag(marker, index, event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    Object.assign(marker, {position})
    this.state.markers[index] = marker;
    this.setState({markers: this.state.markers});
    this.replaceMarkers(position);
  }

  handlePlacesChanged() {
    let place = this._searchBox.getPlaces()[0];
    let location = place.geometry.location;
    let position = {
      lat: location.lat(),
      lng: location.lng()
    }
    this.state.markers[0] = {
      position: position,
      type: constant.marker_types.user,
      draggable: true
    }
    this.setState({markers: this.state.markers});
    this.replaceMarkers(position);
  }

  render() {
    let map_style = classNames({},
      'google-map', 'col-md-12'
    );
    let info_show_style = classNames({
        'info-hide': !this.state.info_show,
        'info-show': this.state.info_show
      },
      'info'
    );

    return (
      <section className='map-body row'>
        <div className={map_style}>
          <div className={info_show_style}>
            <MarkerInfo name={this.state.name}
              restaurant={this.state.restaurant} />
          </div>
          <div className='input-distance'>
            <input
              className='range-slider__range'
              id='distance'
              type='range'
              min='100' max='20000'
              defaultValue={this.state.distance}
              onMouseUp={this.handleDistanceChange.bind(this)}
              step='1'
            />
              <span>{this.state.distance}</span>
          </div>

          <BaseGoogleMap
            containerElement={
              <div className='map'/>
            }
            mapElement={
              <div style={{height: '100%'}}/>
            }
            center={this.state.center}
            onMapMounted={this.handleMapMounted.bind(this)}
            onBoundsChanged={this.handleBoundsChanged.bind(this)}
            onSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
            bounds={this.state.bounds}
            onPlacesChanged={this.handlePlacesChanged.bind(this)}
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick.bind(this)}
            onMarkerClose={this.handleMarkerClose.bind(this)}
            onMapClick={this.handleMapClick.bind(this)}
            onMarkerDragEnd={this.handleMarkerDrag.bind(this)}
          />
        </div>
      </section>
    );
  }
}
