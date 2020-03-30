[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | Result object

# Result object

The `Result` object describes the validation state of a value.

- [Properties](#properties)
  - [content](#content-result-----string--result-)
  - [error](#error-string)
  - [isEmpty](#isempty-boolean)
  - [isPending](#ispending-boolean)
  - [isValid](#isvalid-boolean)
  - [node](#node-fieldrulesettestrule)
  - [nodeType](#nodetype-field--logic--set--test)
  - [value](#value-any)

## Properties

### content: _`Result [] | { [ string ]: Result }`_

The subresults. An `Object` if it’s the result of a [`Set`](object-copr-set.md), an `Array` if it’s the result of a [`Field`](object-copr-field.md), a [`LogicRule`](test-object-rule-test.md), or a [`TestRule`](test-object-rule-test.md).

### error: _`string`_

The error causing the value to be invalid. There are four types of error:

- `VALIDATION_CONTENT`: one or more subresults have an error.
- `VALIDATION_EMPTY`: the value is empty and the [`Copr`](object-copr.md) has its [`allowEmpty`](object-copr.md#allowempty-boolean) property set to false.
- `VALIDATION_RULE`: the value doesn’t meet one or more rules.
- `VALIDATION_TYPE`: the value cannot be parsed.

### isEmpty: _`boolean`_

If the value is empty. Empty values are `''`, `null`, `undefined` and `NaN`.

### isPending: _`boolean`_

If the result of a [`Test`](test-object) is Pending. _[See "Async rules"](guides.md#async-rules)_.

### isValid: _`boolean`_

If the value is considered valid. `isValid` is true if `error` is `undefined` and `isPending` is false.

### node: [_`Field`_](object-copr-field.md)_`|`_[_`Rule`_](object-rule.md)_`|`_[_`Set`_](object-copr-set.md)_`|`_[_`TestRule`_](object-rule-test.md)

Node from which the result is output.

### nodeType: _`'field' | 'logic' | 'set' | 'test'`_

The type of the node from which the result is output.

### value: _`any`_

The parsed value.
