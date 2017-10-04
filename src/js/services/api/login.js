import endpoint from 'services/api/config';

export default class LoginServices {
  static login(username, password) {
    const body = JSON.stringify({
      username,
      password,
    });

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return fetch(`${ endpoint }/auth/sign_in`, { method: 'POST', body, headers })
      .then((response) => {
        if (response.status !== 200) return { error: 'Error' };
        return response.json();
      });
  }
}
