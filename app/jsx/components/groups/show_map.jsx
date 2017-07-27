import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import MakerInfo from './marker_info';

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

export default class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center: {
        lat: 21.006166,
        lng: 105.830996,
      },
      markers: [],
      info_show: false,
      name: ''
    };
  }

  getCurrentLocation() {
    let self = this;
    navigator.geolocation.getCurrentPosition(location => {
      let mapCenter = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
      let myLatlng =
        new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      let marker = {
        position: myLatlng,
        infoContent: 'aaaa'
      }
      self.setState({
        center: mapCenter,
        markers: self.state.markers.concat(marker),
      })
    });
  }

  componentWillMount() {
    this.getCurrentLocation();
  }

  handleMarkerClick(targetMarker) {
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

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  createMakers(places) {
    const markers = places.map(place => ({
      position: place.geometry.location,
      infoContent: place.formatted_address
    }));

    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers: this.state.markers.concat(markers),
    });
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    this.createMakers(places)
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
            <MakerInfo/>
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
          />
        </div>
      </section>
    );
  }
}
