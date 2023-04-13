import _ from "lodash";

const omitFieldsNotUsingInObject = (array: any[], fields: string[]) => {
  return array.map((item) => {
    return _.omit(item, fields);
  });
};

export { omitFieldsNotUsingInObject };
