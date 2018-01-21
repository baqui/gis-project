import { Map, List, Record } from 'immutable';
import { combineReducers } from 'redux';
import types from './types';

const voivodeships = ( state = Map ({
  list: List([]),
  weather: List([]),
  weather_data_fetched: false,
  checked_voivodeship: null
}), action ) => {
  switch (action.type) {
    case types.VOIVODESHIPS_DATA_PARSED:
      return state.set('list', action.data)
    case types.WEATHER_DATA_FETCHED:
      return state.set('weather', action.data ).set('weather_data_fetched', true)
  }
  return state;
}

export default combineReducers({ voivodeships });
