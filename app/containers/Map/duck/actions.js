import types from './types';
import { List } from 'immutable';
import { normalizedVoivodeshipData, normalizedForecastData } from './normalizers';
import { getChosenVoivodeshipCoordinates } from './selectors';
import WeatherApiClient from '../../../services/WeatherApiClient';

let googleMap;

export const getGoogleMap = () => googleMap;

export const storeGoogleMap = (map) => { googleMap = map; }

export const mapLoaded = (map) => dispatch => storeGoogleMap(map);


export const setBounds = (coordinates) => {
  const merged_coordinates = [].concat.apply([], coordinates.toArray());
  if( !googleMap ){ return false; }
  let bounds = new google.maps.LatLngBounds(null);

  merged_coordinates.map( (coord) => {
    bounds.extend( coord );
  });

  merged_coordinates.length > 0 && googleMap.fitBounds( bounds );
}

const addAdditionalPointsAround = (point) => {
  return [{ ...point}, { ...point}, { ...point}].map( (point, index) => {
    if( index % 2 === 0 ){
      point.lng += 0.1;
      point.lat += 0.1;
    } else {
      point.lng -= 0.1;
      point.lat -= 0.1;
    }
    return point;
  });
}


export const parseVoivodeshipsData = (data) => {
  return (dispatch) => {
    const voivodeships_data = normalizedVoivodeshipData(data);
    dispatch( voivodeshipsDataParsed( voivodeships_data ) );
    const voivodesCitiesAndIds = voivodeships_data.toArray()
        .filter( voivode => voivode )
        .map( voivode => ({ name: voivode.city.name, cartodb_id: voivode.cartodb_id }));
    //TODO change test to full array.
    const voivodesCitiesAndIdsTEST = [{ name: 'Olsztyn', cartodb_id: 15 }, { name: 'Gdańsk', cartodb_id: 12 }];
    const promises = voivodesCitiesAndIdsTEST.map( ( voivode ) => ( WeatherApiClient.getWeatherByRegionName( voivode.name ) ));
    //const promises = [].map( ( voivode ) => ( WeatherApiClient.getWeatherByRegionName( voivode.name ) ));

    Promise.all(promises).then( (response) => {
      const voivodes_weather = response.map( (weather, index) => ({
        cartodb_id: voivodesCitiesAndIdsTEST[index].cartodb_id,
        data: weather.data
      }));
      dispatch( weatherDataFethed( voivodes_weather ) );
    })
  }
}


const voivodeshipsDataParsed = (data) => ({
  type: types.VOIVODESHIPS_DATA_PARSED,
  data
});

const weatherDataFethed = ( data ) => ({
  type: types.WEATHER_DATA_FETCHED,
  data: normalizedForecastData(data)
});

export const setChosenVoivodeship = ( cartodb_id ) => ({
  type: types.VOIVODESHIP_CHECKED,
  cartodb_id
});

export const fitMapToChosenVoivodeship = () => {
  return ( dispatch, getState ) => {
    const currentState = getState();
    const coordinates = getChosenVoivodeshipCoordinates( currentState );
    setBounds( coordinates );
  }
}
