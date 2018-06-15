import axios from 'axios';

export default class GridTemperatureClient {
    static getGridTemperatureByViewport(map_zoom, viewport) {
        const zoom = zoomMapToApi(map_zoom);
        return axios.get(`http://localhost:8080/weather/where?zoom=${zoom}&viewport=${viewport}`);
    }
}

const zoomMapToApi = zoom => {
    const apiZooms = [6, 8, 10];
    const ranges = [ [0,1,2,3,4,5,6,7], [8,9], [10,11,12,13,14,15,16,17,18,20]];
    const index = ranges.map( range => range.indexOf(zoom) > -1 ? true : false);
    return apiZooms[index.indexOf(true)];
}
