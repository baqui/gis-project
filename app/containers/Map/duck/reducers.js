import { Map, List, Record } from 'immutable';
import { combineReducers } from 'redux';
import types from './types';


const voivodeships = ( state = Map ({
  list: List([])
}), action ) => {
  switch (action.type) {
    case types.VOIVODESHIPS_DATA_PARSED:
      return state.set('list', action.data)
  }
  return state;
}


export default combineReducers({ voivodeships });
