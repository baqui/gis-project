import { Map, List, Record } from 'immutable';
import { combineReducers } from 'redux';
import types from './types';
import { MAP_MODES } from '../../../utils/consts';

const modes = (
  state = Map({
    currentMode: MAP_MODES.temperature
  }),
  action
) => {
  switch (action.type) {
    case types.MAP_MODE_SET:
      return state.set('currentMode', action.mode);
  }
  return state;
};

export default combineReducers({ modes });
