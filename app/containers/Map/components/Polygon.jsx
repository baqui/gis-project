import React, { PureComponent } from 'react';
import { Polygon } from "react-google-maps";
import { connect } from 'react-redux';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';
import * as REGIONS from '../../../services/wojewodztwa.json';
//import {  } from '../duck/actions';
//import {  } from '../duck/selectors';

const mapStateToProps = (state) => ({
  //points: getSelectedJobAreaPoints(state)
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
    return REGIONS.features.map( feature => (
      <Polygon
        paths={ feature.geometry.coordinates.map( reg => reg[0] ) }
        options={{
          ...WIZARD_MAP_SHAPE_SETTINGS,
          editable: false,
          draggable: false
        }}
      />
    ))
  }

}
