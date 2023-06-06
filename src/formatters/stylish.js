const makeIndent = (f) => {
  const file = f.split('\n');
  return file.map((str) => {
    if (str !== file[0]) {
      return `    ${str}`;
    }
    return str;
  }).join('\n');
};

function stringify(value, replacer = ' ', spacesCount = 1) {
  const indentforkey = replacer.repeat(spacesCount);
  const stringifyJSON = (currentValue, indent) => {
    if (typeof currentValue === 'string') {
      return currentValue;
    }
    if (typeof currentValue === 'object' && currentValue !== null) {
      const lines = Object.entries(currentValue).map(([key, val]) => {
        const keyString = typeof key === 'string' ? key : String(key);
        const valueString = stringifyJSON(val, indent + indentforkey);
        return `${indent}${keyString}: ${valueString}`;
      });
      return ['{', ...lines, `${indent.slice(0, -indentforkey.length)}}`].join('\n');
    }
    return String(currentValue);
  };
  return stringifyJSON(value, indentforkey);
}

const convert = (file) => {
  const newFile = stringify(file, ' ', 4);
  const result = makeIndent(newFile);
  return result.replaceAll(',', '').trim();
};

export default (innerTree) => {
  const iter = (tree) => tree.map((node) => {
    switch (node.type) {
      case 'deleted':
        return `  - ${node.key}: ${convert(node.value)}`;
      case 'added':
        return `  + ${node.key}: ${convert(node.value)}`;
      case 'unchanged':
        return `    ${node.key}: ${convert(node.value)}`;
      case 'changed':
        return `  - ${node.key}: ${convert(node.value)}\n  + ${node.key}: ${convert(node.value2)}`;
      case 'nested':
        return `    ${node.key}: {\n    ${makeIndent(iter(node.children))}\n    }`;
      default:
        throw new Error(`Unknown type '${node.type}'`);
    }
  }).join('\n');
  return `{\n${iter(innerTree)}\n}`;
};
