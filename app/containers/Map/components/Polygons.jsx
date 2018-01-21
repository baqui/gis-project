import React, { PureComponent } from 'react';
import { Polygon } from "react-google-maps";
import { connect } from 'react-redux';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';
import * as REGIONS from '../../../services/wojewodztwa.json';
//import {  } from '../duck/actions';
import { getVoivodeships, getTempRange, isVoivodeshipsWeatherDataFetched, getVoivodeshipsWeather } from '../duck/selectors';

const mapStateToProps = (state) => ({
  voivodeships: getVoivodeships(state),
  voivodeships_weather: getVoivodeshipsWeather(state),
  tempRange: getTempRange(state),
  isWeatherDataFetched: isVoivodeshipsWeatherDataFetched(state)
})

const mapDispatchToProps = (dispatch) => ({
  //setPreviewBounds: (points) => dispatch( setPreviewBounds( points ) )
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Polygons extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps( nextProps ){
    if( nextProps.mapMounted ){
      //this.props.setPreviewBounds( this.props.points );
    }
  }

  render() {
    return this.props.voivodeships.map( feature => {
      return (
        feature && <Polygon
          paths={ feature.coordinates.toArray() }
          options={{
            ...WIZARD_MAP_SHAPE_SETTINGS,
            fillColor: this.polygonFillColor(feature.cartodb_id),
            editable: false,
            draggable: false
          }}
        />
      )
    })
  }

  mapTemp2Transparency( temp ){
    if( !this.props.tempRange ){ return 0; }
    const temp_ratio = 1 / ( this.props.tempRange.length + 1 );
    return ( this.props.tempRange.indexOf( temp ) + 1 ) * temp_ratio;
  }

  polygonFillColor(id) {
    if( this.props.isWeatherDataFetched && this.props.voivodeships_weather[id] ){
      const temp = this.props.voivodeships_weather[id].temp;
      return `rgba(55, 106, 199, ${ this.mapTemp2Transparency(temp) })`;
    } else {
      return 'rgba(55, 106, 199, 0)';
    }
  }

}
