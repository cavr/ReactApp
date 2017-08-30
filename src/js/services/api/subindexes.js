import endpoint from 'services/api/config';
import devData from 'data/subindexes.json';

export default class SubindexesServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */

  static getSubindexes(request) {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }
}
