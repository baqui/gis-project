import { schema, normalize } from 'normalizr';
import { List } from 'immutable';
import {
  Point,
  City,
  Voivodeship,
  DayForecast,
  VoivodeWeather,
  VoivodeWiki
} from './records';

export const normalizedVoivodeshipData = data => {
  let voivodeships = [];
  data.features.map(feature => {
    voivodeships[feature.properties.cartodb_id] = toVoivodeship(feature);
  });
  return List(voivodeships);
};

export const normalizedForecastData = data => {
  let voivodeships = [];
  data.map(feature => {
    voivodeships[feature.cartodb_id] = toVoivodeWeather(feature);
  });
  return List(voivodeships);
};

export const normalizedVoivodesWikiData = data => {
  let voivodeships = [];
  data.map(voivode => {
    voivodeships[voivode.cartodb_id] = toVoivodeWiki(voivode.data);
  });
  return List(voivodeships);
};

const toPoint = obj => new Point(obj);

const toCity = obj =>
  new City({
    name: obj.name,
    coordinates: toPoint(obj.coordinates)
  });

const toVoivodeship = obj =>
  new Voivodeship({
    cartodb_id: obj.properties.cartodb_id,
    name: obj.properties.name,
    city: toCity(obj.city),
    coordinates: List(obj.geometry.coordinates.map(reg => reg[0])),
    neighbours: List(obj.properties.neighbours)
  });

const toDayForecast = obj =>
  new DayForecast({
    ...obj,
    high: parseFloat(obj.high),
    low: parseFloat(obj.low)
  });

const toVoivodeWeather = obj => {
  const channel = obj.data.query.results.channel;
  return new VoivodeWeather({
    cartodb_id: obj.cartodb_id,
    temp: parseFloat(channel.item.condition.temp),
    visibility: parseFloat(channel.atmosphere.visibility),
    pressure: parseFloat(channel.atmosphere.pressure),
    wind_speed: parseFloat(channel.wind.speed),
    forecast: List(
      channel.item.forecast.map(forecast => toDayForecast(forecast))
    )
  });
};

const toVoivodeWiki = obj => new VoivodeWiki(obj);
