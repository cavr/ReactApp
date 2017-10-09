export function buildJsonName(request) {
  const { selectors, index, subindex, evolution, metric, businessElement } = request;
  let name = 'S';
  Object.keys(selectors).forEach((key) => {
    name += `${ key },${ selectors[key] }_`;
  });
  name = name.slice(0, -1);
  if (index !== null && index !== undefined) name += `-${ index }`;
  if (subindex !== null && subindex !== undefined) name += `-${ subindex }`;
  if (metric !== null && metric !== undefined && businessElement !== null && businessElement !== undefined) name += `-${ metric }-SM${ businessElement.id },${ businessElement.value }`;
  if (evolution) name += '-Evo';
  name += '.json';
  return name;
}
