import { combineReducers } from 'redux';

import voivodeships from './containers/Map/duck/reducers';
import modes from './containers/Controls/duck/reducers';
export default combineReducers({
  voivodeships,
  modes
});
