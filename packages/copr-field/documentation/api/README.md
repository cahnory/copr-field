[Documentation](../README.md) | API

# API

- [Functions](#functions)
- [Objects](#objects)

## Functions

### [`Copr`](object-copr.md) functions

#### [createField](func-create-field.md)

Create a new [`FieldCopr`](object-copr-field.md) object allowing the parsing and validation of a value.

#### [createSet](func-create-set.md)

Create a new [`SetCopr`](object-copr-set.md) object allowing the parsing and validation of an object containing other [`Coprs`](object-copr.md).

### [`Rule`](object-rule.md) functions

#### [all](func-all.md)

Create a [`LogicRule`](object-rule-logic.md) that succeeds if all its rules succeed.

#### [not](func-not.md)

Create a [`LogicRule`](object-rule-logic.md) that succeeds if all its rules fail.

#### [oneOf](func-one-of.md)

Create a [`LogicRule`](object-rule-logic.md) that succeeds if at least one of its rules succeed.

## Objects

### [Copr object](object-copr.md)

The [`Copr`](object-copr.md) object allows the parsing and validation of a value. There are two types of [`Copr`](object-copr.md):

- The [`FieldCopr`](object-copr-field.md), used to parse and validate a single value.
- The [`SetCopr`](object-copr-set.md), used to parse and validate a `string` indexed `Object` of value.

### [Result object](object-result.md)

The [`Result`](object-result.md) object describes the validation state of a value.

### [Rule object](object-rule.md)

The [`Rule`](object-rule.md) object is used to perform a test on a value. There are two types of [`Rule`](object-rule.md):

- The [`LogicRule`](object-rule-logic.md), used to validate a value by multiple rules.
- The [`TestRule`](object-rule-test.md), used to validate a value by a single test.

### [Type object](type-object.md)

The [`Type`](type-object.md) object is used to typecast an input to a javascript data structure. There are three types of built-in [`Type`](type-object.md)

- The [`DateType`](object-type-date.md), used to parse value into `Date`.
- The [`NumberType`](object-type-number.md), used to parse value into `number`.
- The [`StringType`](object-type-string.md), used to parse value into `string`.
