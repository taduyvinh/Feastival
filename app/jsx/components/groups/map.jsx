import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
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

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder= {translate('app.map.searchbox')}
      inputStyle={INPUT_STYLE}

    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

export default class MapGroupCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center: {
        lat: 21.009122,
        lng: -123.855514
      },
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        defaultAnimation: 2,
      }],
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        markers: [{
          position:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          defaultAnimation: 2,
        }]
      });
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

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    this.props.LatLng(markers[0].position.lat(), markers[0].position.lng())
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    this.setState({
      center: mapCenter,
      markers,
    });
  }

  handleMapClick(event) {
    const markers = [{
      position: event.latLng
    }]
    this.setState({
      markers
    });
    this.props.LatLng(markers[0].position.lat(), markers[0].position.lng())
  }

  render() {
    return (
      <SearchBoxExampleGoogleMap
        containerElement={
          <div style={{height: '500px'}} />
        }
        mapElement={
          <div style={{height: '500px'}} />
        }
        center={this.state.center}
        onMapMounted={this.handleMapMounted.bind(this)}
        onBoundsChanged={this.handleBoundsChanged.bind(this)}
        onSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
        bounds={this.state.bounds}
        onMapClick={this.handleMapClick.bind(this)}
        onPlacesChanged={this.handlePlacesChanged.bind(this)}
        markers={this.state.markers}
      />
    );
  }
}
