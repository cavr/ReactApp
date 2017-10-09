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
  
  /*
  static getMainGraphData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/getIndexes`, params)
      .then(response => response.json());
  }
  */

  static getIndexEvolution(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
    .then((response) => {
      if (response.status !== 200) {
        return devDataEvolution;
      }
      return response.json();
    });
  }

  /*
  static getIndexEvolution(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/getIndexEvolution`, params)
      .then(response => response.json());
  }
  */
  
}
