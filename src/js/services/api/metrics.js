import endpoint from 'services/api/config';
import devData from 'data/metrics.json';
import devDataEvolution from 'data/businessElementEvolution.json';

export default class MetricsServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */

  static getMetrics(request) {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }

  static getBusinessElementEvolution(index, selectors) {
    const delay = 500;
    return new Promise((resolve) => setTimeout(() => resolve(devDataEvolution), delay)).then(response => response);
  }
}
