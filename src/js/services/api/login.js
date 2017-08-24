import endpoint from 'services/api/config';

export default class LoginServices {
  static login() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  }
}
