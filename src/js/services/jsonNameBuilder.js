export function buildJsonName(request) {
  const { selectors, index, subindex, evolution, businessElement } = request;
  let name = 'S';
  Object.keys(selectors).forEach((key) => {
    name += `${ key },${ selectors[key].value }_`;
  });
  name = name.slice(0, -1);
  if (index !== null && index !== undefined) name += `-${ index }`;
  if (subindex !== null && subindex !== undefined) name += `-${ subindex }`;
  if (businessElement !== null && businessElement !== undefined) name += `-SM${ businessElement.id },${ businessElement.value }`;
  if (evolution) name += '-Evo';
  name += '.json';
  return name;
}