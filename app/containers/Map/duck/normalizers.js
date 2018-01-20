import { schema, normalize } from 'normalizr';
import { List } from 'immutable';
import { Point, City, Voivodeship } from './records';

export const normalizedVoivodeshipData = (data) => {
  let voivodeships = [];
  data.features.map( feature => {
    voivodeships[ feature.properties.cartodb_id ] = toVoivodeship( feature );
  });
  return List( voivodeships );
}


const toPoint = (obj) => ( new Point(obj) );

const toCity = obj => (
  new City({
    name: obj.name,
    coordinates: toPoint( obj.coordinates )
  })
)

const toVoivodeship = obj => (
  new Voivodeship({
    cartodb_id: obj.properties.cartodb_id,
    name: obj.properties.name,
    city: toCity(obj.city),
    coordinates: List( obj.geometry.coordinates.map( reg => reg[0] ) ),
  })
)
