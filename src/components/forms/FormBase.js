import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const FormBase = ({ formFields, initialValues, validate, onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {formFields}
        </Formik>
    );
};

FormBase.propTypes = {
    formFields: PropTypes.func,
    initialValues: PropTypes.any,
    validate: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default FormBase;
