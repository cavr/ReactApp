import endpoint from 'services/api/config';

export default class AlertsServices {
  static getAlerts(request) {
    return fetch('js/data/alert.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
}
