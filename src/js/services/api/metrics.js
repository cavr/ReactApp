import endpoint from 'services/api/config';

import devData from 'data/metrics.json';
import devDataEvolution from 'data/businessElementEvolution.json';
import { buildJsonName } from 'services/jsonNameBuilder';

export default class MetricsServices {

  static getMetrics(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devData;
        }
        return response.json();
      });
  }

  /*
  static getMetrics(request, token) {
    const params = {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    };
    return fetch(`${ endpoint }/getMetrics`, params)
      .then(response => response.json());
  }
  */

  static getBusinessElementEvolution(request) {
    return fetch(`/data/${ buildJsonName(request) }`)
      .then((response) => {
        if (response.status !== 200) {
          return devDataEvolution;
        }
        return response.json();
      });
  }

  /*
  static getBusinessElementEvolution(request, token) {
    const params = {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    };
    return fetch(`${ endpoint }/getBusinessElementMetricEvolution`, params)
      .then(response => response.json());
  }
  */

  static generateXLS(request) {
    return fetch('/data/xlsTest.json')
      .then((response) => {
        if (response.status !== 200) {
          return devDataEvolution;
        }
        return response.json();
      });
  }
}
