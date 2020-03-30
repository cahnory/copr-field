[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | NumberType object

# NumberType object

The `NumberType` object is used to parse value into `number`.

- [Accepted values](#accepted-values)
  - [Example of valid values](#example-of-valid-values)
- [Built-in tests](#built-in-tests)
  - [isEqual](#isequal)
  - [isGreater](#isgreater)
  - [isInteger](#isinteger)
  - [isLower](#islower)
  - [isModulo](#ismodulo)
  - [isPositive](#ispositive)
  - [isNegative](#isnegative)

## Accepted values

The `NumberType` parses numbers expressed as `number` or `string`.

### Example of valid values

| Values | Results | | -------- | ------- | | `123` | `123` | | `1.23` | `1.23` | | `'123'` | `123` | | `'1.23'` | `1.23` |

## Built-in tests

### isEqual

#### Arguments

- `other`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value is equal to `other`.

### isGreater

#### Arguments

- `inf`: _`number`_

#### Returns

_`boolean`_: Returns `true` if value is greater than `inf`.

### isInteger

#### Arguments

- `value`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value is an integer.

### isLower

#### Arguments

- `sup`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value is lower than `sup`.

### isModulo

#### Arguments

- `mod`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value module `mod` is equal to `0`.

### isPositive

#### Returns

_`boolean`_: Returns `true` if the value is greater than `0`.

### isNegative

#### Returns

_`boolean`_: Returns `true` if the value is lower than `0`.
