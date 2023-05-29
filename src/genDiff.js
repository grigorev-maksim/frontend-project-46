import _ from 'lodash';

const getKeys = (f1, f2) => _.sortBy(_.uniq(_.union(_.keys(f1), _.keys(f2))));

const diff = (f1, f2) => {
  const keys = getKeys(f1, f2);
  return keys.map((key) => {
    if (_.has(f1, key) && !_.has(f2, key)) {
      return { key, value: f1[key], status: 'deleted' };
    }
    if (_.has(f2, key) && !_.has(f1, key)) {
      return { key, value: f2[key], status: 'added' };
    }
    if (_.isPlainObject(f1[key]) && _.isPlainObject(f2[key])) {
      return { key, children: diff(f1[key], f2[key]), status: 'nested' };
    }
    return _.isEqual(f1[key], f2[key]) ? { key, value: f1[key], status: 'unchanged' } : {
      key, value: f1[key], value2: f2[key], status: 'changed',
    };
  });
};
export default diff;
