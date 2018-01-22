import React, { PureComponent } from 'react';
import { Polygon } from "react-google-maps";
import { connect } from 'react-redux';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';
import { setChosenVoivodeship, fitMapToChosenVoivodeship } from '../duck/actions';
import { getVoivodeships, getTempRange, isVoivodeshipsWeatherDataFetched,
         getVoivodeshipsWeather, getCheckedVoivodeshipId, getCheckedVoivodeshipNeighbours } from '../duck/selectors';

const mapStateToProps = (state) => ({
  voivodeships: getVoivodeships(state),
  voivodeships_weather: getVoivodeshipsWeather(state),
  tempRange: getTempRange(state),
  isWeatherDataFetched: isVoivodeshipsWeatherDataFetched(state),
  checked_voivodeship: getCheckedVoivodeshipId(state),
  voivodeshipNeighbours: getCheckedVoivodeshipNeighbours(state)
})

const mapDispatchToProps = (dispatch) => ({
  setChosenVoivodeship: (cartodb_id) => dispatch( setChosenVoivodeship( cartodb_id ) ),
  fitBounds: () => dispatch( fitMapToChosenVoivodeship() )
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Polygons extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps( nextProps ){
    if( nextProps.checked_voivodeship !== this.props.checked_voivodeship ){
      this.props.fitBounds();
    }
  }

  render() {
    return this.props.voivodeships.map( ( feature, index ) => {
      return (
        feature && <Polygon
          key={ index }
          paths={ feature.coordinates.toArray() }
          onClick={ this.handlePolygonClick.bind( this, feature.cartodb_id ) }
          options={{
            ...WIZARD_MAP_SHAPE_SETTINGS,
            fillColor: this.polygonFillColor(feature.cartodb_id)
          }}
        />
      )
    })
  }

  handlePolygonClick( cartodb_id ){
    this.props.setChosenVoivodeship( cartodb_id );
  }

  mapTemp2Transparency( temp ){
    if( !this.props.tempRange ){ return 0; }
    const temp_ratio = 1 / ( this.props.tempRange.length + 1 );
    return ( this.props.tempRange.indexOf( temp ) + 1 ) * temp_ratio;
  }

  polygonFillColor(id) {
    if( this.props.checked_voivodeship === id ){
      return 'rgba(96, 33, 180, .5)';
    } else if( this.props.voivodeshipNeighbours.indexOf(id) > -1 ) {
      return 'rgba(145, 96, 210, .4)';
    } else if( !this.props.checked_voivodeship && this.props.isWeatherDataFetched && this.props.voivodeships_weather[id] ) {
      const temp = this.props.voivodeships_weather[id].temp;
      return `rgba(55, 106, 199, ${ this.mapTemp2Transparency(temp) })`;
    } else {
      return 'rgba(55, 106, 199, 0)';
    }
  }

}
