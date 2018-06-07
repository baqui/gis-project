import axios from 'axios';

export default class WeatherApiClient {
  static getWeatherByRegionName(locationName) {
    return axios.get(
      `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${locationName}")&format=json&env=store://datatables.org/alltableswithkeys`
    );
  }
}
