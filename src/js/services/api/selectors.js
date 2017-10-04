import endpoint from 'services/api/config';

export default class SelectorsServices {
  static getSelectors(token) {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/selectors`, params)
      .then(response => response.json());
  }
}
