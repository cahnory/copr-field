import createField, {
  StringType,
  stringIsEqual,
  stringIsLonger,
  stringIsMatching,
  stringIsShorter,
} from 'copr-field';
import { getRuleValue, onChange } from './utils';

export const username = createField({
  type: StringType,
  meta: {
    label: 'Username',
    ruleListStart: 'The username must:',
    autoComplete: 'username',
  },
  rules: [
    onChange({
      meta: { description: 'be available' },
      test: () => new Promise(resolve => setTimeout(() => resolve(true), 1000)),
    }),
  ],
});

export const description = createField({
  type: StringType,
  allowEmpty: true,
  meta: {
    label: 'Description',
    ruleListStart: 'The Description must:',
  },
  rules: [
    {
      meta: {
        description: 'not be more than 200 characters long',
      },
      test: stringIsShorter,
      args: [201],
    },
  ],
});

export const password = createField({
  type: StringType,
  meta: {
    label: 'Mot de passe',
    ruleListStart: 'The Password must:',
    type: 'password',
    autoComplete: 'new-password',
  },
  rules: [
    {
      meta: {
        description: 'not be less than 8 characters long',
      },
      test: stringIsLonger,
      args: [7],
    },
    {
      meta: {
        description: 'contain at least 1 digit',
      },
      test: value => stringIsMatching(value, /[0-9]/),
    },
    {
      meta: {
        description: 'contain at least 1 capital letter',
      },
      test: value => stringIsMatching(value, /[A-Z]/),
    },
  ],
});

export const passwordConfirmation = createField({
  type: StringType,
  meta: {
    label: 'Password confirmation',
    ruleListStart: 'Password confirmation must:',
    type: 'password',
    autoComplete: 'new-password',
  },
  rules: [
    {
      meta: {
        description: 'match the password',
      },
      test: stringIsEqual,
      getArgs: options => [
        getRuleValue({
          ...options,
          fieldPath: options.fieldPath
            .slice(0, options.fieldPath.length - 1)
            .concat('password'),
        }),
      ],
    },
  ],
});
