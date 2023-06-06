const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return String(data);
};

export default (innerTree) => {
  const iter = (tree, path) => {
    const filtered = tree.filter((node) => node.type !== 'unchanged');
    return filtered.map((node) => {
      const fullPath = (path.length === 0) ? [node.key] : [path.join('.'), node.key];
      switch (node.type) {
        case 'deleted':
          return `Property '${fullPath.join('.')}' was removed`;
        case 'added':
          return `Property '${fullPath.join('.')}' was added with value: ${stringify(node.value)}`;
        case 'changed':
          return `Property '${fullPath.join('.')}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        case 'nested':
          return iter(node.children, fullPath);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type '${node.type}'`);
      }
    }).filter((node) => node !== null)
      .join('\n');
  };
  return iter(innerTree, []);
};
