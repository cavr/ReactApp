import endpoint from 'services/api/config';
import devData from 'data/mainGraph.json';

export default class SubIndecesServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */

  static getSubindecesData(request) {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }
}
