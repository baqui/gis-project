import { Record, List } from 'immutable';

export const DayForecast = new Record({
  high: null,
  low: null,
  date: null
})

export const VoivodeWeather = new Record({
  cartodb_id: null,
  temp: null,
  visibility: null,
  pressure: null,
  wind_speed: null,
  forecast: List([])
})
