import types from './types';
import { List } from 'immutable';
import { normalizedVoivodeshipData } from './normalizers';
import WeatherApiClient from '../../../services/WeatherApiClient';

let googleMap;

export const getGoogleMap = () => googleMap;

export const storeGoogleMap = (map) => { googleMap = map; }

export const mapLoaded = (map) => dispatch => storeGoogleMap(map);


export const setBounds = (places) => {
  if( !googleMap ){ return false; }
  let bounds = new google.maps.LatLngBounds(null);

  places.map( (place) => {
    if( place.geometry.viewport ){
      bounds.union( place.geometry.viewport );
    } else {
      bounds.extend( place.geometry.location );
    }
  });

  places.length > 0 && googleMap.fitBounds( bounds );
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
    //TODO dispatch fetchVoivodeshipsWeather to fetch data for all voivodeships
    //dispatch( fetchVoivodeshipsWeather( 'Kielce', 1) );
    //dispatch( fetchVoivodeshipsWeather( 'Gdańsk', 8) );
    const voivodesCitiesAndIdsTEST = [{ name: 'Olsztyn', cartodb_id: 4 }, { name: 'Olsztyn', cartodb_id: 9 }];
    const promises = voivodesCitiesAndIdsTEST.map( ( voivode ) => ( WeatherApiClient.getWeatherByRegionName( voivode.name ) ));

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

// const fetchVoivodeshipsWeather = ( name, cartodb_id ) => {
//   return (dispatch) => {
//     WeatherApiClient.getWeatherByRegionName(name).then(
//       (response) => {
//         console.log("WEATHERAPICLIENT", response.data );
//         dispatch( weatherDataFethed( response.data, cartodb_id ) );
//       }
//     )
//   }
// }

const weatherDataFethed = ( data ) => ({
  type: types.WEATHER_DATA_FETCHED,
  data
})
