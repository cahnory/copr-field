[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | StringType object

# StringType object

The `StringType` object is used to parse value into `string`.

- [Accepted values](#accepted-values)
  - [Example of valid values](#example-of-valid-values)
- [Built-in tests](#built-in-tests)
  - [isEqual](#isequal)
  - [isLonger](#islonger)
  - [isMatching](#ismatching)
  - [isShorter](#isshorter)
  - [isSized](#issized)

## Accepted values

The `StringType` parses any `number` or `string`.

### Example of valid values

| Values | Results | | ------------ | ------------ | | `'A string'` | `'A string'` | | `'123'` | `'123'` | | `123` | `'123'` |

### isEqual

#### Arguments

- `other`: _`string`_

#### Returns

_`boolean`_: Returns `true` if the value is equal to `other`.

### isLonger

#### Arguments

- `inf`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value’s length is greater than `inf`.

### isMatching

#### Arguments

- `regex`: _`RegExp`_

#### Returns

_`boolean`_: Returns `true` if the value is matching `regex`.

### isShorter

#### Arguments

- `sup`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value’s length is lower than `sup`.

### isSized

#### Arguments

- `length`: _`number`_

#### Returns

_`boolean`_: Returns `true` if the value’s length is equal to `length`.
