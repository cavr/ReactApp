import endpoint from 'services/api/config';

export default class SelectorsServices {
  static getSelectors() {
    return fetch('/data/selectors.json')
      .then(response => response.json());
  }
}
