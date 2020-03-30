[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | SetCopr object

# SetCopr object

The `SetCopr` object allows the parsing and validation of an object containing other [`Coprs`](object-copr.md).

- [Methods](#methods)
  - [getValue(value)](#getvaluevalue)
  - [parse(value)](#parsevalue)
  - [validate(value, [options])](#validatevalue-options)
- [Properties](#properties)
  - [allowEmpty](#allowempty-boolean)
  - [fields](#fields-object)
  - [meta](#meta-object)

## Methods

### getValue(value)

The **getValue()** method works the same way as [`parse()`](#parsevalue) but does not throw an exception in case of an error.

#### Arguments

- `value`: _`Object`_ – The value to parse.

#### Returns

_`Object`_: Returns the parsed value.

### parse(value)

The **parse()** method parses an `Object` argument of fields values.

> For convenience, parse is able to handle a value that is already parsed.

#### Arguments

- `value`: _`Object`_ – The value to parse.

#### Returns

_`Object`_: Returns an object with the parsed fields values.

#### Exceptions

Throw a `VALIDATION_TYPE` exception if the value is not an `Object` or if a field could not be parsed into its `Copr` type.

### validate(value, [options])

The **validate()** method parses and validate a value argument.

#### Arguments

- `value`: _`any`_ – The value to validate.
- `options`: _`Object`_ – Options used during validation

##### Options

- `context`: _`any`_ – Any contextual data required by the `SetCopr` fields during validation.
- `observer`: _`Object`_ – An observer of the parsing and the validation result. _[See "Async rules"](guides.md#async-rules)_.

#### Returns

_[`Result`](object-result.md)_: Returns the result of the validation of the value.

## Properties

The `SetCopr` properties must not be modified. If you wish, you must create a new one. _[See "Creating a Copr from another"](guides.md#creating-a-copr-from-another)_.

### allowEmpty: _`boolean`_

If empty values are considered valid by [`validate()`](#validatevalue-options).

### fields: [_`Copr`_](object-copr.md)_`[]`_

`string` indexed `Object` of [_`Copr`_](object-copr.md)

### meta: _`Object`_

`Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.
