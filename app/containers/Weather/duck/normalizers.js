import { schema, normalize } from 'normalizr';
import { List } from 'immutable';
import { DayForecast, VoivodeWeather } from './records';

export const normalizedForecastData = (data) => {
  let voivodeships = [];
  data.map( feature => {
    voivodeships[ data.cartodb_id ] = toVoivodeWeather( feature );
  });
  return List( voivodeships );
}

const toDayForecast = obj => (
  new DayForecast({
    ...obj,
    high: parseFloat(obj.high),
    low: parseFloat(obj.low)
  })
);

const toVoivodeWeather = (obj) => {
  const channel = obj.data.query.results.channel;
  return (
    new VoivodeWeather({
      cartodb_id: obj.cartodb_id,
      temp: parseFloat(channel.item.condition.temp),
      visibility: parseFloat(channel.atmosphere.visibility),
      pressure: parseFloat(channel.atmosphere.pressure),
      wind_speed: parseFloat(channel.wind.speed),
      forecast: List( channel.item.forecast.map( forecast => toDayForecast(forecast) ))
    })
  )
}
