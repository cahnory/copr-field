# ✨ copr-field

Input parser and validator.

## Table of Contents

- [Install](#install)
- [Contributors](#contributors)
- [The copper object](#the-copper-object)
  - [parse](#copper.parse)
  - [process](#copper.process)
  - [validate](#copper.validate)
- [Built-in types](#built-in-types)
  - [date](#date)
  - [number](#number)
  - [string](#string)
- [Rule definition](#rule-definition)
  - [all](#rule.all)
  - [args](#rule.args)
  - [getArgs](#rule.getArgs)
  - [meta](#rule.meta)
  - [not](#rule.not)
  - [oneOf](#rule.oneOf)
  - [test](#rule.test)
- [Report](#report)
  - [Content property](#content-property)
  - [Empty error](#empty-error)
  - [Type error](#type-error)
  - [Rule error](#rule-error)

## Install

```bash
$ npm install copr-field
```

## Contributors

- [Jérémy De la casa](https://github.com/jeremydelacasa) - for finding the awesome _copper-field_ name and the definitive one accepted by npm.

## The copper object

The copper object is created given a _type_ and optional _rules_.

```js
import copperField from 'copr-field';
import numberType, { isInteger, isGreater } from 'copr-field/types/number';

const copper = copperField({
  type: numberType,
  allowEmpty: false,
  rules: [
    { test: isInteger, meta: { description: 'Must be an integer' } },
    {
      test: isGreater,
      args: [18],
      meta: { description: 'Must be greater than 18' },
    },
  ],
});
```

You can now process input with it using its process method:

```js
const result = copper.process(ageInput);
```

### copper.parse

```js
copper.parse('18');
```

Function accepting an input to parse without testing it against the copper rules.

It outputs the parsed value or throw a `VALIDATION_TYPE` if it fails.

### copper.process

```js
copper.process('18');
```

It returns a [report](#report).

### copper.validate

```js
copper.parse(18);
```

Function accepting a value to test against the copper rules.

It returns a [report](#report).

## Built-in types

### Date

```js
import dateType, { isAfter } from 'copr-field/types/date';
```

### Date tests

- isAfter(value: `date`, inf: `date`)
- isBefore(value: `date`, sup: `date`)
- isEqual(value: `date`, inf: `date`)
- isSameYear(value: `date`, other: `date`)
- isSameMonth(value: `date`, other: `date`)
- isSameMonthOfYear(value: `date`, other: `date`)
- isSameDayOfWeek(value: `date`, other: `date`)
- isSameDayOfMonth(value: `date`, other: `date`)
- isSameDay(value: `date`, other: `date`)

### Number

```js
import numberType, { isGreater } from 'copr-field/types/number';
```

### Number tests

- isEqual(value: `number`, other: `number`)
- isGreater(value: `number`, inf: `number`)
- isInteger(value: `number`)
- isLower(value: `number`, sup: `number`)
- isModulo(value: `number`, mod: `number`)
- isPositive(value: `number`)
- isNegative(value: `number`)

### String

```js
import stringType, { isLonger } from 'copr-field/types/string';
```

### String tests

- isEqual(value: `string`, other: `string`)
- isLonger(value: `string`, inf: `number`)
- isShorter(value: `string`, sup: `number`)
- isSized(value: `string`, sup: `number`)

## Rule definition

A rule could be defined by a test function or an object.

### rule.all

Array of rules. All the rules in the array must pass for the rule to pass.
If defined, the `not`, `oneOf` and `test` properties are ignored.

```js
{
  "all": [
    {
      "test": isInteger
    },
    {
      "test": isGreater,
      "args": [18]
    }
  ]
}
```

### rule.args

Array of arguments passed to the test function.

```js
{
  "test": isGreater,
  "args": [18]
}
```

### rule.getArgs

Function returning an array of arguments passed to the test function.
If defined, the `args` property is ignored.

`getArgs` will be called with the context as first argument.

```js
{
  "test": isEqual,
  "getArgs": (context) => [context.password]
}
```

### rule.meta

Object containing extra data about the rule like a description.

```js
{
  "meta": {
    "description": "you must be of legal age to register"
  },
  "all": [
    isInteger,
    {
      "test": isGreater,
      "args": [17]
    }
  ]
}
```

### rule.not

Array of rules. All the rules in the array must fail for the rule to pass.
If defined, the `oneOf` and `test` properties are ignored.

The `not` property is ignored if the `all` property is defined.

```js
{
  "not": [
    {
      "test": isLower,
      "args": [18]
    }
  ]
}
```

### rule.oneOf

Array of rules. At least one of the rules in the array must pass for the rule to pass.
If defined, the `test` property is ignored.

The `oneOf` property is ignored if the `all` or `not` property is defined.

```js
{
  "oneOf": [
    {
      "test": isLower,
      "args": [-18]
    },
    {
      "test": isGreater,
      "args": [18]
    }
  ]
}
```

### rule.test

Function accepting a value to test.

The `test` property is ignored if the `all`, `not` or `oneOf` property is defined.

## Report

The report is an object returned by the `copper.process` and `copper.validate` methods with the following properties:

- **error**: `'VALIDATION_EMPTY'` | `'VALIDATION_TYPE'` | `'VALIDATION_RULE'` | `undefined`
- **isEmpty**: a `boolean`, true if the input is considered empty
- **value**: the parsed input or `undefined` if error is set to `'VALIDATION_TYPE'` or the input is considered empty
- **content**: an `array` containing the state of each one of the copper rules

### Content property

The content contains the state of each rules, represented by an object with the following properties:

- **pass**: a `boolean`, true if the rule passed
- **rule**: the tested rule
- **content**: an array containing the state of all the sub rules defined with the `all`, `not` or `oneOf` property

### Empty error

The report contains a `VALIDATION_EMPTY` error if the input is considered empty and `copper.allowEmpty` is `false`:

```json
{
  "error": "VALIDATION_EMPTY",
  "isEmpty": true,
  "content": []
}
```

### Type error

The report contains a `VALIDATION_TYPE` error if the input could not be parsed into the copper type:

```json
{
  "error": "VALIDATION_TYPE",
  "isEmpty": false,
  "content": []
}
```

### Rule error

The report contains a `VALIDATION_RULE` error if the input failed one or more of the copper rules:

```json
{
  "error": "VALIDATION_RULE",
  "value": 16,
  "isEmpty": false,
  "content": [
    {
      "pass": true,
      "rule": {...},
      "content": []
    },
    {
      "pass": false,
      "rule": {...},
      "content": []
    }
  ]
}
```
