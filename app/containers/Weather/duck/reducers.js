import { Map, List, Record } from 'immutable';
import { combineReducers } from 'redux';
import types from './types';
import { normalizedForecastData } from './normalizers';


const weather = ( state = Map ({
  list: List([])
}), action ) => {
  switch (action.type) {
    case types.WEATHER_DATA_FETCHED:
      return state.set('list', normalizedForecastData( action.data ) )
  }
  return state;
}


export default combineReducers({ weather });
