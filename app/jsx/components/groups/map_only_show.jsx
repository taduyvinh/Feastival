import {withGoogleMap, GoogleMap, Marker, InfoWindow}
  from 'react-google-maps/lib';

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


export default class MapForShow extends React.Component {
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
    }
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
    )
  }
}
