import _ from 'lodash';
import moment from 'moment';

export const requiredFields = (fieldsArray, validateState, fieldMapper) => {
    const errObj = {};
    let _isError = false;
    _.forEach(fieldsArray, fieldName => {
        if (!validateState[fieldName]) {
            _isError = true;
            errObj[fieldName] = `${fieldMapper[fieldName]} is Required.`
        }
    });

    return {
        errObj,
        _isError,
    };
};

export const isValidDate = (dateString, dateFormat = 'YYYY-MM-DD') => {
    return moment(
        moment(new Date(dateString)).format(dateFormat),
        dateFormat,
        true    
    ).isValid();
};