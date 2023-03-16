import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2)
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc[`+ ${key}`] = obj2[key];
        return acc;
      }
      if (!Object.hasOwn(obj2, key)) {
        acc[`- ${key}`] = obj1[key];
        return acc;
      }
      if (obj1[key] !== obj2[key]) {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = obj1[key];
        return acc;
      }
      return acc;
    }, {});
  return keys;
};

export default genDiff;
