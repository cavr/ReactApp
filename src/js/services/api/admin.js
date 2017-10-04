import endpoint from 'services/api/config';

export default class AdminServices {
  static getIndexes(request, token) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getIndexData(request, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
				  resolve(fetch('/data/admin/indexData.json')
            .then((response) => {
              if (response.status !== 200) {
                return {};
              }
              return response.json();
            }));
      }, 1000);
    });
  }
  static updateIndexData(request, token) {
    
  }
  static getSubindexes(request, token) {
    return fetch('/data/admin/subindexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getSubindexData(request, token) {
    return fetch('/data/admin/subindexData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static updateSubindexData(request, token) {
    
  }
  static getMetrics(request, token) {
    return fetch('/data/admin/metrics.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getMetricData(request, token) {
    return fetch('/data/admin/metricData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  static getParameters(request, token) {
    return fetch('/data/admin/parameters.json')
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

  static updateMetricData(request, token) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
}
