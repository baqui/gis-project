import { Map, List, Record } from 'immutable';
import { combineReducers } from 'redux';
import { GridTemperatures } from './records';
import types from './types';

const voivodeships = (
  state = Map({
    list: List([]),
    weather: List([]),
    wiki: List([]),
    weather_data_fetched: false,
    voivodes_wiki_data_fetched: false,
    checked_voivodeship: null
  }),
  action
) => {
  switch (action.type) {
    case types.VOIVODESHIPS_DATA_PARSED:
      return state.set('list', action.data);
    case types.WEATHER_DATA_FETCHED:
      return state
        .set('weather', action.data)
        .set('weather_data_fetched', true);
    case types.VOIVODES_DATA_FETCHED:
      return state
        .set('wiki', action.data)
        .set('voivodes_wiki_data_fetched', true);
    case types.VOIVODESHIP_CHECKED:
      return state.set('checked_voivodeship', action.cartodb_id);
  }
  return state;
};

const grid_temperature = (state = new GridTemperatures(), action) => {
  switch (action.type) {
    case types.MAP_BOUNDS_CHANGED:
      return state.set('viewport', action.viewport).set('zoom', action.zoom);
    case types.GRID_FOR_BOUNDS_FETCHED:
      return state.set('grid', action.grid);
    case 'GRID_MODE_SET':
      return state.set('gridModeSet', action.boolean);
  }

  return state;
};

export default combineReducers({ voivodeships, grid_temperature });
