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
  static getIndexData(request) {
    return fetch('/data/admin/indexData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static updateIndexData(request) {
    
  }
  static getSubindexes(request) {
    return fetch('/data/admin/subindexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getSubindexData(request) {
    return fetch('/data/admin/subindexData.json')
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
  static getMetricData(request) {
    return fetch('/data/admin/metricData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  
  static getDefaultTargets(request) {
    return fetch('/data/admin/defaultTargets.json')
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
