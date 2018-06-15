import { Record, List } from 'immutable';

export const Point = new Record({
  lng: 0.0,
  lat: 0.0
});

export const City = new Record({
  name: '',
  coordinates: new Point()
});

export const Voivodeship = new Record({
  cartodb_id: null,
  name: '',
  city: new City(),
  coordinates: List([]), // coordinates from parsed geojson
  neighbours: List([]) // list of catodb_ids,
});

export const DayForecast = new Record({
  high: null,
  low: null,
  date: null
});

export const VoivodeWeather = new Record({
  cartodb_id: null,
  temp: null,
  visibility: null,
  pressure: null,
  wind_speed: null,
  forecast: List([])
});

export const VoivodeWiki = new Record({
  name: '',
  capital: '',
  voivode: '',
  voivode_place: '',
  regional_council_place: '',
  marshal: '',
  area: '',
  population: '',
  density: '',
  urbanization: '',
  registration_plate: '',
  short_description: ''
});

export const GridTemperatures = new Record({
  viewport: null,
  zoom: 6,
  grid: List([]),
  gridModeSet: false
});

export const GridObject = new Record({
  coordinates: List([]),
  temp: null,
  visibility: null,
  pressure: null,
  wind_speed: null
});
