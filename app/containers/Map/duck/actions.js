import types from './types';
import { List } from 'immutable';

let googleMap;

export const getGoogleMap = () => googleMap;

export const storeGoogleMap = (map) => { googleMap = map; }

export const mapLoaded = (map) => dispatch => storeGoogleMap(map);


export const setBounds = (places) => {
  if( !googleMap ){ return false; }
  let bounds = new google.maps.LatLngBounds(null);

  places.map( (place) => {
    if( place.geometry.viewport ){
      bounds.union( place.geometry.viewport );
    } else {
      bounds.extend( place.geometry.location );
    }
  });

  places.length > 0 && googleMap.fitBounds( bounds );
}

const addAdditionalPointsAround = (point) => {
  return [{ ...point}, { ...point}, { ...point}].map( (point, index) => {
    if( index % 2 === 0 ){
      point.lng += 0.1;
      point.lat += 0.1;
    } else {
      point.lng -= 0.1;
      point.lat -= 0.1;
    }
    return point;
  });
}
