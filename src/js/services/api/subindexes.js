import endpoint from 'services/api/config';
import devData from 'data/subindexes.json';
import { buildJsonName } from 'services/jsonNameBuilder';

export default class SubindexesServices {
  static getSubindexes(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devData;
        }
        return response.json();
      });
  }
}
