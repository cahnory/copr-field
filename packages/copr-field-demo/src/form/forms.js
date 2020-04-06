import { createSet } from 'copr-field';
import {
  description,
  password,
  passwordConfirmation,
  username,
} from './fields';

// eslint-disable-next-line import/prefer-default-export
export const createUser = createSet({
  fields: {
    username,
    description,
    password,
    passwordConfirmation,
  },
});
