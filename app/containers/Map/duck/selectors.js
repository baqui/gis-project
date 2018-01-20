export const getVoivodeships = (state) => state.voivodeships.voivodeships.get('list').toArray().filter( voivodeship => voivodeship );

export const getVoivodeshipsWeather = (state) => state.weather.weather.get('list').toArray().filter( a => a );

export const getMaxTemp = (state) => {
  const temps = state.weather.weather.get('list').toArray().filter( a => a ).map( weather => weather.temp );
  console.log("MAX_WEATHER ", Math.max( ...temps ));
  return Math.max( ...temps );
}
