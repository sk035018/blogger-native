import { signUpMapper } from '../../../constants/labelFieldMapper';
import { requiredFields } from '../../../utils/validations';

export const validate = (signInDetails) => (
  requiredFields(
    ['email', 'password'],
    signInDetails,
    signUpMapper
  )
);
