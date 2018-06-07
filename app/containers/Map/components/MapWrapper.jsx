import * as REGIONS from '../../../services/wojewodztwa.json';

import { GoogleMap, withGoogleMap } from 'react-google-maps';
import {
  MAP_DEFAULT_COORDINATES,
  MAP_DEFAULT_ZOOM,
  MAP_STYLES
} from '../../../utils/consts';
import React, { PureComponent } from 'react';
import { mapLoaded, parseVoivodeshipsData } from '../duck/actions';

import Polygons from './Polygons';
import Temperatures from './Temperatures';
import { connect } from 'react-redux';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  mapAttached: map => dispatch(mapLoaded(map)),
  parseVoivodeshipsData: data => dispatch(parseVoivodeshipsData(data))
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withGoogleMap
export default class MapWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.parseVoivodeshipsData(REGIONS);
  }

  render() {
    return (
      <GoogleMap
        className={this.props.className || ''}
        ref={this.handleMapMounted.bind(this)}
        defaultZoom={MAP_DEFAULT_ZOOM}
        defaultCenter={{
          lat: MAP_DEFAULT_COORDINATES.lat,
          lng: MAP_DEFAULT_COORDINATES.lng
        }}
        options={{
          styles: MAP_STYLES,
          mapTypeControl: false,
          streetViewControl: false
        }}
      >
        {/* <Temperatures /> */}
        <Polygons />
      </GoogleMap>
    );
  }

  handleMapMounted(map) {
    this.props.mapAttached(map);
  }
}
