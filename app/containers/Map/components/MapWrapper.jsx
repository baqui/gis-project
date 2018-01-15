import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { GoogleMap, withGoogleMap } from 'react-google-maps';

import { MAP_STYLES, MAP_DEFAULT_COORDINATES, MAP_DEFAULT_ZOOM } from '../../../utils/consts';
import { mapLoaded } from '../duck/actions';
import Polygon from './Polygon';

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  mapAttached: (map) => dispatch( mapLoaded(map) ),
})

@connect(mapStateToProps, mapDispatchToProps)
@withGoogleMap
export default class MapWrapper extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <GoogleMap
        className={ this.props.className || '' }
        ref={ this.handleMapMounted.bind(this) }
        defaultZoom={ MAP_DEFAULT_ZOOM }
        defaultCenter={{ lat: MAP_DEFAULT_COORDINATES.lat, lng: MAP_DEFAULT_COORDINATES.lng }}
        options={{
          styles: MAP_STYLES,
          mapTypeControl: false,
          streetViewControl: false
        }}
      >
        <Polygon />
      </GoogleMap>
    );
  }

  handleMapMounted( map ){
    this.props.mapAttached(map);
  }
}
