[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | Type object

# Type object

The `Type` object is used to typecast an input to a javascript data structure. **copr-field** comes with several `Types`.

- [Built-in `Types`](#built-in-types)
- [Methods](#methods)
  - [parse(value)](#parsevalue)
  - [validate(value)](#validatevalue)

## Built-in `Types`

### [`DateType`](object-type-date.md)

The [`DateType`](object-type-date.md) is used to parse into `Date`.

### [`NumberType`](object-type-number.md)

The [`NumberType`](object-type-number.md) is used to parse into `number`.

### [`StringType`](object-type-string.md)

The [`StringType`](object-type-string.md) is used to parse into `string`.

## Methods

### parse(value)

The **parse()** method is used to parse a `string` value to a javascript data structure.

> For convenience, parse is able to handle a value that is already parsed.

#### Arguments

- `value`: _`any`_ – The value to parse.

#### Returns

_`any`_: Returns the parsed value or `undefined` if parsing fails.

### validate(value)

The **validate(value)** method checks if a value could be parsed.

#### Arguments

- `value`: _`any`_ – The value to validate.

#### Returns

_`boolean`_: Returns `true` if the value could be parsed.
