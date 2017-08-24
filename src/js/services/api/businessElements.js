import endpoint from 'services/api/config';

export default class BusinessElementsServices {
  static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  }
}
