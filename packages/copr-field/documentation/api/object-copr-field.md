[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | FieldCopr object

# FieldCopr object

The `FieldCopr` object allows the parsing and validation of a value.

- [Methods](#methods)
  - [getValue(value)](#getvaluevalue)
  - [parse(value)](#parsevalue)
  - [validate(value, [options])](#validatevalue-options)
- [Properties](#properties)
  - [allowEmpty](#allowempty-boolean)
  - [meta](#meta-object)
  - [rules](#rules-rule)
  - [type](#type-type)

## Methods

### getValue(value)

The **getValue()** method works the same way as [`parse()`](#parsevalue) but does not throw an exception in case of an error.

#### Arguments

- `value`: _`any`_ – The value to parse.

#### Returns

_`any`_: Returns the parsed value or `undefined`.

### parse(value)

The **parse()** method parses a `string` argument.

> For convenience, parse is able to handle a value that is already parsed.

#### Arguments

- `value`: _`any`_ – The value to parse.

#### Returns

_`any`_: Returns the parsed value or `undefined` if parsing fails.

#### Exceptions

Throw a `VALIDATION_TYPE` exception if the value could not be parsed into the `FieldCopr` type.

### validate(value, [options])

The **validate()** method parses and validate a value argument.

#### Arguments

- `value`: _`any`_ – The value to validate.
- `options`: _`Object`_ – Options used during validation

##### Options

- `context`: _`any`_ – Any contextual data required by the `FieldCopr` rules during validation.
- `observer`: _`Object`_ – An observer of the parsing and the validation result. _[See "Async rules"](guides.md#async-rules)_.

#### Returns

_[`Result`](object-result.md)_: Returns the result of the validation of the value.

## Properties

The `FieldCopr` properties must not be modified. If you wish, you must create a new one. _[See "Creating a Copr from another"](guides.md#creating-a-copr-from-another)_.

### allowEmpty: _`boolean`_

If empty values are considered valid by [`validate()`](#validatevalue-options).

### meta: _`Object`_

`Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.

### rules: [_`Rule`_](object-rule.md)_`[]`_

`Array` containing all the rules that a value must meet in order to be valid.

### type: [_`Type`_](type-object.md)

The [`Type`](type-object.md) of the `FieldCopr`.
