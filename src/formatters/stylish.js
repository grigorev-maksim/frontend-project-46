import _ from 'lodash';

const genIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);

const stringify = (nodeValue, depth = 1) => {
  if (!(_.isObject(nodeValue))) {
    return `${nodeValue}`;
  }
  const result = Object.entries(nodeValue).map(([key, value]) => `${genIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${genIndent(depth)}}`;
};
const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${genIndent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${genIndent(depth)}  }`;
        case 'added':
          return `${genIndent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${genIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${genIndent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return `${genIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}\n${genIndent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`;
        default:
          throw new Error(`Unknown type '${item.type}'`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};
export default stylish;
