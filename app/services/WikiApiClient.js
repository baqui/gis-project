import axios from 'axios';

export default class WikiApiClient {

  static getWikiInfoByRegionName( locationName ) {
    return axios.get(`http://localhost:8080/wiki-info?q=${locationName}`);
  }

}
