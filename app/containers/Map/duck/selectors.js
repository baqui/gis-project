export const getVoivodeships = (state) => state.voivodeships.voivodeships.get('list').toArray();
//TODO check if checked_voivodeship is not null then return filtrated data.

export const getVoivodeshipsWeather = (state) => state.voivodeships.voivodeships.get('weather').toArray();

export const isVoivodeshipsWeatherDataFetched = (state) => state.voivodeships.voivodeships.get('weather_data_fetched');

export const getTempRange = (state) => {
  let temps = state.voivodeships.voivodeships.get('weather').toArray().filter( a => a ).map( weather => weather.temp );
  temps = removeDuplicates( temps );
  return temps.length ? temps : null;
}


const removeDuplicates = ( a ) => (
  a.sort().filter(function(item, index, array) {
       return !index || item != array[index - 1];
   })
)
