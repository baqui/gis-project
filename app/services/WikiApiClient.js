import axios from 'axios';

export default class WikiApiClient {
  static getWikiInfoByRegionName(locationName) {
    return axios.get(`http://localhost:8081/wiki-info?q=${locationName}`);
  }
}
