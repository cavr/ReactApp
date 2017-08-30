import endpoint from 'services/api/config';
import devData from 'data/businessElements.json';
import devDataEvolution from 'data/businessElementEvolution.json';

export default class BusinessElementsServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */

  static getBusinessElements(request) {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }

  static getBusinessElementEvolution(index, selectors) {
    const delay = 500;
    return new Promise((resolve) => setTimeout(() => resolve(devDataEvolution), delay)).then(response => response);
  }
}
