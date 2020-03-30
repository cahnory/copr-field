[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | LogicRule object

# LogicRule object

The `LogicRule` object allows the testing of a value against multiple rules.

- [Methods](#methods)
  - [operator(options)](#operatoroptions)
  - [validate(value, context, observer)](#validatevalue-context-observer)
- [Properties](#properties)
  - [meta](#meta-object)
  - [rules](#rules-object)

## Methods

### operator(options)

The **operator()** method is used by the `LogicRule` to determine if the validation succeeds or fails based on the results of all the `LogicRule` rules validations.

#### Arguments

- `options`: _`Object`_ – informations about the rules.

##### Options

- `failures`: _`number`_ – number of failing rules of the `LogicRule`.
- `passes`: _`number`_ – number of succeeding rules of the `LogicRule`.
- `isPending`: _`boolean`_ – true if one or more rules of the `LogicRule` are pending.
- `content`: [_`Result`_](object-result.md)_`[]`_ – results of all the rules of the `LogicRule`.

#### Returns

_`{ isPending: boolean, isValid: boolean }`_: Returns an `Object` with the pending and validation state of the `LogicRule`.

### validate(value, context, observer)

The **validate()** method gets the results of all the `LogicRule` rules, turns them into options to call `operator()` and return a [_`Result`_](object-result.md).

#### Arguments

- `value`: _`any`_ – The value to test.
- `context`: _`any`_ – Any contextual data required by `getArgs` to return the arguments `Array`.
- `observer`: _`Object`_ – An observer of the validation result. _[See "Async rules"](guides.md#async-rules)_.

#### Returns

[_`Result`_](object-result.md): Returns the result.

## Properties

The `LogicRule` properties must not be modified.

### meta: _`Object`_

`Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.

### rules: [_`Rule`_](object-rule.md)_`[]`_

`Array` containing all rules used by the `LogicRule`.
