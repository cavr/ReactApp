import endpoint from 'services/api/config';
import jefe from '../../../assets/img/dev/jorge.png';

export default class LoginServices {
  /* static login() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  }*/
  static login() {
    const delay = 500;
    return new Promise((resolve) => setTimeout(() => resolve({ name: 'Jorge Glas', role: 'Managing Director', image: jefe }), delay)).then(response => response);
  }
}
