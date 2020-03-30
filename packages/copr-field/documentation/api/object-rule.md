[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | Rule object

# Rule object

A `Rule` object allows the testing of a value, there are different types of `Rule` described below.

- [Rule types](#rule-types)
- [Shared methods](#shared-methods)
- [Shared properties](#shared-properties)

## Rule types

### [`TestRule`](object-rule-test.md)

Used to pass a single test on a value.

### [`LogicRule`](object-rule-logic.md)

Used to pass multiple tests on a value.

## Shared methods

All `Rule` types have a single method in common:

- validate(value, context, observer)

These methods are documented in the page of each `Rule` type.

## Shared properties

All `Rule` types have a single property in common:

- meta: _`Object`_ – `Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.
