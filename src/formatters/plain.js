const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return `${data}`;
};

export default (innerTree) => {
  const iter = (tree, path) => {
    const filtered = tree.filter((node) => node.status !== 'unchanged');
    return filtered.map((node) => {
      const fullPath = (path === '') ? [node.key] : [path, node.key];
      switch (node.status) {
        case 'deleted':
          return `Property '${fullPath.join('.')}' was removed`;
        case 'added':
          return `Property '${fullPath.join('.')}' was added with value: ${stringify(node.value)}`;
        case 'changed':
          return `Property '${fullPath.join('.')}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        case 'nested':
          return iter(node.children, fullPath.join('.'));
        default:
          throw new Error();
      }
    }).join('\n');
  };
  return iter(innerTree, '');
};
