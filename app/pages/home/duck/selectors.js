export const getVoivodeshipsWeather = (state) => state.voivodeships.voivodeships.get('weather').toArray();

export const getCheckedVoivodeshipId = (state) => state.voivodeships.voivodeships.get('checked_voivodeship');

export const getWeatherForChosenVoivodeship = (state) => {
  const cartodb_id = getCheckedVoivodeshipId(state);
  if( cartodb_id ){
    const voivodeships = getVoivodeshipsWeather(state);
    const weather = voivodeships[ cartodb_id ];
    return weather ? weather.forecast.toArray() : [];
  }
  return [];
}

export const displayWeatherPanel = (state) => getWeatherForChosenVoivodeship(state).length > 0;
