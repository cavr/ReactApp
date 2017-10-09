import endpoint from 'services/api/config';

import devData from 'data/metrics.json';
import devDataEvolution from 'data/businessElementEvolution.json';
import { buildJsonName } from 'services/jsonNameBuilder';

export default class MetricsServices {
  /*
  static getMetrics(body) {
    return fetch(`/data/${ buildJsonName(body) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devData;
        }
        return response.json();
      });
  }
  */
  
  static getMetrics(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/getMetrics`, params)
      .then(response => response.json());
  }
  
  /*
  static getBusinessElementEvolution(body) {
    return fetch(`/data/${ buildJsonName(body) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devDataEvolution;
        }
        return response.json();
      });
  }
  */

  static getBusinessElementEvolution(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/getBusinessElementMetricEvolution`, params)
      .then(response => response.json());
  }

  static generateXLS(body) {
    return fetch('/data/xlsTest.json')
      .then((response) => {
        if (response.status !== 200) {
          return devDataEvolution;
        }
        return response.json();
      });
  }
}
