import endpoint from 'services/api/config';

export default class AdminServices {
  static getIndexes(request) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getParameters(request) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getMetrics(request) {
    return fetch('/data/admin/metrics.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static createMetric(request) {

  }
  static createParameter(request) {

  }
  static updateMetricTarget(request) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
}
