import types from './types';
import _ from 'lodash';
import { List } from 'immutable';
import {
  normalizedVoivodeshipData,
  normalizedForecastData,
  normalizedVoivodesWikiData,
  normalizeGridResponse
} from './normalizers';
import { getChosenVoivodeshipCoordinates } from './selectors';
import WeatherApiClient from '../../../services/WeatherApiClient';
import WikiApiClient from '../../../services/WikiApiClient';
import GridTemperatureClient from '../../../services/GridTemperatureClient';

let googleMap;
let context;

export const getGoogleMap = () => googleMap;

export const storeGoogleMap = map => dispatch => {
  googleMap = map;
  context = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.addListener(
    'bounds_changed',
    _.throttle(
      () => {
        const zoom = context.zoom;
        const bounds = map.getBounds();
        const viewport = `${bounds.b.b - 0.3},${bounds.f.b - 0.3},${bounds.b.f +
          0.3},${bounds.f.f + 0.3}`;
        dispatch({
          type: types.MAP_BOUNDS_CHANGED,
          zoom,
          viewport
        });
      },
      1500,
      { trailing: false }
    )
  );
};

export const mapLoaded = map => dispatch => dispatch(storeGoogleMap(map));

export const setBounds = coordinates => {
  const merged_coordinates = [].concat.apply([], coordinates.toArray());
  if (!googleMap) {
    return false;
  }
  let bounds = new google.maps.LatLngBounds(null);

  merged_coordinates.map(coord => {
    bounds.extend(coord);
  });

  merged_coordinates.length > 0 && googleMap.fitBounds(bounds);
};

export const parseVoivodeshipsData = data => {
  return dispatch => {
    const voivodeships_data = normalizedVoivodeshipData(data);
    dispatch(voivodeshipsDataParsed(voivodeships_data));
    const voivodesCitiesAndIds = voivodeships_data
      .toArray()
      .filter(voivode => voivode)
      .map(voivode => ({
        name: voivode.city.name,
        cartodb_id: voivode.cartodb_id
      }));
    const promises = voivodesCitiesAndIds.map(voivode =>
      WeatherApiClient.getWeatherByRegionName(voivode.name)
    );

    Promise.all(promises).then(response => {
      const voivodes_weather = response.map((weather, index) => ({
        cartodb_id: voivodesCitiesAndIds[index].cartodb_id,
        data: weather.data
      }));
      dispatch(weatherDataFethed(voivodes_weather));
    });

    const voivodesRegionNames = voivodeships_data
      .toArray()
      .filter(voivode => voivode)
      .map(voivode => ({ name: voivode.name, cartodb_id: voivode.cartodb_id }));
    const wiki_promises = voivodesRegionNames.map(voivode =>
      WikiApiClient.getWikiInfoByRegionName(voivode.name)
    );

    Promise.all(wiki_promises).then(responses => {
      const voivodes_wiki = responses.map((response, index) => ({
        cartodb_id: voivodesRegionNames[index].cartodb_id,
        data: response.data
      }));
      dispatch(voivodesDataFethed(voivodes_wiki));
    });
  };
};

const voivodeshipsDataParsed = data => ({
  type: types.VOIVODESHIPS_DATA_PARSED,
  data
});

const weatherDataFethed = data => ({
  type: types.WEATHER_DATA_FETCHED,
  data: normalizedForecastData(data)
});

const voivodesDataFethed = data => ({
  type: types.VOIVODES_DATA_FETCHED,
  data: normalizedVoivodesWikiData(data)
});

export const setChosenVoivodeship = cartodb_id => ({
  type: types.VOIVODESHIP_CHECKED,
  cartodb_id
});

export const fitMapToChosenVoivodeship = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const coordinates = getChosenVoivodeshipCoordinates(currentState);
    setBounds(coordinates);
  };
};

export const getGridTemperatureData = (zoom, viewport) => dispatch => {
  return GridTemperatureClient.getGridTemperatureByViewport(
    zoom,
    viewport
  ).then(
    response => {
      const grid = normalizeGridResponse(response);
      dispatch({
        type: types.GRID_FOR_BOUNDS_FETCHED,
        grid
      });
    },
    error => {
      console.log('ERROR', error);
    }
  );
};
