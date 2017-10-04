export default class FormatRequestService {
  static formatSelectors(selectors) {
    const finalSelectors = {};
    Object.keys(selectors).forEach((key) => {
      finalSelectors[key] = selectors[key].value;
    });
    return finalSelectors;
  }
}
