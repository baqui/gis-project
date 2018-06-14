import axios from 'axios';

export default class WeatherApiClient {
  static getWeatherByCoordinates(latitude, longitude) {
    return axios.get(
      `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text="(${latitude},${longitude})") and u="c"&format=json&language=pl&env=store://datatables.org/alltableswithkeys`
    );
  }
}
