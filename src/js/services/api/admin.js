import endpoint from 'services/api/config';

export default class AdminServices {
  /*
  static getIndexes(request, token) {
    return fetch('/data/admin/indexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getIndexes(token) {
    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getIndexes`, params)
      .then(response => response.json());
  }

  /*
  static getIndexData(request, token) {
    return fetch('/data/admin/indexData.json')
    .then((response) => {
      if (response.status !== 200) {
        return {};
      }
      return response.json();
    });
  }
  */

  static getIndexData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getIndexData`, params)
      .then(response => response.json());
  }

  static updateIndexData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/updateIndex`, params)
      .then(response => response.json());
  }
  
  /*
  static getSubindexes(request, token) {
    return fetch('/data/admin/subindexes.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getSubindexes(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getSubindexes`, params)
      .then(response => response.json());
  }

  /*
  static getSubindexData(request, token) {
    return fetch('/data/admin/subindexData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getSubindexData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getSubindexData`, params)
      .then(response => response.json());
  }

  static updateSubindexData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/updateSubindex`, params)
      .then(response => response.json());
  }

  /*
  static getMetrics(request, token) {
    return fetch('/data/admin/metrics.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getMetrics(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getMetrics`, params)
      .then(response => response.json());
  }

  /*
  static getMetricData(request, token) {
    return fetch('/data/admin/metricData.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getMetricData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getMetricData`, params)
      .then(response => response.json());
  }

  /*
  static getParameters(request, token) {
    return fetch('/data/admin/parameters.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getParameters(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getParameters`, params)
      .then(response => response.json());
  }
  
  /*
  static getDefaultTargets(body, token) {
    return fetch('/data/admin/defaultTargets.json')
      .then((response) => {
        if (response.status !== 200) {
          return {};
        }
        return response.json();
      });
  }
  */

  static getDefaultTargets(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/getDefaultTargets`, params)
      .then(response => response.json());
  }

  static updateMetricData(body, token) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${ token }`,
      }),
    };
    return fetch(`${ endpoint }/admin/updateMetric`, params)
      .then(response => response.json());
  }
}
