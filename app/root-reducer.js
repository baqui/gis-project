import { combineReducers } from 'redux';

import voivodeships from './containers/Map/duck/reducers';
import weather from './containers/Weather/duck/reducers';

export default combineReducers({
  voivodeships,
  weather
});
