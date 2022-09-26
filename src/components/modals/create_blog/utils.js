import { blogMapper } from '../../../constants/labelFieldMapper';
import { requiredFields } from '../../../utils/validations';

export const validate = blogPayload =>
  requiredFields(['title', 'body'], blogPayload, blogMapper);
