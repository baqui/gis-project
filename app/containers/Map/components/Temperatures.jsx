import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { connect } from 'react-redux';
import {
  getVoivodeships,
  getTempRange,
  isVoivodeshipsWeatherDataFetched,
  getCurrentMode,
  getVoivodeshipsWeather,
  getCheckedVoivodeshipId,
  getCheckedVoivodeshipNeighbours,
  getGridModeSet
} from '../duck/selectors';

import { MAP_MODES } from '../../../utils/consts';

const mapStateToProps = state => ({
  voivodeships: getVoivodeships(state),
  voivodeships_weather: getVoivodeshipsWeather(state),
  isWeatherDataFetched: isVoivodeshipsWeatherDataFetched(state),
  checked_voivodeship: getCheckedVoivodeshipId(state),
  voivodeshipNeighbours: getCheckedVoivodeshipNeighbours(state),
  mode: getCurrentMode(state),
  gridMode: getGridModeSet(state)
});

const mapDispatchToProps = dispatch => ({});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Temperatures extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { mode, gridMode } = this.props;
    const isNotGridWeather = !gridMode;
    return (
      isNotGridWeather &&
      this.props.voivodeships.map((feature, index) => {
        const id = feature ? this.showTemperature(feature.cartodb_id) : null;
        const weather = id ? this.props.voivodeships_weather[id] : null;
        return (
          weather &&
          feature && (
            <InfoBox
              key={index}
              defaultPosition={
                new google.maps.LatLng(
                  feature.city.coordinates.lat,
                  feature.city.coordinates.lng
                )
              }
              options={{
                closeBoxURL: ``,
                enableEventPropagation: true,
                alignBottom: false,
                pixelOffset: new google.maps.Size(-16, -16)
              }}
            >
              <StyledLabel>
                <span>{this.showWeatherDescription(weather)}</span>
              </StyledLabel>
            </InfoBox>
          )
        );
      })
    );
  }

  showWeatherDescription(weather) {
    const mode = this.props.mode;
    switch (mode) {
      case 'temp':
        return `${this.farenheitToCelcius(weather.temp)}`;
      case 'visibility':
        return `${weather.visibility}`;
      case 'pressure':
        return `${weather.pressure}`;
      case 'wind_speed':
        return `${weather.wind_speed}`;
    }
  }

  farenheitToCelcius(temp) {
    return ((temp - 32) * (5 / 9)).toFixed(1);
  }

  showTemperature(id) {
    if (
      !this.props.checked_voivodeship ||
      this.props.checked_voivodeship === id ||
      this.props.voivodeshipNeighbours.indexOf(id) > -1
    ) {
      return id;
    }
    return null;
  }
}

const StyledLabel = styled.div`
  width: 36px;
  height: 36px;
  font-size: 15px;
  font-weight: 600;
  background-color: white;
  border-radius: 50%;
  border: 2px solid rgba(70, 12, 146, 5);
  text-align: center;
  span {
    vertical-align: middle;
    display: inline-block;
    margin-top: 9px;
  }
`;
