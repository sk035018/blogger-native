import _ from 'lodash';
import moment from 'moment';

export const requiredFields = (fieldsArray, validateState, fieldMapper) => {
  const errObj = {};
  _.forEach(fieldsArray, fieldName => {
    if (!validateState[fieldName]) {
      errObj[fieldName] = `${fieldMapper[fieldName]} is Required.`;
    }
  });

  return errObj;
};

export const isValidDate = (dateString, dateFormat = 'YYYY-MM-DD') => {
  return moment(
    moment(new Date(dateString)).format(dateFormat),
    dateFormat,
    true
  ).isValid();
};
