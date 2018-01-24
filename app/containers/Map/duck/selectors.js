export const getVoivodeships = (state) => state.voivodeships.voivodeships.get('list').toArray();
//TODO check if checked_voivodeship is not null then return filtrated data.

export const getVoivodeshipsWeather = (state) => state.voivodeships.voivodeships.get('weather').toArray();

export const isVoivodeshipsWeatherDataFetched = (state) => state.voivodeships.voivodeships.get('weather_data_fetched');

export const getCheckedVoivodeshipId = (state) => state.voivodeships.voivodeships.get('checked_voivodeship');

export const getCurrentMode = (state) => state.modes.modes.get('currentMode');

export const getCheckedVoivodeshipNeighbours = (state) => {
  const cartodb_id = getCheckedVoivodeshipId(state);
  if( cartodb_id ){
    const voivodeships = getVoivodeships(state);
    return voivodeships[ cartodb_id ].neighbours.toArray();
  }
  return [];
}

export const getChosenVoivodeshipCoordinates = (state) => {
  const voivodeships = getVoivodeships(state);
  const cartodb_id = getCheckedVoivodeshipId(state);
  if( cartodb_id && voivodeships[ cartodb_id ]) { return voivodeships[ cartodb_id ].coordinates }

  return [];
}

export const getWeatherRange = (state, type) => {
  let temps = state.voivodeships.voivodeships.get('weather').toArray().filter( a => a ).map( weather => weather[type] );
  temps = removeDuplicates( temps );
  return temps.length ? temps : null;
}


const removeDuplicates = ( a ) => a.sort( (a, b) => ( a - b )).reverse().filter(function(item, index, array) {
   return !index || item != array[index - 1];
})
