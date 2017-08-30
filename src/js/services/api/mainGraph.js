import endpoint from 'services/api/config';
import devData from 'data/mainGraph.json';
import devDataEvolution from 'data/evolutionData.json';

export default class MainGraphServices {
  /* static getData() {
    return fetch('http://date.jsontest.com/')
      .then(response => response.json());
  } */
  static getMainGraphData(request) {
    const delay = 200;
    return new Promise((resolve) => setTimeout(() => resolve(devData), delay)).then(response => response);
  }

  static getIndexEvolution(index, selectors) {
    const delay = 500;
    return new Promise((resolve) => setTimeout(() => resolve(devDataEvolution), delay)).then(response => response);
  }
}
