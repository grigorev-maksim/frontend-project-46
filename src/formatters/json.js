import diff from '../genDiff.js';

export default (tree) => JSON.stringify(diff(tree));
