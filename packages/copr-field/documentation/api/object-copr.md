[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | Copr object

# Copr object

A `Copr` object allows the parsing and validation of a value, there are different types of `Copr` described below.

- [Copr types](#copr-types)
- [Shared methods](#shared-methods)
- [Shared properties](#shared-properties)

## Copr types

### [`FieldCopr`](object-copr-field.md)

The [`FieldCopr`](object-copr-field.md) is used to parse and validate a single value.

### [`SetCopr`](object-copr-set.md)

The [`SetCopr`](object-copr-set.md) is used to parse and validate a `string` indexed `Object` of value.

## Shared methods

All `Copr` types share a common set of methods:

- getValues(value)
- parse(value)
- validate(value, [options])

These methods are documented in the page of each `Copr` type.

## Shared properties

All `Copr` types share a common set of properties:

- allowEmpty: _`boolean`_ – If empty values are considered valid by `validate()`.
- meta: _`Object`_ – `Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.
