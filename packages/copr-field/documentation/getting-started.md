[Documentation](README.md) | Getting Started

# Getting Started

- [Installation](#installation)
- [Validate a field using a FieldCopr](#validate-a-field-using-a-fieldcopr)
- [Validate multiple fields using a SetCopr](#validate-multiple-fields-using-a-setcopr)

## Installation

```bash
$ npm install copr-field --save
```

## Validate a field using a [`FieldCopr`](api/object-copr-field.md)

```js
import {
  createField,
  numberType,
  numberIsInteger,
  numberIsGreater,
} from 'copr-field';

// create a FieldCopr
const ageCopr = createField({
  // value type
  type: numberType,
  // validation rules
  rules: [
    // requires the value to be an integer
    numberIsInteger,
    // requires the value to be greater than 18
    { test: numberIsGreater, args: [18] },
  ],
});

// validate a value
const result = ageCopr.validate('14');

result.isValid; // false
result.content[0].isValid; // true: 14 is an integer
result.content[1].isValid; // false: 14 is not greater than 18
result.value; // 14: the value parsed into a number
```

The `validate` method returns a [`Result`](api/object-result.md) object with lots of information about the validation.

## Validate multiple fields using a [`SetCopr`](api/object-copr-set.md)

```js
import {
  createSet,
  createField,
  numberType,
  numberIsInteger,
  numberIsGreater,
} from 'copr-field';

// create a SetCopr
const fieldSet = createSet({
  // create a FieldCopr
  age: createField({
    // value type
    type: numberType,
    // validation rules
    rules: [
      // requires the value to be an integer
      numberIsInteger,
      // requires the value to be greater than 18
      { test: numberIsGreater, args: [18] },
    ],
  }),
});

// validate a set of values
const result = fieldSet.validate({ age: '14' });

result.isValid; // false
result.content.age.isValid; // false
result.content.age.value; // 14: the value parsed into a number
result.content.age.content[0].isValid; // true: 14 is an integer
result.content.age.content[1].isValid; // false: 14 is not greater than 18
result.value; // { age: 14 }: the parsed set value
```
