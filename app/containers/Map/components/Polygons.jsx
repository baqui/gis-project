import React, { PureComponent } from 'react';
import {
  fitMapToChosenVoivodeship,
  setChosenVoivodeship
} from '../duck/actions';
import {
  getCheckedVoivodeshipId,
  getCheckedVoivodeshipNeighbours,
  getCurrentMode,
  getVoivodeships,
  getVoivodeshipsWeather,
  getWeatherRange,
  isVoivodeshipsWeatherDataFetched
} from '../duck/selectors';

import { MAP_MODES } from '../../../utils/consts';
import { POLYGON_COLORS } from '../duck/consts';
import { Polygon } from 'react-google-maps';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  voivodeships: getVoivodeships(state),
  voivodeships_weather: getVoivodeshipsWeather(state),
  temp: getWeatherRange(state, 'temp'),
  visibility: getWeatherRange(state, 'visibility'),
  pressure: getWeatherRange(state, 'pressure'),
  wind_speed: getWeatherRange(state, 'wind_speed'),
  isWeatherDataFetched: isVoivodeshipsWeatherDataFetched(state),
  checked_voivodeship: getCheckedVoivodeshipId(state),
  voivodeshipNeighbours: getCheckedVoivodeshipNeighbours(state),
  mode: getCurrentMode(state)
});

const mapDispatchToProps = dispatch => ({
  setChosenVoivodeship: cartodb_id =>
    dispatch(setChosenVoivodeship(cartodb_id)),
  fitBounds: () => dispatch(fitMapToChosenVoivodeship())
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Polygons extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked_voivodeship !== this.props.checked_voivodeship) {
      this.props.fitBounds();
    }
  }

  render() {
    return this.props.voivodeships.map((feature, index) => {
      return (
        feature && (
          <Polygon
            key={index}
            paths={feature.coordinates.toArray()}
            onClick={this.handlePolygonClick.bind(this, feature.cartodb_id)}
            options={{
              ...WIZARD_MAP_SHAPE_SETTINGS,
              fillColor: this.polygonFillColor(feature.cartodb_id)
            }}
          />
        )
      );
    });
  }

  handlePolygonClick(cartodb_id) {
    //this.props.setChosenVoivodeship( cartodb_id );
  }

  mapTemp2Transparency(mode) {
    if (!this.props[this.props.mode]) {
      return 0;
    }
    const ratio = 1 / (this.props[this.props.mode].length + 1);
    return (this.props[this.props.mode].indexOf(mode) + 1) * ratio;
  }

  polygonFillColor(id) {
    if (this.props.checked_voivodeship === id) {
      return 'rgba(96, 33, 180, .5)';
    } 
    else if (this.props.voivodeshipNeighbours.indexOf(id) > -1) {
      return 'rgba(145, 96, 210, .4)';
    } 
    else if (this.props.mode === MAP_MODES.temperatureGrid) {
      return 'rgba(159, 231, 100, .2)';
    } 
    else if (
      !this.props.checked_voivodeship &&
      this.props.isWeatherDataFetched &&
      this.props.voivodeships_weather[id]
    ) {
      const mode = this.props.voivodeships_weather[id][this.props.mode];
      return `rgba(${
        POLYGON_COLORS[this.props.mode]
      }, ${this.mapTemp2Transparency(mode)})`;
    } else {
      return 'rgba(55, 106, 199, 0)';
    }
  }
}
