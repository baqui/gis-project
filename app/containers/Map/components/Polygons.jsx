import React, { PureComponent } from 'react';
import { Polygon } from "react-google-maps";
import { connect } from 'react-redux';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';
import * as REGIONS from '../../../services/wojewodztwa.json';
//import {  } from '../duck/actions';
import { getVoivodeships, getMaxTemp, getVoivodeshipsWeather } from '../duck/selectors';

const mapStateToProps = (state) => ({
  voivodeships: getVoivodeships(state),
  voivodeships_weather: getVoivodeshipsWeather(state),
  maxTemp: getMaxTemp(state)
})

const mapDispatchToProps = (dispatch) => ({
  //setPreviewBounds: (points) => dispatch( setPreviewBounds( points ) )
})

@connect(mapStateToProps, mapDispatchToProps)
export default class RequestPreview extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps( nextProps ){
    if( nextProps.mapMounted ){
      //this.props.setPreviewBounds( this.props.points );
    }
  }

  render() {
    return this.props.voivodeships.map( feature => (
      <Polygon
        paths={ feature.coordinates.toArray() }
        options={{
          ...WIZARD_MAP_SHAPE_SETTINGS,
          fillColor: this.polygonFillColor(feature.cartodb_id),
          editable: false,
          draggable: false
        }}
      />
    ))
  }

  polygonFillColor(id) {
    console.log(this.props.voivodeships_weather, id, this.props.voivodeships_weather[id]);
    if( this.props.voivodeships_weather[id] ){
      return 'rgba(55, 106, 199, 1)'
    } else {
      return 'rgba(55, 106, 199, 0.1)'
    }
  }

}
