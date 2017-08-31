import endpoint from 'services/api/config';

export default class LoginServices {
  /* static login() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  }*/
  static login() {
    const delay = 500;
    const testImage = 'https://lesliemcnulty.com/wp-content/uploads/2015/02/Kevin_Avatar_Circular.png';
    return new Promise((resolve) => setTimeout(() => resolve({ name: 'Jorge Glas', role: 'Managing Director', image: testImage }), delay)).then(response => response);
  }
}
