import { signUpMapper } from '../../../constants/labelFieldMapper';
import { isValidDate, requiredFields } from '../../../utils/validations';

export const validate = (signUpDetails) => {
    const errObj = requiredFields(
        ['fullName', 'email', 'dob', 'password', 'confirmPassword'],
        signUpDetails,
        signUpMapper
    );

    if (!errObj.dob && !isValidDate(signUpDetails.dob)) {
        errObj.dob = 'Invalid Date.';
    }

    if (!errObj.confirmPassword && (signUpDetails.password !== signUpDetails.confirmPassword)) {
        errObj.confirmPassword = 'Password and Confirm Password are not same.';
    }

    return errObj;
};
