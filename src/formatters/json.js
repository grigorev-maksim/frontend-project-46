import diff from '../genDiff.js';

export default (file1, file2) => JSON.stringify(diff(file1, file2));
