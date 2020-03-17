# ✨ copper-field

## Table of Contents

- [Install](#install)
- [Contributors](#contributors)
- [The copper object](#the-copper-object)
- [Process type error](#process-type-error)
- [Process rule error](#process-rule-error)
- [Process rule error](#process-rule-error)

## Install

```bash
$ npm install copper-field
```

## Contributors

- [Jérémy DE LA CASA](https://github.com/jeremydelacasa) - for finding this awesome name.

## The copper object

The copper object is created given a _type_ and some _rules_.

```js
import copperField from 'copper-field';
import numberType, { isInteger, isGreater } from 'copper-field/lib/number';

const copper = copperField(numberType, [
  { test: isInteger, meta: { description: 'Must be an integer' } },
  {
    test: isGreater,
    args: [18],
    meta: { description: 'Must be greater than 18' },
  },
]);
```

You can now process input with it using its precess method:

```js
const result = copper.process(ageInput);
```

## Process type error

If the processed input could not be parsed into the copper type, `process` will return a `VALIDATION_TYPE` error:

```json
{
  "error": "VALIDATION_TYPE",
  "content": []
}
```

## Process rule error

If the processed input failed one or more of the copper rules, `process` will return a `VALIDATION_RULE` error:

```json
{
  error: "VALIDATION_RULE",
  value: 16,
  content: [
    {
      pass: true,
      rule: {...},
      content: []
    },
    {
      pass: false,
      rule: {...},
      content: []
    }
  ]
}
```
