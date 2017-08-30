import endpoint from 'services/api/config';
import devData from 'data/selectors.json';

export default class SelectorsServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */
  static getSelectors() {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }
}
