import endpoint from 'services/api/config';
import devData from 'data/mainGraph.json';
import devDataEvolution from 'data/evolutionData.json';
import { buildJsonName } from 'services/jsonNameBuilder';

export default class MainGraphServices {
  static getMainGraphData(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devData;
        }
        return response.json();
      });
  }

  static getIndexEvolution(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devDataEvolution;
        }
        return response.json();
      });
  }
}
